import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/app/authStore.js";
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

  //모달----------------------------------------------

  const DeleteAccountModal = ({ isOpen, onClose, onDelete, userPassword }) => {
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const nav = useNavigate();
    const [deleteFormData, setDeleteFormData] = useState({
      password: "",
    });

    const handlePasswordChange = (e) => {
      setDeleteFormData({
        ...deleteFormData,
        password: e.target.value,
      });
      setPassword(e.target.value);
    };

    const handleConfirmDelete = () => {
      setStep(2); // 비밀번호 입력 단계로 이동
    };

    const handlePasswordSubmit = async () => {
      try {
        console.log(deleteFormData.password);

        const response = await api.delete(`${baseUrl}/member/delete`, {
          data: { password: deleteFormData.password },
          withCredentials: true,
        });
        console.log(response);
        if (response.data.success) {
          alert("탈퇴가 완료되었습니다.");
          nav("/member/main"); //이렇게 가니까 잘못된 접근입니다가 뜬다. 로그아웃도 동시에 진행되서 그런가??
        }
      } catch (error) {
        alert("비밀 번호가 일치하지 않습니다.");
        console.error(error);
      }
    };

    if (!isOpen) return null;

    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          {step === 1 && (
            <div>
              <h2>정말 탈퇴하시겠습니까?</h2>
              <button onClick={handleConfirmDelete} style={styles.button}>
                확인
              </button>
              <button onClick={onClose} style={styles.button}>
                취소
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2>비밀번호를 다시 입력해주세요</h2>
              <input
                type="password"
                value={deleteFormData.password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력하세요"
                style={styles.input}
              />
              <button onClick={handlePasswordSubmit} style={styles.button}>
                확인
              </button>
              <button onClick={onClose} style={styles.button}>
                취소
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "300px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      boxSizing: "border-box",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    button: {
      width: "80px",
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer",
    },
  };
  //-------------------------------------------------

  //모달 작동----------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userPassword = "ssafy"; //필요없음. 내가 적은 패스워드 그대로 넘겨주기때문

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccount = () => {
    // 실제 탈퇴 처리 로직을 여기에 추가합니다.
    alert("탈퇴가 완료되었습니다.");
  };

  //-----------------------------------------------

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

  //수정 데이터 전달하기 ------------------------------------------------------
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
        <div style={{ textAlign: "center", padding: "10px" }}>
          <p style={{ cursor: "pointer", color: "gray" }} onClick={handleOpenModal}>
            탈퇴하기
          </p>
          <DeleteAccountModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onDelete={handleDeleteAccount}
            userPassword={userPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default MyUpdateForm;
