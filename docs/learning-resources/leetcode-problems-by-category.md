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



