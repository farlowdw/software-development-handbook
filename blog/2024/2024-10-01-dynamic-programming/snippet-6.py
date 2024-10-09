def rc(l, prices):
    table = [float('-inf')] * (l + 1)
    table[0] = 0
    rod_cutting(l, prices, table)
    return table[l]
    
def rod_cutting(l, prices, table):
    if table[l] == float('-inf'):
        for i in range(1, l + 1):
            tmp = prices[i] + rod_cutting(l - i, prices, table)
            if tmp > table[l]:
                table[l] = tmp
    return table[l]

prices = [0, 2, 5, 9, 10, 12, 13, 15, 16]
print(rc(5, prices)) # 14
print(rc(7, prices)) # 20
print(rc(8, prices)) # 23