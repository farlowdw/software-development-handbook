from collections import deque

# node mapping from index to letter: "index : letter"
lookup = {
    0: 'S',
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
}

# graph definition (adjacency list of index arrays)
graph = [         # Edges:
    [1, 3],       # S: (S, A), (S, C)
    [0, 2, 4],    # A: (A, S), (A, B), (A, D)
    [1, 5],       # B: (B, A), (B, E)
    [0, 4, 6],    # C: (C, S), (C, D), (C, F)
    [1, 3, 5, 7], # D: (D, A), (D, C), (D, E), (D, G)
    [2, 4, 8],    # E: (E, B), (E, D), (E, H)
    [3, 7],       # F: (F, C), (F, G)
    [4, 6, 8],    # G: (G, D), (G, F), (G, H)
    [5, 7],       # H: (H, E), (H, G)
]

# standard BFS implementation from source node
def bfs(graph, source):
    n = len(graph)
    queue = deque([source])
    visited = [False] * n
    visited[source] = True

    print(lookup[source])
    while queue:
        node = queue.popleft()
        for nbr in graph[node]:
            if not visited[nbr]:
                print(f'Vertex {lookup[nbr]} discovered by {lookup[node]}')
                visited[nbr] = True
                queue.append(nbr)

# standard DFS implementation from source node
def dfs(graph, source):
    n = len(graph)
    visited = [False] * n
    print(lookup[source])
    
    def visit(node):
        visited[node] = True
        for nbr in graph[node]:
            if not visited[nbr]:
                print(f'Vertex {lookup[nbr]} discovered by {lookup[node]}')
                visit(nbr)
                
    visit(source)

# flawed attempt at iterative DFS with stack-based approach
def dfs_stack_bad(graph, source):
    n = len(graph)
    stack = [source]
    visited = [False] * n
    visited[source] = True

    print(lookup[source])
    while stack:
        node = stack.pop()
        for nbr in graph[node]:
            if not visited[nbr]:
                print(f'Vertex {lookup[nbr]} discovered by {lookup[node]}')
                visited[nbr] = True
                stack.append(nbr)

# fixed iterative DFS with stack of iterators
def dfs_stack_iterators(graph, source):
    n = len(graph)
    visited = [False] * n
    visited[source] =  True
    stack = [(iter(graph[source]), source)]
    while stack:
        try:
            prev = stack[-1][1]
            node = next(stack[-1][0])
            if not visited[node]:
                print(f'Vertex {lookup[node]} discovered by {lookup[prev]}')
                visited[node] = True
                stack.append((iter(graph[node]), node))
        except StopIteration:
            stack.pop()

# iterative DFS with stack of iterators converted to BFS (swap stack for queue)
def dfs_stack_iterators_to_bfs(graph, source):
    n = len(graph)
    visited = [False] * n
    visited[source] =  True
    queue = deque([(iter(graph[source]), source)])
    while queue:
        try:
            prev = queue[0][1]
            node = next(queue[0][0])
            if not visited[node]:
                print(f'Vertex {lookup[node]} discovered by {lookup[prev]}')
                visited[node] = True
                queue.append((iter(graph[node]), node))
        except StopIteration:
            queue.popleft()

# iterative DFS with stack of vertices (reverse order of children at each vertex)
def dfs_stack_vertices(graph, source):
    n = len(graph)
    visited = [False] * n
    stack = [(source, None)]
    
    while stack:
        node, prev = stack.pop()
        if not visited[node]:
            print(f'Vertex {lookup[node]} discovered by {lookup.get(prev, None)}')
            visited[node] = True
            for nbr in graph[node]:
                stack.append((nbr, node))

# iterative DFS with stack of vertices converted to BFS (swap stack for queue)
def dfs_stack_vertices_to_bfs(graph, source):
    n = len(graph)
    visited = [False] * n
    queue = deque([(source, None)])
    
    while queue:
        node, prev = queue.popleft()
        if not visited[node]:
            print(f'Vertex {lookup[node]} discovered by {lookup.get(prev, None)}')
            visited[node] = True
            for nbr in graph[node]:
                queue.append((nbr, node))

# iterative DFS with stack of vertices (vertex visit order equivalent to standard DFS)
def dfs_stack_vertices_reversed(graph, source):
    n = len(graph)
    visited = [False] * n
    stack = [(source, None)]
    
    while stack:
        node, prev = stack.pop()
        if not visited[node]:
            print(f'Vertex {lookup[node]} discovered by {lookup.get(prev, None)}')
            visited[node] = True
            for i in range(len(graph[node]) - 1, -1, -1):
                nbr = graph[node][i]
                stack.append((nbr, node))

# print('Standard BFS:')
# bfs(graph, 0)

# print('Standard DFS:')
# dfs(graph, 0)

# print('Attempted iterative DFS with stack traversal (BAD):')
# dfs_stack_bad(graph, 0)

# print('Fixed iterative DFS with stack of iterators:')
# dfs_stack_iterators(graph, 0)

# print('Iterative DFS with stack of iterators changed to BFS (swap out stack for queue):')
# dfs_stack_iterators_to_bfs(graph, 0)

# print('Iterative DFS with stack of vertices (reverse order of children at each vertex):')
# dfs_stack_vertices(graph, 0)

# print('Iterative DFS with stack of vertices changed to BFS (swap out stack for queue)')
# dfs_stack_vertices_to_bfs(graph, 0)

print('Iterative DFS with stack of vertices (preserve original DFS vertex visit order)')
dfs_stack_vertices_reversed(graph, 0)