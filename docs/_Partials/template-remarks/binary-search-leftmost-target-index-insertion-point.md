This template ensures we find the leftmost occurrence (i.e., minimum index value) of `target` (if it exists). If `target` does not exist in the input array, `arr`, then this template will return the index at which `target` should be inserted to maintain the ordered property of `arr`.

How does this work? What happens if it's ever the case that `arr[mid] == target` in the template function above? It's the *right* half that gets collapsed, by means of `right = mid`, thus pushing the search space *as far left as possible*.

:::tip Computing total number of elements within input array less than target value

The `left` value returned by the function in the template above is also the number of elements in `arr` that are less than `target`.

This should make sense upon some reflection &#8212; if the function in our template returns the left-most occurrence of the `target` value as well as the insertion point of `target` to keep the sorted property of `arr`, then it must be the case that *all* values to the left of the returned value are less than `target`. The fact that arrays are 0-indexed helps here; for example, if our template function returns `3`, then this means the three elements at index `0`, `1`, and `2` are all less than `target`.

:::
