import React, {useEffect, useState} from "react";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {IEvent} from "../../../types/event.ts";
import moment from "moment/moment";

interface CreateOrEditEventFormProps {
    eventToEdit?: IEvent;
    onSubmit: (event: IEvent) => void;
    toggleModal: () => void;
}

// TODO: Pitäisikö liiptyypit joko luoda erillään tai olla valmiiksi tietokantaan luotuna?

export default function CreateOrEditEventForm(props: CreateOrEditEventFormProps) {
    const [event, setEvent] = useState<IEvent>({
        eventName: "",
        eventDate: moment().format("YYYY-MM-DD"),
        location: "",
        totalTickets: 0,
        availableTickets: 0,
        eventTicketTypes: [],
        ...props.eventToEdit,
    });

    useEffect(() => {
        if (props.eventToEdit) {
            setEvent({
                ...props.eventToEdit,
                eventDate: moment(props.eventToEdit.eventDate).format("YYYY-MM-DD")
            });
        }
    }, [props.eventToEdit]);


    return (
        <Form onSubmit={() => {
        }}>
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
            <hr className="my-4"/>
            <div className="d-flex justify-content-around mt-4">
                <Button color="danger" onClick={props.toggleModal}>
                    Cancel
                </Button>
                <Button type="submit" color="success">
                    Create
                </Button>
            </div>
        </Form>
    );
}