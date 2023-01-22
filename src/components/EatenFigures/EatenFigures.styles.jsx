import styled from 'styled-components';

export const EatenContainer = styled.div`
    width: 250px;
    height: calc(64px * 8);
    padding: 1.5rem;
    background-color: #627891;
`

export const EatenTitle = styled.h3`
    font-size: 22px;
    color: ${props => props.color};
`

export const FiguresList = styled.div`
    margin: 1rem 0 10rem 0;
`

export const FigureBody = styled.img`
    width: 32px;
    height: 32px;
    margin-bottom: 0.5rem;
`