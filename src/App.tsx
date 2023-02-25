import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { LoadingContext } from './context/Loading';
import Game from './pages/Game/Game';
import Menu from './pages/Menu/Menu';
import Settings from './pages/Settings/Settings';
import SettingTime from './pages/SettingTime/SettingTime';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 7200);

    localStorage.setItem('gameTime', JSON.stringify(600));
  }, [])

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', '#627891')
    }
  }, [])

  return (
    <LoadingContext.Provider
      value={loading}
    >
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Menu />} />
          <Route path='/game' element={<Game />} />
          <Route path='/setting-time' element={<SettingTime />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </LoadingContext.Provider>
  );
}

export default App;