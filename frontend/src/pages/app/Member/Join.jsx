import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/app/Button.jsx';
import Input from '../../../components/app/Input';
import useJoinStore from '../../../store/app/useJoinStore';
import axios from 'axios';

const JoinForm = () => {
  const nav = useNavigate();
  const { error, success } = useJoinStore();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    profileUrl: ''
  });

  const onClickLogin = () => {
    nav('/member/login');
  };


  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender: gender === '여' ? 'FEMALE' : 'MALE' });
  };

  const join = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    const userData = {
      email: formData.email,
      name: formData.name,
      nickname: formData.nickname,
      password: formData.password,
      birthDate: formData.birthDate,
      gender: formData.gender,
      profileUrl: formData.profileUrl || ''
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/member/join', userData);
      
      if (response.data.success) {
        alert('회원가입이 완료되었습니다.');
        // nav('/member/login');
        // 회원가입 후에 캐릭터 생성 페이지로 넘어가야 해서
        nav('/member/name')
      } else {
        alert(response.data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  const genderButtonStyle = (selectedGender) => ({
    backgroundColor: formData.gender === selectedGender ? '#61C0BF' : 'white',
    color: formData.gender === selectedGender ? 'white' : '#61C0BF',
    border: '2px solid #61C0BF',
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  return (
<div className="flex justify-center items-center min-h-screen">
    <div className="w-full max-w-md p-8 rounded-lg">
      <form id="JoinForm" onSubmit={join} className="flex flex-col space-y-4">
        <Input
          label="이름"
          placeholder=" 이름을 입력해주세요"
          value={formData.name}
          onChange={handleInputChange('name')}
          labelClassName="text-left"
        />
        <Input
          label="별명"
          placeholder=" 별명을 입력해주세요"
          value={formData.nickname}
          onChange={handleInputChange('nickname')}
          labelClassName="text-left"
        />
        <Input
          label="이메일"
          placeholder=" 이메일을 입력해주세요"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          labelClassName="text-left"
        />
        <Input
          label="비밀번호"
          placeholder=" 비밀번호를 입력해주세요"
          type="password"
          value={formData.password}
          onChange={handleInputChange('password')}
          labelClassName="text-left"
        />
        <Input
          label="비밀번호 확인"
          placeholder=" 비밀번호를 다시 입력해주세요"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          labelClassName="text-left"
        />
        <Input
          label="생년월일"
          placeholder=" 생년월일을 입력해주세요"
          type="date"
          value={formData.birthDate}
          onChange={handleInputChange('birthDate')}
          labelClassName="text-left"
        />
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            style={genderButtonStyle('MALE')}
            onClick={() => handleGenderSelect('남')}
          >
            남
          </button>
          <button
            type="button"
            style={genderButtonStyle('FEMALE')}
            onClick={() => handleGenderSelect('여')}
          >
            여
          </button>
        </div>
        <Button text="회원가입하기" type="submit Button_PINK" onClick={join} />
        <p onClick={onClickLogin} className="cursor-pointer text-center text-sm text-gray-500 mt-4">
          로그인하러가기
        </p>
      </form>
    </div>
  </div>
  );
};

export default JoinForm;