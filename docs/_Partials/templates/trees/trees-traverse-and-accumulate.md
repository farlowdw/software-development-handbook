```python
def solution(root):
    res = ...  # initial value

    def visit(node):
        if not node:
            return
        
        nonlocal res
        
        res = ...  # update res here
        
        visit(node.left)
        visit(node.right)

    visit(root)
    return res
```