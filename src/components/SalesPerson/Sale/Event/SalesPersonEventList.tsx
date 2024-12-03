import {IEvent} from "../../../../types/event.ts";
import GenericList from "../../../utils/GenericList.tsx";
import {formatDate} from "../../../../utils/date.ts";

interface EventsCarouselProps {
    events: IEvent[];
    handleEventClick: (event: IEvent) => void;
}

export default function SalesPersonEventList(props: EventsCarouselProps) {
    // tulevat tapahtumat Salespersoneille
        const futureEvents = props.events.filter(event => {
        const eventDate = new Date(event.eventDate!);
        return eventDate > new Date();
    });

    return (
        <GenericList<IEvent>
            items={futureEvents}
            renderItem={(event) => (
                <>
                    <div>Event: {event.eventName}</div>
                    <div>Available Tickets: {event.availableTickets}</div>
                    <div>Date: {formatDate(event.eventDate)}</div>
                    <div>Location: {event.location}</div>
                </>
            )}
            onItemClick={props.handleEventClick}
            buttonClassName={"p-4 mb-2 m-1"}
            listAsRowClassName={"d-flex overflow-auto p-0"}
            buttonColor="success"
            title="Upcoming Events"
        />
    );
}