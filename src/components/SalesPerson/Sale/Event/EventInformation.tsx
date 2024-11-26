import React, {useEffect, useState} from 'react';
import {Container, Card, CardBody, Table, Button, Input, Label, FormGroup} from 'reactstrap';
import {IEvent} from "../../../../types/event.ts";
import {formatDate, formatTime} from "../../../../utils/date.ts";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IEventTicketType} from "../../../../types/eventTicketType.ts";
import {getPaymentMethods} from "../../../../utils/api.ts";
import {IPaymentMethod} from "../../../../types/paymentMethod.ts";

interface EventsInformationProps {
    event: IEvent;
    onBuyTicket: (saleData: object) => void;
}

export default function EventsInformation(props: EventsInformationProps) {
    const [selectedTicketType, setSelectedTicketType] = useState<IEventTicketType | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<IPaymentMethod>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[] | null>(null);

    useEffect(() => {
        getPaymentMethods(setPaymentMethods)
    }, []);

    const handleConfirmBuy = (eventTicketType: IEventTicketType) => {
        setSelectedTicketType(eventTicketType);
    }

    const handleSubmit = () => {
        if (selectedTicketType) {
            const saleData = {
                userId: Number(localStorage.getItem('userId')),
                paymentMethodId: selectedPaymentMethod.id,
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
            <Card className="w-100 m-3 p-2">
                <CardBody className="text-start">
                    <h6>{`Event: ${props.event.eventName}`}</h6>
                    <div>{`Location: ${props.event.location}`}</div>
                    <div>{`Date: ${formatDate(props.event.eventDate)}`}</div>
                    <div>{`Time: ${formatTime(props.event.eventDate)}`}</div>
                    <hr className="my-4"/>
                    {props.event.eventTicketTypes && props.event.eventTicketTypes.length > 0 ? (
                        <Table className="mt-2" bordered hover responsive>
                            <thead>
                            <tr>
                                <th className="p-2 text-center">Ticket Type</th>
                                <th className="p-2 text-center">Price</th>
                                <th className="p-2 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.event.eventTicketTypes.map((obj) => (
                                <tr key={obj.ticketTypeId}>
                                    <td className="p-2 text-center">{obj.ticketTypeName}</td>
                                    <td className="p-2 text-center">{obj.price}</td>
                                    <td className="p-2 text-center">
                                        <Button
                                            color="success"
                                            onClick={() => handleConfirmBuy(obj)}
                                        >
                                            <FontAwesomeIcon icon={faCreditCard}/>
                                        </Button>
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
            {selectedTicketType && (
                <Card className="w-100 m-3 p-2">
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
                        {paymentMethods.map((paymentMethod) => (
                            <FormGroup key={paymentMethod.id} check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="paymentMethod"
                                        value={paymentMethod.name}
                                        onChange={(e) => setSelectedPaymentMethod(paymentMethod)}
                                    />
                                    {paymentMethod.name}
                                </Label>
                            </FormGroup>
                        ))}
                        <div className="d-flex justify-content-around mt-4">
                            <Button id="modal-cancel" color="danger" onClick={() => setSelectedTicketType(null)}>
                                Back
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