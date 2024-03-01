```python
class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        def successful_potions(spell_strength):
            # need spell * potion >= success (i.e., potion >= threshold)
            threshold = success / spell_strength
            
            left = 0
            right = len(potions)
            
            while left < right:
                mid = left + (right - left) // 2
                
                if threshold <= potions[mid]:
                    right = mid
                else:
                    left = mid + 1
                    
            return len(potions) - left
        
        potions.sort()
        return [ successful_potions(spell) for spell in spells ]
```