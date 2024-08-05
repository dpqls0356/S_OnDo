import "./BoardCreatepage.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../../../components/app/Button";
import Footer from "../../../components/app/Footer";
import useBoardStore from "../../../store/app/useBoardStore";

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true
});

const BoardCreatepage = () => {
  const nav = useNavigate();
  const { 
    currentBoard, 
    setCurrentBoard, 
    createBoard, 
    resetCurrentBoard 
  } = useBoardStore();

  const onClickCancel = () => {
    resetCurrentBoard();
    nav("/member/board");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/board/article', {
        title: currentBoard.title,
        content: currentBoard.content,
        member_name: currentBoard.member_name
      }, {
        headers: {
          'Content-Type': 'application/json'    // form-data 아니고 json으로
        }
      });
  
      if (response.status === 201) {
        console.log('게시글이 성공적으로 생성되었습니다.');
        console.log('서버 응답:', response.data);
        createBoard(); // Zustand store에 게시글 추가
        resetCurrentBoard();
        nav("/member/board/list");
      } else {
        console.error('예상치 못한 응답:', response.status);
      }
    } catch (error) {
      console.error('게시글 생성 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);
      }
    }
  };

  return (
    <>
      <form className="CreateForm" onSubmit={handleSubmit}>
        <div>
          <input
            maxLength={20}
            id="CreateTitle"
            type="text"
            placeholder="Title"
            value={currentBoard.title}
            onChange={(e) => setCurrentBoard('title', e.target.value)}
          />
          <div onClick={onClickCancel} style={{ cursor: "pointer" }}>
            X
          </div>
        </div>
        <textarea 
          maxLength={300}
          placeholder="나누고 싶은 이야기를 적어보세요!"
          value={currentBoard.content}
          onChange={(e) => setCurrentBoard('content', e.target.value)}
        ></textarea>
      
        <input 
          id="AddImage" 
          type="file" 
          accept="image/*" 
          onChange={(e) => setCurrentBoard('image', e.target.files[0])}
        />
        <Button text="게시" type="submit" />
      </form>
      <div className="emptybox"></div>
      <Footer />
    </>
  );
};

export default BoardCreatepage;