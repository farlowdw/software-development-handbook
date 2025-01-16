---
title: Difference arrays (toolbox)
draft: false
description: This post explores difference arrays.
tags: 
  - Difference Array
  - Toolbox
keywords: 
  - difference array
  - prefix sum
  - tutorial
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
import ToolboxDisclaimer from '@site/blog/_Partials/toolbox/disclaimer.md';

import LC370PS from '@site/docs/_Partials/problem-stems/lc370.md';

import snippet1 from '!!raw-loader!./snippet-1.py';

This post explores what difference arrays are and why one might want to use them in a variety of problem-solving contexts. Sections in this post are listed below for ease of reference and navigation.

<!--truncate-->

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

<ToolboxDisclaimer />

:::key Key Idea

A "difference array" is conventionally used to cleverly handle *range updates* efficiently. What is a range update? The exact meaning can vary depending on context, but the traditional context is when we have an input array of length $n$, say `nums`, and we have a number of `updates` we want to make, say $q$, over various ranges of the input array, where each update has the format `[left, right, value]` or some equivalent form. The narrative for each update generally goes something like the following: "Between `left` and `right` in `nums`, inclusive, an update or change of `value` occurs." The goal is to find the cumulative effect of all such updates.

The naive or brute force approach involves iterating over `nums` from `left` to `right` and doing something with `value` for each update. The resultant time complexity is typically $O(nq)$. Why? Because each update in `updates` could span the entire length of `nums` (i.e., `left = 0` and `right = len(nums) - 1`), each update is $O(n)$, and we have $q$ updates in total, which results in $O(nq)$ time.

Difference arrays reduce the $O(nq)$ time of the brute force approach to $O(n + q)$ by batching together all range updates and then observing the cumulative effect, where each range update is made in constant time. That's the key. *Each range update takes $O(1)$ time.* Hence, after making $q$ range updates, at a cost of $O(1)$ each, we then observe the cumulative effect by iterating over `nums`, at a cost of $O(n)$, resulting in a total cost of $O(n + q)$.

:::

## Problems

The first problem below is a quintessential differency array problem. Its basic application is illustrated. For other problems, it's helpful to keep in mind that sometimes left-padding and/or right-padding the difference array can simplify logic.

### Range Addition (LC 370) [Quintessential problem with right-padding]

> **<LC id='370' type='long' ></LC>:** 
>
> <LC370PS />

Let's use the first example for the LeetCode problem above, where the input is 

```
length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
```

and the expected output is

```
[-2,0,3,5,3]
```

Let `res` denote the `0`-filled array of length `length` that we ultimately need to make the updates to and return: `res = [0,0,0,0,0]`. The brute force approach requires that we make each update in turn:

```python title="Brute force approach"
res  = [ 0,0,0,0,0]   # initial state
    -> [ 0,2,2,2,0]   # after update[0] -> [1,3, 2]
    -> [ 0,2,5,5,3]   # after update[1] -> [2,4, 3]
    -> [-2,0,3,5,3]   # after update[2] -> [0,2,-2]
```

Using a difference array, `diff = [0,0,0,0,0]`, we batch all updates, where each update is made in $O(1)$ time:

```python
diff  = [ 0, 0, 0, 0, 0]  # initial state
     -> [ 0, 2, 0, 0,-2]  # after update[0]; +2 at left boundary (index 1) and -2 beyond right boundary (index 3)
     -> [ 0, 2, 3, 0,-2]  # after update[1]; +3 at left boundary (index 2); skip after right boundary (no elements)
     -> [-2, 2, 3, 2,-2]  # after update[2]; -2 at left boundary (index 0) and +2 beyond right boundary (index 2)
```

As we saw above, the desired output is `[-2,0,3,5,3]`. How does the final difference array `[-2, 2, 3, 2,-2]` help us get that output? Again, we'll start with `res = [0,0,0,0,0]`, but this time we'll maintain a running/cumulative/prefix sum of the `diff` array for each index of `res`:

```python title="Difference array approach"
res  = [ 0,0,0,0,0]  # initial state
    -> [-2,0,0,0,0]  # after update 1: diff[0] == -2
    -> [-2,0,0,0,0]  # after update 2: diff[0] + diff[1] == -2 + 2 == 0
    -> [-2,0,3,0,0]  # after update 3: diff[0] + diff[1] + diff[2] == -2 + 2 + 3 == 3
    -> [-2,0,3,5,0]  # after update 4: diff[0] + diff[1] + diff[2] + diff[3] == -2 + 2 + 3 + 2 == 5
    -> [-2,0,3,5,3]  # after update 5: diff[0] + diff[1] + diff[2] + diff[3] + diff[4] == -2 + 2 + 3 + 2 + (-2) == 3
```

We can see everything above in action in the following interactive code editor:

<CodeEditor initialCode={snippet1} editorSettings={{ height: '50vh' }} foldedRegions={[[1,6]]} />

The brute force approach is not accepted if you try to use it on LeetCode's platform for <LC id='370' type='' ></LC>. Specifically, it fails a test case of length `60000` where each update is of the form `[1, 59999, 2]` (i.e., all 60,000 updates are of this form). The approach above using a difference array, however, is accepted:

```python
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        diff = [0] * length
        for left, right, val in updates:
            diff[left] += val
            if right + 1 < length:
                diff[right + 1] -= val
        
        res = [0] * length
        curr_diff = 0
        for i in range(length):
            curr_diff += diff[i]
            res[i] = curr_diff
        
        return res
```

It's not uncommon to pad the difference array on the right to avoid the `if` block above; that is, instead of checking to see if any elements remain before undoing the update change past the right boundary, we just always make the undoing change and simply don't use the last element in the difference array:

```python
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        #highlight-success-next-line
        diff = [0] * (length + 1)
        for left, right, val in updates:
            diff[left] += val
            #highlight-success-next-line
            diff[right + 1] -= val
        
        res = [0] * length
        curr_diff = 0
        for i in range(length):
            curr_diff += diff[i]
            res[i] = curr_diff
        
        return res
```

This can be really handy for a number of problems that use difference arrays. In some situations, we may even want to left-pad the difference array (e.g., when dealing with 1-indexed arrays or the like).

### Shifting Letters II (LC 2381)





## Referenced materials and highlights

The following materials were referenced/consulted either directly or indirectly when jotting out the ideas above.

- [Advanced Range Update Strategies: Leveraging Difference Arrays for Optimal Performance](https://www.linkedin.com/pulse/advanced-range-update-strategies-leveraging-arrays-optimal-risvi-y-bh7wc/) (LinkedIn)
- [An Introduction to Difference Arrays](https://codeforces.com/blog/entry/78762) (Codeforces)
- [Difference Array Technique](https://www.youtube.com/watch?v=96RG7EBF8LI) (YouTube)

### LinkedIn article

The [LinkedIn](https://www.linkedin.com/pulse/advanced-range-update-strategies-leveraging-arrays-optimal-risvi-y-bh7wc/) article is nice in some ways and misses the mark in others. Some of the higher-quality excerpts are reproduced below:

- > In many computational scenarios, efficiently updating a range of elements within an array is crucial, especially when dealing with large datasets or performing multiple operations. Traditional approaches, which involve iterating through each element in the range, can be time-consuming and inefficient. However, the combination of difference arrays and cumulative sums provides an optimized method for handling range updates, reducing complexity and improving performance.
- > Range updates involve modifying a continuous subset of elements within an array. For example, consider an array representing product prices where you need to apply a discount to a specific range of products. Directly updating each element within the range can be inefficient, especially for large arrays or when multiple updates are required.
  >
  > The goal of efficient range updates is to perform these modifications with minimal time complexity. Instead of iterating over each element in the range, we can use difference arrays to mark the start and end of the updates, followed by a cumulative sum calculation to apply the changes across the entire array.

    :::dwf Overlapping updates is what matters most

    This is a major missed mark in this article, and it shows up more insidiously in the "Practical Use Case: Dynamic Pricing in E-Commerce" section. Multiple updates are not a big deal if none of them overlap. You're forced to make the updates. The key idea is to efficiently handle multiple *overlapping* updates in order to not have to iterate over the same elements multiple times.

    :::

- > A **difference array** is a technique that enables efficient range updates by focusing on the boundaries of the range rather than updating each element individually. The idea is simple: rather than updating every element within the range, you increment the value at the start of the range and decrement the value just after the end of the range. This approach captures the necessary changes and allows the final array values to be computed efficiently using cumulative sums.
  > 
  > **Start of the Range:** Increment the value at the starting index to mark the beginning of the update.
  >
  > **End of the Range:** Decrement the value just after the end index to indicate the termination of the update effect.
  >
  > Once all range updates are applied to the difference array, a cumulative sum is calculated to reconstruct the original array with all updates applied.

    :::dwf Overlapping updates are efficiently handled by interleaved boundary updates

    This is the hardest part to understand when first learning about difference arrays. We can effectively account for *all* necessary changes by only incrementing and decrementing the beginning and end of the range updates, respectively. This makes it possible to efficiently handle numerous potential overlapping range updates.

    :::

- > After using the difference array to mark the range updates, the next step is to calculate the cumulative sum. The cumulative sum at each index represents the total effect of all preceding updates up to that point. By iterating through the difference array and accumulating the values, you obtain the final array with all range updates applied efficiently.