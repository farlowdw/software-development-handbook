We use $\Theta$-notation for asymptotically tight bounds. For a given function $g(n)$, we denote by $\Theta(g(n))$ the set of functions 

$$
\begin{align*}
\Theta(g(n)) = \{f(n) : {}& \text{there exist positive constants $c_1$, $c_2$, and $n_0$ such that}\\ 
  & \text{$0\leq c_1g(n)\leq f(n)\leq c_2g(n)$ for all $n\geq n_0$} \}
\end{align*}
$$

The following figure provides some intuition behind $\Theta$-notation:

<div align='center' className='centeredImageDiv'>
  <img width='350px' src={require('@site/static/img/dtr/f3.png').default} />
</div>

For all values of $n$ at and to the right of $n_0$, the values of $f(n)$ lies at or above $c_1g(n)$ and at or below $c_2g(n)$. In other words, for all $n\geq n_0$, the function $f(n)$ is equal to $g(n)$ to within constant factors.
