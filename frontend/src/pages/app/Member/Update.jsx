import Button from '../../../components/app/Button.jsx'
import Input from '../../../components/app/Input.jsx'
import InputImg from '../../../components/app/InputImg.jsx'

// 수정 관련으로 바꿔야 함
const UpdateForm = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <InputImg />
      {/* 바꿀 수 있는 것 - 별명, 비밀번호 */}
      <Input label="이름" placeholder="{name}" />
      {/* 원래 별명 */}
      <Input label="별명" placeholder="별명을 입력해주세요" />
      <Input label="이메일" placeholder="{email}" type="email" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
      <Input label="비밀번호 확인" placeholder="비밀번호를 다시 입력해주세요" type="password" />
      <Input label="생년월일" placeholder="{birthday}" type="date" />
      <div className="flex gap-2 mb-4">
        <Button color="teal">남</Button>
        <Button color="teal">여</Button>
      </div>
      <Button color="pink">회원가입하기</Button>
      <p className="text-center text-sm text-gray-500 mt-4">로그인하러가기</p>
    </div>
  );
};

export default UpdateForm;