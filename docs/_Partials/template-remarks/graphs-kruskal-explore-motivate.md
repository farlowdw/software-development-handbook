import BibRef from '@site/src/components/BibRef';

Kruskal's algorithm for finding an MST is generally regarded as not being as popular as Prim's algorithm, but this is not due to the fact that Kruskal's algorithm itself is more complicated than Prim's algorithm. In fact, Kruskal's algorithm is arguably more *intuitive* than Prim's algorithm &#8212; the chief difficulty with Kruskal's algorithm is not the algorithm itself but the complexity involved in coding up an efficient version of the union-find data structure on which the algorithm relies. A potential sticking point for some people is that most programming languages do not come with a union-find data structure out of the box whereas some languages come with built-in support for a minimum priority queue (e.g., Python).

In <BibRef id='DPV' pages='pp. 127-137'>commentary</BibRef>, the famous DPV textbook, MSTs are used to introduce greedy algorithms, and Kruskal's algorithm is used as the vehicle for first understanding how to construct an MST, where we quickly discover we need a data structure capable of efficiently supporting the operations needed in Kruskal's algorithm &#8212; the authors essentially motivate the development of the union-find data structure in the context of fleshing out what Kruskal's algorithm should look like. What follows is largely from DPV (but is presented in a manner so as to be self-contained in the context of the templates and remarks on this page).

---

A game like chess can be won only by *thinking ahead*: a player who is focused entirely on immediate advantage is easy to defeat. But in many other games, such as Scrabble, it is possible to do quite well by simply making whichever move seems best at the moment and not worrying too much about future consequences.

This sort ofmyopic behavior is easy and convenient, making it an attractive algorithmic strategy. *Greedy* algorithms build up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. Although such an approach can be disastrous for some computational tasks, there are many for which it is optimal. Our first example is that of minimum spanning trees.

Suppose you are asked to network a collection of computers by linking selected pairs of them. This translates into a graph problem in which nodes are computers, undirected edges are potential links, and the goal is to pick enough of these edges that the nodes are connected. But this is not all; each link also has a maintenance cost, reflected in that edge's weight. What is the cheapest possible network?

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f16.png').default} />
</div>

One immediate observation is that the optimal set of edges cannot contain a cycle, because removing an edge from this cycle would reduce the cost without compromising connectivity:

> **Property 1:** Removing a cycle edge cannot disconnect a graph.

So the solution must be connected and acyclic: undirected graphs of this kind are called *trees*. 

<details>
<summary> Trees (three additional properties)</summary>

A *tree* is an undirected graph that is connected and acyclic. Much of what makes trees so useful is the simplicity of their structure. For instance,

> **Property 2:** A tree on $n$ nodes has $n − 1$ edges.

This can be seen by building the tree one edge at a time, starting from an empty graph. Initially each of the $n$ nodes is disconnected from the others, in a connected component by itself. As edges are added, these components merge. Since each edge unites two different components, exactly $n − 1$ edges are added by the time the tree is fully formed.

In a little more detail: When a particular edge $\{u, v\}$ comes up, we can be sure that $u$ and $v$ lie in separate connected components, for otherwise there would already be a path between them and this edge would create a cycle. Adding the edge then merges these two components, thereby reducing the total number of connected components by one. Over the course of this incremental process, the number of components decreases from $n$ to one, meaning that $n − 1$ edges must have been added along the way.

The converse is also true.

> **Property 3:** Any connected, undirected graph $G = (V, E)$ with $|E| = |V| - 1$ is a tree.

We just need to show that $G$ is acyclic. One way to do this is to run the following iterative procedure on it: while the graph contains a cycle, remove one edge from this cycle. The process terminates with some graph $G' = (V, E')$, $E'\subseteq E$, which is acyclic and, by Property 1, is also connected. Therefore $G'$ is a tree, whereupon $|E'| = |V| - 1$ by Property 2. So $E' = E$, no edges were removed, and $G$ was acyclic to start with.

In other words, we can tell whether a connected graph is a tree just by counting how many edges it has. Here's another characterization.

> **Property 4:** An undirected graph is a tree if and only if there is a unique path between any pair of nodes.

In a tree, any two nodes can only have one path between them; for if there were two paths, the union of these paths would contain a cycle.

On the other hand, if a graph has a path between any two nodes, then it is connected. If these paths are unique, then the graph is also acyclic (since a cycle has two paths between any pair of nodes).

</details>

The particular tree we want is the one with minimum total weight, known as the *minimum spanning tree*. Here is its formal definition.

> **MST Definition**
>
> *Input:* An undirected graph $G=(V,E)$; edge weights $w_e$.
>
> *Output:* A tree $T = (V, E')$, with $E'\subseteq E$, that minimizes $\displaystyle \text{weight}{(T)} = \sum_{e\in E'} w_e$.

In the preceding example, the minimum spanning tree has a cost of 16:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f17.png').default} />
</div>

However, this is not the only optimal solution. Can you spot another? (Yes: Delete the edge $(B, D)$ and replace it with the edge $(A, B)$ of equivalent value.)

Kruskal's minimum spanning tree algorithm starts with the empty graph and then selects edges from $E$ according to the following rule.

> *Repeatedly add the next lightest edge that doesn't produce a cycle.*

In other words, it constructs the tree edge by edge and, apart from taking care to avoid cycles, simply picks whichever edge is cheapest at the moment. This is a *greedy* algorithm: every decision it makes is the one with the most obvious immediate advantage.

The following figure shows an example:

<div align='center' className='centeredImageDiv'>
  <img width='650px' src={require('@site/static/img/templates/graphs/f24.png').default} />
</div>

We start with an empty graph and then attempt to add edges in increasing order of weight (ties are broken arbitrarily):

$$
B − C, C − D, B − D, C − F , D − F , E − F , A − D, A − B, C − E , A − C.
$$

The first two succeed, but the third, $B − D$, would produce a cycle if added. So we ignore it and move along. The final result is a tree with cost 14, the minimum possible.

The correctness of Kruskal's method follows from a certain *cut property* [discussed in detail under the template for Prim's algorithm], which is general enough to also justify a whole slew of other minimum spanning tree algorithms.

For Kruskal's algorithm, at any given moment, the edges it has already chosen form a partial solution, a collection of connected components each of which has a tree structure. The next edge $e$ to be added connects two of these components; call them $T_1$ and $T_2$. Since $e$ is the lightest edge that doesn't produce a cycle, it is certain to be the lightest edge between $T_1$ and $V − T_1$ and therefore satisfies the cut property.

Now we fill in some implementation details. At each stage, the algorithm chooses an edge to add to its current partial solution. To do so, it needs to test each candidate edge $u − v$ to see whether the endpoints $u$ and $v$ lie in different components; otherwise the edge produces a cycle. And once an edge is chosen, the corresponding components need to be merged. What kind of data structure supports such operations?

We will model the algorithm's state as a collection of *disjoint sets*, each of which contains the nodes of a particular component. Initially each node is in a component by itself:

- `makeset(x)`: create a singleton set containing just `x`.

We repeatedly test pairs of nodes to see if they belong to the same set.

- `find(x)`: to which set does `x` belong?

And whenever we add an edge, we are merging two components.

- `union(x, y)`: merge the sets containing `x` and `y`.

The final algorithm is shown below:

```
PROCEDURE KRUSKAL (G, w)
Input: A connected undirected graph G = (V, E) with edge weights w_e
Output: A minimum spanning tree defined by the edges X

for all u in V:
  makeset(u)

X = {}
sort the edges E by weight
for all edges {u, v} in E, in increasing order of weight:
  if find(u) != find(v):
    add edge {u, v} to X
    union(u, v)
```

It uses $|V|$ `makeset`, $2|E|$ `find`, and $|V| − 1$ `union` operations.

<details>
<summary> A data structure for disjoint sets (union-find, union by rank)</summary>

**Note:** What follows is an alternative description for how to come up with the union-find data structure in the context of trying to implement Kruskal's algorithm. It may be beneficial to look at the template on this page for the union-find data structure and how to invent it yourself before trying to fully follow the discussion below.

**Union by rank:**

One way to store a set is as a directed tree (the figure below is a directed-tree representation of two sets $\{B, E\}$ and $\{A,C,D,F,G,H\}$):

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/templates/graphs/f25.png').default} />
</div>

Nodes of the tree are elements of the set, arranged in no particular order, and each has parent pointers that eventually lead up to the root of the tree. This root element is a convenient *representative*, or *name*, for the set. It is distinguished from the other elements by the fact that its parent pointer is a self-loop.

In addition to a parent pointer $\pi$, each node also has a *rank* that, for the time being, should be interpreted as the height of the subtree hanging from that node.

```
PROCEDURE MAKESET(x)
pi(x) = x
rank(x) = 0

FUNCTION FIND(x)
while x != pi(x):
  x = pi(x)
return x
```

As can be expected, `makeset` is a constant-time operation. On the other hand, `find` follows parent pointers to the root of the tree and therefore takes time proportional to the height of the tree. The tree actually gets built via the third operation, `union`, and so we must make sure that this procedure keeps trees shallow.

Merging two sets is easy: make the root of one point to the root of the other. But we have a choice here. If the representatives (roots) of the sets are $r_x$ and $r_y$, do we make $r_x$ point to $r_y$ or the other way around? Since tree height is the main impediment to computational efficiency, a good strategy is to *make the root of the shorter tree point to the root of the taller tree*. This way, the overall height increases only if the two trees being merged are equally tall. Instead of explicitly computing heights of trees, we will use the `rank` numbers of their root nodes &#8212; which is why this scheme is called *union by rank*.

```
PROCEDURE UNION(x,y)
r_x = find(x)
r_y = find(y)
if r_x = r_y: return
if rank(r_x) > rank(r_y):
  pi(r_y) = r_x
else:
  pi(r_x) = r_y
  if rank(r_x) = rank(r_y): 
    rank(r_y) = rank(r_y) + 1
```

The figure below illustrates this procedure (a sequence of disjoint-set operations, where superscripts denote rank):

<div align='center' className='centeredImageDiv'>
  <img width='650px' src={require('@site/static/img/templates/graphs/f26.png').default} />
</div>

By design, the *rank* of a node is exactly the height of the subtree rooted at that node. This means, for instance, that as you move up a path toward a root node, the *rank* values along the way are strictly increasing.

> **Property 1:** For any $x\neq\pi(x)$, $\text{rank}(x) < \text{rank}(\pi(x))$.

A root node with rank $k$ is created by the merger of two trees with roots of rank $k−1$. It follows by induction (try it!) that

> **Property 2:** Any root node of rank $k$ has at least $2^k$ nodes in its tree.

This extends to internal (nonroot) nodes as well: a node of rank $k$ has at least $2^k$ descendants. After all, any internal node was once a root, and neither its rank nor its set of descendants has changed since then. Moreover, different rank-$k$ nodes cannot have common descendants, since by Property 1 any element has at most one ancestor of rank $k$. Which means

> **Property 3:** If there are $n$ elements overall, there can be at most $n/2^k$ nodes of rank $k$.

This last observation implies, crucially, that the maximum rank is $\log n$. Therefore, all the trees have $\text{height}\leq\log n$, and this is an upper bound on the running time of `find` and `union`.

**Path compression:** 

With the data structure as presented so far, the total time for Kruskal's algorithm becomes $O(|E|\log |V|)$ for sorting the edges (remember, $\log |E|\approx\log |V|$) plus another $O(|E|\log |V|)$ for the `union` and `find` operations that dominate the rest of the algorithm. So there seems to be little incentive to make our data structure any more efficient.

But what if the edges are given to us sorted? Or if the weights are small (say, $O(|E|)$) so that sorting can be done in linear time? Then the data structure part becomes the bottleneck, and it is useful to think about improving its performance beyond $\log n$ per operation. As it turns out, the improved data structure is useful in many other applications.

But how can we perform `union`'s and `find`'s faster than $\log n$? The answer is, by
being a little more careful to maintain our data structure in good shape. As any
housekeeper knows, a little extra effort put into routine maintenance can pay off
handsomely in the long run, by forestalling major calamities. We have in mind a
particular maintenance operation for our union-find data structure, intended to keep
the trees short &#8212; during each `find`, when a series of parent pointers is followed up
to the root of a tree, we will change all these pointers so that they point directly
to the root (the figure shows the effect of path compression, where `find(I)` is followed by `find(K)`):

<div align='center' className='centeredImageDiv'>
  <img width='650px' src={require('@site/static/img/templates/graphs/f27.png').default} />
</div>

This *path compression* heuristic only slightly increases the time needed for a `find` and is easy to code.

```
FUNCTION FIND(x)
if x != pi(x):
  pi(x) = find(pi(x))
return pi(x)
```

The benefit of this simple alteration is long-term rather than instantaneous and thus necessitates a particular kind of analysis: we need to look at *sequences* of `find` and `union` operations, starting from an empty data structure, and determine the average time per operation. This *amortized cost* turns out to be just barely more than $O(1)$, down from the earlier $O(\log n)$.

Think of the data structure as having a "top level" consisting of the root nodes, and below it, the insides of the trees. There is a division of labor: `find` operations (with or without path compression) only touch the insides of trees, whereas `union`'s only look at the top level. Thus path compression has no effect on union operations and leaves the top level unchanged.

We now know that the ranks of root nodes are unaltered, but what about *nonroot* nodes? The key point here is that once a node ceases to be a root, it never resurfaces, and its rank is forever fixed. Therefore the ranks of all nodes are unchanged by path compression, even though these numbers can no longer be interpreted as tree heights. In particular, properties 1–3 (concerning trees) still hold.

</details>

We can test our template on the graph provided before the pseudocode for Kruskal's algorithm:

```python
def kruskal(graph, num_vertices):
    # ...

graph = [
    [1, 2, 1], # B - C (1)
    [2, 3, 2], # C - D (2)
    [1, 3, 2], # B - D (2)
    [2, 5, 3], # C - F (3)
    [3, 5, 4], # D - F (4)
    [4, 5, 4], # E - F (4)
    [0, 3, 4], # A - D (4)
    [0, 1, 5], # A - B (5)
    [2, 4, 5], # C - E (5)
    [0, 2, 6], # A - C (6)
]

kruskal(graph, 6)   # (14, [(1, 2), (2, 3), (2, 5), (4, 5), (0, 3)])
                    #      [(B, C), (C, D), (C, F), (E, F), (A, D)]
```

The final edge list returned, namely `[(B, C), (C, D), (C, F), (E, F), (A, D)]`, *is* the MST, and this confirms the MST shown in the picture.