/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  docs: [
    'intro',
    {
      type: 'category',
      label: 'Data Structures',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'data-structures/index'
      },
      items: [
        'data-structures/array',
        'data-structures/bloom-filter',
        'data-structures/graph',
        'data-structures/hash-table',
        'data-structures/heap',
        'data-structures/linked-list',
        'data-structures/lru-cache',
        'data-structures/priority-queue',
        'data-structures/queue',
        'data-structures/stack',
        'data-structures/string',
        'data-structures/tree',
        'data-structures/trie',
      ]
    },
    {
      type: 'category',
      label: 'Algorithms',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'algorithms/index'
      },
      items: [
        'algorithms/bit-manipulation',
        'algorithms/depth-first-search',
        'algorithms/breadth-first-search',
        'algorithms/dynamic-programming',
        'algorithms/recursion',
        'algorithms/topological-sorting',
        {
          type: 'category',
          label: 'Sorting and Searching',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'algorithms/sorting-and-searching/index'
          },
          items: [
            'algorithms/sorting-and-searching/bucket-sort'
          ]
        },
        {
          type: 'category',
          label: 'Named Algorithms',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'algorithms/named-algorithms/index'
          },
          items: [
            'algorithms/named-algorithms/dijkstra'
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Patterns',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'patterns/index'
      },
      items: [
        'patterns/index-has-a-hash-key',
        'patterns/precomputation',
        'patterns/sliding-window',
        'patterns/sorting-the-array',
        'patterns/traverse-from-right',
        'patterns/traverse-multiple-times',
        'patterns/two-pointers',
        'patterns/counting-characters',
        'patterns/anagram',
        'patterns/palindrome',
      ]
    },
    {
      type: 'category',
      label: 'Topics',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'topics/index'
      },
      items: [
        'topics/math',
        'topics/matrices',
        'topics/intervals',
      ]
    },
    {
      type: 'category',
      label: 'System Design',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'system-design/index'
      },
      items: [
        'system-design/interview-questions'
      ]
    },
    {
      type: 'category',
      label: 'Tips and Tricks',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'tips-and-tricks/index'
      },
      items: [
        'tips-and-tricks/strings'
      ]
    },
    {
      type: 'category',
      label: 'Templates',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'templates/index'
      },
      items: [
        {
          type: 'category',
          label: 'Problem-solving',
          collapsed: true,
          items: [
            'templates/problem-solving/binary-search'
          ]
        },
        {
          type: 'category',
          label: 'Interview',
          collapsed: true,
          items: [
            'templates/interview/algorithm-grading-rubric'
          ]
        },
        {
          type: 'category',
          label: 'Learning',
          collapsed: true,
          items: [
            'templates/learning/feynman-technique'
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Learning Resources',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'learning-resources/index'
      },
      items: [
        'learning-resources/general-list',
        'learning-resources/curated-list',
        'learning-resources/neetcode',
      ]
    },
    'definitions',
    'reference-list',
  ],
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
