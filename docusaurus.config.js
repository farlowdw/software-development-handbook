// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const katexMacros = require('./katex-macros');

const booksBaseURL = `https://books.dwf.dev`;
const coursesBaseURL = `https://courses.dwf.dev`;
const manimBaseURL = `https://manim.dwf.dev`;
const leetcodeBaseURL = `https://lc.dwf.dev`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Software Engineering Handbook',
  tagline: 'What one fool can do, other fools can do also',
  favicon: 'img/favicon.ico',
  url: 'https://dwf.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  customFields: {
    forbiddenGiscusDocPaths: [
      '/docs/intro',
      '/docs/sandbox',
      '/docs/data-structures/introduction',
      '/docs/algorithms/introduction',
      '/docs/patterns-techniques-themes/introduction',
      '/docs/system-design/introduction',
      '/docs/reference-list',
      '/docs/algorithms/sorting/introduction',
      '/docs/algorithms/named-algorithms/introduction',
    ],
    forbiddenGiscusBlogPaths: [
      '/blog/mdx-blog-post'
    ],
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({

        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/farlowdw/software-development-handbook/tree/master/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, {
            throwOnError: true,
            globalGroup: true,
            macros: katexMacros
          }]],
        },

        blog: {
          showReadingTime: false,
          editUrl:
            'https://github.com/farlowdw/software-development-handbook/tree/master/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, {
            throwOnError: true,
            globalGroup: true,
            macros: katexMacros
          }]],
          blogTitle: 'Muse(um)',
          blogDescription: `Semi-structured musings along with all the concomitant ums`,
          postsPerPage: 'ALL',
          blogSidebarCount: 0,
          sortPosts: 'descending',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },

        pages: {
          rehypePlugins: [[rehypeKatex, {
            throwOnError: true,
            globalGroup: true,
            macros: katexMacros
          }]],
        },

      }),
    ],
  ],

  stylesheets: [
    // KaTeX
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
    // Pseudocode (ref: https://www.npmjs.com/package/pseudocode)
    {
      href: 'https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],

  scripts: [
    // KaTeX
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.js",
      async: true,
    },
    // Pseudocode (ref: https://www.npmjs.com/package/pseudocode)
    {
      src: "https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.js",
      async: true,
    },
  ],

  plugins: [
    [
      'docusaurus2-dotenv',
      {
        path: "./.env", // The path to your environment variables.
        safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: false, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
      }
    ],
    'docusaurus-plugin-sass',
    require.resolve("docusaurus-plugin-image-zoom"),
    'my-loaders',
    '@docusaurus/theme-mermaid'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      navbar: {
        title: 'Software Engineering Handbook',
        logo: {
          alt: 'Software Engineering Handbook Logo',
          src: 'img/logo.svg',
        },
        hideOnScroll: true,
        items: [
          {
            to: '/docs/intro',
            label: 'Handbook',
            position: 'left',
            activeBaseRegex: `/docs/(?!tags)`,
          },
          {
            to: '/docs/tags',
            label: 'Tags',
            position: 'left',
            activeBaseRegex: `/docs/tags`,
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
            activeBaseRegex: `/blog(?!/archive|/tags)`,
          },
          {
            to: '/blog/archive',
            label: 'Blog Archive',
            position: 'left'
          },
          {
            to: '/blog/tags',
            label: 'Blog Tags',
            position: 'left'
          },
          {
            to: '/about',
            label: 'About',
            position: 'right'
          },
          {
            href: `https://github.com/farlowdw/software-development-handbook`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Handbook',
            items: [
              {
                label: 'Data Structures',
                to: '/docs/data-structures/introduction',
              },
              {
                label: 'Algorithms',
                to: '/docs/algorithms/introduction',
              },
              {
                label: 'Patterns, techniques, and themes',
                to: '/docs/patterns-techniques-themes/introduction',
              },
              {
                label: 'SQL',
                to: '/docs/sql/formatting-guidelines',
              },
              {
                label: 'System Design',
                to: '/docs/system-design/introduction',
              },
              {
                label: 'Math',
                to: '/docs/math/recurrence-relations',
              },
              {
                label: 'Tips and Tricks',
                to: '/docs/tips-and-tricks/strings',
              },
              {
                label: 'Templates',
                to: '/docs/templates/data-structures-algorithms',
              },
              {
                label: 'Learning Resources',
                to: '/docs/learning-resources/general-list',
              },
              {
                label: 'Development Resources',
                to: '/docs/development-resources',
              },
              {
                label: 'Definitions, theorems, and results',
                to: '/docs/definitions-theorems-results',
              },
              {
                label: 'Reference List',
                to: '/docs/reference-list',
              },
            ],
          },
          {
            title: 'Blog',
            items: [
              {
                label: 'Comments with Giscus',
                to: '/blog/2022/10/27/2022/giscus-comments',
              },
              {
                label: 'Material UI Light and Dark Modes',
                to: '/blog/2022/10/28/2022/docusaurus-mui-light-dark',
              },
              {
                label: 'Archive',
                to: '/blog/archive',
              },
            ],
          },
          {
            title: 'SQL',
            items: [
              {
                label: 'Formatting Guidelines',
                to: '/docs/sql/formatting-guidelines',
              },
              {
                label: 'Query Execution Order',
                to: '/docs/sql/query-execution-order',
              },
              {
                label: 'Window Functions',
                to: '/docs/sql/window-functions',
              },
              {
                label: 'Common Table Expressions (CTEs)',
                to: '/docs/sql/ctes',
              },
            ],
          },
          {
            title: 'External',
            items: [
              {
                label: 'Python Language Reference',
                href: `${coursesBaseURL}/docs/reference/python/introduction`,
              },
              {
                label: 'CSS Diner',
                href: `${coursesBaseURL}/docs/reference/css/css-diner`,
              },
              {
                label: 'Docusaurus Input-Output',
                href: `${coursesBaseURL}/docs/reference/docusaurus/templates`,
              },
              {
                label: 'KaTeX',
                href: `${coursesBaseURL}/docs/reference/docusaurus/katex`,
              },
              {
                label: 'MySQL',
                href: `${coursesBaseURL}/docs/reference/sql/mysql`,
              },
              {
                label: 'Postgres',
                href: `${coursesBaseURL}/docs/reference/sql/postgresql`,
              },
              {
                label: 'PG Exercises',
                href: `${coursesBaseURL}/docs/reference/sql/pg-exercises`,
              },
              {
                label: 'Algorithm Design Manual',
                href: `${booksBaseURL}/docs/algorithm-design-manual/book-notes/introduction-to-algorithm-design`,
              },
              {
                label: 'Interview Cake',
                href: `${coursesBaseURL}/docs/interview-cake/algorithmic-thinking`,
              },
              {
                label: 'MIT Missing Semester',
                href: `${coursesBaseURL}/docs/mit-missing-semester/introduction`,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DWF.DEV`,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-error-next-line',
            block: { start: 'highlight-error-start', end: 'highlight-error-end' },
          },
          {
            className: 'code-block-success-line',
            line: 'highlight-success-next-line',
            block: { start: 'highlight-success-start', end: 'highlight-success-end' },
          },
          {
            className: 'code-block-warning-line',
            line: 'highlight-warning-next-line',
            block: { start: 'highlight-warning-start', end: 'highlight-warning-end' },
          },
        ],
        additionalLanguages: [
          "apacheconf",
          "applescript",
          "asciidoc",
          "aspnet",
          "awk",
          "bash",
          "basic",
          "c",
          "clojure",
          "cpp",
          "csharp",
          "css",
          "csv",
          "docker",
          "editorconfig",
          "ejs",
          "elixir",
          "erlang",
          "excel-formula",
          "flow",
          "fortran",
          "git",
          "go",
          "go-module",
          "graphql",
          "handlebars",
          "http",
          "java",
          "javadoclike",
          "javascript",
          "js-extras",
          "jsdoc",
          "json",
          "jsonp",
          "jsx",
          "latex",
          "less",
          "lisp",
          "log",
          "lua",
          "makefile",
          "markdown",
          "markup",
          "markup-templating",
          "mongodb",
          "nginx",
          "perl",
          "php",
          "php-extras",
          "phpdoc",
          "plsql",
          "powerquery",
          "powershell",
          "pug",
          "python",
          "r",
          "regex",
          "ruby",
          "rust",
          "sas",
          "sass",
          "scheme",
          "scss",
          "shell-session",
          "sql",
          "systemd",
          "toml",
          "tsx",
          "turtle",
          "typescript",
          "vim",
          "visual-basic",
          "wasm",
          "wiki",
          "wolfram",
          "yaml"
        ]
      },
    }),
};

export default config;