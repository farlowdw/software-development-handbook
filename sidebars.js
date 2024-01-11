const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Data Structures',
      collapsed: true,
      items: [
        'data-structures/intro',
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
        'data-structures/sandbox',
      ]
    },
    {
      type: 'category',
      label: 'Algorithms',
      collapsed: true,
      items: [
        'algorithms/intro',
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
          items: [
            'algorithms/sorting-and-searching/intro',
            'algorithms/sorting-and-searching/bucket-sort',
          ]
        },
        {
          type: 'category',
          label: 'Named Algorithms',
          collapsed: true,
          items: [
            'algorithms/named-algorithms/intro',
            'algorithms/named-algorithms/dijkstra',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Patterns',
      collapsed: true,
      items: [
        'patterns/intro',
        'patterns/index-has-a-hash-key',
        'patterns/monotonic-stack',
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
      items: [
        'topics/intro',
        'topics/big-o',
        'topics/math',
        'topics/matrices',
        'topics/intervals',
        {
          type: 'category',
          label: 'SQL',
          collapsed: true,
          items: [
            'topics/sql/formatting-guidelines',
            'topics/sql/query-execution-order',
            'topics/sql/window-functions',
            'topics/sql/ctes',
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'System Design',
      collapsed: true,
      items: [
        'system-design/intro',
        'system-design/interview-questions'
      ]
    },
    {
      type: 'category',
      label: 'Tips and Tricks',
      collapsed: true,
      items: [
        'tips-and-tricks/intro',
        'tips-and-tricks/strings'
      ]
    },
    {
      type: 'category',
      label: 'Templates',
      collapsed: true,
      items: [
        'templates/intro',
        'templates/bare-bones',
        'templates/mental-models',
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
      items: [
        'learning-resources/general-list',
        'learning-resources/curated-list',
        'learning-resources/neetcode',
        'learning-resources/tech-interview-handbook',
        'learning-resources/leetcode-problems-by-category',
        'learning-resources/sandbox',
        {
          type: 'category',
          label: 'Python',
          collapsed: true,
          items:[
            'learning-resources/python/binarytree',
          ]
        },
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
    'definitions',
    'reference-list',
    'faq',
  ],
};

export default sidebars;
