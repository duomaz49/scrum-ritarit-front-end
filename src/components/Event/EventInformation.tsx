import {Container, Card, CardBody, Table, Button} from 'reactstrap';
import {IEvent} from "../../types/event.ts";
import {formatDate, formatTime} from "../../utils/date.ts";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ITicketType} from "../../types/tickettype.ts";

interface EventsInformationProps {
    event: IEvent;
    onBuyTicket: (ticketType: string, price: ITicketType) => void;
}

export default function EventsInformation(props: EventsInformationProps) {
    const handleBuyClick = (ticketType: string, price: ITicketType) => {
        props.onBuyTicket(ticketType, price);
    };
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className="w-auto m-3 p-2">
                <CardBody className="text-start">
                    <h6>{`Event: ${props.event.eventName}`}</h6>
                    <div>{`Location: ${props.event.location}`}</div>
                    <div>{`Date: ${formatDate(props.event.eventDate)}`}</div>
                    <div>{`Time: ${formatTime(props.event.eventDate)}`}</div>
                </CardBody>
            </Card>

            <Table className="mt-2" bordered hover responsive>
                <thead>
                <tr>
                    <th className="p-2">Ticket Type</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {props.event.ticketTypes && Object.entries(props.event.ticketTypes).length > 0 ? (
                    Object.entries(props.event.ticketTypes).map(([key, value], index) => (
                        <tr key={index}>
                            <td className="p-2">{key}</td>
                            <td className="p-2">{value}</td>
                            <td className="p-2">
                                <Button
                                    color="success"
                                    outline
                                    onClick={() => handleBuyClick(key, value)}
                                >
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No ticket types available</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
}