---
title: >-
  Single source shortest paths (with attitude)
draft: false
description: >-
  This post explores single source shortest paths algorithms, specifically Bellman-Ford, Dijkstra, and finding the shortest path on a DAG.
tags: 
  - Graphs
  - Bellman-Ford
  - Dijkstra
  - DAG
  - Tutorial
  - Algorithms with Attitude
keywords: 
  - graphs
  - dag
  - dijkstra
  - bellman-ford
  - algorithms with attitude
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
import ImageCarousel from '@site/src/components/ImageCarousel';

<!-- import snippet1 from '!!raw-loader!./snippet-1.py';
import snippet2 from '!!raw-loader!./snippet-2.py'; -->

export const criticalEdgeOrderingIllustration = [
  {
    label: 'Initial state of graph',
    path: '/img/blog-images/sssp-awa/f5.png',
  },
  {
    label: 'Edge to be relaxed: start → B (1)',
    path: '/img/blog-images/sssp-awa/f6.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 1; π = NIL → start',
    path: '/img/blog-images/sssp-awa/f7.png',
  },
  {
    label: 'Edge to be relaxed: B → G (2)',
    path: '/img/blog-images/sssp-awa/f8.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 3; π = NIL → B',
    path: '/img/blog-images/sssp-awa/f9.png',
  },
  {
    label: 'Edge to be relaxed: B → A (3)',
    path: '/img/blog-images/sssp-awa/f10.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 2; π = NIL → B',
    path: '/img/blog-images/sssp-awa/f11.png',
  },
  {
    label: 'Edge to be relaxed: start → H (4)',
    path: '/img/blog-images/sssp-awa/f12.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 2; π = NIL → start',
    path: '/img/blog-images/sssp-awa/f13.png',
  },
  {
    label: 'Edge to be relaxed: H → A (5)',
    path: '/img/blog-images/sssp-awa/f14.png',
  },
  {
    label: 'Edge relaxed: d = 2 → 2; π = B → B (nothing changes)',
    path: '/img/blog-images/sssp-awa/f15.png',
  },
  {
    label: 'Edge to be relaxed: B → A (6)',
    path: '/img/blog-images/sssp-awa/f16.png',
  },
  {
    label: 'Edge relaxed (again): d = 2 → 2; π = B → B (nothing changes)',
    path: '/img/blog-images/sssp-awa/f17.png',
  },
  {
    label: 'Edge to be relaxed: H → E (7)',
    path: '/img/blog-images/sssp-awa/f18.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 4; π = NIL → H',
    path: '/img/blog-images/sssp-awa/f19.png',
  },
  {
    label: 'Edge to be relaxed: E → I (8)',
    path: '/img/blog-images/sssp-awa/f20.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 7; π = NIL → E',
    path: '/img/blog-images/sssp-awa/f21.png',
  },
  {
    label: 'Edge to be relaxed: I → D (9)',
    path: '/img/blog-images/sssp-awa/f22.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 14; π = NIL → I (not final shortest path)',
    path: '/img/blog-images/sssp-awa/f23.png',
  },
  {
    label: 'Edge to be relaxed: E → F (10)',
    path: '/img/blog-images/sssp-awa/f24.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 7; π = NIL → E',
    path: '/img/blog-images/sssp-awa/f25.png',
  },
  {
    label: 'Edge to be relaxed: F → C (11)',
    path: '/img/blog-images/sssp-awa/f26.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 9; π = NIL → F',
    path: '/img/blog-images/sssp-awa/f27.png',
  },
  {
    label: 'Edge to be relaxed: I → J (12)',
    path: '/img/blog-images/sssp-awa/f28.png',
  },
  {
    label: 'Edge relaxed: d = ∞ → 19; π = NIL → I',
    path: '/img/blog-images/sssp-awa/f29.png',
  },
  {
    label: 'Edge to be relaxed: H → D (13)',
    path: '/img/blog-images/sssp-awa/f30.png',
  },
  {
    label: 'Edge relaxed: d = 14 → 5; π = I → H (shortest path improved)',
    path: '/img/blog-images/sssp-awa/f31.png',
  },
]

This post explores single source shortest paths algorithms, specifically Bellman-Ford, Dijkstra, and finding the shortest path on a DAG.

<!--truncate-->

:::info Attribution

The notes below come from the [Algorithms with Attitude](https://www.youtube.com/@AlgorithmswithAttitude/playlists) YouTube channel, specifically the [Single Source Shortest Paths](https://www.youtube.com/playlist?list=PLSVu1-lON6LyvJV6EwIJrcZi4ONJmQCQ5) playlist comprised of the following videos: 
[Introduction to Single Source Shortest Paths](https://www.youtube.com/watch?v=sf_KeGarJkg&list=PLSVu1-lON6LyvJV6EwIJrcZi4ONJmQCQ5&index=1), 
[Bellman-Ford Single Source Shortest Paths Algorithm with Example](https://www.youtube.com/watch?v=7KGohCDej1s&list=PLSVu1-lON6LyvJV6EwIJrcZi4ONJmQCQ5&index=2), 
[Dijkstra's Single Source Shortest Paths Algorithm with Example](https://www.youtube.com/watch?v=HBIoHSAsbQY&list=PLSVu1-lON6LyvJV6EwIJrcZi4ONJmQCQ5&index=3), and 
[Directed Acyclic Graph (DAG) Single Source Shortest Paths with Example](https://www.youtube.com/watch?v=ePqBaDRHkdk&list=PLSVu1-lON6LyvJV6EwIJrcZi4ONJmQCQ5&index=4).

:::

There are several sections in this post, accessible in the table of contents on the right, but most of the sections have been listed below for ease of reference and navigation.

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Introduction to single source shortest paths {#introduction}

This post is all about finding the shortest paths in a weighted graph from one vertex to all other vertices. We'll look at three different algorithms: [Bellman-Ford](#bellman-ford), [Dijkstra](#dijkstra), and [another algorithm](#dag) specifically meant to find the shortest path on a directed acyclic graph (DAG). This introduction gives the outline for all of these algorithms.

### Shortest paths and shortest path trees

As noted above, throughout this post we'll be looking for shortest paths in *weighted* graphs. If we run [breadth-first search](/blog/2024/10/09/2024/graphs-basics#bfs) (BFS), it's like finding the shortest path from the start vertex to every other vertex in the special case where all edge weights are the same (e.g., `1`):

- $d$ will store the number of links to reach a vertex
- $\pi$ will store the predecessor vertex used on the path of length $d$

The lowest cost path in this situation will be the one with the fewest edges. 

When variable weights are allowed, however, this will not always be the case. For example, if some of the edges can be cheaper, then maybe in some cases it makes sense to use three edges to get to a vertex even if there may be a direct edge (e.g., going from the start vertex to vertex `F`):

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f1.png').default} />
</div>

We will still get a shortest path tree similar to a breadth-first search tree, but the distance $d$ maintained will mean something else now that are variable weights are allowed:

- $d$ will store *an upper bound distance estimate* to reach a vertex
- $\pi$ will store the predecessor vertex used on the path of length $d$

The reason we can get away with storing just one predecessor node per vertex is because we use the same path to get *to* each node as we do to get *through* each node. Hence, in the graph above, even though there are two different paths of cost `4` to get to vertex `E` (i.e., `start -> H -> E` and `start -> B -> G -> E`), we won't choose one of those paths to get *to* `E` and then the other path to go *through* `E` (to get to another vertex, say `F`). We use paths that form a *tree*.

The distance we store will always be an *upper bound estimate* on how far it is from the start vertex to each other vertex with a value of *at least* the actual shortest path distance. Then, as the algorithms progress, that upper bound estimate is going to get better and better, lower and lower, until it's the correct value. To make sure we start with valid upper bounds, just like in BFS, we'll initialize the distance associated with *every* vertex to infinity, except the start node, which we can get to with a path of weight `0`:

```a showLineNumbers
SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = NIL
    s.d = 0
```

When we're done, we reconstruct paths just like in BFS:

```a showLineNumbers
FindPath(s, v)
    if (s == v)
        return new List().add(v)
    if (v.pi == nil) # no path exists
        return nil
    return FindPath(s, v.pi).add(v)
```

### Observations

Let's get to some seemingly obvious observations. If we find a path of a given length to a vertex, then the shortest path is not longer than that path. For example, consider the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('./f2.png').default} />
</div>

If we find a path from `start` to `t` to `u` of wright `9`, then we can rest assured that the shortest path from `start` to `u` weighs no more than `9`. 

Next, if there's a path and we add an edge to the end of it, then it makes a new path to the vertex at the end of the new edge:

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('./f3.png').default} />
</div>

Above, we consider an edge of weight `2` from `u` to `v`. We've just discovered a new path. This new edge tells us that that the path from `start` to `v` cannot possibly weigh more than `11`.

Let's recap these two observations:

- If we find a path from $s$ to $u$ of total weight $x$, then the shortest path from $s$ to $u$ has weight no more than $x$.
- If there is a path from $s\rightsquigarrow u$ of total weight $x$, and an edge from $u\to v$ of weight $y$, then there is a path from $s\rightsquigarrow v$ of total weight $x + y$.

### Edge relaxation

When we use the observations above as *code* in our algorithms, it's called "relaxing the edge":

```a showLineNumbers
Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

It's called "relaxing the edge" from some constraint programming history. Think of it this way: because of the weight `9` path to `u` and the weight `2` path from `u` to `v`, the shortest path from `start` to `v` must have a path of weight at most `11`. What solution we come up with *has to satisfy that constraint*. As long as we guarantee that our estimates are all upper bounds *and* our estimate to `v` is under (or equal to) that limit: relax &#8212; the edge `u -> v` isn't screaming at us that our answer is wrong.

### General algorithm format

So our SSSP algorithms all kind of look the same:

```a
Generic Single Source Shortest Path Algorithm(G, s)
    SSSPInitialize(G, s)
    for each edge e in G (possibly repeating edges) in some order
        Relax(e)
```

They initialize the graph and then relax edges, finding shorter valid paths to each vertex until we find shortest paths to all the vertices. At all times, all vertices will keep an estimate, which is either infinite or the length of an actual path to that vertex. When we relax an edge, if it finds a shorter path to a vertex, then we decrease the estimate for that vertex and save the matching $\pi$-value (i.e., the vertex we used to reach the current vertex). We don't change values if the new path is longer or the same distance.

Because estimates are only lowered to path lengths that *exist*, they never get too low, below the actual cost of the lowest weight path to the vertex. At the end of the algorithm, relaxing any edge in the graph won't change any distance estimates. That will happen exactly when all of the distances are the correct shortest path lengths. No relaxation to a vertex will change the vertex's value if it has its actual shortest path distance. 

That will happen if the edge relaxations contain what we call a *critical edge ordering*. That's an ordering of edges that contains, in order, edges *from a shortest path* to each vertex in the graph from the start vertex.

Let's recap:

- At completion, no further edge relaxation would change any distance.
- The sequence of relaxations must contain a *critical edge ordering*: an ordering of edges that contains, in order, edges from a shortest path to each vertex in the graph from the start vertex:

$$
\begin{array}{l}
\forall\;\text{vertex}\; v\\
\quad\exists\;\text{shortest path}\;\texttt{start}\rightsquigarrow v\\
\quad\quad \text{start}\rightsquigarrow v\;\text{edges in order}
\end{array}
$$

### Critical edge ordering {#critical-edge-ordering}

In the graph below, the heavy blue edges really do make up a shortest path tree:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('./f1.png').default} />
</div>

Consider the following sequence of relaxations, which turns out to be a critical edge ordering for the graph above (blue represents ):

$$
\begin{align*}
\color{blue}{\texttt{start}}\;&\color{blue}{\rightarrow\texttt{B}} \tag{1}\\
\color{blue}{\texttt{B}}\;&\color{blue}{\rightarrow\texttt{G}} \tag{2}\\
\color{blue}{\texttt{B}}\;&\color{blue}{\rightarrow\texttt{A}} \tag{3}\\
\color{blue}{\texttt{start}}\;&\color{blue}{\rightarrow\texttt{H}} \tag{4}\\
\color{gray}{\texttt{H}}\;&\color{gray}{\rightarrow\texttt{A}} \tag{5}\\
\color{gray}{\texttt{B}}\;&\color{gray}{\rightarrow\texttt{A}} \tag{6}\\
\color{blue}{\texttt{H}}\;&\color{blue}{\rightarrow\texttt{E}} \tag{7}\\
\color{blue}{\texttt{E}}\;&\color{blue}{\rightarrow\texttt{I}} \tag{8}\\
\color{red}{\texttt{I}}\;&\color{red}{\rightarrow\texttt{D}} \tag{9}\\
\color{blue}{\texttt{E}}\;&\color{blue}{\rightarrow\texttt{F}} \tag{10}\\
\color{blue}{\texttt{F}}\;&\color{blue}{\rightarrow\texttt{C}} \tag{11}\\
\color{blue}{\texttt{I}}\;&\color{blue}{\rightarrow\texttt{J}} \tag{12}\\
\color{blue}{\texttt{H}}\;&\color{blue}{\rightarrow\texttt{D}} \tag{13}
\end{align*}
$$

Somewhere in the relaxations above, per the shortest path tree, we need to relax the edge `start -> H` and *then* the `H -> D` edge, in that order, to get the shortest path to `D`; above, we see that edge `start -> H` is relaxed at stage $(4)$, and `H -> D` is relaxed at stage $(13)$, which satisfies this requirement. 

We can have extra relaxations jammed in there. We can have edges relaxed more than once. But *somewhere* in the order of edges that we relax, edges on a shortest path to *each* vertex need to be relaxed.

For our sample graph, the following series of images show the relaxations above, $(1)$ through $(13)$. The first image shows how the graph is initialized, specifically each vertex with $d=\infty$ and $\pi = \texttt{NIL}$, except the start vertex that begins with $d=0$. There are two images for each edge relaxation: the first image shows which edge is to be relaxed, and the second image shows the *result* of that edge relaxation visually as well as including the following information in the header:

```
# suppose edge X -> Y is being relaxed
# the following information is included in the header:
Edge relaxed: d = <Y's d-value before edge relaxation> → <Y's d-value after edge relaxation>; π = <Y's predecessor before edge relaxion> → <Y's predecessor after edge relaxation>
```

It may be helpful to try to *anticipate* how the information contained within each vertex changes as the sequence of edge relaxations above is processed:

<div align='center' className='centeredImageDiv' >
  <ImageCarousel images={criticalEdgeOrderingIllustration} variableHeight={false} customWidth={475} customHeight='auto' />
</div>

Each of the algorithms' relaxations will contain a critical edge ordering from the shortest path tree that the algorithm ends up finding. As long as we manage to relax edges from the shortest path tree, where the shortest path is relaxed *in order*, *somewhere*, we'll end up with the right answers.

If we knew the shortest path tree before the algorithm started, then it would be *really* easy &#8212; we could relax the tree in any order like a breadth-first search or depth-first search order, ignoring all other edges. Without knowing the tree, maybe the algorithm relaxes other edges, like the `H -> A` edge, $R_{(5)}$ (let $R_{(x)}$ denote the $x$th relaxation in the edge relaxation sequence provided above, $R_{(1)}$ through $R_{(13)}$), which doesn't do anything here. Or maybe it relaxes some edge twice, like the `B -> A` edge, $R_{(6)}$, which doesn't happen to do anything the second time here. That extra stuff doesn't matter as long as *somewhere* in the sequence of relaxations is a critical edge ordering that the algorithm will hit. Sometimes, like if we relax the `I -> D` edge, $R_{(9)}$, then the shortest path estimate will *temporarily* give us some "not actual shortest path" value to `D`, but when we get around to relaxing the rest of the critical edge ordering, that will get fixed. So when we relax the `H -> D` edge, $R_{(13)}$, afterwards all vertices will have the proper shortest distances.

It's really important that those extra relaxations don't hurt us because the algorithms have to specify an order to relax edges without knowing the shortest path ahead of time. To show that each algorithm is correct, the only thing we need to do is show that the algorithm follows this basic form, and that somewhere in its entire sequence of relaxations, we can prove that it will always relax some critical edge ordering.

### Preview

Here's a preview of the algorithms to come:

- **Bellman-Ford:** Slow and steady. Works on any graph, any weights, and detects negative weight cycles.
- **Dijkstra:** Faster. No negative edge weights.
- **Directed acyclic graph (DAG):** Fastest. Negative edge weights okay.

### Critical edge ordering addendum {#addendum}

#### Terminology and concept clarification

Since "critical edge ordering" is foundational for the different SSSP algorithms we're going to consider, it's worth expounding on this a bit more to ensure the main takeaway message(s) are clear. Let's begin by clarifying some terminology:

- **Critical edge (definition):** A tree edge in the shortest path tree.
- **Critical edge ordering (property):** To find the shortest path to each vertex, the critical edges along the shortest path to that vertex must be relaxed *in order*. It doesn't matter how many other edges are relaxed, or in what order, as long as the critical edges are eventually relaxed in the correct sequence.
- **Subsequence (definition):** Per [Wikipedia](https://en.wikipedia.org/wiki/Subsequence), a *subsequence* of a given sequence is a sequence that can be derived from the given sequence by deleting some or no elements without changing the order of the remaining elements. For example, the sequence $\langle A, B, D \rangle$ is a subsequence of $\langle A, B, C, D, E, F \rangle$ obtained after the removal of elements $C$, $E$, and $F$.

Suppose the shortest path from $S$ to $T$ has $x$ edges: $e_1, ... , e_x$. Then the critical edge ordering property tells us that edges $e_1, \ldots , e_x$ must be relaxed, in that order, at some point in whatever sequence of edge relaxations we perform; that is, if we let $R$ denote the entire sequence of whatever edge relaxations we perform, then $e_1, \ldots, e_x$ must be a *subsequence* of $R$ in order to ensure the shortest path from $S$ to $T$ has been obtained:

$$
\underbrace{R =
\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{some edge}\\\text{relaxations}}}\quad\quad
\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{more edge}\\\text{relaxations}}}\quad\;
\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{even more edge}\\\text{relaxations}}}}_{\substack{\text{somewhere in this sequence of edge relaxations}\\[0.15em]\text{the subsequence}\; e_1,\, e_2,\, \ldots,\, e_{x-1},\, e_x\;\text{must exist}\\[0.15em]\text{in order to obtain the shortest path from ${\scriptstyle S}$ to ${\scriptstyle T}$}}}
$$

In general, the most efficient sequence of relaxations would be *directly in order* with no extraneous edge relaxations:

$$
e_1, e_2, \ldots, e_{x-1}, e_x
$$

But usually we're interested in more than just a single shortest path from a source vertex to a target vertex. The algorithms we consider in this post are *single-source shortest paths* (SSSPs) algorithms, which means the source is a single vertex, but we find the shortest path from that single vertex to *all* other vertices in the graph. Hence, whatever sequence of edge relaxations we perform may be *direct* for some vertices but will unlikely be direct for all vertices. 

The different algorithms we will consider all seek, in notably varied ways, to ensure a critical edge ordering subsequence is found, if possible, in whatever sequence of edge relaxations we perform. The *whatever sequence of edge relaxations we perform* part is where each algorithm gets its own flavor &#8212; the sequence of edge relaxations is strategic and not random for these different algorithms. The strategy employed by each algorithm makes each one well-suited under specific conditions (e.g., Bellman-Ford is good when edge weights are allowed to be negative, Dijkstra is great when edge weights are *not* allowed to be negative, etc.).

#### Simple example

Let's consider a *very* simple graph to illustrate some of the conceptual points highlighted above:

```
Vertices: 
A (start), B, C, D

Edges and weights:
A -> B (weight 1)
B -> C (weight 2)
A -> C (weight 5)
C -> D (weight 1)
B -> D (weight 4)
```

This graph is illustrated below (left), and its shortest path tree is also shown, where edges in the shortest path tree are highlighted in heavier blue as in the previous example (right):

<div align='center' className='centeredImageDiv'>
  <img height="400" style={{marginRight: '20px'}} src={require('./f6.png').default} />
  <img height="400" style={{marginRight: '20px'}} src={require('./f7.png').default} />
</div>

The *critical edges*, which we can see from the image above on the right, are `A -> B`, `B -> C`, and `C -> D` because they're all in the shortest path tree. Now let's consider what the critical edge ordering property tells us about the shortest path from `A`, the source, to all other vertices: `B`, `C`, `D`:

- `A` to `B`: All edges in the shortest path tree from `A` to `B` must be relaxed, in order, *at some point* in whatever sequence of edge relaxations we perform. This is quite simple in this case because there's a direct edge from `A` to `B`, and it happens to also be the shortest path from `A` to `B`. We only have to relax `A -> B` a single time in order to get the shortest path, but any number of other edge relaxations may happen before or after this one:

$$
\underbrace{\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}} \overbrace{A\to B}^{\text{must be relaxed once}} \underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}}}_{\text{required edge relaxation order for shortest path from ${\footnotesize A}$ to ${\footnotesize B}$}}
$$

- `A` to `C`: All edges in the shortest path tree from `A` to `C` must be relaxed, in order, *at some point* in whatever sequence of edge relaxations we perform. Specifically, edges `A -> B` and `B -> C` need to be relaxed *in that order* at some point in whatever sequence of edge relaxations we perform:

$$
\underbrace{\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}} \overbrace{A\to B}^{\substack{\text{must be relaxed}\\\text{at some point}\\\text{before {\footnotesize $A\to C$}}}} \underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}}\overbrace{B\to C}^{\substack{\text{must be relaxed}\\\text{at some point}\\\text{after {\footnotesize $A\to B$}}}}\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}}}_{\text{required edge relaxation order for shortest path from ${\footnotesize A}$ to ${\footnotesize C}$}}
$$

- `A` to `D`: All edges in the shortest path tree from `A` to `D` must be relaxed, in order, *at some point* in whatever sequence of edge relaxations we perform. Specifically, edges `A -> B`, `B -> C`, and `C -> D` need to be relaxed *in that order* at some point in whatever sequence of edge relaxations we perform:

$$
\underbrace{\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}} \overbrace{A\to B}^{\substack{\text{relaxed \emph{first} in sequence}\\ A\to B\to C\to D\\\text{at some point}}} \underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}}\overbrace{B\to C}^{\substack{\text{relaxed \emph{second} in sequence}\\ A\to B\to C\to D\\\text{at some point}}}\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}}\overbrace{C\to D}^{\substack{\text{relaxed \emph{third} in sequence}\\ A\to B\to C\to D\\\text{at some point}}}\underbrace{\cdot\cdot\cdot\cdot\cdot\cdot\cdot}_{\substack{\text{other edge}\\\text{relaxations}}}}_{\text{required edge relaxation order for shortest path from ${\footnotesize A}$ to ${\footnotesize D}$}}
$$

Let's now consider what can go wrong if the critical edges are *not* relaxed in order. The shortest path may not be correctly updated. For example, consider the following problematic sequence of edge relaxations for the graph above:

```python
'A -> B' # critical edge
'C -> D' # critical edge but out of order
'B -> C' # critical edge but should have been before C -> D
```

Note how each edge relaxation effects the information stored at the destination vertex. The first edge relaxation, `A -> B`, results in `B.d` being updated from infinity to `1`, and `B.pi` is updated from `NIL` to `A`. 

When the edge `C -> D` is relaxed, the `D.d` value is *not* updated from infinity since we have not discovered a way to actually get to `C` from `A` just yet (i.e., `C.d = inf`). `D.pi` is not updated either since our condition for updating `d` and `pi` values was not triggered:

```
Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

When we relax the edge `B -> C`, note that `B.d = 1` due to the previous relaxation of the edge, `A -> B`, and `C.d` is still equal to infinity; hence, we have 

```
B.d + weight(B -> C) = 1 + 2
                     = 3
                     < C.d (infinity)
```

This means we should set `C.d = 3` and `C.pi = B`. But note that `D.d` is still infinity. The critical edges `A -> B`, `B -> C`, and `C -> D` were all relaxed, but they are were *not* relaxed in order. This is why `D.d = infinity` instead of `D.d = 4`, which we can see to be the actual shortest path length from `A` to `D`.

Let's recap:

- Relaxing `C -> D` before `B -> C` is premature because `C`'s distance hasn't been updated via `B -> C`.
- `C.d` might still be at a higher value (or infinity), leading to an incorrect or suboptimal update of `D.d`.

What's the solution? We need to *re-relax* `C -> D` after `C.d` has been correctly updated. This ensures `D.d` reflects the shortest path distance.

In general, if critical edges are relaxed *out of order*, then our work isn't entirely doomed. As we just saw, we can still find the correct shortest paths by *re-relaxing* the critical edges as needed, until the proper critical edge ordering is found. This is why algorithms like [Bellman-Ford](#bellman-ford) perform *multiple* passes over the edges.

Let's summarize our most important observations before previewing the upcoming algorithms:

- **Order of critical edge updates:** The critical edges must be relaxed in the order they appear along the shortest paths.
- **Extraneous relaxations:** Relaxing non-critical edges or relaxing critical edges multiple times doesn't prevent finding the correct shortest paths.
- **Re-relaxation:** If critical edges are relaxed out of order, then re-relaxing them after their predecessors have been correctly updated will fix any suboptimal distance estimates.

Now let's preview the upcoming algorithms in light of our refined observations concerning critical edges:

- [Bellman-Ford](#bellman-ford)
  + Relaxes all edges multiple times (up to $|V| - 1$ times)
  + Ensures that even if critical edges are initially relaxed out of order, they will eventually be relaxed in the correct order, and distance estimates will converge to the shortest paths.
  + This algorithm is slow but effective. Since a (shortest path) tree of $n$ vertices can only have $n - 1$ edges, a graph of $|V|$ vertices means the longest path from one vertex to another has $|V| - 1$ edges in our shortest path tree. Hence, if we let the path from $S$ to $T$ have edges $e_1, \ldots, e_{|V| - 1}$, then each round of relaxations looks something like the following:
    * First relaxation of all edges: $e_1$ is relaxed (at least).
    * Second relaxation of all edges: $e_2$ is relaxed (at least).
    * ...
    * "$|V| - 1$"st relaxation of all edges (if necessary): $e_{|V|-1}$ is relaxed (at least).
  + Iterating over all edges multiple times is what allows Bellman-Ford's algorithm to handle out-of-order relaxations by re-relaxing edges until the correct distances are found.
  + An optimization step in Bellman-Ford is usually to terminate the edge relaxations if $v.d$ is not updated for any vertex $v$ on an iteration of relaxing all edges (the next round obviously wouldn't result in an update if the current round didn't).
  + For negative cycles, we usually run Bellman-Ford once more after possibly $|V|-1$ rounds of relaxing all edges &#8212; if $v.d$ changes for any vertex $v.d$, then this means a negative cycle exists (otherwise we would have found an actual shortest path already after relaxing all edges $|V| - 1$ times).
- [Dijkstra](#dijkstra)
  + Always selecting the vertex with the smallest tenative distance effectively relaxes the critical edges in order.
  + Usually doesn't need to re-relax edges because it processes vertices in the order of increasing distance from the start vertex (i.e., Dijkstra's algorithm naturally processes the critical edges in order due to its greedy approach).

## Bellman-Ford {#bellman-ford}

### What it accomplishes

Bellman-Ford can find the shortest distances and shortest path tree from any vertex to all other vertices in any directed or undirected weighted graph even though there are faster ways to go if the graph is undirected. So we will assume we have directed graphs here.

It works even if the graph has negative weight edges, and can also detect negative weight cycles, which are a bit of a problem for shortest weight paths.

In short:

- Finds the shortest paths from a start vertex to all other vertices
- Works in any graph
- Works for any edge weights
- Detects reachable negative weight cycles

### Negative weight cycles and shortest paths

Consider the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('./f8.png').default} />
</div>

In this graph, with `Start` as the start node, the negative weight edges don't cause any problems. We have well-defined shortest paths from `Start` to `A`, `B`, and `C`. 

Suppose we add a bit more to the graph:

<div align='center' className='centeredImageDiv'>
  <img width='275px' src={require('./f9.png').default} />
</div>

Now there's a negative weight cycle with three edges between `D`, `E`, and `F`, but it still doesn't cause any problems with the `Start` node because the negative weight cycle isn't even reachable from `Start`.

But let's add more:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f10.png').default} />
</div>

Now we start to run into problems. Above, we have a reachable negative weight cycle. What's the lowest cost path to get from `Start` to `H`? It isn't `6` because we could go from `Start` to `G` to `H` to `G` to `H` for cost `3`. Or we could go around the cycle again for cost `0`. Or again for `-3`. We can make the shortest path cost from `Start` to `H` as small as we want. Negative infinity!

Of course, what edge weights actually *mean* depends on what problem we are working on. Maybe the negative weight cycle identified above is good, maybe it's bad. But if there is a negative weight cycle, then we want some way to mark it. We mark nodes on any reachable negative cycle as having weight negative infinity. If there is an edge from that cycle to `C`, then node `C` is reachable through a negative weight cycle, which means its distance becomes negative infinity too. One last thing: if we use the path reconstruction algorithm for a negative infinity length shortest path, then it doesn't work:

```
FindPath(s, v)
    if (s == v)
        return new List().add(v)
    if (v.pi == nil) # no path exists
        return nil
    return FindPath(s, v.pi).add(v)
```

It will just take us backwards around the cycle, over and over. $G$ comes from $H$, which comes from $G$, which comes from $H$, etc. Don't try to reconstruct negative infinity weight paths.

Let's recap. If a negative weight cycle is reachable from the start vertex:

- All vertices on the cycle get distance $-\infty$.
- All vertices *reachable* from the cycle get distance $-\infty$.

### Generic algorithm

Now let's start the algorithm. At first, assume we don't have any negative weight cycles. We use the generic shortest path algorithm from the [introduction](#introduction), and the only thing we need to do is specify an order to relax edges:

```
GenericSSSP(G, s)
    SSSPInitialize(G, s)
    Relax edges in some order

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

### No negative cycle input

At this point, it's really important we understand the significance of [critical edge ordering](#critical-edge-ordering), specifically that section's [addendum](#addendum); otherwise, what we're about to do won't make any sense.

This algorithm really relaxes all of the edges in an arbitrary order, *but* it does that $|V| - 1$ times for $|V|$ vertices:

```
BellmanFord(G, s)
    SSSPInitialize(G, s)
    for(i = 1 to |V| - 1)
        for e(= u -> v) in E
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```


If there are no negative weight cycles, then the shortest path tree will have no more than $|V|$ vertices and $|V| - 1$ edges. 

If we relax *all* of the edges once, then we must have relaxed all of the edges on the top level of the shortest path tree, even if we don't know what the tree is:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f11.png').default} />
</div>

After that first level is finished, relaxing *all* of the edges a second time will relax edges from the first to the second level:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f12.png').default} />
</div>

We don't know what the shortest path tree is, but with $|V| - 1$ edges it can't possibly have more than $|V| - 1$ levels. So after $|V| - 1$ rounds of relaxing *all* edges, we are guaranteed to have hit every level. Extra relaxations happen, but as long as we have a critical edge ordering somewhere in the list, then we are fine.

### Negative cycle detection

Everything above is great ... if we know there are no negative weight cycles. What if negative weight cycles are a possibility? After finishing the first part of the algorithm (i.e., $|V|-1$ iterations of updating *all* edges), all vertices should have their final $d$-values and $\pi$-values. If there's a negative weight cycle, then some vertex on it would continue to change its values if we kept going. So run one more round through the edges. If anything changes, then we've found a reachable negative weight cycle:

```a showLineNumbers
BellmanFord(G, s)
    SSSPInitialize(G, s)
    for(i = 1 to |V| - 1)
        for e(= u -> v) in E
            Relax(e)
    for e(= u -> v) in E
        if(u.d + weight(u -> v) < v.d)
            return false
    return true

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

Maybe we just return `false` if there's a negative cycle or `true` if there isn't. 

### Negative cycle marking

If we want more, if we want to find all vertices with normal shortest paths, but then specially mark *all* vertices reachable through a negative cycle, then we wouldn't just return `false`. Instead, we'd use the detection round to change distance estimates to negative infinity, and then let the algorithm run more rounds to let those negative infinity values propagate throughout the graph:

```a showLineNumbers
BellmanFord(G, s)
    SSSPInitialize(G, s)
    for(i = 1 to |V| - 1)
        for e(= u -> v) in E
            Relax(e)
    for e(= u -> v) in E
        if(u.d + weight(u -> v) < v.d)
            v.d = -inf
            v.pi = u
    for(i = 2 to |V| - 1)
        for e(= u -> v) in E
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

The pseudocode above assumes that `Relax` will understand that negative infinity plus a finite number is negative infinity.

### Runtime analysis

Each of the versions above goes through all edges order $V$ times, and they each take order $|V|$ times $|E|$ time:

- Initialization: $\Theta(|V|)$
- Body: $2|V| - 2$ rounds through $|E|$ edges
- Total runtime: $\Theta(|V|\cdot |E|)$

### Optimization

Our code above, if left alone, has the potential to be kind of dumb depending on what kind of graph we get as an input. Imagine a graph with 1001 vertices where there's actually a shorest path tree that has only 10 levels of edges. After 10 rounds of relaxing *all* edges, we've found the best paths. Certainly, the 11th round of edge relaxations (maybe even earlier) won't change anything, nor will the 12th. But we keep going until we finish 1000 rounds? That's insane.

If we relax all of the edges for a round, and nothing changes, then we're done. We don't have to keep going. So we should check if that happens. We also add that shortcut to the negative cycle detection phase, which all gets skipped if the first part shortcuts:

```a showLineNumbers
BellmanFord(G, s)
    SSSPInitialize(G, s)
    changed = true
    i = 1
    while(changed and i <= |V| - 1)
        changed = false
        i++
        for e(= u -> v) in E
            changed = Relax(e) or changed
    if(changed)
        for e(= u -> v) in E
            if(u.d + weight(u -> v) < v.d)
                v.d = -inf
                v.pi = u
    
    i = 2
    while(changed and i <= |V| - 1)
        changed = false
        i++
        for e(= u -> v) in E
            changed = Relax(e) or changed

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
        return true
    return false
```

### Shortcut runtime

The algorithm runtime for the modified version above now depends on two things: if there are reachable negative cycles, we are in the worst case, and we'll go through all rounds of relaxation. If not, then the number of rounds of relaxations we needs depends on how many levels there are in the shortest path tree with the fewest levels. Once we go through that many rounds, we will have finished a critical edge ordering, and on the next round at the latest, we will hit the shortcut.

Here's the summary of the runtime analysis for $G = (V, E)$ for the version above (there's a reason we use $\Theta$ for negative weight cycles and $O$ for when no negative weight cycles are reachable, which will be explained soon with an example):

- Reachable negative weight cycles: $\Theta(|V|\cdot |E|)$.
- No reachable negative weight cycles: $O(|V| + x\cdot |E|)$, where $x$ is the number of levels in the shortest path tree of shortest height.
  + Worst case: $\Theta(|V| + x\cdot|E|)$
  + Expected case: $\Theta(|V|+x\cdot |E|)$ (edges in random order)
  + Best case: $\Theta(|V| + |E|)$

### Preprocessing

We'll now consider one more shortcut, which we may or may not want to make. Every now and again, we might get a graph where only a small part of the graph is reachable from the start vertex. In that case, each time we go through all of the edges to relax them, we're relaxing some edges that aren't even reachable. We could *preprocess* the graph with breadth-first search on the start node, use that to make a list of reachable vertices, and then only relax edges out of those vertices. That's probably not going to help very often in general graphs, but when it does, it can save us a lot of time, at the cost of the linear time preprocessing every time we run the algorithm. The analysis is similar to before, with time added for preprocessing.

Let's recap this additional optimization (it's not nearly as important as the previous optimization):

- Preprocess: BFS on start vertex to find the set of reachable vertices $V'$.
- Use $|V'| - 1$ rounds instead of $|V| - 1$.
- Only relax edges out of vertices in $V'$.
- Analysis for $G = (V, E)$ and $(V', E')$, reachable from starting vertex:
  + Reachable negative weight cycles: $\Theta(|V| + |V'|\cdot |E'|)$.
  + No reachable negative weight cycles: $O(|V| + x\cdot |E'|)$, where $x$ is the number of levels in the shortest path tree of shortest height.
    * Worst case: $\Theta(|V| + x\cdot|E'|)$
    * Expected case: $\Theta(|V|+x\cdot |E'|)$ (edges in random order)
    * Best case: $\Theta(|V| + |E'|)$

### Example

Suppose we have the following simple graph with no negative weight cycles:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f13.png').default} />
</div>

This example shows how edge ordering can change the algorithm's runtime. For visibility, the shortest path tree is highlighted in blue:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f14.png').default} />
</div>

For the sake of clarity and consistency, we'll assume the graph's adjacency list is in alphabetical order, with our start node conveniently named `start`. And we initialize:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f15.png').default} />
</div>

The result of the first round of relaxations is telling:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f16.png').default} />
</div>

When we relax all of the edges the first time, we start with a bunch of useless relaxations until we relax the `start -> e` edge (highlighted in red below):

| Round 1 |
| :-: |
| $a\to b$ |
| $a\to b$ |
| $b\to c$ |
| $b\to e$ |
| $c\to d$ |
| $d\to b$ |
| $e\to a$ |
| $e\to f$ |
| $e\to g$ |
| $f\to e$ |
| $f\to g$ |
| $g\to b$ |
| $\color{red}{s\to e}$ |
| $\color{blue}{s\to f}$ |
| $\color{blue}{s\to g}$ |

That edge isn't on the shortest path tree, but it does successfully change a value. Next, relaxations `start -> F` and `start -> G` successfully set correct shortest path distances. The shortest paths for those vertices have just 1 link so they have to be correct after 1 round. 

Let's now consider the second round (listing appears below). Edge `E -> A` successfully changes a value, propagating too large a shortest path estimate to `A`. That edge is on the final tree, but the distance isn't correct yet because `E`'s distance wasn't correct when the relaxation happened. So we'll color that edge purple in the table below. The `F -> E` edge relaxes later, correcting `E`'s distance and path:

| Round 1 | Round 2 |
| :-: | :-: |
| $a\to b$ | $a\to b$ |
| $a\to b$ | $a\to b$ |
| $b\to c$ | $b\to c$ |
| $b\to e$ | $b\to e$ |
| $c\to d$ | $c\to d$ |
| $d\to b$ | $d\to b$ |
| $e\to a$ | $\color{purple}{e\to a}$ |
| $e\to f$ | $e\to f$ |
| $e\to g$ | $e\to g$ |
| $f\to e$ | $\color{blue}{f\to e}$ |
| $f\to g$ | $f\to g$ |
| $g\to b$ | $\color{red}{g\to b}$ |
| $\color{red}{s\to e}$ | $s\to e$ |
| $\color{blue}{s\to f}$ | $s\to f$ |
| $\color{blue}{s\to g}$ | $s\to g$ |

The end of the second round looks like the following:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f17.png').default} />
</div>

In the next round (updated table shown below), `A` gets fixed, and by now we should see that if the edges are ordered in an unlucky way, then we get only one level of the shortest path tree fixed each pass through all of the edges. We've done three rounds, and only vertices with shortest paths of 3 or fewer links have the correct distances.

| Round 1 | Round 2 | Round 3 |
| :-: | :-: | :-: |
| $a\to b$ | $a\to b$ | $a\to b$ |
| $b\to c$ | $b\to c$ | $\color{purple}{b\to c}$ |
| $b\to e$ | $b\to e$ | $b\to e$ |
| $c\to d$ | $c\to d$ | $\color{purple}{c\to d}$ |
| $d\to b$ | $d\to b$ | $d\to b$ |
| $e\to a$ | $\color{purple}{e\to a}$ | $\color{blue}{e\to a}$ |
| $e\to f$ | $e\to f$ | $e\to f$ |
| $e\to g$ | $e\to g$ | $e\to g$ |
| $f\to e$ | $\color{blue}{f\to e}$ | $f\to e$ |
| $f\to g$ | $f\to g$ | $f\to g$ |
| $g\to b$ | $\color{red}{g\to b}$ | $g\to b$ |
| $\color{red}{s\to e}$ | $s\to e$ | $s\to e$ |
| $\color{blue}{s\to f}$ | $s\to f$ | $s\to f$ |
| $\color{blue}{s\to g}$ | $s\to g$ | $s\to g$ |

We end up with the following after this third round:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f18.png').default} />
</div>

In the fourth round, our luck turns, and the edges for the rest of the tree are relaxed in an order that lets edges on successive levels of the shortest path tree take advantage of relaxations from earlier in the same round. After it's done, edges from the following list highlighted in blue form a critical edge ordering:

| Round 1 | Round 2 | Round 3 | Round 4 |
| :-: | :-: | :-: | :-: |
| $a\to b$ | $a\to b$ | $a\to b$ | $\color{blue}{a\to b}$ |
| $b\to c$ | $b\to c$ | $\color{purple}{b\to c}$ | $\color{blue}{b\to c}$ |
| $b\to e$ | $b\to e$ | $b\to e$ | $b\to e$ |
| $c\to d$ | $c\to d$ | $\color{purple}{c\to d}$ | $\color{blue}{c\to d}$ |
| $d\to b$ | $d\to b$ | $d\to b$ | $d\to b$ |
| $e\to a$ | $\color{purple}{e\to a}$ | $\color{blue}{e\to a}$ | $e\to a$ |
| $e\to f$ | $e\to f$ | $e\to f$ | $e\to f$ |
| $e\to g$ | $e\to g$ | $e\to g$ | $e\to g$ |
| $f\to e$ | $\color{blue}{f\to e}$ | $f\to e$ | $f\to e$ |
| $f\to g$ | $f\to g$ | $f\to g$ | $f\to g$ |
| $g\to b$ | $\color{red}{g\to b}$ | $g\to b$ | $g\to b$ |
| $\color{red}{s\to e}$ | $s\to e$ | $s\to e$ | $s\to e$ |
| $\color{blue}{s\to f}$ | $s\to f$ | $s\to f$ | $s\to f$ |
| $\color{blue}{s\to g}$ | $s\to g$ | $s\to g$ | $s\to g$ |

Also notice that when we relax the `D -> B` edge, it has a path equal in weight to the old path, but we don't change parents for equal distances. If we did, then we'd cut off our path from the start vertex, because we'd be trying to add a zero weight cycle to the shortest path we have already calculated.

The conclusion of the fourth round looks as follows:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f19.png').default} />
</div>

In the fifth round, nothing will change and we will shortcut to the end of the algorithm. 

### Shortcut runtime redux

Recall the runtime analysis we have so far for $G = (V, E)$, where no preprocessing is done:

- Reachable negative weight cycles: $\Theta(|V|\cdot |E|)$.
- No reachable negative weight cycles: $O(|V| + x\cdot |E|)$, where $x$ is the number of levels in the shortest path tree of shortest height.
  + Worst case: $\Theta(|V| + x\cdot|E|)$
  + Expected case: $\Theta(|V|+x\cdot |E|)$ (edges in random order)
  + Best case: $\Theta(|V| + |E|)$

In the best case, the algorithm gets lucky, and hits a critical edge ordering for the entire graph in one round, even if the shortest path tree has lots of levels. Then, after the second round, it shortcuts to the end. In the worst case, we get only one level at a time. For the algorithm runtime as a whole, we use the upperbound big-$O$ notation because we don't know exactly how long it will take, but we can use $\Theta$ for best and worst case analysis. With a random edge ordering, we expect to get an average of two or fewer levels from an arbitrary shortest path tree completed each round so our expected time looks similar to our worst case time.

## Dijkstra {#dijkstra}

### What it accomplishes

Dijkstra's algorithm can find the shortest distances and shortest path tree from any vertex to all other vertices in any directed or undirected weighted graph with no negative weight edges. It generally runs much faster than the Bellman-Ford algorithm because it never needs to relax any edge more than once.

Let's recap:

- Finds the shortest paths from a start vertex to all other vertices.
- Directed or undirected weighted graphs.
- Non-negative edge weights.

### The idea

The idea behind Dijkstra's algorithm is that we keep a *growing* set of vertices that we know are the closest ones to the start vertex, and we know the shortest paths to all of them.

Let's start with a snapshot of the algorithm, from the middle of a run, to see how and why it works:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f34.png').default} />
</div>

In the weighted graph above, we're looking for shortest paths from the start, and in this graph the five closest vertices are `start`, `D`, `G`, `F`, and `A`, with the shortest distance shown in each vertex, and paths shown in blue. Of the closest vertices from `start`, we see `A` has the farthest distance, at `8`. We assume that for each of those vertices, *after* a vertex got its correct shortest distance, all outgoing edges from that vertex were relaxed. We can see the current distance estimates and $\pi$-values to the non-finished vertices, `B`, `C`, and `E`, are `11`, `13`, and `15`, respectively.

The paths for each of these estimates start with a shortest path to one of the finished vertices and then have a single edge to the unfinished vertex at the end, where that last edge was relaxed *after* the finished vertex had its correct shortest path distance. So for `C`, the estimate came from a path from `start` to `D` to `F` to `C`; for `B`, it comes from the path from `start` to `A` to `B`.

We haven't looked at the other edges in the graph yet, but there are no negative edge weights. So if `B` has the smallest current estimate among non-finished vertices (i.e., `B`'s `11` is better than both `C`'s `13` and `E`'s `15`), then it looks like the best greedy choice. From our knowledge so far, it looks to be the best choice, but we haven't looked at all of the edges. 

So do we take the path to `B` or not to `B`? Maybe go to `C` or `E` first? Is `B` the next closest vertex in all? No matter what non-negative weights we fill in for the rest of the graph, the shortest distance to `B` will be `11`, and neither `C` nor `E` can be closer. Any path from `start` to `B`, `C`, or `E` has to start on finished vertices and then eventually have an edge to a non-finished vertex, and that costs at least `11`. Maybe there are more edges after that too, but with non-negative edge weights, we are never going to start a path with cost `13` to `C` and then add more edges to get down below `11`. So if we can't beat `11` as a distance to any non-finished vertex, and we have a cost `11` path to some non-finished vertex, then fantastic! It must be the next closest vertex. Mark `B` as finished:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f35.png').default} />
</div>

Now that we know it has its final distance, relax the edges out of it and be done with them:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f36.png').default} />
</div>

Because `B`'s distance won't change again, relaxing the edges out of it won't help after this first time. Now the state of the graph looks just like where we started, except now six vertices are finished instead of five. The algorithm just follows that logic over and over until the graph is done. 

The algorithm idea was really an outline of the inductive proof that the algorithm works: that idea can take us from $i$ finished vertices to $i+1$, and we're all set. For our base case, we can use a starting set of size $1$. We know the distance to the `start` vertex is `0` (i.e., the distance from a vertex to itself is assumed to be `0`), and we can relax the edges out of it. 

Let's recap:

- Grow set of "finalized" vertices known to be the closest to the start vertex.
- Relax edges out of a vertex once it is added to finalized set.

### Simple version

Let's formalize the algorithm outline above by starting with our generic algorithm boilerplate:

```a showLineNumbers
GenericSSSP(G, s)
    SSSPInitialize(G, s)
    Relax edges in some order

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

And then modifying this generic form to reflect the outline discussed a moment ago:

```a showLineNumbers
Dijkstra(G, s)
    SSSPInitialize(G, s)
    for u in V
        mark u unfinished
    mark s finished
    for edge e(= s -> v) outgoing from s
        Relax(e)
    while unfinished vertices exist
        let u be min distance unfinished vertex
        mark u finished
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

So we initialize our vertices as usual, mark our start node as finished (line `5`) and relax the edges out of it (lines `6`-`7`), and then, while there unfinished vertices, mark the one with the smallest distance estimate as finished (line `10`), and relax the edges out of it (lines `11`-`12`).

Now, right after the initialization, the `start` vertex has estimate `0`, and every other vertex is at infinity, and `0` is smaller, so we can actually fold that first round right into the rest of the algorithm (i.e., lines `5`-`7` are unnecessary):

```a showLineNumbers
Dijkstra(G, s)
    SSSPInitialize(G, s)
    for u in V
        mark u unfinished
    while unfinished vertices exist
        let u be min distance unfinished vertex
        mark u finished
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

That's the algorithm outline, and if we have a dense enough graph, then that's good enough.

### Simple analysis

Initializing the graph takes $\Theta(|V|)$ time, and we have to find the next closest vertex $|V|$ times. We can find the minimum by looping through all $|V|$ vertices each time. We also relax every edge once, assuming all vertices are reachable, and it takes order $\Theta(|V|^2 + |E|) = \Theta(|V|^2)$ total time. Because $|E|$ can't be bigger than $|V|^2$, that's order $\Theta(|V|^2)$ time.

If our graph is dense enough, if we really have order $\Theta(|V|^2)$ edges, then that's as good as we can get. It's linear in the size of the graph. On the other hand, if we have a sparse graph, then that doesn't look as good. The algorithm keeps distance estimates, decreases them when needed, and repeatedly removes the minimum value vertex from a set. That's kind of what *priority queues* do.

Let's recap. The algorithm uses:

- Initialization: $\Theta(|V|)$
- $|V|$ find minimum operations
- $|E|$ relaxations

Using no extra data structures:

- Initialization: $\Theta(|V|)$
- Find minimum: $\Theta(|V|)$
- Relaxation: $\Theta(1)$
- Total: $\Theta(|V|^2 + |E|) = \Theta(|V|^2)$

### Dijkstra's algorithm using binary heap priority queue

It's fairly common to use a binary heap as a priority queue, and we can do so in this algorithm:

```a showLineNumbers
Dijkstra(G, s)
    SSSPInitialize(G, s)
    Q = new MinPriorityQueue(V)
    while Q not empty
        u = Q.deleteMin()
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        decreaseKey of v in Q
        v.d = u.d + weight(u -> v)
        v.pi = u
```

Now, each time we relax an edge, if the distance estimate decreases, then we need to decrease the key of the vertex in the priority queue. We need some sort of handle into the heap to do this, and it will take logarithmic time. That's slower than before, but then each time we find a minimum vertex, *that* is faster, logarithmic instead of linear.

In the end, the algorithm has a different runtime, and it will be faster if the graph isn't too dense.

### Binary heap priority queue analysis

Algorithm uses:

- Initialization: $\Theta(|V|)$
- $|V|$ find minimum operations
- $|E|$ relaxations

Using no extra data structures:

- Initialization: $\Theta(|V|)$
- Find minimum: $\Theta(|V|)$
- Relaxation: $\Theta(1)$
- Total: $\Theta(|V|^2 + |E|) = \Theta(|V|^2)$; faster for $|E| = \omega(|V|^2/\lg |V|)$

Using binary heap priority queue:

- Initialization: $\Theta(|V|)$
- Find minimum: $O(\lg|V|)$
- Relaxation and `changeKey`: $O(\lg|V|)$
- Total: $O((|V| + |E|) \lg |V|) = O(|E|\lg |V|)$; faster for $|E| = o(|V|^2/\lg |V|)$

### Dijkstra's algorithm using Fibonacci heap priority queue

Now, it turns out that another data structure, Fibonacci heaps, give faster priority queues. They are more complex and might have worse hidden constants than binary heaps, so they might only be worth it if we expect to be running on *really* big graphs that aren't so dense that the first implementation is good.

For Fibonacci heaps, `DeleteMin` still has logarithmic time, but `DecreaseKey` takes constant amortized time. Some `DecreaseKey`s might take longer, but the average time for them will be constant, so using Fibonacci heaps will always do asymptotically as well or better than either of those two previous methods (i.e., linear search or binary heaps), order $O(|E| + |V|\lg|V|)$. For graphs with at least $|V|\lg|V|$ edges, which isn't so dense, that's linear in the size of the graph. 

To recap:

- Initialization: $\Theta(|V|)$
- $|V|$ find minimum operations: $O(|V|\lg|V|)$
- $|E|$ relaxations: $O(|E|)$
- Total: $O(|E| + |V|\lg |V|)$

### Dijkstra's algorithm and breadth first search

Two quick points to mention. Let's look at the pseudocode for Dijkstra's algorithm using a binary heap for the priority queue:

```a showLineNumbers
Dijkstra(G, s)
    SSSPInitialize(G, s)
    Q = new MinPriorityQueue(V)
    while Q not empty
        u = Q.deleteMin()
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        decreaseKey of v in Q
        v.d = u.d + weight(u -> v)
        v.pi = u
```

First, we should notice just how similar the code above is to breadth-first search. If the priority queue was a first-in-first-out queue, and the edge weights were all `1`, then the above *is* breadth-first search. Dijkstra's algorithm is just a generalization. 

### Dijkstra's algorithm with a single target vertex

Second, if we only care about the shortest distance to one target destination vertex, then we can stop when we find it:

```a showLineNumbers
#highlight-next-line
Dijkstra(G, s, t)
    SSSPInitialize(G, s)
    Q = new MinPriorityQueue(V)
    while Q not empty
        u = Q.deleteMin()
        #highlight-start
        if(u == t)
            return
        #highlight-end
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        decreaseKey of v in Q
        v.d = u.d + weight(u -> v)
        v.pi = u
```

### Example

Let's run through an example. Like in the snapshot we previously discussed, we won't even show the edge weights until the algorithm actually looks at *that* edge to relax it:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f37.png').default} />
</div>

We first initialize the graph:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f38.png').default} />
</div>

And then we start with the `start` vertex. We can color it differently when it's finalized or out of the queue (i.e., green with blue circle means it's being processed and not yet finalized, and just green means it's finished). We relax the edges out, and of course all of them find new shorter distance estimates to each vertex:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f39.png').default} />
</div>

The `start` vertex has now been fully processed, and then `D` is the closest vertex (let's color the edge from its parent blue when we take `D` out of the queue and relax the edges out of it):

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f40.png').default} />
</div>

Relaxing the edge out of it gives us the following:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f41.png').default} />
</div>

Next comes `G` (we again color the edge from its parent blue when we take `G` out of the queue):

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f42.png').default} />
</div>

Relax its outgoing edges (only one edge in this case):

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f43.png').default} />
</div>

Relaxing the edge above doesn't happen to change the distance estimate to `F`. But `F` is the next closest vertex anyway &#8212; it's closer than `A` even though the path to `A` has only one link:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f44.png').default} />
</div>

Relax its outgoing edges:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f45.png').default} />
</div>

After `F` comes `A`:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f46.png').default} />
</div>

Relax `A`'s outgoing edges:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f47.png').default} />
</div>

After relaxing `A`'s outgoing edges, as shown above, we have the snapshot we walked through earlier. We have finalized distances to the five vertices closest to the `start` vertex, where `A` is the farthest, at distance `8`, and `B` is the next closest.

Picking up where we left off, we go to `B`:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f48.png').default} />
</div>

Relax `B`'s outgoing edges:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f49.png').default} />
</div>

Then go to `E`:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f50.png').default} />
</div>

Relax its outgoing edges:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f51.png').default} />
</div>

Now go to `C`:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f52.png').default} />
</div>

Relax its outgoing edges:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f53.png').default} />
</div>

Notice that when we relax `C`'s edge to `B`, its distance is equal to the one already there (i.e., `d = 11`). Don't change `B`'s parent. Relaxations only change parent values for *strictly* smaller distances. Or else we might lose our path from the start; for example, this would happen to us in the graph above if we changed `B`'s $\pi$-value to `C` because then we'd be trapped in the zero weight cycle `B -> E -> C -> B`.

For the entire process above, we relaxed edges out of vertices in the order `start`, `D`, `G`, `F`, `A`, `B`, `E`, `C` in non-decreasing order (i.e., weakly increasing order). The last three vertices, `B`, `E`, and `C`, have equal distances, but `B` will come before `E` and `C` because they only go their distance by using a path through `B` with some `0` edge weights tacked on. 

### Example (failure on negative edge weights)

Next, a super simple example to show how Dijkstra's algorithm can fail with negative edge weights. Consider the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='300px' src={require('./f54.png').default} />
</div>

Let's see what running Dijkstra's algorithm on the graph above gives us:

<div align='center' className='centeredImageDiv'>
  <img width='300px' src={require('./f55.gif').default} />
</div>

Above, we start with `start` and relax all of its outgoing edges. Everything seems okay. We have no negative edges yet. The `start` vertex gets finalized and we move to `A` since it is closest (we highlight the edge `start -> A` to show this is the correct shortest path distance, `4`), which has no outgoing edges so it is immediately finalized. The next closest vertex is `B`. So we go to vertex `B` and highlight the edge `start -> B` to indicate this is the correct shortest path distance, `5`, and we relax all outgoing edges from `B`, which is just the edge `B -> A`. Finally, we move to `C` and highlight the edge `start -> C` to indicate this is the correct shortest path distance, `8`.

But when we finalize `C` and relax the edge out of it, it ends up finding a shorter path to `B`. Above, we highlighted the edge `start -> B` with weight `5` because we thought it was the shortest path. But now we see that the path `start -> C -> B` has weight `8 + (-7) = 1 < 5`. Of course, this isn't a problem for `B` &#8212; it's happy to have a shorter edge even though we previously thought the `start -> B` edge was in our tree. 

This is, however a problem for `A`. Recall the conclusion of running Dijkstra on this small graph:

<div align='center' className='centeredImageDiv'>
  <img width='300px' src={require('./f56.png').default} />
</div>

The graph above indicates the shortest distance from `start` to `A` is obtained by the direct edge `start -> A` of weight `4`. But we can see that the path `start -> C -> B -> A` has weight `8 + (-7) + 2 = 3`, which is clearly smaller than `4`. Our algorithm fails.

Essentially, our problem is that we already relaxed the edges out of `B`, but we clearly need to relax the `B -> A` edge again to find the actual shortest path to `A`. 

Once we need to relax an edge more than once, we're no longer dealing with Dijkstra's. We'll probably want Bellman-Ford in such a case. Nonetheless, this leads us to a nice observation about Dijkstra's algorithm: no negative weight edges is sufficient, but not *necessary*, for it to give a correct answer; that is, it *might* run okay even with negative edge weights, even if that makes it remove vertices from the queue out of order from their distance from the start.

The problem in the example above wasn't just that there was a negative edge weight &#8212; it was that, when we relaxed it, it lowered a distance estimate to a vertex that was already supposed to be done. If `B` hadn't been removed from the queue yet, or if the distance estimate to `B` didn't lower, then that negative weight edge wouldn't have caused any problems.

### Pushing boundaries with negative weight edges

The issues discussed above give us a nice heuristic way to try to use Dijkstra's algorithm even if the graph has negative edge weights. When we relax edges, if they change distance estimates to vertices that are already supposed to be finished, then the algorithm fails:

```a showLineNumbers
Dijkstra(G, s)
    SSSPInitialize(G, s)
    Q = new MinPriorityQueue(V)
    while Q not empty
        u = Q.deleteMin()
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        #highlight-error-start-numbers
        if v not in Q
            fail!!
        #highlight-error-end-numbers
        decreaseKey of v in Q
        v.d = u.d + weight(u -> v)
        v.pi = u
```

Dijkstra's algorithm will always work fine if there are no negative edge weights, but it might work even if there are some negative edge weights. It will always warn us if it's going to fail, but it might warn us sometimes even if it would have gotten the correct answer. Why try it if it might fail? Because Bellman-Ford can be so freaking slow that it might be worth heuristically trying Dijkstra first event if it usually fails.

## Directed acyclic graph {#dag}

### What it accomplishes

The algorithm we're going to discuss can find the shortest distance and shortest path tree from any vertex to all other vertices in any direct acyclic weight graph (weighted DAG). It runs in time linear in the graph size, and can work as long as there are no cycles reachable from the start vertex.

Let's recap:

- Finds the shortest paths from a start vertex to all other vertices.
- Works on weighted, directed acyclic graphs
- Negative edge weights allowed
- Sufficient: no cycle reachable from start vertex

### The idea

The idea for this algorithm is really quite simple. Imagine that the shortest path to some vertex `V` has `U` as `V`'s predecessor:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f20.png').default} />
</div>

If we know that vertex `U` has its correct shortest distance, and then we relax the `U -> V` edge, then `V` gets its correct shortest distance:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f21.png').default} />
</div>

The problem is that we don't know ahead of time which vertex is `V`'s predecessor when we start:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f22.png').default} />
</div>

Is it `A`, `C`, `D`, or `F` in the image above? We don't know. But if we finish *all* vertices with an edge to `V` by getting a final distance for each of them and *then* relax the outgoing edge from each of these vertices, all before getting to `V`, then we're guaranteed that `V`'s predecessor is included as one of these vertices.

That's actually easy to do here because the graph is acyclic. If we consider the vertices in topological order, then every vertex leading to `V` must have been considered before `V`. Recall our generic SSSP algorithm:

```a showLineNumbers
GenericSSSP(G, s)
    SSSPInitialize(G, s)
    Relax edges in some order

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

Let's modify this generic algorithm by relaxing edges out of vertices taken in topological order:

```a showLineNumbers
DAGSSSP(G, s)
    SSSPInitialize(G, s)
    for u in V in topological order
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

That's the algorithm. 

### Single target algorithm

If we only care about getting to one destination, then we can simply stop once we get to it:

```a showLineNumbers
#highlight-next-line
DAGSSSP(G, s, t)
    SSSPInitialize(G, s)
    for u in V in topological order
        #highlight-next-line
        if(u == t) return
        for edge e(= u -> v) outgoing from u
            Relax(e)

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

### Analysis

Topological sorting and this entire algorithm take linear time:

- Topological sort: $O(|V| + |E|)$
- Loop through vertices: $O(|V|)$
- Edge relaxations: $O(|E|)$
- Total: $O(|V| + |E|)$

### Which topological sort?

Since our algorithm depends on using a topological ordering of the vertices, we clearly need to know what topological order/sort actually are as well as how we might obtain one for a given graph. There are two commonly used ways of finding a topological ordering for a DAG: either Kahn's algorithm (i.e., the "peel-off" algorithm) or depth-first search (DFS). We can use the DFS-based way here, and we can run it on just the start vertex instead of the whole graph. We only care about reachable vertices. We don't care about start and finish times &#8212; we just need the *order*. 

### Detailed algorithm

Ignoring potential call stack overflow worries (i.e., we'll plan to use a recursive algorithm instead of the stack-based iterative approach), let's add a DFS-based ordering, which returns a topologically ordered list of reachable vertices, in reverse order:

```a showLineNumbers
DAGSSSP(G, s, t)
    SSSPInitialize(G, s)
    #highlight-start
    vertList = TopOrder(G, s, new List())
    for u in vertList in reverse order
    #highlight-end
        if(u == t) return
        for edge e(= u -> v) outgoing from u
            Relax(e)

#highlight-start
TopOrder(G, u, vertList)
    u.discovered = true
    for edge e(= u -> v) outgoing from u
        if(not v.discovered)
            TopOrder(G, v, vertList)
    append u to vertList
    return vertList
#highlight-end

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
        #highlight-next-line
        v.discovered = false
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        v.d = u.d + weight(u -> v)
        v.pi = u
```

Above, a stack may have made more sense than a list because we could have pushed and popped, but a list should be just fine. 

### Detailed algorithm analysis

If $G' = (V', E')$ is the part of $G = (V, E)$ reachable from the start vertex:

- Topological sort: $\Theta(|V| + |E'|)$
- Loop through vertices: $\Theta(|V'|)$
- Edge relaxations: $\Theta(|E'|)$
- Total: $\Theta(|V| + |E'|)$

Now the algorithm takes time linear in the number of vertices plus reachable edges. Note that we don't have any error checking for cycles. That's on purpose. We'll come back to this.

Of course, if we were making a library routine that is required to reject inputs with cycles, then we could run DFS, look for back edges, and if we find one, then simply reject the graph.

### Example (with cycles?)

Instead, we're actually going to run the algorithm above on an example graph with three cycles to see what happens:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f23.png').default} />
</div>

This should help us understand how the algorithm works, and why it might go wrong with cycles. We'll show the edge weights for an edge when it gets relaxed.

The leftmost cycle, `H -> I` and `I -> H`, won't cause us any problems because it isn't even reachable from the start. So we can ignore it. The `D -> B` edge also can't cause any problems so long as its cycle has non-negative total cost. But the `F -> E` edge just might hose us. If we prefer a more standard example, with no cycles, then we can just cover up the extra edges in the graph that cause cycles.

In the example graph above, suppose get vertices in the following topological order: `start`, `A`, `B`, `C`, `D`, `E`, `F`, `G`. Since `H` and `I` aren't reachable, they don't make it into the list.

This is what the initial state of our graph looks like:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f24.png').default} />
</div>

Now we relax outgoing edges from vertices in the topological order above, starting with `start`:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f25.png').default} />
</div>

If this were a real topological ordering, then whenever we take a vertex, we know it must already have its correct shortest distance and edge from a parent node, so we highlight that edge in blue.

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f26.png').default} />
</div>

We can move through `A`, `B`, and `C` fairly quickly.

For `A`:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f27.png').default} />
</div>

For `B`:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f28.png').default} />
</div>

For `C`:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f29.png').default} />
</div>

What happens for `D`? It has an edge to `B`. Assuming no negative weight cycles, no matter the edge weight (say `2`), it cannot give a shorter path to `B` in this graph:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f30.png').default} />
</div>

This is because the only way to get to `D` is to go through `B`. So even though it's a cycle, it won't mess us up (the `D -> B` edge does not get changed from red to blue because it doesn't result in a better shortest path estimate because the cycle isn't negative):

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f31.png').default} />
</div>

What about when we get to the `F -> E` edge? Well, if it weighs `5`, then it doesn't cause problems either:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f32.png').default} />
</div>

When we relax it, it finds a more expensive path to `E`, which we can ignore. But if its weight were `2` instead of `5`, then it would change the distance estimate to `E` when `E` was already supposed to be finished, and `E`'s edge to `G` would need to be relaxed *again* in order to find the shortest path to `G`. Without that extra relaxation, the algorithm would fail. With weight `5`, everything works because we happened to get lucky in our vertex order from the DFS, even though there were cycles. 

On the other hand, if the DFS returned vertices in the order `start`, `A`, `B`, `C`, `E`, `F`, `G`, `D`, then the algorithm would fail with  these weights:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f33.png').default} />
</div>

We need to check if a relaxation successfully lowers the distance estimate to an already finished vertex. That will happen only if the graph has a reachable cycle *and* the DFS part doesn't get lucky and return a vertex order that allows us to relax each edge only once and still know that we have found correct shortest distances. Otherwise, we fail.

### Wishful thinking expansion with error check

```a showLineNumbers
DAGSSSP(G, s, t)
    SSSPInitialize(G, s)
    vertList = TopOrder(G, s, new List())
    for u in vertList in reverse order
        #highlight-next-line
        u.finished = true
        for edge e(= u -> v) outgoing from u
            Relax(e)

TopOrder(G, u, vertList)
    u.discovered = true
    for edge e(= u -> v) outgoing from u
        if(not v.discovered)
            TopOrder(G, v, vertList)
    append u to vertList
    return vertList

SSSPInitialize(G, s)
    for all v in V
        v.d = inf
        v.pi = nil
        v.discovered = false
        v.finished = false
    s.d = 0

Relax(u -> v)
    if(u.d + weight(u -> v) < v.d)
        #highlight-start
        if(v.finished)
            fail
        #highlight-end
        v.d = u.d + weight(u -> v)
        v.pi = u
```

Above, the `discovered` flag is used for the DFS portion of the algorithm (lines `10` and `12`), and the `finished` flag is used for the relaxation part (lines `27` and `28`). 

Why bother with this stuff? If we don't know whether or not a graph is acyclic and we want to check, then that check can take linear time in the size of the graph. If we're just writing code for ourselves, or if our algorithm precondition is that we are always given an acyclic graph, or we can do whatever we want even if our graph has cycles, then we can just try to run the whole algorithm above in linear time. Even if there are cycles, maybe we get lucky and it finds correct distances anyway. If that lets us avoid a slower algorithm, then it might be worth it.