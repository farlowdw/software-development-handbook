The standard version of Kadane's algorithm (i.e., the template on this page) does not allow empty subarrays to be considered. Why? Mostly because an "empty subarray" refers to a subarray with zero elements, which has a sum of zero. 

Hence, the template allows for the possibility of returning a subarray whose elements total sum is negative. We can prevent this with a slight modification to the template:

```python
# T: O(n); S: O(1)
def kadane_allow_empty(nums):
    max_sum = curr_sum = 0
    for i in range(len(nums)):
        num = nums[i]
        curr_sum = max(0, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
    return max_sum
```

The adjustments above, namely the assignments `max_sum = 0` and `curr_sum = max(0, curr_sum + num)`, ensure that if adding the current element `num` reduces the current sum below zero, then we simply reset `curr_sum` to zero, effectively resulting in us considering an empty subarray starting at the next index.