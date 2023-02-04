import React, { FC } from 'react'
import { ChooseContainer, ChooseTitle, ChooseWrapper, FigureBody, FigureConatiner, FigureList, FigureTitle } from './ChooseFigure.styles';

import blackKnight from '../../assets/black-knight.png'
import whiteKnight from '../../assets/white-knight.png'

import blackBishop from '../../assets/black-bishop.png'
import whiteBishop from '../../assets/white-bishop.png'

import blackQueen from '../../assets/black-queen.png'
import whiteQueen from '../../assets/white-queen.png'

import blackRook from '../../assets/black-rook.png'
import whiteRook from '../../assets/white-rook.png'
import { Figure } from '../../models/figures/Figure';

type ChooseProps = {
    isChangingPawn: Figure | null
    setFigure: (figure: any) => void
    isVisible: boolean
}

const ChooseFigure: FC<ChooseProps> = ({ isChangingPawn, setFigure, isVisible }) => {
  const blackFigures = [
    {
        name: 'Knight',
        source: blackKnight
    },
    {
        name: 'Bishop',
        source: blackBishop
    },
    {
        name: 'Queen',
        source: blackQueen
    },
    {
        name: 'Rook',
        source: blackRook
    }
  ];

  const whiteFigures = [
    {
        name: 'Knight',
        source: whiteKnight
    },
    {
        name: 'Bishop',
        source: whiteBishop
    },
    {
        name: 'Queen',
        source: whiteQueen
    },
    {
        name: 'Rook',
        source: whiteRook
    }
  ];

  return (
    <ChooseContainer className={isVisible ? 'active' : ''}>
        <ChooseWrapper>
            <ChooseTitle color={isChangingPawn?.color}>SELECT THE PIECE YOU WANT TO PROMOTE YOUR PAWN INTO</ChooseTitle>
            <FigureList>
                {isChangingPawn?.color === 'black' && blackFigures.map((figure, id) => (
                    <FigureConatiner key={id} onClick={() => setFigure(figure)}>
                        <FigureBody src={figure.source} alt={figure.name} />
                        <FigureTitle color={isChangingPawn?.color}>{figure.name}</FigureTitle>
                    </FigureConatiner>         
                ))}

                {isChangingPawn?.color === 'white' && whiteFigures.map((figure, id) => (
                    <FigureConatiner key={id} onClick={() => setFigure(figure)}>
                        <FigureBody src={figure.source} alt={figure.name} />
                        <FigureTitle color={isChangingPawn?.color}>{figure.name}</FigureTitle>
                    </FigureConatiner>         
                ))}
            </FigureList>
        </ChooseWrapper>
    </ChooseContainer>
  )
}

export default ChooseFigure;