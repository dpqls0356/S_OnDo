import { styled, keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import background from "../../../../assets/images/ourstory/character1.jpeg"
import useAuthStore from "../../../../store/app/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const View = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${background}); 
    background-size: cover;
    background-position: center;
    position: absolute;
    z-index: 20;
    opacity: 0;
    animation: ${fadeIn} 2s forwards;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: white;
    font-size: 20px;
  
`;


const Btn = styled.div`
    font-size: 25px;
    font-weight: 900;
    position: fixed;
    width: fit-content;
    bottom: 0;
    color: black;
    padding-bottom: 50px;
    background-color: rgba(0, 0, 0, 0);
    height: fit-content;
    pointer-events: all;
    z-index: 200;
    &:focus, &:hover {
    outline: none;
    border: none;
    }
`;
const Text = styled.pre`
    position: fixed;
    margin-top: 20px;
    max-width: 360px;
      min-height: 10%;
    width: 90%;
    padding: 10px 20px;
    background-color: #0000008b;
    color: white;
    z-index: 30;
    animation: ${fadeIn} 2s forwards;

`;
const Name = styled.div`
   margin-right:10px; 
`
const SettingName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #000000af;
    z-index: 30;
    color: white;
    pointer-events: all;
    input {
        padding: 10px 20px;
        border-radius: 10px;
        color:black;
        margin: 10px 0px;
        text-align: center;
    }
    input:focus{
        outline: none;
    }
    div{
    }
`
const baseUrl = import.meta.env.VITE_BASE_URL;
export default function Box({ clickCount, handleClick }) {
  const {   user } = useAuthStore((state) => ({
    user: state.user,
  }));
  const [characterName, setCharacterName] = useState("");
  const navigate = useNavigate();
  const textRef = useRef(null);
  const saveCharacterName = async () => {
    try {
      const response = await axios.post(`${baseUrl}/character/changeName`, {
        name: characterName,
      },{ withCredentials: true });
      if (response.status === 200) {
        console.log("이름이 성공적으로 저장되었습니다.");
      } else {
        console.log("이름 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("이름 저장 중 오류가 발생했습니다.", error);
    }
  };
  useEffect(()=>{
    console.log("here")
    if(clickCount===15){
        navigate("/member/home");
    }
  },[clickCount])
  return (

    <>  
        {clickCount === 4&&
        <Text style={{display:"flex"}} ref={textRef}>
            <Name>???:</Name>
            <pre>
                여기가 어디죠? {"\n"}
                당신은 누구신가요?
            </pre>
        </Text>}
        {clickCount === 5&&
        <Text style={{display:"flex"}} ref={textRef}>
            <Name>나:</Name>
            <pre>
                나는 {user.name}이야 {"\n"}
                그나저나 어쩌다 이 추운 숲속에{"\n"}
                쓰러져 있던거야?
            </pre>
        </Text>}
        {clickCount === 6&&
            <Text style={{display:"flex"}} ref={textRef}>
            <Name>???:</Name>
            <pre>
                도토리를 구하려 산속에 들어왔는데 {"\n"}
                갑자기 너무 많은 눈이 내렸던 것 밖에{"\n"}
                기억이 나지 않아요...{"\n"}
            </pre>
        </Text>}
            {clickCount === 7&&
            <Text style={{display:"flex"}} ref={textRef}>
            <Name>???:</Name>
            <pre>
                혹시 괜찮다면 {"\n"}
                저 대신 도토리를 모아 추위에서 {"\n"}
                벗어날 수 있게 해주실 수 있을까요?{"\n"}
            </pre>
        </Text>}
            {clickCount === 8&&
            <Text style={{display:"flex"}} ref={textRef}>
            <Name>나:</Name>
            <pre>
                좋아, 내가 도와줄게 {"\n"}
            </pre>
        </Text>}
        {clickCount === 9&&
            <Text style={{display:"flex"}} ref={textRef}>
            <Name>???:</Name>
            <pre>
                감사합니다.{"\n"}
                혹시 마지막 부탁이 있는데 {"\n"}
                들어주실 수 있나요?{"\n"}
            </pre>
        </Text>}
            {clickCount === 10&&
            <Text style={{display:"flex"}} ref={textRef}>
            <Name>나:</Name>
            <pre>
                어떤건데? {"\n"}
            </pre>
        </Text>}
            {clickCount === 11&&
            <Text style={{display:"flex"}} ref={textRef}>
            <Name>???:</Name>
            <pre>
                이름을 지어주 실 수 있나요?{"\n"}
                제 이름이 잘 기억나지않아요...{"\n"}
            </pre>
        </Text>}
            {clickCount === 12&&
            <Text style={{display:"flex"}} ref={textRef}>
           <Name>나:</Name>
            <pre>
                알겠어 내가 지어줄게!
            </pre>
        </Text>}
            {clickCount === 13&&
            <SettingName>
                <p>캐릭터의 이름을 입력해주세요</p>
                <input type="text"         
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                ></input>
                <div onClick={()=>{
                    handleClick();
                    saveCharacterName();
                }}>저장</div>
            </SettingName>}
                        {clickCount === 14&&
            <Text style={{display:"flex"}} ref={textRef}>
           <Name>{characterName}:</Name>
            <pre>
                {characterName}? 너무 마음에 들어요!{"\n"}
                그럼 앞으로 잘부탁해요 {":)!"}
            </pre>
        </Text>}
        <View>
        </View>
        {clickCount!==13&&
           <Btn
                onClick={() => {
                handleClick();
                }}
            >
            Click!
            </Btn>
        }
    </>
  );
}
