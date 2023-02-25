import styled from 'styled-components'

export const Info = styled.div`
  width: 225px;
  height: calc(64px * 8);

  @media screen and (max-width: 1199.98px){
    width: 190px;
  }

  @media screen and (max-width: 991.98px){
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }
`

export const InfoTitle = styled.h1`
  font-size: 2.5rem;
  color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  position: relative;

  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #fff;
  }

  span{
    color: ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
  }

  @media screen and (max-width: 1399.98px){
    font-size: 2.75vw;
  }

  @media screen and (max-width: 1199.98px){
    font-size: 3.25vw;
  }

  @media screen and (max-width: 991.98px) {
    display: none;
  }
`

export const CurrentPlayer = styled.h3`
  font-size: 1.25rem;
  color: ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                : localStorage.getItem('theme') === '#769656' ? '#e0e0c6' 
                : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
  margin-bottom: 2rem;

  span{
    color: ${props => props.color === 'black' ? '#665e66' : '#fff'};
  }

  @media screen and (max-width: 1399.98px){
    font-size: 1.55vw;
  }

  @media screen and (max-width: 991.98px){
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 0;
  }

  @media screen and (max-width: 474.98px){
    font-size: 6vw;
    margin-top: 8vw;
  }
`