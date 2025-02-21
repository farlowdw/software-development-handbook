---
title: >-
  Dynamic Programming: Learning Adventures
description: >-
  Sandbox for dynamic programming thoughts
unlisted: true
custom_edit_url: null
slug: /dp
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

import snippet1 from '!!raw-loader!./snippet-1.py';
import snippet2 from '!!raw-loader!./snippet-2.py';
import snippet3 from '!!raw-loader!./snippet-3.py';
import snippet4 from '!!raw-loader!./snippet-4.py';
import snippet5 from '!!raw-loader!./snippet-5.py';
import snippet6 from '!!raw-loader!./snippet-6.py';
import snippet7 from '!!raw-loader!./snippet-7.py';
import snippet8 from '!!raw-loader!./snippet-8.py';
import snippet9 from '!!raw-loader!./snippet-9.py';
import snippet10 from '!!raw-loader!./snippet-10.py';
import snippet11 from '!!raw-loader!./snippet-11.py';
import snippet12 from '!!raw-loader!./snippet-12.py';
import snippet13 from '!!raw-loader!./snippet-13.py';
import snippet14 from '!!raw-loader!./snippet-14.py';

import LC746PS from '@site/docs/_Partials/problem-stems/lc746.md';
import LC70PS from '@site/docs/_Partials/problem-stems/lc70.md';
import LC63PS from '@site/docs/_Partials/problem-stems/lc63.md';
import LC64PS from '@site/docs/_Partials/problem-stems/lc64.md';
import LC139PS from '@site/docs/_Partials/problem-stems/lc139.md';
import LC1143PS from '@site/docs/_Partials/problem-stems/lc1143.md';
import LC300PS from '@site/docs/_Partials/problem-stems/lc300.md';
import LC1312PS from '@site/docs/_Partials/problem-stems/lc1312.md';
import LC1155PS from '@site/docs/_Partials/problem-stems/lc1155.md';
import LC410PS from '@site/docs/_Partials/problem-stems/lc410.md';
import LC337PS from '@site/docs/_Partials/problem-stems/lc337.md';
import LC329PS from '@site/docs/_Partials/problem-stems/lc329.md';

This page is largely a sandbox meant for collecting thoughts related to dynamic programming (DP). It is a work in progress and likely will be for some time.

<!--truncate-->

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

:::info Interviewing IO Observations

The following observations/notes are from reading about dynamic programming in an IIO guide. Several of the first sections (information gathering x1) are more like paraphrasing. Subsequent sections are more independent.

:::

## Information gathering (x1)

### Practice makes better

The best way to become comfortable with dynamic programming (DP) is to *practice*. Specifically, there are 14 [practice problems](#practice-problems) at the bottom of this page, ordered from easier to harder, that aim to introduce the central ideas of DP *gradually* (no prior experience with DP is necessary). Always try to solve the problems yourself before looking at the discussion/solution.

Of course, practice is *not* just about solving a narrowly restricted set of problems &#8212; it is critically important to get comfortable with developing a framework/template that can be followed *under pressure* in the context of an interview.

Fortunately, all DP problems have similarities that make it possible for us to roughly follow the same template for each one of them. Before venturing into the practice problems though, we'll consider building up a framework in two parts:

1. Recurrences
2. Implementation

Practice problem discussions/solutions will then show exactly how the framework is applied.

In general, we should note that DP is one of the frameworks where there are *many* ways to go about designing the algorithm you ultimately use to solve whatever problem is at hand. This can be liberating for seasoned veterans, but it can also be confusing for the beginner. The ultimate goal is for *you* to come up with *your* preferred way of doing things. The more you can get comfortable in your own "problem-solving skin" the better. Eventually, you'll find yourself refining *your own template*. The best way to get to that point is by practicing and trying to gain an intuition for how, when, and where DP is used and in what ways.

Throughout this process, it's a good idea to take note of the key things to rememeber and the common mistakes you make (i.e., essentially maintain a "bug list"). This makes it possible for you to get better and better at employing your own DP template when appropriate.

The most important thing for solving problems with DP is to be able to solve those problems with an acceptable runtime. That's the whole goal of DP after all &#8212; use cached solutions to overlapping subproblems. Once we get a feel for how to do this, then we may venture on to two other important, albeit more advanced, DP topics:

1. Space optimization (sometimes we can cut down on memory usage by trimming what is not entirely necessary)
2. Solution reconstruction (sometimes we seek a constructive result instead of an existential one)

### What really is DP?

Dynamic programming is an *algorithm framework* (i.e., a general strategy for solving problems with certain characteristics). Other algorithm frameworks include the following: divide and conquer, sliding window, backtracking, etc.

### What characteristics does a problem need to have in order to use DP?

Generally speaking, we should think about the possibility of trying to use DP when a problem satisfies *at least* the following two properties:

1. *Optimal substructure:* The problem can be "broken down" into smaller but similar subproblems, and the solutions to those subproblems can help us find the solution to the original problem. In turn, each series of subproblems can be broken into smaller and smaller subproblems in the same way, and so on, until we've reached some sort of "atomic" state where nothing can be broken down anymore (i.e., we've reached a situation where the problem is as simple as it could possibly be and the solution is trivial).
2. *Overlapping subproblems:* Two or more subproblems are broken down into smaller subproblems that contain the same subproblem.

The simplest kind of problem where DP is applicable is one where we're tasked with using a math formula to make computations where the math formula is defined in terms of itself for smaller values. The quintessential example is using the formula

$$
F_n = F_{n-1} + F_{n-2},\quad n > 1
$$

to compute the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence), where $F_0=0$ and $F_1=1$ are assumed/defined.

The problem of computing $F_n$ given some $n>1$ has optimal substructure since $F_n$ is "broken down" into $F_{n-1}$ and $F_{n-2}$, where the solutions to $F_{n-1}$ and $F_{n-2}$ help us find the solution to $F_n$. Our computational problem also has overlapping subproblems because computing both $F_n$ and $F_{n-1}$ relies on computing $F_{n-2}$. 

For example:

- $F_6 = F_5 + \boxed{F_4}$
- $F_5 = \boxed{F_4} + F_3$

Essentially, we have the following concerning the characteristics remarked on above that indicate DP may be used as a problem-solving strategy:

- **Good (optimal substructure):** A problem that has optimal substructure is *good*. This means we can write algorithms that find the solutions to the subproblems first, recursively, and then use those solutions to get the solution to the original problem.
- **Bad (overlapping subproblems):** It is *bad* if solving a problem necessarily involves solving overlapping subproblems. Why? Because, if we're not careful, then whatever algorithm we write may be horribly inefficient.

### Why are overlapping subproblems bad?

If we write an algorithm to solve a problem that works by computing the solutions to subproblems, and those subproblems overlap, then we may end up repeating a ton of computational work. For example, consider the problem of calculating $F_6$. This involves computing $F_5$ and $F_4$, which, in turn, involves computing $F_4$ and $F_3$ (i.e., $F_5 = F_4 + F_3)$ as well as $F_3$ and $F_2$ (i.e., $F_4 = F_3 + F_2$). And so on. Things get out of hand quickly &#8212; the size of our computational tree grows exponentially (the circles with the same color are repeated subproblems):

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f1.png').default} />
</div>

Note that the number of *unique* subproblems is $n$, but the number of repeated subproblems grows exponentially (the importance of having a manageable number of unique subproblems will be remarked on more later).







## Information gathering (x2)

### DP overview

The [computer science](https://en.wikipedia.org/wiki/Dynamic_programming#Computer_science) explanation of DP on Wiki is succinct and nice.

### DP applicability

A DP algorithm is worth considering when a problem exhibits [optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure) *and* [overlapping subproblems](https://en.wikipedia.org/wiki/Overlapping_subproblems).

### Optimal substructure

As [a Wiki excerpt notes](https://en.wikipedia.org/wiki/Dynamic_programming#Computer_science), "*optimal substructure* means that the solution to a given optimization problem can be obtained by the combination of optimal solutions to its sub-problems." This seems to be a bigger deal than most learning resources indicate. There's a more extended discussion of what it means for a problem to have an optimal substructure in CLRS <BibRef id='TC2022' pages='pp. 382-387'></BibRef>. The authors note how the "unweighted shortest path" problem exhibits optimal substructure whereas the "unweighted longest simple path" problem does not (they emphasize that the subproblems in finding the longest simple path are not *independent*, whereas for shortest paths they are, where by "independent" they mean that the solution to one subproblem does not affect the solution another subproblem of the same problem). They also note in an exercise (14.3-5) that the rod-cutting problem no longer has the optimal substructure property if we introduce a limit on the number of pieces of length allowed to be produced. This is definitely a resource worth pondering to more fully grok the optimal substructure requirement a problem must have for a DP algorithm to apply.

### Overlapping subproblems

The need for a problem to require solving overlapping subproblems is also addressed in CLRS <BibRef id='TC2022' pages='p. 387'></BibRef>, but this property is easier to see and understand than the optimal substructure property. The recursion tree for computing the $n$th Fibonacci number illustrates this property quite well.

### DP algorithm logic (optimal substructure implies recursion)

The *logic* underlying a DP algorithm is completely based on the optimal substructure observed for the problem in question. Given some input, the idea is to decompose or reduce the input into smaller and smaller inputs, which may be further decomposed or reduced, repeatedly, until the inputs are so small that we can compute the solution for the small inputs directly. The "repeatedly" part is the recursion and optimal substructure property at work, and the "direct computation" part is the base case(s) portion of the recursion.

### DP algorithm caching (overlapping subproblems implies caching)

A subproblem is never computed more than once in a DP algorithm; hence, to effectively handle overlapping subproblems, a DP algorithm must cache answers to subproblems in some manner so each cached answer can efficiently be retrieved whenever that subproblem is encountered again (i.e., "overlapped"). The primary methods used for caching subproblem solutions in DP algorithms are memoization and tabulation.

### How problems are broken down into smaller and smaller subproblems

If a DP algorithm only applies when a problem exhibits the optimal substructure property, where a problem is broken down or decomposed or reduced into smaller and smaller subproblems, then how do we actually obtain the smaller and smaller subproblems? By means of a *recurrence*; that is, the *relationship* between larger and smaller inputs/subproblems is explicitly captured by a recurrence, where the recurrence relation calculates the solution to a problem and is defined in terms of itself on *smaller* inputs.

### There are two defining parts to coming up with a DP algorithm (problem-solving and implementation)

If *optimal substructure* and *overlapping subproblems* are the two defining *properties* of any problem that may be fruitfully solved by a DP algorithm, and the optimal substructure property manifests itself in the form of a recurrence relation, then it stands to reason that *every* DP algorithm must implement a recurrence (i.e., the recurrence captures the optimal substructure property); furthermore, *every* DP algorithm must efficiently cache solutions to subproblems in order for it to be efficient to solve *overlapping* subproblems. All of this means that coming up with a DP algorithm to solve a problem necessarily boils down to two defining steps: 1) *find a recurrence* that calculates the solution and captures the optimal substructure property of the problem at hand, and 2) transform the recurrence relation into efficient code by means of one of two popular caching strategies: memoization or tabulation. The first part, coming up with a recurrence relation, may be characterized as *problem-solving* since that's where the bulk of effort will often be spent, and the second part may be characterized as *implementation* since part one will be present in either caching strategy we choose.

### Why DP is difficult

The *first* "defining part" mentioned above is largely why DP is difficult: *coming up with a recurrence* that suitably captures the optimal substructure property for a given problem requires creativity and a depth of insight not requisite in several other algorithmic techniques (e.g., two pointers, sliding window, etc.).

### House robber subproblem observation {#house-robber-exponential}

There are $2^n$ subsets of houses &#8212; to create a subset, for each of the $n$ houses, we have a binary choice of whether to put it in the subset or not. This results in $2\cdot 2\cdot 2\cdot\ldots\cdot 2$ ($n$ times) different subsets. Even if we consider only subsets of houses *without* adjacent houses, which is what we're really interested in, there is still an exponential number of subsets to consider, which means checking them all with brute force is not realistic. How do we know the number of subsets of non-adjacent houses is exponential? Let $H(n)$ denote the number of subsets of non-adjacent houses given $n$ houses. When $n=0$, there is only one subset, the empty subset; that is, $H(0) = 1$. When $n=1$, there are two subsets, the empty subset and the subset containing the single element; that is, $H(1) = 2$. In general, when $n\geq 2$, consider the possibilities for including or excluding the $n$th element. If we *exclude* the $n$th element, then the problem reduces to finding subsets of the first $n-1$ elements with the same non-adjacency condition (i.e., $H(n-1)$). If we *include* the $n$th element, then we must exclude the $(n-1)$th element to satisfy the non-adjacency condition, which means we are left with finding subsets of the first $n-2$ elements with the same non-adjacency conditions (i.e., $H(n-2)$). Consequently, when determining $H(n)$, we need to account for all of the subsets resulting from *excluding* the $n$th element as well as *including* the $n$th element: $H(n) = H(n-1) + H(n-2)$. Our base cases for this recurrence are $H(0) = 1$ and $H(1) = 2$, which means the sequence we've obtained is really the Fibonacci sequence shifted by one position. If we let $F_k$ denote the $k$th Fibonacci number, and we let $F_0 = 0$ and $F_1 = 1$ so $H(n)$ is offset from the Fibonacci sequence by two positions, then we see that $H(n) = F_{n+2}$. For example, if $n=1$, then we have $H(1) = F_3 = 2$. The important point is that the Fibonacci sequence [ehibits exponential growth](https://math.stackexchange.com/a/2981011/191378). Since $H(n)$ is just the shifted Fibonacci sequence, $H(n)$ is clearly exponential. This ultimately means we must be more efficient than brute force when looking at all of the subsets in $H(n)$.





## Forward and backward recursion in DP

:::danger Forward Recursion ≠ Tabulation and Backward Recursion ≠ Memoization

It's important to note the following from the outset:

- Forward recursion is *not* tabulation/bottom-up
- Backward recursion is *not* memoization/top-down

Forward and backward recursion are independent concepts from bottom-up and top-down, respectively. As will be seen below, forward/backward recursion refer more so to *chronology* than to just the direction in which subproblems are solved. Interestingly, the book *Forest Management and Planning* <BibRef id='PB2017' pages='p. 125'></BibRef> describes the difference succinctly (bracketed comments my own):

> Dynamic programming uses either forward recursion or backward recursion to solve a management problem. *Forward recursion* involves moving in a direction from the first stage [base case(s)] to the last stage [overall problem]. *Backward recursion* is the opposite, where the problem is solved from the last stage [overall problem] backward to the first stage [base case(s)].

This can be tricky to understand at first, which is why a few sections below are dedicated to fleshing out what forward and backward recursion really mean in the context of producing DP solutions to various problems:

- [Conceptual differences](#fbdp-concepts): This sets the stage with some macro-level commentary as to what to expect.
- [Subproblem graph and subproblem dependency graph](#fbdp-subproblems): For a DP solution, understanding that the subproblem graph and the subproblem dependency graph are *transposes* of each other is a critical observation that is easy to miss. This section is comprised of a few different subsections to make this observation come through clearly:
  + [Fibonacci](#fbdp-fibonacci): This is the problem used by most people to introduce DP. Thus, it makes sense to begin our discussion here.
  + [Rod-cutting](#fbdp-rod-cutting): The goal here is to simply give another example of a subproblem graph (a more [complete discussion](/blog/2024/10/01/2024/dynamic-programming#problem-rod-cutting) of this problem may be found elsewhere).
  + [House robber](#fbdp-house-robber): This is where everything really starts to come together in terms of truly seeing and understanding forward and backward recursion.
  + [Fibonacci revisited - when forward recursion doesn't make sense](#fbdp-fibonacci-revisited): We revisit the problem of finding the $n$th Fibonacci number and discover why it doesn't make sense to attempt forward recursion when computing Fibonacci numbers via DP.
  + [Rod-cutting revisited - when forward recursion is unnatural](#fbdp-rod-cutting-revisited)

:::

### Conceptual differences {#fbdp-concepts}

The differences between forward and backward DP are detailed elegantly in [a comment on Codeforces](https://codeforces.com/blog/entry/44356?#comment-289127) and reproduced below for ease of reference (the remarks below are in response to the question, "Why do top guys favor array-based versus recursive DP?"):

> I'd say there are several reasons.
> 
> **Tradition**
> 
> People are taught to implement dynamic programming using loops. Then they teach the next generation to implement dynamic programming using loops. Hardly surprising, regardless of whether they are right or not.
> 
> **Convenience**
> 
> To write loops instead of memoization, the required additional effort is to topologically sort the states in a loop-friendly way. This effort often pays off.
> 
> To begin with, the asymptotic complexity of a bunch of for loops is usually much more obvious than the complexity of a recursive solution. Furthermore, many advanced dynamic programming problems will require additional insights after figuring out the most obvious dynamic programming solution. There are often multiple ways to topologically sort the states, and some of them make optimizations possible — and visible. Some examples are computing prefix sums to speed things up (already mentioned a few times), or even getting rid of one of the parameters.
>
> **Forward and Backward Dynamic Programming**
> 
> Often, we can express the objective function $f(s)$ on state $s$ as some combination of $f(t_1), f(t_2), \ldots, f(t_k)$, much like a mathematical formula. This can be expressed as backward dynamic programming. At a certain point in time, we want to calculate $f(s)$. Alright, take $f(t_1), f(t_2), \ldots, f(t_k)$ &#8212; either they are already calculated with a loop-based solution, or we use recursion with memoization to calculate them as needed &#8212; and combine them in the required way (calculate their sum, maximum, or whatever). Here, we move from state $s$ back to states $t_i$ as needed.
> 
> However, some solutions are better expressed as forward dynamic programming. At a certain point in time, consider state $s$. At this point, $f(s)$ is already calculated. We know that some states $r_1, r_2, \ldots, r_p$ depend on state $s$. So, right now, we want to update the intermediate calculations in these states using $f(s)$. When we later arrive at, say, $r_1$, it happens only when we already processed all states it depends on, and thus $f(r_1)$ is already calculated. One example is Dijkstra's algorithm: whenever we add a vertex $s$ to the tree of shortest paths, we update the minimum distance to each of the vertices $r_1, r_2, \ldots, r_p$ directly reachable from $s$.
> 
> With this approach, we simply cannot write the mathematical formula like $f(s) = G(f(t_1), \ldots)$ because the dependencies go the other way! Technically, it is still always possible to transform forward DP into backward DP (the entire graph between the states of dynamic programming can be stored, topologically sorted, and visited in the resulting order), but for some problems, forward DP can be more natural and more suitable for optimizations.

A [response to this comment](https://codeforces.com/blog/entry/44356?#comment-289143) is also informative (paraphrased below):

> I always use forward DP if it's possible. It's similar to BFS and therefore is more natural. It should be easier to think like "OK, I'm standing at `dp[i][j]`, what can I do now?" I think learning DP must start with this approach. Sometimes forward DP is less convenient, e.g. if DP is combined with prefix sums or two pointers or some other things, but when you face such kind of DP, you usually have enough skill to understand all three techniques (forward, backward, recursion) clearly.

There's a decent amount to unpack from these comments, but perhaps the most important piece is the following: *for some problems, forward DP can be more natural and more suitable for optimizations*; that is, it's not as if forward or backward DP should always be used. Use the approach most suitable for solving the problem at hand.

A couple other points from the comments above worth remarking on:

- **Multiple ways to topologically sort states:** "Topologically sorting states" in DP means arranging the order in which we compute each DP state so that all dependencies of a state are computed before the state itself. For some problems, specifically those with multiple dimensions (i.e., state variables) and/or constraints, there will likely be several valid ways to order the states, which means we may compute states in slightly different orders so long as the required prerequisites are always computed first (i.e., whatever ordering of the states we come up with still needs to be a *topological* ordering of the states, where there's freedom in which topological ordering we choose because, in general, topological orderings are not unique).

    This matters because different orders (i.e., different topological sorts of the states) can make some optimizations more visible or easier to implement than others (e.g., using prefix sums or certain optimizations may require computing states row-by-row or column-by-column in a 2D DP array). 

- **The objective function $f(s)$:** The "objective function" remarked on in the comments simply represents the value or result of the DP solution for a particular state $s$; that is, each state $s$ in a DP algorithm corresponds to a subproblem, and $f(s)$ is the *solution* to that subproblem.

- **Dijkstra's algorithm as an example of forward DP:** It may be interesting to note that Dijkstra's algorithm can be viewed as an example of forward DP even though it's often not mentioned in the context of DP. Why can it be viewed as an example of forward DP? Because we start at the source node with a known distance of `0` and then "push" updates to neighboring nodes using the current known distances. This approach closely matches the idea of forward DP: we use already computed values (e.g., `dp[source]`) to update the states that depend on them (e.g., `dp[neighbor]`). It's like saying, "I've computed `dp[some_state]`, and now I will use this to update the states that depend on `dp[some_state]`."

- **Forward DP is similar to BFS:** DPV <BibRef id='DPV' pages='pp. 108-113'></BibRef> introduces Dijkstra's algorithm as an attempt to *extend* BFS beyond just considering unit edge weights. If Dijkstra is an example of forward DP, then how might BFS be similar to forward DP? BFS begins at a starting point and moves *forward* by exploring neighboring nodes layer by layer, where forward DP is similar in the sense that it starts from known states and propagates information forward to dependent states. It may help to see the similarities outlined in bullet form:

  + *BFS:*
    * Start from a node.
    * Visit all its immediate neighbors.
    * Next, visit the neighbors of those neighbors. And so on.
  + *Forward DP:*
    * Start with base states.
    * Use known solutions to base states to update the DP values of other states that depend on them.
    * Continue until all states are updated.

  Essentially, BFS explores a graph layer by layer, and forward DP updates states in a manner that follows from initial states outward to dependents.

- **Forward DP: "What can I do now?" vs. Backward DP: "How did I get here?":** These questions convey the underlying difference in perspective between forward and backward DP:

  + Backward DP: Think of where you came from to get to where you are.
      (In backward DP, we rely on known states to find the current state, which means we go *backwards* from the current state to the base cases to find a solution for the current state.)
  + Forward DP: Think of where you can go from where you currently are.
      (In forward DP, once we have a known state, we update other states that depend on it, which means we go *forward* from the base cases to the current state, which already has a solution thanks to the forward moving work.)

  The difference in approach/perspective can make some problems more intuitive and can also reveal different optimization opportunities.

### Subproblem graph and subproblem dependency graph (DAGs) {#fbdp-subproblems}

#### Fibonacci numbers {#fbdp-fibonacci}

##### As motivation for learning DP

The problem of finding the $n$th Fibonacci number is the quintessential problem used to introduce dynamic programming. Recall that the $n$th number from the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence), $F_n$, is defined as follows:

$$
F_n = 
\begin{cases}
0 & \text{if}\ n = 0\\
1 & \text{if}\ n = 1\\
F_{n-1} + F_{n-2} & \text{if}\ n\geq 2\\
\end{cases}
$$

Why is this used to motivate learning dynamic programming? The [recurrence relation](https://en.wikipedia.org/wiki/Recurrence_relation) $F_n = F_{n-1} + F_{n-2}$ is quite simple to implement in code:

```python
def fib(n):
    if n < 2:
        return n
    
    return fib(n-1) + fib(n-2)
```

But the sinister effects become clear once we realize that coding up the seemingly innocuous recurrence relation $F_n = F_{n-1} + F_{n-2}$ as above spawns an exponential number of function calls (the figure below illustrates what the recursion tree looks like when computing $F_6$):

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('@site/static/img/templates/dp/f4.png').default} />
</div>

Sometimes it's impossible to avoid making an exponential number of function calls, but the problem here is that we're doing a *ton* of repeated work:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('@site/static/img/templates/dp/f5.png').default} />
</div>

The idea behind dynamic programming, as it's often communicated, is to make the recursion efficient by essentially caching or remembering the subproblems that we've already solved so we never solve the same subproblem more than once. If we do this for the example above, then our recursion tree becomes much smaller and we avoid repeated computation:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('@site/static/img/templates/dp/f6.png').default} />
</div>

In code, if we use top-down dynamic programming with memoization, then we can update our code as follows to get the recursion tree above for our function calls:

```python
def fib(n):
    def dp(i):
        if i < 2:
            return i
        
        if i in memo:
            return memo[i]
        
        memo[i] = dp(i - 1) + dp(i - 2)
        return memo[i]
    
    memo = dict()
    return dp(n)
```

##### Subproblem graph

Cool. Nothing above is new and is covered in most DP learning resources. Why, then, did we go through the trouble? So we could more easily understand the "subproblem graph" for computing Fibonacci numbers:

<div align='center' className='centeredImageDiv'>
  <img width='150px' src={require('@site/static/img/templates/dp/f7.png').default} />
</div>

The subproblem graph above is for the problem of computing the $n$th Fibonacci number with $n=6$. The vertex labels denote subproblems, where a directed edge $(x,y)$ indicates that solving subproblem $x$ requires a solution to subproblem $y$. The graph above is a reduced version of our original recursion tree, in which all nodes with the same label are collapsed into a single vertex and all edges go from parent to child:

<div align='center' className='centeredImageDiv'>
  <img height="350" style={{marginRight: '20px'}} src={require('@site/static/img/templates/dp/f7.png').default} />
  <img height="350" style={{marginRight: '20px'}} src={require('@site/static/img/templates/dp/f5.png').default} />
</div>

Note that the subproblem graph is directed and acyclic (i.e., it is a directed acyclic graph or DAG).

##### Topologically sorted subproblem dependency DAG

Recall what a topological sort is from CLRS <BibRef id='TC2022' pages='p. 573'></BibRef>: 

> A *topological sort* of a DAG $G = (V, E)$ is a linear ordering of all its vertices such that if $G$ contains an edge $(u, v)$, then $u$ appears before $v$ in the ordering. Topological sorting is defined only on directed graphs that are acyclic; no linear ordering is possible when a directed graph contains a cycle. Think of a topological sort of a graph as an ordering of its vertices along a horizontal line so that all directed edges go from left to right.

CLRS provides an illustrative albeit playful example of how a professor might topologically sort his clothes when getting dressed:

<div align='center' className='centeredImageDiv'>
  <img width='550px' src={require('@site/static/img/templates/dp/f8.png').default} />
</div>

This leads to the following left-to-right linearization of the vertices in the DAG above (note how this linearization is not unique; for example, the `watch` node can be placed anywhere in the ordering):

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('@site/static/img/templates/dp/f9.png').default} />
</div>

Above, each directed edge $(u,v)$ means that garment $u$ must be put on before garment $v$. In general, an edge $u\to v$ in a topological ordering means $v$ depends on $u$ in some way (e.g., in the scenario above, the edge `socks -> shoes` means that putting on `shoes` depends on having put on `socks` first).

What would the topologically sorted subproblem dependency DAG look like for Fibonacci numbers? It's tempting to think it's the subproblem graph itself since the subproblem graph is a DAG:

<div align='center' className='centeredImageDiv'>
  <img width='125px' src={require('@site/static/img/templates/dp/f7.png').default} />
</div>

But this would be a mistake. For example, simply consider the edge `fib(6) -> fib(5)`. From a topological sorting standpoint, such an edge would mean solving `fib(5)` depends on solving `fib(6)` first, which is definitely not true. However, note that solving `fib(6)` depends on solving `fib(5)` first. This leads us to the following critical observation:

:::dwf subproblem graph ≠ subproblem dependency graph

Let $G$ represent the subproblem graph for a problem being solved by DP. Then $G^R$, the [transpose graph](https://en.wikipedia.org/wiki/Transpose_graph) of $G$, represents the subproblem *dependency* graph; that is, all edges in $G$ are *reversed* to obtain $G^R$. More concretely, if $G$ contains the directed edge $(u,v)$, then $G^R$ contains the directed edge $(v,u)$.

Note that $G$ must be a DAG in order for a DP solution to be viable (i.e., if $G$ were not a DAG, then it would contain a cycle, which would mean we'd never be able to stop solving subproblems). The subproblem dependency graph, $G^R$, is the reverse topological sort of $G$.

:::

Ultimately, the observation above means that the subproblem graph for finding $F_n$ looks as follows:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('@site/static/img/templates/dp/f10.png').default} />
</div>

The subproblem dependency graph for finding $F_n$ looks like the reverse of the graph above:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('@site/static/img/templates/dp/f11.png').default} />
</div>

#### Rod cutting {#fbdp-rod-cutting}

Let's now consider the rod-cutting problem as presented in CLRS <BibRef id='TC2022' pages='p. 363'></BibRef> for another illustration of a subproblem graph:

> Serling Enterprises buys long steel rods and cuts them into shorter rods, which it then sells. Each cut is free. The management of Serling Enterprises wants to know the best way to cut up the rods. Serling Enterprises has a table giving, for $i = 1, 2, \ldots,$ the price $p_i$ in dollars that they charge for a rod of length $i$ inches. The length of each rod in inches is always an integer.
>
> The *rod-cutting problem* is the following. Given a rod of length $n$ inches and a table of prices $p_i$ for $i = 1, 2, \ldots, n$, determine the maximum revenue $r_n$ obtainable by cutting up the rod and selling the pieces. If the price $p_n$ for a rod of length $n$ is large enough, an optimal solution might require no cutting at all.

The [full context](/blog/2024/10/01/2024/dynamic-programming#problem-rod-cutting) of this problem is worth looking at, but the topic at hand is subproblem graphs. The recursion tree for the rod-cutting problem when $n=4$ is as follows:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('@site/static/img/templates/dp/f12.png').default} />
</div>

It's clear that repeated work is being performed. We can do as we did with Fibonacci and capture the subproblem graph for the rod-cutting problem with $n=4$ by producing a reduced version of the recursion tree above, in which all nodes with the same label are collapsed into a single vertex and all edges go from parent to child:

<div align='center' className='centeredImageDiv'>
  <img width='150px' src={require('@site/static/img/templates/dp/f13.png').default} />
</div>

The subproblem graph above is nice, but remember that the subproblem dependency graph is actually the reverse of the graph above.

#### House robber {#fbdp-house-robber}

##### Initial discussion

We finally arrive at a problem where it not only makes sense to apply DP but also where the differences between forward and backward recursion become evident.

- **Problem:** House robber
- **Link:** <LC id='198' type='long' ></LC>
- **Description:** There is a row of houses. Each house has an amount of money. You are a thief and your goal is to steal as much money as possible without robbing from adjacent houses.
- **Input:** An array `houses` of length `n ≥ 1` where `houses[i]` is the amount of money in the `i`th house.
- **Example:**
  <div align='center' className='centeredImageDiv'>
    <img width='275px' src={require('@site/static/img/templates/dp/f14.png').default} />
  </div>

As [previously noted](#house-robber-exponential), there's an exponential number of subsets of houses; thus, checking all subsets of houses is unrealistic. Furthermore, even if we only checked adjacent houses, that number too would be exponential. We need to be more efficient than brute force. Enter DP.

If we're thinking about using DP, then whatever problem we're considering must have a solution based on a recurrence. Every recurrence must have one or more base cases. What are the base cases for the house robber problem? As a general rule, base cases are those subproblems that can be reasoned about *directly*, which means they represent the smallest possible inputs. What subproblems in the house robber problem can be reasoned about directly? We have two:

- If there is only one house, then rob it.
- If there are two houses, then rob whichever house has more money (we cannot rob both since they're adjacent).

Once we've considered the smallest cases, we should contemplate a *general* case of unspecified size. The general case, which we ultimately plan to turn into a recurrence relation, needs to start with a *strategy* for somehow relating the original larger input (i.e., the "overall problem") to the smaller inputs (i.e., the "subproblems"). The idea is to think about ways to "handle" the first element in the input so as to effectively "get rid of it", thus reducing the input to a smaller input by at least one element (i.e., we solve at least one subproblem). But in order to "handle" the first element in the input, we have to come up with the set of all the possible options of what can happen with it. Then, for each option, we have to express the situation after that option happens in terms of smaller subproblems.

This general strategizing can be made more concrete by explicitly considering the house robber problem. If there are more than two houses, then we need to think about all of the possible options for what can happen with the first house we rob. There are two options: either we rob it or we don't. As is typical when thinking up DP, just by looking at the first house **we don't know which is the best option, but what we know for sure at this point is that one of the two must happen**. Even though it is not clear why it is useful to know the options if we don't know which one is the best one, this is all we need for a recurrence. The only requirement is that the set of options must be exhaustive, meaning it covers every possible situation.

Once we have the set of options, the idea of the recurrence is simple: we consider the value that we can get with each of the two options, and then "choose" the best one. For this, we need to express how much money we can obtain in each case, in terms of smaller subproblems:

- If we rob the first house, then we must skip the second one. This leaves $n-2$ houses, which is a smaller subproblem.
- If we skip the first house, then we can rob or skip the second one. This leaves $n-1$ houses, which is also a smaller subproblem.

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f15.png').default} />
</div>

We accomplished our strategic goal: we have a set of options, where we know one of them must happen, and, for each option, we can express what would be the final result in terms of smaller subproblems.

A *recurrence* encodes the strategic idea outlined above in terms of how bigger problems relate to smaller subproblems. Here's the pseudocode:

```title="House robber recurrence"
Rob(i): max value we can get from the suffix of houses houses[i..n-1]

Base cases:
Rob(n-1) = houses[n-1]
Rob(n-2) = max(houses[n-1], houses[n-2])

General case (0 ≤ i ≤ n-3):
Rob(i) = max(houses[i] + Rob(i+2), Rob(i+1))

Goal: Rob(0) (max value we can get from all the houses, houses[0..n-1])
```

:::caution Forward recurrence used above

The reason we are using base cases `Rob(n-1) = houses[n-1]` and `Rob(n-2) = max(houses[n-1], houses[n-2])` instead of `Rob(0) = houses[0]` and `Rob(1) = max(houses[0], houses[1])` is because we are using a *forward recurrence*. What this means and how it works will be explained soon.

:::

Let's break down the recurrence above as if we produced the pseudocode above in an interview setting:

- It has a *description* in words of what the recurrence actually calculates. Start with this to be clear about what we are calculating (the interviewer will appreciate it). The name (`Rob`) can be anything, like a short name related to the problem. `"i"` is the index / parameter / input. A recurrence can have more than one input, as we will see.
- It has two *base cases*. Base cases correspond to subproblems where we compute the value directly (not in terms of other subproblems). Every recurrence must have one (or more) base cases. They take the smallest possible inputs.
- It has a *general case*. It is helpful to state the boundaries of the general case (the `"0 ≤ i ≤ n-3"` part). The general case consists of two or more expressions involving subproblems (the options), and a way to "aggregate" the expressions to get the solution for the current input (in this case, we aggregated them with `"max"`).
- It has a *goal*, which is the solution to the original problem in terms of the recurrence. This is the value we actually care about. It shows how the recurrence solves the original problem.

The *goal* of `Rob(0)` instead of `Rob(n-1)` may seem strange at first if we're using to only working with backward recurrences, but we're using a forward recurrence, which we'll discuss in a moment. 

But first there's something we should consider: are recurrences unique? No. Just as there are many ways to solve the same problem, there are oftentimes many recurrences that can be used for the same problem (especially more complicated problems). 

First, there's flexibility in *where* to put the boundary between the base case and the general case. For example, for the house robber problem, we could have put the base cases "beyond" the last valid index: if we try to rob past the last house, we get value `0`. Here is a side-by-side comparison of two recurrences for the house robber problem, where the only difference is the transition point between base cases and general cases (the changes are highlighted in red).

<CodeGrid>
<CodeGridCell>

```a title="Original recurrence"
Rob(i): max value we can get from the suffix of houses houses[i..n-1]

Base cases:
Rob(n-1) = houses[n-1]
Rob(n-2) = max(houses[n-1], houses[n-2])

General case (0 ≤ i ≤ n-3):
Rob(i) = max(houses[i] + Rob(i+2), Rob(i+1))

Goal: Rob(0)
```

</CodeGridCell>
<CodeGridCell>

```a title="Recurrence with a different cut-off for base"
Rob(i): max value we can get from the suffix of houses houses[i..n-1]

Base cases:
#highlight-error-start
Rob(n) = 0
Rob(n+1) = 0
#highlight-error-end

#highlight-error-next-line
General case (0 ≤ i ≤ n-1):
Rob(i) = max(houses[i] + Rob(i+2), Rob(i+1))

Goal: Rob(0)
```

</CodeGridCell>
</CodeGrid>

Second, another way in which recurrences for the same problem can vary is in the *set of options* in the general case. For example, for the house robber problem, we can think about the following: it doesn't make sense to skip both the first and second houses. This is because if we are not robbing the second one, then we can get the value from the first one without danger. We can use this observation to come up with a different set of options for the general case: rob the first house or rob the second house.

1. rob the first house and skip the second house (this is the same option as before)
2. skip the first house, rob the second, and skip the third house (this option is different)

For example, if the input is `[100, 1, 1, 100]`, we can start by choosing option 1: rob the first house and skip the 2nd house. Then, we are to the third house. We can now choose option 2: skip the third house and rob the fourth (and we would have to skip the fifth house, if there was one). Here is a side-by-side comparison of the original recurrence for house robber, and this new recurrence with a different set of options (changes again highlighted in red):

<CodeGrid>
<CodeGridCell>

```a title="Original recurrence"
Rob(i): max value we can get from the suffix of houses houses[i..n-1]

Base cases:
Rob(n-1) = houses[n-1]
Rob(n-2) = max(houses[n-1], houses[n-2])

General case (0 ≤ i ≤ n-3):
Rob(i) = max(
           houses[i] + Rob(i+2), 
           Rob(i+1)
         )


Goal: Rob(0)
```

</CodeGridCell>
<CodeGridCell>

```a title="Recurrence with a different set of options"
Rob(i): max value we can get from the suffix of houses houses[i..n-1]

Base cases:
#highlight-error-next-line
Rob(i) = 0 for i >= n


General case (0 ≤ i ≤ n-1):
Rob(i) =  max(
            houses[i] + Rob(i+2),
#highlight-error-next-line
            houses[i+1] + Rob(i+3)
          )

Goal: Rob(0)
```

</CodeGridCell>
</CodeGrid>

There's yet another way in which recurrences can differ for the same problem, and this difference is whether to use *forward recursion* or *backward recursion*. As noted previously, these concepts are independent from bottom-up and top-down.

For a DP solution to apply, we must **always** relate bigger inputs to smaller inputs. But there are generally two ways to do this:

- towards the end
- towards the beginning

Here is a side-by-side comparison of the original recurrence we saw for the house robber problem (forward recursion) and another recurrence for the same problem (backward recursion):


<CodeGrid>
<CodeGridCell>

```a title="Forward recursion"
Rob(i): max value we can get robbing 
        the suffix of houses: houses[i..n-1]

Base cases:
Rob(n-1) = houses[n-1]
Rob(n-2) = max(houses[n-1], houses[n-2])

General case (0 ≤ i ≤ n-3):
Rob(i) = max(houses[i] + Rob(i+2), Rob(i+1))

Goal: Rob(0)
```

</CodeGridCell>
<CodeGridCell>

```a title="Backward recursion"
Rob(i): max value we can get robbing 
        the prefix of houses: houses[0..i]

Base cases:
Rob(0) = houses[0]
Rob(1) = max(houses[0], houses[1])

General case (2 ≤ i ≤ n-1):
Rob(i) = max(houses[i] + Rob(i-2), Rob(i-1))

Goal: Rob(n-1)
```

</CodeGridCell>
</CodeGrid>

The original recurrence we saw for the house robber problem uses *forward recursion* while the recurrence on the right above uses *backward recursion*.

There are a few evident differences on a practical level: 

- the indices are flipped everywhere
- the goal and the base cases are on opposite ends
- indexed subproblems:
  + in a forward recurrence the indices of the subproblems in the general case get larger
  + in a backward recurrence they get smaller

Forward and backward recursion reflect different ways of thinking about the same idea:

- In a forward recurrence, we think chronologically: we think about where we start and what choices we have from there (e.g., whether to rob or skip the first house). 
- In a backward recurrence, we start by thinking about the entire solution, and think about the last choice that led us there (e.g., whether we robbed or skipped the last house).

Both approaches are valid. Forward recursion can actually be somewhat more intuitive sometimes because of the chronological order, but there are other times where backward recursion makes the most sense.

##### Extended discussion about forward and backward recursion

Recall the practical differences between forward and backward recursion remarked on in the previous section:

- the indices are flipped everywhere
- the goal and the base cases are on opposite ends
- indexed subproblems:
  + in a forward recurrence the indices of the subproblems in the general case get larger
  + in a backward recurrence they get smaller

These differences aren't just a happy coincidence. There's a reason for them. What's the reason? A helpful starting point is to clarify the process of *problem decomposition*, which yields a subproblem graph, and the flow of *computational dependencies*, which yields a subproblem dependency graph (a reverse topological sort of the subproblem graph):

- **Problem decomposition (subproblem graph):** This shows how a problem is broken down into subproblems &#8212; edges point from the main problem to the subproblems it generates.

  We *start* with the main problem (i.e., the "goal") and break it down into subproblems. Thus, *the process of generating subproblems* flows from the main problem to the subproblems.

- **Computational dependencies (subproblem dependency DAG):** This reflects the *order* in which solutions need to be computed &#8212; edges point from subproblems to the problems that depend on them.

  We must solve and know the solutions to smaller subproblems before we can solve the larger problems that depend on them. Thus, *computational dependencies* flow from subproblems to the main problem (i.e., the "goal").

The subproblem graph and subproblem dependency graph are natural transposes or "inversions" of each other because *decomposition* and *composition* are **opposite** processes:

- **Decomposition:** Breaking down a problem (edges from main problem to smaller subproblems)
- **Composition:** Building up a solution (edges from smaller subproblems to main problem)

All DP solutions center around building a DAG. Forward recursion vs. backward recursion determines the direction of the edges in the DAG. But *which* DAG? The subproblem graph and subproblem dependency graph are both DAGs but are transposes of each other! Whether we're using forward recursion or backward recursion, **edge direction depends on whether we're looking at *problem decomposition* or *computational dependencies*** &#8212; this helps clarify why our subproblem dependency DAG is inverted/transposed relative to how we generate subproblems. For DP solutions, we mostly care about computational dependencies because they determine the *order* in which we need to compute and store solutions to subproblems. Hence, DP solutions center around building the subproblem dependency DAG (because it makes the computational dependencies explicit). It's hard to effectively come up with one DAG without the other though because they're such complementary components. Firmly establishing the subproblem graph for a problem is a valuable use of time and effort because we know its transpose is the DAG we really care about.

Let's see if we can relate everything above back to the house robber problem. Let `H_i` represent a node that stands for solving subproblem `Rob(i)`. Then, for the sake of specificity, we can imagine five houses in a row (i.e., `0 <= i <= 4`) just like we did at the start of this section when we defined the house robber problem. Backward recursion yields the following edges in its subproblem graph (left) and subproblem dependency graph (right):

<CodeGrid>
<CodeGridCell>

```a title="Subproblem graph (backward recursion)"
H_4 -> H_3
H_4 -> H_2

H_3 -> H_2
H_3 -> H_1

H_2 -> H_1
H_2 -> H_0

H_1 (no outgoing edge; base case: max(first house, second house))
H_0 (no outgoing edge; base case: first house)
```

</CodeGridCell>
<CodeGridCell>

```a title="Subproblem dependency graph (backward recursion)"
H_4 <- H_3
H_4 <- H_2

H_3 <- H_2
H_3 <- H_1

H_2 <- H_1
H_2 <- H_0

H_1 (no outgoing edge; base case: max(first house, second house))
H_0 (no outgoing edge; base case: first house)
```

</CodeGridCell>
</CodeGrid>

It's kind of hard to picture what the graphs above actually look like if we're only given the edges. So let's draw the graphs. The following is the subproblem graph:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f16.png').default} />
</div>

And its transpose, the reverse topological sort of the subproblem graph, is the subproblem dependency graph:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f17.png').default} />
</div>

It's worth noting here how the rightmost node in the topological sort is the main problem or "goal". For example, recall the illustration in CLRS of how a professor might topologically sort his clothing when getting dressed:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('@site/static/img/templates/dp/f9.png').default} />
</div>

Above, it may sound strange to say that `jacket` is the "goal"; more accurately, the goal is to get fully dressed, where the jacket will be worn and should be the last item of clothing to be put on.

What do the graphs look like for the house robber problem when forward recursion is used? Forward recursion yields the following edges in its subproblem graph (left) and subproblem dependency graph (right):

<CodeGrid>
<CodeGridCell>

```a title="Subproblem graph (forward recursion)"
H_0 -> H_1
H_0 -> H_2

H_1 -> H_2
H_1 -> H_3

H_2 -> H_3
H_2 -> H_4

H_3 (no outgoing edge; base case: max(fourth house, fifth house))
H_4 (no outgoing edge; base case: fifth house)
```

</CodeGridCell>
<CodeGridCell>

```a title="Subproblem dependency graph (forward recursion)"
H_0 <- H_1
H_0 <- H_2

H_1 <- H_2
H_1 <- H_3

H_2 <- H_3
H_2 <- H_4

H_3 (no outgoing edge; base case: max(fourth house, fifth house))
H_4 (no outgoing edge; base case: fifth house)
```

</CodeGridCell>
</CodeGrid>

How should we draw these graphs to see what they look like? It's tempting to draw the subproblem graph as 

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f18.png').default} />
</div>

and the subproblem dependency graph as

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f19.png').default} />
</div>

Why isn't this ideal though? Naturally, we arranged `H_0` through `H_4` from left to right, just as before with backward recursion. But recall that `H_i` does *not* represent the `i`th house. It's not even a house! It's a *subproblem*. Furthermore, the second figure above is supposed to represent a topological sort of the computational dependencies &#8212; is it though? From CLRS <BibRef id='TC2022' pages='p. 573'></BibRef>: 

> Think of a topological sort of a graph as an ordering of its vertices along a horizontal line so that all directed edges go from left to right.

Are the edges in the second graph going from left to right? No. We can easily fix that by simply rearranging the order in which we placed the nodes that denote subproblems. Instead of arranging `H_0` through `H_4` from left to right, we instead arrange them from right to left. Our subproblem graph now looks like the following:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f21.png').default} />
</div>

And the subproblem dependency graph now looks like a proper topological sort, where the rightmost node, `H_0` is the goal (i.e., `Rob(0)`):

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f20.png').default} />
</div>

When drawing subproblem graphs and subproblem dependency graphs, it's not a bad idea to always draw the subproblem graph from right to left. Why? Because we know the subproblem dependency graph, which is the reverse *topological sort* of the subproblem graph, should have its edges going left to right.

The practical differences between forward and backward recursion should now be much easier to understand:

- the indices are flipped everywhere
- the goal and the base cases are on opposite ends
- indexed subproblems:
  + in a forward recurrence the indices of the subproblems in the general case get larger
  + in a backward recurrence they get smaller

##### Forward and backward recursion are not bottom-up and top-down DP

This problem concretely showed how forward recursion and backward recursion are independent from top-down and bottom-up. As noted in CLRS <BibRef id='TC2022' pages='p. 371'></BibRef>:

> In a bottom-up dynamic-programming algorithm, you consider the vertices of the subproblem graph in an order that is a "reverse topological sort," or a "topological sort of the transpose" of the [top-down] subproblem graph.

Recall the subproblem graph for the top-down approach using backward recursion:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f16.png').default} />
</div>

CLRS notes bottom-up DP considers the vertices in an order that is a "reverse topological sort" of the top-down subproblem graph:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f17.png').default} />
</div>

But now recall the subproblem graph for the top-down approach using *forward recursion*

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f20.png').default} />
</div>

And its transpose:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('@site/static/img/templates/dp/f21.png').default} />
</div>

These groups of graphs are not just presentationally different (e.g., reversing the presentation of the order of nodes): they are *structurally* different. For example, for backward recursion, there's an edge between `H_3` and `H_4`, but there is no such edge for forward recursion. Similarly, for forward recursion, there's an edge between `H_0` and `H_1`, but there is no such edge for backward recursion.

#### Fibonacci revisited - when forward recursion doesn't make sense {#fbdp-fibonacci-revisited}

Is it purely a matter of preference whether or not we choose to use forward recursion or backward recursion when crafting a DP solution? Not entirely. As noted above in the discussion of the house robber problem, DP solutions center around building a DAG, specifically the computation dependency DAG (i.e., subproblem dependency graph). But what happens if we're given a recurrence that's inherently backward in nature?

The Fibonacci sequence is *defined* as a recurrence. What kind of recurrence? A *backward* recurrence. The directions of the edges in the computation dependency graph are already set &#8212; so we don't get to decide them for the specific problem of computing the $n$th Fibonacci number. 

Of course, we could *try* to force forward recursion, but then we end up with a wildly unnatural solution like the one on the right below:

<CodeGrid>
<CodeGridCell>

```python title="nth Fibonacci number (backward recursion)"
def fib(n):
    def dp(i):
        if i < 2:
            return i
        
        if i in memo:
            return memo[i]
        
        memo[i] = dp(i - 1) + dp(i - 2)
        return memo[i]
    
    memo = dict()
    return dp(n)
```

</CodeGridCell>
<CodeGridCell>

```python title="nth Fibonacci number (forward recursion)"
def fib(n):
    def dp(i):
        #highlight-error-start
        if i >= n:
            return i - n
        #highlight-error-end
        
        if i in memo:
            return memo[i]
        
        memo[i] = dp(i + 1) + dp(i + 2)
        return memo[i]
    
    memo = dict()
    return dp(0)
```

</CodeGridCell>
</CodeGrid>

The forward recursion approach above inverts the logic to try fit a forward recursion pattern. Even though the code *works*, it's incredibly unnatural. Specifically, the bases are reversed to `dp(n) = 0` and `dp(n + 1) = 1`, implying that once we reach `n` we have `0` and at index `n + 1` we have `1`. Then `dp(0)` attempts to build up the Fibonacci sequence by going forward in indices, which is counterintuitive at best. We end up relying on the definition `dp(i) = dp(i + 1) + dp(i + 2)`, which is essentially reversed logic and does not match the natural definition of the Fibonacci numbers.

The Fibonacci sequence is inherently defined in a *backward* manner: each term depends on the previous two terms. Attempting to define it forward means reinterpreting the sequence definition in a way that does not come naturally.

Does it ever make sense for Fibonacci numbers to be computed in a manner amenable to forward recursion? Yes, but not in the direct way of, "Compute the $n$th Fibonacci number," as we just saw. Consider the following problem:

> How many ways are there to go up `n` steps if we can take `1` or `2` steps at a time?

Now we have a chance to come up with a recurrence where the edges are like `fib` but flipped:

- **backward recursion:** `ways(i) = "number of ways to get to step i from the bottom"`
- **forward recursion:** `ways(i) = "number of ways to get to the top from step i"`

This is actually a problem on LeetCode: <LC id='70' type='long' ></LC>. We can write up solutions using backward and forward recursion as follows:

<CodeGrid>
<CodeGridCell>

```python title="Climbing Stairs (backward recursion)"
class Solution:
    def climbStairs(self, n: int) -> int:
        def dp(stair):
            if stair == 1:  # only 1 way to get to step 1 from the bottom
                return 1    # (i.e., one step of a single stair)
            
            if stair == 2:  # only 2 ways to get to step 2 from the bottom
                return 2    # (i.e., one step of two stairs or two steps of one stair)
            
            if stair in memo:
                return memo[stair]
            
            memo[stair] = dp(stair - 1) + dp(stair - 2)
            return memo[stair]
        
        memo = dict()
        return dp(n)
```

</CodeGridCell>
<CodeGridCell>

```python title="Climbing Stairs (forward recursion)"
class Solution:
    def climbStairs(self, n: int) -> int:
        def dp(stair):
            if stair == n - 1:  # only 1 way to get to the top from the last stair
                return 1        # (take a step)
            
            if stair == n - 2:  # only 2 ways to get to the top from the second to last stair
                return 2        # (one step of two stairs or two steps of one stair)
            
            if stair in memo:
                return memo[stair]
            
            memo[stair] = dp(stair + 1) + dp(stair + 2)
            return memo[stair]
        
        memo = dict()
        return dp(0)
```

</CodeGridCell>
</CodeGrid>

The sequence of answers produced *is* the Fibonacci sequence (shifted to the right by one).

#### Rod-cutting revisited - when forward recursion is unnatural {#fbdp-rod-cutting-revisited}

The rod-cutting problem is a problem that is inherently backward in nature in the sense that it is a rod-*cutting* problem; that is, the point of the problem is that we start with a rod of length `n` inches and we try to *cut* it in a certain way so as to maximize revenue. We can still try to force a solution to have forward recursion logic (right below)

<CodeGrid>
<CodeGridCell>

```python title="Rod cutting (backward recursion)"
def rod(n, prices):
    def dp(length):
        if length == 0: # cannot cut anymore
            return 0
        
        if length in memo:
            return memo[length]
        
        max_rev = float('-inf')
        for i in range(1, length + 1):
            rev = prices[i] + dp(length - i)
            if rev > max_rev:
                max_rev = rev
        
        memo[length] = max_rev
        return max_rev
        
    memo = dict()
    return dp(n)
```

</CodeGridCell>
<CodeGridCell>

```python title="Rod cutting (forward recursion)"
def rod_forward(n, prices):
    def dp(length):
        if length == n: # cannot add anymore
            return 0
        
        if length > n:
            return float('-inf')  # exceeded the target length
        
        if length in memo:
            return memo[length]
        
        max_rev = float('-inf')
        for i in range(1, len(prices)):
            rev = prices[i] + dp(length + i)
            if rev > max_rev:
                max_rev = rev
        
        memo[length] = max_rev
        return max_rev
    
    memo = dict()
    return dp(0)
```

</CodeGridCell>
</CodeGrid>

But the meaning of what we're doing has changed. With backward recursion, we start with a single rod `n` inches long and we attempt to cut it to maximize revenue. This is no longer the case with forward recursion. We essentially start with nothing (a rod `0` inches in length), and we basically try to figure out how to assemble rod pieces so that the total length eventually equals `n` and we do so using the pieces whose sizes generate the most revenue.

Sometimes forward recursion is not the best choice. Sometimes backward recursion isn't either. Use whichever one is best for the job at hand.

## Case study: minimum cost climbing stairs

TBD

## Practice problems 

### Min-sum stairs (LC 746)

**Link:** <LC id='746' type='long' ></LC> 

**Problem statement:** 

> <LC746PS />

**Interactive attempt:** 

  <CodeEditor initialCode={snippet1} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Climbing stairs (LC 70)

**Link:** <LC id='70' type='long' ></LC> 

**Problem statement:** 

> <LC70PS />

**Interactive attempt:** 

  <CodeEditor initialCode={snippet2} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Climbing stairs with hops (non-LC)

**Link:** TBD

**Problem statement:** 

> TBD

**Interactive attempt:** 

  <CodeEditor initialCode={snippet3} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Min-sum stairs with hops (non-LC)

**Link:** TBD

**Problem statement:** 

> TBD

**Interactive attempt:** 

  <CodeEditor initialCode={snippet4} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Count paths in grid with obstacles (LC 63)

**Link:** <LC id='63' type='long' ></LC> 

**Problem statement:** 

> <LC63PS />

**Interactive attempt:** 

  <CodeEditor initialCode={snippet5} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Min-cost path in grid (LC 64)

**Link:** <LC id='64' type='long' ></LC> 

**Problem statement:** 

> <LC64PS />

**Interactive attempt:** 

  <CodeEditor initialCode={snippet6} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Word break (LC 139)

**Link:** <LC139PS />

**Problem statement:** 

> <LC id='139' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet7} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Longest common subsequence (LC 1143)

**Link:** <LC1143PS />

**Problem statement:** 

> <LC id='1143' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet8} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Longest increasing subsequence (LC 300)

**Link:** <LC300PS />

**Problem statement:** 

> <LC id='300' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet9} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Minimum insertions to make palindrome (LC 1312)

**Link:** <LC1312PS />

**Problem statement:** 

> <LC id='1312' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet10} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Number of roll sequences with target sum (LC 1155)

**Link:** <LC1155PS />

**Problem statement:** 

> <LC id='1155' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet11} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Minimum max-sum m-partition (LC 410)

**Link:** <LC410PS />

**Problem statement:** 

> <LC id='410' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet12} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Tree robber (LC 337)

**Link:** <LC337PS />

**Problem statement:** 

> <LC id='337' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet13} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD

### Longest increasing path (LC 329)

**Link:** <LC329PS />

**Problem statement:** 

> <LC id='329' type='long' ></LC> 

**Interactive attempt:** 

  <CodeEditor initialCode={snippet14} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

**Discussion:** TBD
