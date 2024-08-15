---
title: About
description: About the site author
hide_table_of_contents: false
---

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Link from '@docusaurus/Link';
import DocsLink from '@site/src/components/DocsLink';
import ResponsiveAboutAvatar from '@site/src/components/ResponsiveAboutAvatar';

<Grid>
  <Grid item xs={12} md={8}>
    <ResponsiveAboutAvatar />
    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Contact Me</Typography>
        <Typography component={'div'}>
            Comments can be provided for most posts on this site. Such page-specific comments invite interactive discussion of a public nature. If, however, you'd like to reach out to me personally, then you're welcome to <a href="mailto:daniel@dwf.dev?subject=Hey%20Daniel%21%20Nice%20Website%21">send me an email</a> or find me through other channels made clear on <DocsLink to="/resume" target="_blank">my resume</DocsLink>.
        </Typography>
      </Box>
    </Box>
  </Grid>
</Grid>
