import './CounselorCard.css';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';
import search from './../../../assets/images/ic_search.png';

// 상담 메인 페이지 상단 노출 화면
const CounselorCard = ({name, gender, field, intro, dday}) => {
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName('test')
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false
      }
      // setGender(checkThis.value);
    }
  }

  return (
    <div className='CounselorPageTop'>
      <div className="CounselorCard">
        {dday &&(<p id='CS-Date'>2024.08.20</p>)}
        
        <div className='ConSelorCardIn'>
          <div>
            <img src={profile} alt="Profile" />
          </div>
          <div className='CounselorInfo'>
            <p id='MP-CounselorName'>{name} 상담자({gender})</p>
            <p id='MP-Counselorfield'>{field}</p>
            <p id='MP-Counselorintro'>{intro}</p>
          </div>
          {!dday &&(<div><img src={vector} /></div>)}
        </div>
        
        {dday && (
          <div className='CSCardFooter'>
            <div>
              <div className="carousel_pagination">
                <div className="carousel_circle"></div>
                <div className="carousel_circle"></div>
                <div className="carousel_circle"></div>
                <div className="carousel_circle"></div>
              </div>
            </div>
            <div>
              <button id='DdayBtn'>
                <div>
                  {dday}
                </div>
              </button>
            </div>
          </div>
        )}
        
      </div>
      <div className='OptionSelect'>
        <div>
          <input type="radio" name="test" value="전체" onChange={(e) => checkOnlyOne(e.target)}/> 전체
        </div>
        <div>
          <input type="radio" name="test" value="남" onChange={(e) => checkOnlyOne(e.target)} /> 남
        </div>
        <div>
          <input type="radio" name="test" value="여" onChange={(e) => checkOnlyOne(e.target)}/> 여
        </div>
      </div>
      <div className='FilterSearch'>
          <select className='FS-Filter'>
            <option value="">▽ 선택</option>
            <option value="">이름</option>
            <option value="">분야</option>
          </select>
          <div className='FS-Search'>
            <input type="text" placeholder='이름으로 검색하기'/>
            <img src={search} />
          </div>
      </div>
    </div>
  );
}

export default CounselorCard;
