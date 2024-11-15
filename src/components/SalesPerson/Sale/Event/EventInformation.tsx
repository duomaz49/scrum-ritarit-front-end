import React, { useState } from 'react';
import { Container, Card, CardBody, Table, Button, Input, Label, FormGroup } from 'reactstrap';
import { IEvent } from "../../../../types/event.ts";
import { formatDate, formatTime } from "../../../../utils/date.ts";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IEventTicketType } from "../../../../types/eventTicketType.ts";

interface EventsInformationProps {
    event: IEvent;
    onBuyTicket: (saleData: object) => void;
}

export default function EventsInformation(props: EventsInformationProps) {
    const [selectedTicketType, setSelectedTicketType] = useState<IEventTicketType | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');
    const handleConfirmBuy = (eventTicketType: IEventTicketType) => {
        setSelectedTicketType(eventTicketType);
    };

    const handleSubmit = () => {
        if (selectedTicketType) {
            const saleData= {
                userId: 1,
                paymentMethod: paymentMethod,
                tickets: [
                    {
                        eventId: selectedTicketType.eventId,
                        ticketTypeId: selectedTicketType.ticketTypeId,
                        quantity: quantity,
                        used: false
                    }
                ]
            }
            props.onBuyTicket(saleData);
            setSelectedTicketType(null);
        }
    };

    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className="w-auto m-3 p-2">
                <CardBody className="text-start">
                    <h6>{`Event: ${props.event.eventName}`}</h6>
                    <div>{`Location: ${props.event.location}`}</div>
                    <div>{`Date: ${formatDate(props.event.eventDate)}`}</div>
                    <div>{`Time: ${formatTime(props.event.eventDate)}`}</div>
                </CardBody>
            </Card>

            <Table className="mt-2" bordered hover responsive>
                <thead>
                <tr>
                    <th className="p-2">Ticket Type</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {props.event.eventTicketTypes?.map((obj) => (
                    <tr key={obj.ticketTypeId}>
                        <td className="p-2">{obj.ticketTypeName}</td>
                        <td className="p-2">{obj.price}</td>
                        <td className="p-2">
                            <Button
                                color="success"
                                onClick={() => handleConfirmBuy(obj)}
                            >
                                <FontAwesomeIcon icon={faCreditCard} />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {selectedTicketType && (
                <Card className="w-auto m-3 p-2">
                    <CardBody className="text-start">
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input
                                type="number"
                                id="quantity"
                                value={quantity}
                                min={1}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="paymentMethod">Payment Method</Label>
                            <Input
                                type="select"
                                id="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="Cash">Cash</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-between mt-4">
                            <Button id="modal-cancel" color="danger" onClick={() => setSelectedTicketType(null)}>
                                Cancel
                            </Button>
                            <Button color="success" onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </FormGroup>
                    </CardBody>
                </Card>
            )}
        </Container>
    );
}