The motivation for Kosaraju's algorithm for finding strongly connected components (SCCs), as described below, is largely inspired by [this video](https://www.youtube.com/watch?v=HOOmetF56BI&list=PLSVu1-lON6LyvT8iceopuqnmSmPiSA6wX&index=4). My goal here is mostly to provide more explanations and working code. If you watch the video linked above without any context, then it will likely be somewhat hard to follow because it *builds* off of progress from a few previous videos, namely the following:

- [Depth first search (DFS)](https://www.youtube.com/watch?v=qH-mHxkoK0Q&list=PLSVu1-lON6LxCmXNMfZBq7bdMAvUf3Sc7&index=4): Covers much of the terminology and notation used below (e.g., edge classifications such as tree edges, back edges, forward edges, and cross edges, as well as discovered and finished times for different vertcies, the `d` and `f` values seen in vertices used throughout the example graph in this note, and more)
- [Kahn's algorithm for topological sorting](https://www.youtube.com/watch?v=agHGA0pVMe8&list=PLSVu1-lON6LyvT8iceopuqnmSmPiSA6wX&index=2)
- [DFS-based algorithm for finding a topological order of a directed acyclic graph](https://www.youtube.com/watch?v=xqLY-ZLJig8&list=PLSVu1-lON6LyvT8iceopuqnmSmPiSA6wX&index=3)

Watching the videos linked above and/or reading the notes for these very topics on this page will go a long way in making the rest of this note make sense.

---

Kosaraju's algorithm is all about finding *strongly* connected components, but this does us little good if we do not even know what a *component* is. In an undirected graph, components are the different *connected* pieces of the graph. If there's any path from one vertex to another, then these vertices are in the same component:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f46.png').default} />
</div>

If the entire graph is connected, then it has just one component. One easy way to partition the graph into its separate components is to run depth first search on the entire graph, and each time that a top-level call finds a previously undiscovered vertex, then that vertex's depth first search will discover its entire component.

Below, `A` discovers `D` and `F` directly and then discovers `K` indirectly, and that is the first component found. Top-level searches for `B` and `C` discover their components, but `D` is already discovered so its top-level search will just exit right away so that we can move on to `E` (i.e., in the context of executing DFS on an entire graph, we execute top-level searches on each vertex, `A` through `J`, in alphabetical order for ease of reference):

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f47.png').default} />
</div>

When DFS finishes, we have some tree and back edges (colored red and black above, respectively), and each of the trees in the depth first search forest makes one component:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f48.png').default} />
</div>

However, if a graph is *directed*, then how do we actually define what a "component" is? 

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f49.png').default} />
</div>

Above, if `A` has a path to `G` but `G` has no path back to `A`, then are `A` and `G` in the same component? We say that two vertices are *strongly connected* if each has a path to the other (i.e., they lie on some cycle with each other). Vertices in a directed graph are partitioned into strongly connected components &#8212; each component is a subset of vertices that can all reach each other. Each vertex will be in exactly one component along with the vertices that it can reach and that can reach it:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f50.png').default} />
</div>

Notice above that `A` and `D` are in the same component and so are `A` and `F`. Because of this, `D` and `F` have to be in the same component. They can each reach each other through their paths to and from `A`. If a vertex isn't in any cycle, then even if it has edges in and out of it, it's all alone in its own component (e.g., vertex `I` in our example graph). Our goal is to find strongly connected components from a graph, ideally with an *efficient* algorithm.

If we don't care about efficiency, then we can come up with an algorithm with relative ease: grab a vertex like `A`, see what it can reach, maybe with DFS:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f51.png').default} />
</div>

Then, if we *reverse the graph* (i.e., swap the direction of all edges to create the *transpose* of the graph) and search the same vertex `A` again, then we can see what can reach it in the original graph:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f52.png').default} />
</div>

By superimposing one result on to the other, we can see the intersection of those two sets, the vertices that `A` can reach and that can reach `A`:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f53.png').default} />
</div>

This will conclusively tell us what strongly connected component `A` belongs to:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f54.png').default} />
</div>

We could do the same search for every vertex in the graph, but we only need to do it once per component. For example, once we know `D` is in `A`'s component, we don't need to repeat that work on `D`. To summarize, the following would be an inefficient but doable algorithm:

1. Search from a vertex to see what it can reach.
2. Search from the same vertex in the reverse graph to see what can reach it.
3. Intersect those two sets to find its strongly connected component.
4. Repeat with other vertices.

How long this algorithm takes depends on how we implement it, but it would be pretty easy to find one component in time proportional to the size of the graph. Hence, if there are $X$ strongly connected components, then we would be looking at $O(|V| + |E|)$ time per component, which would give us a total time complexity of $O(X(|V| + |E|))$.

If we want better efficiency, then let's stop to really think about the strongly connected components. Let's collapse vertices from each component into one "super-vertex" and draw edges between super vertices if there are any edges between their corresponding sets of vertices:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f55.png').default} />
</div>

The graph above, the underlying component graph, must be acyclic. Why? Because if it had a cycle, then all vertices from the cycle's corresponding vertices in the original graph could all reach each other through some combination of intra and inter-component edges &#8212; all such connected vertices could be collapsed into one component. If the *original* graph is acyclic, then the underlying component graph looks just like the original graph &#8212; every vertex would be its own component.

Both topological order algorithms on this page (i.e., Kahn's algorithm and a DFS-based algorithm) each found topological orders either from the beginning (Kahn) or the end (DFS) of the ordering. Those seemed like easier places to start. Our hope is that it might be easier to find strongly connected components if we do it by topological order for the underlying component graph:

<div align='center' className='centeredImageDiv'>
  <img width='550px' src={require('@site/static/img/templates/graphs/f56.png').default} />
</div>

We started this note by finding components in an *undirected* graph with DFS. In that context, with an undirected graph, we didn't need to intersect the set of vertices from the first search with the vertices from the second search. Let's now consider the following *directed* graph:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f57.png').default} />
</div>

Imagine if we could (magically) start a search on a vertex in the topologically last component, maybe `C` in the graph above. We would discover `C`'s strongly connected component in time linear to the number of vertices and edges *in that component*. We wouldn't need to reverse the graph and do another search and find the intersection. We would just discover the component and be done with it *because `C`'s component is topologically last*, which means the search can't escape it (i.e., its *strongly connected component* has no outgoing edges, as illustrated in the underlying component graph). So it would be really nice to search it first and mark it as done.

If we topologically order the underlying component graph, then `A`'s component would be second to last, just before `C`'s component. After we've marked `C`'s component, it would be great if we could next search a vertex from `A`'s component &#8212; the search would discover all of its component, but it wouldn't rediscover `C`'s component, which was already discovered when we searched `C`. 

**Clever Observation (1)** 

Of course, because we don't know what the components are ahead of time, we don't know how to easily grab a vertex from the topologically last component to search it. Can we figure out some way to topologically sort the underlying component graph even if we don't know the components? For the two common topological ordering algorithms, Kahn's and DFS, each behaves differently if we run it on a graph with cycles. For any vertex on a cycle or even reachable from a cycle, Kahn's algorithm will never get that vertex's in-degree down to `0` so it will never make it into the ordering. We'll end up with an order that only includes the *other* vertices (i.e., vertices whose in-degree could eventually be made `0`).

In the directed graph above, Kahn's algorithm would return just vertex `B`. That's obviously not too helpful here. On the other hand, the DFS-based topological ordering runs DFS and orders the vertices in the reverse order that they finish. That algorithm will order all the vertices in the graph regardless of cycles; of course, the resultant ordering will not be a topological ordering (because none exists in a graph with cycles), but *the ordering is related to the topological ordering of the underlying component graph*.

Let's run a DFS on the graph and record the discovery and finish times along with the predecessors and edge classifications (the note on the motivation behind recursive DFS outlines how to do this iteratively) by first representing the graph as an adjacency list of index arrays in code:

```python
graph = [
    [3, 5],
    [8],
    [9],
    [0],
    [0, 7],
    [6, 10],
    [2],
    [4, 8],
    [10],
    [6],
    [0, 9],
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
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
}
```

Running the aforementioned algorithm yields the following (formatted manually for ease of reference):

```python
""" 

(   A   B  C  D   E   F   G   H   I  J   K
  [ 1, 15, 6, 2, 19,  4,  5, 20, 16, 7, 11],  # discovered
  [14, 18, 9, 3, 22, 13, 10, 21, 17, 8, 12],  # finished
  [-1, -1, 6, 0, -1,  0,  5,  4,  1, 2,  5],  # predecessors
  {                                           # edge classifications
    ('A', 'D'): 'treeEdge',
    ('D', 'A'): 'backEdge',
    ('A', 'F'): 'treeEdge',
    ('F', 'G'): 'treeEdge',
    ('G', 'C'): 'treeEdge',
    ('C', 'J'): 'treeEdge',
    ('J', 'G'): 'backEdge',
    ('F', 'K'): 'treeEdge',
    ('K', 'A'): 'backEdge',
    ('K', 'J'): 'crossEdge',
    ('B', 'I'): 'treeEdge',
    ('I', 'K'): 'crossEdge',
    ('E', 'A'): 'crossEdge',
    ('E', 'H'): 'treeEdge',
    ('H', 'E'): 'backEdge',
    ('H', 'I'): 'crossEdge'
  }
)

"""
```

This confirms the DFS run on the graph in the video:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f58.png').default} />
</div>

That's where the story would end if we just wanted to run a DFS on the whole graph (i.e., finding discovered and finished times for each vertex as well as their predecessors and edge classifications). But in this case, we also want to consider the discovery and finish times for the underlying component super-vertices. The algorithm itself doesn't have any idea what the components are, but we can just cheat and look at them for now.

Importantly, we can define *component* discovery and finish times as follows:

- *discovered:* the first time one of its vertices is discovered
- *finished:* the last time one of its vertices is finished

Note that within each component *those two times come from the same vertex*:

<div align='center' className='centeredImageDiv'>
  <img width='650px' src={require('@site/static/img/templates/graphs/f59.png').default} />
</div>

It has to be like that. The first vertex discovered in any component cannot finish being explored until *everything* it can reach, including all vertices within its component, is finished. Vertices that are discovered later in the component will finish earlier. In the graph above, `D` is able to finish before other vertices in the same component have been discovered because it only reaches the rest of the component through vertex `A`. This brings us to the next clever observation.

**Clever Observation (2)**

For the same reason that DFS topological sort works, DFS will finish underlying components in reverse topological order. Recall the following details about edge classification in terms of the graph we've been analyzing:

<div align='center' className='centeredImageDiv'>
  <img width='7.0px' src={require('@site/static/img/templates/graphs/f60.png').default} />
</div>

For DFS, tree, forward, and cross edges all have to finish their target vertex before their source vertex. How about back edges? They complete cycles so they all go between two vertices from the same component. Edges between *different* components have to be something other than a back edge (otherwise the two components could be collapsed into one) &#8212; this means that the target vertex and everything it can reach, including that target vertex's entire component, must be finished *before* the source vertex from the other component is finished. Hence, the source vertex's topologically earlier component has to finish *after* the target's topologically later component.

<details open>
<summary> Clarification</summary>

The previous statement is easiest to understand by means of an example from the graph above. Consider the components represented by super vertices `ADFK` and `CGJ`. Now consider the tree edge from `F` to `G` or the cross edge from `K` to `J` that connect these two *different* components. As expected, neither of these edges are back edges. The edge `(F, G)` has `F` as its source vertex and `G` as its target vertex; similarly, the edge `(K, J)` has `K` as its source vertex and `J` as its target vertex. As noted above, the target vertex and everything it can reach, including the target vertex's entire component, must be finished *before* the source vertex from the other component is finished:

- `(F, G)`: The source vertex `F` has finish time `13` while the target vertex `G` and all the vertices in its component have finish times before the source vertex: `G`, `C`, `J` have finish times `10`, `9`, `8`, respectively, all indicating they are finished *before* the source vertex `F`.
- `(K, J)`: The source vertex `K` has finish time `12` while the target vertex `J` and all the vertices in its component have finish times before the source vertex: `J`, `G`, `C` have finish times `8`, `10`, `9`, respectively, all indicating they are finished *before* the source vertex `K`.

Before remarking on the key takeaway, it's a good time to recall that DFS returns a *reverse topological ordering*. We can't have a topological ordering for the original graph (because it contains cycles), but, as previously mentioned, *the underlying component graph is a DAG* which means *it* must have a topological ordering. In the second figure above, if we ordered components left to right by ascending finish times of their first discovered vertex, then we would have `CGJ -> ADFK -> I -> B -> EH`:

```a
   CGJ    # G has finish time 10
-> ADFK   # A has finish time 14
-> I      # I has finish time 17
-> B      # B has finish time 18
-> EH     # E has finish time 22
```

But that is the *reverse topological ordering*. The proper topological ordering is

```
EH -> B -> I -> ADFK -> CGJ
```

The key takeaway is the following:

> The source vertex's topologically earlier component has to finish *after* the target's topologically later component.

This should now be clearer in light of the example edges we've been considering:

> The source vertex's topologically earlier component [`ADFK` in the case of the source vertices `F` and `K` for the edges `(F, G)` and `(K, J)`] has to finish *after* the target's topologically later component [`CGJ` in the case of the target vertices `G` and `J` for the edges `(F, G)` and `(K, J)`]

Hence, a component that *finishes* later actually comes *earlier* in the final non-reversed topological ordering.

</details>

But we still don't know what the components are! Nonetheless, running DFS still tells us something about their topological order anyway (i.e., topological order of the *components*, not the vertices of the original graph itself). Our goal was to learn enough about the underlying component graph's topological order to grab a vertex from the topologically last component, namely `C`'s component in the example graph we've been considering. But from the finish times we've obtained, it still seems hard to do this effectively. In our graph, for example, vertex `D` finishes first, but its component is in the middle somewhere. The topologically last component finishes first at time `10` for vertex `G`, but that's hidden from us because we don't know the components ahead of time, and `G` isn't the first vertex to finish &#8212; vertex `D` is. Without knowing the components, the finish times don't actually help us in identifying a vertex from the topologically last component, which finishes first.

**Clever Observation (3)**

However, it's easy for us to promise that `E`'s component finishes last because `E` itself finishes last. Hence, `E`'s component can go topologically *first*. 

Let's save vertices in the order of their reverse finish times like DFS topological sort does:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('@site/static/img/templates/graphs/f61.png').default} />
</div>

It would be nice to find and delete that entire first component and continue on similar to what we did while developing Kahn's algorithm (see note concerning motivation for Kahn's algorithm). But how do we delete it if we don't know where it starts and ends? Unlike taking a vertex in the topologically last component, if we search a vertex in the topologically first component, then we might search other components too. In the directed graph previously pictured, `E` would discover everything except `B`. This brings us to our last clever observation.

**Clever Observation (4)**

Let $G$, pictured left below, denote the original graph. Now let's *reverse* $G$ to obtain $G^R$, pictured right below (i.e., we reverse the direction of all edges):

<div align='center' className='centeredImageDiv'>
  <img height="300" style={{marginRight: '20px'}} src={require('@site/static/img/templates/graphs/f57.png').default} />
  <img height="300" style={{marginRight: '20px'}} src={require('@site/static/img/templates/graphs/f62.png').default} />
</div>

The strongly connected components stay the same. Any two vertices that were on a cycle in $G$ are still on a cycle in $G^R$ &#8212; the cycle just goes the other way. But the edges in the underlying component graph now go in the opposite direction. The topologically first component that couldn't be reached by any other component (i.e., `EH`) now can't reach any other component. It is topologically last. So we can grab vertex `E`, which we know is in the topologically last component in the reversed graph, search it, and bang! We discover its entire strongly connected component:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f63.png').default} />
</div>

It has no other outgoing edges to other components. Conveniently, the vertex order we saved from our DFS on $G$, the original graph, now lists vertices from the topologically latest components of the reversed graph first. We use that order to search for components in $G^R$, the reversed graph, and we don't need to delete them from the graph to continue. DFS will mark all vertices in `E`'s component as explored, and then we can just continue top-level searches from the other vertices using the next latest finish time from our saved vertex order.

Continuing our search, we go to `H` next, but `H` is already discovered so DFS will ignore it, which is good, because we already know its component! The next vertex we run into that we haven't already discovered is `B` (i.e., going by the vertex order produced by the first DFS of $G$). Its component has the second latest finish time so it can be topologically second to last, just before `E`'s component, in the reversed underlying component graph (or second in the original underlying component graph). 

Vertex `B` doesn't have any outgoing edges in the reverse graph, but the next vertex `I` does. It has edges to both `E` and `B`'s components, but we already know what those components are. We can't rediscover them. We finish the second DFS on $G^R$, the reversed graph, taking vertices in the reverse order that they finished the initial DFS on $G$, the original graph. Every time we come across a new top-level vertex that hasn't been previously discovered, it will discover its strongly connected component:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f64.png').default} />
</div>

This last part of the algorithm looks just like discovering components in an undirected graph using DFS except we need to do our top-level searches in the specific order given from the earlier DFS. When we finish, the top-level searches that found something, namely `E`, `B`, `I`, `A`, and `G`, have no parent nodes (each discovered its own component):

```python
""" 

(   A   B   C   D   E   F   G  H   I   J   K
  [ 9,  5, 19, 10,  1, 13, 17, 2,  7, 18, 12],  # discovered 
  [16,  6, 20, 11,  4, 14, 22, 3,  8, 21, 15],  # finished
  [-1, -1,  9,  0, -1, 10, -1, 4, -1,  6,  0],  # predecessors (-1 indicates no parent)
  {                                             # edge classifications
    ('E', 'H'): 'treeEdge', 
    ('H', 'E'): 'backEdge', 
    ('I', 'B'): 'crossEdge', 
    ('I', 'H'): 'crossEdge', 
    ('A', 'D'): 'treeEdge', 
    ('D', 'A'): 'backEdge', 
    ('A', 'E'): 'crossEdge', 
    ('A', 'K'): 'treeEdge', 
    ('K', 'F'): 'treeEdge', 
    ('F', 'A'): 'backEdge', 
    ('K', 'I'): 'crossEdge', 
    ('G', 'F'): 'crossEdge', 
    ('G', 'J'): 'treeEdge', 
    ('J', 'C'): 'treeEdge', 
    ('C', 'G'): 'backEdge', 
    ('J', 'K'): 'crossEdge
  }
)

"""
```

The DFS forest shows the components with each tree being one component. All edges from one component to another are cross edges:

```a
(A, E)  # connects ADFK to EH
(I, H)  # connects I to EH
(I, B)  # connects I to B
(G, F)  # connects CGJ to ADFK
(J, K)  # connects CGJ to ADFK
```

That isn't by chance. The only edge that can go between components in that final search is a cross edge because in the reversed graph each component is explored and finished before any other component has a chance to accidentally discover it by another edge. There can also be cross edges from within a component, but all edges between components will definitely be cross edges. Tree, back, and forward edges all have to go between two vertices in the same component (there simply don't happen to be any forward edges in the sample graph we've been analyzing).

Let's briefly recap the clever observations that have gotten us to this point:

- **Clever observation 1:** SCCs would be easier to find in reverse topological order for the underlying component graph.
- **Clever observation 2:** DFS completes the underlying components in reverse topological order.
- **Clever observation 3:** The component of the last vertex to finish can be topologically first.
- **Clever observation 4:** $G^R$ has the same underlying SCCs as $G$ (in topologically reversed order). The saved DFS order from $G$ touches $G^R$ components in a legal reverse topological order.

The clever observations above give us an efficient algorithm for identifying the SCCs of a graph:

1. Run DFS on $G$ and save the vertex order list by decreasing finish time (finds finish times of unknown components in topological order)
2. Find $G^R$, the reverse graph of $G$ ($G^R$ has the same components but reverses their topological ordering)
3. Run DFS on $G^R$, using the order from step 1 for the top-level calls (finds components in $G^R$ in reverse topological order)

Each successful top-level search discovers a component. Each phase is $\Theta(|V| + |E|)$ for $\Theta(|V| + |E|)$ total.

In some rough sense, the first DFS on $G$ gives us a topological order for the underlying component graph, and *that order* is the only thing we need from that first search. The second DFS on $G^R$ helps us discover and mark components in topological order. It looks similar to our original inefficient way to just find one strongly connected component, but now we don't have to take any set intersections.

Finally, if we use the template code for Kosaraju's algorithm on the graph we've been discussing, then we get the following:

```python
# E  H    B    I    A  D   K  F    G  J  C
[[4, 7], [1], [8], [0, 3, 10, 5], [6, 9, 2]]

# EH -> B -> I -> ADKF -> GJC (topological ordering of component graph)
```