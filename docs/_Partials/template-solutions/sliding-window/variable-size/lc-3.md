import ChipDivider from '@site/src/components/ChipDivider';

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        lookup = defaultdict(int)
        left = ans = 0
        
        for right in range(len(s)):
            char = s[right]
            lookup[char] += 1
            while left <= right and lookup[char] > 1:
                lookup[s[left]] -= 1
                left += 1
            ans = max(ans, right - left + 1)
            
        return ans
```

The solution above is a fairly classic example of how to use a hash map with a sliding window. The manner in which the `left` pointer is incremented after a duplicate character is encountered is characteristic of many sliding window problems.

**Time:** $O(n)$. The left and right pointers both travel a maximum of $n$ units, where `n == len(s)`.

**Space:** $O(1)$. A restricted character set is allowed, which means the hash map used for lookups cannot grow beyond a certain size, but we could say $O(k)$, where `k` allowed for more flexibility in characters.

<ChipDivider>Optimizing for time by advancing the left pointer</ChipDivider> 

The nature of this problem allows us to make a small optimization: as soon as we encounter a character that is a duplicate, instead of incrementing `left` one character at a time until that character's previous occurrence is encountered and skipped over, we use our hash map to track character indexes (not frequencies) and simply jump the `left` pointer just past the last index of the previously encountered duplicate character:

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        lookup = {}
        left = ans = 0
        
        for right in range(len(s)):
            char = s[right]
            if char in lookup and lookup[char] >= left:
                left = lookup[char] + 1
            lookup[char] = right
            ans = max(ans, right - left + 1)
            
        return ans
```

The hardest part about the solution above is the change in thinking needed to implement the variable width sliding window effectively. There's no `while` loop and the conventional "sliding" isn't so much sliding as it is "jumping". Additionally, the condition `and lookup[char] >= left` is critical for the sliding window &#8212; it ensures the character is not just in the hash map but that its last occurrence is within the current window. Our solution would fail without this conditional check.

For example, consider `s = "abba"`. When we encounter the last `"a"`, the first `"a"` is in the hash map, but it is *not* in the current window. Mistakenly treating it like it's part of the current window means moving the `left` pointer just past this occurrence and mistakenly getting a `right - left + 1` length of `3`, which is not correct.
