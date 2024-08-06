import styled from "styled-components";
import { useState } from "react";

import mypageuser from './../../../../assets/images/mypageuser.png'


const View = styled.div`

`
const CounselorMypage = () => {
  const [ info, InfoState ] = useState('')
  const [ edit, EditState ] = useState(false)

  const onClickEdit = () => {
    EditState(!edit)
  }
  return(
    <View>
      <p>마이페이지</p>
      <img src={mypageuser} />
      <p>이름</p>
      
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