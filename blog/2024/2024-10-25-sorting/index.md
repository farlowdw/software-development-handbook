---
title: >-
  Sorting (with attitude)
draft: false
description: >-
  This post takes a look at a number of different sorting techniques: heap sort, merge sort, quick sort and quick select, counting sort, radix sort, and bucket sort.
tags: 
  - Sorting
  - Heap Sort
  - Merge Sort
  - Quick Sort
  - Quick Select
  - Counting Sort
  - Radix Sort
  - Bucket Sort
  - Tutorial
  - Algorithms with Attitude
keywords: 
  - sorting
  - heap sort
  - merge sort
  - quick sort
  - counting sort
  - radix sort
  - bucket sort
  - algorithms with attitude
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
import snippet15 from '!!raw-loader!./snippet-15.py';
import snippet16 from '!!raw-loader!./snippet-16.py';
import snippet17 from '!!raw-loader!./snippet-17.py';

This post takes a look at a number of different sorting techniques: heap sort, merge sort, quick sort and quick select, counting sort, radix sort, and bucket sort.

<!--truncate-->

:::info Attribution

The notes below come from the [Algorithms with Attitude](https://www.youtube.com/@AlgorithmswithAttitude/playlists) YouTube channel, specifically the [Sorting](https://www.youtube.com/playlist?list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5) playlist comprised of the following videos: , [Heap Sort](https://www.youtube.com/watch?v=onlhnHpGgC4&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=1), [Merge Sort: Top-Down and Bottom-Up](https://www.youtube.com/watch?v=k3oezbZgfDs&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=2), [Quick Sort and Quick Select](https://www.youtube.com/watch?v=v-1EGgaTFuw&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=3), [Runtime Analysis for Quick Sort and Quick Select](https://www.youtube.com/watch?v=NvGitWFoSas&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=4), [Lower Bounds for Comparison Based Sorting: Decision Trees](https://www.youtube.com/watch?v=0ufNJSWOTqo&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=5), and [Linear Time Sorting: Counting Sort, Radix Sort, and Bucket Sort](https://www.youtube.com/watch?v=pJ1IQD5rv4o&list=PLSVu1-lON6Lwmbwx0ZBmOM47kK68m3cm5&index=6)

:::

There are several sections in this post, accessible in the table of contents on the right, but most of the sections have been listed below for ease of reference and navigation.

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Heap sort

:::info Context of following content concerning heap sort

There is [another post](/blog/2024/10/19/2024/binary-heaps#heap-sort) dedicated to binary heaps, where heap sort is discussed in the general context of heaps as a whole. The content below for heap sort has been excerpted from the linked post for the sake of completeness.

:::

### Overview

Suppose we have the `heapify` and `deleteMax` operations as well as the `buildHeap` operation. Heap sort is then quite easy: first, build a max-heap; then, delete all its values:

- `buildHeap()`
- `deleteMax()` $n$ times

Done.

### buildHeap() phase

For a bit more detail, we start with the `buildHeap` operation. We assume we're given an array of values to be sorted, and we use the space of that array to store the heap itself. One of the nice properties of heap sort is that it is an in-place algorithm &#8212; it only needs a fixed amount of memory beyond what is used to store the data being sorted.

### deleteMax() phase

Next, we delete the max value. We swap the root with the last leaf node (bottom level to the far right) and then delete the last leaf node &#8212; the new root value then has to be compared to its children and possibly sifted down the tree to ensure the properties of the whole heap and all sub-heaps are respected. We conclude the sifting down when what was previously the last leaf node is now either a leaf or the root of its own sub-heap.

We continue to call `deleteMax` until the entire array is empty. As indicated above, note that when `deleteMax` is called, we don't just overwrite the value to be deleted &#8212; we swap it with the last leaf of the heap, and continue as explained above. What happens is that we delete more and more items, and the heap gets smaller and smaller. But all of the values are still stored in the array, until finally, the heap is gone. 

### Analysis

- `buildHeap`: $O(n)$
- `deleteMax` $n$ times: $O(\lg n)$ each, $O(n\lg n)$ total

For our analysis, we had a `buildHeap` operation, which was $O(n)$ time, and then $n$ `deleteMax` operations, which are worst-case $O(\lg n)$ time each. That's $O(n\lg n)$ total time.

Note that we would still have an $O(n\lg n)$ algorithm even if we ran $n$ insertions to start the algorithm instead of the linear `buildHeap`. If we want to be more precise, we can better bound the total number of comparisons:

- `buildHeap`: $< 2n$ comparisons (CLRS)
- `delteMax` $n$ times: $< 2n\lg n$ comparisons (CLRS)

Note that the above are *not* asymptotic results. The `2` term above comes from the fact that to move down one level in `heapify` usually takes `2` comparisons, but that can be improved by optimizing the `heapify` method.

In all, heap sort gives us a worst-case $O(n\lg n)$ in-place sorting algorithm that is *not* stable. It's supposedly slower in practice than a good quicksort.

## Merge sort - top-down and bottom-up

### Merging lists

The idea for merge sort is that if we have two lists of numbers that are *already* sorted, then we can merge those two lists into one longer sorted list in linear total time. If each list is sorted smallest to largest, then we can find the overall smallest by just comparing the smallest of each list. The next smallest is the smallest of the lists remaining after we take that first element out. For equal values, we take the one from the left list as the smaller one (even though it really doesn't make a difference) &#8212; its value started in a smaller index; thus, taking it in case of a tie, we'll keep it in a smaller index. That will make merge sort a *stable* sorting routine &#8212; it won't flip the relative order of equal values.

Here's an example run:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f1.gif').default} />
</div>

Merging two lists is pretty easy and takes linear time: $\Theta(n)$.

### Algorithm concept

`MergeSort(list)`:

- What if the first half of the list was already sorted?
- What if the second half of the list was already sorted?
- Merge the two sorted lists into one.

If we had a list and broke it in half and each half was magically sorted for us, then we could merge those two halves to make a complete sorted list:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f2.gif').default} />
</div>

Excluding that magic part, that's a *really* simple algorithm. So where did those two sorted lists come form? Starting with the two unsorted halves of the original list, we sort them recursively with merge sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f3.gif').default} />
</div>


Recursion is the magic. As a base case for the recursion, if we're given a list with one item (or none), then it's sorted:

```
MergeSort(array A)
    if A.length < 2: return
    Copy the first half of A to new array B
    MergeSort(B)
    Copy the second half of A to new array C
    MergeSort(C)
    merge B and C back into A
```

The pseudocode above can be implemented in Python as follows:

<CodeEditor initialCode={snippet1} editorSettings={{ height: '50vh' }} foldedRegions={[[2,25]]} />

Here's a concise breakdown of the time and space complexity of the approach above:

- **Time:** The algorithm recursively divides the source array, `A`, into halves, `B` and `C`, leading to a logarithmic number of levels, $\lg n$, as shown in the animation above (in the animation example, we have $\lceil \lg 13 \rceil \approx \lceil 3.70 \rceil = 4$). Each level involves merging the entire array, which takes time linear, $O(n)$. Hence, the *total* time complexity is $O(n\lg n)$.
- **Space:** *New* arrays, `B` and `C`, are created to hold halves of the original array, `A`, for each recursive call. Each level of the recursion tree, as demonstrated in the animation, uses $O(n)$ space; since there are $\lg n$ levels in the recursion tree, this means the *total* space complexity is $O(n\lg n)$.

### Standard recursive merge sort (top-down)

While we could copy the array halves out before they're sorted and then sort them, as shown above and in the animation, that implementation uses more space than is needed. It's not too bad, maybe twice what we'd usually need, until we get into implementations that run in parallel, which can be much worse.

Instead, it's more efficient to only copy the data out of the original array after it's sorted, immediately merging back into the original array; that is, only copy lists *after* they are sorted, not beforehand:
  
- Use original array to store unsorted values waiting to be sorted
- Copy sorted values to another array just before the merge back into the original space
- Less space (especially for naive parallelized version)

```a showLineNumbers
MergeSort(A[], start, end)
    if(end <= start) return
    mid = (end + start) / 2
    MergeSort(A[], start, mid)
    MergeSort(A[], mid + 1, end)
    copy A[start...mid] to B[]
    copy A[mid + 1...end] to C[]
    merge B[] and C[] back into A[start...end]
```

We can have `start` and `end` indices as parameters in our recursive calls, specifying which parts of the original array we are currently sorting. So, to sort the array from the start to the end, we recursively try to sort its first half from the start index to the middle index. And that will first try sort its first half, the first quarter of the whole array, etc., and we'll return to the full second half of the array after the first half is complete.

Each of the merge operations will copy out two sorted lists, and then merge back into the original array, overwriting it. We'll call this the standard "unoptimized" version of top-down merge sort (it's better than the previous approach, but there are still several improvements we can make). We assume here that we're just comparing integer values in an array. More generally we might be sorting records or objects by some key value, but the basic idea is the same. If we're working in a language where we have to explicitly free up memory instead of using garbage collection, we'd need to free up the extra space used for merging the lists once we finish with them.

In the animation of this algorithm below, it's easy to see that we use linear extra space during the algorithm instead of $O(n\lg n)$ space as before:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f4.gif').default} />
</div>

The pseudocode above can be implemented in Python as follows:

<CodeEditor initialCode={snippet2} editorSettings={{ height: '50vh' }} foldedRegions={[[2,26]]} />

Summary of time and space complexity for the approach above:

- **Time:** The algorithm above again recursively divides the source array into halves ($\lg n$ levels in the recursion tree) and merges all elements at each level for a total runtime of $O(n\lg n)$.
- **Space:** The total extra space used by temporary arrays `B` and `C`, at any point in time, is proportional to $n$, the number of elements in the source array, `A`; hence, the overall space complexity is $O(n)$.

### Analysis

Concise summaries of the time/space analysis for each previous approach was provided at the end of each approach's section, but it's helpful to consider the analysis of merge sort from a more formal point of view. It's worth noting merge sort is probably one of the most analyzed sorting algorithms there is, and its recurrence relation is likely the most frequently analyzed recurrence relation ever.

To run the algorithm on $n$ items, we recursively sort the first $n/2$ items and then recursively sort the second $n/2$ items, and then we merge them. The merge takes linear time. We get the following recurrence relation:

$$
T(n) = 2T(n/2) + \Theta(n)
$$

Solving this recurrence relation shows that merge sort takes time $\Theta(n\lg n)$. 

As an arbitrary tie-breaker, we'll use the convention CLRS uses, namely that if there are an odd number of items, then the first or left half will get the extra one (e.g., if the entire array has `13` elements then the first half will range from index `0` throught index `6`, `(end + start) // 2 = (0 + 12) // 2 = 6`, thus containing a total of `7` items).

In summary:

- Runtime analysis:
  + $T(n) = 2T(n/2) + \Theta(n)$
  + $T(n) = \Theta(n\lg n)$
- Tie breakers:
  + Important: for equal key values, the lower indexed (left) value goes first (makes algorithm stable)
  + Arbitrary: for an odd number of elements, the left half gets the extra one

### Optimizations

#### Optimization 1

Only copy the first sorted list, and leave the second list in place:

- Decreases copies by about 25%
- Doesn't change number of comparisons

Recall the animation for the standard recursive merge sort algorithm:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f4.gif').default} />
</div>

Before the merge, the *entire* sorted array is copied elsewhere, and it looks kind of like one operation, but it isn't. We're copying the entire array into another position, which takes time linear in the size of that array. 

Instead of copying out both the left and the right arrays, we can copy out the left array and just leave the right array in-place. If we fill in the sorted values from small to large, then by the time we need to *overwrite* anything in the right array, that value will already have been copied elsewhere. Unoptimized, a merge of two size $n/2$ lists takes $n$ read and write operations to copy the arrays elsewhere and $n$ more to copy them back into the array during the merge. There are also between $n/2$ and $n$ comparisons made *during* the merge. Here, for this first optimization, we get rid of $n/2$ read and write operations for one of the initial list copies (the right one). It won't change the asymptotic runtime &#8212; it will just make it run a little more quickly, getting rid of a quarter of our copy operations.

This new optimization of only copying the left array and leaving the right one in-place can be visualized as follows:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f5.gif').default} />
</div>

We can modify our code from the standard implementation to implement this optimization as follows:

<CodeEditor initialCode={snippet3} editorSettings={{ height: '50vh' }} foldedRegions={[[2,23]]} />

#### Optimization 2

Once the first list is merged, the remainder of the second list is already in-place

- Decrease copies (amount depends on data)
- Decrease comparisons (amount depends on data)

This second optimization is easier to see after we've made the first optimization. Once all elements have been copied from the left list into the combined list, the remaining elements from the right list are already in-place so we don't have to loop through the remaining elements from the right list to copy them into the merged list &#8212; they're already there. 

That was true even without the first optimization. In the standard version, we would have been copying values from the right list (i.e., list `C`) to just overwrite the same values in the original list (i.e., list `A`). But the second optimization is easier to notice here, where instead of just overwriting data (i.e., list `A`) with the same data from somewhere else (i.e., list `C`), we'd be overwriting the data with itself (i.e., list `A`) from the exact same position (i.e., also list `A`).

We can explicitly see this if we look at the code provided for implementing the first optimization:

```python
# merge B and C back into A
def merge(A, start, end, B):
    i = 0                       # start index of B
    j = (end + start) // 2 + 1  # start index of C (in A)
    k = start
    
    # compare smallest elements before each merge
    while i < len(B) and j < end + 1:
        if B[i] <= A[j]:
            A[k] = B[i]
            i += 1
        else:
            A[k] = A[j]
            j += 1
        k += 1
        
    # merge any remaining elements of B into A
    while i < len(B):
        A[k] = B[i]
        i += 1
        k += 1
    
    #highlight-remove-start
    # merge any remaining elements of C into A
    while j < end + 1:
        A[k] = A[j]
        j += 1
        k += 1       
    #highlight-remove-end

def merge_sort(A, start, end):
    # base case (empty or single-element list is already sorted)
    if end <= start:
        return
    
    mid = (end + start) // 2
    merge_sort(A, start, mid)   # recursively sort first half of A
    merge_sort(A, mid + 1, end) # recursively sort second half of A
    B = A[start:mid+1]          # copy sorted first half to B[]
    merge(A, start, end, B)     # merge sorted values B[] and C[] back into A[start...end]
```

All we have to do to implement this second optimization is remove the highlighted lines above:

<CodeEditor initialCode={snippet4} editorSettings={{ height: '50vh' }} foldedRegions={[[2,23]]} />

#### Optimization 3

Only allocate working space once

- Decrease allocations and deallocations

Instead of allocating or deallocating or garbage collecting space for the merges over and over again, we *know* it's going to take linear total space, so we can just allocate a single array and use it for *all* of the needed copies. Anytime we need to copy a value from the original array, just copy it into the same indexed position of the extra array. That spot is reserved for data from the same index. We'll see why using that position is nice in a moment.

<CodeEditor initialCode={snippet5} editorSettings={{ height: '50vh' }} foldedRegions={[[2,24]]} />

#### Optimization 4 {#merge-sort-top-down-optimized}

Before any copy prior to merge, test if lists are already ordered:

- Potentially decrease copies and comparisons
- In worst case, adds $n - 1$ comparisons to the runtime
- In bese case, algorithm now takes $\Theta(n)$

Another optimization sort of overlaps the idea of the first two, although it can be put into place independently from them. Sometimes we might run into the case that the two lists we're going to merge are *already* sorted; that is, the largest element from the leftmost list is no bigger than the smallest element from the rightmost list. In that case, we don't need to copy the lists out and merge them &#8212; they're already forming a sorted list when combined. So we can check for that before we perform the merge.

This optimization has a bit of a tradeoff. For each of the merges that takes place in the algorithm, $n-1$ of them for a sort of $n$ items, we're adding an extra comparison to see if the merge is needed. If the elements are random, then we can avoid approximately half of the $n/2$ one-item list merges. For $n/4$ merges of two-sized two lists, we can avoid approximately 1/6 of the comparisons. Those avoided merges should pay for the extra comparisons. But without really careful analysis, or better yet, *testing*, it's hard to be sure just how much we'll gain for random inputs for this optimization.

But even if we don't gain much on random inputs, it gets us something in some special cases. Our basic merge sort, even with the first three optimizations, will always take time proportional to $n\lg n$: best case, worse case, every case. With this fourth optimization, if the input is already sorted or even almost sorted, then merge sort can take linear time to run, improving the asymptotic best-case performance of the algorithm. This is a way we can help those special cases, and it shouldn't *hurt* the random case. In the worst case, it will add just $n-1$ comparisons to the algorithm, which isn't that big of a deal for an $n\lg n$ algorithm anyway.

Here's an animation that shows the third and fourth optimizations at work:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f6.gif').default} />
</div>

The code needed to implement this final optimization to top-down merge sort is as simple as adding the following `if` statement before attempting to merge:

```python
# ...
if A[mid] > A[mid + 1]:
# ...
```

That is, the first list goes from `A[start]` to `A[mid]`, inclusive, and the second list goes from `A[mid + 1]` to `A[end]`, inclusive. If `A[mid]` is greater than `A[mid + 1]`, then this means the two lists do need to be merged; otherwise, no merging is necessary. This gives us our final implementation of top-down merge sort:

<CodeEditor initialCode={snippet6} editorSettings={{ height: '50vh' }} foldedRegions={[[2,24]]} />

#### Optimization summary {#optimization-summary}

- **Optimization 0:** Only copy lists *after* they are sorted, not beforehand (less space, especially for naive parallelized version)
- **Optimization 1:** Only copy the first sorted list, leave the second sorted list in-place (decreases copies by 25%)
- **Optimization 2:** Once first list is merged, the remainder of the second list is already in-place and doesn't need to be copied (decrease copies, amount depends on data)
- **Optimization 3:** Only allocate working space once (decrease allocations and deallocations)
- **Optimization 4:** Before any copy prior to merge, test if lists are already ordered (decreases copies, amount depends on data, gives $\Theta(n)$ best case runtime)

### Naive parallelization

There's an almost trivial way to partially parallelize this algorithm. 

#### 0th version

Once we say that we're going to separately sort the first and second half of the array, we can do those in parallel. Below, the animation shows all of the sub calls for the zeroth version of the unoptimized algorithm happening simulataneously:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f7.gif').default} />
</div>

Each of the merge operations is done by one processor, and the last merge operation takes linear time all by itself. The two merges at the level below that are each done in parallel, so that level takes only half as much time. Each level takes half as much time as the level above it. So it takes linear total time to do order $\Theta(n\lg n)$ work for the algorithm, using up to $n/2$ processors at a time.

The animation above actually shows the problem with our original approach of copying out unsorted values and then recursively sorting them before the merge. It takes a *lot* of space. Each recursive level uses linear space to hold unsorted data, but it needs to wait for deeper recursive calls to complete in order to overwrite that data. That version would need $\Theta(n\lg n)$ space. So we shouldn't copy the data into new space until *after* it's been sorted and is ready to merge (like our standard recursive model).

But what about the four optimizations we made from that model? All four of them work in parallel too.

#### 4th version

Use the original array as our unsorted data instead of copying it out. Don't copy the second of the two sorted arrays to be merged. When the left array is done merging, don't re-copy the right array. Just allocate one array for space (ever). And check to see if the two arrays are already in order before merging. We can do all of those in parallel. The problem there is, if we animate it, so much is going on at once it's hard to see what's happening:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f8.gif').default} />
</div>

But at least it happens quickly! It will take $n/2$ processors, and order $\Theta(n)$ runtime and order $\Theta(n)$ space. For perfectly sorted data, it would take logarithmic time, but generally we'd almost always expect it to take linear time.

But there are ways to parallelize the merge itself, and parallel merge sort can run in like logarithmic runtime, but we won't get into that for this post.

### Unwinding the recursion {#unwinding-the-recursion}

Let's now take a look at what happens within the recursive calls with a smaller example of just eight items:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f9.png').default} />
</div>

Consider the comparisons and merges done throughout the entire algorithm. We'll use the 0th version of the algorithm to visualize this (because we don't erase stuff it shows a nice trace of everything the algorithm does so we can see which lists were merged to make which list):

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f10.gif').default} />
</div>

At the very bottom of the recursion, we see the unsorted values:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f11.png').default} />
</div>

We just interpret each element as a sorted list of length `1`, the base case of the recursion. One level up, we see that we will quickly have a sorted list of the first two items to be merged from the sorted list of the second two items. Eventually, a sorted list of the third pair of items gets merged with a sorted list of the last two items:

```
merge 17 with -22: compare (17, -22)
merge 15 with 20: compare (15, 20)
merge -22, 17 with 15, 20: compare (-22, 15), (17, 15), (17, 20)

merge 33 with 25: compare (33, 25)
merge 22 with 19: compare (22, 19)

merge 25, 33 with 19, 22: compare (25, 19), (25, 22)
merge -22, 15, 17, 20 with 19, 22, 25, 33:
compare (-22, 19), (15, 19), (17, 19), (20, 19), (20, 22)
```

### Bottom-up merge sort (iterative) {#bottom-up}

Another version of merge sort, bottom-up (or *iterative*), doesn't use recursion. Instead, it just starts with an interpretation of the list as a bunch of length 1 sorted lists, and it merges the first two of those, and the next two, and the next two, etc., until it's passed through the entire array once, merging sorted lists of one item each into sorted lists of two items each. Then it goes through the entire array *again*, this time merging sorted lists of size two into lists of size four. It keeps going and each pass through the array it merges lists that are twice as large as they were for the previous pass.

That's the idea of bottom-up merge sort. Starting with an unsorted set of $n$ numbers, interpreted as $n$ sorted lists of size $1$ each, pass over the list, merging pairs of lists, leaving us with $n/2$ lists of size $2$ each, and then again leaving $n/4$ lists of size $4$ each. And continue that until we have one list of all items.

Let's consider again the example we used above:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f9.png').default} />
</div>

Bottom-up merge sort sorts the array above in the following manner:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f12.gif').default} />
</div>

The following list of merges and comparisons can be helpful to track with the animation above:

```
merge 17 with -22: compare (17, -22)
merge 15 with 20: compare (15, 20)
merge 33 with 25: compare (33, 25)
merge 22 with 19: compare (22, 19)

merge -22, 17 with 15, 20: compare (-22, 15), (17, 15), (17, 20)
merge 25, 33 with 19, 22: compare (25, 19), (25, 22)

merge -22, 15, 17, 20 with 19, 22, 25, 33:
compare (-22, 19), (15, 19), (17, 19), (20, 19), (20, 22)
```

We'll compare the bottom-up approach to the top-down approach in the next two sections, but [the bottom-up implementation](#bottom-up-implementation) is included towards the end.

### Comparison to top-down (8 elements)

The example above is somewhat of a special case because $n=8$, which is a perfect power of $2$. It turns out that when we're sorting a list comprised of a number of items that is a perfect power of $2$, the comparisons done by top-down and bottom-up merge sort will exactly match. For example, we can place side-by-side the bottom-up comparisons we just did in the example above (left) with the comparisons made in the [unwinding the recursion](#unwinding-the-recursion) section (right):

<CodeGrid>
<CodeGridCell>

```a title="Bottom-up comparisons"
merge 17 with -22: compare (17, -22)
merge 15 with 20: compare (15, 20)
merge 33 with 25: compare (33, 25)
merge 22 with 19: compare (22, 19)

merge -22, 17 with 15, 20: compare (-22, 15), (17, 15), (17, 20)
merge 25, 33 with 19, 22: compare (25, 19), (25, 22)

merge -22, 15, 17, 20 with 19, 22, 25, 33:
compare (-22, 19), (15, 19), (17, 19), (20, 19), (20, 22)
```

</CodeGridCell>
<CodeGridCell>

```a title="Top-down comparisons"
merge 17 with -22: compare (17, -22)
merge 15 with 20: compare (15, 20)
merge -22, 17 with 15, 20: compare (-22, 15), (17, 15), (17, 20)

merge 33 with 25: compare (33, 25)
merge 22 with 19: compare (22, 19)

merge 25, 33 with 19, 22: compare (25, 19), (25, 22)
merge -22, 15, 17, 20 with 19, 22, 25, 33:
compare (-22, 19), (15, 19), (17, 19), (20, 19), (20, 22)
```

</CodeGridCell>
</CodeGrid>

As can be seen above, the *order* can change, but the actual comparisons will be the same ones. That won't be the case if we look at this example with $13$ items, which is clearly not a perfect power of $2$.

### Comparison to top-down (13 elements) {#comparison-13-elements}

Let's now consider an example array with $n = 13$ items, a number that is very clearly *not* a power of $2$:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f13.png').default} />
</div>

To sort $13$ items bottom-up, we start in the same way: compare the first two items, then the next two, and continue until we have $6$ sorted lists of size $2$ each, where the last item has nothing to merge with so it just gets left as a size $1$ list. On the next pass, we start merging those longer lists. The first two lists of length $2$ get merged into a list of length $4$. Then the next two lists of length $2$ get merged into a list of length $4$. Then another. But that last item is *still* on its own:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f14.gif').default} />
</div>

After our $i$th pass through the numbers merging lists, we'll be left with a bunch of sorted lists that are all of length $2^i$. Except the last list! After the first pass, that last list will be smaller than all other lists (unless we started with a number of items that is a perfect power of $2$). Above, we paused the process after the second pass, where we had three lists of length $2^2 = 4$ each and then one list of length $1$:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f16.png').default} />
</div>

The next pass will be the first pass where we have an even number of lists, so that last list will finally get merged with something, specifically the length $4$ list to its left. In our final pass, we'll merge a length $8$ list on the left with a length $5$ list on the right for an overall length $13$ sorted list:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f15.gif').default} />
</div>

Note that in the top-down version of merge sort we *never* merge lists of such different sizes. The lists always need to be within size $1$ of each other. But in the bottom-up case, the last list can be very different in size while all the other lists are exactly the same size. Also note that the bottom-up version can have really different comparisons from the top-down version:

<CodeGrid>
<CodeGridCell>

```a title="Bottom-up"
1st pass:
    merge 17 with -22
    merge 15 with 20
    merge -50 with 25
    merge 22 with 19
    merge 10 with 40
    merge 44 with 50
2nd pass
    merge -22, 17 with 15, 20
    merge -50, 25 with 19, 22
    merge 10, 40 with 44, 50
3rd pass
    merge -22, 15, 17, 20 with -50, 19, 22, 25
    merge 10, 40, 44, 50 with 25
4th pass
    merge -50, -22, 15, 17, 19, 20, 22, 25 with 10, 25, 40, 44, 50
```

</CodeGridCell>
<CodeGridCell>

```a title="Top-down"
merge 17 with -22
merge 15 with 20
merge -22, 17 with 15, 20
merge -50 with 25
merge -50, 25 with 22
merge -22, 15, 17, 20 with -50, 22, 25
merge 19 with 10
merge 10, 19 with 40
merge 44 with 50
merge 44, 50 with 25
merge 10, 19, 40 with 25, 44, 50
-50, -22, 15, 17, 20, 22, 25 with 10, 19, 25, 40, 44, 50
```

</CodeGridCell>
</CodeGrid>

Unlike when we sorted $8$ items, the comparisons above aren't just the same comparisons in different order. For example, in the bottom-up example, $19$ never gets compared to $10$, but that would be the first comparison done to recursively sort the second half of the elements in the top-down version. 

On the other hand, the bottom-up version *will* compare $19$ and $22$ as its fourth comparison. But because they're in separate halves of the original array, the $20$ from the left will be compared to the $19$ on the right, and the $19$ won't ever get compared to $22$.

The two versions give different sets of comparisons even though they are asymptotically the same. The bottom-up versions makes $\lg n$ passes through all the data-making merges, linea time for each pass, so it also takes $\Theta(n\lg n)$ time. Comparisons are different because *the lists being merged are different*. We can take a look at individual comparisons if we really want to make sure we understand all of the details.

### History lesson {#history-lesson}

Why would we want the bottom-up version instead of the top-down version? Some people like to avoid recursion. Some older languages might even not allow recursion, but either approach will work in most situations. But that may not have always been the case in the past.

In the past, the standard way to store lots of data was on reel-to-reel tapes. Those tapes didn't really have random access. They worked best just reading data sequentially from the beginning of the tape. Recursive merge sort doesn't work so well on those. It jumps around a lot, but if we had our data split between two tapes, with half of the lists on one tape and half of the lists on the other tape, then we could play both of those tapes from the start, reading off the first item from each. We could merge those two lists into a list on a third tape, and then we could merge the next list from the two tapes on to a fourth tape. After going through all of the lists on the first two tapes, alternating which tape we merged them on to, we'd now have all of our data in half as many lists, split between third and fourth tapes. Next, we'd take those two tapes and merge their data back onto the first two tapes. This allows us to merge while only having to rewind the tapes a logarithmic number of times.

People used to have to worry about stuff like minimizing tape rewinds. More recently, external memory merge sort makes a special attempt to minimize how many times we need to access a disk when we have too much data to fit in main memory.

Let's recap:

- Data was stored on reel-to-reel tapes. Random access was poor. Sequential access was better. 
- For merge sort:
  + Store half of the lists on one tape, half of the lists on a second tape.
  + Merge the first list from each tape onto a third tape, and the second list from each tape onto a fourth.
  + Alternate which tape you merge onto between the 3rd and 4th tapes.
  + After completing a pass through all data, now you have all data on the 3rd and 4th tapes; merge them onto tapes 1 and 2.

### A different optimization (bottom-up)

Let's take a look at one optimization for the bottom-up version, different than those we used for the top-down recursive version. Maybe we want to just allocate a second array once, but this time we won't copy sorted values out and then merge them back; instead, we'll just use the sorted lists and merge them onto the other array. Then use the sorted lists in that second array and merge them back into the original array. Go back and forth between the two. If we happen to need an odd number of total passes, then we'll need to copy data back into the original array when we finish, but we get rid of all of the copy operations right before any merge for the entire algorithm.

We can visualize this different sort of optimization that mimics details found in the [history lesson](#history-lesson) section:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f17.gif').default} />
</div>

The algorithm can be implemented in Python as follows:

<CodeEditor initialCode={snippet8} editorSettings={{ height: '50vh' }} foldedRegions={[[2,27]]} />

### Bottom-up implementation (optimized) {#bottom-up-implementation}

Recalling details from the section on [bottom-up merge sort](#bottom-up), along with the different optimizations discussed for top-down merge sort, what would a decent implementation of bottom-up merge sort actually look like in code? There won't be much of a change in the actual merging of sublists:

```python
# merge left list and right list back into A
def merge(A, start, mid, end, temp):
    for i in range(start, mid + 1):     # copy left subarray into temp
        temp[i] = A[i]
    i = start                           # index into temp (left subarray)
    j = mid + 1                         # index into right subarray in A
    k = start                           # index into merged array in A

    # merge temp (left subarray) and A (right subarray) back into A
    while i < mid + 1 and j < end + 1:
        if temp[i] <= A[j]:
            A[k] = temp[i]
            i += 1
        else:
            A[k] = A[j]
            j += 1
        k += 1

    # merge remaining elements from temp back into A
    while i < mid + 1:
        A[k] = temp[i]
        i += 1
        k += 1
    
    # remaining elements of right list in A are already in-place (no need for merging)

def merge_sort(A, ...):
    # ???
```

Specifically, the left sublist will range from `start` to `mid`, inclusive; furthermore, the left sublist is copied into another list, `temp`, while the right sublist, which ranges from `mid + 1` to `end`, inclusive, remains in-place. If we recall the [various optimizations](#optimization-summary), then we see the code outline above hints at optimizations 0 through 3:

- **Optimization 0:** Only copy lists *after* they are sorted, not beforehand (less space, especially for naive parallelized version)
- **Optimization 1:** Only copy the first sorted list, leave the second sorted list in-place (decreases copies by 25%)
- **Optimization 2:** Once first list is merged, the remainder of the second list is already in-place and doesn't need to be copied (decrease copies, amount depends on data)
- **Optimization 3:** Only allocate working space once (decrease allocations and deallocations)
- **Optimization 4:** Before any copy prior to merge, test if lists are already ordered (decreases copies, amount depends on data, gives $\Theta(n)$ best case runtime)

Optimization 4 should be simple to implement within the body of the `merge_sort` function. The trickier stuff comes down to effectively handling the *mechanics*. For example, each pass through the array needs to involve merging lists twice the size of the previous pass (except the base case which just merges lists of size $1$), and we also need to effectively handle cases where the size of the input array is *not* a perfect power of $2$ (e.g., see [the example](#comparison-13-elements) where the input array had $13$ items). Let's handle these concerns separately.

#### Doubling the size of lists to be merged on each pass

Let `size` denote the size or length of the lists to be merged for a given pass over all items. The bottom-up implementation starts from the *bottom* (i.e., the base cases, which are trivially sorted lists of length $1$ each) and works *up* (i.e., the entire input array of size $n$). Thus, it makes sense we should initialize `size = 1` to indicate we are starting with the base case. When should we stop? Maybe it's easier to think about when we should continue: while `size < n` (this means whatever list we've built up so far by sorting and merging is not yet complete). We can outline the body of the `merge_sort` function as follows:

```python showLineNumbers
def merge_sort(A):
    n = len(A)
    temp = [0] * n  # allocate working space only once
    size = 1        # size of sublists to sort and merge
    while size < n:
        for start in range(0, n, 2 * size):
            #highlight-start
            mid = ?
            end = ?
            ? merge(A, start, mid, end, temp) ?
            #highlight-end
        size *= 2   
```

- Line `4` indicates our initialize `size = 1` condition. 
- Line `5` indicates we're going to continue attempting to sort and merge lists until `size >= n`, at which point we should stop.
- Line `6` indicates the `start` position for the left list of whatever left/right list pair we consider for sorting and merging. The `start` position should begin at `0` for the very first left list, and `start` should clearly never go beyond the last index of the input array (i.e., `start` can go up to, but not include, `n`). Importantly, the `2 * size` argument to `range` specifies the index where `start` should be for the left list of each new left/right pair of lists (in Python, the third argument to `range` specifies the step size by which the first argument should grow). For example, when `size = 1`, the step size is `2 * start = 2 * 1 = 2`, which means we have the following `start` values (i.e., first endpoint of each left list for pairs of left/right lists): `0, 2, 4, 6, ...`. In general, the following illustration shows the structure of how left/right pairs of sublists are arranged:
  $$
  \overbrace{
    [\;\overbrace{\overbrace{[\texttt{start},\ldots,\texttt{mid}]}^{\texttt{size}},\overbrace{[\texttt{mid+1},\ldots,\texttt{end}]}^{\texttt{size}}}^{2\,*\,\texttt{size}}, \ldots, \underbrace{\overbrace{\overbrace{[\texttt{start},\ldots,\texttt{mid}]}^{\texttt{size}},\overbrace{[\texttt{mid+1},\ldots,\texttt{end}]}^{\texttt{size}}}^{2\,*\,\texttt{size}}}_{\substack{\text{caution must be exercised with the last}\\\text{left/right pair of sublists because}\\\text{the right sublist may not even exist}}}\;]
  }^{n}
  $$
  The cautionary note under the last pair of left/right sublists will be discussed and resolved in the next section, but for now it's helpful to simply note we will need to deal with cases where a left sublist exists and a right sublist does not exist, indicating we should not attempt a merge.
- Line `10` indicates we should double the size of sublists we're attempting to merge on each full pass.

Given the details outlined above, how should `mid` and `end` be calculated (lines `7` and `8`, respectively)? Since these variables denote array *index values*, they need to be computed so as to ensure each left and right sublist has a length of `size` (except possibly the last right sublist). 

- `mid`: If the left sublist starts at index `start` and ends at index `mid`, inclusive, then we must have `mid - start + 1 == size` to accurately capture the fact that `mid` is included and the size of the entire sublist is of length `size`. For example, if we had `start = x` and we're about to try to merge sublists of size `4`, then we have `size = 4`, but going from `start = x` to `start + size = x + 4`, inclusive, would be a mistake because then we'd have five items, not four, specifically at the following indexes: `x`, `x + 1`, `x + 2`, `x + 3`, `x + 4`. We need to subtract out the last one. Consequently, we should ultimately have `mid = start + (size - 1)`.
- `end`: The right sublist begins at `mid + 1` and ends at `end`. If we're not dealing with the very last right sublist, then all other right sublists should have a length of `size`, which can be obtained just like above: `end - (mid + 1) + 1 == size`. That is, we should have `end = (mid + 1) + (size - 1)`. If we are dealing with the very last right sublist, then note that the `end` value should not exceed the last index of the input array, `n - 1`. Hence, we should really have `end = min((mid + 1) + (size - 1), n - 1)`.

#### Handling edge cases concerning the last sublist(s)

Our work in the previous section gives us the following outline of the `merge_sort` function:

```python showLineNumbers
def merge_sort(A):
    n = len(A)
    temp = [0] * n  # allocate working space only once
    size = 1        # size of sublists to sort and merge
    while size < n:
        for start in range(0, n, 2 * size):
            mid = start + (size - 1)
            end = min((mid + 1) + (size - 1), n - 1)
            #highlight-next-line
            ? merge(A, start, mid, end, temp) ?
        size *= 2   
```

Our final concern is highlighted above: how and when should we actually attempt to merge sublists? When they're not sorted, of course! We can easily go ahead and implement the fourth and final optimization from the top-down approach:

```python
# ...
if A[mid] > A[mid + 1]:
    merge(A, start, mid, end, temp)
# ...
```

Recall that `mid` is the right endpoint of the left sublist, and `mid + 1` is the left endpoint of the right sublist. If `A[mid] > A[mid + 1]`, then it must be the case that the current pair of sublists we're considering are *not* in order. We need to sort and merge them. 

But what if `A[mid + 1]` doesn't actually exist? Consider again the example of the array input with $13$ items:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f13.png').default} />
</div>

On the first pass, where `size = 1`, note that `start` takes on the following values: `0`, `2`, `4`, `6`, `8`, `10`, `12`. Notably, the last `start` value corresponds to the last element in the array: `A[12] = 25`. We have the following:

- `start = 12`
- `mid = start + (size - 1) = 12 + (1 - 1) = 12`
- `end = min((mid + 1) + (size - 1), n - 1) = min(12 + 1 + 1 - 1, 13 - 1) = min(13, 12) = 12`

This is a problem. Even checking the condition `A[mid] > A[mid + 1]` would throw an error because, in the case of the example array pictured above, `A[mid + 1] = A[12 + 1] = A[13]`, which does not exist. We'd get an index out of bounds error. As previously mentioned and illustrated via animation, when there's nothing for the last sublist to be sorted and/or merged with (i.e., the right sublist does not exist), we simply skip it because it's trivially sorted:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f14.gif').default} />
</div>

Only when the last left sublist can be merged with another sublist do we actually attempt a sort and merge (even though the lists may be of very different sizes):

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f15.gif').default} />
</div>

When does it make sense to attempt a sort and merge between two lists? When we actually have two lists! The condition `A[mid] > A[mid + 1]` is simply an optimization, but the condition `mid < end` should be checked first before the optimization and certainly before any attempted merge; that is, if `mid >= end`, then we don't actually have a left list and a right list, only a left list. This observation lets us complete the body of the `merge_sort` function:

```python showLineNumbers
def merge_sort(A):
    n = len(A)
    temp = [0] * n  # allocate working space only once
    size = 1        # size of sublists to sort and merge
    while size < n:
        for start in range(0, n, 2 * size):
            mid = start + (size - 1)
            end = min((mid + 1) + (size - 1), n - 1)
            if mid < end and A[mid] > A[mid + 1]: # `mid < end` ensures we have two lists for sorting and merging;
                                                  # `A[mid] > A[mid + 1]` ensures we don't sort and merge the two lists unnecessarily (optimization 4)
                merge(A, start, mid, end, temp)
        size *= 2   
```

#### Implementation {#merge-sort-bottom-up-optimized}

Using the observations detailed above, we can stitch the `merge` and `merge_sort` functions together to complete a decently optimized bottom-up implementation of merge sort:

<CodeEditor initialCode={snippet7} editorSettings={{ height: '50vh' }} foldedRegions={[[2,25]]} />

### Timsort ideas

There are, of course, other optimizations that have not been discussed. For instance, insertion sort can sort a small number of elements faster than merge sort. So we could use that to change merge sort's base case. A sort called [Timsort](https://en.wikipedia.org/wiki/Timsort) does that and adds other optimizations, some of which are extensions of the optimizations we've alread seen. It aims to use less time and less space even if it isn't asymptotically different for most cases.

Recap:

- Use insertion sort for bigger base case (it works better on a smaller number of elements than merge sort)
- Timsort:
  + Also use large increasing/decreasing runs for base case
  + Copy only part of left or right array before merge (whichever is smaller)
  + Also use large increasing/decreasing runs for base case
  + Optimize when many items come from one list in a row

## Quick sort and quick select

### Introduction

[Quicksort](https://en.wikipedia.org/wiki/Quicksort) is a recursive algorithm that sorts data in expected order $O(n\lg n)$ time with excellent real-world performance. It was introduced by Tony Hoare in 1960, and then Robert Sedgewick put out a [300 page dissertation](https://sedgewick.io/wp-content/themes/sedgewick/papers/1975Quicksort.pdf) analyzing the Knuth out of it in 1975.

### Quick sort concept

Especially if we already understand recursion, the idea behind quick sort is really simple. First, separate the items into one group with small values and another group with large values. Next, sort each of those two groups separately. The initial splitting of the set into two parts is called *partitioning* the set. Traditionally, we partition the set by picking an element from the array, called the *pivot* (or bound), and compare every element against it.

For example, suppose we have the following array, and we choose the *last* element, `25`, to be the pivot:

```python
[40, 41, 17, -22, 25, 55, -18, 35, 10, 25, 33, 19, 44, 51, 25]
```

Let's identify the elements that are larger than or smaller or equal to the pivot:

$$
[
  \overbrace{40}^{\text{larger}},
  \overbrace{41}^{\text{larger}},
  \underbrace{17}_{\text{smaller}},
  \underbrace{-22}_{\text{smaller}},
  \underbrace{25}_{\substack{\text{smaller}\\\text{or equal}}},
  \overbrace{55}^{\text{larger}},
  \underbrace{-18}_{\text{smaller}},
  \overbrace{35}^{\text{larger}},
  \underbrace{10}_{\text{smaller}},
  \underbrace{25}_{\substack{\text{smaller}\\\text{or equal}}},
  \overbrace{33}^{\text{larger}},
  \underbrace{19}_{\text{smaller}},
  \overbrace{44}^{\text{larger}},
  \overbrace{51}^{\text{larger}},
  25
]
$$

For the sake of clarity, let's color the pivot in $\color{gray}{\text{gray}}$, the values *strictly larger* than the pivot in $\color{magenta}{\text{magenta}}$, and the values less than or equal to the pivot in $\color{cyan}{\text{cyan}}$:

$$
[
  \overbrace{\color{magenta}{40}}^{\text{larger}},
  \overbrace{\color{magenta}{41}}^{\text{larger}},
  \underbrace{\color{cyan}{17}}_{\text{smaller}},
  \underbrace{\color{cyan}{-22}}_{\text{smaller}},
  \underbrace{\color{cyan}{25}}_{\substack{\text{smaller}\\\text{or equal}}},
  \overbrace{\color{magenta}{55}}^{\text{larger}},
  \underbrace{\color{cyan}{-18}}_{\text{smaller}},
  \overbrace{\color{magenta}{35}}^{\text{larger}},
  \underbrace{\color{cyan}{10}}_{\text{smaller}},
  \underbrace{\color{cyan}{25}}_{\substack{\text{smaller}\\\text{or equal}}},
  \overbrace{\color{magenta}{33}}^{\text{larger}},
  \underbrace{\color{cyan}{19}}_{\text{smaller}},
  \overbrace{\color{magenta}{44}}^{\text{larger}},
  \overbrace{\color{magenta}{51}}^{\text{larger}},
  \color{gray}{25}
]
$$

Ideally, we could just move the elements smaller than or equal to the pivot to the lower index positions of the array and then move the elements larger than the pivot to the higher index positions of the array, leaving the pivot between those blocks in its correct, final location:

$$
[
  \overbrace{\color{cyan}{17}, \color{cyan}{-22}, \color{cyan}{25}, \color{cyan}{-18}, \color{cyan}{10}, \color{cyan}{25}, \color{cyan}{19}}^{\text{smaller or equal block}},
  \overbrace{\color{gray}{25}}^{\text{pivot}},
  \overbrace{\color{magenta}{40}, \color{magenta}{41}, \color{magenta}{55}, \color{magenta}{35}, \color{magenta}{33}, \color{magenta}{44}, \color{magenta}{51}}^{\text{larger block}}
]
$$

This process can be animated in the following way:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f18.gif').default} />
</div>

Next, we just need to recursively sort the small and large sets/blocks, which are *completely* independent from each other, so they don't need to interact:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f19.gif').default} />
</div>

Let's recap what we have so far for the concept of quick sort:

- Separate elements into two groups: small keys, large keys
- Recursively sort the group with small keys, then the group with large keys
- Use one element (the bound, or *pivot*) to separate small vs. large groups

### Quick sort pseudocode (1) {#qs-pseudocode-1}

To flesh out a few more details, like a lot of recursive programs, after the user calls the high-level sorting routine, *it* calls recursive quick sort, which uses a couple of extra parameters to mark the start and the end part of the array we're currently sorting. When we make our recursive calls, those parameters allow us to specify which of the two partitions we want to recursively sort:

```a title="Quick sort pseudocode (1)"
QuickSort(A[], start, end)
    if(start >= end) return
    pivotIndex = Partition(A, start, end) # Partition returns an index
    QuickSort(A, start, pivotIndex - 1)
    QuickSort(A, pivotIndex + 1, end)
```

The other big detail to flesh out is how we actually partition.

### Partitioning (CLRS/Lomuto partition)

We'll start with the version in CLRS <BibRef id='TC2022' pages='p. 184'></BibRef> (by Nico Lomuto). For the part of the array we're currently sorting, it uses the *last* element as its pivot and compares it against the other elements in the block being sorted, left to right. It will separate the array into two blocks. The first block gets elements that are smaller than or equal to the pivot, and the second block gets elements that are larger than the pivot. While it's running (i.e., while the `Partition` routine is executing), there's a third block, the elements we haven't looked at yet.

Technically, as CLRS notes, as the `Partition` procedure runs, each element falls into exactly one of four regions, some of which may be empty:

1. Elements known to be smaller than or equal to the pivot (first block described above)
2. Elements known to be greater than the pivot (second black described above)
3. Elements not yet placed into either side of the partition because their comparative value to the pivot is not yet known (third block described above)
4. The pivot itself

So when we start, the third region above (i.e., the third block) contains everything except the pivot:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f20.png').default} />
</div>

So if the value we see is larger than the pivot, then it's a really simple case: we just extend the block of bigger elements in $\color{magenta}{\text{magenta}}$ past the one we just saw. This is the case for the first two elements above, namely $40$ and $41$. These elements are both greater than the pivot, $25$; thus, we extend the region colored in magenta:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f21.gif').default} />
</div>

If, however, the new value is smaller than or equal to the pivot, then we need to make room for the small partition (in $\color{cyan}{\text{cyan}}$) to grow. We do that by swapping the new value with the *first* item in the partition of larger elements. Above, this means swapping $17$ with $40$ because

1. $17$ is smaller than or equal to the pivot (i.e., $17\leq 25$), and 
2. $40$ is the first element of the partition of larger elements

We can see this as follows:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f22.gif').default} />
</div>

This actually happens for the next two elements as well, $-22$ and $25$, because they are both smaller than or equal to our pivot:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f23.gif').default} />
</div>

The single swap we see when we encounter an element smaller than or equal to the pivot essentially slides the partition or "window" of larger elements over by one. But notice that this changes the relative order of elements in the large block. We can easily see this if we revisit the last three swaps in our example:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f24.gif').default} />
</div>

Note how the large block changes from $[40,41]$ to $[41,40]$ after encountering $17$, then back to $[40,41]$ after encountering $-22$, and then again back to $[41,40]$ after encountering $25$.

Shuffling those items isn't a big problem, but this means that quick sort is not a *stable* sort: if two elements have the same key, then quick sort might switch which one comes first.

After the partition completes, the pivot never needs to be moved again:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f25.gif').default} />
</div>

It has its location in the final sorted array. All of the elements to its left are less than or equal to it, and all of the elements to its right are strictly larger than it.

We can recursively sort the block of small items with smaller indices and then the block of larger items with larger indices. The following animation shows the rest of the sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f26.gif').default} />
</div>

Let's recap our partitioning strategy so far:

- Pivot is rightmost element
- Compare pivot against elements, left to right
- Block of small elements, then large elements, then untested elements
- Unstable sort: elements with equal keys might switch order

### Worst case performance

If our data has almost all distinct values, in random order, then quicksort has good expected runtime. But rewatch the last part of the animation above &#8212; as soon as we finish recursively sorting the small items with smaller indices and move on to the larger items with larger indices, we see a case where quick sort does not work very well:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f27.gif').default} />
</div>

If the data is already sorted, then each time we pivot, we pick the largest item, compare it against all of the other items, and then sort again on all of the items except that large pivot. In the worst case, if we keep picking really bad pivots, then quick sort takes $\Theta(n^2)$ time.

Excluding the recursion, it's really good on space: it just needs a constant number of indices and room to swap elements. But if we consider the program call stack, the same worst case example above looks really bad. If we keep picking the largest element as the pivot and we always make our first recursive call on that first partition with almost all of the elements from our current subproblem, then we can end up needing linear depth for our program call stack.

### Quick sort pseudocode (2) {#qs-pseudocode-2}

To fix that, make the first recursive call on whichever partition has fewer elements:

```a title="Quick sort pseudocode (2)"
QuickSort(A[], start, end)
    if(start >= end) return
    pivotIndex = Partition(A, start, end)       # partition returns an index
    if(pivotIndex - start < end - pivotIndex)   # first partition has fewer elements
        QuickSort(A, start, pivotIndex - 1)
        QuickSort(A, pivotIndex + 1, end)
    else                                        # second partition has fewer elements
        QuickSort(A, pivotIndex + 1, end)
        QuickSort(A, start, pivotIndex - 1)
```

This will "procrastinate" the majority of our work until later, letting us empty the small subproblem from our program stack before we get to our real work. 

Assuming that our compiler optimizes tail recursion, that will reduce our worst case program stack logarithmic depth.

### Quick sort pseudocode (3) {#qs-pseudocode-3}

Even if our compiler doesn't optimize tail recursion, *we can*. First, we manually make the recursive call to the subproblem with fewer elements. Next, because that second recursive call was the last thing that we needed to do, we can unwind the recursion, getting rid of the second recursion by putting the entire procedure inside of a loop:

```a title="Quick sort pseudocode (3)"
QuickSort(A[], start, end)
    while (start < end)
        pivotIndex = Partition(A, start, end) # partition returns an index
        if(pivotIndex - start < end - pivotIndex)
            QuickSort(A, start, pivotIndex - 1)
            start = pivotIndex + 1
        else
            QuickSort(A, pivotIndex + 1, end)
            end = pivotIndex - 1
```

This will improve the worst case space requirements of the algorithm. If we're not quite sure what [tail recursion](https://en.wikipedia.org/wiki/Tail_call) is (a [Stack Overflow post](https://stackoverflow.com/questions/33923/what-is-tail-recursion) might be helpful too), then we don't need to worry about it too much. Just know the pseudocodes discussed above are iterations on improving the *space* requirement for quick sort, not the *time* requirement.

Let's recap what we've got so far for the worst case:

- **Time:** $T(n) = T(n-1) + n = \Theta(n^2)$
- **Space:** $\Theta(1)$ references, $\Theta(\lg n)$ each, excluding program stack, *but the program stack grows to $\Theta(n)$ depth*. $\Theta(n)$ space in uniform cost model, $\Theta(n\lg n)$ in logarithmic cost model.
- Make first recursive call on group with fewer elements. Worst case $\Theta(\lg n)$ program stack depth; $\Theta(\lg n)$ space in uniform cost model, $\Theta(\lg^2 n)$ in logarithmic cost model.

### Expected performance

Above, we talked about worst-case performance, which is pretty bad. But what about average-case performance? Well, average over what exactly? What inputs do we *expect* to be given, and what order are they in? Generally, we don't know ahead of time. 

To analyze expected behavior, first we'll assume the array doesn't have too many duplicate items, ideally none like in the following example array:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f28.png').default} />
</div>

But the items above are almost perfectly sorted, which we previously saw was our worst case.

### Randomized quick sort {#randomized-qs}

So we need one minor change in the algorithm. Pick a *random* element from the block we're sorting as our pivot. We can use the same `Partition` code we used previously, but first swap a random pivot from the block we're sorting to the back of that block, where the `Partition` code uses it as a pivot. 

For example, with the array above, when we first start, "the block we're sorting" is the entire array; hence, we pick *any* element at random in the entire array, say `12` in the example above, and swap it with the item at the back of the block, `59`, and then carry on with our swaps as usual:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f29.gif').default} />
</div>

Now we need to recursively sort the lower block and then the higher block. Starting with the lower block, we pick an element at random from `[-23, -18, -15, 9, -10]`, say `-18`, and we swap that element with `-10`:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f30.gif').default} />
</div>

The entire array gets sorted in this manner. The full animation of the sort is shown below, where the pivot used in each block sort is random:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f31.gif').default} />
</div>

Let's recap what we've discussed so far about randomized quick sort:

- Pick a random element from the partition as a pivot
- Swap that pivot into the last position of the block
- Run the rest of the partitioning just like before

### Expected performance (continued)

Now, regardless of the initial order of the elements, we can talk about the expected performance of the algorithm over those random pivot choices. The analysis gets pretty rough, which is why it's broken out into [its own entire section](#qs-full-analysis). But the expected runtime is $O(n\lg n)$ with a logarithmic depth program stack. It's considered to be an in-place algorithm &#8212; it doesn't use a lot of extra space. CLRS calls this "randomized quick sort" and, in general, it's probably a good idea in real life to randomize our pivots.

Let's recap:

- Assumption: no (or few) duplicate values
- Expected $O(n\lg n)$ runtime
- Expected $O(\lg n)$ stack depth; $O(\lg n)$

### Partitioning with duplicates

What if we don't want to make the assumption that there aren't many duplicates? Randomized or not, if everything has the same key, then we end up in a worst-case situation:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f32.gif').default} />
</div>

Even if we had some special-case code to check if all keys are equal, inputs where *almost* everything is equal, except a constant number of smaller values, will still take expected $\Theta(n^2)$ time. There will also be expected linear stack depth unless we call the subproblem with fewer elements first (e.g., the [second](#qs-pseudocode-2) and [third](#qs-pseudocode-3) pseudocodes discussed previously).

If we're *really* worried about duplicates, then we can modify the `Partition` procedure to partition into three blocks, so that after partitioning, we have items *less* than the pivot, items *equal* to the pivot, and then items *greater* than the pivot.

There's a trade-off here. Maybe for elements that are less than the pivot we still have only one comparison, but now we need a *three*-way rotation instead of a swap (this is remarked on in greater detail in [the implementation of a more optimized version of randomized quick sort](#randomized-qs-optimized)), and for other elements we have an extra comparison to check for equality. The payoff is that when we make our recursive calls, we get to ignore the *entire* block of elements equal to the pivot. Our previous worst-case input, where we had lots of duplicate values, took $\Theta(n^2)$ time, but having many duplicate values is now a best-case input, which would result in a linear runtime.

The animation below illustrates all of this (for the sake of clarity, the choice of pivot has not been randomized):

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f33.gif').default} />
</div>

When our pivot *is* randomized, if one element is repeated a lot, then we have a higher chance to pick it and get rid of *all* of those values from our recursive subproblems.

Let's recap:

- Many duplicate values force expected $\Theta(n^2)$ runtime
- Instead of two blocks ($\leq$, $>$), partition into three blocks ($<$, $==$, $>$)
- $\Theta(n\lg n)$ expected and best-case runtime if there are no duplicates
- Duplicates decrease the runtime, $\Theta(n)$ best-case runtime

### Optimizations

#### Hoare's partition

Let's now talk about some optimizations, starting with a different way to partition, that's much closer to Hoare's original method from somewhere around 1960. To switch things up, we'll use the *middle* element as the pivot value instead of the end:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f34.png').default} />
</div>

That value tends to work well if the data is almost sorted when we start. We just copy its value and compare against *that* copy without needing to swap it to the last position.

This strategy will also start a block of small elements on the left, comparing the pivot value against values and expanding that block until it runs into something that is greater than or equal to the pivot:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f35.gif').default} />
</div>

The change is that next it starts the block of large elements on the *right* side of the block, comparing against elements with high indices, expanding *that* block until it runs into something smaller than or equal to the pivot:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f36.gif').default} />
</div>

After both of those progressions have stopped, we know that the lower index references an element not smaller than the pivot (i.e., $55$ in the example above), and the larger index references an element not larger than the pivot (i.e., $25$ in the example above). So we swap those two items (i.e., we swap $55$ and $25$ in our example above), extending the block on each side:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f37.gif').default} />
</div>

Then, we continue again from the lower index, repeating all of that until those two blocks meet:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f38.gif').default} />
</div>

This way of doing things can be summarized as follows:

- Use pivot from middle (not required)
- Partition of small elements on left (extend this partition until we run into a large element)
- Partition of large elements on right (extend this partition until you run into a small element)
- When both partitions are blocked, swap those elements and continue

Two things to note here. The first issue is that after we finish partitioning, the pivot might not be in its final location. It gets absorbed or swapped into one of the two blocks. It might not be on the boundary between the two blocks.

For example, this happened above in our example, where the pivot, $33$, ended up in the right block and not on the boundary between the two blocks:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f39.gif').default} />
</div>

What this means is that when we make our two recursive calls, those two calls, combined, include *all* of the elements of our current block &#8212; they don't get to exclude the pivot.

The second issue is that no matter if we are looking at the block on the left or on the right, if we have a value *equal* to the pivot, then *that* value will stop *that* block from progressing:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f40.gif').default} />
</div>

And it will be swapped into the other block:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f41.gif').default} />
</div>

That can make us do some weird things, like above, where we swap a $25$ for a $25$. We can see the rest of the sort play out in the animation below:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f42.gif').default} />
</div>

The observation of doing weird things like swapping a $25$ for a $25$ stands in sharp contrast to the intuition we gained in our previous approaches; specifically, our intuition previously was to let equal values stay in whatever block we were trying to extend, *not stopping* on those values, *not swapping* them, and that would let our partition finish as quickly as possible.

That was also the approach suggested by Hoare in one of his early papers. But why is that seemingly more optimized approach a mistake? Why stop each block on values equal to the pivot? Isn't it good to avoid having extra swaps? If we again consider extreme cases with one value duplicated for almost the entire array, it could be easy to just extend the partition from one side to include them all &#8212; that might finish *partitioning* without any swaps at all, but it can also bring us back to the worst-case $\Theta(n^2)$ performance of our first partition when we didn't worry about duplicates:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f43.gif').default} />
</div>

Instead, if we stop extending each block when we hit an equal value, then that extreme duplicate case works really nicely. The duplicate values should get divided nicely between the two partitions, and we don't end up with worst-case performance for the algorithm. We avoid that worst-case performance without any other changes needed.

It seems a little weird to call this an "optimization" over the other partition when this one came first (historically). But what makes it faster? Both partitions use about the same number of comparisons, but the Hoare partition uses a lot fewer *swaps*. The Lomuto partition will basically require one swap for each element less than or equal to the pivot. We expect about $n/2$ swaps to partition $n$ elements. Each swap in the Hoare partition causes *both* blocks to get bigger, expanding towards each other, so the most we can get is $n/2$ swaps, but randomly distributed distinct values will give about $n/6$ expected swaps, only one-third as many.

So if the Hoare partition came first, and it runs faster than on random data, because it needs fewer swaps, and it works better in the case of duplicate data, then why is the other partition (i.e., Lomuto) the one that's most commonly taught? 

The Hoare partition is really easy to mess up, especially the edge cases (e.g., maybe because we don't automatically remove the pivot itself from the subproblems we call). The code might seem to work well for large problems with a random pivot, but when the subproblems get smaller, then it's easy for those edge cases to bite us. Even if our code is correct, it's harder to prove it.

Let's recap some of the observations above about the Hoare partition:

- Pivot gets included in one partition
- Values equal to the pivot can be split between partitions (no special block needed for duplicates)
- Random pivot on distinct values requires $n/6$ expected swaps (Lomuto expects about $n/2$)
- Harder to code, teach, debug, and prove correct

#### Thinking about quick sort (pedagogical simulation)

Many things discussed above are all relatively low-level implementation details for partitions that don't really play into the big picture *idea* of quick sort. For David's class, if he wants students to simulate the default vanilla quick sort, then he lets students use the Lomuto partition, but he instructs them to *pretend* it's stable. 

That is, pick the last element as the pivot, imagine that it gets compared to all of the other elements, left to right, and then the small elements slide left, the large elements slide right, and the pivot moves to its proper location, all without changing the relative order of elements within each group:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f44.gif').default} />
</div>

We then recurse on the small elements, then the large elements:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f45.gif').default} />
</div>

That makes it really easy to simulate quick sort, to think about it, and its recursion as a whole while letting us ignore lower level details of how swaps change the ordering of elements within the blocks for some particular partitioning algorithm.

#### Pivot picking

Beyond trying to decrease the number of swaps, like Hoare's partition does, we really do want to pick a good pivot. Randomizing the choice of pivot is good but still needs some reasonable chance to pick a bad pivot. And when we do pick a bad pivot, one of our subproblems will be almost as large as the one we started with.

So if we're partitioning 10,000 items, there's a 2% chance that one of our partitions is really big, 9,900 items or more. There's a 20% chance that we get a partition with at least 9,000 items. Maybe for that many items it's worth just a little more time to try to avoid a bad pivot.

If we pick three random elements and then use use the median of them as our pivot, then the odds of picking a bad pivot falls by a factor of over 33 for that extreme case. It helps us avoid really bad pivot picks. For large blocks, it's probably worth that minor overhead. Even without randomizing, consider finding the median from among the first, last, and middle element of the block. If the block is in random order, then that should work well. And if the block is somewhat sorted, then that middle element will be a good pivot.

Let's recap:

- Probability of picking a "bad" pivot for large $n$:
  + 2% chance of picking a pivot in top or bottom 1%
  + 20% chance of picking a pivot in top or bottom 10%
- If we pick three random elements and take median as pivot:
  + 0.0596% chance of picking a pivot in top or bottom 1%
  + 5.6% chance of picking a pivot in top or bottom 10%
- For non-randomized version, consider using the median of the first, last, and middle items from a block

#### Insertion sort (small subproblems)

For small enough subproblems, insertion sort is faster than quick sort. Similar to what was mentioned for merge sort, once the block we are sorting in quick sort becomes small enough, we can just use insertion sort or we could leave those small problems unsorted and run insertion sort on the entire array after the rest of quick sort finishes. Caching issues supposedly make the first approach faster though.

Recap:

- Insertion sort runs faster than quick sort on small inputs
- Similar to merge sort &#8212; we can use it for small subproblems
- Unlike merge sort, we could instead skip the small subproblems and call insertion sort once after we are done with quick sort
- Insertion sort works well on "almost sorted" arrays
- The first approach may work better due to caching issues

#### Multiple pivots

We can also try using two or three pivots to partition into more than two subproblems. Sedgewick looked at this in the 70s, and it didn't look like it would outperform using just a single pivot. But new analysis and experiments since 2009 have shown that 2 or 3 pivots might be faster, and 2 pivots was actually used to sort primitives in Jave 7. Some papers say it's due to fewer swaps. Others think it's due to cache efficiencies. Ands others think it may be architecture dependent.

Recap:

- 2 or 3 Pivots
- 3 or 4 Subproblems
- Sedgewick, 1975: not worth it
- Yaroslavskiy, 2009: dual pivot is faster (experimentally)
- Papers in the 2010s...
  + Fewer swaps?
  + Caching efficiency?
  + Architecture dependent?

### Naive parallelization

We should also mention parallelism. When we have two recursive subproblems to handle, if we have multiple processors, then that's a really simple place we could run those two recursive calls in parallel, similar to what we saw in the naive parallel merge sort. 

Simple parallelism would take quick sort down to expected linear time and logarithmic depth in the stack, but its worst-case performance wouldn't improve over a regular quick sort. 

There is a more complex way to parallelize the partitioning, giving a polylogarithmic parallel quicksort.

Recap: Naive quick sort parallelization would give expected

- $\Theta(n)$ runtime
- $\Theta(\lg n)$ stack depth
- $\Theta(\lg n)$ space in the uniform cost model
- $\Theta(\lg n)$ space in logarithmic cost model

by just running subproblems in parallel, but there is also a faster, more complicated parallel quick sort that parallelizes the partitioning.

### Selection

Let's now cover a different problem that is so highly related to quick sort that it almost seems wrong to not consider: quick select.

Quick select is an algorithm for *selection*: given a set of $n$ numbers, it's easy to pick the maximum item or minimum item in linear time. But what if we want to select the median element or the $k$th smallest element?

One possible approach would be to sort the numbers first. And then just take the correct one after they're sorted.

To recap the simple selection problem:

- Examples:
  + Find the maximum element
  + Find the minimum element
  + Find the median element
  + Find the $k$th smallest element
- Possible approach:
  + Sort the elements
  + Take the correct one

### Quick select

Imagine we take the sorting approach mentioned above. Futhermore, suppose we use quick sort as our sorting algorithm of choice. Below, imagine that we're looking for the 10th smallest element:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f46.png').default} />
</div>

The 10th smallest element in the example array above, $35$, is highlighted for the sake of clarity. 

For such a small example input array, we can also just present the sorted array to confirm this before illustrating how quick sort figures into things:

```python
#    1    2   3   4   5   6   7   8   9  10  11  12  13  14  15
  [-45, -18, 10, 17, 19, 25, 25, 25, 33, 35, 40, 41, 44, 51, 55]
```

Of course, in general, we don't know ahead of time what the $k$th smallest value will be. It just helps to have the element highlighted in order to make the animations clearer.

We use the regular version of quick sort, and we begin sorting the numbers by using the last element as the pivot, $25$. Let's see how things work after the first partition:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f47.gif').default} />
</div>

It's business as usual: all values smaller than or equal to the pivot end up in the partition to the left of the pivot, and all values greater than the pivot end up in the partition to the right of the pivot. After we finish this first partitioning, quick sort expects us to recursively sort that partition of values less than or equal to the pivot, $25$. But why bother with them? We know that there are `8` elements with value $25$ or less:

```python
#   1   2    3    4   5   6   7      8      9  10  11  12  13  14  15
  [17, 25, -45, -18, 19, 10, 25,    25,    51, 35, 40, 33, 44, 55, 41]
```

But we're looking for the `10`th smallest value! So we should just ignore that entire left partition of smaller (or equal) items and just look at the items in the partition of larger items. Above, we can see $35$ is the second smallest element in the partition of larger items but still the 10th smallest overall.

Let's now recursively look in the partition of larger items:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f48.gif').default} />
</div>

As we see above, when we step into that block of larger items (i.e., from after the first partition), we pick the last element of the partition, $41$, as our pivot, and we partition around that pivot, leaving us with the following arrangement of items after the partitioning:

```python
#   1   2    3    4   5   6   7   8      9  10  11     12     13  14  15
  [17, 25, -45, -18, 19, 10, 25, 25,    35, 40, 33,    41,    44, 55, 51]
```

We see that $41$ is the fourth smallest element from the block we just partitioned and the 12th smallest overall. Thus, the element we're looking for must come from the partition of values smaller than $41$, namely $35$, $40$, $33$. We thus recurse on that partition of smaller values, choosing $33$ as our pivot:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f49.gif').default} />
</div>

We see that our pivot ends up being the smallest element from the block we just partitioned and the 9th smallest overall:

```python
#   1   2    3    4   5   6   7   8      9     10  11     12  13  14  15
  [17, 25, -45, -18, 19, 10, 25, 25,    33,    40, 35,    41, 44, 55, 51]
```

The element we're looking for must come from the partition of values larger than $33$, namely $40$ and $35$. We recurse on that partition of larger values, choosing $35$ as our pivot:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f50.gif').default} />
</div>

After the partitioning, we see that our pivot ends up being the smallest element from the block we just partition, and its the 10th smallest overall:

```python
#   1   2    3    4   5   6   7   8   9     10     11  12  13  14  15
  [17, 25, -45, -18, 19, 10, 25, 25, 33,    35,    40, 41, 44, 55, 51]
```

This is what we wanted. We can finally return its value as our answer. Note how the final array above isn't close to being sorted. We have `17, 25, -45, ...` as the start, and *that is okay*. The goal of quick select isn't to sort the array. It's to select some value in expected linear time using a sorting algorithm to help do so, where quick sort is well suited to the task with its partitioning scheme.

Let's recap: if we're using quick sort, and our pivot is

- less than the element we are looking for: ignore the partition of smaller elements
- larger than the element we are looking for: ignore the partition of bigger elements
- the element we are looking for: stop looking

#### Quick select pseudocode (1) {#quick-select-1}

The pseudocode for quick select looks a lot like that for quick sort:

```a title="Quick select pseudocode (1)"
QuickSelect(A[], start, end, rank)
    if(start == end)                                        # implies rank == 1
        return A[start]
    pivotIndex = Partition(A, start, end)                   # Partition returns an index
    if(pivotIndex == rank)
        return A[rank]
    if(pivotIndex < rank)
        return QuickSelect(A, pivotIndex + 1, end, rank)    # desired value resides in partition of larger values
    else
        return QuickSelect(A, start, pivotIndex - 1, rank)  # desired value resides in partition of smaller values
```

But note that `QuickSelect` above has only one recursive call (i.e., to the partition we should search to find our desired value). Furthermore, `QuickSelect` needs one more parameter than `QuickSort`, namely `rank`, which specifies the "`rank`th" smallest value from the array `A[start:end]`, where `1 <= rank <= end - start + 1`. When `start == end`, we have `end - start + 1 == 1`, which means `1 <= rank <= 1`, meaning `rank == 1`.

After partitioning, we'll need at most one recursive call to either the smaller or larger partition, unless we get lucky: if the `rank` of the pivot equals the rank we seek, then stop searching. 

#### Quick select pseudocode (2) {#quick-select-2}

Also, notice above that because there's only one recursive call, and it's tail recursion, we can use the same technique we used on quick sort to get rid of the tail recursion, giving us a version of quick select with no recursion:

```a title="Quick select pseudocode (2)"
QuickSelect(A[], start, end, rank)
    while(start <= end)
        if(start == end)                        # implies rank == 1
            return A[start]
        pivotIndex = Partition(A, start, end)   # Partition returns an index
        if(pivotIndex == rank)
            return A[rank]
        if(pivotIndex < rank)
            start = pivotIndex + 1              # desired value resides in partition of larger values
        else
            end = pivotIndex - 1                # desired value resides in partition of smaller values
```

#### Conclusion

All of the quick sort partitioning algorithm choices are still present in both pseudocode implementations of quick select. We probably want to pick our pivot randomly (unlike what's presented in the pseudocode).

#### Quick select pseudocode (2)

### Implementations

#### Quick sort pseudocode (1)

If we revisit the [quick sort pseudocode (1)](#qs-pseudocode-1) section, and then fill out the details for the `Partition` procedure (it's helpful to use <BibRef id='TC2022' pages='pp. 183-184'></BibRef> for this purpose), then we end up with pseudocode that looks something like the following:

```a title="Quick sort pseudocode (1)
Partition(A[], start, end)
    pivot = A[end]                    # the pivot
    i = start - 1                     # highest index into the low side (empty at first)
    for j = start to end - 1          # process each element other than the pivot
        if A[j] <= pivot              # does element A[j] belong on the low side?
            i = i + 1                   # index of a new slot in the low side
            exchange A[i] with A[j]     # place element A[j] there
    exchange A[i + 1] with A[end]     # pivot goes just to the right of the low side
    return i + 1                      # new index of the pivot

QuickSort(A[], start, end)
    if(start < end)
      pivotIndex = Partition(A, start, end) # partition the subarray around the pivot, which ends up in A[pivotIndex]
      QuickSort(A, start, pivotIndex - 1)   # recursively sort the low side
      QuickSort(A, pivotIndex + 1, end)     # recursively sort the high side
```

The pseudocode above can be implemented almost exactly as above in Python:

<CodeEditor initialCode={snippet11} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

#### Quick sort pseudocode (2)

If we revisit the [quick sort pseudocode (2)](#qs-pseudocode-2) section, where we made a first attempt at reducing the space requirement by first recursing on the smaller partition, then we get pseudocode that looks like the following, where the `Partition` procedure remains the same (i.e., the space requirement has now been improved a little bit, but the time requirement, largely dictated by the untouched `Partition` procedure, remains the same):

```a title="Quick sort pseudocode (2)"
Partition(A[], start, end)
    pivot = A[end]                    # the pivot
    i = start - 1                     # highest index into the low side (empty at first)
    for j = start to end - 1          # process each element other than the pivot
        if A[j] <= pivot              # does element A[j] belong on the low side?
            i = i + 1                   # index of a new slot in the low side
            exchange A[i] with A[j]     # place element A[j] there
    exchange A[i + 1] with A[end]     # pivot goes just to the right of the low side
    return i + 1                      # new index of the pivot

QuickSort(A[], start, end)
    if(start >= end) return
    pivotIndex = Partition(A, start, end)       # partition returns an index
    if(pivotIndex - start < end - pivotIndex)   # first partition has fewer elements
        QuickSort(A, start, pivotIndex - 1)
        QuickSort(A, pivotIndex + 1, end)
    else                                        # second partition has fewer elements
        QuickSort(A, pivotIndex + 1, end)
        QuickSort(A, start, pivotIndex - 1)
```

We can implement the pseudocode above in Python as follows:

<CodeEditor initialCode={snippet12} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

#### Quick sort pseudocode (3)

If we revisit the [quick sort pseudocode (3)](#qs-pseudocode-3) section, where we tried to further reduce the space requirement by eliminating the recursion ourselves, then we end up with pseudocode that looks something like the following (as before, the `Partition` procedure remains the same, meaning we're improving our space requirement but not our time requirement):

```a title="Quick sort pseudocode (3)"
Partition(A[], start, end)
    pivot = A[end]                    # the pivot
    i = start - 1                     # highest index into the low side (empty at first)
    for j = start to end - 1          # process each element other than the pivot
        if A[j] <= pivot              # does element A[j] belong on the low side?
            i = i + 1                   # index of a new slot in the low side
            exchange A[i] with A[j]     # place element A[j] there
    exchange A[i + 1] with A[end]     # pivot goes just to the right of the low side
    return i + 1                      # new index of the pivot

QuickSort(A[], start, end)
    while (start < end)
        pivotIndex = Partition(A, start, end)       # partition returns an index
        if(pivotIndex - start < end - pivotIndex)
            QuickSort(A, start, pivotIndex - 1)
            start = pivotIndex + 1
        else
            QuickSort(A, pivotIndex + 1, end)
            end = pivotIndex - 1
```

We can implement the pseudocode above in Python as follows:

<CodeEditor initialCode={snippet13} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

#### Randomized quick sort

If we revisit the [randomized quick sort section](#randomized-qs), as well as CLRS <BibRef id='TC2022' pages='p. 192'></BibRef>, then we see choosing a random pivot at the outset results in updating our pseudocode in the following way:

```a title="Randomized quick sort"
RandomizedPartition(A[], start, end)
    i = Random(start, end)
    exchange A[end] with A[i]
    return Partition(A[], start, end)

Partition(A[], start, end)
    pivot = A[end]                    # the pivot
    i = start - 1                     # highest index into the low side (empty at first)
    for j = start to end - 1          # process each element other than the pivot
        if A[j] <= pivot              # does element A[j] belong on the low side?
            i = i + 1                   # index of a new slot in the low side
            exchange A[i] with A[j]     # place element A[j] there
    exchange A[i + 1] with A[end]     # pivot goes just to the right of the low side
    return i + 1                      # new index of the pivot

QuickSort(A[], start, end)
    if(start < end)
      pivotIndex = RandomizedPartition(A, start, end) # partition the subarray around the pivot, which ends up in A[pivotIndex]
      QuickSort(A, start, pivotIndex - 1)             # recursively sort the low side
      QuickSort(A, pivotIndex + 1, end)               # recursively sort the high side
```

Note that the `Partition` procedure has been left unchanged, but we now call the new `RandomizedPartition` procedure within `QuickSort`. It's worth noting the `QuickSort` layout in the pseudocode above reverts back to the [first pseudocode](#qs-pseudocode-1) for quick sort (i.e., no attempts at space optimization).

We can implement the pseudocode above in Python by using the [`randint`](https://docs.python.org/3/library/random.html#random.randint) method from Python's `random` module (i.e., `random.randint(a, b)` returns a random integer $N$ such that $a\leq N\leq b$):

<CodeEditor initialCode={snippet14} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

#### Randomized quick sort (optimization with three partitions) {#randomized-qs-optimized}

TBD

#### Quick sort with Hoare's partition

The following pseudocode is adapted from CLRS <BibRef id='TC2022' pages='p. 199'></BibRef> and shows the original partitioning algorithm due to C. A. R. Hoare:

```a title="Quick sort (Hoare's partition)"
HoarePartition(A, start, end)
    pivot = A[start]
    i = start - 1
    j = end + 1
    while TRUE
        repeat
            j = j - 1
        until A[j] <= x
        repeat
            i = i + 1
        until A[i] >= x
        if i < j
            exchange A[i] with A[j]
        else return j
```

The pseudocode above may be implemented in Pythom in the following way (the point of emphasis is the `partition` function, not the `quicksort` function, which may be implemented to use tail recursion or not):

<CodeEditor initialCode={snippet17} editorSettings={{ height: '50vh' }} foldedRegions={[]} />

#### Quick select (randomized)

If we look at the pseudocode in the [first section](#quick-select-1) on quick select, and we follow the advice to randomize our pivots, then we end up with pseudocode that looks something like the following:

```a title="Quick select (randomized)"
RandomizedPartition(A[], start, end)
    i = Random(start, end)
    exchange A[end] with A[i]
    return Partition(A[], start, end)

Partition(A[], start, end)
    pivot = A[end]                    # the pivot
    i = start - 1                     # highest index into the low side (empty at first)
    for j = start to end - 1          # process each element other than the pivot
        if A[j] <= pivot              # does element A[j] belong on the low side?
            i = i + 1                   # index of a new slot in the low side
            exchange A[i] with A[j]     # place element A[j] there
    exchange A[i + 1] with A[end]     # pivot goes just to the right of the low side
    return i + 1                      # new index of the pivot

QuickSelect(A[], start, end, rank)
    if(start == end)                                        # implies rank == 1
        return A[start]
    pivotIndex = RandomizedPartition(A, start, end)         # Partition returns an index
    if(pivotIndex == rank)
        return A[rank]
    if(pivotIndex < rank)
        return QuickSelect(A, pivotIndex + 1, end, rank)    # desired value resides in partition of larger values
    else
        return QuickSelect(A, start, pivotIndex - 1, rank)  # desired value resides in partition of smaller values
```

The pseudocode above can be implemented in Python in the following way:

<CodeEditor initialCode={snippet15} editorSettings={{ height: '50vh' }} foldedRegions={[[3,6],[8,16]]} />

#### Quick select (randomized with tail recursion)

If we look at the pseudocode in the [second section](#quick-select-2) on quick select, and we follow the advice to randomize our pivots, then we end up with pseudocode that looks something like the following:

```a title="Quick select (randomized with tail recursion)"
RandomizedPartition(A[], start, end)
    i = Random(start, end)
    exchange A[end] with A[i]
    return Partition(A[], start, end)

Partition(A[], start, end)
    pivot = A[end]                    # the pivot
    i = start - 1                     # highest index into the low side (empty at first)
    for j = start to end - 1          # process each element other than the pivot
        if A[j] <= pivot              # does element A[j] belong on the low side?
            i = i + 1                   # index of a new slot in the low side
            exchange A[i] with A[j]     # place element A[j] there
    exchange A[i + 1] with A[end]     # pivot goes just to the right of the low side
    return i + 1                      # new index of the pivot

QuickSelect(A[], start, end, rank)
    while(start <= end)
        if(start == end)                        # implies rank == 1
            return A[start]
        pivotIndex = Partition(A, start, end)   # Partition returns an index
        if(pivotIndex == rank)
            return A[rank]
        if(pivotIndex < rank)
            start = pivotIndex + 1              # desired value resides in partition of larger values
        else
            end = pivotIndex - 1                # desired value resides in partition of smaller values
```

The pseudocode above can be implemented in Python in the following way:

<CodeEditor initialCode={snippet16} editorSettings={{ height: '50vh' }} foldedRegions={[[3,6],[8,16]]} />

## Runtime analysis for quick sort and quick select {#qs-full-analysis}

### Introduction

We'll start by looking at the intuition behind and formal anlysis of quick select. Then we'll move on to quick sort.

### Quick select analysis

In quick select, when we partition the array, it takes linear time, and afterwards we have one partition comprised of elements smaller than the pivot and one partition comprised of elements larger than the pivot. If one partition has 90% of the original set, and the number we're looking for is in *that* partition, it seems like we got a bit unlucky. We'd hope to do better than that.

What happens if we get unlucky like that every time? That is, if our pivot only eliminates 10% of the elements for each pass, then we get a simple recurrence relation:

$$
T(n) = T(9n/10) + n
$$

Any of the three analytical methods we saw previously can be used to prove that this recurrence relation is linear. 

We could *guess* that it's linear and use the substitution method, expand it using the recursion tree method, or use the master method:

1. Substitution method:
    + Inductive hypothesis: for $k < n$, $T(k)\leq Ck$
    + $T(n) = T(9n/10) + n\stackrel{\text{i.h.}}{\leq} C9n/10 + n\stackrel{?}{\leq} Cn$
    + True for $C=10$
2. Recursion tree:
    + Prove $T(n) = T((9/10)^i n) + \sum_{j=0}^{i-1}(9/10)^jn$ by induction
    + For $i = \lg_{10/9}n$, $T(n) = T(1) + \sum_{j=0}^{(\lg_{10/9}n)-1}(9/10)^j n\leq T(1) + \sum_{j=0}^\infty(9/10)^j n\leq T(1)+10n$
3. Master Theorem:
    + $a = 1, b = 10/9, f(n) = n$
    + $\lg_b a = \lg_{10/9}1 = 0$
    + $n=\Omega(n^{0+\epsilon})$ for $\epsilon=1$, case 3, $T(n) = O(f(n)) = O(n)$

Even if we're most pessimistic and imagine that we only get rid of 1% of the set each time we partition, changing our recurrence to $T(n) = T(99n/100) + n$:

1. Substitution method:
    + Inductive hypothesis: for $k < n$, $T(k)\leq Ck$
    + $T(n) = T(99n/100) + n\stackrel{\text{i.h.}}{\leq} C99n/100 + n\stackrel{?}{\leq} Cn$
    + True for $C=100$
2. Recursion tree:
    + Prove $T(n) = T((99/100)^i n) + \sum_{j=0}^{i-1}(99/100)^jn$ by induction
    + For $i = \lg_{100/99}n$, $T(n) = T(1) + \sum_{j=0}^{(\lg_{100/99}n)-1}(99/100)^j n\leq T(1) + \sum_{j=0}^\infty(99/100)^j n\leq T(1)+100n$
3. Master Theorem:
    + $a = 1, b = 100/99, f(n) = n$
    + $\lg_b a = \lg_{100/99}1 = 0$
    + $n=\Omega(n^{0+\epsilon})$ for $\epsilon=1$, case 3, $T(n) = O(f(n)) = O(n)$

Or maybe 1% of the set each 5 times we partition, changing our recurrence to $T(n) = T(99n/100) + 5n$:

1. Substitution method:
    + Inductive hypothesis: for $k < n$, $T(k)\leq Ck$
    + $T(n) = T(99n/100) + 5n\stackrel{\text{i.h.}}{\leq} C99n/100 + 5n\stackrel{?}{\leq} Cn$
    + True for $C=500$
2. Recursion tree:
    + Prove $T(n) = T((99/100)^i n) + \sum_{j=0}^{i-1}(99/100)^jn$ by induction
    + For $i = \lg_{100/99}n$, $T(n) = T(1) + \sum_{j=0}^{(\lg_{100/99}n)-1}(99/100)^j 5n\leq T(1) + \sum_{j=0}^\infty(99/100)^j 5n\leq T(1)+500n$
3. Master Theorem:
    + $a = 1, b = 100/99, f(n) = 5n$
    + $\lg_b a = \lg_{100/99}1 = 0$
    + $5n=\Omega(n^{0+\epsilon})$ for $\epsilon=1$, case 3, $T(n) = O(f(n)) = O(5n) = O(n)$

We *still* get a linear runtime. It's just that the *constants* get worse, as seen above. That's a good intuition, but what if we want to make it a bit more formal and accurate?

### Complexity of precision

We're assuming that we're looking for the $k$th smallest item from $n$ distinct values when we perform quick select, where the first smallest item is the smallest item, and the $n$th smallest item is the largest item, and all of the items are distinct. 

Our runtime might then depend not only on $n$ but also on $k$. Can we write down an accurate recurrence relation for that? It takes linear time to partition, and for any $i$ from $1$ to $n$, there's an equal probability of picking the $i$th smallest item from the array as our pivot. If $i$ is less than $k$, then we need to recursively search all elements with rank larger than $i$ for the $k-1$th smallest element. If $i$ equals $k$, then we're done. And if $i$ is greater than $k$, then we need to search all elements with rank less than $i$ for the $k$th smallest. This gives us the following recurrence:

$$
T(n, k) = n - 1 + \frac{1}{n}\Bigl(\sum_{i=1}^{k-1} T(n-i, k-i) + 0 + \sum_{i=k+1}^n T(i-1,k)\Bigr)
$$

Maybe the formulation above is a bit too precise. It looks complex enough that we really don't want to solve it. We'll leave it as an exercise for the reader. Ha. 

### Formal analysis

Instead, we'll make some pessimistic assumptions that aren't quite as clumsy as the ones we started with. Imagine we're running the algorithm but against an adversary that gets to change the rank we're seeing after each time we partition, as long as it doesn't change it to something we've already discarded, but it can force us to always have to search the bigger partition (i.e., the adversary can tell us if the rank is larger or smaller than each pivot we pick):

- Pick a random pivot from $n$ distinct items
- Adversary won't let us finish until there is only one item left
- Adversary always picks the larger partition for us to recursively search

Thus, given $n$ distinct items, we still assume, that we pick a random item as our pivot, but unless there's just one item, we never get lucky and pick it, and we always have to recursively step into whichever partition has more elements. If our pivot has rank less than $n/2$, then we need to search everything that's larger than it, and if the pivot has rank larger than $n/2$, then we need to search everything smaller:

$$
T(n) = n\frac{1}{n}\Bigl(\sum_{i=1}^{n/2} T(n-i) +  \sum_{i=n/2+1}^n T(i)\Bigr) = n+\frac{2}{n}\sum_{i=n/2+1}^n T(i)
$$

We can simplify some repeated terms, and the recurrence relation above is pessimistic but also more realistic than our first pessimistic recurrence relation. It allows for the possibility that we get a really bad partition like picking the absolute maximum value element when we're looking for something else, but that possibility is weighted by a realistic probability.

So how do we solve that recurrence relation? Well, this is a recurrence relation where we should be glad to have a guess to start. Guessing that it's linear, we use the substitution method, plug in for the arithmetic series, and see that linear works.

Specifically, the inductive hypothesis is that for $k < n$, $T(k)\leq Ck$, and we have

$$
\begin{align*}
T(n)
&= n+\frac{2}{n}\sum_{i=n/2+1}^n T(i)\\
&\stackrel{\text{i.h.}}{\leq} n + \sum_{i=n/2+1}^n + Ci\\
&= n + \frac{2}{n}C\frac{n}{2}\frac{n/2+1+n}{2}\\
&= n + C\frac{3}{4}n + C/2\\
&\stackrel{?}{\leq} Cn
\end{align*}
$$

which is true for $C = 8, n\geq 4=n_0$. 

The math above makes the simplifying assumption that $n$ is even, but the result holds for odd $n$ too.

### Quick sort analysis

Let's start with the same intuitive approach we used for quick select. If we break exactly in the middle, we get a well-known recurrence relation that gives us order $n\lg n$ runtime:

$$
T(n) = 2T(n/2) + n = \Theta(n\lg n)
$$

But what if we go back to our assumption that we get a pivot 90% of the way through the block? We can use the substitution method to show that that gives an order $n\lg n$ relation:

- What if we pick 90% pivot each pass?
- $T(n) = T(9n/10) + T(n/10) + n$
- Substitution method:
  + Inductive hypothesis: for $k < n$, $T(k)\leq Ck\lg k$
  + $T(n) = T(9n/10) + T(n/10) + n \stackrel{\text{i.h.}}{\leq} C9n/10\lg 9n/10 + Cn/10\lg n/10 + n = C9n/10(\lg n - \lg 10/9) + Cn/10(\lg n - \lg 10) + n = Cn\lg n + n - (C9n/10) \lg 10/9 - (Cn/10)\lg 10\stackrel{?}{\leq} Cn\lg n$
  + True for $C = 10$

But already that's pretty ugly looking. We could also prove that with the Akra-Bazzi extension of the Master Theorem.

### Original approach

If we want more precision, then, unlike quick select, we only have one parameter here. So let's again go back to write out the recurrence relation, assuming that we pick the $i$th smallest element as our pivot. And we'll assume that we're using the Lomuto partition on distinct elements. We'll have two recursive calls, one on the $i - 1$ elements smaller than the pivot and one on the $n - i$ elements larger than the pivot:

$$
T(n) = n - 1 + \frac{1}{n}\Bigl(\sum_{i=1}^n (T(i-1) + T(n-i)\Bigr) = n - 1 + \frac{2}{n}\sum_{i=0}^{n-1} T(i)
$$

Not very pretty. The above was the analysis in the first edition of CLRS. A much more graceful analysis has sense been used.

Below is a really small array:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f96.png').default} />
</div>

And instead of asking *how long* it takes to run, let's ask a much more limited question: if we run randomized quick sort, what's the probability that `3` will get compared to `17`? If we happen to pick `9` as our first pivot, then it will separate `3` and `17` into different partitions, and then during the entire rest of the sort they won't get compared:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f97.gif').default} />
</div>

Similarly, if we had chosen `7`, `8`, or `15`, then `3` and `17` also wouldn't ever get compared. Only if we choose `3` or `17` as our *first* pivot will they get compared to each other. Because `3` and `17` are the minimum and maximum items, we will know after picking just one pivot if those values will get compared. If one of them is chosen first, then they get compared. Or if one of the four values between them gets chosen first, then they don't get compared.

There's a $1/3$ chance they get compared because there are four values between them.

Let's recap &#8212; for randomized quick sort on the small example array above, what is the probability that `3` gets compared to `17`?

- If we pick $9$ as our first pivot, then $3$ and $17$ will never be compared.
- Similarly, if $7$, $8$, or $15$ is our first pivot, then $3$ and $17$ will never be compared.
- If we pick $3$ or $17$ as our first pivot, then $3$ and $17$ will be compared.
- Four items between the two extreme values:
  + $4/(4 + 2) = 2/3$ chance they do not get compared.
  + $2/(4 + 2) = 1/3$ chance they get compared.

Now let's consider a bigger array:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f98.png').default} />
</div>

To simplify it, the array holds integers `1` through `20`, inclusive. What's the probability of comparing the number `2` against the number `7` during quick sort? To make it a bit easier to see what's going on, we'll add a second view of the same values but in sorted order:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f99.png').default} />
</div>

Like before, there are four values between `2` and `7` in the sorted order, but now we have a lot more values that we can pick as a pivot. If we happen to pick `11` as our first pivot, then it gets compared to everything, and both `2` and `7` fall into the partition of smaller elements. Unlike before, we picked our first pivot, but we still don't know if they're ever going to get compared to each other or not:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f100.gif').default} />
</div>

The array after the first partition is as follows:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f101.png').default} />
</div>

Stepping into that partition on the left, if we pick `1` as our next pivot, then it gets compared to the numbers `2` to `10`, but both `7` and `2` are larger than the pivot, `1`, so they both fall into the same partition again:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f102.gif').default} />
</div>

The partition containing `7` and `2` after this second partitioning still needs to be sorted, and we still don't know if they are going to be compared:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f103.png').default} />
</div>

As long as we keep picking pivots either larger than `7` or smaller than `2`, then `7` and `2` will both fall into the same partition, and we won't know yet if we're going to compare them. But, at some point, we'll pick a pivot of `2`, `7`, or something between them. If we pick `2` or `7` before anything between them, then they get compared to each other, and if we pick something between them first, then they get separated into different partitions, and they won't ever be compared (below, `7` is picked):

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f104.gif').default} />
</div>

The result after this third partitioning, where we use `7` as the pivot, shows how `7` and `2` get compared and are then separated thereafter:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f105.png').default} />
</div>

Even though everything above *looks* different than the first small array with just $6$ values, the probably that `2` and `7` get compared is still $1/3$. The added values larger than `7`, or smaller than `2`, don't change that probability of comparing those two items. The important thing is that there are four values between them.

Let's recap our observations from using this bigger array &#8212; what is the probability that (non-extreme) elements, `2` and `7`, get compared?
- For pivot $> 7$, both fall into the same partition, maybe compared later.
- For pivot $< 2$, both fall into the same partition, maybe compared later.
- Eventually, $2$, $7$, or something between them will be chosen as a pivot.
  + If $2$ or $7$ is chosen before $x$, for $2 < x < 7$, they get compared.
  + If $x$, for $2 < x < 7$, is chosen before $2$ or $7$, they do not get compared.
- Four items between the two chosen values:
  + $4/(4 + 2) = 2/3$ chance they do not get compared.
  + $2/(4 + 2) = 1/3$ chance they get compared.

More generally, we can calculate the probability that the $i$th smallest value is ever compared to the $j$th smallest value. If we want to know how many comparisons take place during the entire algorithm, then we can sum that up over all possible $i$ and $j$ values. That might look a little complex but not compared to the original recurrence relation we were considering. 

We manipulate our sum to get the inner summation to be the harmonic series, and it works out to order $n\lg n$ comparisons. Because quick sort takes time proportional to the number of comparisons it performs, this sorting algorithm gives us an order $n\lg n$ expected runtime for quick sort.

In summary:

- For $i < j$, there are $j - i = 1$ elements from the $i$th to the $j$th smallest
- Probability $i$th smallest element is compared to the $j$th smallest element: $2/(j - i + 1)$
- Over all $i < j$ pairs, the expected number of comparisons is given by the following:

$$
\begin{align*}
\sum_{i=1}^{n-1}\sum_{j=i+1}^n 2/(j-i+1)\\
&= \sum_{i=1}^{n-1}\sum_{j=1}^{n-i} 1/(j + 1)\\
&\leq \sum_{i=1}^{n-1}2\sum_{j=1}^{n-i} 1/j\\
&\leq \sum_{i=1}^{n-1}2\sum_{j=1}^n 1/j\\
&\leq \sum_{i=1}^{n-1}2(\ln n + O(1))\\
&\leq 2n\ln n + O(n)
\end{align*}
$$

## Lower bounds for comparison based sorting - decision trees {#comparison-based-lower-bound}

### Introduction

This section will be about lower bounds for comparison-based sorting, using decision trees. We should have already seen some of the following basic comparison-based sorting algorithms:

- Bubble sort
- Selection sort
- Insertion sort
- Merge sort
- Heap sort
- Quick sort

We'll use insertion sort the most. We'll see what a comparison-based sort is, and we'll specifically look at how it acts on $3$ elements. We'll also introduce decision trees and how they relate back to the algorithm, and then show trees for each of the comparison-based sorts listed above. We use those trees to make a lower bound argument for sorting $3$ items, and then generalize that to prove a lower bound for sorting $n$ items. 

### Sorting (n square to n log n to ?)

Let's say that the first sorting algorithm we learn is insertion sort. It seems great at first. But then we learn merge sort, and we realize that insertion sort isn't that great. Insertion sort's $O(n^2)$ worst-case runtime doesn't look so good once we know that we can do better and sort the same array in $O(n\lg n)$ using merge sort. But is $O(n\lg n)$ good? Well, can we do better?

### Insertion sort

Here's the insertion sort algorithm in pseudocode:

```a showLineNumbers
InsertionSort(array A)
    for(i = 1 to A.length - 1)
        tmp = A[i]
        j = i
        while(j > 0 && tmp < A[j - 1])
            A[j] = A[j - 1]
            j--
        A[j] = tmp
```

Let's consider running the algorithm above on an array with just three items:

```a showLineNumbers
InsertionSort(array A[0..2])
    for(i = 1 to 2)
        tmp = A[i]
        j = i
        while(j > 0 && tmp < A[j - 1])
            A[j] = A[j - 1]
            j--
        A[j] = tmp
```

If the code above is running, then the outcomes of the comparisons between elements from `A` tell us everything there is to know about what is happening in the code. So, if the first comparison comes out true (i.e., line `5`), then the first two items of the array will get swapped; otherwise, they won't get swapped. Either way, we won't enter that while loop a second time, until we are in the second pass of the outer for loop.

An ordered list of true/false outcomes for the comparisons tells us everything that there is to know about what happens in the code, even without a list of what was compared. The first comparison is between the first two elements, and the second comparison is between the third element and which of the first two elements is smaller, assuming they are different. If that second comparison comes out false, then there isn't a third comparison. If the first two comparisons are false, then the numbers given to us were already in increasing order.

This is what we're talking about when we say a *comparison-based* sorting algorithm. The important, data-driven *forks* in the code happen because two different elements are compared against each other, and the outcome of that comparison determines what will happen next in the code. Insertion, bubble, selection, heap, merge, and quick sorts are all comparison-based sorting algorithms. And there are more. They are general sorting algorithms that can sort any inputs as long as input values can be compared to each other.

With just $3$ items, we know that we go through that outer loop twice. Let's get rid of that loop:

```a showLineNumbers
InsertionSort(array A[0..2])
    i = 1
    tmp = A[i]
    j = i
    while(j > 0 && tmp < A[j - 1])
        A[j] = A[j - 1]
        j--
    A[j] = tmp
    i = 2
    tmp = A[i]
    j = i
    while(j > 0 && tmp < A[j - 1])
        A[j] = A[j - 1]
        j--
    A[j] = tmp
```

For the comparisons inside the while loop, what happens depends on the outcome of those comparisons. Let's get rid of those loops too, while keeping the same comparisons between the same elements in the same order, but the rest of the code looks different:

```a showLineNumbers
InsertionSort(array A[0..2])
    x = A[0], y = A[1], z = A[2]
    if(x <= y)
        if(y <= z)
            A[0] = x, A[1] = y, A[2] = z            x <= y <= z
        else
            if(x <= z)
                A[0] = x, A[1] = z, A[2] = y        x <= z <  y
            else
                A[0] = z, A[1] = x, A[2] = y        z <  x <= y
    else
        if(x <= z)
            A[0] = y, A[1] = x, A[2] = z            y <  x <= z
        else
            if(y <= z)
                A[0] = y, A[1] = z, A[2] = x        y <= z <= x
            else
                A[0] = z, A[1] = y, A[2] = x        z <  y <  x
```

The code above is ugly, but we could write it once we we know `if`/`else` statements without even knowing loops. It has the original comparisons, and they will be executed in the same order as the original code, starting with the first two items. But all comparisons are now written explicitly.

If we consider running insertion sort on `[1, 3, 2]`, then we can see the three comparisons the code will perform:

```a
InsertionSort(array A = [1, 3, 2])
    #highlight-next-line
    x = 1, y = 3, z = 2
    #highlight-success-next-line
    if(1 <= 3)
        #highlight-error-start
        if(3 <= 2)
            A[0] = x, A[1] = y, A[2] = z            x <= y <= z
        #highlight-error-end
        #highlight-success-start
        else
            if(1 <= 2)
                A[0] = 1, A[1] = 2, A[2] = 3        1 <= 2 <  3
        #highlight-success-end
            else
                A[0] = z, A[1] = x, A[2] = y        z <  x <= y
    else
        if(x <= z)
            A[0] = y, A[1] = x, A[2] = z            y <  x <= z
        else
            if(y <= z)
                A[0] = y, A[1] = z, A[2] = x        y <= z <= x
            else
                A[0] = z, A[1] = y, A[2] = x        z <  y <  x
```

Like any comparison-based sort, it's the relative sizes of the inputs that are important, not the absolute values. So, insertion sort will go through the same steps to sort `[11, 13, 12]` as it does for `[1, 3, 2]`. The problem here is that this is just a horrific way to see what's happening. So let's introduce decision trees.

### Decision tree for insertion sort

Below is a decision tree for insertion sort on $3$ items:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f84.png').default} />
</div>

It might look like some kind of data structure, but it isn't. It's just a more visual representation of which elements get compared by the code. The non-leaf nodes of the decision tree represent the comparisons, and the two children for a node represent the two possible outcomes of its comparison. The leaves represent final outcomes for the program.

So we can again look at what happens on input `[1, 3, 2]`, and see which leaf we get to:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f85.png').default} />
</div>

The path above, from the decision tree root to a leaf, represents running the algorithm on some particular set of data. Each inner node on the path represents a comparison that the algorithm executes, in that order. The length of the path is the number of comparisons the algorithm executes for that input.

It's easy to see above that while `[1, 3, 2]` has $3$ comparisons, other inputs like `[2, 1, 3]`, would only have two.

### Other decision trees

Different sorting algorithms have different decision trees. We just saw the decision tree for insertion sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f86.png').default} />
</div>

Let's look at the decision tree for bubble sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f87.png').default} />
</div>

We see from the decision tree above that bubble sort *always* performs $3$ comparisons, although for two possible inputs, the last comparison doesn't tell us anything we didn't already know:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f88.png').default} />
</div>

Let's consider now the decision tree for selection sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f89.png').default} />
</div>

Selection sort is only broadly defined in <BibRef id='TC2022' pages='p. 33'></BibRef>, but for our implementation (looping from front, select min element, swap to front), we have another occurrence of making a comparison that doesn't tell us something we don't already know:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f90.png').default} />
</div>

We also get this weird 7th outcome, where if the first two elements are equal but larger than the third, it sorts but unstably puts the second item before the first:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f91.png').default} />
</div>

Weird stuff isn't exclusive to quadratic sorts. Heap sort has two of those useless comparisons, a bunch of unstable outputs:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f92.png').default} />
</div>

And the strange leaf node with two labels, `x <= z < y` and `x < z = y`, we hit if the first value is strictly less than the second, and the third is somewhere between those two, but if all three are equal, then we go to a completely different node (far right leaf node with label `y <= z <= x`).

We wouldn't *choose* to make redundant comparisons if we were making a decision tree for $3$ items from scratch, but to write code that cleanly works on any number of inputs using natural operations on a heap, some comparisons can be duplicated. 

Let's now consider the decision tree for merge sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f93.png').default} />
</div>

The tree above is the decision tree for both top-down and bottom-up merge sort. Those are different algorithms, with different trees for $5$ or more elements, but for $4$ or less, they have the same trees. Meanwhile, for just $2$ items, if we are only doing one comparison, then there are pretty much only $2$ possible trees, depending on if we are stable on $2$ equal items or not.

Finally, let's look at the decision tree for quick sort:

<div align='center' className='centeredImageDiv'>
  <img width='700px' src={require('./f94.png').default} />
</div>

We can see its instability in the output above (leaf node on bottom with label `x < y <= x`).

### Bound for 3 items

Let's recall all of the decision trees remarked on above:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f95.png').default} />
</div>

Some of these trees *always* take $3$ comparisons, while others sometimes use $2$ and other times use $3$. The real question is whether or not we can make a decision tree with at most $2$ comparisons. And the answer is *no*.

Each of the trees above has at least $6$ leaf nodes, because if we give the program $3$ distinct values like `1`, `2`, and `3`, then there are `6` possible permutations that we can use to order the input. Each comparison has at most $2$ children, for the possible outcomes of the comparison. If we try to make a binary tree, with at most $2$ comparisons, then it gives us a tree with height at most $2$, with at most $4$ leaves. To get $6$ permutations into $4$ leaves, at least $2$ permutations must go to one leaf, and the algorithm will do the exact same thing for both of those permutations. If we reorder $2$ different permutations in the same way such as, "keep the first element first but swap the other two," at most one of those two permutations can be sorted afterwards. So every permutation needs to get to its own leaf. It boils down to the problem that $6$ is not less than or equal to $4$. So no matter what our comparison-based sorting algorithm is, for $3$ items, its decision tree needs height at least $3$, and some inputs will require $3$ comparisons. 

Let's recap these seemingly dense observations &#8212; to sort $3$ items:

- $3$ distinct inputs have $3! = 6$ permutations
- At most $2$ comparisons: at most $2^2 = 4$ possible different outcomes
- No two permutations can be sorted by getting to the same outcome leaf
- $6\not\leq 4$ (proof left as an exercise)
- With height $2$, each permutation cannot have its own outcome.
- We need at least $3$ comparisons (worst case) to sort $3$ items.

### Bound for n items

Finally the finale: we don't want to sort just $3$ items, we want to sort $n$ items. Great. Assume that we have some comparison-based sorting algorithm for sorting $n$ items. Instead of just $6$ permutations, $n$ items can come in $n!$ permutations, so the decision tree for the algorithm will have to have at least $n!$ leaves. If the decision tree's height is $h$, then it will have at most $2^h$ leaves. So, $2^h$ has to be at least $n!$, and $h$ has to be at least order $n\lg n$.

If the tree has height order $n\lg n$, that means that, in the worst case, the decision tree makes order $n\lg n$ comparisons, so the algorithm takes at least $n\lg n$ time; that is, no matter how clever it might be, any comparison-based sorting algorithm will take at least $n\lg n$ runtime in the worst case.

That's it. That's the whole argument. It doesn't prove that $n\lg n$ comparisons are sufficient, it just proves it as a lower bound. Of course, we know that order $n\lg n$ comparisons are sufficient, because merge sort and heap sort both follown that bound. Consequently, we won't find a general sorting algorithm asymptotically faster than them.

Let's recap &#8212; how about a height $h$ tree to sort $n$ items:

- $n$ distinct inputs have $n!$ permutations
- At most $h$ comparisons: at most $2^h$ possible different outcomes
- Need $h$ large enough to make $2^h\geq n!$
- Need $h\geq \lg n! = \Omega(n\lg n)$
- Every comparison-based sorting algorithm needs $\Omega(n\lg n)$ worst case time
- This doesn't prove that $\Theta(n\lg n)$ comparisons are sufficient
- Merge sort and heap sort prove $O(n\lg n)$ comparisons are sufficient
- Comparison-based sorts cannot asymptotically beat merge or heap sort

## Linear time sorting - counting sort, radix sort, and bucket sort

### Introduction

At this point, we should have seen a few general-purpose $O(n\lg n)$ *comparison-based* sorting algorithms. For example:

- [Selection sort](https://en.wikipedia.org/wiki/Selection_sort)
- [Bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)
- [Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)
- [Merge sort](https://en.wikipedia.org/wiki/Merge_sort)
- [Heap sort](https://en.wikipedia.org/wiki/Heapsort)
- [Quick sort](https://en.wikipedia.org/wiki/Quicksort)

We should have also seen [an argument](#comparison-based-lower-bound) for why comparison-based sorting algorithms cannot beat $O(n\lg n)$ for worst-case runtime.

The three algorithms we're about to discuss, namely [counting sort](https://en.wikipedia.org/wiki/Counting_sort), [radix sort](https://en.wikipedia.org/wiki/Radix_sort), and [bucket sort](https://en.wikipedia.org/wiki/Bucket_sort), run faster, but they aren't *comparison-based*.

To use the algorithms non-comparison-based algorithms referenced above, we need to know something more about the keys we will be sorting. Exploiting that extra knowledge lets us sort more quickly, but it doesn't work in all cases like a general, comparison-based sort.

We will start with counting sort, followed by radix sort, which frequently uses counting sort. Bucket sort is third, and we will also see how the ideas of bucket sort and counting sort kind of overlap, even if they are different algorithms.

### Counting sort

Counting sort applies when the keys come from a small set of integers, maybe ranging from 0 up to some constant (e.g., input from a small range of $k$ integers, $0$ through $k-1$).

For example, consider the following array of integers, where integer values range from $0$ to $4$, inclusive:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f51.png').default} />
</div>

For the simple case above, we start by just counting the number of each key that we have. Assuming that we index arrays from $0$, we can just use each key to increment that counter:

<div align='center' className='centeredImageDiv'>
  <img width='275px' src={require('./f52.png').default} />
</div>

As shown above, once we finish counting the number of keys for each integer, we already have an idea of what the final sorted array will look like: 

$$
[\;
  \overbrace{\underbrace{0, 0, 0, 0, 0}_{\text{count of 0s (5)}},
  \underbrace{1}_{\text{count of 1s (1)}},
  \underbrace{2}_{\text{count of 2s (1)}},
  \underbrace{3, 3, 3, 3}_{\text{count of 3s (4)}},
  \underbrace{4, 4, 4, 4}_{\text{count of 4s (4)}}}^{\text{all items in sorted order based on count frequency}}
\;]
$$

That is, the final sorted array starts with five items of key `0`, one item of key `1`, one item of key `2`, four items of key `3`, and finally four items of key `4`.

We will make a new array for our sorted list:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f53.png').default} />
</div>

If we just wanted a list of *keys* in sorted order, then we could use the counter information to fill the empty array above: just loop through the counters, and write that many of each key: write five `0`s, then one `1`, one `2`, four `3`s, and four `4`s, and then we're done:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f54.png').default} />
</div>

The problem with that approach is that even if we have integer keys, we generally aren't sorting *integers*; we're sorting more complex things, or objects, which happen to have integer key values. We don't want to write down the number `0` in that first slot &#8212; we actually want to have a *reference* to the object with key value `0`.

Let's go back to right after we finished counting:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f51.png').default} />
</div>

<div align='center' className='centeredImageDiv'>
  <img width='275px' src={require('./f52.png').default} />
</div>

The rest of the algorithm is a way to do those reference copies cleanly and efficiently. Now, for the counting array above, the `5` just stands for the number `5`, a *count* of how many items have key `0`. It wasn't copied from anywhere &#8212; it was just incremented from the value `4`. Using the counting sort version in CLRS <BibRef id='TC2022' pages='p. 209'></BibRef>, the next step is to just replace each counter with the sum of all counters up to that one, by iterating over the counting array, left to right, and adding the previous value to each count:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('./f55.gif').default} />
</div>

The transformations above leave us with the following counting array:

<div align='center' className='centeredImageDiv'>
  <img width='275px' src={require('./f56.png').default} />
</div>

Now, that value `7` in the `2` slot means that there are `7` values in the array of `2` or less, and we know that they will go into indices `0` to `6`, in the sorted array. The elements with key value `3` will end up in indices `7` to `10`. Each position holds one index place past where the last object with that value will go in the array. This off-by-one nature is because we're assuming that we index arrays from `0`. If, instead, we indexed from `1`, then the number in each key slot would match the last position.

So the last part of the algorithm goes through the *original*, unsorted array, in reverse order:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f51.png').default} />
</div>

It looks up the key, in this case `0` (at index position `14`), and looks at the array of counters. It sees a `5` in the count array, so it knows that object with key `0`, the last one, belongs in position `5 - 1 = 4`. In the animation below, when we see the key moving from the original, unsorted array, that is a copying of the actual reference, it isn't just the number. So the algorithm decrements the `0` counter from the counts array (from `5` to `4`), and then uses that value as an index where the reference gets copied:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f57.gif').default} />
</div>

That decrement is important. The highest indexed key `0` object went into index `4`, but there are more objects with key `0`, and we don't want to put them in the same place. When we place that last `0` key object, we modified the index so that now we are ready to place the second highest indexed `0` key object. 

We continue with the previous item from the original array, with key value `4`, copy it into the sorted array:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f58.gif').default} />
</div>

And then we run into another object with key `0`. It's a good thing we decremented our `0` counter because now we don't overwrite that first object we copied down:

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f59.gif').default} />
</div>

Great. We continue on, through all of the original objects, looking up their keys, using that key to look up and decrement the appropriate slot in the counter array, which now stores an index, and using it to give a position to copy the object in the sorted array. 

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f60.gif').default} />
</div>

Everything slots in there nicely, and when we finish, now that the counters have all been decremented, they hold the *first* index of each key type: 

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('./f61.png').default} />
</div>

The first `0` key object is in index `0`, the first `3` key object is in index `7`, and so on.

Let's recap what we've discussed of counting sort so far (assuming we have an input from a small range of $k$ integers, $0$ to $k-1$):

- Loop through items, incrementing appropriate counter for each
- Loop through count, adding previous value, to get summation of counts
- Loop through items in reverse. For each item:
  + Use item key to index the count array
  + Decrement that count array value
  + Use decremented value as array index to copy item into sorted array

#### Stability

Here's a question: why did we walk through the original array in reverse order? If we had walked through it left to right, but had done the same counter lookup, decrement, and copy to that position, that last array would still be sorted. This brings us to the concept of *stability* in sorting.

We say that a sort is *stable* if, for two objects with the same key value, they don't swap orders. So, if there is a tie, we don't get one thing jumping in front of something that it was behind. The *original order* is the tie-breaker.

A different version of counting sort doesn't need the third array (i.e., the sorted array we come up with separately), so it uses less extra space, only linear space in the number of counters (we just overwrite the original array), but that version of counting sort isn't stable. We prefer our sorts to be stable &#8212; it's not required, but it's preferred and we'll see why shortly.

By traveling through the unsorted array from the back to the front, while decrementing the counters, the sort is stable. If we went front to back, our sort would be anti-stable, everything would always flip orders in case of a tie. Now, it wouldn't be too hard to make a variant where, before we started copying values, we get the counter array to look like it looked above, namely

<div align='center' className='centeredImageDiv'>
  <img width='300px' src={require('./f62.png').default} />
</div>

where each counter holds the index of the first position of objects with that key. If we did that, then we could go through the original array, left to right, incrementing counters as we use them, instead of going right to left, decrementing them before we use them. But the decrementing version probably has one less step of manipulation of those counters, so it's marginally faster.

#### Counting sort performance

Great. So what's the runtime? Well, we allocate and initialize $k$ counters if the numbers go from $0$ to $k-1$. That takes time linear in $k$. We step through the unsorted array in both the first and third step, and that takes time linear in the size of the array. And we accumulate all of those counters in the second step, which takes time linear in the range again. Thus, it takes time linear in the size of the input plus the range: $\Theta(n+k)$ time and space. If the range is a constant, that is linear in the input size. Even if the range is, say, linear in the input size, so we are sorting $n$ records with value $0$ to $n-1$, or $2n$, it still takes time (and space) linear in the size of the input.

While we can say that counting sort takes linear time, if the range is bigger than the size of our input, then it starts to get a bit impractical. Thus, if we're sorting numbers up to $100n$, it still officially takes linear time and space, but that's a lot of space. We know some order $O(n\lg n)$ sorts, with pretty small hidden constant terms, and $n$ has to be pretty big before $\lg n$ starts comparing to $100$, so we really don't want to use counting sort in practice if the range is that big. 

### Radix sort

Radix sort helps us extend the limiting range encountered in counting sort a bit more practically. It's a pretty old sorting technique. How old? Something like radix sort was used to sort punched cards well over 100 years ago. The intuition for radix sort is that we can run counting sort on each digit of the input separately.

Suppose we're sorting numbers from $0$ to $999$:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f63.png').default} />
</div>

Then we could first sort them one digit at a time. Each digit just goes from `0` to `9`, so counting sort would work great.

#### Most significant digit first

We'll start with the "most significant digit first" version, and we'll see the least significant digit version from CLRS <BibRef id='TC2022' pages='p. 211'></BibRef> after that.

If we are first sorting by the 100s digit, then we will need to pad numbers less than `100` with a `0` in front. That is, suppose we take a look at the values in indices `0` through `5` in the array pictured previously:

$$
[19, 808, 849, 438, 730, 339, \ldots]
$$

What would the key value be for the first element, $19$, when we're sorting first by the 100s digit? The number $19$ doesn't even have a 100s digit. Thus, we need to pad it with a $0$. If we pad values appropriately, then we can highlight the key value as the first digit for each number (i.e., the 100s digit):

$$
[
  \overbrace{{\color{red}{0}}19}^{\text{key 0}}, 
  \overbrace{{\color{red}{8}}08}^{\text{key 8}}, 
  \overbrace{{\color{red}{8}}49}^{\text{key 8}}, 
  \overbrace{{\color{red}{4}}38}^{\text{key 4}}, 
  \overbrace{{\color{red}{7}}30}^{\text{key 7}}, 
  \overbrace{{\color{red}{3}}39}^{\text{key 3}}, 
  \ldots
]
$$

For the sample above, our count array would look as follows:

$$
[
  \overbrace{1}^{\text{key 0}},
  \overbrace{0}^{\text{key 1}},
  \overbrace{0}^{\text{key 2}},
  \overbrace{1}^{\text{key 3}},
  \overbrace{1}^{\text{key 4}},
  \overbrace{0}^{\text{key 5}},
  \overbrace{0}^{\text{key 6}},
  \overbrace{1}^{\text{key 7}},
  \overbrace{2}^{\text{key 8}},
  \overbrace{0}^{\text{key 9}}
]
$$

Returning to our original array, we first note the value contained at each index:

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f64.png').default} />
</div>

Then we note the corresponding key value based off the digit in the 100s place for each value (just like above):

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f65.png').default} />
</div>

We use counting sort as we did previously, counting the number of times each key value occurs:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f66.gif').default} />
</div>

Once we've made a full pass for the frequency count, we adjust the counts array (so we can use decrements to construct the stable sorted array of items by the 100s place):

<div align='center' className='centeredImageDiv'>
  <img width='900px' src={require('./f67.png').default} />
</div>

Once the counts array is adjusted, as above, then we can construct the sorted array by the 100s place:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f68.gif').default} />
</div>

The outcome is a new list of values, where all values are sorted by the 100s digit, lowest to highest:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f69.png').default} />
</div>

The following table summarizes our findings nicely from our first use of counting sort on the hundreds digit:

| Hundreds digit | Values | Count |
| :-: | :-- | :-: |
| `0` | `19`, `57` | `2` |
| `1` | `158`, `122`, `166` | `3` |
| `2` | `223` | `1` |
| `3` | `339` | `1` |
| `4` | `438`, `470`, `468`, `443`, `413`, `444` | `6` |
| `5` | `523` | `1` |
| `6` | `626`, `621` | `2` |
| `7` | `730`, `773`, `717`, `711` | `4` |
| `8` | `808`, `849`, `804`, `854`, `840` | `5` |
| `9` |  | `0` |

To recap, we run counting sort on the hundreds digit, and after that finishes, we have all of the numbers, in blocks, sorted by their hundreds digit (as shown in the picture above). We would then want to sort each of those blocks independently by their tens digit.

That's a good amount of bookkeeping. Probably the easiest way to do it is to use recursion to organize everything. This is kind of like quick sort, except here we might have 10 recursive blocks to sort instead of just 2. So, on the numbers just obtained by our first use of counting sort, we would sort the first two numbers under 100, `19` and `57`, by their tens digit. And then the next three numbers in the 100s, `158`, `122`, `166`. And eventually five numbers in the 800s: `808`, `849`, `804`, `854`, `840`. There aren't any 900s here, so we could skip that call, and any of the recursive calls it would have made. 

Each recursive call to sort by the tens digit will then make recursive calls to sort by the units digit, though we can just sort by insertion sort once a subproblem is small enough.

This version is really helpful if we are sorting lexicographically, which is a generalization of alphabetical or dictionary order for strings. If we are dealing with strings, then they're not really digits, but we can map each character to an integer, use counting sort to sort by first character, and then recursively sort strings that start with the same character. For strings, we don't need to fill in leading values to buffer them to be the same length. This approach relates to radix tree and trie data structures.

Let's recap our radix sort approach using the most significant digit first:

- Sort by most significant digit with linear time counting sort (pad front with `0`'s if it has fewer digits)
- Recursively sort each value's block by next most significant digit
- Optimization: once recursive blocks get small enough, use insertion sort
- Works best for lexicographical ordering
  + Can sort by characters instead of digits
  + No padding needed to make strings equal lengths
  + Related to radix trees and tries

#### Least significant digit first

If we are sorting numbers (i.e., instead of strings), then the other choice is to actually sort by the *least* significant digit first, and then not worry about separating blocks for subproblems. 

We run counting sort, and we use the units digit as our key:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f70.gif').default} />
</div>

After making a first pass with counting sort, using the units digit as our key, we have the list sorted by units digit:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f71.png').default} />
</div>

But the difference from before is that now we take that sorted list, ignore the fact that we sorted it already (by the units digit), and then sort the entire list again by the tens place; that is, we reset the count array

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f72.png').default} />
</div>

and then also reset the key value for each number to reflect its digit in the tens place:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f73.png').default} />
</div>

We then proceed just as we did before (counting occurrence of each key, incrementing count array, then copying to sorted array by decrementing):

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f74.gif').default} />
</div>

We then do the same thing for the 100s digit:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f75.gif').default} />
</div>

The outcome is then the final sorted array:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f76.png').default} />
</div>

In the animations above, we reuse the sorted array after the first pass instead of allocating it fresh each time. Why bother sorting by the units digit and then the tens digit just to re-sort it all? Well, `700` anything is bigger than `500` anything, so ignoring lower digits is fine. The only time the other digits come into play is if two values have the same 100s digit. If we're sorting two numbers in the 500s, then we want `580`s to come before `590`s. But we just finished running counting sort on the tens digit, so all `80`s were before all `90`s, and counting sort is stable, so it will leave `580`s before `590`s.

For `793` and `799` in our example array, the units digit sort put the `3` before the `9`, and both the 10s and 100s digit sorts are stable, so `793` will end up before `799`.

It's important that counting sort is stable.

Let's recap what we've seen so far for this version of counting sort (i.e., using the least significant digit first):

- Sort list by least significant digit with linear time (stable) counting sort
- Sort *entire* list again by next least significant digit
- Repeat on increasingly significant digits until we run out of digits
- Stability: equal keys will be sorted by less significant (previously sorted) digits

We don't have to treat numbers as decimal, base 10 numbers when we run radix sort. We can treat the number has having base $k$, or radix $k$, with $d$ digits. We can do $d$ counting sort passes over the number, sorting over $0$ to $k-1$ on each pass. Note that $k$ doesn't even have to be a constant: if we are sorting numbers $0$ to $n^3-1$, then we can treat those numbers as base $n$ numbers, and do $3$ passes over them to sort, in linear total time. That example shows how radix sort expands the class of inputs that we can sort in linear time, but it's still going to be best at handling something like limited integers or strings, so it's still not as general a sort as, say, quick sort. It also uses extra space compared to quick sort, which could limit its performance for large enough inputs.

In short:

- Can use any radix (base): $10$, $2$, $k$, characters, etc.
- For $d$ passes, takes $\Theta(nd)$ time
- Can even use base $n$

### Bucket sort

This finally brings us to our next linear time sort: bucket sort. Bucket sort doesn't assume that the input is an *integer*, but it does assume that it is uniformly distributed. So, in its most basic form, we assume that all of the inputs are randomly and uniformly chosen from real numbers over some range.

In the animations below, we'll assume that the numbers are distributed from `0` up to `100` (the following numbers are floating point numbers, and there's a total of twenty of them):

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f77.png').default} />
</div>

So what we do is that if we have $n$ items to sort (i.e., $n=20$ above), then we break our range into $n$ different equal-sized parts, and we treat each part as a bucket for any numbers in that subrange:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f78.png').default} />
</div>

We'll use linked lists to store the elements in each bucket:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f79.png').default} />
</div>

Thus, based on the value, we can just jump right to the correct bucket, and append that entry onto the end of that linked list in constant time per entry:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f80.gif').default} />
</div>

When that finishes, how should the buckets look? Because the numbers were uniformly distributed, if we have a lot of items, then we should expect over $1/3$ of the buckets to be empty, over $1/3$ of the buckets to have just one item, and almost $1/5$ of the buckets to have two items. Over 90% of the items are in buckets of size $3$ or less.

More generally, as $n$ grows large, we expect approximately:

- $n/e$ buckets with $0$ items
- $n/e$ buckets with $1$ item
- $n/2e$ buckets with $2$ items
- $n/6e$ buckets with $3$ items
- $n/k!e$ buckets with $k$ (constant) items

Said another way, as $n$ grows large, we expect approximately:

- Over 36% of items in buckets with 1 item
- Over 73% of items in buckets with 2 or fewer items
- Over 91% of items in buckets with 3 or fewer items
- Over 98% of items in buckets with 4 or fewer items
- Over 99.5% of items in buckets with 5 or fewer items

Returning to our consideration of what happens once each item is placed in its appropriate bucket, it should be clear that each bucket is unsorted, but everything in one bucket goes before anything in the next bucket. Thus, we can sort the buckets *independently* with insertion sort. Even though insertion sort is officially a quadratic sort, it's really efficient for sorting small sets. So we use insertion sort to sort every bucket (below, the first notable change in order occurs for the bucket with label `55`):

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f81.gif').default} />
</div>

A precise performance analysis may be found in CLRS <BibRef id='TC2022' pages='p. 217'></BibRef>, but it shouldn't be a shocking outcome that the sum of the square of the expected distribution of bucket sizes is linear, since almost all of the items are in buckets size $5$ or less, and the expected number of buckets of each size just keeps decreasing as the size gets bigger.

Oncee we have each bucket sorted individually, we can just go through them and copy them back into our original array. Below, we show the linked lists being concatenated to each other instead:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f82.gif').default} />
</div>

A third option is to combine the lists without sorting each one individually, and *then* run insertion sort on the combined list, which is *almost* sorted. Because the combined list is almost sorted, insertion sort will finish the job quickly.

Each of the options above takes expected linear total time.

Quick recap of bucket sort:

- Useful when data is randomly chosen from a uniform distribution
- To sort $n$ values, break range into $n$ equal "buckets"
- Use value to compute index of its bucket in constant time
- Sort each bucket with insertion sort or once after appending buckets
- $O(n)$ space and expected run time total

### Broken lower bound?

So, it is fine to say that these sorts run in linear time, but we should reconcile that with the $O(n\log_2 n)$ lower bound on comparison-based sorts. So what happens here? When we look at a number, in constant time, we can figure out which bucket it goes into. There are $n$ buckets, but in constant time we can pick one of them, because we use the numeric value to find an index key for the bucket (in constant time, bubble sort has "$n$-way forking"). Unlike comparison-based sorts, that isn't a two-way fork, less than or greater than. In constant time, we fork $n$ ways. With a decision tree using two-way forks, to get to the $n!$ possible permutations of $n$ items, the tree would need order $\log_2 n!$ depth to have enough leaves in the tree for all of the permutations. But with an $n$-way fork, $\log_n n!$ is order $n$, only giving us a linear lower bound on the runtime. We get a logarithmic speed up in the lower bound. Of course, we can't really sort without looking at the data, so we always expect a linear lower bound to sort with just one processor.

Counting sort also uses a bigger fork to beat the $n\log_2 n$ lower bound, and, of course, radix sort uses counting sort.

To summarize:

- In constant time, bucket sort has $n$-way forking
- $\log_2 n! = \Omega(n\log_2 n)$
- $\log_n n! = \Omega(n\log_n n) = \Omega(n)$
- Counting sort on $k$ values uses $k$-way forking
  + Only $k^n$ possible inputs, not $n!$
  + $\log_n k^n = \Omega(n\log_k k) = \Omega(n)$

### Bucket sort for counting sort input

One last thing to mention: if we have an input that looks like counting sort applies, then we can still use bucket sort, with one bucket per key value. Remember, for counting sort, we know the values are just in some fixed range of integers, but it doesn't make any assumptions about distribution like bucket sort does. So now we have all these unsorted buckets, but everything in one bucket goes before anything in the next bucket, and because all entries in a bucket have the same key, we don't need to sort each bucket afterwards. Each bucket is already sorted with just one value. Even if we do run insertion sort, it runs in linear time if all inputs have the same key anyway. So everything finishes in linear time. 

We can see all of this unfold in the animation below:

<div align='center' className='centeredImageDiv'>
  <img width='850px' src={require('./f83.gif').default} />
</div>

To recap:

- One bucket per key value
- Items might be distributed unevenly
- No need to sort each bucket, all values for a bucket have the same key
- $\Theta(n)$ (even for the worst case) for $O(n)$ range

## LeetCode implementations

The code in each of the following playgrounds can be used to successfuly pass/solve the following LeetCode problem: <LC id='912' type='long' ></LC>.

### Merge sort

[Top-down](#merge-sort-top-down-optimized) merge sort:

<CodeEditor initialCode={snippet9} editorSettings={{ height: '50vh' }} foldedRegions={[[6,28],[30,43]]} />

[Bottom-up](#merge-sort-bottom-up-optimized) merge sort:

<CodeEditor initialCode={snippet10} editorSettings={{ height: '50vh' }} foldedRegions={[[6,29],[31,41]]} />