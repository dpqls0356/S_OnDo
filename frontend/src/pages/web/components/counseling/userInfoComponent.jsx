import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";
const View = styled.div`
  padding: 0px 20px 10px 20px;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const UserProfile = styled.div`
  padding: 30px 0px;
  display: flex;
`;

const Col = styled.div`
  &:nth-child(1) {
    width: 30%;
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
  padding: 0px 30px 20px 30px;
  border-radius: 15px;
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

const UserInfoComponent = ({ memberInfo }) => {
  // const [memberInfo, setMemberInfo] = useState({});
  const [historyList, setHistoryList] = useState([]);

  // useEffect(() => {
  //   console.log("Fetching member info for ID:", memberId);
  //   getMemberInfo();
  // }, [memberId]);

  useEffect(()=>{
    setHistoryList([...memberInfo.reservations]);
  },[])
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // '2024-08-13' 형식으로 변환
  };

  // const getMemberInfo = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}/counselor/member?memberId=${memberId}`,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = response.data.data.member;
  //     setMemberInfo({
  //       birthDate: data.birthDate,
  //       gender: data.gender === "MALE" ? "남성" : "여성",
  //       memberId: data.memberId,
  //       memberName: data.memberName,
  //     });
  //     setHistoryList([...data.reservations]);
  //   } catch (e) {
  //     console.log("Error fetching member info:", e);
  //   }
  // };

  return (
    <View>
      <UserProfile>
        <Col>
          {/* 프로필 사진 여부따라서 */}
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
            {/* <div>은둔 기간: 2019.05 ~ </div> */}
          </div>
        </Col>
      </UserProfile>
      <History>
        {historyList.map((history, index) => (
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
        ))}
      </History>
    </View>
  );
};

export default UserInfoComponent;
