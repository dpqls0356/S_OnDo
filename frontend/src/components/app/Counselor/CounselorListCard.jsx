import './CounselorListCard.css';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';

import { Link } from 'react-router-dom';

const CounselorListCard = ({name, date, gender, field, intro, dday, reservId}) => {
  return (
    <div className="CounselorListCard">
      {dday &&(<p id='CS-Date'>{date}</p>)}
      
      <div className='ConSelorCardIn'>
        <div>
          <img src={profile} alt="Profile" />
        </div>
        <div className='CounselorInfo'>
          <p id='MP-CounselorName'>{name} 상담사({gender})</p>
          <p id='MP-Counselorfield'>{field}</p>
          <p id='MP-Counselorintro'>{intro}</p>
        </div>
        {!dday&& !reservId &&(<div><img src={vector} /></div>)}
      </div>

      {/* 예약 화면-상담사 카드 출력용 */}
      {reservId &&(<Link to={`/member/counseling/${reservId}/detail`}><div style={{textAlign: 'right', fontSize: '80%',color: 'black', textDecoration: 'underline'}}>더보기</div></Link>)}
      
      
      {/* dday 값이 있을 경우에만 아래가 출력됨 */}
      {dday && (
        <div className='CSCardFooter'>
          <div>
            <div className="carousel_pagination">
              <div className="carousel_circle"></div>
              <div className="carousel_circle"></div>
              <div className="carousel_circle"></div>
              <div className="carousel_circle"></div>
            </div>
          </div>
          <div>
            <button id='DdayBtn'>
              <div>
                {dday}
              </div>
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default CounselorListCard;
