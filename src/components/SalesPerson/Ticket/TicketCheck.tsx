import {Container, Card, CardBody, Button, Row, Col} from 'reactstrap';
import SearchBar from "../../utils/SearchBar.tsx";
import { useState} from "react";
import TicketConfirmModal from "./TicketConfirmModal.tsx";
import {getTicket, markTicketUnused, markTicketUsed} from "../../../utils/api.ts";
import {ITicket} from "../../../types/ticket.ts";
import QrReader from "./QRCodeScanner.tsx";


export default function TicketCheck() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [ticket, setTicket] = useState<ITicket>({});
    const [isTicketConfirmationModalOpen, setIsTicketConfirmModalOpen] = useState<boolean>(false);
    const [isTicketUndoModalOpen, setIsTicketUndoModalOpen] = useState<boolean>(false);
    const [scannedText, setScannedText] = useState<string | null>(null);

    const toggleTicketConfirmModal = () => {
        setIsTicketConfirmModalOpen(!isTicketConfirmationModalOpen);
    }

    const toggleTicketUndoModal = () => {
        setIsTicketUndoModalOpen(!isTicketUndoModalOpen);
    }
    const handleScanSuccess = (decodedText: string) => {
        setScannedText(decodedText);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="d-flex flex-column align-items-center justify-content-center w-100">
                <Col xs="12" sm="6" md="6" className="mb-4 d-flex justify-content-center">
                    <Card className="w-100 card-no-border p-2">
                        <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                            <QrReader onScanSuccess={handleScanSuccess}/>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" sm="6" md="6" className="mb-4 d-flex justify-content-center">
                    <Card className="w-100 card-no-border p-2">
                        <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                            <h3 className="mt-4 mb-4">Enter a ticket number:</h3>
                            <SearchBar
                                width={"w-50"}
                                onSearch={setSearchQuery}
                            />
                            <Button
                                onClick={() => getTicket(searchQuery, setTicket, toggleTicketConfirmModal, toggleTicketUndoModal)}
                                className="mt-4"
                                outline
                                color="success"
                            >
                                Check Ticket
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {!ticket.used && <TicketConfirmModal
                isModalOpen={isTicketConfirmationModalOpen}
                toggleModal={toggleTicketConfirmModal}
                title="Confirm ticket usage"
                message="Are you sure you want to mark this ticket as used?"
                confirmText="Yes"
                cancelText="No"
                ticket={ticket}
                onConfirm={() => markTicketUsed(searchQuery, toggleTicketConfirmModal)}
            />}
            {ticket.used && <TicketConfirmModal
                isModalOpen={isTicketUndoModalOpen}
                toggleModal={toggleTicketUndoModal}
                title="Undo ticket usage"
                message="Are you sure you want to undo the ticket, it will be usable again!"
                confirmText="Yes"
                cancelText="No"
                ticket={ticket}
                onConfirm={() => markTicketUnused(searchQuery, toggleTicketUndoModal)}
            />}
        </Container>
    );
}