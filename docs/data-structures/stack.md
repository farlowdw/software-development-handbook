---
title: Stack
hide_title: false
sidebar_label: Stack
description: Overview of stack data structure.
draft: false
tags: 
  - Stack
keywords: 
  - stack
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import StackTC from '@site/docs/_Partials/_time-and-space-complexities/_stack.md'

## Introduction

A stack is an abstract data type that supports the operations **push** (insert a new element on the top of the stack) and **pop** (remove and return the most recently added element, the element at the top of the stack). As an abstract data type, stacks can be implemented using arrays or singly linked lists.

This behavior is commonly called LIFO (last in, first out). The name "stack" for this type of structure comes from the analogy to a set of physical items stacked on top of each other.

Stacks are an important way of supporting nested or recursive function calls and is used to implement depth-first search. Depth-first search can be implemented using recursion or a manual stack.

## Language Implementations

| Language | API |
| :-- | :-- |
| C++ | [`std::stack`](https://docs.microsoft.com/en-us/cpp/standard-library/stack-class?view=msvc-170) |
| Java | [`java.util.Stack`](https://docs.oracle.com/javase/10/docs/api/java/util/Stack.html) |
| Python | Simulated using a [list](https://docs.python.org/3/tutorial/datastructures.html) |
| JavaScript | Simulated using an [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) |

## Time complexity

The following table assumes that the stack in question has been implemented with a linked list (not an array).

<StackTC />

## Interview Considerations

### Clarifications

tbd

### Mistakes

tbd

### Exceptions

Be mindful of the following corner cases when dealing with stacks:

- Empty stack (i.e., popping from an empty stack)
- Stack with one item 
- Stack with two items
