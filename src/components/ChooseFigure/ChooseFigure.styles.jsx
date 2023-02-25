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
    background-color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    width: 100%;
    max-width: 700px;
    padding: 5rem 1rem;
    border: 5px solid ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};

    @media screen and (max-width: 991.98px) {
        padding: 3rem 2rem;
    }
    
    @media screen and (max-width: 767.98px) {
        width: 85vw;
    }
`

export const ChooseTitle = styled.h1`
    color: ${props => props.color === 'black' ? '#222' : '#fff'};
    text-align: center;

    @media screen and (max-width: 991.98px) {
        font-size: 1.75rem;
    }
    
    @media screen and (max-width: 767.98px) {
        font-size: 1.5rem;
    }
    
    @media screen and (max-width: 474.98px) {
        font-size: 1.25rem;
    }
`

export const FigureList = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.75rem;

    @media screen and (max-width: 991.98px) {
        margin-top: 3rem;
    }
    
    @media screen and (max-width: 474.98px) {
        margin-top: 2rem;
    }
`

export const FigureConatiner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    cursor: pointer;

    @media screen and (max-width: 474.98px) {
        width: 30%;
    }
`

export const FigureBody = styled.img`
    width: 4rem;
    
    @media screen and (max-width: 474.98px) {
        width: 3rem;
    }
`

export const FigureTitle = styled.h5`
    text-align: center;
    font-size: 1.25rem;
    color: ${props => props.color === 'black' ? '#fff' : '#222'};
`
