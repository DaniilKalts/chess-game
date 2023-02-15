import styled from 'styled-components';

export const TimerContainer = styled.div`
    background-color: #627891;
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .side-figures {
        margin-bottom: 0.5rem;
        img {
            width: 4rem;
        }
    }
`

export const TimerTime = styled.h5`
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${props => props.color};
    text-align: center;
`

export const TimerButton = styled.button`
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 2rem;
    background: #627891;
    color: #fff;
    border: 2px solid #9fa9ba;
    cursor: pointer;
    transition: all 0.25s ease 0s;

    &:hover{
        background: #fff;
        color: #627891;
    }
`