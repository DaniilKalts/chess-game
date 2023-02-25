import styled from 'styled-components';

export const CellBody = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center; 
  box-shadow: ${props => props.isShadow ? 'inset 0 0 18px red, inset 0 0 18px #fff;' : 'none'};
  
    &.black {
        background-color: ${localStorage.getItem('theme') ? localStorage.getItem('theme') : '#627891'};
    }

    &.white {
        background-color: ${localStorage.getItem('theme') === '#627891' ? '#9fa9ba' 
                        : localStorage.getItem('theme') === '#769656' ? '#b0cb95' 
                        : localStorage.getItem('theme') === '#b58863' ? '#f0d9b5' : '#9fa9ba'};
    }

    &.selected {
        background-color: ${localStorage.getItem('theme') === '#627891' ? '#53d2ea' 
                    : localStorage.getItem('theme') === '#769656' ? '#48d03d' 
                    : localStorage.getItem('theme') === '#b58863' ? '#f5984b' : '#53d2ea'};
    }

    &.attacked{
        background-color: #ff0000;
    }

    &.available {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background-color: ${localStorage.getItem('theme') === '#627891' ? '#53d2ea' 
                    : localStorage.getItem('theme') === '#769656' ? '#48d03d' 
                    : localStorage.getItem('theme') === '#b58863' ? '#f5984b' : '#53d2ea'};

        @media screen and (max-width: 474.98px) {
          height: 2.25vw;
          width: 2.25vw;
        }
    }

    @media screen and (max-width: 1399.98px){
      width: 5vw;
      height: 5vw;
    }

    @media screen and (max-width: 991.98px){
      width: 55px;
      height: 55px;
    }

    @media screen and (max-width: 767.98px){
      width: 50px;
      height: 50px;
    }
    
    @media screen and (max-width: 474.98px){
      width: 10vw;
      height: 10vw;
    }
`

export const FigureImg = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  
  @media screen and (max-width: 1399.98px){
    width: 3.75vw;
    height: 3.75vw;
  }

  @media screen and (max-width: 991.98px){
    width: 42.5px;
    height: 42.5px;
  }

  @media screen and (max-width: 767.98px){
    width: 37.5px;
    height: 37.5px;
  }

  @media screen and (max-width: 474.98px){
    width: 7.5vw;
    height: 7.5vw;
  }
`

export const Avilable = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${localStorage.getItem('theme') === '#627891' ? '#53d2ea' 
                    : localStorage.getItem('theme') === '#769656' ? '#48d03d' 
                    : localStorage.getItem('theme') === '#b58863' ? '#f5984b' : '#53d2ea'};
                    
  @media screen and (max-width: 474.98px) {
    height: 2.25vw;
    width: 2.25vw;
  }
`