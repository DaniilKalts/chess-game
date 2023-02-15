import React, { FC, useContext } from 'react'
import { PlayerContext } from '../../context/PlayerContext';
import { Board } from '../../models/Board';
import MovementsHistory from '../MovementsHistory/MovementsHistory';
import Timer from '../Timer/Timer';
import { CurrentPlayer, Info, InfoTitle } from './ChessInfo.styles';

interface InfoProps {
  restart: () => void,
  board: Board,
  setTime: () => void
}

const ChessInfo: FC<InfoProps> = ({ restart, board, setTime }) => {
  
  const player = useContext(PlayerContext);
  
  return (
    <Info>
        <InfoTitle>Chess<span>Game</span></InfoTitle>
        <CurrentPlayer color={player?.color}>Current Player: <span>{player?.color}</span></CurrentPlayer>
        <Timer currentPlayer={player} restart={restart} board={board} setTime={setTime} />
        <MovementsHistory board={board} />
    </Info>
  )
}

export default ChessInfo;