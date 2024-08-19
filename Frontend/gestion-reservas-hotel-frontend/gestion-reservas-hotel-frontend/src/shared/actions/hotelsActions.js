import { hotelsApi } from "../../api/index";

export const getHotelList = async (page = 1) => {
  try {
    const {
      data: { data },
    } = await hotelsApi.getHotels(page);

    return {
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
      currentPage: data.currentPage,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      items: data.items.map((item) => ({
        id: item.id,
        address: item.address,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
        numberPhone: item.numberPhone,
        overview: item.overview,
        starsMichelin: item.starsMichelin,
      })),
    };
  } catch (error) {
    return error.response;
  }
};
