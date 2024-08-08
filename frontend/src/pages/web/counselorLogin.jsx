import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/app/AuthStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IncorrectAccessModal from "./components/incorrectAccessModal";
import LogoImg from "./../../assets/images/onDo로고_그림자.png";

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 20%;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 300;
  color: #888;
  margin-bottom: 40px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3); /* 텍스트 그림자 추가 */
`;

const Input = styled.input`
  width: 320px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fceeee;
  text-align: center;
  font-size: 1rem;
  color: #888;
  &:hover,
  &:focus {
    outline: none;
  }
  &:nth-child(1) {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 100%;
  padding: 10px;
  margin-left: 20px;
  border-radius: 10px;
  border: none;
  background-color: #ffd8a1;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover,
  &:focus {
    outline: none;
    background-color: #fec069;
  }
`;
const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CounselorLogin = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const counselorLogin = useAuthStore((state) => state.counselorLogin);
  const checkLoggedIn = useAuthStore((state) => state.checkLoggedIn);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      await counselorLogin(credentials.id, credentials.password, {
        withCredential: true,
      });
      navigate("/counselor");
    } catch (error) {
      alert("Login failed");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/counselor");
  };

  // 로그인 페이지에 들어올 때마다 인증 여부 확인
  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedIn = await checkLoggedIn();
      console.log("login: " + loggedIn);
      if (loggedIn) {
        setIsModalOpen(true);
      }
    };

    checkAuthentication();
  }, [checkLoggedIn, navigate]);

  return (
    <View>
      <Subtitle>당신의 잠든 일상을 깨우는, 따스한</Subtitle>
      <Logo src={LogoImg} alt="Logo" />
      <LoginForm>
        <InputArea>
          <Input
            type="text"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
          />
          <Input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
        </InputArea>
        <Button onClick={handleLogin}>로그인</Button>
      </LoginForm>
      <IncorrectAccessModal isOpen={isModalOpen} closeModal={closeModal} />
    </View>
  );
};

export default CounselorLogin;
