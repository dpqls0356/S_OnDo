import { create } from 'zustand';

const useBoardStore = create((set, get) => ({
  // 게시글 목록
  boards: [],

  // 페이지네이션 정보
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  },

  // 현재 편집 중인 게시글 
  currentBoard: {
    id: null,
    title: '',
    content: '',
    member_name: '',
    image: null,
  },

  // 게시글 목록 설정 (API 응답 구조에 맞게 수정)
  setBoards: (response) => {
    // console.log('setBoards 호출됨:', response); // 이 부분을 추가
    set((state) => {
      if (response && response.boardList && Array.isArray(response.boardList.content)) {
        // console.log('새로운 boards 상태:', response.boardList.content);
        return { 
          boards: response.boardList.content,
          pagination: {
            currentPage: response.boardList.number || 0,
            totalPages: response.boardList.totalPages || 0,
            totalItems: response.boardList.totalElements || 0,
          }
        };
      }
      console.log('유효하지 않은 응답, 빈 배열 반환'); // 이 부분을 추가
      return { boards: [] };
    });
  },

  // 현재 게시글 필드 설정
  setCurrentBoard: (field, value) => set((state) => ({
    currentBoard: { ...state.currentBoard, [field]: value }
  })),

  // 게시글 생성
  createBoard: () => {
    const { currentBoard, boards } = get();
    const newBoard = {
      ...currentBoard,
      id: Date.now(), // 임시 ID 생성 방식
      createdAt: new Date().toISOString(),
    };
    set({ 
      boards: [...boards, newBoard],
      currentBoard: { id: null, title: '', content: '', member_name: '', image: null }
    });
  },

  // 게시글 수정
  updateBoard: (id) => {
    const { currentBoard, boards } = get();
    set({
      boards: boards.map(board => 
        board.id === id ? { ...board, ...currentBoard, updatedAt: new Date().toISOString() } : board
      ),
      currentBoard: { id: null, title: '', content: '', member_name: '', image: null }
    });
  },

  // 게시글 삭제
  deleteBoard: (id) => set((state) => ({
    boards: state.boards.filter(board => board.id !== id)
  })),

  // 게시글 불러오기 (수정을 위해)
  loadBoard: (id) => {
    const { boards } = get();
    const boardToEdit = boards.find(board => board.id === id);
    if (boardToEdit) {
      set({ currentBoard: { ...boardToEdit } });
    }
  },

  // 현재 게시글 초기화
  resetCurrentBoard: () => set({ 
    currentBoard: { id: null, title: '', content: '', member_name: '', image: null }
  }),

  // 페이지네이션 정보 업데이트 (필요한 경우 사용)
  updatePagination: (paginationInfo) => set({
    pagination: {
      ...get().pagination,
      ...paginationInfo
    }
  }),
}));

export default useBoardStore;