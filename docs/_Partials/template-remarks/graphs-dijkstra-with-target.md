If we only care about the distance or shortest path from the `source` to a specific node, `target`, then we can halt the algorithm with an early termination as soon as we **extract** the target node from `min_heap` (not as soon as we *add* the target node to `min_heap`). In Dijkstra, unlike in BFS, we only know that we have found the shortest distance to a node once we have extracted it for the first time from the priority queue, `min_heap` in the case of the template:

```python
#highlight-success-next-line
def dijkstra(graph, source, target):
    n = len(graph)                          # Dijkstra on graph with n nodes
    distances = [float('inf')] * n          # "infinitely" far from source (unvisited nodes)
    distances[source] = 0
    min_heap = []
    heapq.heappush(min_heap, (0, source))   # heap contents: (d(v, source), v), where
                                            # d gives a distance from source node
                                            # to node v, another node in graph
    
    while min_heap:
        curr_dist, node = heapq.heappop(min_heap)
        
        #highlight-success-start
        if node == target:
            return curr_dist
        #highlight-success-end
        
        if curr_dist > distances[node]:     # optimization for lazy Dijkstra: ignore current path
            continue                        # if we already found a better one (i.e., node was previously
                                            # extracted from min_heap with a smaller distance)
    
        for neighbor, weight in graph[node]:
            dist = curr_dist + weight
            if dist < distances[neighbor]:  # add neighbor to min_heap if it creates a shorter path
                distances[neighbor] = dist
                heapq.heappush(min_heap, (dist, neighbor))
    
    #highlight-success-next-line
    return float('inf')
```