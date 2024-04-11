import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const muiLightTheme = createTheme({ palette: { mode: 'light' } });
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });

const difficultySortComparator = (v1, v2) => {
  const order = { Easy: 1, Medium: 2, Hard: 3 };
  return order[v1] - order[v2];
};

const columns = [
	{ 
    field: 'problemNum',
    headerName: '#',
    width: 60,
  },
	{ 
    field: 'difficulty',
    headerName: 'Difficulty',
    width: 110,
    sortComparator: difficultySortComparator,
    renderCell: (params) => {
      let color;
      switch (params.value) {
        case 'Easy':
          color = '#5CB85C'; // Green
          break;
        case 'Medium':
          color = '#F0AD4E'; // Orange
          break;
        case 'Hard':
          color = '#D9534F'; // Red
          break;
        default:
          color = 'inherit'; // Default text color
      }

      return (
        <span style={{ color: color }}>
          {params.value}
        </span>
      );
    },
  },
	{ 
    field: 'acceptance',
    headerName: 'Acceptance',
    width: 110,
    valueFormatter: (params) => {
      return `${params.value}%`
    },
    renderCell: (params) => `${params.value}%`,
  },
	{ 
    field: 'title',
    headerName: 'Problem Title',
    minWidth: 650,
    valueFormatter: (params) => {
      return `LC ${params.id}. ${params.value}`
    },
    renderCell: (params) => (
      <a href={params.row.link} target="_blank" rel="noopener noreferrer">
        LC {params.row.problem}. {params.value}
      </a>
    ),
  },
  {
    field: 'link',
    width: 0,
    hide: true
  }
];

const rows = [
  {
    problemNum: 1,
    problem: 1475,
    difficulty: "Easy",
    acceptance: 77.5,
    title: "Final Prices With a Special Discount in a Shop",
    link: "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop",
  },
  {
    problemNum: 2,
    problem: 496,
    difficulty: "Easy",
    acceptance: 72.1,
    title: "Next Greater Element I",
    link: "https://leetcode.com/problems/next-greater-element-i",
  },
  {
    problemNum: 3,
    problem: 654,
    difficulty: "Medium",
    acceptance: 85.3,
    title: "Maximum Binary Tree",
    link: "https://leetcode.com/problems/maximum-binary-tree",
  },
  {
    problemNum: 4,
    problem: 1008,
    difficulty: "Medium",
    acceptance: 81.9,
    title: "Construct Binary Search Tree from Preorder Traversal",
    link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal",
  },
  {
    problemNum: 5,
    problem: 1762,
    difficulty: "Medium",
    acceptance: 79.5,
    title: "Buildings With an Ocean View",
    link: "https://leetcode.com/problems/buildings-with-an-ocean-view",
  },
  {
    problemNum: 6,
    problem: 2832,
    difficulty: "Medium",
    acceptance: 74,
    title: "Maximal Range That Each Element Is Maximum in It",
    link: "https://leetcode.com/problems/maximal-range-that-each-element-is-maximum-in-it",
  },
  {
    problemNum: 7,
    problem: 1130,
    difficulty: "Medium",
    acceptance: 67.8,
    title: "Minimum Cost Tree From Leaf Values",
    link: "https://leetcode.com/problems/minimum-cost-tree-from-leaf-values",
  },
  {
    problemNum: 8,
    problem: 739,
    difficulty: "Medium",
    acceptance: 66,
    title: "Daily Temperatures",
    link: "https://leetcode.com/problems/daily-temperatures",
  },
  {
    problemNum: 9,
    problem: 901,
    difficulty: "Medium",
    acceptance: 65.7,
    title: "Online Stock Span",
    link: "https://leetcode.com/problems/online-stock-span",
  },
  {
    problemNum: 10,
    problem: 2487,
    difficulty: "Medium",
    acceptance: 65.6,
    title: "Remove Nodes From Linked List",
    link: "https://leetcode.com/problems/remove-nodes-from-linked-list",
  },
  {
    problemNum: 11,
    problem: 503,
    difficulty: "Medium",
    acceptance: 63.8,
    title: "Next Greater Element II",
    link: "https://leetcode.com/problems/next-greater-element-ii",
  },
  {
    problemNum: 12,
    problem: 2104,
    difficulty: "Medium",
    acceptance: 61,
    title: "Sum of Subarray Ranges",
    link: "https://leetcode.com/problems/sum-of-subarray-ranges",
  },
  {
    problemNum: 13,
    problem: 1019,
    difficulty: "Medium",
    acceptance: 60.7,
    title: "Next Greater Node In Linked List",
    link: "https://leetcode.com/problems/next-greater-node-in-linked-list",
  },
  {
    problemNum: 14,
    problem: 1081,
    difficulty: "Medium",
    acceptance: 60.7,
    title: "Smallest Subsequence of Distinct Characters",
    link: "https://leetcode.com/problems/smallest-subsequence-of-distinct-characters",
  },
  {
    problemNum: 15,
    problem: 769,
    difficulty: "Medium",
    acceptance: 58.4,
    title: "Max Chunks To Make Sorted",
    link: "https://leetcode.com/problems/max-chunks-to-make-sorted",
  },
  {
    problemNum: 16,
    problem: 1504,
    difficulty: "Medium",
    acceptance: 57.2,
    title: "Count Submatrices With All Ones",
    link: "https://leetcode.com/problems/count-submatrices-with-all-ones",
  },
  {
    problemNum: 17,
    problem: 853,
    difficulty: "Medium",
    acceptance: 50.9,
    title: "Car Fleet",
    link: "https://leetcode.com/problems/car-fleet",
  },
  {
    problemNum: 18,
    problem: 1673,
    difficulty: "Medium",
    acceptance: 50.1,
    title: "Find the Most Competitive Subsequence",
    link: "https://leetcode.com/problems/find-the-most-competitive-subsequence",
  },
  {
    problemNum: 19,
    problem: 962,
    difficulty: "Medium",
    acceptance: 49.8,
    title: "Maximum Width Ramp",
    link: "https://leetcode.com/problems/maximum-width-ramp",
  },
  {
    problemNum: 20,
    problem: 1950,
    difficulty: "Medium",
    acceptance: 49.7,
    title: "Maximum of Minimum Values in All Subarrays",
    link: "https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays",
  },
  {
    problemNum: 21,
    problem: 316,
    difficulty: "Medium",
    acceptance: 49.6,
    title: "Remove Duplicate Letters",
    link: "https://leetcode.com/problems/remove-duplicate-letters",
  },
  {
    problemNum: 22,
    problem: 255,
    difficulty: "Medium",
    acceptance: 48.9,
    title: "Verify Preorder Sequence in Binary Search Tree",
    link: "https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree",
  },
  {
    problemNum: 23,
    problem: 2282,
    difficulty: "Medium",
    acceptance: 48.5,
    title: "Number of People That Can Be Seen in a Grid",
    link: "https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid",
  },
  {
    problemNum: 24,
    problem: 2297,
    difficulty: "Medium",
    acceptance: 46.5,
    title: "Jump Game VIII",
    link: "https://leetcode.com/problems/jump-game-viii",
  },
  {
    problemNum: 25,
    problem: 1996,
    difficulty: "Medium",
    acceptance: 43.9,
    title: "The Number of Weak Characters in the Game",
    link: "https://leetcode.com/problems/the-number-of-weak-characters-in-the-game",
  },
  {
    problemNum: 26,
    problem: 2865,
    difficulty: "Medium",
    acceptance: 43.3,
    title: "Beautiful Towers I",
    link: "https://leetcode.com/problems/beautiful-towers-i",
  },
  {
    problemNum: 27,
    problem: 1856,
    difficulty: "Medium",
    acceptance: 37.9,
    title: "Maximum Subarray Min-Product",
    link: "https://leetcode.com/problems/maximum-subarray-min-product",
  },
  {
    problemNum: 28,
    problem: 1574,
    difficulty: "Medium",
    acceptance: 37.8,
    title: "Shortest Subarray to be Removed to Make Array Sorted",
    link: "https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted",
  },
  {
    problemNum: 29,
    problem: 2345,
    difficulty: "Medium",
    acceptance: 37.6,
    title: "Finding the Number of Visible Mountains",
    link: "https://leetcode.com/problems/finding-the-number-of-visible-mountains",
  },
  {
    problemNum: 30,
    problem: 907,
    difficulty: "Medium",
    acceptance: 37.4,
    title: "Sum of Subarray Minimums",
    link: "https://leetcode.com/problems/sum-of-subarray-minimums",
  },
  {
    problemNum: 31,
    problem: 581,
    difficulty: "Medium",
    acceptance: 36.8,
    title: "Shortest Unsorted Continuous Subarray",
    link: "https://leetcode.com/problems/shortest-unsorted-continuous-subarray",
  },
  {
    problemNum: 32,
    problem: 1124,
    difficulty: "Medium",
    acceptance: 34.7,
    title: "Longest Well-Performing Interval",
    link: "https://leetcode.com/problems/longest-well-performing-interval",
  },
  {
    problemNum: 33,
    problem: 2866,
    difficulty: "Medium",
    acceptance: 34.3,
    title: "Beautiful Towers II",
    link: "https://leetcode.com/problems/beautiful-towers-ii",
  },
  {
    problemNum: 34,
    problem: 456,
    difficulty: "Medium",
    acceptance: 33.7,
    title: "132 Pattern",
    link: "https://leetcode.com/problems/132-pattern",
  },
  {
    problemNum: 35,
    problem: 402,
    difficulty: "Medium",
    acceptance: 31.1,
    title: "Remove K Digits",
    link: "https://leetcode.com/problems/remove-k-digits",
  },
  {
    problemNum: 36,
    problem: 2289,
    difficulty: "Medium",
    acceptance: 21.7,
    title: "Steps to Make Array Non-decreasing",
    link: "https://leetcode.com/problems/steps-to-make-array-non-decreasing",
  },
  {
    problemNum: 37,
    problem: 1063,
    difficulty: "Hard",
    acceptance: 78.3,
    title: "Number of Valid Subarrays",
    link: "https://leetcode.com/problems/number-of-valid-subarrays",
  },
  {
    problemNum: 38,
    problem: 1526,
    difficulty: "Hard",
    acceptance: 69.7,
    title: "Minimum Number of Increments on Subarrays to Form a Target Array",
    link: "https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array",
  },
  {
    problemNum: 39,
    problem: 1944,
    difficulty: "Hard",
    acceptance: 69.3,
    title: "Number of Visible People in a Queue",
    link: "https://leetcode.com/problems/number-of-visible-people-in-a-queue",
  },
  {
    problemNum: 40,
    problem: 1793,
    difficulty: "Hard",
    acceptance: 64.4,
    title: "Maximum Score of a Good Subarray",
    link: "https://leetcode.com/problems/maximum-score-of-a-good-subarray",
  },
  {
    problemNum: 41,
    problem: 42,
    difficulty: "Hard",
    acceptance: 61,
    title: "Trapping Rain Water",
    link: "https://leetcode.com/problems/trapping-rain-water",
  },
  {
    problemNum: 42,
    problem: 1776,
    difficulty: "Hard",
    acceptance: 54.7,
    title: "Car Fleet II",
    link: "https://leetcode.com/problems/car-fleet-ii",
  },
  {
    problemNum: 43,
    problem: 768,
    difficulty: "Hard",
    acceptance: 53.2,
    title: "Max Chunks To Make Sorted II",
    link: "https://leetcode.com/problems/max-chunks-to-make-sorted-ii",
  },
  {
    problemNum: 44,
    problem: 85,
    difficulty: "Hard",
    acceptance: 47,
    title: "Maximal Rectangle",
    link: "https://leetcode.com/problems/maximal-rectangle",
  },
  {
    problemNum: 45,
    problem: 84,
    difficulty: "Hard",
    acceptance: 44.2,
    title: "Largest Rectangle in Histogram",
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram",
  },
  {
    problemNum: 46,
    problem: 2334,
    difficulty: "Hard",
    acceptance: 42.6,
    title: "Subarray With Elements Greater Than Varying Threshold",
    link: "https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold",
  },
  {
    problemNum: 47,
    problem: 2355,
    difficulty: "Hard",
    acceptance: 40.9,
    title: "Maximum Number of Books You Can Take",
    link: "https://leetcode.com/problems/maximum-number-of-books-you-can-take",
  },
  {
    problemNum: 48,
    problem: 975,
    difficulty: "Hard",
    acceptance: 39.7,
    title: "Odd Even Jump",
    link: "https://leetcode.com/problems/odd-even-jump",
  },
  {
    problemNum: 49,
    problem: 2030,
    difficulty: "Hard",
    acceptance: 39,
    title: "Smallest K-Length Subsequence With Occurrences of a Letter",
    link: "https://leetcode.com/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter",
  },
  {
    problemNum: 50,
    problem: 2454,
    difficulty: "Hard",
    acceptance: 38.7,
    title: "Next Greater Element IV",
    link: "https://leetcode.com/problems/next-greater-element-iv",
  },
  {
    problemNum: 51,
    problem: 2940,
    difficulty: "Hard",
    acceptance: 34.5,
    title: "Find Building Where Alice and Bob Can Meet",
    link: "https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet",
  },
  {
    problemNum: 52,
    problem: 2818,
    difficulty: "Hard",
    acceptance: 32.2,
    title: "Apply Operations to Maximize Score",
    link: "https://leetcode.com/problems/apply-operations-to-maximize-score",
  },
  {
    problemNum: 53,
    problem: 321,
    difficulty: "Hard",
    acceptance: 30,
    title: "Create Maximum Number",
    link: "https://leetcode.com/problems/create-maximum-number",
  },
  {
    problemNum: 54,
    problem: 2736,
    difficulty: "Hard",
    acceptance: 28.4,
    title: "Maximum Sum Queries",
    link: "https://leetcode.com/problems/maximum-sum-queries",
  },
  {
    problemNum: 55,
    problem: 2281,
    difficulty: "Hard",
    acceptance: 27.7,
    title: "Sum of Total Strength of Wizards",
    link: "https://leetcode.com/problems/sum-of-total-strength-of-wizards",
  },
  {
    problemNum: 56,
    problem: 2617,
    difficulty: "Hard",
    acceptance: 24.8,
    title: "Minimum Number of Visited Cells in a Grid",
    link: "https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid",
  },
  {
    problemNum: 57,
    problem: 2945,
    difficulty: "Hard",
    acceptance: 15.1,
    title: "Find Maximum Non-decreasing Array Length",
    link: "https://leetcode.com/problems/find-maximum-non-decreasing-array-length",
  }
];

export default function MonotonicQueues() {
	const { colorMode } = useColorMode();
	const muiTheme = colorMode === 'dark' ? muiDarkTheme : muiLightTheme;

	return (
		<ThemeProvider theme={muiTheme}>
			<Box sx={{ height: 400, width: '100%', marginBottom: '20px' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					checkboxSelection
          getRowId={(row) => row.problem}
          initialState={{
            columns: {
              columnVisibilityModel: {
                link: false,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ 
            toolbar: { 
              csvOptions: { 
                fileName: 'monotonic-queue-leetcode-problems',
                allColumns: true
              },
              printOptions: { 
                hideFooter: true,
                hideToolbar: true,
              },
            } 
          }}
          hideFooter
				/>
			</Box>
		</ThemeProvider>
	);
}
