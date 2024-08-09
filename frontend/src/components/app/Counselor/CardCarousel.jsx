import { useNavigate } from 'react-router-dom';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';
import './CardCarousel.css'
import useCounselorStore from '../../../store/app/CounselorStore';
import { useEffect } from 'react';

const CardCarousel = ({ name, reservationDate, gender, field, intro, id }) => {
    const nav = useNavigate();
    const { calculateDday, displayGender } = useCounselorStore();
    
    const dday = calculateDday(reservationDate);

    // useEffect(() => {
    //     console.log("CardCarousel props:", { name, reservationDate, gender, field, intro, id });
    // }, [name, reservationDate, gender, field, intro, id]);

    const MobileCounseling = (event) => {
      event.stopPropagation();
      console.log('nav 통해서 dday 버튼 누르면 상담방에 넘어가야 함')
    }

    if (!name && !gender && !field && !intro) {
        return <div>상담사 정보를 불러오는 중...</div>;
    }

    return (
      <>
        <div style={{padding: '3% 5%'}}>
          {reservationDate && (<p id='CS-Date'>{new Date(reservationDate).toLocaleDateString()}</p>)}
          <div className='ConSelorCardIn'>
            <div>
              <img src={profile} alt="Profile" />
            </div>
            <div className='CounselorInfo'>
              <p id='MP-CounselorName'>{name || '이름 없음'} 상담사({displayGender(gender) || '성별 미상'})</p>
              <p id='MP-Counselorfield'>{field || '분야 미상'}</p>
              <p id='MP-Counselorintro'>{intro || '소개 없음'}</p>
            </div>
            {!dday &&(<div><img src={vector} alt="Vector" /></div>)}
          </div>
         
          {dday && (
            <div className='CSCardFooter'>
              <div>
              </div>
              <div id='CS-Btn'>
                <button onClick={MobileCounseling} id='DdayBtn'>
                  <div>
                    {dday}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </>
  );
};

export default CardCarousel;