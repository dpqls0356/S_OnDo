// import 해야 함
import { useState } from 'react'
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
      <div className="bg-[#a8e6cf] min-h-screen pb-16">
        <div className="p-4">
          <ProfileCard />
          <h2 className="text-lg font-bold mt-4 mb-2">예약일지</h2>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          <NoteInput note={note} setNote={setNote} />
          <button 
            className="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold mt-4"
            onClick={handleReservation}
          >
            예약 확정하기 
          </button>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Reservation;