import "./BoardCreatepage.css";

import { useNavigate } from "react-router-dom";
import useBoardStore from "../../../store/app/BoardStore";
import Button from "../../../components/app/Button";


const BoardUpdatepage = () => {
  const nav = useNavigate();
  const onClickCancel = () => {
    nav("/member/board");
    // 나중에 보드 상세로 이동하도록 변경해야 함
  };
  return (
     <>
      <form className="CreateForm">
      <div className="CF-Title">
          <input
            maxLength={20}
            id="CreateTitle"
            type="text"
          />
          <p onClick={onClickCancel} style={{ cursor: "pointer" }}>
            X
          </p>
        </div>
        <textarea maxLength={300}
          name=""
          id=""
        ></textarea>
        <input id="AddImage" type="file" accept="image/*" />
        <Button text={"수정"} />
      </form>
      <div className="emptybox">
         
      </div>
    </>
  )
}

export default BoardUpdatepage;