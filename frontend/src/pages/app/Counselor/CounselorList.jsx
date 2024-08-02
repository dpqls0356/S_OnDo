import ProfileCard from '../../../components/app/CounselorProfileCard';
import Footer from '../../../components/app/Footer'
import './CounselorList.css'
import CLCard from '../../../components/app/Counselor/CLCard';

import { useNavigate } from 'react-router-dom';

import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';

import back from './../../../assets/images/back.png'
import profile from './../../../assets/images/ic_user.png'

const CounselorList = () => {
  const nav = useNavigate()
  const onClickBack = () => {
    nav('/member/counseling/main')
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
      <img onClick={onClickBack} style={{cursor: "pointer"}} id='CD-back' src={back} />
      <p>상담예약내역</p>
      <div>
        {/* <CLCard name={'박싸피'} gender={'여'} field={'진로 및 취업 상담'} intro={'반갑습니다^^'} /> */}
      </div>
      {/* <div className='CD-header'>
      </div> */}
      {/* <div className='CD-Card'>
        <div>
          <p id='CD-name'>정유진 상담사(여)</p>
          <img src={profile} alt="상담사 프로필" />
          <p>분야</p>
          <p>미술심리상담사, 도형심리상담사</p>
          <p>경력</p>
          <div className='Career'>
            <ul>
              <li>- OO대학 예술치료대학원 석사</li>
              <li>- 가정의학대학교 보건학 박사</li>
              <li>- 한국미술치료 교수협의회 이사</li>
              <li>- 한국통합미술치료학회 고문</li>
            </ul>
          </div>
          <div id='CD-line'></div>
          <p>안녕하세요^^ 반갑습니다~~</p>
        </div>
      </div> */}
    </div>
    // <div className="flex flex-col min-h-screen">
    //   <div className="container mx-auto flex-grow">
    //   <img onClick={onClickBack} style={{cursor: "pointer"}} id='CD-back' src={back} />
    //     <div className="w-full">
    //       <h1 className="text-2xl font-bold mb-4">상담 예약 내역</h1>
    //       <div className="ml-8 space-y-4">
    //         {profiles.map(profile => (
    //           <ProfileCard
    //             key={profile.id}
    //             date={profile.date}
    //             name={profile.name}
    //             position={profile.position}
    //             message={profile.message}
    //             daysLeft={profile.daysLeft}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
  );
};

export default CounselorList;