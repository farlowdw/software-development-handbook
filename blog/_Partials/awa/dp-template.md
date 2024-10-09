1. *Get a recursive solution*

    - This is often the hardest part of dynamic programming problems because we're not usually *given* the recurrence relation. We have to come up with one that effectively models the problem at hand.
    - Problems like calculating Fibonacci numbers that *give* you the recurrence relation on a platter are much easier to approach.

2. *Parameter analysis*

    - How many distinct parameter combinations are there for solving subproblems?
    - Are there few enough to store answers for each combination of parameters?

3. *Memoize*

    - Allocate a table to hold stored answers.
    - Before running recursive code, check if you have computed the answer.

4. *Move to iterative version*

    - For a given answer, what answers does it depend upon?
    - Figure out order for indices to fill in answers after things they depend upon.

5. *Garnish*

    - Can you reuse space? Optimize for space.
    - Do you need to store extra information for a constructive answer?