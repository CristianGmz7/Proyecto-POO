// import { Link } from "react-router-dom"

//importar librería de react
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RoomList = () => {

  //Crear variable de estado para las fecha inicial y final
  let sDate = new Date();
  let fDate = new Date(sDate);
  fDate.setDate(sDate.getDate() + 1)

  //Estado para saber las fechas de inicio y fin
  const[startDate, setStartDate] = useState(dayjs(sDate));
  const[finishDate, setFinishDate] = useState(dayjs(fDate));

  //Estado para saber que habitación esta presionada
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Función para manejar el filtro del click
  const handleFilterClick = () => {
    alert(`Falta que implementar restricciones de que se bloqueen las fechas anteriores
          Fecha inicial: ${startDate}
          Fecha final: ${finishDate}`)
  }

  // Función para manejar las habitaciones que se agregan a reserva
  const toggleRoomSelection = (roomId) => {
    setSelectedRooms(prevSelectedRooms => {
      if (prevSelectedRooms.includes(roomId)) {
        return prevSelectedRooms.filter(id => id !== roomId);
      } else {
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  //este es un arreglo temporal, después debe de actualizarse con datos que se reciban de la base de datos
  const rooms = [
    { id: 101, type: "Sencilla", price: 150, imageUrl: "https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" },
    { id: 102, type: "Doble", price: 200, imageUrl: "https://www.infobae.com/new-resizer/qK7LgoaH3riDyEc3BkoYq9aOAwU=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152026/The-Peninsula-Manila-2.jpg" },
    { id: 103, type: "Suite", price: 300, imageUrl: "https://www.infobae.com/new-resizer/C-piX6RnCHRWPlVOqHK39L4-LJY=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152130/Bulgari-Resort-Bali-2.jpg" },
    { id: 104, type: "Sencilla", price: 150, imageUrl: "https://www.infobae.com/new-resizer/YaqW55Y3Z3TTAY4d12JNltkW2UU=/768x512/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152242/Dorado-Beach-a-Ritz-Carlton-Reserve-2.jpg" },
    { id: 105, type: "Sencilla", price: 150, imageUrl: "https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" },
    { id: 106, type: "Doble", price: 200, imageUrl: "https://www.infobae.com/new-resizer/qK7LgoaH3riDyEc3BkoYq9aOAwU=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152026/The-Peninsula-Manila-2.jpg" },
    { id: 107, type: "Suite", price: 300, imageUrl: "https://www.infobae.com/new-resizer/C-piX6RnCHRWPlVOqHK39L4-LJY=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152130/Bulgari-Resort-Bali-2.jpg" },
    { id: 108, type: "Sencilla", price: 150, imageUrl: "https://www.infobae.com/new-resizer/YaqW55Y3Z3TTAY4d12JNltkW2UU=/768x512/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152242/Dorado-Beach-a-Ritz-Carlton-Reserve-2.jpg" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      {/* Inicio del div que sirve para agrupar */}
      <div className="grid gap-6 md:gap-8">
        {/* Inicio de div información hotel y campos de check-in y check-out*/}
        <div className="flex flex-col gap-4">
          {/* Nombre del hotel */}
          <h2 className="text-2xl font-bold tracking-tight">Hotel Century</h2>
          {/* Descripción del hotel */}
          <p className="text-muted-foreground">
            Hotel Century es un hotel cómodo en precio y hospitalidad
            que cuenta con un clima agradable, unas hermosas vistas a la playa 
            entre otras muchas características especiales que lo convierten en 
            la mejor opción para reservar en el hotel.
          </p>
          {/* Inicio Campos de check-in, check-out y botón de filtrar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            {/* Inicio Campo de check-in */}
            <div className="flex flex-col gap-2">
              <label htmlFor="check-in" className="text-sm font-medium">
                Fecha inicio
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                />
              </LocalizationProvider>
            </div>
            {/* Fin Campo de check-in */}
          {/* Inicio Campo de check-out */}
          <div className="flex flex-col gap-2">
            <label htmlFor="check-out" className="text-sm font-medium">
              Fecha Fin
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={finishDate}
                onChange={(newDate) => setFinishDate(newDate)}
              />
            </LocalizationProvider>
          </div>
          {/* Fin Campo de check-out */}
          {/* Inicio Botón de filtrar */}
          <Button 
            onClick={handleFilterClick}
            variant="contained">
            Filtrar
          </Button>
          {/* Fin Botón de filtrar */}
          </div>
          {/* Fin Campos de check-in, check-out y botón de filtrar */}
        </div>
        {/* Fin de div información hotel y campos de check-in y check-out*/}
        {/* Inicio de contenedor de habitaciones por paginación */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map(room => (
            <div key={room.id} className="grid gap-4 relative group">
              <img 
                src={room.imageUrl} 
                alt={`Room ${room.id}`} 
                width="300"
                height="300"
                className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
              />
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Room {room.id}</div>
                  <div className="text-xs text-muted-foreground">{room.type}</div>
                </div>
                <div className="font-semibold">{room.price}/night</div>
                <Button 
                  variant="contained" 
                  color={selectedRooms.includes(room.id) ? "error" : "success"}
                  onClick={() => toggleRoomSelection(room.id)}
                >
                  {selectedRooms.includes(room.id) ? "Cancelar reserva" : "Agregar a Reserva"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Fin de contenedor de habitaciones por paginación */}
        {/* Inicio Botón implementado cuando se selecciona habitaciones */}
        {selectedRooms.length > 0 && (
          <div className="mt-8">
            <Link
            to={"/ReservationList/0f529c92-2d29-41a3-957a-e3601d0c77c9"}
            >
            <Button 
              variant="contained" 
              color="warning"
              onClick={() => alert(`Ver reserva: ${selectedRooms.join(', ')}`)}
            >
              Ver Reserva
            </Button>
            </Link>
        </div>
        )}
        {/* Fin Botón implementado cuando se selecciona habitaciones */}
      </div>
      {/* Fin del div que sirve para agrupar */}
    </div>
  )
}