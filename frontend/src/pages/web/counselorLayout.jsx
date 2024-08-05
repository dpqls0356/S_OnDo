import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import ReservationSpot from "./components/ReservationSpot";
import useAuthStore from "../../store/app/authStore";
import IncorrectAccessModal from "./components/incorrectAccessModal";

const View = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const HomeLeft = styled.div`
  height: 100%;
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
`;
const HomeRight = styled.div`
  height: 100%;
  width: 250px;
  background-color: #6769ba;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Profile = styled.div`
  padding: 50px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .profile-img {
    width: 120px;
    height: 120px;
    & > svg {
      color: black;
      width: 100%;
      height: 100%;
    }
  }
  & > .username {
    color: black;
    margin-top: 10px;
    font-size: 25px;
  }
`;
const StyledLink = styled(Link)`
  color: white;
  padding: 10px 20px;
`;

const Nav = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const LogoutBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 10px;
`;

const ChangeSpot = styled.div`
  width: 50%;
`;

function CounselorLayout() {
  const checkLoggedIn = useAuthStore((state) => state.checkLoggedIn);
  const counselorLogout = useAuthStore((state) => state.counselorLogout);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = async () => {
    console.log("logout");
    await counselorLogout();
    navigate("/counselor/login");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/counselor/login");
  };

  // 로그인 페이지에 들어올 때마다 인증 여부 확인
  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedIn = await checkLoggedIn();
      console.log("layout: " + loggedIn);
      if (!loggedIn) {
        setIsModalOpen(true);
      }
    };

    checkAuthentication();
  }, [checkLoggedIn, navigate]);

  return (
    <View>
      <HomeLeft>
        <ReservationSpot />
        <ChangeSpot>
          <Outlet />
        </ChangeSpot>
      </HomeLeft>
      <HomeRight>
        <Profile>
          {false ? (
            <div className="profile-img">
              <img src="" alt="Profile" />
            </div>
          ) : (
            <div className="profile-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          )}
          <div className="username">김싸피 상담사님</div>
        </Profile>
        <Nav>
          <StyledLink to="">일정관리</StyledLink>
          <StyledLink to="">상담내역</StyledLink>
          <StyledLink to="">마이페이지</StyledLink>
          <StyledLink to="">비밀번호 변경</StyledLink>
        </Nav>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      </HomeRight>
      <IncorrectAccessModal isOpen={isModalOpen} closeModal={closeModal} />
    </View>
  );
}

export default CounselorLayout;
