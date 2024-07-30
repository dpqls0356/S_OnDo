import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounselorHome from "./counselorWeb/counselorHome";
import CounselingRoom from "./counselorWeb/counselingRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/counselor/home" element={<CounselorHome />}></Route>
        <Route
          path="/counselor/counselingroom"
          element={<CounselingRoom />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
