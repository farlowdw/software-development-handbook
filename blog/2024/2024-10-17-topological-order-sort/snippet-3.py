# node/letter correspondence
lookup = {
    -1: ' ', # no node (NIL)
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
}

# graph represented as an adjacency list of index arrays in code
graph = [
    [3, 5],
    [8],
    [9],
    [0],
    [0, 7],
    [6, 10],
    [2],
    [4, 8],
    [10],
    [6],
    [0, 9],
]

# T: O(V + E); S: O(V + E)
def kosaraju(graph):
    n = len(graph)          # graph assumed to be adjacency list of index arrays
    visited = [False] * n
    finish_order = []       # stack of nodes to be ordered based on finish time (first to last)

    # transpose the given graph (reverses all edges)
    def transpose_graph(graph):
        gt = [[] for _ in range(n)]
        for node in range(n):
            for nbr in graph[node]:
                gt[nbr].append(node)  # reverse edge direction
        return gt

    # first DFS pass: record finish times of nodes
    def dfs_first_pass(node):
        visited[node] = True            # mark current node as visited
        for nbr in graph[node]:
            if not visited[nbr]:
                dfs_first_pass(nbr)     # visit all unvisited neighbors
        
        finish_order.append(node)       # add node to finish_order after all its descendants are visited

    # second DFS pass (on transposed graph): find strongly connected components (SCCs)
    def dfs_second_pass(node, component):
        visited[node] = True            # mark current node as visited
        component.append(node)          # add node to current SCC
        for nbr in graph_transpose[node]:
            if not visited[nbr]:
                dfs_second_pass(nbr, component)  # visit all unvisited neighbors

    # step 1: perform DFS on original graph to compute finish times
    for node in range(n):
        if not visited[node]:
            dfs_first_pass(node)

    # step 2: create transpose graph (reverse all edges of original graph)
    graph_transpose = transpose_graph(graph)

    # step 3: process all nodes in order of decreasing finish times
    visited = [False] * n   # reset visited array for second pass
    sccs = []               # initialize collection of SCCs
    while finish_order:     # process nodes in order of decreasing finish times
        node = finish_order.pop()   # root (first node) of current SCC
        if not visited[node]:
            component = []          # store nodes in current SCC
            dfs_second_pass(node, component)  # perform DFS on transposed graph
            sccs.append(component)  # add component to overall list of SCCs

    return sccs  # return complete list of SCCs in topological order

print([ [lookup[node] for node in scc] for scc in kosaraju(graph) ])