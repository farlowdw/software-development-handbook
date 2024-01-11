| Context | Worst | Note |
| :-- | :-: | :-- |
| Find substring | $\perfNeutral{O}{nm}$ | This is the most naive case. There are more efficient algorithms for string searching such as the [Knuth-Morris-Pratt algorithm](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) (KMP). |
| Concatenating strings | $\perfNeutral{O}{n+m}$ |  |
| Slice | $\perfNeutral{O}{m}$ |  |
| Split (by token) | $\perfNeutral{O}{n+m}$ |  |
| Strip (remove leading and trailing whitespaces) | $\perfNeutral{O}{n}$ |  |