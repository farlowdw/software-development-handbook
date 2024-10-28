# merge left list and right list back into A
def merge(A, start, mid, end, temp):
    for i in range(start, mid + 1):     # copy left subarray into temp
        temp[i] = A[i]
    i = start                           # index into temp (left subarray)
    j = mid + 1                         # index into right subarray in A
    k = start                           # index into merged array in A

    # merge temp (left subarray) and A (right subarray) back into A
    while i < mid + 1 and j < end + 1:
        if temp[i] <= A[j]:
            A[k] = temp[i]
            i += 1
        else:
            A[k] = A[j]
            j += 1
        k += 1

    # merge remaining elements from temp back into A
    while i < mid + 1:
        A[k] = temp[i]
        i += 1
        k += 1
    
    # remaining elements of right list in A are already in-place (no need for merging)

def merge_sort(A):
    n = len(A)
    temp = [0] * n  # allocate working space only once
    size = 1        # size of sublists to sort and merge
    while size < n:
        for start in range(0, n, 2 * size):           # partition A into segments of length `2 * size` (sublists of length `size` can then be pairwise sorted and merged)
            mid = min(start + (size - 1), n - 1)      # left list of length `size` starts at `start` and ends at `start + (size - 1)`, inclusive
            end = min((mid + 1) + (size - 1), n - 1)  # right list of length `size` starts at `mid + 1` and ends at `(mid + 1) + (size - 1)`, inclusive
            if mid < end and A[mid] > A[mid + 1]:     # check if merge is necessary (otherwise sublists are already in order)
                merge(A, start, mid, end, temp)
        size *= 2                                     # double the size of the sublists being merged on each pass

nums = [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
print(nums) # [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
merge_sort(nums)
print(nums) # [-50, -22, 10, 15, 17, 19, 20, 22, 25, 25, 40, 44, 50]