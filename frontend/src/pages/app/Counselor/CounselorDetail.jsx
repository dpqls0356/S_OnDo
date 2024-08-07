import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCounselorStore from '../../../store/app/useCounselorStore';
import profile from './../../../assets/images/ic_user.png';
import back from './../../../assets/images/back.png';
import './CounselorDetail.css';

const CounselorDetail = () => {
  const nav = useNavigate();
  const { counselorId } = useParams();
  const { selectedCounselor, setSelectedCounselor, getCounselorById, loading, error } = useCounselorStore();

  useEffect(() => {
    const counselor = getCounselorById(parseInt(counselorId));
    if (counselor) {
      setSelectedCounselor(counselor);
    }
  }, [counselorId, getCounselorById, setSelectedCounselor]);

  const onClickBack = () => {
    nav(`/member/counseling/apply/${counselorId}`);
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedCounselor) return <div>상담사 정보를 찾을 수 없습니다.</div>;

  return(
    <div className='scroll'>
      <img onClick={onClickBack} style={{cursor: "pointer"}} id='CD-back' src={back} alt="Back" />
      <p>상담사 소개</p>
      <div className='CD-Card'>
        <div>
          <p id='CD-name'>{selectedCounselor.name} 상담사({selectedCounselor.gender})</p>
          <img src={profile} alt="상담사 프로필" />
          <p>분야</p>
          <p>{selectedCounselor.field}</p>
          <p>경력</p>
          <div className='Career'>
            <ul>
              {selectedCounselor.career.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </div>
          <div id='CD-line'></div>
          <p>{selectedCounselor.intro}</p>
        </div>
      </div>
    </div>
  );
};

export default CounselorDetail;