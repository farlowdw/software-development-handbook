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

<!-- backtracking -->
import BacktrackingTemplate from '@site/docs/_Partials/templates/backtracking.md';

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
import SlidingWindowFixedSizeWithinLoop from '@site/docs/_Partials/template-remarks/sliding-window-fixed-size-within-main-loop.md';
import BinarySearchSolutionSpacesRemark from '@site/docs/_Partials/template-remarks/binary-search-solution-spaces.md';
import TwoPointersOppositeEndsRemark from '@site/docs/_Partials/template-remarks/two-pointers-opposite-ends.md';
import TwoPointersExhaustInputsRemark from '@site/docs/_Partials/template-remarks/two-pointers-exhaust-inputs.md';
import TwoPointersFastSlowRemark from '@site/docs/_Partials/template-remarks/two-pointers-fast-slow.md';
import SlidingWindowVariableSizeRemark from '@site/docs/_Partials/template-remarks/sliding-window-variable-size.md';
import PrefixSumRemark from '@site/docs/_Partials/template-remarks/prefix-sum.md';
import PrefixSumNonTraditionalRemark from '@site/docs/_Partials/template-remarks/prefix-sum-non-traditional.md';
import HashingCountingRemark from '@site/docs/_Partials/template-remarks/hashing-counting.md';
import HashingDefaultdictRemark from '@site/docs/_Partials/template-remarks/hashing-defaultdict.md';
import HashingPrefixesTemplateRemark from '@site/docs/_Partials/template-remarks/hashing-prefixes.md';
import LinkedListNodeComparisons from '@site/docs/_Partials/template-remarks/linked-list-node-comparisons.md';
import LinkedListPointerManipulation from '@site/docs/_Partials/template-remarks/linked-list-pointer-manipulation.md';
import LinkedListSentinelNodes from '@site/docs/_Partials/template-remarks/linked-list-sentinel-nodes.md';
import LinkedListVisualizeSinglyLinkedList from '@site/docs/_Partials/template-remarks/linked-list-visualize-singly-linked-list.md';
import GraphsBFSConsiderations from '@site/docs/_Partials/template-remarks/graphs-bfs-basic-concepts-considerations.md';
import GraphsDFSConsiderations from '@site/docs/_Partials/template-remarks/graphs-dfs-basic-concepts-considerations.md';
import GraphsDijkstraRemark from '@site/docs/_Partials/template-remarks/graphs-dijkstra.md';
import GraphsDijkstraTargetRemark from '@site/docs/_Partials/template-remarks/graphs-dijkstra-with-target.md';
import GraphsDijkstraPathReconstructionRemark from '@site/docs/_Partials/template-remarks/graphs-dijkstra-path-reconstruction.md';
import GraphsTopsortInventionRemark from '@site/docs/_Partials/template-remarks/graphs-topsort-invention.md';
import GraphsTopsortNumPathsRemark from '@site/docs/_Partials/template-remarks/graphs-topsort-num-paths.md';
import GraphsTopsortDFSDAGInput from '@site/docs/_Partials/template-remarks/graphs-topsort-dfs-dag-input.md';
import GraphsTopsortDFSMotivation from '@site/docs/_Partials/template-remarks/graphs-topsort-dfs-motivation.md';
import GraphsBellmanFordIntuitionRemark from '@site/docs/_Partials/template-remarks/graphs-bellman-ford-intuition.md';
import GraphsBellmanFordRepetitionExplanationRemark from '@site/docs/_Partials/template-remarks/graphs-bellman-ford-repetition-explanation.md';
import GraphsBellmanFordPathReconstructionRemark from '@site/docs/_Partials/template-remarks/graphs-bellman-ford-path-reconstruction.md';
import GraphsBellmanFordNegativeCycleReconstructionRemark from '@site/docs/_Partials/template-remarks/graphs-bellman-ford-negative-cycle.md';
import GraphsBellmanFordNegativeCycleReachableNodesRemark from '@site/docs/_Partials/template-remarks/graphs-bellman-ford-negative-cycle-reachable-nodes.md';
import GraphsTopsortSSSPRemark from '@site/docs/_Partials/template-remarks/graphs-topsort-sssp.md';
import GraphsUnionFindTemplateWithCommentsRemark from '@site/docs/_Partials/template-remarks/graphs-union-find-template-with-comments.md';
import GraphsUnionFindDynamicRemark from '@site/docs/_Partials/template-remarks/graphs-union-find-dynamic.md';
import GraphsUnionFindBySizeRemark from '@site/docs/_Partials/template-remarks/graphs-union-find-by-size.md';
import GraphsUnionFindReferencesRemark from '@site/docs/_Partials/template-remarks/graphs-union-find-references.md';
import GraphsPrimCutPropertyRemark from '@site/docs/_Partials/template-remarks/graphs-prim-cut-property.md';
import GraphsPrimOverviewRemark from '@site/docs/_Partials/template-remarks/graphs-prim-overview.md';
import GraphsPrimTemplateDiscussionRemark from '@site/docs/_Partials/template-remarks/graphs-prim-template-discussion.md';
import GraphsPrimTemplateTimeSpaceRemark from '@site/docs/_Partials/template-remarks/graphs-prim-time-space.md';
import GraphsKruskalExploreMotivateRemark from '@site/docs/_Partials/template-remarks/graphs-kruskal-explore-motivate.md';
import GraphsKruskalTemplateTimeSpaceRemark from '@site/docs/_Partials/template-remarks/graphs-kruskal-time-space.md';
import GraphsKosarajuMotivationRemark from '@site/docs/_Partials/template-remarks/graphs-kosaraju-motivation.md';
import GraphsTarjanStandardImplementation from '@site/docs/_Partials/template-remarks/graphs-tarjan-standard-implementation.md';
import GraphsTarjanTemplateDivergence from '@site/docs/_Partials/template-remarks/graphs-tarjan-template-divergence.md';
import KadaneClarificationRemark from '@site/docs/_Partials/template-remarks/kadane-clarification.md';
import KadaneAllowEmptyRemark from '@site/docs/_Partials/template-remarks/kadane-allow-empty.md';
import KadaneReturnSubarrayRemark from '@site/docs/_Partials/template-remarks/kadane-return-subarray.md';
import KadaneDPRemark from '@site/docs/_Partials/template-remarks/kadane-dp.md';

<!-- TEMPLATE SOLUTIONS (NON-LEETCODE PROBLEMS) -->
import Sol1NoLC from '@site/docs/_Partials/template-solutions/trees/induction/q1.md';
import Sol2NoLC from '@site/docs/_Partials/template-solutions/trees/induction/q2.md';
import Sol3NoLC from '@site/docs/_Partials/template-solutions/trees/induction/q3.md';
import Sol4NoLC from '@site/docs/_Partials/template-solutions/trees/induction/q4.md';
import Sol5NoLC from '@site/docs/_Partials/template-solutions/trees/tac/q1.md';
import Sol6NoLC from '@site/docs/_Partials/template-solutions/trees/tac/q2.md';
import Sol8NoLC from '@site/docs/_Partials/template-solutions/trees/tac/q3.md';
import Sol7NoLC from '@site/docs/_Partials/template-solutions/trees/combined/q1.md';
import Sol9NoLC from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/q1.md';
import Sol10NoLC from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/q2.md';
import Sol11NoLC from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/q1.md';
import Sol12NoLC from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/maximum/q1.md';
import Sol13NoLC from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/maximum/q2.md';
import Sol16NoLC from '@site/docs/_Partials/template-solutions/misc/prefix-sum/q1.md';
import Sol17NoLC from '@site/docs/_Partials/template-solutions/misc/hashing/counting/q1.md';
import Sol18NoLC from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/q1.md';
import Sol19NoLC from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/q2.md';
import Sol20NoLC from '@site/docs/_Partials/template-solutions/misc/hashing/existence/q1.md';
import Sol21NoLC from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/q1.md';
import Sol22NoLC from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/minimum/q1.md';
import Sol23NoLC from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/q2.md';

<!-- TEMPLATE SOLUTIONS (LEETCODE PROBLEMS) -->
<!-- 1 - 99 -->
import LC1TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1.md';
import LC3TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/maximum/lc-3.md';
import LC15TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-15.md';
import LC17TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-17.md';
import LC19TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-19.md';
import LC20TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-20.md';
import LC22TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-22.md';
import LC24TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-24.md';
import LC24TSol2 from '@site/docs/_Partials/template-solutions/linked-lists/swap-nodes/lc-24.md';
import LC25TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse-k-nodes/lc-25.md';
import LC26TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-26.md';
import LC27TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-27.md';
import LC35TSol from '@site/docs/_Partials/template-solutions/binary-search/first-index/lc-35.md';
import LC39TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-39.md';
import LC46TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-46.md';
import LC49TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-49.md';
import LC52TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-52.md';
import LC53TSol from '@site/docs/_Partials/template-solutions/sliding-window/restarting/lc-53.md';
import LC71TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-71.md';
import LC74TSol from '@site/docs/_Partials/template-solutions/binary-search/first-index/lc-74.md';
import LC74TSol2 from '@site/docs/_Partials/template-solutions/matrices/lc-74.md';
import LC75TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-75.md';
import LC77TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-77.md';
import LC78TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-78.md';
import LC79TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-79.md';
import LC82TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-82.md';
import LC83TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-83.md';
import LC92TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse-k-nodes/lc-92.md';
import LC94TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-94.md';
import LC98TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-98.md';
import LC94TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-94.md';

<!-- 100 - 199 -->
import LC100TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-100.md';
import LC101TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-101.md';
import LC102TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-102.md';
import LC103TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-103.md';
import LC104TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-104.md';
import LC110TSol from '@site/docs/_Partials/template-solutions/trees/combined/lc-110.md';
import LC111TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-111.md';
import LC111TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-111.md';
import LC112TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-112.md';
import LC113TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-113.md';
import LC125TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-125.md';
import LC141TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-141.md';
import LC142TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-142.md';
import LC144TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-144.md';
import LC144TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-144.md';
import LC145TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-145.md';
import LC145TSol2 from '@site/docs/_Partials/template-solutions/trees/tac/lc-145.md';
import LC155TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-155.md';
import LC167TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-167.md';
import LC199TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-199.md';
import LC199TSol2 from '@site/docs/_Partials/template-solutions/trees/levels/lc-199.md';

<!-- 200 - 299 -->
import LC200TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-200.md';
import LC203TSol from '@site/docs/_Partials/template-solutions/linked-lists/general/lc-203.md';
import LC205TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-205.md';
import LC206TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-206.md';
import LC209TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-209.md';
import LC215TSol from '@site/docs/_Partials/template-solutions/heaps/top-k/lc-215.md';
import LC216TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-216.md';
import LC217TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-217.md';
import LC225TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-225.md';
import LC226TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-226.md';
import LC232TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-232.md';
import LC234TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-234.md';
import LC235TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-235.md';
import LC236TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-236.md';
import LC239TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-239.md';
import LC268TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-268.md';
import LC270TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-270.md';
import LC283TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-283.md';
import LC290TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-290.md';
import LC295TSol from '@site/docs/_Partials/template-solutions/heaps/multiple-heaps/lc-295.md';

<!-- 300 - 399 -->
import LC303TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-303.md';
import LC323TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-323.md';
import LC328TSol from '@site/docs/_Partials/template-solutions/linked-lists/general/lc-328.md';
import LC344TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-344.md';
import LC346TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-346.md';
import LC349TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-349.md';
import LC350TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-350.md';
import LC347TSol from '@site/docs/_Partials/template-solutions/heaps/top-k/lc-347.md';
import LC373TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-373.md';
import LC383TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-383.md';
import LC392TSol from '@site/docs/_Partials/template-solutions/two-pointers/fast-slow/lc-392.md';
import LC399TSol from '@site/docs/_Partials/template-solutions/graphs/implicit/lc-399.md';

<!-- 400 - 499 -->
import LC410TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-minimum/lc-410.md';
import LC424TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/maximum/lc-424.md';
import LC433TSol from '@site/docs/_Partials/template-solutions/graphs/implicit/lc-433.md';
import LC437TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-437.md';
import LC438TSol from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/lc-438.md';
import LC450TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-450.md';
import LC463TSol from '@site/docs/_Partials/template-solutions/graphs/general/lc-463.md';
import LC480TSol from '@site/docs/_Partials/template-solutions/heaps/multiple-heaps/lc-480.md';
import LC485TSol from '@site/docs/_Partials/template-solutions/sliding-window/restarting/lc-485.md';
import LC496TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-496.md';

<!-- 500 - 599 -->
import LC502TSol from '@site/docs/_Partials/template-solutions/greedy/lc-502.md';
import LC503TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-503.md';
import LC515TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-515.md';
import LC525TSol from '@site/docs/_Partials/template-solutions/misc/hashing/prefixes/lc-525.md';
import LC530TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-530.md';
import LC542TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-542.md';
import LC543TSol from '@site/docs/_Partials/template-solutions/trees/combined/lc-543.md';
import LC547TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-547.md';
import LC557TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-557.md';
import LC560TSol from '@site/docs/_Partials/template-solutions/misc/hashing/prefixes/lc-560.md';
import LC563TSol from '@site/docs/_Partials/template-solutions/trees/combined/lc-563.md';
import LC567TSol from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/lc-567.md';

<!-- 600 - 699 -->
import LC632TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-632.md';
import LC633TSol from '@site/docs/_Partials/template-solutions/binary-search/first-index/lc-633.md';
import LC637TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-637.md';
import LC643TSol from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/lc-643.md';
import LC649TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-649.md';
import LC658TSol from '@site/docs/_Partials/template-solutions/heaps/top-k/lc-658.md';
import LC692TSol from '@site/docs/_Partials/template-solutions/heaps/top-k/lc-692.md';
import LC695TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-695.md';

<!-- 700 - 799 -->
import LC700TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-700.md';
import LC701TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-701.md';
import LC701TSol2 from '@site/docs/_Partials/template-solutions/trees/induction/lc-701.md';
import LC703TSol from '@site/docs/_Partials/template-solutions/heaps/top-k/lc-703.md';
import LC704TSol from '@site/docs/_Partials/template-solutions/binary-search/first-index/lc-704.md';
import LC713TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/maximum/lc-713.md';
import LC724TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-724.md';
import LC735TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-735.md';
import LC739TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-739.md';
import LC743TSol from '@site/docs/_Partials/template-solutions/graphs/dijkstra/lc-743.md';
import LC746TSol from '@site/docs/_Partials/template-solutions/dp/lc-746.md';
import LC752TSol from '@site/docs/_Partials/template-solutions/graphs/implicit/lc-752.md';
import LC771TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-771.md';
import LC787TSol from '@site/docs/_Partials/template-solutions/graphs/dijkstra/lc-787.md';
import LC791TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-791.md';
import LC797TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-797.md';

<!-- 800 - 899 -->
import LC841TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-841.md';
import LC844TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-844.md';
import LC844TSol2 from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-844.md';
import LC863TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-863.md';
import LC872TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-872.md';
import LC875TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-minimum/lc-875.md';
import LC876TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-876.md';
import LC881TSol from '@site/docs/_Partials/template-solutions/greedy/lc-881.md';

<!-- 900 - 999 -->
import LC901TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-901.md';
import LC905TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-905.md';
import LC907TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-907.md';
import LC909TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-909.md';
import LC912TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-912.md';
import LC917TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-917.md';
import LC933TSol from '@site/docs/_Partials/template-solutions/stacks-queues/queues/lc-933.md';
import LC938TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-938.md';
import LC946TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-946.md';
import LC947TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-947.md';
import LC965TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-965.md';
import LC967TSol from '@site/docs/_Partials/template-solutions/backtracking/lc-967.md';
import LC973TSol from '@site/docs/_Partials/template-solutions/heaps/top-k/lc-973.md';
import LC977TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-977.md';
import LC986TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-986.md';
import LC990TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-990.md';
import LC994TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-994.md';
import LC997TSol from '@site/docs/_Partials/template-solutions/graphs/general/lc-997.md';

<!-- 1000 - 1099 -->
import LC1004TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/maximum/lc-1004.md';
import LC1020TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-1020.md';
import LC1026TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-1026.md';
import LC1038TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-1038.md';
import LC1046TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-1046.md';
import LC1047TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-1047.md';
import LC1063TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1063.md';
import LC1091TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-1091.md';

<!-- 1100 - 1199 -->
import LC1129TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-1129.md';
import LC1133TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-1133.md';
import LC1161TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-1161.md';
import LC1189TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-1189.md';
import LC1196TSol from '@site/docs/_Partials/template-solutions/greedy/lc-1196.md';

<!-- 1200 - 1299 -->
import LC1208TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-1208.md';
import LC1231TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-maximum/lc-1231.md';
import LC1248TSol from '@site/docs/_Partials/template-solutions/misc/hashing/prefixes/lc-1248.md';
import LC1283TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-minimum/lc-1283.md';
import LC1290TSol from '@site/docs/_Partials/template-solutions/linked-lists/general/lc-1290.md';
import LC1293TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-1293.md';

<!-- 1300 - 1399 -->
import LC1302TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-1302.md';
import LC1305TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-1305.md';
import LC1306TSol from '@site/docs/_Partials/template-solutions/graphs/implicit/lc-1306.md';
import LC1323TSol from '@site/docs/_Partials/template-solutions/greedy/lc-1323.md';
import LC1325TSol from '@site/docs/_Partials/template-solutions/trees/induction/lc-1325.md';
import LC1338TSol from '@site/docs/_Partials/template-solutions/greedy/lc-1338.md';
import LC1372TSol from '@site/docs/_Partials/template-solutions/trees/combined/lc-1372.md';
import LC1376TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-1376.md';

<!-- 1400 - 1499 -->
import LC1413TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-1413.md';
import LC1426TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1426.md';
import LC1436TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1436.md';
import LC1438TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1438.md';
import LC1446TSol from '@site/docs/_Partials/template-solutions/sliding-window/restarting/lc-1446.md';
import LC1448TSol from '@site/docs/_Partials/template-solutions/trees/tac/lc-1448.md';
import LC1448TSol2 from '@site/docs/_Partials/template-solutions/trees/induction/lc-1448.md';
import LC1456TSol from '@site/docs/_Partials/template-solutions/sliding-window/fixed-size/lc-1456.md';
import LC1466TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-1466.md';
import LC1475TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1475.md';
import LC1480TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-1480.md';
import LC1481TSol from '@site/docs/_Partials/template-solutions/greedy/lc-1481.md';
import LC1482TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-minimum/lc-1482.md';
import LC1496TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1496.md';

<!-- 1500 - 1599 -->
import LC1514TSol from '@site/docs/_Partials/template-solutions/graphs/dijkstra/lc-1514.md';
import LC1544TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-1544.md';
import LC1552TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-maximum/lc-1552.md';
import LC1557TSol from '@site/docs/_Partials/template-solutions/graphs/general/lc-1557.md';

<!-- 1600 - 1699 -->
import LC1609TSol from '@site/docs/_Partials/template-solutions/trees/levels/lc-1609.md';
import LC1615TSol from '@site/docs/_Partials/template-solutions/graphs/general/lc-1615.md';
import LC1631TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-minimum/lc-1631.md';
import LC1657TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1657.md';
import LC1673TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1673.md';

<!-- 1700 - 1799 -->
import LC1710TSol from '@site/docs/_Partials/template-solutions/greedy/lc-1710.md';
import LC1721TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-1721.md';
import LC1721TSol2 from '@site/docs/_Partials/template-solutions/linked-lists/swap-nodes/lc-1721.md';
import LC1732TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-1732.md';

<!-- 1800 - 1899 -->
import LC1832TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-1832.md';
import LC1845TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-1845.md';
import LC1870TSol from '@site/docs/_Partials/template-solutions/binary-search/sol-space-greedy-minimum/lc-1870.md';

<!-- 1900 - 1999 -->
import LC1905TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-1905.md';
import LC1926TSol from '@site/docs/_Partials/template-solutions/graphs/bfs/lc-1926.md';
import LC1941TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-1941.md';
import LC1944TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-1944.md';
import LC1971TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-1971.md';

<!-- 2000 - 2099 -->
import LC2000TSol from '@site/docs/_Partials/template-solutions/two-pointers/opposite-ends/lc-2000.md';
import LC2074TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse-k-nodes/lc-2074.md';
import LC2090TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-2090.md';
import LC2095TSol from '@site/docs/_Partials/template-solutions/linked-lists/fast-slow/lc-2095.md';

<!-- 2100 - 2199 -->
import LC2101TSol from '@site/docs/_Partials/template-solutions/graphs/implicit/lc-2101.md';
import LC2104TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-2104.md';
import LC2126TSol from '@site/docs/_Partials/template-solutions/greedy/lc-2126.md';
import LC2130TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-2130.md';
import LC2182TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-2182.md';
import LC2192TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-2192.md';

<!-- 2200 - 2299 -->
import LC2208TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-2208.md';
import LC2225TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2225.md';
import LC2248TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2248.md';
import LC2260TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2260.md';
import LC2270TSol from '@site/docs/_Partials/template-solutions/misc/prefix-sum/lc-2270.md';
import LC2294TSol from '@site/docs/_Partials/template-solutions/greedy/lc-2294.md';

<!-- 2300 - 2399 -->
import LC2300TSol from '@site/docs/_Partials/template-solutions/binary-search/leftmost-with-duplicates/lc-2300.md';
import LC2336TSol from '@site/docs/_Partials/template-solutions/heaps/general/lc-2336.md';
import LC2342TSol from '@site/docs/_Partials/template-solutions/misc/hashing/counting/lc-2342.md';
import LC2351TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-2351.md';
import LC2352TSol from '@site/docs/_Partials/template-solutions/misc/hashing/existence/lc-2352.md';
import LC2368TSol from '@site/docs/_Partials/template-solutions/graphs/dfs/lc-2368.md';
import LC2389TSol from '@site/docs/_Partials/template-solutions/binary-search/rightmost-with-duplicates/lc-2389.md';
import LC2390TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-2390.md';
import LC2398TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-2398.md';

<!-- 2400 - 2499 -->
import LC2402TSol from '@site/docs/_Partials/template-solutions/heaps/multiple-heaps/lc-2402.md';
import LC2434TSol from '@site/docs/_Partials/template-solutions/stacks-queues/stacks/lc-2434.md';
import LC2462TSol from '@site/docs/_Partials/template-solutions/heaps/multiple-heaps/lc-2462.md';
import LC2487TSol from '@site/docs/_Partials/template-solutions/stacks-queues/monotonic-stacks/lc-2487.md';
import LC2487TSol2 from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-2487.md';

<!-- 2500 - 2599 -->
import LC2540TSol from '@site/docs/_Partials/template-solutions/two-pointers/exhaust-inputs/lc-2540.md';

<!-- 2600 - 2699 -->
<!-- 2700 - 2799 -->
<!-- 2800 - 2899 -->
import LC2816TSol from '@site/docs/_Partials/template-solutions/linked-lists/reverse/lc-2816.md';

<!-- 2900 - 2999 -->
<!-- 3000 - 3099 -->
import LC3090TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-3090.md';

<!-- 3100 - 3199 -->
import LC3105TSol from '@site/docs/_Partials/template-solutions/sliding-window/variable-size/lc-3105.md';

<!-- 3200 - 3299 -->
import LC3228TSol from '@site/docs/_Partials/template-solutions/greedy/lc-3228.md';

<!-- PROBLEM STEMS -->
<!-- 1 - 99 -->
import LC1PS from '@site/docs/_Partials/problem-stems/lc1.md';
import LC3PS from '@site/docs/_Partials/problem-stems/lc3.md';
import LC15PS from '@site/docs/_Partials/problem-stems/lc15.md';
import LC17PS from '@site/docs/_Partials/problem-stems/lc17.md';
import LC19PS from '@site/docs/_Partials/problem-stems/lc19.md';
import LC20PS from '@site/docs/_Partials/problem-stems/lc20.md';
import LC22PS from '@site/docs/_Partials/problem-stems/lc22.md';
import LC24PS from '@site/docs/_Partials/problem-stems/lc24.md';
import LC25PS from '@site/docs/_Partials/problem-stems/lc25.md';
import LC26PS from '@site/docs/_Partials/problem-stems/lc26.md';
import LC27PS from '@site/docs/_Partials/problem-stems/lc27.md';
import LC35PS from '@site/docs/_Partials/problem-stems/lc35.md';
import LC39PS from '@site/docs/_Partials/problem-stems/lc39.md';
import LC46PS from '@site/docs/_Partials/problem-stems/lc46.md';
import LC49PS from '@site/docs/_Partials/problem-stems/lc49.md';
import LC52PS from '@site/docs/_Partials/problem-stems/lc52.md';
import LC53PS from '@site/docs/_Partials/problem-stems/lc53.md';
import LC71PS from '@site/docs/_Partials/problem-stems/lc71.md';
import LC74PS from '@site/docs/_Partials/problem-stems/lc74.md';
import LC75PS from '@site/docs/_Partials/problem-stems/lc75.md';
import LC77PS from '@site/docs/_Partials/problem-stems/lc77.md';
import LC78PS from '@site/docs/_Partials/problem-stems/lc78.md';
import LC79PS from '@site/docs/_Partials/problem-stems/lc79.md';
import LC82PS from '@site/docs/_Partials/problem-stems/lc82.md';
import LC83PS from '@site/docs/_Partials/problem-stems/lc83.md';
import LC92PS from '@site/docs/_Partials/problem-stems/lc92.md';
import LC94PS from '@site/docs/_Partials/problem-stems/lc94.md';
import LC98PS from '@site/docs/_Partials/problem-stems/lc98.md';

<!-- 100 - 199 -->
import LC100PS from '@site/docs/_Partials/problem-stems/lc100.md';
import LC101PS from '@site/docs/_Partials/problem-stems/lc101.md';
import LC102PS from '@site/docs/_Partials/problem-stems/lc102.md';
import LC103PS from '@site/docs/_Partials/problem-stems/lc103.md';
import LC104PS from '@site/docs/_Partials/problem-stems/lc104.md';
import LC110PS from '@site/docs/_Partials/problem-stems/lc110.md';
import LC111PS from '@site/docs/_Partials/problem-stems/lc111.md';
import LC112PS from '@site/docs/_Partials/problem-stems/lc112.md';
import LC113PS from '@site/docs/_Partials/problem-stems/lc113.md';
import LC125PS from '@site/docs/_Partials/problem-stems/lc125.md';
import LC141PS from '@site/docs/_Partials/problem-stems/lc141.md';
import LC142PS from '@site/docs/_Partials/problem-stems/lc142.md';
import LC144PS from '@site/docs/_Partials/problem-stems/lc144.md';
import LC145PS from '@site/docs/_Partials/problem-stems/lc145.md';
import LC155PS from '@site/docs/_Partials/problem-stems/lc155.md';
import LC167PS from '@site/docs/_Partials/problem-stems/lc167.md';
import LC199PS from '@site/docs/_Partials/problem-stems/lc199.md';

<!-- 200 - 299 -->
import LC200PS from '@site/docs/_Partials/problem-stems/lc200.md';
import LC203PS from '@site/docs/_Partials/problem-stems/lc203.md';
import LC205PS from '@site/docs/_Partials/problem-stems/lc205.md';
import LC206PS from '@site/docs/_Partials/problem-stems/lc206.md';
import LC209PS from '@site/docs/_Partials/problem-stems/lc209.md';
import LC215PS from '@site/docs/_Partials/problem-stems/lc215.md';
import LC216PS from '@site/docs/_Partials/problem-stems/lc216.md';
import LC217PS from '@site/docs/_Partials/problem-stems/lc217.md';
import LC225PS from '@site/docs/_Partials/problem-stems/lc225.md';
import LC226PS from '@site/docs/_Partials/problem-stems/lc226.md';
import LC232PS from '@site/docs/_Partials/problem-stems/lc232.md';
import LC234PS from '@site/docs/_Partials/problem-stems/lc234.md';
import LC235PS from '@site/docs/_Partials/problem-stems/lc235.md';
import LC236PS from '@site/docs/_Partials/problem-stems/lc236.md';
import LC239PS from '@site/docs/_Partials/problem-stems/lc239.md';
import LC268PS from '@site/docs/_Partials/problem-stems/lc268.md';
import LC270PS from '@site/docs/_Partials/problem-stems/lc270.md';
import LC283PS from '@site/docs/_Partials/problem-stems/lc283.md';
import LC290PS from '@site/docs/_Partials/problem-stems/lc290.md';
import LC295PS from '@site/docs/_Partials/problem-stems/lc295.md';

<!-- 300 - 399 -->
import LC303PS from '@site/docs/_Partials/problem-stems/lc303.md';
import LC323PS from '@site/docs/_Partials/problem-stems/lc323.md';
import LC328PS from '@site/docs/_Partials/problem-stems/lc328.md';
import LC344PS from '@site/docs/_Partials/problem-stems/lc344.md';
import LC346PS from '@site/docs/_Partials/problem-stems/lc346.md';
import LC347PS from '@site/docs/_Partials/problem-stems/lc347.md';
import LC349PS from '@site/docs/_Partials/problem-stems/lc349.md';
import LC350PS from '@site/docs/_Partials/problem-stems/lc350.md';
import LC373PS from '@site/docs/_Partials/problem-stems/lc373.md';
import LC383PS from '@site/docs/_Partials/problem-stems/lc383.md';
import LC392PS from '@site/docs/_Partials/problem-stems/lc392.md';
import LC399PS from '@site/docs/_Partials/problem-stems/lc399.md';

<!-- 400 - 499 -->
import LC410PS from '@site/docs/_Partials/problem-stems/lc410.md';
import LC424PS from '@site/docs/_Partials/problem-stems/lc424.md';
import LC433PS from '@site/docs/_Partials/problem-stems/lc433.md';
import LC437PS from '@site/docs/_Partials/problem-stems/lc437.md';
import LC438PS from '@site/docs/_Partials/problem-stems/lc438.md';
import LC450PS from '@site/docs/_Partials/problem-stems/lc450.md';
import LC463PS from '@site/docs/_Partials/problem-stems/lc463.md';
import LC480PS from '@site/docs/_Partials/problem-stems/lc480.md';
import LC485PS from '@site/docs/_Partials/problem-stems/lc485.md';
import LC496PS from '@site/docs/_Partials/problem-stems/lc496.md';

<!-- 500 - 599 -->
import LC502PS from '@site/docs/_Partials/problem-stems/lc502.md';
import LC503PS from '@site/docs/_Partials/problem-stems/lc503.md';
import LC515PS from '@site/docs/_Partials/problem-stems/lc515.md';
import LC525PS from '@site/docs/_Partials/problem-stems/lc525.md';
import LC530PS from '@site/docs/_Partials/problem-stems/lc530.md';
import LC542PS from '@site/docs/_Partials/problem-stems/lc542.md';
import LC543PS from '@site/docs/_Partials/problem-stems/lc543.md';
import LC547PS from '@site/docs/_Partials/problem-stems/lc547.md';
import LC557PS from '@site/docs/_Partials/problem-stems/lc557.md';
import LC560PS from '@site/docs/_Partials/problem-stems/lc560.md';
import LC563PS from '@site/docs/_Partials/problem-stems/lc563.md';
import LC567PS from '@site/docs/_Partials/problem-stems/lc567.md';

<!-- 600 - 699 -->
import LC632PS from '@site/docs/_Partials/problem-stems/lc632.md';
import LC633PS from '@site/docs/_Partials/problem-stems/lc633.md';
import LC637PS from '@site/docs/_Partials/problem-stems/lc637.md';
import LC643PS from '@site/docs/_Partials/problem-stems/lc643.md';
import LC649PS from '@site/docs/_Partials/problem-stems/lc649.md';
import LC658PS from '@site/docs/_Partials/problem-stems/lc658.md';
import LC692PS from '@site/docs/_Partials/problem-stems/lc692.md';
import LC695PS from '@site/docs/_Partials/problem-stems/lc695.md';

<!-- 700 - 799 -->
import LC700PS from '@site/docs/_Partials/problem-stems/lc700.md';
import LC701PS from '@site/docs/_Partials/problem-stems/lc701.md';
import LC703PS from '@site/docs/_Partials/problem-stems/lc703.md';
import LC704PS from '@site/docs/_Partials/problem-stems/lc704.md';
import LC713PS from '@site/docs/_Partials/problem-stems/lc713.md';
import LC724PS from '@site/docs/_Partials/problem-stems/lc724.md';
import LC735PS from '@site/docs/_Partials/problem-stems/lc735.md';
import LC739PS from '@site/docs/_Partials/problem-stems/lc739.md';
import LC743PS from '@site/docs/_Partials/problem-stems/lc743.md';
import LC746PS from '@site/docs/_Partials/problem-stems/lc746.md';
import LC752PS from '@site/docs/_Partials/problem-stems/lc752.md';
import LC771PS from '@site/docs/_Partials/problem-stems/lc771.md';
import LC787PS from '@site/docs/_Partials/problem-stems/lc787.md';
import LC791PS from '@site/docs/_Partials/problem-stems/lc791.md';
import LC797PS from '@site/docs/_Partials/problem-stems/lc797.md';

<!-- 800 - 899 -->
import LC841PS from '@site/docs/_Partials/problem-stems/lc841.md';
import LC844PS from '@site/docs/_Partials/problem-stems/lc844.md';
import LC863PS from '@site/docs/_Partials/problem-stems/lc863.md';
import LC872PS from '@site/docs/_Partials/problem-stems/lc872.md';
import LC875PS from '@site/docs/_Partials/problem-stems/lc875.md';
import LC876PS from '@site/docs/_Partials/problem-stems/lc876.md';
import LC881PS from '@site/docs/_Partials/problem-stems/lc881.md';

<!-- 900 - 999 -->
import LC901PS from '@site/docs/_Partials/problem-stems/lc901.md';
import LC905PS from '@site/docs/_Partials/problem-stems/lc905.md';
import LC907PS from '@site/docs/_Partials/problem-stems/lc907.md';
import LC909PS from '@site/docs/_Partials/problem-stems/lc909.md';
import LC912PS from '@site/docs/_Partials/problem-stems/lc912.md';
import LC917PS from '@site/docs/_Partials/problem-stems/lc917.md';
import LC933PS from '@site/docs/_Partials/problem-stems/lc933.md';
import LC938PS from '@site/docs/_Partials/problem-stems/lc938.md';
import LC946PS from '@site/docs/_Partials/problem-stems/lc946.md';
import LC947PS from '@site/docs/_Partials/problem-stems/lc947.md';
import LC965PS from '@site/docs/_Partials/problem-stems/lc965.md';
import LC967PS from '@site/docs/_Partials/problem-stems/lc967.md';
import LC973PS from '@site/docs/_Partials/problem-stems/lc973.md';
import LC977PS from '@site/docs/_Partials/problem-stems/lc977.md';
import LC986PS from '@site/docs/_Partials/problem-stems/lc986.md';
import LC990PS from '@site/docs/_Partials/problem-stems/lc990.md';
import LC994PS from '@site/docs/_Partials/problem-stems/lc994.md';
import LC997PS from '@site/docs/_Partials/problem-stems/lc997.md';

<!-- 1000 - 1099 -->
import LC1004PS from '@site/docs/_Partials/problem-stems/lc1004.md';
import LC1020PS from '@site/docs/_Partials/problem-stems/lc1020.md';
import LC1026PS from '@site/docs/_Partials/problem-stems/lc1026.md';
import LC1038PS from '@site/docs/_Partials/problem-stems/lc1038.md';
import LC1046PS from '@site/docs/_Partials/problem-stems/lc1046.md';
import LC1047PS from '@site/docs/_Partials/problem-stems/lc1047.md';
import LC1063PS from '@site/docs/_Partials/problem-stems/lc1063.md';
import LC1091PS from '@site/docs/_Partials/problem-stems/lc1091.md';

<!-- 1100 - 1199 -->
import LC1129PS from '@site/docs/_Partials/problem-stems/lc1129.md';
import LC1133PS from '@site/docs/_Partials/problem-stems/lc1133.md';
import LC1161PS from '@site/docs/_Partials/problem-stems/lc1161.md';
import LC1189PS from '@site/docs/_Partials/problem-stems/lc1189.md';
import LC1196PS from '@site/docs/_Partials/problem-stems/lc1196.md';

<!-- 1200 - 1299 -->
import LC1208PS from '@site/docs/_Partials/problem-stems/lc1208.md';
import LC1231PS from '@site/docs/_Partials/problem-stems/lc1231.md';
import LC1248PS from '@site/docs/_Partials/problem-stems/lc1248.md';
import LC1283PS from '@site/docs/_Partials/problem-stems/lc1283.md';
import LC1290PS from '@site/docs/_Partials/problem-stems/lc1290.md';
import LC1293PS from '@site/docs/_Partials/problem-stems/lc1293.md';

<!-- 1300 - 1399 -->
import LC1305PS from '@site/docs/_Partials/problem-stems/lc1305.md';
import LC1302PS from '@site/docs/_Partials/problem-stems/lc1302.md';
import LC1306PS from '@site/docs/_Partials/problem-stems/lc1306.md';
import LC1323PS from '@site/docs/_Partials/problem-stems/lc1323.md';
import LC1325PS from '@site/docs/_Partials/problem-stems/lc1325.md';
import LC1338PS from '@site/docs/_Partials/problem-stems/lc1338.md';
import LC1372PS from '@site/docs/_Partials/problem-stems/lc1372.md';
import LC1376PS from '@site/docs/_Partials/problem-stems/lc1376.md';

<!-- 1400 - 1499 -->
import LC1413PS from '@site/docs/_Partials/problem-stems/lc1413.md';
import LC1426PS from '@site/docs/_Partials/problem-stems/lc1426.md';
import LC1436PS from '@site/docs/_Partials/problem-stems/lc1436.md';
import LC1438PS from '@site/docs/_Partials/problem-stems/lc1438.md';
import LC1446PS from '@site/docs/_Partials/problem-stems/lc1446.md';
import LC1448PS from '@site/docs/_Partials/problem-stems/lc1448.md';
import LC1456PS from '@site/docs/_Partials/problem-stems/lc1456.md';
import LC1466PS from '@site/docs/_Partials/problem-stems/lc1466.md';
import LC1475PS from '@site/docs/_Partials/problem-stems/lc1475.md';
import LC1480PS from '@site/docs/_Partials/problem-stems/lc1480.md';
import LC1481PS from '@site/docs/_Partials/problem-stems/lc1481.md';
import LC1482PS from '@site/docs/_Partials/problem-stems/lc1482.md';
import LC1496PS from '@site/docs/_Partials/problem-stems/lc1496.md';

<!-- 1500 - 1599 -->
import LC1514PS from '@site/docs/_Partials/problem-stems/lc1514.md';
import LC1544PS from '@site/docs/_Partials/problem-stems/lc1544.md';
import LC1552PS from '@site/docs/_Partials/problem-stems/lc1552.md';
import LC1557PS from '@site/docs/_Partials/problem-stems/lc1557.md';

<!-- 1600 - 1699 -->
import LC1609PS from '@site/docs/_Partials/problem-stems/lc1609.md';
import LC1615PS from '@site/docs/_Partials/problem-stems/lc1615.md';
import LC1631PS from '@site/docs/_Partials/problem-stems/lc1631.md';
import LC1657PS from '@site/docs/_Partials/problem-stems/lc1657.md';
import LC1673PS from '@site/docs/_Partials/problem-stems/lc1673.md';

<!-- 1700 - 1799 -->
import LC1710PS from '@site/docs/_Partials/problem-stems/lc1710.md';
import LC1721PS from '@site/docs/_Partials/problem-stems/lc1721.md';
import LC1732PS from '@site/docs/_Partials/problem-stems/lc1732.md';

<!-- 1800 - 1899 -->
import LC1832PS from '@site/docs/_Partials/problem-stems/lc1832.md';
import LC1845PS from '@site/docs/_Partials/problem-stems/lc1845.md';
import LC1870PS from '@site/docs/_Partials/problem-stems/lc1870.md';

<!-- 1900 - 1999 -->
import LC1905PS from '@site/docs/_Partials/problem-stems/lc1905.md';
import LC1926PS from '@site/docs/_Partials/problem-stems/lc1926.md';
import LC1941PS from '@site/docs/_Partials/problem-stems/lc1941.md';
import LC1944PS from '@site/docs/_Partials/problem-stems/lc1944.md';
import LC1971PS from '@site/docs/_Partials/problem-stems/lc1971.md';

<!-- 2000 - 2099 -->
import LC2000PS from '@site/docs/_Partials/problem-stems/lc2000.md';
import LC2074PS from '@site/docs/_Partials/problem-stems/lc2074.md';
import LC2090PS from '@site/docs/_Partials/problem-stems/lc2090.md';
import LC2095PS from '@site/docs/_Partials/problem-stems/lc2095.md';

<!-- 2100 - 2199 -->
import LC2101PS from '@site/docs/_Partials/problem-stems/lc2101.md';
import LC2104PS from '@site/docs/_Partials/problem-stems/lc2104.md';
import LC2126PS from '@site/docs/_Partials/problem-stems/lc2126.md';
import LC2130PS from '@site/docs/_Partials/problem-stems/lc2130.md';
import LC2182PS from '@site/docs/_Partials/problem-stems/lc2182.md';
import LC2192PS from '@site/docs/_Partials/problem-stems/lc2192.md';

<!-- 2200 - 2299 -->
import LC2208PS from '@site/docs/_Partials/problem-stems/lc2208.md';
import LC2225PS from '@site/docs/_Partials/problem-stems/lc2225.md';
import LC2248PS from '@site/docs/_Partials/problem-stems/lc2248.md';
import LC2260PS from '@site/docs/_Partials/problem-stems/lc2260.md';
import LC2270PS from '@site/docs/_Partials/problem-stems/lc2270.md';
import LC2294PS from '@site/docs/_Partials/problem-stems/lc2294.md';

<!-- 2300 - 2399 -->
import LC2300PS from '@site/docs/_Partials/problem-stems/lc2300.md';
import LC2336PS from '@site/docs/_Partials/problem-stems/lc2336.md';
import LC2342PS from '@site/docs/_Partials/problem-stems/lc2342.md';
import LC2351PS from '@site/docs/_Partials/problem-stems/lc2351.md';
import LC2352PS from '@site/docs/_Partials/problem-stems/lc2352.md';
import LC2368PS from '@site/docs/_Partials/problem-stems/lc2368.md';
import LC2389PS from '@site/docs/_Partials/problem-stems/lc2389.md';
import LC2390PS from '@site/docs/_Partials/problem-stems/lc2390.md';
import LC2398PS from '@site/docs/_Partials/problem-stems/lc2398.md';

<!-- 2400 - 2499 -->
import LC2402PS from '@site/docs/_Partials/problem-stems/lc2402.md';
import LC2434PS from '@site/docs/_Partials/problem-stems/lc2434.md';
import LC2462PS from '@site/docs/_Partials/problem-stems/lc2462.md';
import LC2487PS from '@site/docs/_Partials/problem-stems/lc2487.md';

<!-- 2500 - 2599 -->
import LC2540PS from '@site/docs/_Partials/problem-stems/lc2540.md';

<!-- 2600 - 2699 -->
<!-- 2700 - 2799 -->
<!-- 2800 - 2899 -->
import LC2816PS from '@site/docs/_Partials/problem-stems/lc2816.md';

<!-- 2900 - 2999 -->
<!-- 3000 - 3099 -->
import LC3090PS from '@site/docs/_Partials/problem-stems/lc3090.md';

<!-- 3100 - 3199 -->
import LC3105PS from '@site/docs/_Partials/problem-stems/lc3105.md';

<!-- 3200 - 3299 -->
import LC3228PS from '@site/docs/_Partials/problem-stems/lc3228.md';

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

<BacktrackingTemplate />

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='46' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC46PS />

---

<LC46TSol />

</details>

<details>
<summary> <LC id='78' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC78PS />

---

<LC78TSol />

</details>

<details>
<summary> <LC id='77' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC77PS />

---

<LC77TSol />

</details>

<details>
<summary> <LC id='797' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC797PS />

---

<LC797TSol />

</details>

<details>
<summary> <LC id='17' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC17PS />

---

<LC17TSol />

</details>

<details>
<summary> <LC id='39' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC39PS />

---

<LC39TSol />

</details>

<details>
<summary> <LC id='79' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC79PS />

---

<LC79TSol />

</details>

<details>
<summary> <LC id='52' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC52PS />

---

<LC52TSol />

</details>

<details>
<summary> <LC id='22' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC22PS />

---

<LC22TSol />

</details>

<details>
<summary> <LC id='967' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC967PS />

---

<LC967TSol />

</details>

<details>
<summary> <LC id='216' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC216PS />

---

<LC216TSol />

</details>

</details>

## Binary search

### Array

<details>
<summary> Remarks</summary>

TBD

</details>

```python
def binary_search(arr, target):
    left = 0              # starting index of search range (inclusive)
    right = len(arr) - 1  # ending index of search range (inclusive)
    result = -1           # result of -1 indicates target has not been found yet

    while left <= right:                  # continue search while range is valid
        mid = left + (right - left) // 2  # prevent potential overflow
        if arr[mid] < target:             # target is in right half
            left = mid + 1                #   (move `left` to narrow search range to right half)
        elif arr[mid] > target:           # target is in left half
            right = mid - 1               #   (move `right` to narrow search range to left half)
        else:                             # target found (i.e., arr[mid] == target)
            result = mid                  # store index where target is found (early return, if desired)
            right = mid - 1               # uncomment to find first occurrence by narrowing search range to left half
            # left = mid + 1              # uncomment to find last occurrence by narrowing search range to right half
            
    if result != -1:
        return result                     # target was found; return its index
    else:
        return left                       # target was not found; return insertion point to maintain sorted order

# NOTES:
# only one of the following lines should be uncommented in the else clause: `right = mid - 1` and `left = mid + 1` should 
# `right = mid - 1` uncommented and `left = mid + 1` commented out results in searching for first occurrence of target
# `left = mid + 1` uncommented and `right = mid - 1` commented out results in searching for last occurrence of target
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

<details>
<summary> <LC id='35' type='long' ></LC> (&check;) </summary>

<LC35PS />

---

<LC35TSol />

</details>

<details>
<summary> <LC id='633' type='long' ></LC> <MyStar stars={1} /> </summary>

<LC633PS />

---

<LC633TSol />

</details>

<details>
<summary> <LC id='2300' type='long' ></LC> </summary>

<LC2300PS />

---

<LC2300TSol />

</details>

<details>
<summary> <LC id='2389' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC2389PS />

---

<LC2389TSol />

</details>

</details>

### Solution space

<details>
<summary> Remarks</summary>

<BinarySearchSolutionSpacesRemark />

</details>

```python
def binary_search_sol_space(arr):
    def possible(threshold):
        # this function is implemented depending on the problem
        return BOOLEAN

    left = MINIMUM_POSSIBLE_ANSWER  # minimum possible value in solution space (inclusive)
    right = MAXIMUM_POSSIBLE_ANSWER # maximum possible value in solution space (inclusive)
    result = -1                     # desired result (-1 to indicate no valid value found yet)
    
    while left <= right:            # continue search while range is valid
        mid = left + (right - left) // 2
        if possible(mid):
            result = mid            # mid satisfies condition; update result
            right = mid - 1         # adjust right to find smaller valid value (minimization)
        else:
            left = mid + 1          # mid doesn't satisfy condition; search right half
                                    # IMPORTANT: swap `right = mid - 1` and `left = mid + 1`
                                    #   if looking to maximize valid value (i.e., instead of minimize)
    
    return result                   # return best value found satisfying condition
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='875' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC875PS />

---

<LC875TSol />

</details>

<details>
<summary> <LC id='1631' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1631PS />

---

<LC1631TSol />

</details>

<details>
<summary> <LC id='1870' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC1870PS />

---

<LC1870TSol />

</details>

<details>
<summary> <LC id='1283' type='long' ></LC> (&check;) </summary>

<LC1283PS />

---

<LC1283TSol />

</details>

<details>
<summary> <LC id='410' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC410PS />

---

<LC410TSol />

</details>

<details>
<summary> <LC id='1482' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC1482PS />

---

<LC1482TSol />

</details>

<details>
<summary> <LC id='1231' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC1231PS />

---

<LC1231TSol />

</details>

<details>
<summary> <LC id='1552' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC1552PS />

---

<LC1552TSol />

</details>

</details>

## Dynamic programming

<details>
<summary> Remarks</summary>

TBD

</details>

```python title="Memoization"
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

```python title="Tabulation"
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

<details>
<summary> <LC id='746' type='long' ></LC> </summary>

<LC746PS />

---

<LC746TSol />

</details>

</details>

## Graphs

### BFS

<details>
<summary> Remarks</summary>

Assume the nodes are numbered from `0` to `n - 1` and the graph is given as an adjacency list. Depending on the problem, you may need to convert the input into an equivalent adjacency list before using the templates.

</details>

<details>
<summary> Basic motivation, concepts, and considerations for BFS</summary>

<GraphsBFSConsiderations />

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

<details>
<summary> <LC id='1091' type='long' ></LC> (&check;) </summary>

<LC1091PS />

---

<LC1091TSol />

</details>

<details>
<summary> <LC id='863' type='long' ></LC> (&check;) </summary>

<LC863PS />

---

<LC863TSol />

</details>

<details>
<summary> <LC id='542' type='long' ></LC> (&check;) </summary>

<LC542PS />

---

<LC542TSol />

</details>

<details>
<summary> <LC id='1293' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1293PS />

---

<LC1293TSol />

</details>

<details>
<summary> <LC id='1129' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1129PS />

---

<LC1129TSol />

</details>

<details>
<summary> <LC id='1926' type='long' ></LC> (&check;) </summary>

<LC1926PS />

---

<LC1926TSol />

</details>

<details>
<summary> <LC id='909' type='long' ></LC> (&check;) </summary>

<LC909PS />

---

<LC909TSol />

</details>

<details>
<summary> <LC id='1376' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC1376PS />

---

<LC1376TSol />

</details>

<details>
<summary> <LC id='994' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC994PS />

---

<LC994TSol />

</details>

</details>

### DFS (recursive)

<details>
<summary> Remarks</summary>

Assume the nodes are numbered from `0` to `n - 1` and the graph is given as an adjacency list. Depending on the problem, you may need to convert the input into an equivalent adjacency list before using the templates.

</details>

<details>
<summary> Basic motivation, concepts, and considerations for DFS</summary>

<GraphsDFSConsiderations />

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

<details>
<summary> <LC id='547' type='long' ></LC> (&check;) </summary>

<LC547PS />

---

<LC547TSol />

</details>

<details>
<summary> <LC id='200' type='long' ></LC> (&check;) </summary>

<LC200PS />

---

<LC200TSol />

</details>

<details>
<summary> <LC id='1466' type='long' ></LC> (&check;) </summary>

<LC1466PS />

---

<LC1466TSol />

</details>

<details>
<summary> <LC id='841' type='long' ></LC> (&check;) </summary>

<LC841PS />

---

<LC841TSol />

</details>

<details>
<summary> <LC id='1971' type='long' ></LC> (&check;) </summary>

<LC1971PS />

---

<LC1971TSol />

</details>

<details>
<summary> <LC id='323' type='long' ></LC> (&check;) </summary>

<LC323PS />

---

<LC323TSol />

</details>

<details>
<summary> <LC id='695' type='long' ></LC> (&check;) </summary>

<LC695PS />

---

<LC695TSol />

</details>

<details>
<summary> <LC id='2368' type='long' ></LC> (&check;) </summary>

<LC2368PS />

---

<LC2368TSol />

</details>

<details>
<summary> <LC id='1020' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC1020PS />

---

<LC1020TSol />

</details>

<details>
<summary> <LC id='2192' type='long' ></LC> (&check;) </summary>

<LC2192PS />

---

<LC2192TSol />

</details>

<details>
<summary> <LC id='990' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC990PS />

---

<LC990TSol />

</details>

<details>
<summary> <LC id='1905' type='long' ></LC> <MyStar stars={3} /> </summary>

<LC1905PS />

---

<LC1905TSol />

</details>

<details>
<summary> <LC id='947' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC947PS />

---

<LC947TSol />

</details>

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

### Topological sort (Kahn's algorithm)

<details>
<summary> Number of paths between nodes in a DAG</summary>

<GraphsTopsortNumPathsRemark />

</details>

<details>
<summary> SSSPs on DAGs (shortest and longest paths)</summary>

<GraphsTopsortSSSPRemark />

</details>

<details>
<summary> Inventing a topological sort algorithm (Kahn's algorithm)</summary>

<GraphsTopsortInventionRemark />

</details>

```python
# T: O(V + E); S: O(V + E)
def topological_sort(graph):
    n = len(graph)                        # n-vertex graph provided as an adjacency list
    in_degree = [0] * n                   # incoming degree for each node that will decrease as nodes 
    for node in range(n):                 # are 'peeled off' and placed in the generated topological order
        for neighbor in graph[node]:
            in_degree[neighbor] += 1
            
    deg_zero = []                         # nodes that have no incoming edges and are ready to be
    for node in range(n):                 # 'peeled off' and placed in the topological ordering
        if in_degree[node] == 0:
            deg_zero.append(node)
            
    top_order = []
    while deg_zero:
        node = deg_zero.pop()             # 'peel off' node and
        top_order.append(node)            # place in topological order
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                deg_zero.append(neighbor)
                
    if len(top_order) != n:               # cycle exists if all nodes can't be 'peeled off'
        return []
    
    return top_order
```

<details>
<summary> Examples</summary>

TBD

</details>

### Topological sort (DFS)

<details>
<summary> Motivation for DFS-based algorithm for finding a topological sort</summary>

<GraphsTopsortDFSMotivation />

</details>

<details>
<summary> Revised template when input is guaranteed to be a DAG</summary>

<GraphsTopsortDFSDAGInput />

</details>

```python
# T: O(V + E); S: O(V)
def topsort(graph):
    n = len(graph)      # graph assumed to be provided as an adjacency list of index arrays
    top_order = []
    visited = [0] * n   # 0: unvisited; 1: visiting; 2: visited
    
    def dfs(node):
        visited[node] = 1           # mark as visiting
        for nbr in graph[node]:
            if visited[nbr] == 0:   # visit unvisited neighbor
                if not dfs(nbr):
                    return False
            elif visited[nbr] == 1: # found a back edge: graph has a cycle
                return False
            
        visited[node] = 2           # mark as visited
        top_order.append(node)      # add node after all descendants have been visited
        return True
    
    for node in range(n):
        if not visited[node]:
            if not dfs(node):       # topological sort not possible
                return []           # (return empty list)
    
    return top_order
```

<details>
<summary> Examples</summary>

TBD

</details>

### Dijkstra (lazy)

<details>
<summary> How Dijkstra and BFS are similar but strikingly different</summary>

<GraphsDijkstraRemark />

</details>

<details>
<summary> Dijkstra with a target/destination node</summary>

<GraphsDijkstraTargetRemark />

</details>

<details>
<summary> Dijkstra with shortest path reconstruction</summary>

<GraphsDijkstraPathReconstructionRemark />

</details>

```python
# T: O(E log V); S: O(V + E)
def dijkstra(graph, source):
    n = len(graph)                          # Dijkstra on graph with n nodes (assumed to be adjacency list)
    distances = [float('inf')] * n          # "infinitely" far from source (unvisited nodes)
    distances[source] = 0
    min_heap = []
    heapq.heappush(min_heap, (0, source))   # heap contents: (d(v, source), v), where
                                            # d gives a distance from source node
                                            # to node v, another node in graph
    
    while min_heap:
        curr_dist, node = heapq.heappop(min_heap)
        if curr_dist > distances[node]:     # optimization for lazy Dijkstra: ignore current path
            continue                        # if we already found a better one (i.e., node was previously
                                            # extracted from min_heap with a smaller distance)
    
        for neighbor, weight in graph[node]:
            dist = curr_dist + weight
            if dist < distances[neighbor]:  # add neighbor to min_heap if it creates a shorter path
                distances[neighbor] = dist
                heapq.heappush(min_heap, (dist, neighbor))
    
    return distances
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='743' type='long' ></LC> (&check;) </summary>

<LC743PS />

---

<LC743TSol />

</details>

<details>
<summary> <LC id='787' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC787PS />

---

<LC787TSol />

</details>

<details>
<summary> <LC id='1514' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC1514PS />

---

<LC1514TSol />

</details>

</details>

### Bellman-Ford

<details>
<summary> Intuition for Bellman-Ford algorithm</summary>

<GraphsBellmanFordIntuitionRemark />

</details>

<details>
<summary> Why we do |V| - 1 iterations in Bellman-Ford</summary>

<GraphsBellmanFordRepetitionExplanationRemark />

</details>

<details>
<summary> Bellman-Ford with shortest path reconstruction</summary>

<GraphsBellmanFordPathReconstructionRemark />

</details>

<details>
<summary> Bellman-Ford to get shortest paths despite negative cycles</summary>

<GraphsBellmanFordNegativeCycleReachableNodesRemark />

</details>

<details>
<summary> Bellman-Ford with reconstructed negative cycle</summary>

<GraphsBellmanFordNegativeCycleReconstructionRemark />

</details>

```python
# T: O(VE); S: O(V + E)
def bellman_ford(graph, start):
    n = len(graph) # graph assumed to be an adjacency list of n nodes
    distances = [float('inf')] * n
    distances[start] = 0
    predecessors = [None] * n
    
    # main loop: run |V| - 1 times (i.e., n - 1 times)
    for _ in range(n - 1):
        # optimization: return early if no edge is updated after relaxing all edges
        edge_updated = False
        # relax every edge in the graph
        for node in range(n):
            for neighbor, weight in graph[node]:
                if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                    edge_updated = True
                    distances[neighbor] = distances[node] + weight
                    predecessors[neighbor] = node
        
        if not edge_updated:
            return distances, predecessors
    
    # run main loop 1 more time for negative cycle detection
    for node in range(n):
        for neighbor, weight in graph[node]:
            if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                return False
            
    return distances, predecessors
```

<details>
<summary> Examples</summary>

TBD

</details>

### Prim (lazy)

<details>
<summary> Why MST algorithms work: the cut property</summary>

<GraphsPrimCutPropertyRemark />

</details>

<details>
<summary> Mechanical overview of Prim's algorithm and similarity to Dijkstra</summary>

<GraphsPrimOverviewRemark />

</details>

<details>
<summary> Template discussion (key components and their roles)</summary>

<GraphsPrimTemplateDiscussionRemark />

</details>

<details>
<summary> Time and space complexity</summary>

<GraphsPrimTemplateTimeSpaceRemark />

</details>

```python
# T: O(E log V); S: O(V + E)
def prim(graph, start = 0):
    n = len(graph)              # n-node graph assumed to be an adjacency list
    dist = [float('inf')] * n   # infinite distance for each node upon initialization
    dist[start] = 0             # start can be any node, defaults to 0th node
    pred = [None] * n           # predecessors are marked as non-existant upon initialization
    visited = [False] * n       # no node has been visited upon initialization
    
    min_heap = []                           # use min heap to exploit cut property effectively
    heapq.heappush(min_heap, (0, start))    # node value: weight of incoming edge from intermediate MST
    while min_heap:
        _, node = heapq.heappop(min_heap)   # only the node itself is needed
        
        if visited[node]:                   # node is already part of the MST
            continue                        # (skip stale entries, prevent cycles)
        visited[node] = True                # add node to MST
        
        for nbr, w in graph[node]:
            if w < dist[nbr] and not visited[nbr]:  # ensure nbr is not already in MST and that edge weight from node to nbr is less than currently recorded min distance to nbr
                dist[nbr] = w                       # update minimum known distance from node to nbr 
                pred[nbr] = node                    # update predecessor of nbr to current node, recording the MST edge
                heapq.heappush(min_heap, (w, nbr))  # adds nbr to min heap with updated minimum distance as its priority
                                                    # (ensures next node selected will expand MST with the minimum possible total weight)
    
    return sum(dist), pred                          # sum(dist) = total weight of MST; pred = MST (can use to reconstruct)
```

<details>
<summary> Examples</summary>

TBD

</details>

### Union-find (disjoint sets)

<details>
<summary> References</summary>

<GraphsUnionFindReferencesRemark />

</details>

<details>
<summary> Union by size (instead of by rank)</summary>

<GraphsUnionFindBySizeRemark />

</details>

<details>
<summary> Union-find when number of vertices is not fixed (dynamic union-find)</summary>

<GraphsUnionFindDynamicRemark />

</details>

<details>
<summary> Union-find template with comments</summary>

<GraphsUnionFindTemplateWithCommentsRemark />

</details>

```python
# T: O(α(n)) per operation; S: O(n)
class UnionFind:
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
        self.rank = [0] * num_vertices

    def find(self, x):
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        
        rank_x = self.rank[root_x]
        rank_y = self.rank[root_y]
        if rank_x > rank_y:
            self.root[root_y] = root_x
        elif rank_x < rank_y:
            self.root[root_x] = root_y
        else:
            self.root[root_y] = root_x
            self.rank[root_x] += 1
            
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

<details>
<summary> Examples</summary>

TBD

</details>

### Kruskal

<details>
<summary> Kruskal's algorithm as an intuitive greedy approach for finding minimum spanning trees (MSTs) and a motivator for learning the union-find data structure</summary>

<GraphsKruskalExploreMotivateRemark />

</details>

<details>
<summary> Time and space complexity</summary>

<GraphsKruskalTemplateTimeSpaceRemark />

</details>

```python
# T: O(E log E); S: O(V + E)
def kruskal(graph, num_vertices):
    uf = UnionFind(num_vertices)  # assumes efficient implementation (e.g., union by rank with path compression)
    mst = []                      # the final MST as a list of edges
    mst_cost = 0                  # total edge cost of MST
    graph.sort(key=lambda edge: edge[2])  # sort edge list before greedily adding edges to MST
    for src, dst, wgt in graph:           # assumed edge formulation: [source, destination, weight]
        if not uf.connected(src, dst):    # add minimum edge (src, dst) to MST if src and dst are in separate components
            mst.append((src, dst))
            mst_cost += wgt
            uf.union(src, dst)            # connect src and dst so as to be in the same component
            
    return mst_cost, mst
```

<details>
<summary> Examples</summary>

TBD

</details>

### Boruvka

<details>
<summary> Remarks</summary>

TBD

</details>

```python
# T: O(α(n)) per operation; S: O(n)
class UnionFind:
    def __init__(self, num_vertices):
        self.root = [i for i in range(num_vertices)]
        self.rank = [0] * num_vertices

    def find(self, x):
        if self.root[x] != x:
            self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        
        rank_x = self.rank[root_x]
        rank_y = self.rank[root_y]
        if rank_x > rank_y:
            self.root[root_y] = root_x
        elif rank_x < rank_y:
            self.root[root_x] = root_y
        else:
            self.root[root_y] = root_x
            self.rank[root_x] += 1
            
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

def boruvka(edge_list, n):
    uf = UnionFind(n)   # union-find structure to efficiently manage connected components
    mst = []            # list to store edges included in the final returned MST
    num_components = n  # number of components (starts with n, where each vertex is its own component)
    
    # current edge list to process (size is reduced from phase to phase)
    # (used for edge removal optimization)
    current_edge_list = [ edge[:] for edge in edge_list ]
    
    # continue until all vertices are connected into a single component
    while num_components > 1:
        cheapest = [None] * n   # initialize cheapest edge for each component to None
                                # (index corresponds to component's representative or root in union-find structure)
        
        new_edge_list = []      # prepare new edge list for next phase (for edge removal optimization)
        
        # iterate over all edges to find cheapest outgoing edge from each component
        for edge in current_edge_list:
            u, v, weight = edge
            comp_u = uf.find(u) # find component (root) of vertex u
            comp_v = uf.find(v) # find component (root) of vertex v
            if comp_u != comp_v:# consider edge (u,v) if u and v are in different components
                new_edge_list.append(edge) # keep edge for next phase
                # check if edge is cheapest for component comp_u
                if cheapest[comp_u] is None or is_preferred_over(edge, cheapest[comp_u]):
                    cheapest[comp_u] = edge
                # check if edge is cheapest for component comp_v
                if cheapest[comp_v] is None or is_preferred_over(edge, cheapest[comp_v]):
                    cheapest[comp_v] = edge
            # edges connecting vertices within same component are ignored
        
        current_edge_list = new_edge_list # update edge list to only include edges connecting different components
        print(cheapest)
        print(f'Components before merge: {[uf.find(i) for i in range(n)]}')
        
        # add cheapest edges to MST and merge components
        edges_added = False                     # track whether or not any edges were added in a phase
        for i in range(n):
            if cheapest[i] is not None:
                u, v, weight = cheapest[i]
                                                # attempt to union components
                if uf.union(u, v):              # (union() returns True if a merge occurs, False otherwise)
                    mst.append([u, v, weight])  # add edge to MST
                    num_components -= 1         # decrement component count
                    edges_added = True          # an edge was added to the MST in this pase
        
        print(f'Components after merge: {[uf.find(i) for i in range(n)]}')
        # if no edges were added, then MST cannot be formed (graph may be disconnected)
        if not edges_added:
            return []
    
    return mst

# determines if edge1 is preferred over edge2 (based on weight and tie-breaking rules)
def is_preferred_over(edge1, edge2):
    if edge2 is None:
        return True
    weight1 = edge1[2]
    weight2 = edge2[2]
    if weight1 < weight2:
        return True
    elif weight1 > weight2:
        return False
    else:
        return tie_breaking_rule(edge1, edge2)

# tie-breaking rule for when edge weights are equal
# edges are compared based on vertex indices
# (first by smaller vertex index (u), then by larger vertex index (v))
def tie_breaking_rule(edge1, edge2):
    u1, v1 = sorted((edge1[0], edge1[1]))
    u2, v2 = sorted((edge2[0], edge2[1]))
    if u1 < u2:
        return True
    elif u1 > u2:
        return False
    else:
        return v1 < v2
```

<details>
<summary> Examples</summary>

TBD

</details>

### Kosaraju (SCC)

<details>
<summary> Basic motivation, concepts, and considerations for Kosaraju</summary>

<GraphsKosarajuMotivationRemark />

</details>

```python
# T: O(V + E); S: O(V + E)
def kosaraju(graph):
    n = len(graph)          # graph assumed to be adjacency list of index arrays
    visited = [False] * n
    finish_order = []       # stack of nodes to be ordered based on finish time (first to last)

    # transpose the given graph (reverses all edges)
    def transpose_graph(graph):
        gt = [[] for _ in range(n)]
        for node in range(n):
            for nbr in graph[node]:
                gt[nbr].append(node)  # reverse edge direction
        return gt

    # first DFS pass: record finish times of nodes
    def dfs_first_pass(node):
        visited[node] = True            # mark current node as visited
        for nbr in graph[node]:
            if not visited[nbr]:
                dfs_first_pass(nbr)     # visit all unvisited neighbors
        
        finish_order.append(node)       # add node to finish_order after all its descendants are visited

    # second DFS pass (on transposed graph): find strongly connected components (SCCs)
    def dfs_second_pass(node, component):
        visited[node] = True            # mark current node as visited
        component.append(node)          # add node to current SCC
        for nbr in graph_transpose[node]:
            if not visited[nbr]:
                dfs_second_pass(nbr, component)  # visit all unvisited neighbors

    # step 1: perform DFS on original graph to compute finish times
    for node in range(n):
        if not visited[node]:
            dfs_first_pass(node)

    # step 2: create transpose graph (reverse all edges of original graph)
    graph_transpose = transpose_graph(graph)

    # step 3: process all nodes in order of decreasing finish times
    visited = [False] * n   # reset visited array for second pass
    sccs = []               # initialize collection of SCCs
    while finish_order:     # process nodes in order of decreasing finish times
        node = finish_order.pop()   # root (first node) of current SCC
        if not visited[node]:
            component = []          # store nodes in current SCC
            dfs_second_pass(node, component)  # perform DFS on transposed graph
            sccs.append(component)  # add component to overall list of SCCs

    return sccs  # return complete list of SCCs in topological order
```

<details>
<summary> Examples</summary>

TBD

</details>

### Tarjan (SCC)

<details>
<summary> Standard implementation as it appears on Wikipedia (distinguish between tree edges and back edges)</summary>

<GraphsTarjanStandardImplementation />

</details>

<details>
<summary> Slight divergence from core template below to William Fiset's template (return SCCs not low-link values)</summary>

<GraphsTarjanTemplateDivergence />

</details>

```python
# T: O(V + E); S: O(V)
def tarjan(graph):
    n = len(graph)          # graph assumed to be adjacency list of index arrays
    node_id = 0             # unique node_id assigned to each node
    ids = [-1] * n          # id of each node
    low_link = [0] * n      # store lowest id node reachable from each node
    on_stack = [False] * n  # boolean array to check if a node is on the stack
    stack = []              # stack to keep track of nodes in current SCC
    sccs = []               # list to store all SCCs

    def dfs(node):
        nonlocal node_id
        low_link[node] = node_id    # initialize low_link value of node to be its own node_id
        ids[node] = node_id         # assign smallest unused node_id to node
        node_id += 1                # increment node_id value to ensure later nodes have higher node_id values
        stack.append(node)          # push node onto the stack
        on_stack[node] = True       # mark node as being on the stack

        # explore all outgoing edges from the node
        for nbr in graph[node]:
            if ids[nbr] == -1:      # visit nbr if it has not yet been visited
                dfs(nbr)
            if on_stack[nbr]:       # nbr is on stack, thus part of current SCC (minimize low-link on callback)
                low_link[node] = min(low_link[node], low_link[nbr])

        # if node is a root node of an SCC, pop from stack and generate SCC
        if ids[node] == low_link[node]:
            scc = []
            while stack:
                scc_nbr = stack.pop()
                on_stack[scc_nbr] = False
                low_link[scc_nbr] = ids[node]
                scc.append(scc_nbr)
                if scc_nbr == node:
                    break
                
            sccs.append(scc)  # add SCC to overall list of SCCs

    # initialize top-level DFS traversals
    for v in range(n):
        if ids[v] == -1:
            dfs(v)

    return sccs  # return list of SCCs
```

<details>
<summary> Examples</summary>

TBD

</details>

### Implicit

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
<summary> <LC id='752' type='long' ></LC> (&check;) </summary>

<LC752PS />

---

<LC752TSol />

</details>

<details>
<summary> <LC id='399' type='long' ></LC> (&check;) </summary>

<LC399PS />

---

<LC399TSol />

</details>

<details>
<summary> <LC id='433' type='long' ></LC> (&check;) </summary>

<LC433PS />

---

<LC433TSol />

</details>

<details>
<summary> <LC id='1306' type='long' ></LC> (&check;) </summary>

<LC1306PS />

---

<LC1306TSol />

</details>

<details>
<summary> <LC id='2101' type='long' ></LC> (&check;) </summary>

<LC2101PS />

---

<LC2101TSol />

</details>

</details>

### General

<details>
<summary> Remarks</summary>

TBD

</details>

```python

```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='1557' type='long' ></LC> (&check;) </summary>

<LC1557PS />

---

<LC1557TSol />

</details>

<details>
<summary> <LC id='997' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC997PS />

---

<LC997TSol />

</details>

<details>
<summary> <LC id='1615' type='long' ></LC> (&check;) </summary>

<LC1615PS />

---

<LC1615TSol />

</details>

<details>
<summary> <LC id='463' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC463PS />

---

<LC463TSol />

</details>

</details>

## Greedy algorithms

<details>
<summary> Remarks</summary>

TBD

</details>

```python
# TBD
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='2126' type='long' ></LC> (&check;) </summary>

<LC2126PS />

---

<LC2126TSol />

</details>

<details>
<summary> <LC id='2294' type='long' ></LC> (&check;) </summary>

<LC2294PS />

---

<LC2294TSol />

</details>

<details>
<summary> <LC id='502' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC502PS />

---

<LC502TSol />

</details>

<details>
<summary> <LC id='1481' type='long' ></LC> (&check;) </summary>

<LC1481PS />

---

<LC1481TSol />

</details>

<details>
<summary> <LC id='881' type='long' ></LC> (&check;) </summary>

<LC881PS />

---

<LC881TSol />

</details>

<details>
<summary> <LC id='1323' type='long' ></LC> (&check;) </summary>

<LC1323PS />

---

<LC1323TSol />

</details>

<details>
<summary> <LC id='1710' type='long' ></LC> (&check;) </summary>

<LC1710PS />

---

<LC1710TSol />

</details>

<details>
<summary> <LC id='1196' type='long' ></LC> (&check;) </summary>

<LC1196PS />

---

<LC1196TSol />

</details>

<details>
<summary> <LC id='1338' type='long' ></LC> (&check;) </summary>

<LC1338PS />

---

<LC1338TSol />

</details>

<details>
<summary> <LC id='3228' type='long' ></LC> <MyStar stars={1} /> </summary>

<LC3228PS />

---

<LC3228TSol />

</details>

</details>

## Heaps

### Top k

<details>
<summary> Remarks</summary>

TBD

</details>

```python
# TBD
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='347' type='long' ></LC> (&check;) </summary>

<LC347PS />

---

<LC347TSol />

</details>

<details>
<summary> <LC id='658' type='long' ></LC> (&check;) </summary>

<LC658PS />

---

<LC658TSol />

</details>

<details>
<summary> <LC id='215' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC215PS />

---

<LC215TSol />

</details>

<details>
<summary> <LC id='973' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC973PS />

---

<LC973TSol />

</details>

<details>
<summary> <LC id='703' type='long' ></LC> (&check;) </summary>

<LC703PS />

---

<LC703TSol />

</details>

<details>
<summary> <LC id='692' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC692PS />

---

<LC692TSol />

</details>

</details>

### Multiple heaps

<details>
<summary> Remarks</summary>

TBD

</details>

```python
# TBD
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='295' type='long' ></LC> (&check;) </summary>

<LC295PS />

---

<LC295TSol />

</details>

<details>
<summary> <LC id='480' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC480PS />

---

<LC480TSol />

</details>

<details>
<summary> <LC id='2462' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC2462PS />

---

<LC2462TSol />

</details>

<details>
<summary> <LC id='2402' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC2402PS />

---

<LC2402TSol />

</details>

</details>

### General

<details>
<summary> Remarks</summary>

TBD

</details>

```python
# TBD
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='1046' type='long' ></LC> (&check;) </summary>

<LC1046PS />

---

<LC1046TSol />

</details>

<details>
<summary> <LC id='2208' type='long' ></LC> (&check;) </summary>

<LC2208PS />

---

<LC2208TSol />

</details>

<details>
<summary> <LC id='1845' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1845PS />

---

<LC1845TSol />

</details>

<details>
<summary> <LC id='2336' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC2336PS />

---

<LC2336TSol />

</details>

<details>
<summary> <LC id='2182' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC2182PS />

---

<LC2182TSol />

</details>

<details>
<summary> <LC id='373' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC373PS />

---

<LC373TSol />

</details>

<details>
<summary> <LC id='632' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC632PS />

---

<LC632TSol />

</details>

</details>

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

<details>
<summary> <LC id='2487' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC2487PS />

---

<LC2487TSol2 />

</details>

<details>
<summary> <LC id='2816' type='long' ></LC> (&check;) </summary>

<LC2816PS />

---

<LC2816TSol />

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

### Restarting window

<details>
<summary> Remarks</summary>

"Restarting" windows are for problems where we're tasked with not only optimizing a certain property of a 1-dimensional input (oftentimes *maximizing* the *length* of a subarray or substring) but also where we may encounter elements which cause the entire window to become invalid, thus forcing us to start again from an empty window (i.e., `left == right`).

Mechanically, how restarting windows work is that the `right` pointer advances one by one, as usual, expanding the window, but the `left` pointer remains fixed until an element is encountered that effectively invalidates the entire window. When this happens, we need to start again with an empty window, which means moving the `left` pointer to wherever the `right` pointer resides (recall that `left == right` means we have an empty window), thus effectively "resetting" the window.

Generally speaking, because the `left` pointer stays fixed until the window restarts, we don't even need the `left` pointer: we simply update the window data structures as we advance the right pointer and reset the data structures when the window restarts.

Note that we most often initialize/restart the window to be empty, but sometimes it is more convenient to always have a single element within the window. We initialize the window data structures and the result (the best window found so far) accordingly.

</details>

```python
def fn(arr):
    structs = ...                         # window data structures initialized for the starting window
    ans = ...                             # value of the starting window (example: 0)

    for right in range(1, len(arr) + 1):  # the '1' depends on the starting window size
        if WINDOW_IS_INVALID:             # adding arr[right - 1] invalidates the window somehow
            structs = ...                 # RESET data structures for maintaining the window
        else:
            structs += ...                # UPDATE data structures to reflect addition of arr[right - 1] to the window
            ans = max(ans, ...)           # update ans if the current window is better

    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='485' type='long' ></LC> (&malt;) </summary>

<LC485PS />

---

<LC485TSol />

</details>

<details>
<summary> <LC id='1446' type='long' ></LC> (&malt;) </summary>

<LC1446PS />

---

<LC1446TSol />

</details>

<details>
<summary> <LC id='53' type='long' ></LC> (&malt;) </summary>

<LC53PS />

---

<LC53TSol />

</details>

</details>

### Fixed window size

<details>
<summary> Remarks</summary>

TBD

</details>

<details>
<summary> Building the initial window within the main loop instead of outside the main loop</summary>

<SlidingWindowFixedSizeWithinLoop />

</details>

```python
def fn(arr, k):
    structs = ...                 # window data structures initialized for the starting window
    for right in range(1, k + 1): # process k elements from indices 0 to k - 1, inclusive
      structs += ...              # update data structures to reflect addition of arr[right - 1] to window

    ans = ...                   # value of the window of size k
    for right in range(k + 1, len(arr) + 1): # process remaining elements in input
        structs += ...          # update data structures to reflect addition of arr[right - 1] to window
        structs -= ...          # update data structures to reflect removal of arr[right - 1] from window
        ans = max(ans, ...)     # update ans if the current window is better

    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> Most 1s in subarray of size k (&malt;, 💎) </summary>

<Sol21NoLC />

</details>

<details>
<summary> Max sum of subarray of size <code>k</code> (&check;)</summary>

<Sol23NoLC />

</details>

<details>
<summary> <LC id='643' type='long' ></LC> (&check;) </summary>

<LC643PS />

---

<LC643TSol />

</details>

<details>
<summary> <LC id='1456' type='long' ></LC> (&check;, &malt;) </summary>

<LC1456PS />

---

<LC1456TSol />

</details>

<details>
<summary> <LC id='567' type='long' ></LC> (&check;, &malt;) </summary>

<LC567PS />

---

<LC567TSol />

</details>

<details>
<summary> <LC id='438' type='long' ></LC> (&malt;) </summary>

<LC438PS />

---

<LC438TSol />

</details>

</details>

### Variable window size (maximum)

<details>
<summary> Remarks</summary>

<SlidingWindowVariableSizeRemark />

</details>

```python
def fn(arr):
    structs = ... # window data structures initialized for the starting window
    ans = ...     # value of the starting window (example: 0)
    left = 0      # initialize left = 0 (explicit) and right = 0 (implied)

    for right in range(1, len(arr) + 1):
        structs = ...                             # update data structures to reflect addition of arr[right - 1] to window
        while left < right and WINDOW_IS_INVALID: # adding arr[right - 1] invalidates the window somehow
            structs = ...                         # update data structures to reflect removal of arr[right - 1] from window
            left += 1                             # shrink window until it either becomes or empty (left == right) or is valid again
        ans = max(ans, right - left)              # length of "valid" window
        # ans += right - left                     # number of "valid" subarrays ending at 'right - 1' (when counting)

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
<summary> <LC id='1004' type='long' ></LC> (&check;, &malt;, 💎) </summary>

<LC1004PS />

---

<LC1004TSol />

</details>

<details>
<summary> <LC id='3' type='long' ></LC> (&check;, &malt;) <MyStar stars={2} /> </summary>

<LC3PS />

---

<LC3TSol />

</details>

<details>
<summary> <LC id='424' type='long' ></LC> (&malt;) </summary>

<LC424PS />

---

<LC424TSol />

</details>

<details>
<summary> <LC id='713' type='long' ></LC> (&check;) <MyStar /></summary>

<LC713PS />

---

<LC713TSol />

</details>

</details>

<details>
<summary> Examples (old way)</summary>

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
<summary> <LC id='3105' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC3105PS />

---

<LC3105TSol />

</details>

</details>

### Variable window size (minimum)

<details>
<summary> Remarks</summary>

TBD

</details>

```python
def fn(arr):
    structs = ... # window data structures initialized for the starting window
    ans = ...     # value of the starting window (example: float('inf'))
    left = 0      # initialize left = 0 (explicit) and right = 0 (implied)

    for right in range(1, len(arr) + 1):
        structs = ...                             # update data structures to reflect addition of arr[right - 1] to window
        while left < right and WINDOW_IS_VALID:   # adding arr[right - 1] makes the window valid somehow
            ans = max(ans, right - left)          # length of "valid" window
            structs = ...                         # update data structures to reflect removal of arr[left] from window
            left += 1                             # shrink window until it either becomes empty (left == right) or invalid again

    return ans
```

<details>
<summary> Examples</summary>

<details>
<summary> Shortest subarray with k 1s (&malt;) </summary>

<Sol22NoLC />

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

<details>
<summary> <LC id='2487' type='long' ></LC> <MyStar stars={3} /> </summary>

<LC2487PS />

---

<LC2487TSol />

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

### Level-order (BFS)

<details>
<summary> Remarks</summary>

tbd

</details>

```python
def fn(node):
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

<details>
<summary> Examples</summary>

<details>
<summary> <LC id='199' type='long' ></LC> (&check;) </summary>

<LC199PS />

---

<LC199TSol2 />

</details>

<details>
<summary> <LC id='515' type='long' ></LC> (&check;) </summary>

<LC515PS />

---

<LC515TSol />

</details>

<details>
<summary> <LC id='1302' type='long' ></LC> (&check;) </summary>

<LC1302PS />

---

<LC1302TSol />

</details>

<details>
<summary> <LC id='103' type='long' ></LC> (&check;) </summary>

<LC103PS />

---

<LC103TSol />

</details>

<details>
<summary> <LC id='102' type='long' ></LC> (&check;) </summary>

<LC102PS />

---

<LC102TSol />

</details>

<details>
<summary> <LC id='1161' type='long' ></LC> (&check;) </summary>

<LC1161PS />

---

<LC1161TSol />

</details>

<details>
<summary> <LC id='637' type='long' ></LC> (&check;) </summary>

<LC637PS />

---

<LC637TSol />

</details>

<details>
<summary> <LC id='1609' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1609PS />

---

<LC1609TSol />

</details>

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
<summary> <LC id='104' type='long' ></LC> (&check;) </summary>

<LC104PS />

---

<LC104TSol />

</details>

<details>
<summary> <LC id='112' type='long' ></LC> (&check;) </summary>

<LC112PS />

---

<LC112TSol />

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

<details>
<summary> <LC id='701' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC701PS />

---

<LC701TSol2 />

</details>

<details>
<summary> <LC id='1448' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1448PS />

---

<LC1448TSol2 />

</details>

<details>
<summary> <LC id='100' type='long' ></LC> (&check;) </summary>

<LC100PS />

---

<LC100TSol />

</details>

<details>
<summary> <LC id='236' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC236PS />

---

<LC236TSol />

</details>

<details>
<summary> <LC id='111' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC111PS />

---

<LC111TSol />

</details>

<details>
<summary> <LC id='1026' type='long' ></LC> (&check;) </summary>

<LC1026PS />

---

<LC1026TSol />

</details>

<details>
<summary> <LC id='938' type='long' ></LC> (&check;) </summary>

<LC938PS />

---

<LC938TSol />

</details>

<details>
<summary> <LC id='101' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC101PS />

---

<LC101TSol />

</details>

<details>
<summary> <LC id='1325' type='long' ></LC> (&check;) <MyStar stars={2} /> </summary>

<LC1325PS />

---

<LC1325TSol />

</details>

<details>
<summary> <LC id='235' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC235PS />

---

<LC235TSol />

</details>

<details>
<summary> <LC id='450' type='long' ></LC> (&check;) <MyStar stars={4} /> </summary>

<LC450PS />

---

<LC450TSol />

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
<summary> Longest unival vertical path (not on LeetCode) </summary>

<Sol8NoLC />

</details>

<details>
<summary> Find mode of a binary tree (not on LeetCode)</summary>

<Sol6NoLC />

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

<details>
<summary> <LC id='98' type='long' ></LC> <MyStar stars={1} /> </summary>

<LC98PS />

---

<LC98TSol />

</details>

<details>
<summary> <LC id='530' type='long' ></LC> </summary>

<LC530PS />

---

<LC530TSol />

</details>

<details>
<summary> <LC id='1038' type='long' ></LC> </summary>

<LC1038PS />

---

<LC1038TSol />

</details>

<details>
<summary> <LC id='700' type='long' ></LC> </summary>

<LC700PS />

---

<LC700TSol />

</details>

<details>
<summary> <LC id='701' type='long' ></LC> </summary>

<LC701PS />

---

<LC701TSol />

</details>

<details>
<summary> <LC id='270' type='long' ></LC> <MyStar stars={1} /> </summary>

<LC270PS />

---

<LC270TSol />

</details>

<details>
<summary> <LC id='1448' type='long' ></LC> (&check;) </summary>

<LC1448PS />

---

<LC1448TSol />

</details>

<details>
<summary> <LC id='111' type='long' ></LC> (&check;) </summary>

<LC111PS />

---

<LC111TSol2 />

</details>

<details>
<summary> <LC id='199' type='long' ></LC> (&check;) </summary>

<LC199PS />

---

<LC199TSol />

</details>

<details>
<summary> <LC id='872' type='long' ></LC> (&check;) </summary>

<LC872PS />

---

<LC872TSol />

</details>

<details>
<summary> <LC id='113' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

<LC113PS />

---

<LC113TSol />

</details>

<details>
<summary> <LC id='437' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC437PS />

---

<LC437TSol />

</details>

<details>
<summary> <LC id='1305' type='long' ></LC> (&check;) </summary>

<LC1305PS />

---

<LC1305TSol />

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
<summary> Find height of a tree node (not on LeetCode) </summary>

<Sol7NoLC />

</details>

<details>
<summary> <LC id='543' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC543PS />

---

<LC543TSol />

</details>

<details>
<summary> <LC id='563' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC563PS />

---

<LC563TSol />

</details>

<details>
<summary> <LC id='110' type='long' ></LC> <MyStar stars={2} /> </summary>

<LC110PS />

---

<LC110TSol />

</details>

<details>
<summary> <LC id='1372' type='long' ></LC> (&check;) <MyStar stars={3} /> </summary>

<LC1372PS />

---

<LC1372TSol />

</details>

</details>

## Two pointers

### Opposite ends

<details>
<summary> Remarks</summary>

<TwoPointersOppositeEndsRemark />

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

<TwoPointersExhaustInputsRemark />

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

<TwoPointersFastSlowRemark />

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
<summary> <LC id='392' type='long' ></LC> (&check;)</summary>

<LC392PS />

---

<LC392TSol />

</details>

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
<summary> Determining unique numbers based on non-existent off-by-ones (&check;) </summary>

Given an integer array `nums`, find all the *unique* numbers `x` in `nums` that satisfy the following: `x + 1` is not in `nums`, and `x - 1` is not in `nums`.

---

<Sol20NoLC />

</details>

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

<HashingCountingRemark />

</details>

<details>
<summary> <code>defaultdict</code> in Python </summary>

<HashingDefaultdictRemark />

</details>

```python
from collections import defaultdict

def fn(s):
    freqs = defaultdict(int)
    for char in s:
        freqs[char] += 1

    return freqs
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
<summary> <LC id='1133' type='long' ></LC> (&check;) </summary>

<LC1133PS />

---

<LC1133TSol />

</details>

<details>
<summary> <LC id='1189' type='long' ></LC> (&check;) </summary>

<LC1189PS />

---

<LC1189TSol />

</details>

<details>
<summary> <LC id='2260' type='long' ></LC> (&check;) <MyStar stars={1} /> </summary>

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

#### Complementary prefixes to determine "exact" number of subarrays

<details>
<summary> Remarks</summary>

<HashingPrefixesTemplateRemark />

</details>

```python
def fn(nums, k):
    lookup = defaultdict(int)   # initialize prefix lookup for efficient references
    lookup[0] = 1               # handle "empty prefix" reference
    curr = 0                    # initialize current prefix (maintained throughout algorithm)
    ans = 0
    
    for i in range(len(nums)):
        num = nums[i]
        if CONDITION:
            curr += num         # update curr in a problem-specific way
                                # (updates will usually be conditional)
            
        ans += lookup[curr - k] # update answer based on inputs and lookup
                                # (updates usually depend on a complementary relationship
                                # between curr and previously seen prefixes in lookup)
        
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

### Kadane's algorithm {#kadane}

<details>
<summary> Template clarifications</summary>

<KadaneClarificationRemark />

</details>

<details>
<summary> Allow empty subarrays</summary>

<KadaneAllowEmptyRemark />

</details>

<details>
<summary> Return the actual subarray</summary>

<KadaneReturnSubarrayRemark />

</details>

<details>
<summary> Kadane's algorithm as a trivial case of dynamic programming</summary>

<KadaneDPRemark />

</details>

```python
# T: O(n); S: O(1)
def kadane(nums):
    max_sum = float('-inf')
    curr_sum = 0
    for i in range(len(nums)):
        num = nums[i]
        curr_sum = max(num, curr_sum + num) # maximum sum of a subarray ending at index i
        max_sum = max(max_sum, curr_sum)    # maximum sum found so far in entire array up through index i
    return max_sum
```

<details>
<summary> Examples</summary>

TBD

</details>

### Prefix sum

<details>
<summary> Remarks</summary>

<PrefixSumRemark />

</details>

<details>
<summary> Prefix sums that are not "sums"</summary>

<PrefixSumNonTraditionalRemark />

</details>

```python
# prefix sum WITH left padding
#     usage: prefix[j + 1] - prefix[i]
def prefix_sum(nums):
    prefix = [0, nums[0]]
    for i in range(1, len(nums)):
        prefix.append(nums[i] + prefix[-1])
        
    return prefix

# prefix sum WITHOUT left padding
#     usage: prefix[j] - prefix[i - 1] OR prefix[j] - prefix[i] + nums[i]
def prefix_sum(nums):
    prefix = [nums[0]]
    for i in range(1, len(nums)):
        prefix.append(nums[i] + prefix[-1])
        
    return prefix

# prefix sum built in-place
#     usage: nums[j] - nums[i - 1]
def prefix_sum(nums):
    for i in range(1, len(nums)):
        nums[i] = nums[i] + nums[i - 1]
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
