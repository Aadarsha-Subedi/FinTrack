// THIRD PARTY IMPORTS
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function MonthlyBarChart({ apiData, year }) {
    const dataByMonth = Array(12).fill(0);
    apiData.forEach(entry => {
        const monthIndex = entry.month - 1;
        dataByMonth[monthIndex] = Number(entry.total);
    });

    const data = {
        labels: months,
        datasets: [
            {
                label: `Amount Spent (${year})`,
                data: dataByMonth,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: `Monthly Spending - ${year}` },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: "Total Spent" },
            },
            x: {
                title: { display: true, text: "Months" },
            },
        },
    };

    return <Bar data={data} options={options} />;
}
