import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/app/Spinner';
import chat_send from './../../../assets/images/chat_send.png';
import back from './../../../assets/images/back.png';
import chrface from './../../../assets/images/test_chara.png'
import './Chatpage.css';

const Chatpage = () => {
  const size = 10;
  const nav = useNavigate();
  const [character, setCharacter] = useState({});
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const chatContainerRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const api = axios.create({ baseURL: baseUrl, withCredentials: true });

  const getChatbotMessage = useCallback(async () => {
    const response = await api.get(`/chatbot/list?page=${pageNum}&size=${size}`);
    return response.data.data.chattingList;
  }, [api, pageNum, size]);

  const getCharacter = useCallback(async () => {
    const characterResponse = await api.get('/character/getCharacter');
    setCharacter(characterResponse.data.data.character);
  }, [api]);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const typeChattingMessage = useCallback(async () => {
    if (userInput.trim() !== '' && !isLoading) {
      setIsLoading(true);
      const currentInput = userInput;
      setUserInput('');
      
      try {
        const response = await api.post('/chatbot/insert', 
          { message: currentInput }, 
          { headers: { 'Content-Type': 'application/json' } }
        );

        // 서버 응답에서 받은 메시지 목록만 사용
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
}, [userInput, isLoading, api, scrollToBottom]);

  const loadMoreMessages = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const oldMessages = await getChatbotMessage();
    if (oldMessages.length < size) {
      setHasMore(false);
    }
    setMessages(prevMessages => [...oldMessages.reverse(), ...prevMessages]);
    setPageNum(prevPageNum => prevPageNum + 1);
    setIsLoading(false);

    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const oldScrollTop = chatContainerRef.current.scrollTop;
      const oldHeight = chatContainerRef.current.offsetHeight;
      
      chatContainerRef.current.scrollTop = scrollHeight - oldHeight - oldScrollTop;
    }
  }, [isLoading, hasMore, getChatbotMessage, size]);

  useEffect(() => {
    if (!isInitialized) {
      const initializeChat = async () => {
        const initialMessages = await getChatbotMessage();
        setMessages(initialMessages.reverse());
        await getCharacter();
        scrollToBottom();
        setIsInitialized(true);
      };
      initializeChat();
    }
  }, [isInitialized, getChatbotMessage, getCharacter, scrollToBottom]);

  const handleInputChange = useCallback((event) => {
    setUserInput(event.target.value);
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && userInput.trim() !== '' && !isLoading) {
      event.preventDefault();
      typeChattingMessage();
    }
  }, [userInput, isLoading, typeChattingMessage]);

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
      <div className="CharacterName">
        <img onClick={() => nav('/member/home')} src={back} alt="Back" />
        <img 
            src={chrface} 
            alt="다람이 얼굴" 
            style={{
              borderRadius: '50%',
              border: '2px solid black',
              width: '50px',  // 원하는 크기로 조정
              height: '50px', // 원하는 크기로 조정
              objectFit: 'cover'
            }}
          />
        <div>{character.name}</div>
      </div>
      
      {isInitialized && (
        <div className="ChatContent" ref={chatContainerRef}>
          <button onClick={loadMoreMessages} disabled={!hasMore || isLoading} className="load-more-button">
            {isLoading ? '로딩 중...' : '이전 메시지 더 보기'}
          </button>
          
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
      
      <div className="Chatbox">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <img
          onClick={() => {
            if (!isLoading) {
              typeChattingMessage();
            }
          }}
          src={chat_send}
          alt="Send"
        />
      </div>
    </div>
  );
};

export default React.memo(Chatpage);