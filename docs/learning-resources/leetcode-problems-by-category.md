---
title: LeetCode Problems by Category
hide_title: false
sidebar_label: LeetCode Problems by Category
description: 150 LeetCode articles with video solutions
draft: false
tags: [Learning Resources]
keywords: [learning]
image: https://github.com/farlowdw.png
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



## I



## J



## K



## L



## M



## N



## O



## P

### Prefix sum

If a problem's input is an array comprised of numeric elements and you find yourself needing to calculate multiple subarray sums, then consider building a prefix sum. But be mindful that a prefix sum costs $O(n)$ space to build--if the prefix sum is used in a "sliding" manner, then be on the lookout for space optimization possibilities by using a running sum and deducting that from the total sum for each iteration.

- <LC id='2256' type='long' ></LC> 
- <LC id='2270' type='long' ></LC> 

## Q



## R



## S

## Sliding window

If a problem has explicit constraints such as

- sum greater than or less than `k`
- limits on what is contained (such as *maximum of `k` unique elements* or *no duplicates allowed*)

and/or asks for

- minimum or maximum length
- minimum or maximum sum
- number of subarrays/substrings

then **think about a sliding window**. Note that not all problems with these characteristics should be solved with a sliding window, and not all sliding window problems have these characteristics. These characteristics should only be used as a general guideline.

### Clever endpoint trick

- <LC id='713' type='long' ></LC>
- <LC id='2348' type='long' ></LC>

### Fixed-width

- <LC id='643' type='long' ></LC>

### Variable-width

- <LC id='1004' type='long' ></LC>

## T

### Two pointers

#### Basic applications

- <LC id='344' type='long' ></LC> 

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

### Beginner problems

- <LC id='175' type='long' >Can you join two tables effectively?</LC> 
- <LC id='182' type='long' >Can you effectively use GROUP BY to group records and then use HAVING to apply aggregate filtering?</LC> 
- <LC id='511' type='long' >Can you effectively use GROUP BY along with an aggregate function such as MIN()?</LC> 
- <LC id='577' type='long' >Can you use a LEFT JOIN effectively?</LC> 
- <LC id='580' type='long' >Can you use a LEFT JOIN effectively?</LC> 
- <LC id='584' type='long' >Can you effectively construct WHERE clauses and deal with NULL values?</LC> 

### Correlated subquery

- <LC id='176' type='long' ></LC> 
- <LC id='178' type='long' ></LC> 
- <LC id='185' type='long' ></LC> 
- <LC id='570' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 
- <LC id='585' type='long' ></LC> 

### Dates and timestamps

- <LC id='197' type='long' >DATE_ADD() and DATE_SUB() in MySQL or adding an interval in Postgres</LC> 

### DELETE

- <LC id='196' type='long' ></LC> 

### EXISTS and NOT EXISTS

- <LC id='183' type='long' ></LC> 
- <LC id='262' type='long' ></LC> 
- <LC id='585' type='long' ></LC> 

### Gaps and islands

- <LC id='180' type='long' ></LC> 

### IN and NOT IN

- <LC id='183' type='long' ></LC> 
- <LC id='184' type='long' ></LC> 

### Indicator variables

- <LC id='262' type='long' ></LC> 
- <LC id='578' type='long' ></LC> 

### Joins

#### Cross-joins

- <LC id='196' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 

#### LEFT JOIN

- <LC id='175' type='long' ></LC> 
- <LC id='183' type='long' ></LC> 

#### Non-equi-joins

- <LC id='178' type='long' ></LC> 
- <LC id='196' type='long' ></LC> 
- <LC id='197' type='long' ></LC> 
- <LC id='569' type='long' ></LC> 

#### Self-joins

- <LC id='181' type='long' ></LC> 
- <LC id='196' type='long' ></LC> 
- <LC id='197' type='long' ></LC> 

### Median

- <LC id='569' type='long' ></LC> 
- <LC id='571' type='long' ></LC> 

### NOT EXISTS (see EXISTS)

### NOT IN (see IN)

### NULL values and effective management

- <LC id='176' type='long' ></LC> 
- <LC id='584' type='long' ></LC> 

### Recursive CTEs

- <LC id='571' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 

### Stored procedures

- <LC id='177' type='long' ></LC> 

### Window functions 

#### DENSE_RANK()

- <LC id='178' type='long' ></LC> 
- <LC id='184' type='long' ></LC> 
- <LC id='185' type='long' ></LC> 

#### PERCENTILE_CONT()

- <LC id='571' type='long' ></LC> 

#### RANK()

- <LC id='512' type='long' ></LC> 

#### ROW_NUMBER()

- <LC id='180' type='long' ></LC> 
- <LC id='569' type='long' ></LC> 
- <LC id='571' type='long' ></LC> 

#### SUM()

- <LC id='534' type='long' ></LC> 
- <LC id='579' type='long' ></LC> 