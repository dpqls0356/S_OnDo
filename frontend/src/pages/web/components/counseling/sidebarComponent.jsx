import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from 'styled-components';
import UserInfoComponent from './userInfoComponent';
import Chat from './chat'; // userInfoComponent 대신 Chat을 가져와야 합니다.
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Tag = styled.div`
  position: absolute;
  top: 50px;
  right: ${({ hidden }) => (hidden ? '0px' : '-50px')};
  width: 50px;
  height: 100px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #fae6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;
`;

const View = styled.div`
  width: ${({ hidden }) => (hidden ? '0' : '35%')};
  background-color: #fae6e6;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: width 0.3s ease;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: inherit;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  padding-left: 20px;
  & > div:nth-child(1) {
    display: flex;
    width: 90%;
  }
`;

const Col = styled.div`
  background-color: inherit;
  font-size: 20px;
  padding: 5px 20px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      background-color: white;
      color: #ffb1b1;
      border-radius: 50px;
    `}
`;
const baseUrl = import.meta.env.VITE_BASE_URL;
const SideBar = () => {
  const location = useLocation();
  const [isChat, setIsChat] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [memberInfo, setMemberInfo] = useState({});
  const [historyList, setHistoryList] = useState([]);
  const memberId = location.state.memberId;

  const toggleChat = useCallback((status) => {
    setIsChat(status);
  }, []);

  const hiddenSidebar = () => {
    setHidden(true);
  };

  const showSideBar = () => {
    setHidden(false);
  };

  const getMemberInfo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/counselor/member?memberId=${memberId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data.member;
      setMemberInfo({
        birthDate: data.birthDate,
        gender: data.gender === 'MALE' ? "남성" : "여성",
        memberId: data.memberId,
        memberName: data.memberName,
      });
      setHistoryList([...data.reservations]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMemberInfo();
  }, []);

  return (
    <>
      <View hidden={hidden}>
        <Header>
          <div>
            <Col onClick={() => toggleChat(true)} active={isChat}>
              채팅
            </Col>
            <Col>|</Col>
            <Col onClick={() => toggleChat(false)} active={!isChat}>
              내담자 정보
            </Col>
          </div>
          <div>
            <FontAwesomeIcon style={{ width: "20px", height: "30px", cursor: "pointer" }} icon={faAnglesRight} onClick={hiddenSidebar} />
          </div>
        </Header>
        {isChat ? <Chat /> : <UserInfoComponent memberInfo={memberInfo} historyList={historyList} />}
      </View>
      <Tag hidden={hidden} onClick={showSideBar}>
        <FontAwesomeIcon style={{ width: "50px", height: "30px" }} icon={faChevronLeft} />
      </Tag>
    </>
  );
};

export default SideBar;
