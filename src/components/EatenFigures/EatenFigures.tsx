import React, { FC, useState } from 'react'
import { Board } from '../../models/Board';
import { Colors } from '../../models/Colors';
import { Figure } from '../../models/figures/Figure';
import { Rook } from '../../models/figures/Rook';
import { EatenContainer, EatenTitle, FiguresList, FigureBody } from './EatenFigures.styles';

import blackLogo from '../../assets/black-rook.png'
import whiteLogo from '../../assets/white-rook.png'

interface EatenFiguresProps {
    board: Board
}

const EatenFigures: FC<EatenFiguresProps> = ({board}) => {
  const [whiteFigure, setWhiteFigures] = useState<Figure[]>([
    
  ]);

  const [blackFigure, setBlackFigures] = useState<Figure[]>([

  ]);

  return (
    <EatenContainer>
        <EatenTitle color='black'>Чёрные фигуры:</EatenTitle>
        <FiguresList>
            <FigureBody src={blackLogo} alt="figure" />
            <FigureBody src={blackLogo} alt="figure" />
            <FigureBody src={blackLogo} alt="figure" />
            <FigureBody src={blackLogo} alt="figure" />
            <FigureBody src={blackLogo} alt="figure" />
        </FiguresList>
        <EatenTitle color='white'>Белые фигуры:</EatenTitle>
        <FiguresList>
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
            <FigureBody src={whiteLogo} alt="figure" />
        </FiguresList>
    </EatenContainer>
  )
}

export default EatenFigures;