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

// 인터셉터 추가
api.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

api.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
}, error => {
  console.log('Error Response:', JSON.stringify(error.response, null, 2))
  return Promise.reject(error)
})

const useCommentStore = create((set) => ({
  comments: [],
  addComment: async (comment) => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      const response = await api.post('/board/comment', comment, {
        headers: {
          
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        set((state) => ({ comments: [...state.comments, response.data] }));
        return true;
      }
      return false  // 201 아니면ㅠ
    } catch (error) {
      console.error('댓글 추가 실패:', error);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
        console.error('상태 코드:', error.response.status);
      } else if (error.request) {
        console.error('응답을 받지 못했습니다');
      } else {
        console.error('에러 메시지:', error.message);
      }
    }
    return false;
  },
  getComments: async (articleId) => {
    try {
      const response = await api.get(`/board/comment/${articleId}`);
      set({ comments: response.data });
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