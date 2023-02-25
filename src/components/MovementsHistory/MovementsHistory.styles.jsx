import styled from 'styled-components';

export const MovementsContainer = styled.div`
    height: 115px;
    background-color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
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
        background-color: ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
    }

    @media screen and (max-width: 991.98px) {
        display: none;
    }
`

export const MovementsTitle = styled.h3`
    margin: 1.5rem 0;
    font-size: 1.5rem;
    color: #fff;

    @media screen and (max-width: 1399.98px){
        font-size: 1.25rem;
    }

    @media screen and (max-width: 991.98px) {
        display: none;
    }
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

    @media screen and (max-width: 1399.98px){
        font-size: 1.15rem;
    }
`

export const MovementFigure = styled.img`
    width: 28px;
    height: 28px;

    @media screen and (max-width: 1399.98px){
        width: 26px;
        height: 26px;
    }
`

export const MovementSpace = styled.div`
    width: 1.5rem;
    height: 2px;
    background: #fff;
`