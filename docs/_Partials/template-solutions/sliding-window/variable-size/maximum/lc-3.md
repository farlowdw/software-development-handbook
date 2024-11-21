import ChipDivider from '@site/src/components/ChipDivider';

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        left = ans = 0
        freqs = defaultdict(int)
        
        for right in range(1, len(s) + 1):
            freqs[s[right - 1]] += 1
            while left < right and freqs[s[right - 1]] > 1:
                freqs[s[left]] -= 1
                left += 1
                
            ans = max(ans, right - left)
            
        return ans
```

**Time:** $O(n)$. The left and right pointers both travel a maximum of $n$ units, where `n == len(s)`.

**Space:** $O(1)$. A restricted character set is allowed, which means the hash map used for lookups cannot grow beyond a certain size, but we could say $O(k)$, where `k` allowed for more flexibility in characters.

<ChipDivider>Optimizing for time by conditional jumps with the left pointer</ChipDivider> 

The nature of this problem allows us to make a small optimization: as soon as we encounter a character that is a duplicate, instead of incrementing `left` one character at a time until that character's previous occurrence is encountered and skipped over, we use our hash map to track character indexes (not frequencies) and simply jump the `left` pointer just past the last index of the previously encountered duplicate character:

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        left = ans = 0
        lookup = dict()
        
        for right in range(1, len(s) + 1):
            if s[right - 1] in lookup and lookup[s[right - 1]] >= left:
                left = lookup[s[right - 1]] + 1
            lookup[s[right - 1]] = right - 1
            ans = max(ans, right - left)

        return ans
```

The hardest part about the solution above is the change in thinking needed to implement the variable width sliding window effectively. There's no `while` loop and the conventional "sliding" isn't so much sliding as it is "jumping". Additionally, the condition `and lookup[char] >= left` is critical for the sliding window &#8212; it ensures the character is not just in the hash map but that its last occurrence is within the current window. Our solution would fail without this conditional check.

For example, consider `s = "abba"`. When we encounter the last `"a"`, the first `"a"` is in the hash map, but it is *not* in the current window. Mistakenly treating it like it's part of the current window means moving the `left` pointer just past this occurrence and mistakenly getting a `right - left` length of `3`, which is not correct.