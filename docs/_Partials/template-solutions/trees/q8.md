```python
def longest_unival_vertical_path(root):
    longest_path = 0
    
    def visit(node, curr_path_val, curr_path_length):
        if not node:
            return
        
        if node.val != curr_path_val:
            curr_path_length = 1
        else:
            nonlocal longest_path
            curr_path_length += 1
            longest_path = max(longest_path, curr_path_length)
            
        visit(node.left, node.val, curr_path_length)
        visit(node.right, node.val, curr_path_length)
        
    visit(root, None, 0)
    return longest_path
```