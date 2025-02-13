import { create } from "zustand";
import { DialogState, DataTableState, Expenses } from "@modules/Expenses/types";
import { selectedDataVal } from "@src/modules/Expenses/values";

export const DialogStore = create<DialogState>((set) => ({
  action: '',
  selectedData: selectedDataVal,
  loading: false,

  setLoading: (loading) => set({ loading: loading }),
  setSelectedData: (selected_data: Expenses) => set({ selectedData: selected_data }),
  setAction: (action: string) => set({ action: action }),
}));

export const DataTableStore = create<DataTableState>((set) => ({
  search: '',
  totalRecords: 0,
  page: 1,
  pageSize: 20,
  sortStatus: { columnAccessor: 'createdAt', direction: 'desc' },

  setSearch: (search: string) => set({ search: search }),
  setTotalRecords: (total) => set({ totalRecords: total }),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSortStatus: (status) => set({ sortStatus: status }),
}));

