import {useEffect, useState} from "react";
import {getEvents} from "../../utils/api.ts";
import {IEvent} from "../../types/event.ts";
import GenericList from "../utils/GenericList.ts.tsx";

interface EventsCarouselProps {
    handleEventClick: (event: IEvent) => void;
}

export default function Events(props: EventsCarouselProps) {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getEvents(setEvents);
    }, []);

    return (
        <GenericList<IEvent>
            items={events}
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