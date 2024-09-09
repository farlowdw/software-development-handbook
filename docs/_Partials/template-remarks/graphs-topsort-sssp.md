Given a `start` node, we can find single-source shortest paths in (weighted) DAGs by first generating a topological ordering of the nodes (e.g., using Khan's algorithm, as provided in the template) and *then* relaxing the edges of all nodes in the graph, following the ordering, where both of these steps can be done in linear time proportional to the size of the graph:

```python
def shortest_path_DAG(graph, start):
    n = len(graph)
    top_order = topological_sort(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    for node in top_order:
        for neighbor, weight in graph[node]:
            if distances[node] + weight < distances[neighbor]:  # relax edge 'node -> neighbor' with 'weight'
                distances[neighbor] = distances[node] + weight
    
    return distances
```

The returned `distances` array will contain the length of the shortest path from `start` to each node. In the case of DAGs, since there are no cycles, we can also find single-source longest paths by simply negating the weight of each edge, finding the shortest path, and *then* negating the results:

```python
def longest_path_DAG(graph, start):
    n = len(graph)
    top_order = topological_sort(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    for node in top_order:
        for neighbor, weight in graph[node]:
            weight = -weight
            if distances[node] + weight < distances[neighbor]:  # relax edge 'node -> neighbor' with 'weight'
                distances[neighbor] = distances[node] + weight
    
    distances = [ -distance for distance in distances]
    return distances
```

In both cases, note that our original template code for producing a topological ordering needs to be slightly modified where we traverse neighboring nodes: the line `for neighbor in graph[node]:` needs to be changed to `for neighbor, _ in graph[node]:` since tuples are now stored in the graph instead of individual nodes (each node's edge weight must be recorded). Additionally, before trying to report a shortest or longest path in a DAG, we need to ensure a topological ordering was actually produced (i.e., no cycle was found for whatever graph we're considering).

William Fiset's [video on shortest/longest paths in DAGs](https://www.youtube.com/watch?v=TXkDpqjDMHA&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=17) provides a nice example of a weighted DAG:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f10.png').default} />
</div>

We can map the labelled nodes `A, ... , H` to `0, ..., 8`, respectively, whereby we can then represent the graph as follows:

```python
graph = {
    0: [(1, 3), (2, 6)],
    1: [(2, 4), (3, 4), (4, 11)],
    2: [(3, 8), (6, 11)],
    3: [(4, -4), (5, 5), (6, 2)],
    4: [(7, 9)],
    5: [(7, 1)],
    6: [(7, 2)],
    7: []
}
```

Running the code snippets above for shortest and longest paths, where `A` is the start node, gives us the following:

```python
#  A  B  C   D   E   F   G   H
  [0, 3, 6,  7,  3, 12,  9, 11] # shortest path from node A to each node
  [0, 3, 7, 15, 14, 20, 18, 23] # longest path from node A to each node
```