import { useEffect, useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";

const View = styled.div`
  padding: 0px 20px 0px 20px;
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;

const UserProfile = styled.div`
  padding: 30px 5px;
  display: flex;
`;

const Col = styled.div`
  &:nth-child(1) {
    width: 20%;
    height: 100%;
    & > div {
      width: 100%;
      height: 100%;
    }
  }
  &:nth-child(2) {
    margin-left: 20px;
    & > div:nth-child(1) {
      font-size: 30px;
      font-weight: 800;
    }
  }
`;

const History = styled.div`
  flex: 1;
  background-color: white;
  padding: 0px 30px 10px 30px;
  border-radius: 10px;
  border: 2px solid black;
  overflow-y: scroll;
  div:last-child {
    border: none;
  }
  /* Hide scrollbar for WebKit-based browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none; /* Firefox */

  /* Optional: Hide scrollbar for IE, Edge */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
`;

const CounselingMemo = styled.div`
  border-bottom: 2px solid black;
  padding: 20px 0px;
  & > p:nth-child(1) {
    font-size: 20px;
    font-weight: 800;
  }
  & > p:nth-child(2) {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .memo {
    background-color: #fae6e6;
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    textarea {
      width: 100%;
      background-color: inherit;
    }
    & > div:nth-child(2) {
      display: flex;
      justify-content: flex-end;
      button {
        height: fit-content;
        width: fit-content;
        color: gray;
        font-size: 15px;
        background-color: inherit;
        padding: 0px;
      }
    }
  }
`;
const baseUrl = import.meta.env.VITE_BASE_URL;

const HomeUserInfoComponent = () => {
  const [memberInfo, setMemberInfo] = useState({});
  const [historyList, setHistoryList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const location = useLocation();
  const memberId = location.state.memberId;
  const size = 10;

  useEffect(() => {
    getMemberInfo();
    getReservationHistory();
  }, [memberId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // '2024-08-13' 형식으로 변환
  };

  const getMemberInfo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/counselor/getMember?memberId=${memberId}`,
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
        gender: data.gender === "MALE" ? "남성" : "여성",
        memberId: data.memberId,
        memberName: data.memberName,
      });
    } catch (e) {
      console.log("Error fetching member info:", e);
    }
  };

  const getReservationHistory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/counselor/memberReservation?memberId=${memberId}&page=${page}&size=${size}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newHistories = response.data.data.reservations;
      setHistoryList((prev) => [...prev, ...newHistories]);
      if (newHistories.length < size) {
        setHasMore(false); // 더 이상 로드할 데이터가 없을 때
      }
    } catch (e) {
      console.log(e);
    }
  };

  const lastHistoryElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    if (page !== 0) {
      getReservationHistory();
    }
  }, [page]);

  return (
    <View>
      <UserProfile>
        <Col>
          {false ? (
            <div>
              <img src="" alt="Profile" />
            </div>
          ) : (
            <div
              style={{
                padding: "20px 10px",
                border: "2px solid black",
                backgroundColor: "white",
              }}
            >
              <FontAwesomeIcon
                style={{ width: "100%", height: "100%" }}
                icon={faUser}
              />
            </div>
          )}
        </Col>
        <Col>
          <div>{memberInfo.memberName}</div>
          <div>
            <div>생년월일: {memberInfo.birthDate}</div>
            <div>성별: {memberInfo.gender}</div>
          </div>
        </Col>
      </UserProfile>
      <History>
        {historyList.map((history, index) => {
          if (historyList.length === index + 1) {
            return (
              <CounselingMemo key={index} ref={lastHistoryElementRef}>
                <p>{formatDate(history.reservationDate)}</p>
                <p>{history.counselingReservationDetail}</p>
                <div className="memo">
                  <div>
                    <textarea>{history.counsellingDetail}</textarea>
                  </div>
                  <div>
                    <button>수정</button>
                  </div>
                </div>
              </CounselingMemo>
            );
          } else {
            return (
              <CounselingMemo key={index}>
                <p>{formatDate(history.reservationDate)}</p>
                <p>{history.counselingReservationDetail}</p>
                <div className="memo">
                  <div>
                    <textarea>{history.counsellingDetail}</textarea>
                  </div>
                  <div>
                    <button>수정</button>
                  </div>
                </div>
              </CounselingMemo>
            );
          }
        })}
      </History>
    </View>
  );
};

export default HomeUserInfoComponent;
