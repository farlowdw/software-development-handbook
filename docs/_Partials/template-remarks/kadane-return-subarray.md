import LC from '@site/src/components/LC';



By default, Kadane's algorithm returns the maximum subarray sum, which is just a numeric quantity. But sometimes we're interested in finding the subarray itself. In such cases, we can tweak the template to return a tuple of three values: the max sum (as before), the left endpoint of the maximal subarray, and the right endpoint of the maximal subarray:

```python
# T: O(n); S: O(1)
def kadane_return_subarray(nums):
    max_sum = float('-inf')
    left = max_left = max_right = curr_sum = 0
    for right in range(len(nums)):
        num = nums[right]
        if num > curr_sum + num:
            left = right
            curr_sum = num
        else:
            curr_sum += num
        
        if curr_sum > max_sum:
            max_left = left
            max_right = right
            max_sum = curr_sum
    
    return max_sum, max_left, max_right
```

The maximal subarray can then be reproduced via `nums[max_left:max_right+1]`. For example, in problem <LC id='53' type='long' ></LC>, we're given the following array of numbers: `nums = [-2,1,-3,4,-1,2,1,-5,4]`. Running the above on this array results in the following: `(6, 3, 6)`. This tells us the subarray with maximal sum has a maximum sum of `6`, and the subarray begins at index `i = 3` and ends at `i = 6`: 

```python
#               |->  <-|
#        0 1  2 3  4 5 6  7 8
nums = [-2,1,-3,4,-1,2,1,-5,4]
```

As noted on the problem page, the subarray `[4,-1,2,1]` has the largest sum of `6`, as shown above.