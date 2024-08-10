import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from '@stomp/stompjs';

// 스타일드 컴포넌트를 사용해 기본적인 스타일을 정의합니다.
const View = styled.div`
    // 필요한 스타일을 여기에 추가하세요.
`;

// stompClient는 WebSocket 연결을 관리하는 STOMP 클라이언트입니다.
let stompClient = null;

export default function Chat() {
    // 컴포넌트 상태 정의
    const [currentSessionId, setCurrentSessionId] = useState(null); // 현재 세션 ID를 저장
    const [isConnected, setIsConnected] = useState(false); // WebSocket 연결 상태를 저장
    const [isHistoryLoading, setIsHistoryLoading] = useState(false); // 메시지 기록 로딩 상태를 저장
    const [messages, setMessages] = useState([]); // 받은 메시지를 저장
    const [name, setName] = useState(''); // 사용자 이름을 저장
    const [message, setMessage] = useState(''); // 보낼 메시지를 저장
    const [sessionId, setSessionId] = useState(''); // 입력된 세션 ID를 저장

    // 컴포넌트가 렌더링되거나 상태가 변경될 때 실행되는 effect
    useEffect(() => {
        if (isConnected && currentSessionId) {
            // 현재 세션 ID에 대한 구독 설정
            stompClient.subscribe(`/topic/messages/${currentSessionId}`, (message) => {
                if (!isHistoryLoading) {
                    showMessage(JSON.parse(message.body));
                }
            });

            // 세션 ID에 해당하는 메시지 기록을 가져옴
            fetchHistory(currentSessionId);
        }
    }, [isConnected, currentSessionId]);

    // WebSocket 서버와 연결을 설정하는 함수
    const connect = () => {
        if (!sessionId) {
            alert('Please enter a Session ID.');
            return;
        }

        setCurrentSessionId(sessionId);

        stompClient = new Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket', // WebSocket 서버 URL
        });

        // 연결 성공 시 실행되는 함수
        stompClient.onConnect = (frame) => {
            setIsConnected(true);
            console.log('Connected: ' + frame);
        };

        // WebSocket 오류 발생 시 실행되는 함수
        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        // STOMP 프로토콜 오류 발생 시 실행되는 함수
        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        // WebSocket 연결 활성화
        stompClient.activate();
    };

    // 주어진 세션 ID에 대한 메시지 기록을 가져오는 함수
    const fetchHistory = async (sessionId) => {
        try {
            setIsHistoryLoading(true);
            const response = await axios.get(`http://localhost:8080/history/${sessionId}`);
            const fetchedMessages = Array.isArray(response.data) ? response.data : [];
            showHistory(fetchedMessages);
            setIsHistoryLoading(false);
        } catch (error) {
            console.error('Error fetching history:', error);
            setIsHistoryLoading(false);
        }
    };

    // WebSocket 연결을 종료하는 함수
    const disconnect = () => {
        if (stompClient !== null) {
            stompClient.deactivate();
        }
        setIsConnected(false);
        console.log('Disconnected');
    };

    // 메시지를 서버로 전송하는 함수
    const sendMessage = () => {
        if (stompClient !== null && message.trim() !== '') {
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify({
                    sessionId: currentSessionId,
                    from: name,
                    content: message,
                }),
            });
            setMessage(''); // 메시지 전송 후 입력 필드를 비웁니다.
        }
    };

    // 받은 메시지를 상태에 추가하는 함수
    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    // 가져온 메시지 기록을 상태에 설정하는 함수
    const showHistory = (messages) => {
        setMessages(messages);
    };

    return (
        <View>
            <div className="container" id="main-content">
                <noscript>
                    <h2 style={{ color: '#ff0000' }}>
                        Seems your browser does not support Javascript! Websocket relies on
                        Javascript being enabled. Please enable Javascript and reload this
                        page!
                    </h2>
                </noscript>
                <div className="row">
                    <div className="col-md-6">
                        <form
                            className="form-inline"
                            onSubmit={(e) => {
                                e.preventDefault();
                                isConnected ? disconnect() : connect();
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="connect">WebSocket connection:</label>
                                <button
                                    id="connect"
                                    className="btn btn-default"
                                    type="submit"
                                    disabled={isConnected}
                                >
                                    Connect
                                </button>
                                <button
                                    id="disconnect"
                                    className="btn btn-default"
                                    type="submit"
                                    disabled={!isConnected}
                                >
                                    Disconnect
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <form
                            className="form-inline"
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="sessionId">Session ID:</label>
                                <input
                                    type="text"
                                    id="sessionId"
                                    className="form-control"
                                    placeholder="Session ID here..."
                                    value={sessionId}
                                    onChange={(e) => setSessionId(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Your name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Your name here..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <input
                                    type="text"
                                    id="message"
                                    className="form-control"
                                    placeholder="Your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <button id="send" className="btn btn-default" type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table id="conversation" className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Messages</th>
                                </tr>
                            </thead>
                            <tbody id="messages">
                                {messages.map((msg, index) => (
                                    <tr key={index}>
                                        <td>
                                            <strong>{msg.from}:</strong> {msg.content}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </View>
    );
}
