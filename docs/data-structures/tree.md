---
title: Tree
hide_title: false
sidebar_label: Tree
description: Overview of tree data structure.
draft: false
tags: 
  - Tree
keywords: 
  - tree
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Description

Good for storing hierarchies. Each node can have "child" nodes. A tree organizes values hierarchically.

<div align='center' className='centeredImageDiv'>
  <img width="400px" src={require('@site/static/img/dsa/quick-ref/tree-f2.png').default} />
</div>

Each entry in the tree is called a node, and every node links to zero or more child nodes. If you flip the picture upside down, it kind of looks like a tree. That's where the name comes from!

## Visual description

<div align='center' className='centeredImageDiv'>
  <img width="400px" src={require('@site/static/img/dsa/quick-ref/tree.png').default} />
</div>

## Example uses

- **Filesystems:** files inside folders inside folders
- **Comments:** comments, replies to comments, replies to replies
- **Family trees:** parents, grandparents, children, and grandchildren

### Leaves, Depth, and Height

#### Leaf nodes
 
Leaf nodes are nodes that are on the bottom of the tree (more formally: nodes that have no children). Each node in a tree has a **depth**: the number of links from the root to the node. A tree's **height** is the number of links from its root to the furthest leaf. (That's the same as the maximum node depth.)

<div align='center' className='centeredImageDiv'>
  <img width="375px" src={require('@site/static/img/dsa/quick-ref/tree-f3.png').default} />
</div>

### Tree Traversals

**Breadth First Search (BFS):** In a BFS, you first explore all the nodes one step away, then all the nodes two steps away, etc.. Breadth-first search is like throwing a stone in the center of a pond. The nodes you explore "ripple out" from the starting point. Here's a sample tree, with the nodes labeled in the order they'd be visited in a BFS.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/tree-f4.png').default} />
</div>

**Depth First Search (DFS):** In a DFS, you go as deep as possible down one path before backing up and trying a different one. Depth-first search is like walking through a corn maze. You explore one path, hit a dead end, and go back and try a different one. Here's a how a DFS would traverse the same example tree:

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/tree-f5.png').default} />
</div>

**Comparing BFS and DFS:** 

- A BFS will find the **shortest path** between the starting point and any other reachable node. A depth-first search will not necessarily find the shortest path.
- Depth-first search on a binary tree *generally* requires less memory than breadth-first.
- Depth-first search can be easily implemented with recursion.

You can also use BFS and DFS on graphs.

### Pre Order Traversal

Visit the current node, then walk the left subtree, and finally walk the right subtree.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/tree-f6.png').default} />
</div>

A pre-order traversal usually visits nodes in the same order as a DFS.

### In Order Traversal

Walk the left subtree first, then visit the current node, and finally walk the right subtree.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/tree-f7.png').default} />
</div>

Of all three traversal methods, this one is probably the most common. When walking a binary search tree, an in order traversal visits the nodes in sorted, ascending order.

### Post Order Traversal

Walk the left subtree, then the right subtree, and finally visit the current node.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/tree-f8.png').default} />
</div>

This one's kind of rare ... but it shows up in some parsing algorithms, like [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).

### Binary Trees

A **binary tree** is a tree where every node has at most two children.

<div align='center' className='centeredImageDiv'>
  <img width="375px" src={require('@site/static/img/dsa/quick-ref/tree-f9.png').default} />
</div>

#### Full binary trees

A **full binary tree** is a binary tree where every node has exactly 0 or 2 children.

<div align='center' className='centeredImageDiv'>
  <img width="175px" src={require('@site/static/img/dsa/quick-ref/tree-f10.png').default} />
</div>

#### Perfect binary trees

A perfect binary tree doesn't have room for any more nodes—-unless we increase the tree's height.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/tree-f11.png').default} />
</div>

#### Complete binary trees

A **complete binary tree** is like a perfect binary tree missing a few nodes in the last level. Nodes are filled in from left to right.

<div align='center' className='centeredImageDiv'>
  <img width="350px" src={require('@site/static/img/dsa/quick-ref/tree-f12.png').default} />
</div>

Complete trees are the basis for heaps and priority queues.

#### Balanced binary trees

A **balanced binary tree** is a tree whose height is small relative to the number of nodes it has. By small, we usually mean the height is $O(\lg n)$, where $n$ is the number of nodes. Conceptually, a *balanced* tree "looks full," without any missing chunks or branches that end much earlier than other branches.

<div align='center' className='centeredImageDiv'>
  <img width="450px" src={require('@site/static/img/dsa/quick-ref/tree-f13.png').default} />
</div>

There are few different definitions of balanced depending on the context. One of the most common definition is that a tree is balanced if: 

- (a) the heights of its left and right subtrees differ by at most 1, and 
- (b) both subtrees are also balanced.

Similar definitions can be used for trees that have more than two children. For instance, a full ternary tree (with up to three children per node) is a tree where every node has zero or three children.

### Relationship between height and number of nodes

In perfect binary trees there's a cool mathematical relationship between the number of nodes and the height of the tree. First, there's a pattern to how many nodes are on each level:

1. Level 0: $2^0=1$ nodes,
2. Level 1: $2^1=2$ nodes,
3. Level 2: $2^2=4$ nodes,
4. Level 3: $2^3=8$ nodes,
5. etc.

Let's call the total number of nodes in the tree $n$, and the height of the tree $h$. We could solve for $n$ by adding up the number of nodes on each level in the tree:

\[
n=2^0+2^1+2^2+\cdots+2^{h-2}+2^{h-1}=2^h-1.  
\]

Solving for $h$ in terms of $n$, we get

$$
\begin{align*}
n=2^h-1
&\iff n+1=2^h\\[0.5em]
&\implies \log_2(n+1) = \log_2(2^h)\\[0.5em]
&\implies \log_2(n+1) = h.
\end{align*}
$$

That's the relationship between a perfect binary tree's height and the number of nodes it has. This is the intuition behind our definition of balanced that we used above. A perfect tree is balanced, and in a perfect tree the height grows logarithmically with the number of nodes.

## Binary search tree

**Description:** Everything in the left subtree is smaller than the current node, everything in the right subtree is larger. $O(\lg n)$ lookups but only if the tree is balanced! A binary search tree is a binary tree where the nodes are ordered in a specific way. For every node:

- The nodes to the left are *smaller* than the current node.
- The nodes to the right are *larger* than the current node.

Checking if a binary tree is a binary *search* tree is a favorite question from interviews.

<div align='center' className='centeredImageDiv'>
  <img width="400px" src={require('@site/static/img/dsa/quick-ref/binary-search-tree-f2.png').default} />
</div>


**Visual description:**

<div align='center' className='centeredImageDiv'>
  <img width="400px" src={require('@site/static/img/dsa/quick-ref/binary-search-tree.png').default} />
</div>

**Strengths:**

- **Good performance across the board:** Assuming they're balanced, binary search trees are good at lots of operations, even if they're not constant time for anything.
  + Compared to a sorted array, lookups take the same amount of time (i.e., $O(\lg n)$), but inserts and deletes are faster (i.e., $O(\lg n)$ for BSTs and $O(n)$ for arrays).
  + Compared to objects, BSTs have better *worst case* performance (i.e., $O(\lg n)$ instead of $O(n)$). But, on average, objects perform better than BSTs (meaning $O(1)$ time complexity).
- **BSTs are sorted:** Taking a binary search tree and pulling out all of the elements in sorted order can be done in $O(n)$ using an in-order traversal. Finding the element closest to a value can be done in $O(\lg n)$ (again, if the BST is balanced!).

**Weaknesses:** 

- **Poor performance if unbalanced:** Some types of binary search trees balance automatically, but not all. If a BST is not balanced, then operations become $O(n)$.
- **No $O(1)$ operations:** BSTs aren't the *fastest* for anything. On average, an array or an object will be faster.

**Unbalanced (worst case) Cost Analysis:**

| Context | Big O |
| :-- | :-- |
| space | $O(n)$ |
| insert | $O(n)$ |
| lookup | $O(n)$ |
| delete | $O(n)$ |

**Balanced Cost Analysis:**

| Context | Big O |
| :-- | :-- |
| space | $O(n)$ |
| insert | $O(\lg n)$ |
| lookup | $O(\lg n)$ |
| delete | $O(\lg n)$ |

### Balanced Binary Search Trees

Two binary search trees can store the same values in different ways:

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/binary-search-tree-f3.png').default} />
</div>

Some trees (like AVL trees or Red-Black trees) rearrange nodes as they're inserted to ensure the tree is always balanced. With these, the worst case complexity for searching, inserting, or deleting is always $O(\lg n)$, not $O(n)$.
