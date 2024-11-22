A [prefix sum](https://en.wikipedia.org/wiki/Prefix_sum), in its conventional sense (i.e., a "sum"), is effectively a *running total* of the input sequence. For example, the input sequence `1, 2, 3, 4, 5, 6, ...` has `1, 3, 6, 10, 15, 21` as its prefix sum. This idea can be very useful when dealing with problems where finding sums of subarrays happens frequently. The idea is to perform an $O(n)$ pre-processing operation at the beginning that allows summation queries to be answered in $O(1)$ time (i.e., as opposed to each summation query taking $O(n)$ time). Building the prefix sum can take $O(n)$ or $O(1)$ space depending on whether or not the input array itself is transformed or "mutated" into a prefix sum.

The $O(n)$ non-mutation approach occurs most frequently:

```python
def prefix_sum(nums):
    prefix = [nums[0]]
    for i in range(1, len(nums)):
        prefix.append(nums[i] + prefix[-1])
        
    return prefix
```

Its $O(1)$ mutation variant is arguably simpler to implement:

```python
def prefix_sum_inplace(nums):
    for i in range(1, len(nums)):
        nums[i] = nums[i] + nums[i - 1]
```

In practice, we often need to find the sum of a subarray between indices `i` and `j`, where `i < j`. If `prefix` is our prefix sum, and `nums` is the input sequence, then such a sum may be found by computing the following:

```python
prefix[j] - prefix[i] + nums[i]
```

Sometimes people will use `prefix[j] - prefix[i - 1]` instead of `prefix[j] - prefix[i] + nums[i]`, and that is fine except for the boundary case where `i = 0`. It's often safest to explicitly handle the inclusive nature of prefix sums as done above.

Another slightly more clever approach is to initialize the prefix array by left padding it with a zero so as to exclude the first element and prevent the left boundary issue remarked on above: `[0, nums[0]]`. This essentially shifts the prefix array we're building one unit to the right. Hence, the sum of the subarray between `i` and `j` is no longer `prefix[j] - prefix[i - 1]` but `prefix[j + 1] - prefix[i]`. This eliminates the left endpoint boundary issue, and note we did not introduce a right endpoint boundary issue because if `j` is the rightmost endpoint, then `j + 1` is simply the right endpoint of the prefix sum array (because it's been extended by a single element, the prepended `0`). How does this work? Since the prefix array we're building is a prefix *sum*, then including an extra summand of `0` will not effect the accuracy of whatever sum calculation we make; similarly, if we had a prefix *product*, then including a `1` at the beginning would have a similar lack of effect. Ultimately, we pad the left of the prefix with the [identity element](https://en.wikipedia.org/wiki/Identity_element) of whatever operation we're trying to come up with prefixes for: "In mathematics, an identity element or neutral element of a binary operation is an element that leaves unchanged every element when the operation is applied."

A very small example might help. Suppose we have `nums = [1, 2, 3, 4, 5]`. The usual prefix sum array we would construct would be `prefix_1 = [1, 3, 6, 10, 15]`. If we left pad the prefix array with a zero, then we have `prefix_2 = [0, 1, 3, 6, 10, 15]`. How would we calculate the subarray sum from `i = 0` to `j = 3`, inclusive?

```python
nums = [1, 2, 3, 4, 5]
prefix_1 = [1, 3, 6, 10, 15]
prefix_2 = [0, 1, 3, 6, 10, 15]

# calculate subarray sum from i = 0 to j = 3, inclusive
prefix_1[3] - prefix_1[0 - 1]         # prefix[j] - prefix[i - 1]: left boundary issue
prefix_1[3] - prefix_1[0] + nums[0]   # prefix[j] - prefix[i] + nums[i]: must add back left boundary
prefix_2[4] - prefix_2[0]             # prefix[j+1] - prefix[i]: no left boundary issue (no adding back needed either)
```

The best approach will naturally depend on context. 

If the prefix array is built in-place, then care must be exercised when the left boundary is involved; for example, if `nums` is modified in-place to be a prefix sum, then the prefix sum from `i` to `j` cannot be simply expressed as `nums[j] - nums[i - 1]` because `i = 0` causes issues, and this can't be fixed in the usual way of writing `prefix[j] - prefix[i] + nums[i]` because `nums` has been overwritten at this point (writing something like `nums[j] - nums[i] + nums[i]` is just equivalent to `nums[j]` and is only appropriate when `i = 0`). The result is that we need `nums[j]` when `i = 0` and `nums[j] - nums[i - 1]` otherwise. The logic is slightly complicated by doing this.

If, however, the prefix array must be built separately, then the left padding approach above helps reduce the possibility of encountering boundary issues, but it may not be clear at first to those unfamiliar with the technique.