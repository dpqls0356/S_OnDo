import ProfileCard from '../../../components/app/CounselorProfileCard';
import FilterGender from '../../../components/app/FilterGender';
import CounselorSearchBar from '../../../components/app/CounselorSearchBar';
import Footer from '../../../components/app/Footer';

const CounselorMain = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#a8e6cf]">
      <div className="flex-grow">
        {/* Carousel로 예약된 상담사 표시인데 안했네...? */}
        <ProfileCard />
        <FilterGender />
        <CounselorSearchBar />
        <ProfileCard />
      </div>
      <Footer />
    </div>
  );
};

export default CounselorMain;