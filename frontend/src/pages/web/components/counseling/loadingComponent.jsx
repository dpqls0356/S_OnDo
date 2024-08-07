import { useEffect, useRef } from "react";
import styled from "styled-components";

const View = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(173, 216, 230, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(173, 216, 230, 1) 0%,
    rgba(135, 206, 250, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(173, 216, 230, 1)),
    color-stop(100%, rgba(135, 206, 250, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(173, 216, 230, 1) 0%,
    #4c87ab 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(173, 216, 230, 1) 0%,
    #4c87ab 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(173, 216, 230, 1) 0%,
    #4c87ab 100%
  );
  background: linear-gradient(45deg, rgba(173, 216, 230, 1) 0%, #4c87ab 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#add8e6', endColorstr='#87cefa', GradientType=1 );
  font-family: "Montserrat", sans-serif;
  div {
    min-width: 500px;
    background: rgba(255, 255, 255, 0.85);
    padding: 40px 60px;
    border-radius: 10px;
    box-shadow: -2px 19px 59px 0px rgb(71, 110, 157);
    h1 {
      z-index: 1;
      line-height: normal;
      font-size: 8em;
      color: #4c87ab 100%;
      position: relative;
      margin: 0px;
      &:after {
        z-index: 0;
        content: attr(data-back);
        width: 0%;
        height: 100%;
        background: #4c87ab 100%;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        position: absolute;
        left: 0px;
        top: 0px;
        animation: backMasking 1s infinite;
      }
    }
  }

  @keyframes backMasking {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  @-webkit-keyframes backMasking {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  @media (max-width: 360px) {
    & {
      width: 360px; /* 화면 너비가 360px 이하일 때 width 값 */
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & div {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 80%;
      background: rgba(255, 255, 255, 0.85);
      padding: 40px 60px;
      border-radius: 10px;
      box-shadow: -2px 19px 59px 0px rgb(71, 110, 157);
      h1 {
        width: fit-content;
        height: fit-content;
        font-size: 30px;
        color: #4c87ab 100%;
        position: relative;
        margin: 0px;
        &:after {
          content: attr(data-back);
          background: #4c87ab 100%;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          position: absolute;
          animation: backMasking 1s infinite;
        }
      }
    }
  }
`;

const LoadingComponent = () => {
  return (
    <View>
      <div>
        <h1 data-back="Loading">Loading</h1>
      </div>
    </View>
  );
};

export default LoadingComponent;
