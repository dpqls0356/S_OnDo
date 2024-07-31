const TimeSlots = ({ selectedTime, setSelectedTime }) => {
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
      <h3 className="font-bold mb-2">오전</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['9:00', '10:00', '11:00'].map(renderTimeButton)}
      </div>
      <h3 className="font-bold mb-2">오후</h3>
      <div className="grid grid-cols-3 gap-2">
        {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(renderTimeButton)}
      </div>
    </div>
  );
};

  export default TimeSlots