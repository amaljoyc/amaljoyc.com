---
title: "Apache Camel - For Easy Integrations"
date: 2019-11-16
tags: 
  - java
  - kotlin
  - apache camel
---

Apache Camel is a very nice and open source framework for Java that helps to make integrations easier and faster. It implements a lot of [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) out of the box. The DSL support (or the Fluent API) makes it even more concise and simple to read and write.

In simple terms, it allows you to send data from one place to the other through a set of defined routes. It can do so in a variety of protocols like FTP, HTTP, ActiveMQ, JMS etc. There are so many readily available components that camel provides, you don't have to spend a lot of time implementing integrations yourself anymore. A complete list of camel components (total was around 300+ when I checked last time) can be found in [github!](https://github.com/apache/camel/tree/master/components)

Apache Camel also integrates nicely with Spring and the example that I am listing below will use Spring and Kotlin. The complete demo project can be found in github - [apache-camel-demo](https://github.com/amaljoyc/apache-camel-demo)

### Jar Dependencies

You can either use maven or gradle to get your camel core and component dependencies. Find the gradle example below,

```java
implementation("org.apache.camel:camel-spring-boot-starter:3.0.0-RC3")
implementation("org.apache.camel:camel-rabbitmq-starter:3.0.0-RC3")
implementation("org.apache.camel:camel-mongodb-starter:3.0.0-RC3")
implementation("org.apache.camel:camel-csv-starter:3.0.0-RC3")
implementation("org.apache.camel:camel-file-starter:3.0.0-RC3")
```

### Example

We will consider a sample integration as given below. In consists of two separate flows

*First Flow*
```
consume a message from RabbitMQ
    -> transaform the message object (InputData) into a new model object (ProcessData)
    -> save the new model object into MongoDB
```

*Second Flow*
```
cron to trigger a MongoDB fetch
    -> transform the fetched data (ProcessData) into CSV format
    -> export the CSV by saving it as file in disk
```

For this, we can define two camel routes by extending `RouteBuilder` class and overriding the `configure` method.

*First Flow* is implemented as given below
```java
package com.amaljoyc.demo.camel.route

import com.amaljoyc.demo.camel.config.MongoDBProperties
import com.amaljoyc.demo.camel.config.RabbitMQProperties
import com.amaljoyc.demo.camel.model.InputData
import com.amaljoyc.demo.camel.processor.FirstProcessor
import com.amaljoyc.demo.camel.saveProcessDataRoute
import org.apache.camel.LoggingLevel.INFO
import org.apache.camel.builder.RouteBuilder
import org.apache.camel.model.dataformat.JsonLibrary
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class FirstRouter : RouteBuilder() {

    @Autowired
    lateinit var mq: RabbitMQProperties

    @Autowired
    lateinit var mongo: MongoDBProperties

    @Autowired
    lateinit var processor: FirstProcessor

    override fun configure() {
        from("rabbitmq://${mq.host}/${mq.route.exchange}"
                + "?routingKey=${mq.route.routingKey}"
                + "&queue=${mq.route.queue}"
                + "&deadLetterQueue=${mq.route.queue}.dlq"
                + "&deadLetterRoutingKey=${mq.route.queue}")
                .routeId("consumeSampleData")
                .unmarshal().json(JsonLibrary.Jackson, InputData::class.java)
                .bean(processor, "transformInputData")
                .to("direct:$saveProcessDataRoute")

        from("direct:$saveProcessDataRoute")
                .routeId(saveProcessDataRoute)
                .to("mongodb:mongoClient?database=${mongo.database}&collection=process_data&operation=insert")
                .log(INFO, "Saved ProcessData with id(s): \${in.header.CamelMongoOid}")
    }
}
```

*Second Flow* is implemented as given below
```java
package com.amaljoyc.demo.camel.route

import com.amaljoyc.demo.camel.config.MongoDBProperties
import com.amaljoyc.demo.camel.exportProcessDataRoute
import com.amaljoyc.demo.camel.saveToFileRoute
import org.apache.camel.LoggingLevel.INFO
import org.apache.camel.builder.RouteBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component


@Component
class SecondRouter : RouteBuilder() {

    @Autowired
    lateinit var mongo: MongoDBProperties

    override fun configure() {
        from("direct:$exportProcessDataRoute")
                .routeId(exportProcessDataRoute)
                .to("mongodb:mongoClient?database=${mongo.database}&collection=process_data&operation=findAll")
                .to("direct:$saveToFileRoute")

        from("direct:$saveToFileRoute")
                .routeId(saveToFileRoute)
                .marshal().csv()
                .to("file:target/output/?fileName=process_data.csv")
                .log(INFO, "Saved ProcessData into a file!")
    }
}
```

As you can see, I have just integrated tools like RabbitMQ, MongoDB and made some data transformations from POJO into a CSV formatted file. All of that in very simple DSL. Now I can focus more on the business logic and worry less on underlying integration and infrastructure.

These Camel components can be customized further using the wide range of query params and headers it provides. Their details can be found in each component readme when you visit [camel components github](https://github.com/apache/camel/tree/master/components). Some of them are also auto-configured with Spring properties like used in my [application.yml](https://github.com/amaljoyc/apache-camel-demo/blob/master/src/main/resources/application.yml).

Feel free to go through the detailed demo project in github - [apache-camel-demo](https://github.com/amaljoyc/apache-camel-demo).