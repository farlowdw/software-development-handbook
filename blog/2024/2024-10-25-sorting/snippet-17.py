def partition(A, start, end):
    pivot = A[start]       # choose first element as pivot
    i = start - 1          # initialize i before start index
    j = end + 1            # initialize j after end index
    
    while True:
        while True:             # move j to the left until an element less than or equal to the pivot is found
            j -= 1                  # decrement j
            if A[j] <= pivot:       # check if A[j] is less than or equal to pivot
                break               # exit loop if condition is met

        while True:             # move i to the right until an element greater than or equal to the pivot is found
            i += 1                  # increment i
            if A[i] >= pivot:       # check if A[i] is greater than or equal to pivot
                break               # exit loop if condition is met

        if i < j:               # partitioning is done if i and j have crossed; otherwise, swap elements and continue
            A[i], A[j] = A[j], A[i] # swap elements at indices i and j
        else:
            return j                # return partition index (i and j crossed)

def quicksort(A, start, end):
    while start < end:
        pivotIndex = partition(A, start, end)       # partition the array and get the pivot index
        if pivotIndex - start < end - pivotIndex:   # tail call optimization (process smaller partition first to reduce stack depth)
            quicksort(A, start, pivotIndex)         # recursively sort left partition
            start = pivotIndex + 1                  # update start to sort right partition next
        else:
            quicksort(A, pivotIndex + 1, end)       # recursively sort right partition
            end = pivotIndex                        # update end to sort left partition next
            
        
nums = [40, 41, 17, -22, 25, 55, -18, 35, 10, 25, 33, 19, 44, 51, 25]
print(nums) # [40, 41, 17, -22, 25, 55, -18, 35, 10, 25, 33, 19, 44, 51, 25]
quicksort(nums, 0, len(nums) - 1)
print(nums) # [-22, -18, 10, 17, 19, 25, 25, 25, 33, 35, 40, 41, 44, 51, 55]