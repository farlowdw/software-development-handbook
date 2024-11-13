As noted in [a LeetCode editorial on binary search on solution spaces](https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/710/binary-search/4533/), we need a few conditions to be met in order to effectively conduct our search:

1. Possibility/condition/check/feasible function can execute in rougly $O(n)$ time &#8212; we can quickly, in $O(n)$ or better, verify if the task is possible for a given threshold value, `threshold`; that is, we define a function, `possible(threshold)`, that returns a boolean that indicates if the given task is possible or impossible when given the specific `threshold` value.
2. Max/min characteristic when task is *possible* given the specific `threshold` value &#8212; if the task is possible for a number `threshold` and we are looking for

  - a **maximum**, then it is also possible for all numbers less than `threshold`.
  - a **minimum**, then it is also possible for all numbers greater than `threshold`.

3. Max/min characteristic when task is *impossible* given the specific `threshold` value &#8212; if the task is impossible for a number `threshold` and we are looking for

  - a **maximum**, then it is also impossible for all numbers greater than `threshold`.
  - a **minimum**, then it is also impossible for all numbers less than `threshold`.

The above depictions can be somewhat difficult to envision at first so it can be helpful to draw out a very simple outline as if we're on a number line from 0 to infinity, left to right, as demonstrated below.

**Looking for a maximum threshold:**

*Example use case (illegal parking):* Maximize time spent parked illegally without getting a ticket. Under various conditions (e.g., parking enforcers, location, etc.), we can imagine this being possible for a certain amount of time before it becomes impossible. We'd like to maximize the POSSIBLE amount of time we do not have to worry about getting a ticket before it becomes IMPOSSIBLE to avoid getting a ticket:

```a title="Problem is asking for a maximum"
 -----------------------
| Possible | Impossible |
 -----------------------
 0         ^       ...inf
      (threshold binary searched for)
```

As can be seen above, given a `threshold` amount of time, our task of going undetected when parked illegally is 

- possible for all numbers less than or equal to `threshold`
- impossible for all numbers greater than `threshold`

**Looking for a minimum threshold:**

*Example use case (mandatory online trainings):* Minimize time spent on a manadotry online training page before clicking to continue without arousing suspicion. Many online training requirements are modules that are "click-through" in nature, where an employee must complete the module but should not "click to continue" until a sufficient amount of time has elapsed to indicate the employee has possibly consumed all of the information on the page. The goal is to minimize the amount of time spent on any given page. We can imagine this being impossible for a certain amount of time before it becomes possible. We'd like to minimize the POSSIBLE amount of time we are required to be on any given training page where it is IMPOSSIBLE to avoid doing so until a certain amount of time has elapsed:

```a title="Problem is asking for a minimum"
 -----------------------
| Impossible | Possible |
 -----------------------
 0           ^     ...inf
        (threshold binary searched for)
```

As can be seen above, given a `threshold` amount of time, our task of having to remain on a given training page before being allowed to continue making progress through the training is 

- impossible for all numbers less than `threshold`
- possible for all numbers greater than or equal to `threshold`

---

**TAKEAWAY:**

- **Minimum:** When searching to minimize a value on a solution space, our goal is to find a value, `threshold`, where the condition we're testing for is possible (i.e., `possible(threshold)` returns `true`) and `threshold` is minimized within the region of possibilities. Specifically, if we let `l` and `r` represent the smallest and largest possible solutions in the solution space, respectively, then we're essentially searching for the `threshold` value, say `x`, between `l` and `r` such that `possible(x)` returns `true` but any smaller value of `x`, say `x - ε`, results in `possible(x - ε)` returning `false`. We can use our previous illustration to capture this:

  ```
  l            x          r
  -----------------------
  | Impossible | Possible |
  -----------------------
  ```

- **Maximum:** When searching to maximize a value on a solution space, our goal is to find a value, `threshold`, where the condition we're testing for is possible (i.e., `possible(threshold)` returns `true`) and `threshold` is maximized within the region of possibilities. Specifically, if we let `l` and `r` represent the smallest and largest possible solutions in the solution space, respectively, then we're essentially searching for the `threshold` value, say `x`, between `l` and `r` such that `possible(x)` returns `true` but any larger value of `x`, say `x + ε`, results in `possible(x + ε)` returning `false`. We can use our previous illustration to capture this:

  ```
  l          x            r
  -----------------------
  | Possible | Impossible |
  -----------------------
  ```

The template below makes everything discussed above feasible:

```python showLineNumbers
def binary_search_sol_space(arr):
    def possible(threshold):
        # this function is implemented depending on the problem
        return BOOLEAN

    left = MINIMUM_POSSIBLE_ANSWER  # minimum possible value in solution space (inclusive)
    right = MAXIMUM_POSSIBLE_ANSWER # maximum possible value in solution space (inclusive)
    result = -1                     # desired result (-1 to indicate no valid value found yet)
    
    while left <= right:            # continue search while range is valid
        mid = left + (right - left) // 2
        if possible(mid):
            result = mid            # mid satisfies condition; update result
            right = mid - 1         # adjust right to find smaller valid value (minimization)
        else:
            left = mid + 1          # mid doesn't satisfy condition; search right half
                                    # IMPORTANT: swap `right = mid - 1` and `left = mid + 1`
                                    #   if looking to maximize valid value (i.e., instead of minimize)
    
    return result                   # return best value found satisfying condition
```

Above, `left`, `right`, `result` stand for `l`, `r`, `x`, respectively, in regards to the notation we used previously to visualize the solution space on which we are binary searching. A few things worth noting about the template above:

- Line `13`: This is where `result` is updated. Note how `result` is only updated once `possible(mid)` is true for some `mid` value; that is, if what we're looking to minimize or maximize is actually not possible, then `result` will never be updated, and a value of `-1` will be returned to indicate no valid value was found.
- Lines `14` and `16`: Whether or not these lines should be swapped depends on if the problem at hand is a minimization (no swap) or maximization (swap) problem. Specificially, the template above, in its default state, is set up for minimization problems. Why? Because once a valid `mid` value is found, we narrow the search space *to the left* with `right = mid - 1`, which corresponds to trying to find a smaller valid value (minimization). On the other hand, if we're trying to maximize the valid values we find, then we need to narrow the search space *to the right* with `left = mid + 1`, which corresponds to trying to find a larger valid value (maximization).

Thankfully, the template above is quite similar to the template for binary searching on arrays, which means less effort needs to be devoted to memorization, and more time can be spent on understanding.