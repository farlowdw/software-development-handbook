---
title: Bash Snippets
hide_title: false
sidebar_label: Bash
description: Snippets for working with the bash shell
draft: false
tags: 
  - Cheatsheet
keywords: 
  - cheatsheet
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

## Filenames

### Lowercase all filenames

As [this post](https://stackoverflow.com/a/7787159/5209533) notes, all filenames can be made to be lowercase by running the following within the specified directory:

```bash
for f in *; do mv "$f" "$f.tmp"; mv "$f.tmp" "`echo $f | tr "[:upper:]" "[:lower:]"`"; done
```

### Rename files in a random numeric fashion

As [this post](https://superuser.com/a/304691/1039386) notes, the `$RANDOM` environment variable can be used -- it generates random values between `0` and `32767`. 

A simple `for` loop in bash works fine (the examples below target `.jpg` file types, but these examples can be modified as appropriate):

```bash
for i in *.jpg; do mv -i "$i" ${RANDOM}.jpg; done
```

If you have a *ton* of files (e.g., more than 1000), then the following might be a better strategy:

```bash
for i in *.jpg; do mv -i "$i" ${RANDOM}${RANDOM}.jpg; done
```

Note that you could also do something like the following to preserve old information in the filename, if desired (the only difference is changing `${RANDOM}${RANDOM}` to `${RANDOM}-$i`, where `$i` preserves the original filename):

```bash
for i in *.jpg; do mv -i "$i" ${RANDOM}-$i.jpg; done
```

