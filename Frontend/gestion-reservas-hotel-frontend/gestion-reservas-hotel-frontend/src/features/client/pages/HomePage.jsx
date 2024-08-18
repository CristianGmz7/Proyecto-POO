import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";

export const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenidos al Sistema de Gestión de Reservas de Hotel</h1>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primer hotel */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1579625224451-b0ab6ed101f5?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Hotel 1" 
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Hotel Century</h3>
                <div>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-muted stroke-muted-foreground"/>
                  <StarIcon className="w-5  h-5 fill-muted stroke-muted-foreground"/>
                </div>
              </div>
              <p>Disfruta de una estancia relajante en nuestro hotel con vistas a la playa.</p>
              <Link 
                to = "/roomList/bc41c7dc-97cc-4054-a1e7-7e97768719d9"
               className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 text-white 
               font-medium transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600
                focus:ring-offset-2"
              >
                Ver habitaciones
              </Link>
            </div>
          </div>
          {/* Fin primer hotel */}
          {/* Segundo hotel */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1648852231208-21ce6bd2768b?q=80&w=1540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Hotel 1" 
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Hotel Colony</h3>
                <div>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-muted stroke-muted-foreground"/>
                  <StarIcon className="w-5  h-5 fill-muted stroke-muted-foreground"/>
                </div>
              </div>
              <p>Relájate en nuestro resort de lujo con piscina y spa.</p>
              <Link 
                to = "/roomList/bc41c7dc-97cc-4054-a1e7-7e97768719d9"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600
                 text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
                 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Ver habitaciones
              </Link>
            </div>
          </div>
          {/* Fin segundo hotel */}
          {/* Tercer hotel */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1718585322553-a77879e06ad5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D" 
              alt="Hotel 1" 
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Hotel Cadillac</h3>
                <div>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-primary"/>
                  <StarIcon className="w-5  h-5 fill-muted stroke-muted-foreground"/>
                  <StarIcon className="w-5  h-5 fill-muted stroke-muted-foreground"/>
                </div>
              </div>
              <p>Disfruta de unas vacaciones en nuestro hotel con vistas panorámicas.</p>
              <Link 
                to = "/roomList/bc41c7dc-97cc-4054-a1e7-7e97768719d9"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600
                text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
                focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Ver habitaciones
              </Link>
            </div>
          </div>
          {/* Fin tercer hotel */}
        </section>
      </div>

      {/* Inicio de paginación */}
      <Pagination/>
      {/* Fin de paginación */}

      <section className="mt-12 md:mt-16 lg:mt-20 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">Más información</h2>
        <div className="información grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="contacto">
            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p className="text-muted-foreground mb-4">
              Puedes comunicarte con nosotros a través de nuestro formulario de contacto o por teléfono.
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
              Conoce nuestras políticas de cancelación y modificación de reservas.
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
            <h3 className="text-xl font-bold mb-2">Características destacadas</h3>
            <p className="text-muted-foreground mb-4">
              Descubre las características que hacen de nuestros hoteles una experiencia única.
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
  )
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
    )
  }
  
