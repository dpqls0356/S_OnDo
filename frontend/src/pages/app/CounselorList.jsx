import ProfileCard from '../../components/app/ProfileCard';

const CounselorList = () => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">상담 메인</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map(profile => (
          <ProfileCard
            key={profile.id}
            date={profile.date}
            name={profile.name}
            position={profile.position}
            message={profile.message}
            daysLeft={profile.daysLeft}
          />
        ))}
      </div>
    </div>
  );
};

export default CounselorList;