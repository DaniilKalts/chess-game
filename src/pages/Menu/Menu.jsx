import React, { useState, useEffect, useRef, useContext } from 'react'
import { LoadingBody, LoadingIcon, LoadingTitle, LoadingWrapper, MenuButton, MenuWrapper, ProgressBar, ProgressBarBody } from './Menu.styles';
import raccoonGif from '../../assets/images/raccoon-loader.gif';

import { Textillate } from 'textillate-react'
import { LoadingContext } from '../../context/Loading';

const Menu = () => {
  const ref = useRef(null)
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirstText, setIsFirstText] = useState(true);
  const [percent, setPercent] = useState(0);

  const loading = useContext(LoadingContext);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstText(false);
    }, 6000);
  }, []);

  useEffect(() => {
    let arr = [];
    for (var i = 1; i <= 100; i++) {
      (function(index) {
          setTimeout(function() { 
            index % 10 === 0 ? arr.push(index) : '';
            setPercent(index);
            if (index === 100) {
              setTimeout(() => {
                setIsLoaded(true);
              }, 1000);
            }
          }, i * 65);
      })(i);
  }
  }, [])

  return (
    <>
      {(!loading) &&
      <MenuWrapper>
        <MenuButton to='/setting-time'>Play</MenuButton>
        <MenuButton to='/settings'>Settings</MenuButton>
      </MenuWrapper>}
      {(!isLoaded && loading) && <LoadingWrapper>
          <LoadingBody>
            <LoadingTitle isVisible={isFirstText}>          
              <Textillate
                option={{
                  in: {
                    effect: 'fadeInDownBig', 
                    delayScale: 2.5,
                  },
                  out: {
                    effect: 'fadeOut', 
                    delayScale: 2.5,
                  },
                  loop: true,
                }}
              >Raccoon Studio</Textillate>
            </LoadingTitle>
          <LoadingIcon src={raccoonGif} alt="my-gif" />
          <ProgressBar>
              <ProgressBarBody wdth={percent}>{percent}%</ProgressBarBody>
          </ProgressBar>
        </LoadingBody>
      </LoadingWrapper>}
{/* 
      <MenuWrapper>
        <MenuButton to='/game'>Play</MenuButton>
        <MenuButton to='/settings'>Settings</MenuButton>
      </MenuWrapper> */}
    </>
  )
}

export default Menu;