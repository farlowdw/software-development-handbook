---
title: How to update your Docusaurus site's webpack config
draft: false
description: This post details how to modify your Docusaurus site's webpack configuration.
tags: 
  - Giscus
  - Comments
  - Webpack
  - Docusaurus
  - Configuration
keywords: 
  - giscus
  - comments
  - guide
  - webpack
  - docusaurus
  - configuration
authors: 
  - farlow
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This post details how to modify your Docusaurus site's webpack configuration.

<!--truncate-->

The TLDR presented below is meant as a quick-reference.

<details open>
<summary> TLDR</summary>

1. **Create plugins folder:** Create a `plugins` folder at your project root.
2. **Create a plugin:** Create a plugin (e.g., `my-loaders`) inside the `plugins` folder with `index.js` and `package.json` files:

  <details open>
  <summary> <code>index.js</code> and <code>package.json</code> file contents</summary>

  As noted in [the Docusaurus docs](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack) for `configureWebpack()`, the return object highlighted below gets merged into the final webpack config.

  ```js title="/plugins/my-loaders/index.js"
  module.exports = function (context, options) {
    return {
      name: 'my-loaders',
      configureWebpack(config, isServer) {
        // highlight-start
        return {
          module: {
            rules: [
              {
                test: /\.m?js/,
                resolve: {
                  fullySpecified: false
                }
              },
            ],
          },
        };
        // highlight-end
      },
    };
  };
  ```

  ```json title="/plugins/my-loaders/package.json"
  {
    "name": "my-loaders",
    "version": "0.0.0",
    "private": true
  }
  ```

  </details>

3. **Update Docusaurus config:** Update your Docusaurus configuration file to use the plugin:

  ```js title="/docusaurus.config.js"
  plugins: [
    // ...
    'my-loaders'
    // ...
  ]
  ```

4. **Update project dependency list to use plugin:** Specify the plugin as a dependency in the `package.json` at your project root:

  ```json title="/package.json"
  {
    // ...
    "dependencies": {
      // ...
      // highlight-next-line
      "my-loaders": "file:plugins/my-loaders",
      // ...
    },
      // ...
  }
  ```

5. **Install new plugin dependency for project:** Execute the following to make use of the new plugin in your project:

  ```bash
  npm i
  ```

</details>

## Problem

I recently ran into an issue using [giscus](https://giscus.app/), specifically [`@giscus/react`](https://www.npmjs.com/package/@giscus/react) (version `2.2.0`), as I noted in [a GitHub issue](https://github.com/giscus/giscus-component/issues/778). I was able to concoct a janky workaround as a temporary solution (without having to update the `@giscus/react` package version), namely by [styling the shadow DOM](https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/):

```css
giscus-widget::part(iframe) {
  color-scheme: dark;
}
```

The package maintainer sensibly asked me to update to the most recent version, namely `v2.2.3` at the time. I updated my version and got the following error:

```a
Module not found: Error: Can't resolve 'react/jsx-runtime' in '/.../node_modules/@giscus/react/dist'
Did you mean 'jsx-runtime.js'?
BREAKING CHANGE: The request 'react/jsx-runtime' failed to resolve only because it was resolved as fully specified
(probably because the origin is strict EcmaScript Module, e.g. a module with javascript mimetype, a '*.mjs' file, or a '*.js' file where the package.json contains '"type": "module"').
The extension in the request is mandatory for it to be fully specified.
Add the extension to the request.
client (webpack 5.73.0) compiled with 1 error
```

It then became clear that I needed to update my Docusaurus webpack config somehow. But [the Docusaurus docs](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack) were anything but clear to me. After some rooting around, I figured out a solution that works (at least for now), as detailed below.

## Solution

### Webpack error

As noted in [this GitHub issue comment](https://github.com/webpack/webpack.js.org/issues/3975#issue-701021807) within the [webpack](https://github.com/webpack) repo:

> Since webpack 5.0.0-beta.30, you're required to specify extensions when using `import`s in `.mjs` files or any `.js` files with a `package.json` with `"type": "module"`. You can still disable the behavior with `resolve.fullySpecified` set to `false` if you see any related errors in your project.

The first line of the error message above tells us where to look in order to try to resolve the error:

```
Module not found: Error: Can't resolve 'react/jsx-runtime' in '/.../node_modules/@giscus/react/dist'
```

The first line of the referenced file illustrates the problem:

```js title="/node_modules/@giscus/react/dist/index.mjs"
import { jsx as b } from "react/jsx-runtime";
```

As noted in [another GitHub issue comment within the webpack repo](https://github.com/webpack/webpack/issues/11467#issuecomment-691873586), the following webpack configuration will disable the module resolution error due to the import not being fully specified:

```js
{
  test: /\.m?js/,
  resolve: {
    fullySpecified: false
  }
}
```

Great. But for this solution to be of any use we need to know how to update our Docusaurus site's default webpack configuration. How do we do that?

### Updating the config

The [Docusaurus documentation](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack) was not as helpful as I had hoped it would be in trying to update the default webpack configuration. The most helpful information I came across was a [GitHub issue thread](https://github.com/facebook/docusaurus/issues/2097) on the Docusaurus GitHub repo, but the commentary was mixed in its utility. What follows is a quick run through as to how I used the issue thread linked above to resolve the error first mentioned in this post.

#### Create a plugins folder

Create a `plugins` folder at the project root along with a `my-loaders` subfolder that has two files, `index.js` and `package.json`:

```js title="/plugins/my-loaders/index.js"
module.exports = function (context, options) {
  return {
    name: 'my-loaders',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              }
            },
          ],
        },
      };
    },
  };
};
```

```json title="/plugins/my-loaders/package.json"
{
	"name": "my-loaders",
	"version": "0.0.0",
	"private": true
}
```

#### Update Docusaurus config to use your plugin

Update your Docusuaurus config to use the `my-loaders` plugin created in the previous step:

```js title="/docusaurus.config.js"
plugins: [
  // ...
  'my-loaders'
  // ...
]
```

#### Specify plugin as a project dependency and install

Now that the plugin has been created and specified for use within your Docusaurus project, it is now time to specify the plugin as a project dependency. Update the `package.json` file at your project root with `my-loaders` specified as a dependency:

```json title="/package.json"
{
  // ...
  "dependencies": {
    // ...
    // highlight-next-line
    "my-loaders": "file:plugins/my-loaders",
    // ...
  },
    // ...
}
```

Finally, run the following from your project root to install the new `my-loaders` dependency for your project (along with whatever other dependencies you may have added):

```bash
npm i
```

If everything worked out as described above without error, then you should be up and running and good to go.

#### Final note

We may have achieved the desired result at this point (hopefully), but how did we actually update the default Docusaurus webpack configuration? It seems highly likely this was achieved by means of `configureWebpack()` in the `my-loaders` plugin. But why did we have to use a plugin and what does `configureWebpack()` accomplish?

:::info Docusaurus docs on `configureWebpack()`

The answer to the question above may be found in the [Docusaurus docs](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack), which may now prove to be useful in terms of gaining an understanding as to what is going on underneath the hood:

> `configureWebpack(config, isServer, utils, content)` modifies the internal webpack config. If the return value is a JavaScript object, it will be merged into the final config using [`webpack-merge`](https://github.com/survivejs/webpack-merge). If it is a function, it will be called and receive `config` as the first argument and an `isServer` flag as the second argument.

More complete details may be found in the docs, but the important piece of information from the excerpt above is this bit

> If the return value is a JavaScript object, it will be merged into the final config.

Is our return value a JavaScript object? Yes, it is:

```js title="/plugins/my-loaders/index.js"
module.exports = function (context, options) {
  return {
    name: 'my-loaders',
    configureWebpack(config, isServer) {
      // highlight-start
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              }
            },
          ],
        },
      };
      // highlight-end
    },
  };
};
```

:::

The highlighted object above ultimately gets merged into the final webpack config, thus modifying the default Docusaurus webpack config, as desired. Specifically, the error detailed in the problem statement at the beginning of this post has now been resolved.
