import LC from '@site/src/components/LC';
import LC713PS from '@site/docs/_Partials/problem-stems/lc713.md';

**Context**

The sliding window pattern of finding a *number* or *count* of subarrays/substrings that satisfy some constraint works well when the input behaves in a way such that if the window `[left, right]` is valid, then so are all other windows `[x, right]`, where `left < x <= right`. For example, consider problem <LC id='713' type='long' ></LC>:

> <LC713PS />

The array is comprised of only *positive* integers. Hence, if the window `[left, right]` is valid, then `[x, right]`, where `left < x <= right`, must also be valid since the product of all numbers in the array can only get smaller as numbers are removed from the left. This results in the following nice and neat solution:

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        left = ans = 0
        curr = 1
        
        for right in range(1, len(nums) + 1):
            curr *= nums[right - 1]
            while left < right and curr >= k:
                curr //= nums[left]
                left += 1
            ans += (right - left)
            
        return ans
```

But the approach above will not work for some problems where the constraint is a bit more strict. For example, the problem of finding the number of subarrays that have a sum less than `k` with an input of *only positive integers* can be solved with a sliding window using the pattern discussed above, but the following similar problem cannot be solved using that approach (the constraint is stricter):

> Find the number of subarrays that have a sum exactly equal to `k`, where the input is comprised of positive and negative integers.

To understand how we can effectively leverage a hash map to come up with an efficient solution to the problem above, we need to recall some details about prefixes. For this problem specifically, which appears as <LC id='560' type='long' ></LC> on LeetCode, we need to think back to prefix *sums*.

**Prefix Sums**

Declare a hash map `lookup` that maps prefix sums to how often they occur. For this problem, a number could appear multiple times in a prefix sum since the input has negative integers; for example, the input `nums = [1, -1, 1]` has prefix sum `[1, 0, 1]`, where `1` appears twice. After making the declaration `lookup = defaultdict(int)`, let's initialize `lookup[0] = 1` to capture the fact that the empty prefix `[]` has a sum of `0`. The necessity for this will soon become clear.

Now declare `ans` as the variable that will hold our final answer and `curr` to be the running sum of all elements we have iterated over thus far. That is, if we are at index `i`, then `curr` represents the value `prefix[i]` which is the sum of all elements at indices `[0..i]`, inclusive.

Now we iterate over the input, where we update `curr` upon encountering each new element. At this point, `curr` represents the total running sum of the input array. Do we already have enough information to update our answer? Surprisingly, yes! For the sliding window pattern discussed at the top of this note, recall that when looking for the *number* of subarrays satisfying some constraint we focused on each index (i.e., `right`), and we figured out how many valid subarrays **ended** at that index. We will do something very similar here. 

What we know so far in the process of iterating over the input:

1. `curr` stores the prefix sum of all elements up to index `i` (inclusive)
2. We have stored all other prefix sums *before* `i` and the frequency with which they have been encountered in the `lookup` hash map
3. The difference between any two prefix sums represents a subarray. For example, if we wanted the sum of the subarray starting at index `j = 3` and ending at index `i = 8` from the partial input `[a_0, a_1, a_2, a_3, a_4, a_5, a_6, a_7, a_8, a_9]`, then we would compute `prefix[i] - prefix[j-1]`; that is, we'd take the prefix up to index `8` (inclusive) and subtract from it the prefix up to index `2` (inclusive)

How does this help? Imagine there exists a subarray that *ends* at index `i` with a sum of `k`, but we do not know where this subarray *starts*. Right now we only know that it exists. Suppose it starts at index `j`. So the elements from index `j` to index `i`, inclusive, in our imaginary array sum to the value `k`, which can be visualized as follows for a `0`-indexed array `nums` where `n = len(nums)`:

$$
\texttt{nums}
=
[a_0, a_1, \ldots, a_{j-1}, \overbrace{a_j, a_{j+1}, \ldots, a_{i-1}, a_i}^{a_j + \cdots + a_i = \texttt{k}}, a_{i+1}, \ldots, a_{n-2}, a_{n-1}]
$$

Now recall that `curr` denotes the sum of the prefix up to `i` (inclusive):

$$
\texttt{nums}
=
[\underbrace{a_0, a_1, \ldots, a_{j-1}, \overbrace{a_j, a_{j+1}, \ldots, a_{i-1}, a_i}^{a_j + \cdots + a_i = \texttt{k}}}_{\texttt{curr}}, a_{i+1}, \ldots, a_{n-2}, a_{n-1}]
$$

Hence, the prefix sum ending at `j - 1` must be `curr - k`:

$$
\texttt{nums}
=
[\underbrace{\overbrace{\overbrace{a_0, a_1, \ldots, a_{j-1}}^{\texttt{curr} - \texttt{k}}, \overbrace{a_j, a_{j+1}, \ldots, a_{i-1}, a_i}^{a_j + \cdots + a_i = \texttt{k}}}^{(\texttt{curr}\,-\,\texttt{k})\,+\,\texttt{k}\,=\,\texttt{curr}}}_{\texttt{curr}}, a_{i+1}, \ldots, a_{n-2}, a_{n-1}]
$$

This seemingly innocuous observation is actually the key idea: when we're at index `i`, where the current running sum is `curr`, if we previously encountered the prefix sum `curr - k`, then it must be the case that there is a subarray *ending* at index `i` with a sum of `k`, specifically $[a_j, \ldots, a_i]$ if we use the same notation as we did above. Again, we do not know *where* exactly the beginning of this subarray is (i.e., the specific value of $j$) &#8212; we simply know that it exists, and that alone is enough to solve the problem. 

There may be several values of $j$ that work for the subarray $[a_j, \ldots, a_i]$ to have a sum of `k`. Specifically, if the prefix sum `curr - k` occurred multiple times before reaching index `i` (due to negative numbers), then each of those prefixes could be used as a starting point to form a subarray at the current index with a sum of `k` (this is why we need to track the frequency of the prefix sums as they're encountered); that is, if at the current index `i` in iterating over the input we have 

- `lookup[curr - k] = 0`: there's currently no value of $j$ for which the elements of $[a_j, \ldots, a_i]$ sum to `k`
- `lookup[curr - k] = 1`: there's currently only one value of $j$ for which the elements of $[a_j, \ldots, a_i]$ sum to `k`
- `lookup[curr - k] > 1`: there's currently several values of $j$ for which the elements of $[a_j, \ldots, a_i]$ sum to `k`

In all cases, we should add `lookup[curr - k]` to our answer. Once our answer has been updated, the only remaining thing to do is a housekeeping chore: maintain `lookup` by incrementing the frequency of `curr` by `1` (i.e., `lookup[curr] += 1`).

To see why we need to have `lookup[0] = 1`, consider the following example input: `nums = [1, 2, 1, 2, 1], k = 3`. There are four subarrays with sum `3`: `[1, 2]` (twice) and `[2, 1]` (twice). If there is a prefix with a sum equal to `k`, as there is when we consider the first two elements, namely `[1, 2]`, then we have `curr - k = 0`, but if we dont initialize `lookup[0] = 1`, then `curr - k = 0` would not show up in our hash map and evaluating `lookup[curr - k]` would result in essentially "losing" this valid subarray.

**Other Problem Types**

The discussion above is entirely framed by the "subarray sum equals `k`" problem, but the general pattern can be applied more broadly in the context of relating previously accumulated information to currently accumulated information in order to determine whether or a not a subarray(s) has some desired property (i.e., whether or not the subarray is "valid" based on relating the previously accumulated information to the currently accumulated information).

$$
\texttt{nums}
=
[\underbrace{\overbrace{a_0, a_1, \ldots, a_{j-1}}^{\substack{\text{previously accumulated}\\\text{information}}}, \overbrace{a_j, a_{j+1}, \ldots, a_{i-1}, a_i}^{\text{valid subarray}}}_{\text{currently accumulated information}}, a_{i+1}, \ldots, a_{n-2}, a_{n-1}]
$$

For counting valid subarrays, usually the information we're interested in is frequencies of some kind (e.g., subarray sum, odd integer count, etc.), but that does not have to be the case.