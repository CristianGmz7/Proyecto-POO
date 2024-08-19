import { useCustomAxios } from "../../../api/base";

export const useRoomList = ({ page , filterStartDate, filterEndDate ,hotelId}) => {

  const roomListRes = useCustomAxios({
    url: `/rooms/GetByHotel/${hotelId}`,
    method: "GET",
    params: {
      page,
      filterStartDate,
      filterEndDate,
    },
  });

  return roomListRes;
};
