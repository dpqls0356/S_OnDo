import Button from '../../../components/app/Button.jsx'
import Input from '../../../components/app/Input.jsx'
import InputImg from '../../../components/app/InputImg.jsx'


import camera from './../../../assets/images/camera.png'
import profile from './../../../assets/images/ic_user.png'

import './MyUpdatepage.css'

// 수정 관련으로 바꿔야 함
const MyUpdateForm = () => {
  return (
    <div className='scroll'>
    <div className="UpdatePage">
          <img id='JoinCamera' src={camera} />
          <div className='JoinProfile'>
            <img src={profile} />
          </div>
      <form id="JoinForm" className="flex flex-col space-y-4">
        <Input
          label="이름"
          placeholder=" 이름을 입력해주세요"
          // value={formData.name}
          // onChange={handleInputChange('name')}
          labelClassName="text-left"
        />
        <Input
          label="별명"
          placeholder=" 별명을 입력해주세요"
          // value={formData.nickname}
          // onChange={handleInputChange('nickname')}
          labelClassName="text-left"
        />
        <Input
          label="이메일"
          placeholder=" 이메일을 입력해주세요"
          type="email"
          // value={formData.email}
          // onChange={handleInputChange('email')}
          labelClassName="text-left"
        />
        <Input
          label="비밀번호"
          placeholder=" 비밀번호를 입력해주세요"
          type="password"
          // value={formData.password}
          // onChange={handleInputChange('password')}
          labelClassName="text-left"
        />
        <Input
          label="비밀번호 확인"
          placeholder=" 비밀번호를 다시 입력해주세요"
          type="password"
          // value={formData.confirmPassword}
          // onChange={handleInputChange('confirmPassword')}
          labelClassName="text-left"
        />
        <Input
          label="생년월일"
          placeholder=" 생년월일을 입력해주세요"
          type="date"
          // value={formData.birthDate}
          // onChange={handleInputChange('birthDate')}
          labelClassName="text-left"
        />
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            // style={genderButtonStyle('MALE')}
            // onClick={() => handleGenderSelect('남')}
          >
            남
          </button>
          <button
            type="button"
            // style={genderButtonStyle('FEMALE')}
            // onClick={() => handleGenderSelect('여')}
          >
            여
          </button>
        </div>
        <Button text="수정하기" type="submit Button_PINK"/>
      </form>
    </div>
  </div>
  );
};

export default MyUpdateForm;