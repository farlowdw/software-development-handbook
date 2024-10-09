def rod_cutting(l, prices):
    table = [0] * (l + 1)
    for rod_length in range(1, l + 1):
        for i in range(1, rod_length + 1):
            tmp = prices[i] + table[rod_length - i]
            if tmp > table[rod_length]:
                table[rod_length] = tmp
    return table[l]

prices = [0, 2, 5, 9, 10, 12, 13, 15, 16]
print(rod_cutting(5, prices)) # 14
print(rod_cutting(7, prices)) # 20
print(rod_cutting(8, prices)) # 23