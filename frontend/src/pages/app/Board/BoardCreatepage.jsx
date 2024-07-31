import "./BoardCreatepage.css";

import { useNavigate } from "react-router-dom";

import Button from "../../../components/app/Button";
import Footer from "../../../components/app/Footer";

const BoardCreatepage = () => {
  const nav = useNavigate();
  const onClickCancel = () => {
    nav("/member/board");
  };
  return (
    <>
      <form className="CreateForm">
        <div>
          <input
            maxLength={20}
            id="CreateTitle"
            type="text"
            placeholder="Title"
          />
          <p onClick={onClickCancel} style={{ cursor: "pointer" }}>
            X
          </p>
        </div>
        <textarea
          name=""
          id=""
          placeholder="나누고 싶은 이야기를 적어보세요!"
        ></textarea>
        <input id="AddImage" type="file" accept="image/*" />
        <Button text={"게시"} />
      </form>
      <Footer />
    </>
  );
};

export default BoardCreatepage;
