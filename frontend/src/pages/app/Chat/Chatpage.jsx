import './Chat.css'

import { useNavigate } from "react-router-dom";

import chat_send from './../../../assets/images/chat_send.png'

import back from './../../../assets/images/back.png'

const Chatpage = () => {
  const nav = useNavigate()

  const onClickBack = () => {
    nav('/member/home')
  }
  return (
    <div className='Chat'>
      {/* 헤더 */}
      <div className='CharacterName'>
        <img onClick={onClickBack} style={{cursor: 'pointer'}} src={back} />
        <div>캐릭터이름</div>
      </div>

      {/* 채팅 화면 */}
      <div className='ChatScreen'>
          dskjas
      </div>
      
      {/* 채팅 입력창 */}
      <div className='Chatbox'>
        <input type="text" />
        <img src={chat_send} />
      </div>
    </div>
  )
}

export default Chatpage;