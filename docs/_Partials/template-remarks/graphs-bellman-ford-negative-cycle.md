import BibRef from '@site/src/components/BibRef';

If a negative cycle exists, then we can modify our Bellman-Ford template to capture and return the first negative cycle we discover (the highlighted code below has been added to the template):

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
    
    # run main loop 1 more time for negative cycle detection
    # (return a negative cycle if it exists)
    for node in range(n):
        for neighbor, weight in graph[node]:
            if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                #highlight-start
                curr = neighbor                                     # negative cycle exists (start exploring predecessor chain from neighbor node)
                visited = set()                                     # keep track of which nodes have been visited
                while curr not in visited:
                    visited.add(curr)
                    curr = predecessors[curr]
                    if curr in visited:                             # if node X has already been visited, then we can start cycle construction with node X
                        negative_cycle = [curr]
                        cycle_node = predecessors[curr]             # explore the predecessor value chain for X
                        while cycle_node != negative_cycle[0]:      # until we encounter X again, closing the cycle
                            negative_cycle.append(cycle_node)       # append nodes to cycle as encountered
                            cycle_node = predecessors[cycle_node]
    
                        negative_cycle.reverse()                    # reverse cycle construction to get actual path
                        return negative_cycle
                #highlight-end

    return distances, predecessors
```

The highlighted portion of the code above effectively answers the following exercise from <BibRef id='TC2022' pages='p. 616'></BibRef>:

> Suppose that a weighted, directed graph $G = (V, E)$ contains a negative-weight cycle. Give an efficient algorithm to list the vertices of one such cycle. Prove that your algorithm is correct.

Note that we are trying to find the vertices for *any* negative-weight cycle. We are *not* trying to enumerate them all or even find a specific one (e.g., the *most negative cycle*). [There could be exponentially many negative cycles](https://cs.stackexchange.com/a/134243/115364), and it's not in our interest to try to find them all. We will usually be satisfied with an existential determination about negative-weighted cycles: Does one exist? 

- No? Great, then we can fully describe the shortest path from the source node to all other nodes! 
- Yes? Uh-oh. Then that means the shortest path to *all* other nodes does not exist. We might be able to find the shortest path from the source to nodes not reachable by any negative cycles, but the main use case for the algorithm fails.

What if an existential determination (like the ones above) is not enough? What if we're actually interested in finding the vertices themselves that make up a negative-weighted cycle? Then we can [go back up the predecessor chain to find the cycle](https://cs.stackexchange.com/a/6921/115364). Specifically, we go back through the edges one more time after the main loop (i.e., where we normally do a simple negative cycle check and then call it a day). 

Once we find an edge `(node, neighbor)` for which `distances[node] + weight < distances[neighbor]`, then we know that either vertex `neighbor` is *on* a negative-weight cycle or is *reachable* from one. We can find a vertex *on* the negative weight-cycle by tracing back the predecessor values from `neighbor`, keeping track of which vertices we've visited until we reach a vertex `X` that we've visited before. Then we can trace back predecessor values from `X` until we get back to `X`, and all vertices in between, along with `X`, will constitute a negative-weight cycle.

In the code above, if the condition `if curr in visited:` fires after the assignment `curr = predecessors[curr]`, then we will know that we have seen `curr` before (the role of `X` in the explanation above) and we can use `curr` and its predecessor values to reconstruct whatever negative-weight cycle we have just discovered, ending when `cycle_node == negative_cycle[0]` because that means we have traced back the predecessor values of `curr` until we have reached `curr` again. The last step is to reverse the ordering of the negative-weighted cycle nodes we've been recording because we want the returned list to represent the actual path of the negative-weight cycle.

A couple examples may help solidify the use of the code above (the first two examples reference <BibRef id='DPV' pages=''></BibRef> while the last example is from [William Fiset's YouTube series](https://www.youtube.com/watch?v=lyw4FaxrwHg&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=21)).

<details>
<summary> Examples</summary>

Recall the graph from <BibRef id='DPV' pages='p. 118'></BibRef> (skip to the third example for a different self-contained example):

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('@site/static/img/templates/graphs/f11.png').default} />
</div>

Everything is easier if we map the nodes to their numeric equivalent as in the table to the right of the graph above:

```
S: 0
A: 1
B: 2
C: 3
D: 4
E: 5
F: 6
G: 7
```

Once we do this, we can represent the pictured graph as an adjacency list in code as follows:

```python
graph = {
    0: [(1, 10), (7, 8)],
    1: [(5, 2)],
    2: [(1, 1), (3, 1)],
    3: [(4, 3)],
    4: [(5, -1)],
    5: [(2, -2)],
    6: [(1, -4), (5, -1)],
    7: [(6, 1)]
}
```

Now let's consider two examples where negative cycles are introduced.

<details>
<summary> Example 1</summary>

As the authors note, if the length of the edge $(E, B)$ is changed to $-4$, then the graph would have a negative cycle $A\to E\to B\to A$, which we can represent as a collection of nodes (with numerical mapping): `[1, 5, 2]`. Let's run our code on this new graph and see what we get:

```python
def bellman_ford(graph, start):
    # ...

graph = {
    0: [(1, 10), (7, 8)],
    1: [(5, 2)],
    2: [(1, 1), (3, 1)],
    3: [(4, 3)],
    4: [(5, -1)],
    #highlight-success-next-line
    5: [(2, -4)],
    6: [(1, -4), (5, -1)],
    7: [(6, 1)]
}

bellman_ford(graph, 0) # Output: [3, 4, 5, 2]
                       #         [C, D, E, B]
```

Why didn't we get `[1, 5, 2]`? If we look at the graph again, then we'll see that $C\to D\to E\to B\to C$ is also a negative-weight cycle when the length of the edge $(E, B)$ is changed to $-4$. Our algorithm does not discriminate between negative-weight cycles. It simply returns the first one it finds, which, in this case, happens to be $C\to D\to E\to B\to C$.

</details>

<details>
<summary> Example 2</summary>

The example above showed how our code returns a negative-weight cycle where the source node was not involved. Is it possible for the source node to be involved? What if we negated and changed the direction of the edge $(S, A)$ so that we had the directed edge $(A, S)$ with a weight of $-10$? Let's see:

```python
def bellman_ford(graph, start):
    # ...

graph = {
    #highlight-success-start
    0: [(7, 8)],
    1: [(0, -10), (5, 2)],
    #highlight-success-end
    2: [(1, 1), (3, 1)],
    3: [(4, 3)],
    4: [(5, -1)],
    5: [(2, -2)],
    6: [(1, -4), (5, -1)],
    7: [(6, 1)]
}

bellman_ford(graph, 0) # Output: [0, 7, 6, 1]
                       #         [S, G, F, A]
```

This matches the negative-weight cycle we can see from the graph (after negating and flipping the edge): $S\to G\to F\to A\to S$.

</details>

<details>
<summary> Example 3</summary>

The following graph is used in [a video](https://www.youtube.com/watch?v=lyw4FaxrwHg&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=21) by William Fiset:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('@site/static/img/templates/graphs/f13.png').default} />
</div>

It's clear nodes `2` and `3` are the nodes directly on a negative-weighted cycle. Let's see what our code returns:

```python
def bellman_ford(graph, start):
    # ...

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

bellman_ford(graph, 0) # Output: [2, 3]
```

The output indicates a negative-weighted cycle exists with path $2\to 3\to 2$, as expected.

</details>

</details>

More interesting examples may be helpful to consider, but the examples given above should be good starting points (ha).