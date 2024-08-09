import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';
import CLCard from '../../../components/app/Counselor/CLCard';
import back from './../../../assets/images/back.png';
import sort from './../../../assets/images/Shape.png';
import './CounselorList.css';

const CounselorList = () => {
  const nav = useNavigate();
  const { userReservations, fetchUserReservations, isLoading, displayGender } = useCounselorStore();
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    fetchUserReservations();
  }, [fetchUserReservations]);

  const sortedReservations = useMemo(() => {
    return [...userReservations].sort((a, b) => {
      const dateA = new Date(a.reservationDate);
      const dateB = new Date(b.reservationDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [userReservations, sortOrder]);

  const onClickBack = () => {
    nav('/member/counseling/main');
  };

  const onClickSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='scroll'>
      <div className='CL-header'>
        <img onClick={onClickBack} style={{cursor: "pointer"}} src={back} alt="Back" />
        <p>상담예약내역</p>
        <div onClick={onClickSort} style={{cursor: "pointer"}}>
          <img src={sort} alt="Sort" />
          <span>{sortOrder === 'asc' ? '오름차순' : '내림차순'}</span>
        </div>
      </div>
      <div className='CL-main'>
        {sortedReservations.length === 0 ? (
          <div className="no-reservations">예약된 상담이 없습니다.</div>
        ) : (
          <div className='CS-List'>
            {sortedReservations.map(reservation => (
              <CLCard
                key={reservation.id}
                name={reservation.counselor?.name}
                gender={reservation.counselor?.gender}
                field={reservation.counselor?.field}
                intro={reservation.counselor?.intro}
                dday={reservation.dday}
                is_complete={reservation.is_complete}
                reservationDate={reservation.reservationDate}
                id={reservation.id}
              />
            ))}
          </div>
        )}
      </div>
      <div id='CL-empty'></div>
    </div>
  );
};

export default CounselorList;