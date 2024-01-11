---
title: LeetCode Problems by Category
hide_title: false
sidebar_label: LeetCode Problems by category
description: LeetCode problems by category
draft: false
tags:
  - LeetCode
  - Learning Resources
keywords: 
  - learning
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LC from '@site/src/components/LC';

## A



## B



## C



## D

### Difference array

Difference arrays are not super common but are important to know as it is very difficult to derive on the spot in an interview. This method can be used when the input is a 2D array, where `input[i]` is in the format `[left, right, value]`, or some equivalent form. The story behind the problem will usually be something along the lines of "between `left` and `right` there is `value` of something". Let's look at an example.

- <LC id='1094' type='long' ></LC> 


## E



## F



## G



## H

### Hash table 

- <LC id='1' type='long' >What is the classic data structure used to implement time-space tradeoffs? Hash tables. The average search time complexity for hash tables is O(1). Use this to your advantage in this problem to conduct what will essentially be a linear search (instead of quadratic) for the complement of the current term.</LC> 


## I



## J



## K



## L



## M



## N



## O



## P

### Prefix sum

If a problem's input is an array comprised of numeric elements and you find yourself needing to calculate multiple subarray sums, then consider building a prefix sum. But be mindful that a prefix sum costs $O(n)$ space to build &#8212; if the prefix sum is used in a "sliding" manner, then be on the lookout for space optimization possibilities by using a running sum and deducting that from the total sum for each iteration.

- <LC id='1413' type='long' ></LC> 
- <LC id='1480' type='long' ></LC> 
- <LC id='2256' type='long' ></LC> 
- <LC id='2270' type='long' ></LC> 

## Q



## R



## S

### Sliding window

If a problem has explicit constraints such as

- sum greater than or less than `k`
- limits on what is contained (such as *maximum of `k` unique elements* or *no duplicates allowed*)

and/or asks for

- minimum or maximum length
- minimum or maximum sum
- number of subarrays/substrings

then **think about a sliding window**. Note that not all problems with these characteristics should be solved with a sliding window, and not all sliding window problems have these characteristics. These characteristics should only be used as a general guideline.

#### Clever endpoint trick

- <LC id='713' type='long' ></LC>
- <LC id='2348' type='long' ></LC>

#### Fixed-width

- <LC id='643' type='long' ></LC>

#### Variable-width

- <LC id='1004' type='long' ></LC>

### Stacks

- <LC id='20' type='long' ></LC> 
- <LC id='682' type='long' ></LC> 
- <LC id='155' type='long' >If it seems like what is being asked for is basically an impossibility, then the solution almost certainly involves some "trick" to make what is being requested possible.</LC> &#8617;

## T

### Two pointers

- <LC id='392' type='long' ></LC> 
- <LC id='344' type='long' ></LC> 
- <LC id='11' type='long' ></LC> 
- <LC id='977' type='long' ></LC> 
- <LC id='26' type='long' ></LC> 
- <LC id='27' type='long' ></LC> 

## U



## V



## W



## X



## Y



## Z

---

## SQL

:::note Useful Reference

- <LC id='180' type='long' ></LC>: Contains a detailed tutorial on gaps and islands problems and how to effectively use <code>ROW_NUMBER()</code> to identify where gaps occur.
- <LC id='185' type='long' ></LC>: Contains a detailed tutorial on correlated subqueries.

:::

### Summer 2021

#### Best problems

- <LC id='586' type='long' >Try to account for ties by using RANK_OVER()</LC> 
- <LC id='601' type='long' ></LC> 
- <LC id='608' type='long' ></LC> 
- <LC id='615' type='long' ></LC> 
- <LC id='618' type='long' ></LC> 
- <LC id='1045' type='long' ></LC> 
- <LC id='1126' type='long' >Sometimes you can do powerful things with window function arithmetic.</LC> 
- <LC id='1127' type='long' >CTEs can be agents of clarity.</LC> 
- <LC id='1159' type='long' ></LC> 
- <LC id='1179' type='long' ></LC> 
- <LC id='1212' type='long' ></LC> 
- <LC id='1225' type='long' ></LC> 
- <LC id='1321' type='long' ></LC> 
- <LC id='1341' type='long' >If you have used a GROUP BY clause, then you can use aggregates in the ORDER BY clause of a window function.</LC> 
- <LC id='1369' type='long' ></LC> 
- <LC id='1384' type='long' ></LC> 
- <LC id='1454' type='long' ></LC> 
- <LC id='1468' type='long' >Provides a great opportunity to see how window functions can be used with CASE statements.</LC> 
- <LC id='1596' type='long' >Window function with ORDER BY COUNT()</LC> 
- <LC id='1613' type='long' >Perfect problem where a basic use of WITH RECURSIVE helps a great deal.</LC> 
- <LC id='1811' type='long' ></LC> 

#### Good problems

- <LC id='607' type='long' ></LC> 
- <LC id='626' type='long' ></LC> 
- <LC id='1141' type='long' ></LC>
- <LC id='1193' type='long' ></LC>  
- <LC id='1205' type='long' ></LC> 
- <LC id='1285' type='long' ></LC> 
- <LC id='1501' type='long' ></LC> 
- <LC id='1699' type='long' ></LC> 
- <LC id='1709' type='long' ></LC> 
- <LC id='1747' type='long' ></LC> 

#### Revisit

- <LC id='607' type='long' ></LC> 
- <LC id='627' type='long' ></LC> 
- <LC id='1045' type='long' ></LC> 
- <LC id='1050' type='long' ></LC> 
- <LC id='1076' type='long' ></LC> 
- <LC id='1083' type='long' ></LC> 
- <LC id='1084' type='long' ></LC> 
- <LC id='1098' type='long' ></LC> 
- <LC id='1127' type='long' ></LC> 
- <LC id='1179' type='long' ></LC> 
- <LC id='1205' type='long' ></LC> 
- <LC id='1212' type='long' ></LC> 
- <LC id='1225' type='long' ></LC> 
- <LC id='1241' type='long' ></LC> 
- <LC id='1280' type='long' ></LC> 
- <LC id='1336' type='long' ></LC>
- <LC id='1364' type='long' ></LC>  
- <LC id='1384' type='long' ></LC> 
- <LC id='1501' type='long' ></LC> 
- <LC id='1511' type='long' ></LC> 
- <LC id='1699' type='long' ></LC> 
- <LC id='1709' type='long' ></LC> 
- <LC id='1783' type='long' ></LC> 
- <LC id='1811' type='long' ></LC> 

### Beginner problems

- <LC id='175' type='long' >Can you join two tables effectively?</LC> 
- <LC id='182' type='long' >Can you effectively use GROUP BY to group records and then use HAVING to apply aggregate filtering?</LC> 
- <LC id='511' type='long' >Can you effectively use GROUP BY along with an aggregate function such as MIN()?</LC> 
- <LC id='577' type='long' >Can you use a LEFT JOIN effectively?</LC> 
- <LC id='580' type='long' >Can you use a LEFT JOIN effectively?</LC> 
- <LC id='584' type='long' >Can you effectively construct WHERE clauses and deal with NULL values?</LC> 
- <LC id='595' type='long' >Can you handle a WHERE clause with an OR component?</LC> 
- <LC id='620' type='long' >Can you use the MOD() function effectively?</LC> 
- <LC id='1068' type='long' >Can you use an INNER JOIN effectively?</LC> 
- <LC id='1069' type='long' >Can you effectively GROUP BY and ORDER in order to use an aggregate function like SUM()?</LC> 
- <LC id='1075' type='long' >Can you effectively use an INNER JOIN along with GROUP BY and something like ROUND(AVG( ...)) in the SELECT statement?</LC> 
- <LC id='1113' type='long' >Can you use COUNT(DISTINCT ...) effectively?</LC> 
- <LC id='1148' type='long' >Can you use SELECT DISTINCT?</LC> 
- <LC id='1294' type='long' >Can you easily work with aggregates after grouping records?</LC> 
- <LC id='1327' type='long' >Can you read a problem statement carefully?</LC> 
- <LC id='1350' type='long' >Can you use a subquery (in the WHERE clause in this case)?</LC> 
- <LC id='1378' type='long' >Can you execute the most basic of queries involving LEFT JOIN?</LC> 
- <LC id='1407' type='long' >Can you handle NULL values effectively?</LC> 
- <LC id='1587' type='long' >Can you succeed in a basic application of SUM(), GROUP BY, and HAVING?</LC> 
- <LC id='1683' type='long' >Can you use the LENGTH() function in any capacity?</LC> 
- <LC id='1693' type='long' >Can you use GROUP BY with COUNT(DISTINCT ...)?</LC> 
- <LC id='1757' type='long' >Can you form the most basic of WHERE clauses?</LC> 
- <LC id='1821' type='long' >Can you execute simple queries with GROUP BY, HAVING, and SUM()?</LC> 

### CASE statements 

- <LC id='608' type='long' ></LC> 
- <LC id='626' type='long' ></LC> 

### Correlated subquery

- <LC id='176' type='long' ></LC> 
- <LC id='178' type='long' ></LC> 
- <LC id='185' type='long' ></LC> 
- <LC id='570' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 
- <LC id='585' type='long' ></LC> 

### Dates and timestamps

- <LC id='197' type='long' >DATE_ADD() and DATE_SUB() in MySQL or adding an interval in Postgres</LC> 
- <LC id='1084' type='long' ></LC> 
- <LC id='1193' type='long' ></LC> 
- <LC id='1384' type='long' ></LC> 
- <LC id='1454' type='long' ></LC> 
- <LC id='1543' type='long' ></LC> 

### DELETE

- <LC id='196' type='long' ></LC> 

### DISTINCT

- <LC id='596' type='long' >Solution with HAVING(COUNT(DISTINCT ...)) may be of use.</LC> 
- <LC id='1149' type='long' ></LC> 

### EXISTS and NOT EXISTS

- <LC id='183' type='long' ></LC> 
- <LC id='262' type='long' ></LC> 
- <LC id='585' type='long' ></LC> 
- <LC id='608' type='long' ></LC> 
- <LC id='1098' type='long' ></LC> 
- <LC id='1264' type='long' ></LC> 
- <LC id='1892' type='long' ></LC> 

### Gaps and islands

- <LC id='180' type='long' ></LC> 
- <LC id='601' type='long' ></LC> 
- <LC id='603' type='long' ></LC> 
- <LC id='1225' type='long' ></LC> 
- <LC id='1285' type='long' ></LC> 
- <LC id='1454' type='long' >This one concerns dates.</LC> 

### IN and NOT IN

- <LC id='183' type='long' ></LC> 
- <LC id='184' type='long' ></LC> 
- <LC id='607' type='long' ></LC> 
- <LC id='608' type='long' ></LC> 
- <LC id='1098' type='long' ></LC> 
- <LC id='1264' type='long' ></LC> 
- <LC id='1607' type='long' ></LC> 
- <LC id='1613' type='long' ></LC> 

### Indicator variables

- <LC id='262' type='long' ></LC> 
- <LC id='578' type='long' ></LC> 
- <LC id='1174' type='long' ></LC> 
- <LC id='1322' type='long' ></LC> 
- <LC id='1398' type='long' ></LC> 
- <LC id='1811' type='long' ></LC> 
- <LC id='1907' type='long' ></LC> 

### Joins

#### Cross-joins

- <LC id='196' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 
- <LC id='612' type='long' ></LC> 
- <LC id='613' type='long' ></LC> 
- <LC id='1127' type='long' ></LC> 
- <LC id='1280' type='long' ></LC> 
- <LC id='1892' type='long' ></LC> 

#### LEFT JOIN

- <LC id='175' type='long' >This is the very first SQL problem that LeetCode has. The only test here is to determine whether or not you understand how joins work, specifically LEFT JOINs.</LC> 
- <LC id='183' type='long' ></LC> 
- <LC id='1158' type='long' ></LC> 

#### Non-equi-joins

- <LC id='178' type='long' ></LC> 
- <LC id='196' type='long' ></LC> 
- <LC id='197' type='long' ></LC> 
- <LC id='569' type='long' ></LC> 
- <LC id='1097' type='long' ></LC> 
- <LC id='1212' type='long' ></LC> 
- <LC id='1251' type='long' ></LC> 
- <LC id='1384' type='long' ></LC> 
- <LC id='1555' type='long' ></LC> 
- <LC id='1623' type='long' ></LC> 
- <LC id='1747' type='long' ></LC> 
- <LC id='1811' type='long' ></LC> 

#### RIGHT JOIN

- <LC id='1159' type='long' ></LC> 

#### Self-joins

- <LC id='181' type='long' ></LC> 
- <LC id='196' type='long' ></LC> 
- <LC id='197' type='long' ></LC> 
- <LC id='1241' type='long' ></LC> 
- <LC id='1251' type='long' ></LC> 
- <LC id='1364' type='long' ></LC> 
- <LC id='1747' type='long' ></LC> 

### Median

- <LC id='569' type='long' ></LC> 
- <LC id='571' type='long' ></LC> 

### NOT EXISTS (see EXISTS)

### NOT IN (see IN)

### NULL values and effective management

- <LC id='176' type='long' >What makes this problem hard is figuring out how to effectively return a null value instead of what would normally be an empty result set. Hint: most aggregate functions return null values. COUNT(), however, returns 0.</LC> 
- <LC id='584' type='long' ></LC> 
- <LC id='608' type='long' ></LC> 
- <LC id='1098' type='long' ></LC> 

### Pivoting

#### Result set to multiple rows

- <LC id='618' type='long' ></LC> 
- <LC id='1179' type='long' ></LC> 
- <LC id='1777' type='long' ></LC> 

### Recursive CTEs

- <LC id='571' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 
- <LC id='1270' type='long' ></LC> 
- <LC id='1336' type='long' ></LC> 
- <LC id='1384' type='long' ></LC> 
- <LC id='1613' type='long' ></LC> 
- <LC id='1635' type='long' ></LC> 
- <LC id='1645' type='long' ></LC> 
- <LC id='1651' type='long' ></LC> 
- <LC id='1767' type='long' ></LC> 

### Regular expressions

- <LC id='1517' type='long' ></LC> 
- <LC id='1527' type='long' ></LC> 

### Stored procedures

- <LC id='177' type='long' >This is a good problem in large part because it requires you to know how to create a <em>function</em> or <em>procedure</em> in a database environment. Each database environment will have its own syntax.</LC> 

### UNION and UNION ALL

- <LC id='602' type='long' ></LC> 
- <LC id='1435' type='long' ></LC> 

### UPDATE

- <LC id='627' type='long' ></LC> 

### Window functions 

#### Named windows

- <LC id='1084' type='long' ></LC> 
- <LC id='1321' type='long' ></LC> 
- <LC id='1341' type='long' ></LC> 
- <LC id='1369' type='long' ></LC> 
- <LC id='1468' type='long' ></LC> 

#### AVG()

- <LC id='615' type='long' ></LC> 
- <LC id='1126' type='long' ></LC> 
- <LC id='1321' type='long' ></LC> 

#### COUNT()

- <LC id='601' type='long' ></LC> 
- <LC id='603' type='long' ></LC> 
- <LC id='1050' type='long' ></LC> 
- <LC id='1303' type='long' ></LC> 
- <LC id='1341' type='long' ></LC> 
- <LC id='1369' type='long' ></LC> 

#### DENSE_RANK()

- <LC id='178' type='long' >This problem could not be more perfect for an application of <code>DENSE_RANK()</code>. From the problem statement: "After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks." It is now trivial to make something like this happen via <code>DENSE_RANK()</code>. For a bigger challenge, try coming up with a different approach such as a correlated subquery or a non-equi-join that is also a self-join.</LC> 
- <LC id='184' type='long' ></LC> 
- <LC id='185' type='long' ></LC> 
- <LC id='1341' type='long' ></LC> 

#### LAG()

- <LC id='1709' type='long' ></LC> 

#### LEAD()

- <LC id='1709' type='long' ></LC> 
- <LC id='1811' type='long' ></LC> 

#### MAX()

- <LC id='1084' type='long' ></LC> 
- <LC id='1126' type='long' ></LC> 
- <LC id='1412' type='long' ></LC> 
- <LC id='1468' type='long' ></LC> 
- <LC id='1596' type='long' ></LC> 
- <LC id='1867' type='long' ></LC> 

#### MIN()

- <LC id='1084' type='long' ></LC> 
- <LC id='1321' type='long' ></LC> 

#### PERCENTILE_CONT()

- <LC id='571' type='long' ></LC> 

#### RANK()

- <LC id='512' type='long' ></LC> 
- <LC id='586' type='long' ></LC> 
- <LC id='602' type='long' ></LC> 
- <LC id='1070' type='long' ></LC> 
- <LC id='1076' type='long' ></LC> 
- <LC id='1077' type='long' ></LC> 
- <LC id='1082' type='long' ></LC> 
- <LC id='1112' type='long' ></LC> 
- <LC id='1164' type='long' ></LC> 
- <LC id='1174' type='long' ></LC> 
- <LC id='1194' type='long' ></LC> 
- <LC id='1341' type='long' ></LC> 
- <LC id='1355' type='long' ></LC> 
- <LC id='1369' type='long' ></LC> 
- <LC id='1549' type='long' ></LC> 
- <LC id='1596' type='long' ></LC> 
- <LC id='1831' type='long' ></LC> 

#### ROW_NUMBER()

- <LC id='180' type='long' ></LC> 
- <LC id='569' type='long' ></LC> 
- <LC id='571' type='long' ></LC> 
- <LC id='601' type='long' ></LC> 
- <LC id='603' type='long' ></LC> 
- <LC id='618' type='long' ></LC> 
- <LC id='1285' type='long' ></LC> 
- <LC id='1454' type='long' ></LC> 
- <LC id='1532' type='long' ></LC> 

#### SUM()

- <LC id='534' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 
- <LC id='1204' type='long' ></LC> 
- <LC id='1308' type='long' ></LC> 
- <LC id='1321' type='long' ></LC> 

#### With GROUP BY (ORDER BY aggregate)

- <LC id='1341' type='long' ></LC> 
