```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        lookup = {}
        for i in range(len(nums)):
            complement = target - nums[i]
            if complement in lookup:
                return [lookup[complement], i]
            lookup[nums[i]] = i
```

The key insight for solving this classic problem involves recognizing that the $O(1)$ lookup time in hash maps can be used to great effect here. Quickly determining whether or not the complement for a given number *exists* in the `lookup` hash map makes it possible for the overall time complexity to be $O(n)$ and not $O(n^2)$.

**Time:** $O(n)$. We make a single pass in $O(n)$ time where `n == len(nums)`.

**Space:** $O(n)$. It takes $O(n)$ space to build the `lookup` hash map itself.