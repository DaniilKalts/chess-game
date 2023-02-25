import React, { FC, useState, useRef, useEffect } from 'react'
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

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

import { Back, Flag, Flags, Pause, TimerButton, TimerContainer, TimerTime } from './Timer.styles'
import { Board } from '../../models/Board';

import pause from '../../assets/images/pause.png';
import back from '../../assets/images/arrow_right.svg';

import whiteflag from '../../assets/images/white-flag.png'
import redflag from '../../assets/images/red-flag.png'

import PauseModal from '../UI/PauseModal/PauseModal';
import { NavLink } from 'react-router-dom';
import { MenuButton, MenuWrapper } from '../../pages/Menu/Menu.styles';
import WinModal from '../UI/WinModal/WinModal';

interface TimerProps {
  board: Board,
  currentPlayer: Player | null,
  restart: () => void,
  setTime: () => void,
  isTime: boolean,
  isFirstStep: boolean,
  setIsDelibarateDraw: any,
  setIsDelibarateLoose: any,
  isDelibarateDraw: boolean,
  isDelibarateLoose: boolean
}

const Timer: FC<TimerProps> = ({ board, currentPlayer, restart, setTime, isTime, isFirstStep, setIsDelibarateDraw, setIsDelibarateLoose, isDelibarateDraw, isDelibarateLoose }) => {
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  const whiteMinutes = Math.floor(whiteTime / 60) <= 9 ? `0${Math.floor(whiteTime / 60)}` : Math.floor(whiteTime / 60);
  const blackMinutes = Math.floor(blackTime / 60) <= 9 ? `0${Math.floor(blackTime / 60)}` : Math.floor(blackTime / 60);

  const whiteSeconds = whiteTime % 60 <= 9 ? `0${whiteTime % 60}` : whiteTime % 60;
  const blackSeconds = blackTime % 60 <= 9 ? `0${blackTime % 60}` : blackTime % 60;
   
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const [modal, setModal] = useState<boolean>(false);
  const [isHistoryModal, setIsHistoryModal] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);

  const [isDelibarateFlags, setIsDelibarateFlags] = useState<boolean>(false);

  useEffect(() => {
    if (Number(localStorage.getItem('gameTime'))) {
      setWhiteTime(Number(localStorage.getItem('gameTime')))
      setBlackTime(Number(localStorage.getItem('gameTime')))
    }
  }, [])

  useEffect(() => {
    if (!isTime && timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [isTime])

  useEffect(() => {

    startTimer();

    if (timer.current
    && board.isCheckAndMate.length) {
      clearInterval(timer.current);
      timer.current = null;
    }    
  }, [currentPlayer])

  useEffect(() => {
    setIsDelibarateFlags(isFirstStep);
  }, [isFirstStep])

  useEffect(() => {
    if (whiteTime === 0) {
        if (timer.current) {
            clearInterval(timer.current);
            setModal(true);

            setTime();
        }

        timer.current = null;
        setIsDelibarateFlags(false);
    }
  }, [whiteTime])

  useEffect(() => {
    if (blackTime === 0) {
        if (timer.current) {
            clearInterval(timer.current);
            setModal(true);

            setTime();
        }

        timer.current = null;
        setIsDelibarateFlags(false);
    }
  }, [blackTime])

  useEffect(() => {
    if (!isFirstStep) {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }    
    }
  }, [whiteTime, blackTime])

  const startTimer = () => {
    if (!isFirstStep) {
      return
    }

    setIsDelibarateDraw(false);
    setIsDelibarateLoose(false);

    if (timer.current) {
        clearInterval(timer.current);
    }

    const callback = () => {
        if (currentPlayer?.color === Colors.WHITE
        && isFirstStep) {
            decrementWhiteTimer();
        } else if (currentPlayer?.color === Colors.BLACK
        && isFirstStep) {
            decrementBlackTimer();            
        }
    };
    
    timer.current = setInterval(callback, 1000);

    setIsDelibarateFlags(true);
  }

  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1);
  }

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(Number(localStorage.getItem('gameTime')))
    setBlackTime(Number(localStorage.getItem('gameTime')))
    restart();
  }

  const stopTimer = () => {
    if (!isPause && window.innerWidth <= 992) {
      setIsPause(true);
      setIsDelibarateFlags(true);
    }

    if ((!isPause && window.innerWidth <= 992 && !isFirstStep) || blackTime === 0 || whiteTime === 0
    || board.isCheckAndMate.length || board.isDraw.length || isDelibarateDraw || isDelibarateLoose) {
      setIsDelibarateFlags(false);
    }

    if (isPause) {
      setIsPause(false);

      if (!isDelibarateFlags || blackTime === 0 || whiteTime === 0
      || board.isCheckAndMate.length || board.isDraw.length) {
        return
      }

      startTimer();
    } else if ((timer.current && !isPause)) {
      setIsPause(true);
      clearInterval(timer.current);
    }
  }

  const drawRes = () => {
    const res = confirm('Do you really wanna draw ?');

    if (res) {
      setIsDelibarateDraw(true);
      setIsDelibarateFlags(false);
    }
  }

  const looseRes = () => {
    const res = confirm('Do you really wanna loose ?');

    if (res) {
      setIsDelibarateLoose(true);
      setIsDelibarateFlags(false);
    }
  }

  return (
    <TimerContainer>
        <TimerTime color={'#fff'}>White: <span>{whiteMinutes} : {whiteSeconds}</span></TimerTime>
        <TimerTime color={'#222'}>Black: <span>{blackMinutes} : {blackSeconds}</span></TimerTime>
        <TimerButton onClick={handleRestart}>Restart Game</TimerButton>
        {((whiteTime === 0 || blackTime === 0) && modal) &&
          <WinModal 
            board={board}
            isHistoryModal={isHistoryModal}
            setIsHistoryModal={setIsHistoryModal}
            color={whiteTime === 0 ? Colors.WHITE : Colors.BLACK}
            title="The game is over"
            content={
              <div className='figure-content'>
                <div className="side-figures">
                  <img src={blackTime ? whitePawn : blackPawn} alt="chessImage" className='chessImage' />
                  <img src={blackTime ? whiteRook : blackRook} alt="chessImage" className='chessImage' />
                  <img src={blackTime ? whiteBishop : blackBishop} alt="chessImage" className='chessImage' />
                  <img src={blackTime ? whiteKing : blackKing} alt="chessImage" className='chessImage' />
                  <img src={blackTime ? whiteQueen : blackQueen} alt="chessImage" className='chessImage' />
                  <img src={blackTime ? whiteKnight : blackKing} alt="chessImage" className='chessImage' />
                </div>
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
              <MenuWrapper>
                <MenuButton onClick={stopTimer}>Continue</MenuButton>
                <MenuButton to='/'>Exit</MenuButton>
                {isDelibarateFlags && <Flags>
                  <Flag src={whiteflag} onClick={() => drawRes()} />
                  <Flag src={redflag} onClick={() => looseRes()} />
                </Flags>}
              </MenuWrapper>
            }
            onClose={() => stopTimer()}
          />
        }
        <Pause src={pause} alt={'pause'} onClick={stopTimer} />
        <NavLink to={'/'}>
          <Back src={back} alt={'back'} />
        </NavLink>
    </TimerContainer>
  )
}

export default Timer;