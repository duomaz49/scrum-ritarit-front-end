import React, {useEffect, useState} from 'react'
import EventsList from "./../../SalesPerson/Sale/Event/EventsList.tsx";
import {IEvent} from "../../../types/event.ts";
import {getEvents} from "../../../utils/api.ts";
import GenericList from "../../utils/GenericList.ts.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import CreateOrEditEventForm from "./CreateOrEditEventForm.tsx";


export default function AdminEventsList() {
    const [isEditEventModalOpen, setIsEditEventModalOpen] = useState<boolean>(false);
    const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState<boolean>(false);
    const [isEventInfoModalOpen, setIsEventInfoModalOpen] = useState<boolean>(false);

    const [selectedEvent, setSelectedEvent] = useState<IEvent>(null);
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getEvents(setEvents);
    }, []);

    const handleEventClick = (event: IEvent, action: 'edit' | 'delete' | 'view') => {
        if (action === 'edit') {
            setSelectedEvent(event);
            setIsEditEventModalOpen(true);
        }
        if (action === 'delete') {
            setSelectedEvent(event);
            setIsDeleteEventModalOpen(true);
            }

         if (action === 'info') {
             setSelectedEvent(event);
             setIsEventInfoModalOpen(true);
        }

    };

    return (
        <>
            <GenericList<IEvent>
                isAdmin={true}
                items={events}
                renderItem={(event) => (
                    <>
                        <div>Event: {event.eventName}</div>
                        <div>Total Tickets: {event.totalTickets}</div>
                    </>
                )}
                onItemClick={handleEventClick}
                buttonClassName={"p-4 mb-2 m-1 text-start"}
                listAsRowClassName={"d-flex overflow-auto p-0"}
                buttonColor="success"
                title="All upcoming Events"
            />
            <OverlayComponent
                isOpen={isEditEventModalOpen}
                toggle={() => setIsEditEventModalOpen(!isEditEventModalOpen)}
                title='Edit event'
            >
                <CreateOrEditEventForm eventToEdit={selectedEvent} toggleModal={() => setIsEditEventModalOpen(!isEditEventModalOpen)}  onSubmit={() => {}}/>
            </OverlayComponent>
        </>

    );
}