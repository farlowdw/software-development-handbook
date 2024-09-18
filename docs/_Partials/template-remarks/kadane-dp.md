The [Wiki page](https://en.wikipedia.org/wiki/Maximum_subarray_problem) for Kadane's algorithm notes the following:

> This algorithm calculates the maximum subarray ending at each position from the maximum subarray ending at the previous position, so it can be viewed as a trivial case of dynamic programming.

How can the algorithm be viewed as a trivial case of dynamic programming?

Without getting too into the weeds, we can note that the problem has an optimal substructure: We can let `max_ending_here[i]` be the maximum subarray sum ending at index `i`, and we have the following recurrence relation for finding other subarray sums:

```python
max_ending_here[i] = max(max_ending_here[i - 1] + nums[i], nums[i])
```

Hence, the maximum subarray sum ending at `i` is either the sum of the maximum subarray ending at `i - 1` plus the current element `nums[i]` or just the current element `nums[i]` (starting a new subarray). The optimal substructure is now clear: The solution to `max_ending_here[i]` depends on the solution to `max_ending_here[i - 1]`.

What about overlapping subproblems? We reuse computations: Each `max_ending_here[i]` uses the result of `max_ending_here[i - 1]`. Storing `max_ending_here[i - 1]` makes it possible to avoid recomputing subarray sums from scratch.

This is kind of a nice illustration of dynamic programming in some ways because Kadane's algorithm strips things down to their nice and curlies: we do not need to store the entire `max_ending_here` array because we only need the previous value: `max_ending_here[i - 1]`. This optimization reduces the space complexity from $O(n)$ to $O(1)$.

So we basically have the initialization as 

```python
max_ending_here = nums[0]
max_so_far = nums[0]
```

And then the iteration as 

```python
for i in range(1, len(nums)):
    max_ending_here = max(max_ending_here + nums[i], nums[i])
    max_so_far = max(max_so_far, max_ending_here)
```

The result is that `max_so_far` contains the maximum subarray sum. This algorithm is considered "trivial DP" because of the following:

- **Simplified state:** Only one state (`max_ending_here`) is needed to represent the solution up to the current index.
- **No complex memoization:** There's no need for a table or matrix to store intermediate results beyond the previous state.
- **Sequential dependency:** Each computation depends only on the immediate previous result.

In a nutshell, Kadane's algorithm uses dynamic programming by building up solutions to larger subarrays using solutions to smaller subarrays. It's considered a "trivial" case because it simplifies to a linear scan with constant space, making it highly efficient.