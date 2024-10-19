---
title: >-
  Introduction to the NP-complete complexity class (with attitude)
draft: false
description: >-
  This post aims to introduce the NP-complete complexity class. P and NP are introduced using the clique problem, and then a few different NP-complete reductions are discussed: clique, independent set, vertex cover, and dominating set.
tags: 
  - P
  - NP
  - NP-complete
  - Tutorial
  - Algorithms with Attitude
keywords: 
  - p
  - np
  - np-complete
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

<!-- import snippet1 from '!!raw-loader!./snippet-1.py'; -->

This post aims to introduce the NP-complete complexity class. P and NP are introduced using the clique problem, and then a few different NP-complete reductions are discussed: clique, independent set, vertex cover, and dominating set.

<!--truncate-->

:::info Attribution

The notes below come from the [Algorithms with Attitude](https://www.youtube.com/@AlgorithmswithAttitude/playlists) YouTube channel, specifically the [Introduction to the NP-Complete Complexity Class](https://www.youtube.com/playlist?list=PLSVu1-lON6LytLlGHl3cxq_PrwQBlnEhm) playlist comprised of the following videos: 
[Introduction to P and NP: The Clique Problem](https://www.youtube.com/watch?v=B801ZELDFZo&list=PLSVu1-lON6LytLlGHl3cxq_PrwQBlnEhm&index=1) and [NP-Complete Reductions: Clique, Independent Set, Vertex Cover, and Dominating Set](https://www.youtube.com/watch?v=u5W32YxmnL8&list=PLSVu1-lON6LytLlGHl3cxq_PrwQBlnEhm&index=2).

:::

There are several sections in this post, accessible in the table of contents on the right, but most of the sections have been listed below for ease of reference and navigation.

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Introduction to P and NP - the clique problem {#introduction}

### Clique definition

