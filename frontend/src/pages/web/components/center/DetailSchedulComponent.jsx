import styled from "styled-components";
import { useState } from "react";

// import Calendar from "../../../../components/app/Calendar";
// import TimeSlots from "../../../../components/app/TimeSlots";
import CounselorCalendar from "./CounselorCalendar";
import CounselorTimeSlots from "./CounselorTimeSlots";

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
  const [selectedDate, setSelectedDate] = useState(null);
  // const selectedTime = null
  
  const [selectedTime, setSelectedTime] = useState(null);

  return(
    <View>
      <Option>
        <Calen>
          <CounselorCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </Calen>
        {/* <CounselorTimeSlots selectedTime={selectedTime} /> */}
        <CounselorTimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </Option>
      <Save>
        <button>저장</button>
      </Save>
    </View>
  )
};

export default DetailSchedulComponent;