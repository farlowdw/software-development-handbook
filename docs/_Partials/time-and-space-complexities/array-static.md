| Context | Worst | Average | Note |
| :-- | :-: | :-: | :-- |
| Access | $\perfVeryGood{O}{1}$ | $\perfVeryGood{\Theta}{1}$ |  |
| Search | $\perfAverage{O}{n}$ | $\perfAverage{\Theta}{n}$ |  |
| Insert | $\perfAverage{O}{n}$ | $\perfAverage{\Theta}{n}$ | If we want to insert something into an array, first we have to make space by "scooting over" everything starting at the index we're inserting into. In the worst case we're inserting into the 0th index in the array (prepending), so we have to "scoot over" everything in the array. That's $O(n)$ time. |
| Delete | $\perfAverage{O}{n}$ | $\perfAverage{\Theta}{n}$ | Array elements are stored adjacent to each other. So when we remove an element, we have to fill in the gap—-"scooting over" all the elements that were after it. In the worst case we're deleting the 0th item in the array, so we have to "scoot over" everything else in the array. That's '$O(n)$' time. Why not just leave the gap? Because the quick lookup power of arrays depends on everything being sequential and uninterrupted. This lets us predict exactly how far from the start of the array the 138th or 9,203rd item is. If there are gaps, we can no longer predict exactly where each array item will be. |
| | | | |
| Insert (at end) | $\perfVeryGood{O}{1}$ | $\perfVeryGood{\Theta}{1}$ |  |
| Delete (at end) | $\perfVeryGood{O}{1}$ | $\perfVeryGood{\Theta}{1}$ |  |
| Search (sorted array) | $\perfGood{O}{\log n}$ | $\perfGood{\Theta}{\log n}$ |  |
| Space | $\perfAverage{O}{n}$ | $\perfAverage{\Theta}{n}$ |  |
