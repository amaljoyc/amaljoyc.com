---
layout: post
title: "Java 8 - Stream API"
comments: true
description: "Tutorial on Stream API introduced in Java 8"
keywords: "java8, streams, java"
---

A stream is a java typed interface. Even if it might look like a Collection, a Stream is not a Collection.Stream can efficiently process large amounts of data. A stream is an object `that doesn't hold any data`. And also a Stream cannot be reused, it has to be built again for another use - thus, the `stream()` is a very lightweight method.

```java
public interface Stream<T> extends BaseStream<T, Stream<T>> {

}
```

To build a Stream, you can use one of the following approach,

```java
List<SomeObject> objList;
Stream<SomeObject> stream = objList.stream();
```

OR

```java
Stream<String> stream = Stream.of("a", "b", "c");
```

#### Filter Operation

A filter takes a Stream defined on a source of data and it filters out part of that data following a Predicate. The filter takes Predicate as a parameter. The filter method returns a Stream and it is a new instance of Stream. The following will print the strings "abc" and "xyz" and filters out "de".

```java
Predicate<String> p = str -> str.length() > 2;
Stream.of("abc", "de", "xyz")
      .filter(p)
      .forEach(System.out::println);
```

The filter method call is only a declaration and no data is processed. The call to the filter method is `lazy`. Infact all the methods of Stream that return another Stream are lazy. That is an operation on a Stream that returns a Stream is called an intermediary operation (and not a final/terminal operation).

#### Map Operation

The map operation is used to transform each element of the Stream by applying a function to each element. That is, it is used to transform one object into other by applying a function. It takes a Function as a parameter. map() returns a Stream and hence is an intermediary operation. The following will print the length of each string as 3, 2, 3.

```java
Function<String, Integer> fun = str -> str.length();
Stream.of("abc", "de", "xyz")
      .map(fun)
      .forEach(System.out::println);
```

#### Reduce Operation

Reduce is a terminal operation and hence will trigger the processing of data. It is used to perform operation like aggregation ie., min, max, sum, average etc. The reduce method can take two arguments.
1. The first argument is the identity element of the reduction operation.
2. The second argument is the reduction operation, of type BinaryOperator<T>.

The first argument is not mandatory. So if only one argument is given and it is the reduction operation, then the reduce method will return `Optional<T>` object as result. If both arguments are given, then the reduce method will return the `result of type T`. Both these approaches are shown below.

```java
BinaryOperator<Integer> sumFun = (num1, num2) -> num1 + num2;
Optional<Integer> sum = Stream.of(1, 2, 3)
                              .reduce(sumFun);
System.out.println(sum.orElse(0));
```

OR

```java
BinaryOperator<Integer> sumFun = (num1, num2) -> num1 + num2;
Integer sum = Stream.of(1, 2, 3)
                    .reduce(0, sumFun);
System.out.println(sum);
```

#### Collectors

This is another way of reduction operation. Implemented using the method `collect()` which is also a terminal operation. It can be used to reduce a Stream into a Collection. Below given code will return the List containing the length of each of the string ie, [3, 2, 3].

```java
Function<String, Integer> fun = str -> str.length();
List<Integer> lengths = Stream.of("abc", "de", "xyz")
                              .map(fun)
                              .collect(Collectors.toList());
```

To collect them in a map, you can use the method Collectors.groupBy() as shown below. The resulting map will be like {2=[de], 3=[abc, xyz]}.

```java
Function<String, Integer> fun = str -> str.length();
Map<Integer, List<String>> lengths = Stream.of("abc", "de", "xyz")
                                           .collect(
                                              Collectors.groupingBy(s -> s.length())
                                           );
```
