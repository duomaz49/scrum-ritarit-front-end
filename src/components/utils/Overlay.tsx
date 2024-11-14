import React, { ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface OverlayProps {
    children?: ReactNode;
    isOpen?: boolean;
    toggle?: () => void;
}

export default function OverlayComponent(props: OverlayProps) {
    return (
        <Modal id="fancybox" isOpen={props.isOpen} toggle={props.toggle} backdrop="static" keyboard={false}>
            <ModalHeader toggle={props.toggle} />
            <ModalBody>
                {props.children && React.Children.map(props.children, (child, index) => (
                    <div key={index} className="w-100">
                        {child}
                    </div>
                ))}
            </ModalBody>
        </Modal>
    );
}