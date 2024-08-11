import "./Boardpage.css";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// 뿌린 BoadList 컴포넌트 밑에 return 해서 표시
import BoardList from "../../../components/app/Board/BoardList";
import create from "./../../../assets/images/new.png";
import filter from "./../../../assets/images/filter.png";
import search from "./../../../assets/images/search.png";


const Boardpage = () => {
  const nav = useNavigate();
  const boardListRef = useRef();
  const boardToggleSortBy = useRef();
  
  const onClickCreate = () => {
    // 게시글 생성으로 이동w
    nav("/member/board/create");
  };

  const text = useRef(null);
  const onClickSearch = async (e) => {
    if(boardListRef.current){
      boardListRef.current.trigerUpdateBoard(text.current.value);
    }
  };

  const onClickSort = () => {
    if(boardListRef.current){
      boardListRef.current.trigerToggleSortBy();
    }
  };

  return (
    <div className="scroll">
      <div className="BoardScroll">
        {/* 헤더 */}
        <div className="BoardHeader">
          <p>온도의 소통공간</p>
          <img
            onClick={onClickCreate}
            src={create}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* 검색바 */}
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

        {/* 게시글 목록 컨테이너 */}
        <div className="BoardContentContainer">
          <div className="BoardContentList">
            <BoardList ref={boardListRef}/>
          </div>
        </div>

        <div className="emptybox3"></div>
      </div>
    </div>
  );
};

export default Boardpage;
