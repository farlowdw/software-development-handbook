import LC from '@site/src/components/LC';
import CodeGrid from '@site/src/components/CodeGrid';
import CodeGridCell from '@site/src/components/CodeGridCell';


It is *possible* to build the initial `k`-size window *within* the main loop instead of as the result of a separate for loop. But just because we can do this doesn't mean we should. The result oftentimes looks unnatural, as in the solutions to the following two problems.

---

**Problem:** Max sum of subarray of size <code>k</code>

<CodeGrid>
<CodeGridCell>

```python title="Build window INSIDE main loop"
def find_best_subarray(nums, k):
    curr = 0
    ans = float('-inf')
    for right in range(1, len(nums) + 1):
        if right >= k + 1:
            ans = max(curr, ans)
            curr -= nums[right - k - 1]
        curr += nums[right - 1]
    
    ans = max(ans, curr)
        
    return ans

nums = [3,-1,4,12,-8,5,6]
k = 4
print(find_best_subarray(nums, k))  # 18
```

</CodeGridCell>
<CodeGridCell>

```python title="Build window OUTSIDE main loop"
def find_best_subarray(nums, k):
    curr = 0
    for right in range(1, k + 1):
        curr += nums[right - 1]
        
    ans = curr
    for right in range(k + 1, len(nums) + 1):
        curr += nums[right - 1]
        curr -= nums[right - 1 - k]
        ans = max(ans, curr)
        
    return ans

nums = [3,-1,4,12,-8,5,6]
k = 4
print(find_best_subarray(nums, k))  # 18
```

</CodeGridCell>
</CodeGrid>

Both approaches work, but the first approach is arguably less natural.

---

**Problem:** <LC id='643' type='long' ></LC> 

<CodeGrid>
<CodeGridCell>

```python title="Build window INSIDE main loop"
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        curr = 0
        ans = float('-inf')

        for right in range(1, len(nums) + 1):
            if right >= k + 1:
                ans = max(ans, curr / k)
                curr -= nums[right - 1 - k]
            curr += nums[right - 1]
        ans = max(ans, curr / k)
            
        return ans
```

</CodeGridCell>
<CodeGridCell>

```python title="Build window OUTSIDE main loop"
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        left = curr = 0
        
        for right in range(1, k + 1):
            curr += nums[right - 1]
            
        ans = curr / k
        for right in range(k + 1, len(nums) + 1):
            curr += nums[right - 1]
            curr -= nums[right - 1 - k]
            ans = max(ans, curr / k)
        
        return ans
```

</CodeGridCell>
</CodeGrid>

Again, both approaches technically work, but the first approach seems to be less natural.