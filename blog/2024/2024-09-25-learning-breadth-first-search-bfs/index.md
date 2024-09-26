---
title: Learning breadth-first search (BFS)
draft: false
description: This post explores how to effectively implement breadth-first search (BFS).
tags: 
  - Breadth-first search (DFS)
  - Data structures and algorithms
  - Tutorial
  - Template
keywords: 
  - leetcode
  - bfs
  - breadth-first search
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

Breadth-first search (BFS) on general graphs is conceptually simple and easy to implement, but it's worth understanding fully because several more advanced graph algorithms may be considered to be just minor modifications of BFS.

<!--truncate-->

## Helpful video in written form

:::info Attribution

The following observations are largely derived from [this video](https://www.youtube.com/watch?v=ls4cHglfc0g&list=PLSVu1-lON6LxCmXNMfZBq7bdMAvUf3Sc7&index=3). The underlying graph referred to for the rest of this section is assumed to be represented as an adjacency list of index arrays.

:::

### Basic idea

The basic idea behind BFS is that you have a starting vertex and you explore vertices in order of how many links they are away from it. First explore the starting vertex:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f1.png').default} />
</div>

Then all vertices one link away (i.e., incident edges involving the start vertex and its immediate neighbors):

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f2.png').default} />
</div>

Then all vertices two links away:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f3.png').default} />
</div>
 
And so forth, until you explore all vertices *reachable* from the start vertex:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f4.png').default} />
</div>

Above, each reachable vertex from the start vertex has an edge from the level above it but not from any higher reachable vertex. In this case, we have a couple of vertices that are not reachable from the start vertex, namely vertices `O` and `K`.

That's the whole concept. If we are looking for the shallowest of understanding, then we can stop there. For the first visualization above, we started with vertices already in a position to easily see how many links they are from the start vertex. This may be helpful for humans in terms of readability, but a computer graph model does not need well-chosen locations for vertices &#8212; they're just abstractly positioned. We can put them wherever we like to visualize how the BFS is working.

For our simple BFS implementation, suppose we put them in a more arbitrary position:

<div align='center' className='centeredImageDiv'>
  <img width='450px' src={require('./f5.png').default} />
</div>

Now it's hard to really see what's going on in terms of how many links away from the start vertex each vertex is. 

### Simple imlpementation

Like with most graph algorithms, assume that each vertex has some room in it that the algorithm can use to store information. At the very least, the algorithm needs to mark each vertex as discovered or not. 

- When the algorithm starts, we should initially mark all vertices as undiscovered (lines `1`-`3` in the pseudocode below).
- Next, mark the start vertex as discovered and push it into a first in first out queue (lines `7` and `9`, respectively). 
- After that, the algorithm is really just a simple loop. While the queue isn't empty (line `10`), dequeue a vertex (line `11`). For each of its outgoing edges (line `12`), if they go to an undiscovered neighbor (line `13`), then discover and enqueue the neighbor (lines `14` and `15`, respectively).

The outline above provides everything we need for a simple BFS implementation:

```a showLineNumbers
ResetGraph()
  for v in V
    v.discovered = False

BFS(startVertex)
  ResetGraph()
  startVertex.discovered = True
  Q = new Queue()
  Q.enqueue(startVertex)
  while(not Q.isEmpty())
    u = Q.dequeue()
    for each v such that u -> v
      if(not v.discovered)
        v.discovered = True
        Q.enqueue(v)
```

The only thing the simple implementation above accomplishes is to mark the vertices which are reachable from the start vertex. Running this algorithm implies a specific so-called "BFS tree": the root is the start node, and if one node `u` discovers another node `v`, then node `u` is node `v`'s parent in the BFS tree. For the same graph, we get a different BFS tree based on whatever node we pick as the start node. Things can get even wilder if we pick *several* start nodes, something that happens when executing a *multi-source* BFS.

### Full implementation

A more detailed implementation of BFS would be as follows, where we not only create the BFS tree but also store the number of links needed to reach each vertex.

```a showLineNumbers
ResetGraph()
  for v in V
    v.discovered = False
    #highlight-start
    v.dist = inf
    v.pi = nil
    #highlight-end

BFS(startVertex)
  ResetGraph()
  startVertex.discovered = True
  #highlight-next-line
  startVertex.dist = 0
  Q = new Queue()
  Q.enqueue(startVertex)
  while(not Q.isEmpty())
    u = Q.dequeue()
    for each v such that u -> v
      if(not v.discovered)
        v.discovered = True
        #highlight-start
        v.dist = u.dist + 1
        v.pi = u
        #highlight-end
        Q.enqueue(v)
```

Of course, for the scheme above to work, assume there's space to store extra information with each vertex, `v`, namely the distance needed to reach the vertex as well as well as the predecessor parent for that vertex, `v.dist` and `v.pi`, respectively (lines `4` and `5` above, respectively). This information can be associated with the vertex itself so that we end up representing a vertex basically as a list, where each slot represents, say, the vertex index, the distance to that vertex, and then the predecessor for that vertex: `[v_index, v_dist, v_pred]`. These items then get enqueued, dequeued, and updated accordingly. But it's more common to leave the vertex indices to themselves and to instead initialize `dist` and `pred` arrays both of length `n`, where `n` represents the total number of vertices in the graph (remember we're assuming the underlying graph is an adjacency list of index arrays, where nodes are labeled according to their index).

Certainly an observation worth making is that vertices with a smaller distance value must be dequeued and processed before any vertex with a greater distance value is dequeued and processed (this is a defining characteristic of BFS). Predecessor values are recorded in part to aid in the process of potentially reconstructing the *shortest path* from the start vertex to one of its *reachable* vertices.

### Queue observation

Take another look at our first example graph where we conducted a BFS:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f4.png').default} />
</div>

The start vertex is discoverd at zero links away from itself. Each subsequent time we discover a node, it gets discovered in one more link than the node that discovered it; hence, in the graph above, we see vertices `B`, `F`, `H`, `M`, and `N` are all `1` link away from the start vertex.

Notice that, as we continue visiting nodes, the queue only contains one or two different distances in it at a time. We will not add any distance `3` vertices (i.e., `J`) until we remove a distance `2` vertex from the queue, which only happens *after* all distance `1` vertices have been removed. As we continue processing nodes, we should indicate which node discovered it (line `19` in the pseudocode above). These values can be used to reconstruct shortest paths from the root to any vertex.

### Reconstructing shortest paths

#### Recursive pseudocode

Reconstructing the shortest path from the start vertex, `s`, to a target node, `t`, can be done recursively as follows:

```a showLineNumbers
FindPath(s, t)
  if (s == t)
    return new List().add(t)
  if (t.pi == nil) # no path exists
    return nil
  return FindPath(s, t.pi).add(t)
```

#### Iterative pseudocode

This can also be done iteratively (perhaps more intuitively), where the implementation below assumes we've maintained a `pred` array where `pred[x]` houses the predecessor for node `x` if it exists or is `-1` otherwise:

```a showLineNumbers
ReconstructPath(s, t, pred)
  path = new Stack()
  path.push(t)
  while path.peek() != s:
    if pred[path.peek()] == -1:
      return None                 # no path exists from s to t
    path.push(pred[path.peek()])
  reverse path                    # obtain original path direction from s to t
  return path
```

#### Python implementations

In CLRS (i.e., <BibRef id='TC2022' pages='p. 562'></BibRef>), the `PrintPath` procedure is provided to simply *print the path* from the vertex `s` to the vertex `v` (i.e., as opposed to really reconstructing the path):

```a
PrintPath(G, s, v)
  if v == s:
    print s
  else if v.pi == nil:
    print "no path from" s "to" v "exists
  else PrintPath(G, s, v.pi)
    print v
```

We can use Python to implement the `PrintPath` procedure but in a way where we actually obtain the shortest path in a recursive manner:

```python title="Recursively reconstruct shortest path (Python)"
def shortest_path(s, t, path, pred):
    if s == t:
        path.append(s)
        return path
    elif pred[t] == -1:
        return []  # shortest path from s to t does not exist
    else:
        path.append(t)
        return shortest_path(s, pred[t], path, pred)
```

In most cases, however, we would probably be more inclined to reconstruct the path in an *iterative* fashion, where the code is more readable and we avoid some of the overhead associated with recursion:

```python title="Iteratively reconstruct shortest path (Python)"
def shortest_path(s, t, pred):
    path = [t]
    while path[-1] != s:
        parent = pred[path[-1]]
        if parent == -1:
            return []  # shortest path from s to t does not exist
        path.append(parent)
    path.reverse()
    return path
```

### Cormen colors

If we look at <BibRef id='TC2022' pages='p. 556'></BibRef>, we will note that there's only a minor change from the "full implementation" algorithm above and how it appears in CLRS: instead of marking vertices as discovered or undiscovered, they use three colors:

- White: Undiscovered
- Gray: Discovered but not yet finished (i.e., when it's in the queue waiting to be dequeued)
- Black: Finished (i.e., dequeued and all unvisited child nodes enqueued)

That's it:

```a title="Full implementation of BFS (CLRS style)"
ResetGraph()
  for v in V
    #highlight-next-line
    v.color = White
    v.dist = +inf
    v.pi = nil

BFS(startVertex)
  ResetGraph()
  #highlight-next-line
  startVertex.color = Gray
  startVertex.dist = 0
  Q = new Queue()
  Q.enqueue(startVertex)
  while(not Q.isEmpty())
    u = Q.dequeue()
    for each v such that u -> v
      #highlight-start
      if(v.color == White)
        v.color = Gray
      #highlight-end
        v.dist = u.dist + 1
        v.pi = u
        Q.enqueue(v)
    #highlight-next-line
    u.color = Black
``` 

### Analysis

The initialization `ResetGraph` takes time linear in the number of vertices in the graph: $\Theta(|V|)$. After this, each *reachable* vertex can only be discovered and enqueued once. A vertex's outgoing edges only get explored whenm it's dequeued, which will also only happen once, and takes time proportional to the number of outgoing edges for that vertex (i.e., if we're using the adjacency list representation of a graph). 

If we let $V'$ and $E'$ be the sets of vertices and edges reachable from the start vertex, respectively, then we have the following:

- $\Theta(|V'|)$ vertices discovered, enqueued, and dequeued.
- $\Theta(|E'|)$ edges explored by dequeued vertices.

For an undirected graph, reachable edges can be explored once from each side, but that still gives us a total linear time in the number of reachable vertices and edges. Thus, the total runtime may be characterized more precisely as $\Theta(|V'| + |E'|)$ or less optimistically as $O(|V| + |E|)$.

### Handwavey correctness outline

If we really want to understand the correctness of BFS, then working out the details for ourselves will probably be our best bet. It't also not a bad idea to consult <BibRef id='TC2022' pages='pp. 554-563'></BibRef> or any other number of quality resources.

But let's give a thumbnail sketch. The first thing we need to know is what the BFS algorithm actually achieves. Informally, we have the following:

- For all vertices reachable from the start vertex:
  + Marks as discovered
  + Calculates minimum number of links from start vertex
  + Calculates predecessor on some minimum link path from start vertex (nil predecessor for start vertex)
- For vertices not reachable from the start vertex:
  + Marks as not discovered
  + Calculates distance as $\infty$
  + Gives nil predecessor

What does the algorithm do mechanically though? How does it operate? Here are a couple statements that can help:

- Set of vertices in $Q$ never has more than 2 distinct distances, one apart. Values enter and exit $Q$ in non-decreasing distance order. (To prove: induct on $Q$ contents.)
- All reachable vertices will be discovered, enqueued, marked with correct minimum link distances, and valid predecessor nodes (except the start vertex), which are never changed again. (To prove: Induction on edge count from start node).