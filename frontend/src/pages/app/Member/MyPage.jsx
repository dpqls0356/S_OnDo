import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/app/authStore';
import axios from 'axios';
import Button from "../../../components/app/Button";
import Footer from '../../../components/app/Footer'
import profile from './../../../assets/images/test.png'
import notice from './../../../assets/images/notice.png'
import './Mypage.css'

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true // 쿠키를 포함하기 위해 필요
});

const MyPage = () => {
  const nav = useNavigate();
  const { logout, checkAuth, user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        nav('/member/login');
      }
      setLoading(false);
    };

    init();
  }, [checkAuth, nav]);

  const onClickInfoEdit = () => {
    if (user) {
      nav(`/member/info/${user.id}/update`);
    }
  }

  const onClickLogout = async () => {
    const success = await logout();
    if (success) {
      nav('/member/main');
    } else {
      alert('로그아웃 실패!')
    }
    
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='Mypage'>
      <div className="UserCardBack">
        <div id='My-notice'>
          <p>My Page</p>
          <img src={notice} alt="Notice" />
        </div>
        <div className="UserCard">
          <img src={user.profileUrl || profile} alt="Profile" />
          <div className='UserInfo'>
            <p id='MP-UserName'>{user.name} 님({user.nickname})</p>
            <p id='MP-Email'>{user.email}</p>
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