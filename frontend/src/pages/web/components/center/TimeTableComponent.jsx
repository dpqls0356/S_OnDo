import { useState } from 'react';
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

  const handleCellClick = (rowIndex, colIndex) => {
    if (colIndex === 0) return; // 1열은 선택 불가
    const cellKey = `${rowIndex}-${colIndex}`;
    if (selectedCells.includes(cellKey)) {
      setSelectedCells(selectedCells.filter(key => key !== cellKey));
    } else {
      setSelectedCells([...selectedCells, cellKey]);
    }
  };

  const isSelected = (rowIndex, colIndex) => {
    // if (selectedCells.includes(`${rowIndex}-${colIndex}`)) {
    //   schedule[rowIndex][colIndex] = 1
    // }
    // return selectedCells.includes(`${rowIndex}-${colIndex}`);
    const selectcheck = selectedCells.includes(`${rowIndex}-${colIndex}`)
    if (selectcheck) {
      schedule[rowIndex][colIndex] = '1'
    } else {
      schedule[rowIndex][colIndex] = '0'
    }
    console.log(schedule)
    return selectcheck
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

  const schedule = [
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0'], 
    ['0', '0', '0', '0', '0', '0', '0', '0']
  ]

  // const [ saveSchedule, setSaveSchedule ] = useState({})

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // 요일별 일정 저장
  const SaveSchedule = async () => {
    const scheduleResult = {};
    daysOfWeek.forEach((day, colIndex) => {
      const dayValues = schedule.map(row => row[colIndex + 1]); // 열 값을 추출, 1열은 제외하고 2열부터 시작
      scheduleResult[day] = dayValues.join('');
    });

    // delete scheduleResult['sunday'];
    // delete scheduleResult['saturday'];
    try {
      const response = await axios.post(`${baseUrl}/counselor/schedule`,
        {
          monday: scheduleResult.monday,
          tuesday: scheduleResult.tuesday,
          wednesday: scheduleResult.wednesday,
          thusday: scheduleResult.thusday,
          friday: scheduleResult.friday,
          // saturday: scheduleResult.saturday,
          // sunday: scheduleResult.sunday
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      );

      if (response.status === 201) {
        console.log('성공적으로 변경되었습니다.')
        console.log('서버 응답:', response.data)
        // setSaveSchedule(response.data)
      }
    } catch (error) {
      console.error('에러 발생:', error)
      console.log(scheduleResult)
    }
  }


  return (
    <View>
      <Table>
        <table>
          <thead>
            {/* tr: 테이블 행, th: 테이블 헤더_ tableContent의 0번째 요소(요일 배열)의 요소(요일)들을 순회하며 각 요소들을 th요소로 변환함 */}
            {/* 이때 colIndex === 1이면, 즉 첫 번째 열(SUN)이면 빨간색으로 표시하고 나머지 열은 검은색으로 표시 */}
            <tr>{tableContent[0].map((content, colIndex) => <th key={colIndex} style={{ color: colIndex === 1 ? '#FF0000' : 'black' }}>{content}</th>)}</tr>
          </thead>
          <tbody>
            {/* tableContent.slice(1): 첫 번째 행을 제외한 나머지 행을 가져옴 */}
            {/* map을 통해 순회할 때 rowContent는 현재 배열(행). rowIndex는 현재 행의 인덱스 */}
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
