# merge B and C back into A
def merge(A, start, B, C):
    i = j = 0
    k = start
    
    # compare smallest elements before each merge
    while i < len(B) and j < len(C):
        if B[i] <= C[j]:
            A[k] = B[i]
            i += 1
        else:
            A[k] = C[j]
            j += 1
        k += 1
        
    # merge any remaining elements of B into A
    while i < len(B):
        A[k] = B[i]
        i += 1
        k += 1
    
    # merge any remaining elements of C into A
    while j < len(C):
        A[k] = C[j]
        j += 1
        k += 1       

def merge_sort(A, start, end):
    # base case (empty or single-element list is already sorted)
    if end <= start:
        return
    
    mid = (end + start) // 2
    merge_sort(A, start, mid)   # recursively sort first half of A
    merge_sort(A, mid + 1, end) # recursively sort second half of A
    B = A[start:mid+1]          # copy sorted first half to B[]
    C = A[mid+1:end+1]          # copy sorted second half to C[]
    merge(A, start, B, C)       # merge sorted values B[] and C[] back into A[start...end]
        
nums = [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
print(nums) # [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
merge_sort(nums, 0, len(nums) - 1)
print(nums) # [-50, -22, 10, 15, 17, 19, 20, 22, 25, 25, 40, 44, 50]