import "./Boardpage.css";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import BoardList from "../../../components/app/Board/BoardList";
import Footer from "../../../components/app/Footer";

import create from "./../../../assets/images/new.png";
import filter from "./../../../assets/images/filter.png";
import search from "./../../../assets/images/search.png";

const Boardpage = () => {
  const nav = useNavigate();

  const onClickCreate = () => {
    console.log("...");
    nav("/member/board/create");
  };

  const text = useRef(null);
  const onClickSearch = (e) => {
    console.log(e.target);
    console.log(text.current.value);
  };

  const onClickSort = () => {
    console.log("나중에 기능 추가되면 onClickSetting으로 바꾸기");
    console.log("지금은 날짜순 정렬기능만 있음");
  };

  return (
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

        <img onClick={onClickSort} src={filter} style={{ cursor: "pointer" }} />
      </div>

      {/* 게시글 목록 컨테이너 */}
      <div className="BoardContentContainer">
        <div className="BoardContentList">
          <BoardList />
        </div>
      </div>

      <div className="emptybox3"></div>

      {/* 하단 바 */}
      <Footer id="footer" />
    </div>
  );
};

export default Boardpage;
