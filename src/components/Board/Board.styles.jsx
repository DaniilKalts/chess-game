import styled from 'styled-components';

export const BoardContainer = styled.div`
  width: calc(64px * 8);
  height: calc(64px * 8);
  display: flex; 
  flex-wrap: wrap;
  position: relative;

  @media screen and (max-width: 1399.98px){
    width: calc(5vw * 8);
    height: calc(5vw * 8);
  }
  
  @media screen and (max-width: 991.98px){
    width: calc(55px * 8);
    height: calc(55px * 8);
  }
  
  @media screen and (max-width: 767.98px){
    width: calc(50px * 8);
    height: calc(50px * 8);
  }
  
  @media screen and (max-width: 474.98px){
    width: calc(10vw * 8);
    height: calc(10vw * 8);
  }
`

export const HorizontalAbs = styled.div`
    position: absolute;
    top: ${props => props.absTop};
    left: ${props => props.absLeft};
    right: ${props => props.absRight};
    bottom: ${props => props.absBtm};
    transform: rotate(${props => props.rotate});
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: ${props => props.rotate === '0deg' ? 'row' : 'row-reverse'};

    @media screen and (max-width: 1399.98px){
      top: ${props => props.absTop === '-4rem' ? '-5vw' : 'auto'};
      bottom: ${props => props.absBtm === '-4rem' ? '-5vw' : 'auto'};
    }

    @media screen and (max-width: 991.98px){
      top: ${props => props.absTop === '-4rem' ? '-55px' : 'auto'};
      bottom: ${props => props.absBtm === '-4rem' ? '-55px' : 'auto'};
    }

    @media screen and (max-width: 767.98px){
      top: ${props => props.absTop === '-4rem' ? '-50px' : 'auto'};
      bottom: ${props => props.absBtm === '-4rem' ? '-50px' : 'auto'};
      display: flex;
    }

    @media screen and (max-width: 474.98px){
      top: ${props => props.absTop === '-4rem' ? '-10vw' : 'auto'};
      bottom: ${props => props.absBtm === '-4rem' ? '-10vw' : 'auto'};
    }
`

export const VerticalAbs = styled.div`
    position: absolute;
    top: ${props => props.absTop};
    left: ${props => props.absLeft};
    right: ${props => props.absRight};
    bottom: ${props => props.absBtm};
    transform: rotate(${props => props.rotate});
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 1399.98px){
      right: ${props => props.absRight === '-4rem' ? '-5vw' : 'auto'};
      left: ${props => props.absLeft === '-4rem' ? '-5vw' : 'auto'};
    }

    
    @media screen and (max-width: 991.98px){
      right: ${props => props.absRight === '-4rem' ? '-55px' : 'auto'};
      left: ${props => props.absLeft === '-4rem' ? '-55px' : 'auto'};
    }

    @media screen and (max-width: 767.98px){
      right: ${props => props.absRight === '-4rem' ? '-50px' : 'auto'};
      left: ${props => props.absLeft === '-4rem' ? '-50px' : 'auto'};
      display: flex;
    }

    @media screen and (max-width: 474.98px){
      right: ${props => props.absRight === '-4rem' ? '-10vw' : 'auto'};
      left: ${props => props.absLeft === '-4rem' ? '-10vw' : 'auto'};
    }
`

export const Abs = styled.p`
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    
    @media screen and (max-width: 1399.98px){
      width: 5vw;
      height: 5vw;
      font-size: 1.5vw;
    }

     
    @media screen and (max-width: 991.98px){
      width: 55px;
      height: 55px;
      font-size: 1.15rem;
    }

    @media screen and (max-width: 767.98px){
      width: 50px;
      height: 50px;
      font-size: 1.1rem;
    }

    @media screen and (max-width: 474.98px){
      width: 10vw;
      height: 10vw;
      font-size: 4vw;
    }
`