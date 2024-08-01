import { useState } from 'react'
import Button from '../../../components/app/Button'
import ProfileCard from "../../../components/app/CounselorProfileCard";
import Calendar from '../../../components/app/Calendar'
import TimeSlots from '../../../components/app/TimeSlots'
import NoteInput from '../../../components/app/NoteInput'
import Footer from '../../../components/app/Footer'
import BorderImg from '../../../assets/images/구분선.png'

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
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-grow overflow-auto">
          <div className="bg-[#a8e6cf] rounded-2xl p-4 mb-4">
            <ProfileCard />
            <h1 className="text-2xl font-bold mb-4">예약일지</h1>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
          <img src={BorderImg} alt="" className="w-full" />
          <div className="p-4">
            <NoteInput note={note} setNote={setNote} />
            <Button text="예약 확정하기" onClick={handleReservation} />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Reservation;