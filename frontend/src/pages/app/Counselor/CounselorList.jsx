import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';
import CLCard from '../../../components/app/Counselor/CLCard';
import back from './../../../assets/images/back.png';
import sort from './../../../assets/images/Shape.png';
import './CounselorList.css';

const CounselorList = () => {
  const nav = useNavigate();
  const { reservations, fetchReservations } = useCounselorStore();

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const onClickBack = () => {
    nav('/member/counseling/main');
  };

  const onClickSort = () => {
    console.log('날짜순 정렬 기능 추가해야 함');
  };

  return (
    <div className='scroll'>
      <div className='CL-header'>
        <img onClick={onClickBack} style={{cursor: "pointer"}} src={back} alt="Back" />
        <p>상담예약내역</p>
        <img onClick={onClickSort} style={{cursor: "pointer"}} src={sort} alt="Sort" />
      </div>
      <div className='CL-main'>
        <div className='CS-List'>
          {reservations.map(reservation => (
            <CLCard
              key={reservation.id}
              name={reservation.counselorName}
              gender={reservation.counselorGender}
              field={reservation.counselorField}
              intro={reservation.counselorIntro}
              dday={reservation.dday}
              is_complete={reservation.is_complete}
            />
          ))}
        </div>
      </div>
      <div id='CL-empty'></div>
    </div>
  );
};

export default CounselorList;