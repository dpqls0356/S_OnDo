import "./Comment.css";
import { useState } from "react";
import profile from "./../../../assets/images/test.png";
import useCommentStore from "../../../store/app/useCommentStore";

const Comment = ({ comment }) => {
  const { deleteComment, updateComment } = useCommentStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const onClickCommentDelete = async () => {
    const success = await deleteComment(comment.id);
    if (success) {
      console.log("댓글 삭제 완료");
    }
  };

  const onClickCommentEdit = () => {
    setIsEditing(true);
  };

  const onSaveEdit = async () => {
    const success = await updateComment(comment.id, editedContent);
    if (success) {
      setIsEditing(false);
      console.log("댓글 수정 완료");
    }
  };

  console.log(comment);

  return (
    <div className="CommentCard">
      <div className="CommentWriter">
        <div>
          <img src={profile} alt="프로필" />
          <p>{comment.member_nickname}</p>
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
