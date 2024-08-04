import './CounselorCard.css';
import { useNavigate } from 'react-router-dom';
import profile from './../../../assets/images/ic_user.png';
import vector from './../../../assets/images/Vector.png';
import search from './../../../assets/images/ic_search.png';
import { useState } from 'react';
import CardCarousel from './CardCarousel';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const NextArrow = ({ onClick }) => { // props로 onClick을 전달해줘야 한다.
	return (
    <></>
		// <button
		// 	onClick={onClick}
		// 	type='button'
		// >
		// </button>
	);
};
const PrevArrow = ({ onClick }) => {
	return (
    <></>
	);
};
// 상담 메인 페이지 상단 노출 화면
const CounselorCard = ({name, gender, field, intro, dday}) => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
  };
  const [ selected , setSelected ] = useState()
  const handleSelect = (e) => {
    setSelected(e.target.value)
  }
  
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName('test')
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false
      }
    }
  }

  const nav = useNavigate()

  const counselorList = (event) => {
    event.stopPropagation();
    nav('/member/counseling/list')
  }

  const MobileCounseling = (event) => {
    event.stopPropagation();
    nav('/member/home')
  }

  return (
    <div className='CounselorPageTop'>
      <div onClick={counselorList} style={{cursor: 'pointer'}} className="CounselorCard">
      <Slider {...settings}>
        <CardCarousel name={'이싸피'} date={'2024.08.20'} gender={'여'} field={'심리 상담'} dday={'입장'} intro={'반갑습니다^^'}/>
        <CardCarousel name={'김싸피'} date={'2024.08.22'} gender={'남'} field={'진로 및 취업 상담'} dday={'D-2'} intro={'안녕하세요~'}/>
        <CardCarousel name={'이싸피'} date={'2024.08.25'} gender={'남'} field={'심리 상담'} dday={'D-5'} intro={'안녕하십니까:)'}/>
        <CardCarousel name={'정싸피'} date={'2024.08.29'} gender={'여'} field={'가족 상담'} dday={'D-9'} intro={'반가습니다*^_^*'}/>
        <CardCarousel name={'이싸피'} date={'2024.09.01'} gender={'여'} field={'심리 상담'} dday={'D-12'} intro={'오늘도 웃어볼까요~?'}/>
      </Slider>
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
        <select className='FS-Filter' onChange={handleSelect} value={selected}>
          <option value="">▽ 선택</option>
          <option value="name">이름</option>
          <option value="field">분야</option>
        </select>
        <div className='FS-Search'>
          <input type="text" placeholder={selected? (selected === 'name' ? '이름으로 검색하기': '상담 분야로 검색하기') : '검색어를 입력하세요.'}/>
          <img src={search} alt="Search" />
        </div>
      </div>
    </div>
  );
}

export default CounselorCard;
