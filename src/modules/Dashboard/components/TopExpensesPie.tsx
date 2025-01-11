import { GlobalStore } from "@src/utils/GlobalStore";
import { useAnalytics } from "@src/modules/Dashboard/api/index";
import { Pie } from "react-chartjs-2";  // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend, layouts } from "chart.js";  // Register necessary components for Pie chart
import { TopExpenses } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default () => {
    const { user_details } = GlobalStore();
    const { topExpenses, isLoading, error } = useAnalytics(user_details.id);

    const pieChartData = {
        labels: topExpenses?.map((expense: TopExpenses) => expense.title),
        datasets: [
            {
                label: "Top Expenses",
                data: topExpenses?.map((expense: TopExpenses) => expense.amount),
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Top Expenses',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `$${tooltipItem.raw}`;
                    }
                }
            }
        },
        layout: {
            padding:10
        }
    };

    return (
        <Pie data={pieChartData} options={options} />  // Use Pie component instead of Bar
    );
};
