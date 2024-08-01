// 챗알림, MemberProfileCard, footer, Button*2(로그아웃, 회원정보수정)&연결
import MemberProfileCard from '../../../components/app/MemberProfileCard'
import Button from "../../../components/app/Button";
import Footer from '../../../components/app/Footer'

const dummyProfileData = {
  name: "유싸피",
  nickname: "뽀용",
  email: "apple@gmail.com"
};


const MyPage = () => {
  return (
    <div>
      <div className="w-80 h-300 rounded-3xl p-2 flex flex-col" style={{ backgroundColor: 'rgba(106, 191, 180, 0.84)' }}>
        <div className="flex justify-between items-center mb-4">
        <MemberProfileCard 
            name={dummyProfileData.name}
            nickname={dummyProfileData.nickname}
            email={dummyProfileData.email}
          />
        </div>
        
        
      </div>
        <Button text="내 정보 수정"/>
        <br />
        <Button text="로그아웃"/> 
      <Footer/>
    </div>
  );
};

export default MyPage;