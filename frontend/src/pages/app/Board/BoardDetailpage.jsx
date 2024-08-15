import "./BoardDetailpage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBoardStore from "../../../store/app/useBoardStore";
import useCommentStore from "../../../store/app/CommentStore";
import useAuthStore from "../../../store/app/authStore";
import CommentList from "../../../components/app/Comment/CommentList";
import Button from "../../../components/app/Button";
import axios from "axios";
import calendar from "./../../../assets/images/calendar.png";
import commentbtn from "./../../../assets/images/send.png";
import LoadingSpinner from "../../../components/app/Spinner";
import back from "./../../../assets/images/back.png";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  padding: 30px 0px 0px 20px;
`;
const Btn = styled.div`
  font-size: 15px;
`;
const mainProfileUrl = "https://d1kbrt3q8264bl.cloudfront.net/profile.png";

const BoardDetailPage = () => {
  const { articleId } = useParams();
  const nav = useNavigate();
  const comment = useRef(null);
  const {
    currentViewArticle,
    isLoadingArticle,
    articleError,
    getArticleDetail,
    resetCurrentViewArticle,
    deleteBoard,
  } = useBoardStore();

  const { addComment, getComments } = useCommentStore();
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    const initializeData = async () => {
      await checkAuth();
      if (articleId) {
        await getArticleDetail(articleId);
      }
    };

    initializeData();
    return () => resetCurrentViewArticle();
  }, [articleId, getArticleDetail, resetCurrentViewArticle, checkAuth]);

  const onClickCreateComment = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setSpinnerLoading(true);
    if (comment.current.value.trim() === "") {
      setSpinnerLoading(false);
      return;
    }

    const commentData = {
      content: comment.current.value,
      article_id: articleId,
      member_id: user.id.toString(),
      member_name: user.nickname,
    };

    const success = await addComment(commentData);

    if (success) {
      comment.current.value = "";
      await getComments(articleId,0);
    }
    setSpinnerLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClickCreateComment();
    }
  };

  const onClickUpdate = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (user.id.toString() === currentViewArticle?.member_id) {
      nav(`/member/board/${articleId}/update`);
    } else {
      alert("글 작성자만 수정할 수 있습니다.");
    }
  };

  const onClickDelete = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (user.id.toString() === currentViewArticle?.member_id) {
      try {
        if (confirm("정말 삭제하시겠습니까?")) {
          await api.delete("/board/" + articleId, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          deleteBoard(articleId);
          nav(`/member/board`);
        }
      } catch {
        alert("글 삭제에 실패했습니다.");
      }
    } else {
      alert("글 작성자만 삭제할 수 있습니다.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: '2-digit',
      // minute: '2-digit',
      timeZone: "Asia/Seoul",
    });
  };

  if (isLoadingArticle || !user) {
    return <div>로딩 중...</div>;
  }

  if (articleError) {
    return <div>에러 발생: {articleError}</div>;
  }

  if (!currentViewArticle) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  // imageUrl을 안전하게 접근하기 위해 currentViewArticle이 정의된 후에만 접근
  const imageUrl =
    currentViewArticle.imageUrl &&
    (Array.isArray(currentViewArticle.imageUrl)
      ? currentViewArticle.imageUrl[0]
      : currentViewArticle.imageUrl);

  return (
    <div className="scroll">
      {spinnerLoading && <LoadingSpinner />}
      <div>
        <Header>
          <div>
            <svg
              onClick={() => nav("/member/board")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </Header>
        <div>
          {/* 게시글 */}
          <div className="BoardDetail">
            <div className="DetailTitle">
              <p id="boardtitle">{currentViewArticle.title}</p>
              {user && user.id.toString() === currentViewArticle.member_id && (
                <div className="action-buttons">
                  <Btn onClick={onClickUpdate}>수정</Btn>
                  <Btn onClick={onClickDelete}>삭제</Btn>
                </div>
              )}
            </div>

            <div className="DetailDate">
              <div className="DetailUserInfo">
                <img
                  src={user.profileUrl || mainProfileUrl}
                  alt={`${user.name} 프로필`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = mainProfileUrl;
                  }}
                />
                <p>{currentViewArticle.member_name}</p>
              </div>
              <div className="DetailCreate">
                {/* <div style={{width:"25px",height:"2px",marginRight:"5px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
          </div> */}
                <div>
                  <p style={{ font: "16px" }}>
                    {formatDate(currentViewArticle.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="DetailContent">
              <p>{currentViewArticle.content}</p>
              {/* imageUrl이 존재할 때만 이미지 태그를 렌더링 */}
              {imageUrl && <img src={imageUrl} alt="게시글 이미지" />}
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
                onKeyDown={handleKeyDown}
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
