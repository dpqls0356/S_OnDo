// counselorHome.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Reservation from "./reservation";
const View = styled.div`
  padding: 70px 50px;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 30px;
`;
const Search = styled.div`
  display: flex;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 3px solid black;
  & > input {
    width: 60%;
    margin-right: 30px;
  }
  & > button {
    width: 80px;
    color: white;
    background-color: #121481;
  }
`;
const ReservationList = styled.div``;

function ReservationSpot() {
  return (
    <View>
      <Header>전체 상담 관리</Header>
      <Search>
        <input type="text" />
        <button>검색</button>
      </Search>
      <ReservationList>
        {true ? (
          <Reservation />
        ) : (
          <div>
            <div>예약된 상담 일정이 없습니다.</div>
          </div>
        )}
      </ReservationList>
    </View>
  );
}

export default ReservationSpot;
