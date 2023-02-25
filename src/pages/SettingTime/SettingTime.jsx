import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './SettingTime.css';

const SettingTime = () => {
  const [gameTime, setGametTime] = useState('');
  let navigate = useNavigate();

  const getStarted = () => {
    if (!gameTime) {
      alert('Fill the timer field to get started!')
      return
    } else if (gameTime && Number(gameTime.slice(0,2) + gameTime.slice(3,5)) > 1000) {
      alert(`Time can't exceed 10 minutes!`);
      return
    }

    localStorage.setItem('gameTime', JSON.stringify(Number(gameTime.slice(0,2)) * 60 + Number(gameTime.slice(3,5))));

    navigate('/game');
  }

  return (
    <div className={`styled ${localStorage.getItem('theme') === '#627891' ? 'cyan'
    : localStorage.getItem('theme') === '#769656' ? 'green' 
    : localStorage.getItem('theme') === '#b58863' ? 'brown' : 'cyan'}`} id="target">
        <div className="parent flex">
            <div className="flex__child">
                <div>
                    <label htmlFor="standard">Timer</label>
                    <input type="time" min="02:00" max="10:00" id="standard" required onInput={e => setGametTime(e.target.value)} />
                </div>
                <button className={`btn`} onClick={() => getStarted()}>Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default SettingTime;