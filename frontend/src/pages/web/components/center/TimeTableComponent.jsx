import styled from "styled-components"
import './TimeTableComponent.css'

const View = styled.div`
  // margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`

const Table = styled.div`
  border: 2px #E6E6E6 solid;
  border-radius: 10px;
`

const Save = styled.div`
  display: inline-block;
  & > button {
    float: right;
    width: 120px;
    // height: 100px
    color: white;
    background-color: #121481;
    border-radius: 30px;
    }
  }
`

const TimeTableComponent = () => {
  return(
    <View>
      <Table>
      <table>
      <thead>
        <tr>
          <th></th><th style={{color: '#FF0000'}}>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        <tr>
          <td>9:00
            <br />
            -<br />10:00</td>
          <td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td><td>Dolor</td><td>Ipsum</td>
        </tr>
        
        
      </tbody>
    </table>
    </Table>
      <Save>
        <button>저장</button>
      </Save>
    </View>
  )
}

export default TimeTableComponent