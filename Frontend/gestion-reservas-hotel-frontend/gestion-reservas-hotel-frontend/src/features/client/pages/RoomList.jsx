//importar librería de react
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Pagination } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRoomList } from "../hooks/useRoomList";
import esMx from "dayjs/locale/es-mx";
import CircularProgress from "@mui/material/CircularProgress";
import { useReservation } from "../contexts/reservationContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const RoomList = () => {
  const [page, setPage] = useState(1);
  const { selectedRooms, toggleRoomSelection, isRoomSelected, setDayInterval } =
    useReservation();

  //Crear variable de estado para las fecha inicial y final
  let sDate = new Date();
  let fDate = new Date(sDate);
  fDate.setDate(sDate.getDate() + 1);

  //Estado para saber las fechas de inicio y fin
  const [startDate, setStartDate] = useState(dayjs(sDate));
  const [finishDate, setFinishDate] = useState(dayjs(fDate));
  const [filter, setFilter] = useState({
    startDate: null,
    finishDate: null,
  });
  const { hotelId } = useParams();

  const [{ error, loading, data }] = useRoomList({
    page: page,
    filterStartDate: filter?.startDate,
    filterEndDate: filter?.finishDate,
    hotelId: hotelId,
  });

  const rooms = data?.data?.items?.rooms;
  const hotel = data?.data?.items?.hotel;
  const pagination = data?.data;

  // Función para manejar el filtro del click
  const handleFilterClick = () => {
    if (startDate > finishDate) {

      toast.warn("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    setDayInterval(startDate, finishDate);
    setFilter({
      startDate: startDate.toISOString(),
      finishDate: finishDate.toISOString(),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMx}>
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
        {/* Inicio del div que sirve para agrupar */}
        <div className="grid gap-6 md:gap-8">
          {/* Inicio de div información hotel y campos de check-in y check-out*/}
          <div className="flex flex-col gap-4">
            {/* Nombre del hotel */}
            <h2 className="text-2xl font-bold tracking-tight">
              {hotel?.name}{" "}
            </h2>
            {/* Descripción del hotel */}
            <p className="text-muted-foreground">{hotel?.description}</p>
            {/* Inicio Campos de check-in, check-out y botón de filtrar */}

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {/* Inicio Campo de check-in */}
              <div className="flex flex-col gap-2">
                <label htmlFor="check-in" className="text-sm font-medium">
                  Fecha inicio
                </label>
                <DatePicker
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  minDate={dayjs()}
                  format="DD/MM/YYYY"
                />
              </div>
              {/* Fin Campo de check-in */}
              {/* Inicio Campo de check-out */}
              <div className="flex flex-col gap-2">
                <label htmlFor="check-out" className="text-sm font-medium">
                  Fecha Fin
                </label>
                <DatePicker
                  format="DD/MM/YYYY"
                  value={finishDate}
                  minDate={startDate}
                  onChange={(newDate) => setFinishDate(newDate)}
                />
              </div>
              {/* Fin Campo de check-out */}
              {/* Inicio Botón de filtrar */}
              <Button onClick={handleFilterClick} variant="contained">
                Filtrar
              </Button>
              {/* Fin Botón de filtrar */}
            </div>
            {/* Fin Campos de check-in, check-out y botón de filtrar */}
          </div>
          {/* Fin de div información hotel y campos de check-in y check-out*/}
          {/* Inicio de contenedor de habitaciones por paginación */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rooms?.map((room) => (
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
                      <div className="font-semibold">
                        Habitación {room.numberRoom}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {room.typeRoom}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-700 text-sm">
                      ${room.priceNight} / noche
                    </div>
                    <Button
                      variant="contained"
                      color={isRoomSelected(room.id) ? "error" : "success"}
                      onClick={() => toggleRoomSelection(room)}
                    >
                      {isRoomSelected(room.id)
                        ? "Cancelar reserva"
                        : "Agregar a Reserva"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Fin de contenedor de habitaciones por paginación */}
          {/* Inicio Botón implementado cuando se selecciona habitaciones */}
          {selectedRooms.length > 0 && (
            <div className="mt-8">
              <Link to={`/ReservationList/${hotelId}`}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setDayInterval(startDate, finishDate);
                  }}
                >
                  Ver Reserva
                </Button>
              </Link>
            </div>
          )}
          {/* Fin Botón implementado cuando se selecciona habitaciones */}
        </div>
        {/* Fin del div que sirve para agrupar */}
        <div className="flex mt-5 justify-center">
          <Pagination
            count={pagination?.totalPages}
            page={pagination?.currentPage}
            onChange={(_event, page) => setPage(page)}
            key={pagination?.currentPage}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};
