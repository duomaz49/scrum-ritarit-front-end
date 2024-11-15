import {Container, Card, CardBody, Button, Table} from 'reactstrap';
import {formatDate, formatTime} from "../../../utils/date.ts";
import React, {useEffect, useState} from "react";
import {ISale} from "../../../types/sale.ts";
import './ProofOfSalePrint.css';

interface ProofOfSaleProps {
    sale: ISale;
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
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className="w-100 m-3 print-overlay">
                <CardBody className="text-start">
                    <h5 className="text-center">OSTOTAPAHUTMA - {props.sale.saleId}</h5>
                    <div>Payment method: {props.sale.paymentMethod}</div>
                    <div>Total tickets: {props.sale.tickets?.length}</div>
                    <div>Total Price: {props.sale.totalPrice}</div>
                    <div>{`Date: ${formatDate(props.sale.saleTimestamp)}`}</div>
                    <div>{`Time: ${formatTime(props.sale.saleTimestamp)}`}</div>
                    <h6 className="text-center">Bought Tickets:</h6>
                    <Table className="mt-2" bordered hover responsive>
                        <thead>
                        <tr>
                            <th className="p-2 text-center">Ticket price</th>
                            <th className="p-2 text-center">Ticket quantity</th>
                            <th className="p-2 text-center">Ticket number</th>
                        </tr>
                        </thead>
                        {props.sale.tickets?.map((ticket, i) => (
                            <tbody key={i}>
                            <tr>
                                <td className="p-2 text-center">{ticket.price}</td>
                                <td className="p-2 text-center">{ticket.quantity}</td>
                                <td className="p-2 text-center">{ticket.ticketNumber}</td>
                            </tr>
                            </tbody>
                        ))}
                    </Table>
                    <div className="d-flex justify-content-around mt-4">
                        <Button className="hide-on-print" color="danger" onClick={props.toggleModal}>
                            Back
                        </Button>
                        <Button className="hide-on-print" color="success" onClick={handlePrint}>
                            Print
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}