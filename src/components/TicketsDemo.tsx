import { ITicket } from '../types/ticket.ts';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import SearchBar from "./utils/SearchBar.tsx";
import { useEffect, useState } from "react";
import GenericModal from "./utils/GenericModal.tsx";
import {getTicket, markTicketUnused, markTicketUsed} from "../utils/api";
import GenericList from "./utils/GenericList.ts.tsx";


export default function TicketConfirmation() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [isTicketConfirmationModalOpen, setIsTicketConfirmModalOpen] = useState<boolean>(false);
    const [isTicketUndoModalOpen, setIsTicketUndoModalOpen] = useState<boolean>(false);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const unUsedTickets = tickets.filter(ticket => !ticket.used);
    const usedTickets = tickets.filter(ticket => ticket.used);

    useEffect(() => {
        getTicket(setTickets);
    }, []);

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
                            <GenericList<ITicket>
                                items={filterBySearch(unUsedTickets)}
                                renderItem={(ticket: ITicket) => ticket.ticketNumber}
                                onItemClick={(ticket: ITicket) => toggleTicketConfirmModal(ticket.ticketId)}
                                buttonColor="success"
                                title="Available tickets:"
                            />
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={6} className="text-start">
                    <Card className="w-100 card-no-border">
                        <CardBody className="text-start">
                            <GenericList<ITicket>
                                items={filterBySearch(usedTickets)}
                                renderItem={(ticket: ITicket) => ticket.ticketNumber}
                                onItemClick={(ticket: ITicket) => toggleTicketUndoModal(ticket.ticketId)}
                                buttonColor="danger"
                                title="Used tickets:"
                            />
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
                onConfirm={() => markTicketUsed(selectedTicketId, setTickets, toggleTicketConfirmModal)}
            />
            <GenericModal
                isModalOpen={isTicketUndoModalOpen}
                toggleModal={toggleTicketUndoModal}
                title="Undo ticket usage"
                message="Are you sure you want to undo the ticket, it will be usable again!"
                confirmText="Yes"
                cancelText="No"
                onConfirm={() => markTicketUnused(selectedTicketId, setTickets, toggleTicketUndoModal)}
            />
        </Container>
    );
}