# merge B and C back into A
def merge(A, B, C):
    i = j = k = 0
    
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

def merge_sort(A):
    # base case (empty or single-element list is already sorted)
    if len(A) < 2:
        return

    mid = len(A) // 2
    B = A[:mid]     # copy first half of A to new array B
    merge_sort(B)
    C = A[mid:]     # copy second half of A to new array C
    merge_sort(C)
    merge(A, B, C)  # merge recursively sorted B and C back into A

nums = [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
print(nums) # [17, -22, 15, 20, -50, 25, 22, 19, 10, 40, 44, 50, 25]
merge_sort(nums)
print(nums) # [-50, -22, 10, 15, 17, 19, 20, 22, 25, 25, 40, 44, 50]