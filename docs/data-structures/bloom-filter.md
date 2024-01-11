---
title: Bloom filter
hide_title: false
sidebar_label: Bloom Filter
description: Overview of bloom filter data structure.
draft: false
tags: 
  - Bloom Filter
keywords: 
  - bloom filter
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Description

A constant-space bitmap that lets you quickly check whether or not an item is in a set. Can give false positives. A bloom filter is a space-efficient data structure that lets you quickly check whether or not an item is in a set. The tradeoff for that space efficiency is that it it's *probabilistic*: sometimes instead of giving you concrete answers it just says "probably." When you look up an item in a bloom filter, the possible answers are:

- It's definitely not in the set. This is a *true negative*.
- It might be in the set. This could be a *false positive*, or it could be a *true positive*.

**Visual description:**

<div align='center' className='centeredImageDiv'>
  <img width="400px" src={require('@site/static/img/dsa/quick-ref/bloom-filter.png').default} />
</div>

**Strengths:**

- **Space-efficient:** Bloom filters take up $O(1)$ space, regardless of the number of items inserted. (But, their accuracy goes down as more elements are added.)
- **Fast:** Insert and lookup operations are both $O(1)$ time.

**Weaknesses:** 

- **Probabilistic:** Bloom filters can only definitively identify *true negatives*. They *cannot* identify *true positives*. If a bloom filter says an item is present, that item *might* actually be present (a true positive) or it might not (a false positive).
- **Limited interface:** Bloom filters only support the insert and lookup operations. You can't iterate through the items in the set or delete items.

**Worst Case Analysis:**

| Context | Big O |
| :-- | :-- |
| space | $O(1)$ |
| insert | $O(1)$ |
| lookup | $O(1)$ |

### Implementation

Under the hood, a bloom filter is just a bitmap. Initially, all the bits are set to 0.

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/bloom-filter-f2.png').default} />
</div>

Fixed size is crucial here. Remember, bloom filters require $O(1)$ space.

### Inserts

Let's add some cake flavors to our bloom filter, starting with "chocolate." To do this:

1. Hash the string ("chocolate")  
2. Mod the result by the length of our bitmap
3. Set that bit to 1

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/bloom-filter-f3.png').default} />
</div>

Same thing for adding "vanilla" and "red velvet":

<div align='center' className='centeredImageDiv'>
  <img width="350px" src={require('@site/static/img/dsa/quick-ref/bloom-filter-f4.png').default} />
</div>

### Lookups

To check if a word is in our bloom filter we:

1. Hash it
2. Mod the result
3. Check if the corresponding bit is 0 or 1

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/bloom-filter-f5.png').default} />
</div>

If the bit is 0, then that word **definitely isn't** in our set. If it were, we would have set that bit to 1.

But if the bit is 1, then that word **might be** in our set. But it could be a **false positive**.

In our example, checking for "vanilla" gives us a true positive—-we *did* put that in our bloom filter earlier. But checking for "carrot" gives us a false positive—we set that bit to 1 for "red velvet".

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/bloom-filter-f6.png').default} />
</div>

<div align='center' className='centeredImageDiv'>
  <img width="300px" src={require('@site/static/img/dsa/quick-ref/bloom-filter-f7.png').default} />
</div>

This false positive isn't a bug; it's a tradeoff we've made to keep checks fast. Bloom filters are only appropriate when it's feasible to handle false positives.

### When to use bloom filters

Bloom filters are a great first layer of filtering, since they don't require much space and can fit in fast storage, like RAM. Consider using them anywhere where knowing if something is definitely not present or possibly present would be helpful.

One common use is to eliminate unnecessary accesses to slower storage / expensive lookups.

For instance, say we wanted to query a large database stored on a rotating hard drive (slow to read from). And suppose the thing we're querying for has a good chance of not being present at all. Before querying the disk, we could check for the record in a bloom filter; if the bloom filter says the record definitely isn't present, then we don't need to touch the slow disk at all.

### Bitmap Size

As the number of items inserted into a bloom filter increases, so does the likelihood of a false positive. That's because over time, we'll end up setting most of the bits to 1, instead of 0.

The larger the bitmap, the less likely false positives are. When using a bloom filter, it's helpful to know ahead of time roughly how many elements will be in your set. That way you can make the bitmap large enough to avoid a high false positive rate.

### Multiple Hash Functions

Another way to avoid a high false positive rate is to use multiple hash functions.

In the examples above we only used one hash function, checking one bit in the bitmap for each lookup.

When using multiple hash functions:

- To add a new item: generate a bitmap index with *each* hash function, and set all of those bits to 1.
- To check if an item is present: just check if any of the bits checked are still 0. If so, the item is definitely not present.
