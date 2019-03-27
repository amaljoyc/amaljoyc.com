---
layout: post
title: "Java 8 - Lambda Expressions"
comments: true
description: "Tutorial on Lambda Expressions introduced in Java 8"
keywords: "java8, lambda, java"
---

Why Lambda Expressions? The answer is very simple; it makes instances of anonymous classes easier to read and write. It's just another way of creating instances of anonymous classes. Not convinced yet? let's see!

Consider a simple interface called `Validator`

```java
public interface Validator {
    boolean isValid(String str);
}
```

And an anonymous class definition for this interface as given below,

```java
Validator strValidator = new Validator() {
            public boolean isValid(String str) {
                return str.equals("HelloWorld");
            }
        };
```

Now the same can be done very easily using a lambda expression,

```java
Validator strValidator = str -> str.equals("HelloWorld");
```

<div class="divider"></div>

#### Functional Interface

Functional Interface is the datatype of a Lambda Expression. It is an interface with only `one abstract method`. All old interfaces from Java < 8 can be considered as a Functional Interface if it has only one abstract method in it.

Java 8 introduced a new package called _java.util.function_ consisting of many functional interfaces. There are many and those can be broadly divided into 4 different categories as explained below,

1. Supplier
```java
@FunctionalInterface
public interface Supplier<T> {
        T get();
}
```
2. Consumer
```java
@FunctionalInterface
public interface Consumer<T> {
        void accept(T t);
}
```
3. Predicate
```java
@FunctionalInterface
public interface Predicate<T> {
        boolean test(T t);
}
```
4. Function
```java
@FunctionalInterface
public interface Function<T, R> {
        R apply(T t);
}
```

`Note:` The annotation _@FunctionalInterface_ is an informative annotation and is not mandatory to be present for an interface to be Functional Interface.

<div class="divider"></div>

#### Method Reference

Method Reference is just another way of writing Lambda Expressions. Method Reference is used to refer method of Functional Interface. There are 3 main types of Method References:

1. static method reference: `SomeClass::staticMethod`
```java
   s -> String.valueOf(s); // Lambda Expression

   String::valueOf; // Method Reference
```
2. instance method reference: `SomeObject::instanceMethod`
```java
   () -> “HelloWorld”.toString(); // Lambda Expression

   "HelloWorld"::toString; // Method Reference
```
3. constructor reference: `SomeClass::new`
```java
   () -> new String(); // Lambda Expression

   String::new; // Method Reference
```

<div class="divider"></div>

#### Default Method

A new kind of method that you can put in an interface. This default method is just a regular method with a `default` keyword infront of the return type. It allows to change the old interfaces without breaking the existing implementations.

Also static methods are now allowed in Java 8 interfaces (just like the static final fields).

```java
public interface IntSample {

    default int getOne() {
        return 1;
    }

    static int getTwo() {
        return 2;
    }

    int getInteger();
}
```
