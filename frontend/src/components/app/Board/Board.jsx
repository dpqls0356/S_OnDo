import PropTypes from 'prop-types';
import "./Board.css";
import { useNavigate } from "react-router-dom";
import calendar from "./../../../assets/images/calendar.png";

const Board = ({ board }) => {
  // console.log(board)
  const nav = useNavigate();

  const onClickBoard = () => {
    nav(`/member/board/${board._id}`);
  };

  // 사용자가 보기 편하게
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
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
          <p>{board.title || '제목 없음'}</p>
        </div>
        <div className="BoardCreate">
          <img src={calendar} alt="Calendar icon" />
          <p>{formatDate(board.created_at)}</p>
        </div>
      </div>

      <div className="BoardContent">
        <p>{truncateContent(board.content || '내용 없음')}</p>
      </div>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
  }).isRequired
};

export default Board;