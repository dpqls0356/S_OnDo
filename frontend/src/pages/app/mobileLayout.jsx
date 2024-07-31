import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const View = styled.div`
  position: relative;
  background-color: #fff9e9;
  width: 390px;
  margin: auto;
  height: 100vh;
  overflow-y: hidden;
  box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;
  @font-face {
    font-family: "PFStardust";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/PFStardust.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;
export default function MobileLayout() {
  return (
    <View>
      <Outlet />
    </View>
  );
}
