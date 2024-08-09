import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/app/Button.jsx";
import Input from "../../../components/app/Input";
import useJoinStore from "../../../store/app/useJoinStore";
import axios from "axios";

import camera from "./../../../assets/images/camera.png";
import profile from "./../../../assets/images/ic_user.png";

import "./Join.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

const JoinForm = () => {
  const nav = useNavigate();
  const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";
  const { error, success } = useJoinStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file); // 파일의 미리보기 URL 생성
      setPreviewUrl(url); // 미리보기 URL을 상태에 저장
    }
  };

  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // img 클릭 시 input 클릭하도록 함
    }
  };

  const handleImageDelete = () => {
    if (confirm("이미지를 삭제하시겠습니까?")) {
      setPreviewUrl(mainProfileUrl); // '네'를 클릭 시 기본 이미지로 설정
      setSelectedFile(null);
    }
  };

  // 컴포넌트 언마운트 시 URL 객체 해제
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // URL 객체 해제
      }
    };
  }, [previewUrl]);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    profileUrl: "",
  });

  const onClickLogin = () => {
    nav("/member/login");
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender: gender === "여" ? "FEMALE" : "MALE" });
  };

  const join = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이미지 포함한 form-Dat 보내기
    const userData = new Blob(
      [
        JSON.stringify({
          email: formData.email,
          name: formData.name,
          nickname: formData.nickname,
          password: formData.password,
          birthDate: formData.birthDate,
          gender: formData.gender,
        }),
      ],
      { type: "application/json" }
    );

    const userFormData = new FormData();
    userFormData.append("joinRequestDto", userData);

    if (selectedFile) {
      userFormData.append("profileImage", selectedFile);
    } else {
      const emptyFile = new Blob([""], { type: "image/jpeg" });
      userFormData.append("profileImage", emptyFile, "empty.jpg");
    }

    try {
      const response = await axios.post(`${baseUrl}/member/join`, userFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("회원가입이 완료되었습니다.");
        // nav('/member/login');
        // 회원가입 후에 캐릭터 생성 페이지로 넘어가야 해서
        nav("/member/name");
      } else {
        alert(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const genderButtonStyle = (selectedGender) => ({
    backgroundColor: formData.gender === selectedGender ? "#61C0BF" : "white",
    color: formData.gender === selectedGender ? "white" : "#61C0BF",
    border: "2px solid #61C0BF",
    padding: "10px 20px",
    margin: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  return (
    <div className="scroll">
      <div className="JoinPage">
        <div className="JoinProfile">
          <img
            src={previewUrl || mainProfileUrl}
            alt="프로필 이미지"
            onClick={handleImageDelete}
            style={{
              width: "200px", // 부모 요소 크기에 맞춤
              height: "200px", // 부모 요소 크기에 맞춤
              borderRadius: "50%", // 원형으로 만듦
              objectFit: "cover", // 이미지를 고정된 크기에 맞추고 비율을 유지하며 잘라냄
              objectPosition: "center", // 이미지의 중심을 기준으로 자름
            }}
          />
          <img
            id="JoinCamera"
            src={camera}
            alt="카메라 아이콘"
            onClick={handleImageClick}
            style={{
              position: "absolute",
              bottom: "5px", // 이미지의 경계선에서 5px 위에 위치
              right: "5px", // 이미지의 경계선에서 5px 안쪽에 위치
              width: "40px", // 아이콘 크기 조정
              height: "40px",
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            ref={fileInputRef} // input에 대한 참조 설정
            onChange={handleFileChange}
            style={{
              display: "none",
            }} // input 요소를 숨김
          />
        </div>
        <form id="JoinForm" onSubmit={join} className="flex flex-col space-y-4">
          <Input
            label="이름"
            placeholder=" 이름을 입력해주세요"
            value={formData.name}
            onChange={handleInputChange("name")}
            labelClassName="text-left"
          />
          <Input
            label="별명"
            placeholder=" 별명을 입력해주세요"
            value={formData.nickname}
            onChange={handleInputChange("nickname")}
            labelClassName="text-left"
          />
          <Input
            label="이메일"
            placeholder=" 이메일을 입력해주세요"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            labelClassName="text-left"
          />
          <Input
            label="비밀번호"
            placeholder=" 비밀번호를 입력해주세요"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            labelClassName="text-left"
          />
          <Input
            label="비밀번호 확인"
            placeholder=" 비밀번호를 다시 입력해주세요"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            labelClassName="text-left"
          />
          <Input
            label="생년월일"
            placeholder=" 생년월일을 입력해주세요"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange("birthDate")}
            labelClassName="text-left"
          />
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              style={genderButtonStyle("MALE")}
              onClick={() => handleGenderSelect("남")}
            >
              남
            </button>
            <button
              type="button"
              style={genderButtonStyle("FEMALE")}
              onClick={() => handleGenderSelect("여")}
            >
              여
            </button>
          </div>
          <Button text="회원가입하기" type="submit Button_PINK" onClick={join} />
          <p
            onClick={onClickLogin}
            className="cursor-pointer text-center text-sm text-gray-500 mt-4"
          >
            로그인하러가기
          </p>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
