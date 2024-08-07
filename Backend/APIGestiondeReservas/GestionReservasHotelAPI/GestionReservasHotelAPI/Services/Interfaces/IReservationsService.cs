using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Reservations;

namespace GestionReservasHotelAPI.Services.Interfaces;

public interface IReservationsService
{
    Task<ResponseDto<ReservationDto>> CreateReservationAsync(ReservationCreateDto dto);
}
