```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return
        
        root.left, root.right = root.right, root.left
        
        self.invertTree(root.left)
        self.invertTree(root.right)
        
        return root
```

The idea here is to swap the children of the root (of any subtree we're referencing), and then let recursion take care of the subtrees. The *order* could be pre-order (as above) or it could be post-order, but in-order would cause issues because we would be processing a node *between* its children when what we really want to do is process the node before or after its children (so the children can be processed/inverted simultaneously).