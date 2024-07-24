using AutoMapper;
using GestionReservasHotelAPI.Database;
using GestionReservasHotelAPI.Database.Entities;
using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Hotels;
using GestionReservasHotelAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestionReservasHotelAPI.Services
{
    public class HotelsService : IHotelsService
    {
        private readonly GestionReservasHotelContext _context;
        private readonly IMapper _mapper;

        public HotelsService(GestionReservasHotelContext context, IMapper mapper) 
        {
            this._context = context;
            this._mapper = mapper;
        }

        public async Task<ResponseDto<List<HotelDto>>> GetHotelsListAsync()
        {
            var hotelsEntity = await _context.Hotels.ToListAsync();

            var hotelsDtos = _mapper.Map<List<HotelDto>>(hotelsEntity);

            return new ResponseDto<List<HotelDto>>
            {
                StatusCode = 200,
                Status = true,
                Message = "Lista de registro obtenida correctamente.",
                Data = hotelsDtos
            };
        }

        public async Task<ResponseDto<HotelDto>> GetHotelByIdAsync(Guid id)
        {
            var hotelEntity = await _context.Hotels.FirstOrDefaultAsync(c => c.Id == id);
            if (hotelEntity == null) 
            {
                return new ResponseDto<HotelDto>
                {
                    StatusCode = 404,
                    Status = false,
                    Message = "No se encontro el registro."
                };
            }

            var hotelDto = _mapper.Map<HotelDto>(hotelEntity);

            return new ResponseDto<HotelDto>
            {
                StatusCode = 200,
                Status = true,
                Message = "Registro encontrado.",
                Data = hotelDto
            };
        }

        public async Task<ResponseDto<HotelDto>> CreateAsync(HotelCreateDto dto)
        {
            var hotelEntity = _mapper.Map<HotelEntity>(dto);

            // TODO: Validar que el hotel no se repita.

            _context.Hotels.Add(hotelEntity);

            await _context.SaveChangesAsync();

            var hotelDto = _mapper.Map<HotelDto>(hotelEntity);

            return new ResponseDto<HotelDto>
            {
                StatusCode = 201,
                Status = true,
                Message = "Resgistro creado exitosamente",
                Data = hotelDto
            };
        }

        public async Task<ResponseDto<HotelDto>> EditAsync(HotelEditDto dto, Guid id)
        {
            var hotelEntity = await _context.Hotels.FirstOrDefaultAsync(c => c.Id == id);
            if (hotelEntity == null) 
            {
                return new ResponseDto<HotelDto>
                {
                    StatusCode = 404,
                    Status = false,
                    Message = "No se encontro el registro."
                };
            }

            _mapper.Map<HotelEditDto, HotelEntity>(dto, hotelEntity);

            _context.Hotels.Update(hotelEntity);

            await _context.SaveChangesAsync();

            var hotelDto = _mapper.Map<HotelDto>(hotelEntity);

            return new ResponseDto<HotelDto>
            {
                StatusCode = 200,
                Status = true,
                Message = "Registro modificado correctamente.",
                Data = hotelDto
            };
        }

        public async Task<ResponseDto<HotelDto>> DeleteAsync(Guid id)
        {
            var hotelEntity = await _context.Hotels.FirstOrDefaultAsync(x =>  x.Id == id);
            if (hotelEntity == null) 
            {
                return new ResponseDto<HotelDto>
                {
                    StatusCode = 404,
                    Status = false,
                    Message = "No se encontro el registro."
                };
            }

            _context.Hotels.Remove(hotelEntity);
            await _context.SaveChangesAsync();

            return new ResponseDto<HotelDto>
            {
                StatusCode = 200,
                Status = true,
                Message = "Registro borrado correctamente."
            };
        }
    }
}
