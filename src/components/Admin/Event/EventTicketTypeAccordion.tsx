import React, { useState } from 'react';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ITicketType } from '../../../types/ticketType';

interface EventTicketTypeAccordionProps {
    selectedTicketTypes: object[];
    setSelectedTicketTypes: (selectedTicketTypes: object[]) => void;
    ticketTypes: ITicketType[];

}

export default function EventTicketTypeAccordion(props: EventTicketTypeAccordionProps) {
    const { selectedTicketTypes, setSelectedTicketTypes, ticketTypes } = props;
    const [open, setOpen] = useState<string>('');

    const toggleAccordion = (id: string) => {
        setOpen(id === open ? '' : id);
    };

    const addAccordion = () => {
        const newAccordion = {
            id: (selectedTicketTypes.length + 1).toString(),
            ticketTypeId: '',
            price: '',
            ticketQuantity: '',
        };
        setSelectedTicketTypes([...selectedTicketTypes, newAccordion]);
        setOpen(newAccordion.id);
    };

    const deleteAccordion = (id: string) => {
        setSelectedTicketTypes(selectedTicketTypes.filter((accordion) => accordion.id !== id));
        if (id === open) {
            setOpen('');
        }
    };

    const handleTicketTypeChange = (id: string, value: string) => {
        setSelectedTicketTypes(
            selectedTicketTypes.map((accordion) =>
                accordion.id === id
                    ? { ...accordion, ticketTypeId: value }
                    : accordion
            )
        );
    };

    const handlePriceChange = (id: string, value: string) => {
        setSelectedTicketTypes(
            selectedTicketTypes.map((accordion) =>
                accordion.id === id
                    ? { ...accordion, price: value }
                    : accordion
            )
        );
    }

    const handleQuantityChange = (id: string, value: string) => {
        setSelectedTicketTypes(
            selectedTicketTypes.map((accordion) =>
                accordion.id === id
                    ? { ...accordion, ticketQuantity: value }
                    : accordion
            )
        );
    }

    const getTicketTypeName = (ticketTypeId: number) => {
        const ticketType = ticketTypes.find(
            (type) => Number(type?.ticketTypeId) === Number(ticketTypeId)
        );
        return ticketType ? ticketType.ticketTypeName : '';
    }

    return (
        <div>
            <Button color="success" outline block className="mb-2" onClick={addAccordion}>
                Add Ticket Type
            </Button>
            <Accordion open={open} toggle={toggleAccordion}>
                {selectedTicketTypes.map((accordion, index) => (
                    <AccordionItem key={accordion.id ?? accordion.ticketTypeId}>
                        <AccordionHeader targetId={accordion.id ?? accordion.ticketTypeId}>
                            <div className="d-flex justify-content-between align-items-center w-100 me-3">
                                <span>Type: {getTicketTypeName(accordion.ticketTypeId)}, Price: {accordion.price}€,  Quantity: {accordion.ticketQuantity}pcs</span>
                                <div
                                    className="btn btn-outline-danger btn-sm ms-3"
                                    role="button"
                                    onClick={() => deleteAccordion(accordion.id)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </div>
                        </AccordionHeader>
                        <AccordionBody accordionId={accordion.id ?? accordion.ticketTypeId}>
                            <FormGroup className="mb-1 px-2 text-start">
                                <Input
                                    type="select"
                                    id={`ticketType-${accordion.id ?? accordion.ticketTypeId}`}
                                    value={accordion.ticketTypeId}
                                    onChange={(e) =>
                                        handleTicketTypeChange(accordion.id, e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Ticket Type
                                    </option>
                                    {ticketTypes.map((type) => (
                                        <option key={type.ticketTypeId} value={type.ticketTypeId}>
                                            {type.ticketTypeName}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup className="mb-1 px-2 text-start">
                                <Input
                                    type="number"
                                    id="price"
                                    value={accordion.price}
                                    placeholder='Price'
                                    onChange={(e) =>
                                        handlePriceChange(accordion.id, e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="mb-1 px-2 text-start">

                                <Input
                                    type="number"
                                    id="quantity"
                                    value={accordion.ticketQuantity}
                                    placeholder='Quantity'
                                    onChange={(e) =>
                                        handleQuantityChange(accordion.id, e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}