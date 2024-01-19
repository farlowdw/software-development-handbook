An asymptotic upper bound may be described with $O$-notation. Specifically, we use $O$-notation to give an upper bound on a function to within a constant factor.

For a given function $g(n)$, we denote by $O(g(n))$ the *set of functions*

$$
\begin{align*}
O(g(n)) = \{f(n) : {}& \text{there exist positive constants $c$ and $n_0$ such that}\\ 
  & \text{$0\leq f(n)\leq cg(n)$ for all $n\geq n_0$} \}
\end{align*}
$$

A function $f(n)$ belongs to the set $O(g(n))$ if there exists a positive constant $c$ such that $f(n)\leq cg(n)$ for sufficiently large $n$. The following figure provides some intuition behind $O$-notation:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/dtr/f1.png').default} />
</div>

For all values $n$ at and to the right of $n_0$, the value of the function $f(n)$ is on or below $cg(n)$.

