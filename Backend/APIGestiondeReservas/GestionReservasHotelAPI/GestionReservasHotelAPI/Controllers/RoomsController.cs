﻿using GestionReservasHotelAPI.Dtos.Common;
using GestionReservasHotelAPI.Dtos.Rooms;
using GestionReservasHotelAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GestionReservasHotelAPI.Controllers;

[Route("api/rooms")]
[ApiController]

public class RoomsController : ControllerBase
{

    private readonly IRoomsService _roomsService;
    public RoomsController(IRoomsService roomsService)
    {
        this._roomsService = roomsService;
    }

    [HttpGet]
    public async Task<ActionResult<ResponseDto<List<RoomDto>>>> GetAll()
    {
        var response = await _roomsService.GetRoomsListAsync();

        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("GetByHotel/{id}")]
    public async Task<ActionResult<List<RoomDto>>> GetAllByHotel(Guid id)
    {
        var response = await _roomsService.GetRoomsOneHotelAsync(id);

        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ResponseDto<RoomDto>>> GetById(Guid id)
    {
        var response = await _roomsService.GetRoomById(id);

        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<ActionResult<ResponseDto<RoomDto>>> Create(RoomCreateDto dto)
    {
        var response = await _roomsService.CreateAsync(dto);

        return StatusCode(response.StatusCode, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ResponseDto<RoomDto>>> Edit(RoomEditDto dto, Guid id)
    {
        var response = await _roomsService.EditAsync(dto, id);

        return StatusCode(response.StatusCode, response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ResponseDto<RoomDto>>> Delete(Guid id)
    {
        var response = await _roomsService.DeleteAsync(id);

        return StatusCode(response.StatusCode, response);
    }
}
