import styled from 'styled-components';

import icon from '../../assets/images/settings.svg'

export const SettingsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding: 2rem 3rem;
    min-height: 100vh;
`

export const SettingsHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4rem;
`

export const HeaderBlock = styled.header`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
`

export const SettingsText = styled.p`
    font-size: 1.25rem;
    color: ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
    text-align: center;
    max-width: 450px;
    margin-top: 1rem;
    padding: 0 2rem;

    @media screen and (max-width: 474.98px) {
        font-size: 1.15rem;
        padding: 0;
    }
`

export const SettingsIcon = styled.div`
    width: 3.25rem;
    height: 3.25rem;
    background-color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    mask: url(${icon}) no-repeat center / contain;
        
    @media screen and (max-width: 474.98px) {
        width: 3rem;
        height: 3rem;
    }
`

export const SettingsTitle = styled.h3`
    color: ${localStorage.getItem('theme') === '#627891' ? '#8192a4' 
            : localStorage.getItem('theme') === '#769656' ? '#b0cb95' 
            : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#8192a4'};
    font-size: 2rem;
    
    @media screen and (max-width: 474.98px) {
        font-size: 1.75rem;
    }
`

export const SettingsBody = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    column-gap: 4rem;
    row-gap: 2rem;

    @media screen and (max-width: 767.98px) {
        row-gap: 4rem;
    }

    @media screen and (max-width: 474.98px) {
        row-gap: 3rem;
    }
`

export const ThemeBlock = styled.div`

`

export const ThemeImage = styled.img`
    width: 20rem;
    cursor: pointer;

    @media screen and (max-width: 474.98px) {
        width: 15rem;
    }
`

export const ThemeTitle = styled.h4`
    color: ${props => props.color};
    font-size: 1.75rem;
    margin-top: 1rem;
    text-align: center;
`

export const Back = styled.img`
    width: 4rem;
    transform: rotate(180deg) ;
    margin-top: 4rem;

    @media screen and (max-width: 767.98px) {
        margin-bottom: 1rem;
    }

    @media screen and (max-width: 474.98px) {
        margin-top: 3rem;
    }
`    