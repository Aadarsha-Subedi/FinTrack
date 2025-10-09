//THIRD PARTY IMPORTS
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,   // <-- needed for Pie/Doughnut
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
    "rgba(255, 99, 132, 0.6)",   // red
    "rgba(54, 162, 235, 0.6)",   // blue
    "rgba(255, 206, 86, 0.6)",   // yellow
    "rgba(75, 192, 192, 0.6)",   // teal
    "rgba(153, 102, 255, 0.6)",  // purple
    "rgba(255, 159, 64, 0.6)",   // orange
    "rgba(0, 204, 102, 0.6)",    // green
    "rgba(255, 51, 153, 0.6)",   // pink
    "rgba(102, 204, 255, 0.6)",  // light blue
    "rgba(255, 204, 0, 0.6)"     // gold
]


export default function MonthlyPieChart({ apiData, year }) {
    const categories = apiData.map(data => data.category);
    const categoryTotal = apiData.map(data => Number(data.total).toFixed(0));
    const pickedColors = colors.map((color, index) => colors[index % colors.length]);
    const dataByMonth = Array(apiData.length).fill(0);
    const data = {
        labels: categories,
        datasets: [
            {
                label: `Amount Spent ${year}`,
                data: categoryTotal,
                backgroundColor: pickedColors,
                borderColor: "white",
                borderWidth: 1,
            }
        ]
    }
    const options = {
        responsive: true,
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
    return <Pie data={data} options={options} />
}