import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

interface GenericModalProps {
    isModalOpen: boolean; // Boolean to determine if the modal is open
    toggleModal: () => void; // Function to toggle the modal
    title: string; // Title of the modal
    message: string; // The message displayed in the modal body
    confirmText: string; // Text for the confirm button
    cancelText: string; // Text for the cancel button
    onConfirm: () => (selectedTicketId, setTickets, setUnUsedModal) => any; // Function to call when 'Yes' button is clicked
}

export default function GenericModal(props: GenericModalProps) {
    return (
        <Modal id="generic-modal" isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>
                <div>{props.title}</div>
            </ModalHeader>
            <ModalBody id="generic-modal-body">
                <div>{props.message}</div>
            </ModalBody>
            <ModalFooter>
                <Button id="modal-cancel" color="secondary" onClick={() =>  props.toggleModal()}>
                    {props.cancelText}
                </Button>
                <Button
                    id="modal-confirm"
                    color="success"
                    onClick={() => props.onConfirm()}
                >
                    {props.confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    );
}