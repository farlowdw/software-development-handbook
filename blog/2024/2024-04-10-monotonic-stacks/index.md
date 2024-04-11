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

import LC739PS from '@site/docs/_Partials/problem-stems/lc739.md';

<TOCInline 
  toc={[ ... toc.filter(({level, value}, _, arr) => ( level == 2 || level == 3) && !value.startsWith('Contents')) ]}
/>

## Next greater height example to set the stage

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
print(f'Person: {i}; Height: {curr_height}; Next greater height: {ans[i]}; Height collection: {height_collection}; Answer so far: {ans}')
```

The console output then confirms the work we did previously:

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
print(f'Person: {i}; Height: {heights[i]}; Index collection: {index_collection}; Index-height correspondence: {[heights[i] for i in index_collection]}; Answer array: {ans}')
```

The console output then confirms the work we did previously:

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

### LC. 739 Daily Temperatures

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

## Monotonic stacks and queues

Current monotonic queue problems on LeetCode:

<MonotonicQueues />

Current monotonic stack problems on LeetCode:

<MonotonicStacks />
