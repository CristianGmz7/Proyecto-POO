// import { Link } from "react-router-dom"

//importar librería de react
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

export const RoomList = () => {

  //Crear variable de estado para las fecha inicial y final
  let sDate = new Date();
  let fDate = new Date(sDate);
  fDate.setDate(sDate.getDate() + 1)
  const[startDate, setStartDate] = useState(dayjs(sDate));
  const[finishDate, setFinishDate] = useState(dayjs(fDate));

  const handleFilterClick = () => {
    alert(`Falta que implementar restricciones de que se bloqueen las fechas anteriores
          Fecha inicial: ${startDate}
          Fecha final: ${finishDate}`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      {/* Inicio de grid gap-6 md:gap-8*/}
      <div className="grid gap-6 md:gap-8">
        {/* Inicio de div información hotel y campos de check-in y check-out*/}
        <div className="flex flex-col gap-4">
          {/* Nombre del hotel */}
          <h2 className="text-2xl font-bold tracking-tight">Hotel Brisa Marina</h2>
  
          {/* Descripción del hotel */}
          <p className="text-muted-foreground">
            Hotel Brisa Marina es un hotel cómodo en precio y hospitalidad
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
