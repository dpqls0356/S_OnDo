import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/app/authStore";

import CounselingRoom from "./pages/web/counselingRoom";
import CounselorLayout from "./pages/web/counselorLayout";
import MobileLayout from "./pages/app/mobileLayout";

import CounselorLogin from "./pages/web/counselorLogin";

import Logopage from "./pages/app/Member/Logopage";
import Loginpage from "./pages/app/Member/Loginpage";
import Namepage from "./pages/app/Home/Namepage";
import Notfoundpage from "./pages/app/Notfoundpage";
import Homepage from "./pages/app/Home/Homepage";
import Chatpage from "./pages/app/Chat/Chatpage";
import Boardpage from "./pages/app/Board/Boardpage";
import BoardDetailpage from "./pages/app/Board/BoardDetailpage";
import BoardCreatepage from "./pages/app/Board/BoardCreatepage";
import BoardUpdatepage from "./pages/app/Board/BoardUpdatepage";
import MyUpdateForm from "./pages/app/Member/MyUpdatepage";

import Join from "../src/pages/app/Member/Join";
import MyPage from "../src/pages/app/Member/MyPage";
import Mission from "./pages/app/Mission/Mission";
import CounselorList from "../src/pages/app/Counselor/CounselorList";
import CounselorMain from "../src/pages/app/Counselor/CounselorMain";
import CounselorReservation from "../src/pages/app/Counselor/CounselorReservation";
import CounselorDetail from "../src/pages/app/Counselor/CounselorDetail";

function App() {
  // const test = false;
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/counselor" element={<CounselorLayout />}></Route>
        <Route path="/counselor/login" element={<CounselorLogin />}></Route>
        {/* counseling으로 이동할 때 sessionId값을 가지고 이동해야함 -> sessionId로 token발급을 하고 그걸 바탕으로 session에 참가 가능 */}
        <Route path="counselingroom" element={<CounselingRoom />}></Route>
        <Route path="/member" element={<MobileLayout />}>
          <Route path="" element={<Logopage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="name" element={<Namepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="chat" element={<Chatpage />} />
          <Route path="board" element={<Boardpage />} />
          <Route path="board/create" element={<BoardCreatepage />} />
          <Route path="board/:id/update" element={<BoardUpdatepage />} />
          <Route path="board/:id" element={<BoardDetailpage />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="join" element={<Join />} />
          <Route path="profile" element={<MyPage />} />
          <Route path="mission/list" element={<Mission />} />
          <Route path="counseling/list" element={<CounselorList />} />
          <Route path="counseling/main" element={<CounselorMain />} />
          <Route
            path="counseling/apply/:id"
            element={<CounselorReservation />}
          />
          <Route path="counseling/:id/detail" element={<CounselorDetail />} />
          <Route path="info/:id/update" element={<MyUpdateForm />} />
        </Route>
        {/* )} */}
      </Routes>
    </Router>
  );
}

export default App;
