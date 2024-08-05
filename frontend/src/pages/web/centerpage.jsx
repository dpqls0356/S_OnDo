import styled from "styled-components";
import { Route, Router } from "react-router-dom";

import DetailSchedulComponent from "./components/center/DetailSchedulComponent";

const View = styled.div`
  // align-items: center;
  // margin: auto 0;
  margin-top: 5%;
  padding: 70px 50px;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Centerpage = () => {
  return(
    <>
      <View>
      </View>
    </>
  )
}

export default Centerpage;