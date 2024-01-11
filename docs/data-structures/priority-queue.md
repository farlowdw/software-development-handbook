---
title: Priority queue
hide_title: false
sidebar_label: Priority Queue
description: Overview of priority queue data structure.
draft: false
tags: 
  - Priority Queue
keywords: 
  - priority queue
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

## Description

A queue where items are ordered by priority. A priority queue is a special queue where:

1. Every item in the queue has a priority, and
2. Higher-priority items are dequeued before lower-priority items.

Picture a big list of bugs for an engineering team to tackle. You want to keep the highest-priority bugs at the top of the list.

**Note:** The binary heap priority queue is the most common implementation of a priority queue but not the only one.

**Visual description:**

<div align='center' className='centeredImageDiv'>
  <img width="100px" src={require('@site/static/img/dsa/quick-ref/priority-queue.png').default} />
</div>

**Strengths:**

- **Quickly access the highest-priority item:** Priority queues allow you to peek at the top item in $O(1)$ while keeping other operations relatively cheap (i.e., $O(\lg n)$).

**Weaknesses:** 

- **Slow enqueues and dequeues:** Both operations take $O(\lg n)$ time with priority queues. With normal first-in, first-out queues, these operations are $O(1)$ time.

**Uses:**

- Any time you want to handle things with different priority levels: triaging patients in a hospital, locating the closest available taxi, or just a to-do list.
- **Operating system schedulers** may use priority queues to select the next process to run, ensuring high-priority tasks run before low-priority ones.
- Certain **foundational algorithms** rely on priority queues:
  + Dijkstra's shortest-path
  + A* search (a graph traversal algorithm like BFS)
  + Huffman codes (an encoding for data compression)

**Worst Case Analysis:**

| Context | Big O |
| :-- | :-- |
| space | $O(n)$ |
| peek | $O(1)$ |
| dequeue | $O(\lg n)$ |
| enqueue | $O(\lg n)$ |

### Implementation

#### Binary Heaps

Priority queues are often implemented using binary heaps. Notice how the highest priority is right at the top of the heap, ready to be grabbed in $O(1)$ time.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/priority-queue-f2.png').default} />
</div>

- To **enqueue** an item, add it to the heap using the priority as the key (time: $O(\lg n)$).
- To **peek** at the highest priority item, look at the item at the top (time: $O(1)$).
- To **dequeue** the highest priority item, remove the top item from the heap (time: $O(\lg n)$).

#### Other Options

##### A Sorted Array

- To enqueue, use binary search to figure out where the new item should go. Then scoot items over to make space for the new item. (time: $O(n)$ time since, in the worst case, you have to scoot *everything* over to make room)
- To peek at the highest priority item, look at the item at index zero. (time: $O(1)$)
- To dequeue, scoot every item forward one index. (time: $O(n)$ time)

##### A Sorted Linked List

- To enqueue, walk through the linked list to figure out where the new item should go. Then, reassign pointers to add the new item. (time: $O(n)$)
- To peek at the highest priority item, look at the item at the head of the linked list. (time: $O(1)$)
- To dequeue, update the linked list's head pointer to point to the second item. (And deallocate the old head node, if you're using a language with manual memory management.) (time: $O(1)$)

##### Fancier Heaps

Binary heaps are just one kind of heap. Other kinds of heaps (e.g.: Fibonacci heaps or binomial heaps) can offer faster *average* performance for some priority queue operations. But, they're much more complex than binary heaps and less commonly used in practice. In a coding interview, you usually can't go wrong by using a binary-heap based priority queue.
