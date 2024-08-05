import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const View = styled.div`
  padding: 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  border: 3px solid #f7867a;
`;

const CreateCounselingRoomBtn = styled.button`
  background-color: #f7867a;
`;

const Col = styled.div`
  & > .member-info {
    font-weight: 800;
    font-size: 20px;
  }
  &:nth-child(2) {
    flex: 2;
  }
  &:nth-child(3) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MemberImg = styled.div`
  padding-right: 20px;
  & > svg,
  & > img {
    width: 50px;
    height: 50px;
  }
`;
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

function Reservation() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState("SessionA");

  const createCounselingRoom = async () => {
    console.log(APPLICATION_SERVER_URL);
    try {
      // 세션 생성
      const sessionResponse = await axios.post(
        `${APPLICATION_SERVER_URL}/api/v1/counseling/sessions`,
        { customSessionId: sessionId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // default를 true로 설정
        }
      );

      setSessionId(sessionResponse.data.data.session_id);
      console.log(sessionResponse);
      // /counselingroom으로 이동하면서 세션 ID 전달
      navigate("/counselingroom", {
        state: { sessionId: sessionResponse.data.data.session_id },
      });
    } catch (error) {
      console.error("Error creating counseling room:", error);
    }
  };

  return (
    <View>
      {/* 프로필 사진 유무에 따라 보여지는 게 달라짐 */}
      <Col>
        {false ? (
          <MemberImg></MemberImg>
        ) : (
          <MemberImg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </MemberImg>
        )}
      </Col>
      <Col>
        <div className="member-info">이싸피(만 30세)</div>
        <div>상담신청일자: 2024-08-01 10:00</div>
      </Col>
      <Col>
        <CreateCounselingRoomBtn onClick={createCounselingRoom}>
          입장
        </CreateCounselingRoomBtn>
      </Col>
    </View>
  );
}

export default Reservation;
