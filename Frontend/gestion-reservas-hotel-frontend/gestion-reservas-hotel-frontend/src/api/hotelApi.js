import { API } from "./base";

const hotelsApi = {
  getHotels: (page = 1) => API.get("/hotels", { params: { page } }),
};

export { hotelsApi };
