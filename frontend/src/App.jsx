import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounselorHome from "./counselorWeb/counselorHome";
import CounselingRoom from "./counselorWeb/counselingRoom";

import Logopage from './pages/app/Logopage';
import Loginpage from './pages/app/Loginpage';
import Namepage from './pages/app/Namepage';
import Notfoundpage from './pages/app/Notfoundpage';
import Homepage from './pages/app/Homepage';
import Chatpage from './pages/app/Chatpage';
import Boardpage from './pages/app/Boardpage';
import BoardDetailpage from './pages/app/BoardDetailpage';
import BoardCreatepage from './pages/app/BoardCreatepage';
import BoardUpdatepage from './pages/app/BoardUpdatepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/counselor/home" element={<CounselorHome />}></Route>
        <Route
          path="/counselor/counselingroom"
          element={<CounselingRoom />}
        ></Route>
        <Route path="/" element={<Logopage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/name" element={<Namepage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/chat' element={<Chatpage />} />
        <Route path='/board' element={<Boardpage/>} />
        <Route path='/board/create' element={<BoardCreatepage/>} />
        <Route path='/board/:id/update' element={<BoardUpdatepage/>} />
        <Route path='/board/:id' element={<BoardDetailpage/>} />
        <Route path='*' element={<Notfoundpage />} />
      </Routes>
    </Router>
  );
}

export default App;
