import { Container, Card, CardBody, Button, Table } from 'reactstrap';
import { formatDate, formatTime } from "../../../utils/date.ts";
import React from "react";
import { ISale } from "../../../types/sale.ts";
import { QRCodeSVG } from 'qrcode.react';
import { IEvent } from '../../../types/event.ts';
import { IEventTicketType } from '../../../types/eventTicketType.ts';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

interface ProofOfSaleProps {
    sale: ISale;
    event: IEvent;
    toggleModal?: () => void;
}

export default function ProofOfSale(props: ProofOfSaleProps) {
    const {sale, event, toggleModal} = props;

    const getTicketTypeName = (ticketTypeId: number): string => {
        const ticketType = event.eventTicketTypes.find(
            (type: IEventTicketType) => type.ticketTypeId === ticketTypeId
        );
        return (ticketType?.ticketTypeName) || "Ticket Type not found";
    };

    const handlePrint = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
    
        for (let i = 0; i < sale.tickets.length; i++) {
            const ticket = sale.tickets[i];
    
            // Luo QR-koodi Data URL-muodossa
            const qrCodeDataUrl = await QRCode.toDataURL(ticket.ticketNumber || "defaultValue", { width: 150 });
    
            if (i > 0) {
                pdf.addPage();
            }
    
            const startY = 100; // Aloituskorkeus (Voi vaihtaa jos tuntuu siltä, että joku näyttää paremmalta)
            const linespace = 7; // Riviväli
            pdf.setFontSize(18);
            pdf.setFont('Helvetica','bold') // Boldaa nimi ja tyyppi
            pdf.text(`${event.eventName} - ${getTicketTypeName(ticket.ticketTypeId)}`, pageWidth / 2, startY, { align: 'center' });
            pdf.setFont('Helvetica','italic') // Laita italic
    
            // Luodaan qr koodi nyt
            const qrCodeWidth = 50; // QR kokomääritts tänne
            const qrCodeX = (pageWidth - qrCodeWidth) / 2;
            const qrCodeY = startY + 10;
            pdf.addImage(qrCodeDataUrl, 'PNG', qrCodeX, qrCodeY, qrCodeWidth, qrCodeWidth);
    
            // Loput kamat sitten qr alle väliä 10
            pdf.setFontSize(14);
            const textYStart = qrCodeY + qrCodeWidth + 10;
    
            pdf.text(`${ticket.ticketNumber}`, pageWidth / 2, textYStart, { align: 'center' });
            pdf.text(`Location: ${event.location}`, pageWidth / 2, textYStart + linespace, { align: 'center' });
            pdf.text(`Event Date: ${formatDate(event.eventDate)}`, pageWidth / 2, textYStart + linespace * 2, { align: 'center' });
        }
    
        // Tehdyt pdf avataan uudessa ikkunassa, josta ne voi sitten tulostaa
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
    };

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
                className="wider-card w-100 m-3"
                style={{
                    maxWidth: '1000px',
                    width: '90%',
                    margin: '0 auto',
                }}
            >
                <CardBody className="text-start">
                    <div className='hide-on-print'>
                        <h5 className="text-center">Transaction - {props.sale.saleId}</h5>
                        <div>Payment method: {props.sale.paymentMethod}</div>
                        <div>Total tickets: {props.sale.tickets?.length}</div>
                        <div>Total Price: {props.sale.totalPrice}</div>
                        <div>{`Date: ${formatDate(props.sale.saleTimestamp)}`}</div>
                        <div>{`Time: ${formatTime(props.sale.saleTimestamp)}`}</div>
                        <h6 className="text-center">Bought Tickets:</h6>
                    </div>
                    <div className="tickets-container mt-4">
                        {sale.tickets?.map((ticket, i) => (
                            <div key={i} className="ticket-item" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
                                <div className="ticket-content text-center">
                                    <h6 className="fw-bold">{event.eventName} - {getTicketTypeName(ticket.ticketTypeId)}</h6>
                                    <div className="p-3">
                                        <QRCodeSVG value={ticket.ticketNumber || "defaultValue"} size={150} level="L" />
                                    </div>
                                    <p className="italic">{formatDate(event.eventDate)} - {event.location}</p>
                                    <Table bordered responsive className="mt-3">
                                        <thead>
                                            <tr>
                                                <th className="p-2 text-center align-middle">Ticket code</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="p-2 text-center align-middle">{ticket.ticketNumber}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
            <div className="d-flex justify-content-around mt-4" style={{gap:'50px'}}>
                <Button color="danger" onClick={toggleModal}>
                    Back
                </Button>
                <Button color="success" onClick={handlePrint}>
                    Print
                </Button>
            </div>
        </Container>
    );
}
