// 챗알림, MemberProfileCard, footer, Button*2(로그아웃, 회원정보수정)&연결
// import MemberProfileCard from '../../../components/app/MemberProfileCard'
import './Mypage.css'

import { useNavigate } from 'react-router-dom';

import Button from "../../../components/app/Button";
import Footer from '../../../components/app/Footer'

import profile from './../../../assets/images/test.png'
import notice from './../../../assets/images/notice.png'

// const dummyProfileData = {
//   name: "유싸피",
//   nickname: "뽀용",
//   email: "apple@gmail.com"
//};


const MyPage = () => {
  const nav = useNavigate()

  const onClickInfoEdit = () => {
    nav('/member/info/유저아이디/update')
  }

  const onClickLogout = () => {
    console.log('로그아웃!')
    console.log('로그아웃로직 추가해야 함')
  }
  
  return (
    <div className='Mypage'>
      <div className="UserCardBack">
        <div id='My-notice'>
          <p>My Page</p>
          <img src={notice} />
        </div>
        <div className="UserCard">
          <img src={profile} />
          <div className='UserInfo'>
            <p id='MP-UserName'>이싸피 님(별명)</p>
            <p id='MP-Email'>Leessafy@gmail.com</p>
          </div>
        </div>
      </div>

      <div className='MypageCenter'>
        <Button onClick={onClickInfoEdit} text="내 정보 수정"/>
        <Button onClick={onClickLogout} text="로그아웃"/> 
      </div>
      <Footer/>
    </div>
  );
};

export default MyPage;