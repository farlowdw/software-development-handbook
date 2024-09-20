import BibRef from '@site/src/components/BibRef';

The following observations are largely derived from [this video](https://www.youtube.com/watch?v=qH-mHxkoK0Q&list=PLSVu1-lON6LxCmXNMfZBq7bdMAvUf3Sc7&index=4). The underlying graph referred to for the rest of this note is assumed to be represented as an adjacency list of index arrays.

If you're looking at a graph from above, then breadth first search is pretty intuitive. It expands from your search vertex like a wave in a pond. But lots of times you're not looking at a graph from above &#8212; you're looking at it from within (e.g., you're exploring a maze, an area in a video game, etc.).

The simple implementation for DFS is somewhat similar to BFS:

```a title="Simple implementation of DFS"
ResetGraph(G)
  for v in V
    v.discovered = False
  
DFSVertex(u)
  u.discovered = True
  for each v such that u -> v
    if (not v.discovered)
      DFSVertex(v)

DFS(G, startVertex)
  ResetGraph(G)
  DFSVertex(startVertex)
```

We start from a single vertex and then go to adjacent vertices. If the next vertex has several adjacent vertices, it doesn't matter &#8212; we just choose one of them *and keep exploring*, ignoring other vertices we could have explored along the way. We do this by making recursive calls to DFSVertex for each new vertex.

Like in BFS, if you think about which vertex discovers another, that implies a "depth first search tree", and we can similarly store parent values in a $\pi$ variable:

```a title="Simple implementation of DFS (with parent values)"
ResetGraph(G)
  for v in V
    #highlight-next-line
    v.pi = nil
    v.discovered = False
  
DFSVertex(u)
  u.discovered = True
  for each v such that u -> v
    if (not v.discovered)
      #highlight-next-line
      v.pi = u
      DFSVertex(v)

DFS(G, startVertex)
  ResetGraph(G)
  DFSVertex(startVertex)
```

Similar to BFS, in DFS we can reconstruct paths from the root of the tree &#8212; but the paths are less interesting here because they might have more than the minimum number of links. So instead of counting links, we track when each vertex was *discovered* (i.e., reached) and *finished* (i.e., fully explored) with time stamps. Of course, we don't need actual time stamps &#8212; just a relative order will do:

```a title="Full implementation of DFS (with parent values and time stamps)"
ResetGraph(G)
  for v in V
    v.pi = nil
    #highlight-start
    v.discovered = -1
    v.finished = -1
  time = 1
    #highlight-end
  
DFSVertex(u)
  #highlight-next-line
  u.discovered = time++
  for each v such that u -> v
    #highlight-next-line
    if (v.discovered < 0)
      v.pi = u
      DFSVertex(v)
  u.finished = time++

DFS(G, startVertex)
  ResetGraph(G)
  DFSVertex(startVertex)
```

<details>
<summary> CLRS pseudocode for DFS</summary>

It's probably worth reproducing the pseudocode from <BibRef id='TC2022' pages='p. 565'></BibRef> to serve as a comparison point. The use of colors is similar to what was used for BFS:

- White: Undiscovered
- Gray: Discovered but not yet finished (i.e., it is actively being explored)
- Black: Finished (i.e., it is done being explored)

With the above in mind, here is the DFS algorithm as it appears in CLRS:

```a title="CLRS implementation of DFS"
DFS(G)
  for each vertex u in G.V
    u.color = White
    u.pi = nil
  time = 0
  for each vertex u in G.V
    if u.color == White
      DFSVisit(G, u)

DFSVisit(G, u)
  time = time + 1                 # white vertex has just been discovered
  u.d = time
  u.color = Gray
  for each vertex v in G.Adj[u]   # explore each edge (u, v)
    if v.color == White
      v.pi = u
      DFSVisit(G, v)
  time = time + 1
  u.f = time
  u.color = Black                 # blacken u; it is finished
```

</details>

Why would we want to track time stamps when executing a DFS? It turns out that DFS time stamps will be useful for other tasks like topological sorting. Additionally, for some algorithms, you want to run DFS from one vertex while for others you want to run it on the whole graph. 

To do that, after initializing the graph once (i.e.,m with `ResetGraph`), run DFS on each previously undiscovered vertex; then, instead of getting a DFS tree rooted at one vertex (i.e., `startVertex`) that only includes vertices reachable from that vertex, we get a forest that will always contain all the graph's vertices.

In terms of our earlier pseudocode for the full implementation, this means changing the block

```a
DFS(G, startVertex)
  ResetGraph(G)
  DFSVertex(startVertex)
```

to the following:

```a
DFS(G)
  ResetGraph(G)
  for u in V
    if (u.discovered < 0)
      DFSVertex(u)
```

We then get the following as our updated full implementation:

```a title="Full implementation of DFS for entire graph"
ResetGraph(G)
  for v in V
    v.pi = nil
    #highlight-start
    v.discovered = -1
    v.finished = -1
  time = 1
    #highlight-end
  
DFSVertex(u)
  #highlight-next-line
  u.discovered = time++
  for each v such that u -> v
    #highlight-next-line
    if (v.discovered < 0)
      v.pi = u
      DFSVertex(v)
  u.finished = time++

DFS(G)
  ResetGraph(G)
  for u in V
    if (u.discovered < 0)
      DFSVertex(u)
```

It's a useful exercise to consider an example graph and work out how everything above is represented and calculated.

<details>
<summary> Worked example</summary>

Let's consider an example of the algorithm above in action on the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f28.png').default} />
</div>

We'll execute top-level searches on vertices in alphabetical order. Doing so yields the following completely searched graph, as illustrated in the linked video at the top of this note:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f29.png').default} />
</div>

As can be seen above, `A`, `E`, and `I` are the roots of their own depth first search trees in this depth first search forest. 

To reproduce the final figure above using code, we can first represent the graph by mapping vertices `A` through `I` to `0` through `8`, inclusive. It also helps to define a lookup table for ease of reference:

```python
graph = [
    [3],
    [0, 6],
    [1, 3, 6],
    [1, 5, 6],
    [7],
    [2],
    [],
    [3, 4, 5],
    [4],
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
}
```

Now we can write the `dfs` function to execute a DFS on the entire graph &#8212; the inner `visit` function is where the `DFSVertex` method is implemented (a reformatting of the output is included at the bottom of the code):

```python
def dfs(graph):
    n = len(graph)
    discovered = [-1] * n
    finished = [-1] * n
    pred = [-1] * n
    time = 0
    
    def visit(node):
        nonlocal time
        time += 1
        discovered[node] = time
        for nbr in graph[node]:
            if discovered[nbr] < 0:
                pred[nbr] = node
                visit(nbr)
        time += 1
        finished[node] = time
        
    for node in range(n):
        if discovered[node] < 0:
            visit(node)
            
    return discovered, finished, [ lookup[parent] for parent in pred ]

print(dfs(graph))

""" 

(     A  B  C   D   E   F  G   H   I
    [ 1, 3, 8,  2, 13,  7, 4, 14, 17],  # discovered times
    [12, 6, 9, 11, 16, 10, 5, 15, 18],  # finished times
    [  , D, F,  A,   ,  D, B,  E,   ]   # pi values
)

"""        
```

</details>

The next two aspects of DFS we will consider, namely parenthesis notation and edge classification are remarked on in greater detail in <BibRef id='TC2022' pages='p. 567; p. 569, resp.'></BibRef>. The relevant snippets from CLRS are reproduced below (it would likely be helpful to look at these snippets before looking at these topics in the context of the example we've been working through).

<details>
<summary> Parenthesis theorem (CLRS)</summary>

Depth-first search yields valuable information about the structure of a graph. Perhaps the most basic property of depth-first search is that the predecessor subgraph $G_\pi$ does indeed form a forest of trees, since the structure of the depth-first trees exactly mirrors the structure of recursive calls of `DFS-VISIT`. That is, $u = v.\pi$ if and only if $\text{DFS-Visit}(G, v)$ was called during a search of $u$'s adjacency list. Additionally, vertex $v$ is a descendant of vertex $u$ in the depth-first forest if and only if $v$ is discovered during the time in which $u$ is gray.

Another important property of depth-first search is that discovery and finish times have *parenthesis structure*. If the `DFS-VISIT` procedure were to print a left parenthesis "$(u$" when it discovers vertex $u$ and to print a right parenthesis "$u)$" when it finishes $u$, then the printed expression would be well formed in the sense that the parentheses are properly nested. 

The following theorem provides another way to characterize the parenthesis structure.

In any depth-first search of a (directed or undirected) graph $G = (V, E)$, for any two vertices $u$ and $v$, exactly one of the following three conditions holds:

- the intervals $[u.d, u.f]$ and $[v.d, v.f]$ are entirely disjoint, and neither $u$ nor $v$ is a descendant of the other in the depth-first forest,
- the interval $[u.d, u.f]$ is contained entirely within the interval $[v.d, v.f]$, and $u$ is a descendant of $v$ in a depth-first tree, or
- the interval $[v.d, v.f]$ is contained entirely within the interval $[u.d, u.f]$, and $v$ is a descendant of $u$ in a depth-first tree.

</details>

<details>
<summary> Edge classification (CLRS)</summary>

You can obtain important information about a graph by classifying its edges during a depth-first search. For example, Section 20.4 will show that a directed graph is acyclic if and only if a depth-first search yields no "back" edges (Lemma 20.11).

The depth-first forest $G_\pi$ produced by a depth-first search on graph $G$ can contain four types of edges

1. **Tree edges** are edges in the depth-first forest $G_\pi$. Edge $(u, v)$ is a tree edge if $v$ was first discovered by exploring edge $(u, v)$.
2. **Back edges** are those edges $(u, v)$ connecting a vertex $u$ to an ancestor $v$ in a depth-first tree. We consider self-loops, which may occur in directed graphs, to be back edges.
3. **Forward edges** are those nontree edges $(u, v)$ connecting a vertex $u$ to a proper descendant $v$ in a depth-first tree.
4. **Cross edges** are all other edges. They can go between vertices in the same depth-first tree, as long as one vertex is not an ancestor of the other, or they can go between vertices in different depth-first trees.

The DFS algorithm has enough information to classify some edges as it encounters them. The key idea is that when an edge $(u, v)$ is first explored, the color of vertex $v$ says something about the edge:

1. WHITE indicates a tree edge,
2. GRAY indicates a back edge, and
3. BLACK indicates a forward or cross edge.

The first case is immediate from the specification of the algorithm. For the second case, observe that the gray vertices always form a linear chain of descendants corresponding to the stack of active `DFS-VISIT` invocations. The number of gray vertices is 1 more than the depth in the depth-first forest of the vertex most recently discovered. Depth-first search always explores from the deepest gray vertex, so that an edge that reaches another gray vertex has reached an ancestor. The third case handles the remaining possibility.

</details>

The entire depth first search from the worked example above can be summarized nicely using parentheses:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f30.png').default} />
</div>

An opening parentheses stands for when the depth first search call is made on a vertex, and the closed parentheses stands for when that call exits:

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('@site/static/img/templates/graphs/f31.png').default} />
</div>

The parentheses are properly nested because the inner recursive calls must complete before the code that called them. A child will always be nested in its parent, and a vertex is only the child of at most one vertex, the one that discovered it. 

If we just count the parentheses from the beginning, they will match the discovery and finish times:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f32.png').default} />
</div>

Recall the fully explored graph for reference and comparison:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f29.png').default} />
</div>

In CLRS they do two more things. First, they color vertices in the following manner:

- White: Undiscovered
- Gray: Discovered (but unifinished)
- Black: Finished

Second, they classify edges:

- Tree edges (parent to a child): go to an undiscovered vertex
- Back edges (to an ancestor): to a discovered but unfinished vertex (creates a cycle). During DFS, every back edge completes a cycle. Removing back edges from a graph would remove all cycles.
- Forward edges (to a non-child descendant): to a finished vertex discovered after the current vertex. A forward edge is basically an edge that goes to an *indirect* descendant, not a direct child. For the graph we've been considering, the edge from `D` to `G` is a forward edge. How can we tell? Because `G` is finished but its discovery time is *after* that of the current node, `D`. The vertex `G` was discovered and explored during the lifetime of `G` &#8212; it's a descendant of `D` but not a *direct* descendant. Node `B` is the direct descendant of `D`; node `G` is the direct descendant of `B`; and node `G` is an *indirect* descendant of `D`. 
- Cross edges (everything else): to a vertex finished before the current vertex's discovery. It's essentially any edge that's not captured in the edge classifications above. It can go from one branch of a tree to another or even from one tree to another. And there isn't any ancestor or descendant relation between the vertices it links. You can tell because it leads to a vertex that finished before the current vertex was discovered. Its parentheses don't overlap.

If we color our example graph so that tree edges are red, back edges are black, forward edges are blue, and cross edges are green, then we end up with the following:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f33.png').default} />
</div>

For undirected graphs, we end up seeing each edge twice, once from each vertex. If we classify the edge the first time we see it, then there won't be any forward or cross edges, only tree and back edges. 

Unlike breadth first search, if a graph is more connected, then its depth first search trees tend to be taller and more vine-like. If vertices have lots of outgoing edges, then you can keep finding new vertices to explore, and the tree depth can get large. This brings us to a possible implementation hiccup for DFS &#8212; for each recursive call, we push variables onto our program's call stack. Different languages have different limits to how deep the call stack can be. A graph with 20,000 vertices might try to make 20,000 nested recursive DFS calls, which can give you a program stack overflow error. To avoid this, we can use our own stack instead of the implicit call stack with recursion.

We can do this in a few ways, but here is one possible manner:

```a title="Non-recursive DFS" showLineNumbers
ResetGraph(G)
  for v in V
    v.pi = nil
    v.discovered = -1
    v.finished = -1
  time = 1
    
ExploreVertex(u, S)
  if (u.discovered < 0)
    u.discovered = time++
    S.push(u)
    for each v such that u -> v
      S.push(u -> v)
  else if (u.finished < 0)
    u.finished = time++
  # else: ignore, top level search of finished vertex

ExploreEdge(u -> v, S)
  if (v.discovered < 0)
    (u -> v).label = "treeEdge"
    v.pi = u
    ExploreVertex(v, S)
  else if (v.finished < 0)
    (u -> v).label = "backEdge
  else if (v.discovered > u.discovered)
    (u -> v).label = "forwardEdge"
  else
    (u -> v).label = "crossEdge"

DFS(G)
  ResetGraph(G)
  S = new Stack()
  for u in V
    S.push(u)
  while (not S.isEmpty())
    x = S.pop()
    if (x.isVertex())
      ExploreVertex(x, S)
    else
      ExploreEdge(x, S)
```

Let's go through how the pseudocode above is meant to function:

- Line `32`: Here, we make a stack where we can push edges *and* vertices.
- Lines `33`-`36`: Push all vertices on to the stack and pop while the stack isn't empty.
- Lines `9-13`: If we pop an undiscovered vertex, then discover it! Push it again to finish it later, and push its outgoing edges. When we pop it again later, after it's discovered (line `14`), then finish it (line `15`). And if we pop an already finished vertex, then just ignore it (line `16`). That's the equivalent of looping through all vertices but only running depth first search on the undiscovered ones.
- Lines `19`-`28`: When we pop an edge from the stack, if it leads to an undiscovered vertex, then it's a tree edge and label it as so (line `20`) and explore that vertex (line `22`); otherwise, just label the edge and we're done with it (lines `23`-`28`).

In the two lines where we push either all vertices (line `34`) or all edges from a vertex (line `13`), if we push them in the opposite order that you would normally loop through them in the recursive version of the algorithm, then the version above will give us the same results, same times, edge classifications, etc. It will all be the same as the recursive version. The code above doesn't look quite as clean, but it's a nice parallel to see that while breadth first search explicitly uses a first in first out queue of vertices, depth first search can explicitly use a stack of vertices and edges instead of just implicitly using the program call stack.

If we implement all of the pseudocode above for the iterative version, then we will end up with something like the following (the blocks of code have been highlighted where ordering has intentionally been reversed to ensure the same results as the recursive version):

```python
def dfs_iter(graph):
    n = len(graph)
    edge_classifications = dict()
    discovered = [-1] * n
    finished = [-1] * n
    pred = [-1] * n
    time = 0
    
    def explore_vertex(node):
        nonlocal time
        if discovered[node] < 0:
            time += 1
            discovered[node] = time
            stack.append(node)
            #highlight-start
            for i in range(len(graph[node]) - 1, -1, -1):
                nbr = graph[node][i]
                stack.append((node, nbr))
            #highlight-end
        elif finished[node] < 0:
            time += 1
            finished[node] = time
    
    def explore_edge(edge):
        node, nbr = edge
        if discovered[nbr] < 0:
            edge_classifications[edge] = 'treeEdge'
            pred[nbr] = node
            explore_vertex(nbr)
        elif finished[nbr] < 0:
            edge_classifications[edge] = 'backEdge'
        elif discovered[nbr] > discovered[node]:
            edge_classifications[edge] = 'forwardEdge'
        else:
            edge_classifications[edge] = 'crossEdge'
            
    stack = []
    #highlight-start
    for node in range(n - 1, -1, -1):
        stack.append(node)
    #highlight-end
    
    while stack:
        x = stack.pop()
        if not isinstance(x, tuple):
            explore_vertex(x)
        else:
            explore_edge(x)
        
    return discovered, finished, pred, { (lookup[edge[0]], lookup[edge[1]]): edge_classifications[edge] for edge in edge_classifications }
```

The outcome, formatted manually for the sake of clarity, matches *exactly* what was produced previously using the recursive approach (the edge classification also matches what we would expect):

```python
""" 

(     A  B  C   D   E   F  G   H   I
    [ 1, 3, 8,  2, 13,  7, 4, 14, 17],  # discovered
    [12, 6, 9, 11, 16, 10, 5, 15, 18],  # finished
    [-1, 3, 5,  0, -1,  3, 1,  4, -1],  # predecessors
    {                                   # edge classifications
        ('A', 'D'): 'treeEdge',
        ('D', 'B'): 'treeEdge',
        ('B', 'A'): 'backEdge',
        ('B', 'G'): 'treeEdge',
        ('D', 'F'): 'treeEdge',
        ('F', 'C'): 'treeEdge',
        ('C', 'B'): 'crossEdge',
        ('C', 'D'): 'backEdge',
        ('C', 'G'): 'crossEdge',
        ('D', 'G'): 'forwardEdge',
        ('E', 'H'): 'treeEdge',
        ('H', 'D'): 'crossEdge',
        ('H', 'E'): 'backEdge',
        ('H', 'F'): 'crossEdge',
        ('I', 'E'): 'crossEdge'
    }
)

"""
```

Why is the order reversal in the iterative version important in order to ensure the same results as in the recursive version? Because stacks are LIFO data structures &#8212; if we push elements onto the stack in the same order as we would process them recursively, then they will be popped off in reverse order. Consider the worked example we've been dealing with throughout this entire note. If we pushed the vertices `A` through `I` onto the stack in that order, then the first vertex popped off would be `F`, not `A`. But that's not the desired result! Hence, we push vertices `I`, `H`, ... , `B`, `A` onto the stack in that order so they are popped in the order `A`, `B`, ... , `H`, `I`, much as the order they are processed in the recursive version. Similarly, the order in which neighboring vertices are processed needs to be reversed as well; that is, we need to push neighbors onto the stack in reverse order &#8212; this ensures that when they are popped off the stack, they are processed in the original order.

Consider a generalized example to fully clarify things:

- **Adjacency list:** Let's say `u` has neighbors `[v1, v2, v3]`.
- **Recursive DFS:** Processes `v1`, then `v2`, then `v3`.
- **Iterative DFS (without reversal):**
  + Push `v1`, `v2`, `v3` onto the stack.
  + Pop and process `v3`, `v2`, `v1` (reverse order).
- **Iterative DFS (with reversal):**
  + Push `v3`, `v2`, `v1` onto the stack.
  + Pop and process `v1`, `v2`, `v3` (original order).

  
