William Fiset's [YouTube video](https://www.youtube.com/watch?v=pSqmAO-m7Lk&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=18) on Dijkstra is a gem and well worth watching.

Interviewing IO fruitfully compares BFS to Dijkstra and highlights the differences and explains the motivation (paraphrasing to follow): BFS is easier than Dijkstra because we encounter the nodes ordered by distance (with BFS, it's as if we have a weighted graph where all edge weights equal `1`). Hence, in BFS, we assign the correct distance to nodes *as soon as we reach them for the first time* (as a neighbor of the current node), and this happens when we *add* them to the queue. Thus, in BFS, every node in the queue already has the correct shortest distance. This is **not** the case in Dijkstra; specifically, especially in the case of lazy Dijkstra, which is the approach most people use, we may find some initial path to a node and later on find a shorter path.

<details>
<summary> Concrete example of how we can find some initial path to a node and later on find a shorter path</summary>

The following screenshot is from William Fiset's linked video above (at 7:21):

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/graphs/f8.png').default} />
</div>

The small graph example above shows there are two ways to get from node `0` (the source node) to node `1`:

- `0 -> 1`: Distance of `4`
- `0 -> 2 -> 1`: Distance of `1 + 2 = 3`

The second path is shorter even though there are more edges. Why does this matter? Because of how the priority queue is being used and maintained. Specifically, we add `(0, 0)` as the first element to the priority queue to indicate that we plan to visit node `0` with a best distance of `0`. Then the algorithm actually starts and we look inside the priority queue for the first time and discover we should visit node `0`. What nodes should we visit after visiting node `0`? As with BFS and DFS, Dijkstra is a *search* algorithm; specifically, Dijkstra is a search algorithm for the shortest path to each node in a graph from a given source node &#8212; we conduct our search by visiting *neighbors*; that is, we will next want to visit either node `1` or node `2`, with new best distances `4` and `1`, respectively (both of these distances are significantly less than infinity!).

At this point, we've visited all the nodes from node `0`. Our priority queue started with just the lone element `(0, 0)`, which we poppped from the priority queue in order to visit all neighboring nodes to node `0`. We visited nodes `1` and `2` in the process, adding `(1, 4)` and `(2, 1)` to the priority queue, respectively. We're now done visiting all neighbors of node `0` so which node should we visit next?

**Dijkstra's algorithm always selects the next most promising node in the priority queue.** To do this, simply poll the next best key-value pair from the priority queue, which is `(2, 1)` in this case because the distance `1` in `(2, 1)` is less than the distance `4` in `(1, 4)`. So we pop `(2, 1)` from the priority queue and plan to visit the neighboring nodes to node `2`, namely the nodes `1` and `3`. At this point, our priority queue looks something like the following:

<pre>
&nbsp;&nbsp;&nbsp;<s>(0, 0)</s>
&nbsp;&nbsp;&nbsp;(1, 4)
-> (2, 1)
&nbsp;&nbsp;&nbsp;(1, 3)
&nbsp;&nbsp;&nbsp;(3, 6)
</pre>

The tuple <code><s>(0, 0)</s></code> indicates that node `0` has been fully processed. We've also updated the distance array for its neighboring nodes as we've added them to the priority queue. Then we popped `(2, 1)` from the priority queue as it was the most promising node; the indicator `-> (2, 1)` means node `2` is currently being processed. In the midst of processing node 2, we've added tuples `(1, 3)` and `(3, 6)` to the priority queue, and we've updated the distances array as well, which currently looks like the following:

``` 
      0  1  2  3   4    # <- node index
    [ 0, 3, 1, 6, inf ] # <- distances
```

Now node `2` has been fully processed and our priority queue looks as follows:

<pre>
&nbsp;&nbsp;&nbsp;<s>(0, 0)</s>
&nbsp;&nbsp;&nbsp;(1, 4)
&nbsp;&nbsp;&nbsp;<s>(2, 1)</s>
-> (1, 3)
&nbsp;&nbsp;&nbsp;(3, 6)
</pre>

This means the next most promising node is node `1`. From node `1`, we can visit node `3` for a cumulative distance of `4` from the source node; hence, we add `(3, 4)` to the priority queue, and then we mark `(1, 3)` as processed:

<pre>
&nbsp;&nbsp;&nbsp;<s>(0, 0)</s>
&nbsp;&nbsp;&nbsp;(1, 4)
&nbsp;&nbsp;&nbsp;<s>(2, 1)</s>
&nbsp;&nbsp;&nbsp;<s>(1, 3)</s>
&nbsp;&nbsp;&nbsp;(3, 6)
&nbsp;&nbsp;&nbsp;(3, 4)
</pre>

What node is most promising in the priority queue now? It's `(1, 4)`. But we have already found a better route to get to node `1` since `distances[1]` has a value of `3`, which is less than `4`. Hence, *we can ignore this entry in the priority queue*.

This example above shows exactly how we can find some initial path to a node (`0 -> 1`) and later on find a shorter path (`0 -> 2 -> 1`). Dijkstra is all about the shortest path being found to a node once that node has been **extracted** from the priority queue *for the first time* (e.g., `(1, 3)` was extracted from the priority queue *first*, and then `(1, 4)` was extracted and ignored).

</details>

In Dijkstra, we do not know the real shortest distance to a node until it is **extracted** from the priority queue, not when it is simply added to the priority queue (as illustrated in the concrete example above).

In eager Dijkstra, we update the priority (i.e., distance) of the nodes in the priority queue when we find a shorter path. In lazy Dijkstra, we simply add the node again with the new priority without removing the previous occurrence of that node in the PQ. Hence, in lazy Dijkstra, nodes can appear multiple times in the priority queue with different priorities. *This is not a problem.* Why? Because **we only care about the first time we extract a node** from the priority queue. That first time gives us the shortest distance from the source node to the node just popped from the priority queue. The second time (and any subsequent times) the same node is popped from the priority queue, we simply discard the node as soon as we extract it by means of the following lines from the template:

```python
# ...
curr_dist, node = heapq.heappop(min_heap)
#highlight-start
if curr_dist > distances[node]:
    continue   
#highlight-end
# ...
```