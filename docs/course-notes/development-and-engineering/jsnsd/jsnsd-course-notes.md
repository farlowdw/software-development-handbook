---
title: JSNSD Course Notes
hide_title: false
sidebar_label: JSNSD
description: Notes in preparation for JSNSD
draft: false
tags: [jsnsd]
keywords: [jsnsd]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={2} />

## 1 - Introduction

- Resources for this course can be found online. Making updates to this course takes time. Therefore, if there are any changes in between updates, you can always access course updates, as well as the course resources online: Go to the Linux Foundation training website to obtain [Course Resources](https://training.linuxfoundation.org/cm/LFW212). The user ID is **LFtraining** and the password is **Penguin2014**.
- One great way to interact with peers taking this course is via the [Class Forum](https://forum.linuxfoundation.org/categories/lfw212-class-forum). The forum can be used in the following ways: 
  + To introduce yourself to other peers taking this course. 
  + To discuss concepts, tools and technologies presented in this course, or related to the topics discussed in the course materials. 
  + To ask questions or report issues with labs or course content. 
  + To share resources and ideas related to Node.js.

## 2 - Setting up

### How not to install Node

Often Node.js can be installed with a particular Operating System's official or unofficial package manager. For instance apt-get on Debian/Ubuntu, Brew on macOs, Chocolatey on Windows. It is strongly recommended against using this approach to install Node. Package managers tend to lag behind the faster Node.js release cycle. Additionally the placement of binary and config files and folders isn't standardized across OS package managers and can cause compatibility issues.

Another significant issue with installing Node.js via an OS package manager is that installing global modules with Node's module installer (npm) tends to require the use of `sudo` (a command which grants root privileges) on non-Windows systems. This is not an ideal setup for a developer machine and granting root privileges to the install process of third-party libraries is not a good security practice.

Node can also be installed directly from the Node.js website. Again on macOS and Linux it predicates the use of `sudo` for installing global libraries. Whether Windows, macOS or Linux, in the following sections we'll present a better way to install Node using a **version manager**.

It's strongly recommended that if Node is installed via an Operating System package manager or directly via the website, that it be completely uninstalled before proceeding to the following sections.

### Installing Node.js on macOS and Linux

The recommended way to install Node.js on macOS and Linux is by using a Node version manager, in particular [`nvm`](https://github.com/nvm-sh/nvm). See [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) for full details. The current `nvm` version is v0.39.1 (as of January 2022), so the install process will contain this version in the URL, if a greater version is out at time of reading, replace v0.39.1 with the current `nvm` version. For this installation process we assume that Bash, Sh, or Zsh is the shell being used, Fish is not supported but see the `nvm` readme for alternatives. The way to install `nvm` is via the install script at [https://github.com/nvm-sh/nvm/blob/v0.39.1/install.sh](https://github.com/nvm-sh/nvm/blob/v0.39.1/install.sh). If `curl` is installed (it usually is) a single command can be used to install and setup `nvm`:

```bash
curl -o- ht‌tps://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

If using `zsh` (e.g., on newer macOS releases) the `bash` part of the command can be replaced with `zsh`. Alternatively the file can be downloaded and saved, and then easily executed like so: `cat install.sh | bash`. Again `bash` can be replaced with `zsh`. To check that the installation was successful execute the following in the terminal: `command -v nvm`. It should output `nvm`. If this fails on Linux, close and reopen the terminal (or SSH session) and try running the command again. On macOS see [https://github.com/nvm-sh/nvm#troubleshooting-on-macos](https://github.com/nvm-sh/nvm#troubleshooting-on-macos) for in depth troubleshooting. Now that we have a version manager, let's install the Node version we'll be using on this course: `nvm install 16`. This will install the latest version of Node 16. We can verify that Node is installed, and which version, with the following command: `node -v`.

## 3 - Creating a web server

### Section overview

The focus of this course and the JSNSD examination centers on RESTful/HTTP services as key knowledge for almost every contemporary scenario involving Node.js and services. There is a great deal of overlap between an HTTP service and a web server. In order to make an HTTP-based service, the first step is to create an HTTP server. In this chapter we'll explore different approaches to creating a web server and perform a tour de force of selected web frameworks while we're at it.

### Creating a web server with Node core

Generally speaking, attempting to create a web server or service with just the Node core `http` (or `https`) module is not recommended. However for learning purposes we'll put together a basic web server using the core `http` module in order to better understand the value that a web framework can bring and how a web framework is actually operating under the hood.

Let's define what we expect from a minimum viable web server:

- Responds to HTTP requests based on a given HTTP verb (for instance `GET`).
- Responds to requests based on a given route.
- Responds with 404 HTTP Status code if a route isn't found.
- Sets appropriate headers, such as `Content-Type`.

To meet this criteria we're going to take an iterative approach and build in layers. To get started, we can create a folder called `http-web-server` with the following commands:

```bash
node -e "fs.mkdirSync('http-web-server')"
cd http-web-server
```

Note, throughout this course `node` with the `-e` (evaluate) flag will be used for cross-platform/cross-shell administrative commands (like creating folders). Now, let's create a file called `server.js` with the following initial code:

```js title=http-web-server/server.js
'use strict'
const http = require('http')
const PORT = process.env.PORT || 3000

const hello = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     h1 { color: #EEE; font-family: sans-serif }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(hello)
})

server.listen(PORT)
```

This code can be executed with the following command:

```bash
node server.js
```

If we run this code the process will not exit by itself:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnsd/process-continuing.png').default} />
</p>

This is because the created server is keeping the process open. If we then navigate in a browser to `ht‌‌tp://localhost:3000`, we should see something like the following:

<p align='center'>
  <img width='' src={require('@site/static/img/course-notes/jsnsd/hello-world.png').default} />
</p>

So far we've used the Node core `http` module to create a server with the `createServer` method. We've also observed that a function is passed to `createServer`. This function is called every time the HTTP server receives a request. The function passed to `createServer` is passed two objects: the request object and the response object. These objects are created for every request and then passed to the function we supply to `createServer`.

In the function we passed to `createServer` we use the `setHeader` and the `end` methods of the response object (`res`) to set the `Content-Type` header to `text/html`, and to send the string of HTML (assigned to the `hello` constant) while also closing the connection. The `res` object inherits from `http.ServerResponse` which in turn inherits from `http.OutgoingMessage` (an internal constructor) which then inherits from `stream.Stream`. For all practical purposes the `res` object is a writable stream, which is why calling `end` writes our content and also closes the connection.

The `createServer` method also returns an object which represents the server. We use the `listen` method to bind to a port. In our case, by default, we bind to port `3000`. Our server can instead bind to a different port by setting the `PORT` environment variable.

Our implementation does not yet meet our criteria. We can navigate to any route and the response will be the same. For instance, `ht‌tp://localhost:3000/foo`:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnsd/hello-world-foo.png').default} />
</p>

Also, regardless of whether we use a `POST`, `GET` or any other HTTP verb, we will always get the same response. Let's update our `server.js` code to the following:

```js title=http-web-server/server.js
'use strict'
const url = require('url')
const http = require('http')
const PORT = process.env.PORT || 3000
const { STATUS_CODES } = http

const hello = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     h1 { color: #EEE; font-family: sans-serif }
   </style>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end(STATUS_CODES[res.statusCode] + '\r\n')
    return
  }
  const { pathname } = url.parse(req.url)
  if (pathname === '/') {
    res.end(root)
    return
  }
  if (pathname === '/hello') {
    res.end(hello)
    return
  }
  res.statusCode = 404
  res.end(STATUS_CODES[res.statusCode] + '\r\n')
})

server.listen(PORT)
```

We can stop the currently running `server.js` process with Ctrl+C and start our modified `server.js` file with the following command:

```bash
node server.js
```

At the top of our `server.js` file we've added the additional core `url` module, and we've destructured the `STATUS_CODES` object, which contains key-values of status codes to HTTP status messages, from the `http` module. Just before creating our server we've also added a `root` constant which contains an HTML string with an anchor tag linking to the `/hello` route.

We've updated the function passed to `createServer` with some new logic. We check the incoming requests HTTP verb by accessing the `req.method` property. If this is not set to `GET` we set the `statusCode` of the `res` object to `405` (Method Not Allowed) and end the response with an appropriate status message.

We can check whether this works by running the following command in another terminal window:

```bash
node -e "ht‌tp.request('ht‌tp://localhost:3000', {method: 'POST'}, (res) => res.pipe(process.stdout)).end()"
```

This command uses the `http` module to submit a `POST` request to our server and then prints the result to the terminal:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnsd/method-not-allowed.png').default} />
</p>

The Node core `url` module has a `parse` method which turns a URL string into an object containing various segments of the URL, such as `host`, `protocol` and `pathname`. See the [Node.js Documentation](https://nodejs.org/dist/latest-v12.x/docs/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost) to learn more.

The `req.url` property has a slightly misleading name. It does not hold the entire URL of an incoming request, only the relative path after the host portion. For instance a request to `ht‌tp://localhost:3000/hello` will result in a `req.url` of `/hello`. The reason we pass `req.url` to `url.parse` is to separate any potential query string from the URL. Now, let's consider a request to `ht‌tp://localhost:3000/hello?foo=1`. It would result in a `req.url` value of `/hello?foo=1`. Passing such a string to `url.parse` will result in an object with a pathname property of `/hello`.

If the pathname is `/` then we end the response with the contents of `root` and exit the function early with a `return` keyword. In this case, there is no need to set `res.statusCode` because the default `res.statusCode` is 200 (OK).

For more information on status codes see the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

If we navigate to `ht‌tp://localhost:3000` in the browser we should see the following:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnsd/hello-path.png').default} />
</p>

If the pathname is `/hello` then we end the response with the contents of `hello` and exit the function. Again, no need to set the `res.statusCode` property.

In the browser, upon clicking the link or manually navigating to `ht‌tp://localhost/hello` we should see the following:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnsd/hello-world-2.png').default} />
</p>

If pathname is neither `/hello` nor `/` the end of the function is reached, where the `res.statusCode` property is set to 404 and the response is ended with the corresponding status message (Not Found).

Navigating to `ht‌tp://localhost:3000/foo` in the browser should result in the following:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnsd/404-not-found.png').default} />
</p>

We have now created a very basic web server. This procedural approach can become very rigid and unwieldy if we were to attempt to extend over time. In the next sections we'll learn how to use the Express and Fastify frameworks to achieve the same results in a declarative manner.

## 4 - Serving Web Content

tbd

## 5 - Creating RESTful JSON Services

tbd

## 6 - Manipulating Data with RESTful Services

tbd

## 7 - Consuming and Aggregating Services

tbd

## 8 - Proxying HTTP Requests

tbd

## 9 - Web Security: Handling User Input

tbd

## 10 - Web Security: Mitigating Attacks

tbd

## 11 - Course Completion

tbd

