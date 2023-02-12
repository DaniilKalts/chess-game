import React, { FC, useState, useRef, useEffect } from 'react'
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';
import TimeOverModal from '../UI/TimeOverModal/TimeOverModal';

import chessImage from '../../assets/chess.png'

import { TimerButton, TimerContainer, TimerTime } from './Timer.styles'
import { Board } from '../../models/Board';
import { Pause } from '../../App.styles';

import pause from '../../assets/pause.png';
import play from '../../assets/play.png';
import PauseModal from '../UI/PauseModal/PauseModal';


interface TimerProps {
  board: Board,
  currentPlayer: Player | null,
  restart: () => void
}

const Timer: FC<TimerProps> = ({ board, currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);

  const whiteMinutes = Math.floor(whiteTime / 60) <= 9 ? `0${Math.floor(whiteTime / 60)}` : Math.floor(whiteTime / 60);
  const blackMinutes = Math.floor(blackTime / 60) <= 9 ? `0${Math.floor(blackTime / 60)}` : Math.floor(blackTime / 60);

  const whiteSeconds = whiteTime % 60 <= 9 ? `0${whiteTime % 60}` : whiteTime % 60;
  const blackSeconds = blackTime % 60 <= 9 ? `0${blackTime % 60}` : blackTime % 60;
   
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const [modal, setModal] = useState<boolean>(false);
  const [isHistoryModal, setIsHistoryModal] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])


  useEffect(() => {
    if (whiteTime === 0) {
        if (timer.current) {
            clearInterval(timer.current);
            setModal(true);
        }

        timer.current = null
    }
  }, [whiteTime])

  useEffect(() => {
    if (blackTime === 0) {
        if (timer.current) {
            clearInterval(timer.current);
            setModal(true);
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

  const stopTimer = () => {
    if (isPause) {
      setIsPause(false);
      startTimer();
    } else if (!isPause && timer.current) {
      setIsPause(true);
      clearInterval(timer.current);
    }
  }

  return (
    <TimerContainer>
        <TimerTime color={'#fff'}>White: <span>{whiteMinutes} : {whiteSeconds}</span></TimerTime>
        <TimerTime color={'#222'}>Black: <span>{blackMinutes} : {blackSeconds}</span></TimerTime>
        <TimerButton onClick={handleRestart}>Restart Game</TimerButton>
        {((whiteTime === 0 || blackTime === 0) && modal) &&
          <TimeOverModal 
            board={board}
            isHistoryModal={isHistoryModal}
            setIsHistoryModal={setIsHistoryModal}
            color={whiteTime === 0 ? Colors.WHITE : Colors.BLACK}
            title="The game is over"
            content={
              <div className='figure-content'>
                <img src={chessImage} alt="chessImage" className='chessImage' />
                <h4>The {whiteTime === 0 ? 'black' : 'white'} side has won!</h4>
                <h6>Because time of {whiteTime === 0 ? 'white' : 'black'} side is over!</h6>
                <h6>Don't worry! Try again and beat the opposite side!</h6>
                <button onClick={() => setIsHistoryModal(true)}>View History</button>
              </div>
            }
            footer={<button onClick={() => setModal(false)}>Close</button>}
            onClose={() => setModal(false)}
          />
        }
        {isPause &&
          <PauseModal 
            content={
              <div className='figure-content'>
                <img src={play} alt="play" onClick={stopTimer} />
              </div>
            }
            onClose={() => stopTimer()}
          />
        }
        <Pause src={pause} alt={'pause'} onClick={stopTimer} />
    </TimerContainer>
  )
}

export default Timer;