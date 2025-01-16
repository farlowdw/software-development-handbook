---
title: LeetCode Problems by Official Solution Category
hide_title: false
sidebar_label: LeetCode problems by solution category
description: LeetCode problems listed by official solution category
draft: false
tags: 
  - LeetCode
  - Learning Resources
keywords: 
  - leetcode
  - learning resources
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import LC from '@site/src/components/LC';
import TOCInline from '@theme/TOCInline';

Suppose you're trying to learn how to use [counting sort](https://en.wikipedia.org/wiki/Counting_sort) in the context of solving a programming challenge. A variety of strategies are possible, but solving a LeetCode problem is likely a good strategy for at least two reasons:

1. The problem is supposed to be one seen before in interview settings (often making it more practical than theoretical).
2. Accepted solutions must pass several test cases, sometimes hundreds or even over a thousand test cases.

But how can you effectively find problems on LeetCode where counting sort should be used? You could try consulting the [sorting tag](https://leetcode.com/problem-list/sorting/), where currently (Jan 15, 2025) there are well over 400 problems that bear the `Sorting` tag, but nothing is said about the specific sorting technique used (e.g., counting sort, bubble sort, cycle sort, merge sort, radix sort, etc.). On the other hand, there are some solution techniques (e.g., DFS and BFS on binary trees or general graphs) so general as to almost be useless to specify.

The lists of problems below are intended to make it easier to practice various problem-solving techniques. How? Each listed problem belongs to a specific *solution category*, where that solution category was used as an official solution to the linked problem on LeetCode's platform. For example, in the [Cycle Sort](#cycle-sort) category, problem <LC id='442' type='long' ></LC> is listed &#8212; this means an official cycle sort solution is posted on LeetCode's platform for this problem (approach 4 as of writing).

How is this helpful? The goal is to highlight problem-solving techniques or algorithms that may not often appear in some official solutions (e.g., Floyd-Warshall, Hierholzer, Manacher, etc.) while also providing a number of practice problems for more established techniques (e.g., sliding window, two pointer, etc.). The lists below are by no means complete. LeetCode adds problem solutions and new approaches every single day. The point is that you can now view a large number of problems based on official solutions provided for those problems, hopefully allowing you to narrow what problems you practice based on what you are trying to learn.

The full category list is provided below for quick reference but also appears in the side menu:

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## A*

See [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm).

- <LC id='675' type='long' ></LC> 
- <LC id='1091' type='long' ></LC> 
- <LC id='1293' type='long' ></LC> 
- <LC id='1730' type='long' ></LC> 

## Backtracking

See [backtracking](https://en.wikipedia.org/wiki/Backtracking).

- <LC id='17' type='long' ></LC> 
- <LC id='22' type='long' ></LC> 
- <LC id='37' type='long' ></LC> 
- <LC id='39' type='long' ></LC> 
- <LC id='40' type='long' ></LC> 
- <LC id='44' type='long' ></LC> 
- <LC id='46' type='long' ></LC> 
- <LC id='47' type='long' ></LC> 
- <LC id='51' type='long' ></LC> 
- <LC id='52' type='long' ></LC> 
- <LC id='55' type='long' ></LC> 
- <LC id='77' type='long' ></LC> 
- <LC id='78' type='long' ></LC> 
- <LC id='79' type='long' ></LC> 
- <LC id='89' type='long' ></LC> 
- <LC id='90' type='long' ></LC> 
- <LC id='93' type='long' ></LC> 
- <LC id='126' type='long' ></LC> 
- <LC id='131' type='long' ></LC> 
- <LC id='132' type='long' ></LC> 
- <LC id='140' type='long' ></LC> 
- <LC id='212' type='long' ></LC> 
- <LC id='216' type='long' ></LC> 
- <LC id='254' type='long' ></LC> 
- <LC id='267' type='long' ></LC> 
- <LC id='281' type='long' ></LC> 
- <LC id='291' type='long' ></LC> 
- <LC id='301' type='long' ></LC> 
- <LC id='320' type='long' ></LC> 
- <LC id='351' type='long' ></LC> 
- <LC id='425' type='long' ></LC> 
- <LC id='465' type='long' ></LC> 
- <LC id='489' type='long' ></LC> 
- <LC id='491' type='long' ></LC> 
- <LC id='526' type='long' ></LC> 
- <LC id='650' type='long' ></LC> 
- <LC id='679' type='long' ></LC> 
- <LC id='698' type='long' ></LC> 
- <LC id='765' type='long' ></LC> 
- <LC id='797' type='long' ></LC> 
- <LC id='949' type='long' ></LC> 
- <LC id='980' type='long' ></LC> 
- <LC id='996' type='long' ></LC> 
- <LC id='1066' type='long' ></LC> 
- <LC id='1087' type='long' ></LC> 
- <LC id='1088' type='long' ></LC> 
- <LC id='1239' type='long' ></LC> 
- <LC id='1255' type='long' ></LC> 
- <LC id='1593' type='long' ></LC> 
- <LC id='1601' type='long' ></LC> 
- <LC id='1631' type='long' ></LC> 
- <LC id='1641' type='long' ></LC> 
- <LC id='1863' type='long' ></LC> 
- <LC id='2305' type='long' ></LC> 
- <LC id='2597' type='long' ></LC> 
- <LC id='2664' type='long' ></LC> 

## Bellman-Ford

See [Bellman-Ford algorithm](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm).

- <LC id='787' type='long' ></LC> 
- <LC id='1334' type='long' ></LC> 
- <LC id='1514' type='long' ></LC> 

## BFS - Multisource

See [multisource BFS](https://stackoverflow.com/a/55444668/5209533).

- <LC id='317' type='long' ></LC> 
- <LC id='542' type='long' ></LC> 
- <LC id='1162' type='long' ></LC> 
- <LC id='2204' type='long' ></LC> 

## Binary search

See [binary search](https://en.wikipedia.org/wiki/Binary_search) (this includes binary search on normal arrays as well as solution spaces).

- <LC id='4' type='long' ></LC> 
- <LC id='14' type='long' ></LC> 
- <LC id='16' type='long' ></LC> 
- <LC id='33' type='long' ></LC> 
- <LC id='34' type='long' ></LC> 
- <LC id='35' type='long' ></LC> 
- <LC id='57' type='long' ></LC> 
- <LC id='69' type='long' ></LC> 
- <LC id='74' type='long' ></LC> 
- <LC id='81' type='long' ></LC> 
- <LC id='153' type='long' ></LC> 
- <LC id='154' type='long' ></LC> 
- <LC id='162' type='long' ></LC> 
- <LC id='222' type='long' ></LC> 
- <LC id='240' type='long' ></LC> 
- <LC id='245' type='long' ></LC> 
- <LC id='259' type='long' ></LC> 
- <LC id='270' type='long' ></LC> 
- <LC id='272' type='long' ></LC> 
- <LC id='275' type='long' ></LC> 
- <LC id='278' type='long' ></LC> 
- <LC id='287' type='long' ></LC> 
- <LC id='300' type='long' ></LC> 
- <LC id='302' type='long' ></LC> 
- <LC id='340' type='long' ></LC> 
- <LC id='367' type='long' ></LC> 
- <LC id='374' type='long' ></LC> 
- <LC id='378' type='long' ></LC> 
- <LC id='410' type='long' ></LC> 
- <LC id='424' type='long' ></LC> 
- <LC id='441' type='long' ></LC> 
- <LC id='456' type='long' ></LC> 
- <LC id='497' type='long' ></LC> 
- <LC id='528' type='long' ></LC> 
- <LC id='540' type='long' ></LC> 
- <LC id='564' type='long' ></LC> 
- <LC id='611' type='long' ></LC> 
- <LC id='633' type='long' ></LC> 
- <LC id='644' type='long' ></LC> 
- <LC id='649' type='long' ></LC> 
- <LC id='658' type='long' ></LC> 
- <LC id='668' type='long' ></LC> 
- <LC id='702' type='long' ></LC> 
- <LC id='704' type='long' ></LC> 
- <LC id='713' type='long' ></LC> 
- <LC id='718' type='long' ></LC> 
- <LC id='719' type='long' ></LC> 
- <LC id='729' type='long' ></LC> 
- <LC id='744' type='long' ></LC> 
- <LC id='774' type='long' ></LC> 
- <LC id='778' type='long' ></LC> 
- <LC id='786' type='long' ></LC> 
- <LC id='793' type='long' ></LC> 
- <LC id='826' type='long' ></LC> 
- <LC id='852' type='long' ></LC> 
- <LC id='862' type='long' ></LC> 
- <LC id='875' type='long' ></LC> 
- <LC id='878' type='long' ></LC> 
- <LC id='887' type='long' ></LC> 
- <LC id='911' type='long' ></LC> 
- <LC id='973' type='long' ></LC> 
- <LC id='981' type='long' ></LC> 
- <LC id='1011' type='long' ></LC> 
- <LC id='1055' type='long' ></LC> 
- <LC id='1060' type='long' ></LC> 
- <LC id='1062' type='long' ></LC> 
- <LC id='1064' type='long' ></LC> 
- <LC id='1095' type='long' ></LC> 
- <LC id='1099' type='long' ></LC> 
- <LC id='1102' type='long' ></LC> 
- <LC id='1146' type='long' ></LC> 
- <LC id='1150' type='long' ></LC> 
- <LC id='1182' type='long' ></LC> 
- <LC id='1198' type='long' ></LC> 
- <LC id='1199' type='long' ></LC> 
- <LC id='1228' type='long' ></LC> 
- <LC id='1231' type='long' ></LC> 
- <LC id='1235' type='long' ></LC> 
- <LC id='1268' type='long' ></LC> 
- <LC id='1283' type='long' ></LC> 
- <LC id='1287' type='long' ></LC> 
- <LC id='1337' type='long' ></LC> 
- <LC id='1346' type='long' ></LC> 
- <LC id='1351' type='long' ></LC> 
- <LC id='1413' type='long' ></LC> 
- <LC id='1428' type='long' ></LC> 
- <LC id='1482' type='long' ></LC> 
- <LC id='1498' type='long' ></LC> 
- <LC id='1508' type='long' ></LC> 
- <LC id='1533' type='long' ></LC> 
- <LC id='1539' type='long' ></LC> 
- <LC id='1552' type='long' ></LC> 
- <LC id='1574' type='long' ></LC> 
- <LC id='1631' type='long' ></LC> 
- <LC id='1640' type='long' ></LC> 
- <LC id='1642' type='long' ></LC> 
- <LC id='1671' type='long' ></LC> 
- <LC id='1751' type='long' ></LC> 
- <LC id='1793' type='long' ></LC> 
- <LC id='1802' type='long' ></LC> 
- <LC id='1838' type='long' ></LC> 
- <LC id='1855' type='long' ></LC> 
- <LC id='1870' type='long' ></LC> 
- <LC id='1885' type='long' ></LC> 
- <LC id='1891' type='long' ></LC> 
- <LC id='1894' type='long' ></LC> 
- <LC id='1940' type='long' ></LC> 
- <LC id='1964' type='long' ></LC> 
- <LC id='1970' type='long' ></LC> 
- <LC id='2009' type='long' ></LC> 
- <LC id='2024' type='long' ></LC> 
- <LC id='2064' type='long' ></LC> 
- <LC id='2070' type='long' ></LC> 
- <LC id='2141' type='long' ></LC> 
- <LC id='2187' type='long' ></LC> 
- <LC id='2251' type='long' ></LC> 
- <LC id='2300' type='long' ></LC> 
- <LC id='2448' type='long' ></LC> 
- <LC id='2485' type='long' ></LC> 
- <LC id='2501' type='long' ></LC> 
- <LC id='2540' type='long' ></LC> 
- <LC id='2554' type='long' ></LC> 
- <LC id='2563' type='long' ></LC> 
- <LC id='2616' type='long' ></LC> 
- <LC id='2779' type='long' ></LC> 
- <LC id='2812' type='long' ></LC> 
- <LC id='2838' type='long' ></LC> 
- <LC id='2955' type='long' ></LC> 
- <LC id='3097' type='long' ></LC> 
- <LC id='3152' type='long' ></LC> 

## Binary search (recursive)

- <LC id='4' type='long' ></LC> 
- <LC id='162' type='long' ></LC> 

## Binary tree (indexed, Fenwick Tree)

See [Fenwick tree](https://en.wikipedia.org/wiki/Fenwick_tree).

- <LC id='308' type='long' ></LC> 
- <LC id='315' type='long' ></LC> 
- <LC id='493' type='long' ></LC> 
- <LC id='1395' type='long' ></LC> 
- <LC id='1626' type='long' ></LC> 
- <LC id='1649' type='long' ></LC> 

## Binary tree (inorder, iterative)

- <LC id='94' type='long' ></LC> 
- <LC id='98' type='long' ></LC> 
- <LC id='99' type='long' ></LC> 
- <LC id='270' type='long' ></LC> 
- <LC id='1022' type='long' ></LC> 
- <LC id='1305' type='long' ></LC> 
- <LC id='1379' type='long' ></LC> 
- <LC id='1586' type='long' ></LC> 

## Binary tree (inorder, recursive)

- <LC id='94' type='long' ></LC> 
- <LC id='98' type='long' ></LC> 
- <LC id='99' type='long' ></LC> 
- <LC id='230' type='long' ></LC> 
- <LC id='270' type='long' ></LC> 
- <LC id='272' type='long' ></LC> 
- <LC id='530' type='long' ></LC> 
- <LC id='783' type='long' ></LC> 
- <LC id='897' type='long' ></LC> 
- <LC id='1022' type='long' ></LC> 
- <LC id='1305' type='long' ></LC> 
- <LC id='1379' type='long' ></LC> 
- <LC id='1382' type='long' ></LC> 
- <LC id='1586' type='long' ></LC> 

## Binary tree (postorder, iterative)

- <LC id='145' type='long' ></LC> 
- <LC id='1325' type='long' ></LC> 

## Binary tree (postorder, recursive)

- <LC id='124' type='long' ></LC> 
- <LC id='145' type='long' ></LC> 
- <LC id='333' type='long' ></LC> 
- <LC id='449' type='long' ></LC> 
- <LC id='508' type='long' ></LC> 
- <LC id='563' type='long' ></LC> 
- <LC id='1110' type='long' ></LC> 
- <LC id='1120' type='long' ></LC> 
- <LC id='1325' type='long' ></LC> 
- <LC id='1530' type='long' ></LC> 
- <LC id='1973' type='long' ></LC> 

## Binary tree (preorder, iterative)

- <LC id='129' type='long' ></LC> 
- <LC id='144' type='long' ></LC> 
- <LC id='145' type='long' ></LC> 
- <LC id='404' type='long' ></LC> 
- <LC id='1302' type='long' ></LC> 
- <LC id='1457' type='long' ></LC> 

## Binary tree (preorder, recursive)

- <LC id='129' type='long' ></LC> 
- <LC id='333' type='long' ></LC> 
- <LC id='404' type='long' ></LC> 
- <LC id='508' type='long' ></LC> 
- <LC id='545' type='long' ></LC> 
- <LC id='1457' type='long' ></LC> 

## Bit manipulation

- <LC id='29' type='long' ></LC> 
- <LC id='67' type='long' ></LC> 
- <LC id='69' type='long' ></LC> 
- <LC id='136' type='long' ></LC> 
- <LC id='137' type='long' ></LC> 
- <LC id='169' type='long' ></LC> 
- <LC id='187' type='long' ></LC> 
- <LC id='190' type='long' ></LC> 
- <LC id='191' type='long' ></LC> 
- <LC id='201' type='long' ></LC> 
- <LC id='231' type='long' ></LC> 
- <LC id='268' type='long' ></LC> 
- <LC id='287' type='long' ></LC> 
- <LC id='320' type='long' ></LC> 
- <LC id='338' type='long' ></LC> 
- <LC id='342' type='long' ></LC> 
- <LC id='371' type='long' ></LC> 
- <LC id='389' type='long' ></LC> 
- <LC id='393' type='long' ></LC> 
- <LC id='421' type='long' ></LC> 
- <LC id='461' type='long' ></LC> 
- <LC id='476' type='long' ></LC> 
- <LC id='600' type='long' ></LC> 
- <LC id='645' type='long' ></LC> 
- <LC id='661' type='long' ></LC> 
- <LC id='760' type='long' ></LC> 
- <LC id='898' type='long' ></LC> 
- <LC id='957' type='long' ></LC> 
- <LC id='1009' type='long' ></LC> 
- <LC id='1022' type='long' ></LC> 
- <LC id='1239' type='long' ></LC> 
- <LC id='1290' type='long' ></LC> 
- <LC id='1310' type='long' ></LC> 
- <LC id='1318' type='long' ></LC> 
- <LC id='1342' type='long' ></LC> 
- <LC id='1356' type='long' ></LC> 
- <LC id='1400' type='long' ></LC> 
- <LC id='1437' type='long' ></LC> 
- <LC id='1442' type='long' ></LC> 
- <LC id='1545' type='long' ></LC> 
- <LC id='1657' type='long' ></LC> 
- <LC id='1680' type='long' ></LC> 
- <LC id='1684' type='long' ></LC> 
- <LC id='1832' type='long' ></LC> 
- <LC id='1863' type='long' ></LC> 
- <LC id='1908' type='long' ></LC> 
- <LC id='2044' type='long' ></LC> 
- <LC id='2220' type='long' ></LC> 
- <LC id='2275' type='long' ></LC> 
- <LC id='2425' type='long' ></LC> 
- <LC id='2429' type='long' ></LC> 
- <LC id='2433' type='long' ></LC> 
- <LC id='2441' type='long' ></LC> 
- <LC id='2471' type='long' ></LC> 
- <LC id='2597' type='long' ></LC> 
- <LC id='2683' type='long' ></LC> 
- <LC id='2802' type='long' ></LC> 
- <LC id='2864' type='long' ></LC> 
- <LC id='2997' type='long' ></LC> 
- <LC id='3133' type='long' ></LC> 

## Bitmasking

- <LC id='36' type='long' ></LC> 
- <LC id='90' type='long' ></LC> 
- <LC id='137' type='long' ></LC> 
- <LC id='187' type='long' ></LC> 
- <LC id='190' type='long' ></LC> 
- <LC id='260' type='long' ></LC> 
- <LC id='318' type='long' ></LC> 
- <LC id='476' type='long' ></LC> 
- <LC id='477' type='long' ></LC> 
- <LC id='491' type='long' ></LC> 
- <LC id='698' type='long' ></LC> 
- <LC id='784' type='long' ></LC> 
- <LC id='1009' type='long' ></LC> 
- <LC id='1066' type='long' ></LC> 
- <LC id='1125' type='long' ></LC> 
- <LC id='1178' type='long' ></LC> 
- <LC id='1286' type='long' ></LC> 
- <LC id='1371' type='long' ></LC> 
- <LC id='1434' type='long' ></LC> 
- <LC id='1601' type='long' ></LC> 
- <LC id='1799' type='long' ></LC> 
- <LC id='1829' type='long' ></LC> 
- <LC id='1915' type='long' ></LC> 

## Bitwise trie

- <LC id='421' type='long' ></LC> 

## Boolean array

- <LC id='41' type='long' ></LC> 
- <LC id='649' type='long' ></LC> 
- <LC id='1684' type='long' ></LC> 
- <LC id='1695' type='long' ></LC> 

## Boyer-Moore

- <LC id='169' type='long' ></LC> 
- <LC id='229' type='long' ></LC> 

## Brian Kernighan

- <LC id='1356' type='long' ></LC> 
- <LC id='2220' type='long' ></LC> 

## BST

- <LC id='219' type='long' ></LC> 
- <LC id='220' type='long' ></LC> 
- <LC id='493' type='long' ></LC> 
- <LC id='653' type='long' ></LC> 
- <LC id='705' type='long' ></LC> 

## Bubble sort

- <LC id='280' type='long' ></LC> 
- <LC id='969' type='long' ></LC> 
- <LC id='1051' type='long' ></LC> 
- <LC id='3011' type='long' ></LC> 

## Bucket sort

- <LC id='164' type='long' ></LC> 
- <LC id='220' type='long' ></LC> 
- <LC id='451' type='long' ></LC> 
- <LC id='539' type='long' ></LC> 
- <LC id='692' type='long' ></LC> 
- <LC id='719' type='long' ></LC> 
- <LC id='1046' type='long' ></LC> 
- <LC id='1057' type='long' ></LC> 
- <LC id='1094' type='long' ></LC> 
- <LC id='1338' type='long' ></LC> 

## Caching

- <LC id='303' type='long' ></LC> 
- <LC id='304' type='long' ></LC> 
- <LC id='395' type='long' ></LC> 

## Canonical hash

- <LC id='711' type='long' ></LC> 

## Cantor diagonal

- <LC id='1980' type='long' ></LC> 

## Cascading

- <LC id='78' type='long' ></LC> 
- <LC id='90' type='long' ></LC> 

## Catalan numbers

- <LC id='1259' type='long' ></LC> 

## Check all substrings

- <LC id='5' type='long' ></LC> 
- <LC id='647' type='long' ></LC> 

## Circular queue

- <LC id='174' type='long' ></LC> 
- <LC id='346' type='long' ></LC> 

## Connected components

- <LC id='56' type='long' ></LC> 

## Convex hull

- <LC id='587' type='long' ></LC> 

## Counting sort

- <LC id='49' type='long' ></LC> 
- <LC id='164' type='long' ></LC> 
- <LC id='215' type='long' ></LC> 
- <LC id='274' type='long' ></LC> 
- <LC id='561' type='long' ></LC> 
- <LC id='912' type='long' ></LC> 
- <LC id='1051' type='long' ></LC> 
- <LC id='1099' type='long' ></LC> 
- <LC id='1122' type='long' ></LC> 
- <LC id='1196' type='long' ></LC> 
- <LC id='1200' type='long' ></LC> 
- <LC id='1207' type='long' ></LC> 
- <LC id='1329' type='long' ></LC> 
- <LC id='1481' type='long' ></LC> 
- <LC id='1833' type='long' ></LC> 
- <LC id='1874' type='long' ></LC> 
- <LC id='2007' type='long' ></LC> 
- <LC id='2037' type='long' ></LC> 
- <LC id='2706' type='long' ></LC> 
- <LC id='2785' type='long' ></LC> 
- <LC id='3189' type='long' ></LC> 

## Cycle sort

- <LC id='41' type='long' ></LC> 
- <LC id='442' type='long' ></LC> 

## Day-Stout-Warren

- <LC id='1382' type='long' ></LC> 

## Deque

- <LC id='151' type='long' ></LC> 
- <LC id='272' type='long' ></LC> 
- <LC id='346' type='long' ></LC> 
- <LC id='862' type='long' ></LC> 
- <LC id='919' type='long' ></LC> 
- <LC id='995' type='long' ></LC> 
- <LC id='1151' type='long' ></LC> 
- <LC id='1248' type='long' ></LC> 
- <LC id='1425' type='long' ></LC> 
- <LC id='1561' type='long' ></LC> 
- <LC id='1673' type='long' ></LC> 
- <LC id='1696' type='long' ></LC> 
- <LC id='1813' type='long' ></LC> 
- <LC id='3254' type='long' ></LC> 

## Deterministic finite automaton

- <LC id='8' type='long' ></LC> 
- <LC id='10' type='long' ></LC> 
- <LC id='44' type='long' ></LC> 
- <LC id='65' type='long' ></LC> 
- <LC id='520' type='long' ></LC> 
- <LC id='890' type='long' ></LC> 
- <LC id='1018' type='long' ></LC> 

## Difference array

- <LC id='370' type='long' ></LC> 
- <LC id='2251' type='long' ></LC> 
- <LC id='2381' type='long' ></LC> 

## Dijkstra

- <LC id='499' type='long' ></LC> 
- <LC id='505' type='long' ></LC> 
- <LC id='743' type='long' ></LC> 
- <LC id='787' type='long' ></LC> 
- <LC id='818' type='long' ></LC> 
- <LC id='864' type='long' ></LC> 
- <LC id='882' type='long' ></LC> 
- <LC id='909' type='long' ></LC> 
- <LC id='1334' type='long' ></LC> 
- <LC id='1514' type='long' ></LC> 
- <LC id='1631' type='long' ></LC> 
- <LC id='2045' type='long' ></LC> 
- <LC id='2093' type='long' ></LC> 
- <LC id='2290' type='long' ></LC> 
- <LC id='2473' type='long' ></LC> 
- <LC id='2577' type='long' ></LC> 
- <LC id='2642' type='long' ></LC> 
- <LC id='2699' type='long' ></LC> 
- <LC id='2976' type='long' ></LC> 

## Divide and conquer

- <LC id='14' type='long' ></LC> 
- <LC id='22' type='long' ></LC> 
- <LC id='23' type='long' ></LC> 
- <LC id='53' type='long' ></LC> 
- <LC id='84' type='long' ></LC> 
- <LC id='169' type='long' ></LC> 
- <LC id='218' type='long' ></LC> 
- <LC id='240' type='long' ></LC> 
- <LC id='392' type='long' ></LC> 
- <LC id='395' type='long' ></LC> 
- <LC id='468' type='long' ></LC> 
- <LC id='856' type='long' ></LC> 
- <LC id='903' type='long' ></LC> 
- <LC id='932' type='long' ></LC> 
- <LC id='1265' type='long' ></LC> 
- <LC id='1274' type='long' ></LC> 
- <LC id='1545' type='long' ></LC> 

## Doubly-linked list

- <LC id='146' type='long' ></LC> 
- <LC id='432' type='long' ></LC> 
- <LC id='707' type='long' ></LC> 
- <LC id='1472' type='long' ></LC> 

## Dynamic programming

- <LC id='5' type='long' ></LC> 
- <LC id='10' type='long' ></LC> 
- <LC id='32' type='long' ></LC> 
- <LC id='42' type='long' ></LC> 
- <LC id='44' type='long' ></LC> 
- <LC id='53' type='long' ></LC> 
- <LC id='55' type='long' ></LC> 
- <LC id='62' type='long' ></LC> 
- <LC id='63' type='long' ></LC> 
- <LC id='64' type='long' ></LC> 
- <LC id='70' type='long' ></LC> 
- <LC id='72' type='long' ></LC> 
- <LC id='85' type='long' ></LC> 
- <LC id='87' type='long' ></LC> 
- <LC id='91' type='long' ></LC> 
- <LC id='95' type='long' ></LC> 
- <LC id='96' type='long' ></LC> 
- <LC id='97' type='long' ></LC> 
- <LC id='115' type='long' ></LC> 
- <LC id='118' type='long' ></LC> 
- <LC id='119' type='long' ></LC> 
- <LC id='120' type='long' ></LC> 
- <LC id='123' type='long' ></LC> 
- <LC id='131' type='long' ></LC> 
- <LC id='132' type='long' ></LC> 
- <LC id='139' type='long' ></LC> 
- <LC id='140' type='long' ></LC> 
- <LC id='152' type='long' ></LC> 
- <LC id='174' type='long' ></LC> 
- <LC id='188' type='long' ></LC> 
- <LC id='198' type='long' ></LC> 
- <LC id='213' type='long' ></LC> 
- <LC id='221' type='long' ></LC> 
- <LC id='241' type='long' ></LC> 
- <LC id='256' type='long' ></LC> 
- <LC id='264' type='long' ></LC> 
- <LC id='265' type='long' ></LC> 
- <LC id='276' type='long' ></LC> 
- <LC id='279' type='long' ></LC> 
- <LC id='300' type='long' ></LC> 
- <LC id='309' type='long' ></LC> 
- <LC id='312' type='long' ></LC> 
- <LC id='322' type='long' ></LC> 
- <LC id='329' type='long' ></LC> 
- <LC id='337' type='long' ></LC> 
- <LC id='338' type='long' ></LC> 
- <LC id='343' type='long' ></LC> 
- <LC id='351' type='long' ></LC> 
- <LC id='354' type='long' ></LC> 
- <LC id='361' type='long' ></LC> 
- <LC id='368' type='long' ></LC> 
- <LC id='375' type='long' ></LC> 
- <LC id='376' type='long' ></LC> 
- <LC id='377' type='long' ></LC> 
- <LC id='392' type='long' ></LC> 
- <LC id='403' type='long' ></LC> 
- <LC id='410' type='long' ></LC> 
- <LC id='413' type='long' ></LC> 
- <LC id='416' type='long' ></LC> 
- <LC id='446' type='long' ></LC> 
- <LC id='453' type='long' ></LC> 
- <LC id='465' type='long' ></LC> 
- <LC id='472' type='long' ></LC> 
- <LC id='473' type='long' ></LC> 
- <LC id='474' type='long' ></LC> 
- <LC id='486' type='long' ></LC> 
- <LC id='494' type='long' ></LC> 
- <LC id='514' type='long' ></LC> 
- <LC id='516' type='long' ></LC> 
- <LC id='518' type='long' ></LC> 
- <LC id='542' type='long' ></LC> 
- <LC id='546' type='long' ></LC> 
- <LC id='552' type='long' ></LC> 
- <LC id='553' type='long' ></LC> 
- <LC id='568' type='long' ></LC> 
- <LC id='575' type='long' ></LC> 
- <LC id='583' type='long' ></LC> 
- <LC id='629' type='long' ></LC> 
- <LC id='634' type='long' ></LC> 
- <LC id='638' type='long' ></LC> 
- <LC id='639' type='long' ></LC> 
- <LC id='646' type='long' ></LC> 
- <LC id='647' type='long' ></LC> 
- <LC id='650' type='long' ></LC> 
- <LC id='651' type='long' ></LC> 
- <LC id='656' type='long' ></LC> 
- <LC id='659' type='long' ></LC> 
- <LC id='664' type='long' ></LC> 
- <LC id='673' type='long' ></LC> 
- <LC id='678' type='long' ></LC> 
- <LC id='688' type='long' ></LC> 
- <LC id='689' type='long' ></LC> 
- <LC id='691' type='long' ></LC> 
- <LC id='698' type='long' ></LC> 
- <LC id='712' type='long' ></LC> 
- <LC id='714' type='long' ></LC> 
- <LC id='718' type='long' ></LC> 
- <LC id='719' type='long' ></LC> 
- <LC id='727' type='long' ></LC> 
- <LC id='740' type='long' ></LC> 
- <LC id='741' type='long' ></LC> 
- <LC id='746' type='long' ></LC> 
- <LC id='764' type='long' ></LC> 
- <LC id='774' type='long' ></LC> 
- <LC id='780' type='long' ></LC> 
- <LC id='788' type='long' ></LC> 
- <LC id='790' type='long' ></LC> 
- <LC id='797' type='long' ></LC> 
- <LC id='801' type='long' ></LC> 
- <LC id='808' type='long' ></LC> 
- <LC id='813' type='long' ></LC> 
- <LC id='818' type='long' ></LC> 
- <LC id='823' type='long' ></LC> 
- <LC id='826' type='long' ></LC> 
- <LC id='837' type='long' ></LC> 
- <LC id='847' type='long' ></LC> 
- <LC id='854' type='long' ></LC> 
- <LC id='871' type='long' ></LC> 
- <LC id='873' type='long' ></LC> 
- <LC id='877' type='long' ></LC> 
- <LC id='878' type='long' ></LC> 
- <LC id='887' type='long' ></LC> 
- <LC id='894' type='long' ></LC> 
- <LC id='902' type='long' ></LC> 
- <LC id='903' type='long' ></LC> 
- <LC id='907' type='long' ></LC> 
- <LC id='920' type='long' ></LC> 
- <LC id='926' type='long' ></LC> 
- <LC id='931' type='long' ></LC> 
- <LC id='935' type='long' ></LC> 
- <LC id='940' type='long' ></LC> 
- <LC id='943' type='long' ></LC> 
- <LC id='956' type='long' ></LC> 
- <LC id='960' type='long' ></LC> 
- <LC id='964' type='long' ></LC> 
- <LC id='968' type='long' ></LC> 
- <LC id='983' type='long' ></LC> 
- <LC id='996' type='long' ></LC> 
- <LC id='1014' type='long' ></LC> 
- <LC id='1027' type='long' ></LC> 
- <LC id='1035' type='long' ></LC> 
- <LC id='1043' type='long' ></LC> 
- <LC id='1048' type='long' ></LC> 
- <LC id='1062' type='long' ></LC> 
- <LC id='1066' type='long' ></LC> 
- <LC id='1105' type='long' ></LC> 
- <LC id='1125' type='long' ></LC> 
- <LC id='1137' type='long' ></LC> 
- <LC id='1143' type='long' ></LC> 
- <LC id='1155' type='long' ></LC> 
- <LC id='1162' type='long' ></LC> 
- <LC id='1180' type='long' ></LC> 
- <LC id='1187' type='long' ></LC> 
- <LC id='1199' type='long' ></LC> 
- <LC id='1218' type='long' ></LC> 
- <LC id='1219' type='long' ></LC> 
- <LC id='1220' type='long' ></LC> 
- <LC id='1230' type='long' ></LC> 
- <LC id='1235' type='long' ></LC> 
- <LC id='1259' type='long' ></LC> 
- <LC id='1269' type='long' ></LC> 
- <LC id='1277' type='long' ></LC> 
- <LC id='1289' type='long' ></LC> 
- <LC id='1312' type='long' ></LC> 
- <LC id='1326' type='long' ></LC> 
- <LC id='1335' type='long' ></LC> 
- <LC id='1359' type='long' ></LC> 
- <LC id='1395' type='long' ></LC> 
- <LC id='1402' type='long' ></LC> 
- <LC id='1406' type='long' ></LC> 
- <LC id='1416' type='long' ></LC> 
- <LC id='1420' type='long' ></LC> 
- <LC id='1423' type='long' ></LC> 
- <LC id='1434' type='long' ></LC> 
- <LC id='1444' type='long' ></LC> 
- <LC id='1458' type='long' ></LC> 
- <LC id='1463' type='long' ></LC> 
- <LC id='1473' type='long' ></LC> 
- <LC id='1510' type='long' ></LC> 
- <LC id='1531' type='long' ></LC> 
- <LC id='1547' type='long' ></LC> 
- <LC id='1548' type='long' ></LC> 
- <LC id='1575' type='long' ></LC> 
- <LC id='1626' type='long' ></LC> 
- <LC id='1639' type='long' ></LC> 
- <LC id='1641' type='long' ></LC> 
- <LC id='1653' type='long' ></LC> 
- <LC id='1671' type='long' ></LC> 
- <LC id='1690' type='long' ></LC> 
- <LC id='1696' type='long' ></LC> 
- <LC id='1706' type='long' ></LC> 
- <LC id='1746' type='long' ></LC> 
- <LC id='1751' type='long' ></LC> 
- <LC id='1765' type='long' ></LC> 
- <LC id='1770' type='long' ></LC> 
- <LC id='1799' type='long' ></LC> 
- <LC id='1908' type='long' ></LC> 
- <LC id='1937' type='long' ></LC> 
- <LC id='2044' type='long' ></LC> 
- <LC id='2050' type='long' ></LC> 
- <LC id='2054' type='long' ></LC> 
- <LC id='2140' type='long' ></LC> 
- <LC id='2147' type='long' ></LC> 
- <LC id='2218' type='long' ></LC> 
- <LC id='2328' type='long' ></LC> 
- <LC id='2355' type='long' ></LC> 
- <LC id='2361' type='long' ></LC> 
- <LC id='2369' type='long' ></LC> 
- <LC id='2370' type='long' ></LC> 
- <LC id='2393' type='long' ></LC> 
- <LC id='2463' type='long' ></LC> 
- <LC id='2466' type='long' ></LC> 
- <LC id='2597' type='long' ></LC> 
- <LC id='2684' type='long' ></LC> 
- <LC id='2707' type='long' ></LC> 
- <LC id='2742' type='long' ></LC> 
- <LC id='3068' type='long' ></LC> 
- <LC id='3243' type='long' ></LC> 

## Dynamic programming (2D)

- <LC id='64' type='long' ></LC> 
- <LC id='97' type='long' ></LC> 
- <LC id='494' type='long' ></LC> 
- <LC id='562' type='long' ></LC> 
- <LC id='568' type='long' ></LC> 
- <LC id='730' type='long' ></LC> 
- <LC id='1216' type='long' ></LC> 
- <LC id='1335' type='long' ></LC> 

## Dynamic programming (3D)

- <LC id='562' type='long' ></LC> 
- <LC id='730' type='long' ></LC> 

## Dynamic programming (iterative)

- <LC id='55' type='long' ></LC> 
- <LC id='72' type='long' ></LC> 
- <LC id='91' type='long' ></LC> 
- <LC id='95' type='long' ></LC> 
- <LC id='115' type='long' ></LC> 
- <LC id='120' type='long' ></LC> 
- <LC id='132' type='long' ></LC> 
- <LC id='139' type='long' ></LC> 
- <LC id='140' type='long' ></LC> 
- <LC id='241' type='long' ></LC> 
- <LC id='276' type='long' ></LC> 
- <LC id='312' type='long' ></LC> 
- <LC id='322' type='long' ></LC> 
- <LC id='343' type='long' ></LC> 
- <LC id='377' type='long' ></LC> 
- <LC id='403' type='long' ></LC> 
- <LC id='410' type='long' ></LC> 
- <LC id='416' type='long' ></LC> 
- <LC id='486' type='long' ></LC> 
- <LC id='509' type='long' ></LC> 
- <LC id='514' type='long' ></LC> 
- <LC id='516' type='long' ></LC> 
- <LC id='518' type='long' ></LC> 
- <LC id='552' type='long' ></LC> 
- <LC id='646' type='long' ></LC> 
- <LC id='650' type='long' ></LC> 
- <LC id='664' type='long' ></LC> 
- <LC id='673' type='long' ></LC> 
- <LC id='678' type='long' ></LC> 
- <LC id='688' type='long' ></LC> 
- <LC id='689' type='long' ></LC> 
- <LC id='698' type='long' ></LC> 
- <LC id='712' type='long' ></LC> 
- <LC id='740' type='long' ></LC> 
- <LC id='741' type='long' ></LC> 
- <LC id='746' type='long' ></LC> 
- <LC id='790' type='long' ></LC> 
- <LC id='808' type='long' ></LC> 
- <LC id='878' type='long' ></LC> 
- <LC id='894' type='long' ></LC> 
- <LC id='920' type='long' ></LC> 
- <LC id='931' type='long' ></LC> 
- <LC id='935' type='long' ></LC> 
- <LC id='983' type='long' ></LC> 
- <LC id='1035' type='long' ></LC> 
- <LC id='1043' type='long' ></LC> 
- <LC id='1066' type='long' ></LC> 
- <LC id='1105' type='long' ></LC> 
- <LC id='1125' type='long' ></LC> 
- <LC id='1137' type='long' ></LC> 
- <LC id='1143' type='long' ></LC> 
- <LC id='1155' type='long' ></LC> 
- <LC id='1187' type='long' ></LC> 
- <LC id='1199' type='long' ></LC> 
- <LC id='1216' type='long' ></LC> 
- <LC id='1220' type='long' ></LC> 
- <LC id='1230' type='long' ></LC> 
- <LC id='1235' type='long' ></LC> 
- <LC id='1259' type='long' ></LC> 
- <LC id='1269' type='long' ></LC> 
- <LC id='1277' type='long' ></LC> 
- <LC id='1289' type='long' ></LC> 
- <LC id='1312' type='long' ></LC> 
- <LC id='1335' type='long' ></LC> 
- <LC id='1359' type='long' ></LC> 
- <LC id='1395' type='long' ></LC> 
- <LC id='1402' type='long' ></LC> 
- <LC id='1406' type='long' ></LC> 
- <LC id='1416' type='long' ></LC> 
- <LC id='1420' type='long' ></LC> 
- <LC id='1434' type='long' ></LC> 
- <LC id='1458' type='long' ></LC> 
- <LC id='1463' type='long' ></LC> 
- <LC id='1473' type='long' ></LC> 
- <LC id='1547' type='long' ></LC> 
- <LC id='1575' type='long' ></LC> 
- <LC id='1626' type='long' ></LC> 
- <LC id='1639' type='long' ></LC> 
- <LC id='1641' type='long' ></LC> 
- <LC id='1690' type='long' ></LC> 
- <LC id='1746' type='long' ></LC> 
- <LC id='1751' type='long' ></LC> 
- <LC id='1770' type='long' ></LC> 
- <LC id='1799' type='long' ></LC> 
- <LC id='2140' type='long' ></LC> 
- <LC id='2147' type='long' ></LC> 
- <LC id='2218' type='long' ></LC> 
- <LC id='2361' type='long' ></LC> 
- <LC id='2369' type='long' ></LC> 
- <LC id='2370' type='long' ></LC> 
- <LC id='2463' type='long' ></LC> 
- <LC id='2466' type='long' ></LC> 
- <LC id='2597' type='long' ></LC> 
- <LC id='2684' type='long' ></LC> 
- <LC id='2707' type='long' ></LC> 
- <LC id='2742' type='long' ></LC> 
- <LC id='3068' type='long' ></LC> 
- <LC id='3243' type='long' ></LC> 

## Dynamic programming (space optimized)

- <LC id='64' type='long' ></LC> 
- <LC id='95' type='long' ></LC> 
- <LC id='115' type='long' ></LC> 
- <LC id='119' type='long' ></LC> 
- <LC id='132' type='long' ></LC> 
- <LC id='198' type='long' ></LC> 
- <LC id='256' type='long' ></LC> 
- <LC id='265' type='long' ></LC> 
- <LC id='276' type='long' ></LC> 
- <LC id='368' type='long' ></LC> 
- <LC id='376' type='long' ></LC> 
- <LC id='413' type='long' ></LC> 
- <LC id='416' type='long' ></LC> 
- <LC id='486' type='long' ></LC> 
- <LC id='494' type='long' ></LC> 
- <LC id='514' type='long' ></LC> 
- <LC id='516' type='long' ></LC> 
- <LC id='518' type='long' ></LC> 
- <LC id='552' type='long' ></LC> 
- <LC id='634' type='long' ></LC> 
- <LC id='639' type='long' ></LC> 
- <LC id='659' type='long' ></LC> 
- <LC id='688' type='long' ></LC> 
- <LC id='712' type='long' ></LC> 
- <LC id='714' type='long' ></LC> 
- <LC id='727' type='long' ></LC> 
- <LC id='740' type='long' ></LC> 
- <LC id='746' type='long' ></LC> 
- <LC id='790' type='long' ></LC> 
- <LC id='931' type='long' ></LC> 
- <LC id='935' type='long' ></LC> 
- <LC id='1014' type='long' ></LC> 
- <LC id='1035' type='long' ></LC> 
- <LC id='1143' type='long' ></LC> 
- <LC id='1162' type='long' ></LC> 
- <LC id='1199' type='long' ></LC> 
- <LC id='1220' type='long' ></LC> 
- <LC id='1230' type='long' ></LC> 
- <LC id='1269' type='long' ></LC> 
- <LC id='1277' type='long' ></LC> 
- <LC id='1289' type='long' ></LC> 
- <LC id='1312' type='long' ></LC> 
- <LC id='1395' type='long' ></LC> 
- <LC id='1402' type='long' ></LC> 
- <LC id='1406' type='long' ></LC> 
- <LC id='1416' type='long' ></LC> 
- <LC id='1420' type='long' ></LC> 
- <LC id='1423' type='long' ></LC> 
- <LC id='1444' type='long' ></LC> 
- <LC id='1458' type='long' ></LC> 
- <LC id='1473' type='long' ></LC> 
- <LC id='1639' type='long' ></LC> 
- <LC id='1653' type='long' ></LC> 
- <LC id='1690' type='long' ></LC> 
- <LC id='1746' type='long' ></LC> 
- <LC id='1751' type='long' ></LC> 
- <LC id='1770' type='long' ></LC> 
- <LC id='1937' type='long' ></LC> 
- <LC id='2147' type='long' ></LC> 
- <LC id='2361' type='long' ></LC> 
- <LC id='2369' type='long' ></LC> 
- <LC id='2463' type='long' ></LC> 
- <LC id='2597' type='long' ></LC> 
- <LC id='2684' type='long' ></LC> 
- <LC id='2742' type='long' ></LC> 

## Dynamic programming (state machine)

- <LC id='309' type='long' ></LC> 

## Eulerian path

- <LC id='2097' type='long' ></LC> 

## Eulerian tour

- <LC id='2458' type='long' ></LC> 

## Factorial number system

- <LC id='60' type='long' ></LC> 

## Fisher-Yates

- <LC id='384' type='long' ></LC> 

## Floyd-Warshall

- <LC id='1334' type='long' ></LC> 
- <LC id='2642' type='long' ></LC> 
- <LC id='2976' type='long' ></LC> 

## Follow the rules

- <LC id='8' type='long' ></LC> 
- <LC id='65' type='long' ></LC> 
- <LC id='68' type='long' ></LC> 

## GCD

- <LC id='914' type='long' ></LC> 
- <LC id='1071' type='long' ></LC> 

## Graham scan

- <LC id='587' type='long' ></LC> 

## Gray code

- <LC id='1611' type='long' ></LC> 

## Greedy

- <LC id='12' type='long' ></LC> 
- <LC id='45' type='long' ></LC> 
- <LC id='55' type='long' ></LC> 
- <LC id='279' type='long' ></LC> 
- <LC id='280' type='long' ></LC> 
- <LC id='316' type='long' ></LC> 
- <LC id='358' type='long' ></LC> 
- <LC id='376' type='long' ></LC> 
- <LC id='392' type='long' ></LC> 
- <LC id='402' type='long' ></LC> 
- <LC id='406' type='long' ></LC> 
- <LC id='409' type='long' ></LC> 
- <LC id='435' type='long' ></LC> 
- <LC id='452' type='long' ></LC> 
- <LC id='455' type='long' ></LC> 
- <LC id='502' type='long' ></LC> 
- <LC id='517' type='long' ></LC> 
- <LC id='527' type='long' ></LC> 
- <LC id='621' type='long' ></LC> 
- <LC id='646' type='long' ></LC> 
- <LC id='649' type='long' ></LC> 
- <LC id='659' type='long' ></LC> 
- <LC id='665' type='long' ></LC> 
- <LC id='670' type='long' ></LC> 
- <LC id='717' type='long' ></LC> 
- <LC id='727' type='long' ></LC> 
- <LC id='738' type='long' ></LC> 
- <LC id='741' type='long' ></LC> 
- <LC id='757' type='long' ></LC> 
- <LC id='763' type='long' ></LC> 
- <LC id='765' type='long' ></LC> 
- <LC id='826' type='long' ></LC> 
- <LC id='861' type='long' ></LC> 
- <LC id='870' type='long' ></LC> 
- <LC id='881' type='long' ></LC> 
- <LC id='946' type='long' ></LC> 
- <LC id='948' type='long' ></LC> 
- <LC id='954' type='long' ></LC> 
- <LC id='955' type='long' ></LC> 
- <LC id='968' type='long' ></LC> 
- <LC id='984' type='long' ></LC> 
- <LC id='1007' type='long' ></LC> 
- <LC id='1029' type='long' ></LC> 
- <LC id='1153' type='long' ></LC> 
- <LC id='1167' type='long' ></LC> 
- <LC id='1183' type='long' ></LC> 
- <LC id='1231' type='long' ></LC> 
- <LC id='1282' type='long' ></LC> 
- <LC id='1288' type='long' ></LC> 
- <LC id='1326' type='long' ></LC> 
- <LC id='1328' type='long' ></LC> 
- <LC id='1380' type='long' ></LC> 
- <LC id='1383' type='long' ></LC> 
- <LC id='1402' type='long' ></LC> 
- <LC id='1404' type='long' ></LC> 
- <LC id='1509' type='long' ></LC> 
- <LC id='1561' type='long' ></LC> 
- <LC id='1605' type='long' ></LC> 
- <LC id='1717' type='long' ></LC> 
- <LC id='1791' type='long' ></LC> 
- <LC id='1793' type='long' ></LC> 
- <LC id='1802' type='long' ></LC> 
- <LC id='1833' type='long' ></LC> 
- <LC id='1846' type='long' ></LC> 
- <LC id='1962' type='long' ></LC> 
- <LC id='1964' type='long' ></LC> 
- <LC id='1992' type='long' ></LC> 
- <LC id='1996' type='long' ></LC> 
- <LC id='2037' type='long' ></LC> 
- <LC id='2054' type='long' ></LC> 
- <LC id='2064' type='long' ></LC> 
- <LC id='2125' type='long' ></LC> 
- <LC id='2136' type='long' ></LC> 
- <LC id='2182' type='long' ></LC> 
- <LC id='2214' type='long' ></LC> 
- <LC id='2279' type='long' ></LC> 
- <LC id='2366' type='long' ></LC> 
- <LC id='2393' type='long' ></LC> 
- <LC id='2405' type='long' ></LC> 
- <LC id='2439' type='long' ></LC> 
- <LC id='2616' type='long' ></LC> 
- <LC id='2706' type='long' ></LC> 
- <LC id='2782' type='long' ></LC> 
- <LC id='2812' type='long' ></LC> 
- <LC id='2914' type='long' ></LC> 
- <LC id='3016' type='long' ></LC> 
- <LC id='3068' type='long' ></LC> 
- <LC id='3075' type='long' ></LC> 

## Hadlock

- <LC id='675' type='long' ></LC> 

## Hashmap

- <LC id='15' type='long' ></LC> 
- <LC id='18' type='long' ></LC> 
- <LC id='30' type='long' ></LC> 
- <LC id='36' type='long' ></LC> 
- <LC id='49' type='long' ></LC> 
- <LC id='128' type='long' ></LC> 
- <LC id='136' type='long' ></LC> 
- <LC id='137' type='long' ></LC> 
- <LC id='141' type='long' ></LC> 
- <LC id='142' type='long' ></LC> 
- <LC id='160' type='long' ></LC> 
- <LC id='169' type='long' ></LC> 
- <LC id='170' type='long' ></LC> 
- <LC id='202' type='long' ></LC> 
- <LC id='205' type='long' ></LC> 
- <LC id='217' type='long' ></LC> 
- <LC id='219' type='long' ></LC> 
- <LC id='249' type='long' ></LC> 
- <LC id='260' type='long' ></LC> 
- <LC id='264' type='long' ></LC> 
- <LC id='266' type='long' ></LC> 
- <LC id='268' type='long' ></LC> 
- <LC id='287' type='long' ></LC> 
- <LC id='288' type='long' ></LC> 
- <LC id='290' type='long' ></LC> 
- <LC id='291' type='long' ></LC> 
- <LC id='299' type='long' ></LC> 
- <LC id='336' type='long' ></LC> 
- <LC id='350' type='long' ></LC> 
- <LC id='359' type='long' ></LC> 
- <LC id='379' type='long' ></LC> 
- <LC id='380' type='long' ></LC> 
- <LC id='381' type='long' ></LC> 
- <LC id='383' type='long' ></LC> 
- <LC id='387' type='long' ></LC> 
- <LC id='389' type='long' ></LC> 
- <LC id='412' type='long' ></LC> 
- <LC id='423' type='long' ></LC> 
- <LC id='448' type='long' ></LC> 
- <LC id='454' type='long' ></LC> 
- <LC id='460' type='long' ></LC> 
- <LC id='501' type='long' ></LC> 
- <LC id='525' type='long' ></LC> 
- <LC id='532' type='long' ></LC> 
- <LC id='554' type='long' ></LC> 
- <LC id='567' type='long' ></LC> 
- <LC id='575' type='long' ></LC> 
- <LC id='582' type='long' ></LC> 
- <LC id='594' type='long' ></LC> 
- <LC id='599' type='long' ></LC> 
- <LC id='609' type='long' ></LC> 
- <LC id='648' type='long' ></LC> 
- <LC id='653' type='long' ></LC> 
- <LC id='709' type='long' ></LC> 
- <LC id='733' type='long' ></LC> 
- <LC id='760' type='long' ></LC> 
- <LC id='771' type='long' ></LC> 
- <LC id='804' type='long' ></LC> 
- <LC id='811' type='long' ></LC> 
- <LC id='822' type='long' ></LC> 
- <LC id='966' type='long' ></LC> 
- <LC id='981' type='long' ></LC> 
- <LC id='1065' type='long' ></LC> 
- <LC id='1072' type='long' ></LC> 
- <LC id='1122' type='long' ></LC> 
- <LC id='1207' type='long' ></LC> 
- <LC id='1214' type='long' ></LC> 
- <LC id='1233' type='long' ></LC> 
- <LC id='1248' type='long' ></LC> 
- <LC id='1287' type='long' ></LC> 
- <LC id='1329' type='long' ></LC> 
- <LC id='1331' type='long' ></LC> 
- <LC id='1338' type='long' ></LC> 
- <LC id='1347' type='long' ></LC> 
- <LC id='1396' type='long' ></LC> 
- <LC id='1436' type='long' ></LC> 
- <LC id='1461' type='long' ></LC> 
- <LC id='1496' type='long' ></LC> 
- <LC id='1497' type='long' ></LC> 
- <LC id='1512' type='long' ></LC> 
- <LC id='1570' type='long' ></LC> 
- <LC id='1624' type='long' ></LC> 
- <LC id='1640' type='long' ></LC> 
- <LC id='1657' type='long' ></LC> 
- <LC id='1679' type='long' ></LC> 
- <LC id='1684' type='long' ></LC> 
- <LC id='1836' type='long' ></LC> 
- <LC id='1858' type='long' ></LC> 
- <LC id='1940' type='long' ></LC> 
- <LC id='2007' type='long' ></LC> 
- <LC id='2053' type='long' ></LC> 
- <LC id='2131' type='long' ></LC> 
- <LC id='2215' type='long' ></LC> 
- <LC id='2225' type='long' ></LC> 
- <LC id='2336' type='long' ></LC> 
- <LC id='2352' type='long' ></LC> 
- <LC id='2353' type='long' ></LC> 
- <LC id='2391' type='long' ></LC> 
- <LC id='2425' type='long' ></LC> 
- <LC id='2471' type='long' ></LC> 
- <LC id='2501' type='long' ></LC> 
- <LC id='2540' type='long' ></LC> 
- <LC id='2554' type='long' ></LC> 
- <LC id='2657' type='long' ></LC> 
- <LC id='2982' type='long' ></LC> 
- <LC id='3043' type='long' ></LC> 
- <LC id='3063' type='long' ></LC> 
- <LC id='3217' type='long' ></LC> 

## Hashmap (one pass)

- <LC id='1' type='long' ></LC> 

## Hashmap (two pass)

- <LC id='1' type='long' ></LC> 

## Heap (priority queue)

- <LC id='23' type='long' ></LC> 
- <LC id='215' type='long' ></LC> 
- <LC id='218' type='long' ></LC> 
- <LC id='253' type='long' ></LC> 
- <LC id='264' type='long' ></LC> 
- <LC id='272' type='long' ></LC> 
- <LC id='295' type='long' ></LC> 
- <LC id='347' type='long' ></LC> 
- <LC id='358' type='long' ></LC> 
- <LC id='373' type='long' ></LC> 
- <LC id='378' type='long' ></LC> 
- <LC id='414' type='long' ></LC> 
- <LC id='480' type='long' ></LC> 
- <LC id='506' type='long' ></LC> 
- <LC id='621' type='long' ></LC> 
- <LC id='630' type='long' ></LC> 
- <LC id='632' type='long' ></LC> 
- <LC id='642' type='long' ></LC> 
- <LC id='659' type='long' ></LC> 
- <LC id='668' type='long' ></LC> 
- <LC id='683' type='long' ></LC> 
- <LC id='692' type='long' ></LC> 
- <LC id='703' type='long' ></LC> 
- <LC id='716' type='long' ></LC> 
- <LC id='759' type='long' ></LC> 
- <LC id='767' type='long' ></LC> 
- <LC id='774' type='long' ></LC> 
- <LC id='778' type='long' ></LC> 
- <LC id='786' type='long' ></LC> 
- <LC id='857' type='long' ></LC> 
- <LC id='862' type='long' ></LC> 
- <LC id='871' type='long' ></LC> 
- <LC id='973' type='long' ></LC> 
- <LC id='1046' type='long' ></LC> 
- <LC id='1057' type='long' ></LC> 
- <LC id='1066' type='long' ></LC> 
- <LC id='1086' type='long' ></LC> 
- <LC id='1102' type='long' ></LC> 
- <LC id='1196' type='long' ></LC> 
- <LC id='1229' type='long' ></LC> 
- <LC id='1235' type='long' ></LC> 
- <LC id='1244' type='long' ></LC> 
- <LC id='1329' type='long' ></LC> 
- <LC id='1337' type='long' ></LC> 
- <LC id='1383' type='long' ></LC> 
- <LC id='1405' type='long' ></LC> 
- <LC id='1425' type='long' ></LC> 
- <LC id='1438' type='long' ></LC> 
- <LC id='1481' type='long' ></LC> 
- <LC id='1508' type='long' ></LC> 
- <LC id='1606' type='long' ></LC> 
- <LC id='1642' type='long' ></LC> 
- <LC id='1647' type='long' ></LC> 
- <LC id='1675' type='long' ></LC> 
- <LC id='1696' type='long' ></LC> 
- <LC id='1705' type='long' ></LC> 
- <LC id='1710' type='long' ></LC> 
- <LC id='1792' type='long' ></LC> 
- <LC id='1834' type='long' ></LC> 
- <LC id='1845' type='long' ></LC> 
- <LC id='1874' type='long' ></LC> 
- <LC id='1921' type='long' ></LC> 
- <LC id='1942' type='long' ></LC> 
- <LC id='1962' type='long' ></LC> 
- <LC id='2034' type='long' ></LC> 
- <LC id='2054' type='long' ></LC> 
- <LC id='2064' type='long' ></LC> 
- <LC id='2182' type='long' ></LC> 
- <LC id='2251' type='long' ></LC> 
- <LC id='2336' type='long' ></LC> 
- <LC id='2353' type='long' ></LC> 
- <LC id='2371' type='long' ></LC> 
- <LC id='2402' type='long' ></LC> 
- <LC id='2406' type='long' ></LC> 
- <LC id='2462' type='long' ></LC> 
- <LC id='2530' type='long' ></LC> 
- <LC id='2542' type='long' ></LC> 
- <LC id='2558' type='long' ></LC> 
- <LC id='2582' type='long' ></LC> 
- <LC id='2593' type='long' ></LC> 
- <LC id='2762' type='long' ></LC> 
- <LC id='2940' type='long' ></LC> 
- <LC id='3016' type='long' ></LC> 
- <LC id='3075' type='long' ></LC> 
- <LC id='3264' type='long' ></LC> 

## Heapsort

- <LC id='179' type='long' ></LC> 
- <LC id='912' type='long' ></LC> 
- <LC id='1051' type='long' ></LC> 

## Hierholzer

- <LC id='753' type='long' ></LC> 
- <LC id='2097' type='long' ></LC> 

## Horizontal scanning

- <LC id='14' type='long' ></LC> 

## Index as hash key

- <LC id='41' type='long' ></LC> 

## Insertion sort

- <LC id='147' type='long' ></LC> 
- <LC id='295' type='long' ></LC> 

## Integer overflow

- <LC id='7' type='long' ></LC> 
- <LC id='8' type='long' ></LC> 
- <LC id='29' type='long' ></LC> 
- <LC id='1339' type='long' ></LC> 

## Interval stabbing

- <LC id='798' type='long' ></LC> 

## Inverse Burrows-Wheeler transform

- <LC id='753' type='long' ></LC> 

## Jarvis

- <LC id='587' type='long' ></LC> 

## JavaScript

- <LC id='2618' type='long' ></LC> 
- <LC id='2619' type='long' ></LC> 
- <LC id='2620' type='long' ></LC> 
- <LC id='2621' type='long' ></LC> 
- <LC id='2622' type='long' ></LC> 
- <LC id='2623' type='long' ></LC> 
- <LC id='2624' type='long' ></LC> 
- <LC id='2625' type='long' ></LC> 
- <LC id='2626' type='long' ></LC> 
- <LC id='2627' type='long' ></LC> 
- <LC id='2628' type='long' ></LC> 
- <LC id='2629' type='long' ></LC> 
- <LC id='2630' type='long' ></LC> 
- <LC id='2631' type='long' ></LC> 
- <LC id='2632' type='long' ></LC> 
- <LC id='2633' type='long' ></LC> 
- <LC id='2634' type='long' ></LC> 
- <LC id='2635' type='long' ></LC> 
- <LC id='2636' type='long' ></LC> 
- <LC id='2637' type='long' ></LC> 
- <LC id='2648' type='long' ></LC> 
- <LC id='2649' type='long' ></LC> 
- <LC id='2665' type='long' ></LC> 
- <LC id='2666' type='long' ></LC> 
- <LC id='2667' type='long' ></LC> 
- <LC id='2675' type='long' ></LC> 
- <LC id='2676' type='long' ></LC> 
- <LC id='2677' type='long' ></LC> 
- <LC id='2690' type='long' ></LC> 
- <LC id='2692' type='long' ></LC> 
- <LC id='2693' type='long' ></LC> 
- <LC id='2694' type='long' ></LC> 
- <LC id='2695' type='long' ></LC> 
- <LC id='2703' type='long' ></LC> 
- <LC id='2704' type='long' ></LC> 
- <LC id='2705' type='long' ></LC> 
- <LC id='2715' type='long' ></LC> 
- <LC id='2721' type='long' ></LC> 
- <LC id='2722' type='long' ></LC> 
- <LC id='2723' type='long' ></LC> 
- <LC id='2724' type='long' ></LC> 
- <LC id='2725' type='long' ></LC> 
- <LC id='2726' type='long' ></LC> 
- <LC id='2727' type='long' ></LC> 
- <LC id='2754' type='long' ></LC> 
- <LC id='2755' type='long' ></LC> 
- <LC id='2756' type='long' ></LC> 
- <LC id='2757' type='long' ></LC> 
- <LC id='2758' type='long' ></LC> 
- <LC id='2759' type='long' ></LC> 
- <LC id='2794' type='long' ></LC> 
- <LC id='2795' type='long' ></LC> 
- <LC id='2796' type='long' ></LC> 
- <LC id='2803' type='long' ></LC> 
- <LC id='2804' type='long' ></LC> 
- <LC id='2805' type='long' ></LC> 
- <LC id='2821' type='long' ></LC> 
- <LC id='2823' type='long' ></LC> 

## Kadane

- <LC id='53' type='long' ></LC> 
- <LC id='363' type='long' ></LC> 
- <LC id='2272' type='long' ></LC> 

## Karnaugh map

- <LC id='137' type='long' ></LC> 

## KMP (Knuth-Morris-Pratt)

- <LC id='28' type='long' ></LC> 
- <LC id='214' type='long' ></LC> 
- <LC id='796' type='long' ></LC> 
- <LC id='1367' type='long' ></LC> 
- <LC id='1408' type='long' ></LC> 

## Line sweep

- <LC id='218' type='long' ></LC> 
- <LC id='731' type='long' ></LC> 
- <LC id='732' type='long' ></LC> 
- <LC id='759' type='long' ></LC> 
- <LC id='850' type='long' ></LC> 
- <LC id='1272' type='long' ></LC> 
- <LC id='2406' type='long' ></LC> 
- <LC id='2554' type='long' ></LC> 
- <LC id='2779' type='long' ></LC> 

## Linear algebra

- <LC id='935' type='long' ></LC> 

## Linear transformation

- <LC id='835' type='long' ></LC> 

## Manacher

- <LC id='5' type='long' ></LC> 
- <LC id='214' type='long' ></LC> 

## Manhattan distance

- <LC id='296' type='long' ></LC> 
- <LC id='789' type='long' ></LC> 

## Math

- <LC id='2' type='long' ></LC> 
- <LC id='7' type='long' ></LC> 
- <LC id='9' type='long' ></LC> 
- <LC id='29' type='long' ></LC> 
- <LC id='43' type='long' ></LC> 
- <LC id='62' type='long' ></LC> 
- <LC id='66' type='long' ></LC> 
- <LC id='69' type='long' ></LC> 
- <LC id='96' type='long' ></LC> 
- <LC id='119' type='long' ></LC> 
- <LC id='136' type='long' ></LC> 
- <LC id='137' type='long' ></LC> 
- <LC id='149' type='long' ></LC> 
- <LC id='166' type='long' ></LC> 
- <LC id='172' type='long' ></LC> 
- <LC id='223' type='long' ></LC> 
- <LC id='233' type='long' ></LC> 
- <LC id='258' type='long' ></LC> 
- <LC id='279' type='long' ></LC> 
- <LC id='319' type='long' ></LC> 
- <LC id='326' type='long' ></LC> 
- <LC id='330' type='long' ></LC> 
- <LC id='342' type='long' ></LC> 
- <LC id='343' type='long' ></LC> 
- <LC id='367' type='long' ></LC> 
- <LC id='368' type='long' ></LC> 
- <LC id='415' type='long' ></LC> 
- <LC id='441' type='long' ></LC> 
- <LC id='453' type='long' ></LC> 
- <LC id='459' type='long' ></LC> 
- <LC id='478' type='long' ></LC> 
- <LC id='507' type='long' ></LC> 
- <LC id='509' type='long' ></LC> 
- <LC id='519' type='long' ></LC> 
- <LC id='553' type='long' ></LC> 
- <LC id='621' type='long' ></LC> 
- <LC id='625' type='long' ></LC> 
- <LC id='633' type='long' ></LC> 
- <LC id='634' type='long' ></LC> 
- <LC id='650' type='long' ></LC> 
- <LC id='660' type='long' ></LC> 
- <LC id='672' type='long' ></LC> 
- <LC id='699' type='long' ></LC> 
- <LC id='754' type='long' ></LC> 
- <LC id='779' type='long' ></LC> 
- <LC id='790' type='long' ></LC> 
- <LC id='810' type='long' ></LC> 
- <LC id='816' type='long' ></LC> 
- <LC id='829' type='long' ></LC> 
- <LC id='840' type='long' ></LC> 
- <LC id='858' type='long' ></LC> 
- <LC id='877' type='long' ></LC> 
- <LC id='878' type='long' ></LC> 
- <LC id='883' type='long' ></LC> 
- <LC id='887' type='long' ></LC> 
- <LC id='891' type='long' ></LC> 
- <LC id='899' type='long' ></LC> 
- <LC id='902' type='long' ></LC> 
- <LC id='906' type='long' ></LC> 
- <LC id='908' type='long' ></LC> 
- <LC id='920' type='long' ></LC> 
- <LC id='1074' type='long' ></LC> 
- <LC id='1103' type='long' ></LC> 
- <LC id='1180' type='long' ></LC> 
- <LC id='1232' type='long' ></LC> 
- <LC id='1260' type='long' ></LC> 
- <LC id='1265' type='long' ></LC> 
- <LC id='1295' type='long' ></LC> 
- <LC id='1323' type='long' ></LC> 
- <LC id='1344' type='long' ></LC> 
- <LC id='1359' type='long' ></LC> 
- <LC id='1523' type='long' ></LC> 
- <LC id='1551' type='long' ></LC> 
- <LC id='1611' type='long' ></LC> 
- <LC id='1641' type='long' ></LC> 
- <LC id='1680' type='long' ></LC> 
- <LC id='1689' type='long' ></LC> 
- <LC id='1716' type='long' ></LC> 
- <LC id='2022' type='long' ></LC> 
- <LC id='2028' type='long' ></LC> 
- <LC id='2147' type='long' ></LC> 
- <LC id='2485' type='long' ></LC> 
- <LC id='2582' type='long' ></LC> 
- <LC id='2849' type='long' ></LC> 

## Matrix

- <LC id='36' type='long' ></LC> 
- <LC id='48' type='long' ></LC> 
- <LC id='54' type='long' ></LC> 
- <LC id='59' type='long' ></LC> 
- <LC id='73' type='long' ></LC> 
- <LC id='74' type='long' ></LC> 
- <LC id='304' type='long' ></LC> 
- <LC id='311' type='long' ></LC> 

## Matrix chain multiplication

- <LC id='312' type='long' ></LC> 

## Matrix (Yale)

- <LC id='312' type='long' ></LC> 

## Meet in the middle 

- <LC id='805' type='long' ></LC> 
- <LC id='956' type='long' ></LC> 

## Merge sort

- <LC id='4' type='long' ></LC> 
- <LC id='88' type='long' ></LC> 
- <LC id='148' type='long' ></LC> 
- <LC id='179' type='long' ></LC> 
- <LC id='315' type='long' ></LC> 
- <LC id='493' type='long' ></LC> 
- <LC id='912' type='long' ></LC> 
- <LC id='1051' type='long' ></LC> 
- <LC id='1649' type='long' ></LC> 
- <LC id='2418' type='long' ></LC> 

## Minimax

- <LC id='913' type='long' ></LC> 

## Monotone chain

- <LC id='587' type='long' ></LC> 

## Monotonic deque

- <LC id='239' type='long' ></LC> 
- <LC id='1425' type='long' ></LC> 
- <LC id='1438' type='long' ></LC> 
- <LC id='2762' type='long' ></LC> 

## Monotonic stack

- <LC id='84' type='long' ></LC> 
- <LC id='85' type='long' ></LC> 
- <LC id='255' type='long' ></LC> 
- <LC id='496' type='long' ></LC> 
- <LC id='739' type='long' ></LC> 
- <LC id='769' type='long' ></LC> 
- <LC id='862' type='long' ></LC> 
- <LC id='901' type='long' ></LC> 
- <LC id='907' type='long' ></LC> 
- <LC id='962' type='long' ></LC> 
- <LC id='975' type='long' ></LC> 
- <LC id='1019' type='long' ></LC> 
- <LC id='1063' type='long' ></LC> 
- <LC id='1335' type='long' ></LC> 
- <LC id='1475' type='long' ></LC> 
- <LC id='1762' type='long' ></LC> 
- <LC id='1793' type='long' ></LC> 
- <LC id='2104' type='long' ></LC> 
- <LC id='2281' type='long' ></LC> 
- <LC id='2832' type='long' ></LC> 
- <LC id='2940' type='long' ></LC> 

## Morris traversal

- <LC id='94' type='long' ></LC> 
- <LC id='99' type='long' ></LC> 
- <LC id='129' type='long' ></LC> 
- <LC id='144' type='long' ></LC> 
- <LC id='145' type='long' ></LC> 
- <LC id='404' type='long' ></LC> 
- <LC id='538' type='long' ></LC> 
- <LC id='1022' type='long' ></LC> 
- <LC id='1038' type='long' ></LC> 
- <LC id='1214' type='long' ></LC> 

## MST (Kruskal)

- <LC id='778' type='long' ></LC> 
- <LC id='1135' type='long' ></LC> 
- <LC id='1168' type='long' ></LC> 
- <LC id='1489' type='long' ></LC> 
- <LC id='1584' type='long' ></LC> 

## MST (Prim)

- <LC id='1168' type='long' ></LC> 
- <LC id='1584' type='long' ></LC> 

## Multiset

- <LC id='451' type='long' ></LC> 
- <LC id='480' type='long' ></LC> 
- <LC id='1438' type='long' ></LC> 

## Ordered map

- <LC id='352' type='long' ></LC> 
- <LC id='1331' type='long' ></LC> 
- <LC id='1705' type='long' ></LC> 
- <LC id='2034' type='long' ></LC> 
- <LC id='2418' type='long' ></LC> 
- <LC id='2762' type='long' ></LC> 

## Ordered set

- <LC id='352' type='long' ></LC> 
- <LC id='414' type='long' ></LC> 
- <LC id='1845' type='long' ></LC> 

## Palindrome

- <LC id='5' type='long' ></LC> 
- <LC id='132' type='long' ></LC> 
- <LC id='214' type='long' ></LC> 
- <LC id='266' type='long' ></LC> 
- <LC id='336' type='long' ></LC> 
- <LC id='564' type='long' ></LC> 
- <LC id='680' type='long' ></LC> 
- <LC id='730' type='long' ></LC> 
- <LC id='1216' type='long' ></LC> 
- <LC id='1332' type='long' ></LC> 
- <LC id='1400' type='long' ></LC> 

## Pandas

- <LC id='2877' type='long' ></LC> 
- <LC id='2878' type='long' ></LC> 
- <LC id='2879' type='long' ></LC> 
- <LC id='2880' type='long' ></LC> 
- <LC id='2881' type='long' ></LC> 
- <LC id='2882' type='long' ></LC> 
- <LC id='2883' type='long' ></LC> 
- <LC id='2884' type='long' ></LC> 
- <LC id='2885' type='long' ></LC> 
- <LC id='2886' type='long' ></LC> 
- <LC id='2887' type='long' ></LC> 
- <LC id='2888' type='long' ></LC> 
- <LC id='2889' type='long' ></LC> 
- <LC id='2890' type='long' ></LC> 
- <LC id='2891' type='long' ></LC> 

## Pigeonhole principle

- <LC id='164' type='long' ></LC> 
- <LC id='287' type='long' ></LC> 

## Prefix product

- <LC id='238' type='long' ></LC> 

## Prefix sum

- <LC id='303' type='long' ></LC> 
- <LC id='325' type='long' ></LC> 
- <LC id='363' type='long' ></LC> 
- <LC id='497' type='long' ></LC> 
- <LC id='528' type='long' ></LC> 
- <LC id='724' type='long' ></LC> 
- <LC id='769' type='long' ></LC> 
- <LC id='848' type='long' ></LC> 
- <LC id='918' type='long' ></LC> 
- <LC id='930' type='long' ></LC> 
- <LC id='974' type='long' ></LC> 
- <LC id='1074' type='long' ></LC> 
- <LC id='1171' type='long' ></LC> 
- <LC id='1413' type='long' ></LC> 
- <LC id='1420' type='long' ></LC> 
- <LC id='1530' type='long' ></LC> 
- <LC id='1590' type='long' ></LC> 
- <LC id='1608' type='long' ></LC> 
- <LC id='1685' type='long' ></LC> 
- <LC id='1732' type='long' ></LC> 
- <LC id='1829' type='long' ></LC> 
- <LC id='1894' type='long' ></LC> 
- <LC id='2083' type='long' ></LC> 
- <LC id='2090' type='long' ></LC> 
- <LC id='2256' type='long' ></LC> 
- <LC id='2270' type='long' ></LC> 
- <LC id='2281' type='long' ></LC> 
- <LC id='2439' type='long' ></LC> 
- <LC id='2448' type='long' ></LC> 
- <LC id='2559' type='long' ></LC> 
- <LC id='2838' type='long' ></LC> 
- <LC id='2955' type='long' ></LC> 
- <LC id='3152' type='long' ></LC> 

## Prefix sum (hashing)

- <LC id='325' type='long' ></LC> 
- <LC id='437' type='long' ></LC> 
- <LC id='523' type='long' ></LC> 
- <LC id='560' type='long' ></LC> 
- <LC id='677' type='long' ></LC> 
- <LC id='1171' type='long' ></LC> 
- <LC id='1695' type='long' ></LC> 

## Prefix sum (space optimized)

- <LC id='303' type='long' ></LC> 
- <LC id='1685' type='long' ></LC> 
- <LC id='2256' type='long' ></LC> 
- <LC id='2270' type='long' ></LC> 

## Queue

- <LC id='225' type='long' ></LC> 
- <LC id='281' type='long' ></LC> 
- <LC id='359' type='long' ></LC> 
- <LC id='362' type='long' ></LC> 
- <LC id='379' type='long' ></LC> 
- <LC id='566' type='long' ></LC> 
- <LC id='649' type='long' ></LC> 
- <LC id='950' type='long' ></LC> 
- <LC id='1429' type='long' ></LC> 
- <LC id='1535' type='long' ></LC> 
- <LC id='1700' type='long' ></LC> 
- <LC id='1823' type='long' ></LC> 
- <LC id='2073' type='long' ></LC> 
- <LC id='2337' type='long' ></LC> 

## Quickselect

- <LC id='215' type='long' ></LC> 
- <LC id='347' type='long' ></LC> 
- <LC id='462' type='long' ></LC> 
- <LC id='973' type='long' ></LC> 

## Quicksort

- <LC id='179' type='long' ></LC> 
- <LC id='2418' type='long' ></LC> 

## Rabin-Karp (binary search)

- <LC id='1044' type='long' ></LC> 

## Rabin-Karp (single hash)

- <LC id='28' type='long' ></LC> 

## Rabin-Karp (double hash)

- <LC id='28' type='long' ></LC> 

## Rabin-Karp (rolling hash)

- <LC id='187' type='long' ></LC> 
- <LC id='686' type='long' ></LC> 

## Radix sort

- <LC id='164' type='long' ></LC> 
- <LC id='360' type='long' ></LC> 
- <LC id='912' type='long' ></LC> 
- <LC id='1051' type='long' ></LC> 
- <LC id='1062' type='long' ></LC> 

## Recursion

- <LC id='10' type='long' ></LC> 
- <LC id='21' type='long' ></LC> 
- <LC id='24' type='long' ></LC> 
- <LC id='25' type='long' ></LC> 
- <LC id='50' type='long' ></LC> 
- <LC id='72' type='long' ></LC> 
- <LC id='89' type='long' ></LC> 
- <LC id='92' type='long' ></LC> 
- <LC id='98' type='long' ></LC> 
- <LC id='100' type='long' ></LC> 
- <LC id='241' type='long' ></LC> 
- <LC id='247' type='long' ></LC> 
- <LC id='273' type='long' ></LC> 
- <LC id='654' type='long' ></LC> 

## Regex

- <LC id='38' type='long' ></LC> 
- <LC id='468' type='long' ></LC> 
- <LC id='520' type='long' ></LC> 
- <LC id='551' type='long' ></LC> 
- <LC id='591' type='long' ></LC> 
- <LC id='592' type='long' ></LC> 
- <LC id='640' type='long' ></LC> 
- <LC id='726' type='long' ></LC> 

## Rejection sampling

- <LC id='470' type='long' ></LC> 
- <LC id='478' type='long' ></LC> 

## Reservoir sampling

- <LC id='382' type='long' ></LC> 
- <LC id='395' type='long' ></LC> 

## Rolling hash

- <LC id='214' type='long' ></LC> 
- <LC id='718' type='long' ></LC> 
- <LC id='2168' type='long' ></LC> 

## Segment tree

- <LC id='307' type='long' ></LC> 
- <LC id='315' type='long' ></LC> 
- <LC id='699' type='long' ></LC> 
- <LC id='732' type='long' ></LC> 
- <LC id='850' type='long' ></LC> 
- <LC id='1649' type='long' ></LC> 
- <LC id='1696' type='long' ></LC> 

## Sieve of Eratosthenes

- <LC id='204' type='long' ></LC> 
- <LC id='2601' type='long' ></LC> 

## Simulation

- <LC id='6' type='long' ></LC> 
- <LC id='123' type='long' ></LC> 
- <LC id='383' type='long' ></LC> 
- <LC id='498' type='long' ></LC> 
- <LC id='544' type='long' ></LC> 
- <LC id='657' type='long' ></LC> 
- <LC id='681' type='long' ></LC> 
- <LC id='749' type='long' ></LC> 
- <LC id='755' type='long' ></LC> 
- <LC id='799' type='long' ></LC> 
- <LC id='858' type='long' ></LC> 
- <LC id='860' type='long' ></LC> 
- <LC id='874' type='long' ></LC> 
- <LC id='885' type='long' ></LC> 
- <LC id='950' type='long' ></LC> 
- <LC id='957' type='long' ></LC> 
- <LC id='1260' type='long' ></LC> 
- <LC id='1342' type='long' ></LC> 
- <LC id='1380' type='long' ></LC> 
- <LC id='1404' type='long' ></LC> 
- <LC id='1427' type='long' ></LC> 
- <LC id='1441' type='long' ></LC> 
- <LC id='1518' type='long' ></LC> 
- <LC id='1535' type='long' ></LC> 
- <LC id='1561' type='long' ></LC> 
- <LC id='1675' type='long' ></LC> 
- <LC id='1688' type='long' ></LC> 
- <LC id='1700' type='long' ></LC> 
- <LC id='1701' type='long' ></LC> 
- <LC id='1706' type='long' ></LC> 
- <LC id='1716' type='long' ></LC> 
- <LC id='1908' type='long' ></LC> 
- <LC id='2022' type='long' ></LC> 
- <LC id='2061' type='long' ></LC> 
- <LC id='2073' type='long' ></LC> 
- <LC id='2257' type='long' ></LC> 
- <LC id='2326' type='long' ></LC> 
- <LC id='2373' type='long' ></LC> 
- <LC id='2582' type='long' ></LC> 
- <LC id='2807' type='long' ></LC> 

## Sliding window

- <LC id='3' type='long' ></LC> 
- <LC id='28' type='long' ></LC> 
- <LC id='30' type='long' ></LC> 
- <LC id='76' type='long' ></LC> 
- <LC id='159' type='long' ></LC> 
- <LC id='209' type='long' ></LC> 
- <LC id='272' type='long' ></LC> 
- <LC id='340' type='long' ></LC> 
- <LC id='395' type='long' ></LC> 
- <LC id='424' type='long' ></LC> 
- <LC id='438' type='long' ></LC> 
- <LC id='487' type='long' ></LC> 
- <LC id='567' type='long' ></LC> 
- <LC id='643' type='long' ></LC> 
- <LC id='658' type='long' ></LC> 
- <LC id='674' type='long' ></LC> 
- <LC id='683' type='long' ></LC> 
- <LC id='689' type='long' ></LC> 
- <LC id='713' type='long' ></LC> 
- <LC id='719' type='long' ></LC> 
- <LC id='768' type='long' ></LC> 
- <LC id='904' type='long' ></LC> 
- <LC id='930' type='long' ></LC> 
- <LC id='933' type='long' ></LC> 
- <LC id='978' type='long' ></LC> 
- <LC id='992' type='long' ></LC> 
- <LC id='1004' type='long' ></LC> 
- <LC id='1052' type='long' ></LC> 
- <LC id='1100' type='long' ></LC> 
- <LC id='1151' type='long' ></LC> 
- <LC id='1208' type='long' ></LC> 
- <LC id='1248' type='long' ></LC> 
- <LC id='1291' type='long' ></LC> 
- <LC id='1423' type='long' ></LC> 
- <LC id='1438' type='long' ></LC> 
- <LC id='1456' type='long' ></LC> 
- <LC id='1493' type='long' ></LC> 
- <LC id='1508' type='long' ></LC> 
- <LC id='1652' type='long' ></LC> 
- <LC id='1675' type='long' ></LC> 
- <LC id='1838' type='long' ></LC> 
- <LC id='2009' type='long' ></LC> 
- <LC id='2024' type='long' ></LC> 
- <LC id='2090' type='long' ></LC> 
- <LC id='2107' type='long' ></LC> 
- <LC id='2134' type='long' ></LC> 
- <LC id='2461' type='long' ></LC> 
- <LC id='2516' type='long' ></LC> 
- <LC id='2593' type='long' ></LC> 
- <LC id='2743' type='long' ></LC> 
- <LC id='2779' type='long' ></LC> 
- <LC id='2958' type='long' ></LC> 
- <LC id='2962' type='long' ></LC> 
- <LC id='3097' type='long' ></LC> 
- <LC id='3152' type='long' ></LC> 
- <LC id='3254' type='long' ></LC> 

## Sliding window (optimized)

- <LC id='3' type='long' ></LC> 
- <LC id='76' type='long' ></LC> 
- <LC id='424' type='long' ></LC> 
- <LC id='567' type='long' ></LC> 
- <LC id='1248' type='long' ></LC> 

## Sorting

- <LC id='49' type='long' ></LC> 
- <LC id='56' type='long' ></LC> 
- <LC id='75' type='long' ></LC> 
- <LC id='99' type='long' ></LC> 
- <LC id='128' type='long' ></LC> 
- <LC id='137' type='long' ></LC> 
- <LC id='164' type='long' ></LC> 
- <LC id='169' type='long' ></LC> 
- <LC id='170' type='long' ></LC> 
- <LC id='215' type='long' ></LC> 
- <LC id='217' type='long' ></LC> 
- <LC id='242' type='long' ></LC> 
- <LC id='244' type='long' ></LC> 
- <LC id='251' type='long' ></LC> 
- <LC id='268' type='long' ></LC> 
- <LC id='272' type='long' ></LC> 
- <LC id='274' type='long' ></LC> 
- <LC id='280' type='long' ></LC> 
- <LC id='287' type='long' ></LC> 
- <LC id='295' type='long' ></LC> 
- <LC id='296' type='long' ></LC> 
- <LC id='349' type='long' ></LC> 
- <LC id='350' type='long' ></LC> 
- <LC id='354' type='long' ></LC> 
- <LC id='360' type='long' ></LC> 
- <LC id='366' type='long' ></LC> 
- <LC id='383' type='long' ></LC> 
- <LC id='389' type='long' ></LC> 
- <LC id='414' type='long' ></LC> 
- <LC id='451' type='long' ></LC> 
- <LC id='453' type='long' ></LC> 
- <LC id='462' type='long' ></LC> 
- <LC id='480' type='long' ></LC> 
- <LC id='506' type='long' ></LC> 
- <LC id='524' type='long' ></LC> 
- <LC id='539' type='long' ></LC> 
- <LC id='561' type='long' ></LC> 
- <LC id='567' type='long' ></LC> 
- <LC id='575' type='long' ></LC> 
- <LC id='581' type='long' ></LC> 
- <LC id='593' type='long' ></LC> 
- <LC id='594' type='long' ></LC> 
- <LC id='621' type='long' ></LC> 
- <LC id='628' type='long' ></LC> 
- <LC id='645' type='long' ></LC> 
- <LC id='658' type='long' ></LC> 
- <LC id='791' type='long' ></LC> 
- <LC id='853' type='long' ></LC> 
- <LC id='905' type='long' ></LC> 
- <LC id='937' type='long' ></LC> 
- <LC id='939' type='long' ></LC> 
- <LC id='945' type='long' ></LC> 
- <LC id='948' type='long' ></LC> 
- <LC id='962' type='long' ></LC> 
- <LC id='973' type='long' ></LC> 
- <LC id='976' type='long' ></LC> 
- <LC id='977' type='long' ></LC> 
- <LC id='1057' type='long' ></LC> 
- <LC id='1062' type='long' ></LC> 
- <LC id='1086' type='long' ></LC> 
- <LC id='1122' type='long' ></LC> 
- <LC id='1133' type='long' ></LC> 
- <LC id='1196' type='long' ></LC> 
- <LC id='1200' type='long' ></LC> 
- <LC id='1233' type='long' ></LC> 
- <LC id='1235' type='long' ></LC> 
- <LC id='1331' type='long' ></LC> 
- <LC id='1337' type='long' ></LC> 
- <LC id='1338' type='long' ></LC> 
- <LC id='1346' type='long' ></LC> 
- <LC id='1356' type='long' ></LC> 
- <LC id='1394' type='long' ></LC> 
- <LC id='1460' type='long' ></LC> 
- <LC id='1464' type='long' ></LC> 
- <LC id='1465' type='long' ></LC> 
- <LC id='1497' type='long' ></LC> 
- <LC id='1509' type='long' ></LC> 
- <LC id='1608' type='long' ></LC> 
- <LC id='1630' type='long' ></LC> 
- <LC id='1632' type='long' ></LC> 
- <LC id='1636' type='long' ></LC> 
- <LC id='1637' type='long' ></LC> 
- <LC id='1647' type='long' ></LC> 
- <LC id='1675' type='long' ></LC> 
- <LC id='1679' type='long' ></LC> 
- <LC id='1727' type='long' ></LC> 
- <LC id='1833' type='long' ></LC> 
- <LC id='1877' type='long' ></LC> 
- <LC id='1887' type='long' ></LC> 
- <LC id='1913' type='long' ></LC> 
- <LC id='1921' type='long' ></LC> 
- <LC id='1996' type='long' ></LC> 
- <LC id='2007' type='long' ></LC> 
- <LC id='2037' type='long' ></LC> 
- <LC id='2070' type='long' ></LC> 
- <LC id='2191' type='long' ></LC> 
- <LC id='2285' type='long' ></LC> 
- <LC id='2300' type='long' ></LC> 
- <LC id='2328' type='long' ></LC> 
- <LC id='2371' type='long' ></LC> 
- <LC id='2389' type='long' ></LC> 
- <LC id='2402' type='long' ></LC> 
- <LC id='2406' type='long' ></LC> 
- <LC id='2418' type='long' ></LC> 
- <LC id='2491' type='long' ></LC> 
- <LC id='2551' type='long' ></LC> 
- <LC id='2593' type='long' ></LC> 
- <LC id='2751' type='long' ></LC> 
- <LC id='2785' type='long' ></LC> 
- <LC id='2838' type='long' ></LC> 
- <LC id='2966' type='long' ></LC> 
- <LC id='2971' type='long' ></LC> 
- <LC id='3016' type='long' ></LC> 
- <LC id='3075' type='long' ></LC> 
- <LC id='3189' type='long' ></LC> 

## Shortest path first algorithm (SPFA)

- <LC id='1334' type='long' ></LC> 
- <LC id='1514' type='long' ></LC> 

## Stack

- <LC id='20' type='long' ></LC> 
- <LC id='32' type='long' ></LC> 
- <LC id='42' type='long' ></LC> 
- <LC id='71' type='long' ></LC> 
- <LC id='150' type='long' ></LC> 
- <LC id='155' type='long' ></LC> 
- <LC id='224' type='long' ></LC> 
- <LC id='227' type='long' ></LC> 
- <LC id='232' type='long' ></LC> 
- <LC id='316' type='long' ></LC> 
- <LC id='341' type='long' ></LC> 
- <LC id='383' type='long' ></LC> 
- <LC id='394' type='long' ></LC> 
- <LC id='402' type='long' ></LC> 
- <LC id='445' type='long' ></LC> 
- <LC id='456' type='long' ></LC> 
- <LC id='484' type='long' ></LC> 
- <LC id='503' type='long' ></LC> 
- <LC id='536' type='long' ></LC> 
- <LC id='581' type='long' ></LC> 
- <LC id='590' type='long' ></LC> 
- <LC id='591' type='long' ></LC> 
- <LC id='606' type='long' ></LC> 
- <LC id='636' type='long' ></LC> 
- <LC id='678' type='long' ></LC> 
- <LC id='682' type='long' ></LC> 
- <LC id='726' type='long' ></LC> 
- <LC id='735' type='long' ></LC> 
- <LC id='772' type='long' ></LC> 
- <LC id='856' type='long' ></LC> 
- <LC id='895' type='long' ></LC> 
- <LC id='917' type='long' ></LC> 
- <LC id='1047' type='long' ></LC> 
- <LC id='1106' type='long' ></LC> 
- <LC id='1209' type='long' ></LC> 
- <LC id='1249' type='long' ></LC> 
- <LC id='1265' type='long' ></LC> 
- <LC id='1472' type='long' ></LC> 
- <LC id='1544' type='long' ></LC> 
- <LC id='1598' type='long' ></LC> 
- <LC id='1614' type='long' ></LC> 
- <LC id='1653' type='long' ></LC> 
- <LC id='1700' type='long' ></LC> 
- <LC id='1717' type='long' ></LC> 
- <LC id='1963' type='long' ></LC> 
- <LC id='2000' type='long' ></LC> 
- <LC id='2116' type='long' ></LC> 
- <LC id='2130' type='long' ></LC> 
- <LC id='2390' type='long' ></LC> 
- <LC id='2487' type='long' ></LC> 
- <LC id='2696' type='long' ></LC> 
- <LC id='2751' type='long' ></LC> 
- <LC id='2816' type='long' ></LC> 

## Suffix array

- <LC id='1062' type='long' ></LC> 

## Suffix product

- <LC id='238' type='long' ></LC> 

## Suffix sum

- <LC id='2134' type='long' ></LC> 

## Tarjan

- <LC id='1568' type='long' ></LC> 

## Ternary search

- <LC id='374' type='long' ></LC> 

## Three pointers

- <LC id='75' type='long' ></LC> 
- <LC id='88' type='long' ></LC> 
- <LC id='414' type='long' ></LC> 
- <LC id='689' type='long' ></LC> 
- <LC id='923' type='long' ></LC> 
- <LC id='1213' type='long' ></LC> 
- <LC id='1214' type='long' ></LC> 
- <LC id='1653' type='long' ></LC> 

## Timsort

- <LC id='179' type='long' ></LC> 

## Topological sort

- <LC id='207' type='long' ></LC> 
- <LC id='210' type='long' ></LC> 
- <LC id='269' type='long' ></LC> 
- <LC id='310' type='long' ></LC> 
- <LC id='329' type='long' ></LC> 
- <LC id='631' type='long' ></LC> 
- <LC id='802' type='long' ></LC> 
- <LC id='1136' type='long' ></LC> 
- <LC id='1203' type='long' ></LC> 
- <LC id='1857' type='long' ></LC> 
- <LC id='2050' type='long' ></LC> 
- <LC id='2192' type='long' ></LC> 
- <LC id='2360' type='long' ></LC> 
- <LC id='2392' type='long' ></LC> 
- <LC id='2872' type='long' ></LC> 
- <LC id='3203' type='long' ></LC> 

## Topological sort (longest path)

- <LC id='1136' type='long' ></LC> 

## Tree hash

- <LC id='572' type='long' ></LC> 

## Tree map

- <LC id='975' type='long' ></LC> 
- <LC id='1244' type='long' ></LC> 
- <LC id='1425' type='long' ></LC> 

## Tree (n-ary)

- <LC id='1522' type='long' ></LC> 

## Trie

- <LC id='139' type='long' ></LC> 
- <LC id='140' type='long' ></LC> 
- <LC id='208' type='long' ></LC> 
- <LC id='211' type='long' ></LC> 
- <LC id='212' type='long' ></LC> 
- <LC id='336' type='long' ></LC> 
- <LC id='421' type='long' ></LC> 
- <LC id='425' type='long' ></LC> 
- <LC id='440' type='long' ></LC> 
- <LC id='527' type='long' ></LC> 
- <LC id='642' type='long' ></LC> 
- <LC id='648' type='long' ></LC> 
- <LC id='677' type='long' ></LC> 
- <LC id='692' type='long' ></LC> 
- <LC id='720' type='long' ></LC> 
- <LC id='745' type='long' ></LC> 
- <LC id='820' type='long' ></LC> 
- <LC id='1032' type='long' ></LC> 
- <LC id='1065' type='long' ></LC> 
- <LC id='1166' type='long' ></LC> 
- <LC id='1178' type='long' ></LC> 
- <LC id='1233' type='long' ></LC> 
- <LC id='1268' type='long' ></LC> 
- <LC id='1408' type='long' ></LC> 
- <LC id='1455' type='long' ></LC> 
- <LC id='1858' type='long' ></LC> 
- <LC id='2168' type='long' ></LC> 
- <LC id='2185' type='long' ></LC> 
- <LC id='2352' type='long' ></LC> 
- <LC id='2416' type='long' ></LC> 
- <LC id='2707' type='long' ></LC> 
- <LC id='3042' type='long' ></LC> 
- <LC id='3043' type='long' ></LC> 

## Two pointer

- <LC id='11' type='long' ></LC> 
- <LC id='15' type='long' ></LC> 
- <LC id='16' type='long' ></LC> 
- <LC id='18' type='long' ></LC> 
- <LC id='26' type='long' ></LC> 
- <LC id='27' type='long' ></LC> 
- <LC id='42' type='long' ></LC> 
- <LC id='86' type='long' ></LC> 
- <LC id='125' type='long' ></LC> 
- <LC id='160' type='long' ></LC> 
- <LC id='165' type='long' ></LC> 
- <LC id='167' type='long' ></LC> 
- <LC id='214' type='long' ></LC> 
- <LC id='234' type='long' ></LC> 
- <LC id='245' type='long' ></LC> 
- <LC id='246' type='long' ></LC> 
- <LC id='251' type='long' ></LC> 
- <LC id='259' type='long' ></LC> 
- <LC id='281' type='long' ></LC> 
- <LC id='283' type='long' ></LC> 
- <LC id='295' type='long' ></LC> 
- <LC id='344' type='long' ></LC> 
- <LC id='345' type='long' ></LC> 
- <LC id='349' type='long' ></LC> 
- <LC id='360' type='long' ></LC> 
- <LC id='392' type='long' ></LC> 
- <LC id='455' type='long' ></LC> 
- <LC id='480' type='long' ></LC> 
- <LC id='484' type='long' ></LC> 
- <LC id='532' type='long' ></LC> 
- <LC id='557' type='long' ></LC> 
- <LC id='632' type='long' ></LC> 
- <LC id='678' type='long' ></LC> 
- <LC id='680' type='long' ></LC> 
- <LC id='708' type='long' ></LC> 
- <LC id='777' type='long' ></LC> 
- <LC id='826' type='long' ></LC> 
- <LC id='830' type='long' ></LC> 
- <LC id='844' type='long' ></LC> 
- <LC id='845' type='long' ></LC> 
- <LC id='849' type='long' ></LC> 
- <LC id='876' type='long' ></LC> 
- <LC id='925' type='long' ></LC> 
- <LC id='950' type='long' ></LC> 
- <LC id='962' type='long' ></LC> 
- <LC id='977' type='long' ></LC> 
- <LC id='1055' type='long' ></LC> 
- <LC id='1099' type='long' ></LC> 
- <LC id='1209' type='long' ></LC> 
- <LC id='1214' type='long' ></LC> 
- <LC id='1229' type='long' ></LC> 
- <LC id='1332' type='long' ></LC> 
- <LC id='1455' type='long' ></LC> 
- <LC id='1497' type='long' ></LC> 
- <LC id='1498' type='long' ></LC> 
- <LC id='1544' type='long' ></LC> 
- <LC id='1574' type='long' ></LC> 
- <LC id='1578' type='long' ></LC> 
- <LC id='1634' type='long' ></LC> 
- <LC id='1658' type='long' ></LC> 
- <LC id='1669' type='long' ></LC> 
- <LC id='1679' type='long' ></LC> 
- <LC id='1695' type='long' ></LC> 
- <LC id='1750' type='long' ></LC> 
- <LC id='1768' type='long' ></LC> 
- <LC id='1813' type='long' ></LC> 
- <LC id='1855' type='long' ></LC> 
- <LC id='1885' type='long' ></LC> 
- <LC id='1940' type='long' ></LC> 
- <LC id='1957' type='long' ></LC> 
- <LC id='2000' type='long' ></LC> 
- <LC id='2095' type='long' ></LC> 
- <LC id='2108' type='long' ></LC> 
- <LC id='2109' type='long' ></LC> 
- <LC id='2149' type='long' ></LC> 
- <LC id='2181' type='long' ></LC> 
- <LC id='2300' type='long' ></LC> 
- <LC id='2337' type='long' ></LC> 
- <LC id='2390' type='long' ></LC> 
- <LC id='2441' type='long' ></LC> 
- <LC id='2444' type='long' ></LC> 
- <LC id='2485' type='long' ></LC> 
- <LC id='2486' type='long' ></LC> 
- <LC id='2540' type='long' ></LC> 
- <LC id='2563' type='long' ></LC> 
- <LC id='2762' type='long' ></LC> 
- <LC id='2774' type='long' ></LC> 
- <LC id='2775' type='long' ></LC> 
- <LC id='2776' type='long' ></LC> 
- <LC id='2777' type='long' ></LC> 
- <LC id='2816' type='long' ></LC> 
- <LC id='2825' type='long' ></LC> 
- <LC id='2938' type='long' ></LC> 
- <LC id='3062' type='long' ></LC> 

## Union-find

- <LC id='200' type='long' ></LC> 
- <LC id='218' type='long' ></LC> 
- <LC id='261' type='long' ></LC> 
- <LC id='305' type='long' ></LC> 
- <LC id='323' type='long' ></LC> 
- <LC id='399' type='long' ></LC> 
- <LC id='547' type='long' ></LC> 
- <LC id='684' type='long' ></LC> 
- <LC id='721' type='long' ></LC> 
- <LC id='737' type='long' ></LC> 
- <LC id='803' type='long' ></LC> 
- <LC id='839' type='long' ></LC> 
- <LC id='886' type='long' ></LC> 
- <LC id='924' type='long' ></LC> 
- <LC id='928' type='long' ></LC> 
- <LC id='947' type='long' ></LC> 
- <LC id='952' type='long' ></LC> 
- <LC id='959' type='long' ></LC> 
- <LC id='990' type='long' ></LC> 
- <LC id='1061' type='long' ></LC> 
- <LC id='1101' type='long' ></LC> 
- <LC id='1202' type='long' ></LC> 
- <LC id='1319' type='long' ></LC> 
- <LC id='1361' type='long' ></LC> 
- <LC id='1579' type='long' ></LC> 
- <LC id='1631' type='long' ></LC> 
- <LC id='1632' type='long' ></LC> 
- <LC id='1697' type='long' ></LC> 
- <LC id='1905' type='long' ></LC> 
- <LC id='1970' type='long' ></LC> 
- <LC id='1971' type='long' ></LC> 
- <LC id='2092' type='long' ></LC> 
- <LC id='2316' type='long' ></LC> 
- <LC id='2368' type='long' ></LC> 
- <LC id='2421' type='long' ></LC> 
- <LC id='2492' type='long' ></LC> 
- <LC id='2782' type='long' ></LC> 
- <LC id='2852' type='long' ></LC> 

## Vertical scanning

- <LC id='14' type='long' ></LC> 

## Warnsdorff rule

- <LC id='2664' type='long' ></LC> 

## Wormhole teleportation

- <LC id='1190' type='long' ></LC> 
