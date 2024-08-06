import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Reservation from "./reservation";

const View = styled.div`
  padding: 50px 50px;
  width: 45%;
  height: 100%;
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
  }
  & > button {
    width: 80px;
    color: white;
    background-color: #121481;
  }
`;

const ReservationList = styled.div``;

const baseUrl = import.meta.env.VITE_BASE_URL;

function ReservationSpot() {
  const [reservationList, setReservationList] = useState([]);
  const [page, setPage] = useState(0);
  const size = 10;

  const getReservationList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/counselor/reservation?page=${page}&size=${size}`,
        { withCredentials: true }
      );
      setReservationList(response.data.data.reservations);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
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
        <input type="text" />
        <button>검색</button>
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
