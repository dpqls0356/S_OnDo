import useJoinStore from "../../../store/app/JoinStore";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/app/Button.jsx";
import Input from "../../../components/app/Input";
import camera from "./../../../assets/images/camera.png";
import useAuthStore from "../../../store/app/authStore.js";
import "./Join.css";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const JoinForm = () => {
  const nav = useNavigate();

  const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";
  const { error, success } = useJoinStore();

  const login = useAuthStore((state) => state.login);
  const checkAuth = useAuthStore((state) => state.checkAuth);

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

    // 필수 필드가 비어있거나 null인 경우 경고 메시지 표시
    const requiredFields = [
      "name",
      "nickname",
      "email",
      "password",
      "confirmPassword",
      "birthDate",
      "gender",
    ];

    const fieldNames = {
      birthDate: "생년월일",
      name: "이름",
      nickname: "별명",
      email: "아이디",
      gender: "성별",
      password: "비밀번호",
      confirmPassword: "확인용 비밀번호",
    };

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`${fieldNames[field]}을(를) 입력해주세요.`);
        return;
      }
    }
    // 생년월일을 기준으로 8세 미만인지 확인
    const today = new Date();
    const birthDate = new Date(formData.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // 생일이 지났는지 여부에 따라 나이를 조정
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (birthDate > today || age > 120) {
      alert("잘못된 생년월일입니다.다시 입력해주세요.");
      return;
    }
    if (age < 8) {
      alert("8세 미만은 가입 불가합니다.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await api.post(`/member/join`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      //중복 계정이 없는 경우
      if (response.data.success) {
        try {
          // 파일이 있는경우
          if (selectedFile) {
            const imgFormData = new FormData();
            imgFormData.append("data", selectedFile);

            const imageRespose = await api.post(
              `/image/upload/MemberProfile/${response.data.data.id}`,
              imgFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            //파일까지 잘 올리가나 경우
            if (!imageRespose.data.success) {
              alert("이미지 업로드를 실패하였습니다.");
            }
          }
        } catch (error) {
          alert("오류가 발생했습니다.");
        }
        alert("회원가입이 완료되었습니다.");
        await login(formData.email, formData.password);
        await checkAuth();
        nav("/member/story");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
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
              width: "150px", // 부모 요소 크기에 맞춤
              height: "150px", // 부모 요소 크기에 맞춤
              borderRadius: "50%", // 원형으로 만듦
              objectFit: "cover", // 이미지를 고정된 크기에 맞추고 비율을 유지하며 잘라냄
              objectPosition: "center", // 이미지의 중심을 기준으로 자름
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
            label="아이디"
            placeholder="아이디을 입력해주세요"
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
          <Button
            text="회원가입하기"
            type="submit Button_PINK"
            onClick={join}
          />
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
