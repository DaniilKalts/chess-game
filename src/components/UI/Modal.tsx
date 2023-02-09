import React, { FC } from 'react'
import { Colors } from '../../models/Colors';
import { ModalBody, ModalClose, ModalContent, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from './Modal.styles';

interface ModalProps {
    color: Colors,
    isVisible: boolean,
    title: string,
    content: any,
    footer: any, 
    onClose: () => void
}

const Modal: FC<ModalProps> = ({ color, isVisible = false, title, content, footer, onClose }) => {
    return (
        <ModalDialog onClick={(e: React.SyntheticEvent) => e.stopPropagation()} color={color}>
            <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
                <ModalClose onClick={onClose}>
                    &times;
                </ModalClose>
            </ModalHeader>
            <ModalBody>
            <ModalContent>{content}</ModalContent>
            </ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalDialog>
    )
}

export default Modal;