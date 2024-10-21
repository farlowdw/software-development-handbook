---
title: >-
  Sorting (with attitude)
draft: false
description: >-
  This post takes a look at a number of different sorting techniques: heap sort, merge sort, quick sort and quick select, counting sort, radix sort, and bucket sort.
tags: 
  - Sorting
  - Heap Sort
  - Merge Sort
  - Quick Sort
  - Quick Select
  - Counting Sort
  - Radix Sort
  - Bucket Sort
  - Tutorial
  - Algorithms with Attitude
keywords: 
  - sorting
  - heap sort
  - merge sort
  - quick sort
  - counting sort
  - radix sort
  - bucket sort
  - algorithms with attitude
authors: 
  - farlow
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';
import TOCInline from '@theme/TOCInline';

import CodeGrid from '@site/src/components/CodeGrid';
import CodeGridCell from '@site/src/components/CodeGridCell';
import CodeEditor from '@site/src/components/CodeEditor';
import ImageCarousel from '@site/src/components/ImageCarousel';

<!-- import snippet1 from '!!raw-loader!./snippet-1.py'; -->

This post takes a look at a number of different sorting techniques: heap sort, merge sort, quick sort and quick select, counting sort, radix sort, and bucket sort.

<!--truncate-->

:::info Attribution

The notes below come from the [Algorithms with Attitude](https://www.youtube.com/@AlgorithmswithAttitude/playlists) YouTube channel, specifically the [Sorting](https://www.youtube.com/playlist?list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5) playlist comprised of the following videos: , [Heap Sort](https://www.youtube.com/watch?v=onlhnHpGgC4&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=1), [Merge Sort: Top-Down and Bottom-Up](https://www.youtube.com/watch?v=k3oezbZgfDs&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=2), [Quick Sort and Quick Select](https://www.youtube.com/watch?v=v-1EGgaTFuw&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=3), [Runtime Analysis for Quick Sort and Quick Select](https://www.youtube.com/watch?v=NvGitWFoSas&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=4), [Lower Bounds for Comparison Based Sorting: Decision Trees](https://www.youtube.com/watch?v=0ufNJSWOTqo&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=5), and [Linear Time Sorting: Counting Sort, Radix Sort, and Bucket Sort](https://www.youtube.com/watch?v=pJ1IQD5rv4o&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=6)

:::

There are several sections in this post, accessible in the table of contents on the right, but most of the sections have been listed below for ease of reference and navigation.

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Heap sort

:::info Context of following content concerning heap sort

There is [another post](/blog/2024/10/19/2024/binary-heaps#heap-sort) dedicated to binary heaps, where heap sort is discussed in the general context of heaps as a whole. The content below for heap sort has been excerpted from the linked post for the sake of completeness.

:::

### Overview

Suppose we have the `heapify` and `deleteMax` operations as well as the `buildHeap` operation. Heap sort is then quite easy: first, build a max-heap; then, delete all its values:

- `buildHeap()`
- `deleteMax()` $n$ times

Done.

### buildHeap() phase

For a bit more detail, we start with the `buildHeap` operation. We assume we're given an array of values to be sorted, and we use the space of that array to store the heap itself. One of the nice properties of heap sort is that it is an in-place algorithm &#8212; it only needs a fixed amount of memory beyond what is used to store the data being sorted.

### deleteMax() phase

Next, we delete the max value. We swap the root with the last leaf node (bottom level to the far right) and then delete the last leaf node &#8212; the new root value then has to be compared to its children and possibly sifted down the tree to ensure the properties of the whole heap and all sub-heaps are respected. We conclude the sifting down when what was previously the last leaf node is now either a leaf or the root of its own sub-heap.

We continue to call `deleteMax` until the entire array is empty. As indicated above, note that when `deleteMax` is called, we don't just overwrite the value to be deleted &#8212; we swap it with the last leaf of the heap, and continue as explained above. What happens is that we delete more and more items, and the heap gets smaller and smaller. But all of the values are still stored in the array, until finally, the heap is gone. 

### Analysis

- `buildHeap`: $O(n)$
- `deleteMax` $n$ times: $O(\lg n)$ each, $O(n\lg n)$ total

For our analysis, we had a `buildHeap` operation, which was $O(n)$ time, and then $n$ `deleteMax` operations, which are worst-case $O(\lg n)$ time each. That's $O(n\lg n)$ total time.

Note that we would still have an $O(n\lg n)$ algorithm even if we ran $n$ insertions to start the algorithm instead of the linear `buildHeap`. If we want to be more precise, we can better bound the total number of comparisons:

- `buildHeap`: $< 2n$ comparisons (CLRS)
- `delteMax` $n$ times: $< 2n\lg n$ comparisons (CLRS)

Note that the above are *not* asymptotic results. The `2` term above comes from the fact that to move down one level in `heapify` usually takes `2` comparisons, but that can be improved by optimizing the `heapify` method.

In all, heap sort gives us a worst-case $O(n\lg n)$ in-place sorting algorithm that is *not* stable. It's supposedly slower in practice than a good quicksort.

## Merge sort - top-down and bottom-up



## Quick sort and quick select



## Runtime analysis for quick sort and quick select



## Lower bounds for comparison based sorting - decision trees



## Linear time sorting - counting sort, radix sort, and bucket sort



