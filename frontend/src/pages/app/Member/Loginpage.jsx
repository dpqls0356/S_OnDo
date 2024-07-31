import "./Loginpage.css"

import Button from "../../../components/app/Button";
import kakaologin from './../../../assets/images/kakaologin.png'
import naverlogin from './../../../assets/images/naverlogin.png'

import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const nav = useNavigate()

  const onClickKakao = () => {
    return(
      nav('/kakaologin')
    )
  }

  const onClickNaver = () => {
    return(
      nav('/naverlogin')
    )
  }

  return (
    <main className="Loginpage">
      <p id="Title">로그인</p>
      <form action="" >
        <div>
          <label htmlFor="login-id">아이디</label><br />
          <input id="login-id" type="text" placeholder="아이디" /><br />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label><br />
          <input id="password" type="password" placeholder="비밀번호" /><br />
        </div>
        <Button text={"로그인"} />
      </form>
      <br />
      <hr />
      <img onClick={onClickKakao} src={kakaologin} style={{cursor: "pointer"}} />
      <img onClick={onClickNaver} src={naverlogin} style={{cursor: "pointer"}} />
    </main>
  )
}

export default Loginpage;