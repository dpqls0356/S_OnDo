import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import ReservationSpot from "./components/checkReservation/ReservationSpot";
import useAuthStore from "../../store/app/AuthStore";
import IncorrectAccessModal from "./components/incorrectAccessModal";
import Centerpage from "./centerpage";

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
  const { role, user, counselorLogout, checkAuth } = useAuthStore((state) => ({
    role: state.role,
    counselorLogout: state.counselorLogout,
    checkAuth: state.checkAuth,
  }));
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = async () => {
    console.log("logout");
    await counselorLogout();
    navigate("/counselor/login");
  };

  const counselorCloseModal = () => {
    setIsModalOpen(false);
    //로그인이 안된 경우
    if (!role) {
      navigate("/counselor/login");
    }
    //로그인이 되어있는데 유저인 경우
    else if (role === "USER") {
      navigate("/member/home");
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      console.log("counselorLayout - role:", role, "user:", user);
      // await checkAuth(); // 인증 상태를 먼저 확인합니다.

      //로그인이 안된 경우 또는 로그인이 되어있긴한데 유저가 해당 페이지로 와버린 경우
      if (!role || role !== "COUNSELOR") {
        setIsModalOpen(true);
      }
    };

    checkAuthentication();
  }, [role, user, checkAuth]);

  return (
    <View>
      <HomeLeft>
        <ReservationSpot />
        <ChangeSpot>
          <Centerpage />
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
                className="size-6"
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
          <StyledLink to="daylist/상담사아이디">상담내역</StyledLink>
          <StyledLink to="mypage">마이페이지</StyledLink>
          <StyledLink to="updatepassword/상담사아이디">
            비밀번호 변경
          </StyledLink>
        </Nav>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      </HomeRight>
      <IncorrectAccessModal
        isOpen={isModalOpen}
        closeModal={counselorCloseModal}
      />
    </View>
  );
}

export default CounselorLayout;
