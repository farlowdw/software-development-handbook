```python
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        
        return [root.val] + self.preorderTraversal(root.left) + self.preorderTraversal(root.right)
```

:::caution Unnecessary overhead

This is *not* the recommended way to solve this problem &#8212; each recursive call results in copying and concatenating. But it's useful to be aware of a possible inductive approach. But the traverse-and-accumulate method is more effective.

:::