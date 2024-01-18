```python
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        vals = []
        
        def visit(node):
            if not node:
                return
            
            vals.append(node.val)
            visit(node.left)
            visit(node.right)

        visit(root)
        return vals
```