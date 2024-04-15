---
title: Introduction to monotonic stacks and queues (with LeetCode problems, solutions, and more practice problems)
draft: false
description: This post explores monotonic stacks and queues, especially in the context of solving LeetCode problems
tags: 
  - Monotonic
  - Stack
  - Queue
  - Monotonic Stack
  - Monotonic Queue
  - LeetCode
keywords: 
  - leetcode
  - monotonic
  - stack
  - queue
  - monotonic stack
  - monotonic queue
authors: 
  - farlow
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';
import TOCInline from '@theme/TOCInline';

import MonotonicQueues from '@site/src/components/DataGrids/MonotonicQueues';
import MonotonicStacks from '@site/src/components/DataGrids/MonotonicStacks';

import LC239PS from '@site/docs/_Partials/problem-stems/lc239.md';
import LC739PS from '@site/docs/_Partials/problem-stems/lc739.md';

Monotonic stacks and queues are not difficult because of what they *are* but because of *how* they are used to find solutions to various problems. This post explores monotonic stacks and queues by first exploring the *next greater height* problem without any framing whatsoever (i.e., there's no mention of explicitly using a monotonic data structure in any capacity). We then try to use one of the approaches developed for solving the next greater height problem to solve another problem: the *sliding window minimum*. But our previously developed approach is not quite enough. We need to make a small tweak that turns out to be quite insightful.

The approaches developed for solving both problems are used to set the stage for explaining what monotonic stacks and queues actually are and why we way want to consider using them to solve certain kinds of problems. General code templates are provided for maintaining monotonically increasing/decreasing stacks and queues. If you are able to follow the solutions for the introductory problems (i.e., *next greater height* and *sliding window minimum*), then you will already know everything you need to know about monotonic stacks and queues before being explicitly told their definitions. 

Finally, several LeetCode problems are provided where monotonic stacks and/or queues serve as natural tools in crafting optimal solutions (several problems are solved using the concepts fleshed out in this post).

<!--truncate-->

## Contents

<TOCInline 
  toc={[ ... toc.filter(({level, value}, _, arr) => ( level == 2 || level == 3) && !value.startsWith('Contents')) ]}
/>

<details>
<summary> TLDR</summary>

Stacks and queues are defined by their interfaces. [Monotonicity](https://en.wikipedia.org/wiki/Monotonic_function) is not. The following are all examples of monotonic stacks/queues, where the removal of values needed to maintain the monotonic invariant is illustrated in the context of adding `5` to each value collection:

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Decreasing"
[12, 10, 9, 5, 3, 2, 1] # Before addition of 5
[12, 10, 9, 5]          # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly decreasing"
[12, 10, 10, 9, 5, 3, 1, 0] # Before addition of 5
[12, 10, 10, 9, 5, 5]       # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Increasing"
[0, 1, 3, 5, 6, 10, 11] # Before addition of 5
[0, 1, 3, 5]            # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly increasing"
[1, 2, 2, 3, 5, 7, 8, 10] # Before addition of 5
[1, 2, 2, 3, 5, 5]        # After addition of 5
```

</div>
</div>

The removals above are stack-like in nature (popping and pushing from the right), which is why the term "monotonic queue" can be slightly misleading. If elements need to be removed from the left, then we use a *doubly-ended queue* or *deque*. Stack-like operations are performed on the right end to maintain the monotonic invariant while the queue-like operation of efficiently removing an element(s) from the left is performed, if needed.

What can make monotonic stacks and deques challenging at first is not *what* they are (all possibilities are shown above) but *how* they are used in sophisticated ways to solve problems of varying complexity. This post thoroughly explores two introductory problems and various approaches to solving these problems without ever mentioning the words *monotonic*, *stack*, or *queue*/*doubly-ended queue*/*deque*. The *ideas* behind these structures are used though, where an emphasis is placed on trying to use these ideas as organically as possible (i.e., not getting mired in technical mumbo jumbo but exploring new ways of thinking). If you can make it through the "next greater height" and "sliding window minimum" introductory problems, then you will know what you need to know about monotonic stacks and queues.

Several practice problems then await! Solved practice problems appear at the end of this post.

</details>

## Next greater height

Perhaps the best way to start our exploration of monotonic stacks/queues is with a problem with no framing (i.e., we'll worry about what monotonic stacks/queues actually are at a later point). [This video](https://www.youtube.com/watch?v=Dq_ObZwTY_Q) introduces monotonic stacks with the problem of finding the next greater height value (left to right) for a row of people lined up (or `-1` if a next greater height does not exist):

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f1.png').default} />
</div>

The heights, `heights = [12, 11, 12, 14, 13]`, are listed above each person in magenta, and the final reported answer is the cyan box on the bottom: `ans = [14, 12, 14, -1, -1]`. Let's go through some solution approaches for obtaining this answer.

### Approach 0 (brute force)

How would you solve this problem if you were out in the wild (i.e., if you really had a row of people in front of you with their heights labeled above them)? You would probably do what I would do along with most other people: 

- Start with the first (leftmost) person. Then move left to right across the row (beginning at the second person) until you've identified a person with a height greater than the first person. Record that height (or `-1` if the search was unsuccessful).
- Start with the next (second) person. Move left to right across the row (beginning at the third person) until you've identified a person with a height greater than the second person. Record that height (or `-1` if the search was unsuccessful).
- Start with the next (third) person. And so on.

This brute force approach is rather intuitive and not the hardest to implement with code (we pre-fill the answer array with `-1` to avoid having to manually make such assignments after unsuccessful searches):

```python
def next_greater_height_0(heights):
    # pre-fill the answer array with -1
    ans = [-1] * len(heights)

    # start with the leftmost person
    for i in range(len(heights) - 1):
        curr_height = heights[i]

        # begin looking for the next greater height
        for j in range(i + 1, len(heights)):
            next_height = heights[j]

            # if a greater height is found, update the answer array
            if curr_height < next_height:
                ans[i] = next_height
                break

    return ans
```

What's the computational burden of the approach above; that is, what is the time and space complexity of the `next_greater_height_0` function?

- **Time** If `heights` has $n$ elements, then how many total iterations can we possibly perform? The worst-case scenario is if the `heights` input array is strictly decreasing (because then no height will have a next greater height and we must exhaust the search space every time we look for a next greater height). Our function appears to be $O(n^2)$ in terms of time complexity, but let's confirm this &#8212; the inner loop is where the heavy lifting is done. How many times can we possibly enter the innermost loop and perform an operation in the worst-case scenario? The table below shows how many times the innermost loop can fire (i.e., how many elements are traversed or "people searched" in service of looking for a next greater height for index `i`):

  $$
  \begin{array}{l|cccccc}
  i\ \text{index} & 0   & 1   & 2   & \cdots & n-3 & n-2\\\hline
  j\ \text{iterations} & n-1 & n-2 & n-3 & \cdots & 2   & 1
  \end{array}
  $$

  We can have a total of $(n-1) + (n-2) + \cdots + 2 + 1$ iterations. This is the sum of the first $n-1$ positive integers. Since the sum of the first $n$ positive integers is given by [the formula](https://en.wikipedia.org/wiki/Triangular_number#Formula) $n(n+1)/2$, we can see that our sum amounts to $(n-1)((n-1) + 1) / 2 = n(n-1)/2 = O(n^2)$, as expected. Hence, the brute force approach above is $O(n^2)$ in terms of time complexity.

- **Space:** For space complexity, no additional memory is consumed as the size of the input array `heights` scales to infinity; hence, the space complexity is $O(1)$.

There's nothing *wrong* with the approach above, but a time complexity of $O(n^2)$ is generally not considered to be that great unless it's unavoidable.

### Approach 1 (right to left, single pass)

Is there a way to improve on the $O(n^2)$ time complexity for the brute force solution above? Is it possible for us to compromise on space to get a solution that is $O(n)$ time and $O(n)$ space (e.g., the same compromise is made for the intended solution to <LC id='1' type='long' ></LC>), where we maintain some sort of data structure to help us figure out each person's next greater height? Maybe. Let's see if we can figure this example problem out manually/verbally first before coding anything up.

#### Process description

If we started processing the height of each person *from the right*, then maybe we could use the heights we've seen thus far to determine the next greater height for each element as we proceed from right to left. Here's one possible way we could do this (the people-indexing is 0-based), first recalling the heights of the people to be processed, `heights = [12, 11, 12, 14, 13]`:

| Person | Height | Process Description|
| :-: | :-: | :-- |
| `4` | `13` | This is the rightmost person so there cannot be another person to the right with a greater height. We report `-1` for this person since there is no next greater height, and we store the height we've just seen so we can reference it later, if needed: `[13]`. |
| `3` | `14` | What heights have we seen thus far? We have `[13]` and that's it. But that's not greater than `14`. So we report `-1` for this person too. How should we store the height of `14` we've just encountered so that we can effectively reference it later, if needed? Should we still keep the `13` in what we have so far: `[13]`? No, because *any* height that could have `13` as its next greater height would certainly have `14` as its *actual* next greater height since `14` comes *before* `13` in the left-to-right row of people. It does not benefit us at all to keep the `13` so we remove it. *Then* we add `14`: `[14]`. |
| `2` | `12` | Do we have a height greater than `12` that we can reference that might be a candidate for its next greater height? Yes! We can finally use our small collection `[14]` effectively. The height of `14` is the next greater height. So we report `14` for this person. What should we do with the height of `12` we just saw? Should we add it to our collection or not? If we didn't add it to our collection, then we could potentially see a height in the near future that is *smaller* than `12`, say `1`, and reporting `14` as the next greater height would be inaccurate (because `12` would actually be the next greater height). So we should add `12` to the collection: `[14, 12]`. |
| `1` | `11` | Do we have a height greater than `11` that we can reference that might be a candidate for its next greater height? Yes! Our collection right now is `[14, 12]`, but the `14` comes after the `12` in terms of the order in which these heights are encountered; hence, we will report `12` for this person. What should we do with the height of `11`? For the same reasons as noted above, we should add `11` to our collection: `[14, 12, 11]`. |
| `0` | `12` | Do we have a height greater than `12` that we can reference that might be a candidate for its next greater height? Yes! Our collection right now is `[14, 12, 11]`. How does this help? Because of how we've arranged the collection (from biggest height to smallest and in the order we've encountered them). This means we first test `11` as a candidate. It's not greater than `12` so we remove it from our collection: `[14, 12]`. What about `12`? It is also not greater than `12` so we remove it from our collection too: `[14]`. What about `14`? It *is* greater than `12` so we will report `14` as the next greater height for this person. We now add `12` to our collection and continue processing people heights as above (but this is the end of this row of people so this is where we stop): `[14, 12]`. |

It may be illustrative to show a condensed table where the reported next greater height for each person is included as well as what our height reference collection looks like *after* processing each person:

| Person | Height | Next greater height | Height collection *after* person processed |
| :-: | :-: | :-: | :-- |
| `4` | `13` | `-1` | `[13]` |
| `3` | `14` | `-1` | `[14]` |
| `2` | `12` | `14` | `[14, 12]` |
| `1` | `11` | `12` | `[14, 12, 11]` |
| `0` | `12` | `14` | `[14, 12]` |

#### Code implementation

Now for the code implementation of the process described above:

```python
def next_greater_height_1(heights):
    height_collection = []
    ans = [None] * len(heights)
    for i in range(len(heights) - 1, -1, -1):
        curr_height = heights[i]

        # remove all height collection references less than or equal to the current height
        while height_collection and height_collection[-1] <= curr_height:
            height_collection.pop()
        
        # if height collection references is empty, then there's no next greater height: -1
        if not height_collection:
            ans[i] = -1
        # if height collection is non-empty, then next greater height is
        # most recently seen height that is greater than the current height
        else:
            ans[i] = height_collection[-1]
        
        # add the current height to the height collection,
        # which is guaranteed to be less than all other heights in the collection
        height_collection.append(curr_height)
            
    return ans
```

#### Code implementation confirms process description

The code above closely follows the process described previously; in fact, if we add a simple `print` statement at the end of each for loop iteration (i.e., after each person has been processed), then we can see this more clearly for ourselves:

```python
print(
    f'Person: {i}; '
    f'Height: {curr_height}; '
    f'Next greater height: {ans[i]}; '
    f'Height collection: {height_collection}; '
    f'Answer so far: {ans}'
)
```

The console output then confirms the work we did previously (horiztonal spacing adjustments added after printing):

```
Person: 4;  Height: 13;  Next greater height: -1;  Height collection: [13];          Answer so far: [None, None, None, None, -1]
Person: 3;  Height: 14;  Next greater height: -1;  Height collection: [14];          Answer so far: [None, None, None, -1, -1]
Person: 2;  Height: 12;  Next greater height: 14;  Height collection: [14, 12];      Answer so far: [None, None, 14, -1, -1]
Person: 1;  Height: 11;  Next greater height: 12;  Height collection: [14, 12, 11];  Answer so far: [None, 12, 14, -1, -1]
Person: 0;  Height: 12;  Next greater height: 14;  Height collection: [14, 12];      Answer so far: [14, 12, 14, -1, -1]
```

### Approach 2 (left to right, single pass)

The approach described above was kind of clever, specifically how we kept a sort of "history" or collection of previous heights encountered to facilitate the determination of each person's next greater height. Iterating from right to left can sometimes provide a number of advantages, and that shows in this particular problem. But something worth considering is whether or not it's even *possible* to solve this problem iterating from left to right in a single pass; that is, we'd like to keep our computational improvement from $O(n^2)$ to $O(n)$, and we're still willing to compromise on the space requirement from $O(1)$ to $O(n)$, but we'd like to move from left to right, if possible.

#### Process intuition

Iterating from left to right to solve the next greater heights problem *is* possible, but we need to get a little more creative in how we keep track of the heights we've seen thus far to facilitate "next greater height" determinations. Recall the heights we're trying to process: `heights = [12, 11, 12, 14, 13]`. How we actually *start* processing peoples' heights from left to right presents a clear problem: what do we do with the first `12` we encounter? When iterating from right to left, it was very clear what to do with the `13` that we encountered on the first iteration: it couldn't possibly have a next greater height (it represented the height of the rightmost person). That's not the case here with the `12` on the first iteration from left to right. It's not just possible for this height to have a next greater height &#8212; we *know* this height has a next greater height of `14`, but we need some way of easily determining that. How? What's the strategy?

Part of the strategy harkens back to the intuitive strategy employed in the brute force approach: the next height we see that is *greater* than the current height becomes the current height's next greater height. If we start with `12`, then we cannot yet make a determination about what its next greater height is. So let's just try to "remember" somehow that this height still needs a next greater height. We could model the situation as follows, where the box below each height represents its next greater height (the block on the right represents what we know to be the final desired state from our previous work):

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```a title="Starting state"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
|    |    |    |    |    |
 ---- ---- ---- ---- ----
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```a title="Final state"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| 14 | 12 | 14 | -1 | -1 |
 ---- ---- ---- ---- ----
```

</div>
</div>

As noted above, we cannot yet make a determination for the leftmost `12` so we'll simply fill its answer box (i.e., the box directly underneath) with `??` until we have more information we can act on:

```a title="After first iteration"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| ?? |    |    |    |    |
 ---- ---- ---- ---- ----
```

In fact, for every *current height* we encounter, it is not possible for us to know its next greater height yet since we're iterating from left to right. Consequently, each current height we encounter should have its answer box filled with `??`. The real question is whether or not any *previous* heights have the current height as their next greater height; that is, whenever we encounter a new height as the current height, we should look at all heights previously whose answer boxes hold `??` and see if the current height is greater (if so, then this height becomes the next greater height for all such previous heights). This may sound confusing at first, but working out the mechanics for the rest of this example will help clarify the process.

For the new current height of `11`, we fill its answer box with `??`, and we can see all previous heights whose answer boxes hold `??` are *not* less than `11` (just the leftmost `12` in this case); hence, no updates are needed and we move on:

```a title="After second iteration"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| ?? | ?? |    |    |    |
 ---- ---- ---- ---- ----
```

Now we encounter the second `12`. We fill its answer box with `??` and we look at previous heights whose answer boxes hold `??`. The only height less than `12` whose answer box has `??` is the `11` we encountered in the previous iteration. Its next greater height must be `12`. We make the update to the answer box for `11` and move on:

```a title="After third iteration"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| ?? | 12 | ?? |    |    |
 ---- ---- ---- ---- ----
```

What about `14`? The heights of `12` encountered previously have `14` as their next greater height. We make the updates and move on:

```a title="After fourth iteration"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| 14 | 12 | 14 | ?? |    |
 ---- ---- ---- ---- ----
```

For the `13`, it is clear no previous height has `13` as its next greater height. Hence, the (almost) final state of the answer boxes is as follows:

```a title="After fifth iteration (final iteration)"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| 14 | 12 | 14 | ?? | ?? |
 ---- ---- ---- ---- ----
```

The only thing left to do to reach the desired final state is replace all remaining `??` with `-1` since these heights have no next greater heights:

```a title="Final state"
  12   11   12   14   13 
 ---- ---- ---- ---- ----
| 14 | 12 | 14 | -1 | -1 |
 ---- ---- ---- ---- ----
```

And we're done! How can we get started on translating the process outlined above into an actual code implementation? Two points are probably worth consideration before embarking on this task:

- **`-1` autofilling:** This is a minor point, but the last step above where we had to convert all remaining `??` to `-1` is unnecessary. The solution approach outlined in the previous section autofilled the answer array with `None`: `ans = [None] * len(heights)`. And that was fine for that solution because the answer slot for *every single height* was updated to be the next greater height or `-1` if no such height existed.

  For the process we've described above, however, we only update an answer box if we've found a next greater height; hence, we should simply initialize the answer array with `-1` and *overwrite* answer slots if we find next greater heights.

- **Updating the next greater height for previous heights based on the current height:** This is a more pressing issue. Specifically, the transition from "after the third iteration" to "after the fourth iteration" may raise some eyebrows depending on how we actually plan to do this with code:

  <div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
  <div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

  ```a title="After third iteration"
    12   11   12   14   13 
   ---- ---- ---- ---- ----
  | ?? | 12 | ?? |    |    |
   ---- ---- ---- ---- ----
  ```

  </div>
  <div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

  ```a title="After fourth iteration"
    12   11   12   14   13 
   ---- ---- ---- ---- ----
  | 14 | 12 | 14 | ?? |    |
   ---- ---- ---- ---- ----
  ```

  </div>
  </div>

  We need to make this transition *efficiently* somehow. If we iterated from left to right from each height without a next greater height to the current height (i.e., from the first `12` to `14`, skip the `11`, and then from the second `12` to `14`), then we would end up with a time complexity similar to the brute force approach. That is not what we want. But we still need to be able to refer to the height values of `12` somehow in order to update their answer slots. How can we do this effectively and efficiently?
  
  In the previous solution approach, we maintained a collection of unique heights that decreased from left to right. For example, the collection `[14, 12, 11]` represented heights that we encountered from oldest to newest, largest to smallest. And we removed smaller heights as needed until we encountered a height greater than the current height. But that approach will not work here. We need to update *both* answer slots for the height of `12` &#8212; simply keeping a single height of `12` in some sort of collection will not do because there's no way to distinguish between these two heights based on value alone.

  Is there any way we can make a distinction between two heights of the same value? Consider the original input array: `heights = [12, 11, 12, 14, 13]`. It may be true that `heights[0] == heights[2]` (i.e., `12 == 12`), but it's certainly not the case that `0 == 2`; that is, the *index values* of the heights make each height distinct. What if instead of keeping a collection of heights for reference we kept a collection of *index values* for previously encountered heights? Index values make it possible to access both a height's value as well as where its answer box/slot needs to be updated (i.e., its indexed position). This might be just what we need.

#### Process description

If we started processing the height of each person *from the left* using the process alluded to above, where we kept track of index values for previously encountered heights, then what would each step of the process look like? Let's draw this up in tabular form, as with the previous solution approach (the people-indexing is 0-based), first recalling the heights of the people to be processed, `heights = [12, 11, 12, 14, 13]`. (An index-to-height correspondence array is provided in the table below to help clarify what heights correspond to which indexes.)

| Person | Height | Process Description |
| :-: | :-: | :-- |
| `0` | `12` | This is the leftmost person, and the collection of index values for previously encountered heights is currently empty. Hence, we add the current height's index value to the collection: `[0]`.<br/><br/>Collection's index-to-height correspondence: `[12]`. Current answer array: `[-1, -1, -1, -1, -1]`. |
| `1` | `11` | The current height is now `11`. Are there any index values in the collection that represent a height less `11`? No. We now add the current height's index value to the collection: `[0, 1]`.<br/><br/>Collection's index-to-height correspondence: `[12, 11]`. Current answer array: `[-1, -1, -1, -1, -1]`. |
| `2` | `12` | The current height is now `12`. Are there any index values in the collection that represent a height less than `12`? Yes. Our current collection is `[0, 1]`, and the index value of `1` corresponds to a height of `11`. We update the corresponding answer slot by using our collection of index values (i.e., the next greater height for the person with height `11` is the current height of `12`): `ans[1] = 12`. We now remove `1` from the collection since the person's next greater height at this position has now been determined: `[0]`.<br/><br/>Is the height of the person at index `0` less than the current height of `12`? No. We now add the current height's index value to the collection: `[0, 2]`.<br/><br/>Collection's index-to-height correspondence: `[12, 12]`. Current answer array: `[-1, 12, -1, -1, -1]`. |
| `3` | `14` | The current height is now `14`. Are there any index values in the collection that represent a height less than `14`? Yes. Our current collection is `[0, 2]`, and the index value of `2` corresponds to a height of `12`. We update the corresponding answer slot by using our collection of index values (i.e., the next greater height for the person at index `2` with height `12` is the current height of `14`): `ans[2] = 14`. We now remove `2` from the collection since the person's next greater height at this position has now been determined: `[0]`.<br/><br/>Is the height of the person at index `0` less than the current height of `14`? Yes. We update the corresponding answer slot by using our collection of index values: `ans[0] = 14`. We now remove `0` from the collection since the person's next greater height at this position has now been determined: `[]`.<br/><br/>The collection is now empty so we have no previous heights to compare with the current height. We now add the current height's index value to the collection: `[3]`.<br/><br/>Collection's index-to-height correspondence: `[14]`. Current answer array: `[14, 12, 14, -1, -1]`. |
| `4` | `13` | The current height is now `13`. Are there any index values in the collection that represent a height less than `13`? No. We now add the current height's index value to the collection: `[3, 4]`.<br/><br/>Collection's index-to-height correspondence: `[14, 13]`. Current answer array: `[14, 12, 14, -1, -1]`.<br/><br/>We have now finished processing the heights for all people. The final answer array is `[14, 12, 14, -1, -1]`, as desired. |

As before, it may be illustrative to show a condensed table where the reported next greater height for each person is included as well as what our reference collection of index values looks like after processing each person (along with the heights that correspond to these index values):

| Person | Height | Index collection *after* person processed | Index-height correspondence | Answer array |
| :-: | :-: | :-- | :-- | :-- |
| `0` | `12` | `[0]` | `[12]` | `[-1, -1, -1, -1, -1]` |
| `1` | `11` | `[0, 1]` | `[12, 11]` | `[-1, -1, -1, -1, -1]` |
| `2` | `12` | `[0, 2]` | `[12, 12]` | `[-1, 12, -1, -1, -1]` |
| `3` | `14` | `[3]` | `[14]` | `[14, 12, 14, -1, -1]` |
| `4` | `13` | `[3, 4]` | `[14, 13]` | `[14, 12, 14, -1, -1]` |

The table above shows more clearly how the answer array is updated in conjunction with index values being removed from our collection; that is, for example, after person `2` was processed, we removed index `1` from our collection and updated the value at index `1` in the answer array to be equal to the height of the current person being processed, the next greater height for the person at index `1`, namely the height of `12`.

#### Code implementation

Now for the code implementation of the process described above:

```python
def next_greater_height_2(heights):
    height_collection = []
    ans = [-1] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]

        # remove all index values in our collection that correspond to
        # previously encountered heights less than the current height
        # (and then update the answer array to point to the curren height as
        # the next greater height for the people positioned at those index values)
        while height_collection and heights[height_collection[-1]] < curr_height:
            prev_height_index = height_collection.pop()
            ans[prev_height_index] = curr_height

        # add the index for the current person's height to the collection,
        # which is guaranteed to correspond to a height less than all
        # other correspondent heights in the index collection
        height_collection.append(i)
    
    return ans
```

#### Code implementation confirms process description

The code above closely follows the process described previously; in fact, if we add a simple print statement at the end of each for loop iteration (i.e., after each person has been processed), then we can see this more clearly for ourselves:

```python
print(
    f'Person: {i}; '
    f'Height: {heights[i]}; '
    f'Index collection: {index_collection}; '
    f'Index-height correspondence: {[heights[i] for i in index_collection]}; '
    f'Answer array: {ans}'
)
```

The console output then confirms the work we did previously (horiztonal spacing adjustments added after printing):

```
Person: 0;  Height: 12;  Index collection: [0];     Index-height correspondence: [12];      Answer array: [-1, -1, -1, -1, -1]
Person: 1;  Height: 11;  Index collection: [0, 1];  Index-height correspondence: [12, 11];  Answer array: [-1, -1, -1, -1, -1]
Person: 2;  Height: 12;  Index collection: [0, 2];  Index-height correspondence: [12, 12];  Answer array: [-1, 12, -1, -1, -1]
Person: 3;  Height: 14;  Index collection: [3];     Index-height correspondence: [14];      Answer array: [14, 12, 14, -1, -1]
Person: 4;  Height: 13;  Index collection: [3, 4];  Index-height correspondence: [14, 13];  Answer array: [14, 12, 14, -1, -1]
```

### Approach 3 (single pass, modified question)

Was all of the pain and suffering involved in hammering out the approach above worth it? Maybe. The truth is that many problems won't just be about what an element's next greater or smaller element is; instead, the problem will have something to do with how these elements *relate* to each other in some way. 

#### Modifed problem statement

For example, for the "next greater height" problem we've been considering, what if the question were tweaked slightly to not be about what a height's next greater height is but how many spaces there are between people with these heights? 

#### Modified solution

Consider again how the people are lined up:

<div align='center' className='centeredImageDiv'>
  <img width='550px' src={require('./f1.png').default} />
</div>

Given the heights `[12, 11, 12, 14, 13]`, we know from our previous work that each height's next greater height is given by `[14, 12, 14, -1, -1]`, where `-1` conveys there is no next greater height for the height of the person at that position. If the answer array is now comprised of values that denote how many spaces there are between the current person and the person with the next greater height, then our answer array becomes `[3, 1, 1, 0, 0]`, where `0` conveys the person at that position does not have someone to their right with a greater height. 

How is it possible to assemble this answer array? Do we have to significantly revise our previous solution approache(s)? No. In fact, the second approach above, where we used a collection of index values, gives us all we need because the positional information we need for each person is provided by the index values themselves:

- Person `0`: When we encounter the next greater height of `14`, we note that this next greater height occurs at position or index `3` (i.e., `heights[3] = 14`). The current height of `12` for person `0` occurs at position or index `0` (here we can take advantage of the fact that the numeric label for each person corresponds to the index value of the corresponding height; that is, person `x` will have height `heights[x]`). We can use the difference in index values to compute how many spaces there are between these people: `3 - 0 = 3`.
- Person `1`: Current height of `11` occurs at index `1` and next greater height of `12` occurs at index `2`. The number of spaces between these people: `2 - 1 = 1`.
- Person `2`: Current height of `12` occurs at index `2` and next greater height of `14` occurs at index `3`. The number of spaces between these people: `3 - 2 = 1`.
- Person `3`: Current height of `14` occurs at index `3` and there is no next greater height; hence, report `0`.
- Person `4`: Current height of `13` occurs at index `4` and there is no next greater height; hence, report `0`.

That's it. That's all there is to do. The code modifications required, hightlighted below, are quite minor:

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Approach 3 (spaces between people)"
def next_greater_height_3(heights):
    index_collection = []
    # highlight-next-line
    ans = [0] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]
        while index_collection and heights[index_collection[-1]] < curr_height:
            prev_height_index = index_collection.pop()
            # highlight-start
            spaces_between = i - prev_height_index
            ans[prev_height_index] = spaces_between
            # highlight-end
        index_collection.append(i)
    
    return ans
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Approach 2 (next greater height)"
def next_greater_height_2(heights):
    index_collection = []
    ans = [-1] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]
        while index_collection and heights[index_collection[-1]] < curr_height:
            prev_height_index = index_collection.pop()
            ans[prev_height_index] = curr_height

        index_collection.append(i)
    
    return ans
```

</div>
</div>

### LC 739. Daily Temperatures

#### Problem statement

Let's now turn our attention to <LC id='739' type='long' ></LC> for some practice. Here's the problem statement for ease of reference:

> <LC739PS />

For example, if `temperatures = [73,74,75,71,69,72,76,73]` is given as input, then the desired output would be as follows: `[1,1,4,2,1,1,0,0]`.

#### Solution

This is virtually the same problem as the modified question for the next greater height problem where we looked at the number of spaces between each person and the next person of greater height. The solution to this LeetCode problem is almost identical (except here we're dealing with temperatures instead of heights, of course):

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        index_collection = []
        answer = [0] * len(temperatures)
        
        for i in range(len(temperatures)):
            curr_temp = temperatures[i]
            while index_collection and temperatures[index_collection[-1]] < curr_temp:
                prev_temp_index = index_collection.pop()
                days_between = i - prev_temp_index
                answer[prev_temp_index] = days_between
            index_collection.append(i)
        
        return answer
```

Of course, the main challenge for this problem is to actually *identify* that our solution approach is relevant and then to implement it without issues. That's the real hard part.

## Sliding window minimum

Let's try one last problem before bothering ourselves with technical terms and concepts: the sliding window minimum problem.

### Problem statement

You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return an answer array that contains the minimum value for each sliding window of size `k`.

For example, if the input array is `nums = [11, 13, -11, -13, 15, 13, 16, 17]` and `k = 3`, then the desired output or answer array would be `[-11, -13, -13, -13, 13, 13]`:

<pre>
Window&nbsp;position&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Min{'\n'}
------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-----{'\n'}
[11&nbsp;&nbsp;13&nbsp;&nbsp;-11]&nbsp;-13&nbsp;&nbsp;15&nbsp;&nbsp;13&nbsp;&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-11</strong>{'\n'}
&nbsp;11&nbsp;[13&nbsp;&nbsp;-11&nbsp;&nbsp;-13]&nbsp;15&nbsp;&nbsp;13&nbsp;&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;[-11&nbsp;&nbsp;-13&nbsp;&nbsp;15]&nbsp;13&nbsp;&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;&nbsp;-11&nbsp;[-13&nbsp;&nbsp;15&nbsp;&nbsp;13]&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;&nbsp;-11&nbsp;&nbsp;-13&nbsp;[15&nbsp;&nbsp;13&nbsp;&nbsp;16]&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;&nbsp;-11&nbsp;&nbsp;-13&nbsp;&nbsp;15&nbsp;[13&nbsp;&nbsp;16&nbsp;&nbsp;17]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>13</strong>{'\n'}
</pre>

### False start

In the next greater height problem at the beginning of this post, we saw that it was an effective strategy to maintain a collection that we could use to reference previously encountered heights where the collection was comprised of either the heights themselves (approach 1) or indexes that we could use to obtain the heights themselves (approach 2). For both approaches, the collections we maintained effectively corresponded to heights that were non-increasing (i.e., decreasing or equivalent):

- **Approach 1:** The height collections after processing people `4`, `3`, `2`, `1`, and `0` were as follows, respectively: 
  + `[13]`
  + `[14]`
  + `[14, 12]`
  + `[14, 12, 11]`
  + `[14, 12]`
- **Approach 2:** The index collections after processing people `0`, `1`, `2`, `3`, and `4` were as follows, respectively (height correspondence shown to the right):

  $$
  {\small
  \begin{array}{lcl}
  \texttt{[0]} &\longrightarrow & \texttt{[12]}\\
  \texttt{[0, 1]} &\longrightarrow & \texttt{[12, 11]}\\
  \texttt{[0, 2]} &\longrightarrow & \texttt{[12, 12]}\\
  \texttt{[3]} &\longrightarrow & \texttt{[14]}\\
  \texttt{[3, 4]} &\longrightarrow & \texttt{[14, 13]}
  \end{array}}
  $$

As demonstrated above, the heights we could reference by means of these collections we were maintaining in both approaches were non-increasing (strictly decreasing in approach 1 and non-increasing in approach 2). Specifically, the heights in the collection progressed from largest to smallest and went from "oldest" to "newest"; that is, the leftmost height was encountered before any other heights that followed, and the "newest" height was always the current height we just encountered.

The last part in the sentence above bears repeating because it indicates how we actually go about maintaining the collection: *the "newest" height was always the current height we just encountered*. If the collection of heights is decreasing and the current height is always the newest height in the collection, then this means we need to keep removing heights from the collection until the current height is the smallest one. Doing so ensures we maintain the "collection is decreasing" invariant. For example, if our height collection is `[18, 16, 14, 11, 8, 4]` and we encounter a new height of `13`, then we need to remove every element of the collection less than `13` before we add this "newest" current height: `[18, 16, 14, 13]`.

How does all of this help for the current problem of finding the minimum value in each 3-element sliding window as we move from left to right? Since we're interested in the *minimum* value for each window and the rightmost value in the collections we maintained previously was always the smallest value, maybe this means we could dynamically maintain a "window collection" where we always picked off the rightmost value as the minimum? Let's try:

- The first value is `11` with index `0`. Right now our collection is empty and the window is not yet of size `k = 3`. Hence, we add `0` to our collection and proceed: `[0]`.
- The second value is `13` with index `1`. Our collection right now is `[0]` which corresponds to the value of `11`. Oops. We've already run into a problem: what do we do with index `1` that corresponds to value `13`? If we add it to the collection, then we'll actually need to *remove* what's currently in the collection to maintain the "collection is decreasing" invariant: `[1]` corresponds to `[13]`, which respects the invariant, but `[0, 1]` corresponds to `[11, 13]`, which violates the invariant. 

  Simply removing index `0` from the collection is really not an option here. If the first three elements of the input array were, for example, `[11, 13, 12]`, then removing the ability to reference `11` means we've actually lost the ability to accurately determine the minimum value for the first three-element window.

We need a different strategy. What if our collection referred to *increasing* values from left to right instead of *decreasing* values? Then the leftmost value would now be the smallest value (i.e., minimum) and we would not have to remove it whenever we encountered a larger value. Let's try again:

- The first value is `11` with index `0`. Right now our collection is empty and the window is not yet of size `k = 3`. Hence, we add `0` to our collection and proceed: `[0]`.
- The second value is `13` with index `1`. Our collection right now is `[0]` which corresponds to value `[11]`. Since `13` is greater than `11`, we can simply add its index to our collection and proceed: `[0, 1]`.
- The third value is `-11` with index `2`. Our collection right now is `[0, 1]` which corresponds to values `[11, 13]`. But we want our collection to be *increasing*, where each newly added index corresponds to the greatest value referenced in the collection. To accomplish this for `-11`, we need to remove all indexes from our collection that correspond to values smaller than `-11`, namely all indexes in this case since both `11` and `13` are greater than `-11`. Our new collection becomes `[2]` which corresponds to value `[-11]`. Also, since we've now encountered the third value, we now have a 3-element window, and its minimum is the leftmost value referenced by our collection (i.e., `nums[2] = -11`).

This strategy seems like it might work! Let's write things out in tabular form as we did with the previous approaches, where this time we'll have six columns (each row's column values will refer to the state of things *after* the current indexed value has been processed):

- **Index:** This is the index of the value being processed.
- **Value:** This is the value that corresponds to the row's index value.
- **Index collection:** This is the *increasing* index collection (i.e., indexes correspond to values that increase from smaller to larger).
- **Index-value correspondence:** Translation of indexes in the collection to their correspondent values (for ease of reference).
- **Window indexes:** We're told that the window is of size `k = 3` and moves one unit from left to right. Hence, the sliding window indexes are `[0, 1, 2]` for the first window, `[1, 2, 3]` for the second window, and so on. This should be useful as a sanity check to ensure we don't include as a window minimum a value that is not actually in the window!
- **Window minimum:** This is the minimum value for the current window of size `k = 3`.

First recall our input: `nums = [11, 13, -11, -13, 15, 13, 16, 17], k = 3`. Now let's try to implement the strategy discussed above in tabular form:

| Index | Value | Index collection | Index-value correspondence | Window indexes | Window minimum |
| :-: | :-: | :-- | :-- | :-- | :-: |
| `0` | `11` | `[0]` | `[11]` | `[0, x, x]` |  |
| `1` | `13` | `[0, 1]` | `[11, 13]` | `[0, 1, x]` |  |
| `2` | `-11` | `[2]` | `[-11]` | `[0, 1, 2]` | `-11` |
| `3` | `-13` | `[3]` | `[-13]` | `[1, 2, 3]` | `-13` |
| `4` | `15` | `[3, 4]` | `[-13, 15]` | `[2, 3, 4]` | `-13` |
| `5` | `13` | `[3, 5]` | `[-13, 13]` | `[3, 4, 5]` | `-13` |
| `6` | `16` | `[3, 5, 6]` | `[-13, 13, 16]` | `[4, 5, 6]` | `-13` |

Oh no. The strategy seemed to be working great, but the last row above cannot be correct &#8212; the index of `3` in the index collection `[3, 5, 6]` is not valid when we encounter index `6` because the window of length `k = 3` with index `6` as its right endpoint has the following indexes: `[4, 5, 6]`.

Is the strategy we were working on implementing above in tabular form completely doomed? Do we need to pursue a different strategy altogether? Or can we make a slight adjustment to fix everything?

### Fixed start

Fortunately, the exact issue of what went wrong in the last row above is easy to identify: the index collection we were maintaining has an index value that is invalid for the sliding window; that is, when our sliding window of length `k = 3` ends at index `6`, this means the sliding window extends across indexes `[4, 5, 6]`. The index `3` is thus invalid. What should we do? What if we just removed this invalid index from our collection? Would that work? If we removed *only* the invalid index, then our collection would become `[5, 6]`, which would correspond to values `[13, 16]`. Does this work?

The sliding window that extends across indexes `[4, 5, 6]` has the following corresponding values: `[15, 13, 16]`; hence, the minimum value for this window is `13`, which occurs at index `5`. And this is now the leftmost value in our index collection since we removed only the invalid index! This isn't just a happy coincidence or chance. 

Recall that for each new value we encounter, we ensure it is the largest value referred to in our index collection, where are our index collection represents corresponding values that *increase*. Furthermore, what's the largest size our index collection should ever possibly be? Answer: The size of the sliding window, `k`. Why? If the index collection were larger than the size of the sliding window itself, `k = 3` in this case, then our collection would *automatically* have an invalid index. So how do we ensure the index collection never exceeds a size of `k` and only ever has valid indexes? The manner in which the sliding window moves is a hint.

Once the initial window size of `k` has been reached, every time the window shifts a single unit to the right, the window's previous leftmost index must be removed as a valid index from our index collection (if it is present); that is, if `i` is the index of the value we have currently processed to maintain our collection's increasing or decreasing invariant, and our sliding window is of size `k`, then the leftmost index that must be removed (if it is part of our collection) is `i - k`. For example, if `i = 7`, and `k = 3`, then the valid window indexes are `[5, 6, 7]`, and the leftmost index of the previous window which is no longer valid and would need to be removed from our collection (if it was present) would be `i - k = 7 - 3 = 4`.

When can the scenario described above actually happen? This can happen when the index in need of removal corresponds to the minimum value for `k` windows of size `k`, and this is *exactly* what happened when we were progressing through the table above when we encountered our issue:

- Indexes `[1, 2, 3]` corresponded to values `[13, -11, -13]`. Minimum: `-13` (index `3`).
- Indexes `[2, 3, 4]` corresponded to values `[-11, -13, 15]`. Minimum: `-13` (index `3`).
- Indexes `[3, 4, 5]` corresponded to values `[-13, 15, 13]`. Minimum: `-13` (index `3`).
- Indexes `[4, 5, 6]` corresponded to values `[15, 13, 16]`. Minimum: `13`, not `-13` (index `5`, not `3`).

  The value `nums[3] = -13` was the minimum value for `k = 3` windows. This index value is no longer valid for this window because it was the leftmost index of the previous window.

How do we "just remove" the invalid index of `3` when our increasing index collection of `[3, 5, 6]` corresponds to values `[-13, 13, 16]` even though the sliding window only covers indexes `[4, 5, 6]` which correspond to values `[15, 13, 16]`? In *all* of the approaches thus far, we have *always* added/removed values to/from our collection in order to maintain the collection's increasing or decreasing invariant. We are still doing that in this approach we've been describing, but what's to stop us from *removing* invalid values in our collection *from the left* (when needed)? 

Removing `3` from the left of `[3, 5, 6]` means we now have `[5, 6]` (correspondent values `[13, 16]`), which are valid window indexes for the window that extends across indexes `[4, 5, 6]`. Hence, removing an element *from the left* did not disturb the increasing invariant of our collection that we've been trying to maintain &#8212; we simply removed an invalid value. The reward is that the new leftmost index in our collection, `5`, corresponds to the minimum value of the current three-element window: `nums[5] = 13`.

Let's try our tabular approach again, but this time we'll remove invalid indexes from the left of our collection if we encounter them *before* reporting a window minimum:

| Index | Value | Index collection | Index-value correspondence |  Window indexes | Index to remove (if present) | Window minimum |
| :-: | :-: | :-- | :-- | :-- | :-: | :-: |
| `0` | `11` | `[0]` | `[11]` | `[0, x, x]` |  |  |
| `1` | `13` | `[0, 1]` | `[11, 13]` | `[0, 1, x]` |  |  |
| `2` | `-11` | `[2]` | `[-11]` | `[0, 1, 2]` |  | `-11` |
| `3` | `-13` | `[3]` | `[-13]` | `[1, 2, 3]` | `3 - 3 = 0 != 3` | `-13` |
| `4` | `15` | `[3, 4]` | `[-13, 15]` | `[2, 3, 4]` | `4 - 3 = 1 != 3` | `-13` |
| `5` | `13` | `[3, 5]` | `[-13, 13]` | `[3, 4, 5]` | `5 - 3 = 2 != 3` | `-13` |
| `6` | `16` | `[5, 6]` | `[13, 16]` | `[4, 5, 6]` | `6 - 3 = 3 == 3` (removed) | `13` |
| `7` | `17` | `[5, 6, 7]` | `[13, 16, 17]` | `[5, 6, 7]` | `7 - 3 = 4 != 5` | `13` |

If we collect the window minimums from the table above into an array, then we get `[-11, -13, -13, -13, 13, 13]`, as desired.

### Code implementation

Now for the code implementation of the process described above:

```python
def sliding_window_min_1(nums, k):
    # highlight-warning-next-line
    index_collection = []
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]

        # remove all index values in our collection that correspond to
        # previously encountered numbers greater than the current number
        # (note that removals are made from the right)
        while index_collection and nums[index_collection[-1]] > curr_num:
            index_collection.pop()
        
        # add the index for the current number to the collection,
        # which is guaranteed to correspond to a number greater than all
        # other correspondent numbers in the index collection;
        # importantly, the leftmost index of the collection corresponds 
        # to the smallest number represented in the collection
        # (note that additions are made to the right)
        index_collection.append(i)
        
        # if the leftmost index in our collection corresponds 
        # to the leftmost index of the previous window, 
        # then remove this index in the collection _from the left_
        if index_collection[0] == i - k:
            # highlight-warning-next-line
            index_collection.pop(0)
        
        # do not start adding window minimums to the answer array
        # until our window has reached a size of k
        if i >= k - 1:
            ans.append(nums[index_collection[0]])
            
    return ans
```

The highlighted lines above are meant to serve as a warning of sorts. Why? The code above clearly provides the correct output and respects every detail of our process and strategy:

```python
print(sliding_window_min_1([11, 13, -11, -13, 15, 13, 16, 17], 3))
# [-11, -13, -13, -13, 13, 13]
```

The reason why the lines are highlighted in warning colors above is because of the data structure we are using for our `index_collection`, namely a Python list or "dynamic array." Python lists are excellent if we're mostly adding or removing elements from the end (i.e., the right) because these operations are $O(1)$ on average. We're executing such operations whenever we move to a new index and add it to the `index_collection` &#8212; we remove all indexes from the right of the collection until the only remaining indexes correspond to values less than or equal to the current value. But what if we then discover that the leftmost index in our collection is the leftmost index of the previous window and is therefore an invalid index? We remove this index in our collection *from the left*. 

Removing elements in arrays from the left on a regular basis is not performant because each removal is $O(n)$, where $n$ represents the number of elements in the array (all array elements need to be shifted in memory once the first element is deleted). It would be ideal if we could use a data structure that supported efficient additions/removals from the right *and* from the left. What we're looking for is the so-called double-ended queue or "deque" for short, and Python has just the thing in its `collections` module: [`collections.deque`](https://docs.python.org/3/library/collections.html#collections.deque):

> `class collections.deque([iterable[, maxlen]])`: Returns a new deque object initialized left-to-right (using `append()`) with data from `iterable`. If `iterable` is not specified, the new deque is empty.
>
> Deques are a generalization of stacks and queues (the name is pronounced "deck" and is short for "double-ended queue"). Deques support thread-safe, memory efficient appends and pops from either side of the deque with approximately the same $O(1)$ performance in either direction.
>
> Though `list` objects support similar operations, they are optimized for fast fixed-length operations and incur $O(n)$ memory movement costs for `pop(0)` and `insert(0, v)` operations which change both the size and position of the underlying data representation.
> 
> [...]

As [noted on Stack Overflow](https://stackoverflow.com/a/6257048/5209533) and [confirmed in CPython's source code](https://github.com/python/cpython/blob/8f4f77364750d0ceec47157e8920983e3f41651f/Modules/_collectionsmodule.c#L71), the `deque` in Python is implemented under the hood with a doubly-linked list. A [comment](https://stackoverflow.com/questions/4426663/how-do-i-remove-the-first-item-from-a-list#comment115406098_4426727) on a separate Stack Overflow thread summarizes the takeaway rather neatly:

> In my case, the time went down from 1:31 min. with `pop(0)` to 200 - 250 ms by using `deque`.

If we're going to be regularly adding and removing elements from the left and from the right, which is all we're actually doing with our `index_collection` in the solution above, then the data structure we should use is a double-ended queue. The code changes required, highlighted below, are minimal for the optimal solution:

```python
# import the deque from the collections module in Python's standard library
# highlight-success-next-line
from collections import deque

def sliding_window_min_2(nums, k):
    # initialize empty deque for O(1) additions/removals from both ends
    # highlight-success-next-line
    index_collection = deque()
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        while index_collection and nums[index_collection[-1]] > curr_num:
            index_collection.pop()
        index_collection.append(i)

        if index_collection[0] == i - k:
            # remove elements from the left in O(1)
            # highlight-success-next-line
            index_collection.popleft()
        
        if i >= k - 1:
            ans.append(nums[index_collection[0]])
            
    return ans
```

It's worth noting that we have not yet explicitly mentioned using stacks or queues in any of our problem-solving approaches (the lone exception being the optimal solution above that used a deque), much less "monotonic" stacks or queues. And that's because we haven't really needed to use that terminology &#8212; we used the *ideas* without knowing the names for these ideas. All of the terminology will soon be defined and made clear (once we wrap up this sliding window problem).

### Code implementation confirms process description

The code above closely follows the process described previously; unfortunately, in this case, adding a print statement after each for loop (i.e., after each index has been processed) is not as simple as it was in the previous problem. Nonetheless, if you want to modify the solution code to accomplish this, then you can.

<details>
<summary> Modified solution code to print tabular values for each iteration</summary>

```python
def sliding_window_min_2_print(nums, k):
    index_collection = deque()
    ans = []
    
    for i in range(len(nums)):
        # highlight-start
        removing_index = False
        window_min_exists = False
        # highlight-end
        curr_num = nums[i]
        while index_collection and nums[index_collection[-1]] > curr_num:
            index_collection.pop()
        index_collection.append(i)
        
        if index_collection[0] == i - k:
            # highlight-start
            removing_index = True
            removed_index = index_collection.popleft()
            # highlight-end
            
        if i >= k - 1:
            # highlight-start
            window_min_exists = True
            window_min = nums[index_collection[0]]
            # highlight-end
            ans.append(nums[index_collection[0]])
            
        # highlight-start
        print(
            f'Index: {i}; '
            f'Value: {nums[i]}; '
            f'Index collection: {list(index_collection)}; '
            f'Index-value correspondence: {[nums[idx] for idx in index_collection]}; '
            f'Window indexes: {[0, "x", "x"] if i == 0 else [0, 1, "x"] if i == 1 else [ val + (i - k) for val in range(1, k + 1)]}; '
            f'Index to remove (if present): {i} - {k} = {i - k} {"==" if removing_index else "!="} {removed_index if removing_index else index_collection[0]} {"(removed)" if removing_index else ""}; '
            f'Window minimum: {window_min if window_min_exists else ""}'
        )
        # highlight-end
            
    return ans
```

</details>

The console output then confirms the work we did previously (horizontal spacing adjustments added after printing):

```
Index: 0;  Value:  11;  Index collection: [0];        Index-value correspondence: [11];          Window indexes: [0, 'x', 'x'];   Index to remove (if present): 0 - 3 = -3 != 0;            Window minimum: 
Index: 1;  Value:  13;  Index collection: [0, 1];     Index-value correspondence: [11, 13];      Window indexes: [0, 1, 'x'];     Index to remove (if present): 1 - 3 = -2 != 0;            Window minimum: 
Index: 2;  Value: -11;  Index collection: [2];        Index-value correspondence: [-11];         Window indexes: [0, 1, 2];       Index to remove (if present): 2 - 3 = -1 != 2;            Window minimum: -11
Index: 3;  Value: -13;  Index collection: [3];        Index-value correspondence: [-13];         Window indexes: [1, 2, 3];       Index to remove (if present): 3 - 3 = 0  != 3;            Window minimum: -13
Index: 4;  Value:  15;  Index collection: [3, 4];     Index-value correspondence: [-13, 15];     Window indexes: [2, 3, 4];       Index to remove (if present): 4 - 3 = 1  != 3;            Window minimum: -13
Index: 5;  Value:  13;  Index collection: [3, 5];     Index-value correspondence: [-13, 13];     Window indexes: [3, 4, 5];       Index to remove (if present): 5 - 3 = 2  != 3;            Window minimum: -13
Index: 6;  Value:  16;  Index collection: [5, 6];     Index-value correspondence: [13, 16];      Window indexes: [4, 5, 6];       Index to remove (if present): 6 - 3 = 3  == 3 (removed);  Window minimum: 13
Index: 7;  Value:  17;  Index collection: [5, 6, 7];  Index-value correspondence: [13, 16, 17];  Window indexes: [5, 6, 7];       Index to remove (if present): 7 - 3 = 4  != 5;            Window minimum: 13
```

### LC 239. Sliding Window Maximum

#### Problem statement

Let's now turn our attention to <LC id='239' type='long' ></LC> for some practice. Here's the problem statement for ease of reference:

> <LC239PS />

For example, if `nums = [1,3,-1,-3,5,3,6,7], k = 3` is given as input, then the desired output would be as follows: `[3,3,5,5,6,7]`. The following illustration can help us see this more clearly (just like we did for the sliding window minimum problem earlier):

<pre>
Window&nbsp;position&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max{'\n'}
---------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-----{'\n'}
[1&nbsp;&nbsp;3&nbsp;&nbsp;-1]&nbsp;-3&nbsp;&nbsp;5&nbsp;&nbsp;3&nbsp;&nbsp;6&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>3</strong>{'\n'}
&nbsp;1&nbsp;[3&nbsp;&nbsp;-1&nbsp;&nbsp;-3]&nbsp;5&nbsp;&nbsp;3&nbsp;&nbsp;6&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>3</strong>{'\n'}
&nbsp;1&nbsp;&nbsp;3&nbsp;[-1&nbsp;&nbsp;-3&nbsp;&nbsp;5]&nbsp;3&nbsp;&nbsp;6&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>5</strong>{'\n'}
&nbsp;1&nbsp;&nbsp;3&nbsp;&nbsp;-1&nbsp;[-3&nbsp;&nbsp;5&nbsp;&nbsp;3]&nbsp;6&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>5</strong>{'\n'}
&nbsp;1&nbsp;&nbsp;3&nbsp;&nbsp;-1&nbsp;&nbsp;-3&nbsp;[5&nbsp;&nbsp;3&nbsp;&nbsp;6]&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>6</strong>{'\n'}
&nbsp;1&nbsp;&nbsp;3&nbsp;&nbsp;-1&nbsp;&nbsp;-3&nbsp;&nbsp;5&nbsp;[3&nbsp;&nbsp;6&nbsp;&nbsp;7]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>7</strong>{'\n'}
</pre>

#### Solution

The problem above is virtually identical to the sliding window minimum problem we worked so hard to solve. In fact, the *only* difference is that now we're looking for the maximum of each window. This means the `index_collection` we maintain should be *decreasing* (so that the leftmost value will always be a maximum). The rest of the logic stays the exact same. Hence, the only thing we need to do is change the comparison in the while loop from `>` to `<`; that is, we need to change

```python
while index_collection and nums[index_collection[-1]] > curr_num:
```

to

```python
while index_collection and nums[index_collection[-1]] < curr_num:
```

Everything else stays as is:

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        index_collection = deque()
        ans = []
        
        for i in range(len(nums)):
            curr_num = nums[i]
            while index_collection and nums[index_collection[-1]] < curr_num:
                index_collection.pop()
            index_collection.append(i)
            
            if index_collection[0] == i - k:
                index_collection.popleft()
                
            if i >= k - 1:
                ans.append(nums[index_collection[0]])
                
        return ans
```

Interestingly, we can actually get away with *not* using a deque (i.e., we just use a list instead and left removals cost more computationally than they might otherwise). The answer is still accepted by LeetCode even though it's notably slower than the solution using a deque. The test cases LeetCode uses are not public/visible, but presumably the reason the list-based solution is still acceptable is because *most* operations on `index_collection` are additions and removals *from the right*, where these list operations are still $O(1)$. Only on certain occasions do we need to remove an element from the left, which will be $O(k)$ instead of $O(1)$ since the largest size of the index collection we're maintaining is of size $k$. 

We should note that the performance concern remarked on above (i.e., $O(k)$ left-removals instead of $O(1)$) pales in comparison to the most significant computational gains of crafting a solution that perform in $O(n)$ with a single pass instead of processing every single subarray on its own in a brute force fashion, which would be $O(n^2)$. That kind of solution would definitely *not* be accepted for this hard problem.

<details>
<summary> List-based solution to LC 239 that is less performant than deque-based solution but accepted nonetheless</summary>

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        index_collection = []
        ans = []

        for i in range(len(nums)):
            curr_num = nums[i]
            while index_collection and nums[index_collection[-1]] < curr_num:
                index_collection.pop()
            index_collection.append(i)

            if index_collection[0] == i - k:
                index_collection.pop(0)

            if i >= k - 1:
                ans.append(nums[index_collection[0]])

        return ans
```

</details>

## Monotonic stacks and queues

### Definitions

<details>
<summary> Mathematical background (not necessary but possibly helpful)</summary>

The [Wiki article](https://en.wikipedia.org/wiki/Monotonic_function) on monotonic functions is surprisingly helpful. The relevant portions have been reproduced below (with slight adjustments).

A function $f$ defined on a subset of the real numbers with real values is said to be *monotonic* if and only if $f$ is either entirely non-increasing or entirely non-decreasing:

<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '1em' }}>
  <img src={require('./f2.png').default} alt="Image 1" style={{ width: '32%', height: 'auto' }} />
  <img src={require('./f3.png').default} alt="Image 2" style={{ width: '32%', height: 'auto' }} />
  <img src={require('./f4.png').default} alt="Image 3" style={{ width: '32%', height: 'auto' }} />
</div>

A function is said to be *monotonically increasing* (also *increasing* or *non-decreasing*) if for all $x$ and $y$ such that $x\leq y$ one has $f(x)\leq f(y)$, so $f$ preserves the order (Figure 1). Likewise, a function is said to be *monotonically decreasing* (also *decreasing* or *non-increasing*) if, whenever $x\leq y$, then $f(x)\geq f(y)$, so it *reverses* the order (Figure 2).

If the order $\leq$ in the definition of monotonicity is replaced by the strict order $<$, one obtains a stronger requirement. A function with this property is said to be *strictly increasing* (also *increasing*). Again, by inverting the order symbol, one finds a corresponding concept called *strictly decreasing* (also *decreasing*). A function with either property is called *strictly monotone*. 

To avoid ambiguity, the terms *weakly monotone*, *weakly increasing* and *weakly decreasing* are often used to refer to non-strict monotonicity.

The terms "non-decreasing" and "non-increasing" should not be confused with the (much weaker) negative qualifications "not decreasing" and "not increasing". For example, the non-monotonic function shown in Figure 3 first falls, then rises, then falls again. It is therefore not decreasing and not increasing, but it is neither non-decreasing nor non-increasing.

</details>

Let's first provide a working [definition](https://www.dictionary.com/browse/monotonic) of the word *monotonic*:

> *Mathematics.* (of a function or sequence) either consistently increasing in value and never decreasing, or consistently decreasing in value and never increasing:
>
> *A monotonic sequence can either converge or diverge, but it can never oscillate.*

In the context of programming, we're generally concerned with a collection or "sequence" of values (as opposed to a function). Whether or not the sequence is deemed *monotonic* depends on how the values relate to each other in progression from left to right:

- Decreasing (each value is less than all preceding values)
- Weakly decreasing (each value is less than *or equal to* all preceding values)
- Increasing (each value is greater than all preceding values)
- Weakly increasing (each value is greater than *or equal to* all preceding values)

Basic code examples are illustrative in clarifying these definitions:

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Decreasing"
[14, 13, 12, 11, 8, 6]
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly decreasing"
[14, 13, 13, 12, 12, 11, 8, 6]
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Increasing"
[-13, 13, 16, 18, 21]
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly increasing"
[-13, 13, 13, 16, 18, 18, 18, 21]
```

</div>
</div>

Important observations worth noting:

- **Unique or duplicate values:** "Decreasing" and "Increasing" are both *strict* (all values are unique) whereas their "weak" variants are not (adjacent values may be equal which means duplicate values are permitted). 
- **Alternate terminology for "weakly":** Sometimes the terms *non-decreasing* and *non-increasing* are used instead of *weakly increasing* and *weakly decreasing*, respectively. Unfortunately, while such terminology is *technically* accurate, it arguably obscures the important behavior being highlighted; that is, for a sequence like `[1, 2, 2, 3]`, calling it "non-decreasing" arguably obscures what we actually want to highlight, namely that the collection is increasing except when adjacent values can be equal. Saying the collection is "weakly increasing" seems to be a better choice of words.
- **Minimum/maximum values:** If a sequence is decreasing or weakly decreasing, then the leftmost value represents the *maximum* value in the collection. Similarly, if a sequence is increasing or weakly increasing, then the leftmost value represents the *minimum* value in the collection.
- **Monotonicity invariant:** The [definition](https://www.dictionary.com/browse/invariant) for *invariant* is what it sounds like:

  > *Mathematics.* a quantity or expression that is constant throughout a certain range of conditions.

  The idea of an [invariant](https://en.wikipedia.org/wiki/Invariant_(mathematics)#Invariants_in_computer_science) in computer science is the same but slightly nuanced:

  > In computer science, an invariant is a logical assertion that is always held to be true during a certain phase of execution of a computer program. For example, a loop invariant is a condition that is true at the beginning and the end of every iteration of a loop.

  How is the idea of an invariant relevant to our work with monotonic stacks and queues? Imagine adding `3` to the weakly increasing monotonic stack `[0, 1, 1, 4]` without first removing any elements: `[0, 1, 1, 4, 3]`. The weakly increasing monotonic stack we had previously is now just a stack because its special property of monotonicity has been violated. "Maintaining" a monotonic stack or queue really means maintaining its *invariant*: monotonicity. The (weakly) increasing/decreasing stack or queue should *remain* (weakly) increasing/decreasing whenever elements are added or removed.

- **Adding elements:** As noted above, special care must be taken when *adding* values to a monotonic stack or queue to ensure its monotonicity invariant remains intact. Specifically, adding value `x` means first *removing* all other values that would cause the invariant to be broken should `x` be added to the stack or queue in its current state &#8212; only then should `x` be added. Since the collection of values being maintained is a *stack* or *queue*, additions generally happen *from the right*. (If we are using a doubly-ended queue, then it is conceivable that we could add elements from the left, but this is usually not the case.)

- **Removing elements:** Adding values generally happens from the right. Removal of values, which typically *precedes* the addition of new values, also generally happens from the right. Why? Because values that would otherwise break the invariant are effectively popped from the top/right before adding the new value to the top/right. Consider the following examples that illustrate what elements must be removed to keep the invariant intact in order to accommodate the addition of the value `5`:

  <div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
  <div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

  ```python title="Decreasing"
  [12, 10, 9, 5, 3, 2, 1] # Before addition of 5
  [12, 10, 9, 5]          # After addition of 5
  ```

  </div>
  <div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

  ```python title="Weakly decreasing"
  [12, 10, 10, 9, 5, 3, 1, 0] # Before addition of 5
  [12, 10, 10, 9, 5, 5]       # After addition of 5
  ```

  </div>
  <div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

  ```python title="Increasing"
  [0, 1, 3, 5, 6, 10, 11] # Before addition of 5
  [0, 1, 3, 5]            # After addition of 5
  ```

  </div>
  <div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

  ```python title="Weakly increasing"
  [1, 2, 2, 3, 5, 7, 8, 10] # Before addition of 5
  [1, 2, 2, 3, 5, 5]        # After addition of 5
  ```

  </div>
  </div>

  It's clear *visually* from above that values are being removed from the right in order to accommodate the addition of the new value `5`.

- **Removing elements from the left (when a queue-like operation is needed):** In some cases (e.g., sliding windows), we may want to remove an element in our collection *from the left*. As illustrated previously, our collection's invariant is maintained with stack-like operations, namely popping old values from the top before pushing a new value to the top. This means values in our collection progress left to right from "oldest" to "newest" in terms of the recency in which each value was added. 

  For sliding window problems especially, window values are generally added as the right endpoint advances and removed as the left endpoint advances. Since the leftmost values in our collection are always the "oldest", it makes sense that in certain scenarios we might want to remove the leftmost value. For example, suppose we have the increasing collection `[2, 4, 6]` that represents the values of the following sliding window: `12, 4, [2, 4, 7, 6], 8, 10`. What happens to our collection once the left boundary of the window advances? It's clear that `2` is no longer a valid value, and we must remove it from our collection.

  But stacks are not optimized for removing elements *from the left*. This is why doubly-ended queues (i.e., *deques*) are needed for some problems: the right end permits the stack-like push and pop operations for maintaining the (weakly) increasing/decreasing invariant while the left end permits the queue-like operation of popping elements from the left. Note that the invariant is always left intact when elements are removed.

- **Next greater or smaller value:** See again the examples above for what elements must be removed in order to accommodate the addition of the `5` and what this *means* for each removed element's next greater or smaller value (first recall that elements in the collection progress left to right from "oldest" to "newest" in terms of the recency in which they were added to the collection):

  | Monotonic invariant | Added `5`'s relation to removed elements | Explanation |
  | :-- | :-- | :-- |
  | Decreasing | Greater than or equal to | The original value collection `[12, 10, 9, 5, 3, 2, 1]` is transformed to `[12, 10, 9]` before the addition of `5`; hence, the following values are removed (in this order): `1`, `2`, `3`, `5`. Each value removed is less than or equal to the newly added value of `5`. This means that the removed values `1`, `2`, `3`, `5` all have `5` as their *next* "greater than or equal to" value. |
  | Weakly decreasing | Greater than | The original value collection `[12, 10, 10, 9, 5, 3, 1, 0]` is transformed to `[12, 10, 10, 9, 5]` before the addition of `5`; hence, the following values are removed (in this order): `0`, `1`, `3`. Each value removed is less than the newly added value of `5`. This means that the removed values `0`, `1`, `3` all have `5` as their *next* "greater than" value. |
  | Increasing | Less than or equal to | The original value collection `[0, 1, 3, 5, 6, 10, 11]` is transformed to `[0, 1, 3]` before the addition of `5`; hence, the following values are removed (in this order): `11`, `10`, `6`, `5`. Each value removed is greater than or equal to the newly added value of `5`. This means that the removed values `11`, `10`, `6`, `5` all have `5` as their *next* "less than or equal to" value. |
  | Weakly decreasing | Less than | The original value collection `[1, 2, 2, 3, 5, 7, 8, 10]` is transformed to `[1, 2, 2, 3, 5]` before the addition of `5`; hence, the following values are removed (in this order): `10`, `8`, `7`. Each value removed is greater than the newly added value of `5`. This means that the removed values `10`, `8`, `7` all have `5` as their *next* "less than" value. |

#### Monotonic stack

A *monotonic stack* is a stack whose values demonstrate monotonicity in some capacity: decreasing, weakly decreasing, increasing, or weakly increasing. The following are all examples of monotonic stacks (with an illustration of how monotonicity is maintained when a new value, `5`, is added):

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Decreasing monotonic stack"
[12, 10, 9, 5, 3, 2, 1] # Before addition of 5
[12, 10, 9, 5]          # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly decreasing monotonic stack"
[12, 10, 10, 9, 5, 3, 1, 0] # Before addition of 5
[12, 10, 10, 9, 5, 5]       # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Increasing monotonic stack"
[0, 1, 3, 5, 6, 10, 11] # Before addition of 5
[0, 1, 3, 5]            # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly increasing monotonic stack"
[1, 2, 2, 3, 5, 7, 8, 10] # Before addition of 5
[1, 2, 2, 3, 5, 5]        # After addition of 5
```

</div>
</div>

What defines the stack, however, is its interface, namely pushing and popping values from the right.

#### Monotonic queue

A *monotonic queue* is a doubly-ended queue or *deque* whose values demonstrate monotonicity in some capacity: decreasing, weakly decreasing, increasing, or weakly increasing. The following are all examples of monotonic queues (with an illustration of how monotonicity is maintained when a new value, `5`, is added):

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Decreasing monotonic queue"
[12, 10, 9, 5, 3, 2, 1] # Before addition of 5
[12, 10, 9, 5]          # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly decreasing monotonic queue"
[12, 10, 10, 9, 5, 3, 1, 0] # Before addition of 5
[12, 10, 10, 9, 5, 5]       # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Increasing monotonic queue"
[0, 1, 3, 5, 6, 10, 11] # Before addition of 5
[0, 1, 3, 5]            # After addition of 5
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Weakly increasing monotonic queue"
[1, 2, 2, 3, 5, 7, 8, 10] # Before addition of 5
[1, 2, 2, 3, 5, 5]        # After addition of 5
```

</div>
</div>

What defines the queue, however, is its interface, namely pushing new elements to the right and popping old elements from the left. The illustrations above clearly show collections of values where all old values are popped *from the right*, not from the left. This means the popping and pushing of values illustrated above are fundamentally stack-like in nature. 

This is why the label of "monotonic queue" is a misnomer &#8212; it's misleading in a way. We only claim to use a monotonic *queue* when removing elements from the left is necessary. In such cases, we use a *doubly-ended queue* or *deque* because the right end still needs the stack-like operations to maintain the invariant while the left end needs the queue-like operation of efficiently removing an element(s) from the left. Hence, it would be more accurate to call a *monotonic queue* a *monotonic deque*.

### Use cases

Monotonic stacks and queues can crop up in unexpected ways and in unexpected places, but the following are some conventional areas where these structures shine:

- Efficiently adding or removing values to a sorted collection of values while maintaining the sorted order.
- Efficiently accessing a value's next smaller or larger value.
- Efficiently accessing the maximum or minimum value of a contiguous subarray or sliding window.

A simple stack (or list in Python) is sufficient for the first two points above, but a deque is needed for the last point. In general, deques are needed in the following circumstances:

- sliding window problems where efficient access to the maximum or minimum is important
- there's a bidirectional nature to the problem where values need to be processed in the order they appear and removed when no longer relevant
- older values need to be discarded as new values are processed
- insertion of new values causes invalidation of previously stored values (the deque allows efficient insertion of new values from the right and efficient removal of invalidated values from the left)

Monotonic deques can be used for more than just contiguous subarray or sliding window problems where access to the maximum or minimum is needed, but these are clearly situations where all of the points above apply and the use of a deque is warranted.

Monotonic stacks can be used for everything else:

- next greater value problems
- largest area or volume problems
- stock span problems
- etc.

A general safe rule of thumb to follow: start with a stack and only move to a deque if you realize you need to remove elements from the left for some reason.

### Templates

The templates below are constructed in a way such that the *index values* are being added to the stack or (doubly-ended) queue as opposed to the values themselves. This is because index values are often needed since they supply additional information and make it possible to distinguish between values that might otherwise be considered identical. For example, if `nums = [1, 1]`, then `nums[0] == nums[1]` but `0 != 1`; that is, the *values* of `1` are identicial but their indexed positions are not.

The foundation of all possible monotonic stack and queue templates is the same and hinges on two important pieces of information:

1. **Will elements possibly need to be removed from the left of the index collection at some point?** If so, use a deque (otherwise use a simple stack). An element(s) is generally removed from the left of the deque *after* the deque's increasing/decreasing invariant has been maintained and the current element added to the right of the deque &#8212; usually some condition is violated that stipulates deque elements should be removed from the left (e.g., an invalid index for a sliding window is a common example). 

    Maintaining the increasing/decreasing invariant for the collection (stack or deque) always uses stack-like operations: we remove from the right or top (i.e., "pop") every single value that would result in the invariant being violated once the current element is added to the right or top (i.e., "push"). In this sense, a monotonic "queue" is really a misnomer since the addition and removal of elements to maintain the invariant is always performed in LIFO fashion (last in first out); that is, the "push" and "pop" operations needed to maintain the deque invariant are fundamentally stack-like in nature. It's only if we need to *remove elements from the left* that the idea of a queue enters the picture, where a LIFO operation is needed (i.e., last in first out). Hence, we only ever really consider monotonic *stacks* or *deques* (doubly-ended queues).

2. **How do the values referred to in your index collection need to progress from left to right?** Should the values be increasing or decreasing? Should duplicate values be allowed? The value comparison you use in the condition of the while loop determines what kind of invariant you will maintain for your index collection. 

    The core part of maintaining the invariant for any index collection is the following:

    ```python
    for i in range(len(nums)):
        curr_num = nums[i]
        # highlight-next-line
        while index_collection and nums[index_collection[-1]] ??? curr_num:
            index_collection.pop()
        index_collection.append(i)
    ```

    Above, `???` refers to the value comparison used to maintain your index collection's invariant: 

    | Comparison | Invariant | Explanation | Example usage |
    | :-: | :-- | :-- | :-- |
    | `<` | Decreasing collection (duplicates allowed) | The invariant for the index collection will be a *decreasing* collection where duplicate values *are* allowed. This means all indexes in the collection will correspond to values that are *less than* the current value (some of these values less than the current value may be the same since duplicate values are allowed). | Given an integer array `heights`, find each height's *next greater height*. |
    | `<=` | Decreasing collection (duplicates *not* allowed) | The invariant for the index collection will be a *decreasing* collection where duplicate values are *not* allowed. This means all indexes in the collection will correspond to values that are *less than or equal to* the current value (none of the values referenced in the collection will be the same since duplicate values are not allowed). | Given an integer array `heights`, find each height's *next greater than or equal to height*. |
    | `>` | Increasing collection (duplicates allowed) | The invariant for the index collection will be an *increasing* collection where duplicate values *are* allowed. This means all indexes in the collection will correspond to values that are *greater than* the current value (some of these values greater than the current value may be the same since duplicate values are allowed). | Given an integer array `heights`, find each height's *next smaller height*. |
    | `>=` | Increasing collection (duplicates *not* allowed) | The invariant for the index collection will be an *increasing* collection where duplicate values are *not* allowed. This means all indexes in the collection will correspond to values that are *greater than or equal to* the current value (none of the values referenced in the collection will be the same since duplicate values are not allowed). | Given an integer array `heights`, find each height's *next less than or equal to height*. |

    <details>
    <summary> What happens if we use <code>==</code> or <code>!=</code> for value comparison when managing our collection? </summary>

    :::caution

    It's probably best to skip this for now unless you're fully comfortable with everything that has been previously discussed in this post. The brief considerations we're about to make are likely to cause confusion and will add little to no (maybe negative?) benefit. If you're not yet deterred, then it *might* possibly be useful to concretely *see* why using these comparisons adds little value to our analyses.

    :::

    <details>
    <summary> Using the equality comparison: <code>==</code> </summary>

    **TLDR:** The answer array is only ever updated (i.e., `ans[i] = curr_num`) when equivalent values are adjacent: if `nums[i] == nums[i+1]`, then the assignment `ans[i] = nums[i+1]` will be made. But this is the only scenario where updates are made (probably not a desirable nor useful effect).

    ---

    It's tempting to think we're asking, "What is the next value equal to the current value?" This is somewhat of a ridiculous question since *any* value will clearly be *its own* next equal value if this value is ever repeated (the question of whether or not the value is ever repeated is the *real* question here). If our code actually attempted to answer this question by only changing the comparison operator to `==`, then we would expect the following input-output result:

    ```python
    # Input
    [14, 17, 13, 14, 14, 19, 12, 14, 18]

    # Output
    [14, -1, -1, 14, 14, -1, -1, -1, -1]
    ```

    Let's run the code and see what we get (we'll add a helpful print statement too for clarification):

    ```python title="Input-Output"
    def fn(nums):
        collection = []
        ans = [-1] * len(nums)
        
        for i in range(len(nums)):
            curr_num = nums[i]
            while collection and nums[collection[-1]] == curr_num:
                prev_index = collection.pop()
                ans[prev_index] = curr_num
            collection.append(i)
            print(
                f'collection: {collection}; '
                f'number correspondence: {[nums[idx] for idx in collection]}'
            )
            
        return ans

    nums = [14, 17, 13, 14, 14, 19, 12, 14, 18] # Input
    fn(nums)                                    # Output: [-1, -1, -1, 14, -1, -1, -1, -1, -1]
    ```

    ```a title="Printed information"
    Index: 0;  Value: 14  Index collection: [0]                       Collection values: [14];                              Answer array: [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    Index: 1;  Value: 17  Index collection: [0, 1]                    Collection values: [14, 17];                          Answer array: [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    Index: 2;  Value: 13  Index collection: [0, 1, 2]                 Collection values: [14, 17, 13];                      Answer array: [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    Index: 3;  Value: 14  Index collection: [0, 1, 2, 3]              Collection values: [14, 17, 13, 14];                  Answer array: [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    Index: 4;  Value: 14  Index collection: [0, 1, 2, 4]              Collection values: [14, 17, 13, 14];                  Answer array: [-1, -1, -1, 14, -1, -1, -1, -1, -1]
    Index: 5;  Value: 19  Index collection: [0, 1, 2, 4, 5]           Collection values: [14, 17, 13, 14, 19];              Answer array: [-1, -1, -1, 14, -1, -1, -1, -1, -1]
    Index: 6;  Value: 12  Index collection: [0, 1, 2, 4, 5, 6]        Collection values: [14, 17, 13, 14, 19, 12];          Answer array: [-1, -1, -1, 14, -1, -1, -1, -1, -1]
    Index: 7;  Value: 14  Index collection: [0, 1, 2, 4, 5, 6, 7]     Collection values: [14, 17, 13, 14, 19, 12, 14];      Answer array: [-1, -1, -1, 14, -1, -1, -1, -1, -1]
    Index: 8;  Value: 18  Index collection: [0, 1, 2, 4, 5, 6, 7, 8]  Collection values: [14, 17, 13, 14, 19, 12, 14, 18];  Answer array: [-1, -1, -1, 14, -1, -1, -1, -1, -1]
    ```

    What's going on here? Why is the answer array only updated once (after the value at index `4` is processed)? The answer isn't obvious at first and even [gave ChatGPT 4 quite a few issues](https://chat.openai.com/share/0102a716-2688-4ed0-adff-6173eb8e1acc) (you can ignore the first two messages in the ChatGPT thread). We can answer our own question by looking at the code more closely and determining what changing the comparison to `==` actually does. Here's the core part of the function:

    ```python
    for i in range(len(nums)):
        curr_num = nums[i]
        while collection and nums[collection[-1]] == curr_num:
            prev_index = collection.pop()
            ans[prev_index] = curr_num
        collection.append(i)
    ```

    When exactly are values added to `collection`? Once all previous values that *equal* the current value have been removed. For example, if the current number is `x` and the collection before processing this number somehow corresponded to the numbers `[a, b, d, c, g, f, x, x, x]`, then the collection's number correspondence' *after* processing the current number would be `[a, b, d, c, g, f, x]`, where the three equivalent `x` values previously in the collection were removed (and their corresponding spots in the answer array updated). This explains the crucial logic in the function above, but we should note that the collection itself will *never* have adjacent indexes that represent equivalent values due to how the collection is being maintained; that is, to use the example above, we would never actually reach the state of `[a, b, d, c, g, f, x, x, x]`. We would first reach `[a, b, d, c, g, f, x]` and the collection would stay this way until we encountered a new value *not* equal to `x`. 

    This may be easier to understand if we introduce an actual number array that models the situation above (the number above each value corresponds to that value's index):

    ```a
            0  1  2  3  4  5  6   7   8   9
    nums = [1, 2, 4, 3, 7, 6, 24, 24, 24, 24]
    ```

    Eventually our collection of index values reaches the state `[0, 1, 2, 3, 4, 5, 6]`, where `nums[6] == 24`, and we know the next three values are all `24`; that is, `nums[6] == nums[7] == nums[8] == nums[9]`. How is collection maintained and how is our answer array updated?

    - Collection: `[0, 1, 2, 3, 4, 5, 6]`. Current value (index `7`): `24`. We have `nums[6] == nums[7]`.
      + Pop `6`
      + Update answer array: `ans[6] = 24`
      + Append `7` to the collection
    - Collection: `[0, 1, 2, 3, 4, 5, 7]`. Current value (index `8`): `24`. We have `nums[7] == nums[8]`.
      + Pop `7`
      + Update answer array: `ans[7] = 24`
      + Append `8` to the collection
    - Collection: `[0, 1, 2, 3, 4, 5, 8]`. Current value (index `9`): `24`. We have `nums[8] == nums[9]`.
      + Pop `8`
      + Update answer array: `ans[8] = 24`
      + Append `9` to the collection

    This is where we'd stop because we just processed the last value in `nums` at index `9`. Since the answer array is not updated at all until index `6`, and is then updated in the manner above, our final answer array would be `[-1, -1, -1, -1, -1, 24, 24, 24, -1]`. If we execute the `fn` function above with `nums = [1, 2, 4, 3, 7, 6, 24, 24, 24, 24]` as the input, then this is exactly what we will get as the output.

    For the sake of completeness, here's a way to answer the question we originally thought we might be asking (i.e., what is the next equal value or `-1` if no such value exists):

    ```python
    def fn(nums):
        collection = set()
        ans = [None] * len(nums)
        for i in range(len(nums) - 1, -1, -1):
            curr_num = nums[i]
            if curr_num in collection:
                ans[i] = curr_num
            else:
                ans[i] = -1
                collection.add(curr_num)
        return ans

    nums =     [14, 17, 13, 14, 14, 19, 12, 14, 18]
    fn(nums) # [14, -1, -1, 14, 14, -1, -1, -1, -1]
    ```

    </details>

    <details>
    <summary> Using the inequality comparison: <code>!=</code> </summary>

    **TLDR:** The answer array is updated whenever unequal values are adjacent. If two or more adjacent values *are* equal, then the indexes that represent these values are all added to the index collection, and the answer array is not updated until an unequal value is found, at which point *all* previous equal adjacent values are assigned this current unequal value in the answer array.

    Due to the last in first out nature of how values are being maintained in the index collection, the effect of changing the comparison operator to `!=` is that the answer array effectively tells us what each value's next *unequal* value will be (or `-1` if no such value exists). This isn't *entirely* worthless, but it is also probably not the most desired effect nor all that useful a result.

    ---

    If we change the comparison operator to `!=`, then it seems like we may be asking the following question: "What is the next value *not* equal to the current value?" And we'd be right (unlike before with `==`) even though the result is unlikely to be all that useful! If we change the comparison operator to `!=`, then we would expect our code to produce the following input-output result:

    ```python
    # Input
    [14, 17, 13, 14, 14, 19, 12, 14, 18]

    # Output
    [17, 13, 14, 19, 19, 12, 14, 18, -1]
    ```

    Let's run the code and see what we get (we'll again add a helpful print statement for clarification):

    ```python title="Input-Output"
    def fn(nums):
        collection = []
        ans = [-1] * len(nums)
        
        for i in range(len(nums)):
            curr_num = nums[i]
            while collection and nums[collection[-1]] != curr_num:
                prev_index = collection.pop()
                ans[prev_index] = curr_num
            collection.append(i)
            print(
                f'Index: {i}; ',
                f'Value: {nums[i]}',
                f'Index collection: {collection}',
                f'Collection values: {[nums[idx] for idx in collection]}; ',
                f'Answer array: {ans}'
            )
            
        return ans

    nums = [14, 17, 13, 14, 14, 19, 12, 14, 18] # Input
    fn(nums)                                    # Output: [17, 13, 14, 19, 19, 12, 14, 18, -1]
    ```

    ```a title="Printed information"
    Index: 0;  Value: 14  Index collection: [0]     Collection values: [14];      Answer array: [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    Index: 1;  Value: 17  Index collection: [1]     Collection values: [17];      Answer array: [17, -1, -1, -1, -1, -1, -1, -1, -1]
    Index: 2;  Value: 13  Index collection: [2]     Collection values: [13];      Answer array: [17, 13, -1, -1, -1, -1, -1, -1, -1]
    Index: 3;  Value: 14  Index collection: [3]     Collection values: [14];      Answer array: [17, 13, 14, -1, -1, -1, -1, -1, -1]
    Index: 4;  Value: 14  Index collection: [3, 4]  Collection values: [14, 14];  Answer array: [17, 13, 14, -1, -1, -1, -1, -1, -1]
    Index: 5;  Value: 19  Index collection: [5]     Collection values: [19];      Answer array: [17, 13, 14, 19, 19, -1, -1, -1, -1]
    Index: 6;  Value: 12  Index collection: [6]     Collection values: [12];      Answer array: [17, 13, 14, 19, 19, 12, -1, -1, -1]
    Index: 7;  Value: 14  Index collection: [7]     Collection values: [14];      Answer array: [17, 13, 14, 19, 19, 12, 14, -1, -1]
    Index: 8;  Value: 18  Index collection: [8]     Collection values: [18];      Answer array: [17, 13, 14, 19, 19, 12, 14, 18, -1]
    ```

    This is nice because we're actually getting the expected behavior here! But why though? Let's take a closer look at the core part of the function where the comparison operator for maintaining our index collection is now `!=`:

    ```python
    for i in range(len(nums)):
        curr_num = nums[i]
        while collection and nums[collection[-1]] != curr_num:
            prev_index = collection.pop()
            ans[prev_index] = curr_num
        collection.append(i)
    ```

    This effectively means the answer array gets updated every time we encounter a value not equal to the value represented at the top of the collection. But if the values *are* equal, as is the case above when the values of `14` are adjacent, then the answer array is *not* updated, and we wait until the next unequal value is encountered, at which point *all* previous adjacent values that are equivalent will be popped from the collection and assigned the current uneqal value in the answer array. This is actually the desired effect (even though it doesn't seem particularly useful).

    </details>

    </details>

We are now ready for the monotonic stack and (doubly-ended queue) templates. Here's a preview before getting into the details:

<div style={{ marginBottom: '1em', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridTemplateRows: '1fr', gridRowGap: '5px', gridColumnGap: '5px' }}>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Monotonic (decreasing) stack"

def fn(nums):
    dec_stack = []
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        while dec_stack and nums[dec_stack[-1]] < curr_num:
            dec_stack.pop()
        dec_stack.append(i)
        



    return ans
```

</div>
<div style={{ backgroundColor: 'var(--ifm-code-background)' }} >

```python title="Monotonic (decreasing) queue"
from collections import deque
def fn(nums):
    dec_queue = deque()
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        while dec_queue and nums[dec_queue[-1]] < curr_num:
            dec_queue.pop()
        dec_queue.append(i)
        
        if CONDITION:
            dec_queue.popleft()
        
    return ans
```

</div>
</div>


#### Monotonic stack

<details>
<summary> Template with code comments </summary>

```python
def fn(nums):
    # an appropriate stack label can help: inc_stack or dec_stack
    # for "increasing" or "decreasing" stack, respectively;
    # it may be helpful to include an inline comment beside the stack 
    # declaration to communicate whether or not duplicates are allowed
    dec_stack = [] # monotonic decreasing stack (duplicates allowed)
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        
        # recall how the comparison operator determines the stack invariant:
        # (<)  decreasing stack (duplicates allowed)
        # (<=) decreasing stack (duplicates not allowed)
        # (>)  increasing stack (duplicates allowed)
        # (>=) increasing stack (duplicates not allowed)
        while dec_stack and nums[dec_stack[-1]] < curr_num:
            # this is where you will often relate the index values 
            # to each other in some way and possibly update the answer array
            dec_stack.pop()
        
        # append the index for the current number to the stack
        # (the while loop above ensures this step does not violate the stack invariant)
        dec_stack.append(i)
        
    return ans
```

</details>

<details>
<summary> "Next height" problems solved with code template</summary>

All of the problems below use `heights = [14, 17, 13, 14, 14, 19, 12, 14, 18]` as the input. Each problem requests a height value in relation to the current height value &#8212; if such a value is not found, then `-1` should be reported.

<details>
<summary> Next height <em>greater than</em> current height</summary>

```python
def next_greater_height(heights):
    dec_stack = [] # monotonically decreasing stack (duplicates allowed)
    ans = [-1] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]
        while dec_stack and heights[dec_stack[-1]] < curr_height:
            prev_height_index = dec_stack.pop()
            ans[prev_height_index] = curr_height
        dec_stack.append(i)
        
    return ans
```

```python
# Input
[14, 17, 13, 14, 14, 19, 12, 14, 18]

# Output
[17, 19, 14, 19, 19, -1, 14, 18, -1]
```

</details>

<details>
<summary> Next height <em>greater than or equal to</em> current height</summary>

```python
def next_greater_than_or_equal_to_height(heights):
    dec_stack = [] # monotonically decreasing stack (duplicates not allowed)
    ans = [-1] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]
        while dec_stack and heights[dec_stack[-1]] <= curr_height:
            prev_height_index = dec_stack.pop()
            ans[prev_height_index] = curr_height
        dec_stack.append(i)
        
    return ans
```

```python
# Input
[14, 17, 13, 14, 14, 19, 12, 14, 18]

# Output
[17, 19, 14, 14, 19, -1, 14, 18, -1]
```

</details>

<details>
<summary> Next height <em>smaller than</em> current height</summary>

```python
def next_smaller_height(heights):
    inc_stack = [] # monotonically increasing stack (duplicates allowed)
    ans = [-1] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]
        while inc_stack and heights[inc_stack[-1]] > curr_height:
            prev_height_index = inc_stack.pop()
            ans[prev_height_index] = curr_height
        inc_stack.append(i)
        
    return ans        
```

```python
# Input
[14, 17, 13, 14, 14, 19, 12, 14, 18]

# Output
[13, 13, 12, 12, 12, 12, -1, -1, -1]
```

</details>

<details>
<summary> Next height <em>smaller than or equal to</em> current height</summary>

```python
def next_smaller_than_or_equal_to_height(heights):
    inc_stack = [] # monotonically increasing stack (duplicates not allowed)
    ans = [-1] * len(heights)
    
    for i in range(len(heights)):
        curr_height = heights[i]
        while inc_stack and heights[inc_stack[-1]] >= curr_height:
            prev_height_index = inc_stack.pop()
            ans[prev_height_index] = curr_height
        inc_stack.append(i)
        
    return ans  
```

```python
# Input
[14, 17, 13, 14, 14, 19, 12, 14, 18]

# Output
[13, 13, 12, 14, 12, 12, -1, -1, -1]
```

</details>

</details>

```python
def fn(nums):
    dec_stack = []
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        while dec_stack and nums[dec_stack[-1]] < curr_num:
            dec_stack.pop()
        dec_stack.append(i)
        
    return ans
```

#### Monotonic queue

<details>
<summary> Template with code comments </summary>

```python
from collections import deque
def fn(nums):
    # an appropriate deque label can help: inc_queue or dec_queue
    # for "increasing" or "decreasing" queue, respectively;
    # it may be helpful to include an inline comment beside the deque 
    # declaration to communicate whether or not duplicates are allowed
    dec_queue = deque() # monotonic decreasing deque (duplicates allowed)
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        
        # recall how the comparison operator determines the deque invariant:
        # (<)  decreasing deque (duplicates allowed)
        # (<=) decreasing deque (duplicates not allowed)
        # (>)  increasing deque (duplicates allowed)
        # (>=) increasing deque (duplicates not allowed)
        while dec_queue and nums[dec_queue[-1]] < curr_num:
            # this is where you will often relate the index values 
            # to each other in some way and possibly update the answer array
            dec_queue.pop()
            
        # append the index for the current number to the deque
        # (the while loop above ensures this step does not violate the deque invariant)
        dec_queue.append(i)

        # if some undesirable condition is met (e.g., leftmost deque value is an invalid index)
        # then remove deque values from the left (doing so ensures the invariant is still maintained)
        if CONDITION:
            dec_queue.popleft()
        
    return ans
```

</details>

<details>
<summary> Sliding window minimum problem solved with code template</summary>

Recall the problem statement:

> You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return an answer array that contains the minimum value for each sliding window of size `k`. For example, if the input array is `nums = [11, 13, -11, -13, 15, 13, 16, 17]` and `k = 3`, then the desired output or answer array would be `[-11, -13, -13, -13, 13, 13]`.

The following illustration shows why the example above has the input and output it does:

<pre>
Window&nbsp;position&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Min{'\n'}
------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-----{'\n'}
[11&nbsp;&nbsp;13&nbsp;&nbsp;-11]&nbsp;-13&nbsp;&nbsp;15&nbsp;&nbsp;13&nbsp;&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-11</strong>{'\n'}
&nbsp;11&nbsp;[13&nbsp;&nbsp;-11&nbsp;&nbsp;-13]&nbsp;15&nbsp;&nbsp;13&nbsp;&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;[-11&nbsp;&nbsp;-13&nbsp;&nbsp;15]&nbsp;13&nbsp;&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;&nbsp;-11&nbsp;[-13&nbsp;&nbsp;15&nbsp;&nbsp;13]&nbsp;16&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;&nbsp;-11&nbsp;&nbsp;-13&nbsp;[15&nbsp;&nbsp;13&nbsp;&nbsp;16]&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>13</strong>{'\n'}
&nbsp;11&nbsp;&nbsp;13&nbsp;&nbsp;-11&nbsp;&nbsp;-13&nbsp;&nbsp;15&nbsp;[13&nbsp;&nbsp;16&nbsp;&nbsp;17]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>13</strong>{'\n'}
</pre>

Now for the solution based on the template code:

```python
from collections import deque

def sliding_window_min(nums, k):
    inc_queue = deque() # monotonically increasing queue (duplicates allowed)
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        while inc_queue and nums[inc_queue[-1]] > curr_num:
            inc_queue.pop()
        inc_queue.append(i)

        # remove the leftmost deque element if it is the leftmost index of the previous window
        # (i.e., it is not a valid index for the _current_ window)
        if inc_queue[0] == i - k:
            inc_queue.popleft()
        
        # only start adding to the answer array 
        # once the window has grown to the required size
        if i >= k - 1:
            ans.append(nums[inc_queue[0]])
            
    return ans
```

</details>

```python
from collections import deque

def fn(nums):
    dec_queue = deque()
    ans = []
    
    for i in range(len(nums)):
        curr_num = nums[i]
        while dec_queue and nums[dec_queue[-1]] < curr_num:
            dec_queue.pop()
        dec_queue.append(i)
        
        if CONDITION:
            dec_queue.popleft
        
    return ans
```

## LeetCode practice problems

There are many ways to practice solving problems where monotonic stacks or (doubly-ended) queues play a pivotal role in crafting an optimal solution. LeetCode itself is a treasure trove for these kinds of problems.

### Monotonic stacks

There are currently [57 problems](https://leetcode.com/tag/monotonic-stack/) on LeetCode tagged as being monotonic stack problems:

<MonotonicStacks />

### Monotonic queues

There are currently [15 problems](https://leetcode.com/tag/monotonic-queue/) on LeetCode tagged as being monotonic queue problems:

<MonotonicQueues />

## Solved practice problems

TBD