import { useEffect } from 'react';
import axios from 'axios';
import useMissionStore from '../../../store/app/useMissionStore';
import MissionButton from '../../../components/app/MissionButton';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// 요청 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 또는 다른 방식으로 저장된 토큰
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

function MissionPage() {
  const { missions, setMissions, completeMission } = useMissionStore();

  useEffect(() => {
    async function fetchMissions() {
      try {
        const [typicalResponse, dailyResponse] = await Promise.all([
          api.get('/api/v1/mission/todayTypical'),
          api.get('/api/v1/mission/todayDaily')
        ]);
  
        setMissions({
          typical: typicalResponse.data.data,
          daily: dailyResponse.data.data
        });
      } catch (error) {
        console.error('미션 가져오기 실패:', error);
      }
    }
  
    fetchMissions();
  }, [setMissions]);

  const handleComplete = async (type, mission, index) => {
    try {
      await axios.post('http://localhost:8080/api/v1/mission/complete', { 
        missionId: mission.id,
        type: type
      });
      completeMission(type, index);
    } catch (error) {
      console.error('미션 완료 처리 실패:', error);
    }
  };

  const renderMissions = (type) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {missions[type]?.map((mission, index) => (
        <MissionButton
          key={index}
          mission={mission}
          onComplete={() => handleComplete(type, mission, index)}
          isCompleted={mission.completeFlag}
          missionType={type}
        />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold my-4">특별 미션</h2>
      {renderMissions('typical')}

      <h2 className="text-2xl font-bold mb-4">데일리 미션</h2>
      {renderMissions('daily')}
    </div>
  );
}

export default MissionPage;