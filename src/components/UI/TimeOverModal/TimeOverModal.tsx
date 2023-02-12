import React, { FC, useState } from 'react'
import { Board } from '../../../models/Board';
import { Colors } from '../../../models/Colors';
import HistoryModal from '../HistoryModal/HistoryModal';
import { ModalBody, ModalClose, ModalContent, TimeDialog, ModalFooter, ModalHeader, ModalTitle, TimeWrapper } from '../Modal.styles';

interface ModalProps {
    board: Board,
    isHistoryModal: boolean,
    setIsHistoryModal: any,
    color: Colors | null,
    title: string,
    content: any,
    footer: any, 
    onClose: () => void
}

const TimeOverModal: FC<ModalProps> = ({ board, isHistoryModal, setIsHistoryModal, color, title, content, footer, onClose }) => {
    return (
        <>
        <TimeDialog onClick={(e: React.SyntheticEvent) => e.stopPropagation()} color={color}>
            <TimeWrapper color={color}>
                <ModalHeader>
                <ModalTitle color={color}>{title}</ModalTitle>
                    <ModalClose onClick={onClose}>
                        &times;
                    </ModalClose>
                </ModalHeader>
                <ModalBody>
                <ModalContent>{content}</ModalContent>
                </ModalBody>
                {footer && <ModalFooter>{footer}</ModalFooter>}
            </TimeWrapper>
        </TimeDialog>

        {isHistoryModal && 
        <HistoryModal 
            setIsHistoryModal={setIsHistoryModal}   
            color="#627891"
            title="History of movements"
            content={
            <div className='history-body'>
                {board.movements.map((movement, id) => (
                    <div key={id} className='figure-content'>
                        <img src={movement.logo ? movement.logo : ''} alt={'figure'}></img>
                        <h4>{id+1}.{movement.coordinate}</h4>
                        <div></div>
                    </div>               
                ))}
                {board.movements.length === 0 && <h1 className='empty__movements'>There were no movements :D</h1>}
            </div>
            }
            footer={<button onClick={() => setIsHistoryModal(false)}>Close</button>}
            onClose={() => setIsHistoryModal(false)}
        />}

        {/* <MovementsHistory board={board} /> */}
        </>
    )
}

export default TimeOverModal;