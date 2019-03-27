---
layout: post
title: "Java Cache Data Structure"
date: 2016-07-04
comments: true
categories:
---

The Google core library for Java called [Guava](https://github.com/google/guava) provides lot of ready made features for Java developers. One such feature is the caching Data Structure using CacheBuilder. We should consider using caches when a value is expensive to compute or when it is needed more than once.

Guava's Cache is also thread safe(like ConcurrentMap) and provides many optional functionalities.

### Maven Dependency

```
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>19.0</version>
    </dependency>
```

### Using LoadingCache Interface

Here we use a **CacheLoader** class which must implement a method `load`. This method loads the data if it is not present in the cache already for the first time. All later cache/data access will not call this method as the data is already present in the cache (until it is expired and deleted ofcourse).

The developer can also add data explicitly using the `put` method as well. To get the data, use the method `get` (just like a map access)

Find below, an example of LoadingCache and CacheLoader.

```
    LoadingCache<String, Integer> myCache = CacheBuilder.newBuilder()
                        .expireAfterWrite(4, TimeUnit.HOURS)
                        .build(new CacheLoader<String, Integer>() {
                            @Override
                            public Integer load(String s) throws Exception {
                                return s.length();
                            }
                        });
```

### Using Cache Interface

Sometimes it would be nice/logical to not load the data if not present in the cache, but still support the caching mechanism for the already present values in the cache. For such cases, we could use the **Cache** interface where we dont't have to implement a load method.

The developer can futher use the put method to add data into the cache. One more difference is the way in which the data is accessed/retrieved. Instead of a get method, what we have is a `getIfPresent` method which will return null if the data is not present. Find the below example to see how to declare this cache.

```
    Cache<String, Integer> myCache = CacheBuilder.newBuilder()
                        .expireAfterWrite(4, TimeUnit.HOURS).build();
```

### Further Notes

Guava Cache allows us to set the expiry time using `java.util.concurrent.TimeUnit` with the help of two methods 

- expireAfterWrite
- expireAfterAccess

It also supports restricting the size of cache using the method `maximumSize`. If this is not used, the size is set as unbound.
