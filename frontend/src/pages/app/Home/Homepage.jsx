import "./Homepage.css";

import Footer from "../../../components/app/Footer";
import character from "./../../../assets/images/공통_캐릭터.png";
import chat from "./../../../assets/images/chat.png";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from '../../../store/app/authStore';

const Homepage = () => {
  const { getAccessToken } = useAuthStore();
  const getBoard = async()=>{
    const token = getAccessToken();
    console.log(token);
      const res = await axios.get('http://localhost:8080/api/v1/board/list',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res);
  }
  const nav = useNavigate();

  const onClickChat = () => {
    return nav("/member/chat");
  };

  return (
    <>
      <div>
        <img style={{ height: 170 }} onClick={getBoard} src={character} />
      </div>
      <img onClick={onClickChat} src={chat} style={{ cursor: "pointer" }} />
      <Footer />
    </>
  );
};

export default Homepage;
