

export interface FormData {
    title: string;
    amount: number;
}

export interface Expenses {
    __v: string;
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


export interface DialogState {
    action: string,
    selectedData: Expenses,
    loading: boolean,
    
    setSelectedData: (action: Expenses) => void;
    setAction: (action: string) => void;
    setLoading: (loading: boolean) => void;
}

export interface DataTableState {
    search: string,
    totalRecords: number;
    page: number;
    pageSize: number;
    sortStatus: { columnAccessor: string; direction: 'asc' | 'desc' };
    
    setSearch: (action: string) => void;
    setTotalRecords: (total: number) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setSortStatus: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
}