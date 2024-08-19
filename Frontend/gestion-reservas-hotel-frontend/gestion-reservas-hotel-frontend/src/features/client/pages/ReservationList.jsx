import { Button, Checkbox, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useReservation } from "../contexts/reservationContext";
import { useAdditionalServices } from "../hooks/useAdditionalServices";
import { useSelectedServices } from "../hooks/useSelectedServices";
import { useCreateReservation } from "../hooks/useCreateReservation";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const ReservationList = () => {
  const { selectedRooms, daysInterval, dateInterval } = useReservation();
  const [{ data, loading }] = useAdditionalServices();
  const [{ error }, createMutation] = useCreateReservation();
  const { selectedServices, toggleService, totalServices } =
    useSelectedServices();

  const navigate = useNavigate();

  const costRooms = selectedRooms.reduce(
    (acc, { priceNight }) => acc + priceNight,
    0
  );

  const onCreateReservation = async () => {
    const createDto = {
      startDate: dateInterval.startDate,
      finishDate: dateInterval.endDate,
      roomsList: selectedRooms.map(({ id }) => id),
      additionalServicesList: selectedServices.map(({ id }) => id),
      clientId: "qwqw",
    };

    await createMutation({ data: createDto });
    toast.success("Reservación creada con éxito");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-blue-50 text-foreground rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Regresar
        </Link>
        <h1 className="text-2xl font-bold text-blue-700 text-center">
          Su reservación
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {selectedRooms?.map(
          ({ id, typeRoom, priceNight, imageUrl, numberRoom }) => (
            <div
              key={id}
              className="bg-blue-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={imageUrl}
                alt={`Habitación ${numberRoom}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700">
                  Habitación {numberRoom}
                </h3>
                <p className="text-blue-500">{typeRoom}</p>
                <p className="font-semibold text-blue-600">$ {priceNight}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">
          Servicios adicionales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            data?.data?.map(({ id, name, price }) => (
              <div
                key={id}
                className="bg-blue-100 rounded-lg p-4 shadow-lg hover:bg-blue-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={name}
                    sx={{
                      color: "#007bff",
                      "&.Mui-checked": {
                        color: "#007bff",
                      },
                    }}
                    value={selectedServices.some(
                      (service) => service.id === id
                    )}
                    onChange={() => {
                      toggleService({ id, name, price });
                    }}
                  />
                  <label htmlFor={name} className="text-blue-600">
                    {name}
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Total de habitaciones
          </h2>
          <p className="text-2xl font-bold text-blue-800">${costRooms}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Total de servicios
          </h2>
          <p className="text-2xl font-bold text-blue-800">${totalServices}</p>
        </div>
      </div>
      <div className="mt-6 bg-blue-200 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-center text-blue-700">
          Total a pagar
        </h2>
        <p className="text-3xl font-bold text-blue-900">
          $ {(costRooms + totalServices) * (daysInterval || 1)}
        </p>
      </div>
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-500">
          Fecha de entrada: {dayjs(dateInterval.startDate).format("DD/MM/YYYY")}
        </p>
        <p className="text-sm text-blue-500">
          Fecha de salida: {dayjs(dateInterval.endDate).format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="mt-6 text-right">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0069d9",
            },
          }}
          onClick={onCreateReservation}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
