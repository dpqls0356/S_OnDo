import "./Homepage.css";

// import Balloon from "./../../../components/app/Ballon"
import Thermometer from "../../../components/app/Thermometer";
import Balloon from "../../../components/app/Balloon";
import character from "./../../../assets/images/공통_캐릭터.png";
import chat from "./../../../assets/images/chat.png";

import back_img from "./../../../assets/images/home_back2.jpg";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../../store/app/authStore";

const Homepage = () => {
  const { isAuthenticated } = useAuthStore();
  const renderCount = useRef(0);
  const [character, setCharacter] = useState({});

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  // 캐릭터 가져오기
  const getCharacter = async () => {
    const characterResponse = await api.get("/character/getCharacter");
    setCharacter(characterResponse.data.data.character);

    console.log(characterResponse.data.data.character);
  };

  useEffect(() => {
    getCharacter();
  }, []);

  useEffect(() => {
    renderCount.current += 1;
    console.log("Render count:", renderCount.current);
    console.log("isAuthenticated:", isAuthenticated);
  });
  // const { getAccessToken } = useAuthStore();
  // const getBoard = async()=>{
  //   const token = getAccessToken();
  //   console.log(token);
  //     const res = await axios.get('http://localhost:8080/api/v1/board/list',{
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log(res);
  // }
  const nav = useNavigate();

  const onClickChat = () => {
    return nav("/member/chat");
  };

  return (
    <div className="homepage">
      {/* <img src={back_img} /> */}
      <div className="home-content">
        <div className="charaInfo">
          <p id="char-name">{character.name}</p>
          <p id="char-level">Lv.{character.level}</p>
        </div>
        {/* <div className="ballon">
        <p>안녕</p>
        </div> */}
        <div id="thermometer">
          <Thermometer />
        </div>
        <div className="Char-ballon">
          <Balloon
            text={
              "혹시 내 도토리 봤어?? 분명 아까까지만 해도 옆에 있었던 것 같은데..."
            }
          />
        </div>
        <div className="Char-daram">
          <img style={{ height: 170 }} src={character} />
        </div>
        <div className="chatBtn">
          <img onClick={onClickChat} src={chat} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <img id="back-img" src={back_img} />
    </div>
  );
};

export default Homepage;
