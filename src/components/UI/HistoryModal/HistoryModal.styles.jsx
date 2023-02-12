import styled from 'styled-components';

export const TimeDialog = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

export const HistoryWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  height: 540px;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  background: ${props => props.color};
  color: ${props => props.color === 'black' ? '#fff' : '#222'};

  .stopWatch{
    width: 8rem;
    position: absolute;
    top: -5rem;
    right: -5rem;
  }

  button {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.6rem 2rem;
    background: transparent;
    color: ${props => props.color === 'white' ? '#222' : '#fff'};
    border: 2px solid ${props => props.color === 'white' ? '#222' : '#fff'};
    cursor: pointer;
    transition: all 0.25s ease 0s;

    &:hover{
        background: ${props => props.color === 'white' ? '#222' : '#fff'};
        color: ${props => props.color === 'white' ? '#fff' : '#222'};
    }
  }

  .history-body {
    display: flex;
    flex-wrap: wrap;
  }

  .figure-content{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.75rem 0;
    overflow-y: auto;
    width: 50%;
  }

  .chessImage{
    width: 10rem;
    margin: 1rem 0;
  }

  h3 {
    color: #ffd963;
  }

  h4{
    font-size: 1.25rem;
    color: #fff;
    margin-top: 1rem;
  }

  img{
    width: 4rem;
  }

  .empty__movements {
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
`

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;

  border-bottom: 1px solid #dbdbdb;
  justify-content: space-between;
`

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
`

export const ModalClose = styled.span`
  cursor: pointer;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
  font-size: 2rem;
`

export const ModalBody = styled.div`
  overflow: auto;
  height: 100%;
  ::-webkit-scrollbar {
      background-color: transparent;
      width: 6px;
  }

  ::-webkit-scrollbar-thumb {
      background-color: #9fa9ba;
  }
`

export const ModalContent = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ModalFooter = styled.footer`
  display: flex;
  align-items: center;
  padding: 1rem;

  border-top: 1px solid #dbdbdb;
  justify-content: flex-end;
`