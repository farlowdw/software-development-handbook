```python
def num_leaves(root):
    if not root: 
        return 0
    
    if not root.left and not root.right: 
        return 1

    return num_leaves(root.left) + num_leaves(root.right)
```