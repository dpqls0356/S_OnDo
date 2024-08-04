import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import useMissionStore from '../../../store/app/useMissionStore';
import MissionButton from '../../../components/app/MissionButton';

import char from './../../../assets/images/test_chara.png'

import './Mission.css'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// 요청 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken') // 쿠키에서 토큰 가져오기
  
  console.log('Access Token:', Cookies.get('accessToken'));
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

function MissionPage() {
  const { missions, setMissions, completeMission } = useMissionStore();
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchMissions() {
  //     try {
  //       const [typicalResponse, dailyResponse] = await Promise.all([
  //         api.get('/api/v1/mission/todayTypical'),
  //         api.get('/api/v1/mission/todayDaily')
  //       ]);
  
  //       if (typicalResponse.data.success && dailyResponse.data.success) {
  //         setMissions({
  //           typical: typicalResponse.data.data.typicalMission,
  //           daily: dailyResponse.data.data.dailyMission
  //         });
  //       } else {
  //         throw new Error('서버에서 미션 데이터를 가져오는데 실패했습니다.');
  //       }
  //     } catch (error) {
  //       console.error('미션 가져오기 실패:', error);
  //       setError('미션을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.');
  //     }
  //   }
  
  //   fetchMissions();
  // }, [setMissions]);

  // 더미데이터로 테스트
  const tempMissions = {
    typical: [
      {
        completeFlag: false,
        completeTime: null,
        title: "산책하기",
        content: "집 근처 공원을 20분 동안 산책하기",
        type: "typical",
        exp: 30,
        level: 1
      },
      // ... 더 많은 임시 데이터
    ],
    daily: [
      {
        completeFlag: false,
        completeTime: null,
        title: "이빨닦기",
        content: "열심히 이빨을 닦아봅시다",
        type: "daily",
        exp: 10,
        level: 1
      },
      // ... 더 많은 임시 데이터
    ]
  };
  
  useEffect(() => {
    async function fetchMissions() {
      try {
        // API 호출 시도
        const [typicalResponse, dailyResponse] = await Promise.all([
          api.get('/api/v1/mission/todayTypical'),
          api.get('/api/v1/mission/todayDaily')
        ]);
  
        // 성공 시 실제 데이터 사용
        if (typicalResponse.data.success && dailyResponse.data.success) {
          setMissions({
            typical: typicalResponse.data.data.typicalMission,
            daily: dailyResponse.data.data.dailyMission
          });
        } else {
          throw new Error('서버에서 미션 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('미션 가져오기 실패:', error);
        // 실패 시 임시 데이터 사용
        setMissions(tempMissions);
        setError('서버에서 미션을 불러오는 데 실패했습니다. 임시 데이터를 표시합니다.');
      }
    }
  
    fetchMissions();
  }, [setMissions]);

  const handleComplete = async (type, mission, index) => {
    try {
      await api.post('/api/v1/mission/complete', { 
        missionId: mission.id,
        type: type
      });
      completeMission(type, index);
    } catch (error) {
      console.error('미션 완료 처리 실패:', error);
      setError('미션 완료 처리에 실패했습니다. 다시 시도해 주세요.');
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

  const completedMissionsCount = 
    (missions.daily?.filter(m => m.completeFlag).length || 0) + 
    (missions.typical?.filter(m => m.completeFlag).length || 0);
  const totalMissionsCount = (missions.daily?.length || 0) + (missions.typical?.length || 0);
  const remainingMissions = totalMissionsCount - completedMissionsCount;

  const testExp = totalMissionsCount > 0 ? (completedMissionsCount / totalMissionsCount) * 100 : 0;

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className='scroll'>
      <div className="container mx-auto p-4" id='MissionPage'>
        <div className='charCard'>
          <img src={char} alt="Character" />
          <div className='charCard-r'>
            <div id='EXP-bar'>
              <p>{completedMissionsCount} / {totalMissionsCount}</p>
              <div id='EXP' style={{width: `${testExp}%`}}></div>
            </div>
            <div>
              <p>오늘 완수한 미션은 {completedMissionsCount}개야!</p>
              <p>앞으로 {remainingMissions}개만 더 하면 끝! 파이팅해보자</p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold my-4">특별 미션</h2>
        {renderMissions('typical')}

        <h2 className="text-2xl font-bold mb-4">데일리 미션</h2>
        {renderMissions('daily')}
      </div>
    </div>
  );
}

export default MissionPage;