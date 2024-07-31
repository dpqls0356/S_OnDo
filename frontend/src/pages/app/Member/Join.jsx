import Button from '../../../components/app/Button.jsx'
import Input from '../../../components/app/Input'
import InputImg from '../../../components/app/InputImg'

import { useNavigate } from 'react-router-dom';

const JoinForm = () => {
  const nav = useNavigate()

  const onClickLogin = () => {
    nav('/login')
  }
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <InputImg />
      <Input label="이름" placeholder="이름을 입력해주세요" />
      <Input label="별명" placeholder="별명을 입력해주세요" />
      <Input label="이메일" placeholder="이메일을 입력해주세요" type="email" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
      <Input label="비밀번호 확인" placeholder="비밀번호를 다시 입력해주세요" type="password" />
      <Input label="생년월일" placeholder="생년월일을 입력해주세요" type="date" />
      <div className="flex gap-2 mb-4">
        <Button color="teal">남</Button>
        <Button color="teal">여</Button>
      </div>
      <Button color="pink">회원가입하기</Button>
      <p onClick={onClickLogin} style={{cursor: 'pointer'}} className="text-center text-sm text-gray-500 mt-4">로그인하러가기</p>
    </div>
  );
};

export default JoinForm;