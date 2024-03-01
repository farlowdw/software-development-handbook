```python
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        vals = []
        
        def visit(node):
            if not node:
                return
            
            visit(node.left)
            vals.append(node.val)
            visit(node.right)

        visit(root)
        return vals
```