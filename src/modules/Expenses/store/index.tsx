import { create } from "zustand";
import { StoreState, DataTableState, Expenses } from "@modules/Expenses/types";
import { selectedDataVal } from "@src/modules/Expenses/values";

export const DialogStore = create<StoreState>((set) => ({
  action: '',
  selectedData: selectedDataVal,

  setSelectedData: (selected_data: Expenses) => set({ selectedData: selected_data }),
  setAction: (action: string) => set({ action: action }),
}));

export const DataTableStore = create<DataTableState>((set) => ({
  search: '',
  records: [],
  totalRecords: 0,
  page: 1,
  pageSize: 20,
  sortStatus: { columnAccessor: 'createdAt', direction: 'desc' },
  refresh: false,
  fetching: false,

  setSearch: (search: string) => set({ search: search }),
  setRecords: (records) => set({ records }),
  setTotalRecords: (total) => set({ totalRecords: total }),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSortStatus: (status) => set({ sortStatus: status }),
  setRefresh: (refresh) => set({ refresh: refresh }),
  setFetching: (fetching) => set({ fetching: fetching }),
}));

