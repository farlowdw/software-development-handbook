// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config()

const { LicenseInfo } = require('@mui/x-license-pro');
const licenseKey = process.env.MUI_LICENSE_KEY;
// LicenseInfo.setLicenseKey(licenseKey);

const math = require('remark-math');
const katex = require('rehype-katex');
const mermaid = require('mdx-mermaid');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const katexMacros = require('./katex-macros');

const booksBaseURL = `https://books.dwf.dev`;
const coursesBaseURL = `https://courses.dwf.dev`;
const manimBaseURL = `https://manim.dwf.dev`;
const leetcodeBaseURL = `https://lc.dwf.dev`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Software Engineering Handbook',
  tagline: 'Musings of a software-related nature by Daniel Farlow',
  url: 'https://dwf.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'farlowdw', // Usually your GitHub org/user name.
  projectName: 'software-engineering-handbook', // Usually your repo name.

  customFields: {
    forbiddenGiscusDocPaths: [
      '/docs/intro',
      '/docs/data-structures/intro',
      '/docs/algorithms/intro',
      '/docs/patterns/intro',
      '/docs/topics/intro',
      '/docs/system-design/intro',
      '/docs/tips-and-tricks/intro',
      '/docs/templates/intro',
      '/docs/learning-resources/intro',
      '/docs/reference-list',
      '/docs/algorithms/sorting-and-searching/intro',
      '/docs/algorithms/named-algorithms/intro',
    ],
    forbiddenGiscusBlogPaths: [
      '/blog/mdx-blog-post'
    ],
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/farlowdw/software-development-handbook/tree/master/',
          remarkPlugins: [math, mermaid],
          rehypePlugins: [[katex, {
            throwOnError: true,
            globalGroup: true,
            macros: katexMacros
          }]],
          showLastUpdateTime: true
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/farlowdw/software-development-handbook/tree/master/',
          remarkPlugins: [math, mermaid],
          rehypePlugins: [[katex, {
            throwOnError: true,
            globalGroup: true,
            macros: katexMacros
          }]],
          blogTitle: 'Muse(um)',
          blogDescription: `Semi-structured musings along with all the concomitant ums`,
          postsPerPage: 'ALL',
          // blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 0,
          sortPosts: 'descending',
          // showLastUpdateTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        pages: {
          rehypePlugins: [[katex, {
            throwOnError: true,
            globalGroup: true,
            macros: katexMacros
          }]],
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
    {
      href: "https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.css"
    }
  ],

  scripts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.js",
      async: true,
    },
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
    'my-loaders'
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
                to: '/docs/data-structures/intro',
              },
              {
                label: 'Algorithms',
                to: '/docs/algorithms/intro',
              },
              // {
              //   label: 'Patterns',
              //   to: '/docs/patterns/intro',
              // },
              // {
              //   label: 'Topics',
              //   to: '/docs/topics/intro',
              // },
              {
                label: 'System Design',
                to: '/docs/system-design/intro',
              },
              // {
              //   label: 'Tips and Tricks',
              //   to: '/docs/tips-and-tricks/intro',
              // },
              {
                label: 'Templates',
                to: '/docs/templates/intro',
              },
              {
                label: 'Learning Resources',
                to: '/docs/learning-resources/intro',
              },
              // {
              //   label: 'Definitions',
              //   to: '/docs/definitions',
              // },
              // {
              //   label: 'Reference List',
              //   to: '/docs/reference-list',
              // },
              {
                label: 'FAQ',
                to: '/docs/faq',
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
                to: '/docs/topics/sql/formatting-guidelines',
              },
              {
                label: 'Query Execution Order',
                to: '/docs/topics/sql/query-execution-order',
              },
              {
                label: 'Window Functions',
                to: '/docs/topics/sql/window-functions',
              },
              {
                label: 'Common Table Expressions (CTEs)',
                to: '/docs/topics/sql/ctes',
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
              {
                label: 'Manim',
                href: `${manimBaseURL}/docs/intro`,
              },
              {
                href: `${leetcodeBaseURL}/docs/intro`,
                label: 'LeetCode Work (Protected)',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        magicComments: [
          // Remember to extend the default highlight class name as well!
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
          "django",
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
          "mermaid",
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

module.exports = config;
