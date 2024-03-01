```python
class Solution:
    def findTilt(self, root: Optional[TreeNode]) -> int:
        total_tilt = 0
        
        def visit(node):
            if not node:
                return 0
            
            left = visit(node.left)
            right = visit(node.right)
            
            nonlocal total_tilt
            tilt = abs(left - right)
            total_tilt += tilt
                
            return node.val + left + right
            
        visit(root)
        return total_tilt
```