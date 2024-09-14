import BibRef from '@site/src/components/BibRef';

Before stating the cut property and working out an example or two of how that property is crucial for finding minimum spanning trees (MSTs), we should start by providing two definitions, namely what MSTs and "cuts" actually are.

First, a more formal [MST](https://en.wikipedia.org/wiki/Minimum_spanning_tree) definition from <BibRef id='DPV' pages='p. 128'></BibRef>:

> **MST Definition**
>
> *Input:* An undirected graph $G=(V,E)$; edge weights $w_e$.
>
> *Output:* A tree $T = (V, E')$, with $E'\subseteq E$, that minimizes $\displaystyle \text{weight}{(T)} = \sum_{e\in E'} w_e$.

Second, a [cut](https://en.wikipedia.org/wiki/Cut_(graph_theory)) definition from Wiki:

> **Cut Definition**
>
> In graph theory, a *cut* is a partition of the vertices of a graph into two disjoint subsets. Any cut determines a *cut-set*, the set of edges that have one endpoint in each subset of the partition. These edges are said to *cross* the cut. In a connected graph, each cut-set determines a unique cut, and in some cases cuts are identified with their cut-sets rather than with their vertex partitions.
>
> More formally, a cut $C = (S, T)$ is a partition of $V$ of a graph $G = (V, E)$ into two subsets $S$ and $T$. The cut-set of a cut $C = (S, T)$ is the set $\{ (u,v)\in E\mid u\in S, v\in T \} of edges that have one endpoint in $S$ and the other endpoint in $T$. If $s$ and $t$ are specified vertices of the graph $G$, then an $s$–$t$ cut is a cut in which $s$ belongs to the set $S$ and $t$ belongs to the set $T$.
>
> *Note:* If $V$ is partitioned into two disjoint subsets, then if $S$ is one subset, then $V - S$ must be the other subset. For this reason, it is common to see the set $T$ referred to above as $V - S$ since $T = V - S$. 

Now we can effectively state the *cut property*. The [Wiki](https://en.wikipedia.org/wiki/Minimum_spanning_tree#Cut_property) statement and subsequent succinct proof are quite nice:

> **Cut Property**
>
> For any cut $C$ of the graph, if the weight of an edge $e$ in the cut-set of $C$ is strictly smaller than the weights of all other edges of the cut-set of $C$, then this edge belongs to all MSTs of the graph.
>
> *Proof:* Assume that there is an MST $T$ that does not contain $e$. Adding $e$ to $T$ will produce a cycle, that crosses the cut once at $e$ and crosses back at another edge $e'$. Deleting $e'$ we get a spanning tree $T\setminus\{e'\}\cup\{e\}$ of strictly smaller weight than $T$. This contradicts the assumption that $T$ was a MST.
>
> By a similar argument, if more than one edge is of minimum weight across a cut, then each such edge is contained in some minimum spanning tree.

A slightly different (but also) useful statement of the [cut property](https://en.wikipedia.org/wiki/Minimum_spanning_tree#Cut_property) is given in <BibRef id='DPV' pages='p. 130'></BibRef>:

> Suppose edges $X$ are part of a minimum spanning tree of $G = (V, E)$. Pick any subset of nodes $S$ for which $X$ does not cross between $S$ and $V − S$, and let $e$ be the lightest edge across this partition. Then $X\cup\{e\}$ is part of some MST.

With all of the necessary terminology in place, it may be fruitful to first consider a couple "cut" examples before remarking on why the cut property is the foundation of most MST algorithms.

<details>
<summary> Example 1</summary>

Consider the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f18.png').default} />
</div>

Now consider what happens when we make the following cut:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f19.png').default} />
</div>

We can immediately observe a few consequences:

- **Disjoint subsets:** $V$ has been partitioned into two disjoint subsets: $S = \{A, B, D, E\}$ and $V-S=\{C, F\}$.
- **Cut set:** The *cut set* induced by the cut is the set of edges $\{ (B,C), (E, C), (E, F) \}$. 
- **Cut property:** The *cut property* tells us that the lightest edge $e$ in the cut set must either be in 
  + *all* MSTs if $e$ is strictly less than all other edges in the cut set or
  + *some* MST if $e$ is not strictly less than all other edges in the cut set

For the example graph above, the edges $(B,C), (E, C), (E, F)$ in the cut set have weights $6$, $5$, and $4$, respectively. Since $(E, F)$ weighs strictly less than all other edges in the cut set, then $(E, F)$ must be in all MSTs of the graph (there's just a single MST for the graph in this case).

</details>

<details>
<summary> Example 2</summary>

Consider the following graph:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f20.png').default} />
</div>

Now consider what happens when we make the following cut:

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f21.png').default} />
</div>

We can immediately observe a few consequences:

- **Disjoint subsets:** $V$ has been partitioned into two disjoint subsets: $S = \{A, C, B, D\}$ and $V-S=\{E, F\}$.
- **Cut set:** The *cut set* induced by the cut is the set of edges $\{ (C, E), (D, E), (D, F) \}$. 
- **Cut property:** The *cut property* tells us that the lightest edge $e$ in the cut set must either be in 
  + *all* MSTs if $e$ is strictly less than all other edges in the cut set or
  + *some* MST if $e$ is not strictly less than all other edges in the cut set

For the example graph above, the edges $(C, E), (D, E), (D, F)$ in the cut set have weights $3$, $3$, and $4$, respectively. Since $(C, E)$ and $(D, E)$ both weigh the lightest, this means each edge must be in *some* MST. We can see this if we produce the MSTs themselves:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/graphs/f22.png').default} />
</div>

</details>

In the most general of terms, the cut property tells us that any algorithm conforming to the following greedy schema is guaranteed to work in regards to producing an MST (notated $X$ in the snippet below):

```
X = { }  (edges picked so far)
repeat until |X| = |V| - 1:
  pick a set S ⊂ V for which X has no edges between S and V − S
  let e ∈ E be the minimum-weight edge between S and V − S
  X = X ∪ {e}
```

*All* of the well-known MST algorithms rely on the cut property in one way or another. They simply differ in *how* they use this property to produce an MST:

- [Prim's algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm): Builds the MST by starting from an arbitrary vertex and repeatedly adding the smallest edge that connects a vertex in the growing MST to a vertex outside it. (Data structure: usually a min heap)
- [Kruskal's algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm): Kruskal's algorithm constructs the MST by sorting all edges and adding them one by one, ensuring that no cycles are formed. (Data structure: union-find)
- [Borůvka's algorithm](https://en.wikipedia.org/wiki/Bor%C5%AFvka%27s_algorithm): Borůvka's algorithm builds the MST by repeatedly finding and adding the minimum-weight outgoing edge from each tree in the forest, effectively merging trees in phases. (Data structure: sometimes union-find but also simple structures like arrays and edge lists)
