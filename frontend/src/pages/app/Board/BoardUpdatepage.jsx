import "./BoardCreatepage.css";

import { useNavigate } from "react-router-dom";
import useBoardStore from "../../../store/app/BoardStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useBoardStore from "../../../store/app/useBoardStore";
import useAuthStore from "../../../store/app/authStore";
import Button from "../../../components/app/Button";

const BoardUpdatepage = () => {
  const nav = useNavigate();
  const {
    currentBoard,
    setCurrentBoard,
    isLoadingArticle,
    articleError,
    loadBoard,
  } = useBoardStore();

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const { id } = useParams();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  const [imgName, setImgName] = useState("");

  useEffect(() => {
    // 새로고침 시 유저 undefined 문제 해결 위해서
    checkAuth();
  }, [id]);

  useEffect(() => {
    const loadAndProcessBoard = async (id) => {
      await loadBoard(id);
    };

    if (id) {
      loadAndProcessBoard(id);
    }
  }, []);

  useEffect(() => {
    if (currentBoard) {
      setImgName(extractAndDecodePath(currentBoard.imageUrl, "board"));
    }
  }, [currentBoard]);

  // useEffect(() => {
  //   setImgName("");
  // }, [currentBoard.imageUrl]);

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  // };

  if (isLoadingArticle) {
    return <div>로딩 중...</div>;
  }

  if (articleError) {
    return <div>에러 발생: {articleError}</div>;
  }

  if (!currentBoard) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const onClickCancel = () => {
    nav(-1); // 바로 이전 페이지로 이동
  };

  const updateBoard = async () => {
    console.log(currentBoard);

    const boardData = new Blob(
      [
        JSON.stringify({
          title: currentBoard.title,
          content: currentBoard.content,
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
    const response = await api.patch("/board/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onClickUpdate = async (event) => {
    event.preventDefault();

    await updateBoard();
    nav(`/member/board/${id}`); // 바로 이전 페이지로 이동
  };

  const extractAndDecodePath = (url, dirName) => {
    try {
      if (typeof url !== "string") {
        url = String(url);
      }

      // ".com/" 이후의 경로 추출
      let startIndex = url.indexOf(dirName + "/");
      // if (startIndex === -1) {
      //   throw new Error("Invalid directory name in URL");
      // }
      let path = url.substring(startIndex);

      // 경로 전체를 URL 디코딩
      let decodedPath = decodeURIComponent(path);
      let underscoreIndex = decodedPath.indexOf("_");
      if (underscoreIndex !== -1) {
        decodedPath = decodedPath.substring(underscoreIndex + 1);
      }

      return decodedPath;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return (
    <>
      <form className="CreateForm">
        <div className="CF-Title">
          <input
            maxLength={20}
            id="CreateTitle"
            type="text"
            value={currentBoard.title}
            onChange={(e) => setCurrentBoard("title", e.target.value)}
          />
          <p onClick={onClickCancel} style={{ cursor: "pointer" }}>
            X
          </p>
        </div>
        <textarea
          maxLength={300}
          name=""
          id=""
          value={currentBoard.content}
          onChange={(e) => setCurrentBoard("content", e.target.value)}
        ></textarea>

        <label>{"기존 파일 : " + imgName}</label>
        <div id="deleteOriginFile" style={{ fontSize: "small" }}>
          클릭시 삭제되며 새로운 파일 업로드시 덮어씌워집니다.
        </div>
        <input
          id="AddImage"
          type="file"
          accept="image/*"
          onChange={(e) => setCurrentBoard("image", e.target.files[0])}
        />
        {/* <button onClick={onClickUpdate}>수정</button> */}
        <Button text={"수정"} onClick={onClickUpdate} />
      </form>
      <div className="emptybox"></div>
    </>
  );
};

export default BoardUpdatepage;
