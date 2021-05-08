---
title: "SDKMAN to manage multiple JDK versions"
date: 2021-05-08
tags:
  - java
---

You might be working on multiple projects at times and with the new and faster release cycle of java, you might have to run multiple jdk versions while switching between projects. SDKMAN is a nice command line tool that can help you handle the complexity of running and switching multiple JDK versions in your development machine.

### Installation
Enter the following in your terminal to install SDKMAN
```
curl -s "https://get.sdkman.io" | bash
```
The installation will create a directory `~/.sdkman`. All the JDKs that you will be installing with SDKMAN will be typically placed under the path `~/.sdkman/candidates/java`.

### List all JDK versions
```
sdk list java
```
This will list all available JDKs from multiple vendors and with multiple versions.

### Install a specific JDK version
From the above list of JDK, choose one that you want to install and pick the corresponding JDK `Identifier`.
```
sdk install java <Identifier>
```

### Use a default JDK version
```
sdk default java <Identifier>
```
This is already done automatically when you are installing a new version, but if you want to make a version as default later on, you can use this option to do so.

### Switch version for current terminal
Sometimes, you might want to switch to another version without changing the default, only for the currently opened terminal session, you can do so using the command below.
```
sdk use java <Identifier>
```

### Uninstall a JDK
```
sdk uninstall java <Identifier>
```

### Check current JDK version
```
sdk current java
```

### Automatic JDK switch for project
You can also add a file `.sdkmanrc` in your project root directory to switch to a specific JDK version every time you visit that project. Just mention the java version to use inside this file as given below,
```
java=<Identifier>
```

### Apple M1 support
SDKMAN has started arm64 JDKs support on the Apple M1 from version 5.10.0 onwards, so if you need to install JDK with arch64, you might have to adapt the config as shown below,
```
vi ~/.sdkman/etc/config
change sdkman_rosetta2_compatbile config value to false
```
By default this config is currently set as `true`, so that you will only see the JDKs with arch i386.
