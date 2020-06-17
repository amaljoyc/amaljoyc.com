---
title: "Spring Asynchronous Processing"
date: 2016-08-05
tags: 
  - spring
---

Spring with annotations has made asynchronous processing much more easier to handle. You can make any methods to behave asynchronously just by annotating it with @Async. Read ahead to know more about this.

### Enable Asynchronous processing

Spring provides the annotation `@EnableAsync` to enable the asynchronous processing in the first place. This annotation can be added to any of the @Configuration class that you have in your application. If you are using Spring-Boot, then you can also add this annotation into the @SpringBootApplication class as it is also a configuration class by default.

```
@Configuration
@EnableAsync
public class SampleConfig {

}
```

### Make a method asynchronous

Now you can make any method in your application asynchronous by adding the annotation `@Async` on top of the method definition. But there are couple of catchy points to remember while doing this.

- @Async works with *public* methods only
- Calling the @Async method from with the same class will not work.

```
@Service
public class SampleAsyncService {

  @Async
  public void process() {

  }
}

...

public class AnotherService {

  @Autowired
  private SampleAsyncService sampleService;

  public void doAsyncProcess() {
    sampleService.process()
  }
}
```

### Using Executor

By default, Spring uses *SimpleAsyncTaskExecutor* to run the async methods. That is the most easiest and simplest way to perform asynchronous processing without the need to do additional configuration. But SimpleAsyncTaskExecutor creates new thread every time for each call to the async method. Hence it is recommended to configure a separate task executor especially if you want to use this in production. Lets configure *ThreadPoolTaskExecutor* which reuses threads and is more efficient compared to SimpleAsyncTaskExecutor.

```
@Configuration
@EnableAsync
public class SampleConfig {

  @Bean(name = "threadPoolTaskExecutor")
  public Executor threadPoolTaskExecutor() {
    return new ThreadPoolTaskExecutor();
  }
}
```

Now to use the new configured task executor, define the async method by passing the task executor name to @Async as shown below,

```
@Service
public class SampleAsyncService {

  @Async("threadPoolTaskExecutor")
  public void process() {

  }
}
```
