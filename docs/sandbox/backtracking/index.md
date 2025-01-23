---
title: >-
  Backtracking: Learning Adventures
description: >-
  Sandbox for backtracking thoughts
unlisted: true
slug: /backtracking
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';
import TOCInline from '@theme/TOCInline';

import CodeGrid from '@site/src/components/CodeGrid';
import CodeGridCell from '@site/src/components/CodeGridCell';
import CodeEditor from '@site/src/components/CodeEditor';
import ImageCarousel from '@site/src/components/ImageCarousel';

import LC22PS from '@site/docs/_Partials/problem-stems/lc22.md';
import LC51PS from '@site/docs/_Partials/problem-stems/lc51.md';
import LC93PS from '@site/docs/_Partials/problem-stems/lc93.md';
import LC37PS from '@site/docs/_Partials/problem-stems/lc37.md';

import snippet1 from '!!raw-loader!./snippet-1.py';
import snippet2 from '!!raw-loader!./snippet-2.py';
import snippet3 from '!!raw-loader!./snippet-3.py';
import snippet4 from '!!raw-loader!./snippet-4.py';
import snippet5 from '!!raw-loader!./snippet-5.py';
import snippet6 from '!!raw-loader!./snippet-6.py';
import snippet7 from '!!raw-loader!./snippet-7.py';
import snippet8 from '!!raw-loader!./snippet-8.py';
import snippet9 from '!!raw-loader!./snippet-9.py';

This page is largely a sandbox meant for collecting thoughts related to backtracking. It is a work in progress and likely will be for some time.

<!--truncate-->

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Backtracking primer

:::info Attribution

The content below appears in <BibRef id='AL2011Puzzles' pages='pp. 4-8'></BibRef> in the context of introducing different techniques for tackling puzzles of an algorithmic nature. The book begins by briefly discussing exhaustive search and then backtracking, which is first viewed as an improvement over exhaustive search. The two small sections, taken together, is a rather nice primer for what to expect when confronted with a backtracking problem.

:::

**Exhaustive Search (magic square)**

Theoretically, many puzzles can be solved by *exhaustive search* &#8212; a problem-solving
strategy that simply tries all possible candidate solutions until a solution to the
problem is found. Little ingenuity is typically required in applying exhaustive
search. Therefore, puzzles are rarely offered to a person (as opposed to a computer)
in the expectation that a solution will be found by applying this strategy. The most
important limitation of exhaustive search is its inefficiency: as a rule, the number
of solution candidates that need to be processed grows at least exponentially with
the problem size, making the approach inappropriate not only for a human but
often for a computer as well. As an example, consider the problem of constructing
a *magic square* of order 3.

> ***(Magic Square)*** Fill the $3\times 3$ table with nine distinct integers from 1 to 9 so that the
> sum of the numbers in each row, column, and corner-to-corner diagonal is the same:
> 
> <div align='center' className='centeredImageDiv'>
>   <img width='175px' src={require('./f1.png').default} />
>   <figcaption>A 3 × 3 table to be filled with integers 1 through 9 to form a magic square.</figcaption>
> </div>

How many ways are there to fill such a table? Let us think of the table as filled
with one number at a time, starting with placing the 1 somewhere and ending with
placing the 9. There are nine ways to place 1, followed by eight ways to place 2,
and so on until the last number 9 is placed in the only unoccupied cell of the table.
Hence, there are $9! = 9\cdot 8\cdot\ldots\cdot 1 = \text{362,880}$ ways to arrange the nine numbers
in the cells of the $3\times 3$ table. (We just used the standard notation, $n!$, called $n$
*factorial*, for the product of consecutive integers from $1$ to $n$.) Therefore, solving
this problem by exhaustive search would imply generating all $\text{362,880}$ possible
arrangements of distinct integers from $1$ to $9$ in the table and checking, for each
of the arrangements, whether all its row, column, and diagonal sums are the same.
This amount of work is clearly impossible to do by hand.

Actually, it is not difficult to solve this puzzle by proving first that the value
of the common sum is equal to 15 and that 5 must be put at the center cell.
Alternatively, one can take advantage of several known algorithms for constructing
magic squares of an arbitrary order $n\geq 3$, which are especially efficient for odd
$n$'s. Of course, these algorithms are not based on exhaustive search:
the number of candidate solutions the exhaustive search algorithm would have
to consider becomes prohibitively large even for a computer for $n$ as small as 5.
Indeed, $(5^2)!\simeq 1.5\cdot 10^{25}$, and hence it would take a computer making 10 trillion
operations per second about 49,000 years to finish the job.

**Backtracking (n-queens problem)**

There are two major difficulties in applying exhaustive search. The first one
lies in the mechanics of generating all possible solution candidates. For some
problems, such candidates compose a well-structured set. For example, candidate
arrangements of the first nine positive integers in the cells of the $3\times 3$ table (see the
*Magic Square* example above) can be obtained as *permutations* of these numbers,
for which several algorithms are known. There are many problems, however, where
solution candidates do not form a set with such a regular structure. The second,
and more fundamental, difficulty lies in the number of solution candidates that
need to be generated and processed. Typically, the size of this set grows at least
exponentially with the problem size. Therefore, exhaustive search is practical only
for very small instances of such problems.

*Backtracking* is an important improvement over the brute-force approach of
exhaustive search. It provides a convenient method for generating candidate
solutions while making it possible to avoid generating unnecessary candidates.
The main idea is to construct solutions one component at a time and evaluate
such partially constructed candidates as follows: If a partially constructed solution
can be developed further without violating the problem's constraints, it is done
by taking the first remaining legitimate option for the next component. If there
is no legitimate option for the next component, no alternatives for *any* remaining
component need to be considered. In this case, the algorithm backtracks to replace
the last component of the partially constructed solution with the next option for
that component.

Typically, backtracking involves undoing a number of wrong choices &#8212; the
smaller this number, the faster the algorithm finds a solution. Although in the
worst-case scenario a backtracking algorithm may end up generating all the same
candidate solutions as an exhaustive search, this rarely happens.

It is convenient to interpret a backtracking algorithm as a process of constructing
a tree that mirrors decisions being made. Computer scientists use the term *tree* to
describe hierarchical structures such as family trees and organizational charts.
A tree is usually shown with its *root* (the only node without a parent) on the
top and its *leaves* (nodes without children) on or closer to the bottom of the
diagram. This is nothing but a convenient typographical convention, however.
For a backtracking algorithm, such a tree is called a *state-space tree*. The root of
a state-space tree corresponds to the start of a solution construction process; we
consider the root to be on the zero level of the tree. The root's children &#8212; on
the first level of the tree &#8212; correspond to possible choices of the first component
of a solution (e.g., the cell to contain 1 in the magic square construction). Their
children &#8212; the nodes on the second level &#8212; correspond to possible choices of the
second component of a solution, and so on. Leaves can be of two kinds. The first
kind &#8212; called *nonpromising nodes* or *dead ends* &#8212; correspond to partially constructed
candidates that cannot lead to a solution. After establishing that a particular node
is nonpromising, a backtracking algorithm terminates the node (the tree is said
to be *pruned*), undoes the decision regarding the last component of the candidate
solution by backtracking to the parent of the nonpromising node, and considers
another choice for that component. The second kind of a leaf provides a solution to
the problem. If a single solution suffices, the algorithm stops; if other solutions need
to be searched for, the algorithm continues searching for them by backtracking to
the leaf's parent.

The following example is a perennial favorite for showing an application of
backtracking to a particular problem.

> ***(The n-Queens Problem)*** Place $n$ queens on an $n\times n$ chessboard so that no two queens
attack each other by being in the same column, row, or diagonal.

For $n = 1$, the problem has a trivial solution, and it is easy to see that there
is no solution for $n = 2$ and $n = 3$. So let us consider the 4-queens problem and
solve it by backtracking. Since each of the four queens has to be placed in its own
column, all we need to do is to assign a row for each queen on the board shown below:

<div align='center' className='centeredImageDiv'>
  <img width='275px' src={require('./f2.png').default} />
  <figcaption>Board for the 4-queens problem.</figcaption>
</div>

We start with the empty board and then place queen 1 in the first possible
position, which is in row 1 of column 1 (the figure below illustrates this process). Then we place queen 2, after trying
unsuccessfully rows 1 and 2 of the second column, in the first acceptable position
for it, which is square $(3, 2)$, the square in row 3 and column 2. This proves to
be a dead end because there is no acceptable position in the third column for
queen 3. Therefore, the algorithm backtracks and puts queen 2 in the next possible
position $(4, 2)$. Then queen 3 is placed at $(2, 3)$, which proves to be another dead
end. The algorithm then backtracks all the way to queen 1 and moves it to $(2, 1)$.
Queen 2 then goes to $(4, 2)$, queen 3 to $(1, 3)$, and queen 4 to $(3, 4)$, which is a
solution to the problem. The state-space tree of this search is given below:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f3.png').default} />
  <figcaption>State-space tree of finding a solution to the 4-queens problem by backtracking. X denotes an unsuccessful attempt to place a queen in the indicated row. The letters above the nodes show the order in which the nodes are generated.</figcaption>
</div>

If other solutions need to be found (there is just one other solution to the
4-queens problem), the algorithm can simply resume its operations at the leaf at
which it stopped. Alternatively, one can use the board's symmetry for this purpose.

How much faster is this solution by backtracking compared to exhaustive search?
If we are to consider all possible placements of four queens on four different squares
of the $4\times 4$ board, the number of such placements is

$$
\frac{16!}{4!(16-4)!}=\frac{16\cdot 15\cdot 14\cdot 13}{4\cdot 3\cdot 2}=1820
$$

(The general formula for the number of ways to choose $k$ different objects, the
order of which is not of interest, from a given set of $n$ different objects, called
by mathematicians *combinations* of $n$ objects taken $k$ at a time and denoted by
either $\binom{n}{k}$ or $C(n, k)$, is $\frac{n!}{k!(n-k)!}$.) If we consider only the placements with the
queens in different columns, the total number of solution candidates decreases to
$4^4 = 256$. And if we add to the latter the constraint that the queens must also be in
different rows, the number of choices drops to $4! = 24$. While the last number is
quite manageable, it would not be the case for larger instances of the problem. For
example, for a regular $8\times 8$ chessboard, the number of such solution candidates is
$8! = \text{40,320}$.

The reader might be interested to know that the total number of different
solutions to the 8-queens problem is 92, twelve of which are qualitatively distinct,
with the remaining 80 obtainable from the basic twelve by rotations and reflections.
As to the general $n$-queens problem, it has a solution for every $n\geq 4$ but no
convenient formula for the number of solutions for an arbitrary $n$ has been
discovered. It is known that this number grows very fast with the value of $n$.
For example, the number of solutions for $n = 10$ is 724, of which 92 are distinct,
while for $n = 12$ the respective numbers are 14,200 and 1787.

Many puzzles in this book can be solved by backtracking. For each of them,
however, there is a more efficient algorithm the reader is expected to strive for. In
particular, The *n-Queens Problem Revisited* (#140) in the main section of the book
asks the reader to design a much faster algorithm for the $n$-queens problem.

## Information gathering

:::info Interviewing IO Observations

The following observations/notes are from reading about backtracking in an IIO guide.

:::

### Overview

- **Backtracking and DFS:** DFS and backtracking are related in that backtracking is often viewed as executing a DFS on a special type of tree, a "decision tree."
- **Decision trees:** Exist independently of backtracking (the overall goal is to make decision trees smaller and more manageable) just like trees exist independently of tree traversals.
- **Pruning:** This is where we actually try to *implement* backtracking efficiently (i.e., we focus on implementing an efficient *traversal* through a decision tree, which generally involves "pruning" the decision tree).

### Decision trees

#### Structure and solution state (empty to complete)

For many problems, it makes sense to construct a solution *incrementally*, where we start with a blank slate (i.e., empty solution) and we work our way toward a final state (i.e., complete solution), making decisions along the way to get us to that final state. When we find ourselves in a situation where building a solution in incremental steps makes sense (e.g., the game Sudoku, where the square is filled incrementally by adding one number at a time), we can think of what decisions are allowable before each increment, and we can model all decisions available to us with a "decision tree" (also called "search tree", "search space", "state-space tree", etc.), where a problem's decision tree is a tree of **partial solutions** to the problem:

- The *root* is the "empty" partial solution (no decision has been made yet).
- The *children* of each node are the different ways to extend the partial solution based on some decision (this is where solutions are incrementally built).
- The *leaves* are complete solutions (no decision left to make).

Note that not all complete solutions are *valid* solutions; that is, a complete solution may be a dead end: a node in the decision tree which does not lead to any valid solution.

Several examples are given below of different problems, games, and scenarios where decision trees may be used to model the progression from start to finish.

#### Examples

- **Example 1 (4 x 4 Sudoku):** In Sudoku, a solution is constructed by filling in one cell at a time. The root of the decision tree is the original puzzle. To extend a partial solution, we must make a decision as to which number to put in the next empty cell. For a 4 x 4 Sudoku puzzle, each partial solution node in the tree will have 4 children, one for each number (1, 2, 3, 4) we can put in the next empty cell. There will be a dead end when some row, column, or subsquare has a repeated number:

  <div align='center' className='centeredImageDiv'>
    <img width='800px' src={require('./f4.png').default} />
  </div>

  For the example above, we can imagine that somewhere down in the tree 9 layers deep (because there are 9 empty cells at the beginning), there is the following solution:

  <div align='center' className='centeredImageDiv'>
    <img width='150px' src={require('./f5.png').default} />
  </div>

- **Example 2 (n-queens):** For the [n-queens problem](https://en.wikipedia.org/wiki/Eight_queens_puzzle), we must place `n` queens in a `n x n` chess board without any queen attacking any other queen. Since there must be one queen on each row, we can find a solution by placing the queens row by row (we could also do this column by column). Below is part of the decision tree for when `n = 4`, as we saw in the primer at the beginning:

  <div align='center' className='centeredImageDiv'>
    <img width='800px' src={require('./f6.png').default} />
  </div>

  We'll revisit this problem once we're interested in *implementing* backtracking, but right now we're only interested in what it looks like to go about solving a problem by using a decision tree. It should be noted that decision trees are *not* just for solving puzzles. In truth, the solution to almost any problem can be formulated as making a sequence of decisions; hence, backtracking can be used to solve almost any problem. But it's usually slow because it's a next-step improvement over exhaustive search &#8212; other algorithms should probably be used if they exist. But sometimes backtracking is really the only way of effectively solving a problem.

- **Example 3 (permutations):** How can we generate all permutations of a list? First, we must recall what a permutation is: another list with the same elements but where those elements may be in any order. To find all such permutations, we can start with an empty list (the empty solution) and add one number at a time:

  <div align='center' className='centeredImageDiv'>
    <img width='800px' src={require('./f7.png').default} />
  </div>

  Generating or considering permutations is a very common pattern in backtracking problems, where a solution will often involve permutations in some way even if those permutations aren't just for a list of numbers. The next example, TSP, illustrates this.

- **Example 4 (TSP):** In the ["Traveling Salesperson Problem"](https://en.wikipedia.org/wiki/Travelling_salesman_problem), we are given a weighted graph where every pair of nodes is connected by a weighted edge. The goal is to find a cycle through all the nodes minimizing the sum of weights of the edges in the cycle.

  The decision tree for TSP is similar to the decision tree for generating all permutations. We start a path from any node (since the final cycle must contain all of them). We can extend a partial path with any of the nodes that are not visited yet. We reach a complete solution when the path goes through every node. Then, we can get the total weight of the cycle by connecting the end of the path with the beginning.

  Here is the decision tree for a graph with 4 nodes. We choose to start from the bottom-left node. At the end, we label each path with the total weight of the cycle (if we connect the beginning with the start).

  <div align='center' className='centeredImageDiv'>
    <img width='800px' src={require('./f8.png').default} />
  </div>

- **Example 5 (subsets):** Now consider the problem of generating all the subsets of a set of elements. A subset of a set `S` is itself a set, but all the elements are from `S`. For example, the set `S = {a,b,c}` has `8` subsets: `{}`, `{a}`, `{b}`, `{c}`, `{a,b}`, `{a,c}`, `{b,c}`, and `{a,b,c}`. More generally, a list of `n` elements has $2^n$ subsets.

  We can construct subsets by making a sequence of decisions. We start with an empty list and, for each element in the set, we decide whether to include it in the subset or not.

  Here is the decision tree for the subsets of `{1,2,3}`:

  <div align='center' className='centeredImageDiv'>
    <img width='800px' src={require('./f9.png').default} />
  </div>

  One way of looking at the generation of the tree above is to consider finding the subsets of `{1, ... , n}`, where at depth `i` we decide whether to include element `i` or not (the root is assumed to have depth `0`). The left child corresponds to skipping it, and the right child corresponds to including it.

  The two most common patterns in backtracking are considering or generating subsets and/or permutations.

- **Example 6 (knapsack):** A famous problem related to subsets is the ["knapsack problem"](https://en.wikipedia.org/wiki/Knapsack_problem): we have a knapsack or bag with a total capacity and a set of items that we can put in the knapsack. Each item has a value and takes a certain capacity. The goal is to fill the knapsack with the maximum total value but without exceeding the total capacity of the knapsack:

  <div align='center' className='centeredImageDiv'>
    <img width='300px' src={require('./f10.png').default} />
  </div>

  The decision tree for the knapsack problem is similar to the one for generating subsets. We start with an empty knapsack. Then, for each item we can choose whether to add it to the knapsack or skip it. We reach a dead end if we exceed the total capacity.

- **Example 7 (subset sum):** Another popular problem based on subsets is known as ["subset sum"](https://en.wikipedia.org/wiki/Subset_sum_problem): given a set of positive and negative numbers, the question is whether there is some subset that adds up `0`. Thus, the problem asks us to find a subset with some additional special property. We can model it with a decision tree like the one above. 

  Problems like "generate all permutations" and "generate all subsets" are called [combinatorial](https://en.wikipedia.org/wiki/Combinatorics) problems.

- **Example 8 (balanced parentheses):** Another example of a combinatorial problem is generating all balanced parentheses strings of a certain length. We can start with an empty string and, each time, either add an open parenthesis or a closing parenthesis. We reach a dead end if we add a closing parenthesis without a matching opening one, or if we open too many parentheses.

  Here is the decision tree for balanced words of length `6`:

  <div align='center' className='centeredImageDiv'>
    <img width='400px' src={require('./f11.png').default} />
  </div>

  Six layers down, we find all balanced parenthesis pairs of length `6`: `((()))`, `(()())`, `(())()`, `()(())`, `()()()`.

  Decision trees can also model two player games.

- **Example 9 (tic-tac-toe):** From an empty board, we first consider all the possible moves of the first player, then all the possible responses of the second player, and so on, until the board is full or someone has `3` in a row:

  <div align='center' className='centeredImageDiv'>
    <img width='500px' src={require('./f12.png').default} />
  </div>

  Chess is another two-player game with a huge (but not infinite) decision tree.

#### Variability and partial solution repetition

There are two specific observations about decision trees that are worth being aware of and keeping in mind:

- **Variability:** There can be many different decision trees for the same problem (i.e., depending on the problem, speaking about "*the* decision tree" for that problem may be inaccurate),
- **Repetition:** Decision trees can contain repeated partial solutions depending on the problem.

##### Decision trees may not be unique

Consider the n-queens problem again. We saw a decision tree where we placed the queens row by row (let's call this decision tree `A`). Instead, we could consider a different decision tree: start with an empty board and place the first queen in any of the `n x n` cells. Then, place the second queen in any of the remaining cells. And so on until there are `n` queens (let's call this decision tree `B`).

##### Partial solutions (nodes) may be repeated

Decision trees `A` and `B` from above are equivalent in the sense that both would reach all the solutions to the `n`-queens problem. However, decision tree `B` is much larger than decision tree `A` because it reaches *repeated partial solutions*. If a decision tree reaches repeated partial solutions, then the entire subtrees under the repeated partial solutions are the same (and they contain the same solutions).

For example, the figure below illustrates decision tree `B` when `n = 4`, where there are `4` queens on the board (only a few partial solutions are shown; the root will have 16 children in this case):

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f13.png').default} />
</div>

In the picture, `T` represents an entire subtree, where it's clear that subtree will be repeated twice &#8212; this is because both subtrees have the same root, and that root is reached by means of different paths.

The size of a decision tree is important when analyzing the runtime of a backtracking algorithm (more on this later). The size of the tree can be analyzed in terms of two distinctive factors: 

- The **branching factor** of a decision tree is the maximum number of children of any node. 
- The **depth** of the decision tree is similar the height of the tree, and the number of leaves in a decision tree is bounded by `O((branching factor)^(depth))`. If the branching factor is `2` or more, then there are more leaves than non leaves, so the total number of nodes is also `O((branching factor)^(depth))`.

Together, branching factor and depth show why decision tree `B` is bigger than decision tree `A`. Both decision trees have the same depth, `n`, because a full solution is when `n` queens are placed. However, in decision tree `A`, the branching factor is `n` (because a row has `n` cells), but, in decision tree `B`, the branching factor is `n * n`. 

For the example discussed above, where, `n = 4`, we saw that the branching factor of decision tree `A` was `n = 4` because the first queen could be placed in one of any of the four rows; on the other hand, the branching factor for decision tree `B` was `n * n = 4 * 4 = 16` because we could place the first queen in any of the 16 cells on the board.

#### Infinite decision trees

In some decision trees, especially in the context of puzzle games, it is possible to make some "moves" and end up in a previous partial solution. This means that a partial solution can be its own ancestor in the tree. 

In this case, the depth of the decision tree is *infinite* because we can keep repeating these moves forever. This is not the same as the repeated states in the n-queens problem (decision tree `B`). In that case, we had repeated nodes but *not in the same path from the root*.

To see a concrete example of where and how this could happen, consider an instance of the [15-puzzle game](https://en.wikipedia.org/wiki/15_puzzle):

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('./f14.png').default} />
</div>

We can slide tiles into the empty cell, and the goal is to reach a partial solution where the numbers are sorted and the empty cell is at the bottom right:

<div align='center' className='centeredImageDiv'>
  <img width='250px' src={require('./f15.png').default} />
</div>

We can consider a decision tree of possible moves. Below is a decision tree for a simpler version of the problem known as 8-puzzle game:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f16.png').default} />
</div>

Unlike the previous examples, we can reach a repeated partial solution in the 15-puzzle or 8-puzzle game *in the same path from the root*. The clearest case would be the trivial one where we just slide a tile and immediately slide it back, but that is not the only way to reach a repeated position. For example, the following sequence of moves ends back at the starting position:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f17.png').default} />
</div>

Another example of a puzzle with an infinite decision tree is solving the [Rubik's Cube](https://en.wikipedia.org/wiki/Rubik%27s_Cube).

For obvious reasons, traversing an infinite decision tree in a depth-first fashion is a terrible idea. We will see how to deal with such cases.

### Backtracking preview

Many types of questions can be answered with decision trees:

| PROBLEM TYPE | GOAL | EXAMPLE |
| :-- | :-- | :-- |
| **Feasibility** | Is there a "valid" solution? | Is it possible to place `n` queens on an `n x n` board without one attacking another? |
| **Enumeration** | Generate all valid solutions | Generate all solutions to the `n`-queens problem |
| **Counting** | How many valid solutions are there? | How many solutions are there to the `n`-queens problem? |
| **Optimization** | Find the solution with the highest "score" | Find the solution with the fewest moves for 8-puzzle |

At a high-level, backtracking as a problem-solving strategy is comprised of two distinct steps:

1. **Problem solving (decision tree):** Model the solution to a problem as a decision tree.
2. **Implementation (traverse decision tree):** Traverse the decision tree from the step above in depth-first order to find any/all/best solution(s).

The first step was discussed above by means of various examples. In summary, we think about the following questions when modeling the solution to a problem in terms of a decision tree:

- What are the partial solutions?
- What are the children of each partial solution?
- How do we identify a valid solution?
- How do we identify a dead end?
- Do we need to find all the solutions, the best solution, or just any solution?
- Are there repeated partial solutions?
- Is it possible to reach a previous partial solution?
- How big is the tree?
- Can I find a smaller decision tree for the same problem?

Consider all of these questions *before* starting to code (the second step). It will be easier to implement backtracking if we have a clear picture of the decision tree we have to traverse *implicitly* before setting about traversing the decision tree we have in mind *explicitly*.

Conceptually, traversing a decision tree is similar to how we might normally traverse a graph with DFS, but there are some notable differences between "normal" DFS and backtracking DFS:

| **"Normal" DFS** | **Backtracking DFS** |
| :-- | :-- |
| The graph is given in the input (or implied as part of a problem narrative). | We are not given the decision tree. We need to **model** the problem as a decision tree. |
| The graph is given as a data structure, like an adjacency list or adjacency matrix that we can use to traverse it. | We don't have a data structure representing the decision tree. We traverse it without storing it anywhere (because it would be too huge). |
| The graph can have cycles, so we need to keep track of already-visited nodes. | The decision tree is a tree, so we don't need to worry about cycles. |
| Runtime: $O(V+E)$. Analyzed in terms of the #number of nodes ($V$) and edges ($E$). | Runtime: $O(t\cdot b^d)$. Analyzed in terms of the branching factor ($b$), the depth ($d$), and the time spent at each node ($t$). |

For example, for [Sudoku](https://en.wikipedia.org/wiki/Sudoku), we are only given the starting position &#8212; we are *not* given the entire decision tree of all the options. Thus, we face an immediate problem at the outset of any backtracking problem: how do we traverse a tree we do not have?

Additionally, we cannot *first* construct the tree and *then* traverse it. Why? Because decision trees are usually *huge*. For example, the decision tree of generating all the permutations of $n$ objects has $n!$ leaves. The decision tree for generating all subsets of $n$ elements has $2^n$ leaves. Etc. Most decision trees grow exponentially (like the decision tree for generating subsets). Consequently, storing a decision tree in memory is almost always impractical and ill-advised (if not impossible).

A more fruitful approach is to somehow traverse the decision tree without actually having it stored in memory anywhere. That is, the decision tree we aim to traverse is almost always *implicit*, meaning we traverse it one node at a time and *only keep track of the current partial solution*. 

Then, instead of finding all children of the current partial solution in some sort of data structure, we generate them *on the fly*. This is not as complex as it may sound at first: if we're given a random node in the `n`-queens decision tree, then we can easily figure out what its children should be without knowing anything else about the tree:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('./f18.png').default} />
</div>

:::danger Backtracking Limitations

Backtracking has some limitations. If the decision tree has repeated partial solutions, then backtracking may not be the best option. If the decision tree is infinite, then backtracking can get stuck in an infinite loop. Some of these cases (and others) are discussed below in the [advanced variations](#advanced-variations) section.

:::

### Implementation

Suppose we've already decided what the decision tree for a problem looks like (step 1) and all that's left is to traverse the tree efficiently in search of a solution (step 2). Below we'll discuss how to do this without having the decision tree in memory.

The core idea is to only keep track of the *current partial solution* (i.e., the node currently being visited by the DFS). We use recursion to do this effectively and efficiently. Each recursive call corresponds to one node in the decision tree. The initial recursive call corresponds to the root. The purpose of the recursive function is two-fold:

- **Base case:** prune dead ends and identify valid solutions
- **Recursive case:** generate the children of the current partial solution

For the base case of the recursive function, we need to detect complete solutions which cannot be extended anymore. The base case of the recursive function is where we process the *leaves* of the decision tree. In this way, the call stack is the path from the root to the current node.

How we actually process the leaves depends on the type of problem:

- **Feasibility:** If we just want one solution, then we can also store it in a global variable (i.e., a variable shared by and visible from all recursive calls, which can either be an actual global variable, class variable, parameter passed by reference, etc.), but we need to add logic to the recursive case to stop the search as soon as one solution is found.
- **Enumeration:** If we want to return *all* valid solutions, then we need to add each valid solution to a global variable (e.g., array of solutions) and continue the search.
- **Counting:** If we only want to know the *number* of valid solutions, then we can use a global variable to keep track of the count and return the count once the decision tree has been fully explored.
- **Optimization:** If we want to return the best solution, then we can keep track of the best solution found so far in a global variable, and, at the leaves, update the variable if we've found a better valid solution, and then continue the search.

#### Backtracking template

The following is generic pseudocode for procesing all leaves of a decision tree using backtracking:

```python
def backtracking(partialSol):
    if deadEnd(partialSol):
        return

    if isFull(partialSol):
        # do any processing we need
        print(partialSol)
    else:
        for child in children(partialSol):
            backtracking(child)

backtracking(emptySol)
```

#### Design choices

In order to turn the pseudocode above into actual code, we need to make some *design choices* about our implementation, specifically about how the *state* of partial solutions should be managed:

1. **Representation:** What *state representation* should be used for the state of the current partial solution?
2. **Shared or separate:** Should parent and child partial solutions *share* the same state (e.g., state modifications should occur *in-place*) or should each child's state be created from a *copy* of its parent's state?
3. **Extra:** Is it possible to add *extra state* to the state of a partial solution to avoid having to recompute the same information inside each recursive call?

Why these decisions matter will be discussed in theory, but everything will be illustrated in actual code once we look at explicit examples.

##### State representation (1)

We can choose different ways to represent the state of the current partial solution. Not all representations are created equal &#8212; some ways will lead to cleaner code.

For example, in the [n-queens](https://leetcode.com/problems/n-queens/) problem on leetcode, we are asked to print each solution as an array of strings in the following manner:

```
[
  "Q.......",
  "....Q...",
  ".......Q",
  ".....Q..",
  "..Q.....",
  "......Q.",
  ".Q......",
  "...Q...."
]
```

But this is neither *compact* nor *practical* when it comes to representing a solution. It's not practical because it contains cosmetic details that are not important for the logic of the problem. A more compact and practical representation for the same solution would be simply an array of `n` numbers, `[0,4,7,5,2,6,1,3]`, where position `i` indicates the position of the queen in the `i`th row. This representation is better because we can quickly check if two queens conflict or not.

In addition, if we use the succinct representation of the `n`-queens solution, we may realize that a solution to the `n`-queens problem can be seen as a permutation of the numbers from `0` to `n-1` with some extra properties. As we said, finding permutations is a fundamental pattern in backtracking that comes up all the time, so being familiar with it can help in problems like this one!

:::tip Advice

Choose the state representation that is most comfortable to work with, not the one you need to output. You can format the full solutions once you reach the leaves (this is a very common pattern).

:::

##### Shared vs separate state (2)

In a "normal" DFS, each node is usually represented by just an index; hence, when we want to *visit* a node, we can simply pass the index to the recursive `visit` call:

```python
def visit(v):
    for nbr in G[v]:
        if not vis[nbr]:
            vis[nbr] = True
            #highlight-error-next-line
            visit(nbr)
```

In backtracking DFS, however, a partial solution can be a much more complex object than just an index. Additionally, we usually obtain the children of a partial solution by making a small change. For example:

<div align='center' className='centeredImageDiv'>
  <img width='450px' src={require('./f19.png').default} />
</div>

Making a copy of the *entire* Sudoku grid each time we generate a child, just because only one cell changes, is probably not an efficient use of memory!

Thus, we essentially have two options:

1. Make a *copy* of the partial solution, *modify* the copy to turn it into the child, and *then* pass the copy to the recursive call.
2. Modify the partial solution itself *in-place* to turn it into the child and then pass it to the recursive call (i.e., without making a copy).

The first option is simpler and easier to think about, but it can really be inefficient. If we choose the second option, then we need to *undo the in-place modifications after the recursive call*. That is, we need to transform the child back into the parent. *The changes we make before and after the recursive call should exactly cancel each other.*

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f20.png').default} />
</div>

If we choose the second option, then we have a few options for *where* to store the single partial solution. It can be a parameter passed by reference (not by copy). It could also be a global variable or an object member in OOP languages (e.g., Java). The global variable option is attractive because we don't need to pass it every time, and it makes it unambiguously clear that there is a single instance of the partial solution being modified in-place. In Python, the preferred route is generally to declare the recursive `backtracking` function inside an outer function, and then declare the single partial solution in the outer function &#8212; this results in the partial solution being contained in the outer function, but it can also be seen and managed by the inner `backtracking` function.

Which approach should be used? We don't have to choose one or the other &#8212; we can mix them. Considering the trade-off between simpler and less error-prone (Option 1) and more efficient (Option 2), here's a useful rule of thumb:

> Modify large variables of the state in-place (e.g, arrays, dictionaries, large objects), but pass small variables by copy (numbers / indices, short strings).

For example, if the partial solution consists of a number and an array, then we can pass the number by copy but modify the array in-place. That means we would need to undo the changes to the array but not the number.

:::danger Undoing Changes

Remember to undo any changes made in-place to the partial solution *after* the recursive call.

:::

The following is an animation of backtracking traversing the decision tree of Sudoku. Since we update the current partial solution in-place, we modify the Sudoku board in-place:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Sudoku_solved_by_bactracking.gif" />
</div>

##### Example 1 (permutations, LC 46)

**Problem:** Find all permutations of a list of distinct numbers (<LC id='46' type='long' ></LC>).

We previously discussed permutations and how, in general, generating permutations is a fundamental pattern in backtracking. For this problem, we need to traverse a decision tree like the one below for when the input is `[1,2,3]`:

<div align='center' className='centeredImageDiv'>
  <img width='450px' src={require('./f21.png').default} />
</div>

How should the state be represented? It seems pretty clear from the problem description as well as the input and desired output that we should use an array. But should we use separate state for each permutation or modify each permutation representation in place?

- **Separate state:** Our initial call to `backtrack` would look something like `backtrack([])`, where `[]` represented a permutation *copy*; that is, each new call to backtrack would involve copying whatever is being currently used for the permutation and *then* adding something to it.
- **Shared state:** The initial call to `backtrack` would look like `backtrack()`, where the permutation being processed on each call to `backtrack` would be managed *outside* of the `backtrack` function (e.g., using a global or class variable).

Let's see if we can come up with an acceptable solution for both versions above (i.e., one that uses separate state for each permutation and one that uses shared state):

<CodeEditor initialCode={snippet1} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

Hopefully we were able to come up with one (or both!) of the solutions below:

<CodeGrid>
<CodeGridCell>

```python title="Version 1 (new copy for each child)"
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = [] # global variable for result to return

        def backtracking(perm):
            if len(perm) == len(nums):
                res.append(perm) # append the permutation itself (i.e., the partial solution that is now complete)
            for num in nums:
                if num not in perm:
                    backtracking(perm + [num]) # make copy of parent and add new number for new permutation representation
      
      
        backtracking([])
        return res
```

</CodeGridCell>
<CodeGridCell>

```python title="Version 2 (single state modified in-place)"
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []  # global variable for result to return
        perm = [] # global variable for partial solution (shared state)
        def backtracking():
            if len(perm) == len(nums):
                res.append(perm[:]) # append a copy of the current state of the permutation (because the current partial solution is now complete)
            else:
                for num in nums:
                    if num not in perm:
                        perm.append(num)  # add new number to current state of perm
                        backtracking()
                        perm.pop()        # undo change after recursive call (remove number from current stat of perm)
        backtracking()
        return res
```

</CodeGridCell>
</CodeGrid>

Some details worth noting about the solutions above:

- `res`: In both cases, `res` is a place (i.e., global variable) to store all the permutations as we find them.
- **Nested function:** We use a nested function in Python so that `res` and `nums` are like "global variables" for the `backtracking()` function. The same is true for `perm` in the second version. This is just for the convenience of not having to pass them as parameters each time.
- **Partial solution:** `perm` is the current partial permutation in both versions. The root of the decision tree is an empty list; hence, in the first version, we pass an empty list to the outer `backtracking([])` call. In the second version, we initialize the variable `perm = []` in the outer scope.
- **Generating children/partial solutions:** The `for` loop generates all the children of `perm` on the fly. In the first version, for each number that is not yet in `perm`, we simply create a new list by appending it at the end, and then we pass that new list to the recursive call. In the second version, for each number, we *surround* the recursive call with the code to transform the current partial solution into the child before the call (appending a number) and then the code to reverse the change after the call (popping that number).
- **Complete solutions:** A solution is complete if it contains every number. This corresponds to the base case in `backtracking()`, where we add the permutation to `res`. In the first version, since each partial solution is independent from its parent, we can add `perm` directly to `res`. In the second version, we need to make a copy of the global state using `perm[:]`. Otherwise, we would add a reference of `perm` to `res`, and the reference would be modified when we modify `perm`!
- Try in leetcode what happens if you remove the `[:]` from `perm[:]`.
- Try in leetcode what happens if you remove the line `perm.pop()`. You will see that the code breaks if we forget to undo the changes to the state.

The code in both solution versions above can be simulated on [Python Tutor](https://pythontutor.com/python-compiler.html#mode=edit). For the first version, we can see that each recursive function has its own partial permutation:

<div align='center' className='centeredImageDiv'>
  <img width='550px' src={require('./f22.png').default} />
</div>

For the second version, we can see there is a single global partial permutation:

<div align='center' className='centeredImageDiv'>
  <img width='550px' src={require('./f23.png').default} />
</div>

In the second version, the `perm` array would have the following values over time:

```
[]
[1]
[1, 2]
[1, 2, 3]
backtrack: [1, 2]
backtrack: [1]
[1, 3]
[1, 3, 2]
backtrack: [1, 3]
backtrack: [1]
backtrack: []
[2]
[2, 1]
[2, 1, 3]
backtrack: [2, 1]
backtrack: [2]
[2, 3]
[2, 3, 1]
backtrack: [2, 3]
backtrack: [2]
backtrack: []
[3]
[3, 1]
[3, 1, 2]
backtrack: [3, 1]
backtrack: [3]
[3, 2]
[3, 2, 1]
backtrack: [3, 2]
backtrack: [3]
backtrack: []
```

The source for the outline of the `perm` array above may be found in [this article](https://medium.com/algorithms-and-leetcode/backtracking-e001561b9f28).

##### Extra state (3)

A common optimization for backtracking algorithms is to *add extra state*: instead of recomputing some information about the current partial solution inside each recursive call, we can add extra fields to the state and update them along with the partial solution.

Both solution versions for generating permutations had the following two lines which take $O(n^2)$ time:

```python
for num in nums:
    if not num in perm:
        # ...
```

There are $n$ numbers, and checking if a number is in an $n$-length list takes $O(n)$ time. To improve on this, we could also keep track of the *set* of remaining elements. Now the state looks as follows as we traverse the decision tree (the set in curly braces denotes the elements we can choose from):

<div align='center' className='centeredImageDiv'>
  <img width='550px' src={require('./f24.png').default} />
</div>

The extra information furnished by the set allows us to quickly check which numbers can be used to extend the current state. In the updated solution below, note how `perm` and `unused` are *updated together before and after the recursive call*. The result is that we now only take `O(len(unused))` time at each node:

```python title="Version 3 (extra info in state)"
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        perm = []
        unused = set(nums)

        def backtrack():
            if len(perm) == len(nums):
                res.append(perm[:])
            else:
                for num in list(unused):
                    if num in unused:
                        perm.append(num)
                        unused.remove(num)
                        backtrack()
                        unused.add(num)
                        perm.pop()

        backtrack()
        return res
```

###### Example 2 (subsets, LC 78)

**Problem:** Generate all subsets of a set of distinct numbers (<LC id='78' type='long' ></LC>).

Generating or considering subsets, along with permutations, is another other archetypal backtracking problem. Many backtracking problems can be reduced to finding subsets of the input. We drew the decision tree for generating subsets previously so now let's talk about the various design choices concerning state.

There are *several* ways to represent the partial solutions for this problem. We can store the elements that we pick in the subset in an array, `subset`, and we can use an index `i` to denote the next element for which we need to make in inclusion or exclusion decision.

Following the rule of thumb discussed previously, we modify `subset` in-place but pass `i` by copy:

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        ans = []
        subset = []
        def backtracking(i):
            if i == len(nums): # no more elements to consider (reached a leaf)
                ans.append(subset[:])
            else:
                subset.append(nums[i])  # include nums[i] in the subset
                backtracking(i+1)       # continue with nums[i] as part of the subset
                subset.pop()            # exclude nums[i] from the subset
                backtracking(i+1)       # continue without nums[i] as part of the subset
                
        backtracking(0)
        return ans
```

In the recursive calls, where we skip `nums[i]`, we do not change `subset` &#8212; we simply increment `i`.

Another representation of partial solutions we could use for this problem is a boolean array, `picked`, where `picked[i]` indicates whether or not the `i`th number of the input should be included in the subset or not. If we let `a`, `b`, and `c` denote the input numbers for an instance of a 3-element set, then the decision tree would look as follows (`0` means `false` (skip), `1` means `true` (pick), and `'-'` means still not decided):

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('./f25.png').default} />
</div>

At the root, we have not yet made a decision; hence, we initialize `subset[i] = None` for every `i`. Each partial solution has two children which conveys the binary nature of the decision that has to be made for each subsequent element as we encounter it: include the next element or exclude the next element (above, we start by deciding what to do with `a`, then `b`, and then finally `c`). At the leaves, we construct the subset based on all the decisions made through the path from the root to the leaf. We pass the index of the next item for which we need to make a decision as a parameter to the recursive function.

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        n = len(nums)
        subset = [None] * n
        def backtrack(i):
            if i == n:
                res.append([ nums[idx] for idx in range(n) if subset[idx] ])
            else:
                subset[i] = True    # include nums[i]
                backtrack(i + 1)    # proceed with nums[i] included
                subset[i] = False   # exclude nums[i]
                backtrack(i + 1)    # proceed with nums[i] excluded
                subset[i] = None    # return to original state
        backtrack(0)
        return res
```

Strictly speaking, the line `subset[i] = None` is not actually necessary in the code above. Why? Because the other branches in the decision tree will simply overwrite the assignment. Nonetheless, as a general rule, to be safe, *always undo all changes made to the partial solution* when state is shared. In most other problems, we would likely break things by not including the line `subset[i] = None` (i.e., this line returns the partial solution back to its original state).

It's worth mentioning that there is also a clever trick for generating all subsets using the binary representation of the integers from $0$ to $2^n-1$, but you don't really need to learn it (focus on learning concepts instead of tricks):

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        ans = []
        for subset in range(2 ** n):
            ans.append([nums[i] for i in range(n) if subset & 1 << i ])
        return ans
```

This trick works because the sequence of binary (`0`/`1`) decisions at the leaves look like the binary representations of the numbers from $0$ to $7$ (we can see this more clearly if we look at the drawing of the decision tree).

### Analysis

The runtime of a backtracking algorithm basically depends on two things: 

1. the size of the decision tree, and
2. the time spent per node.

We can bound the size of the decision tree with the formula 

```a title="Runtime analysis for backtracking decision trees"
O((branching factor)^(max depth))
```

It may be possible to give a better bound, but doing so can be tricky.

In the example of generating permutations, the branching factor is `n`, and the depth is `n`. Thus, the number of nodes is $O(n^n)$. However, with a more careful analysis (i.e., [more mathematical](https://math.stackexchange.com/questions/2030469/expression-for-nnn-1nn-1n-2-n)), we can find that the total number of nodes is actually $O(n!)$, which is a better bound than $O(n^n)$. That is, $O(n^n)$ is, in fact, an upper bound, but it may not be tight (i.e., a smaller upper bound may exist, which would be more reflective of the actual worst-case runtime). Fortunately, coding interviews do not evaluate this type of math; hence, for interviews, the formula `O((branching factor)^(max depth))` is generally considered *good enough* for the size of the tree.

The other factor to consider is how much time we spend on each node. More precisely, for internal (non-leaf) nodes, we care about the time spent *per child*. For leaf nodes, however, we care about the total time spent at the node. In the case of generating permutations (solution version three), in the internal nodes, we spend $O(1)$ time per child. In the leaves, we spend $O(n)$ time to make a copy (we make the copy to add to the final results array which is returned after traversing the decision tree). Thus, we can say that the total runtime is $O(n\cdot n!)$.

The reason why we care about the time spent per child for non-leaf nodes, as opposed to the total time spent in that node (which is $O(n)$ in the case of the third solution version for generating permutations), is due to an advanced big-O analysis technique called "amortized analysis" (this is more advanced than the big-O knowledge expected in interviews so we can usually get away with ignoring such details).

In terms of space, backtracking is quite efficient. Space consumption is basically never a concern in backtracking (because it is almost always insignificant in comparison to the runtime). We basically have the following depending on whether or not we manage partial solutions by making copies or modifying a partial solution in-place:

- `O(depth * (space of a partial solution))` if make copies of the state
- `O(depth + (space of partial solution))` if we modify the state in-place.

### Pruning (with practice problems)

We previously saw that the runtime of a backtracking algorithm depends on two things: the size of the decision tree as well as the time spent at each node. Of the two, *the size of the decision tree is the most important**. To make backtracking more efficient, the best thing we can generally do is make the decision tree smaller. 

We can try doing the following to make the decision tree smaller:

- **Branching factor:** Reduce the branching factor. Try to design a decision tree with a smaller branching factor (e.g., placing the queens *by row* instead of *by random cell* for the `n`-queens problem).
- **Dead ends:** Identify *dead ends* in the decision tree and avoid them in the search. This is called *pruning*, and, in fact, the name "backtracking" comes from this technique. Before generating the children of a partial solution, we check some condition that tells us whether or not the partial solution is a dead end. If so, we backtrack immediately; otherwise, we continue our search.

Pruning is not always a possibility with backtracking &#8212; it will depend on the structure of the problem. For all example problems below, let's try to solve them before we look at the solution.

#### 1 - Balanced parentheses (LC 22)

- **Link:** <LC id='22' type='long' ></LC> 
- **Problem statement:** 

  > <LC22PS />

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet2} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 2 - N-queens (LC 51)

- **Link:** <LC id='51' type='long' ></LC> 
- **Problem statement:** 

  > <LC51PS />

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet3} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 3 - Number of paths in a grid (non-LC)

- **Link:** Non-LC
- **Problem statement:** 

  > Count the number of paths in a `n x n` grid from the top-left cell, to the bottom-right cell, that go through every cell once. (Similar to <LC id='980' type='long' ></LC> but not exactly the same).

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet4} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 4 - Restore IP addresses (LC 93)

- **Link:** <LC id='93' type='long' ></LC> 
- **Problem statement:** 

  > <LC93PS />

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet5} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 5 - Knapsack problem (non-LC)

- **Link:** Non-LC
- **Problem statement:** 

  > In the [knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem), we have a knapsack or bag with a total capacity, `C`, and we have a set of items that we can put in the knapsack. Each item has a value `values[i]` and takes up a certain capacity `weights[i]`. The goal is to fill the knapsack with the maximum value without exceeding the total capacity.
  >
  > For example, the input
  >
  >```
  >C = 10, values = [3,6,8,10], weights = [1,4,5,6]
  >```
  >
  > should yield an output of `[0,1,2]` because these items have a total weight of `10` and a value of `17`, which is the maximum among all options that do not exceed weight `10`.

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet6} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 6 - Knight's tour (non-LC)

- **Link:** Non-LC
- **Problem statement:** 

  > In the [knight's tour problem](https://en.wikipedia.org/wiki/Knight%27s_tour), a knight starts at the top-left corner of an `n x n` chess board, and the knight has to visit every square, making knight moves, and without repeating any square. If a knight's tour is possible, print one such sequence of moves on the board; if not, then return `None`.

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet7} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 7 - Sudoku solver (LC 37)

- **Link:** <LC id='37' type='long' ></LC> 
- **Problem statement:** 

  > <LC37PS />

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet8} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

#### 8 - Permutation shifts (non-LC)

- **Link:** Non-LC
- **Problem statement:** 

  > Given a word `w` consisting of unique lowercase English letters, return, in any order, all the permutations of `w`. In each permutation, include, in front of each letter, how many positions that letter shifted to the right from its position in `w`.
  >
  > For example, suppose the input is `word = "abc"`. Then the desired output would be the following:
  >
  >
  >```python
  >["0a0b0c", "0a-1c1b", "-1b1a0c", "-1b-1c2a", "-2c1a1b", "-2c0b2a"]
  >```

- **Interactive attempt:** 

  <CodeEditor initialCode={snippet9} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

- **Discussion:** TBD

### Additional Practice

The following problems can be solved with everything provided above. For each problem, think about the decision tree first (i.e., before starting to code). Then, think about the three implementation decisions for state previously discussed.

#### Enumeration

- <LC id='17' type='long' ></LC> 
- <LC id='78' type='long' ></LC> 
- <LC id='77' type='long' ></LC> 
- <LC id='46' type='long' ></LC> 
- <LC id='47' type='long' ></LC> 
- <LC id='22' type='long' ></LC> 
- <LC id='51' type='long' ></LC> 
- <LC id='39' type='long' ></LC> 
- <LC id='40' type='long' ></LC> 
- <LC id='216' type='long' ></LC> 
- <LC id='320' type='long' ></LC> 

#### Counting

- <LC id='526' type='long' ></LC> 
- <LC id='52' type='long' ></LC> 
- <LC id='980' type='long' ></LC> 
- <LC id='377' type='long' ></LC> 
- <LC id='1467' type='long' ></LC> 
- <LC id='1079' type='long' ></LC> 

#### Optimization

- <LC id='1219' type='long' ></LC> 
- <LC id='1601' type='long' ></LC> 
- <LC id='752' type='long' ></LC> 

#### Feasibility

- <LC id='842' type='long' ></LC> 

For more problems, see the [backtracking tag](https://leetcode.com/problem-list/backtracking/) on LeetCode (it's somewhat better curated than many of the other problem tags).

### Backtracking vs. other paradigms

Recall that backtracking can be used for enumeration, counting, optimization, and feasibility problems. There are four algorithm design paradigms, including backtracking, which are commonly used for such problems. In fact, it is possible to describe all of them in terms of decision trees (even though the other three paradigms are not usually thought of in terms of decision trees):

| DESIGN PARADIGM | DESCRIPTION |
| :-- | :-- |
| **Brute force/exhaustive search** | Iterate through all possible solutions. Note that backtracking *without pruning* may be considered a form of brute force or exhaustive search. |
| **Backtracking** | Traverse a decision tree, and prune future decisions to be made when possible. |
| **Dynamic programming** | DP is kind of like traversing a decision tree. But instead of thinking of each node as a *partial solution* of the full problem, we think of each node as a *smaller subproblem* which we solve independently of the original problem. In DP, there are many repeated/overlapping subproblems. The central technique in DP is to avoid revisiting repeated subproblems. Instead, we store the result for each subproblem in a table or a dictionary, and then we use that stored value if we revisit that subproblem again. This is called memoization. We can also do memoization in backtracking if the decision tree has repeated partial solutions. That is, we can "prune" repeated partial solutions by storing the result for it. However, the number of partial solutions in backtracking is usually exponential, which is why memoization in a backtracking context is usually not useful or viable. |
| **Greedy** | Navigate the decision tree *directly to the optimal solution*. In order to be able to do this, we must be able to analyze the children of a partial solution and be able to tell which one leads to the optimal solution. Greedy algorithms are tricky because sometimes a "rule" makes sense and seems optimal but is actually suboptimal for some special case that we didn't anticipate or think about. Many problems are not amenable to greedy algorithmic solutions. |

In the previous practice problems, we knew we were supposed to use backtracking, but, in an interview setting, it can be confusing to choose between the four paradigms outlined above. How do we know when we should use backtracking as opposed to some other algorithm design paradigm?

#### Dynamic programming

Dynamic programming algorithms are often much faster than backtracking. DP is most commonly used for optimization problems, but it can also be used for counting and feasibility problems. DP doesn't make much sense for enumeration problems because if the output size itself is already exponential then we may as well use backtracking. DP makes much more sense when the number of *unique subproblems* is small (usually $O(n)$ or $O(n^2)$, sometimes more) but the number of *repeated subproblems* is large (usually exponential).

An example of where it makes sense to use DP is the following problem: 

> Count the number of different ways to get to the top of $n$ stairs if you may climb 1 or 2 steps at a time. 

Here is a picture for the case with $n=5$ steps:

<div align='center' className='centeredImageDiv'>
  <img width='300px' src={require('./f34.png').default} />
</div>

As $n$ becomes bigger, the number of ways to get to the top grows exponentially (in fact, it is the same as the Fibonacci formula). Thus, a backtracking algorithm that traverses the decision tree of all the ways to get to the top would take exponential time. And, if we wanted to enumerate all the ways to get to the top, that would actually be the best thing to do.

However, since we are *only counting*, it does not matter how we get to a step, only the number of ways to get there. Since there are only $n$ different steps, there are only $n$ different count values. Without getting into how DP works, by storing the number of ways to get to each step and reusing those values, DP can improve the runtime to linear time.

In the third pruning practice problem above (i.e., "number of paths in a grid"), we could have also memorized the values of subproblems. For instance, the number of paths that we can complete for each of the partial paths below is the same:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f35.png').default} />
</div>

#### Greedy algorithms

Greedy algorithms are used in optimization problems. We can use a greedy algorithm for problems that have some additional structure that allows us to navigate quickly to the optimal solution. Greedy is much faster than backtracking, but not all problems have enough structure to be able to navigate to the solution directly.

An example would be the following scheduling problem:

> You are given a list of $n$ tasks, each with a starting time $s_i$ and an ending time $e_i$, where $0\leq i < n$. What's the maximum number of non-overlapping tasks?

We can think about the decision tree of all possible subsets of tasks, which would have exponential ($2^n$) size. A backtracking algorithm could prune a branch as soon as we find a conflict. However, it turns out that there is a simple greedy rule that is optimal for this problem: always choose the task with the earliest end time and throw out the tasks that overlap with it.

In this example, we would choose task $d$ and throw out $a$, $c$, $e$, and $f$. Then, we would choose $b$ and throw out $g$:

<div align='center' className='centeredImageDiv'>
  <img width='450px' src={require('./f36.png').default} />
</div>

With this rule, we can quickly navigate the decision tree towards the optimal solution. The bottleneck of the greedy algorithm is sorting, which takes $O(n\log n)$ time.

How do we know if there is a greedy algorithm? It is actually not easy to know at all. The best way is to try some greedy rule that "makes sense", and then try to find a counterexample where it doesn't work. If you can't find any counterexample, then the rule may be optimal. The only way to know for sure is with a mathematical proof.

### Advanced variations

We now cover variations, alternatives, and optimizations for backtracking. They are not mutually exclusive, and they are not always applicable. Which ones we can/should use depend on the problem. But 90% of backtracking problems don't need any of them.

#### 1. Dealing with repeated states

Repeated partial solutions are backtracking's kryptonite. In particular, there are two difficult scenarios for backtracking:

1. Repeated partial solutions in different branches of the decision tree.
2. Repeated partial solutions in the same branch of the decision tree.

The first scenario makes backtracking *redo* work, potentially slowing it down a great deal. This is why it is important to design the decision tree to avoid repeated states. However, in this scenario, backtracking would still finish, as the decision tree is finite.

The second scenario is problematic in a more fundamental sense: the decision tree is infinite, and thus backtracking may get stuck in an infinite loop.

There are two simple solutions for these scenarios, but both can be quite expensive in terms of space.

1. **DFS + visited set.** We can keep doing backtracking as usual, exploring the decision tree in depth-first order, but we now keep track of all visited partial solutions as we would in a "normal" DFS. For example, we can store visited partial solutions in a hash table.
2. **BFS.** We can explore the decision tree by layers using a breadth-first search (also known as level-order traversal in the context of binary trees). As usual, in BFS, we use a queue to keep track of the partial solutions to visit.

    The problem with both solutions above is that we usually deal with a decision tree whose size is exponential relative to its input size. For example, this is the case for the decision trees for combinations and permutations. The first solution would require storing *every partial solution* in the tree. In the case where we are looking for only one solution, BFS is a viable option if we know the solution is not very "deep" in the decision tree, as BFS visits the decision tree by layers, so it won't waste time in layers below the solution.

    Even though BFS only requires storing one layer, space-wise it can still easily be too much. In fact, if the branching factor is $2$ or more, each layer of the tree has more nodes than every previous layer combined, so "just" having to store one layer is at best a 50% reduction of memory usage.

    For example, if the branching factor is $3$, then the number of nodes per layer is $1$, $3$, $9$, $27$, $81$, $\ldots$, and, for any $i > 1$, $3^i$ is bigger than the sum of all the powers of $3$ up to $i-1$.

3. **[Iterative-deepening DFS](https://en.wikipedia.org/wiki/Iterative_deepening_depth-first_search).** This algorithm explores the nodes by layers like BFS, and with the same time complexity as BFS, but with the same space complexity of DFS. Thus, it gets the best of both worlds. The trade-off is that it is a bit slower (by a constant factor) than DFS or BFS.

    The idea is to start with a depth limit of $1$ and iteratively increment this limit by one. For each depth, we do a "normal" DFS on the decision tree, but we cut any branches that go deeper than the current depth limit.

    On the surface, iterative-deepening seems wasteful: every time we increment the depth, we restart the DFS from scratch. That means that if we explore up to depth $10$, then nodes at depth $9$ will be explored in two DFSs, nodes at depth $8$ will be explored in three DFSs, and so on.

    However, because the tree grows exponentially, all this repetition is actually not as much as it seems. We can do the math for a decision tree with branching factor $2$ and depth $10$:

    ```
    Depth   #visits   #nodes    total visits
    1       10        1         10
    2       9         2         18
    3       8         4         32
    4       7         8         56
    5       6         16        96
    6       5         32        160
    7       4         64        256
    8       3         128       384
    9       2         256       516
    10      1         512       512
    Total             1023      2040
    ```

    Iterative deepening DFS visits a total of $2040$ nodes, and it only uses the space needed for $10$ recursive calls. In contrast, BFS would explore $1023$ nodes (about half), but it would need space to store $512$ partial solutions.

    If the branching factor is greater than $2$, then iterative deepening DFS looks even better. For example, if the branching factor is $4$, then we get the following:

    ```
    Depth   #visits   #nodes    total visits
    1       10        1         10
    2       9         4         36
    3       8         16        128
    4       7         256       1792
    5       6         1024      6144
    6       5         4096      20480
    7       4         16384     65536
    8       3         65536     196608
    9       2         262144    524288
    10      1         1048576   1048576
    Total             1398037   1863598
    ```

    Iterative deepening DFS visits a total of $1863598$ nodes, and it still only uses the space needed for $10$ recursive calls. In contrast, BFS would explore $1398037$ nodes (about $3/4$), but it would need space to store $1048576$ partial solutions.

    Consequently, unless we know that the decision tree is small enough that we will not run out of memory, then iterative-deepening DFS is a better option than normal DFS with a visited set or BFS.

#### 2. Branch-and-bound optimization

If the problem is an *optimization problem*, where we need to find the *best* solution in the decision tree among many, we can use the [branch-and-bound optimization](https://en.wikipedia.org/wiki/Branch_and_bound). The idea is to keep track of the best solution found so far (we need to do this anyway) and prune branches when we know that every solution in that branch will be worse than the best solution found so far.

The most natural case of this is when we are trying to find the solution closest to the root. For example, this may be because the problem is to solve a puzzle and we are trying to solve it in the fewest possible moves. In this case, we can prune any branch that exceeds the depth of the shallowest solution found so far.

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f37.png').default} />
</div>

#### 3. Informed search / best-first search

The goal of informed search / [best-first search](https://en.wikipedia.org/wiki/Best-first_search) is to avoid visiting parts of the decision tree by focusing on the "promising" parts of the tree. It applies to problems where we don't need to visit the entire search tree. Thus, it applies to *feasibility problems*, where we are just trying to find one valid solution, or to *optimization problems*, where we are trying to find the best solution, but only if we use the branch-and-bound optimization. It doesn't apply to problems where we are trying to enumerate all solutions or count the number of solutions.

The idea is to prioritize nodes in the decision tree that are more *promising*. By promising, we mean that the partial solution "looks like" it has a higher probability to lead to a valid/good solution. In general, we cannot know for certain which partial solutions are the best (if we could always tell, then we wouldn't need backtracking; we could just use a greedy algorithm!), but even an educated guess can be enough to speed up the search. The function used to gauge the "promisingness" of the partial solutions is called a "heuristic" or "heuristic evaluation function", and it depends entirely on the problem.

For example, one of the "hard" problems for backtracking is the 8-puzzle problem: <LC id='773' type='long' ></LC>.

As we saw before, this is one of the problems where the decision tree is infinite because we can reach previous configurations. For this problem, we can guide the search by selecting promising positions first: for promisingness, we can use the number of misplaced tiles (fewer is better). Even better, we can use the sum of the [Manhattan distance](https://en.wiktionary.org/wiki/Manhattan_distance) from each tile to its target position (this sum is `0` for the final solution, so a smaller sum is better).

Once we have a good heuristic, we can use it in two notable ways:

1. Explore the decision tree in a depth-first order fashion as usual in backtracking, but, instead of visiting the children of each node in an arbitrary ordering, sort the children according to the heuristic, and then visit them in that order.

    Recall that pruning dead ends in the decision tree is the main optimization in backtracking. For the children that we cannot prune, at least we can order them, and, hopefully, we will find a solution in the early children and we won't need to explore the "worse" ones.

2. Do not visit the decision tree in depth-first order. Instead, use a *priority queue* to keep track of the partial solutions to explore, prioritized according to the heuristic. We start each iteration by exploring the most promising partial solution. Then, all its children are evaluated according to the heuristic and added to the priority queue.

The second approach above guides the search more effectively since it is not restricted to going in depth-first order, but it also requires much more memory since the priority queue can grow exponentially. A variation on the second approach is the [A* algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm), which is one of the most popular algorithms in AI (but not likely to come up in coding interviews).

#### 4. 2-player games

Zero-sum 2-player games like chess and checkers are interesting from a decision tree perspective: we can still model all the possible game positions as a decision tree, but, at each depth, the player making the move flips, and players have opposite goals.

Let's say player 1 is to move in some position. The position is winning for player 1 if there exists a move that wins the game or there is a move such that for every possible response by player 2, the resulting position is winning for player 1 (this is a recursive definition).

The classical search algorithm for choosing moves in a 2P game is called minimax. If you're interested, learn more about the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax). It assigns a value to each game position. A value of `0` means a neutral position, and more positive values means the position is more favorable for player 1. $+\infty$ means winning for player 1, $-\infty$ means winning for player 2. It is called *minimax* because one player is trying to maximize the value of the position and the other player is trying to minimize it. This means that, at each depth of the search tree, the search must alternate between choosing the maximum among the children and the minimum among the children.

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f38.png').default} />
</div>

#### 5. Iterative backtracking

So far, we have only shown how to do backtracking recursively, as that is a very fitting mechanism for traversing trees. Additionally, we don't need to worry about stack overflow, which is one of the limitations of recursion. This is because decision trees are extremely shallow relative to their size. However, everything we have shown can also be done iteratively. In short, instead of using the implicit call stack, we can use an explicit stack data structure. We don't go into details because there is not really any practical application for this in coding interviews.

### Resources

- The [Competitive Programmer's Handbook](https://cses.fi/book/book.pdf) has a chapter on backtracking which is very good, but it is aimed at people who are already good at algorithms (i.e., it does not always show all the steps). It covers the following techniques: backtracking, pruning, and meet-in-the-middle. It has 5 problems: subsets, permutations, n-queens, number of paths in a maze, and subset sum. The language is C++.
- [Youtube channel](https://www.youtube.com/channel/UCZCFT11CWBi3MHNlGf019nw/search?query=backtracking) with some whiteboard videos. It includes "branch and bound". The production quality is not the highest, but the content itself seems pretty good.
- [Video explanation](https://www.youtube.com/watch?v=qBbZ3tS0McI) of the generating all balanced parentheses problem (in Java).
- A [lecture on backtracking](https://www.youtube.com/watch?v=NdF1QDTRkck) from Stanford (I hope to one day be as good at teaching as this professor is!).
- A [high-quality lecture](https://www.youtube.com/watch?v=WbzNRTTrX0g) from Harvard (great speaker!) covering DFS, BFS, best-first search, A*, and minimax. These topics are tackled from the perspective of AI, which is a bit different to how we think about these topics in coding interviews.
