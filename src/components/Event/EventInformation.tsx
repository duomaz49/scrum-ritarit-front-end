import {Container, Card, CardBody} from 'reactstrap';
import {IEvent} from "../../types/event.ts";
import {formatDate, formatTime} from "../../utils/date.ts";

interface EventsInformationProps {
    event: IEvent
}

export default function EventsInformation(props: EventsInformationProps) {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h6>{`Event: ${props.event.eventName}`}</h6>
                    <div>{`Location: ${props.event.location}`}</div>
                    <div>{`Date: ${formatDate(props.event.eventDate)}`}</div>
                    <div>{`Time: ${formatTime(props.event.eventDate)}`}</div>
                </CardBody>
            </Card>
        </Container>
    );
}