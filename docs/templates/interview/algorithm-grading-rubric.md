---
title: Algorithm Grading Rubric 
hide_title: false
sidebar_label: Algorithm Grading Rubric
description: Article on a grading rubric for algorithms
draft: false
tags: [tbd]
keywords: [tbd]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BibRef from '@site/src/components/BibRef';

## Introduction

The grading rubric, outlined below in its most bare form, may be found in <BibRef id='fangprepSubstack' >Specifically, see the <a href="https://docs.google.com/spreadsheets/d/1gy9cmPwNhZvola7kqnfY3DElk7PYrz2ARpaCODTp8Go/edit#gid=0" target="_blank">Excel template</a> that includes the most recent version.</BibRef>. An elaboration on each component may be found after the template.

## Template

| Section | Question | Score |
| :-- | :-- | :-- |
| **Inspect** |  |  |
|  | Did I explicilty state what the input was? |  |
|  | Did I clarify what the desired output was? |  |
|  | Did I construct a simple example that could be solved by hand? |  |
|  | Did I write out all Axioms? |  |
|  | Did I write out and derive all intelligent assumptions? |  |
| **Strategy** |  |  |
|  | Did I brainstorm a simple solution? |  |
|  | Did I analyze the runtime? |  |
|  | Did I analyze the space requirement? |  |
|  | Did I ask if the input problem set would be small enough for this to suffice? |  |
|  | Was I able to come up with a better more sophisticated solution? |  |
|  | Did I analyze the time complexity of this solution? |  |
|  | Did I analyze the space complexity of this solution? |  |
|  | Did I compare it directly to my initial simple solution? |  |
|  | Was I confident when I started coding? |  |
|  | Did I think through all approaches that come to mind? |  |
|  | Did I explicitly write out my desired strategy? |  |
|  | Did I explicitly consider base cases? |  |
|  | How well did I handle getting stuck? |  |
| **Code** |  |  |
|  | How cleanly was my code written? |  |
|  | Did I explicitly check for any off-by-one errors? |  |
|  | Was I able to predict what functions I would end up implementing ? |  |
|  | Did my brainstormed strategy solve the problem? |  |
|  | How smooth was the coding process? |  |
|  | Was I able to talk through my code? |  |
|  | Did I leverage any interesting functions in my code? |  |
| **Review** |  |  |
|  | Did I prove my runtime complexity? |  |
|  | Did I prove my spacetime complexity? |  |
|  | Did I write up different test cases and process them? |  |
|  | Did I go line by line, no matter how trivial? |  |
|  | Did I have to make any changes when reviewing my code? |  |

## Overall whiteboard template

```
# I/O (gen)
in: 
out: 

# I/O (ex)
in: 
out: 

# rules
constraints: 
assumptions: 
```

## Inspect

For every single interview question, you should start with an inspection step. Spending 5 minutes here shows the interviewer that you critically think about problems before just diving in. It also buys you time to come up with a proper solution.

> Each step in the inspect section has something that should be written on the board.

### Did I explicilty state what the input was?

What are the inputs to the function? How many are there? What are their types? What does each input represent?

**Example:** For a problem that has one arrary of string and one integer input:

```
in: n(arr<str>), k(int)
```

### Did I clarify what the desired output was?

What is the expected output of the function? What is its type?

**Example:** For a problem that has a boolean as an output:

```
out: bool
```

### Did I construct a simple example that could be solved by hand?

Create a small and simple example of the problem and solve it by hand.

**Example:** For a problem that involves determining whether or not any values in `n` appear more than `k` times:

```
in: n = ["a","b","a","c","a"], k = 2
out: true
```

### Did I write out all Axioms?

Sometimes, there is critical information hiding in the constraints of the problem. Ask questions about the inputs and outputs such as what their bounds and or expected ranges are. 

**Example:** Questions like, "Can strings be multi-character?," can provide you with critical information that will make the problem more approachable.

```
axiom: Strings in the array cannot be multi-character
```

### Did I write out and derive all intelligent assumptions?

Writing out your assumptions can help you keep your code cleaner. You can also use assumptions to narrow down the problem if you are stuck.

**Example:** It is always good to list assumptions that ensure your algorithm inputs will make sense.

```
assumption: k will always be a positive integer
```

### Overview 

At this point your creative juices will be flowing, you'll have a high-level grasp on the problem, and you'll be able to identify any obvious gotcha's. You should now be ready to move on to creating an efficient strategy for solving the problem.

Remember, the following is what you should *actually* have written down on the whiteboard in an interview context:

```
# I/O (gen)
in: n(arr<str>), k(int)
out: bool

# I/O (ex)
in: n = ["a","b","a","c","a"], k = 2
out: true

# rules:
constraints: k > 0; k an integer
assumptions: strings in the array cannot be multi-character
```

## Strategy

Now that you've inspected your problem, it's time to start developing a *strategy* to actually solve it. If you develop your strategy correctly, then the coding part of the interview will be very straightforward. The strategizing portion is the hardest element of the interview. If you nail the strategy for solving the problem, then you should have smooth sailing until the end.

The goal in the strategy portion is to come up with a consistent way to solve complicated programming problems/ Unlike the inspection phase, not every phase is meant to be written on the board unless specified with a code block. This phase is where you really lean on your Data Strucures and Algorithms studying.

### Did I brainstorm a simple solution?

The first step is trying to figure out a way to *technically* solve the problem. If you can't come up with any solution, even a slow one, then you are in a bad spot. Most problems have a very slow, very aggressive solution that is obvious. You should explicitly state this solution, explain how it works, and dive into its runtime.

**Exceptions:** There are plenty of exceptions to this where there is only one possible way to solve the problem. Graph traversal and linked list problems tend to fall in this category

### Did I analyze the runtime of the brute force solution?

Analyze the runtime of the brute force solution and write it on the board.

```
BF, runtime: O(N^2)
```

### Did I analyze the space requirement of the brute force solution?

Analyze the space complexity of this brute force solution and write it on the board.

```
BF, space: O(N)
```

### Did I ask if the input problem set would be small enough for this to suffice?

At this point, you should ask the question: "Is the input set small enough for this solution or should I work to optimize it?".

Your interviewer will usually respond with, "Let's try to optimize it" or ,"You can do better," but sometimes they say, "This approach works!" If this solution is deemed to be good enough, then skip to ["Was I confident when I started coding?"](#confident-coding).

### Was I able to come up with a better or more sophisticated solution?

This step is usually where you have to start getting creative and really leaning on your programming fundamentals, techniques, and practice problems. The best thing you can do is identify the runtime of your brute force solution and see if there is a way to improve it. During programming interviews, there are only a few different runtimes you will typically see (in order from fastest to slowest):

$$
O(1) < O(\lg n) < O(n) < O(n\lg n) < O(n^2) < O(2^n) < O(n!)
$$

Take a look at the runtime and space complexities of your brute force solution, and try to move it one or two steps down the line. You can't "hack" this part. This is where all of your practice comes into play.

### Did I analyze the time complexity of this solution?

Analyze the runtime of this optimized solution and write it on the board:

```
Sol, runtime: O(n^2)
```

### Did I analyze the space complexity of this solution?

Analyze the space complexity of this optimized solution and write it on the board:

```
Sol, space: O(1)
```

### Did I compare it directly to my initial simple solution?

A quick reference back to how you improved the initial brute force solution is a good way to show your thinking. Even if you didn't get the most optimal solution here, you still showed your thought process and were able to improve on a slow solution. This implies that, with more time, you would have improved your algorithm even further.

### Was I confident when I started coding? {#confident-coding}

Consider this step a gut check. You should know exactly what the code is going to be before you write a single line. Write out pseudo-code functions to explain the major steps of your algorithm and describe what you plan to do from start to finish.

### Did I think through all approaches that come to mind?

When you state something out loud in front of an interviewer, you now need to either pursue it or discredit it. Anything else makes it look like you don't know how to invalidate certain approaches.

### Did I explicitly write out my desired strategy?

It can be helplful to write steps on the board:

1. Check the input for invalid values
2. Sort the array
3. Conduct binary search to find the value
4. Return `true` if the value is found

### Did I explicitly consider the base or edge cases?

You should always consider what the base cases are, what happens when the values get really small, hit `0` or `1`, or get really large. Sometimes your algorithm can't handle a few specific values on the edges and you can write out simple conditionals that handle those base or edge cases.

### How well did I handle getting stuck?

When you got stuck, did you freeze up or did you start to get creative? You never want to look like you got caught or don't know what to do or like you want to give up.

### Overview 

If you did this part of the interview successfully, then you've gotten through the hardest part of the interview and now it should be smooth sailing from here to the end.

## Code

Now that you've come up with a strategy, it's time to plan and write your code. Before you start writing any code, you should have already figured out how you were going to solve the problem at a high level. Let's break down a few specific questions to ask yourself during the coding portion of your interview to help you impress your interviewer.

### How cleanly was my code written?

After you leave the interview, your interviewer will be left with a few things:

1. A general impression of your skills
2. Whatever notes you wrote on the board/document
3. Your code

Ideally, your code should be easy to understand while achieving the optimal runtime and space complexities.

Having overly complicated conditionals and inconsistent naming conventions are little things that can just rub the interviewer the wrong way. Some interviewers are sticklers for this kind of thing. Be sure to structure your code as cleanly as possible.

### Did I explicitly check for any off-by-one errors?

Anytime you are writing a `while` loop, manually implementing a binary search, or managing any pointers, you should always check for off-by-one errors.

Some interviewers over-index on these common mistakes. It's best to be thorough and to not give them any ammunition to downgrade your performance. If you are struggling with off-by-one errors, then try passing a simple example through your code and seeing where the pointers land.

### Was I able to predict what functions I would end up implementing?

Most of the time, you can identify which functions you will end up using before you write a line of code.

If you came up with a solution that leveraged a heap, then you may have to `heapify`, `heappop`, and/or `heappush` (Python specific). When you are outlining your solution, you can reference these functions and describe their runtime/space complexities using shorthand. Doing this before you dive into the code will show the interviewer that you think through your code and its performance before you just starting writing things down.

### Did my brainstormed strategy solve the problem?

How well did your plan map out to what you actually ended up coding? Ideally, you've thought it all through ahead of time and you can just follow the script. Planning out what you are going to code quickly can feel unnatural for some. Be sure to practice outlining your code ahead of time when solving LeetCode/HackerRank problems.

### How smooth was the coding process?

Were there any hiccups? Did you have to go back to your strategy step for anything? Did you forget your base or edge cases?

It's not a great look to finish the recursive part of your DP solution only to realize you haven't thought through any of the base cases or how the cache will be structured!

### Was I able to talk through my code?

While coding, did you explain what you were doing or did you go silent? One thing that interviewers hate is when a candidate gets silent when they start coding. The interviewee should be articulating their thoughts as they write.

This is a hard muscle to develop if you are just grinding LeetCode. Be sure to do mock interviews with others, and practice solving LeetCode questions out loud.

### Did I leverage any interesting functions in my code?

Leveraging not-so-well-known functions in your code is a great way to stand out from others. If you can teach your interviewer about a niche language-specific function during your interview, then you will keep them interested and impressed.

**Example (from original author):**

Whenever I would need to define a `TreeNode` class in Python, I would leverage the [`locals()`](https://docs.python.org/3/library/functions.html#locals) and [`update()`](https://docs.python.org/3.10/library/stdtypes.html#dict.update) functions. Pairing those with a dictionary comprehension would always result in me piquing the interviewers interest. These aren't the most well-known functions, and it's not the most human-readable code. But being able to comfortably reference a complicated function like this during an interview is a great way to standout.

This code snippet might look complicated to remember, but it never changes. With a little bit of practice, you'll be able to whip up your own go-to code snippets that will help you impress your interviewers:

```python 
class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.__dict__.update({key:value for (key, value) in locals().items() if key != "self" })
```

:::note

While this is less readable than writing the basic approach, this is an example where showcasing your expertise outweighs readability.

:::

### Overview 

A little bit of planning up front will make the coding portion go significantly faster and smoother. This doesn't come natural to most so be sure to practice talking with others and solving LeetCode problems out loud. Finally, if you've you nailed the coding portion, then the only thing left is to review your code!

## Review

Now that you have inspected the problem, created a strategy, and coded a solution(s), all of the hard work is essentially done. The final step is to make sure you *review your code*. Even if you have only a few minutes at the end of the interview, you want to review your code to make sure you didn't do anything wrong. It is also better to catch any little mistakes before the interviewer does. In addition to ensuring that the problem you just coded actually works, interviewers want to see that you are someone who checks their code. Working at one of these Big Tech companies means you are sometimes impacting billions of people with your code. Interviewers want to know that you are not someone who ships out bugs.

In the absolute worst case, If you don't have any time at the end of your interview, make sure you are at least pretending to try and review what you did before your time is up. This isn't something you should really bank on doing, but if you are down to the wire and still want to make it clear you check over your work, then just try to go through the motions.

Do not ask an interviewer, "Am I done?". It shows a lack of confidence in the work that you are doing. Instead, when you think you are finished, immediately start running through one of your input examples. If you followed this framework correctly you should have already explicitly stated what the input and desired output were and drawn up an example.

But there are other questions that you can, and should, ask before the conclusion of your interview.

### Did I prove my runtime complexity?

You should look at the solution(s) you wrote and make sure that it matches the runtime that you stated as you were strategizing. Compare them directly. If you have the time, then go through your code and explain the performance of your code in depth.

### Did I prove my spacetime complexity?

You should do the same here but for space complexity. Look through the solution you wrote and make sure it matches the space that you stated as you were strategizing. You can also go line by line and show that some lines incur constant space while others are more expensive.

### Did I write up different test cases and process them?

After you try testing your input example, run through a few additional test cases. Start simple and get more complex.

### Did I go line by line, no matter how trivial?

Did you read through what you actually wrote? Did you read through every line in your function and make sure that it actually does what you think it does? Do you have any "off by one" errors? Is your syntax correct? After 30 stressful minutes of inspecting, strategizing, and coding under pressure, it can be easy to forget a semicolon. Take it slow if you can and work line by line to make sure nothing is off. You don't want your interviewer calling out some small error you missed because you were moving too fast.

### Did I have to make any changes when reviewing my code?

This is more for your own personal reflection. If you are making the same mistakes and changing the same piece of code every time you do a problem, it should be called out and addressed. For example, if you are always having off by one errors when doing a binary search, recognize that. Keep yourself honest here. The more you learn from your frequent mistakes the more you will grow.
