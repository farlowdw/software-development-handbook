```python
def solution(root):
    res = ...  # initial value

    def visit(node):
        if not node:
            return ...
        
        nonlocal res
        
        res = ...  # update res here
        
        res_left = visit(node.left)
        res_right = visit(node.right)

        # return a value computed via res_left, res_right, and node.val
        return ...

    visit(root)
    return res
```