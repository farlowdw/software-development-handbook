---
title: JSNAD Course Notes
hide_title: false
sidebar_label: JSNAD
description: Notes in preparation for JSNAD
draft: true
tags: [jsnad]
keywords: [jsnad]
image: https://github.com/farlowdw.png
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={2} />

## 0 - Highlighted learnings

<details><summary> Use nvm to install Node (not the direct download or a package manager)</summary>

The recommended way to install Node.js on macOS and Linux is by using a Node version manager, in particular [`nvm`](https://github.com/nvm-sh/nvm). See [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) for full details. 

The quick version: if `curl` is installed (which it usually is), then use the install script (update version accordingly):

```bash
curl -o- ht‌tps://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Then run `command -v nvm` to check that the installation was successful (output should be `nvm`). Install the desired Node version:

```bash
nvm install 16
```

</details>

<details><summary> Helpful command line flags for the Node binary</summary>

- `node --help` will provide you with a very comprehensive listing of *all* command line flags.
- `node --v8-options` provides additional flags for modifying V8, the JavaScript runtime engine.
- `node -c <file-name>` parse a JavaScript application without running it in order to simply check syntax (helps when there are big setup/teardown tasks). No output indicates success; otherwise, error output will be shown.
- `node -p <expression>` evaluates an expression and prints the result; for example: `node -p "1+1"`
- `node -e <expression>` evaluates an expression and *does not* print the result; for example: `node -e "1+1"`

  > Usually a module would be required, like so: `require('fs')`, however all Node core modules can be accessed by their namespaces within the code evaluation context. For example, the following would print all the files with a `.js` extension in the current working directory in which the command is run:
  > 
  > ```
  > node -p "fs.readdirSync('.').filter((f) => /.js$/.test(f))"
  > ```

- `node -r <path-to-module>` can be used to *preload* a module before anything else loads. This can be useful when using or consuming modules that instrument or configure the process in some way. One example would be the `dotenv` module.

</details>

<details><summary> Modifying the stack trace limit via the command line when debugging</summary>

Stack traces are generated for any `Error` that occurs, so they're usually the first point of call when debugging a failure scenario. By default, a stack trace will contain the last ten stack frames (function call sites) at the point where the trace occurred. This is often fine, because the part of the stack you are interested in is often the last 3 or 4 call frames. However there are scenarios where seeing more call frames in a stack trace makes sense, like checking that the application flow through various functions is as expected.

The stack trace limit can be modified with the `--stack-trace-limit` flag. This flag is part of the JavaScript runtime engine, V8, and can be found in the output of the `--v8-options` flag.

Consider a program named `app.js` containing the following code:

```js title=app.js
function f (n = 99) {
  if (n === 0) throw Error()
  f(n - 1)
}
f()
```

When executed, the function `f` will be called 100 times. On the 100th time, an `Error` is thrown and stack for the error will be output to the console.

The stack trace output only shows the call to the `f` function, in order to see the very first call to `f` the stack trace limit must be set to `101`. This can be achieved with the following:

```bash
node --stack-trace-limit=101 app.js
```

Setting stack trace limit to a number higher than the amount of call frames in the stack guarantees that the entire stack will be output:

```bash
node --stack-trace-limit=99999 app.js
```

Generally, the stack trace limit should stay at the default in production scenarios due to the overhead involved with retaining long stacks. It can nevertheless be useful for development purposes.

</details>

<details><summary> Starting a node program with an active breakpoint and adding debugger statements</summary>

It is often best to cause the Node process to start with an active breakpoint at the very beginning of the program using the `--inspect-brk` flag (e.g., `node --inspect-brk app.js`); otherwise, the application will have fully initialised and be performing asynchronous tasks before any breakpoints can be set. Also, trying to use the `--inspect` flag by itself seems to be somewhat unreliable.

**Important to remember:** In order to begin debugging the process, the next step is to set a Chrome browser tab's address bar to `chrome://inspect`.

You can manually add breakpoints in code using the `debugger` statement. Still use the `--inspect-brk` flag.

</details>

## 1 - Introduction

- Go to the Linux Foundation training website to obtain [Course Resources](https://training.linuxfoundation.org/cm/LFW211/)
- The user ID is **LFtraining** and the password is **Penguin2014**.
- One great way to interact with peers taking this course is via the [Class Forum](https://forum.linuxfoundation.org/categories/lfw211-class-forum). The forum can be used in the following ways: 
  + To introduce yourself to other peers taking this course. 
  + To discuss concepts, tools and technologies presented in this course, or related to the topics discussed in the course materials. 
  + To ask questions or report issues with labs or course content. 
  + To share resources and ideas related to open source development, Git and Linux.

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

## 3 - The Node binary

The Node.js platform is almost entirely represented by the `node` binary executable. In order to execute a JavaScript program we use: `node app.js`, where `app.js` is the program we wish to run. However, before we start running programs, let's explore some of the command line flags offered by the Node binary.

To see all Node command line flags for any version of Node, execute `node --help` and view the output. Beyond the Node command line flags there are additional flags for modifying the JavaScript runtime engine: V8. To view these flags run `node --v8-options`.

### Checking syntax

It's possible to parse a JavaScript application without running it in order to just check the syntax. This can be useful on occasions where running code has a setup/teardown cost, for instance, needing to clear a database, but there's still a need to check that the code parses. It can also be used in more advanced cases where code has been generated and a syntax check is required. To check the syntax of a program (which will be called `app.js`), use `--check` or `-c` flag:

```bash
node --check app.js

node -c app.js
```

If the code parses successfully, there will be no output. If the code does not parse and there is a syntax error, the error will be printed to the terminal.

### Dynamic evaluation

Node can directly evaluate code from the shell. This is useful for quickly checking a code snippet or for creating very small cross-platform commands that use JavaScript and Node core API's. There are two flags that can evaluate code. The `-p` or `--print` flag evaluates an expression and prints the result, the `-e` or `--eval` flag evaluates without printing the result of the expression.

The following will print `2`:

```bash
node --print "1+1"
```

The following will not print anything because the expression is evaluated but not printed.

```bash
node --eval "1+1"
```

The following will print `2` because `console.log` is used to explicitly write the result of `1+1` to the terminal:

```bash
node -e "console.log(1+1)"
```

When used with print flag the same will print `2` and then print `undefined` because `console.log` returns `undefined`; so the result of the expression is `undefined`:

```bash
node -p "console.log(1+1)"
```

Usually a module would be required, like so: `require('fs')`; however, all Node core modules can be accessed by their namespaces within the code evaluation context. For example, the following would print all the files with a `.js` extension in the current working directory in which the command is run:

```bash
node -p "fs.readdirSync('.').filter((f) => /.js$/.test(f))"
```

Due to the fact that Node is cross-platform, this is a consistent command that can be used on Linux, MacOS or Windows. To achieve the same effect natively on each OS a different approach would be required for Windows vs Linux and Mac OS.

### Preloading modules

The command line flag `-r` or `--require` can be used to preload a module before anything else loads.

Given a file named `preload.js` with the following content:

```JS
console.log('preload.js: this is preloaded')
```

And a file called `app.js` containing the following:

```JS
console.log('app.js: this is the main file')
```

The following command would print `preload.js: this is preloaded` followed by `app.js: this is the main file`:

```bash
node -r ./preload.js app.js
```

Preloading modules is useful when using or consuming modules that instrument or configure the process in some way. One example would be the [`dotenv`](https://www.npmjs.com/package/dotenv#preload) module.

### Stack trace limit

Stack traces are generated for any `Error` that occurs, so they're usually the first point of call when debugging a failure scenario. By default, a stack trace will contain the last ten stack frames (function call sites) at the point where the trace occurred. This is often fine, because the part of the stack you are interested in is often the last 3 or 4 call frames. However there are scenarios where seeing more call frames in a stack trace makes sense, like checking that the application flow through various functions is as expected.

The stack trace limit can be modified with the `--stack-trace-limit` flag. This flag is part of the JavaScript runtime engine, V8, and can be found in the output of the `--v8-options` flag.

Consider a program named `app.js` containing the following code:

```js title=app.js
function f (n = 99) {
  if (n === 0) throw Error()
  f(n - 1)
}
f()
```

When executed, the function `f` will be called 100 times. On the 100th time, an `Error` is thrown and stack for the error will be output to the console. The stack trace output only shows the call to the `f` function, in order to see the very first call to `f` the stack trace limit must be set to `101`. This can be achieved with the following:

```bash
node --stack-trace-limit=101 app.js
```

Setting stack trace limit to a number higher than the amount of call frames in the stack guarantees that the entire stack will be output:

```bash
node --stack-trace-limit=99999 app.js
```

Generally, the stack trace limit should stay at the default in production scenarios due to the overhead involved with retaining long stacks. It can nevertheless be useful for development purposes.

## 4 - Debugging and diagnostics

In order to debug an application, the Node.js process must be started in Inspect mode. Inspect puts the process into a debuggable state and exposes a remote protocol, which can be connected to via debugger such as Chrome Devtools. In addition to debugging capabilities, Inspect Mode also grants the ability to run other diagnostic checks on a Node.js process. In this section, we'll explore how to debug and profile a Node.js process.

### Starting in `inspect` mode

Consider a program named `app.js` containing the following code:

```js title=app.js
function f (n = 99) {
  if (n === 0) throw Error()
  f(n - 1)
}
f()
```

Node.js supports the Chrome Devtools remote debugging protocol. In order to use this debugging protocol a client that supports the protocol is required. In this example [Chrome browser](https://www.google.com/chrome/) will be used. Inspect mode can be enabled with the `--inspect` flag: `node --inspect app.js`. For most cases however, it is better to cause the process to start with an active breakpoint at the very beginning of the program using the `--inspect-brk` flag:

```bash
node --inspect-brk app.js
```

Otherwise the application will have fully initialised and be performing asynchronous tasks before any breakpoints can be set. When using the `--inspect` or `--inspect-brk` flags Node will output some details to the terminal. The remote debugging protocol uses WebSockets which is why a `ws://` protocol address is printed. There is no need to pay attention to this URI, as the Chrome browser will detect that the debugger is listening automatically. In order to begin debugging the process, the next step is to set a Chrome browser tab's address bar to `chrome://inspect`.

This will load a page that looks like the following:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnad/chrome-debug.png').default} />
</p>

Under the "Remote Target" heading the program being inspected should be visible with an "inspect" link underneath it. Clicking the "inspect" link will open an instance of Chrome Devtools that is connected to the Node process.

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnad/chrome-debug-in-action.png').default} />
</p>

Note that execution is paused at the first line of executable code, in this case line 5, which is the first function call. From here all the usual Chrome Devtools functionality can be used to debug the process. For more information on using Chrome Devtools, see [Google Developer's Documentation](https://developer.chrome.com/docs/devtools/). There are a range of other tools that can be used to debug a Node.js process using Chrome Devtools remote debugging protocol. To learn more, read [*"Debugging Guide"*](https://nodejs.org/en/docs/guides/debugging-getting-started/) by nodejs.org.

### Breaking on error in devtools

Once a Node.js process has been started in inspect mode and connected to from a debugging client, in this case Chrome Devtools, we can start to try out the debugger features. The `app.js` file will throw when `n` is equal to `0`. The "Pause on exceptions" feature can be used to automatically set a breakpoint at the line where an error is thrown.

To activate this behaviour, start `app.js` in Inspect Break mode (`--inspect-brk`), connect Chrome Devtools, ensure that the "Sources" tab is selected and then click the pause button in the top right. The pause button should turn from gray to blue:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnad/chrome-inspect-break.png').default} />
</p>

Ensure that the "Pause on caught exceptions" checkbox is unchecked and then press the play button. The process should then pause on line 2, where the error is thrown:

<p align='center'>
  <img width='600px' src={require('@site/static/img/course-notes/jsnad/chrome-pause-on-exception.png').default} />
</p>

From here the Call Stack can be explored over in the right hand column and state can be analyzed by hovering over any local variables and looking in the Scope panel of the right hand column, located beneath the Call Stack panel. Sometimes a program will throw in far less obvious ways. In these scenarios the "Pause on exceptions" feature can be a useful tool for locating the source of an exception.

### Adding a breakpoint in devtools and/or code 

To add a breakpoint in devtools, you can click on the line number of the program where you want a breakpoint to be added. This is fine for some use cases, but it may be easier in some scenarios to set a breakpoint directly in the code via the [`debugger`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) statement. 

The debugger statement can be used to explicitly pause on the line that the statement appears when debugging. Let's edit `app.js` to include a `debugger` statement on line 3:

```js
function f (n = 99) {
  if (n === 0) throw Error()
  debugger
  f(n - 1)
}
f()
```

You should still use the `--inspect-brk` flag when using the `debugger` statement for consistent behavior in the devtools panel. Using the `debugger` statement is particularly useful when the line we wish to break at is buried somewhere in a dependency tree: in a function that exists in a required module of a required module of a required module and so on. When not debugging, these `debugger` statements are ignored; however, due to noise and potential performance impact it is not good practice to leave debugger statements in code.

## 5 - Key JavaScript concepts

## 6 - Packages and dependencies

## 7 - Node's module systems

## 8 - Asynchronous control flow

## 9 - Node's event system

## 10 - Handling errors

## 11 - Using buffers

## 12 - Working with streams

## 13 - Interacting with the file system

## 14 - Process and operating system

## 15 - Creating child processes

## 16 - Writing unit tests

## 17 - Course completion

## Quizzes

### 2 - Setting up

#### 2.1

<Tabs>
<TabItem value='2.1-q' label='Question'>

What is the recommended approach to installing Node?

- (A) From the website
- (B) With an OS package manager
- (C) With a version manager

</TabItem>
<TabItem value='2.1-a' label='Answer'>

C

</TabItem>
<TabItem value='2.1-ad' label='Additional Details'>

None

</TabItem>
</Tabs>

#### 2.2

<Tabs>
<TabItem value='2.2-q' label='Question'>

Which of the following commands displays the currently installed Node.js version?

- (A) `node -v`
- (B) `node -V`
- (C) `node --ver`

</TabItem>
<TabItem value='2.2-a' label='Answer'>

A

</TabItem>
<TabItem value='2.2-ad' label='Additional Details'>

None

</TabItem>
</Tabs>

#### 2.3

<Tabs>
<TabItem value='2.3-q' label='Question'>

Aside from the Node binary, what else does a Node installation provide?

- (A) A module package manager
- (B) Build tools
- (C) An IDE

</TabItem>
<TabItem value='2.3-a' label='Answer'>

A

</TabItem>
<TabItem value='2.3-ad' label='Additional Details'>

None

</TabItem>
</Tabs>

### 3 - The Node binary

#### 3.1

<Tabs>
<TabItem value='3.1-q' label='Question'>

Which flag allows a module to be preloaded?

- (A) `--loader`
- (B) `-r` or `--require`
- (C) `-p` or `--preload`

</TabItem>
<TabItem value='3.1-a' label='Answer'>

B

</TabItem>
<TabItem value='3.1-ad' label='Additional Details'>

None

</TabItem>
</Tabs>

#### 3.2

<Tabs>
<TabItem value='3.2-q' label='Question'>

How can the syntax of a program be checked without running it?

- (A) `node -s app.js` or `node --syntax app.js`
- (B) `node -c app.js` or `node --check app.js`
- (C) `node --parse-only app.js`

</TabItem>
<TabItem value='3.2-a' label='Answer'>

B

</TabItem>
<TabItem value='3.2-ad' label='Additional Details'>

None

</TabItem>
</Tabs>

### 4 - Debugging and diagnostics

#### 4.1

<Tabs>
<TabItem value='4.1-q' label='Question'>

What keyword can be used within the code of a program to cause the process to pause on a specific line when in debug mode?

- (A) `break`
- (B) `pause`
- (C) `debugger`
- (D) `debug`

</TabItem>
<TabItem value='4.1-a' label='Answer'>

C

</TabItem>
<TabItem value='4.1-ad' label='Additional Details'>

None

</TabItem>
</Tabs>

#### 4.2

<Tabs>
<TabItem value='4.2-q' label='Question'>

In order to set a breakpoint on the first line of execution when entering debug mode, which flag should be used?

- (A) `--inspect`
- (B) `--debug`
- (C) `--inspect-brk`

</TabItem>
<TabItem value='4.2-a' label='Answer'>

C

</TabItem>
<TabItem value='4.2-ad' label='Additional Details'>

None

</TabItem>
</Tabs>