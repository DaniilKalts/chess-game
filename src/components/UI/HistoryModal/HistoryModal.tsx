import React, { FC } from 'react'
import { Board } from '../../../models/Board';
import { ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, TimeDialog, HistoryWrapper } from './HistoryModal.styles';

interface ModalProps {
    setIsHistoryModal: any,
    color: string,
    title: string,
    content: any,
    footer: any, 
    onClose: () => void
}

const HistoryModal: FC<ModalProps> = ({ setIsHistoryModal, color, title, content, footer, onClose }) => {
  return (
    <TimeDialog onClick={() => setIsHistoryModal(false)} color={color}> 
        <HistoryWrapper color={color} onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
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
        </HistoryWrapper>
    </TimeDialog>
  )
}

export default HistoryModal;