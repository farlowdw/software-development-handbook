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
import PythonIcon from '@site/src/components/Icons/PythonIcon';

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

:::info Finding the source code for Python's built-in functions and types

As [one helpful Stack Overflow post](https://stackoverflow.com/a/47371323/5209533) notes, you can generally find the source code for Python's built-in functions and built-in types at the following locations:

- [Built-in functions source](https://github.com/python/cpython/blob/main/Python/bltinmodule.c)
  + https://github.com/python/cpython/blob/main/Python/bltinmodule.c
- [Built-in objects source](https://github.com/python/cpython/tree/main/Objects)
  + https://github.com/python/cpython/tree/main/Objects

:::

| ADT | Description and Python implementation reference(s) |
| :-- | :-- |
| [String](https://en.wikipedia.org/wiki/String_(computer_science)) | **TLDR:** `''` (string literal results in an `str` object) &nbsp; <Link to='https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str'><PythonIcon /></Link> &nbsp; <Link to='https://github.com/python/cpython/blob/main/Objects/unicodeobject.c'><GitHubIcon fontSize='small' color='inherit' /></Link> &nbsp; <Link to='https://stackoverflow.com/questions/3820506/location-of-python-string-class-in-the-source-code#comment81541250_3820526'><StackOverflowIcon fontSize='small' /></Link> <br /><br />A string is a sequence of characters. From [the Python docs](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str): "Textual data in Python is handled with [`str`](https://docs.python.org/3/library/stdtypes.html#str) objects, or *strings*. Strings are immutable [sequences](https://docs.python.org/3/library/stdtypes.html#typesseq) of Unicode code points." |
| [List](https://en.wikipedia.org/wiki/List_(abstract_data_type)) | **TLDR:** `[]` (list literal results in a `list` sequence type) &nbsp; <Link to='https://docs.python.org/3/library/stdtypes.html#list'><PythonIcon /></Link> &nbsp; <Link to='https://github.com/python/cpython/blob/main/Objects/listobject.c'><GitHubIcon fontSize='small' /></Link> &nbsp; <Link to='https://stackoverflow.com/questions/8608587/finding-the-source-code-for-built-in-python-functions#comment96371642_47371323'><StackOverflowIcon /></Link> <br /><br />A list or *sequence* is an ADT that represents a finite number of ordered values, where the same value may occur more than once. Python's default [`list`](https://docs.python.org/3/library/stdtypes.html#list) type is a [dynamic array](https://en.wikipedia.org/wiki/Dynamic_array) that allows efficient resizing for dynamic data storage as opposed to an [array](https://en.wikipedia.org/wiki/Array_(data_type)) data structure that has a fixed size.<br /><br />In Python, [the docs](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str) indicate there are three basic sequence types: lists, tuples, and range objects ([`list`](https://docs.python.org/3/library/stdtypes.html#list), [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple), [`range`](https://docs.python.org/3/library/stdtypes.html#range)). There are additional sequence types tailored for processing of [binary data](https://docs.python.org/3/library/stdtypes.html#binaryseq) (i.e., [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes), [`bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray), and [`memoryview`](https://docs.python.org/3/library/stdtypes.html#memoryview)) and [text strings](https://docs.python.org/3/library/stdtypes.html#textseq) (i.e., [`str`](https://docs.python.org/3/library/stdtypes.html#str)).<br /><br />Python discusses [common sequence operations](https://docs.python.org/3/library/stdtypes.html#common-sequence-operations) and provides a table of operations supported by most sequences types. They even provide an abstract base class (ABC) to make it easier to correctly implement the commonly supported sequence operations on custom sequence types: [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence). <br /><br />Finally, it's important to note that a list can be implemented in various ways, not just with an array or a dynamic array. A linked list is a popular implementation of the List ADT when insertions and deletions are frequent and they predominately occur at the beginning of the list. If, however, direct access is important, as is often the case, then an array will likely be a more suitable implementation than a linked list. Python does not have a `LinkedList` class; instead, Python provides a [`deque`](https://docs.python.org/3/library/collections.html#collections.deque) which is implemented as a doubly-linked list under the hood. |
| [Queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) | **TLDR:** `collections.deque` &nbsp; <Link to='https://docs.python.org/3/library/collections.html#collections.deque'><PythonIcon /></Link> &nbsp; <Link to='https://github.com/python/cpython/blob/8f4f77364750d0ceec47157e8920983e3f41651f/Modules/_collectionsmodule.c#L71'><GitHubIcon fontSize='small' /></Link> &nbsp; <Link to='https://stackoverflow.com/a/6257048/5209533'><StackOverflowIcon /></Link> <br /><br />A queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence (enqueue) and the removal of entities from the other end of the sequence (dequeue). These operations make a queue "FIFO" or *first-in-first-out*.<br /><br />Interestingly, Python has a [`queue`](https://docs.python.org/3/library/queue.html#module-queue) module, but it is unlikely to be what you want if what you're primarily interested in is a data structure that allows $O(1)$ insertions and deletions (i.e., enqueuing from the right and dequeuing from the left). As [this post](https://stackoverflow.com/a/717261/5209533) notes, "`queue.Queue` is intended for allowing different threads to communicate using queued messages/data, whereas `collections.deque` is simply intended as a data structure." Hence, the `queue` module is primarily a tool for using [thread-safe queues](https://realpython.com/queue-in-python/#using-thread-safe-queues).<br /><br />If you don't care about concurrency or threading and you don't need the thread-safety features provided by the `queue` module, then `deque` is the clear choice. It doesn't include the overhead associated with thread-safe operations like the `queue` module does. The [Python docs for `queue`](https://docs.python.org/3/library/queue.html#module-queue) even suggest `deque` as an alternative for this very reason: "[`collections.deque`](https://docs.python.org/3/library/collections.html#collections.deque) is an alternative implementation of unbounded queues with fast atomic [`append()`](https://docs.python.org/3/library/collections.html#collections.deque.append) and [`popleft()`](https://docs.python.org/3/library/collections.html#collections.deque.popleft) operations that do not require locking and also support indexing." |
| [Double-ended queue](https://en.wikipedia.org/wiki/Double-ended_queue) | **TLDR:** `collections.deque` &nbsp; <Link to='https://docs.python.org/3/library/collections.html#collections.deque'><PythonIcon /></Link> &nbsp; <Link to='https://github.com/python/cpython/blob/8f4f77364750d0ceec47157e8920983e3f41651f/Modules/_collectionsmodule.c#L71'><GitHubIcon fontSize='small' /></Link> &nbsp; <Link to='https://stackoverflow.com/a/6257048/5209533'><StackOverflowIcon /></Link> <br /><br />A double-ended queue is an ADT that generalizes a queue, for which elements can be added to or removed from either the front (head) or back (tail). |
| [Priority queue](https://en.wikipedia.org/wiki/Priority_queue) | **TLDR:** `[]` or `heapify(your_list)` (requires `heapq` module) &nbsp; <Link to='https://docs.python.org/3/library/heapq.html#module-heapq'><PythonIcon /></Link> &nbsp; <Link to='https://github.com/python/cpython/blob/main/Lib/heapq.py'><GitHubIcon fontSize='small' /></Link> &nbsp; <Link to='https://stackoverflow.com/a/19979723/5209533'><StackOverflowIcon /></Link> <br /><br />A priority queue is an ADT similar to a regular queue where each element in the queue has an associated *priority*. Elements are dequeued from the priority queue based on their associated value, with higher priority elements being dequeued before lower priority elements. <br /><br />To ensure these ADT-defining operations are executed efficiently for priority queues, implementations of priority queues often rely on a [heap](https://en.wikipedia.org/wiki/Heap_(data_structure)) data structure even though another method might be to use an [unordered array](https://www.cs.cmu.edu/~rdriley/121/notes/heaps.html#21-pq-with-an-array). A heap is a tree-based data structure that satisfies the heap property: "In a *max heap*, for any given node C, if P is a parent node of C, then the *key* (the *value*) of P is greater than or equal to the key of C. In a *min heap*, the key of P is less than or equal to the key of C." <br /><br />The Python docs for `heapq` note the pop method returns the smallest item, not the largest, meaning Python's heap implementation is that of a *min heap*, as described above. If, however, a *max heap* is needed, then items for the min heap can be multiplied by `-1` to simulate the behavior of a max heap (but be sure to multiply an item by `-1` whenever you push or pop an item from the heap!). <br /><br />It's probably worth mentioning that Python does have a [`queue.PriorityQueue`](https://docs.python.org/3/library/queue.html#queue.PriorityQueue) class, but this should be avoided unless you're dealing with concurrency and worried about thread safety (for reasons remarked on above when discussing the Queue ADT). Using the [`heapq`](https://docs.python.org/3/library/heapq.html#module-heapq) module provides the same data management benefits without the thread safety overhead. |
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








&nbsp; <Link to=''><PythonIcon /></Link> &nbsp; 
<Link to=''><GitHubIcon fontSize='small' /></Link> &nbsp; 
<Link to=''><StackOverflowIcon /></Link>




Something

13. **Priority Queue**: A priority queue retrieves elements based on their priority. Python's `queue.PriorityQueue` or the `heapq` module can be used for this.

15. **Double-ended Priority Queue**: This is not commonly used as a standard ADT and does not have a direct Python equivalent. However, it could be implemented using two heaps (one min-heap and one max-heap) or by customizing existing data structures.

11. **Stack**: A stack is a LIFO (Last In, First Out) data structure. Python's list can be used as a stack, with `append()` and `pop()` methods.

5. **Set**: A set is a collection of unique elements without any particular order. Python's `set` is a hash table-based implementation of this ADT.

6. **Multiset**: Also known as a bag, a multiset allows multiple instances of elements. Python doesn't have a built-in multiset, but the `Counter` class from the `collections` module serves this purpose well.

7. **Map**: A map, or dictionary, associates keys with values. Python's `dict` is a hash table-based implementation of a map.

8. **Multimap**: A multimap is like a map but allows multiple values for a single key. Python does not have a built-in multimap, but it can be implemented using a dictionary of lists or using `defaultdict` from the `collections` module.

1. **Collection**: This is a general term for any group of objects stored together. In Python, collections can be implemented using lists, sets, or any class from the `collections` module, depending on the specific requirements (like order, uniqueness, etc.).

2. **Container**: A container is an object that holds a set of other objects. Python's built-in container types include lists, sets, tuples, and dictionaries.

10. **Tree**: A tree is a hierarchical structure of nodes, where each node has a value and a list of references to other nodes (children). Trees are not directly implemented in Python but can be built using classes or nested lists/dictionaries.

9. **Graph**: A graph represents a set of connections (edges) between nodes (vertices). There's no direct built-in Python implementation, but graphs can be represented using dictionaries or lists, or by using libraries like NetworkX.



Each of these ADTs serves different purposes and offers various functionalities suitable for specific use cases in programming and data manipulation.

