using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Reservations;

namespace GestionReservasHotelAPI.Services.Interfaces;

public interface IReservationsService
{
    Task<ResponseDto<ReservationDto>> CreateReservationAsync(ReservationCreateDto dto);
    Task<ResponseDto<ReservationDto>> DeleteReservationAsync(Guid id);
    Task<ResponseDto<ReservationDto>> EditReservationAsync(ReservationEditDto dto, Guid id);
}
