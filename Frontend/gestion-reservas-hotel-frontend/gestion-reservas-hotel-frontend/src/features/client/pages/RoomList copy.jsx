// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import Link from "next/link";

import { Link } from "react-router-dom"

export const roomList = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-6 md:gap-8">
      {/* Inicio de div información hotel y campos de check-in y check-out*/}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
        {/* Inicio div de habitaciones y párrafo */}
        <div className="grid gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Find Your Perfect Stay</h2>
          <p className="text-muted-foreground">Explore our selection of top-rated hotels and rooms.</p>
        </div>
        {/* Fin div de habitaciones y párrafo */}
        {/* Inicio de select de check-in y check-out */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Inicio div del check-in */}
          <div className="grid gap-2">
            <label htmlFor="check-in" className="text-sm font-medium">
              Check-in
            </label>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <span>Select date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar />
              </PopoverContent>
            </Popover> */}
          </div>
          {/* Fin div del check-in */}
          {/* Inicio div del check-out */}
          <div className="grid gap-2">
            <label htmlFor="check-out" className="text-sm font-medium">
              Check-out
            </label>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <span>Select date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar />
              </PopoverContent>
            </Popover> */}
          </div>
          {/* Fin div del check-out */}
          {/* Inicio div del city (NO SE COLOCO) */}
          <div className="grid gap-2">
            <label htmlFor="city" className="text-sm font-medium">
              City
            </label>
            <input id="city" placeholder="Enter city" />
          </div>
          {/* Fin div del city (NO SE COLOCO) */}
          {/* Inicio div de guest (NO SE COLOCO) */}
          <div className="grid gap-2">
            <label htmlFor="guests" className="text-sm font-medium">
              Guests
            </label>
            <select id="guests">
              {/* <SelectTrigger>
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 guest</SelectItem>
                <SelectItem value="2">2 guests</SelectItem>
                <SelectItem value="3">3 guests</SelectItem>
                <SelectItem value="4">4 guests</SelectItem>
                <SelectItem value="5">5+ guests</SelectItem>
              </SelectContent> */}
            </select>
          </div>
          {/* Fin div de guest (NO SE COLOCO) */}
        </div>
        {/* Fin de select de check-in y check-out */}
      </div>
      {/* Fin de div información hotel y campos de check-in y check-out*/}
      {/* Inicio de grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Inicio Card de habitación #1 */}
        <div className="grid gap-4 relative group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Hotel Room"
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          />
          {/* Inicio información de habitación */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="font-semibold">Room 101</div>
                <div className="text-xs text-muted-foreground">Standard</div>
              </div>
              {/* Las estrellas no van en el api */}
              <div className="flex items-center gap-1">
                {/* <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" /> */}
              </div>
              {/* Las estrellas no van en el api */}
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Acme Hotel</div>
              <div className="font-semibold">$150/night</div>
            </div>
          </div>
          {/* Fin información de habitación */}
        </div>
        {/* Fin Card de habitación #1 */}
        {/* Inicio Card de habitación #2 */}
        <div className="grid gap-4 relative group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Hotel Room"
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="font-semibold">Room 201</div>
                <div className="text-xs text-muted-foreground">Deluxe</div>
              </div>
              <div className="flex items-center gap-1">
                {/* <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" /> */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Luxury Hotel</div>
              <div className="font-semibold">$250/night</div>
            </div>
          </div>
        </div>
        {/* Fin Card de habitación #2 */}
        {/* Inicio Card de habitación #3 */}
        <div className="grid gap-4 relative group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Hotel Room"
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="font-semibold">Room 301</div>
                <div className="text-xs text-muted-foreground">Suite</div>
              </div>
              <div className="flex items-center gap-1">
                {/* <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" /> */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Grand Hotel</div>
              <div className="font-semibold">$350/night</div>
            </div>
          </div>
        </div>
        {/* Fin Card de habitación #3 */}
        {/* Inicio Card de habitación #4 */}
        <div className="grid gap-4 relative group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Hotel Room"
            width="300"
            height="300"
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="font-semibold">Room 401</div>
                <div className="text-xs text-muted-foreground">Penthouse</div>
              </div>
              <div className="flex items-center gap-1">
                {/* <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" /> */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Elite Hotel</div>
              <div className="font-semibold">$450/night</div>
            </div>
          </div>
        </div>
        {/* Inicio Card de habitación #4 */}
      </div>
      {/* Fin de grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
    </div>
  </div>
  )
}

