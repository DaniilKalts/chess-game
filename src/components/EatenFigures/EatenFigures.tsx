import React, { FC } from 'react'
import { EatenContainer, EatenTitle, FiguresList, FigureBody, ChessLogo, EatenName, Flags, Flag } from './EatenFigures.styles';
import { Figure } from '../../models/figures/Figure';

import chess from '../../assets/images/chess.png'

import whiteflag from '../../assets/images/white-flag.png'
import redflag from '../../assets/images/red-flag.png'
import { Board } from '../../models/Board';

interface EatenFiguresProps {
  board: Board,
  isTime: boolean,
  lostWhiteFigures: Figure[],
  lostBlackFigures: Figure[],
  setIsDelibarateDraw: any,
  setIsDelibarateLoose: any,
  isFirstStep: boolean
}

const EatenFigures: FC<EatenFiguresProps> = ({ board, isTime, lostWhiteFigures, lostBlackFigures, setIsDelibarateDraw, isFirstStep, setIsDelibarateLoose }) => {
  const drawRes = () => {
    if (!isFirstStep) {
      return
    }

    const res = confirm('Do you really wanna draw ?');

    if (res) {
      setIsDelibarateDraw(true);
    }
  }

  const looseRes = () => {
    if (!isFirstStep) {
      return
    }

    const res = confirm('Do you really wanna loose ?');

    if (res) {
      setIsDelibarateLoose(true);
    }
  }

  return (
    <EatenContainer>
        <ChessLogo src={chess} alt="chess" />
        <EatenTitle>Lost Figures:</EatenTitle>
        <EatenName color='black'>Black Figures:</EatenName>
        <FiguresList blackFigures={lostBlackFigures.length} whiteFigures={lostWhiteFigures.length}>
            {lostBlackFigures.map(figure => 
              <FigureBody src={figure.logo} alt={figure.name} key={figure.id} />
            )}
        </FiguresList>
        <EatenName color='white'>White Figures:</EatenName>
        <FiguresList blackFigures={lostBlackFigures.length} whiteFigures={lostWhiteFigures.length}>
            {lostWhiteFigures.map(figure => 
              <FigureBody src={figure.logo} alt={figure.name} key={figure.id} />
            )}
        </FiguresList>

        {(!board.isCheckAndMate.length && !board.isDraw.length && isTime) && 
        <Flags>
          <Flag src={whiteflag} onClick={() => drawRes()} />
          <Flag src={redflag} onClick={() => looseRes()} />
        </Flags> }
    </EatenContainer>
  )
}

export default EatenFigures;