---
title: SQL Query Formatting Guidelines
hide_title: false
sidebar_label: Formatting guidelines
description: Article on SQL query formatting guidelines
draft: false
tags: [SQL, Formatting]
keywords: [SQL Query Formatting Guidelines]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';
import BibRef from '@site/src/components/BibRef';

## Rationale

As noted in <BibRef id='GL2016' pages='p. 39'></BibRef>, there is no agreed-upon standard for formatting SQL queries, and any guide for writing code is necessarily *subjective*. What is true *objectively*, however, is that your goal should be to communicate what your query is doing.

Formatting is important in order to accomplish this goal. It is not simply a cosmetic concern. Think about how difficult it would be to read text without punctuation, capitalization, paragraphs, indentation, etc. Less dramatically, a SQL query should be crafted so that its intention is clear; clarity should come at the cost of concision (except, of course, if this entails performance issues and the like). 

For example, the following is a one-line solution to the first Leetcode database problem, <LC id='175' type='long' ></LC>:

```sql
SELECT FirstName, LastName, City, State FROM Person LEFT JOIN Address USING(PersonId);
```

This is a perfectly legitimate solution, but could it be written more clearly? Of course:

```sql
SELECT
  P.FirstName,
  P.LastName,
  A.City,
  A.State
FROM
  Person P
  LEFT JOIN Address A ON P.PersonId = A.PersonId;
```

Adopting your own formatting style will inevitably take some time, but try to be judicious and consistent in the habits you form and the practices you choose. I share below different rules I have adopted that have been heavily influenced by <BibRef id='GL2016' pages='p. 39'></BibRef>, my everyday development work, and my experience in solving all of the LeetCode database problems. 

## Formatting guidelines

| CATEGORY | DESCRIPTION |
| :-- | :-- |
| **Table aliases** | Use table aliases that are abbreviations for the table name. It helps to define table aliases *without* the `AS` keyword so as to immediately distinguish table aliases from column aliases (see next line). |
| **Column aliases** | Use `AS` to define column aliases. Columns are generally qualified, meaning that they use table aliases. |
| **Dot notation** | Use [dot notation](https://www.ibm.com/docs/en/informix-servers/14.10?topic=expressions-using-dot-notation) (i.e., the *membership operator* `.`) in conjunction with table aliases to clearly indicate from which table a column is being accessed. For example, if you are trying to access the column `UserId` from the `Users` table, then the `Users` table can be aliased with `U` and the `UserId` column can be accessed via dot notation as follows: `U.UserId`. |
| **Consistency** | Be consistent in capitalization, in usage of underscores, indentation, etc. |
| **Readability** | Write the code to be understandable, so you and someone else can read it. |
| **Table and column names** | Always use only alphanumeric characters and underscores for table and column names. Other characters, such as spaces, require that the name be escaped when referenced. The escape characters, typically double quotes or square braces, make it hard to write and read queries. |
| **Plurality of table names** | Table names are usually in plural (this helps avoid the problem with reserved words) and reinforces the idea that tables contain multiple instances of the entity. |
| **Singularity of primary key column names** | The primary key is the singular of the table name followed by "Id." For example, `OrderId` and `SubscriberId` could be expected primary key column names for an `Orders` and `Subscribers` table, respectively. |
| **Foreign key and primary key naming consistency** | When a foreign key column references another table's primary key column, use the exact same name for both columns, ensuring consistency and making it easy to see relationships between tables. |
| **CamelCase** | "CamelBack" case is used (upper case for each new word, lowercase for the rest). Hence, `OrderId` instead of `Order_Id`. In general, table names and column names are not case sensitive. The CamelBack method is used to make it easier to read the name, while at the same time keeping the name shorter (than if using underscores). Most table and column names use CamelBack casing. |
| **Underscore usage** | The underscore is used for grouping common columns together. For instance, in a `Calendar` table, the indicators for holidays for specific religions might start with `hol_`. |
| **Reserved words** | Refrain from using SQL reserved words. Databases have their own special words, but words like `ORDER`, `GROUP`, and `VALUES` are keywords in the language and should be avoided. Most keywords are capitalized. |
| **Left alignment of high-level clauses** | The high-level clauses defined by the SQL language are all aligned on the left. These are `WITH`, `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, and `ORDER BY`. |
| **Alignment within clauses** | Within a clause, subsequent lines are aligned after and (usually) underneath the keyword, so the scope of each clause is visually obvious. |
| **Alignment within subqueries** | Subqueries follow similar rules, so all the main clauses of a subquery are indented, but still aligned on the left. |
| **Alignment within `FROM` clause** | Within the `FROM` clause, table names and subqueries start on a new line (the tables are then aligned and easier to see). The `JOIN` keywords (i.e., `LEFT JOIN`, `INNER JOIN`, etc.) start on their own line and the `ON` predicate immediately follows (i.e., appears on the same line as its associated `JOIN` keyword). |
| **Operator spacing** | Operators generally have spaces around them. |
| **Comma placement** | Commas are at the end of a line, just as a human would place them. |
| **Parentheses across multiple lines** | A closing parenthesis, when on a subsequent line, is aligned under the opening parenthesis. |
| **`CASE` statements and parentheses** | `CASE` statements are always surrounded by parentheses. |

As always, rules are made to be broken. The rules above are meant to provide freedom and clarity. They are not meant to be a straightjacket. I try to follow my own rules most of the time, but I occasionally make exceptions (especially when using `UNION` or `UNION ALL` for some reason) or slip up (more often than I care to admit). Adopt what you find to be helpful. Leave the rest.

## Automated formatting

It is nice to have a generally agreed-upon set of rules for formatting SQL queries even if that set of rules only applies to yourself! Consistency helps even if it is just in your own work. Manually trying to enforce consistency is problematic at best though. An automated solution would be much cleaner and efficient. See the blog post on [automated SQL query formatting](/blog/2022/11/09/sql-formatting) for such a solution.
