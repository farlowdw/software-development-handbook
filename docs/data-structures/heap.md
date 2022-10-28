---
title: Heap
hide_title: false
sidebar_label: Heap
description: Overview of heap data structure.
draft: false
tags: [Heap]
keywords: [heap]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Description

**Other names:** min heap, max heap

A binary tree where the smallest value is always at the top. Use it to implement a priority queue. A binary heap is a binary tree where the *smallest* value is always at the top. A min-heap has the smallest value at the top. A max-heap has the largest value at the top. The implementations are almost identical.

**Visual description:**

<p align='center'>
  <img width="100px" src={require('@site/static/img/dsa/quick-ref/heap.png').default} />
</p>

**Strengths:**

- **Quickly access the smallest item:** Binary heaps allow you to grab the smallest item (the root) in $O(1)$ time, while keeping other operations relatively cheap (i.e., $O(\lg n)$ time).
- **Space efficient:** Binary heaps are usually implemented with *arrays*, saving the overhead cost of storing pointers to child nodes.

**Weaknesses:** 

- **Limited interface:** Binary heaps only provide easy access to the smallest item. Finding other items in the heap takes $O(n)$ time, since we have to iterate through all the nodes.

**Uses:** 

- **Priority queues** are often implemented using heaps. Items are *enqueued* by adding them to the heap, and the highest-priority item can quickly be grabbed from the top.
- One way to efficiently sort an array of items is to make a heap out of them and then remove items one at a time—-in sorted order.

**Worst Case Analysis:**

| Context | Big O |
| :-- | :-- |
| get min | $O(1)$ |
| remove min | $O(\lg n)$ |
| insert | $O(\lg n)$ |
| heapify | $O(n)$ |
| space | $O(n)$ |

### Implementation

Heaps are implemented as complete binary trees. In a complete binary tree:

- each level is filled up before another level is added, and
- the bottom tier is filled in from left to right.

As we'll see, this allows us to efficiently store our heap as an array. In a heap, **every node is smaller than its children**.

<p align='center'>
  <img width="350px" src={require('@site/static/img/dsa/quick-ref/heap-f3.png').default} />
</p>

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f4.png').default} />
</p>

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f5.png').default} />
</p>

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f6.png').default} />
</p>

### Inserting a new item

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f7.png').default} />
</p>

1\. Add the item to the bottom of the tree.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f8.png').default} />
</p>

2\. Compare the item with its parent. If the new item is smaller, swap the two.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f9.png').default} />
</p>

3\. Continue comparing and swapping, allowing the new item to "bubble up" until the it's larger than its parent.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f10.png').default} />
</p>

Because our heap is built on a complete binary tree, we know it's also *balanced*. Which means the height of the tree is $\lg n$. So we'll do at most $\lg n$ of these swaps, giving us a total time cost of $O(\lg n)$.

### Removing the smallest item

Easy—it's right there at the top:

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f11.png').default} />
</p>

Now, we have to shuffle some things around to make this a valid heap again.

1\. Take the bottom level's right-most item and move it to the top, to fill in the hole.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f12.png').default} />
</p>

2\. Compare the item with its children.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f13.png').default} />
</p>

If it's larger than either child, swap the item with the *smaller* of the two children.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f14.png').default} />
</p>

3\. Continue comparing and swapping, allowing the item to "bubble down" until it's smaller than its children.

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f15.png').default} />
</p>

As with inserting (above), we'll do at most $\lg n$ of these swaps, giving us a total time cost of $O(\lg n)$.

### Heaps are built on arrays

Complete trees and heaps are often stored as arrays, one node after the other, like this:

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f15a.png').default} />
</p>

Using an array to store a complete binary tree is very efficient. Since there are no gaps in complete trees, there are no unused slots in the array. And, inserting a new item in the bottom right part of the tree just means appending to the array.

**But how do we traverse the tree when it's an array?** How do we go from a node to its left and right children? With a bit of clever indexing! See if you can come up with the formulas for a node's left child, right child, and parent. Then, check your answer:

<details><summary> Answer</summary>

Looking at a few nodes, it's easy enough to derive the general formulas.

- **Left Child:** Index 0's left child is at index 1. Index 1's left child is at index 3. And index 2's left child is a 5. In general, a node at index $i$'s left child will be at index $2i+1$.
- **Right Child:** This node always comes right after the left child. In general, a node at index $i$'s right child will be at index $2i+2$.
- **Parent:** The nodes at indices 1 and 2 have their parent at index 0. The nodes at indices 3 and 4 have their parent at index 1. And the nodes at indices 5 and 6 have their parent at index 2. In general, a node at index $i$ has its parent at index $(i-1)/2$.

Don't bother memorizing these ... just work through a few examples and you'll be able to come up with them on the fly. Just remember the main idea is that you're multiplying or dividing by 2. This makes sense, because the number of nodes on each level of a complete binary tree doubles as you move down level by level.

---

</details>

### Heapify: Transform an Array Into a Heap

Say we want to make a heap out of the items in an array. We could create a new empty heap and add in the items from the array one at a time. If the array has nn elements, then this takes $O(n\lg n)$. It turns out that there's a **more efficient** way to transform an array into a heap. We'll take our input array and treat it like the nodes in a complete binary tree, just like we did above:

<p align='center'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/heap-f15a.png').default} />
</p>

To transform the tree into a valid heap, we'll compare each node to its children and move nodes around so that parent nodes are always smaller than their children. This causes larger nodes to move lower in the tree, "bubbling down" to allow smaller values to reach the top. Look familiar? This is the same bubbling down we were doing to remove items from the heap! We'll work from the leaf-nodes at the bottom upwards. To start off, let's look at the leaves. The leaf nodes don't have any children, so they don't need to move down at all. Great.

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f16.png').default} />
</p>

Let's look at the nodes in the next level:

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f17.png').default} />
</p>

We'll start with the left node (3) and its children:

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f18.png').default} />
</p>

Since 3 is smaller than both 7 and 9, it's already in the right spot.

But, looking at the right node (2) and its children, since 1 is smaller than 2, we'll swap them.

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f19.png').default} />
</p>

Notice how we've got two small valid min-heaps. We're getting close!

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f20.png').default} />
</p>

Moving up, we've got an 8 at the root.

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f21.png').default} />
</p>

Since 8 is larger than 1, 8 bubbles down, swapping places with the smaller child: 1.

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f22.png').default} />
</p>

Then, we need to compare 8 to its two children—2 and 4. Since 8 is bigger than both of them, we swap with the smaller child, which is 2.

<p align='center'>
  <img width="275px" src={require('@site/static/img/dsa/quick-ref/heap-f23.png').default} />
</p>

At this point, we've transformed the input tree into a valid min heap. Nice!

### Heapify complexity

What's the time complexity of heapify'ing an array? It's tempting to say it's $O(n\lg n)$. After all, we have to examine all nn nodes, and a node might bubble down $O(\lg n)$ levels. That's an overestimate of the amount of work though. All of the leaf nodes at the bottom of the tree won't have to move down at all. And the parents of those nodes will only move down once. In fact, there's only one node that might move down $O(\lg n)$ times: the root node. Since binary heaps are based on complete binary trees, there will be $n/2$ nodes in the bottom level, $n/4$ nodes in the second-to-last level, etc. Each time we go up a level we cut the number of nodes in half.

<p align='center'>
  <img width="375px" src={require('@site/static/img/dsa/quick-ref/heap-f24.png').default} />
</p>

So, we'll move $n/2$ nodes on the bottom level 0 times. The $n/4$ nodes one level up move at most 1 time. Then, $n/8$ nodes move at most 2 times. And so on, until we get to the root node, which moves $\lg n$ times.

Adding this all up, we've got

\[
0\cdot\frac{n}{2}+1\cdot\frac{n}{4}+2\cdot\frac{n}{8}+3\cdot\frac{n}{16}+\cdots
\]

Alternatively, this can be expressed as a summation:

\[
n\cdot\sum\frac{i}{2^{i+1}}  
\]

The sum is a geometric series that converges to $1/2$. Then, multiplying by $n$, we have $n/2$. That's $O(n)$.
