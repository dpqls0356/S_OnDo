import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCounselorStore from '../../../store/app/CounselorStore';
import CounselorCard from '../../../components/app/Counselor/CounselorCard';
import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';
import './CounselorMain.css';

const CounselorMain = () => {
  const { userReservations, counselors, fetchUserReservations, fetchCounselors, displayGender } = useCounselorStore();
  const [filteredCounselors, setFilteredCounselors] = useState([]);

  useEffect(() => {
    fetchUserReservations();
    fetchCounselors();
  }, [fetchUserReservations, fetchCounselors]);

  const handleFilteredCounselorsChange = (newFilteredCounselors) => {
    setFilteredCounselors(newFilteredCounselors);
  };

  return (
    <div className="scroll">
      <div className='CounselorMain'>
        <div className="CounselorCardBack">
          <div className='MP-RCard'>
            {userReservations.length > 0 && (
              <CounselorCard
                reservations={userReservations}
                counselors={counselors}
                onFilteredCounselorsChange={handleFilteredCounselorsChange}
              />
            )}
          </div>
        </div>
        <div className='MP-CounselorList'>
          {filteredCounselors.map(counselor => (
            <Link key={counselor.id} to={`/member/counseling/reserve/${counselor.id}`} style={{textDecoration: "none", color: 'black'}}>
              <CounselorListCard
                name={counselor.name}
                gender={displayGender(counselor.gender)}
                field={counselor.field}
                intro={counselor.intro}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounselorMain;


// 더미데이터 테스트
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import useCounselorStore from '../../../store/app/CounselorStore';
// import CounselorCard from '../../../components/app/Counselor/CounselorCard';
// import CounselorListCard from '../../../components/app/Counselor/CounselorListCard';
// import './CounselorMain.css';

// const CounselorMain = () => {
//   const navigate = useNavigate();
//   const { userReservations, counselors, fetchUserReservations, fetchCounselors } = useCounselorStore();
//   const [filteredCounselors, setFilteredCounselors] = useState([]);
//   const [selectedGender, setSelectedGender] = useState('전체');
//   const [searchField, setSearchField] = useState('');
//   const [searchKeyword, setSearchKeyword] = useState('');

//   useEffect(() => {
//     fetchUserReservations();
//     fetchCounselors();
//   }, [fetchUserReservations, fetchCounselors]);

//   useEffect(() => {
//     const filtered = counselors.filter(counselor => {
//       const genderMatch = selectedGender === '전체' || counselor.gender === selectedGender;
//       const keywordMatch = !searchKeyword || 
//         (searchField === 'name' && counselor.name.includes(searchKeyword)) ||
//         (searchField === 'field' && counselor.field.includes(searchKeyword));
//       return genderMatch && keywordMatch;
//     });
//     setFilteredCounselors(filtered);
//   }, [counselors, selectedGender, searchField, searchKeyword]);

//   const handleCounselorClick = (counselorId) => {
//     navigate(`/member/counseling/${counselorId}/detail`);
//   };

//   return (
//     <div className="scroll">
//       <div className='CounselorMain'>
//         <div className="CounselorCardBack">
//           <div className='MP-RCard'>
//             <CounselorCard
//               reservations={userReservations}
//               selectedGender={selectedGender}
//               setSelectedGender={setSelectedGender}
//               searchField={searchField}
//               setSearchField={setSearchField}
//               searchKeyword={searchKeyword}
//               setSearchKeyword={setSearchKeyword}
//             />
//           </div>
//         </div>
//         <div className='MP-CounselorList'>
//           {filteredCounselors.map(counselor => (
//             <div key={counselor.id} onClick={() => handleCounselorClick(counselor.id)}>
//               <CounselorListCard
//                 name={counselor.name}
//                 gender={counselor.gender}
//                 field={counselor.field}
//                 intro={counselor.intro}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounselorMain;