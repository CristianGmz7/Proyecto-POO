using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Reservations;
using GestionReservasHotelAPI.Services.Interfaces;
//using Microsoft.AspNetCore.Components;        //COMENTAR / ELIMINAR ESTA LIBRERIA PARA EVITAR ERROR EN LA RUTA
using Microsoft.AspNetCore.Mvc;

namespace GestionReservasHotelAPI.Controllers;

[Route("api/reservations")]
[ApiController]

public class ReservationsController : ControllerBase
{
    private readonly IReservationsService _reservationsService;

    public ReservationsController(IReservationsService reservationsService)
    {
        this._reservationsService = reservationsService;
    }

    [HttpPost]
    public async Task<ActionResult<ResponseDto<ReservationDto>>> Create(ReservationCreateDto dto)
    {
        var response = await _reservationsService.CreateReservationAsync(dto);

        return StatusCode(response.StatusCode, response);
    }
}
