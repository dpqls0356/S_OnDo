import React from 'react';
import styled from "styled-components"

const Button = styled.div`
  text-align: center;
   padding: 0.5rem; /* py-2와 동일한 패딩 */
  border-radius: 0.375rem; /* rounded 클래스에 해당하는 border-radius */
   background-color: ${({ selected }) => (selected ? '#4c8478' : '#FFFFFF')}; /* bg-blue-500 : bg-white */
  color: ${({ selected }) => (selected ? '#ffffff' : 'inherit')}; /* text-white : 기본 텍스트 색상 */

`
const TimeSlots = ({ selectedTime, setSelectedTime }) => {
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const renderTimeButton = (time) => (
    <Button 
      key={time} 
         selected={selectedTime === time}
      onClick={() => handleTimeClick(time)}
    >
      {time}
    </Button>
  );

  return (
    <div className="mt-4 no-outline">
      <h3 className="font-bold mb-2">오전</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['09:00', '10:00', '11:00'].map(renderTimeButton)}
      </div>
      <h3 className="font-bold mb-2">오후</h3>
      <div className="grid grid-cols-3 gap-2">
        {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(renderTimeButton)}
      </div>
    </div>
  );
};

export default TimeSlots;