import React, { useState } from "react";
import styled from "styled-components";

const PreJoinView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
  @media (max-width: 360px) {
    & {
      width: 360px; /* 화면 너비가 360px 이하일 때 width 값 */
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  @media (max-width: 360px) {
    & {
      width: 80%; /* 화면 너비가 360px 이하일 때 width 값 */
    }
  }
`;

const PreJoinComponent = ({ onJoin }) => {
  const [micStatus, setMicStatus] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(true);

  const handleJoin = () => {
    onJoin({ micStatus, cameraStatus });
  };

  return (
    <PreJoinView>
      <h2>마이크 및 카메라 설정</h2>
      <div>
        <Button onClick={() => setMicStatus(!micStatus)}>
          {micStatus ? "마이크 끄기" : "마이크 켜기"}
        </Button>
        <Button onClick={() => setCameraStatus(!cameraStatus)}>
          {cameraStatus ? "카메라 끄기" : "카메라 켜기"}
        </Button>
        <Button onClick={handleJoin}>상담 입장하기</Button>
      </div>
    </PreJoinView>
  );
};

export default PreJoinComponent;
