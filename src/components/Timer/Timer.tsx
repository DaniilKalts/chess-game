import React, { FC, useState, useRef, useEffect } from 'react'
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

import { TimerButton, TimerContainer, TimerTime } from './Timer.styles'

interface TimerProps {
    currentPlayer: Player | null,
    restart: () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);

  const whiteMinutes = Math.floor(whiteTime / 60) <= 9 ? `0${Math.floor(whiteTime / 60)}` : Math.floor(whiteTime / 60);
  const blackMinutes = Math.floor(blackTime / 60) <= 9 ? `0${Math.floor(blackTime / 60)}` : Math.floor(blackTime / 60);

  const whiteSeconds = whiteTime % 60 <= 9 ? `0${whiteTime % 60}` : whiteTime % 60;
  const blackSeconds = blackTime % 60 <= 9 ? `0${blackTime % 60}` : blackTime % 60;
   
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])


  useEffect(() => {
    if (whiteTime === 0) {
        if (timer.current) {
            clearInterval(timer.current);
        }

        timer.current = null
    }
  }, [whiteTime])

  useEffect(() => {
    if (blackTime === 0) {
        if (timer.current) {
            clearInterval(timer.current);
        }

        timer.current = null
    }
  }, [blackTime])

  const startTimer = () => {
    if (timer.current) {
        clearInterval(timer.current);
    }

    const callback = () => {
        if (currentPlayer?.color === Colors.WHITE) {
            decrementWhiteTimer();
        } else if (currentPlayer?.color === Colors.BLACK) {
            decrementBlackTimer();            
        }
    };
    
    timer.current = setInterval(callback, 1000);
  }

  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1);
  }

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <TimerContainer>
        <TimerTime color={'#fff'}>White: <span>{whiteMinutes} : {whiteSeconds}</span></TimerTime>
        <TimerTime color={'#222'}>Black: <span>{blackMinutes} : {blackSeconds}</span></TimerTime>
        <TimerButton onClick={handleRestart}>Restart Game</TimerButton>
    </TimerContainer>
  )
}

export default Timer;