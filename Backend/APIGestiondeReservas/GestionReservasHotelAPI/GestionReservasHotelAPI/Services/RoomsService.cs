using AutoMapper;
using Azure;
using GestionReservasHotelAPI.Database;
using GestionReservasHotelAPI.Database.Entities;
using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Rooms;
using GestionReservasHotelAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestionReservasHotelAPI.Services;

public class RoomsService : IRoomsService
{
    private readonly GestionReservasHotelContext _context;
    private readonly IMapper _mapper;

    public RoomsService(GestionReservasHotelContext context, IMapper mapper)
    {
        this._context = context;
        this._mapper = mapper;
    }

    public async Task<ResponseDto<List<RoomDto>>> GetRoomsListAsync()
    {
        var roomsEntity = await _context.Rooms.ToListAsync();

        //el tipo sera List<RoomDto> y se convertira de RoomEntity que es la variable roomsEntity
        //verificar si para este caso es necesario descomentar el Id del Hotel del Dto
        var roomsDto = _mapper.Map<List<RoomDto>>(roomsEntity);

        return new ResponseDto<List<RoomDto>>
        {
            StatusCode = 200,
            Status = true,
            Message = "Lista de registro obtenida correctamente.",
            Data = roomsDto
        };
    }

    //metodo obtener todas las habitaciones de un hotel
    public async Task<ResponseDto<List<RoomDto>>> GetRoomsOneHotelAsync(Guid id)
    {
        var hotelEntity = await _context.Hotels.FindAsync(id);

        if(hotelEntity == null)
        {
            return new ResponseDto<List<RoomDto>>
            {
                StatusCode = 404,
                Status = false,
                Message = "El hotel no existe"
            };
        }

        var roomsEntity = await _context.Rooms.ToListAsync();
        var roomsOfHotel = new List<RoomEntity> { };

        foreach (var room in roomsEntity)
        {
            if(room.HotelId == hotelEntity.Id)
            {
                roomsOfHotel.Add(room);
            }
        }

        var roomsDto = _mapper.Map<List<RoomDto>>(roomsOfHotel);

        return new ResponseDto<List<RoomDto>>
        {
            StatusCode = 200,
            Status = true,
            Message = "Registros encontrados correctamente",
            Data = roomsDto
        };

    }

    public async Task<ResponseDto<RoomDto>> GetRoomById(Guid id)
    {
        var roomEntity = await _context.Rooms.FindAsync(id);

        if(roomEntity == null)
        {
            return new ResponseDto<RoomDto>
            {
                StatusCode = 404,
                Status = false,
                Message = "No se encontro el registro."
            };
        }

        var roomDto = _mapper.Map<RoomDto>(roomEntity);

        return new ResponseDto<RoomDto>
        {
            StatusCode = 200,
            Status = true,
            Message = "Registro encontrado exitosamente",
            Data = roomDto
        };
    }

    public async Task<ResponseDto<RoomDto>> CreateAsync(RoomCreateDto dto)
    {
        var roomEntity = _mapper.Map<RoomEntity>(dto);

        var hotelEntity = await _context.Hotels.FindAsync(dto.HotelId);

        if (hotelEntity == null)
        {
            return new ResponseDto<RoomDto>
            {
                StatusCode = 404,
                Status = false,
                Message = "El hotel no existe"
            };
        }

        var existingRoom = await _context.Rooms
            .Where(r => r.HotelId == dto.HotelId && r.NumberRoom == dto.NumberRoom)
            .FirstOrDefaultAsync();

        if(existingRoom != null) {
            return new ResponseDto<RoomDto>
            {
                StatusCode = 400,
                Status = false,
                Message = "El numero de habitacion ya existe en este hotel"
            };
        }

        _context.Rooms.Add(roomEntity);
        await _context.SaveChangesAsync();

        var roomDto = _mapper.Map<RoomDto>(roomEntity);

        return new ResponseDto<RoomDto>
        {
            StatusCode = 201,
            Status = true,
            Message = "Registro creado correctamente",
            Data = roomDto
        };
    }

    public async Task<ResponseDto<RoomDto>> EditAsync (RoomEditDto dto, Guid id)
    {
        var roomEntity = await _context.Rooms.FindAsync(id);

        if(roomEntity == null)
        {
            return new ResponseDto<RoomDto>
            {
                Status = false,
                StatusCode = 404,
                Message = "No se encontro el registro"
            };
        }

        //Validar que no se repita numero de habitacion en el hotel donde pertenece
        var existingRoom = await _context.Rooms
             .Where(r => r.HotelId == roomEntity.HotelId && r.NumberRoom == dto.NumberRoom && r.Id != id)
             .FirstOrDefaultAsync();

        if (existingRoom != null)
        {
            return new ResponseDto<RoomDto>
            {
                Status = false,
                StatusCode = 400,
                Message = "El número de habitación ya existe en este hotel"
            };
        }

        _mapper.Map<RoomEditDto, RoomEntity>(dto, roomEntity);

        _context.Rooms.Update(roomEntity);
        await _context.SaveChangesAsync();

        var roomDto = _mapper.Map<RoomDto>(roomEntity);

        return new ResponseDto<RoomDto>
        {
            StatusCode = 200,
            Status = true,
            Message = "Registro editado correctamente",
            Data = roomDto
        };

    }

    public async Task<ResponseDto<RoomDto>> DeleteAsync(Guid id)
    {
        var roomEntity = await _context.Rooms.FindAsync(id);

        if (roomEntity  == null)
        {
            return new ResponseDto<RoomDto>
            {
                StatusCode = 404,
                Status = false,
                Message = "No se encontro el registro"
            };
        }

        _context.Rooms.Remove(roomEntity);
        await _context.SaveChangesAsync();

        return new ResponseDto<RoomDto>
        {
            StatusCode = 200,
            Status = true,
            Message = "Registro borrado existosamente"
        };
    }
}
