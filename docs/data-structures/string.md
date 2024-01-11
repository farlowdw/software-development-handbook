---
title: String
hide_title: false
sidebar_label: String
description: Overview of string data structure.
draft: false
tags: 
  - String
keywords: 
  - string
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import SingleStringTC from '@site/docs/_Partials/_time-and-space-complexities/_string-single-string.md'
import DoubleStringTC from '@site/docs/_Partials/_time-and-space-complexities/_string-double-string.md'

## Introduction

A string is a sequence of characters. Many tips that apply to arrays also apply to strings. Common data structures for looking up strings are as follows:

- [Trie/Prefix Tree](https://en.wikipedia.org/wiki/Trie)
- [Suffix Tree](https://en.wikipedia.org/wiki/Suffix_tree)

Common string algorithms are as follows:

Rabin Karp for Efficient searching of substring using a rolling hash
KMP for efficient searching of substring

- [Rabin-Karp](https://en.wikipedia.org/wiki/Rabin-Karp_algorithm): Efficient searching of substring using a [rolling hash](https://en.wikipedia.org/wiki/Rolling_hash).
- [KMP (Knuth-Morris-Pratt)](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm): Efficient searching of substring.

## Time complexity 

A strings is an array of characters, so the time complexities of basic string operations will closely resemble that of array operations.

### Worst case analysis (single string)

<SingleStringTC />

### Worst case analysis (operations involving two strings)

Below we assume the other string is of length $m$.

<DoubleStringTC />

## Interview considerations

### Clarifications

- Ask about input character set and case sensitivity. Usually the characters are limited to lowercase Latin characters, for example \mytt{a} to \mytt{z}.

### Mistakes

#### Overestimating space required of hashmaps with strings as keys

It is easy to overestimate the space for a hashmap whose keys are Latin characters. If you need to keep a counter of characters, a common mistake is to say that the space complexity required for the counter is $O(n)$. The space required for a counter of a string of Latin characters is $O(1)$ not $O(n)$. This is because the upper bound is the range of characters, which is usually a fixed constant of `26`. The input set is just lowercase Latin characters.

### Exceptions

Be on the lookout for the following corner cases when dealing with strings:

- Empty
- Only 1 or 2 characters
- Repeated characters (i.e., contiguous characters that are equal)
- Distinct characters (i.e., all characters are unique)

