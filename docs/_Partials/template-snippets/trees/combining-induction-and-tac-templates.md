**TLDR (use template for reference):** The points directly below are elaborated on more extensively under the dividing line. Use the provided template for explicit reference. The general concepts are remarked on first and then their applicability to the template specifically is addressed.

- **Parent to child data flow:** Use recursive call parameters to pass information *down* the tree from parent to child. This means defining the `visit` function with more than just the `node` parameter (we're not usually allowed to alter the `solution` function signature). The information passed down can be data passed by value or by reference (if the latter, be cautious of when state mutations should not be shared across different branches of the tree).
- **Child to parent data flow:** Use the induction template. This means whatever function is being called recursively must actually *return* a value. Usually this means finding solutions for the subtrees is enough to find the solution for the entire tree &#8212; we solve the problem at the subtrees recursively and then aggregate the results at the root. For a pure induction template answer, this means `solution` returns a value which builds or aggregates solutions from the leaves to the root. If the template usage needs to be mixed, then defining a helper function, `visit`, and returning a value from *that* function will be necessary.
- **Global access (non-parent-child data flow):** Sometimes it is not enough (or overly cumbersome) to strictly communicate between parent and child, and we need to break out of the normal traversal order. We effectively visit all the nodes with a traversal while accumulating the wanted information in a nonlocal variable. If all we need to do is accumulate data in nonlocal variables, then it is unnecessary to return anything from the `visit` function (i.e., a pure usage of the traverse-and-accumulate template); however, if we also need to pass information back up the tree, then we will need to rely on the induction template as well.

Note how everything above is concerned with how node data can *flow* as opposed to the *order* in which node data is encountered. The order in which node data is encountered and processed is determined by the various DFS traversals: pre-order, in-order, and post-order. But, in general, the *direction of information flow* (e.g., downward from parent to child) and the *order of node processing* (e.g., post-order) are separate aspects to consider when coming up with a tree traversal strategy. These aspects should be combined as needed or appropriate.

---

In general, which (DFS) tree traversal template you use to solve a problem largely depends on how you need to manage the information or data flow between nodes. Specifically, information can flow in the following ways:

- **Parent to child (recursive call parameters):** We use the parameters of the recursive call when we need to pass information *down* the tree. This means we can visit or process the current `node` (i.e., the "parent") and pass along data we'd like to have access to (via recursive call parameters) when we process its children (i.e., `node.left` and `node.right`).

  *Template usage:* This means defining the `visit` function with more than just the `node` parameter. For example, a very rough start of an implementation might look as follows:
  
  ```python
  def visit(node, data_received_from_parent):
      
      # ...
      # update/use data_received_from_parent
      
      visit(node.left, data_from_curr_node_to_its_left_child_node)
      visit(node.right, data_from_curr_node_to_its_right_child_node)

      # ...
  ```
  
  The data passed from parent to child does not need to be restricted to a single parameter as in the simple illustration above. Multiple parameters could be used depending on the problem. 
  
  Examples of potentially meaningful parameters might include data passed *by value* like `sum_so_far`, `curr_path_length`, `path_str`, etc. (i.e., data that is immutable and passed by value such as a string, integer, etc.), where we can freely update these values to pass along in subsequent recursive calls without worrying about mutations (i.e., the *state* of the variable wouldn't be shared across different branches of the tree).
  
  The data could also be passed from parent to child *by reference* such as a list, dictionary, etc.. In such cases, we need to be aware of and make a decision about how we want the *state* of the referenced data to be managed. By default, the referenced data will be mutated and its state shared across different branches of the tree. Such mutations and state sharing across branches is often undesirable; hence, we need to effectively *undo* the state changes/mutations after the recursive calls. This will ensure the state is not shared across different branches of the tree. For example, if the data being passed down by reference is a list, and we're appending to the list before the recursive calls, then we should pop from the list after the recursive calls to return the referenced data to its original state before the recursion.

- **Child to parent (induction):** We use the induction template when we need to pass information *up* the tree. We can use the "pure induction template" (i.e., no changes needed) if it suffices to solve the problem at hand by simply solving the problem for the subtrees (i.e., essentially building up the solution from the leaves to the root):

  ```python
  def solution(root):
      if not root:
          # highlight-success-next-line
          return ...
      
      res_left = solution(root.left)
      res_right = solution(root.right)
      
      # return a value computed via res_left, res_right, and root.val
      # highlight-success-next-line
      return ...
  ```

  If, however, the problem involves also needing to accumulate information in a nonlocal variable(s), then we'll need to make a slight change to use the induction template properly, namely by creating a helper function, `visit`, and then returning values from within *that* function:

  ```python
  def solution(root):

      # ... (accumulation variables)

      def visit(node):
          if not node:
              # highlight-success-next-line
              return ...
          
          # ... (accumulation happens here)
          
          res_left = visit(node.left)
          res_right = visit(node.right)

          # return a value computed via res_left, res_right, and node.val
          # highlight-success-next-line
          return ...

      visit(root)
      return res
  ```

  Whatever the case, as can be seen above, when passing information *up* the tree (i.e., when we use *any* form of the induction template), we need to be returning values from the function that is being called recursively.

- **Global access (traverse-and-accumulate):** Sometimes it is not enough (or overly cumbersome) to strictly communicate between parent and child, and we need to break out of the normal traversal order. We effectively visit all the nodes with a traversal while accumulating the wanted information in a nonlocal variable(s). If all we need to do is accumulate data in nonlocal variables, then it is unnecessary to return anything from the `visit` function (i.e., a pure usage of the traverse-and-accumulate template):

  ```python
  def solution(root):
      # highlight-success-next-line
      res = ...           # initial value for accumulation

      def visit(node):
          if not node:
              # highlight-success-next-line
              return      # no value needs to be returned
          
          # highlight-success-start
          nonlocal res
          res = ...       # update accumulated value here
          # highlight-success-end
          
          visit(node.left)
          visit(node.right)

          # highlight-success-next-line
                          # no return value from visit function

      visit(root)
      # highlight-success-next-line
      return res          # return the accumulated value
  ```

  If, however, we also need to pass information back up the tree, then we will need to rely on the induction template as well (note how we now need to return values from within the `visit` function):

  ```python
  def solution(root):
      # highlight-success-next-line
      res = ...           # initial value for accumulation

      def visit(node):
          if not node:
              return ...
          
          # highlight-success-start
          nonlocal res
          res = ...       # update accumulated value here
          # highlight-success-end
          
          res_left = visit(node.left)
          res_right = visit(node.right)

          # return a value computed via res_left, res_right, and node.val
          return ...

      visit(root)
      # highlight-success-next-line
      return res          # return accumulated value
  ```

All of the observations above lead us to the combined template provided below.