import React, {useEffect, useState} from 'react'
import {IEvent} from "../../../types/event.ts";
import {deleteEvent, getEvents, getEventSummary} from "../../../utils/api.ts";
import GenericList from "../../utils/GenericList.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import CreateOrEditEventForm from "./CreateOrEditEventForm.tsx";
import DeleteConfirmation from "../../utils/DeleteConfirmation.tsx";
import SearchBar from "../../utils/SearchBar.tsx";
import EventStatistics from './EventStatistics.tsx';

interface AdminEventsListProps {
    shouldReFetch: boolean;
    setShouldReFetch: (shouldReFetch: boolean) => void;
}

export default function AdminEventsList(props: AdminEventsListProps) {
    const {shouldReFetch, setShouldReFetch} = props;
    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState<boolean>(false);
    const [isEventInfoModalOpen, setIsEventInfoModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent>(null);
    const [selectedEventSummary, setSelectedEventSummary] = useState(null);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        getEvents(setEvents);
    }, []);

    useEffect(() => {
        if (shouldReFetch) {
            getEvents(setEvents);
            setShouldReFetch(false);
        }
    }, [shouldReFetch]);

    const toggleDeleteEventModal = () => {
        setShouldReFetch(true);
        setIsDeleteEventModalOpen(!isDeleteEventModalOpen);
    }

    const toggleEventModal = () => {
        setShouldReFetch(true);
        setIsEventModalOpen(!isEventModalOpen);
    }

    const toggleEventInfoModal = () => {
        setShouldReFetch(true);
        setIsEventInfoModalOpen(!isEventInfoModalOpen)
    }

    const triggerDeleteEvent = () => {
        deleteEvent(selectedEvent.eventId, toggleDeleteEventModal)
    }

    const handleEventClick = (event: IEvent, action: 'edit' | 'delete' | 'info') => {
        if (action === 'edit') {
            setSelectedEvent(event);
            setIsEventModalOpen(true);
        }
        if (action === 'delete') {
            setSelectedEvent(event);
            setIsDeleteEventModalOpen(true);
        }

        if (action === 'info') {
            setSelectedEvent(event);
            getEventSummary(event.eventId, (data) => {
                setSelectedEventSummary(data)
                setIsEventInfoModalOpen(true)
            })
        }

    };

    const filterEvents = (query: string): IEvent[] => {
        return events.filter((event) => event.eventName?.toLowerCase().includes(query.toLowerCase()));
    }

    return (
        <>
            <SearchBar
                query={query}
                setQuery={setQuery}
                width="w-100"
                placeholder="Search events..."
            />
            <GenericList<IEvent>
                isAdmin={true}
                items={filterEvents(query)}
                renderItem={(event) => (
                    <>
                        <div>Event: {event.eventName}</div>
                        <div>Total Tickets: {event.totalTickets}</div>
                        <div>Available Tickets: {event.availableTickets}</div>
                    </>
                )}
                onItemClick={handleEventClick}
                buttonClassName={"p-4 mb-2 m-1 text-start"}
                listAsRowClassName={"d-flex overflow-auto p-0"}
                buttonColor="success"
                title="All Events"
            />
            <OverlayComponent
                isOpen={isEventModalOpen}
                toggle={toggleEventModal}
                title='Edit event'
            >
                <CreateOrEditEventForm
                    eventToEdit={selectedEvent}
                    toggleModal={toggleEventModal}
                    setEvents={setEvents}
                    setEvent={setSelectedEvent}
                />
            </OverlayComponent>
            <OverlayComponent
                isOpen={isDeleteEventModalOpen}
                toggle={toggleDeleteEventModal}
                title='Delete event'
            >
                <DeleteConfirmation
                    message="Click Yes to delete the event"
                    confirmText="Yes"
                    cancelText="No"
                    onConfirm={triggerDeleteEvent}
                    onCancel={toggleDeleteEventModal}/>
            </OverlayComponent>
            <OverlayComponent
                isOpen={isEventInfoModalOpen}
                toggle={toggleEventInfoModal}
                title="Event summary"
                >
                
                <EventStatistics event={selectedEvent} summary={selectedEventSummary}></EventStatistics>
            </OverlayComponent>
        </>

    );
}