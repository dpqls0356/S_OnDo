import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/app/AuthStore.js";
import axios from "axios";
import Button from "../../../components/app/Button.jsx";
import Input from "../../../components/app/Input.jsx";
import DisabledInput from "../../../components/app/DisabledInput.jsx";
import InputImg from "../../../components/app/InputImg.jsx";

import camera from "./../../../assets/images/camera.png";
import profile from "./../../../assets/images/ic_user.png";

import "./MyUpdatepage.css";

const baseUrl = import.meta.env.VITE_BASE_URL;
const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // 쿠키를 포함하기 위해 필요
});

// 수정 관련으로 바꿔야 함
const MyUpdateForm = () => {
  const nav = useNavigate();
  const { checkAuth, user } = useAuthStore();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const init = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        nav("/member/login");
      }
      setLoading(false);
    };

    init();
  }, [checkAuth, nav]);

  useEffect(() => {
    if (user) {
      // user가 null이 아닐 때만 상태를 설정
      setFormData({
        email: user.email || "",
        name: user.name || "",
        nickname: user.nickname || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
        profileUrl: user.profileUrl || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]); // user가 변경될 때마다 실행

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  //---------------------------------------------------------------
  const updateMypage = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이미지 포함한 form-Dat 보내기
    const userData = new Blob(
      [
        JSON.stringify({
          nickname: formData.nickname,
          password: formData.password,
        }),
      ],
      { type: "application/json" }
    );

    const userFormData = new FormData();
    userFormData.append("updateRequestDto", userData);

    if (selectedFile) {
      userFormData.append("profileImage", selectedFile);
    } else {
      const emptyFile = new Blob([""], { type: "image/jpeg" });
      userFormData.append("profileImage", emptyFile, "empty.jpg");
    }

    try {
      const response = await api.put(`${baseUrl}/member/update`, userFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("회원 정보 수정이 완료되었습니다.");
        nav("/member/profile");
      }
    } catch (error) {
      alert(error.response?.data?.message || "마이페이지 수정 중 오류가 발생했습니다.");
    }
  };

  //----------------------------------------------------------------

  const genderButtonStyle = (selectedGender) => ({
    backgroundColor: user.gender === selectedGender ? "#61C0BF" : "white",
    color: user.gender === selectedGender ? "white" : "#61C0BF",
    border: "2px solid #61C0BF",
    padding: "10px 20px",
    margin: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  return (
    <div className="scroll">
      <div className="UpdatePage">
        <div className="JoinProfile">
          <img
            src={previewUrl || user.profileUrl}
            alt="프로필 이미지"
            onClick={handleImageDelete}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <img id="JoinCamera" style={{cursor: "pointer"}} src={camera} alt="카메라 아이콘" onClick={handleImageClick} />
          <input
            type="file"
            ref={fileInputRef} // input에 대한 참조 설정
            onChange={handleFileChange}
            style={{
              display: "none",
            }} // input 요소를 숨김
          />
        </div>
        <form id="JoinForm" className="flex flex-col space-y-4" onSubmit={updateMypage}>
          <DisabledInput
            label="이름"
            placeholder=" 이름을 입력해주세요"
            value={formData.name}
            labelClassName="text-left"
          />
          <Input
            label="별명"
            placeholder=" 별명을 입력해주세요"
            value={formData.nickname}
            onChange={handleInputChange("nickname")}
            labelClassName="text-left"
          />
          <DisabledInput
            label="이메일"
            placeholder=" 이메일을 입력해주세요"
            type="email"
            value={formData.email}
            labelClassName="text-left"
          />
          <Input
            label="비밀번호"
            placeholder=" 비밀번호를 입력해주세요"
            type="password"
            //value={user.password}
            onChange={handleInputChange("password")}
            labelClassName="text-left"
          />
          <Input
            label="비밀번호 확인"
            placeholder=" 비밀번호를 다시 입력해주세요"
            type="password"
            //value={user.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            labelClassName="text-left"
          />
          <DisabledInput
            label="생년월일"
            placeholder=" 생년월일을 입력해주세요"
            type="date"
            value={formData.birthDate}
            labelClassName="text-left"
          />
          <div className="flex justify-center space-x-4">
            <button type="button" style={genderButtonStyle("MALE")} disabled>
              남
            </button>
            <button type="button" style={genderButtonStyle("FEMALE")} disabled>
              여
            </button>
          </div>
          <Button text="수정하기" type="submit Button_PINK" onClick={updateMypage} />
        </form>
      </div>
    </div>
  );
};

export default MyUpdateForm;
