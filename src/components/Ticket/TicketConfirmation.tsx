import {Container, Card, CardBody, Button} from 'reactstrap';
import SearchBar from "../utils/SearchBar.tsx";
import {useEffect, useState} from "react";
import GenericModal from "../utils/GenericModal.tsx";
import {getTicket, markTicketUnused, markTicketUsed} from "../../utils/api.ts";
import {ITicket} from "../../types/ticket.ts";


export default function TicketConfirmation() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [ticket, setTicket] = useState<ITicket>({});
    const [isTicketConfirmationModalOpen, setIsTicketConfirmModalOpen] = useState<boolean>(false);
    const [isTicketUndoModalOpen, setIsTicketUndoModalOpen] = useState<boolean>(false);

    const toggleTicketConfirmModal = () => {
        setIsTicketConfirmModalOpen(!isTicketConfirmationModalOpen);
    }

    const toggleTicketUndoModal = () => {
        setIsTicketUndoModalOpen(!isTicketUndoModalOpen);
    }


    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className="w-50 card-no-border p-2">
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
            {!ticket.used && <GenericModal
                isModalOpen={isTicketConfirmationModalOpen}
                toggleModal={toggleTicketConfirmModal}
                title="Confirm ticket usage"
                message="Are you sure you want to mark this ticket as used?"
                confirmText="Yes"
                cancelText="No"
                ticket={ticket}
                onConfirm={() => markTicketUsed(searchQuery, toggleTicketConfirmModal)}
            />}
            {ticket.used && <GenericModal
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