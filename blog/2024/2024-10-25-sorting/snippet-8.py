# merge left list and right list of source into destination
def merge(source, dest, start, mid, end):
    i = start                           # index into left subarray (in source)
    j = mid + 1                         # index into right subarray (in source)
    k = start                           # index into merged array (in destination)
    
    # merge left subarray and right subarray of source back into destination
    while i < mid + 1 and j < end + 1:
        if source[i] <= source[j]:
            dest[k] = source[i]
            i += 1
        else:
            dest[k] = source[j]
            j += 1
        k += 1
        
    # merge remaining elements from left subarray in source back into destination
    while i < mid + 1:
        dest[k] = source[i]
        i += 1
        k += 1
        
    # merge remaining elements from right subarray in source back into destination
    while j < end + 1:
        dest[k] = source[j]
        j += 1
        k += 1
        
def merge_sort(A):
    n = len(A)
    B = [0] * n         # allocate a second array
    size = 1            # size of sublists to be merged on each pass
    sorted_in_B = False # flag to determine whether or not the original array holds the sorted values
    while size < n:
        for start in range(0, n, 2 * size):
            mid = min(start + size - 1, n - 1)          # last index of left subarray
            end = min((mid + 1) + (size - 1), n - 1)    # last index of right subarray
            if sorted_in_B:
                merge(B, A, start, mid, end)            # merge from B into A
            else:
                merge(A, B, start, mid, end)            # merge from A into B
        size *= 2
        sorted_in_B = not sorted_in_B

    if sorted_in_B:                                     # if A does not hold the final sorted values
        for i in range(len(A)):                         # (total number of passes is odd)
            A[i] = B[i]                                 # then copy sorted values from B into A
        
nums = [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
print(nums) # [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
merge_sort(nums)
print(nums) # [-50, -22, 10, 15, 17, 19, 20, 22, 25, 25, 40, 44, 50]