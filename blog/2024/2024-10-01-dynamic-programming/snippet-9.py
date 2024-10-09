def ssp_recursive_idea_1(S, K):
    if K == 0:
        return True
    if K < 0 or len(S) == 0:
        return False
    for i in range(len(S)):
        S_p = S[:i] + S[i+1:]
        if ssp_recursive_idea_1(S_p, K - S[i]):
            return True
    return False
    
S = [17, 22, 6, 4, 2, 4]
print(ssp_recursive_idea_1(S, 45)) # True
print(ssp_recursive_idea_1(S, 46)) # False