---
title: Data Structures Overview
hide_title: false
sidebar_label: Introduction
description: Overview of various data structures
draft: false
tags: 
  - Overview
  - Data Structures
keywords: 
  - data structures
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import WorstCaseComplexities from '@site/docs/_Partials/time-and-space-complexities/all-worst-case.md'
import AverageCaseComplexities from '@site/docs/_Partials/time-and-space-complexities/all-average-case.md'
import ArraySortingAlgorithmsComplexities from '@site/docs/_Partials/time-and-space-complexities/all-array-sorting-algorithms.md'

## Time and Space Complexity Overviews

Click on a tab below to see the worst or average case time complexities for access, search, insertion, and deletion operations for common data structures. The worst case tab includes space complexity details for each data structure. The last tab includes details about the best, average, and worst case time complexities for various array sorting algorithms as well as a column with space complexity details.

<Tabs>
<TabItem value='tc-worst-case-data-structures' label='Worst Case'>

<WorstCaseComplexities />

</TabItem>
<TabItem value='tc-average-case-data-structures' label='Average Case'>

<AverageCaseComplexities />

</TabItem>
<TabItem value='tc-array-sorting-algorithms' label='Array Sorting Algorithms'>

<ArraySortingAlgorithmsComplexities />

</TabItem>
</Tabs>

## What is a data structure?

A *data structure*, as its name implies, is a way of structuring data. Since we are dealing with computers, we are ultimately talking about a way of specifically structuring data inside [random-access memory](https://en.wikipedia.org/wiki/Random-access_memory) (RAM). As the [Wiki article](https://en.wikipedia.org/wiki/Data_structure) notes:

> In computer science, a data structure is a data organization, management, and storage format that is usually chosen for efficient access to data. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data (i.e., it is an algebraic structure about data).

## Abstract data types

The [Wiki page](https://en.wikipedia.org/wiki/Abstract_data_type) lists the following:

- Collection
- Container
- Double-ended queue
- Double-ended priority queue
- Graph
- List
- Map
- Multimap
- Multiset
- Priority queue
- Queue
- Set
- Stack
- String
- Tree