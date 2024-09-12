Bellman-Ford is an SSSP algorithm, which means it will find the shortest path from a source node to all other nodes in the graph. Unless there is a negative-weight cycle! Then it's possible for paths to exist that can be made infinitely negative by virtue of the negative cycle. Specifically, shortest paths cannot exist for nodes that either lie directly *on* a negative-weight cycle or are *reachable* by a negative-weight cycle.

Is our shortest path work useless if a negative cycle exists or can we salvage it by still finding shortest paths to the nodes that are neither on nor reachable from a negative-weight cycle? We can salvage it! As [this video notes](https://www.youtube.com/watch?v=lyw4FaxrwHg&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=21), we basically need to iterate over all edges again, marking nodes on or reachable from negative-weight cycles by $-\infty$ to indicate a weight of negative infinity and updating their predecessor values to `None`. How many times do we need to iterate over all edges again? A maximum of $|V| - 1$ times in order to let the negatively infinite values fully propagate throughout the graph:

```python
# graph assumed to be an adjacency list of n nodes
def bellman_ford(graph, start):
    n = len(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    predecessors = [None] * n
    
    # main loop: run |V| - 1 times (i.e., n - 1 times)
    for _ in range(n - 1):
        # optimization: return early if no edge is updated after relaxing all edges
        edge_updated = False
        # relax every edge in the graph
        for node in range(n):
            for neighbor, weight in graph[node]:
                if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                    edge_updated = True
                    distances[neighbor] = distances[node] + weight
                    predecessors[neighbor] = node
        
        if not edge_updated:
            return distances, predecessors
    
    # run main loop again for negative cycle detection
    # if negative cycle exists, then update nodes
    #   on the cycle or reachable by the cycle to have a 
    #   weight of -infinity
    # run a maximum of |V| - 1 times to ensure -infinity
    #   values propagate throughout the entire graph
    for _ in range(n - 1):
        edge_updated = False
        for node in range(n):
            for neighbor, weight in graph[node]:
                if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                    edge_updated = True
                    distances[neighbor] = float('-inf')
                    predecessors[neighbor] = None
                    
        if not edge_updated:
            return distances, predecessors

    return distances, predecessors
```

Now consider the example graph from the video:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('@site/static/img/templates/graphs/f13.png').default} />
</div>

Let's try out our code on this graph:

```python
graph = {
    0: [(1, 5)],
    1: [(2, 20), (5, 30), (6, 60)],
    2: [(3, 10), (4, 75)],
    3: [(2, -15)],
    4: [(9, 100)],
    5: [(4, 25), (6, 5), (8, 50)],
    6: [(7, -50)],
    7: [(8, -10)],
    8: [],
    9: [],
}

def bellman_ford(graph, start):
    # ...

bellman_ford(graph, 0)  # Output:
                        #   Distances:    [0,    5, -inf, -inf, -inf, 35, 40, -10, -20, -inf]
                        #   Predecessors: [None, 0, None, None, None,  1,  5,   6,   7, None]
```

The result above confirms the graphic from the video. It looks like we should still be able to determine the shortest path from node `0` to node `6` though (using the shortest path reconstruction code from a previous remark):

```python
bellman_ford_shortest_path(graph, 0, 6)
# Output: [0, 1, 5, 6]
```

This also confirms what we can see in the graphic from the video.