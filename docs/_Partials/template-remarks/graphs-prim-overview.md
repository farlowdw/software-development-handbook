import BibRef from '@site/src/components/BibRef';

First recall the general greedy schema used by any MST algorithm:

```
X = { }  (edges picked so far)
repeat until |X| = |V| - 1:
  pick a set S ⊂ V for which X has no edges between S and V − S
  let e ∈ E be the minimum-weight edge between S and V − S
  X = X ∪ {e}
```

Prim's algorithm is probably the most popular algorithm for finding MSTs because of its intuitive nature, where, as noted in <BibRef id='DPV' pages='137'></BibRef>, the intermediate set of edges $X$ always forms a subtree, and the set $S$ is chosen to be the set of this tree's vertices.

On each iteration, the subtree defined by $X$ *grows* by one edge, namely the lightest edge between a vertex $S$ and a vertex outside $S$ (the edges $X$ form a tree, and $S$ consists of its vertices): 

<div align='center' className='centeredImageDiv'>
  <img width='325px' src={require('@site/static/img/templates/graphs/f23.png').default} />
</div>

We can equivalently think of $S$ as growing to include the vertex $v\not\in S$ of smallest `cost`:

$$
\texttt{cost}(v) = \min_{u\in S} w(u, v)
$$

This is strongly reminiscent of Dijkstra's algorithm. In fact the pseudocode is almost identical. The only difference is in the key values by which the priority queue is ordered:

- In Prim's algorithm, the value of a node is the weight of the lightest incoming edge from set $S$
- In Dijkstra's algorithm, the value of a node is the length of an entire path to that node from the starting point. 

Nonetheless, the two algorithms are similar enough that they have the same running time, which depends on the particular priority queue implementation. It's worth noting that the final MST produced by Prim's algorithm is completely specified by the predecessors array.