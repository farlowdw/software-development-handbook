import LC from '@site/src/components/LC';

**TLDR:** Linked list problems are all about pointer manipulation. Rarely do we change `val` attributes for nodes in a linked list, but we regularly shift nodes around by artfully manipulating `next` attributes for various nodes (i.e., pointer manipulation).

- **Note 1:** The assignment `my_var = some_node` means `my_var` will *always* point to the original `some_node` object in memory unless modified directly (e.g., `my_var = something_else`). Caveat to this is the note below.
- **Note 2:** The *attribute values* of `some_node`, namely `val` and `next`, *can* be modified indirectly by various means. Hence, even though `my_var` may not point to a *different object in memory*, if the attribute values of the underlying object in memory are changed, then it will likely *appear* as though `my_var` no longer refers to its originally referenced object even though it technically does.

---

**Note 1 (variables remain at nodes unless modifed directly):**

When you assign a pointer to an existing linked list node, the pointer refers to the object in memory. Suppose you have a node `head`:

```python
ptr = head
head = head.next
head = None
```

After these lines of code, `ptr` still refers to the original `head` node, even though the `head` variable changed. This underscores an important concept concerning linked lists and pointer manipulation: variables remain at nodes unless they are modified directly (i.e., `ptr = something` is the only way to modify `ptr`).

We can see this more easily and explicitly in Python by using the `id()` function, which returns the address of the object in memory (for the CPython implementation of Python):

```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None
    
one = ListNode(1)
two = ListNode(2)
one.next = two
head = one

# highlight-next-line
print(id(head))     # 4423470576
ptr = head 
# highlight-next-line
print(id(ptr))      # 4423470576
head = head.next
print(id(head))     # 4423470480
head = None 
print(id(head))     # 4420398192
# highlight-next-line
print(id(ptr))      # 4423470576
```

Objects are mutable in Python. When we make the assignment `ptr = head`, we are effectively making `ptr` point to the same memory address as `head`. The assignment more or less looks like the following:

<div align='center' className='centeredImageDiv'>
  <img width='650px' src={require('@site/static/img/templates/linked-lists/f2.png').default} />
</div>

Subsequently, when we assign `head` to `head.next`, we are making `head` point to the same memory address as `head.next`:

<div align='center' className='centeredImageDiv'>
  <img width='650px' src={require('@site/static/img/templates/linked-lists/f3.png').default} />
</div>

Note that `ptr` is *not* still pointing at `head` (it's pointing to the object in memory that `head` originally pointed to). The takeaway: a variable that serves as a specific node assignment will remain as such a specific node assignment unless modified directly to point to another node. This is what allows us above to point `ptr` to `head` and then do whatever we want to with `head` all while maintaining our reference to the original `head` with `ptr`.

**Note 2 (node attributes such as `val` and `next` may be modified indirectly):**

As detailed in the note above, the code block

```python
ptr = head
head = head.next
head = None
```

means that `ptr`, unless modified directly, will *always* point to the object in memory originally referred to by `head`.

Importantly, however, the object in memory originally referred to by `head` can have its *attributes* modified *indirectly* (i.e., the `val` and `next` attributes of the `head` object to which `ptr` points can be modified without altering `ptr` directly). The following example can help illustrate this important observation:

```python
head = ListNode(100)
node1 = ListNode(1)
node2 = ListNode(2)
node3 = ListNode(3)
head.next = node1
node1.next = node2
node2.next = node3

sentinel = ListNode(-1)
sentinel.next = head

ptr = head
head = head.next
head = None


print(id(ptr))              # 0123456789
print(ptr)                  # 100 -> 1 -> 2 -> 3 -> None
print(ptr.val)              # 100
print(ptr.next)             # 1 -> 2 -> 3 -> None

sentinel.next.val = 7       # original "head" attribute "val" changes from 100 to 7
sentinel.next.next = node2  # original "head" attribute "next" changes from node1 to node2

print(id(ptr))              # 0123456789
print(ptr)                  # 7 -> 2 -> 3 -> None
print(ptr.val)              # 7
print(ptr.next)             # 2 -> 3 -> None
```

Note that `ptr` was never modified directly and that it still points to the same object in memory before and after the `sentinel.next.[val|next]` changes (i.e., printing `id(ptr)` before and after the changes confirms this since the printed values are the same). 

But it certainly *seems* like `ptr` has changed somehow. This is because the object `ptr` points to *has changed* in terms of its `val` and `next` attribute values. We changed those values *indirectly* by altering `sentinel.next`, which pointed to the same mutable object in memory as `ptr`. Altering the attribute values of the original `head` object in memory directly with `ptr.[val|next]` or indirectly with `sentinel.next.[val|next]` makes no difference. The effect is the same: `ptr` *looks* different even though it still points to the same object in memory.

**Example:** A solution to problem <LC id='2095' type='long' ></LC> can illustrate the concepts in the second note in a concrete, practical manner:

```python
class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        sentinel = ListNode(-1)
        sentinel.next = head
        
        prev = sentinel
        slow = head
        fast = head
        
        # slow points to middle node upon termination
        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next
        
        # skip middle node, effectively removing it
        prev.next = prev.next.next
        return sentinel.next
```

How does this illustrate the utility of the second note? Consider the case where the linked list is just a single node: `[1]`. Removing the middle node means removing the only node, meaning we should return `[]` or `None`. How is the solution above correct for this edge case since the `while` loop does not fire, `sentinel.next` originally points to `head`, and we ultimately return `sentinel.next` without ever making a direct reassignment? How does `sentinel.next` end up pointing to a null value even though it originally points to `head`?

The reason is due to how `prev` is being manipulated. Since `prev` points to `sentinel` and the `while` loop doesn't fire, the assignment `prev.next = prev.next.next` effectively changes what `sentinel.next` points to; that is, we're not changing `sentinel` directly, but we *are* changing the `next` attribute value of the underlying object in memory being pointed to by `sentinel`. Hence, `prev.next = prev.next.next` is effectively the assignment `sentinel.next = sentinel.next.next`; since `sentinel.next` points to `head` and `head.next` is `None`, we get our desired result by returning the null value (which indicates the single object has been removed).