**TLDR:** The default comparison is made by determining whether or not the two nodes point to the same object in memory; that is, `node1 == node2` effectively equates to `id(node1) == id(node2)` by default in Python.

---

If `node1` and `node2` are both nodes from a linked list, then what does `node1 == node2` actually test? How is the returned boolean computed? The following snippet is illustrative:

```python
nodeA = ListNode(1)
nodeB = nodeA
nodeC = ListNode(1)

print(nodeA == nodeB)   # True
print(nodeA == nodeC)   # False
```

As [noted on Stack Overflow](https://stackoverflow.com/a/6423867/5209533), for an arbitrary object, the `==` operator will only return true if the two objects are the same object (i.e., if they refer to the same address in memory). This is often what we actually want when it comes to linked list nodes.

The [Python docs about value comparisons](https://docs.python.org/3/reference/expressions.html#value-comparisons) back up the note above:

> The operators `<`, `>`, `==`, `>=`, `<=`, and `!=` compare the values of two objects. The objects do not need to have the same type.
>
> Chapter [Objects, values and types](https://docs.python.org/3/reference/datamodel.html#objects) states that objects have a value (in addition to type and identity). The value of an object is a rather abstract notion in Python: For example, there is no canonical access method for an object's value. Also, there is no requirement that the value of an object should be constructed in a particular way, e.g. comprised of all its data attributes. Comparison operators implement a particular notion of what the value of an object is. One can think of them as defining the value of an object indirectly, by means of their comparison implementation.
>
> Because all types are (direct or indirect) subtypes of [object](https://docs.python.org/3/library/functions.html#object), they inherit the default comparison behavior from [object](https://docs.python.org/3/library/functions.html#object). Types can customize their comparison behavior by implementing *rich comparison* methods like [`__lt__()`](https://docs.python.org/3/reference/datamodel.html#object.__lt__), described in [Basic customization](https://docs.python.org/3/reference/datamodel.html#customization).
>
> The default behavior for equality comparison (`==` and `!=`) is based on the identity of the objects. Hence, equality comparison of instances with the same identity results in equality, and equality comparison of instances with different identities results in inequality. A motivation for this default behavior is the desire that all objects should be reflexive (i.e. `x is y` implies `x == y`).

One can override the default [`__eq__`](https://docs.python.org/3/reference/datamodel.html#object.__eq__), if desired, but this will likely lead to undesired behavior, particularly in this context of dealing with linked lists. As [the Python docs note](https://docs.python.org/3/reference/datamodel.html#object.__eq__):

> By default, `object` implements `__eq__()` by using `is`, returning `NotImplemented` in the case of a false comparison: `True if x is y else NotImplemented`. For `__ne__()`, by default it delegates to `__eq__()` and inverts the result unless it is `NotImplemented`. There are no other implied relationships among the comparison operators or default implementations; for example, the truth of (`x<y` or `x==y`) does not imply `x<=y`. To automatically generate ordering operations from a single root operation, see [`functools.total_ordering()`](https://docs.python.org/3/library/functools.html#functools.total_ordering).