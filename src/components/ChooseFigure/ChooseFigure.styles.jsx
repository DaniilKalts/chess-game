import styled from 'styled-components';

export const ChooseContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    background: rgba(0,0,0,0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0;
    visibility: hidden;
    transition: all 0.25s ease 0s;

    &.active{
        opacity: 1;
        visibility: visible;
    }
`

export const ChooseWrapper = styled.div`
    background-color: #9fa9ba;
    width: 100%;
    max-width: 700px;
    padding: 5rem 1rem;
    border: 5px solid #627891;
`

export const ChooseTitle = styled.h1`
    color: ${props => props.color === 'black' ? '#222' : '#fff'};
    text-align: center;
`

export const FigureList = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.75rem;
`

export const FigureConatiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    cursor: pointer;
`

export const FigureBody = styled.img`
    width: 4rem;
`

export const FigureTitle = styled.h5`
    text-align: center;
    font-size: 1.25rem;
    color: ${props => props.color === 'black' ? '#fff' : '#222'};
`