import "./BoardDetailpage.css";

import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBoardStore from "../../../store/app/useBoardStore";
import useCommentStore from "../../../store/app/useCommentStore";
import authStore from '../../../store/app/authStore'
import CommentList from "../../../components/app/Comment/CommentList";
import Button from "../../../components/app/Button";

import calendar from "./../../../assets/images/calendar.png";
import profile from "./../../../assets/images/test.png";
import commentbtn from "./../../../assets/images/send.png";

const BoardDetailpage = () => {
  const comment = useRef(null);
  const nav = useNavigate();
  const { articleId } = useParams(); // URL에서 articleId 가져오기
  console.log('articleId', articleId)
  const { addComment } = useCommentStore(); // 댓글 추가 함수 가져오기

  const { user } = authStore()


  const onClickCreateComment = async () => {
    if (comment.current.value.trim() === "") return;
    
    const commentData = {
      content: comment.current.value,
      article_id: articleId,
      // 아래 정보는 실제 로그인된 사용자 정보로 대체
      member_id: user.id, 
      member_name: user.name
    };

    // 에러 확인
    console.log("Sending comment data:", commentData); 


    const success = await addComment(commentData);
    if (success) {
      comment.current.value = "";
    }
  };

  const onClickUpdate = () => {
    nav(`/member/board/${articleId}/update`);
  };

  return (
    <div className="scroll">
    <div className="DetailScroll">
      <div id="CommentScroll">
        {/* 게시글 */}
        <div className="BoardDetail">
          <div className="DetailTitle">
            <p id="boardtitle">제목</p>
            <div>
              <Button onClick={onClickUpdate} text={"수정"} />
            </div>
          </div>

          <div className="DetailDate">
            <div className="DetailUserInfo">
              <img src={profile} />
              <p>작성자</p>
            </div>
            <div className="DetailCreate">
              <img src={calendar} />
              <div>
                <p>20xx.xx.xx</p>
                <p>00:00</p>
              </div>
            </div>
          </div>

          <div className="DetailContent">
            <p>
            adlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosooadlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosooadlspgjadskgjaeprijtalkrwjt;kjwe;poiujtfiowaujsfiokjaiokw;jgk;/osjad;/fgjzik/;jdzmfi/oa;jz;apgijosoo
            </p>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="BD-center">
          <div className="CommentList">
            <div id="comment-line"></div>
              <CommentList articleId={articleId} />
          </div>

          {/* 댓글 작성 */}
          <form className="CommentForm" onSubmit={(e) => e.preventDefault()}>
              <textarea
                ref={comment}
                maxLength={100}
                placeholder="댓글을 달아보세요."
              ></textarea>
              <img
                onClick={onClickCreateComment}
                src={commentbtn}
                alt="댓글 작성"
                style={{ cursor: "pointer" }}
              />
            </form>
            <div className="emptybox2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailpage;
