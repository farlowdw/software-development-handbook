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

# dfs function to execute a dfs on the entire graph
def dfs(graph):
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

print(dfs(graph))