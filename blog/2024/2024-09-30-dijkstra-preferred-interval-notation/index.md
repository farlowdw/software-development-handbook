---
title: Dijkstra's preferred interval notation
draft: false
description: This post explores interval notation as preferred by Edsger Dijkstra.
tags: 
  - Intervals
  - Dijkstra
  - Sliding Window
  - Tutorial
keywords: 
  - interval
  - sliding window
  - dijkstra
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

Dijkstra's argument that numbering should start at zero begins with an analysis of a subsequence of natural numbers, namely $2, 3, \ldots, 12$, and what *interval notation* should be preferred most to denote this sequence. Exploring his argument in more detail allows for greater understanding as to why the half-interval notation $[a, b)$ is to be preferred in a variety of programming contexts (e.g., implementing sliding windows).

<!-- truncate -->

## Dijkstra's argument (explored)

Dijkstra's [original argument](#og-argument) may be viewed in its entirety below, but for the sake of clarity, let's consider the full subsequence of natural numbers denoted by $2, 3, \ldots, 12$ (the index of each value is also included as if the values were part of a 0-indexed array):

```python
# index: 0  1  2  3  4  5  6  7  8   9   10
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

Dijkstra presents the following four conventions that are open to us to denote the subsequence of natural numbers above:

- (a) $2\leq i < 13$
- (b) $1 < i \leq 12$
- (c) $2\leq i \leq 12$
- (d) $1 < i < 13$

Using [interval notation](https://en.wikipedia.org/wiki/Interval_(mathematics)), the expressions above may be captured succinctly as follows:

- (a) $[2, 13)$: half-open interval
- (b) $(1, 12]$: half-open interval
- (c) $[2, 12]$: closed interval
- (d) $(1, 13)$: open interval

Let's now consider, in turn, various elements of Dijkstra's argument for a better understanding of what he was trying to communicate and why option `(a)` is to be preferred. Each section will depict the desirable property by means of an excerpt from Dijkstra's [original note](#og-argument) (along with the preferred conventions to satisfy that property) followed by a discussion to solidify why the preferred conventions are actually preferred.

### Difference between bounds equals length of subsequence

> The observation that conventions a) and b) have the advantage that the difference between the bounds as mentioned equals the length of the subsequence is valid.
>
> **Preferred:** `(a)` and `(b)`

First, note that the length of the subsequence of natural numbers

```python
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

is $11$ (i.e., there are $11$ numbers in the subsequence above). Now consider the difference in value between the upper and lower bound for each of the previously mentioned conventions:

- (a) $2\leq i < 13\implies 13 - 2 = {\color{red}{11}}$
- (b) $1 < i \leq 12\implies 12 - 1 = {\color{red}{11}}$
- (c) $2\leq i \leq 12\implies 12 - 2 = 10$
- (d) $1 < i < 13\implies 13 - 1 = 12$

Only conventions `(a)` and `(b)` result in the difference between the upper and lower bound equaling the length of the subsequence. This is a desirable property.

### Adjacent subsequences share boundary values

> So is the observation that, as a consequence, in either convention two subsequences are adjacent means that the upper bound of the one equals the lower bound of the other.
>
> **Preferred:** `(a)` and `(c)`

Consider the following adjacent subsequences/subarrays of the original sequence:

```python
[[2, 3] [4, 5, 6] [7, 8] [9, 10, 11, 12]]
```

How would these subsequences be expressed using each convention? Let's just focus on adjacenct subsequences `[4, 5, 6]` and `[7, 8]` to see the desirable property Dijkstra highlights:

- (a) `[4, 5, 6]`: $4\leq i < {\color{red}{7}}$; $\qquad$ `[7, 8]`: ${\color{red}{7}}\leq i < 9$
- (b) `[4, 5, 6]`: $3 < i\leq {\color{red}{6}}$; $\qquad$ `[7, 8]`: ${\color{red}{6}} < i\leq 8$
- (c) `[4, 5, 6]`: $4\leq i\leq 6$; $\qquad$ `[7, 8]`: $7\leq i\leq 8$
- (d) `[4, 5, 6]`: $3 < i < 7$; $\qquad$ `[7, 8]`: $6 < i < 9$

Note how conventions `(a)` and `(b)` share the property that two subsequences being adjacent means the upper bound of one equals the lower bound of the other (highlighted in red above).

### Exclusion of the lower bound can lead to unnatural lower bound

> There is a smallest natural number. Exclusion of the lower bound &#8212; as in b) and d) &#8212; forces for a subsequence starting at the smallest natural number the lower bound as mentioned into the realm of the unnatural numbers. That is ugly, so for the lower bound we prefer the $\leq$ as in a) and c).
>
> **Preferred:** `(a)` and `(c)`

What is the smallest natural number? [Per Wikipedia](https://en.wikipedia.org/wiki/Natural_number):

> In mathematics, the natural numbers are the numbers $0$, $1$, $2$, $3$, and so on, possibly excluding $0$.

So should we consider the smallest natural number to be $0$ or $1$? Dijkstra clearly believes $0$ should be considered a natural number (the title of the [original typed post](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD831.html) is *Why numbering should start at zero*), but the choice between $0$ and $1$ above isn't important because the consequence is the same: *starting* a subsequence at the smallest natural number, $0$ or $1$, will result in the lower bound being forced into the realm of "unnatural" or non-natural numbers.

We can demonstrate how the choice of $0$ or $1$ as the smallest natural number does not impact Dijkstra's argument:

- Let ${\color{red}{1}}$ be the smallest natural number, and consider the following subsequence of natural numbers: $1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12$. Each convention would express this subsequence of natural numbers as follows:
  + (a) ${\color{red}{1}}\leq i < 13$
  + (b) $0 < i\leq 12$
  + (c) ${\color{red}{1}}\leq i\leq 12$
  + (d) $0 < i < 13$
- Let ${\color{red}{0}}$ be the smallest natural number, and consider the following subsequence of natural numbers: $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12$. Each convention would express this subsequence of natural numbers as follows:
  + (a) ${\color{red}{0}}\leq i < 13$
  + (b) $-1 < i\leq 12$
  + (c) ${\color{red}{0}}\leq i\leq 12$
  + (d) $-1 < i < 13$

Note how choosing $0$ or $1$ as the smallest natural number does not impact how the lower bound for conventions `(a)` and `(c)` remains in the realm of natural numbers while the lower bound is pushed into the realm of unnatural numbers for conventions `(b)` and `(d)`.

### Inclusion of the upper bound can lead to unnatural upper bound

> Consider now the subsequences starting at the smallest natural number: inclusion of the upper bound would then force the latter to be unnatural by the time the sequence has shrunk to the empty one. That is ugly, so for the upper bound we prefer $<$ as in a) and d). We conclude that convention a) is to be preferred.
>
> **Preferred:** `(a)` and `(d)`

What does Dijkstra mean when he says including the upper bound would then force the latter to be unnatural *by the time the sequence has shrunk to the empty one*? Let's consider again the possibility that either $1$ or $0$ is the smallest natural number:

- Let ${\color{red}{1}}$ be the smallest natural number, and consider the following subsequence of natural numbers: $1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12$. If we shrink this subsequence down to a single element, specifically the smallest natural number, $1$, then how would each convention express this?
  + (a) $1\leq i < 2$
  + (b) $0 < i\leq 1$
  + (c) $1\leq i\leq 1$
  + (d) $0 < i < 2$

  Let's now shrink the subsequence even more by removing its only element (i.e., $1$, the smallest natural number). This can be reflected in each convention by decrementing the upper bound:

  + (a) ${\color{red}{1}}\leq i < {\color{red}{1}}$
  + (b) $0 < i\leq 0$
  + (c) ${\color{red}{1}}\leq i\leq 0$
  + (d) $0 < i < {\color{red}{1}}$

  The upper bound of ${\color{red}{1}}$ stays in the realm of natural numbers only in conventions `(a)` and `(d)`.
- Let ${\color{red}{0}}$ be the smallest natural number, and consider the following subsequence of natural numbers: $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12$. If we shrink this subsequence down to a single element, specifically the smallest natural number, $0$, then how would each convention express this?
  + (a) $0\leq i < 1$
  + (b) $-1 < i\leq 0$
  + (c) $0\leq i\leq 0$
  + (d) $-1 < i < 1$

  Let's now shrink the subsequence even more by removing its only element (i.e., $0$, the smallest natural number). This can be reflected in each convention by decrementing the upper bound:

  + (a) ${\color{red}{0}}\leq i < {\color{red}{0}}$
  + (b) $-1 < i\leq -1$
  + (c) ${\color{red}{0}}\leq i\leq -1$
  + (d) $-1 < i < {\color{red}{0}}$

  The upper bound of ${\color{red}{0}}$ stays in the realm of natural numbers only in conventions `(a)` and `(d)`.

As shown above, choosing $0$ or $1$ as the smallest natural number does not impact Dijkstra's argument in terms of keeping the upper bound within the realm of natural numbers when the subsequence starting at the smallest natural number is empty.

At this point, all of the desired properties have been discussed, and convention `(a)` is the only convention that satisfies all properties; thus, convention `(a)` is the preferred convention.

### Subscript value to assign a starting element in a sequence

>When dealing with a sequence of length $N$, the elements of which we wish to distinguish by subscript, the next vexing question is what subscript value to assign to its starting element. Adhering to convention a) yields, when starting with subscript $1$, the subscript range $1\leq i < N+1$; starting with $0$, however, gives the nicer range $0\leq i < N$. So let us let our ordinals start at zero: an element's ordinal (subscript) equals the number of elements preceding it in the sequence. And the moral of the story is that we had better regard &#8212; after all those centuries! &#8212; zero as a most natural number.

As noted in the previous section, convention `(a)` was deemed the preferred convention because it was the *only* convention that satisfied a variety of different desirable properties. Thus, the discussion above concerning subscript values is made in the context of convention `(a)` already being the established, preferred convention.

Let's consider again the original subsequence:

```python
# index: 0  1  2  3  4  5  6  7  8   9   10
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

Above, we have a sequence of length $N = 11$, and the subscript range, per convention `(a)`, may be communicated as 

- $1\leq i < 12$, where $1$ is chosen to be the smallest natural number or
- $0\leq i < 11$, where $0$ is chosen to be the smallest natural number.

The second range is arguably nicer &#8212; if we let $a_i$ be an arbitrary element from our sequence, where $0\leq i < 11$, then $a_{\color{red}{2}} = 4$, which means ${\color{red}{2}}$ numbers precede the number $4$ in the sequence.

### Summary

| # | Property | `(a)` | `(b)` | `(c)` | `(d)` |
| :-: | :-- | :-: | :-: | :-: | :-: |
| 1 | Difference between upper and lower bounds equals length of subsequence | &#x2705; | &#x2705; | &#x274c; | &#x274c; |
| 2 | Adjacent subsequences share boundary values (i.e., upper boundary of one equals the lower boundary of the other) | &#x2705; | &#x2705; | &#x274c; | &#x274c; |
| 3 | Exclusion of the lower bound can lead to unnatural lower bound (e.g., subsequence starts at smallest natural number) | &#x2705; | &#x274c; | &#x2705; | &#x274c; |
| 4 | Inclusion of the upper bound can lead to unnatural upper bound (e.g., subsequence starts at smallest natural number and is empty) | &#x2705; | &#x274c; | &#x274c; | &#x2705; |

Convention `(a)` is the only convention that results in all desirable properties being satisfied; thus, convention `(a)` is the preferred convention.

## Application to sliding windows

Dijkstra's convention may be neatly applied in the context of establishing rules for maintaining sliding windows:

- The window begins with the element at index `left`, *inclusive*, and extends to the element at index `right`, *exclusive*; that is, if the window is defined on some 0-indexed array `A`, then we have `left <= i < right`, where `0 <= i < len(A)`. Consequently:
  + `right - left` equals the length of the window
    * (property 1: difference between bounds equals the length of the window)
  + `right` points to the first element *after* the window, if any
    * (property 2: the upper boundary of one subsequence, `right` in the sliding window, equals the lower boundary of another, the rest of the array from `A[right]` to `A[len(A)-1]`)
  + `left` and `right` are always initialized to `0`
    * (property 3: the sliding window always begins at index `0`, the smallest natural number)
  + `left == right` means the window is empty
    * (property 4: the starting condition, where `left == right == 0`, means we have an empty subsequence where the subsequence starts at index `0`, the smallest natural number)
- `left` and `right` are always initialized to `0`, meaning the window starts empty.
- The window *grows* by incrementing `right`. The window may only grow when `right < len(A)`.
- The window *shrinks* by incrementing `left`. The window may only shrink when `left < right`.
- The observations above ensure the following is always true: `0 <= left <= right <= len(A)`.

Using Dijkstra's preferred convention allows us to easily reason about the sliding window (e.g., `right - left` always means "the size of the window", `left == right` always means "the window is empty", etc.).

## Dijkstra's argument (original) {#og-argument}

:::info Original Notes

Dijkstra's original notes may be found at the following links:

- Typed: https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD831.html
- Handwritten: https://www.cs.utexas.edu/~EWD/ewd08xx/EWD831.PDF

For the sake of completeness and ease of reference, the typed version of Dijkstra's notes are reproduced below.

:::

To denote the subsequence of natural numbers $2, 3, \ldots , 12$ without the pernicious three dots, four conventions are open to us

- (a) $2\leq i < 13$
- (b) $1 < i \leq 12$
- (c) $2\leq i \leq 12$
- (d) $1 < i < 13$

Are there reasons to prefer one convention to the other? Yes, there are. The observation that conventions a) and b) have the advantage that the difference between the bounds as mentioned equals the length of the subsequence is valid. So is the observation that, as a consequence, in either convention two subsequences are adjacent means that the upper bound of the one equals the lower bound of the other. Valid as these observations are, they don't enable us to choose between a) and b); so let us start afresh.

There is a smallest natural number. Exclusion of the lower bound &#8212; as in b) and d) &#8212; forces for a subsequence starting at the smallest natural number the lower bound as mentioned into the realm of the unnatural numbers. That is ugly, so for the lower bound we prefer the $\leq$ as in a) and c). Consider now the subsequences starting at the smallest natural number: inclusion of the upper bound would then force the latter to be unnatural by the time the sequence has shrunk to the empty one. That is ugly, so for the upper bound we prefer $<$ as in a) and d). We conclude that convention a) is to be preferred.

<u>Remark:</u> The programming language Mesa, developed at Xerox PARC, has special notations for intervals of integers in all four conventions. Extensive experience with Mesa has shown that the use of the other three conventions has been a constant source of clumsiness and mistakes, and on account of that experience Mesa programmers are now strongly advised not to use the latter three available features. I mention this experimental evidence &#8212; for what it is worth &#8212; because some people feel uncomfortable with conclusions that have not been confirmed in practice. *(End of Remark.)*

When dealing with a sequence of length $N$, the elements of which we wish to distinguish by subscript, the next vexing question is what subscript value to assign to its starting element. Adhering to convention a) yields, when starting with subscript $1$, the subscript range $1\leq i < N+1$; starting with $0$, however, gives the nicer range $0\leq i < N$. So let us let our ordinals start at zero: an element's ordinal (subscript) equals the number of elements preceding it in the sequence. And the moral of the story is that we had better regard &#8212; after all those centuries! &#8212; zero as a most natural number.

<u>Remark:</u> Many programming languages have been designed without due attention to this detail. In FORTRAN subscripts always start at 1; in ALGOL 60 and in PASCAL, convention c) has been adopted; the more recent SASL has fallen back on the FORTRAN convention: a sequence in SASL is at the same time a function on the positive integers. Pity! *(End of Remark.)*

Note: The above has been triggered by a recent incident, when, in an emotional outburst, one of my mathematical colleagues at the University &#8212; not a computing scientist &#8212; accused a number of younger computing scientists of "pedantry" because &#8212; as they do by habit &#8212; they started numbering at zero. He took consciously adopting the most sensible convention as a provocation. (Also the "End of ..." convention is viewed of as provocative; but the convention is useful: I know of a student who almost failed at an examination by the tacit assumption that the questions ended at the bottom of the first page.) I think Antony Jay is right when he states: "In corporate religions as in others, the heretic must be cast out not because of the probability that he is wrong but because of the possibility that he is right."
