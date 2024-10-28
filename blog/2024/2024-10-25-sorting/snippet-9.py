from typing import *

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
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
            merge_sort(A, start, mid, temp)         # recursively sort first half of A
            merge_sort(A, mid + 1, end, temp)       # recursively sort second half of A

            if A[mid] > A[mid + 1]:                 # only merge sorted arrays if they need to be merged
                for i in range(start, mid + 1):     # copy left half of A into temp
                    temp[i] = A[i]

                merge(A, start, end, temp)          # merge sorted values back into A

        temp = [0] * len(nums)
        merge_sort(nums, 0, len(nums) - 1, temp)
        return nums
    
sol = Solution()
nums_ex1 = [5,2,3,1]
print(sol.sortArray(nums_ex1))  # [1,2,3,5]
nums_ex2 = [5,1,1,2,0,0]
print(sol.sortArray(nums_ex2))  # [0,0,1,1,2,5]