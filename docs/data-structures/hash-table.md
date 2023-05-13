---
title: Hash Table
hide_title: false
sidebar_label: Hash Table
description: Overview of hash table data structure.
draft: false
tags: [Hash Table]
keywords: [hash table]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import HashTableTC from '@site/docs/_Partials/_time-and-space-complexities/_hash-table.mdx';
import LC from '@site/src/components/LC';

## Introduction

A hash table (commonly referred to as hash map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function on an element to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found. During lookup, the key is hashed and the resulting hash indicates where the corresponding value is stored.

Hashing is the most common example of a space-time tradeoff. Instead of linearly searching an array every time to determine if an element is present, which takes $O(n)$ time, we can traverse the array once and hash all the elements into a hash table. Determining if the element is present is a simple matter of hashing the element and seeing if it exists in the hash table, which is $O(1)$ on average.

In the case of hash collisions, there are a number of collision resolution techniques that can be used. You will unlikely be asked about details of collision resolution techniques in interviews:

- **Separate chaining:** A linked list is used for each value, so that it stores all the collided items.
- **Open addressing:** All entry records are stored in the bucket array itself. When a new entry has to be inserted, the buckets are examined, starting with the hashed-to slot and proceeding in some probe sequence, until an unoccupied slot is found.

## Language Implementations

| Language | API |
| :-- | :-- |
| C++ | [`std::unordered_map`](https://docs.microsoft.com/en-us/cpp/standard-library/unordered-map?view=msvc-170) |
| Java | [`java.util.Map`](https://docs.oracle.com/javase/10/docs/api/java/util/Map.html). Use [`java.util.HashMap`](https://docs.oracle.com/javase/10/docs/api/java/util/HashMap.html) or [`java.util.TreeMap`](https://docs.oracle.com/javase/10/docs/api/java/util/TreeMap.html) (preferred) |
| Python | [`dict`](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) |
| JavaScript | [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) |

## Time complexity

<HashTableTC />

In interviews, we typically only care about the *average case* as it concerns hash maps.

## LeetCode problems 

- <LC id='1' type='long' >What is the classic data structure used to implement time-space tradeoffs? Hash tables. The average search time complexity for hash tables is O(1). Use this to your advantage in this problem to conduct what will essentially be a linear search (instead of quadratic) for the complement of the current term.</LC> 

## ChatGPT

<details className='gptDetails'><summary> What is the time complexity for accessing items from a hash table? </summary>

The time complexity for accessing items from a hash table is generally O(1), or constant time, for both average and best-case scenarios. This is because hash tables use a hashing function to map keys directly to their corresponding values in the underlying array, which allows for fast access.

However, in the worst-case scenario, when there are hash collisions and a poor hashing function, the time complexity can degrade to O(n), where n is the number of items in the hash table. This happens when all items end up in the same bucket or chain, and the search for a specific item turns into a linear search through all the items.

In practice, well-implemented hash tables use various techniques like a good hashing function and dynamic resizing to minimize the chances of collisions and maintain an average-case performance of O(1).

</details>

## Further research

- [Stack Overflow](https://stackoverflow.com/a/9214594/5209533) answer on hash table runtime complexities.
