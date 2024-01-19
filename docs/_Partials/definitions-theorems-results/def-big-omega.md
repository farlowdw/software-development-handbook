Just as $O$-notation provides an asymptotic upper bound on a function, $\Omega$-notation provides an asymptotic lower bound. For a given function $g(n)$, we denote by $\Omega(g(n))$ the set of functions

$$
\begin{align*}
\Omega(g(n)) = \{f(n) : {}& \text{there exist positive constants $c$ and $n_0$ such that}\\ 
  & \text{$0\leq cg(n)\leq f(n)$ for all $n\geq n_0$} \}
\end{align*}
$$

The following figure provides some intuition behind $\Omega$-notation:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/dtr/f2.png').default} />
</div>

For all values $n$ at or to the right of $n_0$, the value of $f(n)$ is on or above $cg(n)$.