import {IEvent} from "../../../../types/event.ts";
import GenericList from "../../../utils/GenericList.tsx";

interface EventsCarouselProps {
    events: IEvent[];
    handleEventClick: (event: IEvent) => void;
}

export default function EventsList(props: EventsCarouselProps) {
    return (
        <GenericList<IEvent>
            items={props.events}
            renderItem={(event) => (
                <>
                    <div>Event: {event.eventName}</div>
                    <div>Total Tickets: {event.totalTickets}</div>
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