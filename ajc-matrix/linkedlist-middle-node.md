---
layout: page
title: Find Middle node of a LinkedList
permalink: /ajc-matrix/linkedlist-middle-node
---

## Challenge

Given a Singly-Linked List, write a method - findMiddleNode that finds and returns the middle node of the list in a single pass.

**Examples:**
1 ==> 1
1->2 ==> 1
1->2->3->4 ==> 2
1->2->3->4->5 ==> 3

## Solution

The solution uses Floyd’s slow and fast pointers approach. For more details refer to [link](https://www.geeksforgeeks.org/how-does-floyds-slow-and-fast-pointers-approach-work/)

* [LinkedListMiddleNodeChecker.java](https://github.com/amaljoyc/ajc-matrix/blob/master/src/main/java/amaljoyc/matrix/linkedlistmiddle/LinkedListMiddleNodeChecker.java)
* [LinkedListMiddleNodeCheckerTest.java](https://github.com/amaljoyc/ajc-matrix/blob/master/src/test/java/amaljoyc/matrix/linkedlistmiddle/LinkedListMiddleNodeCheckerTest.java)
