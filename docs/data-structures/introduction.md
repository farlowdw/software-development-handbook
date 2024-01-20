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
import Link from '@docusaurus/Link';
import GitHubIcon from '@site/src/components/Icons/GitHubIcon';
import StackOverflowIcon from '@site/src/components/Icons/StackOverflowIcon';

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

## Abstract data types (ADTs)

The [Wiki page](https://en.wikipedia.org/wiki/Abstract_data_type#Common_ADTs) for ADTs lists the following as some of the most common:

| ADT | Description and Python implementation reference(s) |
| :-- | :-- |
| [String](https://en.wikipedia.org/wiki/String_(computer_science)) | **TLDR:** `''` (string literal results in an `str` object) <div style={{float: 'right'}}><Link to='https://github.com/python/cpython/blob/main/Objects/unicodeobject.c'><GitHubIcon fontSize='small' color='inherit' /></Link> &nbsp; <Link to='https://stackoverflow.com/questions/3820506/location-of-python-string-class-in-the-source-code#comment81541250_3820526'><StackOverflowIcon fontSize='small' /></Link></div> <br /><br />A string is a sequence of characters. From [the Python docs](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str): "Textual data in Python is handled with [`str`](https://docs.python.org/3/library/stdtypes.html#str) objects, or *strings*. Strings are immutable [sequences](https://docs.python.org/3/library/stdtypes.html#typesseq) of Unicode code points." |
| [List](https://en.wikipedia.org/wiki/List_(abstract_data_type)) | **TLDR:** `[]` (list literal results in a `list` sequence type)<br /><br />A list or *sequence* is an ADT that represents a finite number of ordered values, where the same value may occur more than once. Python's default [`list`](https://docs.python.org/3/library/stdtypes.html#list) type is a [dynamic array](https://en.wikipedia.org/wiki/Dynamic_array) that allows efficient resizing for dynamic data storage as opposed to an [array](https://en.wikipedia.org/wiki/Array_(data_type)) data structure that has a fixed size.<br /><br />In Python, [the docs](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str) indicate there are three basic sequence types: lists, tuples, and range objects ([`list`](https://docs.python.org/3/library/stdtypes.html#list), [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple), [`range`](https://docs.python.org/3/library/stdtypes.html#range)). There are additional sequence types tailored for processing of [binary data](https://docs.python.org/3/library/stdtypes.html#binaryseq) (i.e., [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes), [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray), and [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview)) and [text strings](https://docs.python.org/3/library/stdtypes.html#textseq) (i.e., [`str`](https://docs.python.org/3/library/stdtypes.html#str)).<br /><br />Python discusses [common sequence operations](https://docs.python.org/3/library/stdtypes.html#common-sequence-operations) and provides a table of operations supported by most sequences types. They even provide an abstract base class (ABC) to make it easier to correctly implement the commonly supported sequence operations on custom sequence types: [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence). |
| [Queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) | **TLDR:** `collections.deque`<br /><br />A queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence (enqueue) and the removal of entities from the other end of the sequence (dequeue). These operations make a queue "FIFO" or *first-in-first-out*.<br /><br />Interestingly, Python has a [`queue`](https://docs.python.org/3/library/queue.html#module-queue) module, but it is unlikely to be what you want if what you're primarily interested in is a data structure that allows $O(1)$ insertions and deletions (i.e., enqueuing from the right and dequeuing from the left). As [this post](https://stackoverflow.com/a/717261/5209533) notes, "`queue.Queue` is intended for allowing different threads to communicate using queued messages/data, whereas `collections.deque` is simply intended as a data structure." Hence, the `queue` module is primarily a tool for using [thread-safe queues](https://realpython.com/queue-in-python/#using-thread-safe-queues).<br /><br />If you don't care about concurrency or threading and you don't need the thread-safety features provided by the `queue` module, then `deque` is the clear choice. It doesn't include the overhead associated with thread-safe operations like the `queue` module does. The [Python docs for `queue`](https://docs.python.org/3/library/queue.html#module-queue) even suggest `deque` as an alternative for this very reason: "[`collections.deque`](https://docs.python.org/3/library/collections.html#collections.deque) is an alternative implementation of unbounded queues with fast atomic [`append()`](https://docs.python.org/3/library/collections.html#collections.deque.append) and [`popleft()`](https://docs.python.org/3/library/collections.html#collections.deque.popleft) operations that do not require locking and also support indexing." |
| [Double-ended queue](https://en.wikipedia.org/wiki/Double-ended_queue) | **TLDR:** `collections.deque`<br /><br />A double-ended queue is an ADT that generalizes a queue, for which elements can be added to or removed from either the front (head) or back (tail). |
| [Priority queue](https://en.wikipedia.org/wiki/Priority_queue) | **TLDR:** `[]` or `heapify(your_list)` (requires `heapq` module)<br /><br />A priority queue is an ADT similar to a regular queue where each element in the queue has an associated *priority*. Elements are dequeued from the priority queue based on their associated value, with higher priority elements being dequeued before lower priority elements.<br /><br />To ensure  |
| [Double-ended priority queue](https://en.wikipedia.org/wiki/Double-ended_priority_queue) |  |
| [Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) |  |
| [Set](https://en.wikipedia.org/wiki/Set_(abstract_data_type)) |  |
| [Multiset](https://en.wikipedia.org/wiki/Multiset) |  |
| [Map](https://en.wikipedia.org/wiki/Associative_array) |  |
| [Multimap](https://en.wikipedia.org/wiki/Multimap) |  |
| [Collection](https://en.wikipedia.org/wiki/Collection_(abstract_data_type)) |  |
| [Container](https://en.wikipedia.org/wiki/Container_(abstract_data_type)) |  |
| [Tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) |  |
| [Graph](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)) |  |
