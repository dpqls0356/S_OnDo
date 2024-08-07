import styled from "styled-components";
import { useState } from "react";
import CounselorCalendar from "./CounselorCalendar";
import CounselorTimeSlots from "./CounselorTimeSlots";
import axios from "axios";

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

const Save = styled.div`
  display: inline-block;
  & > button {
    float: right;
    width: 120px;
    color: white;
    background-color: #121481;
    border-radius: 30px;
  }
`;

const Option = styled.div``;

const DetailSchedulComponent = () => {
  const todayDate = new Date();
  const customTodayDate = todayDate.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜만 저장(ex: 2024-08-07이면 selectedDate === 7)
  const [selectedDate2, setSelectedDate2] = useState(customTodayDate); // 선택된 날짜의 년-월-일
  const [selectedTime, setSelectedTime] = useState([]);

  const handleSaveClick = async () => {
    console.log(selectedDate2);
    console.log(selectedTime);

    const scheduleList = [];
    selectedTime.forEach((time) => {
      // Combine selectedDate2 and time into a Date object and convert to UTC
      const [hours, minutes] = time.split(':');
      const localDateTime = new Date(selectedDate2);
      localDateTime.setHours(hours);
      localDateTime.setMinutes(minutes);
      scheduleList.push(localDateTime.toISOString().replace('.000Z', '')); // Remove milliseconds and Z
    });

    const date = selectedDate2.replace(/-/g, '');
    console.log('date 확인용', date);

    try {
      const response = await axios.post(`${baseUrl}/counselor/schedule/${date}`,
        { schedule: scheduleList }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      );
      if (response.status === 200) {
        console.log('일정 등록 성공');
        console.log('서버 응답:', response.data);
      }
    } catch (err) {
      console.error('에러 발생:', err);
    }
  };

  return (
    <View>
      <Option>
        <Calen>
          <CounselorCalendar 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            setSelectedDate2={setSelectedDate2} 
            setSelectedTime={setSelectedTime} 
          />
        </Calen>
        <CounselorTimeSlots 
          selectedDate={selectedDate} 
          selectedTime={selectedTime} 
          setSelectedTime={setSelectedTime} 
        />
      </Option>
      <Save>
        <button onClick={handleSaveClick}>저장</button>
      </Save>
    </View>
  );
};

export default DetailSchedulComponent;
