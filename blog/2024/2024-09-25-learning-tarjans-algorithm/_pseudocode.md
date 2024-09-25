```a title="Pseudocode for Tarjan's algorithm" showLineNumbers
UNVISITED = -1
n = number of nodes in graph
g = adjacency list with directed edges

id = 0        # used to give each node an id
sccCount = 0  # used to count number of SCCs found

# index i in these arrays represents node i
ids = [0, 0, ..., 0, 0]               # length n
low = [0, 0, ..., 0, 0]               # length n
onStack = [false, false, ... , false] # length n
stack = an empty stack data structure

function findSccs():
  for(i = 0; i < n; i++): ids[i] = UNVISITED
  for(i = 0; i < n; i++): 
    if(ids[i] == UNVISITED):
      dfs(i)
  return low

function dfs(at):
  stack.push(at)
  onStack[at] = true
  ids[at] = low[at] = id++

  # visit all neighbors and minimize low-link on callback
  for(to : g[at]):
    if(ids[to] == UNVISITED): 
      dfs(to)
    if(onStack[to]): 
      low[at] = min(low[at], low[to])

  # after having visited all the neighbors of 'at'
  # if we're at the start of an SCC, then empty the 
  # seen stack until we're back to the start of the SCC
  if(ids[at] == low[at]):
    for(node = stack.pop();;node = stack.pop()):
      onStack[node] = false
      low[node] = ids[at]
      if(node == at): break
    sccCount++
```