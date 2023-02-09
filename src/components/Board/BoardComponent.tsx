import React, { FC, useState, useEffect } from 'react'
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import CellComponent from '../CellComponent';
import Modal from '../UI/Modal';
import { Abs, BoardContainer, HorizontalAbs, VerticalAbs } from './Board.styles';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [isModal, setModal] = useState<boolean>(false);

  const abs = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8
  }

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
        if (cell.available) {
          selectedCell.moveFigure(cell, cell.x, 8-cell.y);
          setSelectedCell(null);
          swapPlayer();
        }
    } else {
        if (cell.figure?.color === currentPlayer?.color) {
          setSelectedCell(cell);
        }
    }
  };

  useEffect(() => {
    highlightCells();
  }, [selectedCell])
  

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
    setModal(newBoard.checkFigure[0] ? true : false);
  }

  return (
    <BoardContainer>
        <VerticalAbs absLeft={'-4rem'} absRight={'auto'} absTop={'auto'} absBtm={'0'} rotate={'0deg'}>
          {Object.keys(abs).map((key, id) => (
            <Abs key={id}>{id+1}</Abs>
          ))}
        </VerticalAbs>
        <VerticalAbs absLeft={'auto'} absRight={'-4rem'} absTop={'auto'} absBtm={'0'} rotate={'180deg'}>
          {Object.keys(abs).map((key, id) => (
            <Abs key={id}>{id+1}</Abs>
          ))}
        </VerticalAbs>
        <HorizontalAbs absLeft={'auto'} absRight={'0'} absTop={'auto'} absBtm={'-4rem'} rotate={'0deg'}>
          {Object.keys(abs).map((key, id) => (
            <Abs key={id}>{key}</Abs>
          ))}
        </HorizontalAbs>
        <HorizontalAbs absLeft={'auto'} absRight={'0'} absTop={'-4rem'} absBtm={'auto'} rotate={'180deg'}>
          {Object.keys(abs).map((key, id) => (
            <Abs key={id}>{key}</Abs>
          ))}
        </HorizontalAbs>
        {board.cells.map((row, index) => (
            <React.Fragment key={index}>
                {row.map(cell => (
                    <CellComponent 
                        cell={cell}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        click={click}
                        key={cell.id}
                    />
                ))}
            </React.Fragment>
        ))}
        {(board.checkFigure[0] && isModal) && 
          <Modal
          color={board.checkFigure[0].color}
          isVisible={isModal}
          title="There's a check!"
          content={
            <div>
              <div className="figure-content">
                <img className='modal__figure' alt={board.checkFigure[0].name as string} src={board.checkFigure[0].logo as string}/>
                <div className="figure-info">
                  <h6>Title: <span>{board.checkFigure[0].name}</span></h6>
                  <h6>Coordinates: {board.movements[board.movements.length-1].coordinate}</h6>
                </div>
              </div>
              <p>There's an enemy figure "{board.checkFigure[0].name}", on coordinated "{board.movements[board.movements.length-1].coordinate}", that is gonna eat the king! You can move on cells, that either protect the king or eat an attacking figure.</p>
              <h5>Protect your King !!!</h5>
            </div>
          }
          footer={<button onClick={() => setModal(false)}>Close</button>}
          onClose={() => setModal(false)}
        />}
    </BoardContainer>
  )
};

export default BoardComponent;