import styled from "styled-components";
import { useState } from "react";

import Calendar from "../../../../components/app/Calendar";
import TimeSlots from "../../../../components/app/TimeSlots";

const View = styled.div`
  padding: 70px 50px;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DetailSchedulComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return(
    <View>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />

    </View>
  )
};

export default DetailSchedulComponent;