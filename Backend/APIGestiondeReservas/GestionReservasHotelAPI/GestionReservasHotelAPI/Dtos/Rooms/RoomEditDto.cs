using System.ComponentModel.DataAnnotations;

namespace GestionReservasHotelAPI.Dtos.Rooms;

//no se heredo directamente desde RoomCreateDto porque aqui si se puede cambiar el Estado a Ocupado
//Ademas que no se agrego el Id del hotel como atributo
public class RoomEditDto
{
    //v. rep.
    [Display(Name = "Numero de habitacion")]
    [Range(1, int.MaxValue, ErrorMessage = "El {0} debe ser mayor o igual a 1")]
    [Required(ErrorMessage = "El {0} es obligatorio")]
    public int NumberRoom { get; set; }

    [Display(Name = "Tipo de habitacion")]
    [RegularExpression("^(SENCILLA|DOBLE|SUITE)$", ErrorMessage = "El {0} solo puede ser 'SENCILLA', 'DOBLE', 'SUITE'")]
    [Required(ErrorMessage = "El {0} es obligatorio")]
    public string TypeRoom { get; set; }

    [Display(Name = "Precio por noche")]
    [Range(1, double.MaxValue, ErrorMessage = "El {0} debe se mayor o igual a 1")]
    [Required(ErrorMessage = "El {0} es obligatorio")]
    public double PriceNight { get; set; }

    [Display(Name = "Estado")]
    [RegularExpression("^(DISPONIBLE|OCUPADO|EN MANTENIMIENTO)$", ErrorMessage = "El {0} solo puede ser 'DISPONIBLE', 'EN MANTENIMIENTO'")]
    public string Condition { get; set; }

    //No se envia el hotelId porque no tiene sentido cambiar una habitacion de hotel
}
