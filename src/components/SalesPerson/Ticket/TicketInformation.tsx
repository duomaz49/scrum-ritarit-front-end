import {Container, Card, CardBody, Table} from 'reactstrap';
import {ITicket} from "../../../types/ticket.ts";
import {useEffect} from "react";

interface TicketInformationProps {
    ticket: ITicket;
}

export default function TicketInformation(props: TicketInformationProps) {
    useEffect(() => {
        props.ticket?.used && alert("Just so you know, this ticket has already been used.");
    }, []);
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-75 m-3'>
                <CardBody className='text-start'>
                    <h5>Ticket Information:</h5>
                    <div>Ticket: {props.ticket.ticketNumber}</div>
                    <div>Price: {props.ticket.price}</div>
                    <div>Event: {props.ticket.eventName}</div>
                    <div>Type: {props.ticket.ticketTypeName}</div>
                    <div>Used: {props.ticket.used ? 'Used' : 'Unused'}</div>
                </CardBody>
            </Card>
        </Container>
    );
}