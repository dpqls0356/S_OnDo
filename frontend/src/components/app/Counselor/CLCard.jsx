import "./CLCard.css";
import profile from "./../../../assets/images/ic_user.png";
import { useNavigate, Link } from "react-router-dom";

const CLCard = ({name, date, gender, field, dday, intro, is_complete, reservId, onCancel}) => {
  const nav = useNavigate();
  
  const enterCounselingRoom = () => {
    nav("/counselingroom", {
      state: {
        sessionId: "b116e38c-5b00-495f-b538-5a2b6e4db7df",
      },
    });
  };

  return (
    <div
      className="CLCard"
      style={is_complete ? { backgroundColor: "rgb(238, 237, 237)" } : null}
    >
      {!reservId && (<p id='CL-Date'>{date}</p>)}
    
      <div className='CLCardIn'>
        <div>
          <img src={profile} alt="Profile" />
        </div>
        <div className="CSInfo">
          <p id="CS-CounselorName">
            {name} 상담사({gender})
          </p>
          <p id="CS-Counselorfield">{field}</p>
          <p id="CS-Counselorintro">{intro}</p>
          {!is_complete && <button onClick={enterCounselingRoom}>입장하기</button>}
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
          {dday && !is_complete && (
            <button onClick={onCancel} id="DdayBtn">
              <div>예약 취소</div>
            </button>
          )}
          {is_complete && (
            <div id="CompletedLabel">상담 완료</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CLCard;