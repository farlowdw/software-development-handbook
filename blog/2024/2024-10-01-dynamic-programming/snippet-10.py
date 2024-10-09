def subset_sum(S, K):
    return ssp_recursive_idea_2(S, len(S), K)

def ssp_recursive_idea_2(S, last_index, k):
    if k == 0:
        return True
    if k < 0 or last_index == 0:
        return False
    for i in range(1, last_index + 1):
        if ssp_recursive_idea_2(S, i - 1, k - S[i - 1]):
            return True
    return False
    
S = [17, 22, 6, 4, 2, 4]
print(subset_sum(S, 45)) # True
print(subset_sum(S, 46)) # False