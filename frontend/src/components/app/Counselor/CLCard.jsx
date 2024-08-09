import './CLCard.css'
import profile from './../../../assets/images/ic_user.png'
import { useNavigate, Link } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';

const CLCard = ({name, gender, field, reservationDate, intro, is_complete, reservId}) => {
  const nav = useNavigate();
<<<<<<< HEAD
  const { calculateDday, displayGender } = useCounselorStore();
  
=======
  const { calculateDday } = useCounselorStore();

>>>>>>> Front
  const dday = calculateDday(reservationDate);

  const MobileCounseling = () => {
    nav(`/member/counseling/${reservId}/detail`);
  }

  return(
    <div className="CLCard" style={is_complete ? {backgroundColor: 'rgb(238, 237, 237)'} : null}>
      {reservationDate && (<p id='CL-Date'>{new Date(reservationDate).toLocaleDateString()}</p>)}

      <div className='CLCardIn'>
        <div>
          <img src={profile} alt="Profile" />
        </div>
        <div className='CSInfo'>
          <p id='CS-CounselorName'>{name} 상담자({displayGender(gender)})</p>
          <p id='CS-Counselorfield'>{field}</p>
          <p id='CS-Counselorintro'>{intro}</p>
        </div>
      </div>

      {reservId && (<Link to={`/member/counseling/${reservId}/detail`}><div style={{textAlign: 'right', fontSize: '80%',color: 'black', textDecoration: 'underline'}}>더보기</div></Link>)}

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