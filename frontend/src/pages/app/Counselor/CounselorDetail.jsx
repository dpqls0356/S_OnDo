import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';
import back from './../../../assets/images/back.png';
import './CounselorDetail.css';

const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";

const CounselorDetail = () => {
  const nav = useNavigate();
  const { counselorId } = useParams();
  const { selectedCounselor, fetchCounselorDetails, displayGender } = useCounselorStore();

  useEffect(() => {
    if (counselorId) {
      fetchCounselorDetails(parseInt(counselorId));
    }
  }, [counselorId, fetchCounselorDetails]);

  const onClickBack = () => {
    nav(`/member/counseling/reserve/${counselorId}`);
  };
  
  if (!selectedCounselor) return null;

  return(
    <div className='scroll'>
      <img onClick={onClickBack} style={{cursor: "pointer"}} id='CD-back' src={back} alt="Back" />
      <p>상담사 소개</p>
      <div className='CD-Card'>
        <div>
          <p id='CD-name'>{selectedCounselor.name} 상담사({displayGender(selectedCounselor.gender)})</p>
          <img 
            src={selectedCounselor.profileUrl || mainProfileUrl} 
            alt={`${selectedCounselor.name} 상담사 프로필`} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = mainProfileUrl;
            }}
          />
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