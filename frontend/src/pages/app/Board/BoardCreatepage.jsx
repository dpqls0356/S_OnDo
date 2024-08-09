import "./BoardCreatepage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/app/Button";
import Footer from "../../../components/app/Footer";
import useBoardStore from "../../../store/app/BoardStore";
import useAuthStore from "../../../store/app/AuthStore";
import LoadingSpinner from "../../../components/app/Spinner";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const BoardCreatepage = () => {
  const nav = useNavigate();
  const { currentBoard, setCurrentBoard, createBoard, resetCurrentBoard } =
    useBoardStore();
  const { user } = useAuthStore();
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  // 새로고침 시, 문제 해결 위해서 checkAuth
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const onClickCancel = () => {
    resetCurrentBoard();
    nav("/member/board");
  };

  useEffect(() => {
    const checkAuthAndSetBoard = async () => {
      await checkAuth();
      setCurrentBoard("member_name", user.nickname);
    };

    checkAuthAndSetBoard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSpinnerLoading(true);
    try {
      const boardData = new Blob(
        [
          JSON.stringify({
            title: currentBoard.title,
            content: currentBoard.content,
            member_name: currentBoard.member_name,
          }),
        ],
        { type: "application/json" }
      );

      // FormData 객체 생성
      const formData = new FormData();
      formData.append("board", boardData);

      if (currentBoard.image) {
        formData.append("image", currentBoard.image);
      } else {
        const emptyFile = new Blob([""], { type: "image/jpeg" });
        formData.append("image", emptyFile, "empty.jpg");
      }

      // 요청 보내기
      const response = await api.post("/board/article", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("게시글이 성공적으로 생성되었습니다.");
        console.log("서버 응답:", response.data);
        createBoard(); // Zustand store에 게시글 추가
        resetCurrentBoard();
        nav("/member/board/" + response.data.data.id);
      } else if (response.status === 200) {
        console.log(response.data.message);

        alert("부적절한 표현이 감지되었습니다. " + response.data.message);
      } else {
        console.error("예상치 못한 응답:", response.status);
      }
    } catch (error) {
      console.error(
        "게시글 생성 중 오류가 발생했습니다:",
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      }
    }
    setSpinnerLoading(false);
  };

  return (
    <>
      {spinnerLoading && <LoadingSpinner />}
      <form className="CreateForm" onSubmit={handleSubmit}>
        <div>
          <input
            maxLength={20}
            id="CreateTitle"
            type="text"
            placeholder="Title"
            value={currentBoard.title}
            onChange={(e) => setCurrentBoard("title", e.target.value)}
          />
          <div onClick={onClickCancel} style={{ cursor: "pointer" }}>
            X
          </div>
        </div>
        <textarea
          maxLength={300}
          placeholder="나누고 싶은 이야기를 적어보세요!"
          value={currentBoard.content}
          onChange={(e) => setCurrentBoard("content", e.target.value)}
        ></textarea>

        <input
          id="AddImage"
          type="file"
          accept="image/*"
          onChange={(e) => setCurrentBoard("image", e.target.files[0])}
        />
        <Button text="게시" type="submit" />
      </form>
      <div className="emptybox"></div>
      <Footer />
    </>
  );
};

export default BoardCreatepage;
