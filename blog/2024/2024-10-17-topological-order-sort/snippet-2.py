# DFS implementation that records discovery and finish times
# as well as edge classifications
def dfs_iter(graph):
    n = len(graph)
    edge_classifications = dict()
    discovered = [-1] * n
    finished = [-1] * n
    pred = [-1] * n
    time = 0
    
    def explore_vertex(node):
        nonlocal time
        if discovered[node] < 0:
            time += 1
            discovered[node] = time
            stack.append(node)
            for i in range(len(graph[node]) - 1, -1, -1):
                nbr = graph[node][i]
                stack.append((node, nbr))
        elif finished[node] < 0:
            time += 1
            finished[node] = time
    
    def explore_edge(edge):
        node, nbr = edge
        if discovered[nbr] < 0:
            edge_classifications[edge] = 'treeEdge'
            pred[nbr] = node
            explore_vertex(nbr)
        elif finished[nbr] < 0:
            edge_classifications[edge] = 'backEdge'
        elif discovered[nbr] > discovered[node]:
            edge_classifications[edge] = 'forwardEdge'
        else:
            edge_classifications[edge] = 'crossEdge'
            
    stack = []
    for node in range(n - 1, -1, -1):
        stack.append(node)
    
    while stack:
        x = stack.pop()
        if not isinstance(x, tuple):
            explore_vertex(x)
        else:
            explore_edge(x)
        
    return discovered, finished, pred, { (lookup[edge[0]], lookup[edge[1]]): edge_classifications[edge] for edge in edge_classifications }

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

print(dfs_iter(graph))