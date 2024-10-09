def subset_sum(S, K):
    n = len(S)
    ans = [[None] * (K + 1) for _ in range(n + 1)]
    for last_index in range(n + 1):
        ans[last_index][0] = True
    for k in range(1, K + 1):
        ans[0][k] = False
    
    return ssp_recursive_idea_2(S, n, K, ans)

def ssp_recursive_idea_2(S, last_index, k, ans):
    if k < 0:
        return False
    if ans[last_index][k] is not None:
        return ans[last_index][k]
    for i in range(1, last_index + 1):
        if ssp_recursive_idea_2(S, i - 1, k - S[i - 1], ans):
            ans[last_index][k] = True
            return True
    ans[last_index][k] = False
    return False
    
S = [17, 22, 6, 4, 2, 4]
print(subset_sum(S, 45)) # True
print(subset_sum(S, 46)) # False