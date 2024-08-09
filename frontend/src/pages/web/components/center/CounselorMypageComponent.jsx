import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import mypageuser from './../../../../assets/images/mypageuser.png'


const View = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 100%;
  display: flex;
  // justify-content: center;
  // margin: 0 auto;
  // align-item: center;
  flex-direction: column;
  gap: 20px;
`;

const ProfileImg = styled.div`
  width:200px;
  height: 200px;
  border: 1px black solid;
  background-color: #FFF7F7;
`

const Tab = styled.div`
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

const CounselorMypage = () => {
  const [ MyInfo, setMyInfo ] = useState(null)

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
      setMyInfo(response.data)
      console.log('상담사 정보 확인용', MyInfo)
      if (response.status === 200) {
        console.log('상담사 정보 조회 성공');
        console.log('서버 응답:', response.data);
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    getMyInfo()
  }, [])

  const [ info, InfoState ] = useState('')
  const [ edit, EditState ] = useState(false)

  const onClickEdit = () => {
    EditState(!edit)
  }
  return(
    <View>
      <Tab>마이페이지</Tab>
      <ProfileImg><img src={mypageuser} /></ProfileImg>
      {/* <p>{MyInfo.name}</p> */}
      
      <p>성별: 여</p>
      <p>분야: 미술심리상담사, 도형심리상담사</p>
      <ul>
        경력
        <li>00대학 예술치료대학원 석사</li>
        <li>가천의과학대학교 보건학 박사</li>
        <li>한국미술치료 교수협의회 이사</li>
        <li>한국통합미술치료학회 고문</li>
      </ul>
        <hr />
        <div>
          <p>소개</p>
          <p onClick={onClickEdit} style={{cursor: "pointer"}}>수정</p>
        </div>
        <div>
          {edit ? 
            <input type="text" value={info} onChange={(e) => {InfoState(e.target.value)}} />
            : 
            <div>{info}</div>
          }
        </div>
    </View>
  )
}

export default CounselorMypage;