```python
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        diameter = 0
        
        def visit(node):
            if not node:
                return -1
            
            left_height = visit(node.left)
            right_height = visit(node.right)
            
            height = 1 + max(left_height, right_height)
            
            nonlocal diameter
            diameter = max(diameter, left_height + right_height + 2)
            
            return height
        
        visit(root)
        return diameter
```