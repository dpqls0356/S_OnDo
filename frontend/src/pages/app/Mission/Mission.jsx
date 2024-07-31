import { useState } from 'react';
import './Mission.css';
import Footer from '../../../components/app/Footer';

const Mission = () => {
  const [missions, setMissions] = useState([
    // 특별 미션에 대한 설정이 없음
    { id: 1, text: "아침 운동하기", completed: false },
    { id: 2, text: "책 30분 읽기", completed: false },
    { id: 3, text: "양치하기", completed: false },
  ]);

  const [newMission, setNewMission] = useState('');

  const handleMissionComplete = (id) => {
    setMissions(missions.map(mission => 
      mission.id === id ? { ...mission, completed: !mission.completed } : mission
    ));
  };

  const handleAddMission = (e) => {
    e.preventDefault();
    if (newMission.trim()) {
      setMissions([...missions, { id: Date.now(), text: newMission, completed: false }]);
      setNewMission('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex-grow mission-page"> 
        <h1 className="text-2xl font-bold mb-4">오늘의 미션</h1>
        <form onSubmit={handleAddMission}>
          <input 
            type="text" 
            value={newMission} 
            onChange={(e) => setNewMission(e.target.value)}
            placeholder="새 미션 입력"
          />
          <button type="submit">추가</button>
        </form>
        <div className="mission-list">
          {missions.map(mission => (
            <button 
              key={mission.id} 
              className={`mission-button ${mission.completed ? 'completed' : ''}`}
              onClick={() => handleMissionComplete(mission.id)}
            >
              {mission.text}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mission;