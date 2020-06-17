---
title: "Redis with Spring Boot"
date: 2019-01-31
tags: 
  - redis
  - java
  - database
  - spring
---

Redis is an in-memory data store. It is mainly used for caching and is blazingly fast due to its in-memory disposition. Spring Data Redis provides very easy configuration to setup Redis with a Spring Boot application. Hence I will show you the very minimum things that you need to do to build a web application with Redis. We will use maven to build the application, and also docker-compose to build the basic infrastructure with Redis.

The full project (a basic spring-boot app with redis) can be viewed or cloned from [Github](https://github.com/amaljoyc/boot-redis).

### Maven Dependency

You need to include two important dependencies in order to integrate Redis with a spring app as listed below,
1. spring-boot-starter-data-redis
2. jedis

You need to add the below into your project's pom.xml

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>redis.clients</groupId>
  <artifactId>jedis</artifactId>
  <version>2.9.0</version>
</dependency>
```

### Bean Configuration

You need to create a bean for JedisConnectionFactory. It is used for creating Jedis based connections. Spring data supports three kinds of Configuration as listed below,
1. RedisStandaloneConfiguration
2. RedisSentinelConfiguration
3. RedisClusterConfiguration

RedisStandaloneConfiguration is the simplest with just a `host:port` connection to the Redis Server. If your Redis is configured with a Sentinel in order to provide high available accesses, you can use the RedisSentinelConfiguration. Similarly, the RedisClusterConfiguration is for clustered Redis connections.

A sample bean for JedisConnectionFactory with Pool Configuration and RedisStandaloneConfiguration is as below,

```java
@Bean
JedisConnectionFactory jedisConnectionFactory() {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(properties.getPool().getMaxTotal());
        poolConfig.setMaxIdle(properties.getPool().getMaxIdle());
        poolConfig.setMinIdle(properties.getPool().getMinIdle());
        poolConfig.setTestOnBorrow(properties.getPool().getTestOnBorrow());

        JedisClientConfiguration clientConfig = JedisClientConfiguration.builder()
                .usePooling().poolConfig(poolConfig)
                .build();

        RedisStandaloneConfiguration standaloneConfig = new RedisStandaloneConfiguration(
                properties.getHost(), properties.getPort());
        RedisPassword redisPassword = RedisPassword.of(properties.getPassword());
        standaloneConfig.setPassword(redisPassword);

        JedisConnectionFactory factory = new JedisConnectionFactory(standaloneConfig, clientConfig);
        return factory;
}
```

### Aggregate & Repository

In order to further store the data in Redis, Spring Data Redis supports the use of Aggregates & Repositories similar to how you would use it for a Crud Data Store.

```java
@RedisHash
public class SampleModel {

    @Id
    @Getter
    private final String id;

    @Getter
    private final String name;

    @Getter
    private final String complexData;

    @PersistenceConstructor
    public SampleModel(String id, String name, String complexData) {
        this.id = id;
        this.name = name;
        this.complexData = complexData;
    }
}
```

```java
@Repository
public interface SampleModelRepository extends CrudRepository<SampleModel, String> {
}
```

### Docker Compose

You can then use docker-compose to run your redis server which can then be connected with your new spring-boot application. For this, just create a file called docker-compose.yaml under the root of your project and add the below content into this file.

```yml
version: '3.1'

networks:
  infra:
    driver: bridge
    ipam:
      config:
        - subnet: 192.178.0.0/24

services:
  redis:
    image: redis
    restart: always
    hostname: redis
    networks:
      infra:
        ipv4_address: 192.178.0.10
    ports:
      - 16379:6379
    command: redis-server --requirepass mypass
```

to start the redis server, execute the following command,

```
docker-compose up
```
