import "./Comment.css";
import { useState } from "react";
import profile from "./../../../assets/images/test.png";
import useCommentStore from "../../../store/app/CommentStore";
import useAuthStore from "../../../store/app/authStore";

const Comment = ({ comment }) => {
  const { deleteComment, updateComment } = useCommentStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  // 새로고침 시, 문제 해결 위해서 checkAuth
  const { user } = useAuthStore();

  const onClickCommentDelete = async () => {
    if (user.id.toString() === comment.member_id) {
      const success = await deleteComment(comment.id);
      if (success) {
        console.log("댓글 삭제 완료");
      }
    } else alert("댓글 작성자만 삭제할 수 있습니다.");
  };

  const onClickCommentEdit = () => {
    setIsEditing(true);
  };

  const onSaveEdit = async () => {
    if (user.id.toString() === comment.member_id) {
      const success = await updateComment(comment.id, editedContent);
      console.log(success.status);
      setIsEditing(false);
      // 백에서 리턴을 주는게 아니라서 새로고침 해야 할듯?
      window.location.reload();
      console.log("댓글 수정 완료");
    } else alert("댓글 작성자만 수정할 수 있습니다.");
  };

  return (
    <div className="CommentCard">
      <div className="CommentWriter">
        <div>
          <img src={profile} alt="프로필" />
          <p>{comment.member_name}</p>
        </div>
        <div>
          <p onClick={onClickCommentEdit} style={{ cursor: "pointer" }}>
            수정
          </p>
          <p onClick={onClickCommentDelete} style={{ cursor: "pointer" }}>
            삭제
          </p>
        </div>
      </div>
      <div className="CommentContent">
        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              style={{
                width: "100%",
                minHeight: "50px",
                border: "1px solid #6ABFB4",
                borderRadius: "5px",
                padding: "5px",
                marginBottom: "10px",
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span
                onClick={onSaveEdit}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  color: "#6ABFB4",
                }}
              >
                저장
              </span>
              <span
                onClick={() => setIsEditing(false)}
                style={{ cursor: "pointer", color: "gray" }}
              >
                취소
              </span>
            </div>
          </div>
        ) : (
          <div id="CommentContent">{comment.content}</div>
        )}
        <p id="CommentCreateDate">
          {new Date(Date.parse(comment.createdAt)).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
