// counselorHome.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
const View = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
`;
const CreateCounselingRoomBtn = styled.button`
  background-color: #f7867a;
`;

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

function ReservationSpot() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState("SessionA");

  const createCounselingRoom = async () => {
    try {
      // 세션 생성
      const sessionResponse = await axios.post(
        `${APPLICATION_SERVER_URL}api/sessions`,
        { customSessionId: sessionId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSessionId(sessionResponse.data);

      // /counselor/counselingroom로 이동하면서 세션 ID 전달
      navigate("counselingroom", { state: { sessionId } });
    } catch (error) {
      console.error("Error creating counseling room:", error);
    }
  };

  return (
    <View>
      <CreateCounselingRoomBtn onClick={createCounselingRoom}>
        상담방 생성하기
      </CreateCounselingRoomBtn>
    </View>
  );
}

export default ReservationSpot;
