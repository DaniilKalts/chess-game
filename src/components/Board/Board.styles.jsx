import styled from 'styled-components';

export const BoardContainer = styled.div`
  width: calc(64px * 8);
  height: calc(64px * 8);
  display: flex; 
  flex-wrap: wrap;
  position: relative;
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
    flex-direction: ${props => props.rotate === '0deg' ? 'column-reverse' : 'column'};
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
`