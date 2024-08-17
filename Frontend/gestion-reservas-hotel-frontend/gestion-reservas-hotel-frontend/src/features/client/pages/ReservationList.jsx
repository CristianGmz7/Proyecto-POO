import { Button, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";

export const ReservationList = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-blue-50 text-foreground rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          to={"/roomList/bc41c7dc-97cc-4054-a1e7-7e97768719d9"}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Regresar
        </Link>
        <h1 className="text-2xl font-bold text-blue-700 text-center">Su reservación</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            room: 101,
            type: "Habitación Sencilla",
            price: "$100 por noche",
            imageUrl: "https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg",
          },
          {
            room: 102,
            type: "Habitación Doble",
            price: "$150 por noche",
            imageUrl: "https://www.infobae.com/new-resizer/qK7LgoaH3riDyEc3BkoYq9aOAwU=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152026/The-Peninsula-Manila-2.jpg",
          },
          {
            room: 103,
            type: "Suite",
            price: "$200 por noche",
            imageUrl: "https://www.infobae.com/new-resizer/C-piX6RnCHRWPlVOqHK39L4-LJY=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152130/Bulgari-Resort-Bali-2.jpg",
          },
        ].map(({ room, type, price, imageUrl }) => (
          <div
            key={room}
            className="bg-blue-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
          >
            <img
              src={imageUrl}
              alt={`Habitación ${room}`}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-700">Habitación {room}</h3>
              <p className="text-blue-500">{type}</p>
              <p className="font-semibold text-blue-600">{price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-600">Servicios adicionales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Desayuno incluido", "Acceso al gimnasio", "Acceso al spa"].map(
            (service) => (
              <div
                key={service}
                className="bg-blue-100 rounded-lg p-4 shadow-lg hover:bg-blue-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={service.toLowerCase().replace(" ", "-")}
                    sx={{
                      color: "#007bff",
                      "&.Mui-checked": {
                        color: "#007bff",
                      },
                    }}
                  />
                  <label
                    htmlFor={service.toLowerCase().replace(" ", "-")}
                    className="text-blue-600"
                  >
                    {service}
                  </label>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Total de habitaciones</h2>
          <p className="text-2xl font-bold text-blue-800">$450</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">Total de servicios</h2>
          <p className="text-2xl font-bold text-blue-800">$50</p>
        </div>
      </div>
      <div className="mt-6 bg-blue-200 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-center text-blue-700">Total a pagar</h2>
        <p className="text-3xl font-bold text-blue-900">$500</p>
      </div>
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-500">
          Fecha de entrada: 2023-04-01
        </p>
        <p className="text-sm text-blue-500">
          Fecha de salida: 2023-04-05
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
