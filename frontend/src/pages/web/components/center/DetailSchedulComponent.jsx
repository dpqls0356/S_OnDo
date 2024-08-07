import styled from "styled-components";
import { useState } from "react";

// import Calendar from "../../../../components/app/Calendar";
// import TimeSlots from "../../../../components/app/TimeSlots";
import CounselorCalendar from "./CounselorCalendar";
import CounselorTimeSlots from "./CounselorTimeSlots";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const View = styled.div`
  // padding: 15px 20px;
  margin: 0 auto;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px
`;

const Calen = styled.div`
  border: 1px black solid;
  padding: 10px;
  border-radius: 20px;
`
const Save = styled.div`
  display: inline-block;
  & > button {
    float: right;
    width: 120px;
    // height: 100px
    color: white;
    background-color: #121481;
    border-radius: 30px;
    }
  }
`
const Option = styled.div`

`

const DetailSchedulComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜만 저장(ex: 2024-08-07이면 selectedDate === 7)
  const [selectedDate2, setSelectedDate2] = useState(null); // 선택된 날짜의 년-월-일
  // const selectedTime = null
  
  const [selectedTime, setSelectedTime] = useState([]);

  const handleSaveClick = async () => {
    console.log(selectedDate2)
    console.log(selectedTime)

    const scheduleList = []
    selectedTime.forEach((time) => {
      // console.log('확인용', time)
      const Date = selectedDate2 + 'T' + time
      // console.log(Date)
      scheduleList.push(Date)
      // console.log(scheduleList)
    })
    const date = selectedDate2.substr(0, 4) + selectedDate2.substr(5, 7) + selectedDate2.substr(8, 10)
    console.log('date 확인용',date)

    try {
      const response = await axios.put(`${baseUrl}/counselor/schedule/${date}`,
        { schedule: scheduleList }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      );
      if (response.status === 201) {
        console.log('일정 등록 성공')
        console.log('서버 응답:', response.data)
      }
    } catch (err) {
      console.error('에러 발생:', err)
    }
  }

  return(
    <View>
      <Option>
        <Calen>
          <CounselorCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedDate2={setSelectedDate2} setSelectedTime={setSelectedTime} />
        </Calen>
        {/* <CounselorTimeSlots selectedTime={selectedTime} /> */}
        <CounselorTimeSlots selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </Option>
      <Save>
        <button onClick={handleSaveClick}>저장</button>
      </Save>
    </View>
  )
};

export default DetailSchedulComponent;