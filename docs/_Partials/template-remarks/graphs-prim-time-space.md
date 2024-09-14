**Time:** $O(E\log V)$. The algorithm's performance is dominated by heap operations, each taking $O(\log V)$ time, and there are at most $O(E)$ such operations.

**Space:** $O(V + E)$. Space is used to store the graph, arrays for node data, and the min-heap, all of which are bounded by $O(V + E)$.