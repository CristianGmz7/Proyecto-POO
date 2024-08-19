import { createContext, useState, useContext } from "react";

const reservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  //Estado para saber que habitación esta presionada
  const [selectedRooms, setSelectedRooms] = useState({
    days: 0,
    rooms: [],
    startDate: null,
    endDate: null,
  });
  console.info(selectedRooms);

  // Función para manejar las habitaciones que se agregan a reserva
  const toggleRoomSelection = (room) => {
    const isRoomAlreadySelected = selectedRooms?.rooms?.some(
      (selectedRoom) => selectedRoom.id === room.id
    );

    if (isRoomAlreadySelected) {
      setSelectedRooms({
        ...selectedRooms,
        rooms: selectedRooms?.rooms?.filter(
          (selectedRoom) => selectedRoom.id !== room.id
        ),
      });
    } else {
      setSelectedRooms({
        ...selectedRooms,
        rooms: [...(selectedRooms?.rooms ?? []), room],
      });
    }
  };

  const isRoomSelected = (roomId) =>
    selectedRooms?.rooms?.some((room) => room.id === roomId);

  const setDayInterval = (startDate, endDate) => {
    /// contar los días entre las fechas , las fechas que vienen son de dayjs
    const startDay = startDate.get("date");
    const endDay = endDate.get("date");
    let cantidad = endDay - startDay;

    if (startDay === endDay) cantidad = 1;
    //se mantiene todo excepto lo dias, se sobreescriben
    setSelectedRooms({
      ...selectedRooms,
      days: cantidad,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
    });
  };

  return (
    <reservationContext.Provider
      value={{
        selectedRooms: selectedRooms?.rooms,
        toggleRoomSelection,
        isRoomSelected,
        setDayInterval,
        daysInterval: selectedRooms?.days,
        dateInterval: {
          startDate: selectedRooms?.startDate,
          endDate: selectedRooms?.endDate,
        },
      }}
    >
      {children}
    </reservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(reservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};
