import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import mypageuser from './../../../../assets/images/mypageuser.png'
import useAuthStore from "../../../../store/app/authStore";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";


const View = styled.div`
  margin: 0 auto;
  padding: 10px 80px;
  width: 90%;
  height: 100%;
  display: flex;
  align-item: center;
  flex-direction: column;
  gap: 20px;
  font-size: 17px
`;

// const InfoTag = styled.div`
//   display: flex;
//   flex-direction: column;
// `

const Bold = styled.div`
  font-weight: 600;
  font-size: 18px;
  display: inline-block;
  color: #121481;
`

const IntroTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`

const LiTag = styled.div`
padding: 5px 0px;
  padding-left: 7%;
`

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   gap: 20px;
// `

const Name = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
`

const IntroductionInput = styled.div`
  border: 1px black solid;
  // background-color: gray;
  & textarea {
  width: 100%;
  min-height: 10vh;
  height: 30px;
  border: none;
  resize: none;
  padding: 1px 10px;
  
  // background-color: rgba(255, 255, 255, 0);
  }:focus{
    outline:none;
  }
`

const ProfileImg = styled.div`
  width:200px;
  height: 200px;
  border: 1px black solid;
  background-color: #FFF7F7;
  margin: 0 auto;
`

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
const baseUrl = import.meta.env.VITE_BASE_URL;
// const nav = useNavigate()

const CounselorMypage = () => {
  const [ MyInfo, setMyInfo ] = useState(null)
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  
  const [ info, InfoState ] = useState('')
  const [ edit, EditState ] = useState(false)
  console.log(info)

  // const [ info, InfoState ] = useState('')
  // console.log(info)

  const { checkAuth, user } = useAuthStore();

  const fileInputRef = useRef("사진 설명")
  const [ selectedFile, setSelectedFile ] = useState(null); // 선택한 이미지 state
  const [ previewUrl, setPreviewUrl ] = useState(null) // 미리보기 url state

  // 수정모드 중에 프로필 이미지를 클릭하면 input태그가 동작하도록 설정
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // img 클릭 시 input 클릭하도록
    }
  }
  
  // 이미지를 추가한 경우에만 이미지 담기
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file); // 파일의 미리보기 URL 생성
      setPreviewUrl(url) // 미리보기 URL을 상태에 저장
    }
  }
  // useEffect(() => {
  //   if (user) {
  //     const 
  //   }
  // })

  // const [ formData, setFormData ] = useState({
  //   id: "test",
  //   password: "password",
  //   gender: "MALE",
  //   name: "상담사",
  //   field: "사회복지",
  //   selfIntroduction: "자기소개",
  //   schedule_id:1001

  // })

  const getMyInfo = async () => {
    try{
      const response = await axios.get(
        `${baseUrl}/counselor/mypage`,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`, // 로그인중인 상담사 토큰 보내기
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      )
      if (response.status === 200) {
        console.log('상담사 정보 조회 성공');
        console.log('서버 응답:', response.data);
        setMyInfo(response.data.data.counselor)
        console.log('상담사 정보 확인용', MyInfo) // 맨 처음 로딩 시 바로 채워지지 않음... 채워지는 데 시간이 좀 필요한 듯 함
        setLoading(false); // 데이터 로딩이 끝나면 로딩 상태를 false로 설정
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getMyInfo()
  }, [])



  const putMyInfo = async () => {
    const changeSelfIntroduction = info

    // Blob 객체는 후에 FormData 객체에 추가 되어
    // JSON 데이터와 파일(ex: 이미지)를 한 번에 전송할 수 있게 해줌
    const userData = new Blob(
      [
        JSON.stringify({
          password: user.password, // 자기소개만 수정할 것이므로 비밀번호는 공백으로 설정
          selfIntroduction: changeSelfIntroduction
        }),
      ],
      { type: "application/json" }
    );

    const userFormData = new FormData();
    userFormData.append("requestDto", userData); // requestDto라는 키에 value가 userData인 key-value쌍이 userFormData에 추가됨
    
    // userFormData에 이미지 담기
    if (selectedFile) {
      userFormData.append("profileImage", selectedFile);
    } else {
      const emptyFile = new Blob([""], { type: "image/jpeg "});
      userFormData.append('profileimage', emptyFile, "empty.jpg")
    }

    try{
      const response = await axios.put(
        `${baseUrl}/counselor/updateMypage`,
        userFormData,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // 쿠키를 포함하여 요청
      });
      if (response.data.success) {
        console.log('마이페이지 수정 완료')
        InfoState('') // 입력창 초기화
        EditState(!edit) // 수정모드 비활성화
        // nav('/counselor/')        
        // nav('/counselor/mypage')        
      }
    }
    catch (err) {
      console.error("에러 발생:", err)
      InfoState('') // 입력창 초기화
      EditState(!edit) // 수정모드 비활성화
    }
  }


  const onClickEdit = () => {
    EditState(!edit)
  }

  // 데이터 로딩 중일 때 로딩 메시지 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  return(
    <View>
      <Tab>마이페이지</Tab>
      {edit ? 
      <ProfileImg>
      <img src={mypageuser} onClick={handleImageClick}/>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}}/>
    </ProfileImg>
      :
      <ProfileImg>
        <img src={mypageuser} /></ProfileImg>
      
      }
      <Name>{MyInfo.name}</Name>
      <p><Bold>성별:</Bold> {MyInfo.gender}</p>
      <p><Bold>분야:</Bold> {MyInfo.field}</p>
      <ul>
        <Bold>경력:</Bold>
        {MyInfo.career.map((career, index) => (
          <LiTag key={index}>◾ {career}</LiTag>
        ))}
      </ul>

      
      <hr />
      <div>
        <IntroTitle>
          <p><Bold>소개</Bold></p>
          {edit ? 
          <p onClick={putMyInfo} style={{cursor: "pointer", textDecoration: "underline", color: 'gray'}}>저장</p>
          // <p style={{cursor: "pointer", textDecoration: "underline", color: 'gray'}}>저장</p>
          :
          <p onClick={onClickEdit} style={{cursor: "pointer", textDecoration: "underline", color: 'gray'}}>수정</p>
          }
          
        </IntroTitle>
      </div>
      <div>
        {edit ? 
          <IntroductionInput>
            <textarea type="text" value={info} onChange={(e) => {InfoState(e.target.value)}} placeholder="간단한 자기소개를 입력해주세요."/>
          </IntroductionInput>
          : 
          <div>{MyInfo.selfIntroduction}</div>
        }
      </div>
      <br />
    </View>
  )
}

export default CounselorMypage;