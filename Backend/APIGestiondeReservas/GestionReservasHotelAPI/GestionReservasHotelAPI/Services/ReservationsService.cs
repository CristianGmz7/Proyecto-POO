using AutoMapper;
using GestionReservasHotelAPI.Database;
using GestionReservasHotelAPI.Database.Entities;
using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Reservations;
using GestionReservasHotelAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GestionReservasHotelAPI.Services;

public class ReservationsService : IReservationsService
{
    private readonly GestionReservasHotelContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger<ReservationsService> _logger;
    private readonly IAuthService _authService;

    public ReservationsService(GestionReservasHotelContext context, 
        IMapper mapper, 
        ILogger<ReservationsService> logger,
        IAuthService authService
        )
    {
        this._context = context;
        this._mapper = mapper;
        this._logger = logger;
        this._authService = authService;
    }

    public async Task<ResponseDto<ReservationDto>> GetReservationByIdAsync (Guid id)
    {
        var reservationEntity = await _context.Reservations
            .Include(x => x.Rooms)
            .ThenInclude(x => x.Room)
            .Include(x => x.AdditionalServices)
            .ThenInclude(x => x.AdditionalService)
            .FirstOrDefaultAsync(x => x.Id == id);

        if(reservationEntity == null)
        {
            return new ResponseDto<ReservationDto>
            {
                StatusCode = 404,
                Status = false,
                Message = $"La reservacion {id} no existe"
            };
        }

        var reservationDto = new ReservationDto
        {
            Id = reservationEntity.Id,
            StartDate = reservationEntity.StartDate,
            FinishDate = reservationEntity.FinishDate,
            Condition = reservationEntity.Condition,    //Esto debe eliminarse cuando se actualice base de datos
            Price = reservationEntity.Price,
            ClientId = reservationEntity.ClientId,
            RoomsList = reservationEntity.Rooms.Select(x => x.RoomId.ToString()).ToList(),
            AdditionalServicesList = reservationEntity.AdditionalServices.Select(x => x.AdditionalServiceId.ToString()).ToList(),
        };

        return new ResponseDto<ReservationDto>
        {
            StatusCode = 200,
            Status = true,
            Message = "Reservacion encontrado exitosamente",
            Data = reservationDto
        };
    }

    public async Task<ResponseDto<ReservationDto>> CreateReservationAsync (ReservationCreateDto dto)
    {
        using(var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                if(dto.StartDate < DateTime.Now)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, la fecha inicial debe ser mayor o igual que la actual"
                    };
                }

                if(dto.FinishDate < dto.StartDate)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, la fecha inicial debe ser menor que la fecha final"
                    };
                }

                if (!dto.RoomsList.Any())
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, debe enviar al menos una habitacion para crear la reserva"
                    };
                }

                var roomIds = dto.RoomsList.Select(Guid.Parse).ToList();
                var roomsEntity = await _context.Rooms.Where(r => roomIds.Contains(r.Id)).ToListAsync();

                if (roomsEntity.Count != roomIds.Count)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 404,
                        Status = false,
                        Message = "Error, una o más habitaciones no existen"
                    };
                }

                //Metodo implementando para verificar que las habitaciones sean del mismo hotel
                var hotelId = roomsEntity.First().HotelId;  // Suponiendo que cada habitación tiene un HotelId
                if (roomsEntity.Any(r => r.HotelId != hotelId))
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, todas las habitaciones deben pertenecer al mismo hotel"
                    };
                }
                //Fin de metodo implementando para verificar que las habitaciones sean del mismo hotel

                //validar que las habitaciones seleccionados no tengan otras reservas
                foreach (var room in roomsEntity)
                {
                    var overlappingReservations = await _context.RoomReservations
                        .Where(rr => rr.RoomId == room.Id && rr.Reservation.FinishDate >= DateTime.Now)
                        .Select(rr => rr.Reservation)
                        .Where(r => (dto.StartDate >= r.StartDate && dto.StartDate <= r.FinishDate) ||
                                    (dto.FinishDate >= r.StartDate && dto.FinishDate <= r.FinishDate))
                        .ToListAsync();

                    if (overlappingReservations.Any())
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 400,
                            Status = false,
                            Message = $"Error, la habitacion {room.NumberRoom} no está disponible para las fechas seleccionadas"
                        };
                    }
                }

                double additionalServicesTotal = 0;
                var additionalServicesEntity = new List<AdditionalServiceEntity>();

                //Calcular los dias que sera la reserva
                var reservationDays = (dto.FinishDate - dto.StartDate).Days;
                if(reservationDays <= 1)
                {
                    reservationDays = 1;
                }

                //se crea additionalServiceIds fuera del if para hacer la evaluacion cuando se quiera
                //agregar a la base de datos
                List<Guid> additionalServicesIds = new List<Guid>();

                if (dto.AdditionalServicesList.Any() && dto.AdditionalServicesList != null)
                {
                    additionalServicesIds = dto.AdditionalServicesList.Select(Guid.Parse).ToList();
                    additionalServicesEntity = await _context.AdditionalServices.Where(aS => additionalServicesIds.Contains(aS.Id)).ToListAsync();

                    if (additionalServicesEntity.Count != additionalServicesIds.Count)
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 404,
                            Status = false,
                            Message = "Error, uno o más servicios adicionales no existen"
                        };

                    }

                    //Metodo implementando para verificar que los SA sean del mismoD hotel
                    if (additionalServicesEntity.Any(aS => aS.HotelId != hotelId))
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 400,
                            Status = false,
                            Message = "Error, todos los servicios adicionales deben pertenecer al mismo hotel que las habitaciones seleccionadas"
                        };
                    }
                    //Fin Metodo implementando para verificar que las SA sean del mismoD hotel
                    
                    additionalServicesTotal = reservationDays * additionalServicesEntity.Sum(aS => aS.Price);

                }   

                double roomsTotal = reservationDays * roomsEntity.Sum(r => r.PriceNight);
                double totalAmount = roomsTotal + additionalServicesTotal;

                //A este punto ya puede cargarse un nuevo ReservationEntity

                var reservationEntity = new ReservationEntity
                {
                    StartDate = dto.StartDate,
                    FinishDate = dto.FinishDate,
                    //ClientId = dto.ClientId,      //se coloca antes de guardarlo en la tabla
                    Condition = "CONFIRMADA",       //ESTE CAMPO DEBE ELIMINARSE CON LA FUTURA MIGRACION
                    Price = totalAmount,
                    //Los List IEnumerable no se colocan
                };

                reservationEntity.ClientId = _authService.GetUserId();

                // Agregar la reserva al contexto y guardar los cambios
                _context.Reservations.Add(reservationEntity);
                await _context.SaveChangesAsync();

                // Cambiar el estado de las habitaciones a "OCUPADO" 
                //ESTO TIENE QUE ELIMINARSE CON LA FUTURA MIGRACION
                foreach (var room in roomsEntity)
                {
                    room.Condition = "OCUPADO";
                }

                //Guardar cambio de habitaciones en la base de datos
                await _context.SaveChangesAsync();

                // Crear y agregar las relaciones de RoomReservations
                var roomsReservationsEntity = roomIds.Select(room => new RoomReservationEntity
                {
                    ReservationId = reservationEntity.Id,
                    RoomId = room
                }); 

                _context.RoomReservations.AddRange(roomsReservationsEntity);
                await _context.SaveChangesAsync();


                // Crear y agregar las relaciones de AdditionalServiceReservation
                if(additionalServicesIds.Any() && additionalServicesEntity != null)
                {
                    var additionalServiceReservations = additionalServicesIds.Select(aS => new AdditionalServiceReservationEntity
                    {
                        ReservationId = reservationEntity.Id,
                        AdditionalServiceId = aS
                    });

                    _context.AdditionalServiceReservations.AddRange(additionalServiceReservations);
                    await _context.SaveChangesAsync();
                }

                //LANZAR ERROR DE PRUEBA: Si funciona
                //throw new Exception("Error para probar el rollback");

                // Confirmar la transacción
                await transaction.CommitAsync();

                // Mapear la entidad de reserva a un DTO y retornar la respuesta
                var reservationDto = new ReservationDto
                {
                    Id = reservationEntity.Id,
                    StartDate = reservationEntity.StartDate,
                    FinishDate = reservationEntity.FinishDate,
                    Condition = reservationEntity.Condition,
                    Price = reservationEntity.Price,
                    ClientId = reservationEntity.ClientId,
                    RoomsList = roomIds.Select(id => id.ToString()).ToList(),
                    AdditionalServicesList = additionalServicesIds.Select(id => id.ToString()).ToList()
                };


                return new ResponseDto<ReservationDto>
                {
                    StatusCode = 201,
                    Status = true,
                    Message = "Reservación creada exitosamente",
                    Data = reservationDto
                };


            }   //fin try
            catch(Exception e)
            {
                await transaction.RollbackAsync();

                _logger.LogError(e, "Error al crear la reservacion");

                return new ResponseDto<ReservationDto>
                {
                    StatusCode = 500,
                    Status = false,
                    Message = "Se produjo error al crear la reservacion"
                };
            }   //fin catch
        }   //fin de using
    }   //fin de metodo CreateReservationAsync

    public async Task<ResponseDto<ReservationDto>> EditReservationAsync (ReservationEditDto dto, Guid id)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                //verificar que la reserva exista
                var reservationEntity = await _context.Reservations.FindAsync(id);

                if (reservationEntity == null)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 404,
                        Status = false,
                        Message = "La reserva no existe"
                    };
                }

                //Verificar error que la fecha actual sea menor que la fecha de inicio de la reserva
                if(DateTime.Now >= reservationEntity.StartDate && DateTime.Now <= reservationEntity.FinishDate)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "La reserva no puede ser modificada porque se encuentra en proceso"
                    };
                }

                //Verificar error que la fecha actual sea mayor que la fecha de fin de la reserva
                if(DateTime.Now > reservationEntity.FinishDate)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "La reserva no puede ser modificada porque ya expiro"
                    };
                }


                //POSIBLE VERIFICACION de ver estado de habitacion: Cancelada / No cancelada

                if (dto.StartDate < DateTime.Now)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, la fecha inicial debe ser mayor o igual que la actual"
                    };
                }

                if (dto.FinishDate < dto.StartDate)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, la fecha inicial debe ser menor que la fecha final"
                    };
                }

                if (!dto.RoomsList.Any())
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, debe enviar al menos una habitacion para crear la reserva"
                    };
                }

                //Pasar el string del dto a Un guid Id
                var roomIds = dto.RoomsList.Select(Guid.Parse).ToList();

                //Estos son los registros que ya existian y se borraran de tabla RoomReservations
                var existingRoomReservations = await _context.RoomReservations
                    .Where(r => r.ReservationId == id)
                    .ToListAsync();

                //guardar id's de habitaciones de la reserva original
                var originalRoomIds = existingRoomReservations.Select(r => r.RoomId).ToList();

                //en base a las habitaciones de la reserva original verificar cuales son las nuevas habitaciones
               var newRoomIds = roomIds.Except(originalRoomIds).ToList();

                //determinar cuales son las habitaciones que deben removerse
                var removedRoomIds = originalRoomIds.Except(roomIds).ToList();

                //determinar habitaciones que aun quedan de la reserva original
                var existingRoomIds = originalRoomIds.Except(removedRoomIds).ToList();

                //union de las habitaciones que aun existen en la reservas mas las nuevas
                var allRoomsIds = existingRoomIds.Concat(newRoomIds).ToList();

                //verificar que las habitaciones de la nueva reserva existan
                var roomsEntity = await _context.Rooms.Where(r => allRoomsIds.Contains(r.Id)).ToListAsync();

                if (roomsEntity.Count != allRoomsIds.Count)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 404,
                        Status = false,
                        Message = "Error, una o más habitaciones no existen"
                    };
                }

                //verificar que las habitaciones sean del mismo hotel
                var hotelId = roomsEntity.First().HotelId;

                if (roomsEntity.Any(r => r.HotelId != hotelId))
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, todas las habitaciones deben pertenecer al mismo hotel"
                    };
                }

                //validar que las habitaciones de la reserva no tengan otras reservas
                //este metodo no es igual al de crear debido a la ultima condicion (...&& rr.Reservation.Id != id)
                foreach (var room in roomsEntity)
                {
                    var overlappingReservations = await _context.RoomReservations
                        .Where(rr => rr.RoomId == room.Id && rr.Reservation.FinishDate >= DateTime.Now && rr.Reservation.Id != id)
                        .Select(rr => rr.Reservation)
                        .Where(r => (dto.StartDate >= r.StartDate && dto.StartDate <= r.FinishDate) ||
                                    (dto.FinishDate >= r.StartDate && dto.FinishDate <= r.FinishDate))
                        .ToListAsync();

                    if (overlappingReservations.Any())
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 400,
                            Status = false,
                            Message = $"Error, la habitacion {room.NumberRoom} no está disponible para las fechas seleccionadas"
                        };
                    }
                }

                //Pasar el string del dto a Un guid Id
                var additionalServicesIds = dto.AdditionalServicesList.Select(Guid.Parse).ToList();

                //Estos son los registros que ya existian y se borraran de tabla AdditionalServicesReservation
                var existingAdditionalServicesReservations = await _context.AdditionalServiceReservations
                    .Where(aS => aS.ReservationId == id)
                    .ToListAsync();

                //guardar id's de SA de la reserva original
                var originalAdditionalServiceIds = existingAdditionalServicesReservations.Select(aS => aS.Id).ToList();

                //en base a los SA de la reserva original verificar cuales son los nuevos SA
                var newAdditionalServiceIds = additionalServicesIds.Except(originalAdditionalServiceIds).ToList();

                //determinar cuales son los SA que deben removerse
                var removeAdditionalServiceIds = originalAdditionalServiceIds.Except(additionalServicesIds).ToList();

                //determinar SA que aun quedan de la reserva original
                var existingAdditionalServiceIds = originalAdditionalServiceIds.Except(removeAdditionalServiceIds).ToList();

                //union de las habitaciones que aun existen en la reservas mas las nuevas
                var allAdditionalServiceIds = existingAdditionalServiceIds.Concat(newAdditionalServiceIds).ToList();

                double additionalServicesTotal = 0;
                var additionalServicesEntity = new List<AdditionalServiceEntity>();

                //Calcular los dias que sera la reserva
                var reservationDays = (dto.FinishDate - dto.StartDate).Days;
                if (reservationDays <= 1)
                {
                    reservationDays = 1;
                }

                if (dto.AdditionalServicesList.Any() && dto.AdditionalServicesList != null)
                {
                    additionalServicesEntity = await _context.AdditionalServices
                        .Where(aS => additionalServicesIds
                        .Contains(aS.Id))
                        .ToListAsync();

                    if (additionalServicesEntity.Count != additionalServicesIds.Count)
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 404,
                            Status = false,
                            Message = "Error, uno o más servicios adicionales no existen"
                        };

                    }

                    //Metodo implementando para verificar que los SA sean del mismoD hotel
                    if (additionalServicesEntity.Any(aS => aS.HotelId != hotelId))
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 400,
                            Status = false,
                            Message = "Error, todos los servicios adicionales deben pertenecer al mismo hotel que las habitaciones seleccionadas"
                        };
                    }
                    //Fin Metodo implementando para verificar que las SA sean del mismo hotel

                    additionalServicesTotal = reservationDays * additionalServicesEntity.Sum(aS => aS.Price);
                }

                double roomsTotal = reservationDays * roomsEntity.Sum(r => r.PriceNight);
                double totalAmount = roomsTotal + additionalServicesTotal;

                //actualizar los datos de la reserva

                reservationEntity.StartDate = dto.StartDate;
                reservationEntity.FinishDate = dto.FinishDate;
                reservationEntity.Condition = "CONFIRMADA";     //ESTE CAMPO DEBE ELIMINARSE CON LA FUTURA MIGRACION
                reservationEntity.Price = totalAmount;  
                reservationEntity.ClientId = _authService.GetUserId();

                _context.Reservations.Update(reservationEntity);
                await _context.SaveChangesAsync();

                //Eliminar habitaciones de la antigua reservacion 
                _context.RoomReservations.RemoveRange(existingRoomReservations);
                await _context.SaveChangesAsync();

                //Asignar las habitaciones con la reservacion en la tabla RoomReservations
                var roomsReservationNew = allRoomsIds
                    .Select(room => new RoomReservationEntity
                    {
                        ReservationId = reservationEntity.Id,
                        RoomId = room
                    })
                    .ToList();

                _context.RoomReservations.AddRange(roomsReservationNew);
                await _context.SaveChangesAsync();

                //Eliminar servicios adicionales de la antigua reservacion 
                _context.AdditionalServiceReservations.RemoveRange(existingAdditionalServicesReservations);
                await _context.SaveChangesAsync();

                //Asignar las habitaciones con la reservacion en la tabla RoomReservations
                var additionalServicesReservationNew = allAdditionalServiceIds
                    .Select(aS => new AdditionalServiceReservationEntity
                    {
                        ReservationId = reservationEntity.Id,
                        AdditionalServiceId = aS
                    })
                    .ToList();

                _context.AdditionalServiceReservations.AddRange(additionalServicesReservationNew);
                await _context.SaveChangesAsync();

                //ERROR DE PRUEBA
                //throw new Exception("Error para validar el rollback");
                await transaction.CommitAsync();

                //retornar respuesta
                var reservationDto = new ReservationDto
                {
                    Id = reservationEntity.Id,
                    StartDate = reservationEntity.StartDate,
                    FinishDate = reservationEntity.FinishDate,
                    Condition = reservationEntity.Condition,
                    Price = reservationEntity.Price,
                    ClientId = reservationEntity.ClientId,
                    RoomsList = allRoomsIds.Select(id => id.ToString()).ToList(),
                    AdditionalServicesList = allAdditionalServiceIds.Select(id => id.ToString()).ToList()
                };

                return new ResponseDto<ReservationDto>
                {
                    StatusCode = 200,
                    Status = true,
                    Message = "Reservacion editada correctamente",
                    Data = reservationDto
                };

            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();

                _logger.LogError(e, "Error al editar la reservacion");

                return new ResponseDto<ReservationDto>
                {
                    StatusCode = 500,
                    Status = false,
                    Message = "Se produjo error al editar la reservacion"
                };
            }   //fin del catch
        }   //fin del using
    }   //fin de metodo EditReservationAsync

    public async Task<ResponseDto<ReservationDto>> DeleteReservationAsync(Guid id)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var reservationEntity = await _context.Reservations.FindAsync(id);

                if(reservationEntity is null)
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 404,
                        Status = false,
                        Message = "La reservacion no existe"
                    };
                }

                _context.Reservations.Remove(reservationEntity);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return new ResponseDto<ReservationDto>
                {
                    StatusCode = 200,
                    Status = true,
                    Message = "Reservacion eliminada correctamente"
                };

            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                _logger.LogError(e, "Error al borrar la reservacion");

                return new ResponseDto<ReservationDto>
                {
                    StatusCode = 500,
                    Status = false,
                    Message = "Error al borrar la reservacion"
                };
            }
        }
    }

    //AQUI SE TENDRIAN QUE COLOCAR LOS CODIGOS RECICLADOS 
}
