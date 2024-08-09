import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';
import CounselorCard from '../../../components/app/Counselor/CounselorCard';
import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';
import './CounselorMain.css';

const CounselorMain = () => {
  const { userReservations, counselors, fetchUserReservations, fetchCounselors, displayGender, calculateDday } = useCounselorStore();
  const [filteredCounselors, setFilteredCounselors] = useState([]);

  useEffect(() => {
    fetchUserReservations();
    fetchCounselors();
  }, [fetchUserReservations, fetchCounselors]);

  const sortedReservations = useMemo(() => {
    return [...userReservations].sort((a, b) => {
      const ddayA = calculateDday(a.reservationDate);
      const ddayB = calculateDday(b.reservationDate);
      if (ddayA === 'D-day') return -1;
      if (ddayB === 'D-day') return 1;
      if (ddayA === '상담완료' && ddayB !== '상담완료') return 1;
      if (ddayB === '상담완료' && ddayA !== '상담완료') return -1;
      return parseInt(ddayA.slice(2)) - parseInt(ddayB.slice(2));
    });
  }, [userReservations, calculateDday]);

  const handleFilteredCounselorsChange = (newFilteredCounselors) => {
    setFilteredCounselors(newFilteredCounselors);
  };

  return (
    <div className="scroll">
      <div className='CounselorMain'>
        <div className="CounselorCardBack">
          <div className='MP-RCard'>
            <CounselorCard
              reservations={sortedReservations}
              counselors={counselors}
              onFilteredCounselorsChange={handleFilteredCounselorsChange}
            />
          </div>
        </div>
        <div className='MP-CounselorList'>
          {filteredCounselors.length > 0 ? (
            filteredCounselors.map(counselor => (
              <Link key={counselor.id} to={`/member/counseling/reserve/${counselor.id}`} style={{textDecoration: "none", color: 'black'}}>
                <CounselorListCard
                  name={counselor.name}
                  gender={displayGender(counselor.gender)}
                  field={counselor.field}
                  intro={counselor.intro}
                />
              </Link>
            ))
          ) : (
            <div className="no-counselors-message">검색 조건에 맞는 상담사가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounselorMain;