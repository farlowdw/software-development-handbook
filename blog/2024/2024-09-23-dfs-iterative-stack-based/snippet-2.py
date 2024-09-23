from collections import deque

lookup = {
    0: 'S',
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
}

graph = [         # Edges:
    [1, 3],       # S: (S, A), (S, C)
    [0, 2, 4],    # A: (A, S), (A, B), (A, D)
    [1, 5],       # B: (B, A), (B, E)
    [0, 4, 6],    # C: (C, S), (C, D), (C, F)
    [1, 3, 5, 7], # D: (D, A), (D, C), (D, E), (D, G)
    [2, 4, 8],    # E: (E, B), (E, D), (E, H)
    [3, 7],       # F: (F, C), (F, G)
    [4, 6, 8],    # G: (G, D), (G, F), (G, H)
    [5, 7],       # H: (H, E), (H, G)
]

def some_traversal(graph, source):
    # tinker with your own traversal(s)

some_traversal(graph, 0)