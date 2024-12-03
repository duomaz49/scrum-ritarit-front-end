import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface PieChartProps {
    ticketTypeNames: string[];
    ticketTypesSold: number[];
}

export default function TicketTypesPieChart({ ticketTypeNames, ticketTypesSold }: PieChartProps) {

    const data = {
        labels: ticketTypeNames,
        datasets: [{
            label: 'Ticket sales',
            data: ticketTypesSold,
            backgroundColor: ['#A7D8F0', '#A8D5B1', '#FFE6A3', '#F4A6A6', '#D3B4DE', '#FFD0A6'],
        }]
    };

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Tickets Sold by Type',
        },
    }

    return <Pie data={data} options={options} key={"chart2"}/>;
}