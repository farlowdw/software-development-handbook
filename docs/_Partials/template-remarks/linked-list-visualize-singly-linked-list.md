**TLDR:** Add a simple `__repr__` method to the base `ListNode` class. This lets you view the linked list extending from any given `my_node` by simply running `print(my_node)`. To effectively use sample LeetCode inputs in your local testing, you'll need a function `arr_to_ll` to convert integer arrays into linked lists.

---

Linked list problems are all about pointer manipulation and it can help a ton to *see* things, especially if you need to debug issues with your code. LeetCode almost always provides a linked list by simply providing the `head` node, where all nodes in the list have been created with the following `ListNode` class (or some minor variation):

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
```

Given any node, probably the easiest way to visualize the singly linked list that extends from this node is to implement a basic `__repr__` method as part of the `ListNode` class:

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
        
    def __repr__(self):
        node = self
        nodes = []
        
        while node:
            nodes.append(str(node.val))
            node = node.next
            
        nodes.append('None')

        return ' -> '.join(nodes)
```

Of course, LeetCode generally shows a linked list as input by providing an integer array. To effectively test your local code on LeetCode inputs, it's necessary to first convert the integer array to a linked list:

```python
def arr_to_ll(arr):
    sentinel = ListNode(-1)
    curr = sentinel
    for val in arr:
        new_node = ListNode(val)
        curr.next = new_node
        curr = curr.next
    return sentinel.next
```

We can now effectively use LeetCode inputs, visualize them, and also subsequently visualize whatever changes we make to the input:

```python
example_input = [5,2,6,3,9,1,7,3,8,4]
head = arr_to_ll(example_input)
print(head) # 5 -> 2 -> 6 -> 3 -> 9 -> 1 -> 7 -> 3 -> 8 -> 4 -> None
```
