// useEffect와 useRef 훅을 사용하기 위해 React에서 import
import { useEffect, useRef } from 'react';

// OpenViduVideoComponent 컴포넌트 정의
const OpenViduVideoComponent = ({ streamManager }) => {
    // videoRef를 선언하고 초기화, useRef 훅을 사용하여 DOM 요소에 직접 접근 가능
    const videoRef = useRef(null);

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때와 streamManager가 변경될 때 실행
    useEffect(() => {
        // streamManager와 videoRef가 모두 존재하는 경우
        if (streamManager && videoRef.current) {
            // streamManager의 addVideoElement 메서드를 호출하여 비디오 요소를 추가
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]); // streamManager가 변경될 때마다 이 효과를 다시 실행

    // 비디오 요소를 반환, autoPlay 속성을 사용하여 자동 재생, ref 속성을 videoRef에 연결
    return <video autoPlay ref={videoRef} />;
};

// OpenViduVideoComponent 컴포넌트를 기본 내보내기로 설정
export default OpenViduVideoComponent;
