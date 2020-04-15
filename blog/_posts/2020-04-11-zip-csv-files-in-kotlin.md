---
layout: post
title: "Zip csv files in Kotlin"
comments: true
description: "Code snippet for zipping csv files in Kotlin"
keywords: "kotlin, csv, zip"
---

Following is a code snippet for zipping a bunch of csv files on the fly in Kotlin. We use the `ZipOutputStream` from the java.util.zip package in order to perform the write operation in a zip file format. The csv files are created using the `opencsv` library which is one of the most easy and commonly used csv parsing library in Java. 

#### Jar Dependency

You can either use maven or gradle to get your opencsv dependency.

```java
implementation("com.opencsv:opencsv:5.1")
```

#### Code Snippet - CSV

Let's start with the csv writer. The most easiest and efficient way to use opencsv is by doing the bean-based writing. You can create a simple bean (POJO) to contain the information and each instance of this bean will be converted into a corresponding row in the csv file. The following write function takes a list of such beans as an argument and perform the csv write.

```java
fun write(rows: List<MyBean>, writer: OutputStreamWriter) {
    StatefulBeanToCsvBuilder<MyBean>(writer)
            .withSeparator(';')
            .withApplyQuotesToAll(false)
            .build()
            .write(rows)
}
```

#### Code Snippet - ZIP

Next we need to call the above csv write method for each of the csv files that we need to include in the final zip file. Following code snippet does the same.

```java
val sample = mapOf(
        "file1.csv" to listOf<MyBean>(mybean1, mybean2),
        "file2.csv" to listOf<MyBean>(mybean3, mybean4, mybean5),
        "file3.csv" to listOf<MyBean>(mybean6, mybean7)
)

ZipOutputStream(BufferedOutputStream(FileOutputStream("sample.zip"))).use { zos ->
    sample.forEach { filename, csv ->
        zos.putNextEntry(ZipEntry(filename))
        write(csv, OutputStreamWriter(zos))
        zos.closeEntry()
    }
}
```

Here a sample map is taken which contains the beans that we want to include in each of the csv file as rows. Each of these csv files are then put as a zip entry. The `use` construct used above will make sure that the streams like ZipOutputStream, BufferedOutputStream, FileOutputStream etc are closed properly when done. Also note that the `use` will only call the `close()` method of these streams/resources, hence it is necessary to explicitly do the `zos.closeEntry()` call to make sure the zip entry is closed after each csv is written into it.

