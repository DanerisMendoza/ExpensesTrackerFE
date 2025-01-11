// @src/modules/Analytics/store.ts
import { create } from 'zustand';
import { MonthlyExpenses, TotalAmount, AverageAmount, TopExpenses } from '@src/modules/Dashboard/types';

interface AnalyticsState {
    totalAmount: TotalAmount | null;
    averageAmount: AverageAmount | null;
    monthlyExpenses: MonthlyExpenses[] | null;
    topExpenses: TopExpenses[] | null;
    totalRecords: number;

    setTotalAmount: (totalAmount: TotalAmount) => void;
    setAverageAmount: (averageAmount: AverageAmount) => void;
    setMonthlyExpenses: (monthlyExpenses: MonthlyExpenses[]) => void;
    setTopExpenses: (topExpenses: TopExpenses[]) => void;
    setTotalRecords: (total: number) => void;
}

export const AnalyticsStore = create<AnalyticsState>((set) => ({
    totalAmount: null,
    averageAmount: null,
    monthlyExpenses: null,
    topExpenses: null,
    totalRecords: 0,

    setTotalAmount: (totalAmount) => set(() => ({ totalAmount })),
    setAverageAmount: (averageAmount) => set(() => ({ averageAmount })),
    setMonthlyExpenses: (monthlyExpenses) => set(() => ({ monthlyExpenses })),
    setTopExpenses: (topExpenses) => set(() => ({ topExpenses })),
    setTotalRecords: (total) => set(() => ({ totalRecords: total })),
}));
