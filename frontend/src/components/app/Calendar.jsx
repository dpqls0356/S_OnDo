const Calendar = ({ selectedDate, setSelectedDate }) => {
    const handleDateClick = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center text-red-400 mb-2">
          <button>&lt;</button>
          <span>2022년 2월</span>
          <button>&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['월', '화', '수', '목', '금', '토', '일'].map(day => (
            <div key={day} className="text-gray-400">{day}</div>
          ))}
          {Array.from({ length: 28 }, (_, i) => i + 1).map(date => (
            <div 
              key={date} 
              className={`cursor-pointer ${date === selectedDate ? 'bg-red-100 rounded-full' : ''} ${[5, 6, 12, 13, 19, 20, 26, 27].includes(date) ? 'text-red-400' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Calendar