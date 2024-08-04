import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../../components/app/Footer";

const View = styled.div`
  position: relative;
  background-color: #fff9e9;
  width: 100%;
  max-width: 420px;
  // max-height: 1000px;
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
  const location = useLocation();

  // Footer를 제외할 경로 목록
  const noFooterPaths = ['/member', '/member/', '/member/join', '/member/login', '/member/name','/member/chat'];

  // 현재 경로가 noFooterPaths에 포함되어 있는지 확인
  const shouldShowFooter = !noFooterPaths.includes(location.pathname);
  return (
    <View>
      <Outlet />
      {shouldShowFooter && <Footer id="footer" />}
    </View>
  );
}
