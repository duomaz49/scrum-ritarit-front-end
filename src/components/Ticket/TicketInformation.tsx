import {Container, Card, CardBody, Table} from 'reactstrap';
import {ITicket} from "../../types/ticket.ts";

interface TicketInformationProps {
    ticket: ITicket;
}
export default function TicketInformation(props: TicketInformationProps) {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h5>Ticket Information:</h5>
                    <div>Ticket: {props.ticket.ticketNumber}</div>
                    <div>Price: {props.ticket.price}</div>
                    <div>Event: {props.ticket.eventId}</div>
                    <div>Type: {props.ticket.ticketTypeId}</div>
                    <div>Used: {props.ticket.used ? 'Used' : 'Unused'}</div>
                </CardBody>
            </Card>
        </Container>
    );
}