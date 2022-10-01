---
title: Sandbox (holding zone)
hide_title: false
sidebar_label: Sandbox
description: Sandbox for different data structure and algorithms notes/ideas
draft: false
tags: [Sandbox]
keywords: [learning]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';

## Data structures

### Graphs

- **Adjacency list vs. adjacency matrix:** In terms of both speed and memory, implementing graphs using adjacency lists is very efficient in comparison with, for example, an adjacency matrix. That's why linked lists are so useful for graph implementation.

### Stacks

- **Conventional operations:** Stacks are defined by ability to `push` on to the top of the stock (i.e., add an element), `pop` from the top of the stack (i.e., remove an element), and access or read the top element of the stack (i.e., `top` or `peak`). All of these operations are $O(1)$.
- **Implementation:** Can easily be implemented using a dynamic array. Most languages already support `push` and `pop` operations for dynamic arrays. The `top`/`peak` operation is a simple accessing of the dynamic array's last element.
- **LIFO:** These structures are referred to as *LIFO* for "last in, first out." Think of cleaning a *stack* of plates. You stack the plates by putting one on top of the other. When you start cleaning them you remove the plates from the top.

### Linked Lists

Linked lists aren't difficult to understand conceptually. But working with them in the context of preparing for interviews can be challenging. As [Real Python note](https://realpython.com/linked-lists-python/): 

> You can use [`collections.deque`](https://docs.python.org/3/library/collections.html#collections.deque) for handling linked lists. You might be wondering why you would ever implement your own linked list in Python. A few reasons:
> 
> 1. Practicing your Python algorithm skills
> 2. Learning about data structure theory
> 3. Preparing for job interviews

Hence, if you want to *actually* use a linked list to solve a problem where a linked list is appropriate but you don't want to implement your own from scratch, then use `collections.deque`. If, however, you're *required* to illustrate your understanding of linked lists, namely by means of manipulating pointers effectively, then you'll need to know some of the details that follow.

#### Initialization

The only information we need to store for a linked list is where the list starts (i.e.,the `head` of the list) because then we can use that starting point to traverse the rest of the list for all sorts of other operations. That's why you're often only given the `head` for most LeetCode problems. For example, in <LC id='206' type='' ></LC>:

> Given the `head` of a singly linked list, reverse the list, and return the reversed list.

Hence, we can represent a linked list as follows, where only the `head` is specified:

```python title="Linked list initialization"
class LinkedList:
    def __init__(self):
        self.head = None
```

#### Node representation

We can initialize a linked list in the manner mentioned above, but doing so is useless on its own. A linked list is comprised of nodes and right now an initialized linked list will be empty (i.e., no nodes where the `head` points to `None`). How can we effectively represent nodes in a linked list?

We can look to problems like <LC id='206' type='' ></LC> again to see how others define linked list nodes (note that the definition has been commented out and is only for our reference):

```python title="LeetCode definition of linked list node (LC 206)"
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
```

Hence, in our own programs, we can plan to represent linked list nodes as follows:

```python title="Linked list node"
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

We can see the two main elements of every single node in the definition above, namely `val` (the actual data the node holds) and `next`, the current node's reference to the *next* node in the list.

#### Initialization and node representation revisited

Right now we technically have all we need to get started to work with linked lists:

```python
class LinkedList:
    def __init__(self):
        self.head = None

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

We could use the definitions above to create a linked list with three nodes in the following manner:

```python
llist = LinkedList()
print(llist)                      # None

first_node = ListNode("a")
llist.head = first_node
print(llist)                      # a -> None

second_node = ListNode("b")
third_node = ListNode("c")
first_node.next = second_node
second_node.next = third_node
print(llist)                      # a -> b -> c -> None
```

By defining a node's `val` and `next` values, we can create a linked list quickly. But what we did above was somewhat cumbersome was it not?

In practice, the definitions above leave much to be desired. For example, how can we "see" our linked list? Currently, if we were to try to print the linked list, then Python would simply give us a reference to the object in memory. That's not what we want. It would also be nice to be able to initialize our list with an iterable in the same way you can with `collections.deque`:

```python
from collections import deque

my_list = deque('some_iterable')
print(my_list)
# deque(['s', 'o', 'm', 'e', '_', 'i', 't', 'e', 'r', 'a', 'b', 'l', 'e'])
```

To address both of these shortcomings, we can start by adding a [`__repr__`](https://docs.python.org/3.10/reference/datamodel.html#object.__repr__) method to both classes (we can simply return the value for a `ListNode` but we will want to illustrate how the values are all chained together in order for a `LinkedList`). We can then modify `LinkedList`'s `__init__` method to enable initialization with an iterable:

<Tabs>
<TabItem value='python1' label='Commented'>

```python title="Revisited LinkedList and ListNode definitions"
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    # represent object by its data value
    # highlight-start
    def __repr__(self):
        return self.val
    # highlight-end

class LinkedList:
    def __init__(self, nodes=None):
        # initialize with head as before
        self.head = None
        # allow initialization with an iterable
        # highlight-start
        if nodes is not None:
            node = ListNode(val=nodes[0])
            self.head = node
            nodes = nodes[1:]
            for elem in nodes:
                node.next = ListNode(val=elem)
                node = node.next
        # highlight-end
        
    # object representation: val1 -> ... -> valN -> None
    # highlight-start
    def __repr__(self):
        node = self.head
        nodes = []
        while node is not None:
            nodes.append(node.val)
            node = node.next
        nodes.append("None")
        return " -> ".join(map(str, nodes))
    # highlight-end
```

</TabItem>
<TabItem value='python2' label='Uncommented'>

```python title="Revisited LinkedList and ListNode definitions"
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def __repr__(self):
        return self.val

class LinkedList:
    def __init__(self, nodes=None):
        self.head = None
        if nodes is not None:
            node = ListNode(val=nodes[0])
            self.head = node
            nodes = nodes[1:]
            for elem in nodes:
                node.next = ListNode(val=elem)
                node = node.next
        
    def __repr__(self):
        node = self.head
        nodes = []
        while node is not None:
            nodes.append(node.val)
            node = node.next
        nodes.append("None")
        return " -> ".join(map(str, nodes))
```

</TabItem>
</Tabs>

#### Traversal

One of the most common things you will do with a linked list is to *traverse* it. Traversing means going through every single node, starting with the `head` of the linked list and ending on the node that has a `next` value of `None`. Traversing is just a fancier way to say iterating. With that in mind, we can create an `__iter__` method to add the same behavior to linked lists that we would normally expect from a list:


```python
def __iter__(self):
    node = self.head
    while node is not None:
        yield node
        node = node.next
```

The method above goes through the list and [`yields`](https://realpython.com/introduction-to-python-generators/) every single node. The most important thing to remember about this `__iter__` is that we need to always validate that the current node is not `None`. When that condition is `True`, it means we've reached the end of our linked list. After yielding the current node, we want to move to the next node on the list. That's why we add `node = node.next`. 

We can iterate through our linked list in a very Pythonic way:

```python
llist = LinkedList('doggy')
print(llist) # d -> o -> g -> g -> y -> None

for i, char in enumerate(llist):
    print(i, char)

# 0 d
# 1 o
# 2 g
# 3 g
# 4 y
```

#### Working LinkedList definition

Given everything discussed above, we now have a fairly robust working definition for our own implementation of a linked list:

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def __repr__(self):
        return self.val

class LinkedList:
    def __init__(self, nodes=None):
        self.head = None
        if nodes is not None:
            node = ListNode(val=nodes[0])
            self.head = node
            nodes = nodes[1:]
            for elem in nodes:
                node.next = ListNode(val=elem)
                node = node.next
                
    def __iter__(self):
        node = self.head
        while node is not None:
            yield node
            node = node.next
        
    def __repr__(self):
        node = self.head
        nodes = []
        while node is not None:
            nodes.append(node.val)
            node = node.next
        nodes.append("None")
        return " -> ".join(map(str, nodes))
```

We should now turn our attention to adding useful methods to the `LinkedList` class such as being able to insert a node at the beginning or end of the list (or even between nodes), remove a node at the beginning or end of the list, reverse the list, etc.

#### Linked list methods and operations

A linked list problem may become more approachable if viewed largely as an exercise in pointer manipulation. Why? Because many linked list problems involve being given the `head` of a linked list (which, in essence, gives you the entire list) and then being asked to do something with the *nodes* of the linked list, all of which only have two properties: `val` (i.e., the data or value they hold) and `next` pointer to the next node in the linked list. We are almost always asked to manipulate these properties in some way (i.e., we are tasked with *mutating* node properties for all nodes in a linked list in some requested fashion). Effectively mutating node properties in a linked list is often done by means of *pointer manipulation*, where a pointer typically *points* to a node and/or a node's property (i.e., `val` or `next`) in some way.

For example, the problem of reversing a linked list effectively amounts to mutating each node's `next` property in the linked list. See the problem description and detailed solution below for practical details about what all this means. Or expand the widget immediately below for an explicit illustration of what all this looks like in terms of reversing the linked list `1 -> 2 -> 3 -> None` in terms of memory addresses.

<details><summary> Reversing <code>1 -> 2 -> 3 -> None</code> with attention towards memory addresses</summary>

```python title="Input"
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __repr__(self):
        return str(self.val)


class LinkedList:
    def __init__(self, nodes=None):
        self.head = None
        if nodes is not None:
            node = ListNode(val=nodes[0])
            self.head = node
            nodes = nodes[1:]
            for elem in nodes:
                node.next = ListNode(val=elem)
                node = node.next

    def reverse(self):
        prev = None
        curr = self.head
        iteration = 0
        while curr is not None:
            iteration += 1
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
            curr_next_msg = hex(id(curr.next)) if hasattr(curr, "next") else "NO NEXT    "
            print(
                f"Iteration: {iteration}\n\
prev:      {hex(id(prev))} {id_map.get(hex(id(prev)))}\n\
curr:      {hex(id(curr))} {id_map.get(hex(id(curr)))}\n\
temp:      {hex(id(temp))} {id_map.get(hex(id(temp)))}\n\
curr.next: {curr_next_msg} {id_map.get(hex(id(getattr(curr, 'next', None))))}"
            )
            print("----------------------------------------")

        self.head = prev

    def __iter__(self):
        node = self.head
        while node is not None:
            yield node
            node = node.next

    def __repr__(self):
        node = self.head
        nodes = []
        while node is not None:
            nodes.append(node.val)
            node = node.next
        nodes.append("None")
        return " -> ".join(map(str, nodes))

llist = LinkedList()
node1 = ListNode(1)
node2 = ListNode(2)
node3 = ListNode(3)

llist.head = node1
node1.next = node2
node2.next = node3

id_map = {
    hex(id(None)): "None",
    hex(id(node1)): "Node1",
    hex(id(node2)): "Node2",
    hex(id(node3)): "Node3",
}

print(f'LinkedList: {llist}')
print("----------------------------------------")
print(f"None:  {hex(id(None))}\nNode1: {hex(id(node1))}\nNode2: {hex(id(node2))}\nNode3: {hex(id(node3))}")
print("----------------------------------------")
llist.reverse()
print(f'Reversed LinkedList: {llist}')
```

```a title="Output"
LinkedList: 1 -> 2 -> 3 -> None
----------------------------------------
None:  0x1037a7000
Node1: 0x103b7bd90
Node2: 0x103b7bd30
Node3: 0x103b7bcd0
----------------------------------------
Iteration: 1
prev:      0x103b7bd90 Node1
curr:      0x103b7bd30 Node2
temp:      0x103b7bd30 Node2
curr.next: 0x103b7bcd0 Node3
----------------------------------------
Iteration: 2
prev:      0x103b7bd30 Node2
curr:      0x103b7bcd0 Node3
temp:      0x103b7bcd0 Node3
curr.next: 0x1037a7000 None
----------------------------------------
Iteration: 3
prev:      0x103b7bcd0 Node3
curr:      0x1037a7000 None
temp:      0x1037a7000 None
curr.next: NO NEXT     None
----------------------------------------
Reversed LinkedList: 3 -> 2 -> 1 -> None
```

The purpose above is merely to show how the *memory addresses* of each list node *never* changes. Regardless of how its property values `val` and `next` may be mutated (only `next` is mutated in this example of reversing a linked list).

</details>

##### Reverse

Consider the following LeetCode problem: <LC id='206' type='long' ></LC>

> Given the `head` of a singly linked list, reverse the list, and return the reversed list.

Whatever linked list we end up dealing with has already been defined since we are always given the linked list's `head`. The challenge is to go through all of the list's nodes and update the `next` property for each node to reference the node that precedes the current node in the list. The `val` for each list node never changes. Hence, we want to take something like

```
1 -> 2 -> 3 -> None
```

and transform it into

```
3 -> 2 -> 1 -> None
```

Before attempting to code, it may be helpful to first note that each item on either side of a `->` above is an *object* stored in memory somewhere; that is, for the original linked list, `1` is an object, namely a `ListNode` whose `val` property is `1` and whose `next` property is `ListNode(2)`. And so on. Each list node (as well as `None`) was born in memory somewhere upon instantiation *and will remain there in memory*. Every list node keeps its memory address regardless of how we may mutate its `val` and `next` properties. If we were to *add* or *remove* a list node to the linked list, then the only thing that would change is the increased consumption in memory (by defining another list node somewhere) or the freeing up of memory (probably by garbage collection). But every other node already defined stays in its original memory address. What if we reverse the linked list? Each list node remains at its original memory address even though we will have to *mutate* the `next` property for each node.

The description above is why we should sometimes try to look at linked list problems as little more than exercises in pointer manipulation. If we're given the `head` of a linked list, then whatever list nodes have been defined will remain at their original locations in memory--we will only ever have to 

- increase memory consumption (i.e., define one or more nodes and relate them to currently existing nodes), or 
- decrease memory consumption (i.e., remove references to current nodes and let the memory be freed up by garbage collection), or
- keep memory consumption the same and update list node property values `val` and `next`.

What item(s) we have to deal with will vary by problem. For the current problem of *reversing* a linked list, we will only have to work on updating list node `next` values. In the context of our `LinkedList` definition, the `reverse` method may be implemented as follows:

```python
def reverse(self):
    prev = None
    curr = self.head
    while curr is not None:
        temp = curr.next
        curr.next = prev
        prev = curr
        curr = temp

    self.head = prev
```

How does this work? Let's reconsider our example linked list `1 -> 2 -> 3 -> None` for simplicity. If this is your first time attempting this problem or dealing with linked lists in general, then you probably encountered the following conundrum right away: How can you change the `next` value of `ListNode(1)` to `None` and continue processing list nodes and updating their `next` properties? How do we even get to `ListNode(2)` if the `next` value of `ListNode(1)` is now `None`? Pointer manipulation. That's how.

How do we even start the procedure of processing our list nodes? We need to start at the `head` of our linked list and continue on until we've processed the last list node. We can define a `curr` variable to *point* to whatever node is currently being processed. We will continue procesing our list nodes until the list has been exhausted (i.e., until `curr` is `None`; this is due to the fact that `None` is the `next` property value of the very last node in the list). Great. So far we have the following:

```python
def reverse(self):
    curr = self.head
    while curr is not None:
```

Now what? As noted previously, we can't get to `ListNode(2)` if we immediately change the `next` value of `ListNode(1)` to `None`. One solution is to define a `temp` variable that will *point* to the next node in our list so we never have to worry about completely breaking the link in our linked list no matter what we do with the current node. If we are trying to *reverse* our list, then what should we always be doing with our current node, `curr`? Should we not always be setting its `next` property value to whatever node occurred previously in the list; that is, for something like `1 -> 2 -> 3 -> None`, where `curr` is `ListNode(1)`, what should we do? There is no previous node--the "previous node" is `None`. But if we set `curr.next` to `None`, then we lose our reference to `ListNode(2)`. This is why we needed to define the reference-preserving `temp` pointer, which now points at `ListNode(2)`.

We can define another pointer `prev`, to always refer to the "previous node" in the list in relation to the current node `curr`. In the context of this problem, it is sensible to define `prev = None` before the `while` loop since it's impossible for a "previous node" to exist in relation to the `head` of the linked list (i.e., it makes sense to initially define `prev = None` when `curr = self.head`). Great. Now we have the following:

```python
def reverse(self):
    prev = None
    curr = self.head
    while curr is not None:
      temp = curr.next
      curr.next = prev
```

Now what? The `while` loop above would run endlessly since `curr` is not being changed in any way (i.e., `curr.next` is being changed but not `curr` itself). What should we do? How should we update `curr` so as to proceed in processing each node of our list? Well, recall why we defined the `temp` pointer in the first place: so we wouldn't lose reference to what the next node in the list should be in relation to the current node. This suggests a simple assignment: `curr = temp`. But be careful--notice how we have not yet updated the `prev` pointer. If we executed the assignment `curr = temp` directly after `curr.next = prev`, then we would have another problem on our hands: What should `prev` be? Right now this pointer is not being updated in any way. If we tried to update `prev` after `curr = temp`, then what could it possibly point to? Executing `curr = temp` directly after `curr.next = prev` would result in losing reference to our current node, which is what `prev` needs to point to for the next iteration of the `while` loop! This suggests we should have the following:

```python
def reverse(self):
    prev = None
    curr = self.head
    while curr is not None:
      temp = curr.next
      curr.next = prev
      prev = curr
      curr = temp
```

Now what? Are we done? Almost! But we have not done one critically important thing. What is the only piece of information we absolutely must have when working with singly linked lists? The `head` of the list. But we haven't updated `self.head` at all in the code above. In the context of our example, `self.head` still refers to `ListNode(1)`, whose `next` property value has now been updated to `None`. Hence, if we were to print our current linked list, we would see something deceptive like `1 -> None` since the `head` of our linked list is still `ListNode(1)`. Since the `next` value of `ListNode(1)` is now `None`, it *technically* makes sense that our linked list may be visually represented as `1 -> None`. We need to change this. The `head` of our linked list *should* be `ListNode(3)`. How can we accomplish this in a programmatic fashion given our work above?

Note that the `while` loop in our `reverse` method will run its last iteration once `curr` points to `ListNode(3)`, the last node in our list and whose `next` property value is `None`. Should we update `self.head` outside of the `while` loop to be `curr`? No, because we set `curr = temp` inside the `while` loop--this means that when `curr` is `ListNode(3)`, then `temp = curr.next` means `temp` is `None`--and the last step of the `while` loop is the assignment `curr = temp`. What we really want is the `prev` from `prev = curr` which comes *before* the `curr = temp` assignment. Hence, on the last iteration of the `while` loop for our example, `prev` points to `ListNode(3)`, which is exactly what we want the `head` of our newly reversed linked list to be. Thus, our final step is to make the assignment `self.head = prev` outside of the `while` loop:

```python
def reverse(self):
    prev = None
    curr = self.head
    while curr is not None:
      temp = curr.next
      curr.next = prev
      prev = curr
      curr = temp
    
    self.head = prev
```

In the context of the LeetCode problem (i.e., <LC id='206' type='' ></LC>), our solution is somewhat different:

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
        
        return prev
```

This is due to the fact that all you need for a singly linked list is the `head`, and, as discussed above, what `prev` points to after the last iteration of the `while` loop is what the `head` should be for the reversed linked list.

##### Insert new node at beginning

Inserting a new node at the beginning of a list is probably the most straightforward insertion since you don’t have to traverse the whole list to do it. The entire problem revolves around creating a new node and then establishing it as the new `head` of the list and ensuring its `next` property value is a reference to the old `head`:

```python 
def appendleft(self, node):
    node.next = self.head
    self.head = node
```

Note that the implementation above works even if a linked list is empty (i.e., only has a `head` that points to `None`).

##### Insert new node at end

Inserting a new node at the end of the list forces you to traverse the whole linked list first and to add the new node when you reach the end. You can’t just append to the end as you would with a normal list because in a linked list you don’t know which node is last. Also, some care needs to be taken to ensure we do not append a node to an empty linked list (i.e., if the linked list being appended to is empty, then the node being appended should become the `head` the linked list):

```python
def appendright(self, node):
    if self.head is None:
        self.head = node
        return
    
    # highlight-start
    curr = self.head
    prev = None
    while curr is not None:
        prev = curr
        curr = curr.next
        
    prev.next = node
    # highlight-end
```

If the `__iter__` method is defined on our `LinkedList` as previously shown, namely

```python
def __iter__(self):
    node = self.head
    while node is not None:
        yield node
        node = node.next
```

then the highlighted portion of the code in the `appendright` method above can be simplified to the following:

```python
def add_last(self, node):
    if self.head is None:
        self.head = node
        return

    # highlight-start
    for current_node in self:
        pass
    current_node.next = node
    # highlight-end
```

The idea in the simplified code is that we want to traverse the whole list until we reach the end (i.e., until the `for` loop raises a `StopIteration` exception). Then we want to set the `next` property value of `current_node`, which represents the last node of the list, to `node`, the node we want to become the last node of the list.

##### Insert node between nodes (after)

tbd

##### Insert node between nodes (before)

tbd

## Algorithms

## Problem-solving

### Creativity

- **Data structures:** As a human, don't be afraid to use one of your greatest strengths: *creativity*. We are bound by little else than our imagination. In the context of data structures, how might creativity manifest itself? Well, just because a data structure is usually implemented in one way, it's not true that you must *always* implement the data structure in that way (unless, of course, your implementation fundamentally changes the data structure so the defining features are no longer present).

  For example, consider <LC id='155' type='' ></LC>, where you are tasked with implementing `MinStack`. Don't be afraid to tinker with different standard stack methods. In this problem, it helps to be creative with the stack's `push` method. Maybe the stack shouldn't be a stack of single integer values. Maybe the stack should consist of tuples much as a linked list consists of nodes where one piece of node data is the datum value itself while the other piece of data is a pointer to the *next* piece of data. Bottom line: always be thinking of what you could do to improve things for whatever specific problem you are facing.

### Equivalent approaches

- **Dynamic programing:** If you can't figure out a dynamic programming solution, then you can always do DFS + memoization which does the same thing.

### Mental models

#### Linked lists

A linked list problem may become more approachable if viewed largely as an exercise in pointer manipulation.