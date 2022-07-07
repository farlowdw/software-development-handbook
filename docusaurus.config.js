// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config()

const { LicenseInfo } = require('@mui/x-license-pro');
const licenseKey = process.env.MUI_LICENSE_KEY;
// LicenseInfo.setLicenseKey(licenseKey);

const math = require('remark-math');
const katex = require('rehype-katex');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const macros = {
  "\\x": "x+1"
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Handbook',
  tagline: 'Software engineering handbooks are cool',
  url: 'https://dwf.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [math],
          rehypePlugins: [[katex, {
            throwOnError: true,
            globalGroup: true,
            macros
          }]],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [math],
          rehypePlugins: [[katex, {
            throwOnError: true,
            globalGroup: true,
            macros
          }]],
          blogTitle: 'My Blog Title',
          sortPosts: 'ascending'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
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
  ],

  plugins: [
    'docusaurus-plugin-sass',
    require.resolve("docusaurus-plugin-image-zoom")
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
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
        additionalLanguages: ["apacheconf",
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
          "yaml"]
      },
    }),
};

module.exports = config;
