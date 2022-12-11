---
title: How to add a comments section to doc pages and blog entries using giscus
draft: false
description: This post details how to outfit your Docusaurus site's doc pages and blog posts with a comments section using giscus.
tags: [Giscus, Comments, Guide]
keywords: [giscus, comments, guide]
authors: [farlow]
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LocalVarSpan from '@site/src/components/LocalVarSpan';
import VerticalLinearStepper from '@site/src/components/VerticalLinearStepper';
import CodeBlock from '@theme/CodeBlock';

export const currentDate = 'Oct. 27, 2022';

<!-- Giscus Step 1 -->
export const giscusStep1Label = (
  <span>Install giscus for React</span>
);
export const giscusStep1Description = (
<p>
  <p>Start by installing <a href="https://giscus-component.vercel.app/react" target="_blank"><code>@giscus/react</code></a> as a dev dependency:</p>
  <CodeBlock language="bash" >
    {`npm install -D @giscus/react`}
  </CodeBlock>
</p>
);

<!-- Giscus Step 2 -->
export const giscusStep2Label = (
  <span>Ensure GitHub repository will work with giscus</span>
)
export const giscusStep2Description = (
<p>
As <a href="https://giscus.app/" target="_blank">the giscus homepage notes</a>, certain criteria must be met in order for giscus to cleanly work with whatever GitHub repository holds the code for your Docusaurus site:
<ol>
<li>The repository is <a href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public" target="_blank">public</a> (otherwise visitors will not be able to view the discussion).</li>
<li>The <a href="https://github.com/apps/giscus" target="_blank">giscus</a> app is installed (otherwise visitors will not be able to comment and react).</li>
<li>The Discussions feature is turned on by <a href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository" target="_blank">enabling it for your repository</a>.</li>
<li>Finally, list your actual repository in the following format (giscus will use this to provided automated configuration settings): <code>myusername/myrepo</code></li>
</ol>
All of the above criteria must be met in order for giscus to work effectively.
</p>
)

<!-- Giscus Step 3 -->
export const giscusStep3Label = (
  <span>Configure giscus settings to your liking</span>
)
export const giscusStep3Description = (
<p>
Work through the configuration options on the <a href="https://giscus.app/" target="_blank">giscus homepage</a> to specify the desired behavior for your comments. My own configuration is provided below for reference:
<ul>
<li><em>Language</em>: <strong>English</strong></li>
<li><em>Page ↔️ Discussions Mapping</em>: <strong>Discussion title contains page <code>pathname</code></strong>. This is where you choose the mapping between the embedding page and the embedded discussion. If the discussion title contains page <code>pathname</code>, then giscus will search for a discussion whose title contains the page's <code>pathname</code> URL component. This is a reasonable choice since the <code>pathname</code> should be unique for every doc page or blog entry.</li>
<li><em>Discussion Category</em>: <strong>Announcements</strong>. This choice stems from giscus' own recommendation: "It is recommended to use a category with the Announcements type so that new discussions can only be created by maintainers and giscus." Additionally, the option to "Only search for discussions in this category" is checked (this is to ensure giscus only searches this category for a matching discussion).</li>
<li><em>Features</em>: The following features are chosen by default:<ul><li><strong>Enable reactions for the main post</strong></li><li><strong>Place the comment box above the comments</strong></li><li><strong>Load the comments lazily</strong></li></ul></li>
<li><em>Theme</em>: <strong>Preferred color scheme</strong>. This choice is immaterial as it will soon be overriden to cleanly mesh with the light and dark modes on your Docusaurus site.</li>
</ul>
<p>If you went through all of the steps above, then you should see something like the following:</p>
<CodeBlock language="html" >
{`<script 
        // highlight-next-line
        src="https://giscus.app/client.js"
        data-repo="farlowdw/software-development-handbook"
        data-repo-id="R_kgDOHmzzBQ"
        data-category="Announcements"
        data-category-id="DIC_kwDOHmzzBc4CSLOr"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        // highlight-start
        crossorigin="anonymous"
        async
        // highlight-end
      >
</script>`}
</CodeBlock>
<p>The highlighted lines will be removed in the next step.</p>
</p>
);

<!-- Giscus Step 4 -->
export const giscusStep4Label = (
  <span>Reactify your giscus settings</span>
)
export const giscusStep4Description = (
<p>
<p>The giscus settings returned at the end of the previous step provide most of what we need in order to add giscus to doc pages and blog entries, but we need to <a href="https://github.com/giscus/giscus-component" target="_blank">"Reactify" these settings</a> since Docusaurus is powered by React: prop names are the same as the <code>data-</code> attributes shown in the previous step but written in <code>camelCase</code> with the <code>data-</code> prefix and dashes removed (and you can wrap all the content in a <code>Giscus</code> component instead of <code>script</code> tags):</p>
<CodeBlock language="jsx" >
{`<Giscus
  // highlight-start
  id="comments"
  repo="farlowdw/software-development-handbook"
  repoId="R_kgDOHmzzBQ"
  // highlight-end
  category="Announcements"
  // highlight-next-line
  categoryId="DIC_kwDOHmzzBc4CSLOr"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  // highlight-next-line
  theme={colorMode}
  lang="en"
  loading="lazy"
/>`}
</CodeBlock>
<p>The first highlighted line, <code>id="comments"</code>, follows <a href="https://github.com/giscus/giscus-component" target="_blank">giscus's React example</a> and may be especially useful if you plan to <a href="https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md" target="_blank">use giscus in a more advanced fashion</a>. The next three highlighted lines, namely the props <code>repo</code>, <code>repoId</code>, and <code>categoryId</code>, will all be specific to your own GitHub username and project repo. The last highlighted line, <code>theme=&#123;colorMode&#125;</code>, references a <code>colorMode</code> variable whose purpose will be made clear momentarily (it is Docusaurus-specifc and ensures the theme of the giscus comment section meshes cleanly with the light or dark theme you have in use on your Docusaurus site).</p>
</p>
)

export const steps = [
	{
		label: giscusStep1Label,
		description: giscusStep1Description,
	},
	{
		label: giscusStep2Label,
		description: giscusStep2Description,
	},
	{
		label: giscusStep3Label,
		description: giscusStep3Description,
	},
	{
		label: giscusStep4Label,
		description: giscusStep4Description,
	},
];

This post details how to outfit your Docusaurus site's doc pages and blog posts with a comments section using giscus.

<!--truncate-->

:::info

This blog post was originally inspired by [the post on Canny](https://docusaurus.canny.io/feature-requests/p/comments-in-documents-or-blogs), a site meant for lisitng Docusaurus feature requests. Specifically, [a blog post by Dipak Parmar](https://dipakparmar.medium.com/how-to-add-giscus-to-your-docs-site-built-with-docusaurus-d57fa7f8e2f3) was used us the starting point.

Note: All examples in this post were run using Docusaurus `2.1.0`.

:::

Follow the steps below to add a comments section similar to what appears at the end of this post. Since what you are reading is a blog entry, it is clear that comments have been enabled for blog posts on this site. But comments can also be enabled for documentation entries such as [this site's introduction page](/docs/intro). Choose what works best for you according to the steps below.

:::caution Warnings you may encounter while swizzling

As [Docusaurus itself notes](https://docusaurus.io/docs/swizzling): swizzling allows deeper site customizations. The swizzling customizations we are going to make are very minor. We do not need to worry much about "copying a large amount of internal code" which we will then have to maintain ourselves. If the Docusaurus maintainers change something at some point that interferes with our changes, then we can easily re-swizzle and update components to mesh cleanly with our original updates.

To get an overview of all the themes and components available to swizzle, run the following:

```npm
npm run swizzle -- --list
```

We will be making updates to `DocItem/Layout` (for the docs) and `BlogPostItem/Content` (for the blog), both deemed components "unsafe" to make changes to. But, as noted above, our changes will be minimal and these components can easily be re-swizzled if we ever run into problems in the future.

:::

## Giscus

What is giscus? Quick answer according to [its homepage](https://giscus.app/):

> A comments system powered by [GitHub Discussions](https://docs.github.com/en/discussions). Let visitors leave comments and reactions on your website via GitHub! Heavily inspired by [utterances](https://github.com/utterance/utterances).

Essentially, giscus will make it possible for us to let users comment on our docs/blog without having to use some sort of database. 

### How giscus works

As noted on [the homepage for giscus](https://giscus.app/):

> When giscus loads, the [GitHub Discussions search API](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search) is used to find the Discussion associated with the page based on a chosen mapping (URL, `pathname`, `<title>`, etc.). If a matching discussion cannot be found, the giscus bot will automatically create a discussion the first time someone leaves a comment or reaction.
>
> To comment, visitors must [authorize the giscus app [on GitHub]](https://github.com/apps/giscus) to [post on their behalf](https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps) using the GitHub OAuth flow. Alternatively, visitors can comment on the GitHub Discussion directly. You can moderate the comments on GitHub.

Since doc pages and blog entries will be unique by path name, our chosen mapping for giscus will be `pathname`. 

We are going to configure giscus so that the mapping used 

### Giscus installation and configuration {#giscus-install}

Follow the steps outlined below to install and configure giscus to your liking.

<VerticalLinearStepper steps={steps} msg="You're all set! You should now be able to cleanly implement a giscus comments section on doc pages and blog entries per the work above and instructions below." />

## Enable comments for doc pages

Start by swizzling the `DocItem/Layout` component:

```bash
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject
```

You will likely encounter a prompt that looks as follows (as of <LocalVarSpan val={currentDate} />, at least):

```a
> software-development-handbook@0.0.0 swizzle
> docusaurus swizzle "@docusaurus/theme-classic" "DocItem/Layout" "--eject"

[WARNING] 
Swizzle action eject is unsafe to perform on DocItem/Layout.
It is more likely to be affected by breaking changes in the future
If you want to swizzle it, use the `--danger` flag, or confirm that you understand the risks.

? Do you really want to swizzle this unsafe internal component? › - Use arrow-keys. Return to submit.
❯   NO: cancel and stay safe
// highlight-next-line
    YES: I know what I am doing!
    [Exit]
```

Press the down arrow to point `❯` to the highlighted line above to confirm the swizzling directive. Two files will then be "ejected" to `/src/theme/DocItem/Layout` in your project, namely `index.js` and `styles.modules.css` (you do not need to modify this file unless you want to change the default styling). These originally ejected files are shown below in the two tabs on the right for reference. The first tab includes the modifications we need to make to the `index.js` file in order for giscus to work with our doc pages (all changes/additions from the originally swizzled file have been highlighted):

<Tabs>
<TabItem value="js-updated" label="index.js (updated with giscus)">

```jsx title="/src/theme/DocItem/Layout/index.js"
import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from './styles.module.css';
// highlight-start
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
// highlight-end
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  // highlight-start
  const { colorMode } = useColorMode();
  const giscus = (
    <React.Fragment>
      <hr />
      <br></br>
      <Giscus
        id="comments"
        repo="farlowdw/software-development-handbook"
        repoId="R_kgDOHmzzBQ"
        category="Announcements"
        categoryId="DIC_kwDOHmzzBc4CSLOr"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </React.Fragment>
  )
  // highlight-end
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
          // highlight-next-line
          {giscus}
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
```

The `Giscus` component comes from our work in the [giscus installation and configuration section](#giscus-install). The `hr` and `br` tags included above this component are merely to make the comments section more appealing from a presentational standpoint. Do what works best for you.

</TabItem>
<TabItem value='js' label='index.js'>

```jsx title="/src/theme/DocItem/Layout/index.js"
import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from './styles.module.css';
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}
export default function DocItemLayout({children}) {
  const docTOC = useDocTOC();
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
```

</TabItem>
<TabItem value='css' label='styles.modules.css'>

```css title="/src/theme/DocItem/Layout/styles.module.css"
.docItemContainer header + *,
.docItemContainer article > *:first-child {
  margin-top: 0;
}

@media (min-width: 997px) {
  .docItemCol {
    max-width: 75% !important;
  }
}
```

</TabItem>
</Tabs>

Congratulations! You should now have comments enabled for your doc pages.

## Enable comments for blog entries

Start by swizzling the `BlogPostItem/Content` component:

```bash
npm run swizzle @docusaurus/theme-classic BlogPostItem/Content -- --eject
```

You will likely encounter a prompt that looks as follows (as of <LocalVarSpan val={currentDate} />, at least):

```a
> software-development-handbook@0.0.0 swizzle
> docusaurus swizzle "@docusaurus/theme-classic" "BlogPostItem/Content" "--eject"

[WARNING] 
Swizzle action eject is unsafe to perform on BlogPostItem/Content.
It is more likely to be affected by breaking changes in the future
If you want to swizzle it, use the `--danger` flag, or confirm that you understand the risks.

? Do you really want to swizzle this unsafe internal component? › - Use arrow-keys. Return to submit.
❯   NO: cancel and stay safe
// highlight-next-line
    YES: I know what I am doing!
    [Exit]
```

Press the down arrow to point `❯` to the highlighted line above to confirm the swizzling directive. A single file will then be "ejected" to `/src/theme/BlogPostItem/Content` in your project, namely `index.js`. The originally ejected file is shown below in the tab on the right for reference. The first tab includes the modifications we need to make to the `index.js` file in order for giscus to work with our blog entries (all changes/additions from the originally swizzled file have been highlighted):

<Tabs>
<TabItem value='js-updated' label='index.js (updated with giscus)'>

```jsx title="/src/theme/BlogPostItem/Content/index.js"
import React from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';
// highlight-start
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
// highlight-end
export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage} = useBlogPost();
  // highlight-start
  const { colorMode } = useColorMode();
  const giscus = (
    <React.Fragment>
      <hr />
      <br></br>
      <Giscus
        id="comments"
        repo="farlowdw/software-development-handbook"
        repoId="R_kgDOHmzzBQ"
        category="Announcements"
        categoryId="DIC_kwDOHmzzBc4CSLOr"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </React.Fragment>
  )
  // highlight-end
  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}
      itemProp="articleBody">
      <MDXContent>
        {children}
        // highlight-next-line
        {isBlogPostPage && giscus}
      </MDXContent>
    </div>
  );
}
```

The `Giscus` component comes from our work in the [giscus installation and configuration section](#giscus-install). The `hr` and `br` tags included above this component are merely to make the comments section more appealing from a presentational standpoint. Do what works best for you.

</TabItem>
<TabItem value='js' label='index.js'>

```jsx title="/src/theme/BlogPostItem/Content/index.js"
import React from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';
export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage} = useBlogPost();
  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}
      itemProp="articleBody">
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
```

</TabItem>
</Tabs>

Congratulations! You should now have comments enabled for your blog entries.

## Selectively disable comments

As [the Docusaurus docs note](https://docusaurus.io/docs/advanced/routing#generating-and-accessing-routes), we can take advantage of `useLocation` to get the current page's [location](https://developer.mozilla.org/en-US/docs/Web/API/Location):

```jsx
import {useLocation} from '@docusaurus/router';

export function someFunction() {
  // React router provides the current component's route, even in SSR
  const location = useLocation();
  ...
}
```

This means we can use `location.pathname` to programmatically determine whether or not a giscus comments section should be made available for specific doc pages or blog entries based on the paths for those entries. 

But where should such paths be specified? Here are two sensible options:

1. **Directly within swizzled component:** The paths could be specified within each swizzled component directly; for example, doc paths for which we do not want giscus comment sections could be specified in `/src/theme/DocItem/Layout/index.js` directly.
2. **Within Docusaurus config (preferred):** The first option may seem like a good choice at first, but it quickly becomes problematic if we ever want to revert back to the current `DocItem` or `BlogPostItem` being maintained by the Docusaurus team and *re*-swizzle them to use giscus comment sections. The code shown in previous sections of this article would not be problematic to add back to freshly swizzled components, but adding all of the paths back might be cumbersome depending on how many were added in the first place.

  A convenient solution is to make use of the [`useDocusaurusContext`](https://docusaurus.io/docs/docusaurus-core#useDocusaurusContext) hook, which gives us access to the `siteConfig` object from [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config). How does this help? As [the docs note](https://docusaurus.io/docs/api/docusaurus-config#customfields):

  > Docusaurus guards `docusaurus.config.js` from unknown fields. To add a custom field, define it on `customFields`.

  Hence, we can add a `customFields` property to our exported config object in `docusaurus.config.js`, which will then be accessible as a property on the `siteConfig` object, which is made available by means of the `useDocusaurusContext` hook.

  The takeaway is that we can add our paths to the `customFields` object, which will then not only be accessible globally but also, most importantly, within whatever components we want to swizzle:

  ```js
  customFields: {
    forbiddenGiscusDocPaths: [
      '/docs/tutorials/intro'
    ],
    forbiddenGiscusBlogPaths: [
      '/blog/2022/10/27/giscus-comments'
    ],
  }
  ```

The tabs below indicate how we can build upon our previous work to achieve this (line changes are highlighted):

<Tabs>
<TabItem value='js-docs' label='Doc pages'>

```jsx title="/src/theme/DocItem/Layout/index.js"
import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from './styles.module.css';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
// highlight-start
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// highlight-end
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  const { colorMode } = useColorMode();
  // highlight-start
  const location = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {forbiddenGiscusDocPaths} = siteConfig.customFields;
  // highlight-end
  const giscus = (
    <React.Fragment>
      <hr />
      <br></br>
      <Giscus
        id="comments"
        repo="farlowdw/software-development-handbook"
        repoId="R_kgDOHmzzBQ"
        category="Announcements"
        categoryId="DIC_kwDOHmzzBc4CSLOr"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </React.Fragment>
  )
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
          // highlight-next-line
          {!forbiddenGiscusDocPaths.includes(location.pathname) && giscus}
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
```

The changes above mean that all doc pages will have a giscus comments section *except* the doc page at the following path:

```
/docs/tutorials/intro
```

To prevent comments for other paths, simply add these paths to the `forbiddenGiscusDocPaths` array.

</TabItem>
<TabItem value='js-blog' label='Blog entries'>

```jsx title="/src/theme/BlogPostItem/Content/index.js"
import React from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
// highlight-start
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// highlight-end
export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage} = useBlogPost();
  const { colorMode } = useColorMode();
  // highlight-start
  const {siteConfig} = useDocusaurusContext();
  const {forbiddenGiscusBlogPaths} = siteConfig.customFields;
  const location = useLocation();
  // highlight-end
  const giscus = (
    <React.Fragment>
      <hr />
      <br></br>
      <Giscus
        id="comments"
        repo="farlowdw/software-development-handbook"
        repoId="R_kgDOHmzzBQ"
        category="Announcements"
        categoryId="DIC_kwDOHmzzBc4CSLOr"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </React.Fragment>
  )
  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}
      itemProp="articleBody">
      <MDXContent>
        {children}
        // highlight-next-line
        {isBlogPostPage && !forbiddenGiscusBlogPaths.includes(location.pathname) && giscus}
      </MDXContent>
    </div>
  );
}
```

The changes above mean that all blog entries will have a giscus comments section *except* this blog entry because it is accessed via the following path (note: this is just for illustrative reasons; the comments have not been disabled for this post for obvious reasons):

```
/blog/2022/10/27/giscus-comments
```

To prevent comments for other paths, simply add these paths to the `forbiddenGiscusBlogPaths` array.

</TabItem>
</Tabs>
