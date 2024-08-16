import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';

export const Nav = () => {

  //Estado para el menu, inicialmente falso por eso no se muestra
  // setIsOpen invierte el estado actual de isOpen cuando se llama
  const [isOpen, setIsOpen] = useState(false);

  // esto sirve para referenciar el contenedor del menú, para saber si un click ocurrió dentro o fuera del contenedor
  // antes del return se inicializa con el valor de null y ya dentro JSX se coloca a que se va a referenciar
  const menuRef = useRef(null);

  //función para manejar clicks fuera del menú
  const handleClickOutside = (event) => {
    //menuRef.current accederá si ya esta cargado en el DOM (si lo esta arroja true), sino sera undefined o false
    //!menuRef.current.contains(event.target) solo funciona si el anterior es true (o sea el menu esta desplegado)
      //la segunda condición sera true cuando se presione dentro del menu (pero como esta siendo negada sera false)
      //la unica manera que sea true es que se de click fuera del contenedor, ahi pasaría a ser false entra al if para volver a cerrarse
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  //se utiliza un AddEventListener porque es un evento global y no esta relacionado a un componente en especifico
  //este useEffect se ejecutara cuando el componente se monta y cuando cambia isOpen (el estado del menú cambia)
  useEffect(() => {

    //cuando isOpen es true (menú abierto) añade el evento a todo el documento
    (isOpen 
      ? (document.addEventListener('mousedown', handleClickOutside)) 
    //cuando isOpen es falso (menu cerrado) quita los clicks innecesarios que se den en el DOM
      : (document.removeEventListener('mousedown', handleClickOutside))
    )

    //cleanup function se ejecuta cuando el componente se quite o antes que el useEffect vuelva a ejecutarse
    //siempre que el useEffect se vuelve a ejecutar o el componente se quita, la función de limpieza se ejecuta para remover listener pendientes 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <a href="#" className="text-lg font-bold">
          Hondu Reservas
        </a>
        <nav className="hidden md:flex md:gap-6 lg:gap-8">
          <a href="#" className="text-sm font-medium hover:underline">
            Inicio
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Contacto
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Preguntas Frecuentes
          </a>
        </nav>
        <button type='button'
          className="md:hidden"
          // 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"></path>
          </svg>
          <span className="sr-only">Toggle navigation</span>
        </button>
        {/* Condicionar renderización,
        si ifOpen es true, el código que sigue del && se renderiza y muestra en el DOM;
        si ifOpen es falso, el código que sigue del && no se ejecuta (no se renderiza)*/}
        {isOpen && (
          <div ref={menuRef} className="absolute top-0 left-0 w-full bg-white p-4">
            <nav className="grid gap-4 py-6 px-4">
              <a href="#" className="text-sm font-medium hover:underline">
                Home
              </a>
              <a href="#" className="text-sm font-medium hover:underline">
                Contacto
              </a>
              <a href="#" className="text-sm font-medium hover:underline">
                Preguntas Frecuentes
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};