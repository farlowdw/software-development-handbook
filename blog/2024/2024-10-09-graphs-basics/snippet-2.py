# graph representation (adjacency list of index arrays)
graph = [
    [3],
    [0, 6],
    [1, 3, 6],
    [1, 5, 6],
    [7],
    [2],
    [],
    [3, 4, 5],
    [4],
]

# lookup table to map node index values to letters
lookup = {
    -1: ' ',
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
}

# recursive dfs function to execute a dfs on the entire graph
def dfs_recursive(graph):
    n = len(graph)
    discovered = [-1] * n
    finished = [-1] * n
    pred = [-1] * n
    time = 0
    
    # the visit function below is the DFSVertex function in the pseudocode
    def visit(node):
        nonlocal time
        time += 1
        discovered[node] = time
        for nbr in graph[node]:
            if discovered[nbr] < 0:
                pred[nbr] = node
                visit(nbr)
        time += 1
        finished[node] = time
    
    # top-level DFS searches are executed here
    for node in range(n):
        if discovered[node] < 0:
            visit(node)
            
    return discovered, finished, [ lookup[parent] for parent in pred ]

def dfs_iterative(graph):
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

print('Recursive DFS:')
print(dfs_recursive(graph))
print('\nIterative DFS"')
print(dfs_iterative(graph))