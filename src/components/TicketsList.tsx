import {ITicket} from '../types/ticket.ts'
import {Container, Row, Col, Card, CardBody, Button, ListGroup, ListGroupItem} from 'reactstrap';
import SearchBar from "./SearchBar.tsx";
import {useEffect, useState} from "react";
import GenericModal from "./GenericModal.tsx";
import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL_LOCALHOST, ENDPOINTS} from '../utils/constants';
import {getBasicAuthHeader} from "../utils/utils";

const apiUrlTickets = `${BASE_URL_LOCALHOST}${ENDPOINTS.TICKETS}`;
const username = 'john_doe';
const password = 'password123';

export default function TicketsList() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [isTicketConfirmationModalOpen, setIsTicketConfirmModalOpen] = useState<boolean>(false);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const unUsedTickets = tickets.filter(ticket => !ticket.used)
    const usedTickets = tickets.filter(ticket => ticket.used)

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

    const toggleTicketConfirmModal = (ticketId: number | null = null) => {
        setSelectedTicketId(ticketId);
        setIsTicketConfirmModalOpen(!isTicketConfirmationModalOpen);
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
            .then(response => {
                getTickets();
                toggleTicketConfirmModal();
            })
            .catch(error => {
                console.error("Error marking ticket as used:", error);
            });
    };

    return (
        <Container>
            <Card className="w-100 card-no-border">
                <CardBody className="text-start">
                    <SearchBar onSearch={setSearchQuery}/>
                </CardBody>
            </Card>
            <Row className="mt-4 d-flex">
                <Col xs={12} sm={6} md={6} className="text-start">
                    <Card className="w-100 card-no-border">
                        <CardBody className="text-start">
                            <h3 className="mt-4 mb-4">Available tickets:</h3>
                            <ListGroup>
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
                            <ListGroup>
                                {filterBySearch(usedTickets).map((ticket, index) => (
                                    <ListGroupItem key={index}>
                                        {ticket?.ticketNumber} (used)
                                    </ListGroupItem>
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
                message="Are you sure you want to mark ticket as used?"
                confirmText="Yes"
                cancelText="No"
                onConfirm={markTicketUsed}
            />
        </Container>
    );
}