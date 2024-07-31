import Footer from '../../../components/app/Footer';

const CounselorDetail = () => (
  <div className="bg-cream-100 min-h-screen pb-16">
    <h2 className="font-bold text-xl mb-2">상담사 소개</h2>
    <div className="bg-white rounded-lg p-4 m-4 shadow-md">
      <h2 className="font-bold text-xl mb-2">정유진 상담사(여)</h2>
      <img className="w-24 h-24 mx-auto mb-4" src="/placeholder-avatar.png" alt="상담사 프로필" />
      <p className="font-bold mb-2">분야</p>
      <p className="mb-4">미술심리상담사, 도형심리상담사</p>
      <p className="font-bold mb-2">경력</p>
      <ul className="list-disc list-inside mb-4">
        <li>OO대학 예술치료대학원 석사</li>
        <li>가정의학대학교 보건학 박사</li>
        <li>한국미술치료 교수협의회 이사</li>
        <li>한국통합미술치료학회 고문</li>
      </ul>
      <p className="text-gray-600">안녕하세요^^ 반갑습니다~~</p>
    </div>
    <Footer />
  </div>
);

export default CounselorDetail;
