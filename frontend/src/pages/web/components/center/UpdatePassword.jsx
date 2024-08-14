import styled from "styled-components";
import useAuthStore from "../../../../store/app/authStore";
import { useState, useEffect } from "react";
import axios from "axios";

const View = styled.div`
  margin: 0 auto;
  padding: 10px 80px;
  width: 90%;
  height: 100%;
  display: flex;
  align-item: center;
  text-align: center;
  flex-direction: column;
  gap: 35px;
  font-size: 17px;
`;

const Tab = styled.div`
  color: #6769ba;
  font-size: 25px;
  font-weight: 600;
  // font-size: 36px;
  display: flex;
  gap: 10px;
  margin: 0 auto;
  padding: 15px 0px;
  & > p:active {
    color: #f7867a;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 10% 0 0 0;
  & > p {
    font-size: 20px;
  }
  & > input {
    height: 45px;
    // border: 1px black solid;
    background-color: #E3E6EC;
    border-radius: 7px;
    padding: 0px 10px;
  } :: placeholder{
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal; 
    color: #A8AAB2;
    font-size: 16px;
    padding: 5px
  }
`;

const Save = styled.div`
  display: inline-block;
  & > button {
    float: right;
    width: 120px;
    color: white;
    background-color: #121481;
    border-radius: 30px;
  }
`;

const baseUrl = import.meta.env.VITE_BASE_URL;

const UpdatePassword = () => {
  const { user } = useAuthStore();
  const [MyInfo, setMyInfo] = useState(null);
  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [PW, setPW] = useState({
    password: "",
    newPassword: "",
    checkNewPassword: "",
  });

  const handleAuthenticatedClick = (e) => {
    if (user.password === PW.password) {
      setAuthenticated(true);
    } else {
      alert("입력하신 정보와 일치하지 않습니다.");
      e.target.value = "";
      return;
    }
  };

  const getMyInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/counselor/mypage`, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`, // 로그인중인 상담사 토큰 보내기
        },
        withCredentials: true, // 쿠키를 포함하여 요청
      });
      if (response.status === 200) {
        console.log("상담사 정보 조회 성공");
        console.log("서버 응답:", response.data);
        setMyInfo(response.data.data.counselor);
        console.log("상담사 정보 확인용", MyInfo); // 맨 처음 로딩 시 바로 채워지지 않음... 채워지는 데 시간이 좀 필요한 듯 함
        setLoading(false); // 데이터 로딩이 끝나면 로딩 상태를 false로 설정
        setPW({
          password: MyInfo.password,
        });
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
    }
  };

  const handleInputChange = (field) => (e) => {
    setPW({ ...PW, [field]: e.target.value });
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  const handleSaveClick = async () => {
    if (PW.newPassword !== PW.checkNewPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = new Blob(
      [
        JSON.stringify({
          password: PW.newPassword,
          selfIntroduction: "",
        }),
      ],
      { type: "application/json" }
    );

    const userFormData = new FormData();
    userFormData.append("requestDto", userData);

    // userFormData에 이미지 담기
    // 프로필 이미지 변경 X 이므로 무조건 기존 프로필 유지
    const emptyFile = new Blob([""], { type: "image/jpeg" });
    userFormData.append("profileImage", emptyFile, "empty.jpg");

    try {
      const response = await axios.put(`${baseUrl}/counselor/updateMypage`, userFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        alert("비밀번호가 변경되었습니다.");
        setMyInfo((prev) => ({
          ...prev,
          password: PW.newPassword,
        }));
        await getMyInfo();
      }
    } catch (err) {
      alert("비밀번호 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <View>
      <Tab>비밀번호 변경</Tab>

      <Form>
        <p>비밀번호</p>
        <input
          type="password"
          onChange={handleInputChange("newPassword")}
          placeholder="새로운 비밀번호를 입력하세요."
        />
        <p>비밀번호 확인</p>
        <input
          type="password"
          onChange={handleInputChange("checkNewPassword")}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
        />
        <Save>
          <button onClick={handleSaveClick}>변경</button>
        </Save>
      </Form>
    </View>
  );
};

export default UpdatePassword;
