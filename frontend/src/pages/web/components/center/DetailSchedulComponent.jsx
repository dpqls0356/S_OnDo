import styled from "styled-components";
import { useState } from "react";

import Calendar from "../../../../components/app/Calendar";
import TimeSlots from "../../../../components/app/TimeSlots";

const View = styled.div`
  // padding: 70px 50px;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Calen = styled.div`
  border: 1px black solid;
  padding: 10px;
  border-radius: 20px;
`
const Save = styled.div`
  & > button {
    width: 120px;
    // height: 100px
    color: white;
    background-color: #121481;
    border-radius: 30px
  }
`

const DetailSchedulComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return(
    <View>
      <Calen>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Calen>
      <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      <Save>
        <button>저장</button>
      </Save>
    </View>
  )
};

export default DetailSchedulComponent;