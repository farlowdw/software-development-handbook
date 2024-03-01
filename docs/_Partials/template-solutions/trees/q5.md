```python
def max_tree_diff(root):
    if not root:
        return 0
    
    min_val = float('inf')
    max_val = float('-inf')
    
    def visit(node):
        if not node:
            return 0
        
        nonlocal min_val, max_val
        min_val = min(min_val, node.val)
        max_val = max(max_val, node.val)
        
        visit(node.left)
        visit(node.right)
        
    visit(root)
    return abs(max_val - min_val)
```