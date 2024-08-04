import './Namepage.css'

import character from "./../../../assets/images/공통_캐릭터.png";
import Balloon from "../../../components/app/Balloon";
import Name from '../../../components/app/Name';
import name_bottom from "./../../../assets/images/name_bottom.png";


const Navbarpage = () => {
  return (
    <div className="scroll">
      {/* 나중에 푸터 없애기 */}
      <div id='name-content'>
      <div className='Namepage'>
        <div className="Name-ballon">
          <Balloon text={'내 이름을 지어주지 않을래?'} />
        </div>
        <div className="Name-daram">
          <img style={{ height: 170 }} src={character} />
        </div>
        <div id='NAME'>
          {/* <p>다람이</p> */}
          <Name />
        </div>
        </div>
      </div>
      <img id='name-bottom' src={name_bottom} />
    </div>
  )
}

export default Navbarpage;