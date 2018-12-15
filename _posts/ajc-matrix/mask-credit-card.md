---
layout: page
title: Mask Credit Card Number
permalink: /mask-credit-card/
---

## Challenge

Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct.
However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.

Your task is to write a function maskify, which will:

Mask all digits (0-9) with #, unless they are first or last four characters.
Never mask credit cards with less than 6 characters.
Never mask non-digit characters.

## Solution

* [CreditCard.java](https://github.com/amaljoyc/ajc-matrix/blob/master/src/main/java/amaljoyc/matrix/maskcreditcard/CreditCard.java)
* [CreditCardTest.java](https://github.com/amaljoyc/ajc-matrix/blob/master/src/test/java/amaljoyc/matrix/maskcreditcard/CreditCardTest.java)