import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/app/Spinner';
import chat_send from './../../../assets/images/chat_send.png';
import back from './../../../assets/images/back.png';
import chrface from './../../../assets/images/test_chara.png'
import './Chatpage.css';

// API 인스턴스 생성
const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({ baseURL: baseUrl, withCredentials: true });

const Chatpage = () => {
  // 상태 변수들
  const size = 10;
  const nav = useNavigate();
  const [character, setCharacter] = useState(null);
  const [characterLoading, setCharacterLoading] = useState(true);
  const [characterError, setCharacterError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const chatContainerRef = useRef(null);

  // 채팅 메시지 가져오기
  const getChatbotMessage = useCallback(async () => {
    const response = await api.get(`/chatbot/list?page=${pageNum}&size=${size}`);
    return response.data.data.chattingList;
  }, [pageNum, size]);

  // 캐릭터 정보 가져오기
  const getCharacter = useCallback(async () => {
    setCharacterLoading(true);
    setCharacterError(null);
    try {
      console.log("Fetching character data...");
      const characterResponse = await api.get('/character/getCharacter', { timeout: 5000 });
      console.log("Character API response:", characterResponse);
      
      const fetchedCharacter = characterResponse.data.data.character;
      if (fetchedCharacter && fetchedCharacter.name) {
        console.log("Setting character:", fetchedCharacter);
        setCharacter(fetchedCharacter);
      } else {
        console.error("Invalid character data:", fetchedCharacter);
        setCharacterError("Invalid character data received");
        setCharacter({ name: "Unknown" });
      }
    } catch (error) {
      console.error("Error fetching character:", error);
      setCharacterError(error.message || "Failed to fetch character");
      setCharacter({ name: "Unknown" });
    } finally {
      setCharacterLoading(false);
    }
  }, []);

  // 채팅창 스크롤을 맨 아래로 이동
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  // 메시지 전송
  const sendMessage = useCallback(async () => {
    if (userInput.trim() !== '' && !isLoading) {
      setIsLoading(true);
      const currentInput = userInput;
      setUserInput('');
      
      try {
        const response = await api.post('/chatbot/insert', 
          { message: currentInput }, 
          { headers: { 'Content-Type': 'application/json' } }
        );

        const newMessages = response.data.data.responseChatting;
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      } catch (error) {
        console.error("Error sending message:", error);
        setUserInput(currentInput);
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    }
  }, [userInput, isLoading, scrollToBottom]);

  // 이전 메시지 더 불러오기
  const loadMoreMessages = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const oldMessages = await getChatbotMessage();
      if (oldMessages.length < size) {
        setHasMore(false);
      }
      setMessages(prevMessages => [...oldMessages.reverse(), ...prevMessages]);
      setPageNum(prevPageNum => prevPageNum + 1);
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoading(false);
    }

    // 스크롤 위치 조정
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const oldScrollTop = chatContainerRef.current.scrollTop;
      const oldHeight = chatContainerRef.current.offsetHeight;
      
      chatContainerRef.current.scrollTop = scrollHeight - oldHeight - oldScrollTop;
    }
  }, [isLoading, hasMore, getChatbotMessage, size]);

  // 컴포넌트 마운트 시 캐릭터 정보 가져오기
  useEffect(() => {
    getCharacter();
  }, [getCharacter]);

  // 채팅 초기화
  useEffect(() => {
    if (!isInitialized) {
      const initializeChat = async () => {
        setIsLoading(true);
        try {
          const initialMessages = await getChatbotMessage();
          setMessages(initialMessages.reverse());
          scrollToBottom();
        } catch (error) {
          console.error("Error initializing chat:", error);
        } finally {
          setIsInitialized(true);
          setIsLoading(false);
        }
      };
      initializeChat();
    }
  }, [isInitialized, getChatbotMessage, scrollToBottom]);

  // 입력 처리
  const handleInputChange = useCallback((event) => {
    setUserInput(event.target.value);
  }, []);

  // 엔터 키 처리
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  // 메시지 시간 포맷팅
  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="Chat">
      {isLoading && <LoadingSpinner />}
      {/* 캐릭터 정보 표시 */}
      <div className="CharacterName">
        <img onClick={() => nav('/member/home')} src={back} alt="Back" />
        <img 
          src={chrface} 
          alt="다람이 얼굴" 
          style={{
            borderRadius: '50%',
            border: '2px solid black',
            width: '50px',
            height: '50px',
            objectFit: 'cover'
          }}
        />
        {characterLoading ? (
          <div>Loading character...</div>
        ) : characterError ? (
          <div>Error: {characterError}</div>
        ) : character ? (
          <div>{character.name}</div>
        ) : (
          <div>Unknown Character</div>
        )}
      </div>
      
      {/* 채팅 내용 */}
      <div className="ChatContentWrapper">
        {isInitialized && (
          <div className="ChatContent" ref={chatContainerRef}>
            {/* '이전 메시지 더 보기' 버튼 */}
            {messages.length > 0 && hasMore && (
              <button onClick={loadMoreMessages} disabled={isLoading} className="load-more-button">
                {isLoading ? '로딩 중...' : '이전 메시지 더 보기'}
              </button>
            )}
            
            {/* 메시지 목록 */}
            <div className="ChatScreen">
              {messages.map((message, index) => (
                <div key={index} className={`message-container ${message.sender === 'user' ? 'user' : 'bot'}`}>
                  <div className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
                    {message.content}
                  </div>
                  <div className="message-time">
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 메시지 입력 */}
      <div className="ChatboxWrapper">
        <div className="Chatbox">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
          />
          <img
            onClick={sendMessage}
            src={chat_send}
            alt="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chatpage);