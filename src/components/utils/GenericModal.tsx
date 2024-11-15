import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {ITicket} from "../../types/ticket.ts";
import TicketInformation from "../SalesPerson/Ticket/TicketInformation.tsx";
import {useEffect} from "react";

interface GenericModalProps {
    isModalOpen: boolean;
    toggleModal: () => void;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    ticket?: ITicket;
}

export default function GenericModal(props: GenericModalProps) {
    return (
        <Modal id="generic-modal" isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>
                <div>{props.title}</div>
            </ModalHeader>
            <ModalBody id="generic-modal-body">
                <div>{props.message}</div>
                {props.ticket &&
                    <TicketInformation
                        ticket={props.ticket}
                    />}
            </ModalBody>
            <ModalFooter className="d-flex justify-content-around mt-4">
                <Button id="modal-cancel" color="secondary" onClick={() => props.toggleModal()}>
                    {props.cancelText}
                </Button>
                <Button id="modal-confirm" color="success" onClick={() => props.onConfirm()}>
                    {props.confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    );
}