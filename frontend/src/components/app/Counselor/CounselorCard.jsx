import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore'
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import CardCarousel from './CardCarousel';
import search from './../../../assets/images/ic_search.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CounselorCard.css';
import CLCard from './CLCard';

const GenderFilter = ({ selectedGender, onGenderChange }) => (
  <div className='OptionSelect'>
    {['전체', '남', '여'].map(gender => (
      <div key={gender}>
        <input
          type="radio"
          name="gender"
          value={gender}
          checked={selectedGender === gender}
          onChange={() => onGenderChange(gender)}
        /> {gender}
      </div>
    ))}
  </div>
);

const SearchFilter = ({ searchField, onSearchFieldChange, searchKeyword, onSearchKeywordChange }) => (
  <div className='FilterSearch'>
    <select className='FS-Filter' onChange={e => onSearchFieldChange(e.target.value)} value={searchField}>
      <option value="">▽ 선택</option>
      <option value="name">이름</option>
      <option value="field">분야</option>
    </select>
    <div className='FS-Search'>
      <input
        type="text"
        placeholder={searchField ? (searchField === 'name' ? '이름으로 검색하기' : '상담 분야로 검색하기') : '검색어를 입력하세요.'}
        value={searchKeyword}
        onChange={e => onSearchKeywordChange(e.target.value)}
      />
      <img src={search} alt="Search" />
    </div>
  </div>
);

const CounselorCard = ({ reservations, counselors, onFilteredCounselorsChange }) => {
  const nav = useNavigate()
  const [selectedGender, setSelectedGender] = useState('전체');
  const [searchField, setSearchField] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { displayGender } = useCounselorStore();  // displayGender 함수를 가져옵니다.

  // useEffect(() => {
  //   console.log("Reservations:", reservations); // 로그 추가
  // }, [reservations]);

  const filteredCounselors = useMemo(() => {
    return counselors.filter(counselor => {
      const genderMatch = selectedGender === '전체' || displayGender(counselor.gender) === selectedGender;
      const keywordMatch = !searchKeyword || 
        (searchField === 'name' && counselor.name.includes(searchKeyword)) ||
        (searchField === 'field' && counselor.field.includes(searchKeyword));
      return genderMatch && keywordMatch;
    });
  }, [counselors, selectedGender, searchField, searchKeyword, displayGender]);

  useEffect(() => {
    onFilteredCounselorsChange(filteredCounselors);
  }, [filteredCounselors, onFilteredCounselorsChange]);

  // 캐러셀에 대한 setting
  const settings = {
    dots: true, // dot 네비게이션
    infinite: reservations.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,  // 화살표 버튼을 제거
  swipe: true,  // 스와이프 기능을 활성화 (모바일에서 유용)
  };

  const handleCardClick = () => {
    nav('/member/counseling/list')
  }

  return (
    <div className='CounselorPageTop'>
      <div className="CounselorCard">
        {reservations.length > 0 ? (
          <Slider {...settings}>
            {reservations.map((reservation, index) => (
              <div key={index}  onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <CardCarousel
                  name={reservation.counselor?.name}
                  reservationDate={reservation.reservationDate}
                  gender={reservation.counselor?.gender}
                  field={reservation.counselor?.field}
                  intro={reservation.counselor?.selfIntroduction}
                  id={reservation.id}
                  dday={reservation.dday}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>예약된 상담이 없습니다.</p>
        )}
      </div>

      <GenderFilter
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
      />
      
      <SearchFilter
        searchField={searchField}
        onSearchFieldChange={setSearchField}
        searchKeyword={searchKeyword}
        onSearchKeywordChange={setSearchKeyword}
      />
    </div>
  );
};

CounselorCard.propTypes = {
  reservations: PropTypes.array.isRequired,
  counselors: PropTypes.array.isRequired,
  onFilteredCounselorsChange: PropTypes.func.isRequired,
};

export default CounselorCard;


// 더미데이터 테스트
// import PropTypes from 'prop-types';
// import Slider from 'react-slick';
// import CardCarousel from './CardCarousel';
// import search from './../../../assets/images/ic_search.png';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './CounselorCard.css';

// const GenderFilter = ({ selectedGender, onGenderChange }) => (
//   <div className='OptionSelect'>
//     {['전체', '남', '여'].map(gender => (
//       <div key={gender}>
//         <input
//           type="radio"
//           name="gender"
//           value={gender}
//           checked={selectedGender === gender}
//           onChange={() => onGenderChange(gender)}
//         /> {gender}
//       </div>
//     ))}
//   </div>
// );

// const SearchFilter = ({ searchField, onSearchFieldChange, searchKeyword, onSearchKeywordChange }) => (
//   <div className='FilterSearch'>
//     <select className='FS-Filter' onChange={e => onSearchFieldChange(e.target.value)} value={searchField}>
//       <option value="">▽ 선택</option>
//       <option value="name">이름</option>
//       <option value="field">분야</option>
//     </select>
//     <div className='FS-Search'>
//       <input
//         type="text"
//         placeholder={searchField ? (searchField === 'name' ? '이름으로 검색하기' : '상담 분야로 검색하기') : '검색어를 입력하세요.'}
//         value={searchKeyword}
//         onChange={e => onSearchKeywordChange(e.target.value)}
//       />
//       <img src={search} alt="Search" />
//     </div>
//   </div>
// );

// const CounselorCard = ({ reservations, selectedGender, setSelectedGender, searchField, setSearchField, searchKeyword, setSearchKeyword }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <></>,
//     prevArrow: <></>,
//   };

//   return (
//     <div className='CounselorPageTop'>
//       <div className="CounselorCard">
//         <Slider {...settings}>
//           {reservations.map((reservation, index) => (
//             <CardCarousel
//               key={index}
//               {...reservation}
//               counselor={reservation.counselor}
//             />
//           ))}
//         </Slider>
//       </div>

//       <GenderFilter
//         selectedGender={selectedGender}
//         onGenderChange={setSelectedGender}
//       />
      
//       <SearchFilter
//         searchField={searchField}
//         onSearchFieldChange={setSearchField}
//         searchKeyword={searchKeyword}
//         onSearchKeywordChange={setSearchKeyword}
//       />
//     </div>
//   );
// };

// CounselorCard.propTypes = {
//   reservations: PropTypes.array.isRequired,
//   selectedGender: PropTypes.string.isRequired,
//   setSelectedGender: PropTypes.func.isRequired,
//   searchField: PropTypes.string.isRequired,
//   setSearchField: PropTypes.func.isRequired,
//   searchKeyword: PropTypes.string.isRequired,
//   setSearchKeyword: PropTypes.func.isRequired,
// };

// export default CounselorCard;