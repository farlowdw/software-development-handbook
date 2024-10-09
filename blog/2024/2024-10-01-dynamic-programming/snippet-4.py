def fib_iter(n):
    ans = [None] * (n + 1)
    ans[0] = 0
    ans[1] = 1
    for i in range(2, n + 1):
        ans[i] = ans[i - 2] + ans[i - 1]
    return ans[n]

print(fib_iter(14)) # 377