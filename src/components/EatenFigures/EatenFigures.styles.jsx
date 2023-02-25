import styled from 'styled-components';

export const EatenContainer = styled.div`
    width: 250px;
    height: calc(64px * 8);
    padding: 1.5rem;
    background-color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    position: relative;

    @media screen and (max-width: 1399.98px){
        width: 225px;
        height: calc(5vw * 8);  
    }
    
    @media screen and (max-width: 1199.98px){
        width: 200px;
        padding: 1.5rem 1rem;
    }

    @media screen and (max-width: 991.98px) {
        display: none;
    }
`

export const ChessLogo = styled.img`
    position: absolute;
    top: -50px;
    right: 0;
    width: 50px;
    height: 50px;

    @media screen and (max-width: 1399.98px){
        top: -44px;
        width: 44px;
        height: 44px;
    }
    
    @media screen and (max-width: 1199.98px){
        top: -38px;
        width: 38px;
        height: 38px;
    }
`

export const EatenTitle = styled.h3`
    position: absolute;
    top: -28px;
    left: 0;
    color: #fff;
    font-size: 1.75rem;

    @media screen and (max-width: 1399.98px){
        font-size: 1.85vw;
        top: -1.85vw;
    }
    
    @media screen and (max-width: 1199.98px){
        font-size: 2vw;
        top: -2vw;
    }
`

export const EatenName = styled.h4`
    font-size: 22px;
    color: ${props => props.color};

    @media screen and (max-width: 1199.98px){
        font-size: 1.8vw;
    }
`

export const FiguresList = styled.div`
    margin: ${props => 
        ((props.blackFigures + props.whiteFigures) < 9) ? '1rem 0 7rem 0' :
        ((props.blackFigures + props.whiteFigures) < 24) ? '1rem 0 5rem 0' : '1rem 0 2rem 0'};
`

export const FigureBody = styled.img`
    width: 32px;
    height: 32px;
    margin-bottom: 0.5rem;

    @media screen and (max-width: 1399.98px){
        width: 28px;
        height: 28px;
    }
`

export const Flags = styled.div`
    display: flex;
    align-items: center;
    column-gap: 3rem;
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
`

export const Flag = styled.img`
    width: 2.5rem;
    cursor: pointer;
    
    @media screen and (max-width: 1399.98px){
        width: 3.5vw;
    }
`

export const Score = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`
