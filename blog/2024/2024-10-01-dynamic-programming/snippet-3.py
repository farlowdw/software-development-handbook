def fibonacci_original(n):
    ans = [None] * (n + 1)
    ans[0] = 0
    ans[1] = 1
    return fib_original(n, ans)

def fibonacci_altered(n):
    ans = [None] * (n + 1)
    ans[0] = 0
    ans[1] = 1
    return fib_altered(n, ans)

def fib_original(n, ans):
    if ans[n] is None:
        ans[n] = fib_original(n - 1, ans) + fib_original(n - 2, ans)
        print(ans[n])
    return ans[n]

def fib_altered(n, ans):
    if ans[n] is None:
        ans[n] = fib_altered(n - 2, ans) + fib_altered(n - 1, ans)
        print(ans[n])
    return ans[n]

fibonacci_original(8) # 1 2 3 5 8 13 21
fibonacci_altered(8) # 1 2 3 5 8 13 21

fibonacci_original(14) # 1 2 3 5 8 13 21 34 55 89 144 233 377
fibonacci_altered(14) # 1 2 3 5 8 13 21 34 55 89 144 233 377
