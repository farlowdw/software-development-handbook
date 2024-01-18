```python
def tree_mode(root):
    freqs = defaultdict(int)
    
    def visit(node, mode_so_far):
        if not node:
            return
        
        freqs[node.val] += 1
        mode_so_far = max(freqs[mode_so_far], freqs[node.val])
        
        visit(node.left, mode_so_far)
        visit(node.right, mode_so_far)
        
        return mode_so_far

    return visit(root, root.val)
```