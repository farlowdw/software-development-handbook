def partition(A, start, end):
    pivot = A[end]                          # the pivot
    i = start - 1                           # highest index into the low side (empty at first)
    for j in range(start, end):             # process each element other than the pivot
        if A[j] <= pivot:                   # does element A[j] belong on the low side?
            i = i + 1                         # index of a new slot in the low side
            A[i], A[j] = A[j], A[i]           # place element A[j] there
    A[i + 1], A[end] = A[end], A[i + 1]     # pivot goes just to the right of the low side
    return i + 1                            # new index of the pivot

def quicksort(A, start, end):
    if start < end:
        pivotIndex = partition(A, start, end)   # partition the subarray around the pivot, which ends up in A[pivotIndex]
        if pivotIndex - start < end - pivotIndex:
            quicksort(A, start, pivotIndex - 1)     # recursively sort the low side
            quicksort(A, pivotIndex + 1, end)       # recursively sort the high side
        else:
            quicksort(A, pivotIndex + 1, end)       # recursively sort the low side
            quicksort(A, start, pivotIndex - 1)     # recursively sort the high side
            
        
nums = [40, 41, 17, -22, 25, 55, -18, 35, 10, 25, 33, 19, 44, 51, 25]
print(nums)
quicksort(nums, 0, len(nums) - 1)
print(nums)