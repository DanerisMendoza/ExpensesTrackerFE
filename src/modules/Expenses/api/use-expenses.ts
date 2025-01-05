
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@src/api";
import { DialogStore, DataTableStore } from "@src/modules/Expenses/store"
export const useExpenses = () => {
  const {
    search, records, totalRecords, page, pageSize, sortStatus, refresh, fetching,
    setRecords, setTotalRecords, setPage, setPageSize, setSortStatus, setRefresh, setFetching
  } = DataTableStore();
  
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('getAllExpenses/me', {
        params: {
          page,
          limit: pageSize,
          search,
          sortBy: sortStatus.columnAccessor,
          sortDirection: sortStatus.direction,
        },
      });
      return data;
    }
  });
}
