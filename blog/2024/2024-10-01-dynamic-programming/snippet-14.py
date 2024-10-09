# iterative version 1 (column by column)
def subset_sum_1(S, K):
    n = len(S)
    ans = [[None] * (K + 1) for _ in range(n + 1)]
    for last_index in range(n + 1):
        ans[last_index][0] = True
    for k in range(1, K + 1):
        ans[0][k] = False
    
    for subset_sum in range(K + 1):
        for i in range(1, n + 1):
            ans[i][subset_sum] = ans[i - 1][subset_sum] or (subset_sum >= S[i - 1] and ans[i - 1][subset_sum - S[i - 1]])
    return ans[n][K]

# iterative version 2 (row by row)
def subset_sum_2(S, K):
    n = len(S)
    ans = [[None] * (K + 1) for _ in range(n + 1)]
    for last_index in range(n + 1):
        ans[last_index][0] = True
    for k in range(1, K + 1):
        ans[0][k] = False
    
    for i in range(1, n + 1):
        for subset_sum in range(K + 1):
            ans[i][subset_sum] = ans[i - 1][subset_sum] or (subset_sum >= S[i - 1] and ans[i - 1][subset_sum - S[i - 1]])
    return ans[n][K]

# iterative version 3 (memoized table using only 2 rows)
def subset_sum_3(S, K):
    n = len(S)
    ans = [[None] * (K + 1) for _ in range(2)]
    for last_index in range(2):
        ans[last_index][0] = True
    for k in range(1, K + 1):
        ans[0][k] = False
    
    for i in range(1, n + 1):
        for subset_sum in range(K + 1):
            ans[i % 2][subset_sum] = ans[(i - 1) % 2][subset_sum] or (subset_sum >= S[i - 1] and ans[(i - 1) % 2][subset_sum - S[i - 1]])
    return ans[n % 2][K]

# iterative version 4a (bad attempt to optimize for space, memoized table with 1 row, left to right)
def subset_sum_4a(S, K):
    n = len(S)
    ans = [None] * (K + 1)
    ans[0] = True
    for k in range(1, K + 1):
        ans[k] = False
    
    for i in range(1, n + 1):
        for subset_sum in range(K + 1):
            ans[subset_sum] = ans[subset_sum] or (subset_sum >= S[i - 1] and ans[subset_sum - S[i - 1]])
    return ans[K]

# iterative version 4b (good attempt to optimize for space, memoized table with 1 row, right to left)
def subset_sum_4b(S, K):
    n = len(S)
    ans = [None] * (K + 1)
    ans[0] = True
    for k in range(1, K + 1):
        ans[k] = False
    
    for i in range(1, n + 1):
        for subset_sum in range(K, -1, -1):
            ans[subset_sum] = ans[subset_sum] or (subset_sum >= S[i - 1] and ans[subset_sum - S[i - 1]])
    return ans[K]

# iterative version 5 (memoized table with 1 row, left to right, and early termination)
def subset_sum_5(S, K):
    n = len(S)
    ans = [None] * (K + 1)
    ans[0] = True
    for k in range(1, K + 1):
        ans[k] = False
    
    for i in range(1, n + 1):
        for subset_sum in range(K, S[i - 1] - 1, -1):
            ans[subset_sum] = ans[subset_sum] or (subset_sum >= S[i - 1] and ans[subset_sum - S[i - 1]])
    return ans[K]

# iterative version 6 (storing integers in memo table instead of booleans, no reconstruction)
def subset_sum_6(S, K):
    n = len(S)
    ans = [None] * (K + 1)
    ans[0] = 0
    for k in range(1, K + 1):
        ans[k] = -1
    
    for i in range(1, n + 1):
        for subset_sum in range(K, S[i - 1] - 1, -1):
            if ans[subset_sum] < 0 and ans[subset_sum - S[i - 1]] >= 0:
                ans[subset_sum] = i
    
    return ans[K] >= 0

# iterative version 7 (storing integers in memo table instead of booleans, with reconstruction)
def subset_sum_7(S, K):
    n = len(S)
    ans = [None] * (K + 1)
    ans[0] = 0
    for k in range(1, K + 1):
        ans[k] = -1
    
    for i in range(1, n + 1):
        for subset_sum in range(K, S[i - 1] - 1, -1):
            if ans[subset_sum] < 0 and ans[subset_sum - S[i - 1]] >= 0:
                ans[subset_sum] = i
                
    if ans[K] >= 0:
        remainder = K
        subset = []
        while remainder > 0:
            subset.append(S[ans[remainder] - 1])
            remainder -= S[ans[remainder] - 1]
        return subset
    
    return None

S = [17, 22, 6, 4, 2, 4]

# iterative version 1 (column by column)
# print(subset_sum_1(S, 45)) # True
# print(subset_sum_1(S, 46)) # False

# iterative version 2 (row by row)
# print(subset_sum_1(S, 45)) # True
# print(subset_sum_1(S, 46)) # False

# iterative version 3 (memoized table using only 2 rows)
# print(subset_sum_3(S, 45)) # True
# print(subset_sum_3(S, 46)) # False

# iterative version 4a (bad attempt to optimize for space, memoized table with 1 row, left to right)
# print(subset_sum_4a(S, 34)) # True
# print(subset_sum_4a(S, 45)) # True
# print(subset_sum_4a(S, 46)) # True (should be False)

# iterative version 4b (good attempt to optimize for space, memoized table with 1 row, right to left)
# print(subset_sum_4b(S, 34)) # True
# print(subset_sum_4b(S, 45)) # True
# print(subset_sum_4b(S, 46)) # False

# iterative version 5 (memoized table with 1 row, left to right, and early termination)
# print(subset_sum_5(S, 45)) # True
# print(subset_sum_5(S, 46)) # False

# iterative version 6 (storing integers in memo table instead of booleans, no reconstruction)
# print(subset_sum_6(S, 45)) # True
# print(subset_sum_6(S, 46)) # False

# iterative version 7 (storing integers in memo table instead of booleans, with reconstruction)
print(subset_sum_7(S, 45)) # [6, 22, 17]
print(subset_sum_7(S, 46)) # None