If it is guaranteed that the input graph is directed and acyclic (i.e., a DAG), then we do not need to track the visiting status of different nodes because a cycle will not be possible by definition:

```python
# T: O(V + E); S: O(V)
def topsort(graph):
    n = len(graph)
    top_order = []
    visited = [False] * n
    
    def dfs(node):
        visited[node] = True
        for nbr in graph[node]:
            if not visited[nbr]:
                dfs(nbr)
    
        top_order.append(node)
    
    for node in range(n):
        if not visited[node]:
            dfs(node)
    
    return top_order
```

The code above is simply streamlined for contexts where we know for certain that the input graph does not have a cycle.