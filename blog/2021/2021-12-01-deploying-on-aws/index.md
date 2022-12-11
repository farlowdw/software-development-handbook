---
title: AWS Deployment Guide
draft: false
description: Details about how to deploy on AWS
tags: [Guide, AWS]
keywords: [AWS]
authors: [farlow]
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

This post details how to go about deployment on an AWS EC2 instance.

<!--truncate-->

<details><summary> Authorship note</summary>

The core of this document was originally written by [Margaret ONeill](https://github.com/MAOneill) and shared internally at [DigitalCrafts](https://www.digitalcrafts.com/) as a Google doc (see the [original version](https://docs.google.com/document/d/1R740WN3I0WJk5EW5ObDMe6U13ggU_UCq9gOqHuVu9gw/edit#)). What follows is largely a rewrite of that document using markdown in order to make needed modifications easier (e.g., use of issues and pull requests on GitHub), future changes faster to implement, etc. Additional pictures, descriptions, and explanations have also been added.

If you see something that needs fixing or something else that would be useful to add, then please consider submitting a pull request to this repo. 

---

</details>

<details><summary> Note about terminal examples</summary>

Code samples intended to be run from terminal/Bash on your local machine are prefixed with `#BASH`:

```bash
#BASH
command-to-execute-in-bash-not-in-ec2-terminal
```

Code samples intended to be run in your EC2 terminal are prefixed with `#EC2 terminal`:

```bash
#EC2 terminal
ubuntu@ip-xxx-xx-xx-xx:~$ command-to-execute-in-ec2-terminal
```

---

</details>

<details><summary> Note about the new EC2 console </summary>

As noted recently [on Reddit](https://www.reddit.com/r/aws/comments/dzitek/were_rolling_out_the_new_ec2_console_launch/) (November 21, 2019), AWS recently rolled out a new EC2 console. If you use this new console, then what you encounter and what you see in this guide will likely be somewhat different (only superficially). To ensure you see what is present in this guide (in terms of screenshots and the like), simply toggle the "New EC2 Experience" option in the top left corner of your console:

<div align='center'>
  <img src='https://user-images.githubusercontent.com/52146855/69504573-0828fd80-0ef2-11ea-920a-cc06e8140143.png' />
</div>

---

</details>

## Contents

- [Introduction](#introduction)  
- [Create an AWS Account](#create-an-aws-account)  
- [Pick Server Type](#pick-server-type)  
- [Launch EC2 Instance](#launch-ec2-instance)  
- [Edit Security Groups](#edit-security-groups)  
- [Create an SSH Key](#create-an-ssh-key)  
- [Connect the Instance](#connect-the-instance)  
- [Create an Alias in Terminal/Bash for Quick Access to Your AWS EC2 Instance](#create-an-alias-in-terminalbash-for-quick-access-to-your-aws-ec2-instance)  
- [Install Ubuntu's Advanced Packaging Tool (APT)](#install-ubuntus-advanced-packaging-tool-apt)  
- [Install Nginx and Git on Your EC2 Instance](#install-nginx-and-git-on-your-ec2-instance)  
- [Install Node, NVM, and NPM](#install-node-nvm-and-npm)  
- [Create an SSH Key on GitHub to Connect AWS with Your GitHub Files](#create-an-ssh-key-on-github-to-connect-aws-with-your-github-files)  
- [(Optional) Install PostgreSQL](#optional-install-postgresql)  
- [(Optional) Install PM2](#optional-install-pm2)  
- [(Optional) Point Your Domain Name to Your AWS IP Address](#optional-point-your-domain-name-to-your-aws-ip-address)  
- [Tell Nginx about Our Server](#tell-nginx-about-our-server)  
- [Get a Certificate from Certbot](#get-a-certificate-from-certbot)

## Introduction

This blog contains step-by-step instructions for setting up an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) on [Amazon Web Services](https://aws.amazon.com/) (AWS). It explains how to do the following: 

- Create an alias to quickly log in to your EC2 terminal.
- Connect your EC2 instance to a GitHub repo.
- Pull your source code from your GitHub repo to your EC2 instance.

There are also instructions for installing the following on your server instance:

- Node
- PostgreSQL
- PM2

Once everything described above has been set up, details will be provided to help you accomplish what you are ultimately interested in:

- Point your personal domain name to your AWS IP address.
- Set up subdomains. 
- Obtain a free [Certbot](https://certbot.eff.org/) certificate.
- Publish your website on your domain for the world to see!

This guide describes a very narrow path, specifically a path students at DigitalCrafts have followed in order to securely publish their projects for everyone to see. This guide does not attempt to explore the full range of AWS options--there are other guides for that. This guide is intended to be tightly focuesed and assumes you have terminal/[Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) on your personal computer. (Bash commands will be used for the bulk of the setup.) This process also uses GitHub to upload your files to AWS; hence, a general familiarity (and personal account) with Github is needed.

Thanks are due to [Jennifer Johnson](https://medium.com/@jenlij) who wrote the [first post](https://medium.com/digitalcrafts/how-to-set-up-an-ec2-instance-with-github-node-js-and-postgresql-e363cb771826) on this subject in 2017. Margaret clarified and expanded Jennifer's process, and I have elaborated on Margaret's process. (Iterative work at its finest!) The true kudos go to [Chris Aquino](https://medium.com/@radishmouse) for being a great instructor and giving his students the knowledge to get where they are trying to go.

## Create an AWS Account

Go to [AWS](https://aws.amazon.com/) to create a new account:

<div align="center">
  <img height="400" src="https://user-images.githubusercontent.com/52146855/69106474-76764780-0a3c-11ea-9193-f4fd2ac41353.png" />
</div>

Be sure to save your username and password in a safe place. (Seriously, make sure you save your username and password in a safe and easy-to-remember place--AWS can be difficult to deal with when you lose/forget your credentials.)

You will need a credit card. Choose the basic/free plan--we are selecting a free account which will be free for roughly a year.  Also note that sometimes, towards the end of a calendar month, you will get an email notification from AWS that you are about to reach your limit (make sure you [enable billing alerts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics)):

<div align="center">
  <img width="800" src="https://user-images.githubusercontent.com/52146855/69503679-3f93ac00-0eea-11ea-831c-058115ed1d1c.png" />
</div>

If you only have one EC2 instance and no other services, then your plan should remain free for a year.  

## Pick Server Type

Pick a region in the top right--it can be important later with [S3](https://aws.amazon.com/s3/) and other available products on AWS that you may want to branch out to. Generally, the region you choose should be the region closest to your physical location.

We are going to create and launch a virtual server. In AWS parlance, the virtual server we will be launching is known as an "Amazon EC2 instance," where "EC2" stands for "Elastic Cloud Compute." For the rest of this guide we will often refer to the Amazon EC2 instance simply as "EC2."

Navigate to the AWS Management Console and, under "All Services -> Compute," click on the EC2 link:

<div align="center">
  <img width="600" src="https://user-images.githubusercontent.com/52146855/69106113-64e07000-0a3b-11ea-96c9-ef64b855c35c.png" />
</div>

## Launch EC2 Instance

Click the "Launch Instance" button:

<div align="center">
  <img width="300" src="https://user-images.githubusercontent.com/52146855/69106600-e84e9100-0a3c-11ea-8173-e44f1591483d.png" />
</div>

Then, as the first step in launching your instance, choose an Amazon Machine Image (AMI); that is, select the Ubuntu server that is Free tier eligible:

<div align="center">
  <img height="500" src="https://user-images.githubusercontent.com/52146855/69108031-6c0a7c80-0a41-11ea-9a1c-039e309f645c.png" />
</div>

<details><summary> What is an Amazon Machine Image (AMI)? (click to expand)</summary>

From Amazon:
> An AMI is a template that contains the software configuration (operating system, application server, and applications) required to launch your instance. You can select an AMI provided by AWS, our user community, or the AWS Marketplace; or you can select one of your own AMIs.

---

</details>

<details><summary> Note about Ubuntu releases</summary>

Ubuntu is a Linux operating system (mainly used for desktop or server installations) that releases a new version in April of every even-numbered year; hence, as of the time of this writing, the next release should be April 2020. Select the most current version of Ubuntu (free tier eligible) when you complete this step (i.e., launching an EC2 instance).

---

</details>

Select the "Free tier eligible" hardware choice or *instance type* (this will specify the size of the memory, CPU, network performance, storage, etc.):

<div align='center'>
  <img width='800' src='https://user-images.githubusercontent.com/52146855/69108770-b12fae00-0a43-11ea-8f64-16978c1cc19b.png' />
</div>

<details><summary> What is an Amazon EC2 instance type?</summary>

From Amazon: 
>Amazon EC2 provides a wide selection of instance types optimized to fit different use cases. Instances are virtual servers that can run applications. They have varying combinations of CPU, memory, storage, and networking capacity, and give you the flexibility to choose the appropriate mix of resources for your applications. [Learn more](https://aws.amazon.com/ec2/instance-types/) about instance types and how they can meet your computing needs.

---

</details>

Select the "Review and Launch" button pictured in the image above--before you press "Launch" on the next page, however, you will need to click the "Edit security groups" link (this will effectively take us to step 6 of the AWS EC2 configuration process):

<div align='center'>
  <img src='https://user-images.githubusercontent.com/52146855/69108946-2f8c5000-0a44-11ea-841a-815d17b588f9.png' />
</div>

## Edit Security Groups

This is a set of firewall rules. Two rules need to be added (by clicking the "Add Rule" button):

1. Add a rule with a type of HTTP. The Port Range should be 80.
2. Add another rule for HTTPS. Its port range should be 443.

No other configuration is necessary. Your security group configuration should now look as follows:

<div align='center'>
  <img width="700" src='https://user-images.githubusercontent.com/52146855/69109427-ba217f00-0a45-11ea-8669-f27cf6679907.png' />
</div>

<details><summary> What is a security group?</summary>

From Amazon: 
>A security group is a set of firewall rules that control the traffic for your instance. On this page, you can add rules to allow specific traffic to reach your instance. For example, if you want to set up a web server and allow Internet traffic to reach your instance, add rules that allow unrestricted access to the HTTP and HTTPS ports. You can create a new security group or select from an existing one below. [Learn more](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html?icmpid=docs_ec2_console) about Amazon EC2 security groups.

---

</details>

Finally, click the "Review and Launch" button and subsequently the "Launch" button. When you click the "Launch" button, a popup will appear asking you to select an existing SSH key pair or to create a new SSH key pair--we want to create a new key pair:

<div align='center'>
  <img height="300" src='https://user-images.githubusercontent.com/52146855/69110088-952e0b80-0a47-11ea-9463-1079d77616d4.png' />
</div>

## Create an SSH Key

Your SSH key will enable you to instantly log in to your EC2 instance and manage it
using the terminal.

Provide the popup seen above with a key name that makes sense (e.g., `myAwsEc2KeyMonthYear`):

<div align='center'>
  <img width="400" src='https://user-images.githubusercontent.com/52146855/69110704-821c3b00-0a49-11ea-98d5-0096afa1f8d5.png' />
</div>

Then click the "Download Key Pair" button, then the "Launch Instances" button, and finally the "View Instances" button. 

The file downloaded should have file type `.pem`. (If your downloaded file is of any other type, then you may need to convert it or rename it, a process not covered in these instructions. See [AWS support](https://aws.amazon.com/premiumsupport/knowledge-center/convert-pem-file-into-ppk/) for more details and help.)

Once your file has downloaded, make a note of its name and location on your computer. You may be prompted to add the certificate to your keychain. You do not need to do this and you can click "Cancel" if prompted.

Now check to see if you have an `.ssh` folder, a folder that is hidden by default but should be located at `/Users/YOURUSERNAME/.ssh`. Try to navigate to this folder via the terminal:

```bash
#BASH
cd ~/.ssh
```

If you receive a `No such file or directory` error (i.e., if the `.ssh` folder does not exist), then simply create it:

```bash
#BASH
mkdir ~/.ssh
```

You need to copy your downloaded `.pem` file and move it into your previously existing or newly created `.ssh` folder. You can easily do this in the terminal by navigating to the folder where your `.pem` file was downloaded and moving it in the following manner:

```bash
#BASH
mv YOURFILENAME.pem ~/.ssh
```

Of course, `YOURFILENAME` should be what you named your `.pem` file; for example, this is how I moved the `.pem` file I generated for this demo:

```bash
#BASH
mv ~/Downloads/demokeypairname.pem ~/.ssh/
```

Now navigate to your `.ssh` folder, and change the permissions on your file:

```bash
#BASH
chmod 400 ~/.ssh/[yourFileName].pem
```

<details><summary> What does <code>chmod 400</code> actually accomplish?</summary>

The [chmod calculator](https://chmodcommand.com/chmod-400/) explains this well: `chmod 400 (chmod a+rwx,u-wx,g-rwx,o-rwx)` sets permissions so that, (U)ser / owner can read, can't write and can't execute. (G)roup can't read, can't write and can't execute. (O)thers can't read, can't write and can't execute.

---

</details>

## Connect the Instance

Return to the instance management panel of AWS in your browser. (If you ever need to navigate back to this panel, then note that it is accessible from the left navigation pane of the EC2 Dashboard under the "Instances" heading.) Navigate in the following manner from the top navbar in AWS: `Services -> EC2 -> Running Instances`. 

<div align='center'>
  <img height="300" src='https://user-images.githubusercontent.com/52146855/69116340-10002200-0a5a-11ea-9dbe-a4fb1ec2973c.png' />
</div>

Select the instance you just created upon seeing your running instances. Click the "Connect" button. You will be greeted by a popup window (addressed in the next step).

## Create an Alias in Terminal/Bash for Quick Access to Your AWS EC2 Instance

Copy the example line from the popup window you were greeted by at the end of the step above:

<div align='center'>
  <img height="400" src='https://user-images.githubusercontent.com/52146855/69116785-8f422580-0a5b-11ea-9a3c-a8592c2356eb.png' />
</div>

Open your `.bash_profile` using nano, VSCode, or the text editor of your choice:

```bash
#BASH
# Using nano 
nano ~/.bash_profile

# Using VSCode
code ~/.bash_profile
```

<details><summary> Note about Catalina update and Z Shell (zsh)</summary>

With the new Mac update (fall 2019) to Catalina, the default terminal is Z Shell. If you are using Z Shell, then you will need to edit `~/.zshrc` or `~/.zprofile`.

---

</details>

Now paste the line you copied above into your `.bash_profile` in the following manner:

```bash
#BASH
# Set up your EC2 alias (name it something reasonable such as "ec2" or "demoec2" in the case of this demo)

alias demoec2='ssh -i "~/.ssh/demokeypairname.pem" ubuntu@ec2-13-59-214-222.us-east-2.compute.amazonaws.com'
```

Note from the above that you need to provide the relative path to your `.pem` file. The new line in your `.bash_profile` should look as follows (except with *your* `.pem` file name and `ubuntu@` address):

<div align='center'>
  <img width="700" src='https://user-images.githubusercontent.com/52146855/69118294-e7c7f180-0a60-11ea-90a3-c22ae8a29290.png' />
</div>

Quit and restart your Terminal/Bash application in order to test your new alias (quitting and restarting will ensure the application loads the most current version of your `.bash_profile`):

```bash
#BASH
demoec2
```

Your alias should now instantly log you into your EC2 instance in terminal mode. The first time you log in you may be prompted with something like the following:

<div align='center'>
  <img width="600" src='https://user-images.githubusercontent.com/52146855/69118521-c87d9400-0a61-11ea-99fc-113c7e7baeec.png' />
</div>

Respond with `yes`.

Your terminal prompt should now look something like this: `ubuntu@ip-172-31-20-54:~$ `

If your terminal prompt does not look like this, then ensure your alias was created correctly (spelling mistakes can happen!), that your `.bash_profile` is in the correct location, and that you have restarted Bash.

## Install Ubuntu's Advanced Packaging Tool (APT)

From your EC2 terminal, execute the following:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ sudo apt update && sudo apt upgrade -y
```

<details><summary> Note about <code>apt</code></summary>

`apt` is like brew/homebrew; that is, `apt` is a package manner on Linux that will install packages for you, and it runs on Ubuntu.

---

</details>

The command above makes use of `sudo`, the "superuser do" command, which is used to install and upgrade packages. The `-y` flag is shorthand for "yes to all options" (i.e., do not ask for approval, just run the installations/updates). 

You may get the following pop-up (if so, select the option to keep the local version):

<div align='center'>
  <img height="250" src='https://user-images.githubusercontent.com/52146855/69118880-e7305a80-0a62-11ea-97b8-091dacf94ea0.png' />
</div>

Reboot once the install has finished for all changes to take effect:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ sudo reboot
```

Wait a minute (an actual minute ... it will take a moment or two for everything to reboot), and then reconnect to your EC2 instance in your terminal/Bash by using your EC2 alias:

```bash
#BASH
# Reconnect to your EC2 instance once you have rebooted and waited a minute
demoec2
```

## Install Nginx and Git on Your EC2 Instance

Now install Nginx (web server) and Git (version control) on your EC2 instance:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ sudo apt install nginx git
```

We installed Git so we can pull our GitHub repositories to the AWS fileserver. This will help us when we eventually want to edit files locally, push our changes up to GitHub, and then pull our GitHub files to the AWS fileserver.

## Install Node, NVM, and NPM

Run the following commands to install Node, NVM, and NPM:

```bash
#EC2 terminal
# Install npm, node, and nvm
ubuntu@ip-172-31-20-54:~$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# Restart your terminal with your new profile setup
ubuntu@ip-172-31-20-54:~$ source .bashrc
```

Note that `source .bashrc` will be different if you are using Z Shell. 

Now install the Long Term Support (LTS) version of Node:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ nvm install --lts
```

## Create an SSH Key on GitHub to Connect AWS with Your GitHub Files

We will now create an SSH key on GitHub so that we can connect our AWS account with our GitHub files; that is, we will make it so that GitHub can communicate with our AWS EC2 instance. In order to do this, you need to have a GitHub account (or [sign up](https://github.com/) for one) and at least one repository that you want to deploy to AWS.

Log in to your GitHub account, go to Settings, "SSH and GPG keys," and click the "New SSH key" button for generating SSH keys. 

<div align='center'>
  <img height="400" style={{marginRight: '20px'}} src='https://user-images.githubusercontent.com/52146855/69194285-c1ed2c00-0af6-11ea-829e-ae8e5fe7500f.png' />
  
  <img height="400" style={{marginRight: '20px'}} src='https://user-images.githubusercontent.com/52146855/69194410-12fd2000-0af7-11ea-87f4-b768c3715e8c.png' />

  <img height="150" src='https://user-images.githubusercontent.com/52146855/69194654-a0d90b00-0af7-11ea-9b12-8966575a9f95.png' />
</div>

Generate a new SSH key (in your EC2 terminal) using the following command (make sure you use the email associated with your GitHub account within the quotes):

```bash
#EC2 terminal
# Use the email associated with your GitHub account 
ubuntu@ip-172-31-20-54:~$ ssh-keygen -t rsa -b 4096 -C "dan.farlow@gmail.com"
```

After running the command above, you will encounter a series of prompts (all of which you should leave empty by simply hitting `return` or `enter`), and you should end up with something similar to the following:

<div align='center'>
  <img src='https://user-images.githubusercontent.com/52146855/69196208-c9fb9a80-0afb-11ea-8ad5-863b62760d15.png' />
</div>

Now change into your `.ssh` directory and view the `id_rsa.pub` file with `cat id_rsa.pub`:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ cd .ssh
ubuntu@ip-172-31-20-54:~/.ssh$ cat id_rsa.pub

# Output should look something like the following:
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCo4vbnWd7sC4eLxXuDeNJXJs7zKdq5dCp4YD866rs3KppdsuUb2zq3hLcL9hQiveh3i+hqLrYygaI+UXBCP9u6MVP+j7GN4Xp91ub/tGXO563K655HhoF0I2JCtCq8ZBBCUZh6lJ0J4xkEbbfGaxW4I8wbVKjG4o3AUyBeGRpKC7YbG+/ooUqCJ2vZ3zr3wmUDpnJ5pQhbItE1dFwXQ5k3A4RGlKlPbquLjqyoOv4k50LD/wCpz51q32hJSTVTu/gp4T+YPC4PedBA7BOYvbXDk2PoAqcSGswlsWp1zJaa081bVoLOwYMzT6jNmKfz+nSDN428FkenzN1AaowXa+DGVPRAXosiG9qyufxRldXVH1hJ60dIfbGydl2eUMm3fMYgw9VhBKQqtw3/4XvL5VKjvwNAtvQU1S1ir/MrXrp88nEoEJjRfEwjYF/5IVtA3VBMX50p6JL0jtz9zJ/2lVLsh/uE89bMnux2YP8Mo14SLIGT+gvfZXb5R8TR3Ug3wYjkv9RJWUj29yNlqDpRoQ57fBi4nLFVVt38MDLXRiM5seKEw5ksfGgaK3ZWFpkd/+CarbaE8zGd1ldVB/Kh3KD6tDRmsi+DS39aqOfeChIOsTVpBmQuLEFwIuELG7OmswzEUV4Jk48o6O/f2xuEur9mwVi36vSTlrQpSr1Ci0d8Aw== dan.farlow@gmail.com
```

Copy *all* of the output text, go back to the GitHub page you left open in your browser (for adding an SSH key), enter a reasonable title for your key (e.g., `ec2-aws-instance-2019-11`), and then paste your copied text into the key field: 

<div align='center'>
  <img width="500" src='https://user-images.githubusercontent.com/52146855/69196927-e698d200-0afd-11ea-8a65-45165bbc4944.png' />
</div>

Click the "Add SSH key" button (you will likely be prompted to confirm your GitHub password to complete this step--confirm your password to continue). 

Now you can test out your SSH key by navigating to the GitHub repo you want to copy and you can copy the clone link with the SSH parameters:

<div align='center'>
  <img width="300" src='https://user-images.githubusercontent.com/52146855/69197145-a1c16b00-0afe-11ea-81c5-76129d68573b.png' />
</div>

Then, in your EC2 terminal, you can `git clone` with your copied link to pull your files down into a new folder (you can subsequently use `ls` to see the new folder name where your files are; you will need this folder name later):

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54: git clone git@github.com:daniel-farlow/aws-demo-project.git
ubuntu@ip-172-31-20-54:~$ ls    # should respond with the git repo you cloned ("aws-demo-project" in this case)
```

<details><summary> Note about potential "authenticity of host" 'github.com (ip)' error after executing command above</summary>

When you execute the `git clone git@github.com:daniel-farlow/aws-demo-project.git` command in your EC2 terminal, you may be prompted with something like the following:

```
The authenticity of host 'github.com (ip)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?
```

[As noted](https://stackoverflow.com/a/47708298/5209533) by user VonC on Stack Overflow:

> You should simply be able to answer 'yes', which will update your `~/.ssh/known_hosts` file.

Additionally, [as noted](https://stackoverflow.com/a/52583808/5209533) by user Shakil on Stack Overflow:

> Since you are attempting to connect to Github using SSH for the first time (no existing entry for Github in `~/.ssh/known_hosts` yet), you are being asked to verify the key fingerprint of the remote host. Because, if an intruder host represents itself as a Github server, it's RSA fingerprint will be different from that of a GitHub server fingerprint.
>
> You have two options.
>
>1. You may just accept, considering you don't care about the authenticity of the remote host (Github in this case), or,
>
>2. You may verify that you are actually getting connected to a Github server, by matching the RSA fingerprint you are presented to (in the prompt), with [GitHub's SSH key fingerprints](https://help.github.com/articles/github-s-ssh-key-fingerprints/) in `base64` format.
>
>The latter option is usually more preferable.

For the purposes of this guide, we will simply respond with 'yes.' 

---

</details>

You should now change into your newly created folder (i.e., the folder you created with the `git clone` command) and you will need to install any `npm` dependencies your project has:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ cd aws-demo-project/
ubuntu@ip-172-31-20-54:~/aws-demo-project$ npm install
```

## (Optional) Install PostgreSQL

If your project does not use the PostgreSQL open-source relational database management system, then you should skip this step. If, however, you do use PostgreSQL in your project, then you will want to install version 10:

```bash
#EC2 terminal
# Install version 10 of PostgreSQL on your AWS EC2 instance
ubuntu@ip-172-31-20-54:~/aws-demo-project$ sudo apt install postgresql-10 -y

# Check the status and make sure it is installed
ubuntu@ip-172-31-20-54:~/aws-demo-project$ sudo service postgresql status

# Type q to get back to ubuntu@ prompt or ⌃c (i.e., control + c) on Mac

# Change to the "postgres" user in order to modify postgresql
ubuntu@ip-172-31-20-54:~/aws-demo-project$ sudo su - postgres
postgres@ip-172-31-20-54:~$ 
```

You should now have a prompt that looks something like the following (as above): `postgres@ip-172-31-20-54:~$ `

We will now create a user named "ubuntu" so that it matches your EC2 instance name. This needs to be because Node.js runs as "ubuntu" on your EC2 instance (hence, we have to give "ubuntu" access to the postgres database).

Now execute the following commands (with your prompt as above; and do not forget the semicolons!):

```
#postgres
postgres@ip-172-31-20-54:~$ whoami              # return the user (should respond with "postgres")
postgres@ip-172-31-20-54:~$ createuser ubuntu;  # create the ubuntu user
postgres@ip-172-31-20-54:~$ createdb ubuntu;    # create the ubuntu database
postgres@ip-172-31-20-54:~$ psql                # gives you a psql prompt
# create a user with a password that can only be accessed from your EC2 login with your SSH key
postgres=# alter user ubuntu with encrypted password 'ubuntu';    # should return "ALTER ROLE"
# set the privileges for this new "ubuntu" user
postgres=# grant all privileges on database ubuntu to ubuntu;     # should return "GRANT"
# now add additional permissions
postgres=# alter role ubuntu with superuser;                      # should return "ALTER ROLE"
postgres=# alter role ubuntu with createdb;                       # should return "ALTER ROLE"
postgres=# alter role ubuntu with login;                          # should return "ALTER ROLE"
```

Now back out of the `postgres=#` prompt with `\q` and then exit that shell with `exit`:

```
#while inside of the postgres prompt
postgres=# \q                                     # should back you out of the postgres prompt
postgres@ip-172-31-20-54:~$ exit                  # should exit the shell and return with "logout"
ubuntu@ip-172-31-20-54:~/aws-demo-project$ psql   # should give you an ubuntu=# prompt
# psql logs you in to postgres as ubuntu; now "exit" to get out of ubuntu/EC2
ubuntu@ip-172-31-20-54:~/aws-demo-project$ psql   # logs you into postgres as ubuntu
ubuntu=# \q                                       # log out from being ubuntu
ubuntu@ip-172-31-20-54:~/aws-demo-project$        # you should now be back in your EC2 terminal
```

We will now make some modifications, namely changing IPv4 and IPv6 from `md5` to `trust` in the `pg_hba.conf` file (you will have to scroll down a good ways to reach these lines, and make sure you save the file for your changes to take effect):

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~/aws-demo-project$ sudo nano /etc/postgresql/10/main/pg_hba.conf
```

<div align='center'>
  <img width="350" height="200" style={{marginRight: '10px'}} src='https://user-images.githubusercontent.com/52146855/69205259-7e56ea00-0b17-11ea-9eed-d72ea9f81cb0.png' />
  <img width="350" height="200" src='https://user-images.githubusercontent.com/52146855/69255636-2a371e80-0b86-11ea-9ab1-9b2564048232.png' />
</div>

Now restart postgres for the changes to take effect:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ sudo service postgresql restart
```

## (Optional) Install PM2

**Note:** You can skip this step if your project does not have a backend or use Node.js to run.

Intalling [PM2](https://pm2.io/) will allow you to run multiple applications on different ports of your web server. This is a process manager for Node.js. PM2 allows [Nginx](https://www.nginx.com/) to run Node.js programs in the background for us. 

Execute the following commands to install PM2:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ npm i -g pm2      # install PM2 globally
ubuntu@ip-172-31-20-54:~$ pm2               # start using pm2
```

We also need to make sure PM2 runs `index.js` (or whatever the entry point is for your application--if you are using the [express generator](https://expressjs.com/en/starter/generator.html) then this will be `bin/www`) from within our Node.js application:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~/aws-demo-project$ pm2 start bin/www --name ec2-demo-
project
```

You should get something that looks like the following:

<div align='center'>
  <img width="500" src='https://user-images.githubusercontent.com/52146855/69281209-ee1bb200-0bb5-11ea-9da9-c4b957e95295.png' />
</div>

Note from the above that you can use the `--name` flag to give your application a name. We will now generate a startup script. As the PM2 docs [note](https://pm2.keymetrics.io/docs/usage/quick-start/#setup-startup-script): 

> Restarting PM2 with the processes you manage on server boot/reboot is critical. To solve this, just run this command to generate an active startup script: 
> `pm2 startup`
> And to freeze a process list for automatic respawn:
> `pm2 save`
> Read more about startup script generator [here](https://pm2.keymetrics.io/docs/usage/startup/).

Hence, if we establish a startup script, PM2 will restart every time that Nginx is restarted. Following the PM2 docs, to create a start up script, we can execute the `pm2 startup` command and then copy, paste, and execute the command returned to us by PM2 and subsequently freeze a process list for automatic respawn by running `pm2 save`:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~/aws-demo-project$ pm2 startup          # generate active startup script
# copy, paste, and execute the startup script generated by PM2  # execute generated startup script
ubuntu@ip-172-31-20-54:~/aws-demo-project$ pm2 save             # save/freeze process list for automatic respawn
```

You should end up with something that looks similar to the following:

<div align='center'>
  <img src='https://user-images.githubusercontent.com/52146855/69282358-19070580-0bb8-11ea-95ff-7792cce94f40.png' />
</div>

See the PM2 [quick start](https://pm2.keymetrics.io/docs/usage/quick-start/) guide for other notes about installation, starting an application, managing processes, etc.

## (Optional) Point Your Domain Name to Your AWS IP Address

**Note:** You must have a purchased domain name to do this step. You can buy one from [Namecheap](https://www.namecheap.com/), [GoDaddy](https://www.godaddy.com/), or a host (ha!) of other domain providers. If you do not have a domain name, then you can still view a *single* site on your EC2 instance by using the EC2-provided IP address. If, however, you want to set up subdomains, then a domain name is required. If you want to use HTTPS, which is strongly recommended and increasingly necessary, then you will need a certificate, and a domain name is required to use a certificate. 

Copy the IP address of your EC2 instance by doing the following:
 
 - Log in to your AWS account.
 - Visit your EC2 Dashboard.
 - Visit your running instances.
 - Select the instance you have been configuring since the start of this guide.
 - Copy the IPv4 Public IP address (`13.59.214.222` in this example).

 You should end up with something similar to what is shown below:

<div align='center'>
  <img width="600" src='https://user-images.githubusercontent.com/52146855/69291125-4069cc80-0bd0-11ea-9228-2bb5d1e1f56a.png' />
</div>

Now visit the domain provider site where you purchased your domain name. Each site is different, but you will want to manage your Domain Name Server (DNS) and create DNS records. We will create instances of the "A record." 

<details><summary> what is a DNS "A record"?</summary>

As noted by [NS1](https://ns1.com/resources/dns-records-explained): 

> The most common DNS record used, the A record simply points a domain to an IPv4 address, such as `11.22.33.44`. To set up an A record on your domain all you’ll need is an IP address to point it to.
>
> A blank record (sometimes seen as the ‘@’ record) points your main domain to a server. You can also set subdomains to point to other IP addresses as well, if you run multiple webservers. Finally, a wildcard record, shown usually as ‘*’ or ‘*.yourdomain.com,’ acts as a catch-all record, redirecting every subdomain you haven’t defined elsewhere to an IP address.
>
> AAAA Records operate in the exact same way as A records, except they point to an IPv6 address, which look similar to FE80::0202:B3FF:FE1E:8329.

---

</details>

Start by creating a regular "A record," and then you can also create subdomains as you see fit. Before illustrating this process with a working example, consider the following [image from MOZ](https://moz.com/learn/seo/domain) that illustrates what a domain is:

<div align='center'>
  <img width="400" src='https://user-images.githubusercontent.com/52146855/69292380-fedb2080-0bd3-11ea-8c8f-4373d2a4a0cf.png' />
</div>

The example that follows uses [Namecheap](https://www.namecheap.com/) as the domain provider site and `turniptoss.xyz` as the root domain.

Our root domain will have the following:
- **Type:** A record
- **Host:** @
- **Value:** The IPv4 address of your EC2 instance that you copied above (`13.59.214.222` in this example)
- **TTL:** 1 minute (the TTL can be anything, but the lower the number the faster the worldwide DNS lookups will be established)

A subdomain will have the following:
- **Type:** A record
- **Host:** The name you would like prefixed to your domain name (we will create a subdomain `example` for the purpose of illustration; a user could then visit this subdomain by navigating to `example.turniptoss.xyz`)
- **Value:** The IPv4 address of your EC2 instance
- **TTL:** Your desired value (we will use 1 minute in this example)

For our working example we will have the following:

<div align='center'>
  <img width="600" src='https://user-images.githubusercontent.com/52146855/69293270-61cdb700-0bd6-11ea-854d-2020027ea1f7.png' />
</div>

## Tell Nginx about Our Server

We will now tell Nginx about our server by editing the `sites-available` file on our EC2 instance (from the EC2 terminal):

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ sudo nano /etc/nginx/sites-available/default
```

Comment out the default server block. Essentially, comment out all of the provided lines by prefixing them with `#`. This process is illustrated below:

<div align='center'>
  <img width="600" src='https://user-images.githubusercontent.com/52146855/69297992-95aadb80-0bda-11ea-88bc-477a2b73bfab.gif' />
</div>

You should follow one of three code examples given below depending on your use case:

1. **Static site without custom domain name:** Just pointing your IP address to your project folder on your EC2 instance without using a domain name; that is, you will have a frontend only (i.e., static) example with no domain name. In this case, you will only be able to view the one site from your IP address. Change the name of the folder to where your `index.html` file exists:

  ```
  server {
          root /home/ubuntu/YOUR-FOLDER-NAME;
          index index.html index.htm;
  }
  ```

2. **Static site with custom domain name:** Same as above (i.e., static) but with a custom domain name. Provide the directory location of your site to be served and your custom domain name. 

For root domain (this could potentially be a good use case for your online portfolio):

```
server {
        root /home/ubuntu/YOUR-FOLDER-NAME;
        server_name yourdomainname.com www.yourdomainname.com;
        index index.html index.htm;
}
```

For subdomains:

```
server {
        root /home/ubuntu/YOUR-FOLDER-NAME;
        server_name subdomain.yourdomainname.com;
        index index.html index.htm;
}
```

3. **Non-static sites:** For a site running on Node with PM2 (i.e., non-static). You need to provide the correct directory location of your code, the domain that you want to see your site on, and the port number that you specified in your code for your application to listen on. Note that only one service can run on one port. If you have multiple services running, then they must be on different ports.

```
server {
        root /home/ubuntu/YOUR-FOLDER-NAME;
        server_name subdomain.yourdomainname.com;
        location / {
                proxy_pass http://localhost:YOUR-PORT;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

For the example project we have been working with throughout this guide, the following code was used:

```
server {
        root /home/ubuntu/aws-demo-project;
        server_name example.turniptoss.xyz turniptoss.xyz www.turniptoss.xyz;
        location / {
                proxy_pass http://localhost:4444;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

You can now test the changes you have made by running `sudo nginx -t` from within your EC2 terminal:

```bash
#EC2 terminal
ubuntu@ip-172-31-20-54:~$ sudo nginx -t
```

You should *hopefully* see something like the following:

<div align='center'>
  <img width="600" src='https://user-images.githubusercontent.com/52146855/69300781-3f419b00-0be2-11ea-8f8b-3448b0375687.png' />
</div>

If you do not get the `syntax is ok` and `test is successful` messages, then you need to fix your `sites-available` file. Make sure all of your curly brackets are matching, words are spelled correctly, semicolons are properly placed, etc.

## Get a Certificate from Certbot

Get a new certificate from Certbot. If you already have a certificate, then skip to the "updating certificates" section below. You only need to get a certificate once. 

Visit the Certbot site and [select Nginx and Ubuntu 18.04 LTS (bionic)](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx):

<div align='center'>
  <img width="700" src='https://user-images.githubusercontent.com/52146855/69301771-6057bb00-0be5-11ea-9612-775923de4c49.png' />
</div>

We will now follow the steps provided by Certbot to obtain our certificate (execute each command *one by one*; that is, do not copy and paste all of the commands and try to execute them all at once).

<details><summary> see the step-by-step instructions we follow below as they appear on the Certbot website</summary>

<div align='center'>
  <img src='https://user-images.githubusercontent.com/52146855/69301954-f0960000-0be5-11ea-8435-78b861ffc78e.png' />
</div>

<div align='center'>
  <img src='https://user-images.githubusercontent.com/52146855/69301958-f25fc380-0be5-11ea-8cba-b459e2bfa7fe.png' />
</div>

---

</details>

```bash
#EC2 terminal
demoec2   # SSH into the server running our HTTP website as a user with sudo privileges
ubuntu@ip-172-31-20-54:~$ sudo apt-get update
ubuntu@ip-172-31-20-54:~$ sudo apt-get install software-properties-common
ubuntu@ip-172-31-20-54:~$ sudo add-apt-repository universe
ubuntu@ip-172-31-20-54:~$ sudo add-apt-repository ppa:certbot/certbot   # Press [ENTER]
ubuntu@ip-172-31-20-54:~$ sudo apt-get update
ubuntu@ip-172-31-20-54:~$ sudo apt-get install certbot python-certbot-nginx   # Press Y and [ENTER]
```

If you have already done this, then you can simply *update* your certificate. Updates need to happen anytime you add a domain or subdomain to the `sites-available/default` file. Simply SSH into your EC2 server as above and run the following commands:

```bash
#EC2 terminal
demoec2   # SSH into the server running our HTTP website as a user with sudo privileges
ubuntu@ip-172-31-20-54:~$ sudo certbot --nginx
<email address>
<A>gree
<N>o
<enter>
<2> redirect
```

For all of the changes to take effect, you may need to restart Nginx:

```bash
#EC2 terminal:
ubuntu@ip-172-31-20-54:~$ sudo service nginx restart
```
