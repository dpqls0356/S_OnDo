import './CounselorListCard.css';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';

const CounselorListCard = ({name, field, intro, dday}) => {
  return (
    <div className="CounselorListCard">
      {dday &&(<p id='CS-Date'>2024.08.20</p>)}
      
      <div className='ConSelorCardIn'>
        <div>
          <img src={profile} alt="Profile" />
        </div>
        <div className='CounselorInfo'>
          <p id='MP-CounselorName'>{name} 상담자(성별)</p>
          <p id='MP-Counselorfield'>{field}</p>
          <p id='MP-Counselorintro'>{intro}</p>
        </div>
        {!dday &&(<div><img src={vector} /></div>)}
      </div>
      
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
