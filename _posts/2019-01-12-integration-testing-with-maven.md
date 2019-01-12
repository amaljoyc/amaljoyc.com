---
layout: post
title: "Integration Testing with Maven"
comments: true
description: "Tutorial on how to have a separately running Integration Test Suite with Maven"
keywords: "maven, java, testing, integration-testing"
---

Since the integration tests usually uses real external dependencies like database, other application services etc, it might take a lot of time to execute and thereby is not advisable to run along with a normal maven build process. On the other hand the Unit Tests are often advisable to run by default during a maven build. How can we make sure, these long running Integration Tests are skipped during the default build, but can be run separately with all the dependencies setup included. We will use a few maven plugins and features for this which are listed below,

1. Maven Profile
2. Plugin - build-helper-maven-plugin
3. Plugin - maven-surefire-plugin
4. Plugin - maven-failsafe-plugin
5. Plugin - exec-maven-plugin

<div class="divider"></div>

#### Maven Profile

A maven build profile can be used to set or override default values of a maven build. With this, we can customize the build for different environments. Thats how we will run our integration test suite separately so that it is skipped during a normal/default maven build, but is run when a particular maven profile is activated.

Include the following in your project's pom.xml to create a new profile,

```xml
<profiles>
  <profile>
    <id>it</id>
    <build>
      ...
    </build>
  </profile>
</profiles>
```

This creates a new profile called `it`. In order to activate this profile or to do a maven build with this profile, use the argument `P` as given below

```
mvn clean install -Pit
```

<div class="divider"></div>

#### build-helper-maven-plugin

It is a good idea to separate your set of integration tests outside your normal unit tests. For this, we can create separate source & resource directories and maven's build-helper-maven-plugin can help recognize tests under this separated directory. See below on how to configure the pom.xml to achieve this,

```xml
<profiles>
  <profile>
    <id>it</id>
    <build>
      <plugins>
        <plugin>
          <groupId>org.codehaus.mojo</groupId>
          <artifactId>build-helper-maven-plugin</artifactId>
          <version>3.0.0</version>
          <executions>
            <execution>
              <id>add-integration-test-sources</id>
              <phase>generate-test-sources</phase>
              <goals>
                <goal>add-test-source</goal>
              </goals>
              <configuration>
                <sources>
                  <source>src/int-test/java</source>
                </sources>
              </configuration>
            </execution>
            <execution>
              <id>add-integration-test-resources</id>
              <phase>generate-test-resources</phase>
              <goals>
                <goal>add-test-resource</goal>
              </goals>
              <configuration>
                <resources>
                  <resource>
                    <filtering>true</filtering>
                    <directory>src/int-test/resources</directory>
                  </resource>
                </resources>
              </configuration>
            </execution>
          </executions>
        </plugin>
      </plugins>
    </build>
  </profile>
</profiles>
```

in the above plugin configuration, we have considered the directory structure as

```
src/int-test/java
src/int-test/resources
```

<div class="divider"></div>

#### maven-surefire-plugin

The Surefire Plugin is used during the `test` phase of the build lifecycle to execute the `unit tests` of an application. By default, it will run all junit tests having the filename pattern as

```
"**/Test*.java"
"**/*Test.java"
"**/*Tests.java"
"**/*TestCase.java"
```

due to this, it will also run our integration tests if we have the test file with above naming pattern, but we want to avoid running any tests inside the directory `int-test` by default during a maven build. To do so configure the maven-surefire-plugin as given below,

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>2.22.1</version>
  <configuration>
    <excludes>
      <exclude>mypackage.myproject.inttest.**</exclude>
    </excludes>
  </configuration>
</plugin>
```

the package `mypackage.myproject.inttest` is unique to the directory `src/int-test/java` and hence all tests inside this package is skipped by the surefire plugin.

`Note:` include the above plugin configuration outside your `profile - it` configuration since you want the integration tests to be skipped during the default build process.

<div class="divider"></div>

#### maven-failsafe-plugin

The Failsafe Plugin is designed to run integration tests while the Surefire Plugin is designed to run unit tests. Configure it as given below inside your specific profile,

```xml
<profiles>
  <profile>
    <id>it</id>
    <build>
      <plugins>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
          <configuration>
            <skip>true</skip>
          </configuration>
        </plugin>
        <plugin>
          <artifactId>maven-failsafe-plugin</artifactId>
          <version>2.22.0</version>
          <configuration>
            <includes>
              <include>mypackage.myproject.inttest.**</include>
            </includes>
          </configuration>
          <executions>
            <execution>
              <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
      </plugins>
    </build>
  </profile>
</profiles>
```

the above config considers all tests inside package `mypackage.myproject.inttest` as integration tests and runs them during the maven lifecycle phase `integration-test`

`Note:` see the usage of maven-surefire-plugin again here. I added it to include the `skip` configuration because I want to skip the run of all unit tests during my profile - `it` build.

<div class="divider"></div>

#### exec-maven-plugin

Like I said in the beginning, integration tests might need some external dependencies and you probably need them to be ready and up before running your tests. Later after the completion of your tests, you might want to cleanup by killing or stopping those external dependencies. Maven provide two separate phases for this in its lifecycle as given below,

1. pre-integration-test
2. post-integration-test

the phase `integration-test` comes between the above two phases. Later after the post-integration-test phase comes the `verify` phase - for checking the results of the integration tests.

The plugin exec-maven-plugin can be used to execute system programs and we will use it to `start` and `stop` our external dependencies in the pre and post integration test phases respectively.

```xml
<profiles>
		<profile>
			<id>it</id>
			<build>
				<plugins>
					<plugin>
						<artifactId>exec-maven-plugin</artifactId>
						<groupId>org.codehaus.mojo</groupId>
						<version>1.2.1</version>
						<executions>
							<execution>
								<id>Test infra Setup</id>
								<phase>pre-integration-test</phase>
								<goals>
									<goal>exec</goal>
								</goals>
								<configuration>
									<executable>${basedir}/infra.sh</executable>
									<arguments>
										<argument>start</argument>
									</arguments>
								</configuration>
							</execution>
							<execution>
								<id>Test infra Teardown</id>
								<phase>post-integration-test</phase>
								<goals>
									<goal>exec</goal>
								</goals>
								<configuration>
									<executable>${basedir}/infra.sh</executable>
									<arguments>
										<argument>stop</argument>
									</arguments>
								</configuration>
							</execution>
						</executions>
					</plugin>
				</plugins>
			</build>
		</profile>
	</profiles>
```

the infra.sh is just a sample bash file which will contain commands to run and kill your infra dependencies. The arguments start and stop are also sample arguments taken by this bash script to execute the needed commands.

With all these plugins in maven, you can have a separate Suite for your project's integration tests.
