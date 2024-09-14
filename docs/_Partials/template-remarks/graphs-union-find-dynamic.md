import CodeGrid from '@site/src/components/CodeGrid';
import CodeGridCell from '@site/src/components/CodeGridCell';

As noted in the remark above, the `union` in union-find is often implemented either *by rank* or *by size*:

<CodeGrid>
<CodeGridCell>

```python title="Union by rank (not dynamic)"
# T: O(α(n)) per operation; S: O(n)
class UnionFind:
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
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

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

</CodeGridCell>
<CodeGridCell>

```python title="Union by size (not dynamic)"
# T: O(α(n)) per operation; S: O(n)
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

</CodeGridCell>
</CodeGrid>

But both approaches above rely on being provided a graph with a fixed number of vertices, `num_vertices`. The initialization of the structure itself is where all of the implied `MakeSet` operations occur. But what options do we have in scenarios where maybe the number of vertices is not known in advance, but we would still like to make use of the union-find data structure?

We can use hash maps! But note how this now becomes much more of a data structure *design* problem in terms of how the different methods should behave:

- `make_set(x)`: If `x` is already in the data structure, then should its information be overwritten? Probably note.
- `find(x)`: If `x` is not yet in the data structure, then should this method throw an error? Maybe.
- `union(x, y)`: If one or both of the elements is not in the data structure, then should this method throw an error? Maybe.
- `connected(x, y)`: If one or both of the elements is not in the data structure, then should this method throw an error? Maybe.

Things can get a bit messy if we start adding a bunch of membership checks. What if we just call `make_set(x)` whenever `find(x)` is called (`find` is called when it itself is called, when `union` is called, and when `connected` is called)? If `x` is already in the data structure, then we can modify `make_set` to avoid making an update; otherwise, `make_set` is a constant time operation that can ensure we never encounter any access errors:

<CodeGrid>
<CodeGridCell>

```python title="Union by rank (dynamic)"
# T: O(α(n)) per operation; S: O(n)
class UnionFind:
    def __init__(self):
        self.root = {}
        self.rank = {}
        
    def make_set(self, x):
        if x not in self.root:
            self.root[x] = x
            self.rank[x] = 0

    def find(self, x):
        self.make_set(x)
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

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

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

</CodeGridCell>
<CodeGridCell>

```python title="Union by size (dynamic)"
# T: O(α(n)) per operation; S: O(n)
class UnionFind:
    def __init__(self):
        self.root = {}
        self.size = {}

    def make_set(self, x):
        if x not in self.root:
            self.root[x] = x
            self.size[x] = 1

    def find(self, x):
        self.make_set(x)
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

</CodeGridCell>
</CodeGrid>

As can be seen above, the code alterations are very minor: use hash maps instead of arrays with a pre-defined number of elements, add the `make_set` method, and then add a `make_set` call at the beginning of the `find` method. That's it.