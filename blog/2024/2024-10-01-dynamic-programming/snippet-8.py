def rod_cutting(l, prices):
    table = [0] * (l + 1)
    cuts = [0] * (l + 1)
    for rod_length in range(1, l + 1):
        for i in range(1, rod_length + 1):
            tmp = prices[i] + table[rod_length - i]
            if tmp > table[rod_length]:
                table[rod_length] = tmp
                cuts[rod_length] = i
    
    optimal_cuts = []
    while l > 0:
        optimal_cuts.append(cuts[l])
        l -= cuts[l]
    
    return optimal_cuts

prices = [0, 2, 5, 9, 10, 12, 13, 15, 16]
# print(rod_cutting(5, prices)) # [2, 3]
# print(rod_cutting(7, prices)) # [1, 3, 3]
print(rod_cutting(8, prices)) # [2, 3, 3]