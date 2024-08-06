import "./Chat.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import chat_send from "./../../../assets/images/chat_send.png";

import back from "./../../../assets/images/back.png";

const Chatpage = () => {
  const nav = useNavigate();
  const [messages, setMessages] = useState([]); // 메세지 기록
  const [userInput, setUserInput] = useState(""); // 유저가 보낼 메세지
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
    const response = await api.get("/chatbot/list?page=0&size=5");
    const chattingList = response.data.data.chattingList;
    //setMessages([...chattingList]);
    console.log(chattingList);
    return chattingList;
  };

  const typeChattingMessage = async () => {
    if (userInput.trim() !== '') {
      const response = await api.post(
        "/chatbot/insert",
        {
          message: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json", // form-data 아니고 json으로
          },
        }
      );
  
      const chattingList = response.data.data.responseChatting;
      setMessages([...messages, userInput, chattingList]);
    }
  };

  useEffect(() => {
    const updateMessages = async () => {
      const responseMessages = await getChatbotMessage();
      setMessages([...responseMessages]);
    };

    updateMessages();
  }, []);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

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
      <div className="ChatScreen text-black">
        {messages &&
          messages.map((message, index) => {
            return <li key={index}>{message.content}</li>;
          })}
      </div>

      {/* 채팅 입력창 */}
      <div className="Chatbox">
        <input type="text" value={userInput} onChange={handleInputChange} />
        <img onClick={typeChattingMessage} src={chat_send} />
      </div>
    </div>
  );
};

export default Chatpage;
