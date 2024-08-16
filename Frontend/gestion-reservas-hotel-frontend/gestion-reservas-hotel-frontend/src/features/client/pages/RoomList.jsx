// import { Link } from "react-router-dom"

export const RoomList = () => {

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      {/* Inicio de grid gap-6 md:gap-8*/}
      <div className="grid gap-6 md:gap-8">
        {/* Inicio de div información hotel y campos de check-in y check-out*/}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
          {/* Inicio div de habitaciones y párrafo */}
          <div className="flex-1 grid gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Hotel Brisa Marina</h2>
            <p className="text-muted-foreground">Hotel Brisa Marina es un hotel cómodo en precio y hospitalidad
              que cuenta con un clima agradable, unas hermosas vistas a la playa entre otras muchas características
              especiales que lo convierten en la mejor opción para reservar en el hotel
            </p>
          </div>
          {/* Fin div de habitaciones y párrafo */}
          {/* Inicio de select de check-in y check-out */}
          <div className="flex-none grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Inicio div del check-in */}
            <div className="grid gap-2">
              <label htmlFor="check-in" className="text-sm font-medium">
                Check-in
              </label>
              {/* AQUÍ INICIA ALGO DEL POPOVER */}
              {/* AQUÍ FINALIZA ALGO DEL POPOVER */}
            </div>
            {/* Fin div del check-in */}
            {/* Inicio div del check-out */}
            <div className="grid gap-2">
              <label htmlFor="check-out" className="text-sm font-medium">
                Check-out
              </label>
              {/* AQUÍ INICIA ALGO DEL POPOVER */}
              {/* AQUÍ FINALIZA ALGO DEL POPOVER */}
            </div>
            {/* Fin div del check-out */}

            {/* agregado para filtrar */}
            <button className="text-sm font-medium">Filtrar</button>
            {/* posiblemente toque colocar un Botón de la librería */}
            {/* agregado para filtrar */}

          </div>
          {/* Fin de select de check-in y check-out  */}
        </div>
        {/* Fin de div información hotel y campos de check-in y check-out*/}
        {/* Inicio de contenedor de habitaciones por paginación */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Inicio Card de habitación #1 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #1 */}
          {/* Inicio Card de habitación #2 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #2 */}
          {/* Inicio Card de habitación #3 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #3 */}
          {/* Fin Card de habitación #4 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #4 */}
          {/* Inicio Card de habitación #5 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #5 */}
          {/* Inicio Card de habitación #6 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #6 */}
          {/* Inicio Card de habitación #7 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #7 */}
          {/* Fin Card de habitación #8 */}
          <div className="grid gap-4 relative group">
            <a href="#" className="absolute inset-0 z-10"> {/* Cuando se coloque Link al final lleva prefetch={false} */}
              <span className="sr-only">View</span> {/* ¿Que es sr-only?*/}
            </a>
            <img 
            src="https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg" 
            alt="Hotel Room" 
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
            />
            {/* Inicio información de habitación */}
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              <div className="font-semibold">$150/night</div>
                {/* Numero de estrellas no va */}
                {/* Numero de estrellas no va */}       
            </div>
            {/* Fin información de habitación */}
          </div>
          {/* Fin Card de habitación #8 */}
        </div>
        {/* Fin de contenedor de habitaciones por paginación */}
      </div>
      {/* Fin de grid gap-6 md:gap-8*/}
    </div>
  )
}
