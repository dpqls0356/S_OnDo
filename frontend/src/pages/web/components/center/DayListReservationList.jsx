import { useState } from 'react';
import styled from "styled-components"

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

// 상담내역(DayListComponent.jsx) 하단 
const DayListReservationList = () => {
  const [reservationList, setReservationList] = useState([]);

  // const getReservationList = await axios.get()

  return(
    <ReservationList>
    {reservationList.length > 0 ? (
      reservationList.map((reservation, index) => (
        <Reservation key={index} reservation={reservation} />
      ))
    ) : (
      <div>예약된 상담 일정이 없습니다.</div>
    )}
  </ReservationList>
  )
}

export default DayListReservationList;