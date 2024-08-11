<<<<<<< HEAD
=======



// sessionId 로직 추가
>>>>>>> 9b0a317f019332dcd44c27c597dfe8ea055b9c29
import './CLCard.css';
import profile from './../../../assets/images/ic_user.png';
import { useNavigate, Link } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';

const CLCard = ({name, gender, field, reservationDate, intro, is_complete, reservId, counselingUrl, showCancelButton = true}) => {
  const nav = useNavigate();
<<<<<<< HEAD
  const { calculateDday, displayGender, cancelReservation } = useCounselorStore();
  
=======
  const { calculateDday, displayGender } = useCounselorStore();
>>>>>>> 9b0a317f019332dcd44c27c597dfe8ea055b9c29
  const dday = calculateDday(reservationDate);

  const handleCounselingClick = () => {
    if (counselingUrl) {
      localStorage.setItem("sessionId",counselingUrl);
      nav(`/counselingroom`, { 
        state: { 
          sessionId: counselingUrl,
          reservationId:"",
          memberId:"",
        } 
      });
    } else {
      alert('아직 상담 시간이 되지 않았습니다. 상담 시간에 다시 시도해주세요.');
    }
  };
<<<<<<< HEAD
  
  const handleCancelClick = async () => {
=======

  const handleCancelClick = () => {
>>>>>>> 9b0a317f019332dcd44c27c597dfe8ea055b9c29
    if (window.confirm("정말 취소하시겠습니까?")) {
      try {
        await cancelReservation(reservId);
        alert("상담 예약이 취소되었습니다.");
        window.location.reload(); // 페이지 새로고침
      } catch (error) {
        alert(error.message || "상담 예약 취소 중 오류가 발생했습니다.");
      }
    }
  };
<<<<<<< HEAD
  
  
=======

  const cancelRequest = async (reservId) => {
    console.log(reservId);
    if (!reservId) {
      alert("예약 ID가 없습니다.");
      return;
    }

    try {
      const response = await api.delete(`/member/reservation/cancel/${reservId}`);

      if (response.data.success) {
        alert("상담 예약이 취소되었습니다.");
        window.location.reload(); // 페이지 새로고침
      } else {
        alert("예약 취소에 실패했습니다.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "상담 예약 취소 중 오류가 발생했습니다.");
    }
  };

>>>>>>> 9b0a317f019332dcd44c27c597dfe8ea055b9c29
  return (
    <div className="CLCard" style={is_complete ? { backgroundColor: "rgb(238, 237, 237)" } : null}>
      {showCancelButton && (
        <div className="cancel-button" onClick={handleCancelClick}>
          취소
        </div>
      )}
      {reservationDate && <p id="CL-Date">{new Date(reservationDate).toLocaleDateString()}</p>}
      <div className="CLCardIn">
        <img src={profile} alt="Profile" />
        <div className="CSInfo">
          <p id="CS-CounselorName">
            {name} 상담자({displayGender(gender)})
          </p>
          <p id="CS-Counselorfield">{field}</p>
          <p id="CS-Counselorintro">{intro}</p>
        </div>
      </div>

      {reservId && (
        <Link to={`/member/counseling/${reservId}/detail`}>
          <div
            style={{
              textAlign: "right",
              fontSize: "80%",
              color: "black",
              textDecoration: "underline",
            }}
          >
            더보기
          </div>
        </Link>
      )}

      <div className="CS-CardFooter">
        <div>
          {dday && (
<<<<<<< HEAD
            <button onClick={handleCounselingClick} id='DdayBtn'>
              <div>
                {dday}
              </div>
            </button>
=======
          <button onClick={handleCounselingClick} id='DdayBtn'>
            <div>
              {dday}
            </div>
          </button>
>>>>>>> 9b0a317f019332dcd44c27c597dfe8ea055b9c29
          )}
        </div>
      </div>
    </div>
  );
};

export default CLCard;