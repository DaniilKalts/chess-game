import styled from 'styled-components';
import chessImage from '../../assets/images/chess.png';
import raccoonImage from '../../assets/images/raccoon.png';
import { Link } from "react-router-dom";

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    background: ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
    padding: 3rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};

    &::before{
        content: '';
        position: absolute;
        background-image: url(${chessImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 6rem;
        height: 6rem;
        top: 0;
        left: 80%;
        transform: translate(-50%, -100%);
    }

    &::after{
        content: '';
        position: absolute;
        background-image: url(${raccoonImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 9rem;
        height: 9rem;
        top: 14%;
        left: -18%;
        transform: translate(50%, -100%);
    }

    @media screen and (max-width: 574.98px) {
        &::before{
            width: 3rem;
            height: 3rem;
        }

        &::after{
            width: 6rem;
            height: 6rem;
            top: 11%;
            left: -10%;
        }
    }
`

export const MenuButton = styled(Link)`
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.75rem 0;
    width: 16rem;
    background: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    color: #fff;
    border: 3px solid ${localStorage.getItem('theme') === '#627891' ? '#8192a4' 
                        : localStorage.getItem('theme') === '#769656' ? '#b0cb95' 
                        : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#8192a4'};
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    transition: all 0.25s ease 0s;

    &:hover{
        background: #fff;
        color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
        border: 3px solid ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    }

    @media screen and (max-width: 574.98px) {
        font-size: 1.25rem;
        width: 12rem;
    }
    
    @media screen and (max-width: 424.98px) {
        font-size: 1.15rem;
        width: 12rem;
    }
`

export const MenuIcon = styled.img`
    width: 8rem;
`

export const LoadingWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`

export const LoadingBody = styled.div`
    position: relative;
    top: -3.5rem;
`

export const LoadingTitle = styled.h3`
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    position: relative;
    top: 6rem;
    color: #ffba15;
    transition: all 0.25s ease 0s;
    opacity: ${props => props.isVisible ? '1' : '0'};
        
    @media screen and (max-width: 767.98px) {
        font-size: 2.5rem;
        top: 4.5rem;
    }
      
    @media screen and (max-width: 424.98px) {
        font-size: 10vw;
    }
`

export const LoadingIcon = styled.img`
    width: 40rem;
    
    @media screen and (max-width: 767.98px) {
        max-width: 35rem;
        width: 100vw;
    }      
`

export const ProgressBar = styled.div`
    width: 16rem;
    margin: 0 auto;
    background: #fff;
    border: 2px solid #222;

    @media screen and (max-width: 474.98px) {
        width: 14rem;
    }    
`

export const ProgressBarBody = styled.div`
    width: ${props => `${props.wdth}%`};
    height: 2.75rem;
    background-color: #222;
    color: #ffba15;
    font-size: 1.5rem;
    font-weight: bold;
    padding: ${props => props.wdth > 15 ? '0.5rem 1rem' : ''};

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    transition: all ease 0.25s;
        
    @media screen and (max-width: 474.98px) {
        font-size: 1.35rem;
        height: 2.5rem;
    }    
`
