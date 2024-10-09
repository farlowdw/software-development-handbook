def subset_sum(S, K):
    n = len(S)
    ans = [[None] * (K + 1) for _ in range(n + 1)]
    for last_index in range(n + 1):
        ans[last_index][0] = True
    for k in range(1, K + 1):
        ans[0][k] = False
    
    for i in range(1, n + 1):
        for subset_sum in range(1, K + 1):
            curr_idx = i
            while curr_idx > 0 and (S[curr_idx - 1] > subset_sum or not ans[curr_idx - 1][subset_sum - S[curr_idx - 1]]):
                curr_idx -= 1
            ans[i][subset_sum] = curr_idx > 0
    return ans[n][K]

S = [17, 22, 6, 4, 2, 4]
print(subset_sum(S, 45)) # True
print(subset_sum(S, 46)) # False