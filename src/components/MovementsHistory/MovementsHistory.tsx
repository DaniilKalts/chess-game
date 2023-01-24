import React, { FC } from 'react'
import { MovementBody, MovementFigure, MovementsContainer, MovementSpace, MovementStep, MovementsTitle } from './MovementsHistory.styles';

import { Board } from '../../models/Board';

type MovementsProps = {
    board: Board
}

const MovementsHistory: FC<MovementsProps> = ({ board }) => {
  
  return (
    <>
        <MovementsTitle>History:</MovementsTitle>
        <MovementsContainer>
            {board.movements.map((movement, id) => (
                <MovementBody key={id}>
                    <MovementStep>{id+1}.{movement.coordinate}</MovementStep>
                    <MovementSpace></MovementSpace>
                    <MovementFigure src={movement.logo} alt={'figure'}></MovementFigure>
                </MovementBody>               
            ))}
        </MovementsContainer>
    </>
  )
}

export default MovementsHistory;