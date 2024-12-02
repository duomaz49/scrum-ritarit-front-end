import {Container, Card, CardBody, Button, Row, Col} from 'reactstrap';
import SearchBar from "../../utils/SearchBar.tsx";
import React, {useState} from "react";
import TicketConfirm from "./TicketConfirm.tsx";
import {getTicket, markTicketUnused, markTicketUsed} from "../../../utils/api.ts";
import {ITicket} from "../../../types/ticket.ts";
import QrReader from "./QRCodeScanner.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import {useNavigate} from "react-router-dom";

export default function TicketCheck() {
    const navigate = useNavigate();
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

    const handleScanSuccess = (ticketNumber: string) => {
        getTicket(ticketNumber, setTicket, toggleTicketConfirmModal, toggleTicketUndoModal)
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card className="w-100 card-no-border p-2">
                <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                    <h4 className="text-center mb-3">Validate customer tickets</h4>
                    <Row className="w-100">
                        <Col xs="12" sm="6" md="6" lg="6" xl="6" className="mb-4 d-flex justify-content-center">
                            <Card className="w-100 card-no-border p-2">
                                <CardBody
                                    className="text-center d-flex flex-column align-items-center justify-content-center">
                                    <QrReader onScanSuccess={handleScanSuccess}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="6" lg="6" xl="6" className="mb-4 d-flex justify-content-center">
                            <Card className="w-100 card-no-border p-2">
                                <CardBody
                                    className="text-center d-flex flex-column align-items-center justify-content-center">
                                    <h3 className="mt-4 mb-4">Enter a ticket number:</h3>
                                    <SearchBar
                                        query={searchQuery}
                                        setQuery={setSearchQuery}
                                        width={"w-50"}
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
                    <Button color="warning" block className="mb-2" onClick={() => navigate('/user')}>Go back</Button>
                </CardBody>
            </Card>
            {!ticket.used &&
                <OverlayComponent
                    isOpen={isTicketConfirmationModalOpen}
                    toggle={toggleTicketConfirmModal}
                    title="Confirm ticket usage"
                >
                    <TicketConfirm
                        toggleModal={toggleTicketConfirmModal}
                        message="Are you sure you want to mark this ticket as used?"
                        confirmText="Yes"
                        cancelText="No"
                        ticket={ticket}
                        onConfirm={() => markTicketUsed(searchQuery, toggleTicketConfirmModal)}
                    />
                </OverlayComponent>
            }
            {ticket.used &&
                <OverlayComponent
                    isOpen={isTicketUndoModalOpen}
                    toggle={toggleTicketUndoModal}
                    title="Undo ticket usage"
                >
                    <TicketConfirm
                        toggleModal={toggleTicketUndoModal}
                        message="Are you sure you want to undo the ticket, it will be usable again!"
                        confirmText="Yes"
                        cancelText="No"
                        ticket={ticket}
                        onConfirm={() => markTicketUnused(searchQuery, toggleTicketUndoModal)}
                    />
                </OverlayComponent>
            }
        </Container>
    );
}