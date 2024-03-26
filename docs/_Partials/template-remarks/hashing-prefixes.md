
import LC from '@site/src/components/LC';

Many problems can be solved using the sliding window technique (fixed or variable size), particularly problems involving subarrays that need to satisfy a given constraint. For such problems, it is frequently the case that all sub-windows of a valid window also satisfy the given constraint; for example, if the input has only positive numbers, and we're trying to find the number of subarrays that have a sum less than `k`, then a valid window's sub-windows will all be valid as well. 

But sometimes a given constraint can be more restrictive. For example, in some cases, we might be interested in the *exact* number of subarrays that satisfy some constraint like the number of subarrays whose sum *equals* `k`. Such problems require a nuanced approach because the sliding window technique no longer applies.

The basic idea with these problems (despite their seemingly more complicated nature) is to exploit "computationally advantageous complements" in some way. What does this mean? The very basic core idea behind a solution to <LC id='1' type='long' ></LC> is illustrative: If we're given a `target` value and another value `num1`, then how can we determine whether or not another number exists, say `num2`, such that `num1 + num2 == target`? The answer is to look at the *complement* of `num1`, namely `target - num1`, because `num1 + (target - num1) == target`. This means the `num2` value we seek must be equivalent to `target - num1`, the complement of `num1`.

How does this apply to subarray problems involving an "exactness" constraint? In the template provided below, `curr` represents a cumulative prefix for some metric we care about (e.g., subarray sum, number of odd integers, balance of `0`s and `1`s, or any other metric you might be concerned with). The `lookup` hash map has "referential prefixes" as its keys with other problem-specific data as its values. Typically, the keys in `lookup` will be used in some complementary fashion with `curr`; that is, a core part of the problem is figuring out how to *complementarily* relate the cumulative or rolling prefix, `curr`, with the previously encountered referential prefixes `lookup` (its keys), thus yielding useful data of some sort (its values).

Here are some quick example problems to highlight appropriate choices of `curr`, `lookup`, the complementary relationship being exploited, and the appropriate initializion conditions for `lookup`:

- <LC id='560' type='long' ></LC>
  + `curr`: Running sum of the input array
  + `lookup`:
    * keys: Each subarray sum as it's encountered
    * values: The number of times (frequency) the subarray sum has been encountered
  + complementary relationship: If the array sum is `curr`, then all subarrays seen previously that have a sum of `curr - k` should count towards our final answer since `curr - (curr - k) == k`:

    $$
    \overbrace{\texttt{lookup}[\underbrace{\texttt{curr - k}}_{\substack{\text{key representing subarrays}\\\text{with sum of curr - k}}}]}^{\substack{\text{number or frequency of subarrays}\\\text{seen so far with a sum of curr - k}}}
    $$

  + initialization: We need to set `lookup[0] = 1` to represent the number of times we have seen a subarray with a sum of `0` (i.e., the empty prefix). This ensures we do not overlook cases where the subarray meeting the condition starts at the beginning of the array; for example, if `nums = [4,1,2], k = 4`, then the subarray `[4]` meets the condition but `lookup[4 - 4]` would not return the correct value of `1` unless we explicitly set `lookup[0] = 1` at the beginning.
  + solution reference:

    ```python
    class Solution:
        def subarraySum(self, nums: List[int], k: int) -> int:
            lookup = defaultdict(int)
            lookup[0] = 1
            curr = ans = 0
            
            for num in nums:
                curr += num
                ans += lookup[curr - k]
                lookup[curr] += 1
                
            return ans
    ```

- <LC id='1248' type='long' ></LC>
  + `curr`: Running total of how many odd numbers have been encountered
  + `lookup`:
    * keys: Each subarray total of odd numbers as they're encountered
    * values: The number of times (frequency) a subarray has been encountered with the specified number of odd values
  + complementary relationship: If the total number of odd numbers is `curr`, then all subarrays seen previously that have an odd number count of `curr - k` should count towards our final answer since `curr - (curr - k) == k`:

    $$
    \overbrace{\texttt{lookup}[\underbrace{\texttt{curr - k}}_{\substack{\text{key representing subarrays}\\\text{with odd integer count of curr - k}}}]}^{\substack{\text{number or frequency of subarrays}\\\text{seen so far with odd integer count of curr - k}}}
    $$

  + initialization: We need to set `lookup[0] = 1` to represent the number of times we have seen a subarray with an odd integer count of `0` (i.e., the empty prefix). This ensures we do not overlook cases where the subarray meeting the condition starts at the beginning of the array; for example, if `nums = [3,1,2], k = 2`, then the subarray `[3,1]` meets the condition but `lookup[2 - 2]` would not return the correct value of `1` unless we explicitly set `lookup[0] = 1` at the beginning.
  + solution reference:

    ```python
    class Solution:
        def numberOfSubarrays(self, nums: List[int], k: int) -> int:
            lookup = defaultdict(int)
            lookup[0] = 1
            curr = ans = 0
            
            for num in nums:
                if num % 2 == 1:
                    curr += 1
                    
                ans += lookup[curr - k]
                lookup[curr] += 1
                
            return ans
    ```

- <LC id='525' type='long' ></LC>
  + `curr`: Balance of all `0`s and `1`s seen thus far (`0` means balanced, positive means more `1`s than `0`s, and negative means more `0`s than `1`s)
  + `lookup`:
    * keys: Balance of `0`s and `1`s seen in previous subarrays
    * values: Earliest index of a subarray containing the specified balance of `0`s and `1`s (the index recorded is the right endpoint of the subarray, inclusive)
  + complementary relationship: Suppose we encounter a balance of `curr = 3` for a subarray (whose index we note in our `lookup` hash map) and later encounter the same balance of `curr = 3`. This means the number of `0`s and `1`s added in the interim must be equivalent since the balance is the same as it was previously:

    $$
    [\underbrace{\underbrace{1,1,1}_{\substack{\text{curr = 3}\\\text{index = 2}}},\underbrace{\overbrace{x,x,x,x,x,x}^{\substack{\text{0s and 1s added}\\\text{in the interim}}}}_{\text{must be balanced}}}_{\substack{\text{curr = 3}\\\text{index = 8}\\\text{length = 8 - 2 = 6}}},\ldots]
    $$

    Note how the subtraction for the length computation *does not include* the left endpoint. This is due to how we are keeping track of the balance.
  
  + initialization: The initialization of `lookup = {0: -1}` ensures we do not improperly compute the length of a subarray that may begin at the beginning of the input array; for example, if `nums = [0,1]`, then `curr = 0` and `i - lookup[curr] = 1 - (-1) = 2` yields a sensible result whereas other definitions would not.
  + solution reference:

    ```python
    class Solution:
        def findMaxLength(self, nums: List[int]) -> int:
            lookup = {0: -1}
            curr = ans = 0
            
            for i in range(len(nums)):
                num = nums[i]
                if num == 1:
                    curr += 1
                else:
                    curr -= 1
                    
                if curr in lookup:
                    ans = max(ans, i - lookup[curr])
                else:
                    lookup[curr] = i
                    
            return ans
    ```

Note how the first two examples are additive in nature since they are tracking the *sum* of numbers or the *count* of odd integers. The last example is more abstract and thus less straightforward. The mental model is the same for all examples though.