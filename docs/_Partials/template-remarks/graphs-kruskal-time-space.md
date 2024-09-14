**Time:** $O(E\log E)$. Dominated by the sorting of edges. Union-Find operations contribute $O(E\cdot\alpha(n))$, which is effectively $O(E)$.

**Space:** $O(V + E)$. 

*Note:* $\alpha(n)$ denotes the [inverse Ackermann function](https://en.wikipedia.org/wiki/Ackermann_function#Inverse).