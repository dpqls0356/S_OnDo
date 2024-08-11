import "./Boardpage.css";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../../components/app/Board/BoardList";
import create from "./../../../assets/images/new.png";
import filter from "./../../../assets/images/filter.png";
import search from "./../../../assets/images/search.png";

const Boardpage = () => {
  const nav = useNavigate();
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for newest first, 'asc' for oldest first

  const onClickCreate = () => {
    nav("/member/board/create");
  };

  const text = useRef(null);
  const onClickSearch = (e) => {
    console.log(e.target);
    console.log(text.current.value);
  };

  const onClickSort = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
    console.log(`정렬 순서 변경: ${sortOrder === 'desc' ? '오래된 순' : '최신 순'}`);
  };

  return (
    <div className="scroll">
      <div className="BoardScroll">
        <div className="BoardHeader">
          <p>온도의 소통공간</p>
          <img
            onClick={onClickCreate}
            src={create}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="BoardSearch">
          <div>
            <form>
              <img
                onClick={onClickSearch}
                src={search}
                style={{ cursor: "pointer" }}
              />
              <input type="text" ref={text} placeholder="검색" />
            </form>
          </div>

          <img
            onClick={onClickSort}
            src={filter}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="BoardContentContainer">
          <div className="BoardContentList">
            <BoardList sortOrder={sortOrder} />
          </div>
        </div>

        <div className="emptybox3"></div>
      </div>
    </div>
  );
};

export default Boardpage;