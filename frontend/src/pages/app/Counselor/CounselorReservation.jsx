import { useState } from 'react'
import Button from '../../../components/app/Button'
import ProfileCard from "./../../../components/app/ProfileCard";
import Calendar from '../../../components/app/Calendar'
import TimeSlots from '../../../components/app/TimeSlots'
import NoteInput from '../../../components/app/NoteInput'
import Footer from '../../../components/app/Footer'

const Reservation = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [note, setNote] = useState('');
  
    const handleReservation = () => {
      if (selectedDate && selectedTime) {
        alert(`예약이 확정되었습니다.\n날짜: ${selectedDate}\n시간: ${selectedTime}\n메모: ${note}`);
      } else {
        alert('날짜와 시간을 선택해주세요.');
      }
    };
  
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-[#a8e6cf] rounded-2xl flex-grow pb-16 p-4">
          <ProfileCard />
          <h2 className="text-lg font-bold mt-4 mb-2">예약일지</h2>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </div>
        <img src="src/assets/images/구분선.png" alt="" />
        <div className="bg-white">
          <NoteInput note={note} setNote={setNote} />
          <Button text="예약 확정하기" onClick={handleReservation} />
          <Footer />
        </div>
      </div>
    );
  };
  
  export default Reservation;