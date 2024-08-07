import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCounselorStore from '../../../store/app/useCounselorStore';
import CLCard from '../../../components/app/Counselor/CLCard';
import Button2 from '../../../components/app/Button2';
import Calendar from '../../../components/app/Calendar';
import TimeSlots from '../../../components/app/TimeSlots';
import BorderImg from '../../../assets/images/구분선.png';
import back from '../../../assets/images/back.png';

const Reservation = () => {
  const { counselorId } = useParams();
  const nav = useNavigate();
  const { selectedCounselor, fetchCounselorSchedule, makeReservation, counselorSchedule, loading, error } = useCounselorStore();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (counselorId) {
      fetchCounselorSchedule(counselorId);
    }
  }, [fetchCounselorSchedule, counselorId]);

  const handleReservation = async () => {
    if (!counselorId) {
      alert('상담사 ID가 유효하지 않습니다.');
      return;
    }

    if (selectedDate && selectedTime) {
      const reservationDate = new Date(selectedDate);
      reservationDate.setHours(selectedTime.split(':')[0]);
      reservationDate.setMinutes(selectedTime.split(':')[1]);
      
      const result = await makeReservation(counselorId, reservationDate, note);
      if (result.success) {
        alert(result.message);
        nav('/member/counseling/main');
      } else {
        alert('예약 실패: ' + result.message);
      }
    } else {
      alert('날짜와 시간을 선택해주세요.');
    }
  };

  const onClickBack = () => {
    nav('/member/counseling/main');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className='scroll'>
        <div className="flex-grow">
          <div className="bg-[#6ABFB4] rounded-2xl p-4 mb-4" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
            <img onClick={onClickBack} style={{cursor: 'pointer', padding: '10px 0px'}} src={back} alt="Back" />
            {selectedCounselor && (
              <CLCard
                name={selectedCounselor.name}
                gender={selectedCounselor.gender}
                field={selectedCounselor.field}
                intro={selectedCounselor.intro}
                reservId={counselorId}
              />
            )}
            <br />
            <h1 className="text-2xl font-bold mb-4">예약일지</h1>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} availableTimes={counselorSchedule} />
          </div>
          <img src={BorderImg} alt="" className="w-full" />
          <div className="p-4">
            <textarea 
              onChange={(e) => setNote(e.target.value)} 
              style={{
                width: '100%', 
                border: '1px black solid', 
                borderRadius: '10px', 
                height: '80px', 
                padding: '5px 10px', 
                resize: 'none'
              }} 
              placeholder='힘든 점이나 고민점 혹은 하고싶은 말을 자유롭게 적어보세요.
(ex. 은둔기간: 2024.05~
      요즘 잠이 안 와요...'
            ></textarea>
            <br />
            <br />
            <Button2 text="예약 확정하기" onClick={handleReservation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;