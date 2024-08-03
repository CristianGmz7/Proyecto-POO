using GestionReservasHotelAPI.Dtos.Hotels;

namespace GestionReservasHotelAPI.Dtos.Rooms;

public class RoomDto
{
    public Guid Id { get; set; }        

    public int NumberRoom { get; set; }

    public string TypeRoom { get; set; }

    public double PriceNight { get; set; }

    public string Condition { get; set; }

    public Guid HotelId { get; set; }     
    
    //(solo necesito ver el Id del hotel al que pertenece el hotel, no toda su info)
    //(no necesito ver por el momento las reservaciones que tenga)

}
