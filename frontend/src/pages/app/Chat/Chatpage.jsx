import "./Chat.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import chat_send from "./../../../assets/images/chat_send.png";

import back from "./../../../assets/images/back.png";

const Chatpage = () => {
  const nav = useNavigate();
  const [messages, setMessages] = useState([]); // 메세지 기록
  // const [userInput, setUserInput] = useState(""); // 유저가 보낼 메세지
  // const [loading, setLoading ] = useState(false);

  // const apikey = '';
  // const addMessage = (sender, message) => {
  //   setMessages(prevMessages => [...prevMessages, { sender, message }]);
  // };

  // const handleSendMessage = async () => {
  //   const message = userInput.trim(); // 공백 제거해서 유저가 보낸 메시지가 공백인지 확인가능하게 함
  //   if (message.length === 0) return;

  //   addMessage('user', message);
  //   setUserInput(''); // 유저 메시지 초기화
  //   setLoading(true); // 로딩중

  //   try {
  //     const response = await axios.post('', {
  //       //사용자가 입력한 메시지를 전송
  //     })
  //   }
  // }

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  const getChatbotMessage = async () => {
    const response = await api.get("/chatbot/list?page=0&size=20");
    const chattingList = response.data.data.chattingList;
    //setMessages([...chattingList]);
    console.log(chattingList);
    return chattingList;
  };

  const typeChattingMessage = async () => {
    const response = await api.post(
      "/chatbot/insert",
      {
        message: "좋은하루",
      },
      {
        headers: {
          "Content-Type": "application/json", // form-data 아니고 json으로
        },
      }
    );

    console.log(response);
  };

  useEffect(() => {
    const updateMessages = async () => {
      const responseMessages = await getChatbotMessage();
      setMessages([...responseMessages]);
    };

    updateMessages();
  }, []);

  const onClickBack = () => {
    nav("/member/home");
  };
  return (
    <div className="Chat">
      {/* 헤더 */}
      <div className="CharacterName">
        <img onClick={onClickBack} style={{ cursor: "pointer" }} src={back} />
        <div>캐릭터이름</div>
      </div>

      {/* 채팅 화면 */}
      <div className="ChatScreen">
        {messages &&
          messages.map((message, index) => {
            return <li key={index}>{message.content}</li>;
          })}
      </div>

      <button onClick={typeChattingMessage}>버튼</button>

      {/* 채팅 입력창 */}
      <div className="Chatbox">
        <input type="text" />
        {/* <img onClick={typeChattingMessage()} src={chat_send} /> */}
      </div>
    </div>
  );
};

export default Chatpage;
