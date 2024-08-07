import "./Chat.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import chat_send from "./../../../assets/images/chat_send.png";

import back from "./../../../assets/images/back.png";

const Chatpage = () => {
  const nav = useNavigate();
  const [character, setCharacter] = useState({});
  const [messages, setMessages] = useState([]); // 메세지 기록
  const [userInput, setUserInput] = useState(""); // 유저가 보낼 메세지
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(0);

  const elementRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  // 챗봇 메세지 페이지 단위로 가져오기
  const getChatbotMessage = async () => {
    const response = await api.get("/chatbot/list?page=" + pageNum + "&size=2");
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
    if (userInput.trim() !== "") {
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

      setMessages([...messages, ...response.data.data.responseChatting]);
      setUserInput("");
    }
  };

  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    // 첫 번째 entry가 화면에 나타나고 더 많은 데이터를 불러올 수 있는 상태(hasMore)인 경우 fetchMoreItems 함수를 호출.
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore]);

  const fetchMoreItems = async () => {
    const response = await getChatbotMessage();
    console.log(response);

    // 불러올게 없으면 false
    if (response.length === 0) {
      setHasMore(false);
    } else {
      setMessages([...response, ...messages]);

      // 페이지 번호를 업데이트하여 다음 요청에 올바른 skip 값을 사용합니다.
      setPageNum((prevPage) => prevPage + 1);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPageNum((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMoreItems();
  }, [pageNum]);

  useEffect(() => {
    const firstRendering = async () => {
      const chattings = await getChatbotMessage();
      setMessages([...chattings]);
      await getCharacter();
    };

    firstRendering();

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최상단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
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
        <div>{character.name}</div>
      </div>

      <div>
        {character.name}는 기억력이 안 좋아서 채팅 내용을 기억하지 못함;;
      </div>

      {/* 채팅 화면 */}
      <div className="ChatScreen text-black">
        <div id="observer" style={{ height: "10px" }}></div>
        {messages &&
          messages.map((message, index) => {
            return (
              <li key={index}>
                {message.content}
                <div>{message.createdAt}</div>
              </li>
            );
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
