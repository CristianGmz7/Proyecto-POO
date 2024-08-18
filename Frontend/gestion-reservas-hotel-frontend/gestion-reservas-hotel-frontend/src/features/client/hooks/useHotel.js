import { useEffect, useState } from "react";
import { getHotelList } from "../../../shared/actions";

const useHotel = (page) => {
  const [paginatedHotels, setHotel] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHotels = async (page) => {
    const paginatedHotels = await getHotelList(page);
    return paginatedHotels;
  };

  useEffect(() => {
    setLoading(true);
    getHotels(page)
      .then((hotels) => {
        setHotel(hotels);
      })
      .catch((error) => {
        setError(error);
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return {
    paginatedHotels,
    loading,
    error,
  };
};

export default useHotel;
