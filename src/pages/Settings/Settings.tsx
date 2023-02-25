import React from 'react'
import { Back, HeaderBlock, SettingsBody, SettingsHeader, SettingsIcon, SettingsText, SettingsTitle, SettingsWrapper, ThemeBlock, ThemeImage, ThemeTitle } from './Settings.styles';

import darkCyan from '../../assets/images/darkcyan.jpg';
import brown from '../../assets/images/brown.jpg';
import green from '../../assets/images/green.jpg';
import { NavLink } from 'react-router-dom';

import back from '../../assets/images/arrow_right.svg';

const Settings = () => {
  const changeTheme = (theme: string) => {
    localStorage.setItem('theme', theme)
    location.reload();
  }

  return (
    <SettingsWrapper>
        <SettingsHeader>
            <HeaderBlock>
                <SettingsIcon />
                <SettingsTitle>Settings</SettingsTitle>
            </HeaderBlock>
            <SettingsText>Feel free to click on one of these themes and play chess with your opponents ;D</SettingsText>
        </SettingsHeader>
        <SettingsBody>
            <ThemeBlock>
                <ThemeImage src={darkCyan} onClick={() => changeTheme('#627891')} />
                <ThemeTitle  color={'#9fa9ba'}>Dark Cyan</ThemeTitle>
            </ThemeBlock>
            <ThemeBlock>
                <ThemeImage src={brown} onClick={() => changeTheme('#b58863')} />
                <ThemeTitle color={'#f0d9b5'}>Brown</ThemeTitle>
            </ThemeBlock>
            <ThemeBlock>
                <ThemeImage src={green} onClick={() => changeTheme('#769656')} />
                <ThemeTitle color={'#b0cb95'}>Green</ThemeTitle>
            </ThemeBlock>
        </SettingsBody>
        <NavLink to={'/'}>
          <Back src={back} alt={'back'} />
        </NavLink>
    </SettingsWrapper>
  )
}

export default Settings;