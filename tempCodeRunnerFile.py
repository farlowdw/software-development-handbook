mine1 = {
    "a": "dog",
    "b": "cat"
}

mine2 = {
    "b": "cat",
    "a": "dog"
}

print(mine1.keys() == mine2.keys())         # True
print(mine1.items() == mine2.items())       # True
print(mine1.values() == mine2.values())     # False