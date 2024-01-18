```python
""" Function signature (something we cannot alter but can mimic altering via the visit function) """
def solution(root):
    """ Accumulated values (traverse-and-accumulate)"""
    acc_1 = ...  # accumulated value 1
    acc_2 = ...  # accumulated value 2
    acc_3 = ...  # accumulated value 3
    
    """ Pass data down via recursive call params """
    def visit(node, data_pass_down_by_val, data_pass_down_by_ref):
        if not node:
            return ...  # return nothing for early termination (traverse-and-accumulate) OR
                        # return data for base case or return early for termination (induction)
        
        nonlocal acc_1, acc_2, acc_3    # access nonlocal variables for accumulation
        acc_x = ...                     # update accumulated values
        
        # update/use data_pass_down_by_val
        # update/use data_pass_down_by_ref
        
        left_subtree = visit(node.left, data_pass_down_by_val, data_pass_down_by_ref)
        right_subtree = visit(node.right, data_pass_down_by_val, data_pass_down_by_ref)

        # undo mutation to data_pass_down_by_ref
        # (assuming the state should not be shared across different branches of the tree)

        """ Pass data up (induction) """
        return ...  # return a value computed via left_subtree, right_subtree, and node.val

    """ Execute tree traversal """
    # pass info down and up while accumulating (starting at root)
    visit(root, init_data_val, init_data_ref)
    # return something based on accumulated values or induction result
    return acc_x
```