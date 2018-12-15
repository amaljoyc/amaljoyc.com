---
layout: page
title: Reverse Polish Notation (RPN) Calculator
permalink: /ajc-matrix/calculator
---

## Challenge

Create a calculator which evaluates expressions in Reverse Polish notation.

For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation) should evaluate to 14.

Note that for simplicity you may assume that there are always spaces between numbers and operations, e.g. 1 3 + expression is valid, but 1 3+ isn't.

Empty expression should evaluate to 0.

Valid operations are +, -, *, /.

You may assume that there won't be exceptional situations (like stack underflow or division by zero).

## Solution

* [Calculator.java](https://github.com/amaljoyc/ajc-matrix/blob/master/src/main/java/amaljoyc/matrix/calculator/Calculator.java)
* [CalculatorTest.java](https://github.com/amaljoyc/ajc-matrix/blob/master/src/test/java/amaljoyc/matrix/calculator/CalculatorTest.java) 