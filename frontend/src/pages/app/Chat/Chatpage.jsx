import "./Chat.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../../../components/app/Spinner";
import chat_send from "./../../../assets/images/chat_send.png";

import back from "./../../../assets/images/back.png";

const Chatpage = () => {
  const size = 10;
  const nav = useNavigate();
  const [character, setCharacter] = useState({});
  const [messages, setMessages] = useState([]); // 메세지 기록
  const [userInput, setUserInput] = useState({
    content: "",
    createdAt: "",
  }); // 유저가 보낼 메세지
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [refPageNum, setRefPageNum] = useState(true);
  const containerRef = useRef(null);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  // 챗봇 메세지 페이지 단위로 가져오기
  const getChatbotMessage = async () => {
    const response = await api.get(
      "/chatbot/list?page=" + pageNum + "&size=" + size
    );
    const chattingList = response.data.data.chattingList;
    const sortedChatting = chattingList.reverse();
    return sortedChatting;
  };

  // 캐릭터 가져오기
  const getCharacter = async () => {
    const characterResponse = await api.get("/character/getCharacter");
    setCharacter(characterResponse.data.data.character);
  };

  // 메시지 입력하기
  const typeChattingMessage = async () => {
    // 공백이면 동작하면 안 됨
    if (userInput.content !== undefined) {
      setSpinnerLoading(true);

      const response = await api.post(
        "/chatbot/insert",
        {
          message: userInput.content,
        },
        {
          headers: {
            "Content-Type": "application/json", // form-data 아니고 json으로
          },
        }
      );

      await referPage();
      viewPastRecords();
      setMessages((prevMessages) => [
        ...prevMessages,
        ...response.data.data.responseChatting,
      ]);
      setUserInput({ content: "", createdAt: "" }); // userInput 초기화

      setSpinnerLoading(false);
    }
  };

  const referPage = async () => {
    setRefPageNum(false);
  };

  const fetchMoreItems = async () => {
    const response = await getChatbotMessage();

    // 불러올게 없으면 false
    if (response.length < size) {
      setHasMore(false);
    } else {
      setMessages([...response, ...messages]);
    }
  };

  useEffect(() => {
    console.log(pageNum);
    if (refPageNum) {
      fetchMoreItems();
    } else {
      setRefPageNum(true);
    }
  }, [pageNum]);

  const viewPastRecords = () => {
    if (!hasMore) return;
    setPageNum((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const firstRendering = async () => {
      const chattings = await getChatbotMessage();
      setMessages([...chattings]);
      await getCharacter();
    };

    firstRendering();
  }, []);

  const handleInputChange = (event) => {
    setUserInput({
      ...userInput,
      content: event.target.value,
      createdAt: new Date().toISOString(),
    });
  };

  const onClickBack = () => {
    nav("/member/home");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      typeChattingMessage();
    }
  };

  return (
    <div className="Chat">
      {spinnerLoading && <LoadingSpinner />}
      {/* 헤더 */}
      <div className="CharacterName">
        <img onClick={onClickBack} style={{ cursor: "pointer" }} src={back} />
        <div>{character.name}</div>
      </div>
  
      <div className="ChatContent">
        <div>
          {character.name}는 기억력이 안 좋아서 채팅 내용을 기억하지 못함;; 
          {/* 로딩하는 화면 만들어서 입력시 적용하면 좋을듯 */}
        </div>
  
        {/* 채팅 화면 */}
        <div className="ChatScreen text-black" ref={containerRef}>
          <div
            id="observer"
            className="sticky-header"
            onClick={viewPastRecords}
          >
            이전 채팅 기록 보기
          </div>
          {messages &&
            messages.map((message, index) => (
              <li key={index}>
                {message.content}
                <div>{message.createdAt}</div>
              </li>
            ))}
        </div>
      </div>
  
      {/* 채팅 입력창 */}
      <div className="Chatbox">
        <input
          type="text"
          value={userInput.content}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <img
          onClick={typeChattingMessage}
          src={chat_send}
          style={{ cursor: "pointer" }}
          alt="Send"
        />
      </div>
    </div>
  );
};

export default Chatpage;
