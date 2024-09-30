---
title: Asymptotic notation and analysis, recurrence relations, and random background math topics
draft: false
description: This post explores a variety of topics related to asymptotic notation and analysis, specifically big-O notation. We then venture into recurrence relations and a few different isolated mathematical topics.
tags: 
  - Big O
  - Asymptotic analysis
  - Recursion
  - Math
  - Tutorial
  - Algorithms with Attitude
keywords: 
  - big o
  - asymptotic analysis
authors: 
  - farlow
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';
import TOCInline from '@theme/TOCInline';

This post explores asymptotic notation and analysis, namely big-$O$ notation and a variety of related properties. This sets the stage for discussing recurrence relations and ultimately the Master Theorem for analyzing the time complexity of recurrence relations. Finally, we take a look at a few isolated math topics that will proof fruitful for future analyses.

<!--truncate-->

:::info Attribution

The notes below come from the [Algorithms with Attitude](https://www.youtube.com/@AlgorithmswithAttitude/playlists) YouTube channel, specifically the following playlists: [Asymptotic Notation and Analysis](https://www.youtube.com/playlist?list=PLSVu1-lON6Lwr2u_VtLcAxtVAZge9sttL), [Recurrence Relations](https://www.youtube.com/playlist?list=PLSVu1-lON6LybCHQs8Io_EhyrEQ4b1xAF), and [Random Background Math Topics](https://www.youtube.com/playlist?list=PLSVu1-lON6LzqzmEPe18bBC1FF3pMiP-H).

:::

There are several sections in this post, accessible in the table of contents on the right, but most of the sections have been listed below for ease of reference and navigation.

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Asymptotic notation and analysis

### Definitions

#### Runtime

For a given program, we'd like to know how runtime will change compared to the input size:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f1.png').default} />
</div>

But there are some issues here:

- What machine are you running the program on?
- What compiler are you using?
- How much precision is needed?

These issues make a *precise* discussion concerning runtime incredibly difficult. Unless we introduce some simplifications. Asymptotic notation is going to be an incredibly useful simplification. It will also make it possible for us to talk about the efficiency of algorithms or pseudocode. Maybe there we'll count clock cycles, total operations, or just a few specific operations.

#### Simple categories

If we wanted to discuss a function like $5n$ operations, then it's clearly linear. So is $2n + 20$:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f2.png').default} />
</div>

But what if we had a small non-linear term:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f3.png').default} />
</div>

In this case, it looks like at about $n\geq 8$ the red function is sandwiched between the other two linear functions: the blue function (upper) and green function (lower). If we go even further out, then we'll see that our new function really is "linear-ish":

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f4.png').default} />
</div>

It looks *very* close to the $2n + 20$ linear function. 

#### Goals

Asymptotic notation lets us *group* runtimes into easy to discuss *sets*. It becomes possible, logical, but most importantly, *meaningful* to describe a runtime as "linear-ish" or "the runtime grows like $n^2$". Asymptotic notation gives us a concise, precisely defined language for making just such statements. It also makes it possible for us to ignore small $n$-values (like $n$-values less than $8$ in the previous figures).

#### Big-O definition

The notation $O(g(n))$ is used to define the set of functions which grow no faster than $g(n)$. We're going to ignore multiplicative constants (e.g., $5n^2$ vs. $n^2$ ... that's like changing to a machine that's 5 times faster &#8212; everything on that machine is 5 times faster, but we still want to know for a particular program how its runtime is going to scale with input size). We can also ignore small values of $n$. Generally speaking, we benchmark *difficult* cases (i.e., really large inputs), not easy ones. No one brags that their algorithm calculates a maximum really quickly over two or three elements.

#### Formal definition of big-O

If we're interested in defining what $O(g(n))$ means in a formal manner, then we can do so as follows:

$$
O(g(n))\equiv \{ f(n)\mid \exists c > 0, n_0\ni\forall n\geq 0, 0\leq f(n)\leq c\cdot g(n) \}
$$

To use this definition constructively, we just ask if that rule follows for some particular function $f(n)$, in which case that function $f(n)$ is in the set $O(g(n))$:

$$
f(n) \in O(g(n))\Leftrightarrow \exists c > 0, n_0\ni\forall n\geq n_0, 0\leq f(n)\leq c\cdot g(n)
$$

The condition above that $f$ be non-negative (i.e., $\textcolor{red}{0\leq f(n)}$) is often excluded because program runtimes are assumed to not be negative! 

:::note Notational options

Both notational statements above [may benefit from the use of parentheses](#big-o-formal-def). For the uninitiated, if some of the symbols don't look familiar, then referencing the [logic symbols](#logic-symbols) may be helpful. For the sake of consistency with the video, we'll stick with the video's notation used throughout the examples and proofs.

:::

#### Example 1

Let's start with a simple example:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f8.png').default} />
</div>

We have $f(n) = 5n$, and we want to prove $5n\in O(n)$. We'll start with our definition:

$$
f(n)\in O(g(n))\Leftrightarrow \exists c > 0, n_0\ni\forall n\geq n_0, f(n)\leq c\cdot g(n)
$$

For this example, we'll temporarily ignore $n_0$:

$$
f(n)\in O(g(n))\Leftrightarrow \exists c > 0, \textcolor{gray}{n_0\ni\forall n\geq n_0}, f(n)\leq c\cdot g(n)
$$

We'll come back to it later. Next, we fill in specifics for our functions using the definition above: $f(n) = 5n$ and $g(n) = n$. 

$$
5n\in O(n)\Leftrightarrow \exists c > 0, \textcolor{gray}{n_0\ni\forall n\geq n_0}, 5n\leq c\cdot n
$$

Now let's see if our rule holds. Let $c = 6$:

$$
5n\in O(n)\Leftrightarrow \exists\textcolor{red}{c(=6)}, \textcolor{gray}{n_0\ni\forall n\geq n_0}, 5n\leq \textcolor{red}{c}\cdot n = \textcolor{red}{6}\cdot n
$$

It's clearly true that $5n\leq 6n$ for $n\geq 0$. Hence, we could actually have $n_0 = 0$:

$$
5n\in O(n)\Leftrightarrow \exists\textcolor{red}{c(=6)}, n_0\ni\forall n\geq \textcolor{red}{0}, 5n\leq \textcolor{red}{c}\cdot n = \textcolor{red}{6}\cdot n
$$

We thus see that $5n\in O(n)$.

#### Example 2

Next, we consider the not-perfectly-linear function $f(n) = 2n + 6\sqrt{n} + 30$:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f8.png').default} />
</div>

But we still want to show that $f(n)\in O(g(n))$, where $f(n) = 2n + 6\sqrt{n} + 30$ and $g(n) = n$. We again start with our definition:

$$
f(n) \in O(g(n)) \Leftrightarrow \exists c>0, n_0\ni\forall n\geq n_0, f(n)\leq c\cdot g(n)
$$

Now we plug in our particular $f(n)$ and $g(n)$:

$$
2n + 6\sqrt{n} + 30 \in O(n) \Leftrightarrow \exists c>0, n_0\ni\forall n\geq n_0, 2n + 6\sqrt{n} + 30\leq c\cdot n
$$

Suppose we let $c = 4$:

$$
2n + 6\sqrt{n} + 30 \in O(n) \Leftrightarrow \exists\textcolor{red}{c(=4)}, n_0\ni\forall n\geq n_0, 2n + 6\sqrt{n} + 30\leq \textcolor{red}{c}\cdot n = \textcolor{red}{4}\cdot n
$$

After a bit of tinkering and algebra, suppose we choose $n_0 = 36$:

$$
2n + 6\sqrt{n} + 30 \in O(n) \Leftrightarrow \exists c(=4), \textcolor{red}{n_0(=36)\ni\forall n\geq n_0}, 2n + 6\sqrt{n} + 30\leq 4\cdot n
$$

Then we need to show that $2n + 6\sqrt{n} + 30\leq 4n$ when $n\geq 36$:

$$
6\sqrt{n}+30\leq 2n?\quad
n\geq 36\Rightarrow 6\sqrt{n}+30\leq n+n = 2n\Rightarrow 2n+6\sqrt{n}+30\leq 4\cdot n
$$

Basically, if $n\geq 36$, then note that $6\sqrt{n}\leq n$ and $30\leq n$; that is, $2n + 6\sqrt{n} + 30\leq 2n + n + n = 4n$. Hence, $f(n)\in O(g(n))$. 

Why is $6\sqrt{n}\leq n$? Since we know that $n$ is positive, we can rearrange the original inequality as $6\leq\frac{n}{\sqrt{n}}$, which simplifies to $6\leq\sqrt{n}$. Squaring both sides, we get $36\leq n$, which is exactly the condition that $n\geq 36$. 

The deduction above is quite simple &#8212; it's easy to imagine examples where much more complicated mathematical expressions could be involved, and we might need to rely on advanced mathematics to work out a suitable, convincing proof.

#### Simplification of functions 

What does working out the proof above actually do for us? Let's see:

- $2n + 6\sqrt{n} + 30\in O(n)$ (potentially helpful)
- $n\in O(2n + 6\sqrt{n} + 30)$ (less helpful)
- $2n + 6\sqrt{n} + 30\in O(n^2)$ (weaker statement ... we prefer the first one because smaller upper bounds are stronger statements)

#### Precision of use 

The above shows there are a couple of different ways that asymptotic notation is used. For HeapSort, for example, most texts would say HeapSort uses $O(n\lg n)$ comparisons. But some texts (e.g., Sedgewick, Knuth, some research papers, etc.) are more precise and would say HeapSort uses no more than $2n\lg n + O(n)$ comparisons; that is, take the set of functions that is $O(n)$ and, to each of those functions in the set, add exactly $2n\lg n$ to get a new set. And the maximum number of comparisons used by HeapSort is no bigger than some function in *that* set.

Here, with what we've done so far, only the smaller-order terms are brushed into the asymptotic notation. This allows for comparison between different algorithms of the same order growth like $n\lg n$ and helps us in thinking about optimization because in real life, of course, multiplicative factors *do matter*. In this usage, the big-$O$ notation has the same meaning, but it's used differently. It's more sophisticated and informative but also more mathematically challenging.

The first way of using $O$-notation is more widespread.

#### Example 2 revisited

Going back to our second example:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f10.png').default} />
</div>

We've seen that $f(n)\in O(n)$, and we mentioned that $f(n)\in O(n^2)$ too, 

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f11.png').default} />
</div>

This may seem obvious, but exploring it will lead us to another useful asymptotic definition. We put up our definition of big-$O$:

$$
f(n) \in O(g(n)) \Leftrightarrow \exists c>0, n_0\ni\forall n\geq n_0, f(n)\leq c\cdot g(n)
$$

And we fill in the specifics for our functions $f(n)$ and $g(n)$:

$$
2n + 6\sqrt{n} + 30 \in O(n^2) \Leftrightarrow \exists c>0, n_0\ni\forall n\geq n_0, 2n + 6\sqrt{n} + 30\leq c\cdot n^2
$$

For this proof, we'll choose $c = 1$ and $n_0 = 8$:

$$
2n + 6\sqrt{n} + 30 \in O(n^2) \Leftarrow \textcolor{red}{\forall n\geq n_0 = 8, 2n + 6\sqrt{n} + 30\leq c(=1)\cdot n^2}
$$

We should really prove that the values chosen above for $c$ and $n_0$ actually work, but a picture will do for now:

<div align='center' className='centeredImageDiv'>
  <img width='500px' src={require('./f12.png').default} />
</div>

#### Going from big-O to little-o

For the example above, let's assume we've shown $f(n)\in O(n^2)$. How important was our choice of $c=1$? What would have happened if, instead, we chose $c=\frac{1}{2}$? Remember, $c$ does not need to be an *integer* ... just a positive constant. If we chose $c=\frac{1}{2}$, then cheating by using pictures instead of actually proving things, it seems that for $n\geq 13$ we have $f(n)\leq\frac{1}{2}\cdot n^2$:

$$
2n + 6\sqrt{n} + 30 \in O(n^2) \Leftarrow \textcolor{lime}{\forall n\geq n_0 = 13, 2n + 6\sqrt{n} + 30\leq c(=1/2)\cdot n^2}
$$

We can see this in the picture below:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f13.png').default} />
</div>

And it turns out it doesn't matter what constant we pick here. For *any* $c > 0$, we can find $n_0$ such that $f(n)\leq c\cdot n^2$ when $n\geq n_0$. Hence, $2n+6\sqrt{n}+30\in O(n^2)$. The observation we just made is going to be the basis for another asymptotic definition, so-called "little $o$", where the function $f(n)\in o(g(n))$ if $g(n)$'s growth strictly dominates the growth of $f(n)$.

#### Little-o definition

So we have the following definition for big-$O$:

$$
f(n) \in O(g(n)) \Leftrightarrow \exists c>0, n_0\ni\forall n\geq n_0, f(n)\leq c\cdot g(n)
$$

And now the following definition for little-$o$:

$$
f(n) \in o(g(n)) \Leftrightarrow \forall c>0, \exists n_0\ni\forall n\geq n_0, f(n)\leq c\cdot g(n)
$$

#### Example 2 for little o

If we fill in the specifics of our functions as before for this new definition, we get the following:

$$
2n+6\sqrt{n}+30 \in o(n^2) \Leftrightarrow \forall c>0, \exists n_0\ni\forall n\geq n_0, 2n+6\sqrt{n}+30\leq c\cdot n^2
$$

If we simplify the above for when $n$ is at least 1, then we have the following for $n\geq 1$:

$$
2n+6\sqrt{n}+30\leq 8n + 30\leq 40n
$$

We can actually calculate a value for $n_0$. The value $n_0 = 40+40/c$ will do. Hence, if $n\geq n_0=40+40/c$, then $40n\leq cn^2$. Hence $2n+6\sqrt{n}+30\in o(n^2)$.

#### Five asymptotic sets

If we extend the little-$o$ notation above, then we can obtain a little-$\omega$ (little omega) notation as well to come up with five asymptotic sets in total:

- $f(n) \in o(g(n))$ strict upper bound
- $f(n) \in O(g(n))$ upper bound
- $f(n) \in \Theta(g(n))$ upper and lower bound
- $f(n) \in \Omega(g(n))$ lower bound
- $f(n) \in \omega(g(n))$ strict lower bound

Some textbooks will introduce even more asymptotic notations. 

#### Five asymptotic sets (definitions) {#asymptotic-definitions}

We can define the previous asymptotic sets formally as follows:

- $f(n) = o(g(n)) \Leftrightarrow \forall c > 0, \exists n_0\ni\forall n\geq n_0, 0\leq f(n)\leq c\cdot g(n)$
- $f(n) = O(g(n)) \Leftrightarrow \exists c > 0, n_0\ni\forall n\geq n_0, 0\leq f(n)\leq c\cdot g(n)$
- $f(n) = \Theta(g(n)) \Leftrightarrow f(n)\in O(g(n))$ and $f(n)\in\Omega(g(n))$
- $f(n) = \Omega(g(n)) \Leftrightarrow \exists c > 0, n_0\ni\forall n\geq n_0, 0\leq c\cdot g(n)\leq f(n)$
- $f(n) = \omega(g(n)) \Leftrightarrow \forall c > 0, \exists n_0\ni\forall n\geq n_0, 0\leq c\cdot g(n)\leq f(n)$

We've already seen the first two definitions above for upper bounds. The last two are symmetric to them except they're lower bounds. So for those definitions we have $f(n)\geq c\cdot g(n)$ instead of $f(n)\leq c\cdot g(n)$. 

The little-$o$ and big-$\Omega$ cases are where it's especially important to remember that $c$ can be a value less than $1$. If we forget that, then in the little-$o$ case, our proof will probably be wrong or incomplete. And in the big-$\Omega$ case, we might not be able to get our proof to go through at all.

#### Historical notation

Historically, set notation such as that for $3n\in O(n^2)$ is *not* used. Instead, we'd write $3n=O(n^2)$, and we'd read this as, "$3n$ *is* big-$O$ of $n^2$." So we can use that in our previous formal definitions if we'd like.

It's worth noting that *all* of the other growths can be defined by just using the big-$O$ definition. Like $f(n)\in \Omega(g(n))\Leftrightarrow g(n)\in O(f(n))$. But those definitions probably aren't as constructive as the ones listed above in terms of helping us prove membership.

Lots of books have slight differences in how the different asymptotic sets are defined, but most are defining the same sets, especially if we only consider increasing positive functions. The definitions above are slight modifications of the ones given in CLRS. But they actually define the same sets as CLRS, even if the definitions are *slightly* altered. For example, in <BibRef id='TC2022' pages='p. 60'></BibRef>, for little-$o$, the definition uses $0\leq f(n) < c\cdot g(n)$ instead of $0\leq f(n)\leq c\cdot g(n)$, the only difference being the inequality is strict (i.e., $<$ instead of $\leq$). But they define the same set.

#### Analogy

The reason the asymptotic sets above are put in the order they are in is because there's some analogy here:

- $f(n) \in o(g(n))$
- $f(n) \in O(g(n))$
- $f(n) \in \Theta(g(n))$
- $f(n) \in \Omega(g(n))$
- $f(n) \in \omega(g(n))$

If $f(n)\in o(g(n))$, then $f(n)\in O(g(n))$, but it's not in any of the other sets.

If $f(n)\in\Theta(g(n))$, then $f(n)\in O(g(n))$ and $f(n)\in \Omega(g(n))$ but $f(n)\not\in o(g(n))$ and $f(n)\not\in \omega(g(n))$.

The relations remarked on above look kind of like inequalities:

- $f(n) \in o(g(n))$ is sort of like $f(n) < g(n)$
- $f(n) \in O(g(n))$ is sort of like $f(n)\leq g(n)$
- $f(n) \in \Theta(g(n))$ is sort of like $f(n) = g(n)$
- $f(n) \in \Omega(g(n))$ is sort of like $f(n)\geq g(n)$
- $f(n) \in \omega(g(n))$ is sort of like $f(n) > g(n)$

This explains why there are naturally five asymptotic sets.

#### Example 3

For the last example, we'll look at the $\Theta$ bound in the context of some new functions:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f14.png').default} />
</div>

We want to consider a function that grows like $n^2$. Let's prove our $\Theta$ bound by proving both upper and lower bounds (we'll give some $c$ and $n_0$ values that work, but we should verify that the given values work):

- $f(n) = O(n^2)$ because for $\textcolor{red}{c=2}$, $\textcolor{red}{n\geq n_0 = 2}$, $f(n)\leq \textcolor{red}{2}\cdot n^2$
- $f(n) = \Theta(n^2)$ because preceding and succeeding lines
- $f(n) = \Omega(n^2)$ because for $\textcolor{lime}{c=\frac{1}{2}}$, $\textcolor{lime}{n\geq n_0=9}$, $\textcolor{lime}{\frac{1}{2}}\cdot n^2\leq f(n)$

We can also add in a faster and slower growing function if we want to see all five asymptotic definitions in action:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f15.png').default} />
</div>

We have the following for $f(n)=n^2-6n+15$:

- $f(n) = o(n^3)$ because for $\textcolor{red}{c>0}$, $\textcolor{red}{n\geq n_0=3+1/c}$, $f(n)\leq\textcolor{red}{c}\cdot n^3$
- $f(n) = O(n^3)$ because for $\textcolor{red}{c=1}$, $\textcolor{red}{n\geq n_0 = 2}$, $f(n)\leq\textcolor{red}{1}\cdot n^2$
- $f(n) = O(n^2)$ because for $\textcolor{fuchsia}{c=2}$, $\textcolor{fuchsia}{n\geq n_0=2}$, $f(n)\leq\textcolor{fuchsia}{2}\cdot n^2$
- $f(n) = \Theta(n^2)$ because preceding and succeeding lines
- $f(n) = \Omega(n^2)$ because for $\textcolor{purple}{c=\frac{1}{2}}$, $\textcolor{purple}{n\geq n_0=9}$, $\textcolor{purple}{\frac{1}{2}}\cdot n^2\leq f(n)$
- $f(n) = \Omega(n)$ because for $\textcolor{lime}{c=1}$, $\textcolor{lime}{n\geq n_0=0}$, $\textcolor{lime}{1}\cdot n^2\leq f(n)$
- $f(n) = \omega(n)$ because for $\textcolor{lime}{c > 0}$, $\textcolor{lime}{n\geq n_0=6 + c}$, $\textcolor{lime}{c}\cdot n\leq f(n)$.

It may be worth working through the details to verify everything above.

To repeat one point, but with a concrete example, if we grow like $\Theta(n^2)$, then we cannot be little-$o$ of $n^2$ or little-$\omega$ of $n^2$:

- $f(n) = o(n^3)$
- $f(n) = O(n^3)$
- $f(n) = O(n^2)\;\textcolor{red}{\text{but}}\; f(n)\neq o(n^2)$
- $f(n) = \Theta(n^2)$
- $f(n) = \Omega(n^2)\;\textcolor{red}{\text{but}}\; f(n)\neq \omega(n^2)$
- $f(n) = \Omega(n)$
- $f(n) = \omega(n)$

### Proofs, properties, and pictures

#### Proofs about functions

One kind of task that students are often asked to do is to prove that one function's growth is bounded by another function's growth. The goal is to get students more familiar with the asymptotic definitions, formal proofs, and results in an intuition for how quickly the functions grow.

So let's start with the almost trivial example involving $f(n) = n^2$ and $g(n)=n^3$:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f16.png').default} />
</div>

Our goal will be to show that $n^2 = o(n^3)$. For this, we'll go [directly to the definition](#asymptotic-definitions):

$$
f(n) = o(g(n)) \Leftrightarrow \forall c > 0, \exists n_0\ni\forall n\geq n_0, 0\leq f(n)\leq c\cdot g(n)
$$

We'll see the following:

$$
n^2\leq c\cdot n^3\Leftrightarrow n\geq 1/c = n_0\Rightarrow n^2=o(n^3)
$$

So the definition holds. Done. Obviously, with simple enough problems, the proof is *very* easy when there aren't any algebraic hangups with using the definition *directly*. But what if we take the functions $f(n) = n^3$ and $g(n) = (\lg\lg n)^{\lg n}$:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f17.png').default} />
</div>

The function $g$ with base $\lg\lg n$ grows doubly exponentially slow, but the exponent, $\lg n$, grows large but not too quickly. But, in all, we don't have a great intuition for $(\lg\lg n)^{\lg n}$ and its growth. Just plugging it into the definition above for little-$o$ doesn't seem like it's going to give us much in the way of a fruitful approach for comparing the growth of $f$ and $g$.

This is where a lot of students get stuck and don't know where to go. On the surface, we may not even have a clue as to which one grows faster:

$$
\begin{align*}
n^3\leq c\cdot (\lg\lg n)^{\lg n} &\Leftrightarrow \; ???\\
(\lg\lg n)^{\lg n}\leq c\cdot n^3 &\Leftrightarrow \; ???
\end{align*}
$$

We may just look at the picture above of the graphs and decide we're good. For now, we'll just put this problem aside.

#### Proofs about properties

Students are also often asked to prove *properties* about asymptotic growth. So let's say we're *given* that $\lg f(n) = o(\lg g(n))$ and for any constant positive constant $c$, for sufficiently large $n$, $g(n)$ grows larger than the constant. We want to show that what we're given implies $f(n) = o(g(n))$. More formally:

$$
\textcolor{red}{(\lg f(n) = o(\lg g(n)))} \land \textcolor{blue}{(\forall c, \exists m_0\ni\forall n\geq m_0, c\leq g(n))} \Rightarrow \textcolor{fuchsia}{f(n) = o(g(n))}
$$

We won't tease out all the little details of the proof, but it really begins with working with the definition of little-$o$:

$$
\begin{array}{rrrrrrrr}
\textcolor{red}{\forall c > 0,} & \textcolor{red}{\exists n_0\ni\forall n\geq n_0,} &{} &{} \textcolor{red}{\lg f(n)} &\textcolor{red}{\leq c\lg g(n)} &{} &{}\\
\forall c > 0, & \exists n_0\ni\forall n\geq n_0, &{} &{} 2^{\lg f(n)} &\leq 2^{c\lg g(n)} &{} &{}\\
\forall c > 0, & \exists n_0\ni\forall n\geq n_0, &f(n) &= 2^{\lg f(n)} &\leq 2^{c\lg g(n)} &= (2^{\lg g(n)})^c &= g^c(n)\\
c =\tfrac{1}{2}, & \exists n_0\ni\forall n\geq n_0, &f(n) &{} &\leq &{} &{} \sqrt{g(n)}\\
{} & \exists n_0\ni\forall n\geq n_0, &{} &f(n) &\leq \sqrt{g(n)} &{} &{} &{}
\end{array}
$$

After a little bit of algebra, we also use the fact that $g(n)$ grows past any constant. Combining these different facts and picking a big enough $n$-value so that all facts apply ($n'_0$ in the bullet point below), we get the little-$o$ definition of what we're trying to prove and we're done (last bullet point below).

For arbitrary $c' > 0$:

- Let $\textcolor{blue}{c = 1/(c')^2}$, find $\textcolor{blue}{m_0\ni\forall n\geq m_0, 1/(c')^2\leq g(n)}$.
- Pick: $n'_0 = \max(\textcolor{red}{n_0}, \textcolor{blue}{m_0})$. Then, for $c' > 0$, $\forall n\geq n'_0$:
- $\textcolor{blue}{1\leq c'\sqrt{g(n)}}$ and $\textcolor{red}{f(n)\leq\sqrt{g(n)}}$. Use $c'$ below:
- $\textcolor{fuchsia}{\forall c' > 0, \exists n'_0\ni\forall n\geq n'_0, f(n)} = \textcolor{blue}{1}\cdot\textcolor{red}{f(n)}\leq\textcolor{blue}{c'\sqrt{g(n)}}\cdot\textcolor{red}{\sqrt{g(n)}}=\textcolor{fuchsia}{c' g(n)}$

Why are proofs like these assigned? It helps one gain familiarity with proofs and definitions, but the main thing is that this is part of the *science* in "computer science". Also, it might actually be useful ... but not *seeing* any concrete functions can lead to one thinking such exercises as the one above are just way too abstract, resulting in theorems and results that aren't too interesting or useful.

#### "Proof" by picture

But then one runs into a problem like the following and just toils away:

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f18.png').default} />
</div>

It's tempting to just make a plot of the functions like the one above and call it a "proof". But it definitely is not a *proof*. A plot can give us an idea, but we need more than that to be precise and fully confident in our result.

#### Proofs about functions using properties

The plot above turns out to be misleading. Shock! To find the relationship between the functions being plotted, let's go back to the property we had before:

$$
\textcolor{red}{(\lg f(n) = o(\lg g(n)))} \land \textcolor{blue}{(\forall c, \exists m_0\ni\forall n\geq m_0, c\leq g(n))} \Rightarrow \textcolor{fuchsia}{f(n) = o(g(n))}
$$

If we have $f(n) = n^3$ and $g(n) = (\lg\lg n)^{\lg n}$, then taking the logarithm of each function gives us

$$
\lg(f(n)) = 3\lg n,\qquad
\lg(g(n)) = \lg n \lg\lg\lg n
$$

Suddenly things become much easier. They each have a $\lg n$ term, but while $3$ is a constant, we know that $\lg\lg\lg n$ *grows*. It may grow extremely slowly, but the point is that it grows. It's not constant. It eventually grows to infinity. Since our property specified above holds, we have that 

$$
3\lg n = o(\lg n\lg\lg\lg n)
$$

implies

$$
n^3 = o((\lg\lg n)^{\lg n})
$$

Above, everything has been simplified so much that we can even see the "crossing point":

$$
3\lg n\leq \lg n\lg\lg\lg n
\Leftrightarrow 
3\leq \lg\lg\lg n
\Leftrightarrow 
2^{2^{2^3}} = 2^{256}\leq n
$$

So $g(n) = (\lg\lg n)^{\lg n}$ passes $f(n) = n^3$ when $n\geq 2^{256}$. But, of course, no one would actually plot the graph of these two functions that far out on a whim.

Of course, we could argue the $n$-value above is so big that it doesn't matter. And maybe it doesn't matter for some real-life applications. But the bottom line is that we should be firmly convinced that a picture is not "proof" of anything. Use the definitions and use the properties.

### Runtime of simple programs and loops

#### Non-loop example

Let's start with a really simple program comprised of only a few lines:

```a showLineNumbers
findRoot(a, b, c) {
    tmp = b * b
    tmp = tmp - 4 * a
    tmp = sqrt(tmp)
    tmp = tmp - b
    tmp = tmp / (2 * a)
    return tmp
}
```

Each line takes a fixed amount of time. That doesn't mean that the lines take the same amount of time as each other. The subtraction line (line `5`) is probably quicker than the line with both subtract and multiplication (line `3`), but if we're just trying to get the asymptotic runtime of the program, then we only need to know that each line individually has some fixed, *constant* amount of time it can take. We then run all of the lines and see that the program takes a constant amount of time total.

We usually assume we have fixed size values (e.g., 32-bit or 64-bit). Then we can say that simple arithmetic functions take constant time, but what about the square root operation? That function might actually loop through several iterations of simpler arithmetic, but with fixed-size values, we can still say that it takes constant time; that is, if the size of the inputs/numbers being processed is fixed and bounded, such as 32-bit or 64-bit, then even if the square root function involves multiple iterations or steps internally, then the total number of operations is bounded by a constant number due to the fixed size of the inputs. If we were to work with arbitrarily large numbers (e.g., arbitrary-precision arithmetic), then the complexity of the square root function would depend on the number of bits, making it a non-$O(1)$ operation; in that case, the time complexity could be closer to $O(\log n)$ depending on whatever method is used to calculate the square root.

For more complex functions though, we might need to know or calculate their runtime.

#### Max - simple loop

Consider the following simple program:

```a showLineNumbers
replaceMax(A[1...n], val) {
    index = findMaxIndex(A)
    tmp = A[index]
    A[index] = val
    return tmp
}
```

It takes an array, `A`, and replaces the maximum value in that array with some new value and returns the old max. We need to be careful of line `2`, where we use the `findMaxIndex` method. How long it takes to run depends on how large `A` is. That may seem very obvious in *this* context, but when using programming language library functions like `indexOf` for Java's `ArrayList`, people sometimes forget.

The program above takes a constant amount of time *plus* the amount of time needed to run the `findMaxIndex` method: 

```a showLineNumbers
findMaxIndex(A[1...n]) {
    tmp = 1
    for (i = 2 to n)
        if (A[tmp] < A[i])
            tmp = i
    return tmp
}
```

How long does the program above take? If we exclude the loop, it looks great. It takes some constant amount of time. What constant? We need to allocate some variables, assign some values, etc. For the sake of having something specific, let's say the program above has a constant runtime of `7`. Whatever value we choose won't be important in the end because we'll see that it can be brushed into our asymptotic notation. Returning to our program, we next have our loop. The loop iterates $n - 1$ times, and to get the runtime of the loop, we have to add up the loop's time over all those iterations. Because we have an upper bound of $n$ iterations, we can use that to simplify the math. For each iteration, we have an increment, a couple of comparisons, maybe an assignment or two; again, we have a fixed number of operations. Let's call that `9`. 

#### Max - upper bound

At this point, if we let $T(n)$ represent the runtime of our program, we're looking at something like the following for an upper bound on the runtime on our program:

$$
T(n)\leq 7 + \sum_{i=1}^n 9
$$

With just a bit of manipulation, we can see that we can get a linear upper bound on $T(n)$ using our big-$O$ notation:

$$
\begin{align*}
T(n)&= O(g(n))\equiv\exists c > 0, n_0\ni\forall n\geq n_0, 0\leq T(n)\leq cg(n)\\
T(n)&\leq 7 + \sum_{i=1}^n 9\leq 9n + 7\leq 10n \quad(n\geq 7 = n_0)
\end{align*}
$$

The constants chosen above really weren't all that important. Let's demonstrate this. We could do the same calculations with *any* constants:

$$
T(n)\leq a + \sum_{i=1}^n b\leq bn + a \leq (b + 1)n \quad(n\geq a = n_0)
$$

#### Max - lower bound

We can do the same thing for a lower bound:

$$
\begin{align*}
T(n)&= \Omega(g(n))\equiv\exists c > 0, n_0\ni\forall n\geq n_0, 0\leq cg(n)\leq T(n)\\
T(n)&\leq 7 + \sum_{i=1}^n 9\leq 9n + 7\leq 10n \quad(n\geq 7 = n_0)\\
T(n)&\geq\sum_{i=2}^n 1
\end{align*}
$$

Here, even if we ignore any of the program that isn't in the loop, and assume the loop takes just a single unit of time, we can still get a lower bound on the runtime:

$$
T(n)\geq 1 = n - 1\geq\frac{1}{2}n \quad(n\geq 2 = n_0)
$$

Because the upper and lower bounds are *linear* for the `replaceMax` program, we've proven that the runtime is $\Theta(n)$:

$$
T(n) = O(n),\quad
T(n) = \Omega(n),\quad
T(n) = \Theta(n)
$$

#### Bubble sort - nested loops

Of course, we could look at more complex single loops where each iteration through the loop takes a different amount of time, but we can also see an example of that in the outer loop of `Bubblesort`'s nested loops:

```a showLineNumbers
Bubblesort(A[1...n]) {
    for (i = 1 to n)
        for (j = n downto i + 1)
            if (A[j] < A[j - 1])
                swap(A[j], A[j - 1])
}
```

While `Bubblesort`'s performance is not the most incredible its code is quite nice for analysis. So let's drop the constant term outside of the loops because we know it isn't going to dominate the runtime. We run through $n$ iterations of the outer loop and for each iteration there's an inner loop, and we need *its* runtime. That will be another sum over the iterations of the inner loop. And the time of each inner loop iteration is ... some constant like `7` again:

$$
T(n)\leq\sum_{i=1}^n\sum_{j=i+1}^n 7
$$

#### Bubble sort - upper bound

While the outer loop can have a different runtime each iteration, we sum over all of them, chug through some algebra and then get a runtime of no more than $\frac{7}{2}n^2$:

$$
\begin{align*}
T(n)
&\leq\sum_{i=1}^n\sum_{j=i+1}^n 7\\
&= \sum_{i=1}^n 7[n - (i + 1) + 1]\\
&= \sum_{i=1}^n 7(n-i)\\
&= 7\sum_{i=1}^n - 7\sum_{i=1}^n i\\
&= 7n^2 - 7\frac{n(n+1)}{2}\\
&=\frac{7}{2}n^2 - \frac{7}{n}\\
&\leq\frac{7}{2}n^2\\
&= O(n^2)
\end{align*}
$$

Note how this meshes with our big-$O$ definition:

$$
T(n) = O(g(n))\equiv\exists c > 0, n_0\ni\forall n\geq n_0, 0\leq T(n)\leq cg(n)
$$

Depending on how tight we want to get the analysis, we could have made some simplifications. Instead of working out the algebra *perfectly* like we did above, we could have used more inequalities earlier on in the chain of simplifications:

$$
T(n)
\leq\sum_{i=1}^n\sum_{j=i+1}^n 7
\leq\sum_{i=1}^n\sum_{j=1}^n 7
= \sum_{i=1}^n 7n
= 7n^2
$$

These new simplifications still result in a runtime upper bound of $O(n^2)$. The constant is pretty arbitrary because `7` was obviously rather arbitrary. 

#### Bubble sort - comparisons

On the other hand, if we want to count some key operations like the *comparison* or maybe the swap, then we could try to calculate that number more precisely. We can get rid of all occurrences of the arbitrary constant `7` and say that `Bubblesort` takes no more than $\frac{n^2}{2}$ comparisons:

$$
\begin{align*}
T(n)
&\leq\sum_{i=1}^n\sum_{j=i+1}^n 1\\
&= \sum_{i=1}^n 1[n - (i + 1) + 1]\\
&= \sum_{i=1}^n 1(n-i)\\
&= \sum_{i=1}^n - \sum_{i=1}^n i\\
&= n^2 - \frac{n(n+1)}{2}\\
&=\frac{1}{2}n^2 - \frac{1}{n}\\
&\leq\frac{1}{2}n^2\\
&= O(n^2)
\end{align*}
$$

And we can make the same "aggressive" simplifications as before:

$$
T(n)
\leq\sum_{i=1}^n\sum_{j=i+1}^n 1
\leq\sum_{i=1}^n\sum_{j=1}^n 1
= \sum_{i=1}^n n
= n^2
$$

The $\frac{n^2}{2}$ term in the previous set of calculations really is more informative though because that somewhat arbitrary `7` is gone and now the `1/2` means something. In either case, noting that the algorithm's runtime is *proportional* to the number of comparisons, we still get a big-$O$ upper bound of $O(n^2)$ for the runtime.

#### Bubble sort - lower bound

For our lower bound, first recall the definition of big-$\Omega$ we're trying to satisfy:

$$
T(n)=\Omega(g(n))\equiv\exists c > 0, n_0\ni\forall n\geq n_0, 0\leq cg(n)\leq T(n)
$$

We use similar math compared to what we did for the upper bound:

$$
\begin{align*}
T(n)
&\textcolor{red}{\geq}\sum_{i=1}^n\sum_{j=i+1}^n 1\\
&= \sum_{i=1}^n 1[n - (i + 1) + 1]\\
&= \sum_{i=1}^n 1(n-i)\\
&= \sum_{i=1}^n - \sum_{i=1}^n i\\
&= n^2 - \frac{n(n+1)}{2}\\
&=\frac{1}{2}n^2 - \frac{1}{n}\\
&=\frac{n^2-n}{2}\\
&= n^2
\end{align*}
$$

But this simplification from before doesn't quite work. We can't make the inside loop larger for proving a lower bound. Working the math out yields the lower order term of $(n^2 - n)/2$, which is kind of a pain because now we have that $T(n)\geq (n^2 - n)/2$; that is $T(n)$ is bigger than $n^2/2$ minus something, but for our definition we want to just be bigger than a constant times $n^2$. We can't just ignore the smaller term of $n$.

So we could pick a constant like $c=\frac{1}{4}$ and a positive $n_0$ term and be on our merry way:

$$
T(n)\geq\frac{n^2 - n}{2}\geq\frac{1}{4}n^2 \quad(n\geq 2 = n_0)
$$

If we wanted to use a *bigger* constant term, then we would need to use a larger $n_0$:

$$
T(n)\geq\frac{n^2-n}{2}\geq\frac{1}{3}n^2 \quad(n\geq 3 = n_0)
$$

We could actually use any constant less than $1/2$. If we wanted to use a more sophisticated analysis, then we could say the number of comparisons is at least one half of $n^2$ minus some function that grows no faster than linear in $n$:

$$
T(n)\geq\frac{1}{2}n^2 - O(n)
$$

That's a lower bound on the number of comparisons by taking an upper bound on that negative function.

Combining the results above for upper and lower bounds of `Bubblesort`, we have $T(n) = \Theta(n^2)$:

$$
T(n) = O(n^2),\quad
T(n) = \Omega(n^2),\quad
T(n) = \Theta(n^2)
$$

### Usage of asymptotic notation

For algorithm analysis, we generally talk about one or more of the following:

- Best case
- Average case
- Worst case

Analyzing for the best case is usually *too optimistic* to be helpful. For instance, best case in a linear search is that the first element you look at it what you need. This is $\Theta(1)$. That's not helpful. On the other hand, we might consider what happens when the search fails (i.e., we never discovered our target and we had to loop through the entire list to be certain). Even in the best case, when the search fails, that search is going to take linear time. The best case for a program like merge sort or heap sort might be *interesting*, but it still probably isn't useful.

Analyzing for the average case is good if we either know what distribution of the data will be (which might be hard) or we have a randomized algorithm and we take the average over our own random choices. Especially for randomized algorithms, analysis of the average case can be really useful, but sometimes the math can get really difficult.

Analyzing for the worst case is probably the most common because it's pessimistic. Whatever we come up with ... can't be worse than that! And even if we're very pessimistic, if we can prove good bounds, then we will have a strong statement. Oftentimes worst case analysis is a lot easier than average case analysis in terms of the math involved. And for a lot of algorithms, the worst case and average case order of growth may very well be the same. 

For example, considering merge sort over $n$ different values, the best, worst, and average case runtime is order $n\lg n$. The worst case analysis is good enough to tell us most of the story. But in quicksort it tells us a lot less. Because quicksort's worst case performance is worse than the overwhelming majority of its runs.

So we see that which type of analysis we might use depends on which algorithm we're discussing. Besides talking about algorithm performance, we can also talk about problem complexity. So let's consider the problem of sorting, specifically using some *comparison-based* sorting algorithms:

- `InsertionSort`: worst case sorting is an $O(n^2)$ problem.
- `QuickSort`: worst case sorting is an $O(n\lg n)$ problem.
- `MergeSort`: worst case sorting is an $O(n\lg n)$ problem.

Different algorithms with different runtimes can solve the comparison-based sorting problem, some being faster, others being slower. But we can show that *any* comparison-based sorting algorithm must use *at least* order $n\lg n$ comparisons; that is, comparison-based sorting takes $\Omega(n\lg n)$ comparisons in the worst case. This goes *beyond* saying that algorithms we've already discovered need that many comparisons &#8212; it even holds for algorithms nobody has thought up yet. *Any* comparison-based sort will need order $n\lg n$ comparisons in the worst case.

`MergeSort`, which is a comparison-based sorting algorithm, can sort using $O(n\lg n)$ comparisons. That means that comparison-based sorting is a $\Theta(n\lg n)$ comparison problem. It requires that many comparisons from any algorithm, and the bound can be achieved. It doesn't matter that worse algorithms are out there like `BubbleSort`. 

## Recurrence relations

### Recursion and recurrence relations

#### Fibonacci

Let's start with the famous Fibonacci sequence:

```a showLineNumbers
F_0 = 0
F_1 = 1
F_{i > 1} = F_{i - 1} + F_{i - 2}

Fibonacci(n) {
    if (n < 2)
        return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

The above is a *terrible* recursive program to calculate the $n$th Fibonacci number. Assuming the numbers stay small enough to add in constant time, and ignoring the runtime of the recursive calls, it takes constant time to calculate:

$$
T(n) = T(n - 1) + T(n - 2) + \Theta(1)
$$

But we have those recursive calls. The relation above is known as a *recurrence relation*. Recurrence relations will pop up whenever we want to analyze the runtime of programs that involve some sort of recursive call. To be complete, we can give runtimes for the base cases as well: $T(0) = \Theta(1)$, $T(1) = \Theta(1)$. But generally, the base case is just going to be that the program takes some constant amount of time to run for some fixed size inputs.

In this example, using the Fibonacci sequence, the runtime actually grows like the Fibonacci sequence itself since the recurrence relation basically *is* the Fibonacci sequence.

#### BowlaNachos

But we can imagine many scenarios where this would not be the case:

```a showLineNumbers
B_0 = 0
B_1 = 1
B_{i > 1} = B_{i - 1} x B_{i - 2}

BowlaNachos(n) {
    if (n < 2)
        return n;
    return BowlaNachos(n - 1) x BowlaNachos(n - 2);
}
```

What will the runtime of the program above be? We would have the following:

$$
\begin{align*}
T(n) &= T(n - 1) + T(n - 2) + \Theta(1)\\
T(0) &= \Theta(1),\; T(1) = \Theta(1)
\end{align*}
$$

Notably, the runtime still grows likem the Fibonacci sequence! The program *still* has two recursive calls to problems with the same size arguments as the Fibonacci program (i.e., $n-1$ and $n-2$). So its runtime would be basically the same as the program for computing the Fibonacci program.

But the sequence isn't so interesting because it's `0` *everywhere* except at `B_1 = 1`.

#### Recursive linked list search

Let's move to a slightly more useful program. Imagine we had an unsorted linked list of different values, and we want to search those values for one value in particular, `val`, and we'll just return `true` or `false` if it's in the list or not, respectively. If the list has `n` items, then we could test the first item and then recursively search the rest of the list:

```a showLineNumbers
list.search(val) {
    if (list.head == nil)
        return false;
    return list.head.search(val);
}

node.search(val) {                    # T(n) <=
    if (node.val == val)
        return true;                  # Θ(1) +
    if (node.next == nil)
        return false;                 # Θ(1) +
    return node.next.search(val);     # T(n - 1)
}
```

The check at the current location (line `8`) takes constant time. If we don't find the value, then we have a recursive call to the next item in the list which has one fewer items in its remaining list (line `12`).

This gives us another recurrence relation: 

$$
\begin{align*}
T(n) &\leq T(n - 1) + \Theta(1)\\
T(0) &= \Theta(1),\; T(1) = \Theta(1)
\end{align*}
$$

Note the "$\leq$" sign above. For the program above, if we find the value, then we just stop and there wouldn't be anymore recursive calls. Here, we can only say the program above has a constant time for its lower bound.

#### Merge sort 

Let's now look at merge sort:

```a showLineNumbers
mergeSort(A[], start, end) {      # T(n) = 
    if (start <= end) {
        return;                   # Θ(1) + 
    }
    mid = (start + end) / 2;      # Θ(1) + 
    mergeSort(A, start, mid);     # T(ceil(n / 2)) +
    mergeSort(A, mid + 1, end)    # T(floor(n / 2)) + 
    merge(A, start, mid, end);    # Θ(n)
}

merge(A, start, mid, end)
    Θ(n) merging code goes here
```

For the program above, we recursively sort the first half of the array, then the second half, then merge the two sorted halves together to sort the entire array. The merge in all the non-recursive calls take linear total time. And the two recursive calls are each to about half the array so we get a recurrence like the following:

$$
\begin{align*}
T(n) &= T(\lceil n/2 \rceil) + \Theta(\lfloor n/2\rfloor) + \Theta(n)\\
T(0) &= \Theta(1),\; T(1) = \Theta(1)
\end{align*}
$$

We see that the floors and ceilings are a bit ugly, and it'd be much nicer to not have to worry about them.

#### Justifying rounding

We can sometimes pretend that all divisions happen nicely, and we'll give somewhat of a justification here for why we can do that.

Consider the expression

$$
T(n) = 4T(\lceil n/2 \rceil) + \Theta(\lfloor n/2\rfloor) + \Theta(n)
$$

as opposed to

$$
T(n) = 8T(n/2) + \Theta(n)
$$

- If $n$ is a power of 2 (i.e., $n = 2^k$), then the two versions above are equivalent and we get $T(n) = \Theta(n^3)$ as a solution (subsequent sections will show *how* to solve recurrence relations).
- If $n$ is *not* a power of 2, then imagine solving for the surrounding perfect powers of 2: $2^k < n < 2^{k+1}$. It turns out each of these functions, both the one that's too big and the one that's too small, both grow like $n^3$:
  + $T(m = 2^k) \leq T(n)\leq T(2m),\qquad (m < n < 2m)$
  + $T(m) = \Theta(m^3)$, $T(2m) = \Theta((2m)^3) = \Theta(m^3)$
  + $n^3 / 8 < m^3 < 8n^3$, so $\Theta(m^3) = \Theta(n^3)$.
  + If $T(n)$ is between two functions that both grow like $\Theta(n^3($, namely $T(m)$ and $T(2m)$, then $T(n)$ is $\Theta(n^3)$: $T(n) = \Theta(n^3)$.

More generally, for *increasing functions* (which effectively are all functions that model runtime), *any* recurrence should be bounded between the cases of *rounding everything down* versus *rounding everything up*. Hence, for

$$
T(n) = T(\lceil n/2 \rceil) + T(\lfloor n/2 \rfloor) + \Theta(n)
$$

where $T(n)$ is assumed to be an increasing function, we have

$$
2T(\lfloor n/2 \rfloor) + \Theta(n)
\textcolor{red}{\leq T(n)\leq}
2T(\lceil n/2 \rceil) + \Theta(n)
$$

If the two cases of "rounding everything up" and "rounding everything down" give the same order of growth, then it seems like it should be safe to round.

When using the substitution method to solve recurrences, we'll adhere to the following guidelines:

- assume all divisions happen without remainder
- solve for $T(n)$
- check that $T(n - 1) = \Theta(T(n))$
- rounding should not have mattered (under and upper estimates will both use an inductive step that uses the same order of growth)
- everything above happens over a huge group of functions, at least constant through exponential, that is, $\Theta(1)$ through $\Theta(X^n)$ for constant $X$. It doesn't happen to be true for some extremely fast-growing functions like $n!$, but once we get to those runtimes, rounding won't be our biggest issue.

### Substitution method

#### Linked list search

Let's start with the recurrence for searching a linked list. Given

$$
T(n)\leq T(n - 1) + 1
$$

we want to prove that $T(n) = O(n)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot n
$$

The basic technique of the substitution method is to just guess the answer and then try to prove that your guess is correct using induction. In the case above, we guess the relation is $O(n)$. Inductively, we'll assume 

$$
\forall k < n, T(k)\leq c\cdot k
$$

and try to prove that that implies the relation holds for $T(n)$, the total runtime of the algorithm.

$$
\begin{align*}
T(n)
&\leq\textcolor{red}{T(n-1)} + 1 \\
&\leq\textcolor{red}{c\cdot (n - 1)} + 1 & \text{(by ind. hyp.; let $k=n-1$)}\\
&\leq cn - c + 1\\
&\stackrel{?}{\leq} c\cdot n\\
&\Leftrightarrow 1\leq c
\end{align*}
$$

We see the above is true for a ton of $c$-values. Let's just pick one. It's true for $c = 1$, $n\geq n_0=1$ (the $n_0$ is not important in this case). By our definition of big-$O$, we've proven our recurrence is $O(n)$.

#### Simplifications

To be fair, we did make use of some simplifications in the calculations above. The first few have to do with the constants we used. For the base case of the recurrence, we never actually referred to it explicitly. From what we proved previously, we had $T(1) = 1$ and $T(0) = 0$. But are they? We'll come back to $T(0)$ in a bit, but right now let's consider what happens if $T(1) = c_1$.

Similarly, we modified the actual recurrence and assumed that the $\Theta(1)$ term was 1. What if it was some other constant? Here, we're assuming we're trying to solve an equation for time, but we haven't defined what 1 unit of time is anyway. We can ignore these issues by "renormalizing" our time units. Note that the number 1 in $\Theta(1)$ doesn't get renormalized &#8212; that 1 is not a time unit number, it's just a number. Also, the merge sort recurrence we'll see next has a two multiplier. We can't renormalize that out of the equation. It's also unitless. But these other changes we make are okay. 

If we're trying to get a perfect solution to the recurrence, then we need the exact base cases; otherwise, realizing that for fixed size input our program should take a fixed time, we can define our units in terms of that fixed time for any small sized inputs we want. Also, sometimes we get some math where we need an $n_0$, but otherwise we just use it to let us ignore some stuff we want to ignore. 

So even if we want to search an empty list with no items, that would take some positive time. We can't *actually* get $T(0) = 0$ no matter how we renormalize. But we just ignore that and say we don't care about zero, we only care about $n$-values at least 1. We can ignore small values in our big-$O$ definition.

To recap:

- Renormalizing issues:
  + Base case:
    * $T(1) = 1$?  $T(0) = 0$?
    * What if $T(1) = c_1$?
  + Fixed term:
    * Relation: $T(n)\leq T(n-1) + \textcolor{red}{\Theta(1)}$.
    * Assumed: $T(n)\leq T(n-1) + 1$.
    * What if $T(n)\leq T(n-1) + c_2$?
  + 1 new unit = $\max(c_1, c_2)$ old units.
  + $T(1)$ new units $\leq\max(c_1,c_2)$ old units.
  + $T(n)\leq T(n-1)+ c_2$ old units $\leq T(n-1) + 1$ new units.
- We tend to ignore $n_0$ in the inductive step.
  + We use it when we want to ignore some low-end items.

#### Merge sort upper bound

Next, we want to prove that merge sort grows no faster than $n\lg n$. Given

$$
T(n)\leq 2T(n/2) + n
$$

we want to prove $T(n) = O(n\lg n)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot n\lg n
$$

Just like before, we inductively assume

$$
\forall k < n, T(k)\leq c\cdot k\lg k
$$

and plug in and knock out some algebra:

$$
\begin{align*}
T(n)
&\leq 2\textcolor{red}{T(n/2)} + n\\
&\leq 2\textcolor{red}{c\cdot (n/2)\lg(n/2)} + n & \text{(by ind. hyp.; let $k=n/2$)}\\
&= cn((\lg n) - 1) + n\\
&= cn\lg n - cn + n\\
&\stackrel{?}{\leq} c\cdot n\lg n\\
&\Leftrightarrow n\leq cn
\end{align*}
$$

True for $c = 1$, $\forall n\geq n_0 = 1$ (the $n_0$ is not important in this case).

#### Guess too big

Let's not get to where the guesses came from just yet for the proof above, but let's explore what happens when we guess incorrectly. What if we guess too big? That is, instead of guessing $T(n) = O(n\lg n)$, suppose we guessed $T(n) = O(n^2)$. Then we'd want to prove $T(n) = O(n^2)$ using the big-$O$ notation:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot n^2
$$

We can try to prove it inductively by assuming

$$
\forall k < n, T(k)\leq c\cdot n^2
$$

Then let's see what happens:

$$
\begin{align*}
T(n)
&\leq 2\textcolor{red}{T(n/2)} + n\\
&\leq 2\textcolor{red}{c\cdot (n/2)^2} + n & \text{(by ind. hyp.; let $k=n/2$)}\\
&= cn^2/2 + n\\
&\stackrel{?}{\leq} c\cdot n^2\\
&\Leftrightarrow n\leq cn^2/2\\
&\Leftrightarrow 1\leq cn/2
\end{align*}
$$

So it's true for any $c>0, \forall n\geq n_0=2/c$. So in this case we didn't actually need to calculate an $n_0$ value. The smaller the $c$-value is the larger the $n_0$-value will be. So if we pick $c=1/100$, then $n_0 = 200$. We use the $n_0$ term to assume that $n$ is at least 200. And if $n/2$ is less than 200, then we use the fact that the program takes a fixed time for a fixed number of values, renormalize to that time that's needed, and assume that everything holds for our base cases there.

What we've really just proven is that $T(n) = o(n^2)$ since we've shown the above holds for any $c>0$ so long as $n\geq n_0=2/c$.

#### Guess too small

What happens if we guess too small? Suppose we're given $T(n)\leq T(n/2) + n$ and we try to prove that $T(n) = O(n)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot n
$$

We inductively assume

$$
\forall k < n, T(k)\leq c\cdot n
$$

Now we can try to plug in and knock out some algebra:

$$
\begin{align*}
T(n)
&\leq 2\textcolor{red}{T(n/2)} + n\\
&\leq 2\textcolor{red}{c\cdot (n/2)} + n & \text{(by ind. hyp.; let $k=n/2$)}\\
&= cn + n\\
&\textcolor{red}{\stackrel{?}{\leq}} c\cdot n\\
&\Leftrightarrow n\leq 0
\end{align*}
$$

The proof fails. It doesn't prove anything. But in this case we can make some simple changes to our calculations and get a different proof.

Given

$$
T(n)\textcolor{red}{\geq} 2T(n/2) + n
$$

let's prove that $T(n) = \omega(n)$ using the little-$\omega$ definition:

$$
\forall c > 0,\exists n_0\ni\forall n\geq n_0, T(n)\geq c\cdot n
$$

Let's prove it inductively. Assume

$$
\forall k < n, T(k) \textcolor{red}{\geq} c\cdot n
$$

Plug and play:

$$
\begin{align*}
T(n)
&\textcolor{red}{\geq} 2T(n/2) + n\\
&\textcolor{red}{2c\cdot (n/2) + n} & \text{(by ind. hyp.; let $k=n/2$)}\\
&= cn + n\\
&\textcolor{red}{\stackrel{?}{\geq}} c\cdot n\\
&\Leftrightarrow n\geq 0
\end{align*}
$$

We see it holds, $\forall c, T(n) = \omega(n)$. 

The successful proof above for little-$\omega$ is the same as the failed proof for big-$O$ except the $\leq$ was changed to a $\geq$. So if $T(n)$ is $\omega(n)$, then $T(n)$ grows strictly faster than $\omega(n)$, so $T(n)$ definitely cannot be $O(n)$. This conclusively shows the previous proof had to fail because we were trying to prove something that was false.

#### Tight lower bound proof

To be complete, let's give a proof of the tight lower bound. Given

$$
T(n)\geq 2T(n/2) + n
$$

we want to prove that $T(n) = \Omega(n\lg n)$ using the big-$\Omega$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, c\cdot n\lg n\leq T(n)
$$

We will prove it inductively. Assume

$$
\forall k < n, c\cdot k\lg k\leq T(k)
$$

We get the following

$$
\begin{align*}
T(n)
&\geq 2\textcolor{red}{T(n/2)} + n\\
&\geq 2\textcolor{red}{c\cdot (n/2)\lg(n/2)} + n & \text{(by ind. hyp.; let $k=n/2$)}\\
&= cn((\lg n) - 1) + n\\
&= cn\lg n - cn + n\\
&\stackrel{?}{\geq} c\cdot n\lg n\\
&\Leftrightarrow n\geq cn
\end{align*}
$$

True for $c=1, \forall n\geq n_0 = 1$. We have 

$$
T(n) = \Omega(n\lg n),\qquad
T(n) = O(n\lg n),\qquad
T(n) = \Theta(n\lg n)
$$

#### Failed proof

Let's try to learn something from a failed proof for another recurrence. Given

$$
T(n)\leq 2T(n/2) + 1
$$

we want to prove that $T(n) = O(n)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot n
$$

We go through our normal steps by trying to prove this inductively. Let's assume

$$
\forall k < n, T(k)\leq c\cdot k
$$

We get the following:

$$
\begin{align*}
T(n)
&\leq 2\textcolor{red}{T(n/2)} + 1\\
&\leq 2\textcolor{red}{c\cdot (n/2)} + 1\\
&= cn + 1\\
&\stackrel{?}{\leq} cn\\
&\Leftrightarrow 1\leq 0
\end{align*}
$$

This is obviously never true for any $c > 0$. What does a failed proof imply, if anything? Does it imply that the thing we are trying to prove is false (i.e., that the recurrence isn't linear)? No. A failed proof doesn't really mean anything. Of course, if something isn't true, then our proof of that false thing had better fail! But not being able to prove something with a faulty proof doesn't mean that thing you are trying to prove is patently false.

Realistically, a failed proof is an opportunity to reflect. Maybe we should jump to a bigger function with a higher order of growth than $n$ such as $n\lg n$ or $n^2$. Those will go through easily.

#### Lower order terms

But what if we just go a tiny bit bigger? Given

$$
T(n)\leq 2T(n/2) + 1
$$

let's try to prove $T(n) = O(n + 1)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot(n+1)
$$

This is basically the same as before but now we have an extra constant to play with. Inductively, we assume

$$
\forall k < n, T(k)\leq c\cdot \textcolor{red}{(k+1)}
$$

and we get the following:

$$
\begin{align*}
T(n)
&\leq 2\textcolor{red}{T(n/2)} + 1\\
&\leq 2\textcolor{red}{c\cdot (n/2 + 1)} + 1\\
&= cn + \textcolor{red}{2c} + 1\\
&\stackrel{?}{\leq} c\cdot (n \textcolor{red}{+ 1})\\
&\Leftrightarrow \textcolor{red}{c} + 1\leq 0
\end{align*}
$$

This is also never true for any $c>0$. We're even more wrong than before! Previously, we were off by 1. Now we're off by $c+1$. Making the function a little bigger actually made us miss by a little bit more. But this gives us a big hint for how to make the proof go through.

Make the guess a bit *smaller*. So given

$$
T(n)\leq 2T(n/2) + 1
$$

we'll try to prove $T(n) = O(n - 1)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\ni\forall n\geq n_0, T(n)\leq c\cdot(n \textcolor{red}{-} 1)
$$

Inductively, we assume

$$
\forall k < n, T(k)\leq c\cdot (k\textcolor{red}{-}1)
$$

and we get the following:

$$
\begin{align*}
T(n)
&\leq 2T(n/2) + 1\\
&\leq 2c\cdot (n/2 \textcolor{red}{-} 1) + 1\\
&= cn \textcolor{red}{-} 2c + 1\\
&\stackrel{?}{\leq} c\cdot (n \textcolor{red}{-} 1)\\
&\Leftrightarrow 1\leq c
\end{align*}
$$

The above is true for $c = 1, n\geq n_0 = 1$. Hence, we have $T(n) = O(n - 1)$. Well, if $T(n)$ is less than a constant times $n-1$, then $T(n)$ is also less than a constant times $n$. Let's think about that a bit more.

- Inductive proof that $T(n)\leq c\cdot n$ failed.
- Inductive proof that $T(n)\leq c\cdot (n + 1)$ failed.
- Inductive proof that $T(n)\leq c\cdot (n - 1)$ worked.

We were actually able to prove a stronger statement because we were using induction and it allowed us to use a stronger inductive hypothesis.

#### Weirder recurrences

Suppose we run into a weird looking recurrence. For example, suppose we're given

$$
T(n)\leq 3T(n/7) + 2T(n/4) + n
$$

and we want to try to prove $T(n) = O(n)$ using the big-$O$ definition:

$$
\exists c > 0, n_0\colon \forall n\geq n_0, T(n)\leq c\cdot n
$$

As usual, we'll try to prove it inductively by first assuming

$$
\forall k < n, T(k)\leq c\cdot k
$$

Some students try to break this into two separate problems for different parts. Don't do this! Substitute as normal:

$$
\begin{align*}
T(n)
&\leq 3\textcolor{red}{T(n/7)} + 2\textcolor{blue}{T(n/4)} + n\\
&\leq 3\textcolor{red}{c\cdot n/7} + 2\textcolor{blue}{c\cdot n/4} + n\\
&\leq \ldots \stackrel{?}{\leq} c\cdot n
\end{align*}
$$

### Recursion tree method

#### Linear search example

Previously, for $T(n)\leq T(n-1) + 1$, where did our $O(n)$ guess actually come from? The substitution method previously discussed basically involved guessing an answer and then proving that it was correct (or finding out the proof wasn't correct and then adjusting the proof or proving something else). But how do you pick a guess?

We'll now see how you can get a good guess by "unwinding" the recursion within the recurrence relation. We'll start with the recurrence previously discussed, $T(n)\leq T(n-1) + 1$, and imagine we have no guess at all. What we want to do is get rid of the recurrence term on the right. That's easy enough. We know that $T(n)\leq T(n-1) + 1$ so we also know $T(n-1)\leq T(n-2) + 1$; hence, we have $T(n)\leq [T(n-2) + 1] + 1$. But we didn't really get rid of the recurrence term. We just made it a bit smaller. So we can plug it in yet again, hoping that it will go away. And we can continue in this manner for a while until we (hopefully) see a pattern start to emerge:

$$
\begin{align*}
T(n)
&\leq T(n-1)+1\\
&\leq \bigl(T(n-2) + 1\bigr) + 1\\
&\leq \Bigl(\bigl(T(n-3) + 1\bigr) + 1\Bigr) + 1\\
&\leq (((T(n-4) + 1) + 1) + 1) + 1\\
&\;\;\vdots
\end{align*}
$$

For this problem, at each level of the unwinding we have a single recursive call. That doesn't make for much of a "recursive *tree*" ... more like a "vine" or a beanstalk. Nonetheless, it's a nice and simple example to see what's going on. A constant amount of work is done at each level, leaving one recursive call, and we can start to see a pattern emerge:

$$
\begin{align*}
T(n)
&\leq T(n-1)+1 &= T(n-1) + 1\\
&\leq \bigl(T(n-2) + 1\bigr) + 1 &= T(n-2) + 2\\
&\leq \Bigl(\bigl(T(n-3) + 1\bigr) + 1\Bigr) + 1 &= T(n-3) + 3\\
&\leq (((T(n-4) + 1) + 1) + 1) + 1 &= T(n-4) + 4\\
&\;\;\vdots
\end{align*}
$$

The "formal pattern" above looks like $T(n)\leq T(n-i) + i$. Maybe we can now make the recursive term $T(n-i)$ disappear more effectively (and permanently). Here, we plug in $i=n$ to get $T(n)\leq T(n-n) + n$, and the recursion disappears. Instead of a $T(\texttt{some\_var})$, we have $T(0)$, which we expect to be a fixed constant: $T(0) = O(1)$. Assuming this, we have $T(n)\leq n + O(1)$. Now it's easy to see where the linear guess of $T(n) = O(n)$ came from. From our work above, $O(n)$ looks like a good guess for the subtitution method.

#### Substitution required?

But do we even need to use the substitution method? Can we call what we did above a proof already? Saying that the pattern we observed *looks like* $T(n)\leq T(n-i) + i$ is kind of hard to call a proof and be taken seriously.

#### Inductive proof (skipping substitution)

Other than the line above "looking correct", our line of argument looks pretty "proof-ish" that $T(n)$ is linear. So if we want to avoid the substitution method, then we can prove this more formally by using induction on $i$.

The base case is true for $i=1$. Given that our inductive hypothesis is true for $i$, is it true for $i+1$? We want to verify that

$$
T(n)\leq T(n-i) + i\Rightarrow T(n)\leq T(n-(i+1)) + i + 1 \quad ???
$$

Let's see:

$$
T(n-i) + i\leq (T(n-i-1) + 1) + i = T(n-(i+1)) + i + 1
$$

So $T(n)\leq T(n-i) + i$. It holds. 

Now we bang out the rest of the proof similar to what we've done before. If $T(0)$ is a constant, $c_0$, then we have

$$
T(n)\leq c_0 + n\leq c\cdot n
$$

for $c=2, n\geq n_0=c_0$, so $T(n) = O(n)$.

#### Merge sort example

In our analysis of merge sort, we had $T(n)\leq 2T(n/2) + n$, but where did the $O(n\lg n)$ guess come from? Now we use $T(x)\leq 2T(x/2) + x$ to get ride of recursive terms:

$$
\begin{align*}
T(n)
&\leq 2T(n/2) + n\\
&\leq 2(2T(n/4) + n/2) + n\\
&\leq 2(2(2T(n/8) + n/4) + n/2) + n\\
&\leq 2(2(2(2T(n/16) + n/8) + n/4) + n/2) + n\\
&\leq 2(2(2(2(2T(n/32) + n/16) + n/8) + n/4) + n/2) + n\\
&\;\;\vdots
\end{align*}
$$

Just like before, we start to see a pattern:

$$
\begin{align*}
T(n)
&\leq 2T(n/2) + n&=2T(n/2)+n\\
&\leq 2(2T(n/4) + n/2) + n &= 4T(n/4)+2n\\
&\leq 2(2(2T(n/8) + n/4) + n/2) + n &= 8T(n/8) + 3n\\
&\leq 2(2(2(2T(n/16) + n/8) + n/4) + n/2) + n &= 16T(n/16) + 4n\\
&\leq 2(2(2(2(2T(n/32) + n/16) + n/8) + n/4) + n/2) + n &= 32T(n/32) + 5n\\
&\;\;\vdots
\end{align*}
$$

In a more general form, our pattern looks like

$$
T(n)\leq 2^i T(n/2^i) + i\cdot n
$$

Assuming the equation is correct, we now have a way of getting rid of the recursive term $T(n/2^i)$ on the right. If we pick an $i$-value such that $n/2^i$ is $1$, which happens when $i = \lg n$, then we have $T(1)$, which we assume takes some constant amount of time. This will give us our order $n\lg n$ guess.

To recap, to get rid of $T(n/2^i)$, we strategically set $n/2^i$ to the constant value $1$ and try to see how we can obtain this:

$$
n/2^i = 1\Rightarrow n = 2^i\Rightarrow i = \lg n
$$

So we have

$$
T(n)\leq 2^{\lg n} T(n/2^{\lg n}) + n\lg n = nT(1) + n\lg n
$$

#### Why substitution

From here, we can either prove our education guess is correct using the substitution method. Or we can formalize our work above by using induction on $i$ to prove the "looks like" statement 

$$
T(n)\leq 2^i T(n/2^i) + i\cdot n
$$

is correct. Either option involves an inductive proof of some sort.

Some people prefer to the substitution method to the recursion tree method because it permits more sloppiness in getting your guess and working out the details. With substitution, we don't need to work out the exact formula, which might be tougher for uglier recurrences. We just need to work out enough to have the right asymptotic guess. If we skip the substitution method to check our guess, then we'll probably need more precision for the generalized formula, which can sometimes get algebraically ugly.

### Three examples

#### Example 1 - T(n) = 7T(n/3) + n^2 

Suppose we had the following recurrence: $T(n) = 7T(n/3) + n^2$. To get a guess for its order of growth, we plug into the $T(n/3)$ term to start to unwind things and see if we can spot a pattern. Specifically, we use $T(x) = x^2 +7T(x/3)$ to get rid of recursive terms.

We can start out as follows:

$$
\begin{align*}
T(n)
&= n^2 + 7T(n/3)\\
&= n^2 + 7((n/3)^2 + 7T(n/3^2)) & \text{(plug in)}\\
&= n^2 + (7/3^2)n^2 + 7^2T(n/3^2) & \text{(distribute)}\\
&= n^2 + (7/3^2)n^2 + 7^2((n/3^2)^2 + 7T(n/3^3)) & \text{(plug in)}\\
&= n^2 + (7/3^2)n^2 + (7/3^2)^2 n^2 + 7^3T(n/3^3) & \text{(distribute)}\\
&= n^2 + (7/3^2)n^2 + (7/3^2)^2 n^2 + 7^3((n/3^3)^2 + 7T(n/3^4)) & \text{(plug in)}\\
&= n^2 + (7/3^2)n^2 + (7/3^2)^2 n^2 + (7/3^2)^3 n^2 + 7^4 T(n/3^4) & \text{(distribute)}\\
&= n^2(1+(7/3^2) + (7/3^2)^2 + (7/3^2)^3) + 7^4 T(n/3^4)
\end{align*}
$$

Above, note how the $n^2$ term can be taken out of the non-recursive terms. It looks like we have a general form of the equation as

$$
T(n) = 7^i T(n/3^i) + n^2\sum_{j = 0}^{i-1}\Bigl(\frac{7}{3^2}\Bigr)^j
$$

which we could prove by induction if we wanted to and then solve it (recurrence tree method). But we won't do that here. Instead, we'll just treat it as if we're trying to get a good guess for the substitution method. So we assume the general form is correct and try to figure out what order of growth it would imply if it was.

We have 

$$
T(n) = 7T(n/3) + n^2 = n^2 + 7T(n/3)
$$

and we noted above that it seems the general form can be expressed as

$$
T(n) = 7^i T(n/3^i) + n^2\sum_{j=0}^{i-1}\Bigl(\frac{7}{3^2}\Bigr)^j
$$

To make the recursive term $T(n/3^i)$ disappear, we'll pick an $i$ such that $n/3^i = 1\Leftrightarrow i = \log_3 n$, and we plug this in:

$$
T(n) = 7^{\textcolor{red}{\log_3 n}} T(n/3^{\textcolor{red}{\log_3 n}}) + n^2\sum_{j=0}^{\textcolor{red}{\log_3 n} - 1} \Bigl(\frac{7}{3^2}\Bigr)^j
$$

This makes the recursion bottom out at $T(1)$:

$$
T(n) = 7^{\log_3 n} \textcolor{red}{T(1)} + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{7}{3^2}\Bigr)^j
$$

As usual, we'll assume $T(1) = \Theta(1)$. Naturally, we have very little intuition as to how the function $7^{\log_3 n}$ grows. But it equals $n^{\log_3 7}$ which grows like $n$ to the one point something: $n^{1.?}$. That is:

$$
T(n) = \textcolor{red}{n^{1.?}} \Theta(1) + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{7}{3^2}\Bigr)^j
$$

How can we make this simplification? Recall the following property of logarithms: $a^{\log_b c} = c^{\log_b a}$. And note that $n^{\log_3 7}$ can be rewritten using the change of base formula for logarithms: $\log_3 7 = \log 7 / \log 3$. So we have $n^{\log_3 7} = n^{\log 7 / \log 3}$. If we compute $\log 7$ and $\log 3$ independently, then we see that $\log 7/\log 3\approx 1.771$. Hence, $n^{\log_3 7}\approx n^{1.771}$.

Thus, it looks like the entire equation above grows like $n^{1.?}$, that is, $n$ to the one point something, plus $n^2$ times the summation. But what is the summation? That's where knowledge of geometric series can be helpful. It's a *decreasing* geometric series, and it's proportional to the largest (first) term.

All of this makes it look like $T(n)$ grows like $n^2$; that is, $T(n) = \Theta(n^2)$. If we wanted to, then we could either use $n^2$ as a guess and prove that it really does work using the substitution method. Or we could prove that the *general* format above holds, and then this would just count as a recurrence tree proof.

But let's just move on to the next examples for now.

#### Example 2 - T(n) = 9T(n/3) + n^2 

We don't need to do this example and the next because they look very similar to the previous example. When we worked out the general form guess in the previous example, there wasn't anything particularly special about the $\textcolor{red}{7}$ term. If that $\textcolor{red}{7}$ changed into a $\textcolor{red}{9}$, then pretty much *everything* would stay the same:

$$
\begin{align*}
T(n)
&= n^2 + \textcolor{red}{9}T(n/3)\\
&= n^2 + \textcolor{red}{9}((n/3)^2 + \textcolor{red}{9}T(n/3^2)) & \text{(plug in)}\\
&= n^2 + (\textcolor{red}{9}/3^2)n^2 + \textcolor{red}{9}^2T(n/3^2) & \text{(distribute)}\\
&= n^2 + (\textcolor{red}{9}/3^2)n^2 + \textcolor{red}{9}^2((n/3^2)^2 + \textcolor{red}{9}T(n/3^3)) & \text{(plug in)}\\
&= n^2 + (\textcolor{red}{9}/3^2)n^2 + (\textcolor{red}{9}/3^2)^2 n^2 + \textcolor{red}{9}^3T(n/3^3) & \text{(distribute)}\\
&= n^2 + (\textcolor{red}{9}/3^2)n^2 + (\textcolor{red}{9}/3^2)^2 n^2 + \textcolor{red}{9}^3((n/3^3)^2 + \textcolor{red}{9}T(n/3^4)) & \text{(plug in)}\\
&= n^2 + (\textcolor{red}{9}/3^2)n^2 + (\textcolor{red}{9}/3^2)^2 n^2 + (\textcolor{red}{9}/3^2)^3 n^2 + \textcolor{red}{9}^4 T(n/3^4) & \text{(distribute)}\\
&= n^2(1+(\textcolor{red}{9}/3^2) + (\textcolor{red}{9}/3^2)^2 + (\textcolor{red}{9}/3^2)^3) + \textcolor{red}{9}^4 T(n/3^4)
\end{align*}
$$

And the general formula would change similarly:

$$
T(n) = \textcolor{red}{9}^i T(n/3^i) + n^2\sum_{j = 0}^{i-1}\Bigl(\frac{\textcolor{red}{9}}{3^2}\Bigr)^j
$$

How does the general form above change our outcome? We can immediately observe that our geometric series is no longer *decreasing*. It's constant because $9/3^2 = 1$. But let's continue our analysis as we did above to confirm how this changes things.

We start with 

$$
T(n) = \textcolor{red}{9}T(n/3) + n^2 = n^2 + \textcolor{red}{9}T(n/3)
$$

and we spot the general formula

$$
T(n) = \textcolor{red}{9}^iT(n/3^i) + n^2\sum_{j=0}^{i-1}(\textcolor{red}{9} / 3^2)^j.
$$

Now we still want the recursive term $T(n/3^i)$ to bottom out. So we pick $i$ such that $n/3^i = 1\Leftrightarrow i=\log_3 n$. Now the math looks just like before except for two changes. Let's first work out the chain of calculations and simplifications:

$$
T(n) = \textcolor{red}{9}^{\log_3 n} T(n/3^{\log_3 n}) + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{\textcolor{red}{9}}{3^2}\Bigr)^j
$$

We simplify to get

$$
T(n) = \textcolor{red}{9}^{\log_3 n} \Theta(1) + n^2\sum_{j=0}^{\log_3 n - 1} 1^j
$$

and then use the logarithm property to obtain

$$
T(n) = n^{\log_3 \textcolor{red}{9}} \Theta(1) + n^2\sum_{j=0}^{\log_3 n - 1} 1
$$

We finally have the following:

$$
T(n) = \textcolor{red}{n^2} \Theta(1) + n^2\log_3 n
$$

So now instead of having $n$ to the one point something, we have $n^2$. Next, as we noted above, the summation is no longer a decreasing geometric series. Every time is exactly 1. So we just need to count how many terms there are, and there are $\log_3 n$ terms in this case.

So for this new example we get a new guess of $T(n) = \Theta(n^2\log_3 n)$, which we could just as well write as $T(n) = \Theta(n^2\lg n)$.

Again, we could use the work above as part of a substitution method or recurrence tree method proof.

#### Example 3 - T(n) = 10T(n/3) + n^2 

For our last example, we again take a similar recurrence, but instead of $7$ or $9$, we use $10$:

$$
\begin{align*}
T(n)
&= n^2 + \textcolor{red}{10}T(n/3)\\
&= n^2 + \textcolor{red}{10}((n/3)^2 + \textcolor{red}{10}T(n/3^2)) & \text{(plug in)}\\
&= n^2 + (\textcolor{red}{10}/3^2)n^2 + \textcolor{red}{10}^2T(n/3^2) & \text{(distribute)}\\
&= n^2 + (\textcolor{red}{10}/3^2)n^2 + \textcolor{red}{10}^2((n/3^2)^2 + \textcolor{red}{10}T(n/3^3)) & \text{(plug in)}\\
&= n^2 + (\textcolor{red}{10}/3^2)n^2 + (\textcolor{red}{10}/3^2)^2 n^2 + \textcolor{red}{10}^3T(n/3^3) & \text{(distribute)}\\
&= n^2 + (\textcolor{red}{10}/3^2)n^2 + (\textcolor{red}{10}/3^2)^2 n^2 + \textcolor{red}{10}^3((n/3^3)^2 + \textcolor{red}{10}T(n/3^4)) & \text{(plug in)}\\
&= n^2 + (\textcolor{red}{10}/3^2)n^2 + (\textcolor{red}{10}/3^2)^2 n^2 + (\textcolor{red}{10}/3^2)^3 n^2 + \textcolor{red}{10}^4 T(n/3^4) & \text{(distribute)}\\
&= n^2(1+(\textcolor{red}{10}/3^2) + (\textcolor{red}{10}/3^2)^2 + (\textcolor{red}{10}/3^2)^3) + \textcolor{red}{10}^4 T(n/3^4)
\end{align*}
$$

And the general formula changes similarly again:

$$
T(n) = \textcolor{red}{10}^i T(n/3^i) + n^2\sum_{j = 0}^{i-1}\Bigl(\frac{\textcolor{red}{10}}{3^2}\Bigr)^j
$$

Once again, the math works out in a very similar way as before. We start with 

$$
T(n) = \textcolor{red}{10}T(n/3) + n^2 = n^2 + \textcolor{red}{10}T(n/3)
$$

and we spot the general formula

$$
T(n) = \textcolor{red}{10}^iT(n/3^i) + n^2\sum_{j=0}^{i-1}(\textcolor{red}{10} / 3^2)^j.
$$

Now we still want the recursive term $T(n/3^i)$ to bottom out. So we pick $i$ such that $n/3^i = 1\Leftrightarrow i=\log_3 n$. Now the math looks just like before except for two similar changes again. Let's first work out the chain of calculations and simplifications:

$$
T(n) = \textcolor{red}{10}^{\log_3 n} T(n/3^{\log_3 n}) + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{\textcolor{red}{10}}{3^2}\Bigr)^j
$$

We simplify to get

$$
T(n) = \textcolor{red}{10}^{\log_3 n} \Theta(1) + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{\textcolor{red}{10}}{3^2}\Bigr)^j
$$

and then use the logarithm property to obtain

$$
T(n) = n^{\log_3 \textcolor{red}{10}} \Theta(1) + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{\textcolor{red}{10}}{3^2}\Bigr)^j
$$

We finally have the following:

$$
T(n) = \textcolor{red}{n^{2.?}} \Theta(1) + n^2\sum_{j=0}^{\log_3 n - 1} \Bigl(\frac{\textcolor{red}{10}}{3^2}\Bigr)^j
$$

Now we have $n$ to the two point something, and because $10/9$ is larger than $1$, the geometric series is now an increasing geometric series. Its summation is going to be proportional to the largest or last term in the series:

$$
\begin{align*}
T(n) 
&= \Theta\biggl(n^{\log_3 \textcolor{red}{10}} + n^2\Bigl(\frac{\textcolor{red}{10}}{3^2}\Bigr)^{\log_3 n - 1}\biggr)\\
&= \Theta\biggl(n^{\log_3 \textcolor{red}{10}} + n^2\frac{n^{\log_3 \textcolor{red}{10}} / \textcolor{red}{10}}{n^{\log_3 3^2} / 3^2}\biggr)\\
&= \Theta\biggl(n^{\log_3 \textcolor{red}{10}} + n^2\frac{n^{\log_3 \textcolor{red}{10}} / \textcolor{red}{10}}{n^2 / 3^2}\biggr)\\
&= \Theta\biggl(n^{\log_3 \textcolor{red}{10}} + \frac{9n^{\log_3 \textcolor{red}{10}}}{10}\biggr)
\end{align*}
$$

As shown above, the $n^2$ terms kindly cancel. This gives us a guess that the whole equation grows like

$$
T(n) = \Theta\bigl(n^{\log_3 \textcolor{red}{10}}\bigr)
$$

Or $n$ to the two point something roughly.

#### Preview of the master method

It turns out that a *lot* of divide-and-conquer algorithms end up giving recurrence relations that have analyses that look very similar to one of the three examples detailed above.

Essentially, we work things out and end up having a *decreasing*, *flat*, or *increasing* geometric series. The master theorem generalizes the approaches above so that for those recurrence relations we don't have to work out any guesses. We just need to do some quick analysis to ensure that we fall into one of three cases, and then we apply the master theorem, plug and chug, and it tells us the order of growth for the recurrence relation.

The next section generalizes the examples above to try and justify a simple version of the master theorem. We'll also cover some cases where the master method doesn't work.

### Master Method

#### Generalized examples

We previously saw three separate but similar examples. We saw how to manipulate the following recurrences to find each one's asymptotic growth (in the reverse order in which we previously discussed them):

1. For $T(n) = 10T(n/3) + n^2$
2. For $T(n) = 9T(n/3) + n^2$
3. For $T(n) = 7T(n/3) + n^2$

The recurrences above are all the same with the only exception being the coefficient out front: $10$, $9$, or $7$. In our previous work, to analyze each case we expanded the recursion and noticed a geometric series. The big difference came from what kind of series we saw: 

1. For $T(n) = \textcolor{red}{10}T(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(\textcolor{red}{10}/3^2)^j$.
    + $\log_3 \textcolor{red}{10} > 2$: increasing geometric series:
    + $\Theta(\text{last term of series}) = \Theta(n^{\log_3 \textcolor{red}{10}})$.
2. For $T(n) = \textcolor{red}{9}T(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(\textcolor{red}{9}/3^2)^j$.
    + $\log_3 \textcolor{red}{9} = 2$: flat series, $\log_3 n$ terms:
    + $\Theta(n^2\log_3 n) = \Theta(n^2\lg n)$.
3. For $T(n) = \textcolor{red}{7}T(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(\textcolor{red}{7}/3^2)^j$.
    + $\log_3 \textcolor{red}{7} < 2$: decreasing geometric series:
    + $\Theta(\text{first term of series}) = \Theta(n^2)$.

Above, there's nothing special about the $10$ except that it's *bigger* than $9$. Similarly, there's nothing special about the $8$ except that it's *smaller* than $9$. The resultant behavior is really what we care about. But any other constants would do in terms of illustrating the behavior above (e.g., any constant greater than $9$ instead of $10$ and then any constant less than $9$ instead of $7$).

We're going to generalize the coefficient we've been discussing and just call it $\textcolor{red}{a}$:

1. For $T(n) = \textcolor{red}{a}T(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(\textcolor{red}{a}/3^2)^j$.
    + $\log_3 \textcolor{red}{a} > 2$: increasing geometric series:
    + $\Theta(\text{last term of series}) = \Theta(n^{\log_3 \textcolor{red}{a}})$.
2. For $T(n) = 9T(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(9/3^2)^j$.
    + $\log_3 9 = 2$: flat series, $\log_3 n$ terms:
    + $\Theta(n^2\log_3 n) = \Theta(n^2\lg n)$.
3. For $T(n) = \textcolor{red}{a}T(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(\textcolor{red}{a}/3^2)^j$.
    + $\log_3 \textcolor{red}{a} < 2$: decreasing geometric series:
    + $\Theta(\text{first term of series}) = \Theta(n^2)$.

For the second case above, the $9$ was a bit special, which we can see because only $a=9$ gives that second case: $\log_3 9 = 2$, matching the exponent term in the $n^2$ term at the end of the recurrence:

1. For $T(n) = aT(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(a/3^2)^j$.
    + If $\log_3 a > 2$: increasing geometric series:
    + $\Theta(\text{last term of series}) = \Theta(n^{\log_3 a})$.
2. For $T(n) = \textcolor{red}{a}T(n/3) + n^{\textcolor{gold}{2}}$, consider $n^{\textcolor{gold}{2}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/3^{\textcolor{gold}{2}})^j$.
    + If $\log_3 \textcolor{red}{a} = \textcolor{gold}{2}$: flat series, $\log_3 n$ terms:
    + $\Theta(n^{\textcolor{gold}{2}}\log_3 n) = \Theta(n^{\textcolor{gold}{2}}\lg n)$.
3. For $T(n) = aT(n/3) + n^2$, consider $n^2\sum_{j=0}^{i-1}(a/3^2)^j$.
    + If $\log_3 a < 2$: decreasing geometric series:
    + $\Theta(\text{first term of series}) = \Theta(n^2)$.

#### Simple form of master theorem

But there isn't really anything special about the $3$ divisor or the $n^2$ term. So we can generalize both of these. Let's call the divisor $\textcolor{blue}{b}$ and the $n^2$ term we will make into $n^{\textcolor{gold}{c}}$. And what if we multiplied that $n^{\textcolor{gold}{c}}$ term by some different coefficient $\textcolor{lime}{d}$? For all cases, it just multiplies through and gets swept into the $\Theta$ growth term. Nothing really changes. We don't really know what "1 unit" of this function really represents anyway. Multiplying that function by 60 might just be converting the answer from minutes into seconds if it's time. The order of growth will be the same though:

1. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{lime}{d}n^{\textcolor{gold}{c}}$, consider $\textcolor{lime}{d}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/\textcolor{blue}{b}^{\textcolor{gold}{c}})^j$.
    + If $\log_{\textcolor{blue}{b}} \textcolor{red}{a} > \textcolor{gold}{c}$: increasing geometric series:
    + $\Theta(\text{last term of series}) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})$.
2. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{lime}{d}n^{\textcolor{gold}{c}}$, consider $\textcolor{lime}{d}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/\textcolor{blue}{b}^{\textcolor{gold}{c}})^j$.
    + If $\log_{\textcolor{blue}{b}} \textcolor{red}{a} = \textcolor{gold}{c}$: flat series, $\log_{\textcolor{blue}{b}} n$ terms:
    + $\Theta(n^2\log_3 n) = \Theta(n^2\lg n)$.
3. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{lime}{d}n^{\textcolor{gold}{c}}$, consider $\textcolor{lime}{d}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/\textcolor{blue}{b}^{\textcolor{gold}{c}})^j$.
    + If $\log_{\textcolor{blue}{b}} \textcolor{red}{a} < \textcolor{gold}{c}$: decreasing geometric series:
    + $\Theta(\text{first term of series}) = \Theta(n^{\textcolor{gold}{c}})$.

#### First example revisited

Let's now revisit our first example. By comparing $\log_b a$ against $c$, we can now see which case we're in:

1. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{lime}{d}n^{\textcolor{gold}{c}}$, consider $\textcolor{lime}{d}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/\textcolor{blue}{b}^{\textcolor{gold}{c}})^j$.
    + If $\log_{\textcolor{blue}{b}} \textcolor{red}{a} > \textcolor{gold}{c}$: increasing geometric series:
    + $\Theta(\text{last term of series}) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})$.

For $T(n)=\textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{d}n^{\textcolor{gold}{2}}, \log_{\textcolor{blue}{3}} \textcolor{red}{10} > \textcolor{gold}{2}$

Seeing which case we're in tells us the growth of the function. Above, we see that we have an increasing geometric series: $\Theta(\text{last term of series}) = \Theta(n^{\log_{\textcolor{blue}{3}}\textcolor{red}{10}})$

#### More generalization

What happens if the function at the end gets smaller?

For $T(n)=\textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{d}n^{\textcolor{gold}{1}}, \log_{\textcolor{blue}{3}} \textcolor{red}{10} > \textcolor{gold}{1}$

So we'd still have an increasing geometric series: $\Theta(\text{last term of series}) = \Theta(n^{\log_{\textcolor{blue}{3}}\textcolor{red}{10}})$.

Even with just a constant term we get the same order of growth:

For $T(n)=\textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{d}n^{\textcolor{gold}{0}} = \textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{d}, \log_{\textcolor{blue}{3}} \textcolor{red}{10} > \textcolor{gold}{0}$

We'd still have an increasing geometric series: $\Theta(\text{last term of series}) = \Theta(n^{\log_{\textcolor{blue}{3}}\textcolor{red}{10}})$.

Note how we never even looked at the constant $\textcolor{lime}{d}$ coefficient. What if we take it to an extreme and just drop it all together:

For $T(n)=\textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{0}n^{\textcolor{gold}{c}} = \textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{0}, \log_{\textcolor{blue}{3}} \textcolor{red}{10} > \textcolor{gold}{c}$

Then our series just goes away: $\textcolor{lime}{0}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{10}/\textcolor{blue}{3}^{\textcolor{gold}{c}})^j = 0$. We lost our series!

Previously, when using the substitution method, where we kept plugging in to get a general form for our recurrence, besides the series there was another term in the recurrence, the non-recursive part where the recurrence bottoms out. It turns out that as long as that last function is bounded by a polynomial smaller than $n^{\log_3 10}$, we can just ignore it.

$$
\begin{align*}
T(n)&= \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{lime}{0}n^{\textcolor{gold}{c}},\;\text{consider}\; \textcolor{lime}{0}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/\textcolor{blue}{b}^c)^j\\
&= \textcolor{red}{a}^{\log_{\textcolor{blue}{b}} n}T(1) + \textcolor{lime}{0}n^{\textcolor{gold}{c}}\sum_{j=0}^{i-1}(\textcolor{red}{a}/\textcolor{blue}{b}^{\textcolor{gold}{c}})^j = \textcolor{red}{a}^{\log_{\textcolor{blue}{b}} n}T(1) = n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}T(1)\\
\sout{\Theta(\text{last term of series})}&= \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})
\end{align*}
$$

For $T(n) = \textcolor{red}{10}T(n/\textcolor{blue}{3}) + \textcolor{lime}{d}n^{\textcolor{gold}{c}}, \log_{\textcolor{blue}{3}} \textcolor{red}{10} > \textcolor{gold}{2}$:

$$
\sout{\text{increasing geometric series:}\; \Theta(\text{last term of series})} = \Theta(n^{\log_3 10})
$$

We get the same order of growth from our previous analysis where our recurrence bottoms out, giving us the same order of growth as the geometric series did. 

We call the function at the end the *driving function*:

- For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
  + if $\sum_{j=0}^{i-1} \textcolor{red}{a}^j \textcolor{gold}{f(n/}\textcolor{blue}{b^j}\textcolor{gold}{)} = O(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} < \log_{\textcolor{blue}{b}} \textcolor{red}{a}$,
  + $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})$

We assume the driving function is non-negative, but for our first case it can do whatever it wants to do as long as the series that it creates is bounded by a geometric series smaller than $n^{\log_b a}$. We then get the same order of growth.

We don't have to assume that $f(n)$ is a simple polynomial or even a polynomial at all. We don't even have to assume $f(n)$ is monotonic. We just assume it's non-negative and the series grows no faster than a polynomial which grows slower than $n^{\log_b a}$. We do assume that for small constant size inputs that the recurrence base case is bounded by a constant. So we assume that $T(1)$ above would be a positive constant.

The condition above looks somewhat complicated, but it will hold as long as the function itself is upper bounded by $n^c$ for $c$ smaller than $\log_b a$:

- For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
  + $\textcolor{gold}{f(n)} = O(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} < \log_{\textcolor{blue}{b}} \textcolor{red}{a}$,
  + $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})$

Now the case above looks much simpler. So now let's bring back the other two cases and simplify those as well:

1. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
    + If $\textcolor{gold}{f(n)} = O(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} < \log_{\textcolor{blue}{b}} \textcolor{red}{a}$:
    + $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})$.
2. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
    + If $\textcolor{gold}{f(n)} = \Theta(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} = \log_{\textcolor{blue}{b}} \textcolor{red}{a}$:
    + $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}\log n)$.
3. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
    + If $\textcolor{gold}{f(n)} = \Omega(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} > \log_{\textcolor{blue}{b}} \textcolor{red}{a}$:
    + $T(n) = \Theta(\textcolor{gold}{f(n)})$, as long as $\textcolor{gold}{f(n)}$ isn't too "weird" (we'll come back to define what "weird" means in this context)

Usually, when we see the recurrences above, we know $a$ and $b$, but the function $f(n)$ can just be some arbitrary function, which may or may not be a polynomial. Manipulating our variables a little bit

1. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
    + If $\textcolor{gold}{f(n)} = O(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} < \log_{\textcolor{blue}{b}} \textcolor{red}{a}, \textcolor{gold}{c} = \log_{\textcolor{blue}{b}} \textcolor{red}{a} - \epsilon$ for $\epsilon > 0$:
    + $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})$.
2. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
    + If $\textcolor{gold}{f(n)} = \Theta(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} = \log_{\textcolor{blue}{b}} \textcolor{red}{a}$:
    + $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}\log n)$.
3. For $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$
    + If $\textcolor{gold}{f(n)} = \Omega(n^{\textcolor{gold}{c}})$ for $\textcolor{gold}{c} > \log_{\textcolor{blue}{b}} \textcolor{red}{a}, \textcolor{gold}{c} = \log_{\textcolor{blue}{b}} \textcolor{red}{a} - \epsilon$ for $\epsilon > 0$:
    + $T(n) = \Theta(\textcolor{gold}{f(n)})$


we can just directly compare the function against $n^{\log_b a}$. The function $n^{\log_b a}$ is called the *watershed function*. Roughly, the *driving function* is either smaller than, equal to, or larger than the watershed function. Those roughly give our three cases. And the watershed function gets its name from rain landing on different sides of a mountain peak. If it lands on one side, it goes one way. If it lands on the other side, it goes the other way. Of course, if it lands exactly on the peak, then the rain just balances on itself and piles up.

#### Full master theorem

The more general cases described in the previous section may be reframed as in CLRS. Specifically, let $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$ for constants $\textcolor{red}{a}\geq 1$, $\textcolor{blue}{b} > 1$.

Then we get the following (the third case assumes no weird $f(n)$ function):

$$
\begin{array}{ll}
\text{Case 1}\colon \textcolor{gold}{f(n)}\in O(n^{(\log_{\textcolor{blue}{b}} \textcolor{red}{a}) - \epsilon})\;\text{for constant}\; \epsilon > 0 &\Rightarrow T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}).\\
\text{Case 2}\colon \textcolor{gold}{f(n)}\in\Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}})&\Rightarrow T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}\log n).\\
\text{Case 3}\colon \textcolor{gold}{f(n)}\in\Omega(n^{(\log_{\textcolor{blue}{b}} \textcolor{red}{a}) + \epsilon})\;\text{for constant}\; \epsilon > 0 &\Rightarrow T(n) = \Theta(\textcolor{gold}{f(n)})
\end{array}
$$

One technical issue: there are some weird functions out there that can break the third case. To ensure that the third case holds, we use the "no weird $f(n)$ functions condition": If $\textcolor{red}{a}(\textcolor{gold}{f(n/}\textcolor{blue}{b}\textcolor{gold}{)})\leq k\textcolor{gold}{f(n)}$ for some constants $k < 1$, $n_0$, and all $n\geq n_0$.

Of course, the "condition" above does not sound academic enough; hence, in CLRS, the condition above is called the *regularity condition*. The regularity condition basically says don't have some weird $f(n)$ function that is bigger than $n^{\log_b a}$ but that is strange enough that when you look at its terms over its series you get by expanding the recursion, it doesn't sum like a geometric series.

There are lots of functions where the master theorem doesn't hold, but those functions don't come up so often in recurrences from natural divide-and-conquer algorithms. And even if they do, it only matters if you fall into case 3. We'll see such an example in a moment.

Starting with the 4th edition of CLRS, the authors expand the second case to handle some more terms:

- Case 2: $\textcolor{gold}{f(n)}\in\Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}\log^k n)$ for $k\geq0$ implies $T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}\log^{k+1} n)$

The master method is just using the master theorem to solve recurrences.

#### Using the master theorem

Let's see some examples of the master theorem in use. We can use our earliest examples to see this theorem in action and then try out a few other recurrences.

Remember: $T(n) = \textcolor{red}{a}T(n/\textcolor{blue}{b}) + \textcolor{gold}{f(n)}$ for constants $\textcolor{red}{a}\geq 1$, $\textcolor{blue}{b} > 1$.

##### Example 1

$T(n) = 10T(n/3) + n^2$

Then we have

$$
\textcolor{red}{a = 10},
\textcolor{blue}{b = 3},
\textcolor{gold}{f(n) = n^2},\qquad
n^2=O(n^{(\log_{\textcolor{blue}{3}} \textcolor{red}{10}) - \epsilon})\;\text{for}\; \epsilon=(\log_3 10) - 2.
$$

We compare $f(n)$ to $n^{\log_b a}$. Here, $10 > 3^2$ but $10 < 3^3$. So $\log_3 10$ is between $2$ and $3$. It's two point something. We can use that something as our epsilon. We're in case 1:

$$
f(n)\in O(n^{(\log_{\textcolor{blue}{b}} \textcolor{red}{a}) - \epsilon})\;\text{for constant}\; \epsilon > 0
\Rightarrow T(n) = \Theta(n^{\log_{\textcolor{blue}{b}} \textcolor{red}{a}}) = \Theta(n^{\log_{\textcolor{blue}{3}} \textcolor{red}{10}})
$$

##### Example 2

$T(n) = 9T(n/3) + n^2$

Then we have

$$
\textcolor{red}{a = 9},
\textcolor{blue}{b = 3},
\textcolor{gold}{f(n) = n^2},\qquad
n^2=\Theta(n^{\log_{\textcolor{blue}{3}} \textcolor{red}{9}})
$$

So we're in case 2:

$$
f(n)\in O(n^{\log_b a})\Rightarrow T(n) = \Theta(f(n)\log n) = \Theta(n^2\log n)
$$

##### Example 3

$T(n) = 7T(n/3) + n^2$

Then we have

$$
\textcolor{red}{a = 7},
\textcolor{blue}{b = 3},
\textcolor{gold}{f(n) = n^2},\qquad
n^2=\Omega(n^{(\log_3 7) + \epsilon})\;\text{for}\; \epsilon = 2-(\log_3 7)
$$

So we're in case 3:

$$
f(n)\in \Omega(n^{(\log_b a) + \epsilon})\;\text{for constant}\; \epsilon > 0
$$

To be complete, we should check that the regularity condition holds for our function in this third case. We have

$$
af(n/b)
= 7f(n/3)
= 7(n/3)^2
< (8/9)n^2
= (8/9)f(n)
$$

so the regularity condition holds. So we're fine, and the master theorem gives us the asymptotic growth:

$$
T(n) = \Theta(f(n)) = \Theta(n^2)
$$

:::note Epsilon values

In the examples above involving case 1 and case 3, we're using the largest possible $\epsilon$-value. What that value is depends on the parentheses within that exponent term.

The format below shows the parentheses used in the derivation of the proof:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f19.png').default} />
</div>

But if we wanted to, then we could derive a slightly different version of the master theorem in which the $\epsilon$ term is grouped with the $a$:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f20.png').default} />
</div>

One version implies the other. But sometimes the second version can be preferable because it lets us ask questions and obtain answers in a cleaner way (specifically about what the largest $\epsilon$-value can be when using the theorem).

We can redo the proofs we had before but with this different version. We get different largest possible $\epsilon$-values for case 1 and case 3:

<div align='center' className='centeredImageDiv'>
  <img width='600px' src={require('./f21.png').default} />
</div>

:::

##### Example 4 (master theorem doesn't apply)

It's interesting to consider cases when the master theorem fails to solve a recurrence because it doesn't apply. For example, suppose we have $T(n) = \sqrt{n}T(n/7) + n^2$. The master theorem doesn't apply here because it assumes $a$ and $b$ are both constants, but here $a$ is *not* constant.

Similarly, consider the recurrence $T(n) = T(n/\lg n) + n$. Here, there is no constant $b$ divisor term. So the master theorem does not apply.

Now how about $T(n) = 2T(n/2) + n/\lg n$. We'd have $f(n) < n^1$: $n/\lg n = o(n^{\lg^2 = n})$. But it isn't polynomially smaller by some $n$ to the $\epsilon$ factor: $n/\lg n = \omega(n^{\lg^2 - \epsilon = n^{1-\epsilon}})$ for any $\epsilon > 0$. So the driving function falls between cases 1 and 2. It's too small to fall into case 2 but too big to fall into case 1. Since it falls between these cases, the master theorem can't tell us what the growth is.

Now we consider $T(n) = T(n/2) + f(n)$ for $f(n) = n^{1 + n\bmod 2}$. Here, $f(n)$ is growing, but depending on if $n$ is even or odd, $f(n)$ jumps back and forth between $n$ and $n^2$. So it's all over the place. Since $n^{\log_b a}$ is $n^0$ and just a constant 1 and $f(n)$ is always at least $n$, it grows faster than $n^0$, the watershed function: $f(n) = \Omega(n^{0+\epsilon})$ for $\epsilon=1$. So it *should* fall into case 3. But we can see $T(n)$ doesn't really grow like $f(n)$. We can see this by considering a large $n$-value that's twice an odd number. Because $n$ is even, we have $f(n) = n$. But plugging in one level of the recursion, $n/2$ is odd so $T(n/2)$ is bigger than $n^2/4$, which is also bigger than our $f(n)$ value: $T(n) = T(n/2) + n\geq n^2/4 + n = \omega(f(n) = n)$. So even though $f(n) = n$, we have $T(n)\geq n^2/4$, which doesn't fit case 3. The reason this doesn't properly fit into case 3 is because the regularity condition fails for this $f(n)$. Specifically: $a(f(n/2)) = f(n/2)\not\leq kf(n)$. So all bets are off.

Finally, this last example also fails: $T(n) = T(7n/10) + T(n/5) + n$. This fails because we're breaking into problems of different sizes. That isn't allowed. If they're different by rounding errors, then that'd be fine (CLRS goes into detail here). But for this recurrence, the issue is much more than just a rounding issue.

The proof of the master theorem in CLRS simplifies things a bit by assuming that $T$ is defined over all real values and not just integers. The authors call this the "continuous" master theorem. An even more generalized version of the master theorem is the Akra-Bazzi Theorem, and it can handle multiple $a$ and $b$ values all in one recurrence relation like in the last example.

Akra-Bazzi is a sledgehammer, but usually the master theorem is enough. With patience, it can provide a good intuition as to what tips the scales between the cases of the theorem, just comparing the driving function against the watershed function. It's a balancing act between the top-level work versus the number and size of the recursive calls. If there's more work at the top level, then we're in case 3. We can asymptotically ignore the time for the recursive calls. If the calls are too numerous or too large, then we can asymptotically ignore the top-level work done. And if they're perfectly balanced, then we fall into case 2.

## Math topics

### Iterated functions and log*

#### Counting

Kids (maybe) learn how to count before they even learn how to increment. So at some point they can count to like $10$. If you give them $4$ blocks, then they can count and get $4$. But if we add a block to the pile, then the kid doesn't just get to $5$; instead, the kid counts up to $5$ from scratch.

They know the names of the numbers but they don't really understand the increment function. Once the numbers are named, discussing them becomes a little easier. 

#### Defining the basics

We can start with 0 to kick things off.

- There was 0. And it was empty, without structure.
- And then there was the successor operation: $s(n)$, defined so that $\forall x\neq n$, $s(n)\neq s(x)$; that is, two different elements never have the same successor. (We imagine that $s(n) = n + 1$.)

The above basically defines the non-negative integers. And that's how we'll use them. We named all positive integers by using what we noted above:

- We called $s(0)$ by the name `1`
- We called $s(s(0)) = s(1)$ by the name `2`
- We called $s(s(s(0))) = s(s(1)) = s(2)$ by the name `3`

We use integers as shorthand and we also use integers as shorthand within the iterated function notation:

- $s^{(3)}(n) = s(s(s(n)))$

We define function iteration in general in the following manner:

$$
f^{(x)}(n) = f(f^{(x-1)}(n))\quad\text{for}\quad x>0,\;\text{and}\; f^{(0)}(n) = n.
$$

Don't get the notation mixed up with exponentials. It is *not* the case that $f^{(x)}(n)\not\equiv f^x(n)$.

#### Iterated functions

Once we have the successor function and function iteration, we can use them to define other functions. For example, if we iterate the successor or increment function $n$ times, then we've added $n$. Addition comes from the iteration of the increment function:

- $s(a) = a+1$. Then $s^{(n)}(a) = a + n$ is addition.

Now, if we make a new function that's shorthand for addition, and we iterate over *that* function, then we get multiplication.

- Let $f_n(a) = s^{(n)}(a) = a + n$. Then $f_a^{(n)}(0) = a\cdot n$ is multiplication.

And if we iterate over multiplication we get exponentiation:

- Let $g_n(a) = f_a^{(n)}(0) = a\cdot n$. Then $g_a^{(n)}(1) = a^n$ is exponentiation.

We already knew everything presented above. But if we keep going, then maybe now we'll get to something new. If we iterate over exponentiation, then we get tetration:

- Let $h_n(a) = g_a^{(n)}(0) = a^n$. Then $h_a^{(n)}(1) = a^{a{\cdot^{\cdot^{\cdot^{a}}}}}\Bigr\}$ $n$ is tetration

We can keep going to get more and more functions such as Knuth's up-arrow notation or "hyperoperation".

#### Base 2 values

Let's consider $n$ values of 0, 1, 2, 3, 4, 5, and calculate the values for the previously discussed iterated functions:

- $2+n = 2,3,4,5,6,7$
- $2\cdot n = 0,2,4,6,8,10$
- $2^n = 1,2,4,8,16,32$
- $2^{2{\cdot^{\cdot^{\cdot^{2}}}}}\Bigr\}n = 1,2,2^2,2^{2^2},2^{2^{2^{2}}}, 2^{2^{2^{2^{2}}}}$

#### Inverse functions 

We can define the decrement function. With a few more properties, we could define negative integers, but that's not the goal here so we'll use them without definition. Let's consider iterating functions starting with the decrement function. To keep things simple, we'll just stick to the base case of 2.

- Let $s^{(-1)}(a) = x$ such that $s(x) = a$. (Could use as part of negative number definition.)
- Using negative numbers as shorthand, let $f_{-2}(n) = s^{(-2)}(n) = n - 2$.
  + How many times can we iterate $f_{-2}(n)$ before getting to 0 or lower (i.e., how many times can we subtract $2$ before getting to $0$ or less)? That really defines the divide by 2 function:
  + $f_{-2}^* (n) = \lceil n/2 \rceil$
- Let $g_{-2}(n) = \lceil n/2\rceil$
  + How many times can we iterate $g_{-2}(n)$ before getting to 1 or lower (i.e., how many times can we divide by $2$ before getting to $1$ or less)? That defines log base 2:
  + $g_{-2}^* (n) = \lceil\lg n\rceil$.
- Let $h_{-2}(n) = \lceil\lg n\rceil$.
  + How many times can we iterate $h_{-2}(n)$ before getting to 1 or less (i.e., how many times can we take $\lg$ before getting to $1$ or less)? That's "log star $n$" or the "iterated log" function:
  + $\log_2^* n = \lg^* n$. No nickname for it.

It follows the same pattern as the simpler functions of subtraction, division, and logarithms. But most of us simply haven't used this enough so we end up thinking of it as its own function; instead, we define it using the log function.

#### log* growth

> $\lg^* n$: The number of times that we can iterate $\lg n$ until it gets to 1 or lower.

Without context, the definition above looks pretty arbitrary. But now we know it just follows the same pattern as the other functions subtraction, division, logarithm.  We know those functions well.

So let's look at some values:

- For $n\leq 1$, $\lg^* n = 0$.
- For $1 < n \leq 2$, $\lg^* n = 1$.
- For $2 < n \leq 4=2^2$, $\lg^* n = 2$.
- For $4 < n \leq 16=2^4$, $\lg^* n = 3$.
- For $16 < n \leq 65536=2^{16}$, $\lg^* n = 4$.
- For $65536 < n \leq 2^{65536}=2^{16}$, $\lg^* n = 5$.

For practical problems, $2^{65536} < n$ doesn't happen.

### Geometric series for algorithm analysis

#### Introduction

We've probably seen some of the descriptions before for geometric series:

- For $0 < r < 1$:

$$
\sum_{i=0}^\infty r^i = \frac{1}{1-r}
$$

- For $0 < r < 1$:

$$
\sum_{i=0}^\infty a\cdot r^i = a\cdot\frac{1}{1-r}
$$

- For $r\neq 1$:

$$
\sum_{i=0}^{x-1} a\cdot r^i = a\cdot\frac{1-r^x}{1-r}
$$

Fortunately, if we know where the first one comes from, then the rest basically fall out from there.

A lot of people have seen the following series:

$$
1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \cdots = 2
$$

More formally, we can write the above as follows:

$$
\sum_{i=0}^\infty (1/2)^i = 2
$$

But why? We can let $x = 1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \cdots$. Then

$$
\frac{1}{2}x = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \cdots
$$

and 

$$
-\frac{1}{2}x = -\frac{1}{2} - \frac{1}{4} - \frac{1}{8} - \frac{1}{16} - \cdots
$$

So $x - \frac{1}{2}x = 1$, $(1-1/2)x = 1$, $x=\frac{1}{1-1/2} = 2$.

This kind of shifting argument works for not just $1/2$. In general, our claim is that $1 + r + r^2 + r^3 + \cdots = \frac{1}{1-r}$. Formally, for $-1 < r < 1$:

$$
\sum_{i=0}^\infty r^i = \frac{1}{1-r}
$$

Why? We let $x=1+r+r^2+r^3+\cdots$. Then $rx = r + r^2 + r^3 + \cdots$ and $-rx = -r - r^2 -r^3 - \cdots$. So $x- rx = 1$, $(1-r)x = 1$, $x=\frac{1}{1-r}$.

What if we had $10+10/3+10/3^2+10/3^3 + \cdots$? We could just use the work we've already done but scaled up by 10: $10(1+1/3+1/3^2+1/3^3+\cdots)$.

Above, we have $r=1/3$, and we start from 10, not 1. Scale by 10:

$$
10\sum_{i=0}^\infty(1/3)^i = 10\cdot\frac{1}{1-\frac{1}{3}} = 10\cdot\frac{3}{2} = 15
$$

This gives us the next level of generalization for the equation:

$$
\sum_{i=0}^\infty a\cdot r^i = a\cdot\frac{1}{1-r}
$$

What happens if we don't want to sum out to infinity but just want a few terms. We can go through another derivation or we can use the fact that a finite geometric summation is equal to the difference between two infinite summations, each with different starting points:

$$
\sum_{i=0}^9 (2/3)^i 
= \sum_{i=0}^\infty(2/3)^i - \sum_{i=10}^\infty(2/3)^i
$$

Once we do the math and get terms to cancel, we have $(1-(2/3)^{10})\cdot 3$, and we get another version of the formula:

$$
\sum_{i=0}^{m-1}a\cdot r^i = a\cdot\frac{1-r^m}{1-r}
$$

So far, we've assumed $|r| < 1$, but the formula above works for any $r\neq 1$. Why? Because if we look at the series in the right way, then we'll see that there's no such thing as an increasing finite geometric series. If we had $r=3$ and $a=1$, then we can take

$$
\sum_{i=0}^6 3^i = 1 + 3 + 9 + 27 + 81 + 243 + 729
$$

and turn it around to look at it as a decreasing sequence with $r'=1/3$, $a=729=3^6$:

$$
3^6\sum_{i=0}^6(1/3)^i = 729 + 243 + 81 + 27 + 9 + 3 + 1
$$

#### Relevancy for asymptotic analysis

For asymptotic analysis, either way, the term grows like the biggest term in the summation. For big $r$, that will be like the last term. For small $r$ the first term. The formula only breaks down when $r=1$, but that's the easiest case for the summation because we get $m$ total terms, each one of value $a$.

Always $\Theta(\text{biggest term in summation})$:

- For $r>1$, $\Theta(r^{x-1})$
- For $0 < r < 1$, $\Theta(a)$
- For $r=1$, $am$

For asymptotic analysis, the $m$-value will frequently be $\lg n$ where $n$ is the input size for our problem.

## Epilogue

### Logic symbols {#logic-symbols}

- $\exists$: "there exists" ([existential quantifier](https://en.wikipedia.org/wiki/Existential_quantification))
- $\forall$: "for all" ([universal quantifier](https://en.wikipedia.org/wiki/Universal_quantification))
- $\land$: "and" ([logical conjunction](https://en.wikipedia.org/wiki/Logical_conjunction))
- $\lor$: "or" ([logical disjunction](https://en.wikipedia.org/wiki/Logical_disjunction))
- $\implies$: "implies" ([material conditional](https://en.wikipedia.org/wiki/Material_conditional))
- $\iff$: "if and only if" ([biconditional](https://en.wikipedia.org/wiki/If_and_only_if))
- $\ni$: "such that" ([expression shorthand](https://math.stackexchange.com/a/15460/191378))
- $\in$: "membership" ([set membership](https://simple.wikipedia.org/wiki/Set_theory#Theory))
- $n_0$: "$n$-naught" ([starting point](https://math.stackexchange.com/questions/297378/what-is-this-math-symbol-called))
- [List of logic symbols](https://en.wikipedia.org/wiki/List_of_logic_symbols)
- [List of mathematical symbols](https://simple.wikipedia.org/wiki/List_of_mathematical_symbols)

### Big-O definition {#big-o-def}

#### Verbal {#big-o-verbal-def}

Let $t$ and $g$ be functions from $\N$ to $\N$. Then $t\in O(g)$ if there is a positive constant $c$ and non-negative constant $n_0$ such that $t(n)\leq cg(n)$ whenever $n\geq n_0$.

#### Formal {#big-o-formal-def}

The verbal definition above may be described more formally in the following manner. The statement $t\in O(g)$ is equivalent to the following:

$$
(\exists c > 0)(\exists n_0 \geq 0)(\forall n\in\N)(n \geq n_0 \implies t(n)\leq cg(n))
$$

And the negation (recall that $\neg(p\to q)\equiv p\land\neg q)$), $t\not\in O(g)$:

$$
(\forall c > 0)(\forall n_0 \geq 0)(\exists n\in\N)(n \geq n_0\land t(n) > cg(n))
$$

#### Visual {#big-o-visual-def}

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f5.png').default} />
</div>

### Big-Θ definition {#big-theta-def}

#### Verbal {#big-theta-verbal-def}

Let $t$ and $g$ be functions from $\N$ to $\N$. Then $t\in \Theta(g)$ if there are positive constants $c_1$ and $c_2$ and non-negative constant $n_0$ such that $t(n)\leq c_1g(n)$ and $t(n)\geq c_2g(n)$ whenever $n\geq n_0$.

#### Formal {#big-theta-formal-def}

The verbal definition above may be described more formally in the following manner. The statement $t\in \Theta(g)$ is equivalent to the following:

$$
(\exists c_1 > 0)(\exists c_2 > 0)(\exists n_0 \geq 0)(\forall n\in\N)(n \geq n_0 \implies t(n)\leq c_1g(n) \land t(n)\geq c_2g(n))
$$

And the negation, $t\not\in\Theta(g)$:

$$
(\forall c_1 > 0)(\forall c_2 > 0)(\forall n_0 \geq 0)(\exists n\in\N)[n \geq n_0 \land (t(n) > c_1g(n) \lor t(n) < c_2g(n))]
$$

#### Visual {#big-theta-visual-def}

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f6.png').default} />
</div>

### Big-Ω definition {#big-omega-def}

#### Verbal {#big-omega-verbal-def}

Let $t$ and $g$ be functions from $\N$ to $\N$. Then $t\in \Omega(g)$ if there is a positive constant $c$ and non-negative constant $n_0$ such that $t(n)\geq cg(n)$ whenever $n\geq n_0$; that is, the statement $t\in \Omega(g)$ is equivalent to the following:

#### Formal {#big-omega-formal-def}

The verbal definition above may be described more formally in the following manner. The statement $t\in \Omega(g)$ is equivalent to the following:

$$
(\exists c > 0)(\exists n_0 \geq 0)(\forall n\in\N)(n \geq n_0 \implies t(n)\geq cg(n))
$$

And the negation, $t\not\in\Omega(g)$:

$$
(\forall c > 0)(\forall n_0 \geq 0)(\exists n\in\N)(n \geq n_0\land t(n) < cg(n))
$$

#### Visual {#big-omega-visual-def}

<div align='center' className='centeredImageDiv'>
  <img width='400px' src={require('./f7.png').default} />
</div>