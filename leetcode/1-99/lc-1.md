---
id: lc-1
tags: [LC-1]
---
# 1. Two Sum

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

<details><summary> Example 1</summary>

- **Input:** `nums = [2,7,11,15], target = 9`
- **Output:** `[0,1]`
- **Explanation:** Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

</details>

<details><summary> Example 2</summary>

- **Input:** `nums = [3,2,4], target = 6`
- **Output:** `[1,2]`

</details>

<details><summary> Example 3</summary>

- **Input:** `nums = [3,3], target = 6`
- **Output:** `[0,1]`

</details>

**Constraints:**

- <code>2 &le; nums.length &le; 10<sup>3</sup></code>
- <code>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></code>
- <code>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></code>
- **Only one valid answer exists.**

<details open><summary> Hint 1</summary>

A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.

$f(x)=3x+3^2$

</details>

<details><summary> Hint 2</summary>

So, if we fix one of the numbers, say `x`, we have to scan the entire array to find the next number `y` which is `value - x` where `value` is the input parameter. Can we change our array somehow so that this search becomes faster?

:::tip

Sometimes it do be that way.

:::

</details>

<details><summary> Hint 3</summary>

The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?

</details>

We know $f(x)=\sin(x)$ but

$$
f(x)=\cos(x^2)
$$

is even better.