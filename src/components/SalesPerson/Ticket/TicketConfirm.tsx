import { Button } from 'reactstrap';
import TicketInformation from "./TicketInformation.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import { ITicket } from "../../../types/ticket.ts";
import React from "react";

interface TicketConfirmProps {
    toggleModal: () => void;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    ticket?: ITicket;
}

export default function TicketConfirm(props: TicketConfirmProps) {
    return (
            <div>
                <div>{props.message}</div>
                {props.ticket && <TicketInformation ticket={props.ticket}/>}
                <hr className="my-4"/>

                <div className="d-flex justify-content-around mt-4">
                    <Button color="secondary" onClick={props.toggleModal}>
                        {props.cancelText}
                    </Button>
                    <Button color="success" onClick={props.onConfirm}>
                        {props.confirmText}
                    </Button>
                </div>
            </div>
    );
}