// counselorHome.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Reservation from "./reservation";
import counselor_Calendar from './../../../assets/images/counselor_Calendar.png'

const View = styled.div`
  padding: 50px 50px;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
`;
const Search = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 3px solid black;
  & > input {
    flex: 1;
    margin-right: 30px;
    padding: 0px 10px
  }
  & > button {
    width: 120px;
    color: white;
    background-color: #121481;
  }
`;
const ListNull = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
  color: gray;
  & > img{
    width: 35%;
  }
`
const ReservationList = styled.div``;

function ReservationSpot() {
  return (
    <View>
      <Header>전체 상담 관리</Header>
      <Search>
        <input type="text" placeholder="찾으시는 내담자의 이름을 입력해주세요." />
        <button>검색</button>
      </Search>
      <ReservationList>
        {true ? (
          <Reservation />
        ) : (
          <ListNull>
            <img src={counselor_Calendar} />
            <div>예약된 상담 일정이 없습니다.</div>
          </ListNull>
        )}
      </ReservationList>
    </View>
  );
}

export default ReservationSpot;
