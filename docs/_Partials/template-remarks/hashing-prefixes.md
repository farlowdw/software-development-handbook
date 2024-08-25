import LC from '@site/src/components/LC';

As noted in the remark for variable-width sliding windows, if a problem exhibits some kind of monotonic behavior (e.g., multiplying only positive integers so the product uniformly increases, adding negative numbers so the sum always decreases, etc.), then we can find the *number* of subarrays satisfying the constraint by adding `right - left + 1` for each window:

> Concretely: If the subarray/window `[left, right]` is valid and all of its subarrays are also valid, then how many valid subarrays are there that **end** at index `right`? There are `right - left + 1` in total: `[left, right]`, `[left + 1, right]`, `[left + 2, right]`, and so on until we reach `[right, right]` (i.e., the single-element window at `right`). Hence, the number of valid windows/subarrays **ending** at index `right` is equal to the size of the window, which we know is `right - left + 1`.
>
> This clever "math trick" takes advantage of the sliding nature of the algorithm, where we always determine the number of valid subarrays **ending** at each index &#8212; this makes it easy to avoid overcounting and simplifies the determination process a great deal.

With hash maps, we can look at problems that have stricter constraints:

- **Sliding window:** Calculate the number of subarrays that have a sum less than $k$ with an input comprised of *only positive integers*.
- **Hash map:** Calculate the number of subarrays whose elements have a sum *exactly equal* to $k$.

We'll let the hash map problem mentioned above (i.e., <LC id='560' type='long' ></LC>) be the guiding problem for the rest of this remark before providing example solutions to a few different problems. Since the constraint is that a subarray sum must equal *exactly* $k$, and there aren't any restrictions concerning the composition of `nums` (i.e., it can have positive *and* negative integers), there's no monotonic property, and the sliding window approach cannot be used here. 

Using a hash map effectively for this problem and pattern requires we recall the concept of prefix sums. A prefix sum allows us to efficiently find the sum of subarrays by taking the difference between two prefix sums. If we want to find subarrays that have a sum exactly equal to `k`, and we have a prefix sum of the input, then any difference in the prefix sum equal to `k` represents a subarray with a sum equal to `k`. But how can we efficiently find such differences? By using a hash map.

Let `sum_freqs` be a hash map that maps prefix sums to how often they occur &#8212; a number could appear multiple times in a prefix sum if the input has negative numbers; for example, if `nums = [1, -1, 1]`, then the prefix sum is `[1, 0, 1]`, where `1` appears twice. Initialize `sum_freqs[0] = 1` to account for the empty prefix `[]` that has a sum of `0` (we'll explore why this is necessary in more depth later). Let `ans` be our answer variable, and let `curr` represent the current sum of all elements we have iterated over thus far (i.e., the sum of the current prefix). At each element, as we iterate over the input, we update `curr` and also maintain `sum_freqs` by incrementing the frequency of `curr` by `1`. But we update the answer variable `ans` before updating `sum_freqs` (we'll explore why this is necessary too in just a moment).

How do we actually go about updating the answer variable? This is the critical bit. From the sliding window excerpt above, when we were looking for the "number of subarrays", **we focused on each index, `right`, and figured out how many valid subarrays *ended* at the current index, `right`**. We will do the same thing here. Suppose we're at an index `i`. At this point, `curr` stores the prefix of all elements up to and including `i`. How many subarrays *end* at `i` that have a sum exactly equal to `k`? If `curr` is the prefix sum up to and including `i`, then to have a sum exactly equal to `k` means we need to know the number of all subarrays that end at `i` which have a sum equal to `curr - k` because `curr - (curr - k) == k` is the desired result.

Hence, we increment our answer by `sum_freqs[curr - k]` for every index `i` (this value will clearly need to be `0` in the cases where that prefix has not been seen before). If the prefix `curr - k` has occurred multiple times before (e.g., due to negative numbers), then each of those prefixes could be used as a starting point to form a subarray *ending* at the current index `i` with a sum of `k`. That is why we need to use a hash map (i.e., to track the frequency with which different prefix sums occur).

Putting this all together yields the following:

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        sum_freqs = defaultdict(int)
        sum_freqs[0] = 1
        curr = ans = 0
        
        for num in nums:
            curr += num
            ans += sum_freqs[curr - k]
            sum_freqs[curr] += 1
            
        return ans
```

---

In general, the basic idea of the pattern described above is to cleverly exploit the complementary relationship between the current prefix, `curr`, and some previously seen prefix that can be efficiently referenced in the hash map `lookup`. Specifically, `curr` and the hash map lookup need to complement each other in a problem-specific way, where `curr` is typically maintained as a sort of "rolling" or "cumulative" prefix and the hash map lookup is used to efficiently reference previously encountered prefixes in a complementary manner. Note: the hash map lookup houses previously encountered values of `curr`, the rolling or cumualtive prefix being maintained throughout the algorithm. In the template below, `curr` represents a cumulative prefix for some metric we care about (e.g., subarray sum, number of odd integers, balance of `0`s and `1`s, or any other metric we might be concerned with). The `lookup` hash map has "referential prefixes" as its keys with other problem-specific data as its values. Typically, the keys in `lookup` will be used in some complementary fashion with `curr`; that is, a core part of the problem is figuring out how to *complementarily* relate the cumulative or rolling prefix, `curr`, with the previously encountered referential prefixes in `lookup` (its keys), thus yielding useful data of some sort (its values).

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

    Note how the subtraction for the length computation *does not include* the left endpoint. This is because the left endpoint is not part of the balanced subarray under current consideration.
  
  + initialization: The initialization of `lookup = {0: -1}` ensures we do not improperly compute the length of a subarray that may begin at the beginning of the input array; for example, if `nums = [0,1]`, then `curr = 0` and `i - lookup[curr] = 1 - (-1) = 2` yields a correct result whereas a different initialization condition (e.g., `lookup = {0: 0}`) would not.
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