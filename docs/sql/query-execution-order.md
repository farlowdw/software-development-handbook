---
title: Query Execution Order
hide_title: false
sidebar_label: Query execution order
description: Article on query execution order
draft: false
tags: 
  - SQL
  - Query Execution Order
keywords: 
  - query execution order
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';

<details open>
<summary> TLDR</summary>

The logical processing order of the `SELECT` statement is generally as follows:

1. `FROM/JOIN` (and all associated `ON` conditions)
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT` (including window functions)
6. `DISTINCT`
7. `ORDER BY`
8. `LIMIT/OFFSET`

</details>

## Motivation

Without hesitation, compute the following as quickly as you can in your head:

```
1 + 2 / 3 * 4 ^ 5 - 6
```

This immediately comes off as a "trick [PEMDAS](https://en.wikipedia.org/wiki/Order_of_operations) problem," where the goal is to "test" whether or not someone "really" understands the order of operations for evaluating mathematical expressions. But you would never encounter an expression like the one above in the wild. Why? Because it's been intentionally made unclear as to how to go about evaluating the given expression. Specifically, the complete absence of parentheses makes it unnecessarily difficult to understand what the result of the mathematical expression should be.

## Importance

Trying to write a SQL `SELECT` statement without understanding its logical processing order is like trying to evaluate a complicated mathematical expression with no parentheses. It's unnecessarily difficult, and it can lead to uncertainty in what the result set for a query should be.

## Documentation

If you search for *order of execution of a SQL query*, then you are likely to stumble across threads on Stack Overflow, and who knows what else. But there is little in the way of "official documentation" except the following helpful [excerpt from the SQL Server docs](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver16#logical-processing-order-of-the-select-statement)

> The following steps show the logical processing order, or binding order, for a `SELECT` statement. This order determines when the objects defined in one step are made available to the clauses in subsequent steps. For example, if the query processor can bind to (access) the tables or views defined in the `FROM` clause, these objects and their columns are made available to all subsequent steps. Conversely, because the `SELECT` clause is step 8, any column aliases or derived columns defined in that clause cannot be referenced by preceding clauses. However, they can be referenced by subsequent clauses such as the `ORDER BY` clause. The actual physical execution of the statement is determined by the query processor and the order may vary from this list.
> 
> 1. `FROM`
> 2. `ON`
> 3. `JOIN`
> 4. `WHERE`
> 5. `GROUP BY`
> 6. `WITH CUBE` or `WITH ROLLUP`
> 7. `HAVING`
> 8. `SELECT`
> 9. `DISTINCT`
> 10. `ORDER BY`
> 11. `TOP`

This excerpt ends with a warning:

> The preceding sequence is usually true. However, there are uncommon cases where the sequence may differ.

## Mental model

For the sake of simplicity, the list above may be expressed in the following manner to capture the (usually true) logical processing order of the `SELECT` statement:

1. `FROM/JOIN` (and all associated `ON` conditions)
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT` (including window functions)
6. `DISTINCT`
7. `ORDER BY`
8. `LIMIT/OFFSET`

The listing above is how you should *think* about a `SELECT` query, but this is different from how you would *write* a `SELECT` query. How do we typically write a `SELECT` query?

## Writing model 

If we were to hop over to the [Postgres docs](https://www.postgresql.org/docs/current/sql-select.html), then we might be a little overwhelmed by what's provided for the "synopsis" of the `SELECT` statement (reproduced below).

<details>
<summary> <code>SELECT</code> statement synopsis (Postgres)</summary>

```sql
[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ * | expression [ [ AS ] output_name ] [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF table_name [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

where from_item can be one of:

    [ ONLY ] table_name [ * ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
                [ TABLESAMPLE sampling_method ( argument [, ...] ) [ REPEATABLE ( seed ) ] ]
    [ LATERAL ] ( select ) [ AS ] alias [ ( column_alias [, ...] ) ]
    with_query_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] ) [ AS ] alias ( column_definition [, ...] )
    [ LATERAL ] function_name ( [ argument [, ...] ] ) AS ( column_definition [, ...] )
    [ LATERAL ] ROWS FROM( function_name ( [ argument [, ...] ] ) [ AS ( column_definition [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    from_item join_type from_item { ON join_condition | USING ( join_column [, ...] ) [ AS join_using_alias ] }
    from_item NATURAL join_type from_item
    from_item CROSS JOIN from_item

and grouping_element can be one of:

    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )

and with_query is:

    with_query_name [ ( column_name [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( select | values | insert | update | delete )
        [ SEARCH { BREADTH | DEPTH } FIRST BY column_name [, ...] SET search_seq_col_name ]
        [ CYCLE column_name [, ...] SET cycle_mark_col_name [ TO cycle_mark_value DEFAULT cycle_mark_default ] USING cycle_path_col_name ]

TABLE [ ONLY ] table_name [ * ]
```

</details>

We can produce a more useful writing model by stripping the general `SELECT` statement down to its essentials:

```sql
-- writing model for a general SELECT statement
SELECT DISTINCT 
  column, AGG_FUNC(column_or_expression), ...
FROM 
  mytable M JOIN another_table A ON M.column = A.column
WHERE 
  constraint_expression
GROUP BY 
  column
HAVING 
  constraint_expression
ORDER BY 
  column ASC/DESC
LIMIT 
  returnCount OFFSET skipCount;
```

## Tabular summary

| Order | Operation | Can use column alias? | Note |
| :-: | :-: | :-: | :-- |
| `1` | **`FROM`/`JOIN`** | &#10060; | Declare table aliases here and `FROM` what table (or *combined tables* when using one or more `JOIN`s) you will be selecting data; the total working set of data is determined here--the resultant working set of data may be thought of as a "virtual table" to which all subsequent operations will apply (this is the idea behind a *view* which is essentially a commonly used working set of data or "virtual table" created by a query, often a somewhat complicated one, whose result set is given a name (i.e., the name of the view); subsequent queries can then be easily written to target this *predetermined working set of data*, *virtual table*, *named query*, *view* or whatever you want to call it--such a construct is most often called a *view*) |
| `2` | **`WHERE`** | &#10060; | Apply first-pass constraints to *individual* rows |
| `3` | **`GROUP BY`** | &#10060; | Group remaining rows (i.e., the rows remaining after the first-pass `WHERE` constraints have filtered out all individual rows not meeting the specified criteria) based on *common* values in specified column(s); be mindful when using [more than one field](https://stackoverflow.com/a/2421441/5209533) in this clause, namely `GROUP BY ColOrExpr` means put all those rows with the same value for `ColOrExpr` in one group while something like `GROUP BY ColOrExpr1, ..., ColOrExprN` means put all those rows with the same values for all `N` columns or expressions in one group |
| `4` | **`HAVING`** | &#10060; | Apply constraints to an aggregate or a group of rows that have been `GROUPed BY` some criteria; essentially, `WHERE` applies to *individual* rows while `HAVING` applies to *groups* of rows |
| `5` | **`SELECT`** | &#8213; | Declare column aliases here |
| `6` | **`DISTINCT`** | &#8213; | Use a more restrictive version of `SELECT` by specifying which rows should be considered duplicates, and thus removed from the result set, by using the syntax `SELECT DISTINCT` which generally takes one of two forms: <ul><li><code>SELECT DISTINCT ColOrExpr</code>: Here, only one column or expression is specified so the values from this column or expression are used to evaluate the duplicate.</li><li><code>SELECT DISTINCT ColOrExpr1, ..., ColOrExprN</code>: Here, <code>N</code> columns and/or expressions have been specified so the <em>combination of values</em> of these columns and/or expressions will be used to evaluate the duplicates</li></ul> |
| `7` | **`ORDER BY`** | &#9989; | Sort a query result set by using the syntax <code>ORDER BY SortExpression1 [ASC &#65372; DESC], ..., SortExpressionN [ASC &#65372; DESC]</code> where `SortExpression` can be either a column or an expression and <code>ASC &#65372; DESC</code> specifies whether to sort the column or expression in `ASC`ending order (default) or in `DESC`ending order; note that you can sort a result set by multiple columns and/or expressions where each listed `SortExpression` takes precedence over the next (e.g., something like `ORDER BY LastName DESC, Age ASC` would order rows first by `LastName` in descending order and then, *within* that ordered set, sort the remaining results by `AGE` in ascending order) |
| `8` | **`LIMIT`/`OFFSET`** | &#9989; | Return a (possibly offset) subset of rows generated by a query; the syntax `LIMIT RowsToReturn OFFSET RowsToSkip` indicates the maximum number of rows that should be returned by a query (i.e, `RowsToReturn`) as well as how many rows to skip from the initial query results (i.e., `RowsToSkip`); almost always use `ORDER BY` when using `LIMIT/OFFSET` to ensure a predictable result set--this is due to the fact that the order in which records are returned from a database is often random unless order is imposed by means of `ORDER BY` |

## List summary

1. **`FROM/JOIN`:** The `FROM` clause and subsequent `JOIN`s are first executed to determine the total working set of data that is being queried. This includes subqueries in this clause, and can cause temporary tables to be created under the hood containing all the columns and rows of the tables being joined.
2. **`WHERE`:** Once we have the total working set of data, the first-pass `WHERE` constraints are applied to the individual rows. The rows that do not satisfy the constraint are discarded. Each of the constraints can only access columns directly from the tables requested in the `FROM` clause. Aliases in the `SELECT` part of the query are not accessible in most databases since they may include expressions dependent on parts of the query that have not yet executed.
3. **`GROUP BY`:** The remaining rows after the `WHERE` constraints are applied are then grouped based on common values in the column(s) specified in the `GROUP BY` clause. As a result of the grouping, there will only be as many rows as there are unique values in that column. Implicitly, this means that you should only need to use this when you have aggregate functions in your query.
4. **`HAVING`:** If the query has a `GROUP BY` clause, then the constraints in the `HAVING` clause are then applied to the grouped rows, discarding the grouped rows that do not satisfy the constraint(s). Like the `WHERE` clause, aliases are also not accessible from this step in most databases. Finally, just remember that the `WHERE` clause is to individual rows what `HAVING` is to grouped rows by means of `GROUP BY` (i.e., `HAVING` is the multi-row version of `WHERE`).
5. **`SELECT`:** Any expressions in the `SELECT` part of the query are finally computed.
6. **`DISTINCT`:** Of the remaining rows, rows with duplicate values in the column(s) marked as `DISTINCT` will be discarded. 
7. **`ORDER BY`:** If an order is specified by the `ORDER BY` clause, the rows are then sorted by the specified data in either ascending or descending order. Since all the expressions in the `SELECT` part of the query have been computed, you can reference aliases in this clause.
8. **`LIMIT/OFFSET`:** Finally, the rows that fall outside the range specified by the `LIMIT` and `OFFSET` are discarded, leaving the final set of rows to be returned from the query.
