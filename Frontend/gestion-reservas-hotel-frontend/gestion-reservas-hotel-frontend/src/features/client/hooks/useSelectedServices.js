import { useState, useEffect } from "react";

export const useSelectedServices = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    setTotalServices(
      selectedServices.reduce((acc, { price }) => acc + price, 0)
    );
  }, [selectedServices]);

  //alterna si un servicio esta seleccionado o no
  const toggleService = (service) => {
    const exist = selectedServices.some(({ id }) => id === service.id);
    if (!exist) {
      setSelectedServices([...selectedServices, service]);
    } else {
      //lo elomina si no existe
      setSelectedServices(
        selectedServices.filter(({ id }) => id !== service.id)
      );
    }
  };

  return { selectedServices, totalServices, toggleService };
};
