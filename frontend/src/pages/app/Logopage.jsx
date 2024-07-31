import './Logopage.css'

import Logo from './../../assets/images/onDo로고_그림자.png'
import Button from '../../components/app/Button';
import { Link, useNavigate } from 'react-router-dom';

const Logopage = () => {
  const nav = useNavigate();

  const onClickMember = () => {
    return(
      nav('/member')
    )
  }

  const onClickLogin = () => {
    return(
      nav('/login')
    )
  }

  return (
    // <div>Logo 페이지</div>
    <main id='Logopage'>
      <div className='Title'>
        <p>당신의</p>
        <p>잠든 일상을 깨우는</p>
      </div>
      <img id='logo' src={Logo} />
      <h4 style={{color: 'gray'}}>따스한 온도로</h4>
      <h4 style={{color: 'gray'}}>당신의 매일이 달라질 거예요.</h4>
      <Button text={"로그인 하기"} onClick={onClickLogin}/>
      <br />
      <p onClick={onClickMember} style={{cursor: 'pointer', color: 'gray'}}>회원가입하기</p>
    </main>
  )
}

export default Logopage;