# Quickstart

- Clone Repository
- Start MongoDB via Docker

```
docker run -d -p 27017:27017 -p 28017:28017 --name mongodb dockerfile/mongodb mongod --rest --httpinterface
```

- Configure MongoDB Url in application.yml, i.e. mongodb://127.0.0.1:27017
- Start Spring Boot App

```
mvn spring-boot:run
```

- Open WebApp: http://localhost:8080/


## ToDo

- Update MongoDB to 1.7 (depends on Spring Boot Parent)
- Use Java8 LocalDate instead of java.util.Date
