import profile from './../../../assets/images/ic_user.png'

import { useNavigate } from 'react-router-dom';

const CLCard = (name, gender, field, dday, intro) => {
  const nav = useNavigate()
  const MobileCounseling = () => {
    nav('/모바일상담연결해야함')
  }
  return(
    <div className="CounselorCard">
    {dday && (<p id='CS-Date'>2024.08.20</p>)}
    
    <div className='ConSelorCardIn'>
      <div>
        <img src={profile} alt="Profile" />
      </div>
      <div className='CounselorInfo'>
        <p id='MP-CounselorName'>{name} 상담자({gender})</p>
        <p id='MP-Counselorfield'>{field}</p>
        <p id='MP-Counselorintro'>{intro}</p>
      </div>
      {/* {!dday &&(<div><img src={vector} alt="Vector" /></div>)} */}
    </div>
    
    {dday && (
      <div className='CSCardFooter'>
        <div>
          <button onClick={MobileCounseling} id='DdayBtn'>
            <div>
              {dday}
            </div>
          </button>
        </div>
      </div>
    )}
  </div>
  )
}

export default CLCard;