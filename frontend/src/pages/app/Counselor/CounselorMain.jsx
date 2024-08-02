import './CounselorMain.css'

import Footer from '../../../components/app/Footer';
import CounselorCard from '../../../components/app/Counselor/CounselorCard';
import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';
import CounselorCardList from '../../../components/app/Counselor/CounselorCardList';

import { Link } from 'react-router-dom';

import profile from './../../../assets/images/ic_user.png'

const CounselorMain = () => {
  // const swiper = document.querySelector('.carousel_wrapper');
  // const prevButtons = document.querySelectorAll('.carousel_prev');
  // const nextButtons = document.querySelectorAll('.carousel_next');
  // const bullets = document.querySelectorAll('.carousel_circle');

  // let currentSlide = 0;

  // function showSlide(slideIndex) {
  //     swiper.style.transform = `translateX(-${slideIndex * 300}px)`;
  //     currentSlide = slideIndex;

  //     bullets.forEach((bullet, index) => {
  //         if (index === currentSlide) {
  //             bullet.classList.add('active');
  //         } else {
  //             bullet.classList.remove('active');
  //         }
  //     });
  // }

  // prevButtons.forEach((prevButton) => {
  //     prevButton.addEventListener('click', () => {
  //         if (currentSlide > 0) {
  //             showSlide(currentSlide - 1);
  //         }
  //     });
  // });

  // nextButtons.forEach((nextButton) => {
  //     nextButton.addEventListener('click', () => {
  //         if (currentSlide < 3) {
  //             showSlide(currentSlide + 1);
  //         }
  //     });
  // });

  // bullets.forEach((bullet, index) => {
  //     bullet.addEventListener('click', () => {
  //         showSlide(index);
  //     });
  // });

  // showSlide(0);

  return (
    <div className="scroll">
    <div className='CounselorMain' >
      <div className="CounselorCardBack">
        <div className='MP-RCard'>
        <CounselorCard name={'김싸피'} gender={'남'} field={'심리분석 상담'} intro={'안녕하세요~^^'} dday={'D-22'} />
        </div>

      </div>
      <div className='MP-CounselorList'>
        <Link to={'/member/counseling/apply/상담사아이디'} style={{textDecoration: "none", color: 'black'}}><CounselorListCard name={'박싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'}/></Link>
        <Link to={'/member/counseling/apply/상담사아이디'} style={{textDecoration: "none", color: 'black'}}><CounselorListCard name={'이싸피'} gender={'남'} field={'진로 및 취업 상담'} intro={'한줄 소개'}/></Link>
        <Link to={'/member/counseling/apply/상담사아이디'} style={{textDecoration: "none", color: 'black'}}><CounselorListCard name={'이싸피'} gender={'남'} field={'진로 및 취업 상담'} intro={'한줄 소개'}/></Link>
        <Link to={'/member/counseling/apply/상담사아이디'} style={{textDecoration: "none", color: 'black'}}><CounselorListCard name={'이싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'한줄 소개'}/></Link>
        <Link to={'/member/counseling/apply/상담사아이디'} style={{textDecoration: "none", color: 'black'}}><CounselorListCard name={'이싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'한줄 소개'}/></Link>
        <Link to={'/member/counseling/apply/상담사아이디'} style={{textDecoration: "none", color: 'black'}}><CounselorListCard name={'이싸피'} gender={'남'} field={'진로 및 취업 상담'} intro={'한줄 소개'}/></Link>
      </div>
      {/* <Footer /> */}
    </div>
    </div>
  );
};

export default CounselorMain;