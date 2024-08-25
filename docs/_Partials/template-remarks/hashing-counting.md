Counting is a very common pattern with hash maps, where "counting" generally refers to tracking the frequency of different elements.

In sliding window problems, a frequent constraint is limiting the amount of a certain element in the window. For example, maybe we're trying to find the longest substring with at most `k` `0`s. In such problems, simply using an integer variable `curr` is enough to handle the constraint because we are only focused on a single element, namely `0`. The template for variable width sliding window problems naturally suggests the use of `curr` for such situations:

```python
def fn(arr):
    left = curr = ans = 0
    for right in range(len(arr)):
        curr += nums[right]
        while left <= right and WINDOW_IS_INVALID # (e.g., curr > k):
            curr -= nums[left]
            left += 1
        ans = max(ans, right - left + 1)
    return ans
```

Using a hash map allows us to solve problems where the constraint involves *multiple* elements. For example, we would likely no longer use an *integer* variable `curr` but a hash map variable `lookup`, `counts`, or something similarly named, where *multiple integer variables* can be used to track constraints on multiple elements (i.e., the hashable, often required to be immutable, "keys" of the hashmap effectively serve as variables where their integer values convey something about the constraint being monitored).