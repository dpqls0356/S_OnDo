// OpenViduVideoComponent 컴포넌트를 가져오기 위해 import
import OpenViduVideoComponent from './ovVideo';

// UserVideoComponent 컴포넌트 정의
const UserVideoComponent = ({ streamManager }) => {
    // 사용자의 닉네임을 가져오는 함수
    const getNicknameTag = () => {
        // streamManager의 connection 데이터에서 clientData를 파싱하여 반환
        return JSON.parse(streamManager.stream.connection.data).clientData;
    };

    // 컴포넌트 렌더링
    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent">
                    {/* 닉네임을 표시하는 div */}
                    <div><p>{getNicknameTag()}</p></div>
                    {/* OpenViduVideoComponent에 streamManager를 props로 전달 */}
                    <OpenViduVideoComponent streamManager={streamManager} />
                </div>
            ) : null}
        </div>
    );
};

// UserVideoComponent 컴포넌트를 기본 내보내기로 설정
export default UserVideoComponent;
