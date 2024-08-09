import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Forest from "./components/forest";
// 기본 바탕을 z-index 10d으로 해서 클릭 막기
// 버튼 레이아웃의 z-index를 20으로 하기 + 부모 설정해서 위치 조정
const View = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const Story = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const renderView = () => {
    switch (clickCount) {
      case 0:
        return <Forest clickCount={clickCount} handleClick={handleClick} />;
    }
  };

  return <View>{renderView()}</View>;
};

export default Story;
