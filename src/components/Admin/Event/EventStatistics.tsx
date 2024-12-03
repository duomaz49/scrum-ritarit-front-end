import { Container, Table } from "reactstrap";
import {IEvent} from "../../../types/event.ts";
import SalesBarChart from "./SalesBarChart.tsx";
import { formatDate } from "../../../utils/date.ts";
import TicketTypesPieChart from "./TicketTypesPieChart.tsx";

interface EventStatisticsProps {
    event: IEvent;
    summary: any;
}

// Täällä haetaam apin kautta summary ja tarvittavat tiedot lähetetään komponenteille käytettäviksi
export default function EventStatistics({event, summary}: EventStatisticsProps) {

    const totalRevenue = summary.reduce((sum, item) => sum + item.totalRevenue, 0);
    const ticketTypeNames = summary.map(item => item.ticketTypeName);
    const ticketTypesSold = summary.map(item => item.ticketsSold);
    
    return (
        <Container>
            <div className="text-center">
                <h2>{event.eventName}</h2>
                <p>{formatDate(event.eventDate)}</p>
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th className="text-center">
                            Total amount
                        </th>
                        <th className="text-center">
                            Tickets Sold
                        </th>
                        <th className="text-center">
                            Tickets Unsold
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="text-center">
                            {event.totalTickets}
                        </th>
                        <th className="text-center">
                            {event.totalTickets-event.availableTickets}
                        </th>
                        <th className="text-center">
                            {event.availableTickets}
                        </th>
                    </tr>
                </tbody>
            </Table>
            <SalesBarChart totalTickets={event.totalTickets} availableTickets={event.availableTickets}/>
            <h3 className="text-center" style={{marginTop:'20px', marginBottom:'20px'}}>Total revenue made: {totalRevenue.toFixed(2)}$</h3>
            <p className="text-center">Ticket type split:</p>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div style={{width:'80%', height:'80%'}}>
                    <TicketTypesPieChart ticketTypeNames={ticketTypeNames} ticketTypesSold={ticketTypesSold}/>
                </div>
            </div>
        </Container>
    );
}