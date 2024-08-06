import styled from "styled-components"
import './TimeTableComponent.css'

const View = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TimeTableComponent = () => {
  return(
    <View>
      주차별 일정 관리 컴포넌트
      <table>
      <thead>
        <tr>
          <th></th><th style={{color: '#FF0000'}}>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>9:00 - 10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        
      </tbody>
    </table>
    </View>
  )
}

export default TimeTableComponent