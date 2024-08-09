import { useNavigate } from 'react-router-dom';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';
import './CardCarousel.css'
import useCounselorStore from '../../../store/app/CounselorStore';

const CardCarousel = ({ name, reservationDate, gender, field, intro, id }) => {
    const nav = useNavigate();
    const { calculateDday } = useCounselorStore();
    
    const dday = calculateDday(reservationDate);

    const MobileCounseling = (event) => {
      event.stopPropagation();
      nav(`/member/counseling/${id}/detail`);
    }

    return (
        <>
          <div style={{padding: '3% 5%'}}>
            {dday && (<p id='CS-Date'>{new Date(reservationDate).toLocaleDateString()}</p>)}
            <div className='ConSelorCardIn'>
              <div>
                <img src={profile} alt="Profile" />
              </div>
              <div className='CounselorInfo'>
                <p id='MP-CounselorName'>{name} 상담자({gender})</p>
                <p id='MP-Counselorfield'>{field}</p>
                <p id='MP-Counselorintro'>{intro}</p>
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