import { useState } from 'react';
import styled from 'styled-components';

const View = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
const InputMessage = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 20px;
    form{
        padding:5px 20px;
        display: flex;
        input{
            flex: 1;
            padding:10px 0px 10px 20px;
            margin-right:10px;
        }
        div{

        }
    }
`
const MessageList = styled.div`
    flex:1;
`
const Message = styled.div`
`
const Content = styled.div`
    
`
const UserProfile = styled.div`
`
export default function Chat({
  isConnected,
  messages,
  sendMessage,
  connect,
  disconnect,
}) {
  const [message, setMessage] = useState('');

  return (
    <View>
        <MessageList>
            {messages.map((msg, index) => (
                <Message key={index}>
                    <UserProfile>{msg.from}:</UserProfile> 
                    <Content>{msg.content}</Content>
                </Message>
            ))}
        </MessageList>
        <InputMessage>
            <form
              className="form-inline"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(message);
                setMessage(''); // 메시지 전송 후 입력 필드를 비웁니다.
              }}
            >
                <input
                  type="text"
                  id="message"
                  placeholder="메세지를 입력하세요..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div>
                    <button id="send" type="submit">
                    전송
                    </button>
                </div>
            </form>
        </InputMessage>
    </View>
  );
}
