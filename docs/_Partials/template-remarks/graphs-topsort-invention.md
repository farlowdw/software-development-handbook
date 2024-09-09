The following observations and algorithms in pseudocode appear in [Kahn's Algorithm for Topological Sorting](https://www.youtube.com/watch?v=agHGA0pVMe8) video on the "Algorithms with Attitude" YouTube channel.

The linked video above does a fantastic job illustrating how one might "invent" a way to find a topological ordering for a graph by a series of observations and iterative improvements. The final observation and algorithm reflect the template for finding topological orderings.

**Observation and algorithm (1):** 

- A vertex with no incoming edges can go first (this suggests the in-degree for graph nodes will play a part in developing an effective algorithm) &#8212; recall that a directed edge `A -> B` means `B` "depends" on `A` in the sense that `A` must come before `B` in whatever eventual topological ordering of the nodes we produce.
- A DAG *must* contain a vertex with no incoming edges or else we are dead in the water from the beginning (if no such node existed, then this would mean *every* node has a dependency and thus we do not have a sensible starting point); fortunately, by definition, a DAG has to have at least one node with no incoming edges (otherwise we would have a cycle).
- If you want to find a vertex with an in-degree of `0` (i.e., no incoming edges), then start at an arbitrary vertex and follow a path of incoming edges *backwards*:
    * If we get to a vertex with no incoming edges, then great!
    * If not, then once we've gone back $V$ edges in a graph with $V$ vertices, then we must be repeating vertices which means we must have a cycle.

The observations above make it possible for us to come up with a first stab at an algorithm:

```a title="Algorithm 1"
Topsort(G)
  while G isn't empty
    find u in V with no incoming edges
    put u next in the topological ordering
    remove u and all its outgoing edges from G
```

**Observation and algorithm (2):**

The algorithm above works and its efficiency depends on implementation details. If we get the graph $G = (V, E)$ as an outgoing adjacency list (the usual graph representation for search algorithms we are often given or need to build), then finding a vertex with no incoming edges might take a while. And we do that once for each vertex we put in the ordering. To make it fast, maybe we don't need to do that from scratch after every vertex.

To start the algorithm in time linear for the size of the graph, we can create an incoming list for each vertex. With those incoming adjacency lists, we can find all vertices with no incoming edges, and those are the vertices that can go first. We can grab all of those vertices to make an ordered list of vertices that are ready to go, `A` and `C` in the sample graph in the video.

<div align='center' className='centeredImageDiv'>
  <img width='225px' src={require('@site/static/img/templates/graphs/f9.png').default} />
</div>

If we let `A` go first, then we use its outgoing adjacency list to figure out which edges to delete from the incoming adjacency lists of `B`, then `E`. When we delete `A`'s edge to vertex `E`, we see it is `E`'s last incoming edge so we can add `E` to our growing ordered list. Finally, we delete `A` from `G`'s incoming list, and we finally delete `A` from the graph. We continue through the list this way, where each time we get to a vertex, we look at its outgoing edges, delete them from the corresponding incoming edge lists, and if it's the last incoming edge for a vertex, then we can add that vertex to our ordered list.

To summarize this second set of observations:

- There's no need to start from scratch each time:
  + Compute incoming adjacency list just once to start
  + Grab a set of all 0 in-degree vertices
  + Find new 0 in-degree vertices as vertices are removed from the graph

If we incorporate the new observations into pseudocode for an improved algorithm, then we will have something like the following:

```a title="Algorithm 2"
Topsort(G)
  create incoming edge adjacency list for each vertex (time linear in the graph size)
  S = ordered list
  add all vertices with no incoming edges to S (order V time)
  while not done with S
    consider next vertex u from S
    put u next in the topological ordering
    while removing u and its outgoing edges from G
      if vertex v's incoming edge becomes empty
        add v to S
```

This algorithm still follows the idea of the first one, but it's a bit more efficient in its implementation because it decreases some of the repeated work.

**Observation and algorithm (3):**

Because of some of the changes we just made to the algorithm, we don't need to delete the vertex `u` from the graph anymore. We just need to delete it from the incoming adjacency lists it is in. We can imagine using those lists that we created at the start of the algorithm as working space while the outgoing lists don't have to change at all.

Also, that first round of changes introduced a bit of clutter. We don't need to have one ordered list of vertices that are ready to go and another for our topological order, especially since both of them are in the same order. We can drop the extra list.

The observations above are really in service of cleaning things up a bit. To summarize:

- Remove vertices from incoming adjacency lists, not from the graph as a whole
- No need to keep two different ordered sets, with the same order

```a title="Algorithm 3"
Topsort(G)
  create incoming edge adjacency list for each vertex (time linear in the graph size)
  S = ordered list
  add all vertices with no incoming edges to S (order V time)
  while not done with S
    consider next vertex u from S
    for each outgoing edge u -> v
      remove u from v's incoming list
      if v's incoming list is empty
        add v to S
```

**Observation and algorithm (4, final algorithm):** 

Can we do better? How do we really use those incoming lists? The only thing we use each incoming list for is to see if it's empty. We're just keeping these perfect lists, deleting exactly the right edge from each, in order to see if it's empty. We never use the list contents, only its size. So how about we just track the size? Instead of incoming adjacency lists, track in-degrees and decrement them instead of deleting edges. If the in-degree goes to `0`, then add them to the list. That's the whole algorithm.

In summary: We don't care what the incoming edges are, only the in-degree.

```a title="Algorithm 4"
Topsort(G)
  find inDegree for each vertex
  S = ordered list
  add all vertices with no incoming edges to S
  while not done with S
    consider next vertex u from S
    for each outgoing edge u -> v
      decrement v's inDegree
      if v's inDegree is 0
        add v to S
```

**Comments:** Finding all in-degrees takes linear time in the size of the graph. Over the course of the entire algorithm, each vertex is added to the ordered list at most once, either at the start (if it has no incoming edges) or when its in-degree gets decremented to `0`. Each vertex in the list is considered at most once, and each edge from the vertex causes at most one constant-time decrement. So the algorithm takes time linear in the graph size.

Something to note when developing this algorithm: What if you had made those last changes to deal with in-degrees instead of incoming lists but kept the separate topological order alongside the ordered list?

```
Topsort(G)
  find inDegree for each vertex
  S = ordered list
  add all vertices with no incoming edges to S
  while not done with S
    consider next vertex u from S
    #highlight-next-line
    put u next in the topological ordering # add this back
    for each outgoing edge u -> v
      decrement v's inDegree
      if v's inDegree is 0
        add v to S
```

The algorithm still runs in linear time. What if you replaced your ordered list with a queue or even a stack? It still works. And still in linear time. This version, where `S` is a stack, uses the order that things were removed from the stack, but what if we used the order where things went into the stack? It still works and in linear time.

**What about cycles?**

What if the directed graph we run Kahn's algorithm on has a cycle? Then we won't find a topological ordering, which doesn't exist for a graph with cycles. But what happens if we run Kahn's algorithm anyway? The algorithm won't ever decrement the in-degree of any vertex in a cycle to `0`, and vertices reachable from cycles won't ever get to in-degree `0` either.

The list returned by the algorithm will only include vertices that aren't in or reachable from any cycle. We can just check the size of the returned list to see if we have the whole graph or not. If not, then it depends on *why* we were trying to find a topological ordering in the first place before we can figure out what we should do next. 