# 3.DB 덤프 파일 최신본

# MySQL

## 상담사

```jsx
-- counselor 테이블 덤프 데이터 생성

INSERT INTO counselor (id, schedule_id, counselor_id, counselor_name, counselor_pw, field, profile_url, self_introduction, gender, role) VALUES
(1, 1001, 'counselor001', '이영희', 'password1', '심리학', NULL, '심리학에 전문적인 상담사입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(2, 1002, 'counselor002', '김철수', 'password2', '치료', NULL, '가족 치료에 특화된 상담사입니다.', 'MALE', 'ROLE_COUNSELOR'),
(3, 1003, 'counselor003', '박민지', 'password3', '심리학', NULL, '아동 심리학을 전문으로 합니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(4, 1004, 'counselor004', '최진우', 'password4', '치료', NULL, '트라우마 치료 전문가입니다.', 'MALE', 'ROLE_COUNSELOR'),
(5, 1005, 'counselor005', '정수연', 'password5', '상담', NULL, '일반 상담 서비스를 제공합니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(6, 1006, 'counselor006', '오성훈', 'password6', '심리학', NULL, '인지 행동 치료에 경험이 많습니다.', 'MALE', 'ROLE_COUNSELOR'),
(7, 1007, 'counselor007', '이서현', 'password7', '치료', NULL, '가족 및 결혼 상담 전문가입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(8, 1008, 'counselor008', '한지훈', 'password8', '심리학', NULL, '불안 장애 치료에 특화되어 있습니다.', 'MALE', 'ROLE_COUNSELOR'),
(9, 1009, 'counselor009', '김하나', 'password9', '치료', NULL, '슬픔 상담 전문가입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(10, 1010, 'counselor010', '이동수', 'password10', '상담', NULL, '정신 건강 상담에 전문적입니다.', 'MALE', 'ROLE_COUNSELOR'),
(11, 1011, 'counselor011', '송민아', 'password11', '심리학', NULL, '불면증 치료 전문가입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(12, 1012, 'counselor012', '정호준', 'password12', '치료', NULL, '직업 상담 전문가입니다.', 'MALE', 'ROLE_COUNSELOR'),
(13, 1013, 'counselor013', '배수진', 'password13', '상담', NULL, '부부 상담 전문가입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(14, 1014, 'counselor014', '이준혁', 'password14', '심리학', NULL, '우울증 치료 전문가입니다.', 'MALE', 'ROLE_COUNSELOR'),
(15, 1015, 'counselor015', '김지수', 'password15', '치료', NULL, '스트레스 관리 상담사입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(16, 1016, 'counselor016', '오하늘', 'password16', '상담', NULL, '청소년 상담에 전문적입니다.', 'MALE', 'ROLE_COUNSELOR'),
(17, 1017, 'counselor017', '최유진', 'password17', '심리학', NULL, '인지 심리학 전문가입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(18, 1018, 'counselor018', '강민호', 'password18', '치료', NULL, '의존성 문제 치료 전문가입니다.', 'MALE', 'ROLE_COUNSELOR'),
(19, 1019, 'counselor019', '이지혜', 'password19', '상담', NULL, '성격 장애 상담 전문가입니다.', 'FEMALE', 'ROLE_COUNSELOR'),
(20, 1020, 'counselor020', '김동현', 'password20', '심리학', NULL, '심리 분석에 특화되어 있습니다.', 'MALE', 'ROLE_COUNSELOR');

```

## 멤버

- 단 회원가입 후 스토리가 진행되며 그 스토리 내에서 캐릭터 이름이 지정되기에(단순히 멤버 덤프데이터를 넣을 경우 디폴트 값으로 캐릭터 이름이 지정됩니다.) 회원가입은 가급적 집적 부탁드립니다. ( 귀여운 스토리가 포함되어있습니다.)

```jsx

-- member 테이블 덤프 데이터 생성

INSERT INTO member (birth_date, join_date, character_id, member_id, email, member_name, member_pw, nick_name, profile_url, gender, role) VALUES
('1990-05-14', '2024-08-01', 1, 1, 'member1@example.com', '이영희', 'password1', 'coolgirl', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'FEMALE', 'ROLE_MEMBER'),
('1985-07-20', '2024-08-02', 2, 2, 'member2@example.com', '김철수', 'password2', 'happyguy', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'MALE', 'ROLE_MEMBER'),
('1992-11-30', '2024-08-03', 3, 3, 'member3@example.com', '박민지', 'password3', 'starshine', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'FEMALE', 'ROLE_MEMBER'),
('1988-01-15', '2024-08-04', 4, 4, 'member4@example.com', '최진우', 'password4', 'windrunner', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'MALE', 'ROLE_MEMBER'),
('1995-03-22', '2024-08-05', 5, 5, 'member5@example.com', '정수연', 'password5', 'sunnyday', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'FEMALE', 'ROLE_MEMBER'),
('1989-12-11', '2024-08-06', 6, 6, 'member6@example.com', '오성훈', 'password6', 'bluesky', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'MALE', 'ROLE_MEMBER'),
('1993-08-25', '2024-08-07', 7, 7, 'member7@example.com', '이서현', 'password7', 'dreamer', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'FEMALE', 'ROLE_MEMBER'),
('1996-10-02', '2024-08-08', 8, 8, 'member8@example.com', '한지훈', 'password8', 'luckyone', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'MALE', 'ROLE_MEMBER'),
('1987-06-16', '2024-08-09', 9, 9, 'member9@example.com', '김하나', 'password9', 'rainbow', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'FEMALE', 'ROLE_MEMBER'),
('1994-09-18', '2024-08-10', 10, 10, 'member10@example.com', '이동수', 'password10', 'nightowl', 'https://d1kbrt3q8264bl.cloudfront.net/profile.png', 'MALE', 'ROLE_MEMBER');

```

# MongoDB

## 게시판

```jsx
[
  {
    "title": "오늘 날씨가 좋아요!",
    "content": "test",
    "created_at": "2024-08-01T08:10:25.860+00:00",
    "views": 0,
    "member_id": "1",
    "imageUrl": [],
    "member_name": "coolgirl"
  },
  {
    "title": "새로운 시작!",
    "content": "test",
    "created_at": "2024-08-02T10:15:30.860+00:00",
    "views": 0,
    "member_id": "2",
    "imageUrl": [],
    "member_name": "happyguy"
  },
  {
    "title": "여름이 끝나가네요",
    "content": "test",
    "created_at": "2024-08-03T12:20:35.860+00:00",
    "views": 0,
    "member_id": "3",
    "imageUrl": [],
    "member_name": "starshine"
  },
  {
    "title": "맛있는 점심!",
    "content": "test",
    "created_at": "2024-08-04T14:25:40.860+00:00",
    "views": 0,
    "member_id": "4",
    "imageUrl": [],
    "member_name": "windrunner"
  },
  {
    "title": "주말이 다가옵니다",
    "content": "test",
    "created_at": "2024-08-05T16:30:45.860+00:00",
    "views": 0,
    "member_id": "5",
    "imageUrl": [],
    "member_name": "sunnyday"
  },
  {
    "title": "좋은 하루 되세요!",
    "content": "test",
    "created_at": "2024-08-06T18:35:50.860+00:00",
    "views": 0,
    "member_id": "6",
    "imageUrl": [],
    "member_name": "bluesky"
  },
  {
    "title": "새로운 도전!",
    "content": "test",
    "created_at": "2024-08-07T20:40:55.860+00:00",
    "views": 0,
    "member_id": "7",
    "imageUrl": [],
    "member_name": "dreamer"
  },
  {
    "title": "오늘도 화이팅!",
    "content": "test",
    "created_at": "2024-08-08T22:45:00.860+00:00",
    "views": 0,
    "member_id": "8",
    "imageUrl": [],
    "member_name": "luckyone"
  },
  {
    "title": "아, 즐겁다 ~~",
    "content": "test",
    "created_at": "2024-08-09T02:09:25.860+00:00",
    "views": 0,
    "member_id": "9",
    "imageUrl": [],
    "member_name": "rainbow"
  },
  {
    "title": "꿈을 향해 달리자!",
    "content": "test",
    "created_at": "2024-08-10T04:15:30.860+00:00",
    "views": 0,
    "member_id": "10",
    "imageUrl": [],
    "member_name": "nightowl"
  },
  {
    "title": "커피 한잔의 여유",
    "content": "test",
    "created_at": "2024-08-11T06:20:35.860+00:00",
    "views": 0,
    "member_id": "1",
    "imageUrl": [],
    "member_name": "coolgirl"
  },
  {
    "title": "산책하기 좋은 날",
    "content": "test",
    "created_at": "2024-08-12T08:25:40.860+00:00",
    "views": 0,
    "member_id": "2",
    "imageUrl": [],
    "member_name": "happyguy"
  },
  {
    "title": "바쁜 하루였어요",
    "content": "test",
    "created_at": "2024-08-13T10:30:45.860+00:00",
    "views": 0,
    "member_id": "3",
    "imageUrl": [],
    "member_name": "starshine"
  },
  {
    "title": "저녁 노을이 예뻐요",
    "content": "test",
    "created_at": "2024-08-14T12:35:50.860+00:00",
    "views": 0,
    "member_id": "4",
    "imageUrl": [],
    "member_name": "windrunner"
  },
  {
    "title": "여름밤의 선선한 바람",
    "content": "test",
    "created_at": "2024-08-15T14:40:55.860+00:00",
    "views": 0,
    "member_id": "5",
    "imageUrl": [],
    "member_name": "sunnyday"
  },
  {
    "title": "이제 가을인가봐요",
    "content": "test",
    "created_at": "2024-08-16T16:45:00.860+00:00",
    "views": 0,
    "member_id": "6",
    "imageUrl": [],
    "member_name": "bluesky"
  },
  {
    "title": "새로운 프로젝트 시작",
    "content": "test",
    "created_at": "2024-08-01T18:50:05.860+00:00",
    "views": 0,
    "member_id": "7",
    "imageUrl": [],
    "member_name": "dreamer"
  },
  {
    "title": "아이디어가 떠올랐어요",
    "content": "test",
    "created_at": "2024-08-02T20:55:10.860+00:00",
    "views": 0,
    "member_id": "8",
    "imageUrl": [],
    "member_name": "luckyone"
  },
  {
    "title": "피곤하지만 보람찬 하루",
    "content": "test",
    "created_at": "2024-08-03T22:00:15.860+00:00",
    "views": 0,
    "member_id": "9",
    "imageUrl": [],
    "member_name": "rainbow"
  },
  {
    "title": "밤 하늘의 별을 보며",
    "content": "test",
    "created_at": "2024-08-04T00:05:20.860+00:00",
    "views": 0,
    "member_id": "10",
    "imageUrl": [],
    "member_name": "nightowl"
  },
  {
    "title": "오늘의 작은 성취",
    "content": "test",
    "created_at": "2024-08-05T02:10:25.860+00:00",
    "views": 0,
    "member_id": "1",
    "imageUrl": [],
    "member_name": "coolgirl"
  },
  {
    "title": "맛있는 저녁을 먹었어요",
    "content": "test",
    "created_at": "2024-08-06T04:15:30.860+00:00",
    "views": 0,
    "member_id": "2",
    "imageUrl": [],
    "member_name": "happyguy"
  },
  {
    "title": "달콤한 디저트 추천",
    "content": "test",
    "created_at": "2024-08-07T06:20:35.860+00:00",
    "views": 0,
    "member_id": "3",
    "imageUrl": [],
    "member_name": "starshine"
  },
  {
    "title": "좋은 노래를 들었어요",
    "content": "test",
    "created_at": "2024-08-08T08:25:40.860+00:00",
    "views": 0,
    "member_id": "4",
    "imageUrl": [],
    "member_name": "windrunner"
  },
  {
    "title": "친구들과 즐거운 시간",
    "content": "test",
    "created_at": "2024-08-09T10:30:45.860+00:00",
    "views": 0,
    "member_id": "5",
    "imageUrl": [],
    "member_name": "sunnyday"
  },
  {
    "title": "소소한 일상의 행복",
    "content": "test",
    "created_at": "2024-08-10T12:35:50.860+00:00",
    "views": 0,
    "member_id": "6",
    "imageUrl": [],
    "member_name": "bluesky"
  },
  {
    "title": "책 읽는 즐거움",
    "content": "test",
    "created_at": "2024-08-11T14:40:55.860+00:00",
    "views": 0,
    "member_id": "7",
    "imageUrl": [],
    "member_name": "dreamer"
  },
  {
    "title": "오늘은 조금 쉬는 날",
    "content": "test",
    "created_at": "2024-08-12T16:45:00.860+00:00",
    "views": 0,
    "member_id": "8",
    "imageUrl": [],
    "member_name": "luckyone"
  },
  {
    "title": "산책하며 생각한 것들",
    "content": "test",
    "created_at": "2024-08-13T18:50:05.860+00:00",
    "views": 0,
    "member_id": "9",
    "imageUrl": [],
    "member_name": "rainbow"
  },
  {
    "title": "하루를 마무리하며",
    "content": "test",
    "created_at": "2024-08-14T20:55:10.860+00:00",
    "views": 0,
    "member_id": "10",
    "imageUrl": [],
    "member_name": "nightowl"
  }
]

```

## 미션 실제 내용(MissionDetail)

```jsx
[{
  "_id": {
    "$oid": "66b991a86f09649e56df8bde"
  },
  "title": "환기",
  "content": "방 안의 공기를 신선하게 유지하기 위해 창문을 열어 환기를 시켜보세요.",
  "type": "typical",
  "exp": 10,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8bdf"
  },
  "title": "좋아하는 음악 듣기",
  "content": "좋아하는 음악을 들으며 마음의 안정을 찾아보세요.",
  "type": "typical",
  "exp": 10,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be0"
  },
  "title": "시 한 편 읽기",
  "content": "짧은 시 한 편을 읽어보세요. 감성을 자극하는 시는 마음을 풍요롭게 합니다.",
  "type": "typical",
  "exp": 10,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be1"
  },
  "title": "집에서 영화보기",
  "content": "편안한 환경에서 좋아하는 영화를 감상해보세요.",
  "type": "typical",
  "exp": 10,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be2"
  },
  "title": "좋아하는 문장 탐색해보기",
  "content": "책, 인터넷, 영화 등에서 마음에 드는 문장을 찾아보고 기록해보세요.",
  "type": "typical",
  "exp": 20,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be3"
  },
  "title": "퍼즐 맞추기",
  "content": "간단한 퍼즐 게임을 풀어보세요. 퍼즐은 두뇌를 자극하고 집중력을 향상시킵니다.",
  "type": "typical",
  "exp": 20,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be4"
  },
  "title": "간단한 스트레칭하기",
  "content": "집에서 쉽게 할 수 있는 스트레칭을 통해 몸의 긴장을 풀어보세요.",
  "type": "typical",
  "exp": 20,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be5"
  },
  "title": "집에서 한 챕터 이상 책 읽기",
  "content": "관심 있는 책을 한 챕터 이상 읽어보세요.",
  "type": "typical",
  "exp": 30,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be6"
  },
  "title": "감사일기 쓰기",
  "content": "하루 동안 감사했던 일들을 일기에 기록해보세요.",
  "type": "typical",
  "exp": 30,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be7"
  },
  "title": "명상하기",
  "content": "짧은 시간이라도 명상을 통해 마음을 가다듬어보세요. 유튜브 등의 가이드 영상을 참고하면 좋습니다.",
  "type": "typical",
  "exp": 30,
  "level": 1
},
{
  "_id": {
    "$oid": "66b991a86f09649e56df8be8"
  },
  "title": "계단 오르기",
  "content": "엘리베이터 대신 계단을 이용해 운동을 해보세요.",
  "type": "typical",
  "exp": 30,
  "level": 1
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf1"
  },
  "title": "홈트하기",
  "content": "집에서 할 수 있는 간단한 홈트레이닝을 시작해보세요.",
  "type": "typical",
  "exp": 40,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf2"
  },
  "title": "커뮤니티 글 쓰기",
  "content": "온라인 커뮤니티에 글을 작성해보세요. 자신의 생각이나 일상을 나누는 것도 좋은 방법입니다.",
  "type": "typical",
  "exp": 40,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf3"
  },
  "title": "청소하기",
  "content": "방이나 집의 한 구석을 청소해보세요. 청소를 통해 주변을 정돈하면 마음도 가벼워질 것입니다.",
  "type": "typical",
  "exp": 40,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf4"
  },
  "title": "관심있는 주제 온라인 강의 수강하기",
  "content": "관심 있는 주제의 온라인 강의를 찾아 수강해보세요.",
  "type": "typical",
  "exp": 50,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf5"
  },
  "title": "산책",
  "content": "근처 공원이나 동네를 짧게 산책해보세요. 신선한 공기가 좋습니다.",
  "type": "typical",
  "exp": 50,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf6"
  },
  "title": "가족이나 친구에게 안부묻기",
  "content": "가족이나 친구에게 전화나 메시지로 안부를 물어보세요. 작은 소통도 큰 힘이 됩니다.",
  "type": "typical",
  "exp": 60,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf7"
  },
  "title": "마트 구경가기",
  "content": "가까운 마트에 가서 필요한 물건을 구경해보세요.",
  "type": "typical",
  "exp": 60,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992066f09649e56df8bf8"
  },
  "title": "카페가기",
  "content": "가까운 카페에 가서 좋아하는 음료를 즐겨보세요. 사람들과의 소통도 좋습니다.",
  "type": "typical",
  "exp": 60,
  "level": 2
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bf9"
  },
  "title": "좋아하는 음식 만들어 먹기",
  "content": "집에서 좋아하는 음식을 만들어보세요.",
  "type": "typical",
  "exp": 70,
  "level": 3
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bfa"
  },
  "title": "도서관에 방문해 책 대여하기",
  "content": "도서관을 방문하여 책을 대여해보세요. 다양한 책들을 집에서 즐길 수 있습니다.",
  "type": "typical",
  "exp": 80,
  "level": 3
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bfb"
  },
  "title": "도서관 방문해 독서하기",
  "content": "도서관을 방문하여 책을 읽어보세요. 새로운 환경에서의 독서는 색다른 경험을 줍니다.",
  "type": "typical",
  "exp": 90,
  "level": 3
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bfc"
  },
  "title": "자기소개서 작성하기",
  "content": "자기소개서를 작성하여 자신을 표현해보세요. 잘 작성된 자기소개서는 많은 기회를 열어줍니다.",
  "type": "typical",
  "exp": 100,
  "level": 3
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bfd"
  },
  "title": "입사 지원하기",
  "content": "관심 있는 회사에 입사 지원서를 제출해보세요.",
  "type": "typical",
  "exp": 100,
  "level": 3
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bfe"
  },
  "title": "상담신청하기",
  "content": "필요한 상담을 신청하여 도움을 받아보세요. 전화, 온라인, 대면 등 다양한 방법이 있습니다.",
  "type": "typical",
  "exp": 100,
  "level": 3
},
{
  "_id": {
    "$oid": "66b992fa6f09649e56df8bff"
  },
  "title": "영화관 방문해 영화보기",
  "content": "영화관에서 보고 싶은 영화를 관람해보세요. 큰 스크린에서의 감상은 특별한 경험을 제공합니다.",
  "type": "typical",
  "exp": 100,
  "level": 3
},
{
  "_id": {
    "$oid": "66b9935d6f09649e56df8c00"
  },
  "title": "취업 지원 센터 방문하기",
  "content": "취업 지원 센터를 방문하여 필요한 도움을 받아보세요. 다양한 정보와 지원을 받을 수 있습니다.",
  "type": "typical",
  "exp": 100,
  "level": 4
},
{
  "_id": {
    "$oid": "66b9935d6f09649e56df8c01"
  },
  "title": "봉사활동 하기",
  "content": "지역 사회에서 봉사활동을 해보세요. 작은 도움이라도 큰 보람을 느낄 수 있습니다.",
  "type": "typical",
  "exp": 120,
  "level": 4
},
{
  "_id": {
    "$oid": "66b9935d6f09649e56df8c02"
  },
  "title": "자격증 취득하기",
  "content": "관심 있는 분야의 자격증을 준비하여 취득해보세요.",
  "type": "typical",
  "exp": 150,
  "level": 4
},
{
  "_id": {
    "$oid": "66b994ee6f09649e56df8c03"
  },
  "title": "기상 후 이부자리 정리하기",
  "content": "아침에 일어나자마자 이부자리를 정리하여 하루를 상쾌하게 시작해보세요.",
  "type": "daily",
  "exp": 10,
  "level": 5
},
{
  "_id": {
    "$oid": "66b994ee6f09649e56df8c04"
  },
  "title": "세수하고 씻기",
  "content": "아침에 세수하고 씻으며 상쾌하게 하루를 시작해보세요.",
  "type": "daily",
  "exp": 10,
  "level": 5
},
{
  "_id": {
    "$oid": "66b994ee6f09649e56df8c05"
  },
  "title": "아침 식사하고 양치하기",
  "content": "아침 식사 후 양치질을 하여 입안을 깨끗하게 유지하세요.",
  "type": "daily",
  "exp": 10,
  "level": 5
},
{
  "_id": {
    "$oid": "66b994ee6f09649e56df8c06"
  },
  "title": "점심 식사하고 양치도 잊지 않기",
  "content": "점심 식사 후에도 양치질을 하여 치아 건강을 챙기세요.",
  "type": "daily",
  "exp": 10,
  "level": 5
},
{
  "_id": {
    "$oid": "66b994ee6f09649e56df8c07"
  },
  "title": "저녁 식사하고 양치도 깨끗이 하기",
  "content": "저녁 식사 후 양치질을 하여 하루를 깔끔하게 마무리하세요.",
  "type": "daily",
  "exp": 10,
  "level": 5
},
{
  "_id": {
    "$oid": "66b994ee6f09649e56df8c08"
  },
  "title": "샤워하기",
  "content": "하루의 피로를 씻어내는 샤워를 통해 상쾌한 기분을 유지하세요.",
  "type": "daily",
  "exp": 10,
  "level": 5
}]
```

## 댓글

댓글의 경우 게시된 글의 고유값이 필요하고 고유값은 게시글이 생성되면서 할당되기에 댓글의 덤프데이터 생성이 어렵습니다.