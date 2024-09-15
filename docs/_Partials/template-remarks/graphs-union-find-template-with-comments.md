```python
# T: O(α(n)) per operation; S: O(n)
class UnionFind:
    # MakeSet operations implicit for graph with n vertices (n = num_vertices)
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
        self.rank = [0] * num_vertices

    # path compression: make the representative of x point directly to the root
    def find(self, x):
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

    # return False if x and y are in the same set; otherwise,
    #   union by rank: attach the shorter tree under the taller one;
    #   if ranks are equal, update the rank of the tree being attached to;
    #   return True once x and y have been unioned into the same set
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        
        rank_x = self.rank[root_x]
        rank_y = self.rank[root_y]
        if rank_x > rank_y:
            self.root[root_y] = root_x
        elif rank_x < rank_y:
            self.root[root_x] = root_y
        else:
            self.root[root_y] = root_x
            self.rank[root_x] += 1
            
        return True

    # utility method to quickly determine if x and y are connected
    def connected(self, x, y):
        return self.find(x) == self.find(y)
```