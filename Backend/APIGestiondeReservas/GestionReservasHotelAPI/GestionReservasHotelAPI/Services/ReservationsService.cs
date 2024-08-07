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

    public ReservationsService(GestionReservasHotelContext context, IMapper mapper, ILogger<ReservationsService> logger)
    {
        this._context = context;
        this._mapper = mapper;
        this._logger = logger;
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
                //var roomsEntity = await _context.Rooms.ToListAsync();
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

                var conflictingReservations = await _context.RoomReservations
                    .Where(rr => roomIds.Contains(rr.RoomId) &&
                            rr.Reservation.FinishDate > DateTime.Now &&
                                ((dto.StartDate >= rr.Reservation.StartDate &&
                                    dto.StartDate <= rr.Reservation.FinishDate) ||
                                    (dto.FinishDate >= rr.Reservation.StartDate &&
                                    dto.FinishDate <= rr.Reservation.FinishDate)
                                )
                    ).ToListAsync();

                if (conflictingReservations.Any())
                {
                    return new ResponseDto<ReservationDto>
                    {
                        StatusCode = 400,
                        Status = false,
                        Message = "Error, una o más habitaciones están reservadas para las fechas dadas"
                    };
                }

                //verificar que las habitaciones existan y que pertenezcan al mismo hotel
                //¿no se si ya se realizaria?

                double additionalServicesTotal = 0;
                var additionalServicesEntity = new List<AdditionalServiceEntity>();

                if (dto.AdditionalServicesList.Any() && dto.AdditionalServicesList != null)
                {
                    var additionalServiceIds = dto.AdditionalServicesList.Select(Guid.Parse).ToList();
                    additionalServicesEntity = await _context.AdditionalServices.Where(aS => additionalServiceIds.Contains(aS.Id)).ToListAsync();

                    if (additionalServicesEntity.Count != additionalServiceIds.Count)
                    {
                        return new ResponseDto<ReservationDto>
                        {
                            StatusCode = 404,
                            Status = false,
                            Message = "Error, uno o más servicios adicionales no existen"
                        };
                    }
                    additionalServicesTotal = (dto.FinishDate - dto.StartDate).TotalDays * additionalServicesEntity.Sum(aS => aS.Price);

                }

                double roomsTotal = (dto.FinishDate - dto.StartDate).TotalDays * roomsEntity.Sum(r => r.PriceNight);
                double totalAmount = roomsTotal + additionalServicesTotal;

                var reservationEntity = new ReservationEntity
                {
                    StartDate = dto.StartDate,
                    FinishDate = dto.FinishDate,
                    ClientId = dto.ClientId,
                    Condition = "CONFIRMADA",
                    Price = totalAmount,
                    Rooms = new List<RoomReservationEntity>(),
                    AdditionalServices = new List<AdditionalServiceReservationEntity>()
                };

                foreach (var roomId in roomIds)
                {
                    reservationEntity.Rooms.Add(new RoomReservationEntity
                    {
                        RoomId = roomId,
                        ReservationId = reservationEntity.Id
                    });
                }

                foreach (var additionalService in additionalServicesEntity)
                {
                    reservationEntity.AdditionalServices.Add(new AdditionalServiceReservationEntity
                    {
                        AdditionalServiceId = additionalService.Id,
                        ReservationId = reservationEntity.Id
                    });
                }

                // Agregar la reserva al contexto y guardar los cambios
                _context.Reservations.Add(reservationEntity);
                await _context.SaveChangesAsync();

                // Cambiar el estado de las habitaciones a "OCUPADO"
                foreach (var room in roomsEntity)
                {
                    room.Condition = "OCUPADO";
                }
                await _context.SaveChangesAsync();

                // Confirmar la transacción
                await transaction.CommitAsync();

                // Mapear la entidad de reserva a un DTO y retornar la respuesta
                var reservationDto = _mapper.Map<ReservationDto>(reservationEntity);
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
