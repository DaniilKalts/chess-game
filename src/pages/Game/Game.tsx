import React, { useEffect, useState } from 'react'

import BoardComponent from '../../components/Board/BoardComponent'
import ChessInfo from '../../components/ChessInfo/ChessInfo';
import ChooseFigure from '../../components/ChooseFigure/ChooseFigure';
import EatenFigures from '../../components/EatenFigures/EatenFigures';
import { PlayerContext } from '../../context/PlayerContext';
import { Board } from '../../models/Board';
import { Colors } from '../../models/Colors';
import { Figure, FigureNames } from '../../models/figures/Figure';
import { Player } from '../../models/Player';

const Game = () => {
    const [board, setBoard] = useState<Board>(new Board());
    const [whitePlayer, setWhitePlayer] = useState<Player>(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState<Player>(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isChangingPawn, setIsChangingPawn] = useState<Figure | null>(null);
    const [isChoosingFigure, setIsChoosingFigure] = useState<boolean>(false);
    const [isTime, setIsTime] = useState<boolean>(true);
    const [isDelibarateDraw, setIsDelibarateDraw] = useState<boolean>(false);
    const [isDelibarateLoose, setIsDelibarateLoose] = useState<boolean>(false);
    const [isFirstStep, setIsFirstStep] = useState<boolean>(false);

    useEffect(() => {
        restart();
    }, []);

    useEffect(() => {
        if (isDelibarateDraw) {
        setIsTime(false);
        const modifiedBoard = {...board, isDraw: [1]} as Board;
        setBoard(modifiedBoard);
        }
    }, [isDelibarateDraw])

    useEffect(() => {
        if (isDelibarateLoose) {
        setIsTime(false);
        }
    }, [isDelibarateLoose])

    useEffect(() => {
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
        setIsTime(true);
        setIsFirstStep(false);
        setIsDelibarateDraw(false);
        setIsDelibarateLoose(false);
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
            <ChessInfo 
                restart={restart} 
                board={board} 
                setTime={() => setIsTime(false)} 
                isTime={isTime} 
                isFirstStep={isFirstStep}
                setIsDelibarateDraw={setIsDelibarateDraw}
                setIsDelibarateLoose={setIsDelibarateLoose}
                isDelibarateDraw={isDelibarateDraw}
                isDelibarateLoose={isDelibarateLoose}
            />
            <ChooseFigure setFigure={changeFigure} isChangingPawn={isChangingPawn} isVisible={isChoosingFigure}></ChooseFigure>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
                isTime={isTime}
                isChoosingFigure={isChoosingFigure}
                isFirstStep={isFirstStep}
                setIsFirstStep={setIsFirstStep}
                isDelibarateLoose={isDelibarateLoose}
            />
            <EatenFigures 
                board={board}
                isTime={isTime}
                lostWhiteFigures={board.lostWhiteFigures} 
                lostBlackFigures={board.lostBlackFigures} 
                setIsDelibarateDraw={setIsDelibarateDraw}
                isFirstStep={isFirstStep}
                setIsDelibarateLoose={setIsDelibarateLoose}
            />
        </div>
        </PlayerContext.Provider>
    );
}

export default Game;