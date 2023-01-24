import React, { FC } from 'react'
import { EatenContainer, EatenTitle, FiguresList, FigureBody, ChessLogo, EatenName } from './EatenFigures.styles';
import { Figure } from '../../models/figures/Figure';

import chess from '../../assets/chess.png'

interface EatenFiguresProps {
  lostWhiteFigures: Figure[];
  lostBlackFigures: Figure[];
}


const EatenFigures: FC<EatenFiguresProps> = ({ lostWhiteFigures, lostBlackFigures }) => {

  return (
    <EatenContainer>
        <ChessLogo src={chess} alt="chess" />
        <EatenTitle>Lost Figures:</EatenTitle>
        <EatenName color='black'>Black Figures:</EatenName>
        <FiguresList>
            {/* <FigureBody src={blackLogo} alt="figure" /> */}
            {lostBlackFigures.map(figure => 
              <FigureBody src={figure.logo} alt={figure.name} key={figure.id} />
            )}
        </FiguresList>
        <EatenName color='white'>White Figures:</EatenName>
        <FiguresList>
            {lostWhiteFigures.map(figure => 
              <FigureBody src={figure.logo} alt={figure.name} key={figure.id} />
            )}
        </FiguresList>
    </EatenContainer>
  )
}

export default EatenFigures;