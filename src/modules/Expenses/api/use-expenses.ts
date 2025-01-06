import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/api";
import {  DataTableStore } from "@src/modules/Expenses/store";
export const useExpenses = () => {
  const {
    search,
    page,
    pageSize,
    sortStatus,
  } = DataTableStore();

  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("getAllExpenses/me", {
        params: {
          page,
          limit: pageSize,
          search,
          sortBy: sortStatus.columnAccessor,
          sortDirection: sortStatus.direction,
        },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  });
};
