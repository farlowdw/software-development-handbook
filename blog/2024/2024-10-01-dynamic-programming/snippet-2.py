def fibonacci(n):
    ans = [None] * (n + 1) # [0, 1 ... n] ... requires n + 1 placeholders/values
    ans[0] = 0
    ans[1] = 1
    return fib(n, ans)

def fib(n, ans):
    if ans[n] is None:
        ans[n] = fib(n - 1, ans) + fib(n - 2, ans)
    return ans[n]

# print(fibonacci(33)) # 3524578
print(fibonacci(300)) # 222232244629420445529739893461909967206666939096499764990979600