---
title: Sliding Window
hide_title: false
sidebar_label: Sliding window
description: Article on sliding window
draft: false
tags: [Sliding Window]
keywords: [sliding window]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';

## Introduction

TBD

## Pitfalls

### Issues with pointer boundaries

:::danger Index Out of Range Errors

Be mindful of potentially forgetting important boundary conditions of the `while` loop for variable-width sliding window solutions. For example, the solution to [one of the homework problems](#homework-lclp-ex1) could easily fail if `while left <= right and curr > k:` were changed to just `while curr > k:`:

```python
def max_subarray(nums, k):
    left = curr = ans = 0
    
    for right in range(len(nums)):
        curr += nums[right]
    
        # highlight-next-line
        while left <= right and curr > k:
            curr -= nums[left]
            left += 1
        
        curr_window_length = right - left + 1   
        if curr_window_length > ans:
            ans = curr_window_length
    
    return ans
```

The problem specifies that `nums` is a list of *positive* integers and that `k` is an integer. But what if `k` is a negative integer? For example, what if `nums = [1, 2, 3]` and `k = -2`? Since `curr` is initialized to `0`, the lowest possible value of `curr` is, in fact, `0`. Hence, if `k` is negative, it will *always* be the case that `curr > k`, thus resulting in what would be an infinite `while` loop. But since we try to compute `nums[left]` and `left` is being incremented for every iteration of the `while` loop, we will actually end up with a `IndexError: list index out of range` error as soon as `left` has been incremented past the length of `nums`.

We do not *always* have to have such a condition for our `while` loop. For example, the solution to [another homework problem](#homework-lclp-ex2) does not require such a condition because it isn't even possible for the `left` pointer to surpass the `right` pointer. Simply put: try to practice vigilance. For example, the following solution looks promising for <LC id='713' type='' />:

```python showLineNumbers
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k == 0:
            return 0
        
        left = ans = 0
        prod = 1

        for right in range(len(nums)):
            prod *= nums[right]

            # highlight-error-next-line
            while prod >= k:
                prod //= nums[left]
                left += 1

            ans += right - left + 1

        return ans
```

But what if `nums = [1, 1, 1]` and `k = 1`? Then the `while` loop will continue to execute until `left` has been incremented so that `nums[left]` throws an error when `left` becomes out of range.

:::

## Problems and exercises

### LeetCode

- <LC id='713' type='long' >Recall that the sliding window approach may apply to finding <em>the number</em> of subitems that satisfy some condition, but some mathematical trickery may be involved, specifically trickery that may involve endpoints.</LC>
- <LC id='643' type='long' >With fixed-width sliding window problems, sometimes the choice of building the initial window outside or within the main loop is not a toss-up. Sometimes one approach can be much cleaner than the other.</LC>
- <LC id='1004' type='long' >Draw out examples and walk through what your code needs to actually do. Sometimes this can save you from a lot of gnashing of teeth. In this case, where the left pointer is incremented within the while loop matters.</LC>
- <LC id='2348' type='long' >Sometimes a problem may seem to involve a sliding window but doesn't really. Take advantage of the right endpoint distinct subarray observation remarked on in LC 713.</LC>

### Warmups

#### Maximum sum subarray of size k

**Problem:** Given an integer array `nums` and an integer `k`, find the sum of the subarray with the largest sum whose length is `k`.

**Solution:** The phrasing of the problem indicates a fixed-width sliding window approach may be fruitful. We can either build the window outside the main loop:

```python title="Method 1 (build window outside main loop)"
def find_best_subarray(nums, k):
    curr = 0 
    # window is built here
    # highlight-start
    for i in range(k):
        curr += nums[i]
    # highlight-end
        
    ans = curr

    # window is updated here
    # highlight-start
    for i in range(k, len(nums)):
        curr += nums[i] - nums[i-k]
        ans = max(ans, curr)
    # highlight-end

    return ans
```

Or we can build the window within the main loop:

```python title="Method 2 (build window within main loop)"
def find_best_subarray(nums, k):
    curr = ans = 0
    for i in range(len(nums)):
        # window is built here
        # highlight-start
        if i < k:
            curr += nums[i]
        # highlight-end
        # window is updated here
        # highlight-start
        else:
            curr += nums[i] - nums[i-k]
            ans = max(ans, curr)
        # highlight-end
        
    return ans      
```

**Analysis:** tbd

### Basics

TBD

### Homework

#### Length of longest subarray whose sum is less than or equal to k {#homework-lclp-ex1}

**Problem:** Given an array of positive integers `nums` and an integer `k`, find the length of the longest subarray whose sum is less than or equal to `k`.

**Solution:** 

```python
def max_subarray(nums, k):
    left = curr = ans = 0
    
    for right in range(len(nums)):
        curr += nums[right]
    
        while left <= right and curr > k:
            curr -= nums[left]
            left += 1
        
        curr_window_length = right - left + 1   
        if curr_window_length > ans:
            ans = curr_window_length
    
    return ans
```

**Analysis:**

Let's consider a concrete example:

```
nums: [1, 3, 4, 2, 4, 1, 2, 6]
k: 9
```

Below is an illustration of how the 3-step template produces a solution (note how the window shrinks or expands based on whether or not the constraint is satisfied; a subarray with a <s>strike through it</s> indicates the subarray violates the constraint and has to be resized):

<pre>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1,&nbsp;3,&nbsp;4,&nbsp;2,&nbsp;4,&nbsp;1,&nbsp;2,&nbsp;6]{'\n'}
left:&nbsp;0,&nbsp;right:&nbsp;0,&nbsp;curr:&nbsp;1,&nbsp;&nbsp;ans:&nbsp;1,&nbsp;window&nbsp;-->&nbsp;[1]{'\n'}
left:&nbsp;0,&nbsp;right:&nbsp;1,&nbsp;curr:&nbsp;4,&nbsp;&nbsp;ans:&nbsp;2,&nbsp;window&nbsp;-->&nbsp;[1,&nbsp;3]{'\n'}
left:&nbsp;0,&nbsp;right:&nbsp;2,&nbsp;curr:&nbsp;8,&nbsp;&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;[1,&nbsp;3,&nbsp;4]{'\n'}
left:&nbsp;0,&nbsp;right:&nbsp;3,&nbsp;curr:&nbsp;10,&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;<s>[1,&nbsp;3,&nbsp;4,&nbsp;2]</s>{'\n'}
left:&nbsp;1,&nbsp;right:&nbsp;3,&nbsp;curr:&nbsp;9,&nbsp;&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;[3,&nbsp;4,&nbsp;2]{'\n'}
left:&nbsp;1,&nbsp;right:&nbsp;4,&nbsp;curr:&nbsp;13,&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;<s>[3,&nbsp;4,&nbsp;2,&nbsp;4]</s>{'\n'}
left:&nbsp;2,&nbsp;right:&nbsp;4,&nbsp;curr:&nbsp;10,&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<s>[4,&nbsp;2,&nbsp;4]</s>{'\n'}
left:&nbsp;3,&nbsp;right:&nbsp;4,&nbsp;curr:&nbsp;6,&nbsp;&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2,&nbsp;4]{'\n'}
left:&nbsp;3,&nbsp;right:&nbsp;5,&nbsp;curr:&nbsp;7,&nbsp;&nbsp;ans:&nbsp;3,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2,&nbsp;4,&nbsp;1]{'\n'}
left:&nbsp;3,&nbsp;right:&nbsp;6,&nbsp;curr:&nbsp;9,&nbsp;&nbsp;ans:&nbsp;4,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2,&nbsp;4,&nbsp;1,&nbsp;2]{'\n'}
left:&nbsp;3,&nbsp;right:&nbsp;7,&nbsp;curr:&nbsp;15,&nbsp;ans:&nbsp;4,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<s>[2,&nbsp;4,&nbsp;1,&nbsp;2,&nbsp;6]</s>{'\n'}
left:&nbsp;4,&nbsp;right:&nbsp;7,&nbsp;curr:&nbsp;13,&nbsp;ans:&nbsp;4,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<s>[4,&nbsp;1,&nbsp;2,&nbsp;6]</s>{'\n'}
left:&nbsp;5,&nbsp;right:&nbsp;7,&nbsp;curr:&nbsp;9,&nbsp;&nbsp;ans:&nbsp;4,&nbsp;window&nbsp;-->&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1,&nbsp;2,&nbsp;6]
</pre>

Now let's make explicit step-by-step use of our three-step template with the above illustration as a guide.

**Define window boundaries**

> 1\. Define pointers `left` and `right` that bound the left- and right-hand sides of the current window, respectively, where both pointers usually start at `0`.

Start by initializing `left` and `right` to be `0`:

```python
def max_subarray(nums, k):
    left = right = 0
    
    return 
```

**Add elements to window by moving right pointer**

> 2\. Iterate over the source array with the `right` bound to "add" elements to the window.

If we want to use `right` to iterate over the source array, `nums` in this case, then we can more effectively initialize `right` to be `0` by means of `for right in range(len(nums))` than simply `right = 0`. The "window" in this case is the subarray whose length is to be maximized while keeping the sum of its elements to be less than or equal to `k`. So what we really care about is keeping track of 

1. the sum generated by a window's elements
2. the length of the window that generated the sum.

We'll use `curr` to denote the sum generated by a window's elements (since the sum varies based on which window is being considered). And we'll use `ans` to keep track of the length of the longest subarray whose elements sum to a value less than or equal to `k`. Here's a starting point:

```python
def max_subarray(nums, k):
    left = curr = ans = 0
    
    for right in range(len(nums)):
        curr += nums[right]
    
    return 
```

**Remove elements from window by checking constraint and moving left pointer**

> 3\. Whenever the constraint is broken, "remove" elements from the window by incrementing the `left` bound until the constraint is satisfied again.

So far we have defined our `left` and `right` pointers, and we are set to use `right` to iterate over the source array and add elements to the window. But now, whenever the constraint is broken (i.e., whenever `curr > k`), we need to determine how to effectively increment/use `left`  to *remove* elements from the window until the constraint is satisfied again (i.e., `curr <= k`). All while making sure we use `ans` to keep track of the length of the longest subarray that satisfies the constraint.

The following code accomlishes exactly this:

```python showLineNumbers
def max_subarray(nums, k):
    left = curr = ans = 0
    
    for right in range(len(nums)):
        curr += nums[right]
    
        while curr > k:
            curr -= nums[left]
            left += 1
        
        curr_window_length = right - left + 1   
        if curr_window_length > ans:
            ans = curr_window_length
    
    return ans
```

:::info Recap

Note which lines of code correspond to each step in the template:

- **Step 1:** Lines `2` and `4` involve initializing `left` and `right` to `0`, respectively.
- **Step 2:** Lines `4` and `5` involve using `right` to iterate over `nums` and add elements to the window, respectively.
- **Step 3:** Whenever the constraint is broken (line `7`), "remove" elements from the window (line `8`) by incrementing the `left` bound (line `9`) until the constraint is satisfied again (line `7`).

Finally, lines `11-13` do not correspond to a specific step per se. They're simply necessary in the context of this problem (i.e., keeping track of the longest subarray whose elements sum to a value less than or equal to `k`). They could also be combined into a single line if desired: `ans = max(ans, right - left + 1)`.

:::

#### Length of longest substring containing only 1 after at most one operation {#homework-lclp-ex2}

**Problem:** You are given a binary substring `s` (a string containing only `"0"` and `"1"`). An operation involves flipping a `"0"` into a `"1"`. What is the length of the longest substring containing only `"1"` after performing at most one operation?

For example, given `s = "1101100111"`, the answer is `5`. If you perform the operation at index `2`, the string becomes `"1111100111"`.

**Solution:**

```python
def longest_substring(s):
    left = curr = ans = 0

    for right in range(len(s)):
        if s[right] == "0":
            curr += 1

        while curr > 1:
            left += 1
            if s[left] == "0":
                curr -= 1

        ans = max(ans, right - left + 1)

    return ans
```

**Analysis:** Because the string can only contain `"1"` and `"0"`, another way to look at this problem is "what is the longest substring that contains **at most one** `"0"`?". This makes it easy for us to solve with a sliding window where our condition is `window.count("0") <= 1`. Again, we can use an integer `curr` that keeps track of how many `"0"`s we currently have in our window.

The main trick here is knowing how to effectively shrink the window. Once `curr == 2`, we need to resize our window and get rid of the left-most `0`. We do this by incrementing the `left` pointer--once the `left` pointer has been moved beyond the left-most `0`, then we are back in business.

### Exam

#### LC 713. Subarray Product Less Than K {#exam-lclp-ex3}

**Problem (<LC id='713' type='' />):** Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than `k`. For example, given the input `nums = [10, 5, 2, 6]`, `k = 100`, the answer is `8`. The subarrays with products less than `k` are:

```
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
```

**Solution:**

```python showLineNumbers
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k == 0:
            return 0
        
        left = ans = 0
        prod = 1

        for right in range(len(nums)):
            prod *= nums[right]

            while left <= right and prod >= k:
                prod //= nums[left]
                left += 1

            # highlight-next-line
            ans += right - left + 1

        return ans
```

**Analysis:** This is a tricky problem. It may help to consider a concrete example other than the one given with the problem statement. Suppose we have the following:

```
nums = [10, 5, 20, 3, 7, 2, 50]
k = 100
```

If we were trying to find the length of the largest subarray whose product was less than `k`, then this would be a standard variable-width sliding window problem:

```python showLineNumbers
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        left = ans = 0
        prod = 1

        for right in range(len(nums)):
            prod *= nums[right]

            while left <= right and prod >= k:
                prod //= nums[left]
                left += 1

            # highlight-next-line
            ans = max(ans, right - left + 1)

        return ans
```

The highlighted line above is what we are used to for this kind of problem. For our specific example, the output would be `3`, which would be in reference to the subarray `[3, 7, 2]`, which has a product of `3 * 7 * 2 = 21 < 100`. But we want the *number* of *contiguous* subarrays where the product of all the elements in the subarray is strictly less than `k`. 

:::tip Right Endpoint of Valid Subarray Implies Subarray Length Counts Towards Total

With `nums = [10, 5, 20, 3, 7, 2, 50]` as above, how many subarrays of `nums` are there? Since `nums` has a total of `7` elements, it follows that `nums` has a total of $\frac{7(7+1)}{2}=28$ subarrays. Of these `28` subarrays, how many of them, when all of their elements are multiplied together, have a product strictly less than `k`?

The key insight to easily answering this question, in the context of using a sliding window approach, may be more easily understood if we define things more precisely. Specifically, let each subarray of `nums` be denoted by the interval notation $I[\alpha,\beta]$, where $0\leq\alpha\leq\beta\leq n-1$; hence, `nums` itself may be represented by $I[0, n-1]$. Let $P_{I[\alpha,\beta]}$ denote the product of all elements for some interval $I[\alpha,\beta]$. We're interested in finding the *number* of all intervals $I[\alpha,\beta]$ for which

$$
P_{I[\alpha,\beta]} = \prod_{i=\alpha}^\beta\texttt{nums[$i$]} < k
$$

Now for the clever part: if subarray/interval $I[\alpha,\beta]$ of `nums` satisfies the given constraint, then how many subarrays can we count towards the total we ultimately want to report? The naive answer would be $\frac{(\beta-\alpha)(\beta-\alpha+1)}{2}$, the total number of subarrays of $I[\alpha,\beta]$. But we need to be careful not to overcount.

For example, in the context of our problem, where `nums = [10, 5, 20, 3, 7, 2, 50]`, consider the subarray `[20, 3, 7]`. This subarray does not satisfy the constraint of the problem, but `[20, 3]` and `[3, 7]` do. If we counted the number of subarrays for each of these constraint-satisfying intervals towards the total, then we would count `6` because intervals `[20, 3]` and `[3, 7]` generate subarrays `[20], [3], [20, 3]` and `[3], [7], [3, 7]`, respectively. But note how we counted `[3]` twice. We overcounted!

How do we avoid overcounting? *By looking at the right endpoint of each constraint-satisfying interval.* Specifically, if $I[\gamma,\lambda]$ satisfies $P_{I[\gamma,\lambda]}<k$, then *the total number of subintervals of `nums` that have `\lambda` as their right endpoint is necessarily $\lambda-\gamma+1$* (i.e., the length of the subinterval). We add this number to our running total for every valid subinterval we come across. How does this ensure we avoid overcounting?

Consider the valid subarray $I[\gamma,\lambda]$. Here is an illustration of the $\lambda-\gamma+1$ subarrays that get added to the total (what each subarray looks like is illustrated by means of underbraces; note that $\gamma,\ldots,\lambda$ all refer to *indices* of `nums` while $I$-notation involves that actual subarrays of `nums` that are highlighted in the underbraces):

$$
\overbrace{[\underbrace{\gamma,\underbrace{\gamma+1,\ldots,\underbrace{\lambda-1,\underbrace{\lambda}_{\text{subarray 1}:\;I[\lambda]}]}_{\text{subarray 2}:\;I[\lambda-1,\lambda]}}_{\text{subarray $\scriptsize{\lambda-(\gamma+1)+1}$}:\;I[\gamma+1,\ldots,\lambda-1,\lambda]}}_{\text{subarray $\scriptsize{\lambda-\gamma+1}$}:\;I[\gamma,\ldots,\lambda]}}^{\lambda-\gamma+1\ \text{subarrays}}
$$

Now how *every* subarray above has $I[\lambda]$ as an element since $I[\lambda]$ is each subinterval's right endpoint. If we add an element to the window in question, then the index range for our window changes from $[\gamma,\lambda]$ to $[\gamma,\lambda+1]$. If $P_{I[\gamma,\lambda+1]}<k$, then how many subarrays should be added to our total? Our observations above indicate that the total added should be $(\lambda+1)-\gamma+1$. But how can we be certain that none of the subarrays coming from $I[\gamma,\lambda+1]$ have already been counted from $I[\gamma,\lambda]$? Because *every* subarray from $I[\gamma,\lambda+1]$ will have the element $I[\lambda+1]$ present as its right endpoint while *not a single subarray* from $I[\gamma,\lambda]$ could possibly have $I[\lambda+1]$ present:

$$
\overbrace{[\underbrace{\gamma,\underbrace{\gamma+1,\ldots,\underbrace{\lambda-1,\underbrace{\lambda,\underbrace{\lambda+1}_{\text{subarray 1}:\;I[\lambda+1]}}_{\text{subarray 2}:\; I[\lambda, \lambda+1]}}_{\text{subarray 3}:\;I[\lambda-1,\lambda,\lambda+1]}}_{\text{subarray $\scriptsize{(\lambda+1)-(\gamma+1)+1}$}:\;I[\gamma+1,\ldots,\lambda+1]}}_{\text{subarray $\scriptsize{(\lambda+1)-\gamma+1}$}:\;I[\gamma,\lambda+1]}]}^{(\lambda+1)-\gamma+1\ \text{subarrays}}
$$

Hence, for every subinterval we come across that satisfies the given constraint, we'll simply add its length to the overall running total.

:::

Our code, in light of the notes above, becomes the following (note how it involves only changing a single line):

```python showLineNumbers
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        left = ans = 0
        prod = 1

        for right in range(len(nums)):
            prod *= nums[right]

            while left <= right and prod >= k:
                prod //= nums[left]
                left += 1

            # highlight-next-line
            ans += right - left + 1

        return ans
```

:::info Seeing the Subarrays for Our Concrete Example

Let's return to our concrete example of `nums = [10, 5, 20, 3, 7, 2, 50]` with `k = 100`. If we add the line

```python
print(f'Window: [{nums[left]}, {nums[right]}], Index range: [{left}, {right}]')
```

right above or below the highlighted line in the solution above, then we get the following output:

```
Window: [10, 10], Index range: [0, 0]
Window: [10, 5], Index range: [0, 1]
Window: [20, 20], Index range: [2, 2]
Window: [20, 3], Index range: [2, 3]
Window: [3, 7], Index range: [3, 4]
Window: [3, 2], Index range: [3, 5]
Window: [50, 50], Index range: [6, 6]
```

In terms of our $I$-notation, where $I[\alpha,\beta]$ represents the window with index range $[\alpha,\beta]$, we have the following:

$$
\begin{alignat*}{2}
I[0,0]&\colon [10] &\to &[10]\\[0.5em]
I[0,1]&\colon [10,5]&\to &[5],[10,5]\\[0.5em]
I[2,2]&\colon [20]&\to &[20]\\[0.5em]
I[2,3]&\colon [20,3]&\to &[3],[20,3]\\[0.5em]
I[3,4]&\colon [3,7]&\to &[7],[3,7]\\[0.5em]
I[3,5]&\colon [3,7,2]&\to &[2],[7,2],[3,7,2]\\[0.5em]
I[6,6]&\colon [50]&\to &[50]\\[0.5em]
\end{alignat*}
$$

Hence, for our concrete example, a total of 12 subarrays satisfy the constraint.

:::


## Staging area

### Brain dump

- In general, a "sliding window" really refers to a technique of increasing the efficiency with which subitems may be assessed or processed against some constraint. This usually means taking a brute force algorithm from $O(n^2)$ or $O(nk)$ to just $O(n)$.
- Fundamentally, the ingenuity of the technique lies in how elements of subitems (i.e., "windows") are processed efficiently and without duplication of effort or computation. The idea is to avoid unnecessary work (i.e., computation).
- 2-step template for problems involving fixed-width windows:
  + Should the creation of the window happen before/outside the main loop?
  + Should the creation of the window happen within the main loop?
- 3-step template for problems involving variable-width windows:
  + Define window boundaries (i.e., where `left` and `right` should start, most often at index `0`)
  + Add elements to window by moving `right` pointer
  + Remove elements from window by checking constraint and moving `left` pointer
  + **Note:** Usage of a `while` loop involving the removal of elements from a window and incrementing of the `left` pointer is considered to be $O(1)$ due to amortized analysis.
- **Clever trick:** Whenever you see a problem asking for *the number of subarrays* that satisfy some condition, think of this: at each index, how many subarrays satisfying the constraint *end* at such an index? You may be fortunate as in [LC 713](#exam-lclp-ex3) to exploit some useful mathematical properties.

### Implementation

Uses two-pointers.

### Definition

From a structural standpoint, sliding windows are nothing more than iterables (i.e., an object capable of returning values one at a time) with ordered elements; that is, a sliding window is some sort of structure whose elements are ordered and may be iterated over. Most often this structure is an array or string.

### General algorithm

#### Variable window size

```
function fn(arr):
    left = 0
    for right in [0, arr.length - 1]:
        while left < right AND condition from problem not met:
            Do some logic to "remove" element at arr[left] from window
            left++

        Do some logic to "add" element at arr[right] to window
```

[Amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis) indicates the algorithm above will run in $O(n)$ time--the `while` loop is considered to be $O(1)$ since the `while` loop can only iterate $n$ times in total for the entire algorithm (`left` starts at `0`, only increases, and never exceeds `n`). So even though the `while` loop could run `n` times on a single iteration of the `for` loop, such an instance would necessarily mean that the `while` loop would not run at all for the other iterations of the `for` loop.

#### Fixed window size

When it is clear that a problem calls for a fixed-width sliding window approach, we can either build the initial window outside the main loop or within the main loop, where the "main loop" refers to where we put the logic for maintaining the window. Sometimes one approach is more appropriate than another. 

For example, in <LC id='643' type='' />, it's much cleaner to build the initial window *outside* the main loop:

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        curr = 0
        
        for i in range(k):
            curr += nums[i]
    
        ans = curr
        
        for i in range(k, len(nums)):
            curr += nums[i] - nums[i-k]
            ans = max(ans, curr)
            
        return ans / k
```

Of course, we can build the initial window *within* the main loop as well, but it is not as clean:

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        curr = 0
        ans = float('-inf')
        
        for i in range(len(nums)):
            if i < k:
                curr += nums[i]
                if i == k-1:
                    ans = max(ans, curr)
            else:
                curr += nums[i] - nums[i-k]
                ans = max(ans, curr)
            
        return ans / k
```

##### Window built outside main loop

```
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

##### Window built within main loop

```
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

## Identifying pattern relevance

A sliding window approach may be appropriate when a problem involves satisfying some constraint or condition in reference to a *sub*-item of a given size where that subitem may be a subarray, substring, etc. 