The motivation for the DFS-based algorithm for finding a topological sort, as described below, is largely inspired by [this video](https://www.youtube.com/watch?v=xqLY-ZLJig8&list=PLSVu1-lON6LyvT8iceopuqnmSmPiSA6wX&index=3). My goal here is mostly to provide more explanations and working code.

The idea behind Kahn's algorithm for finding a topological sort was to find a vertex that could go *first* and work from the beginning; of course, we could also try to find something that could go last and work our way towards the first item. To do that, we could modify Kahn's algorithm to work from the back, but that would really just be Kahn's algorithm again in a different way. It might be slightly slower than before because it would first have to convert the graph into an incoming edge adjacency list representation. That incoming vs. outgoing adjacency list is the only non-symmetrical difference between finding the ordering front to back or back to front.

Another way to find a vertex that can go *last* is to just run depth first search on the outgoing lists until we get to a vertex with no outgoing edges. That vertex can go last. We'll use the same graph from the example exploration in Kahn's algorithm:

<div align='center' className='centeredImageDiv'>
  <img width='225px' src={require('@site/static/img/templates/graphs/f34.png').default} />
</div>

But we can rearrange this graph to make the depth first search tree easier to see (and add space below for an ordering):

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f35.png').default} />
</div>

If we run depth first search alphabetically, then we will start with vertex `A`, and then we find vertex `B` along a tree edge (edges will be colored according to the color scheme used when first discussing DFS: tree edges (red), back edges (black), forward edges (blue), cross edges (green)). The vertex `B` has no outgoing edges so it can go last in our topological order:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f36.png').default} />
</div>

Our depth first search finishes `B` and returns to `A`, which has two other outgoing edges. If we want to, we can continue our depth first search looking for other vertices that have no outgoing edges, but let's stop for just a second and think about what the edges from vertex `A` actually *mean*. In the graph above, `A` has edges to `B`, `E`, and `G`, so `A` has to go *before* each of those vertices in the topological order. Even more than that, `A` has to go before *any* vertex that it can reach in the entire graph, either because it has a direct edge to them or because it has a longer path to them (e.g., vertex `D`). If `A` has to precede `E`, and `E` has to precede `D`, then `A` has to precede `D`. But what vertices are reachable from `A`? Exactly those that we will reach when we run depth first search on `A`. Vertex `A` can go in the topological order as long as it is before everything that is discovered in the course of a depth first search on it. If we continue the search, then we go to `E`, then `D`, and we see a cross edge to `B`, then we go to `F`, which has no outgoing edges so `F` can go last (i.e., out of the remaining vertices):

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f37.png').default} />
</div>

When depth first search returns to `D`, just like with vertex `A`, vertex `D` has to precede everything that it can reach in *its* depth first search. Continuing that search of `D`, we get to `G`, see that it has no outgoing edges, and then we put *it* after all vertices waiting to be finished:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f38.png').default} />
</div>

Now when we return to `D`, all of its outgoing edges have been explored. Everything that has to follow it in the topological ordering, everything it can reach, `F` and `G`, have already secured a slot in the ordering *after* `D`. So `D` can go last out of all the unfinished vertices:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f39.png').default} />
</div>

We continue our depth first search. `E` has a forward edge and then finishes so we can put it in the latest unreserved slot:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f40.png').default} />
</div>

Vertex `A` has a forward edge to `G` and then finishes so we can put it in the latest open slot:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f41.png').default} />
</div>

Whenever we finish a vertex, we put in the latest remaining unreserved slot in our topological order. We continue the search on the entire graph, not just the top-level call on vertex `A`. The top-level search ignores `B` because it's already searched, but `C` isn't. But when `C` finishes, it will add `C` to the front of the order. Everything else is already explored so all other top-level searches will just move on (i.e., when executing DFS on all nodes of the graph, starting from `A` gives us everything except `C`; once `C` is done, all other vertices will be skipped):

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f42.png').default} />
</div>

We can now admire our work:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f43.png').default} />
</div>

If we repurpose work done in another note (the DFS note on its motivation and a non-recursive way of executing a DFS), then we can define the graph in this example (and a lookup for ease of reference) 

```python
graph = [
    [1, 4, 6],
    [],
    [6],
    [1, 5, 6],
    [3, 6],
    [],
    [],
]

lookup = {
    -1: ' ',
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
}
```

and investigate the non-recursive DFS output:

```python
""" 

(   A  B   C   D   E  F  G
  [ 1, 2, 13,  5,  4, 6, 8],    # discovered
  [12, 3, 14, 10, 11, 7, 9],    # finished
  [-1, 0, -1,  4,  0, 3, 3],    # predecessors
  {                             # edge classifications
    ('A', 'B'): 'treeEdge',
    ('A', 'E'): 'treeEdge',
    ('E', 'D'): 'treeEdge',
    ('D', 'B'): 'crossEdge',
    ('D', 'F'): 'treeEdge',
    ('D', 'G'): 'treeEdge',
    ('E', 'G'): 'forwardEdge',
    ('A', 'G'): 'forwardEdge',
    ('C', 'G'): 'crossEdge'
  }
)

"""
```

It's worth noting that the topological sort perfectly aligns with the reverse order in which vertices were finished in the DFS:

```python
# Topological order: C A E D G F B

# finish times
#   A  B   C   D   E  F  G    <- node correspondence
# [12, 3, 14, 10, 11, 7, 9]   <- unordered finish times
# ...
# [14, 12, 11, 10, 9, 7, 3]   <- reverse order of finish times
#   C   A   E   D  G  F  B    <- topological order
```

We can also confirm all of the edge classifications as they appear in the video:

<div align='center' className='centeredImageDiv'>
  <img width='200px' src={require('@site/static/img/templates/graphs/f44.png').default} />
</div>

At this point, it's worth asking: What exactly is the algorithm we used here to produce a topological ordering? It's really quite simple:

- Run depth first search on entire graph
- Set the topological order to be the reverse order of vertex finish times

That's it. Because the graph is acyclic, when depth first search on a vertex completes, everything that vertex can reach has been explored &#8212; as long as the vertex is before those things in the ordering, it's set. To topologically sort, you don't really need the start or finish times. You could modify depth first search to return the topological ordering directly.

The following graphic does a decent job of giving some intuition as to why this DFS algorithm works for producing a topological ordering when the graph is acyclic:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f45.png').default} />
</div>

Specifically, using parthensis notation and edge classification (both remarked on in the note for recursive DFS), notice that tree edges, forward edges, and cross edges, the *closing parentheses* for `v` come *before* the closing parentheses for `u`, which is what we want for all edges `u -> v` since `u -> v` implies that `v` has `u` as a dependency that needs to be resolved and thus `u` must come earlier in the ordering. For these three edge types, `v` will finish before `u`. So if we take vertices in reverse order of finish time, then any edge from `u` to `v` will put `v` *after* `u`, just like we need it to be.

The only problem is back edges, where vertex `u` would finish before `v`. But for depth first search on an acyclic graph, there are no back edges since a back edge completes a cycle between a vertex and its ancestor. So don't worry about back edges (unless we're not guaranteed the input graph is acyclic, in which case we need to implement logic for cycle detection).

Two things worth considering in regarde to possible variations of the implementation we've been discussing:

1. **Subset of vertices:** If we only want to consider vertices reachable from a subset of vertices, maybe even a single vertex, then simply modify the top-level depth first search to only search from that subset or that one vertex. The recursive part doesn't change.
2. **Non-recursive DFS:** If we're possibly at risk of a stack overflow, then it may be beneficial to consider an iterative implementation of DFS instead of the recursive implementation.

Finally, it's important to note that if we run our recursive DFS algorithm for finding a topological ordering on a graph that does have cycles, then unlike Kahn's algorithm, our algorithm *will* return an order including all vertices. Of course, the order returned isn't a *topological* order (because that doesn't exist for a graph that has cycles), but it can still be helpful due to some special properties that can be exploited based on finishing times. Kosaraju's algorithm for finding strongly connected components (SCCs) makes use of such a non-topological order.