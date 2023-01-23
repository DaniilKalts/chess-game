import React, { FC } from 'react'
import { EatenContainer, EatenTitle, FiguresList, FigureBody } from './EatenFigures.styles';

import { Figure } from '../../models/figures/Figure';

interface EatenFiguresProps {
  lostWhiteFigures: Figure[];
  lostBlackFigures: Figure[];
}


const EatenFigures: FC<EatenFiguresProps> = ({ lostWhiteFigures, lostBlackFigures }) => {

  return (
    <EatenContainer>
        <EatenTitle color='black'>Black Figures:</EatenTitle>
        <FiguresList>
            {/* <FigureBody src={blackLogo} alt="figure" /> */}
            {lostBlackFigures.map(figure => 
              <FigureBody src={figure.logo} alt={figure.name} key={figure.id} />
            )}
        </FiguresList>
        <EatenTitle color='white'>White Figures:</EatenTitle>
        <FiguresList>
            {lostWhiteFigures.map(figure => 
              <FigureBody src={figure.logo} alt={figure.name} key={figure.id} />
            )}
        </FiguresList>
    </EatenContainer>
  )
}

export default EatenFigures;