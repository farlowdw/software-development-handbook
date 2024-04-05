**TLDR:** Sentinel or "dummy" nodes can simplify linked list operations, especially those involving the `head` for singly linked lists (one sentinel node) or the `head` and `tail` for doubly linked lists (two sentinel nodes).

---

[Sentinel nodes](https://en.wikipedia.org/wiki/Sentinel_node), also known as "dummy" nodes, often simplify linked list operations considerably, especially when dealing with addition or removal operations involving the `head` of a linked list. The following brief explanation/definition from ChatGPT is arguably more readable than the linked Wiki article above:

> A sentinel node is a dummy or placeholder node used in data structures to simplify boundary conditions and operations. In the context of linked lists, a sentinel node acts as a non-data-bearing head or tail node, eliminating the need for handling special cases for operations at the beginning or end of the list, such as insertions or deletions. It streamlines code by providing a consistent starting or ending point, regardless of whether the list is empty or contains elements.

In the context of solving LeetCode problems (or algorithmic problems in general), you will often see a sentinel node used for singly linked lists in the following manner:

```python
class Solution:
    def fn(self, head: Optional[ListNode]) -> Optional[ListNode]:
      sentinel = ListNode(-1)
      sentinel.next = head
      prev = sentinel
      curr = head

      # do something with prev, curr, and execute other logic
      
      return sentinel.next  # return the new/original head of the modified linked list
```

A very simple example that highlights the utility of sentinel nodes is the following: Given an integer array `nums`, how can you convert the array into a linked list? The immediate problem that confronts is what to do about the `head` for the new linked list. It will obviously be the first element in `nums`, but is there a nice way of building the list? A simple sentinel node allows us to do just that:

```python
def linked_list_from_arr(nums):
    sentinel = ListNode(-1)
    curr = sentinel
    for num in nums:
        curr.next = ListNode(num)
        curr = curr.next
    return sentinel.next
```