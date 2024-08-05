# backend/ondo/Dockerfile

FROM openjdk:17.0.1-jdk

WORKDIR /app

# JAR 파일 복사
COPY build/libs/*.jar app.jar

# 설정 파일 복사 (Jenkins에서 복사할 예정)
COPY ./src/main/resources/openaiapi.properties /app/src/main/resources/openaiapi.properties

ENTRYPOINT ["java", "-jar", "app.jar"]
