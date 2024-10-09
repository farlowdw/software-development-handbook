def rod_cutting(l, prices):
    if l == 0:
        return 0
    max_rev = float('-inf')
    for i in range(1, l + 1):
        tmp = prices[i] + rod_cutting(l - i, prices)
        if tmp > max_rev:
            max_rev = tmp
    return max_rev

prices = [0, 2, 5, 9, 10, 12]
print(rod_cutting(5, prices)) # 14