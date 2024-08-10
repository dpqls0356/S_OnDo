import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserVideoComponent from "./components/counseling/openVideoComponent";
import LoadingComponent from "./components/counseling/loadingComponent";
import PreJoinComponent from "./components/counseling/preJoinComponent";
import {
  faMicrophoneSlash,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "./components/counseling/sidebarComponent";
import useAuthStore from "../../store/app/authStore";

const View = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  @media (max-width: 360px) {
    & {
      width: 360px; /* 화면 너비가 360px 이하일 때 width 값 */
      height: 100vh;
    }
  }
`;
const WebCamView = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000000;
`;
const VideoView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #main-video {
    padding: 10px;
    border-radius: 50px;
    border: 5px solid yellow;
  }
  video,
  canvas {
    border-radius: 50px;
  }

  @media (max-width: 360px) {
    padding: 0px 10px;
    & {
      width: 360px; /* 화면 너비가 360px 이하일 때 width 값 */
      height: 90vh;
      display: flex;
      flex-direction: column;
    }
  }
`;
const Nav = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
  button {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0px 5px;
    color: white;
    background-color: #333333;
    & > div > svg {
      color: white;
    }
    &:nth-child(3) {
      background-color: #f83d39;
    }
  }
`;

const baseUrl = import.meta.env.VITE_BASE_URL;
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : baseUrl;

const CounselingRoom = () => {
  const { role } = useAuthStore((state) => ({
    role: state.role,
  }));

  const [filterEnabled, setFilterEnabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = location.state.sessionId;
  const reservationId = location.state.reservationId;
  const memberId = location.state.memberId;
  const [memberInfo, setMemberInfo] = useState({});

  const [preJoin, setPreJoin] = useState(true);

  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscriber, setSubscriber] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [micStatus, setMicStatus] = useState(true);
  const [cameraStatus, setCameraStatus] = useState(true);

  const joinSession = useCallback(
    async (micStatus, cameraStatus) => {
      const OV = new OpenVidu();
      const mySession = OV.initSession();

      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscriber(subscriber);
      });

      mySession.on("streamDestroyed", (event) => {
        if (subscriber === event.stream.streamManager) {
          setSubscriber(undefined);
        }
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });
      const token = await getToken(sessionId);

      try {
        await mySession.connect(token);

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: micStatus,
          publishVideo: cameraStatus,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        mySession.publish(publisher);

        const devices = await OV.getDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        const currentVideoDeviceId = publisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        const currentVideoDevice = videoDevices.find(
          (device) => device.deviceId === currentVideoDeviceId
        );

        setSession(mySession);
        setPublisher(publisher);
        setCurrentVideoDevice(currentVideoDevice);
        getMemberInfo();
      } catch (error) {
        console.error("Error initializing publisher:", error);
      }
    },
    [sessionId]
  );

  const getMemberInfo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/counselor/member?memberId=${memberId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMemberInfo(response.data.data.member);
    } catch (e) {
      console.log(e);
    }
  };

  const leaveSession = useCallback(async () => {
    const response = await axios
      .post(
        `${baseUrl}/counseling/sessions/${sessionId}/leave`,
        { reservationId: reservationId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키를 포함하여 요청
        }
      )
      .catch((error) => {
        console.error("Error notifying server about leaving session:", error);
      });
    setSession(undefined);
    setSubscriber(undefined);
    setPublisher(undefined);
    if (role === "USER") {
      navigate("/counseling/list");
    } else {
      navigate("/counselor");
    }
    if (session) {
      session.disconnect();
    }
  }, [session, sessionId]);

  const getToken = async (sessionId) => {
    const response = await axios.post(
      `${baseUrl}/counseling/sessions/${sessionId}/connections`,
      { role: role === "COUNSELOR" ? "counselor" : "user" },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키를 포함하여 요청
      }
    );
    return response.data.data.token;
  };

  const handleJoin = ({ micStatus, cameraStatus }) => {
    setMicStatus(micStatus);
    setCameraStatus(cameraStatus);
    setPreJoin(false);
    joinSession(micStatus, cameraStatus);
  };

  const leaveCounseling = () => {
    //상담사인지 아닌지에 따라 이동해야할 url이 달라짐
    navigate("/counselor");
  };

  const toggleFilter = () => {
    setFilterEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(cameraStatus);
    }
  }, [cameraStatus, publisher]);

  useEffect(() => {
    if (publisher) {
      publisher.publishAudio(micStatus);
    }
  }, [micStatus, publisher]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  return (
    <div>
      {preJoin ? (
        <PreJoinComponent onJoin={handleJoin} />
      ) : session !== undefined ? (
        <View>
          <WebCamView>
            <VideoView>
              {publisher !== undefined ? (
                <div id="main-video" className="col-md-6">
                  <UserVideoComponent
                    streamManager={publisher}
                    filterEnabled={filterEnabled}
                  />
                </div>
              ) : null}
              {subscriber !== undefined ? (
                <div id="sub-video" className="col-md-6">
                  <UserVideoComponent
                    streamManager={subscriber}
                    filterEnabled={filterEnabled}
                  />
                </div>
              ) : null}
            </VideoView>
            <Nav>
              <button onClick={() => setMicStatus(!micStatus)}>
                {micStatus ? (
                  <div>
                    <FontAwesomeIcon icon={faMicrophone} />
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                  </div>
                )}
              </button>
              <button onClick={() => setCameraStatus(!cameraStatus)}>
                {cameraStatus ? (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                      />
                    </svg>
                  </div>
                )}
              </button>
              <button id="buttonLeaveSession" onClick={leaveCounseling}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </button>
              {role === "COUNSELOR" ? (
                <button
                  id="buttonLeaveSession"
                  onClick={() => {
                    leaveSession();
                  }}
                >
                  <div>상담종료</div>
                </button>
              ) : null}
              <button onClick={toggleFilter}>
                <div>필터</div>
              </button>
            </Nav>
          </WebCamView>
          <SideBar memberInfo={memberInfo} />
        </View>
      ) : (
        <LoadingComponent></LoadingComponent>
      )}
    </div>
  );
};

export default CounselingRoom;
