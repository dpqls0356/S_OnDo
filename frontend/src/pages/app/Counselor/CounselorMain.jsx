import ProfileCard from '../../../components/app/ProfileCard';
import FilterButtons from '../../../components/app/FilterButtons';
import CounselorSearchBar from '../../../components/app/CounselorSearchBar';
import Footer from '../../../components/app/Footer';

const CounselorMain = () => {
  return (
    <div className="bg-[#a8e6cf] min-h-screen">
      {/* Carousel로 예약된 상담사 표시인데 안했네...? */}
      <ProfileCard />
      <FilterButtons />
      <CounselorSearchBar />
      <ProfileCard />
      <Footer />
    </div>
  );
};

export default CounselorMain;