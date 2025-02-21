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
}

# graph represented as an adjacency list of index arrays
graph = [
    [1,4,6], # A -> B, E, G
    [],      # B has no outgoing edges
    [6],     # C -> G
    [1,5,6], # D -> B, F, G
    [3,6],   # E -> D, G
    [],      # F has no outgoing edges
    []       # G has no outgoing edges
]

def top_sort(G):
    def find_add_vertex_w_no_incoming_edges():
        in_degrees = [0] * n                    # find in-degrees from scratch each time
        for node in range(n):                   # only consider nodes that have not been deleted
            if not in_top_sort[node]:           # (i.e., nodes not already in topological order)
                for nbr in G[node]:             # only increment in-degree for nodes that exist
                    if not in_top_sort[nbr]:    # (i.e., nodes not already in topological order)
                        in_degrees[nbr] += 1
        
        for node in range(n):                   # consider all nodes in sequence
            if not in_top_sort[node] and in_degrees[node] == 0:
                top_sort.append(node)           # put the current node next in the topological ordering
                in_top_sort[node] = True        # "delete" the node from the graph
                return                          # (i.e., "remove u and all its outgoing edges from G")
            
    n = len(G)
    in_top_sort = [False] * n   # True = in topological sort and "delete" from graph
    top_sort = []               # the topological sort we're incrementally building
    
    for _ in range(n):                          # "while G isn't empty"
        find_add_vertex_w_no_incoming_edges()   # "find u in V with no incoming edges; put u next in topological ordering"
        
    return [ lookup[node] for node in top_sort ]
    
print(top_sort(graph)) # ['A', 'C', 'E', 'D', 'B', 'F', 'G']