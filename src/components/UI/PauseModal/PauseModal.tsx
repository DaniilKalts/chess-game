import React, { FC } from 'react'
import { ModalContent, TimeDialog } from './PauseModal.styles';

type ModalProps = {
    content: any,
    onClose: () => void
}

const PauseModal: FC<ModalProps> = ({ content, onClose }) => {
  return (
    <TimeDialog>
      <ModalContent>{content}</ModalContent>
    </TimeDialog>
  )
}

export default PauseModal;