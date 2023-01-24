import styled from 'styled-components'

export const Info = styled.div`
  max-width: 225px;
  height: calc(64px * 8);
`

export const InfoTitle = styled.h1`
  font-size: 2.5rem;
  color: #627891;
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
    color: #9fa9ba;
  }
`

export const CurrentPlayer = styled.h3`
  font-size: 1.25rem;
  color: #9fa9ba;
  margin-bottom: 2rem;

  span{
    color: ${props => props.color === 'black' ? '#665e66' : '#fff'};
  }
`