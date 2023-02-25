import styled from 'styled-components';

export const TimerContainer = styled.div`
    background-color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    @media screen and (max-width: 991.98px){
        margin-top: 4rem;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width: calc(55px * 8);
    }

    @media screen and (max-width: 767.98px){
        width: calc(50px * 8);
    }

    @media screen and (max-width: 474.98px){
        padding: 1.5rem 1rem;
        width: calc(10vw * 8);
    }
`

export const TimerTime = styled.h5`
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${props => props.color};
    text-align: center;

    @media screen and (max-width: 1399.98px){
        font-size: 24px;
    }

    @media screen and (max-width: 1199.98px){
        font-size: 22px;
    }
    
    @media screen and (max-width: 991.98px){
        font-size: 1.45rem;
        width: 50%;
    }
    
    @media screen and (max-width: 474.98px){
        font-size: 4.75vw;
    }
`

export const TimerButton = styled.button`
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 2rem;
    background: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    color: #fff;
    border: 3px solid ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
    cursor: pointer;
    transition: all 0.25s ease 0s;

    &:hover{
        background: #fff;
        color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    }

    @media screen and (max-width: 1199.98px){
        font-size: 14px;
        padding: 0.75rem 1.25rem;
    }
    
    @media screen and (max-width: 991.98px){
        margin-top: 0.45rem;
        font-size: 1.05rem;
    }
    
    @media screen and (max-width: 474.98px){
        margin-top: 2vw;
        font-size: 4vw;
    }
`

export const Pause = styled.img`
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 3rem;
    cursor: pointer;

    @media screen and (max-width: 474.98px){
        top: 4vw;
        right: 4vw;
        width: 8vw;
    }

    @media screen and (max-width: 424.98px){
        top: 6vw;
        right: 6vw;
        width: 12vw;
    }
`
export const Back = styled.img`
    position: absolute;
    top: 3rem;
    left: 2rem;
    width: 3rem;
    transform: rotate(180deg);
    cursor: pointer;

    @media screen and (max-width: 991.98px){
        display: none;
    }
`

export const Flags = styled.div`
    display: none;
    
    @media screen and (max-width: 991.98px) {
        display: flex;
        align-items: center;
        column-gap: 3rem;   
    }
`

export const Flag = styled.img`
    width: 3rem;
    cursor: pointer;
        
    @media screen and (max-width: 574.98px) {
        width: 2.5rem;
    }
`