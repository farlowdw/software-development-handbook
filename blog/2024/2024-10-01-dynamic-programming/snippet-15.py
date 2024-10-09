def setup(adj_mat, n):
    # dp and pred should contain null values by default
    dp = [[None] * n for _ in range(n)]
    pred = [[None] * n for _ in range(n)]
    
    # make a deep copy of the input matrix;
    # set up the 'pred' matrix for path reconstruction
    for i in range(n):
        for j in range(n):
            dp[i][j] = adj_mat[i][j]
            if adj_mat[i][j] != float('inf'):
                pred[i][j] = i
                
    return dp, pred

def propagate_negative_cycles(dp, pred, n):
    # execute FW APSP algorithm a second time
    # but this time if the distance can be improved,
    # then set the optimal distance to be -inf;
    # every edge (i, j) marked with -inf is either
    # part of or reaches into a negative cycle
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dp[i][k] + dp[k][j] < dp[i][j]:
                    dp[i][j] = float('-inf')
                    pred[i][j] = -1

def reconstruct_path(start, end, dp, pred):
    # reconstructs the shortest path between nodes,
    # 'start' and 'end', where we must first run the
    # floyd_warshall solver below before calling this method;
    # returns null if path is affected by negative cycle
    path = []

    # check if there exists a path between 'start' and 'end'
    if dp[start][end] == float('inf'):
        return path
    
    # reconstruct the path by using the 'pred' matrix
    # (it's pieced together in reverse order)
    curr = end
    while curr != start:
        if curr == -1:
            return None   # return None if negative cycle detected
        path.append(curr)
        curr = pred[start][curr]
        
    if pred[start][curr] == -1:
        return None       # return None if negative cycle detected
    
    path.append(start)    # complete path reconstruction
    path.reverse()        # reverse path to obtain actual traversal order
    return path           # return the reconstructed path

def floyd_warshall(adj_mat):
    n = len(adj_mat)
    dp, pred = setup(adj_mat, n)
    
    # execute FW APSP algorithm (this is all there really is)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dp[i][k] + dp[k][j] < dp[i][j]:
                    dp[i][j] = dp[i][k] + dp[k][j]
                    pred[i][j] = pred[k][j]
    
    # detect and propagate negative cycles
    propagate_negative_cycles(dp, pred, n)

    # return APSP matrix 'dp' as well as predecessor matrix 'pred'
    # ('dp' holds the APSP solutions/lengths and 'pred' lets us reconstruct paths)
    return dp, pred

# pictured graph as adjacency list
graph = [
    [(1, 4), (6, 2)],
    [(1, -1), (2, 3)],
    [(3, 3), (4, 1)],
    [(5, -2)],
    [(5, 2)],
    [],
    [(4, 2)],
]

# convert adjacency list to adjacency matrix
def adj_list_to_adj_mat(adj_list):
    n = len(adj_list)
    adj_mat = [[float('inf')] * n for _ in range(n)]
    for node in range(n):
        adj_mat[node][node] = 0
        for nbr, weight in adj_list[node]:
            adj_mat[node][nbr] = weight
    return adj_mat

apsp, pred = floyd_warshall(adj_list_to_adj_mat(graph))
print(reconstruct_path(1,5, apsp, pred)) # None (1 is part of a negative cycle)
print(reconstruct_path(6,2, apsp, pred)) # [] (impossible to get from vertex 6 to vertex 2)
print(reconstruct_path(0,5, apsp, pred)) # None (0 can go through a negative cycle, compromising the path)
print(reconstruct_path(2,5, apsp, pred)) # [2, 3, 5] (path weight of 2-3-5 is 3 + (-2) = 1)