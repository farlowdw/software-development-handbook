The core template for Tarjan's SCC algorithm is based on [the algorithm presented in William Fiset's video](https://www.youtube.com/watch?v=wUgWX0nc4NY), where there's not an explicit distinction between tree edges and back edges when low-link values are updated. However, the core template differs slightly in that what is ultimately returned is *not* a list of the node's low-link values (where equivalent low-link values means those nodes are in the same SCC); instead, the collection of SCCs itself is returned. To recover the original template from the video, all we have to do is delete three lines from the core template (highlighted in red below) and modify one line (the last line, highlighted in yellow, where we return the list of low-link values instead of the list of SCCs):

```python
def tarjan_old(graph):
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
        for nbr in graph[node]:
            if indices[nbr] == -1:  # visit nbr if it has not yet been visited
                dfs(nbr)
            if on_stack[nbr]:       # nbr is on stack, thus part of current SCC (minimize low-link on callback)
                low_link[node] = min(low_link[node], low_link[nbr])

        # if node is a root node of an SCC, pop from stack and generate SCC
        if indices[node] == low_link[node]:
            #highlight-error-next-line
            scc = []
            while stack:
                scc_nbr = stack.pop()
                on_stack[scc_nbr] = False
                low_link[scc_nbr] = indices[node]
                #highlight-error-next-line
                scc.append(scc_nbr)
                if scc_nbr == node:
                    break
            
            #highlight-error-next-line
            sccs.append(scc)  # add SCC to overall list of SCCs

    # initialize DFS traversal
    for v in range(n):
        if indices[v] == -1:
            dfs(v)

    #highlight-warning-next-line
    return low_link
```