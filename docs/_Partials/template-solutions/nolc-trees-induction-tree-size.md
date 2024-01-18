```python
def tree_size(root):
    if not root:
        return 0
    
    return 1 + tree_size(root.left) + tree_size(root.right)
```