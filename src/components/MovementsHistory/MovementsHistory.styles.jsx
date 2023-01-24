import styled from 'styled-components';

export const MovementsContainer = styled.div`
    height: 115px;
    background-color: #627891;
    padding: 1.35rem 1.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        background-color: transparent;
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #9fa9ba;
    }
`

export const MovementsTitle = styled.h3`
    margin: 1.5rem 0;
    font-size: 1.5rem;
    color: #fff;
`

export const MovementBody = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`

export const MovementStep = styled.h5`
    font-size: 1.25rem;
    color: #fff;
    text-transform: uppercase;
`

export const MovementFigure = styled.img`
    width: 28px;
    height: 28px;
`

export const MovementSpace = styled.div`
    width: 1.5rem;
    height: 2px;
    background: #fff;
`