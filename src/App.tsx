import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/Board/BoardComponent'
import ChessInfo from './components/ChessInfo/ChessInfo';
import ChooseFigure from './components/ChooseFigure/ChooseFigure';
import EatenFigures from './components/EatenFigures/EatenFigures';
import { PlayerContext } from './context/PlayerContext';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Figure, FigureNames } from './models/figures/Figure';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer, setWhitePlayer] = useState<Player>(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState<Player>(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isChangingPawn, setIsChangingPawn] = useState<Figure | null>(null);
  const [isChoosingFigure, setIsChoosingFigure] = useState<boolean>(false);

  useEffect(() => {
    restart();
  }, []);

  useEffect(() => {
    // console.log('well....', board)
    setIsChangingPawn(board.isChangingPawn[0]);
    if (board.isChangingPawn[0] && board.isChangingPawn[0]?.name === FigureNames.PAWN) {
      setIsChoosingFigure(true);
    }
  }, [board]);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function changeFigure(figure: any) {
    board.changePawn(figure);
    setIsChoosingFigure(false);
  }

  return (
    <PlayerContext.Provider
      value={currentPlayer}
    >
      <div className="app">
        <ChessInfo restart={restart} board={board} />
        <ChooseFigure setFigure={changeFigure} isChangingPawn={isChangingPawn} isVisible={isChoosingFigure}></ChooseFigure>
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <EatenFigures 
          lostWhiteFigures={board.lostWhiteFigures} 
          lostBlackFigures={board.lostBlackFigures} 
        />
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
