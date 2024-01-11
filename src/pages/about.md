---
title: About
description: About the site author
hide_table_of_contents: false
---

import React from 'react';
import { Grid, Box, Typography, Avatar } from '@mui/material';
import Link from '@docusaurus/Link';
import DocsLink from '@site/src/components/DocsLink';

<Grid spacing={2} >
  <Grid item xs={12} md={8}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">About Daniel Farlow</Typography>
        <Typography>
          Hey there! Thanks for stopping by. What's this site all about and who is Daniel Farlow anyway? Glad you asked! I'm the author of this site, a site dedicated to software engineering that aims to be a sort of handbook for other practicing engineers (or people thinking about becoming engineers). It's not a secret that tech websites and <Link to="https://github.com/kilimchoi/engineering-blogs">engineering blogs</Link> can be treasure troves of information. My hope is that this site could be that treasure trove for you or someone else.
        </Typography>
        <Typography>
          As noted in the <DocsLink to="/docs/intro">handbook introduction</DocsLink>, <em>anyone</em> can write software. You don't need a fancy degree or special credentials. In fact, <DocsLink to="/resume" target="_blank">check out my resume</DocsLink> &#8212; I don't have a degree in computer science! I do have a degree in math, which can help sometimes, but the most important thing (in my opinion) is to have endless curiosity and an insatiable desire to learn. I've been employed professionally for a few years now as a software engineer, and its rich ecosystem never ceases to amaze me. Software engineering uniquely empowers individuals and communities alike to exercise their creative, analytic, and imaginative faculties to build life-changing products and services for the common good. My goal in working on this site is to try to convey some of the lessons I've learned (and continue to learn) through different kinds of written posts.
        </Typography>
        <Typography>
           Documentation posts (i.e., <DocsLink to="/docs/intro">"the handbook"</DocsLink>) will often concern matters of general interest (e.g., <DocsLink to="/docs/topics/sql/window-functions" target="_blank">using window functions in SQL</DocsLink>) while <DocsLink to="/blog/archive">blog posts</DocsLink> will largely concern various problems I've run into that required me to engineer a solution (e.g., <DocsLink to="/blog/2023/03/29/2023/virtual-box-mac-ubuntu-shared" target="_blank">how to install a VM on a Mac with shared folders using VirtualBox</DocsLink>). This site is a work in progress and there are many more posts I hope to make in the very near future.
        </Typography>
      </Box>
      <DocsLink to="/resume" target="_blank">
        <Avatar
          src={require('@site/static/img/headshot.jpeg').default}
          alt="Daniel Farlow"
          sx={{ borderRadius: '50%', height: 130, width: 130, ml: 2 }}
        />
      </DocsLink>
    </Box>
    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Contact Me</Typography>
        <Typography>
          Comments can be provided for most posts on this site. Such page-specific comments invite interactive discussion of a public nature. If, however, you'd like to reach out to me personally, then you're welcome to <a href="mailto:daniel@dwf.dev?subject=Hey%20Daniel%21%20Nice%20Website%21">send me an email</a> or find me through other channels made clear on <DocsLink to="/resume" target="_blank">my resume</DocsLink>.
        </Typography>
      </Box>
    </Box>
  </Grid>
</Grid>
