namespace GestionReservasHotelAPI.Dtos.Reservations;

public class ReservationDto
{
    public Guid Id { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime FinishDate { get; set; }

    public string Condition { get; set; }

    public double Price { get; set; }

    public string ClientId { get; set; }
    //Posiblemente toque cambiarlo de ClientId a UserId

    public List<string> RoomsList { get; set; }

    public List<string> AdditionalServicesList { get; set; }
}
