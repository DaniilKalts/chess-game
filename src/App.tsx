import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent'
import ChessInfo from './components/ChessInfo/ChessInfo';
import EatenFigures from './components/EatenFigures/EatenFigures';
import { Board } from './models/Board';

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <div className="app">
      <ChessInfo />
      <BoardComponent
        board={board}
        setBoard={setBoard}
      />
      <EatenFigures board={board} />
    </div>
  );
}

export default App;
