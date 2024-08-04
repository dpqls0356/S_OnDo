import ProfileCard from '../../../components/app/CounselorProfileCard';
import Footer from '../../../components/app/Footer'
import './CounselorList.css'
import CLCard from '../../../components/app/Counselor/CLCard';

import { useNavigate } from 'react-router-dom';

import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';

import back from './../../../assets/images/back.png'
import profile from './../../../assets/images/ic_user.png'
import sort from './../../../assets/images/Shape.png'

const CounselorList = () => {
  const nav = useNavigate()
  const onClickBack = () => {
    nav('/member/counseling/main')
  }
  const onClickSort = () => {
    console.log('날짜순 정렬 기능 추가해야 함')
  }
  // 카드 데이터 배열
  const profiles = [
    {
      id: 1,
      date: "2024.08.11.",
      name: "이대전 상담사(남)",
      position: "심리분석 상담",
      message: "안녕하세요~",
      daysLeft: "22"
    },
    {
      id: 2,
      date: "2024.09.15.",
      name: "김서울 상담사(여)",
      position: "가족상담 전문",
      message: "행복한 하루 되세요!",
      daysLeft: "57"
    },
    // 더 많은 프로필 데이터 dummy로 할 수 있음
  ];

  return (
    <div className='scroll'>
      <div className='CL-header'>
        <img onClick={onClickBack} style={{cursor: "pointer"}} src={back} />
        <p>상담예약내역</p>
        <img onClick={onClickSort} style={{cursor: "pointer"}} src={sort}/>
      </div>
      <div className='CL-main'>
        <div className='CS-List'>
          <CLCard name={'박싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'} dday={'D-22'} is_complete={false} />
          <CLCard name={'박싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'} dday={'입장'} is_complete={false}/>
          <CLCard name={'박싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'} is_complete={true} />
        </div>
      </div>
      <div id='CL-empty'>

      </div>
    </div>
  );
};

export default CounselorList;