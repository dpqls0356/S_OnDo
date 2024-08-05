FROM openjdk:17.0.1-jdk

WORKDIR /app

# JAR 파일 복사
COPY build/libs/*.jar app.jar

# 설정 파일 복사
COPY ./src/main/resources/openaiapi.properties /app/src/main/resources/

ENTRYPOINT ["java", "-jar", "app.jar"]
