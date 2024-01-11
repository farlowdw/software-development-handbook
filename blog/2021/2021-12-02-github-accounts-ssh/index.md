---
title: Multiple GitHub Accounts with SSH Access
draft: false
description: Details about how to use different GitHub accounts with SSH access
tags: [Guide, GitHub, SSH]
keywords: [github, ssh]
authors: [farlow]
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

This post details how to go about using more than one GitHub account with SSH.

<!--truncate-->

<details>
<summary> <strong>Quick reference (if you've done this before)</strong></summary>

Example GitHub email and username used for the process outlined below, respectively (this guide assumes you are using Bash as your shell): 

- GitHub Email: `johndoessh@gmail.com`
- GitHub Username: `johndoessh`

Quick version to copy and past line by line (do not copy and paste all at once; replace `JOHNDOESSH` as appropriate; step by step version with some commentary follows):

``` BASH
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C JOHNDOESSH@gmail.com
# id_rsa_JOHNDOESSH             # file in which to save the key
# Press Enter                   # do not associate a passphrase with key
# Press Enter                   # confirm no associated passphrase with key
eval "$(ssh-agent -s)"
echo -e "# JOHNDOESSH@gmail.com account (GitHub username: JOHNDOESSH)\nHost github-JOHNDOESSH\n\tHostName github.com\n\tUser git\n\tIdentityFile ~/.ssh/id_rsa_JOHNDOESSH" >> ~/.ssh/config
ssh-add -K ~/.ssh/id_rsa_JOHNDOESSH
pbcopy < ~/.ssh/id_rsa_JOHNDOESSH.pub
# https://github.com/settings/keys # <-- Visit this link to add the SSH key to your GitHub account
```

Now run the following to test your SSH connection:

``` BASH
cd ~/Desktop && mkdir example-repo && cd example-repo && echo "Example repo using SSH" >> README.md
git init
git config user.email "johndoessh@gmail.com"
git add .
git commit -m "initial commit"
git remote add origin 
git push -u origin master
```

Here is the entire process as a short video (open in new tab to see more clearly):

<p align='center'>
  <img src='https://user-images.githubusercontent.com/73844584/97923953-8017be80-1d24-11eb-865d-a24400992e9d.gif' />
</p>

The quick process outlined above is shown below in more detail:

1. **Navigate to `.ssh` folder in home directory:**
  ``` BASH
  cd ~/.ssh
  ```
  You want to be in the `~/.ssh` folder for the duration of setting up your SSH connection to your GitHub account.

2. **Generate SSH key associated with GitHub email:**
  ``` BASH
  ssh-keygen -t rsa -b 4096 -C "johndoessh@gmail.com"
  ```
  Use `id_rsa_johndoessh` when you encounter the following prompt after executing the line above: `Enter a file in which to save the key (/Users/you/.ssh/id_rsa): `. Then press `Enter` twice to avoid setting a passphrase (first to specify no passphrase and then again to confirm no passphrase).

3. **Start the ssh-agent in the background:**
  ``` BASH
  eval "$(ssh-agent -s)"
  ```

4. **Modify `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in keychain:**
  ``` BASH
  echo -e '# johndoessh@gmail.com account (GitHub username: johndoessh)\nHost github-johndoessh\n\tHostName github.com\n\tUser git\n\tIdentityFile ~/.ssh/id_rsa_johndoessh' >> ~/.ssh/config
  ```
  Executing the line above results in the following being written to the `~/.ssh/config` file (you can either do this step manually or programmatically as done above, but you must add these details, except the comment of course, to your `~/.ssh/config` file):
  ```
  # johndoessh@gmail.com account (GitHub username: johndoessh)
  Host github-johndoessh
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_johndoessh
  ```

5. **Add SSH private key to ssh-agent and store passphrase in keychain:**
  ```
  ssh-add -K ~/.ssh/id_rsa_johndoessh
  ```

6. **Copy SSH public key to clipboard:**
  ```
  pbcopy < ~/.ssh/id_rsa_johndoessh.pub
  ```

| NOTE (local setup complete) |
| :--- |
| Everything involving the *local* set up concerning your SSH key to be used with GitHub should be done now. The step below simply involves actually adding your SSH key to your GitHub account. |

7. **[Add the SSH key to your GitHub account](https://github.com/settings/keys):**
  Click "New SSH key", create a descriptive title (whatever you want), paste the copied key from the step above into the "Key" input field, and then click "Add SSH key".

| NOTE (testing remote repo SSH connection) |
| :--- |
| The next few steps are really what it's all about. We will set up a dummy repository locally, `example-repo`, and we will create in this repository a sample `README.md` file with `Example repo using SSH` as its sole content. Then we will create a repository on GitHub called `example-repo-using-ssh`. Finally, we will test whether or not we can connect the local repo with the remote repo using SSH (we will test this by trying to push from the local repo to the remote repo by means of an SSH connection). |

8. **Create dummy local repo on desktop with `README.md` file:**
  ``` BASH
  cd ~/Desktop && mkdir example-repo && cd example-repo && echo "Example repo using SSH" >> README.md
  ```

9. **Initialize git repository:**
  ``` BASH
  git init
  ```

10. **Configure git repo user email (skip if this is for default GitHub account):**
  ``` BASH
  git config user.email "johndoessh@gmail.com"
  ```
  As detailed later in these notes, you can skip this step if you are setting things up for the *default* GitHub user.

11. **Add all changes to staging area:** 
  ``` BASH
  git add .
  ```

12. **Commit changes:**
  ``` BASH
  git commit -m "initial commit"
  ```

13. **Add remote origin (use default SSH code given by GitHub if this is for default GitHub account):** 
  ``` BASH
  git remote add origin git@github-johndoessh:johndoessh/example-repo-using-ssh.git
  ```

  On GitHub, the quick setup SSH option, by default, would give you something like `git@github.com:johndoessh/example-repo-using-ssh.git`. As detailed later in these notes, you can use this default boilerplate code *if and only if* the `johndoessh` GitHub account were your default GitHub account. Otherwise, as indicated above, you need to change the `github.com` part to `github-johndoessh`. Note that `github-johndoessh` is the Host we specified in our `~/.ssh/config` file previously:
  ```
  # johndoessh@gmail.com account (GitHub username: johndoessh)
  Host github-johndoessh
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_johndoessh
  ```

  If `johndoessh` were our default GitHub user, then we would simply have `Host github.com` as the top line (this is detailed later in these notes).

14. **Push to master:**
  ``` BASH
  git push -u origin master
  ```

  This is the ultimate moment of truth. If everything works as expected, then we should see the terminal enumerating, counting, and writing objects along with some other git-specific things. In the end, we should see something like `Branch 'master' set up to track remote branch 'master' from 'origin'.` and we should be able to hop back to our GitHub repo, refresh the page, and see the minimal contents from `README.md` printed on the screen.

  As noted [here](https://stackoverflow.com/a/52064660/5209533), the `-u` flag in `git push -u origin master` adds a tracking reference to the upstream server you are pushing to. What is important here is that this lets you do a `git pull` without supplying any more arguments. For example, once you do a `git push -u origin master`, you can later call `git pull` and git will know that you actually meant `git pull origin master`. Otherwise, you'd have to type in the whole command.

---

</details>

## Reference Links

- [Simplified walkthrough: Multiple SSH Keys settings for different github accounts](https://gist.github.com/jexchan/2351996)
- [Switch between user identities in one Git on one computer](https://stackoverflow.com/a/9348040/5209533)
- [Set local `user.name` and `user.email` different for each repo](https://stackoverflow.com/a/42167480/5209533)
- [Clear git credentials possibly bundled with your git installation](https://stackoverflow.com/a/24130956/5209533)
- [Remove cached keys with `ssh-add -D` and remove `id_rsa` and `id_rsa.pub` from `~/.ssh`](https://unix.stackexchange.com/a/333657/127936)
- [Create `~/.ssh` folder if one doesn't already exist with `mkdir -p ~/.ssh`](https://superuser.com/a/635270/1039386)
- [GitHub: Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub: Adding a new SSH key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
- [Add proper remote origin with `git remote add origin git@<host-in-ssh-config>:<username>/<repo>.git`](https://gist.github.com/jexchan/2351996#gistcomment-1238647)

## Pre-Work

<details>
<summary> <strong>Set up global git config file (i.e., <code>~/.gitconfig</code>)</strong></summary>

Make sure you have a `.gitconfig` file in your Home directory: `cd ~ && ls -1a`. If you do not see `.gitconfig` in the listed contents, then simply create one by executing the following: `touch .gitconfig`. The goal is to configure some settings for git *globally* and then be able to apply settings *locally*. 

- **Global git settings:** Global git settings, found in `~/.gitconfig`, will apply to *every* git repository you create (unless specified otherwise).
- **Local git settings:** You can override your global git settings on a repository-by-repository basis (i.e., you can override global git repository settings by adding *local* git repository settings). When you initialize a git repository with `git init`, the `.git` folder that is created has the following directory structure (as of Nov 3, 2020):

  ```
  .
  ├── HEAD
  ├── config
  ├── description
  ├── hooks
  │   ├── applypatch-msg.sample
  │   ├── commit-msg.sample
  │   ├── fsmonitor-watchman.sample
  │   ├── post-update.sample
  │   ├── pre-applypatch.sample
  │   ├── pre-commit.sample
  │   ├── pre-push.sample
  │   ├── pre-rebase.sample
  │   ├── pre-receive.sample
  │   ├── prepare-commit-msg.sample
  │   └── update.sample
  ├── info
  │   └── exclude
  ├── objects
  │   ├── info
  │   └── pack
  └── refs
      ├── heads
      └── tags
  ```

  The `config` file is what we are interested in. This `config` file is *local* to the git repository in which it resides. We can specify settings in this `.git/config` file that override the default settings applied globally to all git repositories in the `~/.gitconfig` file.

Given that we will be setting up multiple GitHub accounts to be used with git on the same computer, it is imperative that the `~/.gitconfig` file contain only what is pertinent to what you want to be considered the "default" GitHub user. For example, here is a small snippet from my own `~/.gitconfig`:

```
[user]
	email = daniel.w.farlow@gmail.com
	name = Daniel Farlow
[core]
	editor = nano
	excludesfile = /Users/danielfarlow/.gitignore_global
```

This means that, by default, if we initialize a git repo locally and sync it remotely to a GitHub repo, then commits on GitHub will show up as being authored by the username GitHub has on file associated with `daniel.w.farlow@gmail.com`, namely `farlowd` (it also means the `nano` editor will be the default one for repos and every repo should ignore what is listed in `/Users/danielfarlow/.gitignore_global`). That is fine if that is the intended behavior, but that will not be the intended behavior in parts of this guide as we are trying to set up *multiple* GitHub accounts with commits by *different* authors all managed on the same computer by the same person. 

The next note details how to make sure GitHub recognizes what you want (i.e., author of commit message, etc.), how to override global git settings in a local git repository, etc.

---

</details>

<details>
<summary> <strong>Configure the user or author of a specific git repository (i.e., override what is in <code>~/.gitconfig</code>)</strong></summary>

As observed in the previous note, `[user]` details that appear in the `~/.gitconfig` file will apply to *every* git repository by default, unless specified otherwise. How do you specify otherwise? Every git repository has a `config` file that is *local to that git repository* and may be inspected by looking at `.git/config` (i.e., initializing a git repo within a directory results in a `.git` folder being added to that directory and the `config` file is located within the `.git` folder). 

As noted in [this answer](https://stackoverflow.com/a/42167480/5209533), you can set the `[user]` name and email as desired on a *global* or *local* basis:

- **globally** (this programmatically updates/writes to `~/.gitconfig`): 

  ``` BASH
  git config --global user.name "My Global Name"
  git config --global user.email global@email.com
  ```

  Note that the above is effectively the same as opening `~/.gitconfig` and writing the following manually and then saving:

  ```
  [user]
    name = My Global Name
    email = global@email.com
  ```

- **locally** (this programmatically updates/writes to `.git/config` in a git repository):

  ``` BASH
  git config user.name "My Local Name"
  git config user.email local@email.com
  ```

  Note that the above is effectively the same as opening `.git/config` in a local repository and writing the following manually and then saving:

  ```
  [user]
    name = My Local Name
    email = local@email.com
  ```

As a commentor notes, you can *check* what your current settings are without looking at `.git/config` directly by omitting the last part: `git config user.email` or `git config user.name`. 

**Why all the fuss?** Because if you want commits to show up on GitHub as being authored by *different* users instead of just your single default user, then you will need to set `user.email` locally using `git config user.email` in whatever repository is *not* being authored by the default user. GitHub identifies the author of the commit and displays this author based on what email is used. 

---

</details>

<details>
<summary> <strong>Remove git credentials from keychain</strong></summary>

As [this answer](https://stackoverflow.com/a/24130956/5209533) on Stack Overflow notes, how you installed git may result in the install caching your git credentials in your keychain. You can start by removing this potential source of issues.

Start keychain access (start spotlight via cmd + space, type keychain, press enter). Under keychains on the upper left, select "login" Under category on the left, select "passwords". Find the name "github" and delete it.

As [the answer immediately below this one](https://stackoverflow.com/a/39441299/5209533) notes, GitHub identifies you by the SSH key it sees, not by any setting from git (more on this soon). For now, as noted in the answer, you can use `ssh-add -l` to determine which keys are in your keyring, and `ssh-add -d <keyfile>` to remove a key from your keyring, if it doesn't work remove the 'unwanted' ssh key from `~/.ssh/config`.

Given the above, and as we will see later, simply run `ssh-add -D` to delete all cached keys before embarking on the rest of this journey.

---

</details>

<details>
<summary> <strong>Make sure you have an <code>.ssh</code> folder to store your SSH keys in</strong></summary>

Make sure you have an `.ssh` folder in your home directory (`~`) in which to store your keys; for example, try `cd ~/.ssh`. If this fails, then you likely do not have an `.ssh` folder yet and that is fine. As [this answer](https://superuser.com/a/635270/1039386) notes, if you have never generated any SSH keys, or you have not used SSH yet, then the `.ssh` folder does not *need* to exist. Since the goal now is to use SSH with GitHub, we will need this folder to exist. Run the following if you do not have an `.ssh` folder: `mkdir -p ~/.ssh`.

---

</details>

<details>
<summary> <strong>Make sure you have a <code>config</code> file in your <code>.ssh</code> folder</strong></summary>

Assuming you have an `.ssh` folder, navigate to it and see if you have a `config` file present: `cd ~/.ssh && ls -al`. If no `config` file appears, then you will need to create it: `touch ~/.ssh/config`. 

We will return to the `config` file before long to configure how we want SSH to work with our separate GitHub accounts.

---

</details>

## Instructions

<details>
<summary> <strong>Set up first GitHub accounts</strong></summary>

Set up your GitHub accounts. For this write-up, the following was used for the first account:

- GitHub username: `multipleaccounts1`
- GitHub email: `tylerhansbrough@gmail.com`

And the following was used for the second account (make sure to verify your email for both).

- GitHub username: `multipleaccounts2`
- GitHub email: `tylerhansbrough50@gmail.com`

---

</details>

<details>
<summary> <strong>Generate SSH keys and add them to the ssh-agent for both accounts</strong></summary>

**NOTE:** Be sure to first read the note above about configuring the user or author of a specific git repository. That note explains why `git config user.email` is used in some of the instructions that appear below.

We will now follow [the GitHub docs](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to generate and store our SSH keys as well as how we configure our settings. Do the following while inside the `~/.ssh` folder (use Bash as your shell):

### Example 1

- `ssh-keygen -t rsa -b 4096 -C "tylerhansbrough@gmail.com"`
  + When prompted to enter a file in which to save the key, type the following: `id_rsa_th`
  + When prompted for the passphrase, simply hit Enter twice
  + Run the following after receiving notification of your id and public key being saved: `eval "$(ssh-agent -s)"`
  + Add the following to the `config` file in your `~/.ssh` folder:

    ```
    # tylerhansbrough@gmail.com account (GitHub username: multipleaccounts1)
    Host github-th
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_rsa_th
    ```

  + Run the following: `ssh-add -K ~/.ssh/id_rsa_th`
  + [Add the SSH key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) by doing the following:
    * Go to your profile settings (click on your profile picture and navigate to settings), click the "SSH and GPG keys" in the menu, and click "New SSH key" or "Add SSH key". In the "Title" field, add a descriptive label for the new key. For example, if you're using a personal Mac, you might call this key "Personal MacBook Air". To paste your key into the "Key" field, go back to your terminal and run the following (this copies the contents of the `id_rsa_th.pub` file to your clipboard): `pbcopy < ~/.ssh/id_rsa_th.pub`. Paste this into the "Key" field and then click "Add SSH key" (confirm your GitHub password, if needed).

To test all of the above out, first go to your GitHub account and create a new repository called `examplerepo1`. For the quick setup screen that immediately follows, click "SSH" instead of "HTTPS", and you will be greeted by something like `git@github.com:multipleaccounts1/examplerepo1.git`. But recall the `config` file:

``` BASH
# tylerhansbrough@gmail.com account (GitHub username: multipleaccounts1)
Host github-th
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th
```

As noted [here](https://gist.github.com/jexchan/2351996#gistcomment-1238647) we need to add something like 

````
git remote add origin git@<host-in-ssh-config>:<username>/<repo>.git
```` 

**instead of** doing something like `git remote add origin git@github.com:multipleaccounts1/examplerepo1.git`, where this is effectively the same as editing your `.git/config` file (in the link above, `git remote set-url` was used instead of `git remote add` and this was to modify an *already existing* git repo synced with GitHub instead of *adding* one). So run the following when appropriate (detailed momentarily--you have to initialize a git repo first):

``` BASH
git remote add origin git@github-th:multipleaccounts1/examplerepo1.git
```

To see everything come together now, run the following in order:

``` BASH
cd ~/Desktop/
mkdir firstexamplerepo
cd firstexamplerepo
touch README.md
echo "thgithub" >> README.md
git init
git config user.email "tylerhansbrough@gmail.com"
git add .
git commit -m "initial commit"
# instead of the normal: git remote add origin git@github.com:multipleaccounts1/examplerepo1.git
git remote add origin git@github-th:multipleaccounts1/examplerepo1.git
git push -u origin master
```

### Example 2

- `ssh-keygen -t rsa -b 4096 -C "tylerhansbrough50@gmail.com"`
  + When prompted to enter a file in which to save the key, type the following: `id_rsa_th50`
  + When prompted for the passphrase, simply hit Enter twice
  + Run the following after receiving notification of your id and public key being saved (use `bash` instead of something like `fish` for your shell): `eval "$(ssh-agent -s)"`
  + Add the following to the `config` file in your `.ssh` folder:

    ```
    # tylerhansbrough50@gmail.com account (GitHub username: multipleaccounts2)
    Host github-th50
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_rsa_th50
    ```

  + Run the following: `ssh-add -K ~/.ssh/id_rsa_th50`
  + [Add the SSH key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) by doing the following:
    * Go to your profile settings (click on your profile picture and navigate to settings), click the "SSH and GPG keys" in the menu, and click "New SSH key" or "Add SSH key". In the "Title" field, add a descriptive label for the new key. For example, if you're using a personal Mac, you might call this key "Personal MacBook Air". To paste your key into the "Key" field, go back to your terminal and run the following (this copies the contents of the `id_rsa_th.pub` file to your clipboard): `pbcopy < ~/.ssh/id_rsa_th50.pub`. Paste this into the "Key" field and then click "Add SSH key" (confirm your GitHub password, if needed).

To test all of the above out, first go to your GitHub account and create a new repository called `examplerepo2`. For the quick setup screen that immediately follows, click "SSH" instead of "HTTPS", and you will be greeted by something like `git@github.com:multipleaccounts2/examplerepo2.git`. But recall the `config` file:

``` BASH
# tylerhansbrough50@gmail.com account (GitHub username: multipleaccounts2)
Host github-th50
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th50
```

As noted [here](https://gist.github.com/jexchan/2351996#gistcomment-1238647) we need to add something like 

````
git remote add origin git@<host-in-ssh-config>:<username>/<repo>.git
```` 

**instead of** doing something like `git remote add origin git@github.com:multipleaccounts2/examplerepo2.git`, where this is effectively the same as editing your `.git/config` file (in the link, `set-url` was used instead of `add` and this was to modify an already existing git repo synced with GitHub instead of *adding* one). So run the following when appropriate (detailed momentarily--you have to initialize a git repo first):

``` BASH
git remote add origin git@github-th50:multipleaccounts2/examplerepo2.git
```

To see everything come together now, run the following in order:

``` BASH
cd ~/Desktop/
mkdir secondexamplerepo
cd secondexamplerepo
touch README.md
echo "th50github" >> README.md
git init
git config user.email "tylerhansbrough50@gmail.com"
git add .
git commit -m "initial commit"
# instead of the normal: git remote add origin git@github.com:multipleaccounts2/examplerepo2.git
git remote add origin git@github-th50:multipleaccounts2/examplerepo2.git
git push -u origin master
```

---

</details>

## Follow Up

<details>
<summary> <strong>Ensuring you can still push to old repositories you had synced between git and GitHub</strong></summary>

It's easy to forget the importance of, or be completely unaware of, the `.git/config` file in all repositories where you have previously set up git and remotely synced it with one of your repositories on GitHub. To make sure you can still push to such repositories, make sure you inspect your `.git/config` file and compare it with your `config` file in your `.ssh` folder. 

For example, I originally had 

```
[remote "origin"]
	url = git@github.com:daniel-farlow/just-express.git
```

in the `.git/config` folder of my `just-express` directory, but I added another GitHub account to be used as my primary one and I now had the following in `~/.ssh/config` after reconfiguring things:

```
#daniel-farlow account
Host github-daniel-farlow
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_daniel-farlow
```

When I tried to push to sync everything on GitHub with what was in my local repository, I encountered an "access denied" error. Why? The reason was due to my new configuration. What was previously

```
[remote "origin"]
	url = git@github.com:daniel-farlow/just-express.git
```

in `.git/config` needed to now become

```
[remote "origin"]
  url = git@github-daniel-farlow:daniel-farlow/just-express.git
```

Specifically, note how `github.com` (the host) changed to `github-daniel-farlow` and how this reflects what is in the `~/.ssh/config` file. 

Hence, if you have changed your configuration, then you may need to go back through several repositories to update the remote origin as detailed above. You can do this via `git remote set-url ...` as opposed to editing the `.git/config` file directly (the `.git/config` file is what is changed in both cases; `git remote set-url ...` simply writes to this file).

Whatever the case, you need to make sure you are effectively syncing your remote GitHub repository with your local git repository. The next note details how to do this on a consistent basis.

---

</details>

<details>
<summary> <strong>Being consistent and careful when you use SSH to sync your GitHub repo with your local git repo</strong></summary>

As noted previously, when creating a repository on GitHub, the quick setup offers you an SSH option: 

```
git@github.com:<username-of-github-account>/<repository-name>.git
```

When you change your SSH config in `~/.ssh/config` you need to be somewhat careful here. For example, consider the following `~/.ssh/config`:

```
# tylerhansbrough@gmail.com account (GitHub username: multipleaccounts1)
Host github-th
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th

# tylerhansbrough50@gmail.com account (GitHub username: multipleaccounts2)
Host github-th50
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th50
```

If we are using our GitHub account with username `multipleaccounts1` and we have just created the GitHub repository `becareful`, then instead of using the default SSH option that GitHub gives us

```
git@github.com:multipleaccounts1/becareful.git
```

by doing 

```
git remote add origin git@github.com:multipleaccounts1/becareful.git
```

we should **INSTEAD** do the following in our local git repository:

```
git remote add origin git@github-th:multipleaccounts1/becareful.git
```

Then we should be able to push now. With all of the above said, it is worth mentioning that you may want to have what you consider your *default* GitHub account detailed in your `~/.ssh/config` (modifying the SSH option every single time you create a GitHub repository, as detailed in the previous note, can get rather cumbersome). Head to the next note for details on setting up a sort of "default user".

---

</details>

<details>
<summary> <strong>Setting a "default" GitHub user</strong></summary>

In many ways, [this answer](https://stackoverflow.com/a/9348040/5209533) on Stack Overflow details all that is necessary, but we will repurpose the answer to mesh well with the examples we have used so far. As the linked to answer notes, the crucial part in setting up a sort of "default" GitHub user is to use a different ssh psuedo-host for each account with `github.com` being assigned to what we want to consider the "default" GitHub account. 

For example, suppose we want our GitHub account with username `multipleaccounts1` to be the "default" account. Before changing the ssh psuedo-host, we should *globally* change the `[user]` email as observed in an earlier note about configuring the user or author for a local git repository:

``` BASH
# git config --global user.name "Some Name" # IF YOU WANT TO UPDATE THE DEFAULT NAME
git config --global user.email "tylerhansbrough@gmail.com"
```

Now we simply need to change the ssh psuedo-host for `multipleaccounts1` from `github-th` to `github.com`. That is, in `~/.ssh/config`, we need to change

```
# tylerhansbrough@gmail.com account (GitHub username: multipleaccounts1)
Host github-th
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th
```

to

```
# tylerhansbrough@gmail.com account (GitHub username: multipleaccounts1)
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th
```

Let's see what this does. On GitHub, while using the account with username `multipleaccounts1`, create a repository titled `becareful`. The SSH option given by GitHub is as follows:

```
git@github.com:multipleaccounts1/becareful.git
```

The upshot of all this is that *we do not have to change this now* and we also do not have to use `git config user.email "tylerhansbrough@gmail.com"`. That is, instead of sequentially running 

``` BASH
cd ~/Desktop/
mkdir becareful
cd becareful
touch README.md
echo "thbecareful" >> README.md
git init
git config user.email "tylerhansbrough@gmail.com" # KEEP EYES ON THIS
git add .
git commit -m "initial commit"
git remote add origin git@github-th:multipleaccounts1/becareful.git # KEEP EYES ON THIS TOO
git push -u origin master
```

we can instead run

``` BASH
cd ~/Desktop/
mkdir becareful
cd becareful
touch README.md
echo "thbecareful" >> README.md
git init
git add .
git commit -m "initial commit"
git remote add origin git@github.com:multipleaccounts1/becareful.git # DID NOT HAVE TO CHANGE WHAT GITHUB GAVE US!
git push -u origin master
```

Notice how we did not have to use `git config user.email "tylerhansbrough@gmail.com"` at all and we also did not have to change the boilerplate SSH code that GitHub gave us when setting up the repository. Quite convenient! Of course, if we wanted to use the GitHub account with username `multipleaccounts2` instead, then we would need to change 

``` BASH
git@github.com:multipleaccounts2/becareful.git
``` 

to 

```
git@github-th50:multipleaccounts2/becareful.git
```

as well as add `git config user.email "tylerhansbrough50@gmail.com"`.

One slightly subtle thing to remember is how your configuration changes propagate to not only pushing but also pulling, cloning, etc. That is why, in [the model answer](https://stackoverflow.com/a/9348040/5209533), with `~/.ssh/config` as 

``` BASH
# Default GitHub user (joe)
Host github.com
  HostName github.com
  User git
  IdentityFile /Users/joe/.ssh/id_rsa

# Client user (client)
Host github-client
  HostName github.com
  User git
  IdentityFile /Users/joe/.ssh/id_rsa_client
```

we are told that we then have two corresponding remotes:

``` BASH
git clone git@github.com:joe/my_repo.git
```

and

``` BASH
git clone git@github-client:client/his_repo.git
```

Hence, using our example, if you want to clone [the linux repo](https://github.com/torvalds/linux) on GitHub using your `multipleaccounts1` GitHub account, then all you have to do now is simply execute the following:

``` BASH
git clone git@github.com:torvalds/linux.git
```

But if you want to clone the linux repository using your `multipleaccounts2` GitHub account, then you will need to execute the following instead:

``` BASH
git clone git@github-th50:torvalds/linux.git
```

As the model answer concludes, you can specify different emails and other user details (and more than just user details) by editing the `[user]` settings in `.git/config`.

---

</details>

<details>
<summary> <strong>My current <code>~/.ssh/config</code> file</strong></summary>

As of right now, I have the following in my `~/.ssh/config` file:

```
IPQoS=throughput
# daniel.w.farlow@gmail.com account (GitHub username: dfarlow)
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_dfarlow

# dan.farlow@gmail.com account (GitHub username: daniel-farlow)
Host github-daniel-farlow
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_daniel-farlow

# tylerhansbrough@gmail.com account (GitHub username: multipleaccounts1)
Host github-th
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th

# tylerhansbrough50@gmail.com account (GitHub username: multipleaccounts2)
Host github-th50
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_th50
```

I also have the following in my `~/.gitconfig` file:

```
[user]
	email = daniel.w.farlow@gmail.com
	name = Daniel Farlow
[core]
	editor = nano
	excludesfile = /Users/danielfarlow/.gitignore_global
```

The result is that my GitHub account with email `daniel.w.farlow@gmail.com` (and username `dfarlow` on GitHub) is my "default" GitHub account. If I want to have commits on GitHub show up as coming from the following authors, then I need to take the following actions:

- **dfarlow:** This is the username associated with `daniel.w.farlow@gmail.com` on GitHub and since

  ```
  [user]
    email = daniel.w.farlow@gmail.com
    name = Daniel Farlow
  ```

  is in my `~/.gitconfig` file, every git repository I initialize on my computer will, by default (and hence the idea of a "default" GitHub account), have `dfarlow` as the author (i.e., the GitHub username associated with the `[user]` email in my `~/.gitconfig` file) for commits and other things on GitHub.

- **daniel-farlow:** This is the username associated with `dan.farlow@gmail.com` on GitHub, and `dan.farlow@gmail.com` *does not* show up as the `[user]` email in my `~/.gitconfig` file; thus, in order for commits and other such actions on GitHub to show up as having come from `daniel-farlow`, the following will need to be run after executing `git init` in a local repository (or at another time of choosing):

  ```
  git config user.email = "dan.farlow@gmail.com"
  ```

  This will ensure actions on GitHub are associated with author/username `daniel-farlow` which is linked to `dan.farlow@gmail.com` on GitHub.

- **multipleaccounts1:** This is the username associated with `tylerhansbrough@gmail.com` on GitHub, and `tylerhansbrough@gmail.com` *does not* show up as the `[user]` email in my `~/.gitconfig` file; thus, in order for commits and other such actions on GitHub to show up as having come from `multipleaccounts1`, the following will need to be run after executing `git init` in a local repository (or at another time of choosing):

  ```
  git config user.email = "tylerhansbrough@gmail.com"
  ```

  This will ensure actions on GitHub are associated with author/username `multipleaccounts1` which is linked to `tylerhansbrough@gmail.com` on GitHub.

- **multipleaccounts2:** This is the username associated with `tylerhansbrough50@gmail.com` on GitHub, and `tylerhansbrough50@gmail.com` *does not* show up as the `[user]` email in my `~/.gitconfig` file; thus, in order for commits and other such actions on GitHub to show up as having come from `multipleaccounts2`, the following will need to be run after executing `git init` in a local repository (or at another time of choosing):

  ```
  git config user.email = "tylerhansbrough50@gmail.com"
  ```

  This will ensure actions on GitHub are associated with author/username `multipleaccounts2` which is linked to `tylerhansbrough50@gmail.com` on GitHub.

---

</details>