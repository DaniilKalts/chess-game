import styled from 'styled-components';

export const EatenContainer = styled.div`
    width: 250px;
    height: calc(64px * 8);
    padding: 1.5rem;
    background-color: #627891;
    position: relative;
`

export const ChessLogo = styled.img`
    position: absolute;
    top: -50px;
    right: 0;
    width: 50px;
    height: 50px;
`

export const EatenTitle = styled.h3`
    position: absolute;
    top: -28px;
    left: 0;
    color: #fff;
    font-size: 1.75rem;
`

export const EatenName = styled.h4`
    font-size: 22px;
    color: ${props => props.color};
`

export const FiguresList = styled.div`
    margin: 1rem 0 7rem 0;
`

export const FigureBody = styled.img`
    width: 32px;
    height: 32px;
    margin-bottom: 0.5rem;
`