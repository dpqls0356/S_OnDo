import './CLCard.css'

import profile from './../../../assets/images/ic_user.png'

import { useNavigate, Link } from 'react-router-dom';

const CLCard = ({name, date, gender, field, dday, intro, is_complete, reservId}) => {
  // const is_complete = true
  // 상담 날짜 지났는지 체크할 용

  const nav = useNavigate()
  const MobileCounseling = () => {
    nav('/모바일상담연결해야함')
  }
  return(
    <div className="CLCard" style={is_complete ? {backgroundColor: 'rgb(238, 237, 237)'} : null}>
      {/* {is_complete && (<div id='CLCard-disable'></div>)} */}

      {!reservId && (<p id='CL-Date'>{date}</p>)}
    
      <div className='CLCardIn'>
        <div>
          <img src={profile} alt="Profile" />
        </div>
        <div className='CSInfo'>
          <p id='CS-CounselorName'>{name} 상담자({gender})</p>
          <p id='CS-Counselorfield'>{field}</p>
          <p id='CS-Counselorintro'>{intro}</p>
        </div>
      {/* {!dday &&(<div><img src={vector} alt="Vector" /></div>)} */}
      </div>

      {/* 예약 화면-상담사 카드 출력용 */}
      {reservId &&(<Link to={`/member/counseling/${reservId}/detail`}><div style={{textAlign: 'right', fontSize: '80%',color: 'black', textDecoration: 'underline'}}>더보기</div></Link>)}
    
      <div className='CS-CardFooter'>
        <div>
          {dday && (
          <button onClick={MobileCounseling} id='DdayBtn'>
            <div>
              {dday}
            </div>
          </button>
          )}
        </div>
      </div>
  </div>
  )
}

export default CLCard;