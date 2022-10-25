import React from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';

// added after swizzling
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
//

export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage} = useBlogPost();

  // added after swizzling
  const { colorMode } = useColorMode();
  //

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
        {/* hr, br, and Giscus below added after swizzling */}
        {isBlogPostPage && giscus}
      </MDXContent>
    </div>
  );
}
