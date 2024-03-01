```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        def index_to_mat_val(index):
            row = index // n
            col = index % n
            
            return matrix[row][col]
            
        m = len(matrix)
        n = len(matrix[0])
        
        left = 0
        right = m * n - 1
        
        while left <= right:
            mid = left + (right - left) // 2
            val = index_to_mat_val(mid)
            
            if target < val:
                right = mid - 1
            elif target > val:
                left = mid + 1
            else:
                return True
            
        return False
```