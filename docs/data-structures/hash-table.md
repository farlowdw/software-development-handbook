---
title: Hash Table
hide_title: false
sidebar_label: Hash Table
description: Overview of hash table data structure.
draft: false
last_update: 
  date: '2022-07-22'
  author: farlow
tags: [Hash Table]
keywords: [hash table]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import HashTableTC from '@site/docs/_Partials/_time-and-space-complexities/_hash-table.mdx'

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