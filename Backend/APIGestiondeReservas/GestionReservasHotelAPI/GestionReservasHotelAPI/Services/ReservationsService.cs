using AutoMapper;
using GestionReservasHotelAPI.Database;
using GestionReservasHotelAPI.Database.Entities;
using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Reservations;
using GestionReservasHotelAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

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
}
