---
layout: post
title: "Spring Test Property Injection without Properties File"
date: 2016-07-14
comments: true
categories:
---

Testing Java service classes might get a little tricky if they use application properties which are injected via Spring. Creating separate test-properties file for such tests is expensive if it has only one or two properties in it. In such situations, it could be helpful to use the below described approach.

### Use PropertyPlaceholderConfigurer Bean with properties

As simple as this,

```
	@Bean
	PropertyPlaceholderConfigurer propertyConfigurer() {
		PropertyPlaceholderConfigurer configurer = new PropertyPlaceholderConfigurer();
		Properties properties = new Properties();
		properties.setProperty("some.sample.property", "hello");
		configurer.setProperties(properties);
		return configurer;
	}
```

Here, instead of loading the properties from an external properties file, we directly set the property key and value(as strings) during configuration.

### More Detailed Code Structure

- Maven Dependencies Used

```
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.12</version>
		<scope>test</scope>
	</dependency>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-test</artifactId>
		<version>4.3.1.RELEASE</version>
	</dependency>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-context</artifactId>
		<version>4.3.1.RELEASE</version>
	</dependency>
```

- Service Class

```
	public class SampleService {

		@Value("${some.sample.property}")
		private String sampleProperty;

		public void print() {
			System.out.println(sampleProperty);
		}

	}
```

- Junit Test Class

```
	@RunWith(SpringJUnit4ClassRunner.class)
	@ContextConfiguration(classes = { SampleServiceTest.Config.class })
	public class SampleServiceTest {

		static class Config {
			@Bean
			PropertyPlaceholderConfigurer propertyConfigurer() {
				PropertyPlaceholderConfigurer configurer = new PropertyPlaceholderConfigurer();
				Properties properties = new Properties();
				properties.setProperty("some.sample.property", "hello");
				configurer.setProperties(properties);
				return configurer;
			}

			@Bean
			SampleService sampleService() {
				return new SampleService();
			}
		}

		@Autowired
		SampleService service;

		@Test
		public void test() {
			service.print();
		}

	}
```

