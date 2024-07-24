using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Hotels;

namespace GestionReservasHotelAPI.Services.Interfaces
{
    public interface IHotelsService
    {
        Task<ResponseDto<List<HotelDto>>> GetHotelsListAsync();
        Task<ResponseDto<HotelDto>> GetHotelByIdAsync(Guid id);
        Task<ResponseDto<HotelDto>> CreateAsync(HotelCreateDto dto);
        Task<ResponseDto<HotelDto>> EditAsync(HotelEditDto dto, Guid id);
        Task<ResponseDto<HotelDto>> DeleteAsync(Guid id);
    }
}
