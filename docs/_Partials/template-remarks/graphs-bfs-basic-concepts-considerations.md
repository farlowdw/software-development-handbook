import BibRef from '@site/src/components/BibRef';

The following observations are largely derived from [this video](https://www.youtube.com/watch?v=ls4cHglfc0g&list=PLSVu1-lON6LxCmXNMfZBq7bdMAvUf3Sc7&index=3). The underlying graph referred to for the rest of this note is assumed to be represented as an adjacency list of index arrays.

The basic idea behind BFS is that you have a starting vertex and you explore vertices in order of how many links they are away from it: first explore the starting vertex, then all vertices one link away (i.e., incident edges involving the start vertex and its immediate neighbors), then all vertices two links away, and so forth, until you explore all vertices *reachable* from the start vertex. That's it. We can go ahead and come up with some basic pseudocode to model how we might do this.

```a title="Basic implementation of BFS"
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

Running the algorithm above implies a specific "breadth first search tree". The root is the start node, and if one node discovers another node (i.e., `u -> v`), then it's that node's parent in the tree (i.e., `u` is considered to be `v`'s parent in the tree). We can imagine that, for the same graph, we could get a different breadth first search tree based on whatever node we picked as the start node (it can get even wilder if we pick *several* start nodes, something that happens when executing a *multi-source* BFS).

A more detailed implementation of BFS would be as follows, where we not only create the breadth first search tree but also store the number of links needed to reach each vertex.

```a title="Full implementation of BFS"
ResetGraph()
  for v in V
    v.discovered = False
    #highlight-start
    v.dist = +inf
    v.pi = nil
    #highlight-end

BFS(startVertex)
  ResetGraph()
  startVertex.discovered = True
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

Of course, for the scheme above to work, assume there's space to store extra information with each vertex, `v`, namely the distance needed to reach the vertex as well as well as the predecessor parent for that vertex, `v.dist` and `v.pi`, respectively. This information can be associated with the vertex itself so that we end up representing a vertex basically as a list, where each slot represents, say, the vertex index, the distance to that vertex, and then the predecessor for that vertex: `[v_index, v_dist, v_pred]`. These items then get enqueued, dequeued, and updated accordingly. But it's more common to leave the vertex indices to themselves and to instead initialize `dist` and `pred` arrays of length `n`, where `n` represents the total number of vertices in the graph (remember we're assuming the underlying graph is an adjacency list of index arrays, where nodes are labeled according to their index).

Certainly an observation worth making is that vertices with a smaller distance value must be dequeued and processed before any vertex with a greater distance value is dequeued and processed. Predecessor values are recorded in part to aid in the process of potentially reconstructing the *shortest path* from the start vertex to one of its *reachable* vertices. 

<details>
<summary> Reconstructing the shortest path</summary>

This can be done recursively as follows:

```a title="Reconstruct shortest path from start vertex to target vertex (recursive)"
FindPath(s, t)
  if (s == t)
    return new List().add(t)
  if (t.pi == nil) # no path exists
    return nil
  return FindPath(s, t.pi).add(t)
```

Or iteratively (perhaps more intuitively), where the implementation below assumes we've maintained a `pred` array where `pred[x]` houses the predecessor for node `x` if it exists or is `-1` otherwise:

```a title="Reconstruct shortest path from start vertex to target vertex (iterative)"
ReconstructPath(s, t, pred)
  path = new Stack()
  path.push(t)
  while path.peek() != s:
    if pred[path.peek()] == -1:
      return None # no path exists from s to t
    path.push(pred[path.peek()])
  reverse path # obtain original path direction from s to t
  return path
```

In CLRS (i.e., <BibRef id='TC2022' pages='p. 562'></BibRef>), the `PrintPath` procedure is provided to simply print the path from the vertex `s` to the vertex `v` (i.e., as opposed to really reconstructing the path):

```a title="PrintPath procedure from CLRS to reconstruct shortest path"
PrintPath(G, s, v)
  if v == s:
    print s
  else if v.pi == nil:
    print "no path from" s "to" v "exists
  else PrintPath(G, s, v.pi)
    print v
```

We can use Python to actually implement the `PrintPath` procedure but in a way where we actually obtain the path:

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

```python title="Recursively reconstruct shortest path (Python)"
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

</details>

If we look at CLRS, we will note that there's only a minor change from the "full implementation" algorithm above and how it appears in CLRS: instead of marking vertices as discovered or undiscovered, they use three colors:

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