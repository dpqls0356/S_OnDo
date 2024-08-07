import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCounselorStore from '../../../store/app/useCounselorStore';
import CounselorCard from '../../../components/app/Counselor/CounselorCard';
import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';
import './CounselorMain.css';

const CounselorMain = () => {
  const { reservations, counselors, fetchReservations } = useCounselorStore();

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <div className="scroll">
      <div className='CounselorMain'>
        <div className="CounselorCardBack">
          <div className='MP-RCard'>
            {reservations.length > 0 && (
              <CounselorCard
                name={reservations[0].counselorName}
                gender={reservations[0].counselorGender}
                field={reservations[0].counselorField}
                intro={reservations[0].counselorIntro}
                dday={reservations[0].dday}
              />
            )}
          </div>
        </div>
        <div className='MP-CounselorList'>
          {counselors.map(counselor => (
            <Link key={counselor.id} to={`/member/counseling/apply/${counselor.id}`} style={{textDecoration: "none", color: 'black'}}>
              <CounselorListCard
                name={counselor.name}
                gender={counselor.gender}
                field={counselor.field}
                intro={counselor.intro}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounselorMain;