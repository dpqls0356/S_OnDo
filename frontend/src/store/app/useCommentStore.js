import { create } from 'zustand';
import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/';

const useCommentStore = create((set) => ({
  comments: [],
  addComment: async (comment) => {
    try {
      const response = await axios.post(`${baseURL}board/comment`, comment);
      if (response.status === 201) {
        set((state) => ({ comments: [...state.comments, response.data] }));
        return true;
      }
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
    return false;
  },
  fetchComments: async (articleId) => {
    try {
      const response = await axios.get(`${baseURL}board/comment/${articleId}`);
      set({ comments: response.data });
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  },
  deleteComment: async (commentId) => {
    try {
      await axios.delete(`${baseURL}board/comment/${commentId}`);
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
      const response = await axios.patch(`${baseURL}board/comment/${commentId}`, {
        content: modifiedContent
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 200) {
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