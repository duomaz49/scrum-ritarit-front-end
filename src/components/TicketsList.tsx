import { ITicket } from '../types/ticket.ts';
import { Container, Row, Col, Card, CardBody, Button, ListGroup } from 'reactstrap';
import SearchBar from "./SearchBar.tsx";
import { useEffect, useState } from "react";
import GenericModal from "./GenericModal.tsx";
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL, ENDPOINTS } from '../utils/constants';
import { getBasicAuthHeader } from "../utils/utils";

const apiUrlTickets = `${BASE_URL}${ENDPOINTS.TICKETS}`;
const username = 'john_doe';
const password = 'password123';

export default function TicketsList() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [isTicketConfirmationModalOpen, setIsTicketConfirmModalOpen] = useState<boolean>(false);
    const [isTicketUndoModalOpen, setIsTicketUndoModalOpen] = useState<boolean>(false);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const unUsedTickets = tickets.filter(ticket => !ticket.used);
    const usedTickets = tickets.filter(ticket => ticket.used);

    useEffect(() => {
        getTickets();
    }, []);

    const getTickets = () => {
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': getBasicAuthHeader(username, password),
            }
        };
        axios.get(apiUrlTickets, config)
            .then(response => {
                setTickets(response.data);
            })
            .catch(error => {
                console.error("Error fetching tickets:", error);
            });
    }

    const filterBySearch = (tickets: ITicket[]) => {
        return tickets.filter(ticket =>
            ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.used
        );
    };

    const toggleTicketConfirmModal = (ticketId?: number) => {
        if (ticketId) {
            setSelectedTicketId(ticketId);
        }
        setIsTicketConfirmModalOpen(!isTicketConfirmationModalOpen);
    }

    const toggleTicketUndoModal = (ticketId?: number) => {
        if (ticketId) {
            setSelectedTicketId(ticketId);
        }
        setIsTicketUndoModalOpen(!isTicketUndoModalOpen);
    }

    const markTicketUsed = () => {
        if (!selectedTicketId) {
            alert("Ticket ID is missing");
            return;
        }
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': getBasicAuthHeader(username, password),
            }
        };
        axios.put(`${apiUrlTickets}/id/${selectedTicketId}/use`, {}, config)
            .then(() => {
                getTickets();
                setIsTicketConfirmModalOpen(false);
            })
            .catch(error => {
                console.error("Error marking ticket as used:", error);
            });
    };

    const markTicketUnused = () => {
        if (!selectedTicketId) {
            alert("Ticket ID is missing");
            return;
        }
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': getBasicAuthHeader(username, password),
            }
        };
        axios.put(`${apiUrlTickets}/id/${selectedTicketId}/use?used=false`, {}, config)
            .then(() => {
                getTickets();
                setIsTicketUndoModalOpen(false);
            })
            .catch(error => {
                console.error("Error undoing ticket usage:", error);
            });
    };

    return (
        <Container>
            <Card className="w-100 card-no-border">
                <CardBody className="text-start">
                    <SearchBar onSearch={setSearchQuery} />
                </CardBody>
            </Card>
            <Row className="mt-4 d-flex">
                <Col xs={12} sm={6} md={6} className="text-start">
                    <Card className="w-100 card-no-border">
                        <CardBody className="text-start">
                            <h3 className="mt-4 mb-4">Available tickets:</h3>
                            <ListGroup style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                                {filterBySearch(unUsedTickets).map((ticket, index) => (
                                    <Button key={index} color="success" outline className="w-100 text-left mb-2"
                                            onClick={() => toggleTicketConfirmModal(ticket.ticketId)}>
                                        {ticket?.ticketNumber}
                                    </Button>
                                ))}
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={6} className="text-start">
                    <Card className="w-100 card-no-border">
                        <CardBody className="text-start">
                            <h3 className="mt-4 mb-4">Used tickets:</h3>
                            <ListGroup style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                                {filterBySearch(usedTickets).map((ticket, index) => (
                                    <Button key={index} color="warning" outline className="w-100 text-left mb-2"
                                            onClick={() => toggleTicketUndoModal(ticket.ticketId)}>
                                        {ticket?.ticketNumber}
                                    </Button>
                                ))}
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <GenericModal
                isModalOpen={isTicketConfirmationModalOpen}
                toggleModal={toggleTicketConfirmModal}
                title="Confirm ticket usage"
                message="Are you sure you want to mark this ticket as used?"
                confirmText="Yes"
                cancelText="No"
                onConfirm={markTicketUsed}
            />
            <GenericModal
                isModalOpen={isTicketUndoModalOpen}
                toggleModal={toggleTicketUndoModal}
                title="Undo ticket usage"
                message="Are you sure you want to undo the ticket, it will be usable again!"
                confirmText="Yes"
                cancelText="No"
                onConfirm={markTicketUnused}
            />
        </Container>
    );
}