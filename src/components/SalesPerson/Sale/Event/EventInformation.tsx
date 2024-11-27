import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, Table, Button, Input, Label, FormGroup } from 'reactstrap';
import { IEvent } from "../../../../types/event.ts";
import { formatDate, formatTime } from "../../../../utils/date.ts";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IEventTicketType } from "../../../../types/eventTicketType.ts";
import { getPaymentMethods } from "../../../../utils/api.ts";
import { IPaymentMethod } from "../../../../types/paymentMethod.ts";

interface EventsInformationProps {
    event: IEvent;
    onBuyTicket: (saleData: object) => void;
}

export default function EventsInformation(props: EventsInformationProps) {
    const [selectedTicketTypes, setSelectedTicketTypes] = useState<IEventTicketType[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<IPaymentMethod | null>(null);
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[] | null>(null);

    useEffect(() => {
        getPaymentMethods(setPaymentMethods);
    }, []);

    const handleQuantityChange = (ticketType: IEventTicketType, quantity: number) => {
        setSelectedTicketTypes((prev) => {
            const existing = prev.find((t) => t.ticketTypeId === ticketType.ticketTypeId);
            if (quantity > 0) {
                if (existing) {
                    // Update quantity if ticket type already exists
                    return prev.map((t) =>
                        t.ticketTypeId === ticketType.ticketTypeId ? { ...t, ticketQuantity: quantity } : t
                    );
                } else {
                    // Add new ticket type to the array with quantity
                    return [...prev, { ...ticketType, ticketQuantity: quantity }];
                }
            } else {
                // Remove ticket type if quantity is zero
                return prev.filter((t) => t.ticketTypeId !== ticketType.ticketTypeId);
            }
        });
    };

    const handleSubmit = () => {
        if (selectedTicketTypes.length > 0 && selectedPaymentMethod) {
            const tickets = selectedTicketTypes.map((ticketType) => ({
                eventId: ticketType.eventId,
                ticketTypeId: ticketType.ticketTypeId,
                quantity: ticketType.ticketQuantity,
                used: false
            }));

            const saleData = {
                userId: Number(sessionStorage.getItem('userId')),
                paymentMethodId: selectedPaymentMethod.id,
                tickets
            };

            props.onBuyTicket(saleData);
            setSelectedTicketTypes([]);
        }
    };

    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className="w-100 m-3 p-2">
                <CardBody className="text-start">
                    <h6>{`Event: ${props.event.eventName}`}</h6>
                    <div>{`Location: ${props.event.location}`}</div>
                    <div>{`Date: ${formatDate(props.event.eventDate)}`}</div>
                    <div>{`Time: ${formatTime(props.event.eventDate)}`}</div>
                    <hr className="my-4" />
                    {props.event.eventTicketTypes && props.event.eventTicketTypes.length > 0 ? (
                        <Table className="mt-2" bordered hover responsive>
                            <thead>
                            <tr>
                                <th className="p-2 text-center">Ticket Type</th>
                                <th className="p-2 text-center">Price</th>
                                <th className="p-2 text-center">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.event.eventTicketTypes.map((ticketType) => (
                                <tr key={ticketType.ticketTypeId}>
                                    <td className="p-2 text-center">{ticketType.ticketTypeName}</td>
                                    <td className="p-2 text-center">{ticketType.price}</td>
                                    <td className="p-2 text-center w-25">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={
                                                selectedTicketTypes.find(
                                                    (t) => t.ticketTypeId === ticketType.ticketTypeId
                                                )?.ticketQuantity || ''
                                            }
                                            onChange={(e) =>
                                                handleQuantityChange(ticketType, Number(e.target.value))
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="p-2 text-center">No ticket types available, please contact administrator</div>
                    )}
                </CardBody>
            </Card>
            {selectedTicketTypes.length > 0 && (
                <Card className="w-100 m-3 p-2">
                    <CardBody className="text-start">
                        <h6>Confirm Selection</h6>
                        {selectedTicketTypes.map((ticketType) => (
                            <div key={ticketType.ticketTypeId}>
                                {`${ticketType.ticketTypeName}: ${ticketType.ticketQuantity}`}
                            </div>
                        ))}
                        {paymentMethods &&
                            paymentMethods.map((paymentMethod) => (
                                <FormGroup key={paymentMethod.id} className="mt-2" check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="paymentMethod"
                                            value={paymentMethod.name}
                                            onChange={() => setSelectedPaymentMethod(paymentMethod)}
                                        />
                                        {paymentMethod.name}
                                    </Label>
                                </FormGroup>
                            ))}
                        <div className="d-flex justify-content-around mt-4">
                            <Button
                                id="modal-cancel"
                                color="danger"
                                onClick={() => setSelectedTicketTypes([])}
                            >
                                Clear Selection
                            </Button>
                            <Button color="success" onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}
        </Container>
    );
}