import "./BoardDetailpage.css";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authStore from '../../../store/app/authStore'
import useBoardStore from "../../../store/app/useBoardStore";
import useCommentStore from "../../../store/app/useCommentStore";
import useAuthStore from '../../../store/app/authStore'
import CommentList from "../../../components/app/Comment/CommentList";
import Button from "../../../components/app/Button";

import calendar from "./../../../assets/images/calendar.png";
import profile from "./../../../assets/images/test.png";
import commentbtn from "./../../../assets/images/send.png";

const BoardDetailPage = () => {
  const { articleId } = useParams();
  const nav = useNavigate();
  const comment = useRef(null);  // comment ref 추가
  const { 
    currentViewArticle, 
    isLoadingArticle, 
    articleError, 
    getArticleDetail, 
    resetCurrentViewArticle 
  } = useBoardStore();
  
  const { addComment } = useCommentStore();
  const { user } = authStore();
  // console.log('User object:', user);

  // 새로고침 시, 문제 해결 위해서 checkAuth
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // 새로고침 시 유저 undefined 문제 해결 위해서
    checkAuth();
    console.log('Current user:', user);
    if (articleId) {
      getArticleDetail(articleId);
    }
    return () => resetCurrentViewArticle();
  }, [articleId, getArticleDetail, resetCurrentViewArticle]);

    const onClickCreateComment = async () => {
      if (comment.current.value.trim() === "") return;
      
      const commentData = {
        content: comment.current.value,
        article_id: articleId,
        member_id: user.id.toString(), 
        member_name: user.name
      };
      // 데이터 형식 확인
      console.log('Sending comment data:', commentData);
      const success = await addComment(commentData);
      
      // console.log("=========================================");
      // console.log(success);
      if (success) {
        comment.current.value = "";
      }
    };

    const onClickUpdate = () => {
      nav(`/member/board/${articleId}/update`);
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    if (isLoadingArticle) {
      return <div>로딩 중...</div>;
    }

    if (articleError) {
      return <div>에러 발생: {articleError}</div>;
    }

    if (!currentViewArticle) {
      return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
      <div className="scroll">
        <div className="DetailScroll">
          <div id="CommentScroll">
            {/* 게시글 */}
            <div className="BoardDetail">
              <div className="DetailTitle">
                <p id="boardtitle">{currentViewArticle.title}</p>
                <div>
                  <Button onClick={onClickUpdate} text={"수정"} />
                </div>
              </div>
              
              <div className="DetailDate">
                <div className="DetailUserInfo">
                  <img src={profile} alt="프로필" />
                  <p>{currentViewArticle.member_name}</p>
                </div>
                <div className="DetailCreate">
                  <img src={calendar} alt="달력" />
                  <div>
                    <p>{formatDate(currentViewArticle.created_at)}</p>
                  </div>
                </div>
              </div>

              <div className="DetailContent">
                <p>{currentViewArticle.content}</p>
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

export default BoardDetailPage;