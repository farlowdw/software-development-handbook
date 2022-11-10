---
title: Common Table Expressions (CTEs)
hide_title: false
sidebar_label: Common table expressions (CTEs)
description: Article on common table expressions
draft: false
tags: [SQL, CTEs]
keywords: [common table expressions]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';

## Non-recursive CTEs

### What

**First the "what":** What is a common table expression (CTE)? A matter-of-fact answer is given in <BibRef id='AB2020' pages='p. 181'></BibRef>:

> A CTE is a named subquery that appears at the top of a query in a `WITH` clause, which can contain multiple CTEs separated by commas. Along with making queries more understandable, this feature also allows each CTE to refer to any other CTE defined above it in the same `WITH` clause.

### Why

**Then the "why":** Most Leetcode queries require you to go beyond what is possible using the tables as they are made available in the provided SQL Schema, especially in relation to aggregate and window functions. Some queries require the use of a derived table, namely a subquery or a CTE.

As noted in <BibRef id='AM2020' pages='pp. 535-537'></BibRef>:

> Arguably the simplest way to create a virtual table that allows you to run queries on window functions or aggregate functions is a subquery. All that's required here is to write the query that you need within parentheses and then to write a second query that uses it.

Why, then, would we want to use something other than a subquery for such purposes?

### How

**Now the "how":** Consider the following Leetcode problem: <LC id='1098' type='long' ></LC> . Here is a solution that uses a subquery:

```sql title="Subquery-based approach (unnamed)"
-- answer to LC 1098 that uses a subquery
SELECT
  B.book_id,
  B.name
FROM
  Books B
WHERE
  B.available_from < DATE_SUB('2019-06-23', INTERVAL 1 MONTH)
  AND NOT EXISTS (
    SELECT
      1
    FROM
      Orders O
    WHERE
      O.book_id = B.book_id
      AND O.dispatch_date
        BETWEEN DATE_SUB('2019-06-23', INTERVAL 1 YEAR) AND '2019-06-23'
    GROUP BY
      O.book_id
    HAVING
      SUM(O.quantity) >= 10
  );
```

And now a solution that uses CTEs:

```sql title="Subquery-based approach (named, CTE)"
-- answer to LC 1098 that uses CTEs
WITH eligible_books AS (
  SELECT
    *
  FROM
    Books B
  WHERE B.available_from < DATE_SUB('2019-06-23', INTERVAL 1 MONTH)
), eligible_orders AS (
  SELECT
    *
  FROM
    Orders O
  WHERE O.dispatch_date > DATE_SUB('2019-06-23', INTERVAL 1 YEAR)
)
SELECT
  EB.book_id, EB.name
FROM
  eligible_books EB
  LEFT JOIN eligible_orders EO ON EB.book_id = EO.book_id
GROUP BY
  EB.book_id, EB.name
HAVING
  SUM(EO.quantity) IS NULL OR SUM(EO.quantity) < 10;
```

Which answer is clearer? Probably the answer using CTEs. Why? Probably because CTEs give you the chance to use *named* subqueries in a way that makes your code not only easier to read but also easier to structure.

Indeed, as noted in <BibRef id='AM2020' pages='pp. 535-537'></BibRef>, CTEs were intended to overcome some of the limits of subqueries, especially as it relates to enabling the use of recursion within SQL (something that will be addressed momentarily). Consider the following made up query:

```sql
WITH head_count_tab (job, HeadCount) AS (
  SELECT
    job,
    COUNT(empno)
  FROM
    emp
  GROUP BY
    job
)
SELECT
  MAX(HeadCount) AS HighestJobHeadCount
FROM
  head_count_tab;
```

Although this query solves a simple problem, it illustrates the essential features of a CTE. We introduce the derived table using the `WITH` clause, specifying the column headings in the parentheses (optional in general), and use parentheses around the derived table's query itself. If we want to add more derived tables, we can add more as long as we separate each one with a comma and provide its name before its query (the reverse of how aliasing usually works in SQL).

Because the inner queries are presented before the outer query, in many circumstances they may also be considered more readable; they make it easier to study each logical element of the query separately in order to understand the logical flow. Of course, as with all things in coding, this will vary according to circumstances, and sometimes the subquery will be more readable.

In some cases, it may even make sense to mix subqueries and CTEs; for example, consider the following answer to <LC id='2084' type='long' ></LC>:

```sql
WITH Type0Orders AS (
  SELECT * FROM Orders O1 WHERE O1.order_type = 0
), ValidType1Orders AS (
  SELECT * FROM Orders O2 WHERE O2.customer_id NOT IN (SELECT customer_id FROM Type0Orders) AND O2.order_type = 1
)
SELECT * FROM Type0Orders
UNION ALL
SELECT * FROM ValidType1Orders;
```

This should give some sense of the versatility that CTEs have to offer. Ultimately, as noted in <BibRef id='AM2020' pages='pp. 535-537'></BibRef>:

> There's not a lot of difference between a subquery and CTE in terms of usability. Both allow for nesting or writing more complicated queries that refer to other derived tables. However, once you start nesting many subqueries, readability is lessened because the meaning of different variables is hidden in successive query layers. In contrast, because a CTE arranges each element vertically, it is easier to understand the meaning of each element.

To bring closure to the point made in the last sentence above, consider the following two problems and their answers that utilize CTEs and what those answers might look like had they simply used subqueries:

## Recursive CTEs

The discussion above clearly outlines how CTEs can be powerful agents of clarity and structure, but the discussion fails to highlight the key reason why CTEs were introduced into SQL in the first place: recursion. Enabling recursion within SQL is the primary reason for the existence of CTEs. So how do recursive CTEs work and why/when would we want to use them? To answer this question effectively, it may help to first look at some documentation (we will use Postgres' documentation since it is fairly easy to understand), then some examples, and then finally some Leetcode problems where this construct proves to be quite valuable ([the PostgreSQL Exercises site](https://pgexercises.com/questions/recursive/) also has helpful material on recursive queries).

### Documentation

Reading what the official documentation has to say about [`WITH` queries](https://www.postgresql.org/docs/current/queries-with.html) is a good investment of time, especially the portion about *recursive query evaluation* (as Postgres points out, the `WITH RECURSIVE` process is *iteration* not recursion, but `RECURSIVE` is the terminology chosen by the SQL standards committee):

> The general form of a recursive `WITH` query is always a *non-recursive term*, then `UNION` (or `UNION ALL`), then a *recursive term*, where only the recursive term can contain a reference to the query's own output. Such a query is executed as follows:
>
> 1. Evaluate the non-recursive term. For `UNION` (but not `UNION ALL`), discard duplicate rows. Include all remaining rows in the result of the recursive query, and also place them in a temporary *working table*.
> 2. So long as the working table is not empty, repeat these steps:
>  - Evaluate the recursive term, substituting the current contents of the working table for the recursive self-reference. For UNION (but not UNION ALL), discard duplicate rows and rows that duplicate any previous result row. Include all remaining rows in the result of the recursive query, and also place them in a temporary intermediate table.
>  - Replace the contents of the working table with the contents of the intermediate table, then empty the intermediate table.

In [more simple syntactical terms](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-recursive-query/), here's what the process outlined above looks like:

```sql title"Recursive CTE Syntax"
WITH RECURSIVE cte_name AS(
  CTE_auxiliary_query_1   -- non-recursive term
  UNION [ALL]
  CTE_auxiliary_query_2   -- recursive term
) CTE_primary_query;
```

<details><summary> Detailed verbal description of each component above</summary>

- `WITH RECURSIVE cte_name AS (...)`: The `RECURSIVE` keyword in `WITH RECURSIVE` tells our database that the CTE we are building is not like the normal CTE(s) that can be built using only the `WITH` keyword &#8212; our CTE will be built in an *iterative* fashion instead. `cte_name` is the label or name we are assigning to the CTE built in the iterative process (this name is typically *used* or referred to in `CTE_auxiliary_query_2` and `CTE_primary_query`). The `AS` keyword simply denotes how `cte_name` is to be built throughout the iterative process (i.e., the `...` part inside the parentheses).
- `CTE_auxiliary_query_1`: Evaluate the non-recursive term. When `UNION` is used, duplicate rows will be discarded; when `UNION ALL` is used, duplicate rows will be kept. Include all remaining rows in the result of the recursive query (i.e., `cte_name` being the result of the recursive query), and *also* place them in a temporary *working table*. This working table is what will be used or referred to in `CTE_auxiliary_query_2` (i.e., the so-called "recursive term") to really kick off the iterative process.
- `CTE_auxiliary_query_2`: Evaluate the recursive term, substituting the current contents of the working table for the recursive self-reference; that is, the recursive self-reference will always be `cte_name`, but the working table depends on where we are in the iterative process. 
  + **Beginning:** At the beginning of the iterative process, the result set of `CTE_auxiliary_query_1`, if any, constitutes the working table and we can refer to this working table as `cte_name` in `CTE_auxiliary_query_2`. Note that the *final result* of the recursive query, which we ultimately refer to as `cte_name` in `CTE_primary_query` once the iterative process has finished, is *different* from the `cte_name` referred to in `CTE_auxiliary_query_2` during each iteration. (This will become clearer momentarily by means of some examples.)
  + **Not beginning:** For every iteration, except at the beginning, the `cte_name` referred to in `CTE_auxiliary_query_2` refers to the output of the *prior* `CTE_auxiliary_query_2` query; that is, for every iteration except the first, the temporary working table is the query output of `CTE_auxiliary_query_2` for the previous iteration. Once the recursive term `CTE_auxiliary_query_2` finishes executing, the following rough sequence of operations takes place:
    * If the recursive term `CTE_auxiliary_query_2` has an empty query output, then the query terminates and control is passed to `CTE_primary_query`.
    * If the recursive term `CTE_auxiliary_query_2` has a non-empty query output, then the following sequence of operations takes place:
      1. The result set from `CTE_auxiliary_query_2` is appended to the *total* result set for the `WITH RECURSIVE` query (i.e., the `cte_name` we refer to in `CTE_primary_query` once the iterative process has finished). Duplicate rows will be kept when using `UNION ALL` but discarded when using only `UNION`.
      2. The result set from `CTE_auxiliary_query_2` is placed in a temporary *intermediate table*.
      3. The contents of the working table just used by `CTE_auxiliary_query_2` are replaced by the contents of the intermediate table referred to above. The intermediate table is then emptied so we can repeat this whole process again (i.e., the "**Not beginning"** process).
- `CTE_primary_query`: This is where `WITH RECURSIVE` really pays off, of course. The table we built in an iterative fashion, `cte_name`, is now available in its entirety for us to query from however we like. This could be a simple `SELECT * FROM cte_name` or it could be a much more complicated query involving joins and/or whatever else we might want to throw in there.

</details>

### Examples

Let's now consider some examples (executed using MySQL) to make clear all of the abstract details outlined above:

#### Generating integers 1 through 10 (with in-depth explanation)

Try executing the following query:

```sql
WITH RECURSIVE nums_consecutive AS (
  SELECT 1 AS num
  UNION ALL
  SELECT num + 1 FROM nums_consecutive WHERE num < 10
) SELECT * FROM nums_consecutive;
```

This query yields the following result set:

```
+------+
| num  |
+------+
|    1 |
|    2 |
|    3 |
|    4 |
|    5 |
|    6 |
|    7 |
|    8 |
|    9 |
|   10 |
+------+
```

How does this query work exactly? Here's a detailed breakdown using the previously discussed abstract process, encapsulated in the syntax

```sql
WITH RECURSIVE cte_name AS(
  CTE_auxiliary_query_1   -- non-recursive term
  UNION [ALL]
  CTE_auxiliary_query_2   -- recursive term
) CTE_primary_query;
```

but this time we will have actual data to work with instead of just vague concepts:

- `WITH RECURSIVE cte_name AS (...)`: We specify via `WITH RECURSIVE` that we will not just be building a CTE but one that we will build iteratively. Note that we refer to `nums_consecutive` in `CTE_auxiliary_query_2` (i.e., the recursive term):

  ```sql
  SELECT num + 1 FROM nums_consecutive WHERE num < 10
  ```

  And we also refer to `nums_consecutive` in `CTE_primary_query` once the iterative process has finished and the final CTE has been built:

  ```sql
  SELECT * FROM nums_consecutive;
  ```

- `CTE_auxiliary_query_1`: This is the non-recursive term and its result set gives us our first working table:

  ```sql
  SELECT 1 AS num
  ```

  gives us

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  +-----+
  ```

  as our first working table.

- `CTE_auxiliary_query_2`: Since the query output from the non-recursive term was non-empty, the iterative process begins and the working table seen above can now be referred to as `nums_consecutive` in `CTE_auxiliary_query_2`:

  ```sql
  SELECT num + 1 FROM nums_consecutive WHERE num < 10
  ```

  Since `nums_consecutive` above really refers to the working table

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  +-----+
  ```

  it's not hard to see why the result set of `CTE_auxiliary_query_2` (i.e., `SELECT num + 1 FROM nums_consecutive WHERE num < 10`) for this iteration is simply

  ```
  +-----+
  | num |
  +-----+
  |   2 |
  +-----+
  ```

  Pay special attention to the fact that the result set here is *not*

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  |   2 |
  +-----+
  ```

  but simply

  ```
  +-----+
  | num |
  +-----+
  |   2 |
  +-----+
  ```

  That is, the total result set being iteratively built right now may be 

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  |   2 |
  +-----+
  ```

  but *this is not the current working table*. The current working table is

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  +-----+
  ```

  and the temporary intermediate table is

  ```
  +-----+
  | num |
  +-----+
  |   2 |
  +-----+
  ```

  By means of `UNION ALL`, the total result set being iteratively built is 

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  |   2 |
  +-----+
  ```

  but we have a way to go before the iterative process terminates. As indicated in the descriptions directly before this example began, we now replace the contents of the working table

  ```
  +-----+
  | num |
  +-----+
  |   1 |
  +-----+
  ```

  with the contents of the intermediate table 

  ```
  +-----+
  | num |
  +-----+
  |   2 |
  +-----+
  ```

  and then we empty the intermediate table so it can be

  ```
  +-----+
  | num |
  +-----+
  |     |
  +-----+
  ```

  for the pending iteration. For the next iteration, with 

  ```
  +-----+
  | num |
  +-----+
  |   2 |
  +-----+
  ```

  as the working table, we see that our `CTE_auxiliary_query_2`, `SELECT num + 1 FROM nums_consecutive WHERE num < 10`, will give us

  ```
  +-----+
  | num |
  +-----+
  |   3 |
  +-----+
  ```

  as the *new* temporary intermediate table, which will then replace the working table

  ```
  +-----+
  | num |
  +-----+
  |   2 |
  +-----+
  ```

  and so on and so forth. This process will continue for some time until our working table is

  ```
  +-----+
  | num |
  +-----+
  |   9 |
  +-----+
  ```

  at which point our `CTE_auxiliary_query_2`, `SELECT num + 1 FROM nums_consecutive WHERE num < 10`, will give us

  ```
  +-----+
  | num |
  +-----+
  |  10 |
  +-----+
  ```

  as the new temporary intermediate table. This table replaces

  ```
  +-----+
  | num |
  +-----+
  |   9 |
  +-----+
  ```

  as the working table and when our recursive term is executed again, that is, when `SELECT num + 1 FROM nums_consecutive WHERE num < 10` runs against the working table 

  ```
  +-----+
  | num |
  +-----+
  |  10 |
  +-----+
  ```

  we actually come up empty since the `WHERE num < 10` condition is not satisfied. Now both the working table *and* temporary intermediate table are empty and there's nothing left for the recursive term to run a query against; hence, the query terminates and control is passed to `CTE_primary_query` (i.e., `SELECT * FROM nums_consecutive;` in this example).

- `CTE_primary_query`: The table we built in an iterative fashion, `nums_consecutive`, is now available in its entirety for us to run queries against as we please. Since we want everything from this small table in this example, we simply execute `SELECT * FROM nums_consecutive;` and this gives us the result set of having all the working tables `UNION`ed `ALL` together:

  ```
  +------+
  | num  |
  +------+
  |    1 |
  |    2 |
  |    3 |
  |    4 |
  |    5 |
  |    6 |
  |    7 |
  |    8 |
  |    9 |
  |   10 |
  +------+
  ```

  For this example, note how the working table has just a single row in each step, and it takes on the values from `1` through `10` in successive steps. In the 10th step, there is no output because of the `WHERE` clause, and so the query terminates.

#### Generating sequential numbers fitting a certain pattern

Consider the query

```sql
WITH RECURSIVE seq_nums AS (
  SELECT
    5 AS num,
    0 AS iteration
  UNION ALL
  SELECT
    (2 * num + num),
    iteration + 1
  FROM
    seq_nums
  WHERE
    iteration < 5
) SELECT * FROM seq_nums;
```

with

```
+------+-----------+
| num  | iteration |
+------+-----------+
|    5 |         0 |
|   15 |         1 |
|   45 |         2 |
|  135 |         3 |
|  405 |         4 |
| 1215 |         5 |
+------+-----------+
```

as its result set. Note how, just as in the previous example, the working table has just a single row in each step, and it takes on the values `5`, `15`, `45`, `135`, and `405` in successive steps. Each `iteration` value simply denotes which application of `CTE_auxiliary_query_2` has been used to generate the next row (the first row indicates the initial application of the non-recursive term `CTE_auxiliary_query_1` as well as the first application of `CTE_auxiliary_query_2` to generate the next row; the final row indicates the 5th application of `CTE_auxiliary_query_2` which has an empty query output, thus terminating the query).

#### Finding the sum of the first 100 consecutive positive integers

A classic question from the school days: Find the sum of the first 100 consecutive positive integers. But this time use SQL implementing a `WITH RECURSIVE` solution! We can use the work we did in the first example to generate numbers 1 through 100, inclusive, and then our `CTE_primary_query` can involve an aggregate function instead of just selecting everything from the CTE we just generated:

```sql
WITH RECURSIVE nums_consecutive AS (
  SELECT 1 AS num
  UNION ALL
  SELECT num + 1 FROM nums_consecutive WHERE num < 100
) SELECT SUM(num) AS total_sum FROM nums_consecutive;
```

Result set:

```
+-----------+
| total_sum |
+-----------+
|      5050 |
+-----------+
```

#### Generating the first 15 Fibonacci numbers

The following is a somewhat more complicated usage of `WITH RECURSIVE`:

```sql
WITH RECURSIVE fib_table (FibBuilder, FibNum, FibIndex) AS (
  SELECT 1, 0, 0
  UNION ALL
  SELECT FibNum, FibNum + FibBuilder, FibIndex + 1 FROM fib_table WHERE FibIndex < 15
)
SELECT FibBuilder, FibNum, FibIndex FROM fib_table;
```

The result set:

```
+------------+--------+----------+
| FibBuilder | FibNum | FibIndex |
+------------+--------+----------+
|          1 |      0 |        0 |
|          0 |      1 |        1 |
|          1 |      1 |        2 |
|          1 |      2 |        3 |
|          2 |      3 |        4 |
|          3 |      5 |        5 |
|          5 |      8 |        6 |
|          8 |     13 |        7 |
|         13 |     21 |        8 |
|         21 |     34 |        9 |
|         34 |     55 |       10 |
|         55 |     89 |       11 |
|         89 |    144 |       12 |
|        144 |    233 |       13 |
|        233 |    377 |       14 |
|        377 |    610 |       15 |
+------------+--------+----------+
```

### LeetCode problems

The following LeetCode problems provide instances where the `WITH RECURSIVE` construct can be utilized. This list is *not* exhaustive. Right click a widget title to visit the actual problem and try your hand or simply click the widget title to see a possible solution.

<details><summary> <LC id='571' type='long' ></LC> </summary>

```sql
WITH RECURSIVE nums_full_list AS (
  SELECT 
    N.Number, 1 AS num_count, N.Frequency 
  FROM 
    Numbers N
  UNION ALL
  SELECT 
    NFL.Number, NFL.num_count + 1, NFL.Frequency 
  FROM 
    nums_full_list NFL 
  WHERE NFL.num_count < NFL.Frequency
), ordered_nums AS (
  SELECT
    ROW_NUMBER() OVER (ORDER BY NFL.Number) AS num_order,
    NFL.Number
  FROM 
    nums_full_list NFL
), eligible_medians AS (
  SELECT
    O.Number
  FROM
    ordered_nums O
  WHERE
    O.num_order BETWEEN 
      (SELECT FLOOR(AVG(num_order)) FROM ordered_nums) 
      AND (SELECT CEIL(AVG(num_order)) FROM ordered_nums)
)
SELECT
  AVG(E.Number) AS median
FROM
  eligible_medians E;
```

</details>

<details><summary> <LC id='579' type='long' ></LC> </summary>

```sql
WITH RECURSIVE months_range AS (
  SELECT 1 AS month_num
  UNION ALL
  SELECT month_num + 1 FROM months_range WHERE month_num < 12
), emps_and_months AS (
  SELECT
    *
  FROM
    (SELECT DISTINCT Id FROM Employee) X, months_range
), cum_sal_info AS (
  SELECT
    EM.Id,
    EM.month_num AS Month,
    E.Salary,
    SUM(E.Salary) OVER (
      PARTITION BY EM.Id
      ORDER BY
        EM.month_num ROWS BETWEEN 2 PRECEDING
        AND 0 FOLLOWING
    ) AS cum_sal
  FROM
    emps_and_months EM
    LEFT JOIN Employee E
      ON EM.Id = E.Id AND EM.month_num = E.Month
)
SELECT
  C.Id,
  C.Month,
  C.cum_sal AS Salary
FROM
  cum_sal_info C
  INNER JOIN Employee E1
  ON E1.Id = C.Id
    AND E1.Month = C.Month
    AND C.Month < (
      SELECT
        MAX(E2.Month)
      FROM
        Employee E2
      WHERE
        E2.Id = E1.Id
    )
ORDER BY
  C.Id,
  C.Month DESC;
```

</details>

<details><summary> <LC id='1270' type='long' ></LC> </summary>

```sql
WITH RECURSIVE boss_chain AS (
  SELECT
    E1.employee_id
  FROM
    Employees E1
  WHERE
    E1.employee_id != 1 AND E1.manager_id = 1
  UNION ALL
  SELECT
    E.employee_id
  FROM
    boss_chain B
    INNER JOIN Employees E
    ON B.employee_id = E.manager_id
)
SELECT DISTINCT
  B.employee_id
FROM
  boss_chain B;
```

</details>

<details><summary> <LC id='1336' type='long' ></LC> </summary>

```sql
WITH RECURSIVE trans_counts AS (
  SELECT
    V.user_id,
    V.visit_date,
    COUNT(T.transaction_date) AS trans_count
  FROM
    Visits V
    LEFT JOIN Transactions T
      ON V.visit_date = T.transaction_date 
        AND V.user_id = T.user_id
  GROUP BY
    V.user_id, V.visit_date
), trans_count_vals AS (
  SELECT MAX(TC.trans_count) as trans_id FROM trans_counts TC
  UNION ALL
  SELECT trans_id - 1 FROM trans_count_vals WHERE trans_id > 0
)
SELECT
  TCV.trans_id AS transactions_count,
  COUNT(TC.trans_count) AS visits_count
FROM
  trans_count_vals TCV
  LEFT JOIN trans_counts TC ON TC.trans_count = TCV.trans_id
GROUP BY
  TC.trans_count, TCV.trans_id
ORDER BY
  transactions_count;
```

</details>

<details><summary> <LC id='1384' type='long' ></LC> </summary>

```sql
WITH RECURSIVE min_max_dates AS (
  SELECT
    MIN(S.period_start) min_period_date, 
    MAX(S.period_end) max_period_date
  FROM Sales S
), period_dates AS (
  SELECT 
    min_period_date AS period_date 
  FROM 
    min_max_dates
  UNION ALL
  SELECT 
    DATE_ADD(period_date, INTERVAL 1 day) 
  FROM 
    period_dates
  WHERE 
    period_date <= (SELECT max_period_date FROM min_max_dates)
)
SELECT
  S.product_id,
  P.product_name,
  LEFT(PD.period_date, 4) AS report_year,
  COUNT(PD.period_date) * S.average_daily_sales AS total_amount
FROM
  Sales S
  INNER JOIN Product P 
    ON P.product_id = S.product_id
  INNER JOIN period_dates PD 
    ON PD.period_date BETWEEN S.period_start AND S.period_end
GROUP BY
  S.product_id, P.product_name, report_year, S.average_daily_sales
ORDER BY
  S.product_id, report_year;
```

</details>

<details><summary> <LC id='1613' type='long' ></LC> </summary>

```sql
WITH RECURSIVE possible_id_values AS (
  SELECT MAX(C.customer_id) AS id_val FROM Customers C
  UNION ALL
  SELECT id_val - 1 FROM possible_id_values WHERE id_val > 1
)
SELECT
  P.id_val AS ids
FROM
  possible_id_values P
WHERE
  P.id_val NOT IN (SELECT C2.customer_id FROM Customers C2)
ORDER BY
  P.id_val;
```

</details>

<details><summary> <LC id='1635' type='long' ></LC> </summary>

```sql
WITH RECURSIVE months AS (
  SELECT 1 AS month, '2020-01-31' AS month_end
  UNION ALL
  SELECT month + 1, LAST_DAY(DATE_ADD(month_end, INTERVAL 1 MONTH)) FROM months WHERE month < 12
), active_drivers_by_month AS (
  SELECT
    M.month,
    COUNT(D.driver_id) AS num_drivers
  FROM
    months M
    LEFT JOIN Drivers D ON D.join_date <= M.month_end
  GROUP BY
    M.month
)
SELECT
  M.month,
  AD.num_drivers AS active_drivers,
  COUNT(R.requested_at) AS accepted_rides
FROM
  (SELECT ride_id, requested_at FROM Rides WHERE YEAR(requested_at) = 2020) R
  INNER JOIN AcceptedRides AR ON AR.ride_id = R.ride_id
  RIGHT JOIN months M ON M.month = MONTH(R.requested_at)
  INNER JOIN active_drivers_by_month AD ON M.month = AD.month
GROUP BY
  M.month
ORDER BY
  M.month;
```

</details>

<details><summary> <LC id='1645' type='long' ></LC> </summary>

```sql
WITH RECURSIVE months AS (
  SELECT 1 AS month, '2020-01-31' AS month_end
  UNION ALL
  SELECT month + 1, LAST_DAY(DATE_ADD(month_end, INTERVAL 1 MONTH)) FROM months WHERE month < 12
), active_drivers_by_month AS (
  SELECT
    M.month,
    COUNT(D.driver_id) AS num_drivers
  FROM
    months M
    LEFT JOIN Drivers D ON D.join_date <= M.month_end
  GROUP BY
    M.month
), month_stats AS (
  SELECT
    M.month,
    COUNT(DISTINCT AR.driver_id) AS accepting_drivers,
    AD.num_drivers AS active_drivers,
    COUNT(R.requested_at) AS accepted_rides
  FROM
    (SELECT ride_id, requested_at FROM Rides WHERE YEAR(requested_at) = 2020) R
    INNER JOIN AcceptedRides AR ON AR.ride_id = R.ride_id
    RIGHT JOIN months M ON M.month = MONTH(R.requested_at)
    INNER JOIN active_drivers_by_month AD ON M.month = AD.month
  GROUP BY
    M.month
  ORDER BY
    M.month
)
SELECT
  MS.month,
  (CASE
    WHEN MS.accepted_rides = 0 THEN 0
    ELSE ROUND(100 * MS.accepting_drivers / MS.active_drivers, 2)
  END) AS working_percentage
FROM
  month_stats MS
ORDER BY
  MS.month;
```

</details>

<details><summary> <LC id='1651' type='long' ></LC> </summary>

```sql
WITH RECURSIVE months AS (
  SELECT 1 AS month, '2020-01-31' AS month_end
  UNION ALL
  SELECT month + 1, LAST_DAY(DATE_ADD(month_end, INTERVAL 1 MONTH)) FROM months WHERE month < 12
), active_drivers_by_month AS (
  SELECT
    M.month,
    COUNT(D.driver_id) AS num_drivers
  FROM
    months M
    LEFT JOIN Drivers D ON D.join_date <= M.month_end
  GROUP BY
    M.month
), month_stats AS (
  SELECT
    M.month,
    SUM(IFNULL(AR.ride_distance,0)) AS ride_distance,
    SUM(IFNULL(AR.ride_duration,0)) AS ride_duration
  FROM
    (SELECT ride_id, requested_at FROM Rides WHERE YEAR(requested_at) = 2020) R
    INNER JOIN AcceptedRides AR ON AR.ride_id = R.ride_id
    RIGHT JOIN months M ON M.month = MONTH(R.requested_at)
    INNER JOIN active_drivers_by_month AD ON M.month = AD.month
  GROUP BY
    M.month
)
SELECT
  MS.month,
  ROUND(AVG(MS.ride_distance) OVER(ORDER BY MS.month ROWS BETWEEN 0 PRECEDING AND 2 FOLLOWING),2) 
    AS average_ride_distance,
  ROUND(AVG(MS.ride_duration) OVER(ORDER BY MS.month ROWS BETWEEN 0 PRECEDING AND 2 FOLLOWING),2) 
    AS average_ride_duration
FROM
  month_stats MS
ORDER BY
  MS.month
LIMIT 10;
```

</details>

<details><summary> <LC id='1767' type='long' ></LC> </summary>

```sql
WITH RECURSIVE subtask_listing AS (
  SELECT T.task_id, T.subtasks_count AS subtask_id FROM Tasks T
  UNION ALL
  SELECT SL.task_id, SL.subtask_id - 1
  FROM subtask_listing SL
  WHERE SL.subtask_id > 1
)
SELECT
  *
FROM
  subtask_listing SL
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      Executed E
    WHERE
      SL.task_id = E.task_id
      AND SL.subtask_id = E.subtask_id
  );
```

</details>

<details><summary> <LC id='1843' type='long' ></LC> </summary>

```sql
WITH RECURSIVE activity_months AS (
  SELECT
    T.account_id,
    DATE_FORMAT(MAX(T.day), '%Y-%m-01') AS activity_month,
    DATE_FORMAT(MIN(T.day), '%Y-%m-01') AS min_date
  FROM
    Transactions T GROUP BY T.account_id
  UNION ALL
  SELECT
    AD.account_id, 
    DATE_SUB(AD.activity_month, INTERVAL 1 MONTH), min_date
  FROM activity_months AD WHERE activity_month > min_date
) SELECT * FROM activity_months ORDER BY account_id, activity_month;
```

</details>
