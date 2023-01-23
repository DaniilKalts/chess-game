import styled from 'styled-components'

export const Info = styled.div`
  max-width: 200px;
  height: calc(64px * 8);
`

export const InfoTitle = styled.h1`
  font-size: 2.5rem;
  color: #627891;

  span{
    color: #9fa9ba;
  }
`

export const InfoText = styled.p`
    color: #fff;
`

export const CurrentPlayer = styled.h3`
  color: #9fa9ba;
  span{
    color: ${props => props.color === 'black' ? '#000' : '#fff'};
  }
`