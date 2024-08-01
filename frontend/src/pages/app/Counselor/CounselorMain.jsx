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
    <div className='CounselorMain' >
      <div className="CounselorCardBack">
        <div id='My-notice'>
          {/* <p>My Page</p> */}
          {/* <img src={notice} /> */}
        </div>

        {/* <CounselorCardList /> */}
        {/* <div class="carousel_main">

          <div class="carousel_wrapper">
              <div class="carousel_slide">
              <CounselorCard name={'김싸피'} email={'1234@email.com'} />
              </div>
              <div class="carousel_slide">
              <CounselorCard name={'이싸피'} email={'1234@email.com'} />
              </div>
              <div class="carousel_slide">
              <CounselorCard name={'박싸피'} email={'1234@email.com'}/>
              </div>
              <div class="carousel_slide">
              <CounselorCard name={'최싸피'} email={'1234@email.com'}/>
              </div>
          </div>


          <div class="carousel_button_container">
              <button type="button" class="carousel_prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
              </button>
              <button type="button" class="carousel_next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                      <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
              </button>
          </div>


          <div class="carousel_pagination">
              <div class="carousel_circle"></div>
              <div class="carousel_circle"></div>
              <div class="carousel_circle"></div>
              <div class="carousel_circle"></div>
          </div>
        </div> */}
        <div className='MP-RCard'>
        <CounselorCard name={'김싸피'} field={'심리분석 상담'} intro={'안녕하세요~^^'} dday={'D-22'} />
        </div>

      </div>
      <div className='MP-CounselorList'>
        <Link to={'/member/counseling/apply'} style={{textDecoration: "none"}}><CounselorListCard name={'박싸피'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'} /></Link>
        <Link to={'/member/counseling/apply'} style={{textDecoration: "none"}}><CounselorListCard name={'이싸피'} field={'진로 및 취업 상담'} intro={'한줄 소개'} /></Link>
        <Link to={'/member/counseling/apply'} style={{textDecoration: "none"}}><CounselorListCard name={'이싸피'} field={'진로 및 취업 상담'} intro={'한줄 소개'} /></Link>
        <Link to={'/member/counseling/apply'} style={{textDecoration: "none"}}><CounselorListCard name={'이싸피'} field={'진로 및 취업 상담'} intro={'한줄 소개'} /></Link>
        <Link to={'/member/counseling/apply'} style={{textDecoration: "none"}}><CounselorListCard name={'이싸피'} field={'진로 및 취업 상담'} intro={'한줄 소개'} /></Link>
        <Link to={'/member/counseling/apply'} style={{textDecoration: "none"}}><CounselorListCard name={'이싸피'} field={'진로 및 취업 상담'} intro={'한줄 소개'} /></Link>
      </div>
      <Footer />
    </div>
  );
};

export default CounselorMain;