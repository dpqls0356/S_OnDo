const ProfileCard = ({ date, name, position, message, daysLeft }) => {
  return (
    <div className="w-80 border-2 border-black rounded-2xl overflow-hidden font-sans">
      <div className="bg-white p-3 border-b border-black">
        <span className="font-bold">{date}</span>
      </div>
      <div className="flex p-4 bg-white">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm text-gray-600">{position}</p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
      <div className="bg-white p-3 border-t border-black text-right">
      <span className="px-3 py-1 rounded-full font-bold text-sm" style={{ backgroundColor: '#ED9C9F' }}>
          D-{daysLeft}
        </span>
      </div>
      <button className="text-blue-500" onClick={() => alert('상담사 상세 정보')}>더보기</button>
    </div>
  );
};

export default ProfileCard;


// const CounselorCard = () => (
//   <div className="bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
//     <div>
//       <h2 className="font-bold">정유진 상담사(여)</h2>
//       <p className="text-gray-600">진로 및 취업 상담</p>
//       <p className="text-gray-400">반갑습니다***</p>
//     </div>
//     <button className="text-blue-500" onClick={() => alert('상담사 상세 정보')}>더보기</button>
//   </div>
// );