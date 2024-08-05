FROM openjdk:17.0.1-jdk

WORKDIR /app

COPY build/libs/*.jar app.jar

COPY ./openaiapi.properties /app/src/main/resources/

ENTRYPOINT ["java", "-jar", "app.jar"]
