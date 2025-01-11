// @src/modules/Analytics/types.ts

// Type for total amount response
export interface TotalAmount {
    totalAmount: number;
}

// Type for average amount response
export interface AverageAmount {
    averageAmount: number;
}

// Type for monthly expenses breakdown
export interface MonthlyExpenses {
    _id: string; // This represents the month and year in 'YYYY-MM' format
    totalAmount: number;
    count: number;
}

// Type for top expenses response
export interface TopExpenses {
    _id: string; // Expense ID
    user_id: string;
    title: string;
    amount: number;
    spent_at: string; // Date in ISO format
}
