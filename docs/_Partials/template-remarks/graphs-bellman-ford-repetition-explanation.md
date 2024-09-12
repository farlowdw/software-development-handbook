One of the better explanations for why exactly we do $|V| - 1$ iterations in the Bellman-Ford algorithm is given in a comment, by user `nmamano`, on [William Fiset's Bellman-Ford YouTube video](https://www.youtube.com/watch?v=lyw4FaxrwHg&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P&index=20), paraphrased and cleaned up a bit below.

To elaborate on why we do $|V|-1$ iterations, it comes from the following lemma: 

> If the shortest path from the source node to a node $v$ *ends* with the edge $u \to v$, and we already know the correct distance to $u$ (i.e., shortest distance from the source node to node $u$), and then we relax the edge $u \to v$, then we will find the correct distance to $v$. 

It may seem like a pretty obvious lemma, but the correctness of Bellman-Ford, Dijkstra, and topological sort are all based on it. The consequence of this lemma is that, in order to find the correct distance to a node $v$, we need to relax all the edges in the shortest path from the source to $v$ *IN ORDER*. 

Dijkstra and topological sort are efficient because we only relax the out-going edges from each node *after* we found the correct distance for that node, so we only need to relax the edges once. Unfortunately, the combination of cycles and negative edges makes it impossible to find a "good" order to relax the edges. Thus, Bellman-Ford just relaxes all the edges in an arbitrary order (this is one iteration of Bellman-Ford). 

- In the first iteration, we find the correct distance for all the nodes whose shortest paths from the source have 1 edge. 
- In the next iteration, we find the correct distances for all the nodes whose shortest paths from the source have 2 edges, and so on. 
- If the shortest path with the most edges has $k$ edges, then we need $k$ iterations of Bellman-Ford. Of course, we do not know what $k$ is in advance, but, since shortest paths never repeat nodes (assuming there are no negative cycles), then what we know for sure is that any shortest path will have at most $|V|-1$ edges (in the case where it goes through every node). 

This is why $|V|-1$ iterations is *ALWAYS* enough (but often not necessary). If in one iteration of Bellman-Ford no relaxation yields any improvement, then it means that we already found all shortest paths and we can finish.