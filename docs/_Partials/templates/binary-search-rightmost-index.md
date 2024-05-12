```python
def binary_search_rightmost(arr, target):
    left = 0
    right = len(arr)

    while left < right:
        mid = left + (right - left) // 2

        if target < arr[mid]:
            right = mid
        else:
            left = mid + 1

    return left - 1
```