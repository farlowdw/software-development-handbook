---
title: Array
hide_title: false
sidebar_label: Array
description: Overview of array data structure.
draft: false
last_update: 
  date: '2022-07-22'
  author: farlow
tags: [Array]
keywords: [array]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ArrayStaticTC from '@site/docs/_Partials/_time-and-space-complexities/_array-static.mdx';
import ArrayDynamicTC from '@site/docs/_Partials/_time-and-space-complexities/_array-dynamic.mdx';

## Snapshot Overview

<Tabs>
<TabItem value='tc-worst' label='TC - Worst'>

tbd

</TabItem>
<TabItem value='tc-average' label='TC - Average'>

tbd

</TabItem>
<TabItem value='summary' label='Quick Summary'>

tbd

</TabItem>
</Tabs>

## Static Array

### Description

Stores things in order. Has quick lookups by index. An array organizes items sequentially, one after another in memory. Each position in the array has an index, starting at 0.

### Strengths

#### Fast lookups

Retrieving the element at a given index takes $O(1)$ time, regardless of the length of the array.

#### Fast appends

Adding a new element at the end of the array takes $O(1)$ time (i.e., if the array has space).

### Weaknesses

#### Fixed size

You need to specify how many elements you're going to store in your array ahead of time. (Unless you're using a dynamic array.)

#### Inserts and deletes

You have to "scoot over" the other elements to fill in or close gaps, which takes worst-case $O(n)$ time (i.e., inserts and deletes can be costly).

### Time Complexity - Worst Case Analysis {#tc-static-array}

<ArrayStaticTC />

## Dynamic Array

Also known as an array list, growable array, resizable array, or mutable array.

### Description

An array that automatically grows as you add more items. A dynamic array is an array with a big improvement: automatic resizing. One limitation of arrays is that they're fixed size, meaning you need to specify the number of elements your array will hold ahead of time. A dynamic array expands as you add more elements. So you don't need to determine the size ahead of time.

### Strengths

#### Fast Lookups

Just like static arrays, retrieving the element at a given index takes $O(1)$ time.

#### Variable Size

You can add as many items as you want, and the dynamic array will expand to hold them.

#### Cache-friendly

Just like arrays, dynamic arrays place items right next to each other in memory, making efficient use of caches.

### Weaknesses

#### Appends (worst-case)

Usually, adding a new element at the end of the dynamic array takes $O(1)$ time. But if the dynamic array doesn't have any room for the new item, it'll need to expand, which takes $O(n)$ time.

#### Inserts and deletes

Just like arrays, elements are stored adjacent to each other. So adding or removing an item in the middle of the array requires "scooting over" other elements, which takes $O(n)$ time.

### Time Complexity - Worst Case Analysis {#tc-dynamic-array}

<ArrayDynamicTC />

### Miscellaneous

#### Size vs. capacity

When you allocate a dynamic array, your dynamic array implementation makes an *underlying fixed-size array*. The starting size depends on the implementation--let's say our implementation uses 10 indices. Now say we append 4 items to our dynamic array. At this point, our dynamic array has a length of 4. But the *underlying array* has a length of 10. We'd say this dynamic array's *size* is 4 and its *capacity* is 10. The dynamic array stores an `endIndex` to keep track of where the dynamic array ends and the extra capacity begins.

#### Doubling appends

What if we try to append an item but our array's capacity is already full? To make room, dynamic arrays automatically make a new, bigger underlying array. Usually twice as big. Why not just *extend* the existing array? Because that memory might already be taken by another program. Each item has to be individually copied into the new array.

Copying each item over costs $O(n)$ time. So whenever appending an item to our dynamic array forces us to make a new double-size underlying array, that append takes $O(n)$ time. That's the worst case. But in the best case (and the average case), appends are just $O(1)$ time.

#### Amortized cost of appending

In finance, amortize means to write off a cost of an asset gradually. In computer science, [amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis) means something similar:

> In computer science, amortized analysis is a method for analyzing a given algorithm's complexity, or how much of a resource, especially time or memory, it takes to execute. The motivation for amortized analysis is that looking at the worst-case run time can be too pessimistic. Instead, amortized analysis averages the running times of operations in a sequence over that sequence. As a conclusion: "Amortized analysis is a useful tool that complements other techniques such as worst-case and average-case analysis."

In the context of appending items to an array, specifically a *dynamic* array, we have the following simplified amortized analysis:

1. The time cost of each special $O(n)$ "doubling append" *doubles* each time.
2. At the same time, the number of $O(1)$ *appends* you get until the *next doubling* append *also doubles*.

These two things sort of "cancel out," and we can say each append has an average cost or amortized cost of $O(1)$. Given this, in industry we usually wave our hands and say dynamic arrays have a time cost of $O(1)$ for appends, even though strictly speaking that's only true for the average case or the amortized cost.

### Interview considerations

#### Clarifications

##### Duplicates

Clarify if there are duplicate values in the array. Would the presence of duplicate values affect the answer? Does it make the question simpler or harder?

#### Mistakes

##### Boundary conditions

When using an index to iterate through array elements, be careful not to go out of bounds. In particular, be mindful to not commit [off-by-one](https://en.wikipedia.org/wiki/Off-by-one_error) errors.

##### Unnecessary space consumption

Be mindful about slicing or concatenating arrays in your code. Typically, slicing and concatenating arrays would take $O(n)$ time. Use start and end indices to demarcate a subarray/range where possible. Also ask clarifying questions as to whether or not any original array needs to be preserved--if not, then you may be able to make needed modifications *in-place*.

#### Exceptions

Be on the lookout for the following corner cases when dealing with arrays:

- Empty
- Only 1 or 2 elements
- Repeated elements (i.e., contiguous elements with the same value)
- Duplicated elements
