import { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const CounselorCalendar = ({ selectedDate, setSelectedDate, setSelectedDate2, selectedTime, setSelectedTime, setSaveTimeState }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜(초기값은 오늘로)
  const [dayScheduleList, setDayScheduleList] = useState([]);

  useEffect(() => {
    setSelectedDate(currentDate.getDate());
  }, []);

  // 날짜별 일정 조회(불러오기)
  const handleDateClick = async (date) => {
    setSaveTimeState([])
    setSelectedDate(date); // 선택한 날짜 selectDate에 저장
    setSelectedTime([]); // 선택한 날짜에 대한 선택한 시간 리스트 초기화
    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    // Local time to UTC
    const formattedDate = new Date(Date.UTC(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate()));
    const inputdate = formattedDate.toISOString().split('T')[0].replace(/-/g, '');
    console.log('url 확인용:', inputdate);
    setSelectedDate2(formattedDate.toISOString().split('T')[0]); // Update setSelectedDate2 with UTC date
    try {
      const response = await axios.get(`${baseUrl}/counselor/schedule/${inputdate}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Convert received schedule dates from UTC to local time
      const scheduleInLocalTime = response.data.data.schedule.map(time => {
        const utcTime = new Date(time + 'Z'); // 'Z'를 추가하여 UTC임을 명시
  const localTime = new Date(utcTime.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const hours = String(localTime.getHours()).padStart(2, '0');
  const minutes = String(localTime.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
      });
      // setDayScheduleList(scheduleInLocalTime);
      // console.log('dayScheduleList', dayScheduleList)
      if (response.status === 200) {
        console.log('상세 일정 조회 성공')
        console.log(scheduleInLocalTime)
        // setSaveTimeState(scheduleInLocalTime) // response.data.data.schedule에 있는 시간대(UTC 기준)를 Asia/Seoul기준으로 바꾼 후 saveTime state에 저장
        setSelectedTime(scheduleInLocalTime)
        console.log('selectedDate 채워졌는지 확인용(자식):', selectedTime)
        // console.log('서버 응답:', response.data)
      }

    } catch (err) {
      console.error("에러 발생:", err)
    }
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
        {/* 캘린더 상단 버튼 및 년/월 */}
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

export default CounselorCalendar;
