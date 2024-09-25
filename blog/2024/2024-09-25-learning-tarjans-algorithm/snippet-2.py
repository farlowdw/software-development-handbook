# node mapping from index to letter: "index : letter"
lookup = {
    -1: ' ',
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
}

# graph definition (adjacency list of index arrays)
graph = [       # Directed edges:
    [1],        # A: (A, B)
    [2, 4, 5],  # B: (B, C), (B, E), (B, F)
    [3],        # C: (C, D)
    [2],        # D: (D, C)
    [0, 5],     # E: (E, A), (E, F)
    [6],        # F: (F, G)
    [2, 3, 5]   # G: (G, C), (G, D), (G, F)
]

# T: O(V + E); S: O(V)
def tarjan(graph):
    n = len(graph)          # graph assumed to be adjacency list of index arrays
    node_id = 0             # unique node_id assigned to each node
    ids = [-1] * n          # id of each node
    low_link = [0] * n      # store lowest id node reachable from each node
    on_stack = [False] * n  # boolean array to check if a node is on the stack
    stack = []              # stack to keep track of nodes in current SCC
    sccs = []               # list to store all SCCs

    def dfs(node):
        nonlocal node_id
        low_link[node] = node_id    # initialize low_link value of node to be its own node_id
        ids[node] = node_id         # assign smallest unused node_id to node
        node_id += 1                # increment node_id value to ensure later nodes have higher node_id values
        stack.append(node)          # push node onto the stack
        on_stack[node] = True       # mark node as being on the stack

        # explore all outgoing edges from the node
        for nbr in graph[node]:
            if ids[nbr] == -1:      # visit nbr if it has not yet been visited
                dfs(nbr)
            if on_stack[nbr]:       # nbr is on stack, thus part of current SCC (minimize low-link on callback)
                low_link[node] = min(low_link[node], low_link[nbr])

        # if node is a root node of an SCC, pop from stack and generate SCC
        if ids[node] == low_link[node]:
            scc = []
            while stack:
                scc_nbr = stack.pop()
                on_stack[scc_nbr] = False
                low_link[scc_nbr] = ids[node]
                scc.append(scc_nbr)
                if scc_nbr == node:
                    break
                
            sccs.append(scc)  # add SCC to overall list of SCCs

    # initialize top-level DFS traversals
    for v in range(n):
        if ids[v] == -1:
            dfs(v)

    return sccs  # return list of SCCs

                     # [[D, C], [G, F], [E, B, A]]
print(tarjan(graph)) # [[3, 2], [6, 5], [4, 1, 0]]