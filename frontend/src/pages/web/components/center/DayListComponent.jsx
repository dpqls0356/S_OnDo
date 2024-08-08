import { useState } from 'react';
import styled from "styled-components";
import DetailSchedulComponent from "./DetailSchedulComponent";
import CounselorCalendar from "./CounselorCalendar";
import DayListReservationList from './DayListReservationList';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const View = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Calen = styled.div`
  border: 1px black solid;
  padding: 10px;
  border-radius: 20px;
`;
const Content = styled.div`
  // display: flex;
  // padding: 0px 45px;
  // width: 100%;
  // margin: 0 auto;
`



// const Save = styled.div`
//   display: inline-block;
//   & > button {
//     float: right;
//     width: 120px;
//     color: white;
//     background-color: #121481;
//     border-radius: 30px;
//   }
// `;

const DayList = () => {

  
  const todayDate = new Date();
  const customTodayDate = todayDate.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜만 저장(ex: 2024-08-07이면 selectedDate === 7)
  const [selectedDate2, setSelectedDate2] = useState(customTodayDate); // 선택된 날짜의 년-월-일
  const [selectedTime, setSelectedTime] = useState([]);
  return(
    <View>
      <Content>
        <Calen>
          <CounselorCalendar 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
                setSelectedDate2={setSelectedDate2} 
                setSelectedTime={setSelectedTime} 
              />
        </Calen>
        <br />
        <DayListReservationList />
      </Content>
    </View>
  )
}

export default DayList;