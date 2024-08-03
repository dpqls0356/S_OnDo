import { useState } from 'react'

import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';

import Button2 from '../../../components/app/Button2'
// import ProfileCard from "../../../components/app/CounselorProfileCard";
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
          <div className="bg-[#6ABFB4] rounded-2xl p-4 mb-4" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
            {/* <ProfileCard /> */}
            <CounselorListCard name={'김싸피'} gender={'남'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'}  reservId={1} />
            <br />
            <h1 className="text-2xl font-bold mb-4">예약일지</h1>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
          <img src={BorderImg} alt="" className="w-full" />
          <div className="p-4">
            <textarea onChange={(e) => setNote(e.target.value)} style={{width: '100%', border: '1px black solid', borderRadius: '10px', height: '80px', padding: '5px', resize: 'none'}}></textarea>
            {/* <NoteInput note={note} setNote={setNote} /> */}
            <br />
            <br />
            <Button2 text="예약 확정하기" onClick={handleReservation} />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Reservation;