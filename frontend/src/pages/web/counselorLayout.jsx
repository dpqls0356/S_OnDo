import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import ReservationSpot from "./components/checkReservation/ReservationSpot";
import useAuthStore from "../../store/app/authStore";
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
// const Profile = styled.div`
//   padding: 50px 0px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   & > .profile-img {
//     width: 120px;
//     height: 120px;
//     & > svg {
//       color: black;
//       width: 100%;
//       height: 100%;
//     }
//   }
//   & > .username {
//     color: black;
//     margin-top: 10px;
//     font-size: 25px;
//   }
// `;

const Profile = styled.div`
  padding: 50px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .profile-img-container {
    width: 200px;
    height: 200px;
    border: 3px black solid;
    background-color: #fff7f7;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 20px; // 이미지와 이름 사이의 간격
  }
  
  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 이미지가 컨테이너를 꽉 채우도록 함
  }
  
  .username {
    color: black;
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

const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";


function CounselorLayout() {
  const { role, user, counselorLogout, checkAuth } = useAuthStore((state) => ({
    role: state.role,
    user: state.user,
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
        <div className="profile-img-container">
          {user?.profileUrl ? (
            <img className="profile-img" src={user.profileUrl} alt="프로필" />
          ) : (
            <img className="profile-img" src={mainProfileUrl} alt="기본 프로필" />
          )}
        </div>
        <div className="username">{user?.name} 상담사님</div>
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
