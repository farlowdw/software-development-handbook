---
title: Tips and Tricks
hide_title: false
sidebar_label: Tips and tricks
description: Tips and tricks for working with data structures and algorithms
draft: false
tags: 
  - Tip
  - Trick
keywords: 
  - tip
  - tips
  - trick
  - tricks
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import TOCInline from '@theme/TOCInline';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import LC from '@site/src/components/LC';
import ImageCarousel from '@site/src/components/ImageCarousel';
import BibRef from '@site/src/components/BibRef';
import MyStar from '@site/src/components/MyStar';
import ChipDivider from '@site/src/components/ChipDivider';

## Strings

### Sort a string alphabetically

<Tabs>
<TabItem value='python' label='Python'>

```python
def sort_string(a)
    return ''.join(sorted(a))
```

</TabItem>
</Tabs>

### Count the characters in a string of unique characters

A neat trick to count the characters in a string of unique characters is to use a 26-bit bitmask to indicate which lower case Latin characters are inside the string.

<Tabs>
<TabItem value='python' label='Python'>

```python
mask = 0
for c in word:
  mask |= (1 << (ord(c) - ord('a')))
```

</TabItem>
</Tabs>

To determine if two strings have common characters, perform `&` on the two bitmasks. If the result is non-zero (i.e., `mask_a & mask_b > 0`) then the two strings have common characters.
