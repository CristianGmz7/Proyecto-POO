using AutoMapper;
using GestionReservasHotelAPI.Database.Entities;
using GestionReservasHotelAPI.Dtos.Hotels;
//using GestionReservasHotelAPI.Dtos.Reservations;

namespace GestionReservasHotelAPI.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        MapsForHotels();
    }

    private void MapsForHotels()
    {
        CreateMap<HotelEntity, HotelDto>();
        CreateMap<HotelCreateDto, HotelEntity>();
        CreateMap<HotelEditDto, HotelEntity>();
    }   
}
