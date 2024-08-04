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
      @font-face {
     font-family: 'DungGeunMo';
     src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }
  @font-face {
    font-family: '양진체';
    src: url('https://fastly.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
      font-family: 'NIXGONM-Vb';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
    font-family: 'NIXGONFONTS B 2.0'
    src: url('./../fonts/NIXGONFONTS B 2.0.ttf')
  }
  @font-face {
    font-family: 'NIXGONFONTS L 2.0'
    src: url('./../fonts/NIXGONFONTS L 2.0.ttf')
  }
  @font-face {
    font-family: 'NIXGONFONTS M 2.0'
    src: url('./../fonts/NIXGONFONTS M 2.0.ttf')
  }
  @font-face {
    font-family: 'morris9'
    src: url('./../fonts/모리스체-heroine762.ttf')
  }
  @font-face {
    font-family: 'PF스타더스트'
    src: url('./../fonts/PF스타더스트.ttf')
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
