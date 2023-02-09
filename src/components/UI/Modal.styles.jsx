import styled from 'styled-components';

export const ModalDialog = styled.div`
  width: 100%;
  max-width: 550px;
  background: white;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: calc(64px * 8);
  top: -50px;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: slide-in;
  animation-duration: 0.5s;

  background: ${props => props.color === 'white' ? '#222' : '#fff'};
  color: ${props => props.color === 'white' ? '#fff' : '#222'};
  
  @keyframes slide-in {
    from {
      transform: translateY(-150px);
    }
    to {
      transform: translateY(0);
    }
  }

  .figure-content{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #dbdbdb;
    h6{
      font-size: 1rem;
    }
  }

  .modal__figure{
    width: 3.5rem;
  }

  p{
    margin-top: 1rem;
  }

  h5{
    margin-top: 1rem;
    font-size: 1.25rem;
    text-align: center;
    color: #ff0000;
  }

  button {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.6rem 2rem;
    background: transparent;
    color: ${props => props.color === 'black' ? '#222' : '#fff'};
    border: 2px solid ${props => props.color === 'black' ? '#222' : '#fff'};
    cursor: pointer;
    transition: all 0.25s ease 0s;

    &:hover{
        background: ${props => props.color === 'black' ? '#222' : '#fff'};
        color: ${props => props.color === 'black' ? '#fff' : '#222'};
    }
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