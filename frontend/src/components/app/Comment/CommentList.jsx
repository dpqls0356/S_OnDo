import { useEffect } from "react";
import Comment from "./Comment";
import "./CommentList.css";
import useCommentStore from "../../../store/app/CommentStore";

const CommentList = ({ articleId }) => {
  const { comments, getComments } = useCommentStore();

  useEffect(() => {
    if (articleId) {
      console.log("Fetching comments for article:", articleId);
      getComments(articleId);
    }
  }, [getComments, articleId]);

  useEffect(() => {}, [comments]);

  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p style={{ textAlign: "center", color: "gray", padding: "20px" }}>
          댓글이 없습니다.
        </p>
      )}
    </div>
  );
};

export default CommentList;
