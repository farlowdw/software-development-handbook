---
title: Templates for Data Structures and Algorithms
hide_title: false
sidebar_label: Data structures and algorithms
description: Templates for data structures and algorithms with worked solutions to various problems
draft: false
tags: 
  - Templates
keywords: 
  - template
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import TOCInline from '@theme/TOCInline';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import LC from '@site/src/components/LC';
import ImageCarousel from '@site/src/components/ImageCarousel';
import BibRef from '@site/src/components/BibRef';
import MyStar from '@site/src/components/MyStar';

<!-- TEMPLATES -->
<!-- trees -->
import TraverseAndAccumulateTreeTemplate from '@site/docs/_Partials/templates/trees/trees-traverse-and-accumulate.md';
import InductionTreeTemplate from '@site/docs/_Partials/templates/trees/trees-induction.md';
import InductionTACCombinedTreeTemplate from '@site/docs/_Partials/templates/trees/trees-combine-induction-and-tac.md';
import InductionTACCombinedTreeTemplateLong from '@site/docs/_Partials/templates/trees/trees-combine-induction-and-tac-long.md';

<!-- TEMPLATE SNIPPETS -->
<!-- trees -->
import PreorderIterativeAnalogy from '@site/docs/_Partials/template-snippets/trees/preorder-iterative-analogy.md';
import PostorderIterativeAnalogy from '@site/docs/_Partials/template-snippets/trees/postorder-iterative-analogy.md';
import InorderIterativeAnalogy from '@site/docs/_Partials/template-snippets/trees/inorder-iterative-analogy.md';
import CombiningInductionAndTACTemplates from '@site/docs/_Partials/template-snippets/trees/combining-induction-and-tac-templates.md';

<!-- TEMPLATE REMARKS -->
import HashingPrefixesTemplateRemark from '@site/docs/_Partials/template-remarks/hashing-prefixes.md';
import LinkedListNodeComparisons from '@site/docs/_Partials/template-remarks/linked-list-node-comparisons.md';
import LinkedListPointerManipulation from '@site/docs/_Partials/template-remarks/linked-list-pointer-manipulation.md';
import LinkedListSentinelNodes from '@site/docs/_Partials/template-remarks/linked-list-sentinel-nodes.md';
import LinkedListVisualizeSinglyLinkedList from '@site/docs/_Partials/template-remarks/linked-list-visualize-singly-linked-list.md';

<!-- TEMPLATE SOLUTIONS (NON-LEETCODE PROBLEMS) -->
import Sol1NoLC from '@site/docs/_Partials/template-solutions/trees/q1.md';
import Sol2NoLC from '@site/docs/_Partials/template-solutions/trees/q2.md';
import Sol3NoLC from '@site/docs/_Partials/template-solutions/trees/q3.md';
import Sol4NoLC from '@site/docs/_Partials/template-solutions/trees/q4.md';
import Sol5NoLC from '@site/docs/_Partials/template-solutions/trees/q5.md';
import Sol6NoLC from '@site/docs/_Partials/template-solutions/trees/q6.md';
import Sol7NoLC from '@site/docs/_Partials/template-solutions/trees/q7.md';
import Sol8NoLC from '@site/docs/_Partials/template-solutions/trees/q8.md';
import Sol9NoLC from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/q1.md';
import Sol10NoLC from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/q2.md';
import Sol11NoLC from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/q1.md';
import Sol12NoLC from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/q1.md';
import Sol13NoLC from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/q2.md';
import Sol14NoLC from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/outside-main/q1.md';
import Sol15NoLC from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/within-main/q1.md';
import Sol16NoLC from '@site/docs/_Partials/template-solutions/misc/prefix-sum/q1.md';
import Sol17NoLC from '@site/docs/_Partials/template-solutions/misc/hashing/counting/q1.md';
import Sol18NoLC from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/q1.md';
import Sol19NoLC from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/q2.md';

<!-- TEMPLATE SOLUTIONS (LEETCODE PROBLEMS) -->
<!-- 1 - 99 -->
import LC1TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1.md';
import LC3TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-3.md';
import LC15TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-15.md';
import LC19TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-19.md';
import LC20TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-20.md';
import LC24TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-24.md';
import LC24TSol2 from '@site/docs/_Partials/template-solutions/linked-lists/swap-nodes/lc-24.md';
import LC25TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse-k-nodes/lc-25.md';
import LC26TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-26.md';
import LC27TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-27.md';
import LC49TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-49.md';
import LC71TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-71.md';
import LC74TSol from '@site/docs/_Partials/template-solutions/binary-search/lc-74.md';
import LC74TSol2 from '@site/docs/_Partials/template-solutions/matrices/lc-74.md';
import LC75TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-75.md';
import LC82TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-82.md';
import LC83TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-83.md';
import LC92TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse-k-nodes/lc-92.md';
import LC94TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-94.md';
import LC94TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-94.md';

<!-- 100 - 199 -->
import LC104TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-104.md';
import LC125TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-125.md';
import LC141TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-141.md';
import LC142TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-142.md';
import LC144TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-144.md';
import LC144TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-144.md';
import LC145TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-145.md';
import LC145TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-145.md';
import LC155TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-155.md';
import LC167TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-167.md';

<!-- 200 - 299 -->
import LC203TSol from '@site/docs/_Partials/template-solutions/linked-lists/general/lc-203.md';
import LC205TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-205.md';
import LC206TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-206.md';
import LC209TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-209.md';
import LC217TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-217.md';
import LC225TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-225.md';
import LC226TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-226.md';
import LC232TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-232.md';
import LC234TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-234.md';
import LC239TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-239.md';
import LC268TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-268.md';
import LC283TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-283.md';
import LC290TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-290.md';

<!-- 300 - 399 -->
import LC303TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-303.md';
import LC328TSol from '@site/docs/_Partials/template-solutions/linked-lists/general/lc-328.md';
import LC344TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-344.md';
import LC346TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-346.md';
import LC349TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-349.md';
import LC350TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-350.md';
import LC383TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-383.md';
import LC392TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-392.md';

<!-- 400 - 499 -->
import LC496TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-496.md';

<!-- 500 - 599 -->
import LC503TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-503.md';
import LC525TSol from '@site/docs/_Partials/template-solutions/misc/hashing/prefixes/lc-525.md';
import LC543TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-543.md';
import LC557TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-557.md';
import LC560TSol from '@site/docs/_Partials/template-solutions/misc/hashing/prefixes/lc-560.md';
import LC563TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-563.md';

<!-- 600 - 699 -->
import LC643TSol from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/outside-main/lc-643.md';
import LC643TSol2 from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/within-main/lc-643.md';
import LC649TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-649.md';

<!-- 700 - 799 -->
import LC704TSol from '@site/docs/_Partials/template-solutions/binary-search/lc-704.md';
import LC713TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-713.md';
import LC724TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-724.md';
import LC735TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-735.md';
import LC739TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-739.md';
import LC746TSol from '@site/docs/_Partials/template-solutions/dp/memoization/lc-746.md';
import LC771TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-771.md';
import LC791TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-791.md';

<!-- 800 - 899 -->
import LC844TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-844.md';
import LC844TSol2 from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-844.md';
import LC876TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-876.md';

<!-- 900 - 999 -->
import LC901TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-901.md';
import LC905TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-905.md';
import LC907TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-907.md';
import LC912TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-912.md';
import LC917TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-917.md';
import LC933TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-933.md';
import LC946TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-946.md';
import LC965TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-965.md';
import LC977TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-977.md';
import LC986TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-986.md';

<!-- 1000 - 1099 -->
import LC1004TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-1004.md';
import LC1047TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-1047.md';
import LC1063TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1063.md';

<!-- 1100 - 1199 -->
import LC1133TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-1133.md';
import LC1189TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-1189.md';

<!-- 1200 - 1299 -->
import LC1208TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-1208.md';
import LC1248TSol from '@site/docs/_Partials/template-solutions/misc/hashing/prefixes/lc-1248.md';
import LC1290TSol from '@site/docs/_Partials/template-solutions/linked-lists/general/lc-1290.md';

<!-- 1300 - 1399 -->
<!-- 1400 - 1499 -->
import LC1413TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-1413.md';
import LC1426TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1426.md';
import LC1436TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1436.md';
import LC1438TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1438.md';
import LC1456TSol from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/outside-main/lc-1456.md';
import LC1475TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1475.md';
import LC1480TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-1480.md';
import LC1496TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1496.md';

<!-- 1500 - 1599 -->
import LC1544TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-1544.md';

<!-- 1600 - 1699 -->
import LC1657TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1657.md';
import LC1673TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1673.md';

<!-- 1700 - 1799 -->
import LC1721TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-1721.md';
import LC1721TSol2 from '@site/docs/_Partials/template-solutions/linked-lists/swap-nodes/lc-1721.md';
import LC1732TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-1732.md';

<!-- 1800 - 1899 -->
import LC1832TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1832.md';
import LC1845TSol from '@site/docs/_Partials/template-solutions/heaps/lc-1845.md';

<!-- 1900 - 1999 -->
import LC1941TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-1941.md';
import LC1944TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1944.md';

<!-- 2000 - 2099 -->
import LC2000TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-2000.md';
import LC2074TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse-k-nodes/lc-2074.md';
import LC2090TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-2090.md';
import LC2095TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-2095.md';

<!-- 2100 - 2199 -->
import LC2104TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-2104.md';
import LC2130TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-2130.md';

<!-- 2200 - 2299 -->
import LC2225TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2225.md';
import LC2248TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2248.md';
import LC2260TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2260.md';
import LC2270TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-2270.md';

<!-- 2300 - 2399 -->
import LC2300TSol from '@site/docs/_Partials/template-solutions/binary-search/lc-2300.md';
import LC2342TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2342.md';
import LC2351TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-2351.md';
import LC2352TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-2352.md';
import LC2390TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-2390.md';
import LC2398TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-2398.md';

<!-- 2400 - 2499 -->
import LC2434TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-2434.md';

<!-- 2500 - 2599 -->
import LC2540TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-2540.md';

<!-- 2600 - 2699 -->
<!-- 2700 - 2799 -->
<!-- 2800 - 2899 -->
<!-- 2900 - 2999 -->
<!-- 3000 - 3099 -->
import LC3090TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-3090.md';

<!-- 3100 - 3199 -->
import LC3105TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-3105.md';

<!-- PROBLEM STEMS -->
<!-- 1 - 99 -->
import LC1PS from '@site/docs/_Partials/problem-stems/lc1.md';
import LC3PS from '@site/docs/_Partials/problem-stems/lc3.md';
import LC15PS from '@site/docs/_Partials/problem-stems/lc15.md';
import LC19PS from '@site/docs/_Partials/problem-stems/lc19.md';
import LC20PS from '@site/docs/_Partials/problem-stems/lc20.md';
import LC24PS from '@site/docs/_Partials/problem-stems/lc24.md';
import LC25PS from '@site/docs/_Partials/problem-stems/lc25.md';
import LC26PS from '@site/docs/_Partials/problem-stems/lc26.md';
import LC27PS from '@site/docs/_Partials/problem-stems/lc27.md';
import LC49PS from '@site/docs/_Partials/problem-stems/lc49.md';
import LC71PS from '@site/docs/_Partials/problem-stems/lc71.md';
import LC74PS from '@site/docs/_Partials/problem-stems/lc74.md';
import LC75PS from '@site/docs/_Partials/problem-stems/lc75.md';
import LC82PS from '@site/docs/_Partials/problem-stems/lc82.md';
import LC83PS from '@site/docs/_Partials/problem-stems/lc83.md';
import LC92PS from '@site/docs/_Partials/problem-stems/lc92.md';
import LC94PS from '@site/docs/_Partials/problem-stems/lc94.md';

<!-- 100 - 199 -->
import LC104PS from '@site/docs/_Partials/problem-stems/lc104.md';
import LC125PS from '@site/docs/_Partials/problem-stems/lc125.md';
import LC141PS from '@site/docs/_Partials/problem-stems/lc141.md';
import LC142PS from '@site/docs/_Partials/problem-stems/lc142.md';
import LC144PS from '@site/docs/_Partials/problem-stems/lc144.md';
import LC145PS from '@site/docs/_Partials/problem-stems/lc145.md';
import LC155PS from '@site/docs/_Partials/problem-stems/lc155.md';
import LC167PS from '@site/docs/_Partials/problem-stems/lc167.md';

<!-- 200 - 299 -->
import LC203PS from '@site/docs/_Partials/problem-stems/lc203.md';
import LC205PS from '@site/docs/_Partials/problem-stems/lc205.md';
import LC206PS from '@site/docs/_Partials/problem-stems/lc206.md';
import LC209PS from '@site/docs/_Partials/problem-stems/lc209.md';
import LC217PS from '@site/docs/_Partials/problem-stems/lc217.md';
import LC225PS from '@site/docs/_Partials/problem-stems/lc225.md';
import LC226PS from '@site/docs/_Partials/problem-stems/lc226.md';
import LC232PS from '@site/docs/_Partials/problem-stems/lc232.md';
import LC234PS from '@site/docs/_Partials/problem-stems/lc234.md';
import LC239PS from '@site/docs/_Partials/problem-stems/lc239.md';
import LC268PS from '@site/docs/_Partials/problem-stems/lc268.md';
import LC283PS from '@site/docs/_Partials/problem-stems/lc283.md';
import LC290PS from '@site/docs/_Partials/problem-stems/lc290.md';

<!-- 300 - 399 -->
import LC303PS from '@site/docs/_Partials/problem-stems/lc303.md';
import LC328PS from '@site/docs/_Partials/problem-stems/lc328.md';
import LC344PS from '@site/docs/_Partials/problem-stems/lc344.md';
import LC346PS from '@site/docs/_Partials/problem-stems/lc346.md';
import LC349PS from '@site/docs/_Partials/problem-stems/lc349.md';
import LC350PS from '@site/docs/_Partials/problem-stems/lc350.md';
import LC383PS from '@site/docs/_Partials/problem-stems/lc383.md';
import LC392PS from '@site/docs/_Partials/problem-stems/lc392.md';

<!-- 400 - 499 -->
import LC496PS from '@site/docs/_Partials/problem-stems/lc496.md';

<!-- 500 - 599 -->
import LC503PS from '@site/docs/_Partials/problem-stems/lc503.md';
import LC525PS from '@site/docs/_Partials/problem-stems/lc525.md';
import LC543PS from '@site/docs/_Partials/problem-stems/lc543.md';
import LC557PS from '@site/docs/_Partials/problem-stems/lc557.md';
import LC560PS from '@site/docs/_Partials/problem-stems/lc560.md';
import LC563PS from '@site/docs/_Partials/problem-stems/lc563.md';

<!-- 600 - 699 -->
import LC643PS from '@site/docs/_Partials/problem-stems/lc643.md';
import LC649PS from '@site/docs/_Partials/problem-stems/lc649.md';

<!-- 700 - 799 -->
import LC704PS from '@site/docs/_Partials/problem-stems/lc704.md';
import LC713PS from '@site/docs/_Partials/problem-stems/lc713.md';
import LC724PS from '@site/docs/_Partials/problem-stems/lc724.md';
import LC735PS from '@site/docs/_Partials/problem-stems/lc735.md';
import LC739PS from '@site/docs/_Partials/problem-stems/lc739.md';
import LC746PS from '@site/docs/_Partials/problem-stems/lc746.md';
import LC771PS from '@site/docs/_Partials/problem-stems/lc771.md';
import LC791PS from '@site/docs/_Partials/problem-stems/lc791.md';

<!-- 800 - 899 -->
import LC844PS from '@site/docs/_Partials/problem-stems/lc844.md';
import LC876PS from '@site/docs/_Partials/problem-stems/lc876.md';

<!-- 900 - 999 -->
import LC901PS from '@site/docs/_Partials/problem-stems/lc901.md';
import LC905PS from '@site/docs/_Partials/problem-stems/lc905.md';
import LC907PS from '@site/docs/_Partials/problem-stems/lc907.md';
import LC912PS from '@site/docs/_Partials/problem-stems/lc912.md';
import LC917PS from '@site/docs/_Partials/problem-stems/lc917.md';
import LC933PS from '@site/docs/_Partials/problem-stems/lc933.md';
import LC946PS from '@site/docs/_Partials/problem-stems/lc946.md';
import LC965PS from '@site/docs/_Partials/problem-stems/lc965.md';
import LC977PS from '@site/docs/_Partials/problem-stems/lc977.md';
import LC986PS from '@site/docs/_Partials/problem-stems/lc986.md';

<!-- 1000 - 1099 -->
import LC1004PS from '@site/docs/_Partials/problem-stems/lc1004.md';
import LC1047PS from '@site/docs/_Partials/problem-stems/lc1047.md';
import LC1063PS from '@site/docs/_Partials/problem-stems/lc1063.md';

<!-- 1100 - 1199 -->
import LC1133PS from '@site/docs/_Partials/problem-stems/lc1133.md';
import LC1189PS from '@site/docs/_Partials/problem-stems/lc1189.md';

<!-- 1200 - 1299 -->
import LC1208PS from '@site/docs/_Partials/problem-stems/lc1208.md';
import LC1248PS from '@site/docs/_Partials/problem-stems/lc1248.md';
import LC1290PS from '@site/docs/_Partials/problem-stems/lc1290.md';

<!-- 1300 - 1399 -->
<!-- 1400 - 1499 -->
import LC1413PS from '@site/docs/_Partials/problem-stems/lc1413.md';
import LC1426PS from '@site/docs/_Partials/problem-stems/lc1426.md';
import LC1436PS from '@site/docs/_Partials/problem-stems/lc1436.md';
import LC1438PS from '@site/docs/_Partials/problem-stems/lc1438.md';
import LC1456PS from '@site/docs/_Partials/problem-stems/lc1456.md';
import LC1475PS from '@site/docs/_Partials/problem-stems/lc1475.md';
import LC1480PS from '@site/docs/_Partials/problem-stems/lc1480.md';
import LC1496PS from '@site/docs/_Partials/problem-stems/lc1496.md';

<!-- 1500 - 1599 -->
import LC1544PS from '@site/docs/_Partials/problem-stems/lc1544.md';

<!-- 1600 - 1699 -->
import LC1657PS from '@site/docs/_Partials/problem-stems/lc1657.md';
import LC1673PS from '@site/docs/_Partials/problem-stems/lc1673.md';

<!-- 1700 - 1799 -->
import LC1721PS from '@site/docs/_Partials/problem-stems/lc1721.md';
import LC1732PS from '@site/docs/_Partials/problem-stems/lc1732.md';

<!-- 1800 - 1899 -->
import LC1832PS from '@site/docs/_Partials/problem-stems/lc1832.md';
import LC1845PS from '@site/docs/_Partials/problem-stems/lc1845.md';

<!-- 1900 - 1999 -->
import LC1941PS from '@site/docs/_Partials/problem-stems/lc1941.md';
import LC1944PS from '@site/docs/_Partials/problem-stems/lc1944.md';

<!-- 2000 - 2099 -->
import LC2000PS from '@site/docs/_Partials/problem-stems/lc2000.md';
import LC2074PS from '@site/docs/_Partials/problem-stems/lc2074.md';
import LC2090PS from '@site/docs/_Partials/problem-stems/lc2090.md';
import LC2095PS from '@site/docs/_Partials/problem-stems/lc2095.md';

<!-- 2100 - 2199 -->
import LC2104PS from '@site/docs/_Partials/problem-stems/lc2104.md';
import LC2130PS from '@site/docs/_Partials/problem-stems/lc2130.md';

<!-- 2200 - 2299 -->
import LC2225PS from '@site/docs/_Partials/problem-stems/lc2225.md';
import LC2248PS from '@site/docs/_Partials/problem-stems/lc2248.md';
import LC2260PS from '@site/docs/_Partials/problem-stems/lc2260.md';
import LC2270PS from '@site/docs/_Partials/problem-stems/lc2270.md';

<!-- 2300 - 2399 -->
import LC2300PS from '@site/docs/_Partials/problem-stems/lc2300.md';
import LC2342PS from '@site/docs/_Partials/problem-stems/lc2342.md';
import LC2351PS from '@site/docs/_Partials/problem-stems/lc2351.md';
import LC2352PS from '@site/docs/_Partials/problem-stems/lc2352.md';
import LC2390PS from '@site/docs/_Partials/problem-stems/lc2390.md';
import LC2398PS from '@site/docs/_Partials/problem-stems/lc2398.md';

<!-- 2400 - 2499 -->
import LC2434PS from '@site/docs/_Partials/problem-stems/lc2434.md';

<!-- 2500 - 2599 -->
import LC2540PS from '@site/docs/_Partials/problem-stems/lc2540.md';

<!-- 2600 - 2699 -->
<!-- 2700 - 2799 -->
<!-- 2800 - 2899 -->
<!-- 2900 - 2999 -->
<!-- 3000 - 3099 -->
import LC3090PS from '@site/docs/_Partials/problem-stems/lc3090.md';

<!-- 3100 - 3199 -->
import LC3105PS from '@site/docs/_Partials/problem-stems/lc3105.md';

## Contents

:::info Exercise symbol legend

| Symbol | Designation |
| :-: | :-- |
| &check; | This is a problem from [LeetCode's interview crash course.](https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/) |
| &malt; | This is a problem stemming from work done through [Interviewing IO](https://interviewing.io/learn). |
| &starf; | A right-aligned &starf; (one or more) indicates my own personal designation as to the problem's relevance, importance, priority in review, etc. |

:::

<TOCInline 
  toc={[ ... toc.filter(({level, value}, _, arr) => ( level == 2 || level == 3) && !value.startsWith('Contents')) ]}
/>

## Backtracking

<details>
<summary> Remarks</summary>

TBD

</details>

```python
def backtrack(curr, OTHER_ARGUMENTS...):
    if (BASE_CASE):
        # modify the answer
        return
    
    ans = 0
    for (ITERATE_OVER_INPUT):
        # modify the current state
        ans += backtrack(curr, OTHER_ARGUMENTS...)
        # undo the modification of the current state
    
    return ans
```

<details>
<summary> Examples</summary>

TBD

</details>

## Binary search

### Find first target index (if it exists) {#bs-template}

<details>
<summary> Remarks</summary>

This template will return the first index where `target` is encountered. If duplicates are present, then the index returned is effectively random (i.e., the `target` matched/identified by means of the search could be neither the leftmost occurrence nor the rightmost occurrence but somewhere in between). If no match is found, then the return value, `left`, will point to the insertion point where `target` would need to be inserted in order to maintain the sorted property of `arr`.

</details>

```python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] > target:
            right = mid - 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            return mid

    return left
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='704' type='long' ></LC> </summary>

<LC704PS />

---

<LC704TSol />

</details>

<details>
<summary> <LC id='74' type='long' ></LC> </summary>

<LC74PS />

---

<LC74TSol />

</details>

</details>

### Find leftmost target index (or insertion point) {#bs-template-left}

<details>
<summary> Remarks</summary>

This template ensures we find the leftmost occurrence (i.e., minimum index value) of `target` (if it exists). If `target` does not exist in the input array, `arr`, then this template will return the index at which `target` should be inserted to maintain the ordered property of `arr`.

How does this work? What happens if it's ever the case that `arr[mid] == target` in the template function above? It's the *right* half that gets collapsed, by means of `right = mid`, thus pushing the search space *as far left as possible*.

:::tip Computing total number of elements within input array less than target value

The `left` value returned by the function in the template above is also the number of elements in `arr` that are less than `target`.

This should make sense upon some reflection &#8212; if the function in our template returns the left-most occurrence of the `target` value as well as the insertion point of `target` to keep the sorted property of `arr`, then it must be the case that *all* values to the left of the returned value are less than `target`. The fact that arrays are 0-indexed helps here; for example, if our template function returns `3`, then this means the three elements at index `0`, `1`, and `2` are all less than `target`.

:::

</details>

```python
def binary_search_leftmost(arr, target):
    left = 0
    right = len(arr)

    while left < right:
        mid = left + (right - left) // 2

        if target <= arr[mid]:
            right = mid
        else:
            left = mid + 1

    return left
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='2300' type='long' ></LC> </summary>

<LC2300PS />

---

<LC2300TSol />

</details>

</details>

### Find rightmost target index {#bs-template-right}

<details>
<summary> Remarks</summary>

This template ensures we find the rightmost occurrence (i.e., maximum index value) of `target` (if it exists). If `target` does not exist in the input array, `arr`, then this template will return the index before which `target` should be inserted to maintain the ordered property of `arr` (i.e., `left` will return the proper insertion point as opposed to `left - 1`).

How does this work? What happens if it's ever the case that `arr[mid] == target` in the template function above? It's the *left* half that gets collapsed, by means of `left = mid + 1`, thus pushing the search space *as far right as possible*.

:::tip Computing total number of elements within input array greater than target value (as well as insertion point)

Consider the following sorted array: `[4, 6, 8, 8, 8, 10, 12, 13]`. If we applied the function in the template above to this array with a target value of `8`, then the index returned would be `4`, the index of the right-most target value `8` in the input array. This simple example illustrates two noteworthy observations:

- **Insertion point:** Add a value of `1` to the return value of the template function to find the appropriate insertion point &#8212; this assumes the desired insertion point is meant to keep the input array sorted as well as for the inserted element to be as far-right as possible.

  In the context of the simple example, this means the insertion point for another `8` would be `4 + 1 = 5`. What if the element to be added is not present? If we wanted to add `9`, then our template function would return `4`. Again, adding `1` to this result gives us our desired insertion point: `4 + 1 = 5`. The correct insertion point will always be the returned value plus `1`.

- **Number of elements greater than target:** If `x` is the return value of our template function, then computing `len(arr) - x + 1` will give us the total number of elements in the input array that are greater than the target.

  In the context of the simple example, how many elements are greater than `8`? There are three such elements, namely `10`, `12`, and `13`; hence, the answer we want is `3`. How can we reliably find the value we desire for all sorted input arrays and target values? 
  
  If our template function returns the right-most index of the target element if it exists or where it would need to be inserted if it doesn't exist, then this means all elements in the input array to the right of this index are greater than the target value. How can we reliably calculate this number? Well, if you're tasked with reading pages 23-27, inclusive, then how many pages are you tasked with reading? It's not `27 - 23 = 4`. You have to read pages 23, 24, 25, 26, and 27 or simply `27 - 23 + 1 = 5`. The same reasoning, albeit slightly nuanced, applies here: If index `x` is the index returned by our function, then how many elements exist from the right of this element to the end of the array, inclusive? The last element in the array has an index of `len(arr) - 1` and the element to the right of the returned value has an index of `x + 1`. Hence, the total number of values shakes out to be

  ```
  (len(arr) - 1) - (x + 1) + 1 = len(arr) - x + 1
  ```

:::

</details>

```python
def binary_search_rightmost(arr, target):
    left = 0
    right = len(arr)

    while left < right:
        mid = left + (right - left) // 2

        if target < arr[mid]:
            right = mid
        else:
            left = mid + 1

    return left - 1
```

### Greedy (looking for minimum)

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>

### Greedy (looking for maximum)

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>

## Dynamic programming

### Memoization (top-down)

<details>
<summary> Remarks</summary>

TBD

</details>

```python
def fn(arr):
    # 1. define a function that will compute/contain
    #   the answer to the problem for any given state
    def dp(STATE):
        # 3. use base cases to make the recurrence relation useful
        if BASE_CASE:
            return 0
        
        if STATE in memo:
            return memo[STATE]
        
        # 2. define a recurrence relation to transition between states
        ans = RECURRENCE_RELATION(STATE)
        memo[STATE] = ans
        return ans

    memo = {}
    return dp(STATE_FOR_WHOLE_INPUT)
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='746' type='long' ></LC> </summary>

<LC746PS />

---

<LC746TSol />

</details>

</details>

### Tabulation (bottom-up)

<details>
<summary> Remarks</summary>

TBD

</details>

```python
def fn(arr):
    # 1. initialize a table (array, list, etc.) 
    #   to store solutions of subproblems.
    dp_table = INITIALIZE_TABLE()

    # 2. fill the base cases into the table.
    dp_table = FILL_BASE_CASES(dp_table)

    # 3. iterate over the table in a specific order 
    #   to fill in the solutions of larger subproblems.
    for STATE in ORDER_OF_STATES:
        dp_table[STATE] = CALCULATE_STATE_FROM_PREVIOUS_STATES(dp_table, STATE)

    # 4. the answer to the whole problem is now in the table, 
    #   typically at the last entry or a specific position.
    return dp_table[FINAL_STATE_OR_POSITION]

# example usage
arr = [INPUT_DATA]
result = fn(arr)
```

<details>
<summary> Examples</summary>

TBD

</details>

## Graphs

### DFS (recursive)

<details>
<summary> Remarks</summary>

Assume the nodes are numbered from `0` to `n - 1` and the graph is given as an adjacency list. Depending on the problem, you may need to convert the input into an equivalent adjacency list before using the templates.

</details>

```python
def fn(graph):
    def dfs(node):
        ans = 0
        # do some logic
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                ans += dfs(neighbor)
        
        return ans

    seen = {START_NODE}
    return dfs(START_NODE)
```

<details>
<summary> Examples</summary>

TBD

</details>

### DFS (iterative)

<details>
<summary> Remarks</summary>

Assume the nodes are numbered from `0` to `n - 1` and the graph is given as an adjacency list. Depending on the problem, you may need to convert the input into an equivalent adjacency list before using the templates.

</details>

```python
def fn(graph):
    stack = [START_NODE]
    seen = {START_NODE}
    ans = 0

    while stack:
        node = stack.pop()
        # do some logic
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                stack.append(neighbor)
    
    return ans
```

<details>
<summary> Examples</summary>

TBD

</details>

### BFS

<details>
<summary> Remarks</summary>

Assume the nodes are numbered from `0` to `n - 1` and the graph is given as an adjacency list. Depending on the problem, you may need to convert the input into an equivalent adjacency list before using the templates.

</details>

```python
from collections import deque

def fn(graph):
    queue = deque([START_NODE])
    seen = {START_NODE}
    ans = 0

    while queue:
        node = queue.popleft()
        # do some logic
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    
    return ans
```

<details>
<summary> Examples</summary>

TBD

</details>

## Heaps

### Initialize heap in O(n) time

<details>
<summary> Remarks</summary>

- **Min heap:** Sometimes it is helpful to initialize our own min heap in such a way that we simply append the smallest elements to a list, one at a time. Time and space: $O(n)$.
- **Max heap:** Python uses a min heap. Hence, we need to add the biggest elements to the heap, in order, but negate them as we do so. Time and space $O(n)$.
- **Heapify (to min heap):** Both approaches above assume we have the luxury of being able to add the minimum or maximum elements to a list and then use that list as a min or max heap, respectively. This is often not the case. We will often want to take an existing list of $n$ elements, `arr`, and modify it in-place to be a heap in $O(n)$ time. This is not a trivial task, as [Python's source code](https://github.com/python/cpython/blob/main/Lib/heapq.py#L170) for the `heapify` method shows. This is not something we want to have to manually implement ourselves. Fortunately, we don't have to!

  Simply use Python's `heapify` method. Time: $O(n)$; space: $O(1)$.
- **Heapify (to max heap):** The `heapify` approach above only applies for a min heap. As noted in [this question](https://stackoverflow.com/q/33024215/5209533), Python's source code actually supports a [`_heapify_max`](https://github.com/python/cpython/blob/main/Lib/heapq.py#L198) method! But there's not similar support for operations like pushing to the max heap. We effectively have two options to utilize the fulle suite of methods available in Python's `heapq` module:

  1. Negate the elements of `arr` in-place. Then use the `heapify` method to simulate a max heap even though Python is technically maintaining a min heap. Time: $O(n)$; space: $O(1)$.
  2. Loop through all elements in `arr`, negating each along the way, and simultaneously use the `heappush` method to push the element to the max heap we are building. Time: $O(n\lg n)$; space: $O(n)$.

  The time cost of the first approach is $O(n + n) = O(2n) = O(n)$ since the initial loop through to negate all numbers is $O(n)$ and the `heapify` method is also $O(n)$. But practically speaking the second method is also fairly effective and more intuitive. But the first option is surely better for coding interviews!

</details>

<Tabs>
<TabItem value='min-heap' label='Min heap'>

```python
min_heap = []
for i in range(n):
    min_heap.append(i)
```

</TabItem>
<TabItem value='max-heap' label='Max heap'>

```python
max_heap = []
for i in range(n - 1, -1, -1):
    max_heap.append(-1 * i)
```

</TabItem>
<TabItem value='heapify-min' label='Heapify (to min heap)'>

```python
import heapq

arr = [ ... ] # n elements
heapq.heapify(arr)
```

</TabItem>
<TabItem value='heapify-max' label='Heapify (to max heap)'>

```python
import heapq

# Approach 1 (negate, heapify in-place); T: O(n); S: O(1)
arr = [ ... ] # n elements
arr = [ -1 * arr[i] for i in range(len(arr)) ] # negate elements in-place
heapq.heapify(arr)

# Approach 2 (negate, build heap); T: O(n lg n); S: O(n)
arr = [ ... ] # n elements
the_heap = []
for num in arr:
  heapq.heappush(the_heap, -1 * num)
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='1845' type='long' ></LC> </summary>

<LC1845PS />

---

<LC1845TSol />

</details>

</details>

## Linked lists

<details>
<summary> What does it mean for two linked list nodes to be "equal"?</summary>

<LinkedListNodeComparisons />

</details>

<details>
<summary> What are sentinel nodes and how can they be useful for solving linked list problems?</summary>

<LinkedListSentinelNodes />

</details>

<details>
<summary> Pointer manipulation and memory indexes</summary>

<LinkedListPointerManipulation />

</details>

<details>
<summary> Visualizing singly linked lists and debugging your code locally</summary>

<LinkedListVisualizeSinglyLinkedList />

</details>

### Fast and slow pointers

<details>
<summary> Remarks</summary>

The "fast and slow" pointer technique is a *two pointer* technique with its own special use cases when it comes to linked lists. Specifically, the idea is that the pointers do not move side by side &#8212; they could move at different "speeds" during iteration, begin iteration from different locations, etc. Whatever the abstract difference is, the important point is that they do not move side by side in unison.

There are many two pointer variations when it comes to arrays and strings, but the fast and slow pointer technique for linked lists usually presents itself as, "move the slow pointer one node per iteration, and move the fast node two nodes per iteration."

</details>

```python
def fn(head):
    slow = head
    fast = head
    ans = 0
    
    while fast and fast.next:
        # some logic
        slow = slow.next
        fast = fast.next.next
        
    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> Return the middle node value of a linked list with an odd number of nodes (&check;) </summary>

<Sol18NoLC />

</details>

<details>
<summary> Return the kth node from the end provided that it exists (&check;) </summary>

<Sol19NoLC />

</details>

<details>
<summary> <LC id='141' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC141PS />

---

<LC141TSol />

</details>

<details>
<summary> <LC id='142' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC142PS />

---

<LC142TSol />

</details>

<details>
<summary> <LC id='876' type='long' ></LC> (&check;) </summary>

<LC876PS />

---

<LC876TSol />

</details>

<details>
<summary> <LC id='83' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC83PS />

---

<LC83TSol />

</details>

<details>
<summary> <LC id='2095' type='long' ></LC> (&check;) </summary>

<LC2095PS />

---

<LC2095TSol />

</details>

<details>
<summary> <LC id='19' type='long' ></LC> (&check;) </summary>

<LC19PS />

---

<LC19TSol />

</details>

<details>
<summary> <LC id='82' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC82PS />

---

<LC82TSol />

</details>

<details>
<summary> <LC id='1721' type='long' ></LC> (&check;) </summary>

<LC1721PS />

---

<LC1721TSol />

</details>

</details>

### Reverse a linked list

<details>
<summary> Remarks</summary>

The template below is the simplest way of reversing a portion of a linked list from a given `node` (potentially the entire list if given the `head` of a linked list). One important observation is that the reversed portion is effectively severed from the rest of the list.

For example:

```python
ex = [1,2,3,4,5,6]        # integer array
head = arr_to_ll(ex)      # convert integer array to linked list
print(fn(head.next.next)) # start reversal from node 3
                          # outcome: 6 -> 5 -> 4 -> 3 -> None
```

Suppose the outcome above is *not* desirable and instead we wanted the reversal to be incorporated into the original list: `1 -> 2 -> 6 -> 5 -> 4 -> 3 -> None`. We clearly need to preserve the node previous to the node where the reversal starts (i.e., the `2` node is a sort of "connecting" node that needs to be preserved). Solving this problem is outside the scope of this template; however, the subsequent template for reversing `k` nodes of a linked list does solve this problem.

</details>

```python
def fn(node):
    prev = None
    curr = node
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='206' type='long' ></LC> (&check;) </summary>

<LC206PS />

---

<LC206TSol />

</details>

<details>
<summary> <LC id='24' type='long' ></LC> (&check;) </summary>

<LC24PS />

---

<LC24TSol />

</details>

<details>
<summary> <LC id='2130' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC2130PS />

---

<LC2130TSol />

</details>

<details>
<summary> <LC id='234' type='long' ></LC> (&check;) </summary>

<LC234PS />

---

<LC234TSol />

</details>

</details>

### Reverse k nodes of a linked list in-place

<details>
<summary> What is the purpose of this template?</summary>

The purpose of the template, of course, is to reverse `k` nodes of a linked list in-place. But, [as this post notes](https://leetcode.com/problems/reverse-nodes-in-even-length-groups/discuss/3832053/Clean-python-solution-simple-beats-100-explanation) (the post that originally motivated this template), the template below *does not* break off the section to be reversed (this is what happens with the conventional reversal, as detailed in the previous template).

The template below leaves the start node of the section linked to the rest of the list and moves the remaining nodes one by one to the front. This results in the `k`-length section (starting at the start node) being reversed, the original start node being the end node of the reversed section, and the original start node being connected to the rest of the list instead of being severed or pointing to `None`. The next remark provides some intuition as to how this actually works.

</details>

<details>
<summary> What is the intuition behind how and why this template works?</summary>

The core idea is actually somewhat simple: given a `prev` node that precedes the start node for the `k`-length section to be reversed, we effectively move the `k - 1` nodes that *follow* the start so that they now come *before* the start node. One at a time. Suppose we want the section `3 -> 4 -> 5 -> 6` to be reversed in the following list (spaces added to emphasize section being reversed):

```
1 -> 2 ->   3 -> 4 -> 5 -> 6   -> 7 -> 8 -> 9 -> None
```

The desired outcome would then be the following list:

```
1 -> 2 ->   6 -> 5 -> 4 -> 3   -> 7 -> 8 -> 9 -> None
```

Above, we see that `k = 4`, `prev` is node `2`, and node `3` is the start of the section to be reversed. Our template stipulates that nodes `4`, `5`, `6`, which originally follow node `3`, will now be moved to come before node `3`. One at a time:

```a
1 -> 2 ->   3 -> 4 -> 5 -> 6   -> 7 -> 8 -> 9 -> None   # start
1 -> 2 ->   4 -> 3 -> 5 -> 6   -> 7 -> 8 -> 9 -> None   # after iteration 1
1 -> 2 ->   5 -> 4 -> 3 -> 6   -> 7 -> 8 -> 9 -> None   # after iteration 2
1 -> 2 ->   6 -> 5 -> 4 -> 3   -> 7 -> 8 -> 9 -> None   # after iteration 3
```

Hence, `k - 1` iterations are needed to reverse the `k`-length section in-place, and we conclude by returning the end node for the reversed section, node `3` in this case. Here's a more colorful illustration of what things look like for each iteration:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/linked-lists/f4.png').default} />
</div>

The top part of the image shows the initial list and which four nodes need to be reversed, where the red numbering `1`, `2`, and `3` indicates where the nodes end up after that many iterations have taken place. The actual node coloring scheme:

- Red `2`: This fixed node denotes the node preceding where the reversal starts.
- Magenta `3`: This fixed coloring denotes the node where the reversal starts (and also the node returned at the end).
- Orange nodes: The orange node is always the "next node" to be moved to the front (i.e., `next_node` in the template).
- White nodes: This coloring indicates the nodes that have already been processed. The last iteration shows how the node where the reversal started concludes with its proper positioning at the end of the reversed segment.

The image above, particularly the top part of the image with the initial list and the arrow indicators which show how each node moves for each iteration, provides an *intuition* for how and why the template works. The following image shows the mechanics in more detail:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/linked-lists/f5.png').default} />
</div>

</details>

```python
def reverse_k_nodes(prev, k):
    if not prev.next or k < 2:
        return prev.next
    
    rev_start = prev.next
    next_node = rev_start.next
    rev_end = rev_start
    
    count = 1 
    while count <= k - 1 and next_node:
        rev_start.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
        next_node = rev_start.next
        count += 1
        
    return rev_end
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='92' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC92PS />

---

<LC92TSol />

</details>

<details>
<summary> <LC id='2074' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC2074PS />

---

<LC2074TSol />

</details>

<details>
<summary> <LC id='25' type='long' ></LC> (&check;) </summary>

<LC25PS />

---

<LC25TSol />

</details>

</details>

### Swap two nodes

<details>
<summary> Remarks</summary>

**TLDR:** Don't overthink what seems like the tricky edge case of swapping adjacent nodes. The lengthy initial condition simply ensures we don't try to swap nodes that don't exist or identical nodes in memory.

---

Let `left` and `right` be the nodes we want to swap. We will need the nodes prior to `left` and `right` to facilitate the node swapping. Let these nodes be `prev_left` and `prev_right`, respectively. Most node swaps will look something like the following:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/linked-lists/f6.png').default} />
</div>

That is, as the figure suggests, we will first make the assignment `prev_left.next = right` and then `prev_right.next = left`. Now we need `right.next` to point to what `left.next` was pointing to, and we need `left.next` to point to what `right.next` was pointing to. We can do this without a temporary variable in Python: `right.next, left.next = left.next, right.next`. 

Great! But what about the seemingly tricky case when nodes are adjacent? The really cool thing is that the template handles this case seamlessly. For the example figure above, consider what would happen if we tried swapping nodes `4` and `5`:

<div align='center' className='centeredImageDiv'>
  <img width='800px' src={require('@site/static/img/templates/linked-lists/f7.png').default} />
</div>

The assignment `prev_left.next = right` behaves as expected, but the assignment `prev_right.next = left` seems like it could cause some issues because we have effectively created a self-cycle. But the beautiful thing is how this is exploited to restore the list in the next set of assignments:

```python
right.next, left.next = left.next, right.next
```

When nodes `left` and `right` are adjacent, we want `right.next` to point to `left`. The assignment `right.next = left.next` accomplishes exactly this because the self-cycle means `left.next` actually points to itself (i.e., `left`). The subsequent assignment `left.next = right.next` effectively removes the self-cycle and restores the list, resulting in the adjacent `left` and `right` nodes being swapped, as desired.

</details>

```python
def swap_nodes(prev_left, prev_right):
    if not prev_left or not prev_right \
        or not prev_left.next or not prev_right.next \
            or prev_left.next == prev_right.next:
        return
    
    left = prev_left.next
    right = prev_right.next
    prev_left.next, prev_right.next = right, left
    right.next, left.next = left.next, right.next
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='24' type='long' ></LC> (&check;) </summary>

<LC24PS />

---

<LC24TSol2 />

</details>

<details>
<summary> <LC id='1721' type='long' ></LC> (&check;) </summary>

<LC1721PS />

---

<LC1721TSol2 />

</details>

</details>

### General

<details>
<summary> Problems</summary>

<details>
<summary> <LC id='203' type='long' ></LC> (&check;) </summary>

<LC203PS />

---

<LC203TSol />

</details>

<details>
<summary> <LC id='1290' type='long' ></LC> (&check;) </summary>

<LC1290PS />

---

<LC1290TSol />

</details>

<details>
<summary> <LC id='328' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC328PS />

---

<LC328TSol />

</details>

</details>

## Matrices

### Calculate value in a 2D matrix given its index

<details>
<summary> Remarks</summary>

- `index // n`: This performs integer division of `index` by `n`, where the result is the number of times `n` fully goes into `index`. Why does this give us the row number? Because, for every row, there are `n` elements; hence, after every `n` elements, we move on to the next row.
- `index % n`: This finds the remainder when `index` is divided by `n`, where this remainder corresponds to the column index because it tells us how many places into the current row we are.

</details>

```python
def index_to_value(matrix, index):
    n = len(matrix[0])
    row_pos = index // n
    col_pos = index % n
    return matrix[row_pos][col_pos]
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='74' type='long' ></LC> </summary>

<LC74PS />

---

<LC74TSol2 />

</details>

</details>

## Sliding window

### Variable window size

<details>
<summary> Remarks</summary>

The general algorithm behind the sliding window pattern (variable width) is as follows:

1. **Define window boundaries:** Define pointers `left` and `right` that bound the left- and right-hand sides of the current window, respectively, where both pointers usually start at `0`.
2. **Add elements to window by moving right pointer:** Iterate over the source array with the `right` bound to "add" elements to the window.
3. **Remove elements from window by checking constraint and moving left pointer:** Whenever the constraint is broken,  "remove" elements from the window by incrementing the `left` bound until the constraint is satisfied again.

Note the usage of the non-strict inequality `left <= right` in the `while` loop &#8212; this makes sense for problems where a single-element window is valid; however, the inequality should be strict (i.e., `left < right`) for problems where a single-element window does not make sense.

</details>

<details>
<summary> Template with comments</summary>

```python
def fn(arr):
    # initialize left boundary, window, and answer variables
    left = curr = ans = 0

    # initialize right boundary
    for right in range(len(arr)):

        # logic for adding element arr[right] to window
        curr += nums[right]

        # resize window if window condition/constraint is invalid
        while left <= right and WINDOW_CONDITION_BROKEN # (e.g., curr > k):
            
            # logic to remove element from window
            curr -= nums[left]
            
            # shift window
            left += 1

        # logic to update answer
        ans = max(ans, right - left + 1)
    
    return ans
```

</details>

```python
def fn(arr):
    left = curr = ans = 0
    for right in range(len(arr)):
        curr += nums[right]
        while left <= right and WINDOW_CONDITION_BROKEN # (e.g., curr > k):
            curr -= nums[left]
            left += 1
        ans = max(ans, right - left + 1)
    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> Longest subarray of positive integer array with sum not greater than <code>k</code> (&check;)</summary>

<Sol12NoLC />

</details>

<details>
<summary> Longest substring of <code>1</code>'s given binary string and one possible <code>0</code> flip (&check;)</summary>

<Sol13NoLC />

</details>

<details>
<summary> <LC id='713' type='long' ></LC> (&check;) <MyStar /></summary>

<LC713PS />

---

<LC713TSol />

</details>

<details>
<summary> <LC id='1004' type='long' ></LC> (&check;) <MyStar /></summary>

<LC1004PS />

---

<LC1004TSol />

</details>

<details>
<summary> <LC id='209' type='long' ></LC> (&check;) </summary>

<LC209PS />

---

<LC209TSol />

</details>

<details>
<summary> <LC id='1208' type='long' ></LC> (&check;) </summary>

<LC1208PS />

---

<LC1208TSol />

</details>

<details>
<summary> <LC id='3090' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC3090PS />

---

<LC3090TSol />

</details>

<details>
<summary> <LC id='3' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC3PS />

---

<LC3TSol />

</details>

<details>
<summary> <LC id='3105' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC3105PS />

---

<LC3105TSol />

</details>

</details>

### Fixed window size

#### Method 1 (build window outside main loop)

<details>
<summary> Remarks</summary>

- **Window size greater than array size (possibility):** There is a chance that the window size `k` is greater than the array size `arr.length` &#8212; if not properly accounted for, this could easily lead to index out of range errors (it's not accounted for in the pseudocode below). It is often not a bad idea to have a check for this before proceeding with the window creation operation.
- **Clarity:** Method 1 appears to be somewhat cleaner than Method 2 despite having another `for` loop. The construction of the window and initialization of `ans` is unambiguous and easy to understand in Method 1. We start by building the window, we set the initial answer, and then we move the window while iterative updating the answer. It's easier to keep things clear and straight with this approach.

</details>

<details>
<summary> Template with commented code</summary>

```python
def fn(arr, k):
    # some data to keep track of with the window (e.g., sum of elements)
    curr = 0

    # build the first window (of size k)
    for i in range(k):
        # do something with curr or other variables to build first window
        curr += arr[i]

    # initialize answer variable (might be equal to curr here depending on the problem)
    ans = curr
    for i in range(k, len(arr)):
        # add arr[i] to window
        curr += arr[i]
        # remove arr[i - k] from window
        curr -= arr[i - k]
        # update ans
        ans = max(ans, curr)

    return ans
```

</details>

```python
def fn(arr, k):
    curr = 0
    for i in range(k):
        curr += arr[i]

    ans = curr
    for i in range(k, len(arr)):
        curr += arr[i]
        curr -= arr[i - k]
        ans = max(ans, curr)

    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> Max sum of subarray of size <code>k</code> (&check;)</summary>

<Sol14NoLC />

</details>

<details>
<summary> <LC id='643' type='long' ></LC> (&check;) </summary>

<LC643PS />

---

<LC643TSol />

</details>

<details>
<summary> <LC id='1456' type='long' ></LC> (&check;) </summary>

<LC1456PS />

---

<LC1456TSol />

</details>

</details>

#### Method 2 (build window within main loop)

<details>
<summary> Remarks</summary>

- **Window size greater than array size (possibility):** There is a chance that the window size `k` is greater than the array size `arr.length` &#8212; if not properly accounted for, this could easily lead to index out of range errors (it's not accounted for in the pseudocode below). It is often not a bad idea to have a check for this before proceeding with the window creation operation.
- **Initialization of `ans`:** Sometimes it can be a little unclear as to how best to initialize the `ans` variable. For example, in <LC id='643' type='' ></LC> we are looking for a "maximum average subarray" which means initializing `ans` to, say, `0` does not make sense because the maximum average could be negative depending on what elements are present in the array. It makes more sense in this problem to have `ans = float('-inf')` as the initialization even though it does not feel all that natural.
- **Complicated logic:** The logic for managing the window is actually a bit more complicated than that used in Method 1. Here, in Method 2, the window is really being constructed by adding `arr[i]` to the window *until* `i == k`. If our array only has `k` elements, then our updating of `ans` before we return can save us from possible errors, but the whole thing takes a bit more effort to wrap your head around.

</details>

<details>
<summary> Template with code comments</summary>

```python
def fn(arr, k):
    # some data to keep track of with the window (e.g., sum of elements)
    curr = 0

    # initialize answer variable (initial value depends on problem)
    ans = float('-inf')
    for i in range(len(arr)):
        if i >= k:
            # update ans
            ans = max(curr, ans)
            # remove arr[i - k] from window
            curr -= arr[i - k]
        
        # add arr[i] to window
        curr += arr[i]

    # update ans
    ans = max(ans, curr)
    return ans
```

</details>

```python
def fn(arr, k):
    curr = 0
    ans = float('-inf')
    for i in range(len(arr)):
        if i >= k:
            ans = max(curr, ans)
            curr -= arr[i - k]
        curr += arr[i]
    ans = max(ans, curr)
    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> Max sum of subarray of size <code>k</code> (&check;)</summary>

<Sol15NoLC />

</details>

<details>
<summary> <LC id='643' type='long' ></LC> (&check;) </summary>

<LC643PS />

---

<LC643TSol2 />

</details>

</details>

## Stacks and queues

### Stacks

<details>
<summary> Remarks</summary>

TBD

</details>

```python
# declaration (Python list by default)
stack = []

# push
stack.append(1)
stack.append(2)
stack.append(3)

# pop
stack.pop() # 3
stack.pop() # 2

# peek
stack[-1] # 1

# empty check
not stack # False

# size check
len(stack) # 1
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='20' type='long' ></LC> (&check;) <MyStar stars={1} /></summary>

<LC20PS />

---

<LC20TSol />

</details>

<details>
<summary> <LC id='1047' type='long' ></LC> (&check;) </summary>

<LC1047PS />

---

<LC1047TSol />

</details>

<details>
<summary> <LC id='844' type='long' ></LC> (&check;) </summary>

<LC844PS />

---

<LC844TSol2 />

</details>

<details>
<summary> <LC id='71' type='long' ></LC> (&check;) </summary>

<LC71PS />

---

<LC71TSol />

</details>

<details>
<summary> <LC id='1544' type='long' ></LC> (&check;) </summary>

<LC1544PS />

---

<LC1544TSol />

</details>

<details>
<summary> <LC id='2390' type='long' ></LC> (&check;) </summary>

<LC2390PS />

---

<LC2390TSol />

</details>

<details>
<summary> <LC id='232' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC232PS />

---

<LC232TSol />

</details>

<details>
<summary> <LC id='2434' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC2434PS />

---

<LC2434TSol />

</details>

<details>
<summary> <LC id='946' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC946PS />

---

<LC946TSol />

</details>

<details>
<summary> <LC id='735' type='long' ></LC> (&check;) </summary>

<LC735PS />

---

<LC735TSol />

</details>

<details>
<summary> <LC id='155' type='long' ></LC> (&check;) </summary>

<LC155PS />

---

<LC155TSol />

</details>

</details>

### Queues

<details>
<summary> Remarks</summary>

TBD

</details>

```python
import collections

# declaration (Python deque from collections module)
queue = collections.deque()

# initialize with values (optional)
queue = collections.deque([1, 2, 3])

# enqueue
queue.append(4)
queue.append(5)

# dequeue
queue.popleft() # 1
queue.popleft() # 2

# peek left (next element to be removed)
queue[0] # 3

# peek right
queue[-1] # 5

# empty check
not queue # False

# size check
len(queue) # 3
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='933' type='long' ></LC> (&check;) </summary>

<LC933PS />

---

<LC933TSol />

</details>

<details>
<summary> <LC id='346' type='long' ></LC> (&check;) </summary>

<LC346PS />

---

<LC346TSol />

</details>

<details>
<summary> <LC id='225' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC225PS />

---

<LC225TSol />

</details>

<details>
<summary> <LC id='649' type='long' ></LC> (&check;) </summary>

<LC649PS />

---

<LC649TSol />

</details>

</details>

### Monotonic stacks

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='739' type='long' ></LC> (&check;) </summary>

<LC739PS />

---

<LC739TSol />

</details>

<details>
<summary> <LC id='239' type='long' ></LC> (&check;) </summary>

<LC239PS />

---

<LC239TSol />

</details>

<details>
<summary> <LC id='1438' type='long' ></LC> (&check;) </summary>

<LC1438PS />

---

<LC1438TSol />

</details>

<details>
<summary> <LC id='496' type='long' ></LC> (&check;) </summary>

<LC496PS />

---

<LC496TSol />

</details>

<details>
<summary> <LC id='503' type='long' ></LC> </summary>

<LC503PS />

---

<LC503TSol />

</details>

<details>
<summary> <LC id='901' type='long' ></LC> (&check;) </summary>

<LC901PS />

---

<LC901TSol />

</details>

<details>
<summary> <LC id='1475' type='long' ></LC> (&check;) </summary>

<LC1475PS />

---

<LC1475TSol />

</details>

<details>
<summary> <LC id='1063' type='long' ></LC> (&check;) </summary>

<LC1063PS />

---

<LC1063TSol />

</details>

<details>
<summary> <LC id='1673' type='long' ></LC> (&check;) </summary>

<LC1673PS />

---

<LC1673TSol />

</details>

<details>
<summary> <LC id='1944' type='long' ></LC> (&check;) </summary>

<LC1944PS />

---

<LC1944TSol />

</details>

<details>
<summary> <LC id='2398' type='long' ></LC> (&check;) </summary>

<LC2398PS />

---

<LC2398TSol />

</details>

<details>
<summary> <LC id='907' type='long' ></LC> (&check;) </summary>

<LC907PS />

---

<LC907TSol />

</details>

<details>
<summary> <LC id='2104' type='long' ></LC> (&check;) </summary>

<LC2104PS />

---

<LC2104TSol />

</details>

</details>

## Trees

```a title="Reference tree for templates provided below"
        __A______          | Pre-order    (L -> R): A B X E M S W T P N C H
       /         \         | Pre-order    (R -> L): A W C H T N P B S X M E
    __B         __W__      | Post-order   (L -> R): E M X S B P N T H C W A
   /   \       /     \     | Post-order   (R -> L): H C N P T W S M E X B A
  X     S     T       C    | In-order     (L -> R): E X M B S A P T N W H C
 / \         / \     /     | In-order     (R -> L): C H W N T P A S B M X E
E   M       P   N   H      | Level-order  (L -> R): A B W X S T C E M P N H
                           | Level-order  (R -> L): A W B C T S X H N P M E
```

### Manually determine order of nodes visited ("tick trick")

<details>
<summary> Tick trick overview</summary>

[One online resource](https://faculty.cs.niu.edu/~mcmahon/CS241/Notes/Data_Structures/binary_tree_traversals.html) does a good job of detailing the so-called *tick trick*, a handy trick for figuring out _by hand_ the order in which a binary tree's nodes will be "visited" for the pre-order, in-order, and post-order traversals:

1. Draw an arrow as a path around the nodes of the binary tree diagram, closely following its outline. The direction of the arrow depends on whether you are traversing the tree left-to-right or right-to-left.
2. Draw a line or tick mark on one of the sides or the bottom of each node in the tree. Where you draw the mark depends on which traversal you are attempting to perform, as shown in the diagram below:

  <div align='center' className='centeredImageDiv'>
    <img width='450px' src={require('@site/static/img/templates/tree-traversal/tick-trick-setup.png').default} />
  </div>

The point at which the path you've drawn around the binary tree intersects the tick mark is the point at which that node will be "visited" during the traversal. Examples for pre-, post-, and in-order traversals are provided below (left-to-right and right-to-left).

</details>

<details>
<summary> Why the tick trick actually works</summary>

The "tick trick" is a very nice, effective way to get a quick handle on the order in which nodes of a tree will be traversed. But *why* does drawing the tick in the manner specified actually work in creating the effective visual? 

Perhaps the first key observation to keep in mind is how we actually *start* drawing any path that is meant to represent a traversal, namely not only from the root but *from above* whatever edges connect the root to other nodes; that is, we do not trace out a path from the root by drawing from the *bottom* of the node (no matter what kind of traversal we are doing). We start tracing the path *above* the edge that connects the root to its left child (or right child if we are doing a reverse traversal). Effectively, we start tracing out the path by starting from the *top* of the root node and then going the desired direction (conventionally left). These may seem like minor observations, but they are important to specify in order to make our path drawings well-defined (otherwise the "tick trick" could have different meanings for different path drawings). 

Drawing a path around the tree, in the manner specified above, and placing tick marks at strategic points on the nodes allows us to create a visual guide that effectively conveys the sequence of node visits, where a "visit" represents the processing of a node and is visually indicated by the path *intersecting* the tick drawn on the node:

- **Pre-order:** The idea is to draw the tick on the node in such a way that we cannot visit any of the node's children (left or right) before visiting the node itself. We can do this by drawing the tick on the left side of the node. The path traced out must intersect the node's tick before proceeding down the tree (i.e., before visiting any children).

  *Recursive observation:* The practical implication of this tracing/traversal is that, starting at `node` (regardless of reference point), we process `node` and its *entire* left subtree before moving on to process nodes in the right subtree of `node`. We travel as deeply as we can to the left, processing each node as we encounter it. Only once we've fully exhausted our abilities to go left do we start to go right by means of backtracking (this is indicated in the path tracing by the tracing moving upward and then back down to cover the right subtree).

- **In-order:** How can we draw the tick in such a way that makes it clear the current node cannot be visited until 

  + *after* its left child has been visited and
  + *before* its right child has been visited?

  The way in which we are tracing out a path suggests a possibility (think of a tree rooted at `1` with left child `2` and right child `3`): if we draw the tick straight down from the node, then we can only intersect the tick of the current node after intersecting the tick of its left child; furthermore, as we start to backtrack to visit the right child, we must cross the tick of the current node before reaching its right child.

  *Recursive observation:* The practical implication of this tracing/traversal is that, starting at `node` (regardless of reference point), we process `node` only *after* its entire left subtree has been processed and *before* its right subtree. This is why in-order traversal is common for binary search trees (BST), where the node values are ordered in a certain way: in-order traversal from left to right ensures nodes are processed in *ascending* order according to their value; similarly, in-order traversal of a BST from right-to-left ensures nodes are processed in *descending* order according to their value.

- **Post-order:** How can we draw the tick in such a way that makes it clear a node is only visited once its children have been visited? Directionally, it seems like a node's tick should be intersected by the path tracing once the path has gone as deep as it can (i.e., visited its children) and it is time to go back *up and away*. We can accomplish this by drawing the tick on the right side of a node, where the path is leaving the node in an upward direction.

  *Recursive observation:* The practical implication of this tracing/traversal is that, starting at `node` (regardless of reference point), we process `node` only after its entire left subtree *and* its entire right subtree have been processed.

</details>

<details>
<summary> Correspondence between left-to-right and right-to-left traversals</summary>

It may be tempting to think that right-to-left traversals should effectively be "reversals" of their left-to-right counterparts, but this is not the case for pre- and post-order traversals. It is only the case for in-order traversals. 

To see why, recall what the various traversals actually mean. A pre-order traversal means we will visit the current node *before* traversing either of its subtrees whereas a post-order traversal means we will visit the current node *after* traversing both of its subtrees. In either case, the root node itself serves as a point of clarification:

```
        __A______          | Pre-order  (L -> R): A B X E M S W T P N C H
       /         \         | Pre-order  (R -> L): A W C H T N P B S X M E
    __B         __W__      | Post-order (L -> R): E M X S B P N T H C W A
   /   \       /     \     | Post-order (R -> L): H C N P T W S M E X B A
  X     S     T       C    | In-order   (L -> R): E X M B S A P T N W H C
 / \         / \     /     | In-order   (R -> L): C H W N T P A S B M X E
E   M       P   N   H      | 
```

How could the left-to-right and right-to-left pre-order traversals be reversals of each other if they both start with the same node? Similarly, the post-order traversals cannot be reversals of each other if they both end with the same node. But what about in-order traversals? As can be seen above, the order in which the nodes are visited *is reversed* when we change the traversal from left-to-right to right-to-left.

It is worth noting that the left-to-right pre-order traversal is effectively the reverse of the right-to-left post-order traversal. Similarly, the left-to-right post-order traversal is effectively the reverse of the right-to-left pre-order traversal.

</details>

<details>
<summary> Use the <code>binarytree</code> package in Python to facilitate learning </summary>

Learning about trees can become overly cumbersome if you are specifying all of the nodes yourself. For example, the binary tree in the tip above (and the one we will see throughout the subsections below) may be set up in Python without any package support as follows:

<details>
<summary> See the setup</summary>

```python
class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
n1 = TreeNode('A')
n2 = TreeNode('B')
n3 = TreeNode('W')
n4 = TreeNode('X')
n5 = TreeNode('S')
n6 = TreeNode('T')
n7 = TreeNode('C')
n8 = TreeNode('E')
n9 = TreeNode('M')
n10 = TreeNode('P')
n11 = TreeNode('N')
n12 = TreeNode('H')

n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5
n4.left = n8
n4.right = n9
n3.left = n6
n3.right = n7
n6.left = n10
n6.right = n11
n7.left = n12
```

</details>

That's not fun. The [`binarytree`](https://binarytree.readthedocs.io/en/main/overview.html) package makes things *much* easier to work with. The same tree can be set up as follows:

```python
from binarytree import build2
bin_tree = build2(['A', 'B', 'W', 'X', 'S', 'T', 'C', 'E', 'M', None, None, 'P', 'N', 'H'])
```

The code in the sections below will rely on `binarytree` for the sake of simplicity.

</details>

<Tabs>
<TabItem value='pre-order-lr' label='Pre-order (L->R)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/preorder-l-r.png').default} />
</div>

</TabItem>
<TabItem value='pre-order-rl' label='Pre-order (R->L)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/preorder-r-l.png').default} />
</div>

</TabItem>
<TabItem value='post-order-lr' label='Post-order (L->R)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/postorder-l-r.png').default} />
</div>

</TabItem>
<TabItem value='post-order-rl' label='Post-order (R->L)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/postorder-r-l.png').default} />
</div>

</TabItem>
<TabItem value='in-order-lr' label='In-order (L->R)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/inorder-l-r.png').default} />
</div>

</TabItem>
<TabItem value='in-order-rl' label='In-order (R->L)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/inorder-r-l.png').default} />
</div>

</TabItem>
<TabItem value='level-order-lr' label='Level-order (L->R)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/levelorder-l-r.png').default} />
</div>

</TabItem>
<TabItem value='level-order-rl' label='Level-order (R->L)'>

<div align='center' className='centeredImageDiv'>
  <img width='750px' src={require('@site/static/img/templates/tree-traversal/levelorder-r-l.png').default} />
</div>

</TabItem>
</Tabs>

### Pre-order traversal

#### Recursive

<details>
<summary> Remarks</summary>

TBD

</details>

<Tabs>
<TabItem value='pythonLR' label='Python (L->R)'>

```python
def preorder_recursive_LR(node):
    if not node:
        return
    
    visit(node)
    preorder_recursive_LR(node.left)
    preorder_recursive_LR(node.right)
```

</TabItem>
<TabItem value='pythonRL' label='Python (R->L)'>

```python
def preorder_recursive_RL(node):
    if not node:
        return
    
    visit(node)
    preorder_recursive_RL(node.right)
    preorder_recursive_RL(node.left)
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a
procedure preorder(node)
    if node = null
        return

    visit(node)
    preorder(node.left)
    preorder(node.right)
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

#### Iterative

<details>
<summary> Remarks</summary>

TBD

</details>

<details>
<summary> Analogy</summary>

<PreorderIterativeAnalogy />

</details>

<Tabs>
<TabItem value='pythonLR' label='Python (L->R)'>


```python
def preorder_iterative_LR(node):
    if not node:
        return
    
    stack = []
    stack.append(node)
    
    while stack:
        node = stack.pop()

        visit(node)

        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
```

</TabItem>
<TabItem value='pythonRL' label='Python (R->L)'>

```python
def preorder_iterative_RL(node):
    if not node:
        return
    
    stack = []
    stack.append(node)
    
    while stack:
        node = stack.pop()

        visit(node)

        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a
procedure iterativePreorder(node)
    if node = null
        return
    stack ← empty stack
    stack.push(node)
    while not stack.isEmpty()
        node ← stack.pop()
        visit(node)
        // right child is pushed first so that left is processed first
        if node.right ≠ null
            stack.push(node.right)
        if node.left ≠ null
            stack.push(node.left)
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

### Post-order traversal

#### Recursive

<details>
<summary> Remarks</summary>

TBD

</details>

<Tabs>
<TabItem value='pythonLR' label='Python (L->R)'>

```python
def postorder_recursive_LR(node):
    if not node:
        return
    
    postorder_recursive_LR(node.left)
    postorder_recursive_LR(node.right)
    visit(node)
```

</TabItem>
<TabItem value='pythonRL' label='Python (R->L)'>

```python
def postorder_recursive_RL(node):
    if not node:
        return
    
    postorder_recursive_RL(node.right)
    postorder_recursive_RL(node.left)
    visit(node)
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a
procedure postorder(node)
    if node = null
        return

    postorder(node.left)
    postorder(node.right)
    visit(node)
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

#### Iterative

<details>
<summary> Remarks</summary>

TBD

</details>

<details>
<summary> Analogy</summary>

<PostorderIterativeAnalogy />

</details>

<Tabs>
<TabItem value='pythonLR' label='Python (L->R)'>

```python
def postorder_iterative_LR(node):
    stack = []
    last_node_visited = None
    
    while stack or node:
        if node:
            stack.append(node)
            node = node.left
        else:
            peek_node = stack[-1]
            if peek_node.right and (last_node_visited is not peek_node.right):
                node = peek_node.right
            else:
                visit(peek_node)
                last_node_visited = stack.pop()
```

</TabItem>
<TabItem value='pythonRL' label='Python (R->L)'>

```python
def postorder_iterative_RL(node):
    stack = []
    last_node_visited = None
    
    while stack or node:
        if node:
            stack.append(node)
            node = node.right
        else:
            peek_node = stack[-1]
            if peek_node.left and (last_node_visited is not peek_node.left):
                node = peek_node.left
            else:
                visit(peek_node)
                last_node_visited = stack.pop()
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a
procedure iterativePostorder(node)
    stack ← empty stack
    lastNodeVisited ← null
    while not stack.isEmpty() or node ≠ null
        if node ≠ null
            stack.push(node)
            node ← node.left
        else
            peekNode ← stack.peek()
            // if right child exists and traversing node
            // from left child, then move right
            if peekNode.right ≠ null and lastNodeVisited ≠ peekNode.right
                node ← peekNode.right
            else
                visit(peekNode)
                lastNodeVisited ← stack.pop()
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

### In-order traversal

#### Recursive

<details>
<summary> Remarks</summary>

TBD

</details>

<Tabs>
<TabItem value='pythonLR' label='Python (L->R)'>

```python
def inorder_recursive_LR(node):
    if not node:
        return
    
    inorder_recursive_LR(node.left)
    visit(node)
    inorder_recursive_LR(node.right)
```

</TabItem>
<TabItem value='pythonRL' label='Python (R->L)'>

```python
def inorder_recursive_RL(node):
    if not node:
        return
    
    inorder_recursive_RL(node.right)
    visit(node)
    inorder_recursive_RL(node.left)
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a
procedure inorder(node)
    if node = null
        return

    inorder(node.left)
    visit(node)
    inorder(node.right)
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

#### Iterative

<details>
<summary> Remarks</summary>

TBD

</details>

<details>
<summary> Analogy</summary>

<InorderIterativeAnalogy />

</details>

<Tabs>
<TabItem value='pythonLR' label='Python (L->R)'>

```python
def inorder_iterative_LR(node):
    stack = []
    while stack or node:
        if node:
            stack.append(node)
            node = node.left
        else:
            node = stack.pop()
            visit(node)
            node = node.right
```

</TabItem>
<TabItem value='pythonRL' label='Python (R->L)'>

```python
def inorder_iterative_RL(node):
    stack = []
    while stack or node:
        if node:
            stack.append(node)
            node = node.right
        else:
            node = stack.pop()
            visit(node)
            node = node.left
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a
procedure iterativeInorder(node)
    stack ← empty stack
    while not stack.isEmpty() or node ≠ null
        if node ≠ null
            stack.push(node)
            node ← node.left
        else
            node ← stack.pop()
            visit(node)
            node ← node.right
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

### Level-order traversal

<details>
<summary> Remarks</summary>

TBD

</details>

<Tabs>
<TabItem value='pyLR' label='Python (L->R)'>

```python
def levelorder_LR(node):
    queue = deque()
    queue.append(node)
    while queue:
        num_nodes_this_level = len(queue)
        for _ in range(num_nodes_this_level):
            node = queue.popleft()
            visit(node)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
```

</TabItem>
<TabItem value='pyRL' label='Python (R->L)'>

```python
def levelorder_RL(node):
    queue = deque()
    queue.append(node)
    while queue:
        num_nodes_this_level = len(queue)
        for _ in range(num_nodes_this_level):
            node = queue.popleft()
            visit(node)
            if node.right:
                queue.append(node.right)
            if node.left:
                queue.append(node.left)
```

</TabItem>
<TabItem value='pseudocode' label='Pseudocode'>

```a title="Without isolated levels"
procedure levelorder(node)
    queue ← empty queue
    queue.enqueue(node)
    while not queue.isEmpty()
        node ← queue.dequeue()
        visit(node)
        if node.left ≠ null
            queue.enqueue(node.left)
        if node.right ≠ null
            queue.enqueue(node.right)
```

The pseudocode above ([from Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search_2)) is the standard BFS implementation for a binary tree traversal, where we only care about visiting all nodes, level by level, left to right. But it's fairly common to encounter algorithm problems that demand you do something (i.e., perform some logic) on a level by level basis; that is, you effectively need to isolate the nodes by level. The pseudocode above does not do this, but we can easily fix this ourselves:

```a title="Isolated levels"
procedure levelorder(node)
    queue ← empty queue
    queue.enqueue(node)
    while not queue.isEmpty()
        // retrieve number of nodes on current level
        numNodesThisLevel ← queue.length

        // perform logic for current level
        for each node in level do
          node ← queue.dequeue()

          // perform logic on current node
          visit(node)

          // enqueue nodes on next level (left to right)
          if node.left ≠ null
              queue.enqueue(node.left)
          if node.right ≠ null
              queue.enqueue(node.right)
```

The Python code snippets in the other tabs reflect this approach since it is the most likely approach needed in the context of solving interview problems.

</TabItem>
<TabItem value='recursive' label='Recursive'>

As [this Stack Overflow post explores](https://stackoverflow.com/q/2549541/5209533), breadth-first search *can* be done recursively, but this does not mean it *should* be done recursively. It's quite a bit more complex than the iterative solution with basically no added benefit (instead of using a queue to explicitly do things efficiently we would now just be implicitly using the call stack).

That said, here's a possible recursive approach to a level-order traversal for the binary tree we've used for reference:

```python
from binarytree import build2
bin_tree = build2(['A', 'B', 'W', 'X', 'S', 'T', 'C', 'E', 'M', None, None, 'P', 'N', 'H'])
    
root = bin_tree.levelorder[0]

def level_order(root):
    h = height(root)

    for i in range(1, h + 1):
        print_level(root, i)

def print_level(node, level):
    if not node:
        return

    if level == 1:
        print(node.val)
    elif level > 1:
        print_level(node.left, level - 1)
        print_level(node.right, level - 1)

def height(node):
    if not node:
        return 0

    l_height = height(node.left)
    r_height = height(node.right)

    return max(l_height, r_height) + 1

level_order(root) # A B W X S T C E M P N H
```

</TabItem>
</Tabs>

<details>
<summary> Examples</summary>

TBD

</details>

### Induction (solve subtrees recursively, aggregate results at root) {#t-bt-induction}

<details>
<summary> Remarks</summary>

**Core idea:** Solve the problem at the subtrees recursively, and then aggregate the results at the root.

This template is for problems where the solutions for the subtrees is enough to find
the solution for the entire tree. We call it induction because we treat each node as the root of its
own subtree, and each subtree has its own solution (we "forget" that there is more tree above
it). However, sometimes the solutions for the subtrees are not enough to find the solution for the
entire tree, so this template can be too limiting, in which case we move to the traverse-and-accumulate template.

**Note:** This template effectively uses a post-order traversal since the root is only being processed in the return value when `root.val` is reported.

:::caution When the induction template is not applicable

Consider the problem of finding the maximum difference between any two values in a binary tree. We cannot answer this question using just the induction template. Why? Because the smallest and largest node values could reside in different subtrees (at different levels). Using the induction tempalte, there's not an effective way to manage this information. 

We need something more, namely the traverse-and-accumulate method where we can traverse the entire tree, accumulating the maximum and minimum node values along the way. Our final step would be to report the difference between these values.

:::

</details>

<InductionTreeTemplate />

<details>
<summary> Examples</summary>

<details>
<summary> Number of leaves in a binary tree (not on LeetCode)</summary>

<Sol1NoLC />

</details>

<details>
<summary> Test for value in a binary tree (not on LeetCode)</summary>

<Sol2NoLC />

</details>

<details>
<summary> Calculate tree size (not on LeetCode)</summary>

<Sol3NoLC />

</details>

<details>
<summary> Find the maximum value in a binary tree (not on LeetCode)</summary>

<Sol4NoLC />

</details>

<details>
<summary> <LC id='104' type='long' ></LC> </summary>

<LC104PS />

---

<LC104TSol />

</details>

<details>
<summary> <LC id='965' type='long' ></LC> </summary>

<LC965PS />

---

<LC965TSol />

</details>

<details>
<summary> <LC id='94' type='long' ></LC> </summary>

<LC94PS />

---

<LC94TSol />

</details>

<details>
<summary> <LC id='144' type='long' ></LC> </summary>

<LC144PS />

---

<LC144TSol />

</details>

<details>
<summary> <LC id='145' type='long' ></LC> </summary>

<LC145PS />

---

<LC145TSol />

</details>

<details>
<summary> <LC id='226' type='long' ></LC> </summary>

<LC226PS />

---

<LC226TSol />

</details>

</details>

### Traverse-and-accumulate (visit nodes and accumulate information in nonlocal variables)

<details>
<summary> Remarks</summary>

**Core idea:** Visit all the nodes with a traversal and accumulate the wanted information in a nonlocal variable.

If we need to accumulate some global information about the entire tree, then we can use the
this template to facilitate that process. This template is like doing a for loop through all the
nodes, which is often very convenient. It would be great to be able to simply do

```
initialize some data
for node in tree:
  do_something(node)
```

The traverse-and-accumulate template is basically a way to achieve this. It doesn't *look* like a for loop, because it uses recursion, but it can be used like a for loop. Furthermore, we can essentially do a for loop through the nodes in different orders depending on the traversal.

The parameter of the recursive function in the induction template is called `root`. This makes sense because
each node, when visited, is treated as the root of its own subtree. However, when using the
traverse-and-accumulate template, the parameter is called `node` instead of `root`. This is
because we think of it as just a for loop through the nodes, and we wouldn't do `for root in tree: ...`.

The induction and traverse-and-accumulate templates can be mixed together with pre/in/postorder traversals on occasion, depending on the problem (such as <LC id='543' type='long' ></LC>). 

**Note (traversal ordering):** The traverse-and-accumulate template, as presented below, uses a pre-order traversal since the updating of `res` (i.e., the processing of `node` by the `visit` function) occurs *before* processing the left or right subtrees with `visit(node.left)` and `visit(node.right)`, respectively. We can modify the order of the traversal based on when/where we update `res`.

**Note (traversal function name):** Below, we use the function name `visit` to indicate how each `node` will be visited, starting from the `root`. A DFS traversal is implied, meaning we are going to use a pre-order, post-order, or in-order traversal of the tree to obtain our desired result. The contents of `visit` will make clear which traversal is being used. While `visit` is the function name used below, it's somewhat common for people to use `dfs`, `process`, or some other function name instead.

</details>

<TraverseAndAccumulateTreeTemplate />

<details>
<summary> Examples</summary>

<details>
<summary> Maximum difference between two nodes in a binary tree (not on LeetCode) </summary>

<Sol5NoLC />

</details>

<details>
<summary> Longest vertical path of same nodes (not on LeetCode) </summary>

<Sol8NoLC />

</details>

<details>
<summary> <LC id='94' type='long' ></LC> </summary>

<LC94PS />

---

<LC94TSol2 />

</details>

<details>
<summary> <LC id='144' type='long' ></LC> </summary>

<LC144PS />

---

<LC144TSol2 />

</details>

<details>
<summary> <LC id='145' type='long' ></LC> </summary>

<LC145PS />

---

<LC145TSol2 />

</details>

</details>

### Combining templates: induction and traverse-and-accumulate

<details>
<summary> Remarks</summary>

<CombiningInductionAndTACTemplates />

</details>

<details>
<summary> Short version of template</summary>

<InductionTACCombinedTreeTemplate />

</details>

<InductionTACCombinedTreeTemplateLong />

<details>
<summary> Examples</summary>

<details>
<summary> Find mode of a binary tree (not on LeetCode)</summary>

<Sol6NoLC />

</details>

<details>
<summary> Find height of a tree node (not on LeetCode) </summary>

<Sol7NoLC />

</details>

<details>
<summary> <LC id='543' type='long' ></LC> </summary>

<LC543PS />

---

<LC543TSol />

</details>

<details>
<summary> <LC id='563' type='long' ></LC> </summary>

<LC563PS />

---

<LC563TSol />

</details>

</details>

## Two pointers

### Opposite ends

<details>
<summary> Remarks</summary>

The idea behind the "opposite ends" two pointer template is to move from the *extremes* (i.e., *beginning* and *end*) toward each other. Binary search is a class example of this template in action.

The template guarantees an $O(n)$ run time because only $n$ iterations of the `while` loop may occur &#8212; the `left` and `right` pointers begin $n$ units away from each other and move *at least one step closer* to each other on every iteration. If the work inside each iteration is kept to $O(1)$, then the result will be an $O(n)$ run time.

</details>

```python
def fn(arr):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        # choose one of the following depending on the problem:
        # left += 1
        # right -= 1
        # increment left AND decrement right: left += 1 AND right -= 1
```

<details>
<summary> Examples</summary>

<details>
<summary> Determine if a string is a palindrome (&check;)</summary>

<Sol9NoLC />

</details>

<details>
<summary> Determine if pair of integers sums to target in sorted array of unique integers (&check;)</summary>

<Sol10NoLC />

</details>

<details>
<summary> <LC id='344' type='long' ></LC> (&check;, &malt;)</summary>

<LC344PS />

---

<LC344TSol />

</details>

<details>
<summary> <LC id='977' type='long' ></LC> (&check;)</summary>

<LC977PS />

---

<LC977TSol />

</details>

<details>
<summary> <LC id='125' type='long' ></LC> (&malt;)</summary>

<LC125PS />

---

<LC125TSol />

</details>

<details>
<summary> <LC id='905' type='long' ></LC> (&malt;) <MyStar stars={2} /> </summary>

<LC905PS />

---

<LC905TSol />

</details>

<details>
<summary> <LC id='167' type='long' ></LC> (&malt;)</summary>

<LC167PS />

---

<LC167TSol />

</details>

<details>
<summary> <LC id='15' type='long' ></LC> (&malt;)</summary>

<LC15PS />

---

<LC15TSol />

</details>

<details>
<summary> <LC id='557' type='long' ></LC> (&check;)</summary>

<LC557PS />

---

<LC557TSol />

</details>

<details>
<summary> <LC id='917' type='long' ></LC> (&check;)</summary>

<LC917PS />

---

<LC917TSol />

</details>

<details>
<summary> <LC id='2000' type='long' ></LC> (&check;)</summary>

<LC2000PS />

---

<LC2000TSol />

</details>

<details>
<summary> <LC id='75' type='long' ></LC> (&malt;) <MyStar stars={2} /></summary>

<LC75PS />

---

<LC75TSol />

</details>

<details>
<summary> <LC id='912' type='long' ></LC> (&malt;) <MyStar stars={2} /></summary>

<LC912PS />

---

<LC912TSol />

</details>

</details>

### Exhaust inputs

<details>
<summary> Remarks</summary>

Sometimes a problem provides two or more iterables as input. In such cases, specifically with two iterables (e.g., arrays), we can move pointers along both inputs simultaneously until all elements have been checked or *exhausted*.

The idea is to have logic that uses *both* inputs (or more in some cases) in some fashion until one of them has been exhausted. Then logic is passed on so the other input is similarly exhausted.

</details>

```python
def fn(arr1, arr2):
    i = j = 0
    
    while i < len(arr1) and j < len(arr2):
        # choose one of the following depending on the problem:
        # i += 1
        # j += 1
        # increment i AND j: i+= 1 and j += 1
        
    while i < len(arr1):
        i += 1
        
    while j < len(arr2):
        j += 1
```

<details>
<summary> Examples</summary>

<details>
<summary> Merge two sorted arrays into another sorted array (&check;)</summary>

<Sol11NoLC />

</details>

<details>
<summary> <LC id='392' type='long' ></LC> (&check;)</summary>

<LC392PS />

---

<LC392TSol />

</details>

<details>
<summary> <LC id='350' type='long' ></LC> (&malt;)</summary>

<LC350PS />

---

<LC350TSol />

</details>

<details>
<summary> <LC id='349' type='long' ></LC> (&malt;)</summary>

<LC349PS />

---

<LC349TSol />

</details>

<details>
<summary> <LC id='986' type='long' ></LC> (&malt;)</summary>

<LC986PS />

---

<LC986TSol />

</details>

<details>
<summary> <LC id='2540' type='long' ></LC> (&check;)</summary>

<LC2540PS />

---

<LC2540TSol />

</details>

<details>
<summary> <LC id='844' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC844PS />

---

<LC844TSol />

</details>

</details>

### Fast and slow

<details>
<summary> Remarks</summary>

The "fast and slow" template provided below is *not* for problems involving linked lists but for other commonly encountered problems where the iterable given is an array, string (array of characters), etc. The idea is that the fast pointer steadily advances while the slow pointer is only advanced in a piecemeal fashion (often after some sort of condition is met).

</details>

```python
def fn(arr):
    slow = fast = 0
    while fast < len(arr):
        if CONDITION:
            slow += 1
        fast += 1
    return slow
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='26' type='long' ></LC> (&malt;)</summary>

<LC26PS />

---

<LC26TSol />

</details>

<details>
<summary> <LC id='27' type='long' ></LC> (&malt;)</summary>

<LC27PS />

---

<LC27TSol />

</details>

<details>
<summary> <LC id='283' type='long' ></LC> (&check;, &malt;)</summary>

<LC283PS />

---

<LC283TSol />

</details>

</details>

## Miscellaneous

### Build a trie

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>

### Dijkstra's algorithm

### Hashing (and sets)

#### Checking for existence

<details>
<summary> Remarks</summary>

This is where hash maps (and sets) really shine. Checking whether or not an element exists in a hash table is an $O(1)$ operation. Checking for existence in an array, however, is an $O(n)$ operation. This means a number of algorithms can often be improved from $O(n^2)$ to $O(n)$ by using a hash map instead of an array to check for existence.

</details>

```python
lookup = {}
if key in lookup:   # existence check is O(1) for hash maps
    # ...
```

```python
seen = set()
if el in seen:      # existence check is O(1) for sets
      # ...
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='1' type='long' ></LC> (&check;) </summary>

<LC1PS />

---

<LC1TSol />

</details>

<details>
<summary> <LC id='2351' type='long' ></LC> (&check;) </summary>

<LC2351PS />

---

<LC2351TSol />

</details>

<details>
<summary> <LC id='1832' type='long' ></LC> (&check;) </summary>

<LC1832PS />

---

<LC1832TSol />

</details>

<details>
<summary> <LC id='268' type='long' ></LC> (&check;) </summary>

<LC268PS />

---

<LC268TSol />

</details>

<details>
<summary> <LC id='1426' type='long' ></LC> (&check;) </summary>

<LC1426PS />

---

<LC1426TSol />

</details>

<details>
<summary> <LC id='217' type='long' ></LC> (&check;) </summary>

<LC217PS />

---

<LC217TSol />

</details>

<details>
<summary> <LC id='1436' type='long' ></LC> (&check;) </summary>

<LC1436PS />

---

<LC1436TSol />

</details>

<details>
<summary> <LC id='1496' type='long' ></LC> (&check;) </summary>

<LC1496PS />

---

<LC1496TSol />

</details>

<details>
<summary> <LC id='49' type='long' ></LC> (&check;) </summary>

<LC49PS />

---

<LC49TSol />

</details>

<details>
<summary> <LC id='2352' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC2352PS />

---

<LC2352TSol />

</details>

<details>
<summary> <LC id='383' type='long' ></LC> (&check;) </summary>

<LC383PS />

---

<LC383TSol />

</details>

<details>
<summary> <LC id='205' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC205PS />

---

<LC205TSol />

</details>

<details>
<summary> <LC id='290' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC290PS />

---

<LC290TSol />

</details>

<details>
<summary> <LC id='791' type='long' ></LC> (&check;) </summary>

<LC791PS />

---

<LC791TSol />

</details>

<details>
<summary> <LC id='1657' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC1657PS />

---

<LC1657TSol />

</details>

</details>

#### Counting

<details>
<summary> Remarks</summary>

Counting is a very common pattern with hash maps, where "counting" generally refers to tracking the frequency of different elements.

In sliding window problems, a frequent constraint is limiting the amount of a certain element in the window. For example, maybe we're trying to find the longest substring with at most `k` `0`s. In such problems, simply using an integer variable `curr` is enough to handle the constraint because we are only focused on a single element, namely `0`. The template for variable width sliding window problems naturally suggests the use of `curr` for such situations:

```python
def fn(arr):
    left = curr = ans = 0
    for right in range(len(arr)):
        curr += nums[right]
        while left <= right and WINDOW_CONDITION_BROKEN # (e.g., curr > k):
            curr -= nums[left]
            left += 1
        ans = max(ans, right - left + 1)
    return ans
```

Using a hash map allows us to solve problems where the constraint involves *multiple* elements. For example, we would likely no longer use an *integer* variable `curr` but a hash map variable `lookup`, `counts`, or something similarly named, where *multiple integer variables* can be used to track constraints on multiple elements (i.e., the hashable, often required to be immutable, "keys" of the hashmap effectively serve as variables where their integer values convey something about the constraint being monitored).

</details>

<details>
<summary> <code>defaultdict</code> in Python </summary>

The key feature of [`defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict) is that it provides a default value for the key that does not exist. The type of this default value, usually provided in the form of a function like `int` (default value `0`) or `list` (default value `[]`) or `set` (default value `{}`), is specified when the `defaultdict` is instantiated.

This means something as simple as tracking the character frequencies in the string `"hello world"` is simplified (because we do not have to check for the key's existence first). With `defaultdict`:

```python
from collections import defaultdict

s = "hello world"
frequency = defaultdict(int)

for char in s:
    frequency[char] += 1

print(frequency)
```

Without `defaultdict`:

```python
s = "hello world"
frequency = {}

for char in s:
    if char in frequency:
        frequency[char] += 1
    else:
        frequency[char] = 1

print(frequency)
```

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

<details>
<summary> Longest substring of string <code>s</code> that contains at most <code>k</code> distinct characters (&check;) <MyStar /> </summary>

<Sol17NoLC />

</details>

<details>
<summary> <LC id='2248' type='long' ></LC> (&check;) </summary>

<LC2248PS />

---

<LC2248TSol />

</details>

<details>
<summary> <LC id='1941' type='long' ></LC> (&check;) </summary>

<LC1941PS />

---

<LC1941TSol />

</details>

<details>
<summary> <LC id='2225' type='long' ></LC> (&check;) </summary>

<LC2225PS />

---

<LC2225TSol />

</details>

<details>
<summary> <LC id='1189' type='long' ></LC> (&check;) </summary>

<LC1189PS />

---

<LC1189TSol />

</details>

<details>
<summary> <LC id='1133' type='long' ></LC> (&check;) </summary>

<LC1133PS />

---

<LC1133TSol />

</details>

<details>
<summary> <LC id='2260' type='long' ></LC> (&check;) </summary>

<LC2260PS />

---

<LC2260TSol />

</details>

<details>
<summary> <LC id='2342' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC2342PS />

---

<LC2342TSol />

</details>

<details>
<summary> <LC id='771' type='long' ></LC> (&check;) </summary>

<LC771PS />

---

<LC771TSol />

</details>

</details>

#### Rolling prefix and referential prefixes ("exact" number of subarrays)

<details>
<summary> Remarks</summary>

<HashingPrefixesTemplateRemark />

</details>

```python
def fn(nums, k):
    lookup = defaultdict(int)   # initialize referential prefix lookup
    lookup[0] = 1               # handle "empty prefix" reference
    curr = 0                    # initialize cumulative or "rolling" prefix
    ans = 0
    
    for i in range(len(nums)):
        num = nums[i]
        if CONDITION:
            curr += num         # update curr in a problem-specific way
                                # (updates will usually be conditional)
            
        ans += lookup[curr - k] # update answer based on inputs and lookup
                                # (updates usually depend on a complementary relationship
                                # between curr and other inputs or conditions)
        
        lookup[curr] += 1       # update lookup based on curr in a problem-specific way
            
    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='560' type='long' ></LC> (&check;) </summary>

<LC560PS />

---

<LC560TSol />

</details>

<details>
<summary> <LC id='1248' type='long' ></LC> (&check;) </summary>

<LC1248PS />

---

<LC1248TSol />

</details>

<details>
<summary> <LC id='525' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC525PS />

---

<LC525TSol />

</details>

</details>

### Monotonic increasing stack

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>

### Prefix sum

<details>
<summary> Remarks</summary>

A [prefix sum](https://en.wikipedia.org/wiki/Prefix_sum), in its conventional sense (i.e., a "sum"), is effectively a *running total* of the input sequence. For example, the input sequence `1, 2, 3, 4, 5, 6, ...` has `1, 3, 6, 10, 15, 21` as its prefix sum. This idea can be very useful when dealing with problems where finding sums of subarrays happens frequently. The idea is to perform an $O(n)$ pre-processing operation at the beginning that allows summation queries to be answered in $O(1)$ time (i.e., as opposed to each summation query taking $O(n)$ time). Building the prefix sum can take $O(n)$ or $O(1)$ space depending on whether or not the input array itself is transformed or "mutated" into a prefix sum.

The $O(n)$ non-mutation approach occurs most frequently:

```python
def prefix_sum(nums):
    prefix = [nums[0]]
    for i in range(1, len(nums)):
        prefix.append(nums[i] + prefix[-1])
        
    return prefix
```

Its $O(1)$ mutation variant is arguably simpler to implement:

```python
def prefix_sum_inplace(nums):
    for i in range(1, len(nums)):
        nums[i] = nums[i] + nums[i - 1]
```

In practice, we often need to find the sum of a subarray between indices `i` and `j`, where `i < j`. If `prefix` is our prefix sum, and `nums` is the input sequence, then such a sum may be found by computing the following:

```python
prefix[j] - prefix[i] + nums[i]
```

Sometimes people will use `prefix[j] - prefix[i - 1]` instead of `prefix[j] - prefix[i] + nums[i]`, and that is fine except for the boundary case where `i = 0`. It's often safest to explicitly handle the inclusive nature of prefix sums as done above.

Another approach is to initialize the prefix array as `[0, nums[0]]`, which means the sum of the subarray between `i` and `j` is no longer `prefix[j] - prefix[i - 1]` but `prefix[j + 1] - prefix[i]`, which thus eliminates the left endpoint boundary issue. There's also no right endpoint boundary issue because if `j` is the rightmost endpoint, then `j + 1` is simply the right endpoint of the prefix sum array (because it's been extended by a single element, the prepended `0`).

Regardless, the approach `prefix[j] - prefix[i] + nums[i]` is still probably the *clearest*.

</details>

<details>
<summary> Prefix sums that are not "sums"</summary>

As noted in [the wiki article](https://en.wikipedia.org/wiki/Prefix_sum), a prefix sum requires only a binary associative operator. The operator does not have to be `+`, the addition operation. The operator could just as well be `x`, the multiplication operator.

</details>

```python
def prefix_sum(nums):
    prefix = [nums[0]]
    for i in range(1, len(nums)):
        prefix.append(nums[i] + prefix[-1])
        
    return prefix
```

<details>
<summary> Examples</summary>

<details>
<summary> Boolean results of queries (see problem statement below) (&check;) </summary>

> **Problem:** Given an integer array `nums`, an array `queries` where `queries[i] = [x, y]` and an integer `limit`, return a boolean array that represents the answer to each query. A query is `true` if the sum of the subarray from `x` to `y` is less than `limit`, or `false` otherwise.
>
> For example, given `nums = [1, 6, 3, 2, 7, 2]`, `queries = [[0, 3], [2, 5], [2, 4]]`, and `limit = 13`, the answer is `[true, false, true]`. For each query, the subarray sums are `[12, 14, 12]`.

---

<Sol16NoLC />

</details>

<details>
<summary> <LC id='2270' type='long' ></LC> (&check;) </summary>

<LC2270PS />

---

<LC2270TSol />

</details>

<details>
<summary> <LC id='1480' type='long' ></LC> (&check;) </summary>

<LC1480PS />

---

<LC1480TSol />

</details>

<details>
<summary> <LC id='1413' type='long' ></LC> (&check;) <MyStar /> </summary>

<LC1413PS />

---

<LC1413TSol />

</details>

<details>
<summary> <LC id='2090' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC2090PS />

---

<LC2090TSol />

</details>

<details>
<summary> <LC id='1732' type='long' ></LC> (&check;) </summary>

<LC1732PS />

---

<LC1732TSol />

</details>

<details>
<summary> <LC id='724' type='long' ></LC> (&check;) </summary>

<LC724PS />

---

<LC724TSol />

</details>

<details>
<summary> <LC id='303' type='long' ></LC> (&check;) </summary>

<LC303PS />

---

<LC303TSol />

</details>

</details>

### String building

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>

### Subarrays (number of) that fit an exact criteria

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>

### Top k elements with a heap

<details>
<summary> Remarks</summary>

TBD

</details>

```python
TBD
```

<details>
<summary> Examples</summary>

TBD

</details>
