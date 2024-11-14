import {useEffect, useState} from "react";
import {getEvents} from "../../utils/api.ts";
import {IEvent} from "../../types/event.ts";
import GenericList from "../utils/GenericList.ts.tsx";

interface EventsCarouselProps {

}

export default function EventsCarousel() {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getEvents(setEvents);
    }, []);

    const handleEventClick = (event: IEvent) => {
        console.log('Event clicked:', event);
        // Handle event click, e.g., navigate to a ticket page
    };

    return (
        <GenericList<IEvent>
            items={events}
            renderItem={(event) => (
                <>
                    <div>Event: {event.eventName}</div>
                    <div>Total Tickets: {event.totalTickets}</div>
                </>
            )} onItemClick={handleEventClick}
            buttonClassName={"rounded-pill p-4 mb-2 m-1"}
            listAsRowClassName={"d-flex flex-row overflow-auto p-0"}
            buttonColor="success"
            title="Upcoming Events"
        />
    );
}