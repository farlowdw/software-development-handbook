```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        lookup = {}
        for i in range(len(nums)):
            complement = target - nums[i]
            if complement in lookup:
                return [i, lookup[complement]]
            lookup[nums[i]] = i
```