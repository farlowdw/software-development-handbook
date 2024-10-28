# merge left list and right list back into A
def merge(A, start, end, temp):
    mid = (end + start) // 2 + 1
    i = start                       # index into temp (left half)
    j = mid                         # index into right half of A
    k = start                       # index into merged array in A
    
    # merge elements from temp and right half of A back into A
    while i < mid and j < end + 1:
        if temp[i] <= A[j]:
            A[k] = temp[i]
            i += 1
        else:
            A[k] = A[j]
            j += 1
        k += 1
        
    # merge any remaining elements of temp (left half) back into A
    while i < mid:
        A[k] = temp[i]
        i += 1
        k += 1
    
    # remaining elements in right half of A are already in-place (no copying needed)

def merge_sort(A, start, end, temp):
    # base case (empty or single-element list is already sorted)
    if end <= start:
        return
    
    mid = (end + start) // 2
    merge_sort(A, start, mid, temp)     # recursively sort first half of A
    merge_sort(A, mid + 1, end, temp)   # recursively sort second half of A
    
    for i in range(start, mid + 1):     # copy left half of A into temp
        temp[i] = A[i]
        
    merge(A, start, end, temp)          # merge sorted values back into A
        
nums = [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
temp = [0] * len(nums)
print(nums) # [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
merge_sort(nums, 0, len(nums) - 1, temp)
print(nums) # [-50, -22, 10, 15, 17, 19, 20, 22, 25, 25, 40, 44, 50]