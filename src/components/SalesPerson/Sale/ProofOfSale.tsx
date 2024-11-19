import {Container, Card, CardBody, Button, Table} from 'reactstrap';
import {formatDate, formatTime} from "../../../utils/date.ts";
import React, {useEffect, useState} from "react";
import {ISale} from "../../../types/sale.ts";
import './ProofOfSalePrint.css';
import { QRCodeSVG } from 'qrcode.react';
import { IEvent } from '../../../types/event.ts';

interface ProofOfSaleProps {
    sale: ISale;
    event: IEvent;
    toggleModal?: () => void;
}

export default function ProofOfSale(props: ProofOfSaleProps) {
    const [isPrinting, setIsPrinting] = useState(false);

    const handlePrint = () => {
        setIsPrinting(true);
        window.print();
    };

    const afterPrint = () => {
        setIsPrinting(false);
    };

    useEffect(() => {
        window.onafterprint = afterPrint;
        return () => {
            window.onafterprint = null;
        };
    }, []);

    return (
        <Container
            className="text-center d-flex flex-column align-items-center justify-content-center"
            style={{
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            <Card
                className="wider-card w-100 m-3 print-overlay"
                style={{
                    maxWidth: '1000px',
                    width: '90%',
                    margin: '0 auto',
                }}
            >
                <CardBody className="text-start">
                    <h5 className="text-center">Transaction - {props.sale.saleId}</h5>
                    <div>Payment method: {props.sale.paymentMethod}</div>
                    <div>Total tickets: {props.sale.tickets?.length}</div>
                    <div>Total Price: {props.sale.totalPrice}</div>
                    <div>{`Date: ${formatDate(props.sale.saleTimestamp)}`}</div>
                    <div>{`Time: ${formatTime(props.sale.saleTimestamp)}`}</div>
                    <h6 className="text-center">Bought Tickets:</h6>
                    <Table className="mt-2" bordered hover responsive>
                        <thead>
                            <tr>
                                <th className="p-2 text-center align-middle">Qr code</th>
                                <th className="p-2 text-center align-middle">Ticket price</th>
                                <th className="p-2 text-center align-middle">Quantity</th>
                                <th className="p-2 text-center align-middle">Ticket code</th>
                            </tr>
                        </thead>
                        {props.sale.tickets?.map((ticket, i) => (
                            <tbody key={i}>
                                <tr>
                                    <td className="p-2 text-center">
                                        <QRCodeSVG
                                            value={ticket.ticketNumber || "defaultValue"}
                                            size={80}
                                            level="L"
                                        />
                                    </td>
                                    <td className="p-2 text-center align-middle">{ticket.price}</td>
                                    <td className="p-2 text-center align-middle">{ticket.quantity}</td>
                                    <td className="p-2 text-center align-middle">{ticket.ticketNumber}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-around mt-4 hide-on-print">
                        <Button color="danger" onClick={props.toggleModal}>
                            Back
                        </Button>
                        <Button color="success" onClick={handlePrint}>
                            Print
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}