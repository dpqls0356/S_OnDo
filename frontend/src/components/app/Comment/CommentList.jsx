import { useEffect } from 'react';
import Comment from "./Comment";
import './CommentList.css'; // CSS 파일 import
import useCommentStore from '../../../store/app/useCommentStore';

const CommentList = ({ articleId }) => {
  const { comments, fetchComments } = useCommentStore();

  useEffect(() => {
    if (articleId) {
      fetchComments(articleId);
    }
  }, [fetchComments, articleId]);

  return (
    <div id="CommentScroll">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p style={{ textAlign: 'center', color: 'gray', padding: '20px' }}>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default CommentList;