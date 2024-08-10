import "./CLCard.css";
import axios from "axios";
import profile from "./../../../assets/images/ic_user.png";
import { useNavigate, Link } from "react-router-dom";
import useCounselorStore from "../../../store/app/CounselorStore";

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // 쿠키를 포함하기 위해 필요
});

const CLCard = ({ name, gender, field, reservationDate, intro, is_complete, reservId }) => {
  const nav = useNavigate();
  const { calculateDday, displayGender } = useCounselorStore();

  const dday = calculateDday(reservationDate);

  const MobileCounseling = () => {
    nav(`/member/counseling/${reservId}/detail`);
  };

  const handleCancelClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      cancelRequest(reservId);
    }
  };

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

  return (
    <div className="CLCard" style={is_complete ? { backgroundColor: "rgb(238, 237, 237)" } : null}>
      {reservationDate && <p id="CL-Date">{new Date(reservationDate).toLocaleDateString()}</p>}
      <p onClick={handleCancelClick} style={{ cursor: "pointer" }}>
        취소
      </p>
      <div className="CLCardIn">
        <div>
          <img src={profile} alt="Profile" />
        </div>
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
            <button onClick={MobileCounseling} id="DdayBtn">
              <div>{dday}</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CLCard;
