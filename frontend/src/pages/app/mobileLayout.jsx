import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../../components/app/Footer";
import useAuthStore from "../../store/app/authStore";
import IncorrectAccessModal from "../../pages/web/components/counselorNotFoundPage";

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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const { role } = useAuthStore((state) => ({ user: state.role }));

  useEffect(() => {
    const checkAuthentication = async () => {
      // 현재 경로가 /member/로 시작하는지 확인하고 올바른 유저인지 판단
      if (
        location.pathname.startsWith("/member/") &&
        !location.pathname.startsWith("/member/login") &&
        !location.pathname.startsWith("/member/join")
      ) {
        console.log("hegrer,jnfskldfj");
        setIsModalOpen(true);
      }
    };

    checkAuthentication();
  }, [navigate, location.pathname]);

  const mobileCloseModal = async () => {
    console.log("mobileLayout");
    setIsModalOpen(false);
    if (role != null && role !== "COUNSELOR") {
      navigate("/counselor");
    } else if (role === null || role !== "USER") {
      navigate("/member/login");
    }
  };

  // Footer를 제외할 경로 목록
  const noFooterPaths = [
    "/member",
    "/member/",
    "/member/join",
    "/member/login",
    "/member/name",
    "/member/chat",
  ];

  // 현재 경로가 noFooterPaths에 포함되어 있는지 확인
  const shouldShowFooter = !noFooterPaths.includes(location.pathname);
  return (
    <View>
      <Outlet />
      {shouldShowFooter && <Footer id="footer" />}
      <IncorrectAccessModal
        isOpen={isModalOpen}
        closeModal={mobileCloseModal}
      />
    </View>
  );
}
