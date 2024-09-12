Bellman-Ford finds the shortest path from a source node to all other nodes in a graph *unless* there is a negative cycle. Hence, if running the Bellman-Ford algorithm in the template returns `False`, then no shortest path from a source node to a target node may be found; otherwise, the process for determining the shortest path is virtually the same as that used with Dijkstra:

```python
def bellman_ford_shortest_path(graph, source, target):
    res = bellman_ford(graph, source)
    if not res:
      return []

    distances, predecessors = res
    path = []
    
    if distances[target] == float('inf'):
        return path
    
    node = target
    while node is not None:
        path.append(node)
        node = predecessors[node]
        
    path.reverse()
    return path
```