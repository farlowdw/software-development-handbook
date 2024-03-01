```python
class Solution:
    def isUnivalTree(self, root: Optional[TreeNode]) -> bool:
        unival = root.val
        
        def visit(node):
            if not node:
                return True
            
            nonlocal unival
            
            return node.val == unival and visit(node.left) and visit(node.right)
        
        return visit(root)
```