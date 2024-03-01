```a title="Pseudocode (for reference)"
procedure iterativeInorder(node)
    stack ← empty stack
    while not stack.isEmpty() or node ≠ null
        if node ≠ null
            stack.push(node)
            node ← node.left
        else
            node ← stack.pop()
            visit(node)
            node ← node.right
```

Imagine you're reading a book series. Specifically, let's suppose you're reading the Jack Ryan series of novels by Tom Clancy. You've heard a lot about this series and know several books have film adaptations. You'd like to check it out. The first book you check out, *Debt of Honor*, seems to probably end with Jack Ryan becoming the President of the United States. That can't be right. Surely there's a lot more to Jack Ryan's story that led up to that point. You'd really like to read the whole book series *in order*, specifically by chronological order of events as opposed to publication date.

<details>
<summary> Jack Ryan novels by chronological order of events</summary>

:::note 

The excerpt below is from ChatGPT (Aug 19, 2023).

:::

Tom Clancy's Jack Ryan series, with its complex web of interconnected characters and plots, can be arranged according to the internal chronological order of events rather than their publication dates. This order provides a coherent understanding of Jack Ryan's life, from a young Marine to President of the United States, as well as the lives of other recurring characters.

Here's the chronological ordering of the Jack Ryan series based on character development and the events in the series:

1. **Without Remorse** (1993) - This novel serves as a prequel to the series, focusing on the backstory of John Kelly (who later becomes John Clark), a recurring character in many of the Jack Ryan books.
  
2. **Red Rabbit** (2002) - Set in the early 1980s, this book details a younger Jack Ryan's time with the CIA and a plot to assassinate Pope John Paul II.

3. **The Hunt for Red October** (1984) - This is the first novel published in the series, introducing Jack Ryan as an analyst for the CIA as he gets involved in the defection of a Soviet submarine captain.

4. **The Cardinal of the Kremlin** (1988) - Jack Ryan becomes involved in a high-stakes espionage game as the Americans and the Soviets vie for technological dominance.

5. **Clear and Present Danger** (1989) - Jack Ryan is a National Security Advisor here, and the story revolves around U.S. efforts against Colombian drug cartels.

6. **The Sum of All Fears** (1991) - Jack Ryan, now Deputy Director of Intelligence for the CIA, must prevent a nuclear conflict between the U.S. and Russia.

7. **Debt of Honor** (1994) - The focus shifts to the Pacific, with an escalating conflict between the U.S. and Japan. By the end of the novel, Jack Ryan is thrust into the role of President of the United States.

8. **Executive Orders** (1996) - Continuing directly from where "Debt of Honor" left off, President Ryan faces both internal and external challenges, including rebuilding the U.S. government and dealing with an Ebola-like epidemic.

9. **The Bear and the Dragon** (2000) - President Jack Ryan oversees a complex geopolitical situation involving China, Russia, and the prospect of World War III.

10. **Red Storm Rising** (1986) - While not strictly a Jack Ryan novel (he doesn't appear in it), this book is set in the same universe and involves a war between NATO and Warsaw Pact forces.

11. **The Teeth of the Tiger** (2003), **Dead or Alive** (2010), **Locked On** (2011), **Threat Vector** (2012), and **Command Authority** (2013) - These novels follow the next generation, including Jack Ryan Jr., as they face modern threats in a post-9/11 world. Jack Ryan Sr. still plays a role, but the torch is being passed to the younger characters.

It's worth noting that Tom Clancy's name has been attached to books written by other authors after his death in 2013. If you're interested in the books in this universe that continue the story or explore other side characters, there's an extended series to dive into, but the above list covers the main Jack Ryan saga as written by Clancy himself.

</details>

As fate would have it, the book you just started with (the root) has both prequel and sequel recommendations. Some books you encounter may have no recommendations (leaf nodes), but you want to prioritize tracing back through each preqel recommendation (left child) so you can start at the beginning of the series, but you also need to try to read the sequel (right child) for each book, as recommended.

Here's the process you will follow in order to accomplish this:

- **Step 1 (start with the first book in the series):** Follow all prequel recommendations (left children) from your starting point (root) until they have all been exhausted (you hit a leaf node), noting each book along the way that recommends a prequel (push it to the stack).
- **Step 2 (follow recommendations):** If your current book has a prequel recommendation (left child), then set it aside to be read later (push it to the stack).
- **Step 3 (keep following recommendations):** If the new book also has a prequel recommendation, then repeat the process: set the new book aside to read later, and pick up the recommended prequel. Continue this process until you reach a book with no prequel recommendation.
- **Step 4 (read the book):** Once there is no prequel left to read, read the book (visit the node).
- **Step 5 (move to sequel recommendation or return to books previously set aside):** Always attempt to move on to a sequel recommendation (right child) after having read a book (once the node has been visited). If there is no such sequel recommendation, then move back to the most recent book you've set aside but have not yet read (pop from the stack). Continue.
- **Step 6 (repeat until all books are read):** Repeat the steps above until you have finished all books in the series.

We can annotate the previously provided Python code to illustrate the steps above (the highlighted line simply serves to show where the logic would be included to process the current node):

```python
def inorder_iterative_LR(node):
    stack = []
    # there is still a book to be read
    while stack or node:
        # Steps 1-3: Follow prequel recommendations
        if node:
            stack.append(node)  # Step 2: Set aside the current book
            node = node.left
        else:
            # Step 4: Read the current book
            node = stack.pop()
            # highlight-next-line
            print(node.val)
            
            # Step 5: Move to sequel recommendation
            node = node.right
```

Note that this analogy involves a highly contrived example. If we followed the numbering of the Jack Ryan books in chronological ordering after starting with book `7` as the root, then the most sensible binary tree would look rather ridiculous:

```
            7
           / \
          6   8
         /     \
        5       9
       /         \
      4           10
     /              \
    3                11
   /
  2
 /
1
```

But technically any other ordering would work so long as `7` was the root and the in-order traversal led to books `1` through `11` being listed in sequence. One such example:

```
          __7__
         /     \
      __5       9
     /   \     / \
    3     6   8   10
   / \              \
  2   4              11
 /
1
```