```python
def max_tree_val(root):
    if not root:
        return float('-inf')
    
    return max(root.val, max_tree_val(root.left), max_tree_val(root.right))
```