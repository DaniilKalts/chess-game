import React, { FC, useState, useEffect } from 'react'
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Coordinates } from '../../models/Coordinates';
import { Player } from '../../models/Player';
import CellComponent from '../CellComponent';
import CheckModal from '../UI/CheckModal/CheckModal';
import WinModal from '../UI/WinModal/WinModal';

import chessImage from '../../assets/images/chess.png';

import blackKing from '../../assets/images/black-king.png'
import whiteKing from '../../assets/images/white-king.png'

import blackPawn from '../../assets/images/black-pawn.png'
import whitePawn from '../../assets/images/white-pawn.png'

import blackKnight from '../../assets/images/black-knight.png'
import whiteKnight from '../../assets/images/white-knight.png'

import blackBishop from '../../assets/images/black-bishop.png'
import whiteBishop from '../../assets/images/white-bishop.png'

import blackQueen from '../../assets/images/black-queen.png'
import whiteQueen from '../../assets/images/white-queen.png'

import blackRook from '../../assets/images/black-rook.png'
import whiteRook from '../../assets/images/white-rook.png'

import sound from '../../assets/sounds/step.mp3';

import { Abs, BoardContainer, HorizontalAbs, VerticalAbs } from './Board.styles';
import { Colors } from '../../models/Colors';
import DrawModal from '../UI/DrawModal/DrawModal';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void,
    isTime: boolean,
    isChoosingFigure: boolean, 
    isFirstStep: boolean,
    setIsFirstStep: any,
    isDelibarateLoose: boolean
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer, isTime, isChoosingFigure, isFirstStep, setIsFirstStep, isDelibarateLoose }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [checkCoordinates, setCheckCoordinates] = useState<string>('');
  const [isModal, setModal] = useState<boolean>(false);
  const [isHistoryModal, setIsHistoryModal] = useState<boolean>(false);
  
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
    if (!isTime || board.isDraw.length) {
      return
    }

    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
        if (cell.available) {
          const audio = new Audio(sound);
          audio.play();
          selectedCell.moveFigure(cell, cell.x, 8-cell.y);
          setSelectedCell(null);
          swapPlayer();
          setCheckCoordinates('');
          setIsFirstStep(true);
        }
    } else {
        if (cell.figure?.color === currentPlayer?.color) {
          setSelectedCell(cell);
        }
    }
  };

  useEffect(() => {
    if (isDelibarateLoose) {
      setModal(true);
    }
  }, [isDelibarateLoose])

  useEffect(() => {
    if (board.isDraw.length) {
      setModal(true);
    }

    let availableCount = 0;

    board.cells.forEach(cellRow => {
      cellRow.forEach(cell => {
        availableCount += cell.available ? 1 : 0;
      })
    })

    if (!availableCount && !board.movements.length) {
      setSelectedCell(null);
    }
  }, [board])

  useEffect(() => {
    highlightCells();
    
    for (let i = 0; i < board.cells.length; i++) {
      const row: Cell[] = board.cells[i];
      for (let j = 0; j < row.length; j++) {
          const potentialFigure = row[j];
          if (potentialFigure.available
          && !selectedCell?.figure?.canMove(potentialFigure)) {
            potentialFigure.available = false;
          }
      }
  };
  }, [selectedCell])
  
  useEffect(() => {
    if (!isChoosingFigure) {
        updateBoard();
    }
  }, [isChoosingFigure])

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  
    if (newBoard.checkFigure[0]) {
      const coordinate = `${newBoard.checkFigure[0].cell.x}${newBoard.checkFigure[0].cell.y}`;
      setModal(checkCoordinates === coordinate ? false : true);
      setCheckCoordinates(coordinate);
    }

    if (newBoard.isDraw.length) {
      setModal(true);
    }
  }

  return (
    <BoardContainer>
        <VerticalAbs absLeft={'-4rem'} absRight={'auto'} absTop={'auto'} absBtm={'0'} rotate={'0deg'}>
          {Object.keys(abs).map((key, id) => (
            <Abs key={id}>{8-id}</Abs>
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

        {(board.checkFigure[0] && !board.isCheckAndMate.length && isModal) && 
          <CheckModal
          color={board.checkFigure[0].color}
          title="There's a check!"
          content={
            <div>
              <div className="figure-content">
                <img className='modal__figure' alt={board.checkFigure[0].name as string} src={board.checkFigure[0].logo as string}/>
                <div className="figure-info">
                  <h6>Title: <span>{board.checkFigure[0].name}</span></h6>
                  <h6>Coordinates: {Coordinates[board.checkFigure[0].cell.x]}{8-board.checkFigure[0].cell.y}</h6>
                </div>
              </div>
              <p>There's an enemy figure "{board.checkFigure[0].name}", on coordinated "{Coordinates[board.checkFigure[0].cell.x]}{8-board.checkFigure[0].cell.y}", that is gonna eat the king! You can move on cells, that either protect the king or eat an attacking figure.</p>
              <h5>Protect your King !!!</h5>
            </div>
          }
          footer={<button onClick={() => setModal(false)}>Close</button>}
          coordinates={`${Coordinates[board.checkFigure[0].cell.x]}${8-board.checkFigure[0].cell.y}`}
          onClose={() => setModal(false)}
        />}

        {(board.checkFigure.length && board.isCheckAndMate.length && isModal) ? 
          <WinModal
            board={board}
            isHistoryModal={isHistoryModal}
            setIsHistoryModal={setIsHistoryModal}
            color={board.checkFigure[0].color}
            title={`The ${board.checkFigure[0].color} side has won!`}
            content={
              <div className='figure-content'>
                <div className="side-figures">
                  <img src={board.checkFigure[0].color === Colors.WHITE ? whitePawn : blackPawn} alt="chessImage" className='chessImage' />
                  <img src={board.checkFigure[0].color === Colors.WHITE ? whiteRook : blackRook} alt="chessImage" className='chessImage' />
                  <img src={board.checkFigure[0].color === Colors.WHITE ? whiteBishop : blackBishop} alt="chessImage" className='chessImage' />
                  <img src={board.checkFigure[0].color === Colors.WHITE ? whiteKing : blackKing} alt="chessImage" className='chessImage' />
                  <img src={board.checkFigure[0].color === Colors.WHITE ? whiteQueen : blackQueen} alt="chessImage" className='chessImage' />
                  <img src={board.checkFigure[0].color === Colors.WHITE ? whiteKnight : blackKnight} alt="chessImage" className='chessImage' />
                </div>
                <h4>The {board.checkFigure[0].color} side has won!</h4>
                <h6>Because there's check and mate by {board.checkFigure[0].name}!</h6>
                <h6>Don't worry! Try again and beat the opposite side!</h6>
                <button onClick={() => setIsHistoryModal(true)}>View History</button>
              </div>
            }
            footer={<button onClick={() => setModal(false)}>Close</button>}
            onClose={() => setModal(false)}
        /> : ''}

        {(isDelibarateLoose && isModal) ?
          <WinModal
            board={board}
            isHistoryModal={isHistoryModal}
            setIsHistoryModal={setIsHistoryModal}
            color={currentPlayer?.color as Colors === Colors.BLACK ? Colors.WHITE : Colors.BLACK}
            title={`The ${currentPlayer?.color as Colors === Colors.BLACK ? 'white' : 'black'} side has won!`}
            content={
              <div className='figure-content'>
                <div className="side-figures">
                  <img src={currentPlayer?.color as Colors === Colors.BLACK ? whitePawn : blackPawn} alt="chessImage" className='chessImage' />
                  <img src={currentPlayer?.color as Colors === Colors.BLACK ? whiteRook : blackRook} alt="chessImage" className='chessImage' />
                  <img src={currentPlayer?.color as Colors === Colors.BLACK ? whiteBishop : blackBishop} alt="chessImage" className='chessImage' />
                  <img src={currentPlayer?.color as Colors === Colors.BLACK ? whiteKing : blackKing} alt="chessImage" className='chessImage' />
                  <img src={currentPlayer?.color as Colors === Colors.BLACK ? whiteQueen : blackQueen} alt="chessImage" className='chessImage' />
                  <img src={currentPlayer?.color as Colors === Colors.BLACK ? whiteKnight : blackKnight} alt="chessImage" className='chessImage' />
                </div>
                <h4>The {currentPlayer?.color as Colors === Colors.BLACK ? 'white' : 'black'} side has won!</h4>
                <h6>Because {currentPlayer?.color as Colors} side has decided to give up!</h6>
                <button onClick={() => setIsHistoryModal(true)}>View History</button>
              </div>
            }
            footer={<button onClick={() => setModal(false)}>Close</button>}
            onClose={() => setModal(false)}
        /> : ''}

        {(board.isDraw.length && isModal) ? 
        <DrawModal
          board={board}
          color="#627891"
          isHistoryModal={isHistoryModal}
          setIsHistoryModal={setIsHistoryModal}
          title={`There's a draw!`}
          content={
            <div className='figure-content'>
              <div className="side-figures">
                <img src={chessImage} className="chessImage" alt="chessImage" />
              </div>
              <h4>Good job, guys!</h4>
              <h6>You both played very well!</h6>
              <button onClick={() => setIsHistoryModal(true)}>View History</button>
            </div>
          }
          footer={<button onClick={() => setModal(false)}>Close</button>}
          onClose={() => setModal(false)}
        /> : ''}
    </BoardContainer>
  )
};

export default BoardComponent;