import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserVideoComponent from "./components/openVideoComponent";
import styled from "styled-components";
import LoadingComponent from "./components/loadingComponent";

const View = styled.div`
  width: 100vw;
  height: 100vh;
`;
const WebCamView = styled.div`
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
  & > .main-video {
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
    background-color: #333333;
    & > svg {
      color: white;
    }
    &:nth-child(3) {
      background-color: #f83d39;
    }
  }
`;
const Info = styled.div``;

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

const CounselingRoom = () => {
  const location = useLocation();
  const sessionId = location.state.sessionId;
  const navigate = useNavigate();
  const [myUserName, setMyUserName] = useState();
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscriber, setSubscriber] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  const joinSession = useCallback(async () => {
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
    console.log("session: " + sessionId);
    const token = await getToken(sessionId);
    console.log("token: " + token);

    try {
      await mySession.connect(token, { clientData: myUserName });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());

      const publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
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
    } catch (error) {
      console.error("Error initializing publisher:", error);
    }
  }, [myUserName, sessionId]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    axios
      .post(
        `${APPLICATION_SERVER_URL}/api/v1/counseling/sessions/${sessionId}/leave`,
        { user: myUserName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.error("Error notifying server about leaving session:", error);
      });

    setSession(undefined);
    setSubscriber(undefined);
    setPublisher(undefined);
    navigate("/counselor");
  }, [session, sessionId, myUserName]);

  const switchCamera = useCallback(async () => {
    if (!publisher || !session) return;

    try {
      const devices = await OpenVidu.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        )[0];

        const newPublisher = OpenVidu.initPublisher(undefined, {
          videoSource: newVideoDevice.deviceId,
          publishAudio: false,
          publishVideo: true,
          mirror: true,
        });

        await session.unpublish(publisher);
        await session.publish(newPublisher);

        setCurrentVideoDevice(newVideoDevice);
        setPublisher(newPublisher);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, publisher, session]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}/api/v1/counseling/sessions/${sessionId}/connections`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.data.token; // token 값을 직접 반환
  };

  useEffect(() => {
    joinSession();
  }, [joinSession]);

  return (
    <div>
      {session !== undefined ? (
        <View>
          <WebCamView>
            <VideoView>
              {publisher !== undefined ? (
                <div id="main-video" className="col-md-6">
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscriber !== undefined ? (
                <div id="sub-video" className="col-md-6">
                  <UserVideoComponent streamManager={subscriber} />
                </div>
              ) : null}
            </VideoView>
            <Nav>
              <button>
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
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              </button>
              <button id="buttonSwitchCamera" onClick={switchCamera}>
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
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </button>
              <button id="buttonLeaveSession" onClick={leaveSession}>
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Nav>
          </WebCamView>
          {/* 상담사일때만 보이도록 해야함 */}
          {true ? <div></div> : null}
          {true ? <Info></Info> : null}
        </View>
      ) : (
        <LoadingComponent></LoadingComponent>
      )}
    </div>
  );
};

export default CounselingRoom;
