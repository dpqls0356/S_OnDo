import "./Homepage.css";

// import Balloon from "./../../../components/app/Ballon"
import Thermometer from "../../../components/app/Thermometer";
import Balloon from "../../../components/app/Balloon";
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
    <div className="homepage">
      <div className="charaInfo">
        <p>이름</p>
        <p>Lv.5</p>
      </div>
      {/* <div className="ballon">
        <p>안녕</p>
        </div> */}
      <div className="center">
        <div>
          <Thermometer />
        </div>
        <div className="centerChara">
          <Balloon text={'혹시 내 도토리 봤어?? 분명 아까까지만 해도 옆에 있었던 것 같은데...'} />
          <img style={{ height: 170 }} src={character} />
        </div>
      </div>
      <div className="chatBtn">
        <img onClick={onClickChat} src={chat} style={{ cursor: "pointer" }} />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
