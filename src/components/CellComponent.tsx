import React, { FC } from 'react'
import { Cell } from '../models/Cell';
import { Avilable, CellBody, FigureImg } from './Cell.styles';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <CellBody
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{background: cell.available && cell.figure ? `${localStorage.getItem('theme') === '#627891' ? '#53d2ea' 
      : localStorage.getItem('theme') === '#769656' ? '#48d03d' 
      : localStorage.getItem('theme') === '#b58863' ? '#f5984b' : '#53d2ea'}` : ''}}
      isShadow={cell.x === cell.board.checkFigure[0]?.cell.x && cell.y === cell.board.checkFigure[0]?.cell.y}
    >
      {cell.available && !cell.figure && <Avilable className='available'></Avilable>}
      {cell.figure?.logo && <FigureImg src={cell.figure?.logo} alt={cell.figure?.name} draggable={false} />}
    </CellBody>
  )
};

export default CellComponent;