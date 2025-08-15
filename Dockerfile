FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/promeet.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
