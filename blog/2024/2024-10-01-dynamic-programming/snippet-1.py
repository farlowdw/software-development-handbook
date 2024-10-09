def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(33)) # 3524578
# print(fib(34)) # No Output