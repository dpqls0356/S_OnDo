import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMissionStore from "../../../store/app/MissionStore";
import MissionButton from "../../../components/app/MissionButton";
import char from "./../../../assets/images/test_chara.png";
import "./Mission.css";
// 테스트 데이터 -> 완료 잘 체크되는거 확인 완료
// const dummyMissions = {
//   typical: [
//     { id: 1, title: "20분 산책하기", content: "집 근처 공원을 20분 동안 산책하세요", type: "typical", exp: 30, level: 1, completeFlag: false },
//     { id: 2, title: "물 2L 마시기", content: "하루 동안 물을 2L 마시세요", type: "typical", exp: 20, level: 1, completeFlag: false },
//     { id: 3, title: "새로운 요리 해보기", content: "한 번도 해보지 않은 요리를 만들어보세요", type: "typical", exp: 40, level: 2, completeFlag: false },
//   ],
//   daily: [
//     { id: 4, title: "아침 식사하기", content: "건강한 아침 식사로 하루를 시작하세요", type: "daily", exp: 10, level: 1, completeFlag: false },
//     { id: 5, title: "일기 쓰기", content: "오늘 하루를 돌아보며 일기를 작성하세요", type: "daily", exp: 15, level: 1, completeFlag: false },
//   ]
// };

const baseUrl = import.meta.env.VITE_BASE_URL;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// 요청 확인 -> 응답 전체 인터셉트
// api.interceptors.response.use(response => {
//   console.log('Full API Response:', JSON.stringify(response.data, null, 2));
//   return response;
// }, error => {
//   console.error('API Error:', error);
//   return Promise.reject(error);
// });

function MissionPage() {
  const nav = useNavigate();
  const { missions, setMissions, completeMission } = useMissionStore();
  const [error, setError] = useState(null);

  // 미션 상태 변경될때마다 콘솔
  // useEffect(() => {
  //   console.log('Current missions state:', missions);
  // }, [missions]);
  // console.log('Missions at render : ', missions)

  useEffect(() => {
    async function fetchMissions() {
      try {
        const [typicalResponse, dailyResponse] = await Promise.all([
          api.get("/mission/todayTypical"),
          api.get("/mission/todayDaily"),
        ]);

        // api 응답 전체 구조 콘솔
        // console.log('Typical Response:', typicalResponse.data);
        // console.log('Daily Response:', dailyResponse.data);

        // setMissions 함수 호출 확인
        if (typicalResponse.data.success && dailyResponse.data.success) {
          // console.log('Typical missions:', typicalResponse.data.data.typicalMission);
          // console.log('Daily missions:', dailyResponse.data.data.dailyMission);

          const newMissions = {
            typical: typicalResponse.data.data.typicalMission || [],
            daily: dailyResponse.data.data.dailyMission || [],
          };
          // console.log('New missions before setting:', newMissions);
          setMissions(newMissions);
        } else {
          throw new Error("서버에서 미션 데이터를 가져오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("미션 가져오기 실패:", error);
        setError(
          "미션을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    }

    fetchMissions();
  }, [setMissions]);

  // 캐릭터 카드 클릭시, 완료된 미션 조회
  const handleCharCardClick = () => {
    nav("/member/mission/completed");
  };

  const handleComplete = async (type, mission, index) => {
    try {
      const response = await api.post("/mission/complete", {
        title: mission.title,
      });

      if (response.data.success) {
        completeMission(type, index);
        console.log(response.data.message);
      } else {
        throw new Error("서버에서 미션 완료 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("미션 완료 처리 실패:", error);
      setError("미션 완료 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const renderMissions = (type) => {
    // 미션 배열 길이 확인
    // console.log(`Rendering ${type} missions:`, missions[type]);

    const sortedMissions = [...missions[type]].sort((a, b) => {
      if (a.completeFlag === b.completeFlag) {
        return type === "typical" ? -1 : 1;
      }
      return b.completeFlag - a.completeFlag;
    });

    return (
      <div className="space-y-4">
        {sortedMissions.map((mission, index) => (
          <MissionButton
            key={mission.id}
            mission={mission}
            onComplete={() => handleComplete(type, mission, index)}
            isCompleted={mission.completeFlag}
            missionType={type}
          />
        ))}
      </div>
    );
  };

  const completedMissionsCount =
    missions.daily.filter((m) => m.completeFlag).length +
    missions.typical.filter((m) => m.completeFlag).length;
  const totalMissionsCount = missions.daily.length + missions.typical.length;
  const remainingMissions = totalMissionsCount - completedMissionsCount;
  const testExp =
    totalMissionsCount > 0
      ? (completedMissionsCount / totalMissionsCount) * 100
      : 0;

  return (
    <div className="scroll">
      <div className="container  p-4" id="MissionPage">
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <div
          className="charCard"
          onClick={handleCharCardClick}
          style={{ cursor: "pointer" }}
        >
          <img src={char} alt="Character" />
          <div className="charCard-r">
            <div id="EXP-bar">
              <p>
                {completedMissionsCount} / {totalMissionsCount}
              </p>
              <div id="EXP" style={{ width: `${testExp}%` }}></div>
            </div>
            <div>
              <p>오늘 완수한 미션은 {completedMissionsCount}개야!</p>
              <p>앞으로 {remainingMissions}개만 더 하면 끝! 파이팅해보자</p>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", padding: "0px 10px" }}>
          <h2 className="text-2xl font-bold my-4">특별 미션</h2>
          {renderMissions("typical")}
        </div>
        <div style={{ width: "100%", padding: "0px 10px" }}>
          <h2 className="text-2xl font-bold my-4">데일리 미션</h2>
          {renderMissions("daily")}
        </div>
      </div>
    </div>
  );
}

export default MissionPage;

// 테스트 데이터로 돌아가는 거 확인용 코드
// function MissionPage() {
//   const { missions, setMissions, completeMission } = useMissionStore();
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchMissions() {
//       try {
//         const [typicalResponse, dailyResponse] = await Promise.all([
//           api.get('/mission/todayTypical'),
//           api.get('/mission/todayDaily')
//         ]);

//         if (typicalResponse.data.success && dailyResponse.data.success) {
//           setMissions({
//             typical: typicalResponse.data.data.typicalMission,
//             daily: dailyResponse.data.data.dailyMission
//           });
//         } else {
//           throw new Error('서버에서 미션 데이터를 가져오는데 실패했습니다.');
//         }
//       } catch (error) {
//         console.error('미션 가져오기 실패:', error);
//         setError('미션을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.');
//       }
//     }

//     fetchMissions();
//   }, [setMissions]);

//   const handleComplete = async (type, mission, index) => {
//     try {
//       const response = await api.post('/mission/complete', {
//         title: mission.title
//       });

//       if (response.data.success) {
//         completeMission(type, index);
//         console.log(response.data.message);
//       } else {
//         throw new Error('서버에서 미션 완료 처리에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error('미션 완료 처리 실패:', error);
//       setError('미션 완료 처리에 실패했습니다. 다시 시도해 주세요.');
//     }
//   };

//   const renderMissions = (type) => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {missions[type].map((mission, index) => (
//         <MissionButton
//           key={index}
//           mission={mission}
//           onComplete={() => handleComplete(type, mission, index)}
//           isCompleted={mission.completeFlag}
//           missionType={type}
//         />
//       ))}
//     </div>
//   );

//   const completedMissionsCount =
//     missions.daily.filter(m => m.completeFlag).length +
//     missions.typical.filter(m => m.completeFlag).length;
//   const totalMissionsCount = missions.daily.length + missions.typical.length;
//   const remainingMissions = totalMissionsCount - completedMissionsCount;

//   const testExp = totalMissionsCount > 0 ? (completedMissionsCount / totalMissionsCount) * 100 : 0;
