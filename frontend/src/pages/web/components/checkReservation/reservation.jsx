import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const View = styled.div`
  padding: 20px 20px;
  width: 90%;
  height: 25%;
  display: flex;
  align-items: center;
  background-color: white;
  border: 3px solid #f7867a;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  ${(props) =>
    props.past &&
    `
      border-color: gray;
    `}
`;

const Col = styled.div`
  & > .member-info {
    font-weight: 800;
    font-size: 20px;
  }
  &:nth-child(2) {
    flex: 2;
    & > div:nth-child(2) {
      color: gray;
      margin-top: 5px;
    }
  }
  &:nth-child(3) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
`;

const CreateCounselingRoomBtn = styled.button`
  background-color: #f7867a;
  height: 50%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 20px;
`;

const MemberImg = styled.div`
  padding-right: 20px;
  & > svg,
  & > img {
    width: 50px;
    height: 50px;
  }
`;

const CancelReservationBtn = styled.button`
  background-color: #f7867a;
  position: absolute;
  color: white;
  width: 20px;
  height: 30px;
  left: 100%;
  bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const baseUrl = import.meta.env.VITE_BASE_URL;
const APPLICATION_SERVER_URL = process.env.NODE_ENV === "production" ? "" : baseUrl;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

function Reservation({ reservation }) {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState();
  const [reservationFormattedDate, setReservationFormattedDate] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const [age, setAge] = useState();

  const createCounselingRoom = async (event) => {
    event.stopPropagation();
    // if (timeRemaining === 0) {
      try {
        const sessionResponse = await axios.post(
          `${baseUrl}/counseling/sessions`,
          { reservationId: reservation.reservationId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // default를 true로 설정
          }
        );

      setSessionId(sessionResponse.data.data.session_id);
      navigate("/counselingroom", {
        state: {
          sessionId: sessionResponse.data.data.session_id,
          reservationId: reservation.reservationId,
          memberId: reservation.memberId,
        },
      });
    } catch (error) {
      console.error("Error creating counseling room:", error);
    }
    // } else return;
  };

  const changeDateFormat = () => {
    let date = new Date(reservation.reservationDate);

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    setReservationFormattedDate(formattedDate);
  };

  const handleCancelClick = () => {
    if (window.confirm("정말 예약을 취소하시겠습니까?")) {
      cancelRequest(reservation.reservationId);
    }
  };

  const cancelRequest = async (reservId) => {
    console.log(reservId);
    if (!reservId) {
      alert("예약 ID가 없습니다.");
      return;
    }

    try {
      const response = await api.delete(`/counselor/reservation`, {
        data: {
          reservationId: reservId,
        },
      });

      if (response.data.success) {
        alert("상담 예약이 취소되었습니다.");
        window.location.reload(); // 페이지 새로고침
      } else {
        alert("예약 취소에 실패했습니다.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "상담 예약 취소 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    changeDateFormat();
    calculateTimeRemaining();
    calculateAge(reservation.memberBirthday);
  }, []);

  const calculateTimeRemaining = () => {
    let today = new Date();
    let reservationDate = new Date(reservation.reservationDate);
    let timeDifference = reservationDate - today;
    let hoursDifference = timeDifference / (1000 * 60 * 60);
    let minutesDifference = timeDifference / (1000 * 60);

    if (timeDifference <= 0) {
      setTimeRemaining(-1); // 예약 시간이 이미 지난 경우
    } else if (minutesDifference <= 60) {
      setTimeRemaining(0); // 예약 시간으로부터 1시간 이내인 경우
    } else {
      setTimeRemaining(Math.ceil(hoursDifference / 24)); // 일 단위로 남은 시간을 계산
    }
  };

  const calculateAge = (memberBirthday) => {
    const today = new Date();
    const birthDate = new Date(memberBirthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };
  const ViewMemberInfo = () => {
    navigate("/counselor/info/member", {
      state: {
        memberId: reservation.memberId,
      },
    });
  };

  return (
    <View onClick={ViewMemberInfo} past={timeRemaining < 0}>
      <Col>
        {false ? (
          <MemberImg></MemberImg>
        ) : (
          <MemberImg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </MemberImg>
        )}
      </Col>
      <Col>
        <div className="member-info">
          {reservation.memberName}(만 {age}세)
        </div>
        <div>상담일: {reservationFormattedDate}</div>
      </Col>
      <Col>
        <CreateCounselingRoomBtn onClick={createCounselingRoom}>입장</CreateCounselingRoomBtn>
        {/* {timeRemaining >= 0 ? (
          <CreateCounselingRoomBtn onClick={createCounselingRoom}>
            {timeRemaining > 1
              ? `D-${Math.floor(timeRemaining)}`
              : timeRemaining === 0
                ? `입장`
                : `D-day`}
          </CreateCounselingRoomBtn>
        ) : null} */}
      </Col>
      {timeRemaining > 0 ? (
        <CancelReservationBtn onClick={handleCancelClick}>
          <FontAwesomeIcon icon={faX} />
        </CancelReservationBtn>
      ) : null}
    </View>
  );
}

export default Reservation;
