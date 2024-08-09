import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/app/authStore.js";
import axios from "axios";
import Button from "../../../components/app/Button.jsx";
import Input from "../../../components/app/Input.jsx";
import DisabledInput from "../../../components/app/DisabledInput.jsx";
import DeleteAccountModal from "../../../components/app/DeleteAccountModal.jsx";

import camera from "./../../../assets/images/camera.png";
import profile from "./../../../assets/images/ic_user.png";

import "./MyUpdatepage.css";

const baseUrl = import.meta.env.VITE_BASE_URL;
const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageDelete = () => {
    if (confirm("이미지를 삭제하시겠습니까?")) {
      setPreviewUrl(mainProfileUrl);
      setSelectedFile(null);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  }, [user]);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const updateMypage = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

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
        {/* 프로필 이미지 섹션 */}
        <div className="JoinProfile">
          <img
            src={previewUrl || user.profileUrl}
            alt="프로필 이미지"
            onClick={handleImageDelete}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
              cursor: "pointer",
            }}
          />
          <img
            id="JoinCamera"
            style={{ cursor: "pointer" }}
            src={camera}
            alt="카메라 아이콘"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* 폼 섹션 */}
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
            onChange={handleInputChange("password")}
            labelClassName="text-left"
          />
          <Input
            label="비밀번호 확인"
            placeholder=" 비밀번호를 다시 입력해주세요"
            type="password"
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

        {/* 회원 탈퇴 섹션 */}
        <div style={{ textAlign: "center", padding: "10px" }}>
          <p style={{ cursor: "pointer", color: "gray" }} onClick={handleOpenModal}>
            탈퇴하기
          </p>
          <DeleteAccountModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            baseUrl={baseUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default MyUpdateForm;