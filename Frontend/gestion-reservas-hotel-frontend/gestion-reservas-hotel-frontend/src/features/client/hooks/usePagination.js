import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return {
    page,
    handlePageChange,
  };
};
