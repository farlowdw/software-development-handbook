The key feature of [`defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict) is that it provides a default value for the key that does not exist. The type of this default value, usually provided in the form of a function like `int` (default value `0`) or `list` (default value `[]`) or `set` (default value `{}`), is specified when the `defaultdict` is instantiated.

This means something as simple as tracking the character frequencies in the string `"hello world"` is simplified (because we do not have to check for the key's existence first). With `defaultdict`:

```python
from collections import defaultdict

s = "hello world"
frequency = defaultdict(int)

for char in s:
    frequency[char] += 1

print(frequency)
```

Without `defaultdict`:

```python
s = "hello world"
frequency = {}

for char in s:
    if char in frequency:
        frequency[char] += 1
    else:
        frequency[char] = 1

print(frequency)
```