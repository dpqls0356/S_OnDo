import { useEffect, useRef, useState } from 'react';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import * as THREE from 'three';

const OpenViduVideoComponent = ({ streamManager, filterEnabled }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [character, setCharacter] = useState(null);
  const [filteredStream, setFilteredStream] = useState(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  useEffect(() => {
    if (filterEnabled && videoRef.current && canvasRef.current) {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext('2d');

      const holistic = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });

      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        refineFaceLandmarks: true,
      });

      holistic.onResults((results) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.faceLandmarks) {
          // 얼굴 랜드마크를 기반으로 3D 캐릭터 매핑
          const faceLandmarks = results.faceLandmarks;
          if (character) {
            const nose = faceLandmarks[1];
            character.position.set(nose.x, nose.y, nose.z);
            character.rotation.set(nose.x, nose.y, nose.z);
          }
        }

        rendererRef.current.render(scene, camera);
        canvasCtx.restore();
      });

      const cam = new Camera(videoElement, {
        onFrame: async () => {
          await holistic.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      cam.start();

      // Three.js 설정
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
      renderer.setSize(640, 480);
      rendererRef.current = renderer;

      // 3D 캐릭터 추가
      const geometry = new THREE.BoxGeometry(); // 기본 큐브 모양 (예시)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const character = new THREE.Mesh(geometry, material);
      scene.add(character);

      setScene(scene);
      setCamera(camera);
      setCharacter(character);

      // 필터된 스트림 생성 및 설정
      const newFilteredStream = canvasElement.captureStream(30);
      setFilteredStream(newFilteredStream);

      // 기존 트랙을 필터된 비디오 트랙으로 교체
      const videoTrack = newFilteredStream.getVideoTracks()[0];
      streamManager.replaceTrack(videoTrack);
    } else if (filteredStream && !filterEnabled) {
      // 필터가 꺼진 경우 원래 트랙으로 복구
      streamManager.replaceTrack(videoRef.current.srcObject.getVideoTracks()[0]);
      setFilteredStream(null);
    }
  }, [filterEnabled, streamManager]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ display: filterEnabled ? 'none' : 'block' }} />
      <canvas ref={canvasRef} style={{ display: filterEnabled ? 'block' : 'none' }} />
    </div>
  );
};

export default OpenViduVideoComponent;
