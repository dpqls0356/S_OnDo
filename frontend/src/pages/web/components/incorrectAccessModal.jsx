import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root"); // 모달이 애플리케이션의 루트 엘리먼트에 렌더링되도록 설정

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  h2 {
    font-size: 20px;
  }
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #6769ba;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #121481;
  }
`;

const IncorrectAccessModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="잘못된 접근"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <ModalContent>
        <h2>잘못된 접근입니다.</h2>
        <ModalButton onClick={closeModal}>확인</ModalButton>
      </ModalContent>
    </Modal>
  );
};

export default IncorrectAccessModal;
