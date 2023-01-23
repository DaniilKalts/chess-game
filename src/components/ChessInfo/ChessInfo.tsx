import React, { useContext } from 'react'
import { PlayerContext } from '../../context/PlayerContext';
import { CurrentPlayer, Info, InfoText, InfoTitle } from './ChessInfo.styles';

const ChessInfo = () => {
  
  const player = useContext(PlayerContext);
  
  return (
    <Info>
        <InfoTitle>Chess<span>Game</span></InfoTitle>
        <CurrentPlayer color={player?.color}>Current Player: <span>{player?.color}</span></CurrentPlayer>
        {/* <InfoText></InfoText> */}
    </Info>
  )
}

export default ChessInfo;