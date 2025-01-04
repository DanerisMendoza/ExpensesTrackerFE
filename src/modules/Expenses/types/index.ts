

export interface FormData {
    title: string;
    amount: number;
}

export interface Expenses {
    _id: string;
    title: string;
    user_id: string;
    amount: number;
    spent_at: Date;
    updatedAt: Date;
    createdAt: Date;
};

export interface FetchExpensesParams {
    page: number;
    pageSize: number;
    search: string;
    sortStatus: {
        columnAccessor: string;
        direction: 'asc' | 'desc';
    };
}


export interface StoreState {
    action: string,
    selectedData: Expenses,
    
    setSelectedData: (action: Expenses) => void;
    setAction: (action: string) => void;
}

export interface DataTableState {
    search: string,
    records: Expenses[];
    totalRecords: number;
    page: number;
    pageSize: number;
    sortStatus: { columnAccessor: string; direction: 'asc' | 'desc' };
    refresh: boolean;
    
    setSearch: (action: string) => void;
    setRecords: (records: Expenses[]) => void;
    setTotalRecords: (total: number) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setSortStatus: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
    setRefresh: (refresh: boolean) => void;
}