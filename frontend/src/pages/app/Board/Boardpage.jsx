import "./Boardpage.css";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../../components/app/Board/BoardList";
import create from "./../../../assets/images/new.png";
import filter from "./../../../assets/images/filter.png";
import search from "./../../../assets/images/search.png";

const Boardpage = () => {
  const nav = useNavigate();
  const boardListRef = useRef();
  const text = useRef(null);

  const onClickCreate = () => {
    // 게시글 생성으로 이동
    nav("/member/board/create");
  };

  const onClickSearch = (e) => {
    e.preventDefault(); // 폼 제출 방지
    if (boardListRef.current) {
      boardListRef.current.triggerUpdateBoard(text.current.value); // 메서드명 확인
    }
  };

  const onClickSort = () => {
    if (boardListRef.current) {
      boardListRef.current.triggerToggleSortBy(); // 메서드명 확인
    }
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
            <form onSubmit={onClickSearch}>
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
            <BoardList ref={boardListRef} />
          </div>
        </div>

        <div className="emptybox3"></div>
      </div>
    </div>
  );
};

export default Boardpage;
