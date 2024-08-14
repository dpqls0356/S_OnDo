importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAk9W2eCQ5qrmgZv4WvC--1_WuflqeXZ0Y",
  authDomain: "ondo-ffd48.firebaseapp.com",
  projectId: "ondo-ffd48",
  storageBucket: "ondo-ffd48.appspot.com",
  messagingSenderId: "11671201090",
  appId: "1:11671201090:web:8883a7703bea1735ac14db",
  measurementId: "G-E488XVDL6J",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Service Worker에서 알림을 표시하는 코드
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 시 이벤트 리스너
self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // 알림 닫기
});
