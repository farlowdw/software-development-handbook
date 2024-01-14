---
title: Introduction
hide_title: false
sidebar_label: Introduction
description: Docs introduction
draft: false
tags: 
  - Introduction
keywords: 
  - introduction
hide_table_of_contents: true
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Link from '@docusaurus/Link';
import DocsLink from '@site/src/components/DocsLink';
import ArrowRight from '@site/static/icons/arrow_right.svg';

<p>
  I am not a smart man. But you do not need to be smart in order to write software. In fact, I have found that, more than anything else, <em>curiosity</em> is the engine of productivity in software engineering. It can be easy to get discouraged if you are not careful though. The sheer volume of things to learn in software engineering can be overwhelming to the point of paralysis. Sometimes I find it helpful to remind myself of something I used to say when studying mathematics:
</p>
<p>
  <em>Mathematics is not about understanding more. It is about misunderstanding less.</em>
</p>
<p>
  I like to think that this applies to software engineering as well. Don't try to learn everything. You can't. It's a fool's errand. But, day by day, you should hopefully be able to point to something you misunderstand just a little bit less. I have worked hard to break into the software industry, something I have now been doing professionally for a couple of years, but I have much more "breaking" and "misunderstanding less" to do. This site represents portions of my journey. Feel free to point out whatever mistakes I make. Hopefully we can both learn from them. Here's to misunderstanding everything just a little bit less.
</p>
<h2>Noteworthy Resources</h2>
<p>
  This site consists primarily of documentation pages (i.e., the "Handbook"), but a blog is also actively maintained. Noteworthy posts from both categories may be found below as well as links to other noteworthy <em>external</em> resources that I maintain (but are not technically part of this handbook).
</p>



<div className='gallery'>
  <div className='sub-heading'>
    <h3>Handbook Entries</h3>
  </div>
  <div className='card'>
    <h4>Data Structures Overview</h4>
    <p>
      Check out time and space complexity overviews for various data structures and array sorting algorithms.
    </p>
    <DocsLink to='/docs/data-structures/intro'>See Data Structures Overview <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Sliding Window</h4>
    <p>Get a more detailed look at the sliding window pattern, a pattern that frequently comes up in coding interview problems.</p>
    <DocsLink to='/docs/patterns/sliding-window'>See Sliding Window <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Window Functions (SQL)</h4>
    <p>An in-depth guide to SQL window/analytic functions. This is not only a guide but also a useful reference to keep handy (e.g., syntax guidance, basic examples, etc.).</p>
    <DocsLink to='/docs/topics/sql/window-functions'>See Window Functions <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Binary Search Template</h4>
    <p>Binary search may be easy to understand conceptually, but implementation can sometimes be a mess. This template tidies things up considerably.</p>
    <DocsLink to='/docs/templates/problem-solving/binary-search'>See Binary Search Template <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Feynman Technique</h4>
    <p>Tired of not being able to learn things quickly? Give the Feynman Technique a try next time.</p>
    <DocsLink to='/docs/templates/learning/feynman-technique'>See Feynman Technique <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>LeetCode Problems by Category</h4>
    <p>
      Tagged problems on LeetCode can only be so helpful. Additional contextual details can help, especially if these details are personalized.
    </p>
    <DocsLink to='/docs/learning-resources/leetcode-problems-by-category'>See LeetCode Problems by Category <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Math Reference</h4>
    <p>
      The topic of "math" is impossibly large on its own. This reference helps corral some mathematical facts that may be of use in everyday engineering.
    </p>
    <DocsLink to='/docs/topics/math'>See Math Reference <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Definitions</h4>
    <p>
      A cumulative list of definitions can be quite useful, especially when you are in need of a dust-up or review.
    </p>
    <DocsLink to='/docs/definitions'>See Definitions <ArrowRight className='arrow' /></DocsLink>
  </div>
</div>
<br />




<div className='gallery'>
  <div className='sub-heading'>
    <h3>Blog Posts</h3>
  </div>
  <div className='card'>
    <h4>Comments with Giscus</h4>
    <p>
      This blog post details how to enable comment sections on doc pages and blog entries on sites powered by Docusaurus (like this one) using giscus.
    </p>
    <DocsLink to='/blog/2022/10/27/2022/giscus-comments'>Read <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Light/Dark Modes with Material UI and Docusaurus</h4>
    <p>
      This blog post details how to synchronize the default light and dark mode palettes used in Material UI with the light or dark mode being used on a Docusaurus site.
    </p>
    <DocsLink to='/blog/2022/10/28/2022/docusaurus-mui-light-dark'>Read <ArrowRight className='arrow' /></DocsLink>
  </div>
</div>
<br />




<div className='gallery'>
  <div className='sub-heading'>
    <h3>External Resources</h3>
  </div>
  <div className='card'>
    <h4>Docusaurus Input-Output Examples</h4>
    <p>
      Collection of input-output examples for use with sites powered by Docusaurus.
    </p>
    <DocsLink to='https://courses.dwf.dev/docs/reference/docusaurus/templates'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>KaTeX Reference</h4>
    <p>
      Basically the KaTeX documentation site (but everything is ensured to work with Docusaurus).
    </p>
    <DocsLink to='https://courses.dwf.dev/docs/reference/docusaurus/katex'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>MySQL Reference</h4>
    <p>
      Easy-to-use references to many MySQL functions (e.g., string functions, date functions, etc.).
    </p>
    <DocsLink to='https://courses.dwf.dev/docs/reference/sql/mysql'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Postgres Reference</h4>
    <p>
      Easy-to-use references to many Postgres functions (e.g., string functions, date functions, etc.).
    </p>
    <DocsLink to='https://courses.dwf.dev/docs/reference/sql/postgresql'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>PG Exercises Reference</h4>
    <p>
      Comprehensive reference for the popular online Postgres Exercises tutorial.
    </p>
    <DocsLink to='https://courses.dwf.dev/docs/reference/sql/pg-exercises'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>Algorithm Design Manual (Book Notes)</h4>
    <p>
      Book notes to accompany Steven Skiena's <em>Algorithm Design Manual</em>.
    </p>
    <DocsLink to='https://cs.dwf.dev/docs/dsa/algorithm-design-manual/introduction-to-algorithm-design-old'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
  <div className='card'>
    <h4>MIT Missing Semester (Notes)</h4>
    <p>
      Notes to accompany the MIT's Missing Semester curriculum.
    </p>
    <DocsLink to='https://cs.dwf.dev/docs/supplemental-resources/courses/mit-missing-semester/introduction'>Visit <ArrowRight className='arrow' /></DocsLink>
  </div>
</div>