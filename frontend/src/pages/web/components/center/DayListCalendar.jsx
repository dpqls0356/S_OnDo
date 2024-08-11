import { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const DayListCalendar = ({ selectedDate, setSelectedDate, setSelectedDate2 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayScheduleList, setDayScheduleList] = useState([]);

  useEffect(() => {
    setSelectedDate(currentDate.getDate());
  }, []);

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    console.log('선택된 날짜 확인용', selectedDate)
    // setSelectedTime([]);
    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    // Local time to UTC
    const formattedDate = new Date(Date.UTC(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate()));
    const inputdate = formattedDate.toISOString().split('T')[0].replace(/-/g, '');
    console.log('url 확인용:', inputdate);
    setSelectedDate2(inputdate)
    // setSelectedDate2(formattedDate.toISOString().split('T')[0]); // Update setSelectedDate2 with UTC date
    console.log('selectedDate2 확인용:', formattedDate.toISOString().split('T')[0])
  //   try {
  //     const response = await axios.get(`${baseUrl}/counselor/schedule/${inputdate}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     // Convert received schedule dates from UTC to local time
  //     const scheduleInLocalTime = response.data.data.schedule.map(time => {
  //       const localTime = new Date(time);
  //       const hours = String(localTime.getHours()).padStart(2, '0');
  //       const minutes = String(localTime.getMinutes()).padStart(2, '0');
  //       return `${hours}:${minutes}`;
  //     });
  //     setDayScheduleList(scheduleInLocalTime);
  //     console.log(dayScheduleList)
  //     if (response.status === 200) {
  //       console.log('상세 일정 조회 성공')
  //       console.log('서버 응답:', response.data)
  //     }

  //   } catch (err) {
  //     console.error("에러 발생:", err)
  //   }
  };

  const handleMonthChange = (increment) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getMonthStart = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center text-gray-600 mb-2">
          <button 
            onClick={() => handleMonthChange(-1)} 
            className="text-sm p-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            &lt;
          </button>
          <span className="text-xl font-semibold">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button 
            onClick={() => handleMonthChange(1)} 
            className="text-sm p-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <div key={day} className="text-gray-700 font-semibold">{day}</div>
          ))}
          {Array.from({ length: getMonthStart(currentDate) }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1).map(date => (
            <div 
              key={date} 
              className={`cursor-pointer ${
                date === selectedDate ? 'bg-blue-100 rounded-full' : ''
              } ${
                [0, 6].includes(new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getDay()) ? 'text-red-500' : ''
              }`}
              onClick={() => handleDateClick(date)}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DayListCalendar;
