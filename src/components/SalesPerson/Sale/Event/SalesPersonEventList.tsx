import { IEvent } from "../../../../types/event.ts";
import GenericList from "../../../utils/GenericList.tsx";
import { formatDate } from "../../../../utils/date.ts";

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
                    <div><b>Event:</b> {event.eventName}</div>
                    <div><b>Date: </b>{formatDate(event.eventDate)}</div>
                    <div><b>Location: </b>{event.location}</div>
                    {event.eventTicketTypes?.length ? (
                        <>
                            <div><b>Available tickets:</b></div>
                            {event.eventTicketTypes.map((ticketType) => (
                                <div key={ticketType.eventTicketTypeId}>
                                    {ticketType.ticketTypeName}: {ticketType.price} €, {ticketType.ticketQuantity} tickets left
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>No ticket types available.</div>
                    )}
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