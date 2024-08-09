import "./BoardCreatepage.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // 새로고침 시 유저 undefined 문제 해결 위해서
    checkAuth();
  }, [id]);

  useEffect(() => {
    if (id) {
      loadBoard(id);
    }

    if (currentBoard.image) {
      // currentBoard가 업데이트된 후에만 실행
      console.log(currentBoard);
      setImgUrl(extractAndDecodePath(currentBoard.image, "board"));
    }
  }, []);

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

  const extractAndDecodePath = (url, dirName) => {
    try {
      console.log(url);
      // ".com/" 이후의 경로 추출
      let startIndex = url.indexOf(dirName + "/");
      let path = url.substring(startIndex);

      // 경로 전체를 URL 디코딩
      let decodedPath = decodeURIComponent(path);
      console.log(decodedPath);

      return decodedPath;
    } catch (e) {
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

        <label htmlFor="deleteOriginFile">{"기존 파일 : " + imgUrl}</label>
        <div id="deleteOriginFile" style={{ fontSize: "small" }}>
          클릭시 삭제되며 새로운 파일 업로드시 덮어씌워집니다.
        </div>
        <input
          id="AddImage"
          type="file"
          accept="image/*"
          // value={currentViewArticle}
          // onChange={(e) => setCurrentBoard("image", e.target.files[0])}
        />
        <Button text={"수정"} />
      </form>
      <div className="emptybox"></div>
    </>
  );
};

export default BoardUpdatepage;
