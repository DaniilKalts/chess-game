import Reac, { FC } from 'react'
import { Board } from '../../../models/Board'
import HistoryModal from '../HistoryModal/HistoryModal'
import { ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, DrawDialog, TimeWrapper } from './DrawModal.styles'

type Modal = {
    board: Board,
    color: string,
    isHistoryModal: boolean,
    setIsHistoryModal: any,
    title: string,
    content: any,
    footer: any, 
    onClose: () => void
}

const DrawModal: FC<Modal> = ({ board, color, isHistoryModal, setIsHistoryModal, title, content, footer, onClose }) => {
  return (
    <>

        <DrawDialog onClick={(e: React.SyntheticEvent) => e.stopPropagation()} color={color}>
            <TimeWrapper>
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
            </TimeWrapper>
        </DrawDialog>

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

    </>
  )
}

export default DrawModal;