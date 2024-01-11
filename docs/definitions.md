---
title: Definitions
hide_title: false
sidebar_label: Definitions
description: Comprehensive list of definitions.
draft: false
tags: 
  - Definitions
keywords: 
  - definitions
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import BibRef from '@site/src/components/BibRef';

## A

### Algorithm {#def-algorithm}

> An algorithm is a procedure to accomplish a specific task, namely a well-specified *problem*, where the problem is specified by describing the complete set of *instances* it must work on and of its output after running on one of these instances.

:::caution Problem vs. Problem Instance

The distinction between a problem and an instance of a problem is critical. Determining that you are dealing with a general problem instead of an instance is your first step towards solving it.

:::

:::info Three Desirable Properties for any Algorithm

There are three desirable properties for a good algorithm. We seek algorithms that are

1. correct
2. efficient
3. easy to implement

Correctness may be formally verified by means of a proof (e.g., induction, contradiction, etc.) while efficiency is typically analyzed and established by means of Big-$O$ notation.

:::

### API wrapper

> [From Quora](https://www.quora.com/What-exactly-is-an-API-wrapper-And-how-does-it-differ-from-just-an-API): An API-wrapper typically takes an API in one form and transforms it into another.
>
> An example might be useful:
> 
> The main application interface to **Flickr** (the image hosting service) is a REST api (is http GET or POST calls). There is a library called **pyFlickr** which is a API-wrapper &#8212; it provides a Pythonic interface to Flickr &#8212; classes, methods, iterators using the REST API under the skin. It keeps all of the REST api methods intact and available, but you call them using Python function calls and wrappings.
>
> Sometimes you will see the term **binding**, as in a Python **binding** for xyz; essentially this is different form of API-wrapper. Here the wrapper transforms an API designed for one programming language and provides functionality in a second language to call the original API. An example here is **pyGTK**. The original **gtk** api is written a a C library. **pyGTK** is called a Python **binding** for **gtk** as it allows a Python program to call the **gtk** API written in C.

## B

### Big Oh {#big-oh}

> **Controlled chaos:** $O$ notation significantly simplifies calculations because it allows us to be sloppy &#8212; but in a satisfactorily controlled way. <BibRef id='DK2012' pages='p. 34'></BibRef>

> **Need for $\Omega$ and $\Theta$:** As noted in <BibRef id='KR2002' pages='p. 140'></BibRef>, Big-$O$ notation is used extensively to describe the growth of functions, but it has limitations. In particular, when $f(x)$ is $O(g(x))$, we have an upper bound, in terms of $g(x)$, for the size of $f(x)$ for large values of $x$. However, big-$O$ notation does not provide a lower bound for the size of $f(x)$ for large $x$. For this, we use **big-Omega** notation. When we want to give both an upper and a lower bound on the size of the function $f(x)$, relative to a reference function $g(x)$, we use **big-Theta notation**. Both big-Omega and big-Theta notation were introduced by Donald Knuth in the 1970s. His motivation for introducing these notations was the common misuse of big-$O$ notation when both an upper and a lower bound on the size of a function are needed.

The definitions that follow may be found in <BibRef id='KR2002' pages='p. 132, 140, 141'>The exposition in Rosen's book is also quite nice, especially in conjunction with all of the exercises. Highly recommend.</BibRef>.

#### Worst case (big-O) {#big-oh-worst-case}

Let $f$ and $g$ be functions from the set of integers or the set of real numbers to the set of real numbers. We say that $f(x)$ is $O(g(x))$ if there are constants $C$ and $k$ such that 

$$
|f(x)|\leq C|g(x)|
$$

whenever $x>k$. This reads as, "$f(x)$ is big-oh of $g(x)$," and is sometimes represented as $f(x)=O(g(x))$ even though usage of `=` is more colloquial than anything.

<details>
<summary> Example illustrating definition</summary>

**Problem:** Show that $f(x)=x^2+2x+1$ is $O(x^2)$.

**Solution:** We observe that we can readily estimate the size of $f(x)$ when $x>1$ because $x<x^2$ and $1<x^2$ when $x>1$. It follows that

$$
0\leq x^2+2x+1\leq x^2+2x+x^2=4x^2
$$

whenever $x>1$. Consequently, we can take $C=4$ and $k=1$ as witnesses to show that $f(x)$ is $O(x^2)$. That is, $f(x)=x^2+2x+1<4x^2$ whenever $x>1$.
(Note that it is not necessary to use absolute values here because all functions in the equalities are positive when $x$ is positive.)

Alternatively, we can estimate the size of $f(x)$ when $x>2$. When $x>2$, we have $2x\leq x^2$ and $1\leq x^2$. Consequently, if $x>2$, we have

$$
0\leq x^2+2x+1\leq x^2+x^2+x^2=3x^2
$$

It follows that $C=3$ and $k=2$ are also witnesses to the relation $f(x)$ is $O(x^2)$.

Observe that in the relationship $f(x)$ is $O(x^2)$, $x^2$ can be replaced by any function with larger values than $x^2$. For example, $f(x)$ is $O(x^3)$, $f(x)$ is $O(x^2+2x+7)$, and so on. 

It is also true that $x^2$ is $O(x^2+2x+1)$, because $x^2<x^2+2x+1$ whenever $x>1$. This means that $C=1$ and $k=1$ are witnesses to the relationship $x^2$ is $O(x^2+2x+1)$. See <BibRef id='KR2002' pages='p. 133'></BibRef> for more details.

</details>

:::caution Abuse of Notation

As noted in <BibRef id='DK2012' pages='p. 32'>Knuth actually credits this to de Bruijn</BibRef>, mathematicians customarily use the `=` sign as they use the word "is" in English: Aristotle is a man, but a man isn't necessarily Aristotle. Hence, in discussions of big oh, it is worth noting that the equality sign is not symmetric with respect to such notations; we have $n+1=O(n)$ and $n+2=O(n)$ but not $1=2$, nor can we say that $O(n)=n+2$.

:::

The definition above may be expressed more formally in the language of quantifiers as follows:

$$
(\exists C>0)(\exists k>0)(\forall x\in\R)(x > k \implies |f(x)|\leq C|g(x)|)
$$

:::info Witnesses

The constants $C$ and $k$ in the definition of big-$O$ notation above are called **witnesses** to the relationship "$f(x)$ is $O(g(x))$". 
To establish that $f(x)$ is $O(g(x))$ we need only one pair of witnesses to this relationship.
That is, to show that $f(x)$ is $O(g(x))$, we need find only *one* pair of constants $C$ and $k$, the witnesses, such that $|f(x)|\leq C|g(x)|$ whenever $x>k$.

Note that when there is one pair of witnesses to the relationship $f(x)$ is $O(g(x))$, there are *infinitely many* pairs of witnesses. To see this, note that if $C$ and $k$ are one pair of witnesses, then any pair $C'$ and $k'$, where $C < C'$ and $k < k'$, is also a pair of witnesses, since $|f(x)|\leq C|g(x)|\leq C'|g(x)|$ whenever $x>k'>k$.

A useful approach for finding a pair of witnesses is to first select a value of $k$ for which the size of $|f(x)|$ can be readily estimated when $x > k$ and to see whether we can use the estimate to find a value of $C$ for which $|f(x)| < C|g(x)|$ for $x>k$.

:::

#### Best case (big-Ω) {#big-oh-best-case}

Let $f$ and $g$ be functions from the set of integers or the set of real numbers to the set of real numbers. We say that $f(x)$ is $\Omega(g(x))$ if there are positive constants $C$ and $k$ such that

$$
|f(x)|\geq C|g(x)|
$$

whenever $x>k$. This reads as, "$f(x)$ is big-Omega of $g(x)$," and is sometimes represented as $f(x)=\Omega(g(x))$. This definition may be expressed more formally in the language of quantifiers as follows:

$$
(\exists C>0)(\exists k>0)(\forall x\in\R)(x > k \implies |f(x)|\geq C|g(x)|)
$$

#### Average case (big-Θ) {#big-oh-average-case}

Let $f$ and $g$ be functions from the set of integers or the set of real numbers to the set of real numbers. We say that $f(x)$ is $\Theta(g(x))$ if $f(x)$ is $O(g(x))$ and $f(x)$ is $\Omega(g(x))$. This reads as, "$f(x)$ is big-Theta of $g(x)$," and is sometimes represented as $f(x)=\Theta(g(x))$. We also say that $f(x)$ is of *order* $g(x)$. This definition, in light of the previous definitions for big-$O$ and big-$\Omega$, may be expressed more formally in the language of quantifiers as follows:

$$
(\exists C_1,C_2\in\R^+)(\exists k_1,k_2\in\R^+)(\forall x\in\R)(x > \max\{k_1,k_2\} \implies \underbrace{\overbrace{|f(x)|\leq C_1|g(x)|}^{f(x)=O(g(x))}\land \overbrace{|f(x)|\geq C_2|g(x)|}^{f(x)=\Omega(g(x))}}_{f(x)=\Theta(g(x))})
$$


## C



## D



## E



## F



## G



## H



## I



## J



## K



## L



## M

### Math

#### Logarithms

- $y=\log_a x$ means $a^y=x$
- $\log_a a^x = x$
- $a^{\log_a x}=x$
- $\log_a 1=0$
- $\log_a a=1$
- $\log x=\log_{10}x$
- $\ln x=\log_e x$
- $\log_a xy=\log_a x+\log_a y$
- $\log_a\Bigl(\dfrac{x}{y}\Bigr)=\log_a x-\log_a y$
- $\log_a x^b = b\log_a x$
- $\log_b x=\dfrac{\log_a x}{\log_a b}$

#### Modular arithmetic



#### Sequences and series

##### Arithmetic

###### Arithmetic sequence

An *arithmetic sequence* is a sequence of the form

$$
a, a+d, a+2d, a+3d, a+4d,\ldots
$$

The number $a$ is the first term, and $d$ is the common difference of the sequence. The $n$th term of an arithmetic sequence is given by

$$
a_n = a + (n-1)d
$$

###### Partial sums of an arithmetic sequence

For the arithmetic sequence $a_n = a + (n-1)d$, the $n$th partial sum

$$
S_n=a+(a+d)+(a+2d)+(a+3d)+\cdots+[a+(n-1)d]
$$

is given by either of the following formulas:

1. $S_n = \frac{n}{2}[2a+(n-1)d]$
2. $S_n = n[(a+a_n)/2]$

##### Geometric

###### Geometric sequence

A geometric sequence is a sequence of the form 

$$
a, ar, ar^2, ar^3, ar^4, \ldots
$$

The number $a$ is the first term, and $r$ is the common ratio of the sequence. The $n$th term of a geometric sequence is given by

$$
a_n=ar^{n-1}
$$

###### Partial sums of a geometric sequence

For the geometric sequence $a_n=ar^{n-1}$, the $n$th partial sum

$$
S_n=a+ar+ar^2+ar^3+ar^4+\cdots+ar^{n-1}\qquad(r\neq 1)
$$

is given by

$$
S_n=a\frac{1-r^n}{1-r}
$$

###### Sum of an infinite geometric series 

If $|r|<1$, then the infinite geometric series

$$
a+ar+ar^2+ar^3+ar^4+\cdots+ar^{n-1}+\cdots
$$

has the sum

$$
S=\frac{a}{1-r}
$$

#### Sums

##### Powers of integers

- $\displaystyle\sum_{k=1}^n 1=n$

- $\displaystyle\sum_{k=1}^n k=\frac{n(n+1)}{2}$

- $\displaystyle\sum_{k=1}^n k^2=\frac{n(n+1)(2n+1)}{6}$

- $\displaystyle\sum_{k=1}^n k^3=\frac{n^2(n+1)^2}{4}$

## N



## O



## P


### Path (graph theory)

> A **path** is a trail in which all vertices (and therefore also all edges) are distinct.

## Q



## R



## S



## T

### Time-sharing (computing)

> [Time-sharing](https://en.wikipedia.org/wiki/Time-sharing) is the ability for multiple users to share access to a single computer’s resources.

An [Ars Technica](https://arstechnica.com/gadgets/2019/08/unix-at-50-it-starts-with-a-mainframe-a-gator-and-three-dedicated-researchers/) article on the history of Linux also mentions time-sharing: "Thus [due to costs associated with operating and owning the GE 645], there was widespread interest in time sharing, which allowed multiple researchers to run programs on the mainframe at the same time, getting results immediately on their remote terminals. With time sharing, the programs weren’t printed off on punch cards, they were written and stored on the mainframe. In theory, researchers could write, edit, and run their programs on the fly and without leaving their offices. Multics was conceived with that goal in mind. It kicked off in 1964 and had an initial delivery deadline of 1967."



### Trail (graph theory)

> A **trail** is a walk in which all edges are distinct.


## U



## V



## W

### Walk (graph theory)

> A **walk** is a finite or infinite sequence of edges which joins a sequence of vertices.

Let $G=(V,E,\phi)$ be a graph. A finite walk is a sequence of edges $(e_1,e_2,\ldots,e_{n-1})$ for which there is a sequence of vertices $(v_1,v_2,\ldots,v_{n-1}, v_n)$ such that $\phi(e_i)=\{v_i,v_{i+1}\}$ for $i=1,2,\ldots,n-1$. $(v_1,v_2,\ldots,v_n)$ is the *vertex sequence* of the walk. The walk is *closed* if $v_1=v_n$ and it is *open* otherwise. An infinite walk is a sequence of edges of the same type described here, but with no first or last vertex, and a semi-infinite walk (or ray) has a first vertex but no last vertex.


## X



## Y



## Z



