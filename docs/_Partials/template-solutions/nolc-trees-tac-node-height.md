```python
def node_height(root, target):
    target_height = -1
    
    def visit(node):
        if not node:
            return -1
        
        left_height = visit(node.left)
        right_height = visit(node.right)
        
        height = 1 + max(left_height, right_height)
        
        if node.val == target:
            nonlocal target_height
            target_height = height
        
        return height
    
    visit(root)
    return target_height
```