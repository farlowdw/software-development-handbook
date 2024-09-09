import CodeGrid from '@site/src/components/CodeGrid';
import CodeGridCell from '@site/src/components/CodeGridCell';

Generally speaking, there's not much variation in the way the `find` method of the union-find data structure is implemented (path compression is always used for the sake of optimality), but there are at least *two* notable variations in how the `union` method may be implemented, namely *by rank* and *by size*. Many sources (e.g., Cormen et al.) use union by rank, including the designated template on this page, but other sources (e.g., [Algorithms with Attitude](https://www.youtube.com/watch?v=axaOsCgpupk&list=PLSVu1-lON6LwGquZz42Mnf9qiJ1hvZxTf&index=3)) use union by size:

```python
class UnionFind:
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
        self.size = [1] * num_vertices

    def find(self, x):
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        
        if self.size[root_x] > self.size[root_y]:
            root_x, root_y = root_y, root_x
            
        self.root[root_x] = root_y
        self.size[root_y] += self.size[root_x]
            
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

What's the difference? Let's compare the *by rank* and *by size* approaches side by side (differences highlighted):

<CodeGrid>
<CodeGridCell>

```python title="Union by rank"
class UnionFind:
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
        #highlight-next-line
        self.rank = [0] * num_vertices

    def find(self, x):
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        
        #highlight-start
        rank_x = self.rank[root_x]
        rank_y = self.rank[root_y]
        if rank_x > rank_y:
            self.root[root_y] = root_x
        elif rank_x < rank_y:
            self.root[root_x] = root_y
        else:
            self.root[root_y] = root_x
            self.rank[root_x] += 1
        #highlight-end
            
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

</CodeGridCell>
<CodeGridCell>

```python title="Union by size"
class UnionFind:
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
        #highlight-next-line
        self.size = [1] * num_vertices

    def find(self, x):
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        
        #highlight-start
        if self.size[root_x] > self.size[root_y]:
            root_x, root_y = root_y, root_x
            
        self.root[root_x] = root_y
        self.size[root_y] += self.size[root_x]
        #highlight-end
            
        return True

    
    
    

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

</CodeGridCell>
</CodeGrid>

The first difference is immaterial: the `rank` array is initialized with values of `0` to indicate the height of a tree with a single node whereas the `size` array is initialized with values of `1` to indicate that initialized sets with a single element have a size of `1`.

The other highlighted code is where the real differences lie:

- **By rank:** Rank only increases when two trees *of the same rank* are merged; hence, if a smaller rank tree is merged with a larger rank tree (arguably the usual case), then the rank of the larger tree doesn't change. The upshot is that the rank-based approach is rather conservative in increasing the tree height for union operations.
- **By size:** The size of the tree is *always* updated during a union operation. The smaller tree's size is added to the larger tree's size, and the height of the tree is not explicitly tracked. Merging trees based on the number of elements helps maintain relatively balanced trees, albeit arguably not quite as well as the rank-based approach, which is why the rank-based approach shows up in more textbooks and different DSA contexts.

The time and space complexity of both approaches is largely the same so it mostly boils down to a preference as to what version you choose to implement.