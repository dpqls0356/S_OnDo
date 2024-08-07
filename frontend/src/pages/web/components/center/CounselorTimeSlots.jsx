import styled from "styled-components";

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 오타 수정
  & > p {
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Test = styled.div``;

const CustomBtn = styled.div`
  background-color: ${(props) => (props.selected ? 'pink' : 'white')};
`;

const Btn = styled.div`
  & > div > button {
    // 필요시 버튼 스타일 추가
  }
  // & > div > button:focus {
  //   background-color: #FF9F9F;
  //   color: white;
  //   border: 1px #FF9F9F solid;
  // }
`;

const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const morningTimes = ['9:00', '10:00', '11:00'];
const afternoonTimes = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const CounselorTimeSlots = ({ selectedDate, selectedTime, setSelectedTime }) => {
  // selectedDate이용하여 조회하는 기능 만들어야 함

  const handleTimeClick = (time) => {
    if (selectedTime.includes(time)) {
      setSelectedTime(selectedTime.filter(t => t !== time));
    } else {
      setSelectedTime([...selectedTime, time]);
    }
  };

  const selectAllTimes = (timesToSelect) => {
    const allSelected = timesToSelect.every(time => selectedTime.includes(time));
    if (allSelected) {
      setSelectedTime(selectedTime.filter(time => !timesToSelect.includes(time)));
    } else {
      const newSelectedTimes = [...new Set([...selectedTime, ...timesToSelect])];
      setSelectedTime(newSelectedTimes);
    }
  };

  const selectAllMorning = () => {
    selectAllTimes(morningTimes);
  };

  const selectAllAfternoon = () => {
    selectAllTimes(afternoonTimes);
  };

  const renderTimeButton = (time) => (
    <button 
      key={time} 
      className={`py-2 ${selectedTime.includes(time) ? 'bg-blue-500 text-white' : 'bg-white'} rounded`}
      onClick={() => handleTimeClick(time)}
    >
      {time}
    </button>
  );

  return (
    <div className="mt-4 no-outline">
      <Tab>
        <h3 className="font-bold mb-2">오전</h3>
        <p onClick={selectAllMorning}>전체선택</p>
      </Tab>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {morningTimes.map(renderTimeButton)}
      </div>
      <Tab>
        <h3 className="font-bold mb-2">오후</h3>
        <p onClick={selectAllAfternoon}>전체선택</p>
      </Tab>
      <Btn>
        <Test className="grid grid-cols-3 gap-2">
          {afternoonTimes.map(renderTimeButton)}
        </Test>
      </Btn>
    </div>
  );
};

export default CounselorTimeSlots;
