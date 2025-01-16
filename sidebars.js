const sidebars = {
  docs: [
    'intro',
    'big-o',
    {
      type: 'category',
      label: 'Data Structures',
      collapsed: true,
      items: [
        'data-structures/introduction',
        'data-structures/array',
        'data-structures/bloom-filter',
        'data-structures/graph',
        'data-structures/hash-table',
        'data-structures/heap',
        'data-structures/linked-list',
        'data-structures/lru-cache',
        'data-structures/priority-queue',
        'data-structures/queue',
        'data-structures/set',
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
      items: [
        'algorithms/introduction',
        'algorithms/depth-first-search',
        'algorithms/breadth-first-search',
        'algorithms/dynamic-programming',
        'algorithms/topological-sorting',
        {
          type: 'category',
          label: 'Sorting',
          collapsed: true,
          items: [
            'algorithms/sorting/introduction',
            'algorithms/sorting/bucket-sort',
          ]
        },
        {
          type: 'category',
          label: 'Named Algorithms',
          collapsed: true,
          items: [
            'algorithms/named-algorithms/introduction',
            'algorithms/named-algorithms/dijkstra',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Patterns, techniques, and themes',
      collapsed: true,
      items: [
        'patterns-techniques-themes/introduction',
        'patterns-techniques-themes/bit-manipulation',
        'patterns-techniques-themes/recursion',
        'patterns-techniques-themes/sliding-window',
        'patterns-techniques-themes/two-pointers',
      ]
    },
    {
      type: 'category',
      label: 'SQL',
      collapsed: true,
      items: [
        'sql/formatting-guidelines',
        'sql/query-execution-order',
        'sql/window-functions',
        'sql/ctes',
      ]
    },
    {
      type: 'category',
      label: 'System Design',
      collapsed: true,
      items: [
        'system-design/introduction',
        'system-design/interview-questions'
      ]
    },
    {
      type: 'category',
      label: 'Math',
      collapsed: true,
      items: [
        'math/recurrence-relations',
      ]
    },
    {
      type: 'category',
      label: 'Tips and Tricks',
      collapsed: true,
      items: [
        'tips-and-tricks/strings'
      ]
    },
    {
      type: 'category',
      label: 'Templates',
      collapsed: true,
      items: [
        'templates/data-structures-algorithms',
        'templates/algorithm-grading-rubric',
        'templates/feynman-technique',
        'templates/binary-search',
      ]
    },
    {
      type: 'category',
      label: 'Learning Resources',
      collapsed: true,
      items: [
        'learning-resources/blogs',
        'learning-resources/general-list',
        'learning-resources/professor-pages',
        'learning-resources/tech-interview-handbook',
        'learning-resources/neetcode',
        'learning-resources/lc-sql-problems',
        'learning-resources/lc-tagged-problems',
        'learning-resources/lc-solution-categories',
      ]
    },
    {
      type: 'category',
      label: 'Snippets',
      collapsed: true,
      items: [
        'snippets/bash',
        'snippets/express-js',
      ]
    },
    'development-resources',
    'definitions-theorems-results',
    'reference-list',
  ],
};

export default sidebars;
