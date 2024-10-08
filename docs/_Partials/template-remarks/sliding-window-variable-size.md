import LC from '@site/src/components/LC';

The general algorithm behind the sliding window pattern (variable width) is as follows:

1. **Define window boundaries:** Define pointers `left` and `right` that bound the left- and right-hand sides of the current window, respectively, where both pointers usually start at `0`.
2. **Add elements to window by moving right pointer:** Iterate over the source array with the `right` bound to "add" elements to the window.
3. **Remove elements from window by checking constraint and moving left pointer:** Whenever the constraint is broken,  "remove" elements from the window by incrementing the `left` bound until the constraint is satisfied again.

Note the usage of the non-strict inequality `left <= right` in the `while` loop &#8212; this makes sense for problems where a single-element window is valid; however, the inequality should be strict (i.e., `left < right`) for problems where a single-element window does not make sense.

:::info Counting the number of valid subarrays

Note the possibility of using `ans += right - left + 1` instead of `ans = max(ans, right - left + 1)` when considering problems that require us to count the *number* of valid subarrays satisfying some constraint (e.g., <LC id='713' type='long' ></LC>). This approach is only relevant when all other subarrays of a valid subarray must also be valid; that is, for example, in the case of <LC id='713' type='' ></LC>, all array values are positive so *any* subarray of a valid subarray must necessarily also be valid (because the product of all of its elements will be smaller). Essentially, there has to be some kind of "monotonicity" to the problem for this approach to work. Hence, this approach for counting the number of subarrays will not come up often, but it is definitely worth being aware of because it makes quick work of what might otherwise be a difficult problem. 

Concretely: If the subarray/window `[left, right]` is valid and all of its subarrays are also valid, then how many valid subarrays are there that **end** at index `right`? There are `right - left + 1` in total: `[left, right]`, `[left + 1, right]`, `[left + 2, right]`, and so on until we reach `[right, right]` (i.e., the single-element window at `right`). Hence, the number of valid windows/subarrays **ending** at index `right` is equal to the size of the window, which we know is `right - left + 1`.

This clever "math trick" takes advantage of the sliding nature of the algorithm, where we always determine the number of valid subarrays **ending** at each index &#8212; this makes it easy to avoid overcounting and simplifies the determination process a great deal.

:::