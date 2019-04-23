---
layout: post
title: Prototype Pattern
tags: creational
---

## Concepts

- Used to get the unique instance of the same object.
- Avoids costly creation of objects (by doing light weight construction via for eg, clone). Hence can improve the performance.
- Typically don't use keyword `new`. The first instance created might use `new`, but after that they are `cloned`.
- Although a copy, each instance is unique.
- The copy can be a Shallow or Deep copy.
- Often utilizes an interface.
- Usually implemented with a Registry in order to save the initially constructed object for further cloning.
- Example: Object#clone().


## Demo

- [Item.java]()
- [Book.java]()
- [Movie.java]()
- [Registry.java]()
- [PrototypeDemo.java]()
