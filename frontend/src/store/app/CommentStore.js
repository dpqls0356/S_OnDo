import { create } from 'zustand';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});


const useCommentStore = create((set) => ({
  comments: [],
  addComment: async (comment) => {
    try {
      // const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      const response = await api.post('/board/comment', comment)
        if (response.status === 201) {
          // 댓글 추가 후 즉시 댓글 목록을 다시 가져오기
          const articleId = comment.article_id;
          const commentsResponse = await api.get(`/board/comment/${articleId}`);
          set({ comments: commentsResponse.data });
          return true;
        }
        return false;
      } catch (error) {
        console.error('댓글 추가 실패:', error);
      }
      return false;
    },
  getComments: async (articleId) => {
    try {
      const response = await api.get(`/board/comment/${articleId}`);
      set({ comments: response.data.data.comments.content });
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  },
  deleteComment: async (commentId) => {
    try {
      await api.delete(`/board/comment/${commentId}`);
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== commentId),
      }));
      return true;
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      return false;
    }
  },
  updateComment: async (commentId, modifiedContent) => {
    try {
      const response = await api.patch(`/board/comment/${commentId}`, {
        content: modifiedContent
      });
      console.log(response);
      if (response.status === 204) {
        set((state) => ({
          comments: state.comments.map(comment => 
            comment.id === commentId ? { ...comment, content: modifiedContent } : comment
          )
        }));
        return true;
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
    return false;
},
}));

export default useCommentStore;