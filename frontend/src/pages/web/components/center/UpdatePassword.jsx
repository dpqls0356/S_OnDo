import styled from "styled-components";
import useAuthStore from "../../../../store/app/authStore";
import { useState } from "react";
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
  gap: 20px;
  font-size: 17px
`;

const Tab = styled.div`
  color: #6769BA;
  font-weight: 600;
  // font-size: 36px;
  display: flex;
  gap: 10px;
  margin: 0 auto;
  font-size: 20px;
  padding: 15px 0px;
  & > p:active{
    color: #F7867A;
  }
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  & > p {
    font-size: 17px;
  }
  & > input{
    height: 35px;
    border: 1px black solid;
    border-radius: 7px;
    padding: 0px 10px;
  }
`

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
  const { user } = useAuthStore()
  const [ Authenticated, setAuthenticated ] = useState(false)
  const [ PW, setPW ] = useState({
    password: "",
    newPassword: "",
    checkNewPassword: ""
  })
  
  const handleAuthenticatedClick  = (e) => {
    if (user.password === PW.password) {
      setAuthenticated(true)
    } else {
      alert("입력하신 정보와 일치하지 않습니다.")
      e.target.value = ""
      return
    }
  }

  const handleSaveClick = async () => {
    if (PW.newPassword !== PW.checkNewPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return;
    }

    const userData = new Blob(
      [
        JSON.stringify({
          password: PW.password,
          selfIntroduction: user.selfIntroduction
        }),
      ],
      { type: "application/json" }
    );

    const userFormData = new FormData()
    userFormData.append("requestDto", userData);

    if (user.profileUrl) {
      userFormData.append("profileImage", user.profileUrl);
    } else {
      const emptyFile = new Blob([""], { type: "image/jpeg" });
      userFormData.append("profileImage", emptyFile, "empty.jpg");
    }

    try {
      const response = await axios.put(
        `${baseUrl}/counselor/updateMypage`,
        userFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        
        if (response.data.success) {
          alert("비밀번호가 변경되었습니다.");
        }
    } catch (err) {
      alert("비밀번호 수정 중 오류가 발생했습니다.")
    }

  }

  const handleInputChange = (field) => (e) => {
    setPW({...PW, [field]: e.target.value });
  }

  return(
    <View>
      <Tab>비밀번호 변경</Tab>
      <Form>
      <p>기존 비밀번호</p>
      <input type="password" onChange={handleInputChange("password")} placeholder="기존 비밀번호를 입력하세요."/>
      {!Authenticated ? 
        <>
          <hr />
          <Form>
            <p>비밀번호</p>
            <input type="password" onChange={handleInputChange("NewPassword")} placeholder="새로운 비밀번호를 입력하세요."/>
            <p>비밀번호 확인</p>
            <input type="password" onChange={handleInputChange("CheckNewPassword")} placeholder="비밀번호를 다시 한 번 입력해주세요."/>
            <Save>
              <button onClick={handleSaveClick}>변경</button>
            </Save>
          </Form>
        </>
      : 
        <Save>
          <button onClick={handleAuthenticatedClick}>확인</button>
        </Save>}
      
      </Form>
    </View>
  )
}

export default UpdatePassword;