import "./Boardpage.css";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../../components/app/Board/BoardList";
import create from "./../../../assets/images/new.png";
import filter from "./../../../assets/images/filter.png";
import search from "./../../../assets/images/search.png";
import styled from "styled-components"

const CreateBtn = styled.div`
  width: 40px;
  height: 40px;
  background-color:#6AC0B4 ;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`
const SortBtn = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`

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
    <div className="scroll board-padding">
      <div className="BoardScroll">
        <div className="BoardHeader">
          <p>온도의 소통공간</p>
          <CreateBtn
            onClick={onClickCreate}
            src={create}
            style={{ cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

          </CreateBtn>
        </div>

        <div className="BoardSearch">
          <div>
            <form onSubmit={onClickSearch}>
              <input type="text" ref={text} placeholder="검색" />
            </form>
                          <div
                onClick={onClickSearch}
                style={{ cursor: "pointer" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </div>
          </div>

          <SortBtn
            onClick={onClickSort}
            style={{ cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>

          </SortBtn>
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
