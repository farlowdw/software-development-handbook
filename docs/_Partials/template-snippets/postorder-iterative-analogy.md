```a title="Pseudocode (for reference)"
procedure iterativePostorder(node)
    stack ← empty stack
    lastNodeVisited ← null

    while not stack.isEmpty() or node ≠ null
        if node ≠ null
            stack.push(node)
            node ← node.left
        else
            peekNode ← stack.peek()
            if peekNode.right ≠ null and lastNodeVisited ≠ peekNode.right
                node ← peekNode.right
            else
                visit(peekNode)
                lastNodeVisited ← stack.pop()
```

```python title="Python (bare bones for reference)"
def postorder_iterative_LR(node):
    stack = []
    last_node_visited = None

    while stack or node:
        if node:
            stack.append(node)
            node = node.left
        else:
            peek_node = stack[-1]
            if peek_node.right and (last_node_visited is not peek_node.right):
                node = peek_node.right
            else:
                visit(peek_node)
                last_node_visited = stack.pop()
```

Imagine you're exploring a series of underground caves, where the caves have multiple tunnels (paths) and chambers (nodes) connected in a complex network. Your ultimate goal is to mark each chamber as having been "Explored", but you can only mark a chamber as having been "Explored" if you have explored all the deeper chambers (children) accessible from it. To accomplish this task, you have been given a piece of chalk for marking chambers and a map to record where you have been. Every time you enter a new chamber, you mark it on your map (push it to the stack), but you hold off on marking the chamber as "Explored" until you've visited every chamber accessible from it.

Here's the process you will follow in order to accomplish this:

- **Step 1 (begin the exploration):** Enter the first chamber (root).
- **Step 2 (check for a left tunnel):** Check for a left tunnel. If there is a left tunnel, then mark this chamber on your map (push to the stack) and venture down the left tunnel.
- **Step 3 (exhaust all left tunnels):** Continue to the deepest chamber you can reach by always taking left tunnels.
- **Step 4 (check for a right tunnel):** Check for a right tunnel once you find yourself in a chamber with no left tunnel or where all left chambers have been marked as "Explored".
- **Step 5 (venture down a right tunnel):** If there's an unexplored right tunnel, mark your current chamber on the map (it's still on the stack) and venture down the right tunnel.
- **Step 6 (mark a chamber as "Explored"):** If there's no right tunnel or if it's already been explored, then this chamber is now the deepest unexplored one, so you can mark it as "Explored" (visit the node by printing its value). Then cross it off your map (pop it from the stack) and backtrack.
- **Step 7 (continue the process):** Continue the process described above. Every time you backtrack to a chamber, check its right tunnel. If it's unexplored, then venture in. If it's explored or non-existent, then mark the chamber as "Explored" and backtrack further.
- **Step 8 (return to the entrance):** Keep doing everything above until you've marked every chamber as "Explored" and have returned to the cave entrance.

Essentially, you will be venturing down as deep as you can, marking chambers as "Explored" on your way out, ensuring the deeper chambers are always marked as "Explored" before the shallower ones from which they are accessible.

We can annotate the previously provided Python code to illustrate the steps above (the highlighted line simply serves to show where the logic would be included to process the current node):

```python
def postorder_iterative_LR(node):
    stack = []
    last_node_visited = None
    
    # Step 1: Enter the cave system. As long as there's a chamber to explore 
    #         or a path in the stack to backtrack to, continue.
    while stack or node:
        # Step 2: If you're in a new chamber, then mark the path you took 
        #         to get there (push it onto a stack).
        if node:
            stack.append(node)
            # Step 3: Always check the left tunnel of the current chamber first.
            #         If there is one, you go down it.
            node = node.left
        else:
            # Step 4: If there's no left tunnel or after coming back 
            #         from a left tunnel, you're ready to check the right tunnel.
            peek_node = stack[-1]
            
            # Step 5: Before checking the right tunnel,
            #         make sure you haven't just explored it. 
            #         If not, you go down the right tunnel.
            if peek_node.right and (last_node_visited is not peek_node.right):
                node = peek_node.right
            else:
                # Step 6: If no tunnels remain to explore from current chamber, 
                #         or if you've just explored the right tunnel, then
                #         it's time to mark the current chamber as "Explored"
                # highlight-next-line
                visit(peek_node)
                
                # Step 7: After marking the chamber as "Explored", you backtrack. 
                #         The last path you took (from the stack) will help you go back.
                last_node_visited = stack.pop()

    # Step 8: When you've explored every chamber and every tunnel, 
    #         and there's no path left in your stack, 
    #         you exit the cave system.
```

It's worth specifically noting what the following `if` block accomplishes in the code above:

```python
if peek_node.right and (last_node_visited is not peek_node.right):
    node = peek_node.right
```

- `peek_node.right`: This checks whether or nor the current chamber (represented by `peek_node`) has a right tunnel and answers the question, "Is there a right tunnel leading out of this chamber?"
- `last_node_visited is not peek_node.right`: This checks if the right tunnel/chamber (`peek_node.right`) was the last one you explored. If it was, then you've already visited it and don't need to venture down there again. It answers the question, "Did I just come from that right tunnel, or have I not explored it yet?"
- `node = peek_node.right`: If the current chamber has an unexplored right tunnel, then prepare to venture into it. This assignment is effectively saying, "I haven't explored the right tunnel of this chamber yet. Let's go down there next."

Essentially, the `if` block above ensures you explore a chamber's right tunnel if you haven't already &#8212; if you've just come *back* from exploring the right tunnel (i.e., `last_node_visited is peek_node.right` is `True`), then you know it's time to mark the current chamber as "Explored" and backtrack.

The procedure outlined above is rather sophisticated and complex in its logic &#8212; it is probably easiest to understand if we actually work through a concrete example such as the one provided below (writing out the process may seem tedious, and it is, but it's worth following the first time around to provide some sort of intuition for things).

<details>
<summary> Concrete example using a familiar binary tree</summary>

We have used the following binary tree in a number of previous examples:

```a
        __A______
       /         \
    __B         __W__
   /   \       /     \
  X     S     T       C
 / \         / \     /
E   M       P   N   H
```

For the sake of our example, suppose each node represents a chamber of a cave. Then the entrance to the cave system is marked by the root node, `A`. Let's start exploring the cave and try to mark all chambers as "Explored" by using our previously described process, where the order in which the chambers should be marked as "Explored" should be `E M X S B P N T H C W A` in order to hold true to a post-order traversal (each bullet point below represents an iteration of the `while` loop where each bullet point ends with the current state of explored chambers):

- We start by entering the cave system, leading us into chamber `A`. We push this on to the stack:

  ```
  | A |
  +---+
  ```

  We attempt to go to chamber `A`'s left tunnel if there is one. There is. We update the current node to point to chamber `B`. 
  
  **Explored chambers:** `[]`

- We push `B` on to the stack:

  ```
  | B |
  | A |
  +---+
  ```

  We attempt to go to chamber `B`'s left tunnel if there is one. There is. We update the current node to point to chamber `X`. 
  
  **Explored chambers:** `[]`

- We push `X` on to the stack:

  ```
  | X |
  | B |
  | A |
  +---+
  ```

  We attempt to go to chamber `X`'s left tunnel if there is one. There is. We update the current node to point to chamber `E`. 
  
  **Explored chambers:** `[]`

- We push `E` on to the stack:

  ```
  | E |
  | X |
  | B |
  | A |
  +---+
  ```

  We attempt to go to chamber `E`'s left tunnel if there is one. There is not. We update the current node to point to `None`. 
  
  **Explored chambers:** `[]`

- Since `node` currently points to `None`, we do not need to check for a left tunnel. Instead, we need to check for a right tunnel. `peek_node = stack[-1]` means `peek_node` points to node `E` since `E` is on top of the stack. `peek_node.right` has no meaningful value since chamber `E` has no right tunnel; hence, no tunnels remain to explore from our current chamber. We can mark chamber `E` as "Explored". To keep track of which chamber we last visited and to update our stack of chambers we still need to explore, we let `last_node_visited = stack.pop()`, meaning `last_node_visited` now points to node `E`, and our updated stack looks as follows:

  ```
  | X |
  | B |
  | A |
  +---+
  ```

  **Explored chambers:** `[ E ]`

- Since `node` still points to `None`, we do not need to check for a left tunnel. Instead, we need to check for a right tunnel.

  :::tip Simplify Matters by Understanding the Possible Outcomes for Each Iteration

  It is easy to get lost in some of the fancy referential footwork used in the iterative post-order traversal. But note the only possible outcomes for each iteration of the `while` loop:

  - **(left tunnel exists):** enter chamber of left tunnel and keep going left until you can go no further
  - **(no left tunnel; no right tunnel):** mark the chamber as explored (print the node's value), note the chamber as being the last one explored, and remove the chamber from the stack of chambers waiting to be explored
  - **(no left tunnel; right tunnel exists, not yet explored):** enter chamber of right tunnel and try to explore its left tunnels if it has any
  - **(no left tunnel; right tunnel exists, already explored):** this is effectively the same as neither having a left tunnel nor a right tunnel &#8212; follow the guidelines above concerning that scenario

  Essentially, you're going left or right if you can; otherwise, you're marking the chamber as having been explored (printing its value), noting that you just explored it so you don't explore it again and updating the stack of chambers that need exploring (popping from the stack the chamber you just visited and referring to it as `last_node_visited`).

  :::

  Since `X` now sits at the top of the stack, `peek_node = stack[-1]` means `peek_node` points to chamber `X`. This time `peek_node.right` does have a meaningful value since there is a right tunnel from chamber `X` that leads into chamber `M`. Before we visit chamber `M`, however, we need to ask ourselves, "Have we visited chamber `M` yet?" Since `last_node_visited` points to chamber `E` and *not* chamber `M`, we can safely assume we have not yet visited chamber `M`. As such, we should prepared to visit chamber `M`. Update `node` to point to chamber `M`.

  **Explored chambers:** `[ E ]`

- We push `M` on to the stack:

  ```
  | M |
  | X |
  | B |
  | A |
  +---+
  ```

  We attempt to go to chamber `M`'s left tunnel if there is one. There is not. We update the current node to point to `None`.

  **Explored chambers:** `[ E ]`

- `peek_node = stack[-1]` now points to chamber `M`. There's no right tunnel from chamber `M`. Mark chamber `M` as having been explored, and pop it from the stack of chambers we still need to visit (make sure to keep a reference to this most recently explored chamber as well):

  ```
  | X |
  | B |
  | A |
  +---+
  ```

  **Explored chambers:** `[ E M ]`

- Since `node` still points to `None`, we look at chamber `peek_node = stack[-1]`, which points again to chamber `X`. Note that `peek_node.right` gives a meaningful value, namely chamber `M`. But we *just visited* chamber `M` and marked it as explored. Visiting chamber `M` again would not make any sense. Fortunately, we noted which chamber we last visited with `last_node_visited`. This variable points to chamber `M`. 

  Hence, the second part of the `and` portion of

  ```python
  peek_node.right and (last_node_visited is not peek_node.right)
  ```

  is *false*, meaning we *do not* explore the right tunnel (i.e., chamber `M`). This means we can now safely mark chamber `X` as having been explored (since all chambers beneath it on the left and right have now been explored) as well as update our stack and our "most recently visited chamber" reference:

  ```
  | B |
  | A |
  +---+
  ```

  **Explored chambers:** `[ E M X ]`

- The pattern may start to emerge more clearly now. `node` still points to `None`. `peek_node = stack[-1]` means `peek_node` now points to chamber `B`. We see that `peek_node.right` has a meaningful value, namely chamber `S`. Furthermore, `last_node_visited` points to chamber `X`, *not* chamber `S`. Hence, we should explore the right tunnel from chamber `B` that begins with chamber `S`.

  **Explored chambers:** `[ E M X ]`

- `node` now points to chamber `S`. Push it to the stack:

  ```
  | S |
  | B |
  | A |
  +---+
  ```

  We attempt to go to chamber `S`'s left tunnel if there is one. There is not. We update the current node to point to `None`. 

  **Explored chambers:** `[ E M X ]`

- `node` now points to `None`. And `peek_node = stack[-1]` points to chamber `S`. And `peek_node.right` does not give a meaningful value, meaning chamber `S` has no right tunnel. Mark chamber `S` as explored and pop it from the stack: 

  ```
  | B |
  | A |
  +---+
  ```
  
  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S ]`

- `node` points to `None`. `peek_node = stack[-1]` points to chamber `B` again. `peek_node.right` points to chamber `S`, but `last_node_visited` also points to chamber `S`. Hence, mark chamber `B` as explored and pop it from the stack:

  ```
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B ]`

- `node` points to `None`. `peek_node = stack[-1]` points to chamber `A`. `peek_node.right` points to chamber `W`. Since `last_node_visited` points to chamber `B` and *not* chamber `W`, this means we should prepare to visit the right tunnel from chamber `A` that begins with chamber `W`. Update `node` to point to chamber `W`.

  **Explored chambers:** `[ E M X S B ]`

- `node` points to chamber `W`. Push it to the stack:

  ```
  | W |
  | A |
  +---+
  ```

  We attempt to go to chamber `W`'s left tunnel if there is one. There is. We update the current node to point to chamber `T`.

  **Explored chambers:** `[ E M X S B ]`

- `node` points to chamber `T`. Push it to the stack:

  ```
  | T |
  | W |
  | A |
  +---+
  ```

  We attempt to go to chamber `T`'s left tunnel if there is one. There is. We update the current node to point to chamber `P`.

  **Explored chambers:** `[ E M X S B ]`

- `node` points to chamber `P`. Push it to the stack:

  ```
  | P |
  | T |
  | W |
  | A |
  +---+
  ```

  We attempt to go to chamber `P`'s left tunnel if there is one. There is not. We update the current node to point to `None`. 

  **Explored chambers:** `[ E M X S B ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `P`. Since `peek_node.right` does not have a meaningful value (i.e., chamber `P` has no right tunnel), we may mark chamber `P` as explored and pop it from the stack:

  ```
  | T |
  | W |
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `T`. We look for a right tunnel and see that `peek_node.right` reveals chamber `N`. Since `last_node_visited` points to chamber `P` and *not* chamber `N`, we prepare to explore chamber `N`. Update `node` to point to chamber `N`.

  **Explored chambers:** `[ E M X S B P ]`

- `node` points to chamber `N`. Push it to the stack:

  ```
  | N |
  | T |
  | W |
  | A |
  +---+
  ```

  We attempt to go to chamber `N`'s left tunnel if there is one. There is not. We update the current node to point to `None`. 

  **Explored chambers:** `[ E M X S B P ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `N`. Since `peek_node.right` does not provide a meaningful value (i.e., chamber `N` has no right tunnel), we may mark chamber `N` as explored and pop it from the stack:

  ```
  | T |
  | W |
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P N ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `T` again. And `peek_node.right` points to chamber `N`. But `last_node_visited` also points to chamber `N`, indicating we *should not* explore chamber `N`. Instead, we should mark chamber `T` as explored and pop it from the stack:

  ```
  | W |
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P N T ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `W`. And `peek_node.right` points to chamber `C`. Since `last_node_visited` points to chamber `T` and *not* chamber `C`, we should prepare to visit chamber `C`. Update `node` to point to chamber `C`.

  **Explored chambers:** `[ E M X S B P N T ]`

- `node` points to chamber `C`. Push it to the stack:

  ```
  | C |
  | W |
  | A |
  +---+
  ```

  We attempt to go to chamber `C`'s left tunnel if there is one. There is. We update the current node to point to chamber `H`.

  **Explored chambers:** `[ E M X S B P N T ]`

- `node` points to chamber `H`. Push it to the stack:

  ```
  | H |
  | C |
  | W |
  | A |
  +---+
  ```

  We attempt to go to chamber `H`'s left tunnel if there is one. There is not. We update the current node to point to `None`.

  **Explored chambers:** `[ E M X S B P N T ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `H`. Since `peek_node.right` does not provide a meaningful value, we may mark chamber `H` as being explored and pop it from the stack:

  ```
  | C |
  | W |
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P N T H ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `C`. Since `peek_node.right` does not provide a meaningful value, we may mark chamber `C` as explored and pop it from the stack:

  ```
  | W |
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P N T H C ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `W`. Even though `peek_node.right` points to chamber `C`, we see that `last_node_visited` also points to chamber `C`, meaning we *should not* visit chamber `C`. Mark chamber `W` as explored and pop it from the stack:

  ```
  | A |
  +---+
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P N T H C W ]`

- `node` points to `None`. And `peek_node = stack[-1]` points to chamber `A`. Even though `peek_node.right` points to chamber `W`, we see that `last_node_visited` also points to chamber `W`, meaning we *should not* visit chamber `W`. Mark chamber `A` as explored and pop it from the stack:

  ```
  []
  ```

  Update our reference for the most recently explored chamber.

  **Explored chambers:** `[ E M X S B P N T H C W A ]`

The `while` loop does not fire now since `node` still points to `None` and `stack` is now empty. The iterative post-order traversal is now complete, and we see we have visited the chambers in the expected order:

```
E M X S B P N T H C W A
```

</details>

In sum, iterative post-order traversals can be rather complicated, but can also be elegant nonetheless.