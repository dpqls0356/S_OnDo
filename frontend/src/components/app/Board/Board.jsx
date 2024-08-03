// 게시글 리스트
import "./Board.css";

import { useNavigate } from "react-router-dom";

import calendar from "./../../../assets/images/calendar.png";

const Board = () => {
  // 단일게시글 정보 입력받아야 함

  const nav = useNavigate();
  const onClickBoard = () => {
    // 게시글 번호 입력받아야 함
    return nav("/member/board/게시글 번호");
  };

  return (
    <>
      {/* <p>게시글 목록 로직 추가해야함</p> */}
      {/* <p>이거 자체를 for문 돌려야 하나....? for문 돌면서 넘어온 데이터 받고....</p> */}
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        {/* onClickBoard(게시글 번호 혹은 게시글 객체 넘기기) */}
        <div className="BoardTitle">
          <div id="BD-Title">
            <p>일이삼사오육칠팔구십십일</p>
          </div>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          {/* 보이는 글자수 제한 해야 함 */}
          <p>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십육십일asfafasfafffaaaaaaaaassssssssssssssssssss</p>
        </div>
      </div>




      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>adlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosooadlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosooadlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosoo</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>prijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosooadlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;gjzik/;jdzmfi/oa;</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>
      <div
        onClick={onClickBoard}
        className="BoardCard"
        style={{ cursor: "pointer" }}
      >
        <div className="BoardTitle">
          <p>제목</p>
          <div className="BoardCreate">
            <img src={calendar} />
            <p>20xx.xx.xx</p>
          </div>
        </div>

        <div className="BoardContent">
          <p>내용</p>
        </div>
      </div>

      
    </>
  );
};

export default Board;
