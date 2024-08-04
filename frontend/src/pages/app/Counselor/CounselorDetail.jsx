import './CounselorDetail.css'

import { useNavigate } from 'react-router-dom';

import Footer from '../../../components/app/Footer';
import profile from './../../../assets/images/ic_user.png'
import back from './../../../assets/images/back.png'

const CounselorDetail = () => {
  const nav = useNavigate()

  const onClickBack = () => {
    console.log('임시로 지정한 주소이므로 추후 뒤로가도록 수정해야함')
    nav('/member/counseling/apply/상담사아이디')
  }
  
  return(
    <div className='scroll'>
      <img onClick={onClickBack} style={{cursor: "pointer"}} id='CD-back' src={back} />
      <p>상담사 소개</p>
      {/* <div className='CD-header'>
      </div> */}
      <div className='CD-Card'>
        <div>
          <p id='CD-name'>정유진 상담사(여)</p>
          <img src={profile} alt="상담사 프로필" />
          <p>분야</p>
          <p>미술심리상담사, 도형심리상담사</p>
          <p>경력</p>
          <div className='Career'>
            <ul>
              <li>- OO대학 예술치료대학원 석사</li>
              <li>- 가정의학대학교 보건학 박사</li>
              <li>- 한국미술치료 교수협의회 이사</li>
              <li>- 한국통합미술치료학회 고문</li>
            </ul>
          </div>
          <div id='CD-line'></div>
          <p>안녕하세요^^ 반갑습니다~~</p>
        </div>
      </div>
  </div>
  );
};

export default CounselorDetail;
