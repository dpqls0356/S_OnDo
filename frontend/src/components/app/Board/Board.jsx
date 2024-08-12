import PropTypes from 'prop-types';
import "./Board.css";
import { useNavigate } from "react-router-dom";
import calendar from "./../../../assets/images/calendar.png";

const Board = ({ article }) => {
  const nav = useNavigate();

  const onClickBoard = () => {
    nav(`/member/board/${article._id}`);
  };

  // 사용자가 보기 편하게 날짜 변환
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div
      onClick={onClickBoard}
      className="BoardCard"
      style={{ cursor: "pointer" }}
    >
      <div className="BoardTitle">
        <div id="BD-Title">
          <p>{article.title || '제목 없음'}</p>
        </div>
        <div className="BoardCreate">
          <img src={calendar} alt="Calendar icon" className="icon-margin" />
          <p className="inline-text">{formatDate(article.created_at)}</p>
        </div>
      </div>

      <div className="BoardContent">
        <p>{truncateContent(article.content || '내용 없음')}</p>
      </div>
    </div>
  );
};

Board.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
  }).isRequired
};

export default Board;