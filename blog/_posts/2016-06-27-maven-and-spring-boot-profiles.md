---
layout: post
title: "Maven and Spring Boot Profiles"
date: 2016-06-27
comments: true
categories:
---

It is often very convinient if we could adjust the spring boot profiles from an external tool like maven. This might come handy when we want to easily activate profiles during the maven build without the need for editing the boot properties file manually.

Bellow code snippets does exactly the same and can be used to control spring boot profiles using the active maven profile.

### Step 1 - Define profiles in pom.xml

While the profiles are defined, we also create a new property named `maven.active.profile`. Later we will use this maven variable/property value to activate spring profile.

```
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <maven.active.profile>dev</maven.active.profile>
        </properties>
    </profile>
    <profile>
        <id>test</id>
        <properties>
            <maven.active.profile>test</maven.active.profile>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <maven.active.profile>prod</maven.active.profile>
        </properties>
    </profile>
</profiles>
```

### Step 2 - Make maven properties available in resources

This helps to use the above defined maven property directly in the spring boot properties file

```
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

### Step3 - Set the spring-boot active profile

Spring boot uses the property `spring.profiles.active` to set the active profile. We will now set the active profile based on the value we set in the maven property before. The syntax is of the format `@maven.property.name@`

```
spring.profiles.active=@maven.active.profile@
```
