import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Reservation from "./reservation";

const View = styled.div`
  padding: 50px 50px;
  width: 45%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Search = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 3px solid black;
  & > input {
    flex: 1;
    margin-right: 30px;
    padding: 0px 20px;
  }
  & > button {
    width: 80px;
    color: white;
    background-color: #121481;
  }
`;

const ReservationList = styled.div`
  height: 90%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const baseUrl = import.meta.env.VITE_BASE_URL;

function ReservationSpot() {
  const [reservationList, setReservationList] = useState([]);
  const [page, setPage] = useState(0);
  const size = 10;
  const [searchWord, setSearchWord] = useState("");

  const getReservationList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/counselor/reservation?page=${page}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      );
      setReservationList(response.data.data.reservations);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };
  const searchByName = async () => {
    setPage(0);
    if (searchWord === "") {
      getReservationList();
    } else {
      try {
        const response = await axios.get(
          `${baseUrl}/counselor/reservation/search/${encodeURIComponent(searchWord)}?page=${page}&size=${size}`,
          {
            withCredentials: true, // 쿠키를 포함
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setReservationList(response.data.data.reservations);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getReservationList();
    };
    fetchData();
  }, [page]);

  return (
    <View>
      <Header>전체 상담 관리</Header>
      <Search>
        <input onChange={handleInputChange} type="text" value={searchWord} />
        <button onClick={searchByName}>검색</button>
      </Search>
      <ReservationList>
        {reservationList.length > 0 ? (
          reservationList.map((reservation, index) => (
            <Reservation key={index} reservation={reservation} />
          ))
        ) : (
          <div>예약된 상담 일정이 없습니다.</div>
        )}
      </ReservationList>
    </View>
  );
}

export default ReservationSpot;
