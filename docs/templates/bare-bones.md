---
title: Bare Bones Templates
hide_title: false
sidebar_label: Bare bones
description: Article on bare bones templates
draft: false
tags: 
  - Templates
keywords: 
  - template
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';

## Introduction

This page is meant for bare bones templates in approaching different problems.

## Prefix sum

<details>
<summary> Remarks</summary>

A [prefix sum](https://en.wikipedia.org/wiki/Prefix_sum) is a technique that can be used with numeric arrays (i.e., arrays whose elements are numbers such as floats or integers). The idea is to create an array `prefix` where `prefix[i]` is the sum of all elements up to the index `i` (**inclusive**). For example, given `nums = [5, 2, 1, 6, 3, 8]`, we would have `prefix = [5, 7, 8, 14, 17, 25]`.

Prefix sums allow us to find the sum of any subarray in $O(1)$. If we want the sum of the subarray from `i` to `j` (**inclusive**), then the answer is `prefix[j] - prefix[i - 1]`, or `prefix[j] - prefix[i] + nums[i]` if you don't want to deal with the out of bounds case when `i = 0` (i.e., when you need a subarray sum where the subarray has as its left endpoint the left endpoint of the parent array).

A prefix sum is a great tool whenever a problem involves sums of a subarray. It only costs $O(n)$ to build but allows all future subarray queries to be $O(1)$, so it can usually improve an algorithm's time complexity by a factor of $O(n)$, where $n$ is the length of the array.

Here is a simple implementation of building a prefix sum array in Python, as outlined in the block of pseudocode below:

```python
def create_prefix_array(self, nums):
    prefix_array = [nums[0]]
    for i in range(1,len(nums)):
        prefix_array.append(nums[i] + prefix_array[-1])
        
    return prefix_array
```

</details>

```a title="Pseudocode (building a prefix sum)"
Given: nums, an array with numeric values

prefix = [nums[0]]
for i in [1, len(nums) - 1]:
    prefix.append(nums[i] + prefix[prefix.length - 1])
```

<details>
<summary> LeetCode problem examples</summary>

<details>
<summary> <LC id='2270' type='long' ></LC> </summary>

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        prefix = [nums[0]]
        for i in range(1, len(nums)):
            prefix.append(nums[i] + prefix[-1])

        ans = 0
        for i in range(len(nums) - 1):
            left_part = prefix[i]
            right_part = prefix[-1] - prefix[i]
            if left_part >= right_part:
                ans += 1

        return ans
```

Or use the *idea* of a prefix sum but exploit the problem constraints to only use $O(1)$ space:

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        ans = left_part = 0
        total = sum(nums)

        for i in range(len(nums) - 1):
            left_part += nums[i]
            right_part = total - left_part
            if left_part >= right_part:
                ans += 1

        return ans
```

</details>

</details>

## Sliding window

### Variable window size

<details>
<summary> Remarks</summary>

The general algorithm behind the sliding window pattern (variable width) is as follows:

1. **Define window boundaries:** Define pointers `left` and `right` that bound the left- and right-hand sides of the current window, respectively, where both pointers usually start at `0`.
2. **Add elements to window by moving right pointer:** Iterate over the source array with the `right` bound to "add" elements to the window.
3. **Remove elements from window by checking constraint and moving left pointer:** Whenever the constraint is broken,  "remove" elements from the window by incrementing the `left` bound until the constraint is satisfied again.

Note the usage of the non-strict inequality `left <= right` in the `while` loop &#8212; this makes sense for problems where a single-element window is valid; however, the inequality should be strict (i.e., `left < right`) for problems where a single-element window does not make sense.

</details>

```a title="Pseudocode (variable-width sliding window)"
function fn(arr):
    // initialize left boundary, window, and answer variables
    left = curr = ans = 0

    // initialize right boundary
    for right in [0, arr.length - 1]:

        // logic for adding element arr[right] to window
        curr += nums[right]

        // resize window if invalid
        while left <= right AND condition from problem not met (e.g., curr > k):
            
            // logic to remove element from window
            curr -= nums[left]
            
            // shift window
            left++

        // logic to update answer
        ans = max(ans, right - left + 1)
    
    return ans
```

<details>
<summary> LeetCode problem examples</summary>

<details>
<summary> <LC id='713' type='long' ></LC> </summary>

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        left = ans = 0
        curr = 1
        for right in range(len(nums)):
            curr *= nums[right]
            while left <= right and curr >= k:
                curr //= nums[left]
                left += 1
            
            ans += right - left + 1
        
        return ans
```

:::caution

Note that this solution only works because the product for subarrays increases as the subarray gets bigger. Additionally, this makes use of the insight/trick that the total number of subarrays contributed by any window equals the length of the window.

:::

</details>

</details>

### Fixed window size

#### Method 1 (build window outside main loop)

<details>
<summary> Remarks</summary>

- **Window size greater than array size (possibility):** There is a chance that the window size `k` is greater than the array size `arr.length` &#8212; if not properly accounted for, this could easily lead to index out of range errors (it's not accounted for in the pseudocode below). It is often not a bad idea to have a check for this before proceeding with the window creation operation.
- **Clarity:** Method 1 appears to be somewhat cleaner than Method 2 despite having another `for` loop. The construction of the window and initialization of `ans` is unambiguous and easy to understand in Method 1. We start by building the window, we set the initial answer, and then we move the window while iterative updating the answer. It's easier to keep things clear and straight with this approach.

</details>

```a title="Fixed sliding window (window constructed outside main loop)"
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

<details>
<summary> LeetCode problem examples</summary>

<details>
<summary> <LC id='643' type='long' ></LC> </summary>

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        curr = 0
        for i in range(k):
            curr += nums[i]
            
        ans = curr / k
        
        for i in range(k, len(nums)):
            curr += nums[i] - nums[i-k]
            ans = max(ans, curr / k)
            
        return ans
```

</details>

</details>

#### Method 2 (build window within main loop)

<details>
<summary> Remarks</summary>

- **Window size greater than array size (possibility):** There is a chance that the window size `k` is greater than the array size `arr.length` &#8212; if not properly accounted for, this could easily lead to index out of range errors (it's not accounted for in the pseudocode below). It is often not a bad idea to have a check for this before proceeding with the window creation operation.
- **Initialization of `ans`:** Sometimes it can be a little unclear as to how best to initialize the `ans` variable. For example, in <LC id='643' type='' ></LC> we are looking for a "maximum average subarray" which means initializing `ans` to, say, `0` does not make sense because the maximum average could be negative depending on what elements are present in the array. It makes more sense in this problem to have `ans = float('-inf')` as the initialization even though it does not feel all that natural.
- **Complicated logic:** The logic for managing the window is actually a bit more complicated than that used in Method 1. Here, in Method 2, the window is really being constructed by adding `arr[i]` to the window *until* `i == k`. If our array only has `k` elements, then our updating of `ans` before we return can save us from possible errors, but the whole thing takes a bit more effort to wrap your head around.

</details>

```a title="Fixed sliding window (window constructed inside main loop)"
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

<details>
<summary> LeetCode problem examples</summary>

<details>
<summary> <LC id='643' type='long' ></LC> </summary>

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        curr = 0
        ans = float('-inf')
        for i in range(len(nums)):
            if i >= k:
                ans = max(ans, curr / k)
                curr -= nums[i-k]
            curr += nums[i]
            
        ans = max(ans, curr / k)
        return ans
```

</details>

</details>

## Two pointers

### Extremes to middle

<details>
<summary> Remarks</summary>

The strength of this technique is that we will never have more than $O(n)$ iterations for the `while` loop because the pointers start $n$ units away from each other and move at least one step closer on every iteration. Therefore, if we can keep the work inside each iteration at $O(1)$, then this technique will result in a linear runtime, which is usually the best possible runtime.

</details>

```a title="Pseudocode (two pointers, extremes to middle)"
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

<details>
<summary> LeetCode problem examples</summary>

<details>
<summary> <LC id='344' type='long' ></LC> </summary>

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        left = 0
        right = len(s)-1
        
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
            
        return s
```

</details>

<details>
<summary> <LC id='977' type='long' ></LC> </summary>

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [0] * n
        end_p = n-1
        left = 0
        right = n-1
        
        while left <= right:
            left_num, right_num = nums[left], nums[right]
            if abs(left_num) > abs(right_num):
                ans[end_p] = left_num ** 2
                left += 1
            else:
                ans[end_p] = right_num ** 2
                right -=1
            end_p -= 1
        
        return ans
```

</details>

<details>
<summary> <LC id='11' type='long' ></LC> </summary>

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0
        left = 0
        right = len(height)-1
        
        while left < right:
            container_width = right - left
            container_height = min(height[left], height[right])
            curr_area = container_height * container_width
            max_area = max(curr_area, max_area)
            
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        
        return max_area
```

</details>

</details>

### Two iterables

<details>
<summary> Remarks</summary>

The following method is applicable when the problem has two iterables in the input (e.g., two arrays).

1. Create two pointers, one for each iterable. Each pointer should start at the first index.
2. Use a `while` loop until one of the pointers reaches the end of its iterable.
3. At each iteration of the loop, move at least one pointer. This means incrementing either one of the pointers or both of the pointers. Deciding which pointers to move will depend on the problem we are trying to solve.
4. Because our `while` loop will stop when one of the pointers reaches the end, the other pointer will not be at the end when the loop finishes. Sometimes, we need to iterate through all elements &#8212; if this is the case, then you will need to write extra code here to make sure both iterables are exhausted.

This method will have a linear time complexity of $O(n+m)$, where `n = arr1.length` and `m = arr2.length` if the work inside the `while` loop is $O(1)$.

</details>

```a title="Pseudocode (two pointers, two iterables)"
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

<details>
<summary> LeetCode problem examples</summary>

<details>
<summary> <LC id='392' type='long' ></LC> </summary>

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        LEFT_BOUND, RIGHT_BOUND = len(s), len(t)

        p_left = p_right = 0
        while p_left < LEFT_BOUND and p_right < RIGHT_BOUND:
            # move both pointers or just the right pointer
            if s[p_left] == t[p_right]:
                p_left += 1
            p_right += 1

        return p_left == LEFT_BOUND
```

</details>

</details>