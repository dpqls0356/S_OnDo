// counselingRoom.jsx
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import UserVideoComponent from "./components/openVideoComponent";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

const CounselingRoom = () => {
  const location = useLocation();
  const sessionId = location.state.sessionId;

  const [myUserName, setMyUserName] = useState("Participant" + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const joinSession = useCallback(
    async () => {
      const OV = new OpenVidu();
      const mySession = OV.initSession();

      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      mySession.on("streamDestroyed", (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((sub) => sub !== event.stream.streamManager)
        );
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      const token = await getToken(sessionId);

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
        setMainStreamManager(publisher);
        setCurrentVideoDevice(currentVideoDevice);
      } catch (error) {
        console.error("Error initializing publisher:", error);
      }
    },
    [myUserName, sessionId]
  );

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    // 서버에 세션 종료 요청 보내기
    axios.post(`${APPLICATION_SERVER_URL}api/sessions/${sessionId}/leave`, {
      user: myUserName
    }).catch(error => {
      console.error("Error notifying server about leaving session:", error);
    });

    setSession(undefined);
    setSubscribers([]);
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
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

        await session.unpublish(mainStreamManager);
        await session.publish(newPublisher);

        setCurrentVideoDevice(newVideoDevice);
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, mainStreamManager, publisher, session]);

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
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  useEffect(() => {
    joinSession();
  }, []);

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{sessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CounselingRoom;
