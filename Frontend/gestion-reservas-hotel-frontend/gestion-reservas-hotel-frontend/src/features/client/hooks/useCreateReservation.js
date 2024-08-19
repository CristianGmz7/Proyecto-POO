import { useCustomAxios } from "../../../api/base";

export const useCreateReservation = () => {
  //se coloca los mismos parametros de:
  const createReservationMutation = useCustomAxios(
    {
      url: `/reservations`,
      method: "POST",
    },
    { manual: true }
  );

  return createReservationMutation;
};
