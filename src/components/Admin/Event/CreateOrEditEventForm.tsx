import React, {useEffect, useState} from "react";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {IEvent} from "../../../types/event.ts";
import moment from "moment/moment";
import EventTicketTypeAccordion from "./EventTicketTypeAccordion.tsx";
import {ITicketType} from "../../../types/ticketType.ts";
import {createEvent, editEvent, getEvents, getTicketTypes} from "../../../utils/api.ts";

interface CreateOrEditEventFormProps {
    eventToEdit?: IEvent;
    setEvents?: (events: IEvent[]) => void;
    toggleModal: () => void;
}

export default function CreateOrEditEventForm(props: CreateOrEditEventFormProps) {
    const [ticketTypes, setTicketTypes] = useState<ITicketType[]>([]);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState<object[]>([]);
    const [event, setEvent] = useState<IEvent>({
        eventName: "",
        eventDate: moment().format("YYYY-MM-DD"),
        location: "",
        totalTickets: 0,
        availableTickets: 0,
        ...props.eventToEdit,
    });

    useEffect(() => {
        getTicketTypes(setTicketTypes);
    }, []);

    useEffect(() => {
        if (props.eventToEdit) {
            setEvent({
                ...props.eventToEdit,
                eventDate: moment(props.eventToEdit.eventDate).format("YYYY-MM-DD"),
            });
            if (props.eventToEdit.eventTicketTypes) {
                setSelectedTicketTypes(
                    props.eventToEdit.eventTicketTypes.map((ticketType) => ({
                        ticketTypeId: ticketType.ticketTypeId?.toString(),
                        price: ticketType.price?.toString(),
                        ticketQuantity: ticketType.ticketQuantity?.toString(),
                    }))
                );
            }
        }
    }, [props.eventToEdit]);

    const onSubmit = (e) => {
        const eventTicketTypes = selectedTicketTypes.map(({ticketTypeId, price, ticketQuantity}) => ({
            ticketTypeId: Number(ticketTypeId),
            price: Number(price),
            ticketQuantity: Number(ticketQuantity),
        }));

        const eventData = {
            ...event,
            eventId: props.eventToEdit?.eventId ?? null,
            userId: localStorage.getItem('userId'),
            eventTicketTypes,
        };
        e.preventDefault();
        if (props.eventToEdit) {
            editEvent(eventData, props.toggleModal);
        } else {
            createEvent(eventData, props.toggleModal);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="name" className="form-label p-1">
                    Event Name
                </Label>
                <Input
                    type="text"
                    id="name"
                    value={event.eventName}
                    placeholder='Event name'
                    required
                    onChange={(e) => setEvent({...event, eventName: e.target.value})}
                />
            </FormGroup>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="date" className="form-label p-1">
                    Event Date
                </Label>
                <Input
                    type="date"
                    id="date"
                    value={event.eventDate}
                    placeholder='Event date'
                    required
                    onChange={(e) => setEvent({...event, eventDate: e.target.value})}
                />
            </FormGroup>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="location" className="form-label p-1">
                    Location
                </Label>
                <Input
                    type="text"
                    id="location"
                    value={event.location}
                    placeholder='Location'
                    required
                    onChange={(e) => setEvent({...event, location: e.target.value})}
                />
            </FormGroup>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="totalTickets" className="form-label p-1">
                    Total Tickets
                </Label>
                <Input
                    type="number"
                    id="totalTickets"
                    value={event.totalTickets}
                    placeholder='Total tickets'
                    required
                    onChange={(e) => setEvent({...event, totalTickets: parseInt(e.target.value)})}
                />
            </FormGroup>
            <FormGroup className="mb-1 px-2 text-start">
                <Label for="availableTickets" className="form-label p-1">
                    Available Tickets
                </Label>
                <Input
                    type="number"
                    id="availableTickets"
                    value={event.availableTickets}
                    placeholder='Available tickets'
                    required
                    onChange={(e) => setEvent({...event, availableTickets: parseInt(e.target.value)})}
                />
            </FormGroup>
            <EventTicketTypeAccordion
                create={!props.eventToEdit}
                ticketTypes={ticketTypes}
                selectedTicketTypes={selectedTicketTypes}
                setSelectedTicketTypes={setSelectedTicketTypes}/>
            <hr className="my-4"/>
            <div className="d-flex justify-content-around mt-4">
                <Button color="danger" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button type="submit" color="success">
                    {props.eventToEdit ? 'Save' : 'Create'}
                </Button>
            </div>
        </Form>
    );
}