import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './TimeTableComponent.css';

const View = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`;

const Table = styled.div`
  border: 2px #E6E6E6 solid;
  border-radius: 10px;
`;

const Save = styled.div`
  display: inline-block;
  & > button {
    float: right;
    width: 120px;
    color: white;
    background-color: #121481;
    border-radius: 30px;
  }
`;
const baseUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

const TimeTableComponent = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [schedule, setSchedule] = useState([
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0']
  ]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (colIndex === 0) return; // 1열은 선택 불가
    const cellKey = `${rowIndex}-${colIndex}`;
    const newSelectedCells = selectedCells.includes(cellKey)
      ? selectedCells.filter(key => key !== cellKey)
      : [...selectedCells, cellKey];

    const newSchedule = schedule.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        newSelectedCells.includes(`${rIndex}-${cIndex}`) ? '1' : '0'
      )
    );

    setSelectedCells(newSelectedCells);
    setSchedule(newSchedule);
  };

  const isSelected = (rowIndex, colIndex) => {
    return selectedCells.includes(`${rowIndex}-${colIndex}`);
  };

  const renderCell = (content, rowIndex, colIndex) => (
    <td
      key={colIndex}
      onClick={() => handleCellClick(rowIndex, colIndex)}
      style={{ backgroundColor: isSelected(rowIndex, colIndex) ? '#FFF5DA' : 'transparent' }}
    >
      {content}
    </td>
  );

  const renderRow = (rowContent, rowIndex) => (
    <tr key={rowIndex}>
      {rowContent.map((cellContent, colIndex) => renderCell(cellContent, rowIndex, colIndex))}
    </tr>
  );

  const tableContent = [
    ['', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    ['9:00\
      -\
      10:00', '', '', '', '', '', '', ''],
    ['10:00\
      -\
      11:00', '', '', '', '', '', '', ''],
    ['11:00\
      -\
      12:00', '', '', '', '', '', '', ''],
    ['12:00\
      -\
      1:00', '', '', '', '', '', '', ''],
    ['1:00\
      -\
      2:00', '', '', '', '', '', '', ''],
    ['2:00\
      -\
      3:00', '', '', '', '', '', '', ''],
    ['3:00\
      -\
      4:00', '', '', '', '', '', '', ''],
    ['4:00\
      -\
      5:00', '', '', '', '', '', '', ''],
    ['5:00\
      -\
      6:00', '', '', '', '', '', '', ''],
  ];

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  // const [SaveSchedule, handleSaveSchedule] = useState({})
  
  useEffect((e) => {
    ReadSchedule()
    console.log('뭐가 있지', e)
  })
  // 요일별 일정을 조회
  const ReadSchedule = async () => {
    try{
      const response = await axios.get(`${baseUrl}/counselor/schedule`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      handleSaveSchedule(response.data.data.schedule)
      console.log(SaveSchedule)
      // setSchedule(새롭게 바뀔 행렬 집어넣기)
      if (response.status === 200) {
        console.log('요일별 일정 조회 성공');
        console.log('서버 응답:', response.data);
      }
    } catch (err) {
      console.error('에러 발생:', err)
    }
  } 

  // 요일별 일정을 수정
  const SaveSchedule = async () => {
    const scheduleResult = {};
    daysOfWeek.forEach((day, colIndex) => {
      const dayValues = schedule.map(row => row[colIndex + 1]); // 열 값을 추출, 1열은 제외하고 2열부터 시작
      scheduleResult[day] = dayValues.join('');
    });

    try {
      const response = await axios.put(`${baseUrl}/counselor/schedule`,
        {
          monday: scheduleResult.monday,
          tuesday: scheduleResult.tuesday,
          wednesday: scheduleResult.wednesday,
          thursday: scheduleResult.thursday,
          friday: scheduleResult.friday,
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      );
      if (response.status === 200) {
        console.log('성공적으로 변경되었습니다.');
        console.log('서버 응답:', response.data);
      }
    } catch (error) {
      console.error('에러 발생:', error);
      console.log(scheduleResult);
    }
  };

  return (
    <View>
      <Table>
        <table>
          <thead>
            <tr>{tableContent[0].map((content, colIndex) => <th key={colIndex} style={{ color: colIndex === 1 ? '#FF0000' : 'black' }}>{content}</th>)}</tr>
          </thead>
          <tbody>
            {tableContent.slice(1).map((rowContent, rowIndex) => renderRow(rowContent, rowIndex))}
          </tbody>
        </table>
      </Table>
      <Save>
        <button onClick={SaveSchedule}>저장</button>
      </Save>
    </View>
  );
};

export default TimeTableComponent;
