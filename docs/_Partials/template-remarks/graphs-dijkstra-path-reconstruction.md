Dijkstra finds the shortest path from a source node to all other nodes in a graph. If we want to *reconstruct* the shortest paths themselves, then we need to compute the predecessors of each node in the shortest path tree. A small modification to the template is needed:

```python
def dijkstra(graph, source):
    n = len(graph)                          # Dijkstra on graph with n nodes
    distances = [float('inf')] * n          # "infinitely" far from source (unvisited nodes)
    distances[source] = 0
    # highlight-success-next-line
    pred = [None] * n
    min_heap = []
    heapq.heappush(min_heap, (0, source))   # heap contents: (d(v, source), v), where
                                            # d gives a distance from source node
                                            # to node v, another node in graph
    
    while min_heap:
        curr_dist, node = heapq.heappop(min_heap)
        if curr_dist > distances[node]:     # optimization for lazy Dijkstra: ignore current path
            continue                        # if we already found a better one (i.e., node was previously
                                            # extracted from min_heap with a smaller distance)
    
        for neighbor, weight in graph[node]:
            dist = curr_dist + weight
            if dist < distances[neighbor]:  # add neighbor to min_heap if it creates a shorter path
                distances[neighbor] = dist
                # highlight-success-next-line
                pred[neighbor] = node
                heapq.heappush(min_heap, (dist, neighbor))
    
    # highlight-success-next-line
    return distances, pred
```

All that remains is to reverse the steps from any given node to the source and then reverse that path to get the original shortest path from source to destination.

```python
def dijkstra_shortest_path(graph, source, target):
    distances, predecessors = dijkstra(graph, source)
    path = []
    
    # if target node is not accessible from source node,
    # then return an empty path
    if distances[target] == float('inf'):
        return path
    
    # traverse the previous nodes to build the path
    node = target
    while node is not None:
        path.append(node)
        node = predecessors[node]
    
    # reverse the path to get the correct order from start to end    
    path.reverse()
    return path
```