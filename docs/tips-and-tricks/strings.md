---
title: Tips and Tricks for Strings
hide_title: false
sidebar_label: Strings
description: Tips and tricks for dealing with strings of data
draft: false
tags: [Tips and Tricks]
keywords: [tbd]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

## Common operations

### Sort a string alphabetically

<Tabs>
<TabItem value='python' label='Python'>

```python
def sort_string(a)
    return ''.join(sorted(a))
```



</TabItem>
</Tabs>

## Miscellaneous

### Count the characters in a string of unique characters

A neat trick to count the characters in a string of unique characters is to use a 26-bit bitmask to indicate which lower case Latin characters are inside the string.

```python
mask = 0
for c in word:
  mask |= (1 << (ord(c) - ord('a')))
```

To determine if two strings have common characters, perform `&` on the two bitmasks. If the result is non-zero (i.e., `mask_a & mask_b > 0`) then the two strings have common characters.
