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
    problem: 1438,
    problemNum: 1,
    difficulty: "Medium",
    acceptance: 49.2,
    title: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
    link: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit",
  },
  {
    problem: 1696,
    problemNum: 2,
    difficulty: "Medium",
    acceptance: 45.7,
    title: "Jump Game VI",
    link: "https://leetcode.com/problems/jump-game-vi",
  },
  {
    problem: 918,
    problemNum: 3,
    difficulty: "Medium",
    acceptance: 44.7,
    title: "Maximum Sum Circular Subarray",
    link: "https://leetcode.com/problems/maximum-sum-circular-subarray",
  },
  {
    problem: 2944,
    problemNum: 4,
    difficulty: "Medium",
    acceptance: 43.9,
    title: "Minimum Number of Coins for Fruits",
    link: "https://leetcode.com/problems/minimum-number-of-coins-for-fruits",
  },
  {
    problem: 2762,
    problemNum: 5,
    difficulty: "Medium",
    acceptance: 40.6,
    title: "Continuous Subarrays",
    link: "https://leetcode.com/problems/continuous-subarrays",
  },
  {
    problem: 2444,
    problemNum: 6,
    difficulty: "Hard",
    acceptance: 68.2,
    title: "Count Subarrays With Fixed Bounds",
    link: "https://leetcode.com/problems/count-subarrays-with-fixed-bounds",
  },
  {
    problem: 2969,
    problemNum: 7,
    difficulty: "Hard",
    acceptance: 57.6,
    title: "Minimum Number of Coins for Fruits II",
    link: "https://leetcode.com/problems/minimum-number-of-coins-for-fruits-ii",
  },
  {
    problem: 1425,
    problemNum: 8,
    difficulty: "Hard",
    acceptance: 56.7,
    title: "Constrained Subsequence Sum",
    link: "https://leetcode.com/problems/constrained-subsequence-sum",
  },
  {
    problem: 239,
    problemNum: 9,
    difficulty: "Hard",
    acceptance: 46.5,
    title: "Sliding Window Maximum",
    link: "https://leetcode.com/problems/sliding-window-maximum",
  },
  {
    problem: 1499,
    problemNum: 10,
    difficulty: "Hard",
    acceptance: 44.3,
    title: "Max Value of Equation",
    link: "https://leetcode.com/problems/max-value-of-equation",
  },
  {
    problem: 1687,
    problemNum: 11,
    difficulty: "Hard",
    acceptance: 38.8,
    title: "Delivering Boxes from Storage to Ports",
    link: "https://leetcode.com/problems/delivering-boxes-from-storage-to-ports",
  },
  {
    problem: 2071,
    problemNum: 12,
    difficulty: "Hard",
    acceptance: 33.7,
    title: "Maximum Number of Tasks You Can Assign",
    link: "https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign",
  },
  {
    problem: 862,
    problemNum: 13,
    difficulty: "Hard",
    acceptance: 26,
    title: "Shortest Subarray with Sum at Least K",
    link: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k",
  },
  {
    problem: 2407,
    problemNum: 14,
    difficulty: "Hard",
    acceptance: 23.2,
    title: "Longest Increasing Subsequence II",
    link: "https://leetcode.com/problems/longest-increasing-subsequence-ii",
  },
  {
    problem: 2945,
    problemNum: 15,
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
			<Box sx={{ height: 400, width: '100%', marginBottom: '1em' }}>
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
