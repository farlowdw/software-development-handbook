---
title: Mental Model Templates
hide_title: false
sidebar_label: Mental models
description: Templates that express mental models for different problem-solving techniques, approaches, etc.
draft: false
tags: [Template]
keywords: [learning]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';
import Asterisk from '@site/src/components/Asterisk';
import {FootnoteRef} from 'react-a11y-footnotes';

## A


## B

### Binary search

Suppose we have a *search space*. It could be an array, a range, etc. Usually it's sorted in ascending order. For most tasks, we can transform the requirement into the following generalized form:

> Minimize `k` such that `condition(k)` is `True`.

The following code is the most generalized binary search template:

```python title="Pseudocode"
def binary_search(array) -> int:
    def condition(value) -> bool:
        pass

    left, right = min(search_space), max(search_space) # could be [0, n], [1, n], etc. Depends on problem.
    while left < right:
        mid = left + (right - left) // 2
        if condition(mid):
            right = mid
        else:
            left = mid + 1
    return left
```

What's really nice about this template is that, for most binary search problems, *we only need to modify three parts after copy-pasting this template, and we never need to worry about corner cases and bugs in our code anymore*:

- **Initialize boundary variables correctly:** Correctly initialize the boundary variables, `left` and `right`, to specify the search space. There's only one rule: set up the boundary to *include all possible elements*.
- **Determine return value:** Decide return value. Is it `return left` or `return left - 1`? Remember this: *after exiting the `while` loop, `left` is the minimal `k` satisfying the `condition` function*.
- **Design the `condition` function.** This is the most difficult and most beautiful part. A lot of practice is needed to perfect this part.

## C



## D



## E



## F



## G



## H



## I



## J



## K



## L



## M



## N



## O



## P



## Q



## R



## S

### Sliding window

#### Fixed-width

Sometimes a problem will specify a *fixed* subarray length. To build the initial window (from index `0` to `k - 1`, inclusive), you can either build it *outside of the main loop* or you can place the logic *inside your main loop* to only consider the window for the answer once it reaches size `k`. Pseudocode appears below for both methods.

##### Method 1 (build outside main loop)

```a title="Pseudocode"
// first approach
function fn(arr, k):
    curr = some data type to track the window

    // build the first window
    for i in [0, k - 1]:
        Do something with curr or other variables to build first window

    ans = answer variable, might be equal to curr here depending on the problem
    for i in [k, arr.length - 1]:
        Add arr[i] to window
        Remove arr[i - k] from window
        Update ans

    return ans
```

##### Method 2 (build within main loop)

```a title="Pseudocode"
// second approach
function fn(arr, k):
    curr = some data type to track the window
    ans = answer variable
    for i in range(len(arr)):
        if i >= k:
            Update ans
            Remove arr[i - k] from window
        Add arr[i] to window

    Update ans    
    return ans // Alternatively, you could do something like return max(ans, curr) 
               // if the problem is asking for a maximum value and curr is tracking that.
```

#### Variable-width

The idea behind the sliding window technique is to efficiently find the "best" window that fits some constraint. Usually, the problem description will define what makes a window "better" (e.g., shorter length, larger sum, etc.) and the constraint. Imagine that a problem wanted *the length of the longest subarray with a sum less than or equal to `k`* for an array with positive numbers. In this case, the constraint is `sum(window) <= k`, and the longer the window, the better it is. The general algorithm behind sliding window is as follows:

1. **Define window boundaries:** Define pointers `left` and `right` that bound the left- and right-hand sides of the current window, respectively, where both pointers usually start at `0`.
2. **Add elements to window by moving right pointer:** Iterate over the source array with the `right` bound to "add" elements to the window.
3. **Remove elements from window by checking constraint and moving left pointer:** Whenever the constraint is broken,  "remove" elements from the window by incrementing the `left` bound until the constraint is satisfied again.

```a title="Pseudocode"
function fn(arr):
    left = 0
    for right in [0, arr.length - 1]:
        while left < right AND condition from problem not met:
            Do some logic to "remove" element at arr[left] from window
            left++

        Do some logic to "add" element at arr[right] to window
```

With our "sum less than `k`" example, we can use a variable `curr` that keeps track of the current sum of the window. That way, we know when the sum exceeds `k`. We can "add" elements by doing `curr += arr[right]` and "remove" elements by doing `curr -= arr[left]`. The data and logic needed to maintain a window will vary between problems.

Note: The time complexity for the pseudocode is amortized $O(n)$ and *not* $O(n^2)$ even though it may seem to be otherwise due to the presence of the `while` loop (the worst case for an iteration inside the `for` loop is $O(n)$, but it averages out to $O(1)$ when considering the entire runtime of the algorithm). 

## T

### Two pointers

#### Pointers converge towards middle (start at extremes)

The following is one way of implementing the two pointers technique:

1. Start one pointer at the first index `0` and the other pointer at the last index `input.length - 1`.
2. Use a `while` loop until the pointers are equal to each other.
3. At each iteration of the loop, move the pointers towards each other. This means either increment the pointer that started at the first index, decrement the pointer that started at the last index, or both. Deciding which pointers to move will depend on the problem being solved.

```a title="Pseudocode"
function fn(arr):
  left = 0
  right = arr.length - 1

  while left < right:
    Do some logic here depending on the problem
    Do some more logic here to decide on one of the following:
      1. left++
      2. right--
      3. Both left++ and right--
```

This method will have a linear time complexity of $O(n)$, where `n = arr.length`, so long as the work done inside the `while` loop is $O(1)$.

#### Two iterables as input (start points at beginning)

The following manner of implementing the two pointers technique is notably applicable when the problem has two iterables as input (e.g., two arrays).

1. Create two pointers, one for each iterable. Each pointer should start at the first index.
2. Use a `while` loop until one of the pointers reaches the end of its iterable.
3. At each iteration of the loop, move at least one pointer. This means incrementing either one of the pointers or both of the pointers. Deciding which pointers to move will depend on the problem we are trying to solve.
4. Because our `while` loop will stop when one of the pointers reaches the end, the other pointer will not be at the end when the loop finishes. Sometimes, we need to iterate through all elements &#8212; if this is the case, then you will need to write extra code here to make sure both iterables are exhausted.

```a title="Pseudocode"
function fn(arr1, arr2):
  i = j = 0
  while i < arr1.length AND j < arr2.length:
    Do some logic here depending on the problem
    Do some more logic here to decide on one of the following:
      1. i++
      2. j++
      3. Both i++ and j++

  // make sure both iterables are exhausted
  while i < arr1.length:
    Do some logic here depending on the problem
    i++

  while j < arr2.length:
    Do some logic here depending on the problem
    j++
```

This method will have a linear time complexity of $O(n+m)$, where `n = arr1.length` and `m = arr2.length`, so long as the work done inside the `while` loop is $O(1)$.

## U



## V



## W



## X



## Y



## Z



