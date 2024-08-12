import "./Homepage.css";

// import Balloon from "./../../../components/app/Ballon"
import Thermometer from "../../../components/app/Thermometer";
import Balloon from "../../../components/app/Balloon";
import tail from "../../../assets/images/characterMove/tail.png";
import acorn from "../../../assets/images/characterMove/acorn.png"
import defaultEmogi from "../../../assets/images/characterMove/1.png";
import smileEmogi from "../../../assets/images/characterMove/2.png"
import surprisedEmogi from "../../../assets/images/characterMove/3.png"
import chat from "./../../../assets/images/chat.png";
import back_img from "./../../../assets/images/home_back2.jpg";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components"

const Tail = styled.div`
`
const CharacterBody = styled.div`
`
const Acorn = styled.div`
  
`
const Homepage = () => {
  const renderCount = useRef(0);
  const [character, setCharacter] = useState({});
  const [characterState, setCharacterState] = useState({
    text: "안녕",
    img: defaultEmogi,
  });
  const [previousNum, setPreviousNum] = useState(null);

  const CharacterStateList = [
    { text: "안녕", imgNum: 1,move:0 },
    { text: "행복한 하루 보내길 바라!", imgNum: 2,move:1 },
    {
      text: "나를 위해 도토리를 모아줘서 고마워 ~ 너 덕분에 따뜻해",
      imgNum: 3,
      move:1
    },
  ];

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
  });

  const nav = useNavigate();

  const onClickChat = () => {
    return nav("/member/chat");
  };

  const changeCharacterStatus = () => {
    let num;
    do {
      num = Math.floor(Math.random() * CharacterStateList.length);
    } while (num === previousNum);

    let img = characterImg; // 현재 imgNum에 상관없이 동일한 이미지 사용
    setCharacterState({ text: CharacterStateList[num].text, img: img });
    setPreviousNum(num); // 이전에 선택한 숫자를 저장

    // console.log("========character click=========");
    // console.log(characterState.img + " " + characterState.text);
  };

  return (
    <div className="homepage">
      <div className="home-content">
        <div className="charaInfo">
          <p id="char-name">{character.name}</p>
          <p id="char-level">Lv.{character.level}</p>
        </div>
        <div id="thermometer">
          <Thermometer character={character} />
        </div>
        <div className="Char-ballon">
          <Balloon text={characterState.text} />
        </div>
        <div onClick={changeCharacterStatus} className="Char-daram">
          
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
