def subset_sum(S, K):
    n = len(S)
    ans = [[None] * (K + 1) for _ in range(n + 1)]
    for last_index in range(n + 1):
        ans[last_index][0] = True
    for k in range(1, K + 1):
        ans[0][k] = False
    
    return ssp_recursive_idea_3(S, n, K, ans)

def ssp_recursive_idea_3(S, last_index, k, ans):
    if k < 0:
        return False
    if ans[last_index][k] is not None:
        return ans[last_index][k]
    ans[last_index][k] = ssp_recursive_idea_3(S, last_index - 1, k - S[last_index - 1], ans) or ssp_recursive_idea_3(S, last_index - 1, k, ans)
    return ans[last_index][k]

S = [17, 22, 6, 4, 2, 4]
print(subset_sum(S, 45)) # True
print(subset_sum(S, 46)) # False