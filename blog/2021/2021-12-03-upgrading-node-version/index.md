---
title: Upgrading/installing Node version using nvm
draft: false
description: Details about how to upgrade/install Node using nvm
tags: [Guide, Node.js, NVM, Installation Guide, Upgrade Guide]
keywords: [nvm, node.js]
authors: [farlow]
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

This post details how to go about updating/installing Node.js using nvm

<!--truncate-->

If you do not already have `nvm` installed or you simply want to update your version of `nvm`, then run the following in your shell [as noted here](https://github.com/nvm-sh/nvm) (check this site for the most recent version of `nvm`, `0.36.0` as of this writing in Oct 2020):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

Typically, you will want to install/upgrade to the [most recent LTS version of Node](https://nodejs.org/en/) or just the most recent (i.e., "Current") version of Node. As [noted here](https://stackoverflow.com/a/41121536/5209533), to install the **latest version** (i.e., most recently released), simply run the following:

```bash
nvm install node --reinstall-packages-from=node
```

To install the most recent **stable (LTS) version**, run the following:

```bash
nvm install lts/* --reinstall-packages-from=node
```

This will install the appropriate version and reinstall all packages from the currently used Node version (you can run both commands to make sure you have the most recent version as well as the LTS). This saves you from manually handling the specific versions. Once this process finishes, you should be able to run `nvm list` to list the versions of Node available to you:

<div align='center' className='centeredImageDiv'>
  <img width='300px' src='https://user-images.githubusercontent.com/73953353/188996004-d652cd38-247d-4cbc-82b4-d7afa8b3f7ce.png' />
</div>

The `->     v14.15.0` part indicates version 14.15.0 of Node is being used (for the current shell session) and that it is the default (so version 14.15.0 of Node will be used for new shell sessions as well). If you want to switch over to a different version of Node, then use something like `nvm use 15.0.1`. You will see something like `Now using node v15.0.1 (npm v6.14.8)`, and you can check this by running `nvm list` again and you'll see `->     v15.0.1` where before you saw `->     v14.15.0`. 

The important thing to note here is that your version change *will not* persist to new shell sessions. That is, if you close out the shell and start a new session and run `node --version`, then you will be greeted with `v14.15.0`. Why? Look at the screenshot above again--notice the line `default -> node (-> v14.15.0)`. If you want `v15.0.1` to be your *default* version of Node (i.e., you want to use version 15.0.1 of Node for every new shell session), then you need to run `nvm alias default 15.0.1` as noted in [this Stack Overflow post](https://stackoverflow.com/a/47787025/5209533).

If you encounter weird errors, then [this post](https://stackoverflow.com/a/47883587/5209533) may help.
