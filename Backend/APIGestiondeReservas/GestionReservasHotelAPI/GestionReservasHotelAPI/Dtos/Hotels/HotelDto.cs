﻿using System.ComponentModel.DataAnnotations;

namespace GestionReservasHotelAPI.Dtos.Hotels
{
    public class HotelDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public int StarsMichelin { get; set; }
        
        public int NumberPhone { get; set; }
    }
}