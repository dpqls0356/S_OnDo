import Footer from '../../../components/app/Footer';
import profile from './../../../assets/images/ic_user.png'

const CounselorDetail = () => (
  <div className='scroll'>
    <div className='CD-Card'>
      <h2>상담사 소개</h2>
      <div>
        <h2>정유진 상담사(여)</h2>
        <img src={profile} alt="상담사 프로필" />
        <p>분야</p>
        <p>미술심리상담사, 도형심리상담사</p>
        <p>경력</p>
        <ul>
          <li>OO대학 예술치료대학원 석사</li>
          <li>가정의학대학교 보건학 박사</li>
          <li>한국미술치료 교수협의회 이사</li>
          <li>한국통합미술치료학회 고문</li>
        </ul>
        <p>안녕하세요^^ 반갑습니다~~</p>
      </div>

    </div>

  </div>
);

export default CounselorDetail;
