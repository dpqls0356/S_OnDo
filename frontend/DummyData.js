// dummyData.js
export const dummyCounselors = [
    { id: 1, name: "김상담", gender: "남", field: "심리상담", intro: "10년 경력의 심리상담 전문가입니다." },
    { id: 2, name: "이치료", gender: "여", field: "가족상담", intro: "가족 문제 해결을 도와드립니다." },
    { id: 3, name: "박멘토", gender: "남", field: "진로상담", intro: "청소년 진로 고민 상담 전문입니다." },
    { id: 4, name: "최힐링", gender: "여", field: "우울증상담", intro: "마음의 평화를 찾아드립니다." },
    { id: 5, name: "정행복", gender: "여", field: "부부상담", intro: "행복한 가정을 만들어드립니다." }
  ];
  
  export const dummyReservations = [
    { id: 1, counselorId: 1, reservationDate: "2024-08-11T14:00:00", detail: "첫 상담 예약" },
    { id: 2, counselorId: 3, reservationDate: "2024-08-15T10:00:00", detail: "진로 고민 상담" }
  ];