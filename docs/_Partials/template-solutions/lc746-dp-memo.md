```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        def dp(step):
            if step in memo:
                return memo[step]
            
            step_cost = min(dp(step - 1) + cost[step - 1], dp(step - 2) + cost[step - 2])
            memo[step] = step_cost
            
            return step_cost
        
        memo = {}
        memo[0] = memo[1] = 0
        return dp(len(cost)) 
```