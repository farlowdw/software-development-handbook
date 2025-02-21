const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'DSA Topics',
      collapsed: false,
      items: [
        'dsa-topics/introduction',
        'dsa-topics/big-o',
        'dsa-topics/trees',
        'dsa-topics/tips-and-tricks',
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
      label: 'Templates',
      collapsed: true,
      items: [
        'templates/data-structures-algorithms',
        'templates/algorithm-grading-rubric',
        'templates/feynman-technique',
      ]
    },
    {
      type: 'category',
      label: 'Code Snippets',
      collapsed: true,
      items: [
        'snippets/bash',
      ]
    },
    {
      type: 'category',
      label: 'Learning Resources',
      collapsed: true,
      items: [
        'learning-resources/tech-interview-handbook',
        'learning-resources/binary-search',
        'learning-resources/neetcode',
        'learning-resources/lc-sql-problems',
        'learning-resources/lc-tagged-problems',
        'learning-resources/lc-solution-categories',
      ]
    },
    'development-resources',
    'definitions-theorems-results',
    'reference-list',
  ],
};

export default sidebars;
