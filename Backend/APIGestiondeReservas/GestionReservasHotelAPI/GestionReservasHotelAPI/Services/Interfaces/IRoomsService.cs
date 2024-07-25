using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Rooms;

namespace GestionReservasHotelAPI.Services.Interfaces;

public interface IRoomsService
{
    Task<ResponseDto<RoomDto>> CreateAsync(RoomCreateDto dto);
    Task<ResponseDto<RoomDto>> DeleteAsync(Guid id);
    Task<ResponseDto<RoomDto>> EditAsync(RoomEditDto dto, Guid id);
    Task<ResponseDto<RoomDto>> GetRoomById(Guid id);
    Task<ResponseDto<List<RoomDto>>> GetRoomsListAsync();
    Task<ResponseDto<List<RoomDto>>> GetRoomsOneHotelAsync(Guid id);
}
