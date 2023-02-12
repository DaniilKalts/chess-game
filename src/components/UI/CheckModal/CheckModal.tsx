import React, { FC } from 'react'
import { Colors } from '../../../models/Colors';
import { ModalBody, ModalClose, ModalContent, CheckDialog, ModalFooter, ModalHeader, ModalTitle } from '../Modal.styles';

interface ModalProps {
    color: Colors,
    title: string,
    content: any,
    footer: any, 
    coordinates: string,
    onClose: () => void
}

const CheckModal: FC<ModalProps> = ({ color, title, content, footer, onClose }) => {

    return (
        <CheckDialog onClick={(e: React.SyntheticEvent) => e.stopPropagation()} color={color}>
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
        </CheckDialog>
    )
}

export default CheckModal;