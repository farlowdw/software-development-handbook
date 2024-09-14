It's worth taking a moment to identify the key components of the template as well as what roles they play:

- `dist`: Maintains the minimal edge weights to reach each node *from* the MST (which is being recorded in `pred`). It is essential for deciding which edge to select next.
- `pred`: Records the parent of each node in the MST. It also enables the reconstruction of the MST tree itself.
- `visited`: Ensures nodes are only included once in the MST, preventing cycles.
- `min_heap`: A priority queue that efficiently selects the next node to include based on the minimal edge weight. Note that by allowing duplicates in the `min_heap` and checking `vis[node]` upon popping, the template avoids the complexity of updating priorities within the heap when a shorter path is found (this would require an indexed priority queue, which most languages don't support out of the box). This "lazy" approach simplifies the code and leverages the heap's properties for correctness.

Note that each vertex `nbr` added to the heap *must* have a predecessor (the only exception is whatever node we choose to be the root of our MST, the start node, which has no predecessor), specifically `node`, which was popped from the heap previously. When `w < dist[nbr]` and `nbr` has not yet been visited, the subsequent assignments basically amount to strategizing how to properly *expand* the MST we're building:

- `dist[nbr] = w` means that edge `node -> nbr` has weight `w`, where `w` is currently the best known distance from a node *in* the MST (i.e., currently `node`) to the node `nbr` *outside* the MST. Of course, at some point, if `nbr` has not yet been added to the MST, then we may come across `another_node` in the MST that has a *better* distance to `nbr` outside the MST, in which case we would end up making the update `dist[nbr] = w_2`, where `w_2` is the weight of the edge `another_node -> nbr`.
- `pred[nbr] = node` is simply a way of ensuring that the edge `node -> nbr` is recorded as part of the MST if it ultimately gets added. As noted above, if `nbr` has not yet been added to the MST, and we come across `another_node` in the MST that has a better distance to `nbr` outside the MST, then the previous assignment of `pred[nbr] = node` is overwritten by the assignment `pred[nbr] = another_node`. Of course, if `another_node` does not have a better distance to `nbr`, then we simply ignore it.

For example, consider a partial MST and a node `node` not yet included:

```
Current MST Nodes: {A, B, C}
Edges in MST: (A-B), (B-C)
Unvisited Node: D
Possible Edges: (C-D) with weight 2, (B-D) with weight 3, (A-D) with weight 1
```

- **Edge Selection:**
  + When processing neighbors of `C`, we find that edge `(C-D)` with weight `2` is less than `dist[D]` (initially `inf`), so we update `dist[D] = 2` and `pred[D] = C`.
  + Edge `(B-D)` with weight `3` is not less than the current `dist[D]`, so we ignore it.
  + Edge `(A-D)` with weight `1` is better than the current `dist[D]`, so we update `dist[D]`.
- **Heap Insertion:**
  + We push `(2, D)` onto the `min_heap`.
  + We push `(1, D)` onto the `min_heap`.
- **Popping from Heap:**
  + When `(1, D)` is popped, `visited[D]` is `False`, so we mark `D` as visited.
  + When `(2, D)` is eventually popped, `visited[D]` is `True`, so we ignore this stale heap entry to avoid creating a cycle.
- **Adding Edge to MST:**
  + The edge from `pred[D]` to `D` is initially `(C-D)`, but `D` has not yet been marked visited (hence the edge is not final in the MST).
  + The edge from `pred[D]` to `D` is ultimately updated to be `(A-D)`, and `D` is marked as visited, which means this edge is final in the MST.

Note how the `pred` array changes over time but progressively becomes fixed as nodes are added to the MST. In the example above, we started with `pred[D] = None`, then `pred[D] = C`, and finally `pred[D] = A`. The value `pred[D]` only became fixed once `D` was marked as visited.

Essentially, when an unvisited node is popped from the heap, we are guaranteed to add an edge to the MST (the only exception being the start node). The edge added is `(pred[node], node)`, which connects the newly included node to the MST via the minimal edge found. This ensures the MST remains connected and includes minimal edges without forming cycles.