# 1단계: Node.js 이미지를 사용하여 빌드 수행
FROM node:14-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사하고 의존성을 설치
COPY package*.json ./
RUN npm install

# 소스 코드를 복사하고 빌드 수행
COPY . .
RUN npm run build

# 2단계: Nginx 이미지를 사용하여 정적 파일 제공
FROM nginx:alpine

# 빌드된 파일을 Nginx의 기본 정적 파일 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html
