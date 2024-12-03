import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SalesBarChartProps {
    totalTickets: number;
    availableTickets: number;
}

export default function SalesBarChart({ totalTickets, availableTickets }: SalesBarChartProps){

    const soldTickets = totalTickets - availableTickets;

    const data = {
        labels: ['Total Tickets', 'Sold Tickets', 'Unsold Tickets'],
        datasets : [{
            label: 'Ticket sales',
            data: [totalTickets, soldTickets, availableTickets],
            backgroundColor: ['#FFA500', '#00FF00', '#FF0000'],
        }]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
              beginAtZero: true
            }
          }
    }

    return <Bar data={data} options={options} key={"chart1"}/>;
}