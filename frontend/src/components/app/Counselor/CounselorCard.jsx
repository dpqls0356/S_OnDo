import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import CardCarousel from './CardCarousel';
import search from './../../../assets/images/ic_search.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CounselorCard.css';

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

const CounselorCard = ({ reservations, selectedGender, setSelectedGender, searchField, setSearchField, searchKeyword, setSearchKeyword }) => {
  const nav = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const handleCounselorList = (event) => {
    event.stopPropagation();
    nav('/member/counseling/list');
  };

  return (
    <div className='CounselorPageTop'>
      <div onClick={handleCounselorList} style={{cursor: 'pointer'}} className="CounselorCard">
        <Slider {...settings}>
          {reservations.map((reservation, index) => (
            <CardCarousel
              key={index}
              {...reservation}
              counselor={reservation.counselor}
            />
          ))}
        </Slider>
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
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      counselDetailId: PropTypes.number.isRequired,
      counselorId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      memberId: PropTypes.number.isRequired,
      reservationDate: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      counselingUrl: PropTypes.string,
      counselor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedGender: PropTypes.string.isRequired,
  setSelectedGender: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  setSearchField: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
};

export default CounselorCard;