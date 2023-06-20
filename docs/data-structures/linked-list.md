---
title: Linked List
hide_title: false
sidebar_label: Linked list
description: Overview of linked list structure.
draft: false
last_update: 
  date: '2022-07-22'
  author: farlow
tags: [Linked List]
keywords: [linked list]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import LinkedListTC from '@site/docs/_Partials/_time-and-space-complexities/_linked-list.mdx'

## Introduction

Like arrays, a linked list is used to represent sequential data. It is a linear collection of data elements whose order is not given by their physical placement in memory, as opposed to arrays, where data is stored in sequential blocks of memory. Instead, each element contains an address of the next element. It is a data structure consisting of a collection of nodes which together represent a sequence.

In its most basic form, each node contains: data, and a reference (in other words, a link) to the next node in the sequence.

### Strengths

Insertion and deletion of a node in the list (given its location) is $O(1)$ whereas in arrays the following elements will have to be shifted.

### Weaknesses

Access time is linear because directly accessing elements by its position in the list is not possible (in arrays you can do `arr[4]` for example). You have to traverse from the start.

## Singly-linked list 

A linked list where each node points to the next node and the last node points to `null`.

## Doubly-linked list 

A linked list where each node has two pointers, `next` which points to the next node and `prev` which points to the previous node. The `prev` pointer of the first node and the `next` pointer of the last node point to `null`.

## Circular linked list 

A singly linked list where the last node points back to the first node. There is a circular doubly linked list variant where the `prev` pointer of the first node points to the last node and the `next` pointer of the last node points to the first node.

## Language Implementations

| Language | API |
| :-- | :-- |
| C++ | None |
| Java | [`java.util.LinkedList`](https://docs.oracle.com/javase/10/docs/api/java/util/LinkedList.html) |
| Python | None |
| JavaScript | None |

## Time complexity 

<LinkedListTC />

## Interview considerations

### Clarifictions

#### Cycles 

Clarify beforehand with the interviewer whether there can be a cycle in the list. Usually the answer is no and you don't have to handle it in the code.

### Mistakes

#### Common Routines 

It's a mistake to not be rather familiar with the following routines because many linked list questions make use of one or more of these routines in their solution:

- Counting the number of nodes in the linked list
- Reversing a linked list in-place
- Finding the middle node of the linked list using two pointers (fast/slow)
- Merging two linked lists together

### Exceptions

Be on the lookout for the following corner cases when dealing with linked lists:

- Empty linked list (head is `null`)
- Single node
- Two nodes
- Linked list has cycles. **Tip:** Clarify beforehand with the interviewer whether there can be a cycle in the list. Usually the answer is no and you don't have to handle it in the code.
