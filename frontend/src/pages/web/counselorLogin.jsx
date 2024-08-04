import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/app/authStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  background-color: #fceeee;
  text-align: center;
  font-size: 1rem;
  color: #888;
`;

const Button = styled.button`
  width: 320px;
  padding: 10px;
  border: 2px solid #f0c050;
  border-radius: 25px;
  background-color: white;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0c050;
  }
`;

const CounselorLogin = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const counselorLogin = useAuthStore(state => state.counselorLogin);
  const checkLoggedIn = useAuthStore(state => state.checkLoggedIn);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      await counselorLogin(credentials.id, credentials.password, { withCredential: true });
      navigate('/counselor');
    } catch (error) {
      alert('Login failed');
    }
  };


  // 로그인 페이지에 들어올 때마다 인증 여부 확인
  useEffect(async() => {
     const isLoggedIn = await checkLoggedIn();
    if (isLoggedIn) {
      navigate('/counselor');
    }
  }, []); // 빈 배열로 두어 컴포넌트가 마운트될 때마다 실행

  return (
    <View>
      <Logo src="logo.png" alt="Logo" /> 
      <Subtitle>당신의 잠든 일상을 깨우는, 따스한</Subtitle>
      <Input
        type="text"
        name="id"
        value={credentials.id}
        onChange={handleChange}
        placeholder="아이디"
      />
      <Input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="패스워드"
      />
      <Button onClick={handleLogin}>로그인</Button>
    </View>
  );
};

export default CounselorLogin;
