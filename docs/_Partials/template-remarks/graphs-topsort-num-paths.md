A single-source shortest path (SSSP) algorithm tries to find the shortest path from a `start` node to *all* other nodes in the graph. We can make a similar assessment concerning the *number of paths* between nodes in a DAG: we want to find the number of paths from some `start` node to all other nodes in the DAG.

A template for doing so is as follows:

```python
# T: O(V + E); S: O(V)
def num_paths(graph, start):
    n = len(graph)
    top_order = topological_sort(graph)
    count = [0] * n
    count[start] = 1
    for node in top_order:
        for neighbor in graph[node]:
            count[neighbor] += count[node]
    
    return count
```

This template works as follows:

- **Perform topological sort:** Use the topological sort template (i.e., Kahn's algorithm) to find a topological ordering of the nodes (this assumes our graph is a DAG).
- **Initialize path count array:** Create an array or map `count` where `count[v]` will store the number of path from `start` to `target`, where `target` is an arbitrary node in the DAG. Initialize `count[start] = 1` since there is exactly one path from `start` to itself. Then initialize `count[target] = 0` for all other nodes `target != start`.
- **Process nodes in topological order:** Iterate through each node `node` in the topologically sorted order. For each outgoing edge `[node, neighbor]`, update the path count for `neighbor` by adding the current path count of `node`: `count[neighbor] += count[node]`. Importantly, this ensures that by the time we process `neighbor`, all possible paths leading to `node` have already been accounted for.
- **Retrieve result:** After processing all nodes, `count` will contain the total number of distinct paths from `start` to every other node in the DAG. If we are only interested in the number of distinct paths from `start` to a specific other node, `target`, then we can return `count[target]` instead of `count`.

As an example, consider the DAG

```
S → A → T
S → B → T
A → B
```

which can be represented as an adjacency list as follows (where `S`, `A`, `B`, and `T` are mapped to `0`, `1`, `2`, and `3`, respectively):

```python
graph = {
    0: [1, 2],  # (S, A), (S, B)
    1: [2, 3],  # (A, B), (A, T)
    2: [3],     # (B, T)
    3: []
}
```

Running the template code on this graph with `S` as the start node yields the following: `[1, 1, 2, 3]`, which means there's `1` path from `S` to itself, `1` path from `S` to `A`, `2` paths from `S` to `B`, and `3` paths from `S` to `T`.