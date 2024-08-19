import { useParams } from "react-router-dom";
import { useCustomAxios } from "../../../api/base";

export const useAdditionalServices = () => {
  const { hotelId } = useParams();
  const additionalServices = useCustomAxios({
    url: `/additionalServices/GetByHotel/${hotelId}`,
    method: "GET",
  });

  return additionalServices;
};
