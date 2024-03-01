```python
def has_value(root, x):
    if not root: 
        return False

    return root.val == x or has_value(root.left, x) or has_value(root.right, x)
```