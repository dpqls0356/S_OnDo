import React, { useState } from "react";
import styled from "styled-components";

const PreJoinView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: "Jua", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
  background-color: #3b3a83;
`;

const Box = styled.div`
  width: 33%;
  padding: 50px 0px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 360px) {
    & {
      width: 360px; 
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
  width: 100%;
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  /* 마이크가 켜져 있는 상태일 때만 hover 시 빨간색 배경 적용 */
  &:hover {
    background-color: ${(props) => (props.isMicOn ? "red" : "initial")};
    color: ${(props) => (props.isMicOn ? "white" : "initial")};
  }

  @media (max-width: 360px) {
    & {
      width: 80%; 
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
      <Box>
        <h2>마이크 및 카메라 설정</h2>
        <div>
          <Button isMicOn={micStatus} onClick={() => setMicStatus(!micStatus)}>
            {micStatus ? "마이크 끄기" : "마이크 켜기"}
          </Button>
          <Button onClick={() => setCameraStatus(!cameraStatus)}>
            {cameraStatus ? "카메라 끄기" : "카메라 켜기"}
          </Button>
          <Button onClick={handleJoin}>상담 입장하기</Button>
        </div>
      </Box>
    </PreJoinView>
  );
};

export default PreJoinComponent;
