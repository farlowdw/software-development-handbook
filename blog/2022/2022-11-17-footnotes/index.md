---
title: How to add a footnotes section to doc pages and blog entries
draft: false
description: This post details how to outfit your Docusaurus site's doc pages and blog posts with a footnotes section.
tags: [Footnotes, Docusaurus, Configuration, Swizzling]
keywords: [footnotes, guide, docusaurus, configuration, swizzling]
authors: [farlow]
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {FootnoteRef} from 'react-a11y-footnotes';
import Asterisk from '@site/src/components/Asterisk';

This post details how to outfit your Docusaurus site's doc pages and blog posts with a footnotes section.

<!--truncate-->

## Overview

### Usage considerations

The details outlined in this post are meant to illustrate how to enable <FootnoteRef id="first-footnote" description="This is just the first footnote. More examples will follow. Click the icon on the far right to jump back to the main text.">footnotes</FootnoteRef> for doc pages and blog posts on your Docusaurus site. As [Wikipedia notes](https://en.wikipedia.org/wiki/Note_(typography)), *footnotes* are notes at the foot of the page &#8212; these notes should be supplemental information to the main body of the text, information that should be entirely optional for the reader to consume. This differs from the use of, say, an in-line asterisk with a tool-tip that conveys something important in-place in the main body of the text.<Asterisk cursor='help' symbol='[*]' >Something like this could be short or rather long. It could contain some minor math like $O(n)$ or $O(n^2)$. There are many possibilities. But the important thing is that this note is meant to be read in-place in the body of the text. Footnotes are entirely optional. These in-line notes should almost certainly be read.</Asterisk> Both options have their use. This post details how to use footnotes by means of a package-based solution, namely [`react-a11y-footnotes`](https://www.npmjs.com/package/react-a11y-footnotes).

### Package details {#package-details}

As [noted in its docs](https://www.npmjs.com/package/react-a11y-footnotes#usage), the `react-a11y-footnotes` package has a trim API:

- [`FootnotesProvider`](https://www.npmjs.com/package/react-a11y-footnotes#footnotesprovider): We will need to [swizzle the Docusaurus root](#swizzle-root) to use this effectively.

  > a component with no HTML footprint that needs to wrap the content part of your application.

- [`FootnoteRef`](https://www.npmjs.com/package/react-a11y-footnotes#footnoteref): This is the actual component we will need to use on different doc pages and blog posts whenever we want to have footnotes.

  > an inline component wrapping a footnote reference, rendering an anchor link (`<a>`) to the correct footnote in the footer.

- [`Footnotes`](https://www.npmjs.com/package/react-a11y-footnotes#footnotes): This component will be inserted into swizzled Docusaurus components `DocItem/Layout` and `BlogPostItem/Content`, resulting in us being able to use footnotes on doc pages and blog posts, respectively.

  > a component rendering the actual footnotes, usually placed at the end of the content area.

Default styling for the package can be [overriden and customized using CSS](https://www.npmjs.com/package/react-a11y-footnotes#with-css). The library provides namespaced `data` attributes as styling anchors:

- `data-a11y-footnotes-ref`: applied to every single footnote reference
- `data-a11y-footnotes-footer`: applied to the footnotes wrapper
- `data-a11y-footnotes-title`: applied to the footnotes title
- `data-a11y-footnotes-list`: applied to the footnotes list
- `data-a11y-footnotes-list-item`: applied to every individual footnote
- `data-a11y-footnotes-back-link`: applied to every individual back link

The example below shows how the anchors above are targeted on the [CodeSandbox demo](https://codesandbox.io/s/react-a11y-footnotes-f9lpdy).

<details><summary> CodeSandbox styling example</summary>

```css
* {
  box-sizing: border-box;
}

body {
  margin: 1em;
  font-size: 125%;
  line-height: 1.4;
  max-width: 600px;
  margin: 0 auto;
}

[data-a11y-footnotes-footer] {
  margin-top: 2em;
  border-top: 1px solid silver;
  font-size: 80%;
}

[data-a11y-footnotes-list] {
  padding-left: 1.25em;
}

/**
 * Initialiazing a `footnotes` counter on the wrapper
 */
body {
  counter-reset: footnotes;
}

/**
 * Inline footnotes references
 * 1. Increment the counter at each new reference
 * 2. Reset link styles to make it appear like regular text
 */
[data-a11y-footnotes-ref] {
  counter-increment: footnotes; /* 1 */
  text-decoration: none; /* 2 */
  color: inherit; /* 2 */
  cursor: default; /* 2 */
  outline: none; /* 2 */
}

/**
 * Actual numbered references
 * 1. Display the current state of the counter (e.g. `[1]`)
 * 2. Align text as superscript
 * 3. Make the number smaller (since it's superscript)
 * 4. Slightly offset the number from the text
 * 5. Reset link styles on the number to show it's usable
 */
[data-a11y-footnotes-ref]::after {
  content: "[" counter(footnotes) "]"; /* 1 */
  vertical-align: super; /* 2 */
  font-size: 0.5em; /* 3 */
  margin-left: 2px; /* 4 */
  color: blue; /* 5 */
  text-decoration: underline; /* 5 */
  cursor: pointer; /* 5 */
}

/**
 * Resetting the default focused styles on the number
 */
[data-a11y-footnotes-ref]:focus::after {
  outline: thin dotted;
  outline-offset: 2px;
}

[data-a11y-footnotes-back-link] {
  font-size: 80%;
}

/**
 * Highlight target note
 */
footer :target {
  background: yellow;
}
```

</details>

All we have to do now is actually use the package!

## Install footnotes package

Start by installing the [`react-a11y-footnotes`](https://www.npmjs.com/package/react-a11y-footnotes) package (see the [demo CodeSandbox](https://codesandbox.io/s/react-a11y-footnotes-f9lpdy) for an example different from the one included on this post):

```bash
npm install react-a11y-footnotes
```

## Swizzling

As [noted above](#package-details), we will need to swizzle the Docusaurus `Root`, `DocItem/Layout`, and `BlogPostItem/Content` components.

### Root {#swizzle-root}

As noted [in the Docusaurus docs](https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root):

> The `<Root>` component is rendered at the very top of the React tree, above the theme` <Layout>`, and never unmounts. It is the perfect place to add stateful logic that should not be re-initialized across navigations (user authentication status, shopping card state...). [Swizzle](https://docusaurus.io/docs/swizzling) it manually by creating a file at `src/theme/Root.js`:
> 
> ```js title="/src/theme/Root.js"
> import React from 'react';
> 
> // Default implementation, that you can customize
> export default function Root({children}) {
>   return <>{children}</>;
> }
> ```

If we follow [the example](https://www.npmjs.com/package/react-a11y-footnotes#example) outlined in the `react-a11y-footnotes` package documentation, then we will see that the Docusaurus `Root` is where we need to add the `FootnotesProvider`:

```js title="/src/theme/Root.js"
import React from 'react';
import { FootnotesProvider } from 'react-a11y-footnotes'

// Default implementation, that you can customize
export default function Root({ children }) {
  return <FootnotesProvider>{children}</FootnotesProvider>;
}
```

### DocItem/Layout {#swizzle-docpage}

Swizzle the `DocItem/Layout` component (warnings can be [safely ignored](/blog/2022/10/27/giscus-comments#enable-comments-for-doc-pages) since the change is so minor):

```bash
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject
```

Update the `index.js` file for the swizzled `DocItem/Layout` component to include the `Footnotes` component as follows:

```js title="/src/theme/DocItem/Layout/index.js"
import React from 'react';
// ...
// highlight-next-line
import { Footnotes } from 'react-a11y-footnotes';
// ...
export default function DocItemLayout({ children }) {
  // ...
  return (
    // ...
      <article>
        <DocBreadcrumbs />
        <DocVersionBadge />
        {docTOC.mobile}
        <DocItemContent>{children}</DocItemContent>
        // highlight-next-line
        <Footnotes />
        <DocItemFooter />
      </article>
    // ...
  );
}
```

### BlogPostItem/Content {#swizzle-blogpost}

Swizzle the `BlogPostItem/Content` component (warnings can be [safely ignored](/blog/2022/10/27/giscus-comments#enable-comments-for-blog-entries) since the change is so minor):

```bash
npm run swizzle @docusaurus/theme-classic BlogPostItem/Content -- --eject
```

Update the `index.js` file for the swizzled `BlogPostItem/Content` component to include the `Footnotes` component as follows:

```js title="/src/theme/BlogPostItem/Content/index.js"
import React from 'react';
// ...
// highlight-next-line
import { Footnotes } from 'react-a11y-footnotes';
// ...
export default function BlogPostItemContent({ children, className }) {
  // ...
  return (
    <div
      // ...
      <MDXContent>
        {children}
        // highlight-next-line
        <Footnotes />
      </MDXContent>
    </div>
  );
}
```

## Styling

For the sake of completeness, my personal configuration for footnote styling includes the following options (largely from the CodeSandbox demo):

```css title="/src/css/custom.scss"
/* begin react-a11y-footnotes styling */
[data-a11y-footnotes-footer] {
  margin-top: 2em;
  font-size: 80%;
}

/**
 * Initialiazing a `footnotes` counter on the wrapper
 */
body {
  counter-reset: footnotes;
}

/**
 * Inline footnotes references
 * 1. Increment the counter at each new reference
 * 2. Reset link styles to make it appear like regular text
 */
[data-a11y-footnotes-ref] {
  counter-increment: footnotes; /* 1 */
  text-decoration: none; /* 2 */
  color: inherit; /* 2 */
  cursor: default; /* 2 */
  outline: none; /* 2 */
}

/**
 * Actual numbered references
 * 1. Display the current state of the counter (e.g. `[1]`)
 * 2. Align text as superscript
 * 3. Make the number smaller (since it's superscript)
 * 4. Slightly offset the number from the text
 * 5. Reset link styles on the number to show it's usable
 */
[data-a11y-footnotes-ref]::after {
  content: "[" counter(footnotes) "]"; /* 1 */
  vertical-align: super; /* 2 */
  font-size: 0.65em; /* 3 */
  margin-left: 2px; /* 4 */
  color: var(--ifm-link-color); /* 5 */
  text-decoration: underline; /* 5 */
  cursor: pointer; /* 5 */
}

/**
 * Resetting the default focused styles on the number
 */
[data-a11y-footnotes-ref]:focus::after {
  outline: thin dotted;
  outline-offset: 2px;
}

[data-a11y-footnotes-back-link] {
  font-size: 80%;
}
/* end react-a11y-footnotes styling */
```

## Examples

:::danger Footnotes with identical IDs will not display correctly

From [the package docs on ID generation for footnotes](https://www.npmjs.com/package/react-a11y-footnotes#id-generation):

> If no `id` is passed to references (`<FootnoteRef>`) &#8212; which is usually the case &#8212; the `id` will be computed from the content of the reference. For instance if the text says "CSS counters", the resolved identifiers will be `css-counters-ref` and `css-counters-note`.

Hence, if no `id` is passed for two footnotes that have identical contents, then the first footnote will be displayed correctly, but the second footnote will not show up, and it will also mess up the numbering for all subsequent footnotes. Try it yourself:

```md
This <FootnoteRef description="First footnote with 'footnote' as its contents.">footnote</FootnoteRef>
will show just fine.

This <FootnoteRef description="Second footnote with 'footnote' as its contents.">footnote</FootnoteRef>
will not show at all; additionally, numbering will be messed up for subsequent footnotes.

This <FootnoteRef description="A different footnote.">differnent footnote</FootnoteRef> 
would show up as the third footnote, but only two footnotes would be present.
```

Word to the wise: be sure such collisions are not possible by the unique nature of a footnote's contents *or* provide a unique `id` prop to the `FootnoteRef` component that you will then be responsible for tracking.

:::

All examples below come from [the examples](https://www.npmjs.com/package/react-a11y-footnotes#example) in the package documentation (the source code input is shown, immediately followed by the output):

### Example 1

```md title="Input"
Maintaining <FootnoteRef description='Footnotes are notes placed at the bottom of a page. They cite references or comment on a designated part of the text above it.'>footnotes</FootnoteRef> manually can be a pain.
```

Maintaining <FootnoteRef description='Footnotes are notes placed at the bottom of a page. They cite references or comment on a designated part of the text above it.'>footnotes</FootnoteRef> manually can be a pain.

### Example 2

```md title="Input"
<FootnoteRef description='Cascading Style Sheets'>CSS</FootnoteRef> can be used to our advantage here.
```

<FootnoteRef description='Cascading Style Sheets'>CSS</FootnoteRef> can be used to our advantage here.

### Example 3

```md title="Input"
It becomes easy to maintain footnotes *automatically* by using CSS <FootnoteRef id='with-a-custom-id' description={<> <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters' target='_blank' rel='noopener noreferrer'> CSS counters </a>are, in essence, variables maintained by CSS whose values may be incremented by CSS rules to track how many times they’re used.</>} >counters</FootnoteRef> to add the numbered references in the text and an ordered list to display the actual footnotes in the footer.
```

It becomes easy to maintain footnotes *automatically* by using CSS <FootnoteRef id='with-a-custom-id' description={<> <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters' target='_blank' rel='noopener noreferrer'> CSS counters </a>are, in essence, variables maintained by CSS whose values may be incremented by CSS rules to track how many times they’re used.</>} >counters</FootnoteRef> to add the numbered references in the text and an ordered list to display the actual footnotes in the footer.