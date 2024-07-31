import "./Homepage.css";

import Footer from "../../../components/app/Footer";
import character from "./../../../assets/images/공통_캐릭터.png";
import chat from "./../../../assets/images/chat.png";

import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const nav = useNavigate();

  const onClickChat = () => {
    return nav("/member/chat");
  };

  return (
    <>
      <div>
        <img style={{ height: 170 }} src={character} />
      </div>
      <img onClick={onClickChat} src={chat} style={{ cursor: "pointer" }} />
      <Footer />
    </>
  );
};

export default Homepage;
