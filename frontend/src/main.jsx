import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from 'react-router-dom'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAk9W2eCQ5qrmgZv4WvC--1_WuflqeXZ0Y",
  authDomain: "ondo-ffd48.firebaseapp.com",
  projectId: "ondo-ffd48",
  storageBucket: "ondo-ffd48.appspot.com",
  messagingSenderId: "11671201090",
  appId: "1:11671201090:web:8883a7703bea1735ac14db",
  measurementId: "G-E488XVDL6J",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // 포그라운드에서 알림을 표시하는 코드
  if (Notification.permission === "granted") {
    new Notification(notificationTitle, notificationOptions);
    let notification = new Notification(notificationTitle, {
      // "test" => 제목
      body: notificationOptions, // 메세지
      icon: "/favicon.ico", // 아이콘
    });
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
