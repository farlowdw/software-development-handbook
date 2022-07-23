---
title: Cheatsheet for Docusaurus Docs
sidebar_label: Cheatsheet
description: Details helpful points of interest to keep in mind when working with a Docusaurus project.
last_update: 
  date: '22 Jul 2022'
  author: Daniel Farlow
tags: [Docusaurus, Cheatsheet]
---

## Docs

### Custom ID headers

Headers in `md(x)` files can have custom IDs using the following syntax:

```md 
## Custom ID headers {#custom-id}

With `{#custom-id}` syntax you can set your own header ID.
```

This can be helpful for a variety of reasons: header contains an external link, code snippet, etc.

### Partials as components and ignoring files and folders

All files prefixed with an underscore (`_`) under the `docs` directory are treated as "partial" pages and will be ignored by default. The page on [importing partial pages](https://docusaurus.io/docs/markdown-features/react#importing-markdown) has the full details, but the gist is that `md(x)` files can be used as components and be imported in other Markdown files or in React pages. As noted above, using the `_` filename prefix will result in no doc page being created for the prefixed file; instead, the prefixed file becomes a "partial", something to be imported by other files. This allows you to reuse content among multiple pages and avoid duplicating materials. A simple example appears below.

```md title="_markdown-partial-example.mdx"
<span>Hello {props.name}</span>

This is text some content from `_markdown-partial-example.mdx`.
```

```jsx title="someOtherDoc.mdx"
import PartialExample from './_markdown-partial-example.mdx';

<PartialExample name="Sebastien" />;
```

### Front matter

See the [API documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) for all possible fields.

#### Doc tags

Doc tags can be added to documentation pages via the front matter for those pages. For example,

```md title="someDocFile.mdx"
---
id: doc-with-tags
title: A doc with tags
tags:
  - Demo
  - Getting started
---
```

or `tags: [Demo, Getting started]` are both valid ways of adding `Demo` and `Getting started` as doc tags to the `someDocFile.mdx` file. See [Yaml array syntaxes](https://www.w3schools.io/file/yaml-arrays/) for more valid ways.

#### Doc IDs

Every document has a unique `id`. By default, a document `id` is the name of the document (without the extension) relative to the root docs directory. For example, the ID of `greeting.md` is `greeting`, and the ID of `guide/hello.md` is `guide/hello`.

```bash
website # Root directory of your site
└── docs
   ├── greeting.md
   └── guide
      └── hello.md
```

However, the **last part** of the `id` can be defined by the user in the front matter. For example, if `guide/hello.md`'s content is defined as below, its final `id` is `guide/part1`.

```md 
---
id: part1
---

Lorem ipsum
```

The ID is used to refer to a document when hand-writing sidebars, or when using docs-related layout components or hooks.

#### Doc URLs and `slug` {#doc-urls}

By default, a document's URL location is its file path relative to the `docs` folder. Use the `slug` front matter to change a document's URL. For example, suppose your site structure looks like this:

```bash 
website # Root directory of your site
└── docs
    └── guide
        └── hello.md
```

By default, `hello.md` will be available at `/docs/guide/hello`. You can change its URL location to `/docs/bonjour`:

```md
---
slug: /bonjour
---

Lorem ipsum
```

`slug` will be appended to the doc plugin's `routeBasePath`, which is `/docs` by default. See [Docs-only mode](https://docusaurus.io/docs/create-doc#docs-only-mode) for how to remove the `/docs` part from the URL.

Note that it is possible to use:

- absolute slugs: `slug: /mySlug`, `slug: /`...
- relative slugs: `slug: mySlug`, `slug: ./../mySlug`...

If you want a document to be available at the root, and have a path like `https://docusaurus.io/docs/`, you can use the slug front matter:

```md
---
id: my-home-doc
slug: /
---

Lorem ipsum
```
