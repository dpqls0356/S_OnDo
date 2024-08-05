# backend/ondo/Dockerfile

FROM openjdk:17.0.1-jdk

WORKDIR /app

# JAR 파일 복사
COPY build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
