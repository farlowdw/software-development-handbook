import BibRef from '@site/src/components/BibRef';
import Pseudocode from '@site/src/components/Pseudocode';
import bellmanFord from '!!raw-loader!@site/docs/_Pseudocodes/CLRS/bellman-ford.tex';

Bellman-Ford, despite its innocent and simplistic appearance on the surface, can be rather difficult to learn at first. As [a popular video on Bellman-Ford](https://www.youtube.com/watch?v=lyw4FaxrwHg&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=21) notes:

> Of all the shortest path algorithms in graph theory, Bellman-Ford is definitely one of the simplest; yet, I struggled as an undergrad student trying to learn this algorithm, which is part of the reason I'm making this video.

Part of the struggle may be be rooted in how this algorithm is taught/introduced in several textbooks. It is informative to look at expositions on this algorithm in <BibRef id='DPV' pages='pp. 115-119'></BibRef> (DPV) and <BibRef id='TC2022' pages='pp. 612-616'></BibRef> (CLRS). Specifically, we look at the introductions and examples provided in both texts, test the examples with our template, and then return to unearth a key revelation that is likely the source of struggle for many people first learning this algorithm.

<details>
<summary> Description and example in DPV</summary>

The exposition that follows is based on what appears in <BibRef id='DPV' pages='pp. 115-119'></BibRef> (some parts have been modified so as to ensure these remarks are self-contained).

Dijkstra's algorithm [yes, Dijkstra's algorithm is covered before Bellman-Ford in DPV] works in part because the shortest path from the starting point $s$ to any node $v$ must pass exclusively through nodes that are closer than $v$. This no longer holds when edge lengths can be negative. In the figure below, the shortest path from $S$ to $A$ passes through $B$, a node that is further away! [Comically, the edge weight of $2$ is clearly an error and should instead read $-2$.]

<div align='center' className='centeredImageDiv'>
  <img width='200px' src={require('@site/static/img/templates/graphs/f14.png').default} />
</div>

What needs to be changed in order to accommodate this new complication? To answer this, let's take a particular high-level view of Dijkstra's algorithm. A crucial invariant is that the `dist` values it maintains are always either overestimates or exactly correct. They start off at $\infty$, and the only way they ever change is by updating along an edge:

```a
PROCEDURE UPDATE((u, v) in E)
dist(v) = min{dist(v), dist(u) + l(u, v)}
```

This *update* operation is simply an expression of the fact that the distance to $v$ cannot possibly be more than the distance to $u$, plus $l(u, v)$. It has the following properties.

1. It gives the correct distance to $v$ in the particular case where $u$ is the second-last node in the shortest path to $v$, and $\dist(u)$ is correctly set.
2. It will never make $\dist(v)$ too small, and in this sense it is *safe*. For instance, a slew of extraneous `update`'s can't hurt.

This operation is extremely useful: it is harmless, and if used carefully, will correctly set distances. In fact, Dijkstra's algorithm can be thought of simply as a sequence of `update`'s. We know this particular sequence doesn't work with negative edges, but is there some other sequence that does? To get a sense of the properties this sequence must possess, let's pick a node $t$ and look at the shortest path to it from $s$.

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f12.png').default} />
</div>

This path can have at most $|V| - 1$ edges. Why? The answer is probably more nuanced than it seems at first. The following explanation is given in <BibRef id='TC2022' pages='pp. 607-608'></BibRef>:

> Can a shortest path contain a cycle? As we have just seen, it cannot contain a negative-weight cycle. Nor can it contain a positive-weight cycle, since removing the cycle from the path produces a path with the same source and destination vertices and a lower path weight. That is, if $p = \langle v_0, v_1, \ldots, v_k\rangle$ is a path and $c = \langle v_i, v_{i+1}, \ldots, v_j\rangle$ is a positive-weight cycle on this path (so that $v_i = v_j$ and $w(c) > 0$), then the path $p' = \langle v_0, v_1, \ldots, v_i, v_{j+1}, v_{j+2}, \ldots v_k\rangle$ has weight $w(p') = w(p) - w(c) < w(p)$, and so $p$ cannot be a shortest path from $v_0$ to $v_k$.
>
> That leaves only 0-weight cycles. You can remove a 0-weight cycle from any path to produce another path whose weight is the same. Thus, if there is a shortest path from a source vertex $s$ to a destination vertex $v$ that contains a 0-weight cycle, then there is another shortest path from $s$ to $v$ without this cycle. As long as a shortest path has 0-weight cycles, you can repeatedly remove these cycles from the path until you have a shortest path that is cycle-free. Therefore, without loss of generality, assume that shortest paths have no cycles, that is, they are simple paths.
>
> Since any acyclic path in a graph $G = (V, E)$ contains at most $|V|$ distinct vertices [i.e., a path passing through every vertex], it also contains at most $|V| - 1$ edges. Assume, therefore, that any shortest path
contains at most $|V| - 1$ edges.

The last paragraph above is the key takeaway. Returning to our description of the shortest path image: the shortest path from $s$ to $t$ can have at most $|V| - 1$ edges per the excerpt above. If the sequence of updates performed includes $(s, u_1), (u_1, u_2), (u_2, u_3), \ldots, (u_k, t)$, *in that order* (though not necessarily consecutively), then by the first property the distance to $t$ will be correctly computed. It doesn't matter what other updates occur on these edges, or what happens in the rest of the graph, because updates are *safe*.

But still, if we don't know all the shortest paths beforehand, how can we be sure to update the right edges in the right order? Here is an easy solution: simply update *all* the edges, $|V| − 1$ times! The resulting $O(|V|\cdot |E|)$ procedure is called the Bellman-Ford algorithm and is shown below in pseudocode:

```
PROCEDURE ShortestPaths(G, l, s)
Input:    Directed graph G = (V, E)
          edge lengths {l_e : e in E} with no negative cycles.

Output:   For all vertices u reachable from s, dist(u) is set
          to the distance from s to u

for all u in V:
  dist(u) = +infty
  prev(u) = nil

dist(s) = 0
repeat |V| - 1 times:
  for all e in E:
    update(e)
```

An example run of the algorithm is shown below:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f11.png').default} />
</div>

A note about implementation: for many graphs, the maximum number of edges in any shortest path is substantially less than $|V| − 1$, with the result that fewer rounds of updates are needed. Therefore, it makes sense to add an extra check to the shortest-path algorithm, to make it terminate immediately after any round in which no update occurred.

What about negative cycles? If the length of edge $(E, B)$ in the figure above were changed to $-4$, then the graph would have a *negative cycle* $A\to E\to B\to A$. In such situations, it doesn't make sense to even ask about shortest paths. There is a path of length 2 from $A$ to $E$. But going round the cycle, there's also a path of length 1, and going round multiple times, we find paths of lengths 0, $−1$, $−2$, and so on.

The shortest-path problem is ill-posed in graphs with negative cycles. As might be expected, our algorithm in the pseudocode above (i.e., Bellman-Ford) works only in the absence of such cycles. But where did this assumption appear in the derivation of the algorithm? Well, it slipped in when we asserted the *existence* of a shortest path from $s$ to $t$.

Fortunately, it is easy to automatically detect negative cycles and issue a warning. Such a cycle would allow us to endlessly apply rounds of `update` operations, reducing `dist` estimates every time. So instead of stopping after $|V| − 1$ iterations, perform one extra round. There is a negative cycle if and only if some `dist` value is reduced during this final round.

</details>

<details>
<summary> Testing the DPV example with the template</summary>

To effectively test our template code, first convert the example graph into an adjacency list:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f11.png').default} />
</div>

Map the letter nodes to their numeric equivalent:

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

Then we get the following adjacency list representation of the graph above:

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

Let's now use a modified version of the template code where comments have been removed and we've added a `print` statement to show the `distances` array after each iteration of relaxing all edges:

```python
def bellman_ford(graph, start):
    n = len(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    predecessors = [None] * n
    
    for _ in range(n - 1):
        edge_updated = False
        for node in range(n):
            for neighbor, weight in graph[node]:
                if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                    edge_updated = True
                    distances[neighbor] = distances[node] + weight
                    predecessors[neighbor] = node
        
        # highlight-success-next-line
        print(distances)
        
        if not edge_updated:
            return distances, predecessors
    
    for node in range(n):
        for neighbor, weight in graph[node]:
            if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                return False
            
    return distances, predecessors

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

bellman_ford(graph, 0)
```

We get the following printed to the console (the initial `distances` array, before any iteration has taken place, has been included for the sake of clarity):

```python
#  S    A     B     C     D     E     F     G
[  0,  inf,  inf,  inf,  inf,  inf,  inf,  inf  ]   # after iteration 0 (initial distances array)
[  0,   10,   10,  inf,  inf,   12,    9,    8  ]   # after iteration 1
[  0,    5,   10,   11,   14,    8,    9,    8  ]   # after iteration 2
[  0,    5,    5,   11,   14,    7,    9,    8  ]   # after iteration 3
[  0,    5,    5,    6,    9,    7,    9,    8  ]   # after iteration 4
[  0,    5,    5,    6,    9,    7,    9,    8  ]   # after iteration 5 (no edges updated, terminate early)
```

If we're first learning about Bellman-Ford, then the output above is probably very confusing. The *end result*, namely the final `distances` array, is the same as in the book's example: `[0, 5, 5, 6, 9, 7, 9, 8]`. But everything else (i.e., the intermediate results) is very different. Why? We'll return to this example to see why, but let's first look at the example from CLRS to get a hint.

</details>

<details>
<summary> Description and example in CLRS</summary>

The terminology and notation used in the following initial description by CLRS may be foreign, but the illustrated example should clear up any confusion.

The Bellman-Ford algorithm solves the single-source shortest-paths problem in the general case in which edge weights may be negative. Given a weighted, directed graph $G = (V, E)$ with source vertex $s$ and weight function $w\colon E\to\R$, the Bellman-Ford algorithm returns a boolean value indicating whether there is a negative-weight cycle that is reachable from the source. If there is such a cycle, the algorithm indicates that no solution exists. If there is no such cycle, the algorithm produces the shortest paths and their weights.

The procedure BELLMAN-FORD relaxes edges, progressively decreasing an estimate $v.d$ on the weight of a shortest path from the source $s$ to each vertex $v\in V$ until it achieves the actual shortest-path weight $\delta(s, v)$. The algorithm returns TRUE if and only if the graph contains no negative-weight cycles that are reachable from the source.

<Pseudocode
    content={bellmanFord}
    algID="bellman-ford"
    options={{ lineNumber: true, captionCount: 0, noEnd: true }}
/>

The figure below shows the execution of the Bellman-Ford algorithm on a graph with 5 vertices. After initializing the $d$ and $\pi$ values of all vertices in line 1, the algorithm makes $|V| - 1$ passes over the edges of the graph. Each pass is one iteration of the for loop of lines 2-4 and consists of relaxing each edge of the graph once. Figures (b)-(e) show the state of the algorithm after each of the four passes over the edges. After making $|V| - 1$ passes, lines 5-8 check for a negative-weight cycle and return the appropriate boolean value.

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f15.png').default} />
</div>

The figure above shows the execution of the Bellman-Ford algorithm. The source is vertex $s$. The $d$ values appear within the vertices, and blue edges indicate predecessor values: if edge $(u, v)$ is blue, then $v.\pi = u$. In this particular example, each pass relaxes the edges in the order $(t, x)$, $(t, y)$, $(t, z)$, $(x, t)$, $(y, x)$, $(y, z)$, $(z, x)$, $(z, s)$, $(s, t)$, $(s, y)$. **(a)** The situation just before the first pass over the edges. **(b)–(e)** The situation after each successive pass over the edges. Vertices whose shortest-path estimates and predecessors have changed due to a pass are highlighted in orange. The $d$ and $\pi$ values in part (e) are the ûnal values. The Bellman-Ford algorithm returns TRUE in this example.

</details>

<details>
<summary> Testing the CLRS example with the template</summary>

Let's see if we can test our template against the example provided in CLRS:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f15.png').default} />
</div>

As with the DPV example, we should start by mapping the letter nodes to their numeric equivalent. What number should we assign to each node? The order in which each edge is relaxed suggests a natural labeling scheme:

```python
[
  (t, x), (t, y), (t, z), # t: 0
  (x, t),                 # x: 1
  (y, x), (y, z),         # y: 2
  (z, x), (z, s),         # z: 3
  (s, t), (s, y)          # s: 4
]
```

What will we get when we represent the graph as an adjacency list and use the modified template as before (where we printed the `distances` array after each iteration)? Let's see:

```python
def bellman_ford(graph, start):
    # ...

graph = {
    0: [(1, 5), (2, 8), (3, -4)],
    1: [(0, -2)],
    2: [(1, -3), (3, 9)],
    3: [(1, 7), (4, 2)],
    4: [(0, 6), (2, 7)],
}

bellman_ford(graph, 4)
```

We get the following printed to the console (the initial `distances` array, before any iteration has taken place, has been included for the sake of clarity):

```python
#   t     x     y     z    s
[  inf,  inf,  inf,  inf,  0  ]   # after iteration 0 (initial distances array)
[    6,  inf,    7,  inf,  0  ]   # after iteration 1
[    6,    4,    7,    2,  0  ]   # after iteration 2
[    2,    4,    7,    2,  0  ]   # after iteration 3
[    2,    4,    7,   -2,  0  ]   # after iteration 4 (|V| - 1 iterations with no negative cycle)
```

Each line above exactly matches the figures (a)-(e), respectively. How is it possible that our template reproduced *exactly* what was given in CLRS and was not even close for DPV? The key revelation is provided in the next and final remark.

</details>

<details>
<summary> Key revelation via basic example: order of edge relaxation does not effect end result but completely determines intermediate results</summary>

As another comment mentions in the [previously linked](https://www.youtube.com/watch?v=lyw4FaxrwHg&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=21) video, let's consider the very basic linearly connected graph `0 -> 1 -> 2 -> 3`, where the source node is `0` and all edge weights are `1`. Such a graph may be represented in code with the following adjacency list:

```python
graph = {
    0: [(1, 1)],
    1: [(2, 1)],
    2: [(3, 1)],
    3: []
}
```

Since *the order of edge updates in Bellman-Ford is random*, let's consider what would happen in the worst possible case. For the first iteration, we would update the edge `0 -> 1` *at the end*; that is, let's purposely let the edge `0 -> 1` be the *last* edge we "randomly" update. For the graph `0 -> 1 -> 2 -> 3` with edge weights `1`, this means `0 -> 1` is the only edge whose relaxation/processing reduces the distances to a node (i.e., the distance to node `1` is now `1` instead of infinity). Similarly, for iterations 2 and 3 we update `1 -> 2` and `2 -> 3` at the end:

```python
[0, inf, inf, inf] # after iteration 0 (initial distances array)
[0,   1, inf, inf] # after iteration 1
[0,   1,   2, inf] # after iteration 2
[0,   1,   2,   3] # after iteration 3 (|V| - 1 iterations with no negative cycle)
```

Hence, in the worst case, it can take $|V| - 1$ iterations to propagate the edge weights appropriately. Let's test our template code with this basic graph. If we run the same template code that we ran for the examples in DPV and CLRS, then we get the following:

```python
[0, inf, inf, inf]  # after iteration 0 (initial distances array)
[0,   1    2,   3]  # after iteration 1
[0,   1    2,   3]  # after iteration 2 (no edges updated, terminate early)
```

What's going on? Why aren't we getting the results discussed above? Because the results discussed above were in the *worst case*, where we purposely delayed processing the edge connected to the source node until the end. Let's examine the template code:

```python
def bellman_ford(graph, start):
    n = len(graph)
    distances = [float('inf')] * n
    distances[start] = 0
    predecessors = [None] * n
    
    for _ in range(n - 1):
        edge_updated = False
        #highlight-error-next-line
        for node in range(n):
            for neighbor, weight in graph[node]:
                if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                    edge_updated = True
                    distances[neighbor] = distances[node] + weight
                    predecessors[neighbor] = node
        
        print(distances)
        
        if not edge_updated:
            return distances, predecessors
    
    for node in range(n):
        for neighbor, weight in graph[node]:
            if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                return False
            
    return distances, predecessors
```

The highlighted line `for node in range(n):` ensures we always start edge relaxations from the node with label `0`, whether or not that node is the source node. Recall the edge labeling from the CLRS example:

```python
[
  (t, x), (t, y), (t, z), # t: 0
  (x, t),                 # x: 1
  (y, x), (y, z),         # y: 2
  (z, x), (z, s),         # z: 3
  #highlight-success-next-line
  (s, t), (s, y)          # s: 4
]
```

Note how the source node, highlighted above, has a node label of `4`. This means that all edges connected to the source update *at the end* when `for node in range(n):` fires. Hence, the only edges relaxed in a meaningful way after the first iteration are those directly connected with the source node.

What if we changed the highlighted line `for node in range(n):` to `for node in [3, 2, 1, 0]:` for the basic graph example? Then all edges directly connected to the source node are processed *last*. We're basically customizing our template to be as inefficient as possible so as to show how we can ensure the maximum number of iterations occur. And, sure enough, running the template code with this modification results in exactly what we discussed for the worst case scenario:

```python
[0, inf, inf, inf] # after iteration 0 (initial distances array)
[0,   1, inf, inf] # after iteration 1
[0,   1,   2, inf] # after iteration 2
[0,   1,   2,   3] # after iteration 3 (|V| - 1 iterations with no negative cycle)
```

</details>

<details>
<summary> Using the key revelation to better understand the DPV example</summary>

Let's return to the DPV example that started all of this:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f11.png').default} />
</div>

Running our template code resulted in the following:

```python
#  S    A     B     C     D     E     F     G
[  0,  inf,  inf,  inf,  inf,  inf,  inf,  inf  ]   # after iteration 0 (initial distances array)
[  0,   10,   10,  inf,  inf,   12,    9,    8  ]   # after iteration 1
[  0,    5,   10,   11,   14,    8,    9,    8  ]   # after iteration 2
[  0,    5,    5,   11,   14,    7,    9,    8  ]   # after iteration 3
[  0,    5,    5,    6,    9,    7,    9,    8  ]   # after iteration 4
[  0,    5,    5,    6,    9,    7,    9,    8  ]   # after iteration 5 (no edges updated, terminate early)
```

The end result was the same as that in the figure, but the intermediate results were very different. The "key revelation" discussion in the previous widget explains why. The line `for node in range(n):` in the main loop of our template code ensured we *started* by processing all edges directly connected to whatever node was labelled `0`. Of course, in this case, node `S`, the source node, was labelled as node `0`, which means all edges directly connected to the source node were the first ones to be meaningfully relaxed. This efficiency would usually be considered a good thing. But not when we're trying to better understand an example! 

CLRS gave us the exact order in which edges were processed, making it clear they were trying to be as inefficient as possible in order to highlight when $|V|-1$ iterations could be necessary. Similarly, if we intentionally process the edges connected to the source node *last*, then maybe we can go about reproducing the table provided in DPV, where $|V|-1 = 8-1 = 7$ iterations are necessary to get the final `distances` array.

After some tinkering, we discover that if we replace the line `for node in range(n):` in the main loop with `for node in [4, 3, 2, 5, 1, 6, 7, 0]:`, then we end up reproducing the table of results provided in the DPV example:

```python
#  S    A     B     C     D     E     F     G
[  0,  inf,  inf,  inf,  inf,  inf,  inf,  inf  ]   # after iteration 0 (initial distances array)
[  0,  10,   inf,  inf,  inf,  inf,  inf,    8  ]   # after iteration 1
[  0,  10,   inf,  inf,  inf,   12,    9,    8  ]   # after iteration 2
[  0,   5,    10,  inf,  inf,    8,    9,    8  ]   # after iteration 3
[  0,   5,     6,   11,  inf,    7,    9,    8  ]   # after iteration 4
[  0,   5,     5,    7,   14,    7,    9,    8  ]   # after iteration 5
[  0,   5,     5,    6,   10,    7,    9,    8  ]   # after iteration 6
[  0,   5,     5,    6,    9,    7,    9,    8  ]   # after iteration 7 (|V| - 1 iterations with no negative cycle)
```

What's the exact order in which the edges were processed? Since the letter-number mapping for the nodes in this example is

```
 D, C, B, E, A, F, G, S
[4, 3, 2, 5, 1, 6, 7, 0]
```

we can use the adjacency list representation of the graph 

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

to fully specify the order in which edges are relaxed for each iteration:

```python
#   D, C, B, E, A, F, G, S
#  [4, 3, 2, 5, 1, 6, 7, 0]

[
  (D, E),         # D-connected edges
  (C, D),         # C-connected edges
  (B, A), (B, C), # B-connected edges
  (E, B),         # E-connected edges
  (A, E),         # A-connected edges
  (F, A), (F, E), # F-connected edges
  (G, F),         # G-connected edges
  (S, A), (S, G)  # S-connected edges
]
```

As has been thoroughly demonstrated by now, the order in which edges are processed does not matter in terms of the end result, but the order completely determines the intermediate results of the `distances` array.

</details>