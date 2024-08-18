import useHotel from "../hooks/useHotel";
import { HotelCard } from "../components/HotelCard";
import Pagination from "@mui/material/Pagination";
import { usePagination } from "../hooks/usePagination";

export const HomePage = () => {
  const { handlePageChange, page } = usePagination();
  const { paginatedHotels, loading, error } = useHotel(page);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenidos al Sistema de Gestión de Reservas de Hotel
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div>Poner skeleton...</div>
          ) : (
            paginatedHotels?.items?.map((hotel) => (
              <HotelCard key={hotel?.id} hotel={hotel} />
            ))
          )}
        </section>
      </div>

      {/* {JSON.stringify(paginatedHotels)} */}
      {/* Inicio de paginación */}
      <div className="flex flex-row justify-center items-center">
        <Pagination
          count={paginatedHotels?.totalPages}
          page={paginatedHotels?.currentPage}
          onChange={(_event, page) => handlePageChange(page)}
        />
      </div>
      {/* Fin de paginación */}

      <section className="mt-12 md:mt-16 lg:mt-20 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">Más información</h2>
        <div className="información grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="contacto">
            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p className="text-muted-foreground mb-4">
              Puedes comunicarte con nosotros a través de nuestro formulario de
              contacto o por teléfono.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Contactar
            </a>
          </div>
          <div className="política-cancelación">
            <h3 className="text-xl font-bold mb-2">Política de cancelación</h3>
            <p className="text-muted-foreground mb-4">
              Conoce nuestras políticas de cancelación y modificación de
              reservas.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
             text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
             focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver política
            </a>
          </div>
          <div className="características-destacadas">
            <h3 className="text-xl font-bold mb-2">
              Características destacadas
            </h3>
            <p className="text-muted-foreground mb-4">
              Descubre las características que hacen de nuestros hoteles una
              experiencia única.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver características
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-current"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
