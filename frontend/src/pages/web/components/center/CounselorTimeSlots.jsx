import styled from "styled-components";

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  // align-item: center;
  & > p{
    font-size: 14px;
    text-decoration: underline; 
    cursor: pointer;
  }
`

const Btn = styled.div`
  // & > div > button{
  //   // color: #FF9F9F;
  // }
  // & > div > button:focus {
  //   background-color: #FF9F9F;
  //   color: white;
  //   border: 1px #FF9F9F solid;
  // }
`

const CounselorTimeSlots = ({ selectedTime, setSelectedTime }) => {
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const renderTimeButton = (time) => (
    <button 
      key={time} 
      className={`py-2 ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-white'} rounded`}
      onClick={() => handleTimeClick(time)}
    >
      {time}
    </button>
  );

  return (
    <div className="mt-4 no-outline">
      <Tab>
        <h3 className="font-bold mb-2">오전</h3>
        <p>전체선택</p>
      </Tab>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['9:00', '10:00', '11:00'].map(renderTimeButton)}
      </div>
      <Tab>
        <h3 className="font-bold mb-2">오후</h3>
        <p>전체선택</p>
      </Tab>
      <Btn>
        <div className="grid grid-cols-3 gap-2">
          {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(renderTimeButton)}
        </div>
      </Btn>
    </div>
  );
};

  export default CounselorTimeSlots;