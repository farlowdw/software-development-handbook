---
title: Queue
hide_title: false
sidebar_label: Queue
description: Overview of queue data structure.
draft: false
tags: 
  - Queue
keywords: 
  - queue
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import QueueTC from '@site/docs/_Partials/_time-and-space-complexities/_queue.md'

## Introduction

A queue is a linear collection of elements that are maintained in a sequence and can be modified by the addition of elements at one end of the sequence (**enqueue** operation) and the removal of elements from the other end (**dequeue** operation). Usually, the end of the sequence at which elements are added is called the back, tail, or rear of the queue, and the end at which elements are removed is called the head or front of the queue. As an abstract data type, queues can be implemented using arrays or singly linked lists.

This behavior is commonly called FIFO (first in, first out). The name "queue" for this type of structure comes from the analogy to people lining up in real life to wait for goods or services.

Breadth-first search is commonly implemented using queues.

## Language Implementations

| Language | API |
| :-- | :-- |
| C++ | [`std::queue`](https://docs.microsoft.com/en-us/cpp/standard-library/queue-class?view=msvc-170) |
| Java | [`java.util.Queue`](https://docs.oracle.com/javase/10/docs/api/java/util/Queue.html). Use [`java.util.ArrayDeque`](https://docs.oracle.com/javase/10/docs/api/java/util/ArrayDeque.html). |
| Python | [`queue`](https://docs.python.org/3/library/queue.html) |
| JavaScript | None |

## Time complexity 

The following table assumes that the queue in question has been implemented with a linked list (not an array).

<QueueTC />

## Interview considerations

### Clarifications

#### Existence of queue data structure in chosen language

Most languages don't have a built-in Queue class, and candidates often use arrays (JavaScript) or lists (Python) as a queue. However, note that the enqueue operation in such a scenario will be $O(n)$ because it requires shifting all other elements by one. In such cases, you can flag this to the interviewer and say that you assume that there's a queue data structure to use which has an efficient enqueue operation.

### Mistakes

tbd 

### Exceptions

Be on the lookout for the following corner cases when working with queues:

- Empty queue
- Queue with one item 
- Queue with two items
