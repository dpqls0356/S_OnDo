import { useState } from 'react';
import styled from 'styled-components';

const View = styled.div``;

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
                sendMessage(message);
                setMessage(''); // 메시지 전송 후 입력 필드를 비웁니다.
              }}
            >
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
