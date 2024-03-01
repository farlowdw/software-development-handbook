```python
def solution(root):
    if not root:
        return ...
    
    res_left = solution(root.left)
    res_right = solution(root.right)
    
    # return a value computed via res_left, res_right, and root.val
    return ...
```