---
title: Learning depth-first search (DFS)
draft: false
description: This post explores how to effectively implement depth-first search (DFS).
tags: 
  - Depth-first search (DFS)
  - Data structures and algorithms
  - Tutorial
  - Template
keywords: 
  - leetcode
  - dfs
  - depth-first search
authors: 
  - farlow
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';
import TOCInline from '@theme/TOCInline';

import CodeGrid from '@site/src/components/CodeGrid';
import CodeGridCell from '@site/src/components/CodeGridCell';
import CodeEditor from '@site/src/components/CodeEditor';
import snippet1 from '!!raw-loader!./snippet-1.py';
import snippet2 from '!!raw-loader!./snippet-2.py';

import ImageCarousel from '@site/src/components/ImageCarousel';
export const bfsLevelImages = [
  {
    label: '0 links away from start node',
    path: '/img/blog-images/learning-bfs/f7.png',
  },
  {
    label: '1 link away from start node',
    path: '/img/blog-images/learning-bfs/f8.png',
  },
  {
    label: '2 links away from start node',
    path: '/img/blog-images/learning-bfs/f9.png',
  },
  {
    label: '3 links away from start node',
    path: '/img/blog-images/learning-bfs/f10.png',
  }
]

Depth-first search (BFS) on general graphs is conceptually simple and easy to implement, but it's worth understanding fully because several more advanced graph algorithms may be considered to be just minor modifications or extensions of DFS.

<!--truncate-->

## Helpful video in written form

:::info Attribution

The following observations are largely derived from [this video](https://www.youtube.com/watch?v=qH-mHxkoK0Q&list=PLSVu1-lON6LxCmXNMfZBq7bdMAvUf3Sc7&index=4). The underlying graph referred to for the rest of this section is assumed to be represented as an adjacency list of index arrays. At some points it may be helpful to refer to the corresponding [blog post](/blog/2024/09/25/2024/learning-breadth-first-search-bfs) on BFS.

:::

### Basic idea

If you're looking at a graph from above, then *breadth* first search (BFS) is pretty intuitive. It expands from your search vertex like a wave in a pond:

<div align='center' className='centeredImageDiv' >
  <ImageCarousel images={bfsLevelImages} variableHeight={false} customWidth={500} customHeight='auto' />
</div>

But lots of times you're not looking at a graph from above &#8212; you're looking at it from within (e.g., you're exploring a maze, an area in a video game, etc.).

Or we could be watching [the video on YouTube](https://www.youtube.com/watch?v=qH-mHxkoK0Q&list=PLSVu1-lON6LxCmXNMfZBq7bdMAvUf3Sc7&index=4) on which this section is based. We could model the video page as a vertex. If there are a bunch of video recommendations listed off to one side, then those links are like edges to other vertices. If we see three recommendations that look interesting, then maybe we click on one. From this second video, maybe we see four more recommended videos that look good. Do we click one of them? Or do we stop, remember that they're there, but then go back to the second video we were just at? Maybe we just keep clicking through our recommended videos until there aren't anymore to click through (unlikely!).

The process described above is like depth first search (DFS). If we go back and watch videos in the order in which we first saw a link to them, then that is like breadth first search. In this context, BFS would be harder to do unless we used something like tabs or a "watch later" list which would essentially work as the first-in-first-out queue in BFS.

For DFS, we just keep clicking on stuff, and when we run out of new stuff we want to see, then we hit the "Back" button on our browser to get back to the previous video. 

### Simple implementation

If we start thinking about what a simple implementation for DFS might look like, we can come up with something that is somewhat similar to the simple implementation for BFS:

```a showLineNumbers
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

To illustrate how the pseudocode above would work for a sample graph, consider the following partial traversal where the DFS starts at node `I` and then travels along the path `I -> E -> H -> D -> B -> A`:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f7.png').default} />
</div>

Worth noting is that if we start at node `I`, then we have no choice but to go to node `E` next. We then have to go to node `H`. But once we're at `H`, we can either go to node `D` or to node `F`. The order does not matter because we will end up visiting both `D` and `F`. We arbitrarily choose `D` (oftentimes we'll just choose to visit neighboring nodes in alphabetical order for the sake of clarity). The important point: We start from a single vertex and then go to adjacent vertices. If the next vertex has several adjacent vertices (e.g., like `D` and `F` for node `H` discussed above), it doesn't matter &#8212; we just choose one of them *and keep exploring*, ignoring other vertices we could have explored along the way. We do this by making recursive calls to `DFSVertex` for each new vertex.

```
DFSVertex(I)
  DFSVertex(E)
    DFSVertex(H)
      DFSVertex(D)
        DFSVertex(B)
          DFSVertex(A)
```

Once we call `DFSVertex(A)` above, we see that the only outgoing edge from vertex `A` is to vertex `D`. But we've already visited or "discovered" vertex `D`, and we don't want to visit it again. Hence, we exit `A`'s `DFSVertex` call, returning to `B` (i.e., we *backtrack* to vertex `B` from `A`). When we first called `DFSVertex(B)`, we were looping through `B`'s outgoing edges to see which vertices to visit next when it made the call to search `A`, but now that `A` is done being searched, `B`'s loop resumes and it requires us to explore its edge to `G`. Vertex `G` has no outgoing edges so it finishes. Then `B` finishes. Then control goes back to `D`. Now that `D`'s call to `B` is finished, `D`'s loop resumes, and it searches `F`. And so on.

In BFS, `D` and `F` would both be children of `H`. Like in BFS, if we think about what vertex discovers another, then this implies the existence of some sort of "DFS tree" rooted at the initial search vertex. In the example graph we've been considering, this would mean we have a DFS tree rooted at vertex `I` (tree edges are highlighted with thicker directed red edges):

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f8.png').default} />
</div>

We can update our simple implementation pseudocode to store parent values in a $\pi$ variable (to further explore properties of the DFS tree):

```a showLineNumbers
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

### Full implementation

Similar to BFS, in DFS we can reconstruct paths from the root of the tree &#8212; but the paths are less interesting here because they might have more than the minimum number of links. So instead of counting links, we track when each vertex was *discovered* (i.e., reached) and *finished* (i.e., fully explored) with timestamps. Of course, we don't need actual time stamps &#8212; just a relative order will do:

```a showLineNumbers
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

At this point, it may be worth reproducing the pseudocode from <BibRef id='TC2022' pages='p. 565'></BibRef> to serve as a comparison point in terms of how nodes are tracked and managed. Specifically, CLRS uses not only timestamps but also colors as well (similar to what was used for BFS):

- White: Undiscovered
- Gray: Discovered but not yet finished (i.e., it is actively being explored)
- Black: Finished (i.e., it is done being explored)

With the above in mind, here is the DFS algorithm as it appears in CLRS:

```a title="CLRS implementation of DFS" showLineNumbers
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

Why would we want to track timestamps when executing a DFS? It turns out that DFS timestamps will be useful for other tasks and algorithms (e.g., topological sorting, finding SCCs, etc.). 

### Vertex vs. graph DFS

For some algorithms, we want to run DFS from *one* vertex (e.g., maybe we're interested in knowing what other vertices can be reached from this vertex) while for others we want to run it on the whole graph (i.e., we want to search *all* vertices).

To do this, after initializing the graph once (i.e., with `ResetGraph`), we can run DFS on each previously undiscovered vertex; then, instead of getting a DFS tree rooted at one vertex (i.e., `startVertex`) that only includes vertices reachable from that vertex, we get a *DFS forest* that will always contain all the graph's vertices.

In terms of our earlier pseudocode for the full implementation, this means making the following change:


<CodeGrid>
<CodeGridCell>

```a title="DFS on a single vertex"
DFS(G, startVertex)
  ResetGraph(G)
  DFSVertex(startVertex)
```

</CodeGridCell>
<CodeGridCell>

```a title="DFS on all vertices (the entire graph)"
DFS(G)
  ResetGraph(G)
  for u in V
    if (u.discovered < 0)
      DFSVertex(u)
```

</CodeGridCell>
</CodeGrid>

We then get the following as our updated full implementation:

```a
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

### Example

It's a useful exercise to consider an example graph and work out how everything above is represented and calculated. To that end let's consider an example of the algorithm above in action on the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f1.png').default} />
</div>

We'll execute top-level DFS searches on vertices in alphabetical order. Doing so yields the following completely searched graph:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f2.png').default} />
</div>

As can be seen above, `A`, `E`, and `I` are the roots of their own depth first search trees in this DFS forest. 

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

Now we can write the `dfs` function to execute a DFS on the entire graph &#8212; the inner `visit` function is where the `DFSVertex` method is implemented (a reformatting of the output is included at the bottom of the code for ease of reference):

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

Note that the roots of the trees in the DFS forest (i.e., `A`, `E`, and `I`) do not have $\pi$-values, as expected. Try the code above yourself to confirm what's been described (feel free to tweak the code and experiment):

<CodeEditor initialCode={snippet1} foldedRegions={[[2,11], [15,25]]} />

The next two aspects of DFS we will consider, namely parenthesis notation and edge classification, are remarked on in greater detail in <BibRef id='TC2022' pages='p. 567; p. 569, resp.'></BibRef>. The relevant snippets from CLRS are reproduced below (it would likely be helpful to look at these snippets before looking at these topics in the context of the example we've been working through).

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

### Parenthesis notation

The entire depth first search from the worked example above can be summarized nicely using parentheses:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f3.png').default} />
</div>

An opening parenthesis denotes when the DFS call is made on a vertex, and the closed parenthesis stands for when that call exits:

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('./f4.png').default} />
</div>

The parentheses are properly nested because the inner recursive calls must complete before the code that called them. A child will always be nested in its parent, and a vertex is only the child of at most one vertex, the one that discovered it. 

If we just count the parentheses from the beginning, then they will match the discovery and finish times noted previously:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f5.png').default} />
</div>

### Cormen vertex colors

Recall the fully explored graph for reference and comparison:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f2.png').default} />
</div>

In CLRS they do two more things than what we've been doing thus far. First, they color vertices in the following manner:

- White: Undiscovered
- Gray: Discovered (but unifinished)
- Black: Finished

### Edge classifications

The second thing CLRS does is classify edges into tree-edges (i.e., edges directly part of a DFS tree) and three types of non-tree edges (i.e., edges that exist in the graph but are not part of the DFS tree). For the edge classification descriptions that follow, it will help if we first provide some notational shorthand to make our ideas and descriptions precise:

- Vertex labels: Let `u` and `v` be the endpoints of the edge `u -> v` under consideration. We will then flesh out what it means for the edge `u -> v` to be a tree edge, back edge, forward edge, or cross edge.
- Discovery and finishing times: Let `u.d`, `u.f`, `v.d`, and `v.f` denote the discovery and finishing times of vertices `u` and `v`, respectively. Let `-1` denote missing values; that is, if vertex `x` has not yet been discovered, then `x.d = -1`. Similarly, if vertex `x` has not been finished, then `x.f = -1`.

We can now discuss the various edge classifications effectively. With the list that follows, it helps to think about approaching the classifications in an order manner; that is, we progressively ask ourselves if `u -> v` is a tree edge (`v.d == -1`), a back edge (`v.f == -1`), a forward edge (`v.d > u.d`), or a cross edge (`v.f < u.d`, but anything here flies since none of the previous conditionals hold):

- *Tree edges* (parent to a child): go to an undiscovered vertex

  > **Mathematically:** `v.d == -1`. If we reach an undiscovered vertex `v` from vertex `u`, then `u -> v` is a tree edge; that is, `u` discovers `v` as a direct child (`u` is an ancestor and `v` is a direct descendant &#8212; it's a parent/child relationship).

- *Back edges* (to an ancestor): to a discovered but unfinished vertex (creates a cycle)

  In a nutshell, the edge `u -> v` is a back edge if vertex `u` goes *back* to some previously discovered yet unfinished vertex `v`. 
  
  More thoroughly, a back edge `u -> x` is an edge from vertex `u` to its ancestor `x` (e.g., its parent, or grandparent, or further up). From the ancestor `x` there's a path of *tree edges* from `x` leading to vertex `u`. Adding the back edge `u -> x` to those tree edges makes a cycle. Without looking at the graph picture as a whole, how could we tell *locally* while we look at the edge `u -> x` that `x` is an ancestor of `u`? In the context of *our graph*, how can we tell that vertex `A` is an ancestor of vertex `B`? Because `A` has already been discovered, but it isn't finished yet. `A`'s parentheses are still open, and `A` can't finish until after the current vertex `B` does. So `A`'s parentheses must surround those of `B`'s, and thus it's `B`'s ancestor. So `B -> A` is a back edge. During a DFS, every back edge completes a cycle. Removing all back edges from a graph would remove all cycles.

  It's also worth noting that a self-edge (i.e., an edge from a vertex to itself) is considered to be a back edge to be consistent with our terminology: it completes a cycle (of length 1), and it goes to a vertex that's been discovered but not yet finished at the time we explore the self-edge.

  > **Mathematically:** `v.f == -1`. If `v.d != -1`, then we know `v` has already been discovered and thus `u -> v` cannot be a tree edge. If we somehow got to vertex `u` from vertex `v` by following a path of tree edges from vertex `v` to vertex `u`, then it's clear that vertex `v` has not yet been finished. The edge `u -> v` closes the loop (creates a cycle).
  
- *Forward edges* (to a non-child descendant): to a finished vertex discovered after the current vertex

  A forward edge is basically an edge that goes to an *indirect* descendant, not a direct child. For the graph we've been considering, the edge from `D` to `G` is a forward edge. How can we tell? Because `G` is finished but its discovery time is *after* that of the current node, `D`. The vertex `G` was discovered and explored during the lifetime of `G` &#8212; it's a descendant of `D` but not a *direct* descendant. Node `B` is the direct descendant of `D`; node `G` is the direct descendant of `B`; and node `G` is an *indirect* descendant of `D`. A forward edge goes to an indirect descendant, not a direct child (otherwise it would be a tree edge).

  > **Mathematically:** `v.d > u.d`. If the edge is neither a tree edge nor a back edge, but we somehow still got directly from `u` to `v` via the edge `u -> v`, then it's clear the discovery time of `v` must be after the discovery time of `u`. So vertex `v` is, indeed, a descendant of `u` but only in an indirect way &#8212; if `v` were a direct descendant of `u` in the DFS tree, then `u -> v` would be a tree edge and would have been accounted for in the previous conditional checks.

- *Cross edges* (everything else): to a vertex finished before the current vertex's discovery. It's essentially any edge that's not captured in the edge classifications above. It can go from one branch of a tree to another or even from one tree to another. And there isn't any ancestor or descendant relation between the vertices it links. You can tell because it leads to a vertex that finished before the current vertex was discovered. Its parentheses don't overlap.

  > **Mathematically:** `v.f < u.d`. But anything goes here. The "cross edge" label is more like a bucket &#8212; it holds all edges that cannot be classified as tree, back, or forward edges. There's no need to test discovery or finish times here (all previous tests for the other edges failed).

If we color our example graph so that tree edges are red, back edges are black, forward edges are blue, and cross edges are green, then we end up with the following:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f6.png').default} />
</div>

Everything above is really meant to be understood in the context of *directed* graphs. What about undirected graphs? If the graph is undirected, then we end up seeing each edge twice, once from each vertex. If we classify the edge the first time we see it, then there won't be any forward or cross edges, only tree and back edges.

### Analysis

Analysis of DFS is not too bad. If we run DFS on the entire graph, then we loop through all vertices but only call DFS once on each vertex in total. We explore every edge once (or twice in undirected graphs), and it takes time linear in the graph size: $\Theta(|V| + |E|)$. If we run DFS on just a single vertex, then it takes time linear in all vertices to initialize but then time linear in just the reachable portion of the graph: $\Theta(|V'| + |E'|)$, where $V'$ and $E'$ are the reachable vertices and edges from the source node, respectively.

### Concern for potential stack overflow

Unlike BFS, if a graph is more connected, then its DFS trees tend to be taller and more vine-like. If vertices have lots of outgoing edges, then you can keep finding new vertices to explore, and the tree depth can get large. This brings us to a possible implementation hiccup for DFS &#8212; for each recursive call, we push variables onto our program's call stack. Different languages have different limits to how deep the call stack can be. A graph with 20,000 vertices might try to make 20,000 nested recursive DFS calls, which can give you a program stack overflow error. To avoid this, we can use our own stack instead of the implicit call stack with recursion.

### Iterative DFS with a stack

We can do this in a few ways, but here is one possible manner (note: in general, [we need to be cautious](/blog/2024/09/23/2024/dfs-iterative-stack-based) when implementing iterative DFS with a stack because we may end up with a "fake" DFS tree if we're not careful):

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

- Line `32`: Here, we make a stack where we can push edges *and* vertices (we push edges in order to classify them).
- Lines `33`-`36`: Push all vertices on to the stack and pop while the stack isn't empty.
- Lines `9-13`: If we pop an undiscovered vertex, then discover it! Push it again to finish it later, and push its outgoing edges. When we pop it again later, after it's discovered (line `14`), then finish it (line `15`). And if we pop an already finished vertex, then just ignore it (line `16`). That's the equivalent of looping through all vertices but only running depth first search on the undiscovered ones.
- Lines `19`-`28`: When we pop an edge from the stack, if it leads to an undiscovered vertex, then it's a tree edge and label it as so (line `20`) and explore that vertex (line `22`); otherwise, just label the edge (using the conditions discussed previously in the section on edge classifications) and we're done with it (lines `23`-`28`).

In the two lines where we push either all vertices (line `34`) or all edges from a vertex (line `13`), if we push them in the opposite order that you would normally loop through them in the recursive version of the algorithm, then the version above will give us the same results, timestamps, edge classifications, etc. It will all be the same as the recursive version. The code above doesn't look quite as clean, but it's a nice parallel to see that while breadth first search explicitly uses a first in first out queue of vertices, depth first search can explicitly use a stack of vertices and edges instead of just implicitly using the program call stack.

If we implement all of the pseudocode above for the iterative version in Python, then we will end up with something like the following (the blocks of code have been highlighted where ordering has intentionally been reversed to ensure the same results as the recursive version):

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

Try it for yourself to verify and/or experiment:

<CodeEditor initialCode={snippet2} foldedRegions={[[2,11], [15,25], [29,53]]} />

Why is the order reversal in the iterative version important in order to ensure the same results as in the recursive version? Because stacks are LIFO data structures &#8212; if we push elements onto the stack in the same order as we would process them recursively, then they will be popped off in reverse order. Consider the worked example we've been dealing with throughout this entire post. If we pushed the vertices `A` through `I` onto the stack in that order, then the first vertex popped off would be `F`, not `A`. But that's not the desired result! Hence, we push vertices `I`, `H`, ... , `B`, `A` onto the stack in that order so they are popped in the order `A`, `B`, ... , `H`, `I`, much as the order they are processed in the recursive version. Similarly, the order in which neighboring vertices are processed needs to be reversed as well; that is, we need to push neighbors onto the stack in reverse order &#8212; this ensures that when they are popped off the stack, they are processed in the original order.

Consider a generalized example to fully clarify things:

- **Adjacency list:** Let's say `u` has neighbors `[v1, v2, v3]`.
- **Recursive DFS:** Processes `v1`, then `v2`, then `v3`.
- **Iterative DFS (without reversal):**
  + Push `v1`, `v2`, `v3` onto the stack.
  + Pop and process `v3`, `v2`, `v1` (reverse order).
- **Iterative DFS (with reversal):**
  + Push `v3`, `v2`, `v1` onto the stack.
  + Pop and process `v1`, `v2`, `v3` (original order).
