```python
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        vals = []
        
        def visit(node):
            if not node:
                return
            
            visit(node.left)
            visit(node.right)
            vals.append(node.val)

        visit(root)
        return vals
```