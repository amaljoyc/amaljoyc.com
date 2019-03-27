---
layout: post
title: "Send Mail using Spring Boot"
date: 2016-06-29
comments: true
categories:
---

Configuring and sending emails in java has become a lot more easier with the support of Spring Boot. Now you can send emails in your application with very little configuration and development time.

Below are the steps that shows how this can be achieved.

### Step 1 - Add spring boot mail dependency in pom.xml

Spring Boot has encapsulated all the mail related dependencies into a starter module and we just have to add this starter dependency in our project pom xml.

```
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>
```

### Step 2 - Define a few application properties

Spring Boot provides a lot of ready to use application properties for configuring the application easier and faster. For supporting mails, it provides properties of the format `spring.mail.*` (used for basic configuration) and `spring.mail.properties.*` (used for further configuring the java mail properties)

Listed below are the very minimal configuration required. It uses the gmail as the smtp host provider.

```
    spring.mail.host=smtp.gmail.com
    spring.mail.username=example.smtp.username@gmail.com
    spring.mail.password=example-password
    spring.mail.properties.mail.smtp.starttls.enable=true
```

### Step3 - Email Sender Service

Spring boot provides a default implementation of JavaMailSender which can be autowired and used to send the mail. This default implementation is skipped/ignored if the app developer decides to have a custom implementation of JavaMailSender.

Below code uses(via autowire) the default JavaMailSender implementaion provided by Spring Boot.

```
    @Autowired
    private JavaMailSender javaMailSender;
    
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }
```

### Step4 - Special case if using gmail SMTP

If you decide to go with gmail smtp, you will also have to allow your google account to support *less secure apps*. Google disables this support by default to restrict users from sending mails from places other than google-logged-in browsers and google-apps.

To turn on this, go to `https://www.google.com/settings/security/lesssecureapps`

And you finally have a simple mail sending service. Enjoy!
