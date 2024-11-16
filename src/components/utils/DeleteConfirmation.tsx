import React from 'react';
import { Button } from 'reactstrap';

interface DeleteConfirmationProps {
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirmation(props: DeleteConfirmationProps) {
    return (
        <div>
            <div>{props.message}</div>
            <div className="d-flex justify-content-around mt-4">
                <Button color="secondary" onClick={props.onCancel}>
                    {props.cancelText}
                </Button>
                <Button color="danger" onClick={props.onConfirm}>
                    {props.confirmText}
                </Button>
            </div>
        </div>
    );
}