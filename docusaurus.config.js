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
    things: {
      something: 'Whaaaa'
    }
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
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          {
            to: '/blog/archive',
            label: 'Blog Archive',
            position: 'left'
          },
          {
            href: 'https://dwf-books.netlify.app/docs/intro',
            label: 'BCGS Notes',
            position: 'right',
          },
          {
            href: 'https://dwf-books.netlify.app/docs/reference/python/',
            label: 'Python Reference',
            position: 'right',
          },
          {
            href: 'https://github.com/farlowdw/software-development-handbook',
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
                to: '/blog/2022/10/27/giscus-comments',
              },
              {
                label: 'Material UI Light and Dark Modes',
                to: '/blog/2022/10/28/docusaurus-mui-light-dark',
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
                href: 'https://dwf-books.netlify.app/docs/reference/python/',
              },
              {
                label: 'Docusaurus Input-Output',
                href: 'https://dwf-books.netlify.app/docs/reference/docusaurus/templates',
              },
              {
                label: 'KaTeX',
                href: 'https://dwf-books.netlify.app/docs/reference/docusaurus/katex',
              },
              {
                label: 'MySQL',
                href: 'https://dwf-books.netlify.app/docs/reference/sql/mysql',
              },
              {
                label: 'Postgres',
                href: 'https://dwf-books.netlify.app/docs/reference/sql/postgresql',
              },
              {
                label: 'PG Exercises',
                href: 'https://dwf-books.netlify.app/docs/reference/sql/pg-exercises',
              },
              {
                label: 'Algorithm Design Manual',
                href: 'https://dwf-books.netlify.app/docs/books/algorithm-design-manual/book-notes/introduction-to-algorithm-design',
              },
              {
                label: 'Interview Cake',
                href: 'https://dwf-books.netlify.app/docs/course-notes/development-and-engineering/interview-cake/algorithmic-thinking',
              },
              {
                label: 'MIT Missing Semester',
                href: 'https://dwf-books.netlify.app/docs/course-notes/development-and-engineering/mit-missing-semester/',
              },
              {
                label: 'Manim',
                href: 'https://manim.netlify.app/docs/intro'
              },
              {
                href: 'https://dwflc.netlify.app/docs/intro',
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
