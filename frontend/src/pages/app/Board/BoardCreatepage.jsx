import "./BoardCreatepage.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../../../components/app/Button";
import Footer from "../../../components/app/Footer";
import useCreateBoardStore from "../../../store/app/useCreateBoardStore";

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true
});

const BoardCreatepage = () => {
  const nav = useNavigate();
  const { title, content, member_name, image, setTitle, setContent, setMemberName, setImage, reset } = useCreateBoardStore();

  const onClickCancel = () => {
    reset();
    nav("/member/board");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/board/article', {
        title,
        content,
        member_name
      }, {
        headers: {
          'Content-Type': 'application/json' // json으로(multipart/form-data X)
        }
      });
  
      if (response.status === 201) {  // Created 상태 코드 확인
        console.log('게시글이 성공적으로 생성되었습니다.');
        console.log('서버 응답:', response.data);
        reset();
        nav("/member/board/list");
      } else {
        // 201이 아닌 다른 상태 코드에 대한 처리
        console.error('예상치 못한 응답:', response.status);
      }
    } catch (error) {
      console.error('게시글 생성 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
      // 에러 상세 정보 출력
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div onClick={onClickCancel} style={{ cursor: "pointer" }}>
            X
          </div>
        </div>
        <textarea 
          maxLength={300}
          placeholder="나누고 싶은 이야기를 적어보세요!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input 
          type="text"
          placeholder="별명"
          value={member_name}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <input 
          id="AddImage" 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button text="게시" type="submit" />
      </form>
      <div className="emptybox"></div>
      <Footer />
    </>
  );
};

export default BoardCreatepage;