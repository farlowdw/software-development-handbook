The following implementation of Tarjan's algorithm more closely aligns with what appears in [the algorithm's pseudocode on Wikipedia](https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm#The_algorithm_in_pseudocode) (the main difference between the implementation below and the core template is that this implementation distinguishes between tree edges and back edges whereas the core template does not; the main difference has been highlighted below):

```python
def tarjan(graph):
    n = len(graph)          # graph assumed to be adjacency list of index arrays
    index = 0               # unique index assigned to each node
    indices = [-1] * n      # index of each node
    low_link = [0] * n      # store lowest index reachable from each node
    on_stack = [False] * n  # boolean array to check if a node is on the stack
    stack = []              # stack to keep track of nodes in current SCC
    sccs = []               # list to store all SCCs

    def dfs(node):
        nonlocal index
        low_link[node] = index  # initialize low_link value of node to be its own index
        indices[node] = index   # assign smallest unused index to node
        index += 1              # increment index value to ensure later nodes have higher index values
        stack.append(node)      # push node onto the stack
        on_stack[node] = True   # mark node as being on the stack

        # explore all outgoing edges from the node
        for neighbor in graph[node]:
            #highlight-start
            if indices[neighbor] == -1: # visit nbr if it has not yet been visited (tree edge)
                dfs(neighbor)
                low_link[node] = min(low_link[node], low_link[neighbor])
            elif on_stack[neighbor]:    # nbr is on stack, thus part of current SCC (back edge)
                low_link[node] = min(low_link[node], indices[neighbor])
            #highlight-end

        # if node is a root node of an SCC, pop from stack and generate SCC
        if indices[node] == low_link[node]:
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == node:
                    break
            sccs.append(scc)  # add SCC to overall list of SCCs

    # initialize DFS traversal
    for v in range(n):
        if indices[v] == -1:
            dfs(v)

    return sccs  # return list of SCCs
```