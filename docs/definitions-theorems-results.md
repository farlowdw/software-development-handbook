---
title: Definitions
hide_title: false
sidebar_label: Definitions, theorems, and results
description: Comprehensive list of definitions.
draft: false
tags: 
  - Definitions
  - Theorems
  - Results
keywords: 
  - definitions
  - theorems
  - results
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import BibRef from '@site/src/components/BibRef';

{/* DEFINITIONS */}
import AlgorithmDef from '@site/docs/_Partials/definitions-theorems-results/def-algorithm.md';
import APIWrapperDef from '@site/docs/_Partials/definitions-theorems-results/def-api-wrapper.md';
import BigODef from '@site/docs/_Partials/definitions-theorems-results/def-big-oh.md';
import BigOmegaDef from '@site/docs/_Partials/definitions-theorems-results/def-big-omega.md';
import BigThetaDef from '@site/docs/_Partials/definitions-theorems-results/def-big-theta.md';
import TimeSharing from '@site/docs/_Partials/definitions-theorems-results/def-time-sharing.md';

{/* math */}
import ArithmeticSequence from '@site/docs/_Partials/definitions-theorems-results/def-arithmetic-sequence.md';
import GeometricSequence from '@site/docs/_Partials/definitions-theorems-results/def-geometric-sequence.md';

{/* graph theory */}
import PathGraphTheory from '@site/docs/_Partials/definitions-theorems-results/def-path-graph-theory.md';
import TrailGraphTheory from '@site/docs/_Partials/definitions-theorems-results/def-trail-graph-theory.md';
import WalkGraphTheory from '@site/docs/_Partials/definitions-theorems-results/def-walk-graph-theory.md';

{/* RESULTS */}
import ArithmeticSequencePartialSum from '@site/docs/_Partials/definitions-theorems-results/res-arithmetic-sequence-partial-sum.md';
import GeometricSequencePartialSum from '@site/docs/_Partials/definitions-theorems-results/res-geometric-sequence-partial-sum.md';
import GeometricSeriesSum from '@site/docs/_Partials/definitions-theorems-results/res-geometric-series-sum.md';
import LogarithmResults from '@site/docs/_Partials/definitions-theorems-results/res-logarithms.md';
import SummationResultsIntegerPowers from '@site/docs/_Partials/definitions-theorems-results/res-summations-power-of-integers.md';

## A

### Algorithm {#def-algorithm}

> <AlgorithmDef />

:::tip Understanding and Utilizing Algorithms Effectively

The distinction between a *problem* and an *instance of a problem* is critical. Determining that you are dealing with a general problem instead of an instance is your first step towards solving it. There are three desirable properties for a good algorithm. We seek algorithms that are *correct*, *efficient*, and *easy to implement*. Correctness may be formally verified by means of a proof (e.g., induction, contradiction, etc.) while efficiency is typically analyzed and established by means of Big-$O$ notation.

:::

### API wrapper {#def-api-wrapper}

> <APIWrapperDef />

### Arithmetic sequence (math) {#def-arithmetic-sequence}

<ArithmeticSequence />

### Arithmetic sequence partial sum {#res-arithmetic-sequence-partial-sum}

<ArithmeticSequencePartialSum />

## B

### Big Oh {#def-big-oh}

:::info Controlled chaos, abuse of notation, and the need for Ω and Θ

**Controlled chaos:** $O$ notation significantly simplifies calculations because it allows us to be sloppy &#8212; but in a satisfactorily controlled way. <BibRef id='DK2012' pages='p. 34'></BibRef>

**Abuse of notation:** Donald Knuth notes in <BibRef id='DK2012' pages='p. 32'> Knuth actually credits this to de Bruijn</BibRef> that mathematicians customarily use the `=` sign as they use the word "is" in English: Aristotle is a man, but a man isn't necessarily Aristotle. Hence, in discussions of big oh, it is worth noting that the equality sign is not symmetric with respect to such notations; we have $n+1=O(n)$ and $n+2=O(n)$ but not $1=2$, nor can we say that $O(n)=n+2$.

**Need for $\Omega$ and $\Theta$:** As noted in <BibRef id='KR2002' pages='p. 140'></BibRef>, Big-$O$ notation is used extensively to describe the growth of functions, but it has limitations. In particular, when $f(x)$ is $O(g(x))$, we have an upper bound, in terms of $g(x)$, for the size of $f(x)$ for large values of $x$. However, big-$O$ notation does not provide a lower bound for the size of $f(x)$ for large $x$. For this, we use **big-Omega** notation. When we want to give both an upper and a lower bound on the size of the function $f(x)$, relative to a reference function $g(x)$, we use **big-Theta notation**. Both big-Omega and big-Theta notation were introduced by Donald Knuth in the 1970s. His motivation for introducing these notations was the common misuse of big-$O$ notation when both an upper and a lower bound on the size of a function are needed.

:::

:::caution Functions assumed to be asymptotically nonnegative when working with O-Ω-Θ notation

The definition of $O(g(n))$ below requires that every function $f(n)$ in the set $O(g(n))$ be asymptotically nonnegative: $f(n)$ must be nonnegative whenever $n$ is sufficiently large. (An asymptotically positive function is one that is positive for all sufficiently large $n$.) Consequently, the function $g(n)$ itself must be asymptotically nonnegative, or else the set $O(g(n))$ is empty. We therefore assume that every function used within $O$-notation is asymptotically nonnegative. This assumption holds for the other asymptotic notations defined as well. <BibRef id='TC2022' pages='p. 54'></BibRef>

The explanation above clarifies why other textbook authors (e.g., see <BibRef id='KR2002' pages='p. 132'></BibRef>) sometimes write $|g(n)|$ instead of just $g(n)$.

:::

The definitions that follow may be found in <BibRef id='TC2022' pages='pp. 53-56'></BibRef>.

#### Worst case (big-O) {#def-big-oh}

> <BigODef />

:::tip Big-O definition in terms of quantifiers

The definition above may be expressed more formally in the language of quantifiers as follows:

$$
(\exists c, n_0\in\R^+)(\forall n\in\R)(n > n_0 \implies f(n)\leq cg(n))
$$

:::

#### Best case (big-Ω) {#def-big-omega}

> <BigOmegaDef />

:::tip Big-Ω definition in terms of quantifiers

This definition may be expressed more formally in the language of quantifiers as follows:

$$
(\exists c, n_0\in\R^+)(\forall n\in\R)(n > n_0 \implies f(n)\geq cg(n))
$$

:::

#### Average case (big-Θ) {#def-big-theta}

> <BigThetaDef />

:::tip Big-Θ definition in terms of quantifiers

This definition, in light of the previous definitions for big-$O$ and big-$\Omega$, may be expressed more formally in the language of quantifiers as

$$
(\exists c_1,c_2\in\R^+)(\exists n_1,n_2\in\R^+)(\forall n\in\R)(n > \max\{n_1,n_2\} \implies \underbrace{\overbrace{f(n)\leq c_1g(n)}^{f(n)=O(g(n))}\land \overbrace{f(n)\geq c_2g(n)}^{f(n)=\Omega(g(n))}}_{f(n)=\Theta(g(n))})
$$

where the notation above is meant to reflect the fact that $f(n)$ is $\Theta(g(n))$ when $f(n)$ is $O(g(n))$ *and* $f(n)$ is $\Omega(g(n))$. With this in mind, we can let $n_0 = \max\{n_1,n_2\}$ and reframe the quantified definition more succinctly:

$$
(\exists c_1,c_2,n_0\in\R^+)(\forall n\in\R)(n > n_0 \implies \underbrace{\overbrace{f(n)\leq c_1g(n)}^{f(n)=O(g(n))}\land \overbrace{f(n)\geq c_2g(n)}^{f(n)=\Omega(g(n))}}_{f(n)=\Theta(g(n))})
$$

:::



## C



## D



## E



## F



## G

### Geometric sequence (math) {#def-geometric-sequence}

<GeometricSequence />

### Geometric sequence partial sum {#res-geometric-sequence-partial-sum}

<GeometricSequencePartialSum />

### Geometric series sum {#res-geometric-series-sum}

<GeometricSeriesSum />

## H



## I



## J



## K



## L

### Logarithm results

<LogarithmResults />

## M



## N



## O



## P


### Path (graph theory)

> <PathGraphTheory />

## Q



## R



## S

### Summation results

#### Powers of integers {#res-sums-of-integer-powers}

<SummationResultsIntegerPowers />

## T

### Time-sharing (computing)

> <TimeSharing />

:::info Historical Relevance

An [Ars Technica](https://arstechnica.com/gadgets/2019/08/unix-at-50-it-starts-with-a-mainframe-a-gator-and-three-dedicated-researchers/) article on the history of Linux also mentions time-sharing: "Thus [due to costs associated with operating and owning the GE 645], there was widespread interest in time sharing, which allowed multiple researchers to run programs on the mainframe at the same time, getting results immediately on their remote terminals. With time sharing, the programs weren’t printed off on punch cards, they were written and stored on the mainframe. In theory, researchers could write, edit, and run their programs on the fly and without leaving their offices. Multics was conceived with that goal in mind. It kicked off in 1964 and had an initial delivery deadline of 1967."

:::

### Trail (graph theory)

> <TrailGraphTheory />


## U



## V



## W

### Walk (graph theory)

> <WalkGraphTheory />

## X



## Y



## Z



