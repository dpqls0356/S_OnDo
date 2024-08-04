import "./BoardCreatepage.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../../../components/app/Button";
import Footer from "../../../components/app/Footer";
import useCreateBoardStore from "../../../store/app/useCreateBoardStore";

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
      // api end point 체크(아 왜 맨날 헷갈려?ㅠ)
      const response = await axios.post('/api/boards', {
        title,
        content,
        member_name
      });

      if (response.status === 201) { // Created
        console.log('게시글이 성공적으로 생성되었습니다.');
        reset();
        nav("/member/board");
      }
    } catch (error) {
      console.error('게시글 생성 중 오류가 발생했습니다:', error);
    
    }
  };

  return (
    <>
<<<<<<< HEAD
      <form className="CreateForm" onSubmit={handleSubmit}>
        <div>
=======
      <form className="CreateForm">
        <div className="CF-Title">
>>>>>>> Front
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