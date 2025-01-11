import { GlobalStore } from "@src/utils/GlobalStore";
import { useAnalytics } from "@src/modules/Dashboard/api/index";
import { Bar } from "react-chartjs-2";  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";  // Chart.js components
import { TopExpenses } from "@src/modules/Dashboard/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default () => {
    const { user_details } = GlobalStore();
    const { topExpenses } = useAnalytics(user_details.id);

    const barChartData = {
        labels: topExpenses?.map((expense: TopExpenses) => expense.title),
        datasets: [
            {
                label: "Top Expenses",
                data: topExpenses?.map((expense: TopExpenses) => expense.amount),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Expense Categories'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)'
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <Bar data={barChartData} options={options} />
    );
};
