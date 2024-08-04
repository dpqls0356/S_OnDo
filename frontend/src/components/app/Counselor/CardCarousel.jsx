import { useNavigate } from 'react-router-dom';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';

import './CardCarousel.css'

const CardCarousel = ({name, date, gender, field, intro, dday}) => {
    const nav = useNavigate()

    const MobileCounseling = (event) => {
      event.stopPropagation();
      nav('/member/home')
    }
    return (
        <>
          <div style={{padding: '3% 5%'}}>
            {dday && (<p id='CS-Date'>{date}</p>)}
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
                  {/* <div className="carousel_pagination">
                    <div className="carousel_circle"></div>
                    <div className="carousel_circle"></div>
                    <div className="carousel_circle"></div>
                    <div className="carousel_circle"></div>
                  </div> */}
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
