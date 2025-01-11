import { GlobalStore } from "@src/utils/GlobalStore";
import { useAnalytics } from "@src/modules/Dashboard/api/index";
import { Line } from "react-chartjs-2";  
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from "chart.js";  // Chart.js components
import { MonthlyExpenses } from "@src/modules/Dashboard/types";

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

export default () => {
    const { user_details } = GlobalStore();
    const { monthlyExpenses, isLoading, error } = useAnalytics(user_details.id);
    const chartData = {
        labels: monthlyExpenses?.map((expense: MonthlyExpenses) => expense._id), // Month and Year (e.g., "2025-01")
        datasets: [
            {
                label: "Total Amount",
                data: monthlyExpenses?.map((expense: MonthlyExpenses) => expense.totalAmount), // Monthly totals
                fill: false,  
                borderColor: "rgba(75, 192, 192, 1)", 
                borderWidth: 2, 
                tension: 0.1, 
            },
        ],
    };
    return (
        <Line data={chartData} />
    )
}
