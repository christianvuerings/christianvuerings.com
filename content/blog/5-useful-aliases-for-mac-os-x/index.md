---
layout: post
title: 5 Useful Bash Aliases for Mac OS X
date: '2019-01-27'
tags:
  - development
---

As a developer, one of the things that can help you is to focus on being more productive by automating tasks that you do a lot. The following is a list of bash commands and aliases which will help you to be a bit faster.

### 1) Traversing up directories

How many times did you have to type something like `cd ../../..`? You could start from the user directory instead but that's not always the fastest, especially with deeply nested directories.

The following will allow you to write `....` instead.

```bash
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
```

### 2) Alias your most used directories

What are some of the directories you use the most on a daily basis? Create short and easy to remember aliases:

```bash
alias c="cd ~/code/christianvuerings.com"
alias p="cd ~/code/pinterest"
alias dl="cd ~/Downloads"
```

### 3) Fetch and rebase

If you're using `git`, one of the things you'll do a lot is to update your current local `master` branch with the `upstream` version.

```bash
alias gfr='git fetch upstream && git rebase upstream/master'
```

I personally like to combine this with our previous tip of aliasing your most used directories. It'll change the current directory to `pinterest` and merges any remote updates.

```bash
alias cupdate="p && gfr"
```

If you're using `git` a lot, check out this more [extensive list of git aliases](https://github.com/GitAlias/gitalias).

### 4) Running your test runner in watch mode

Running and writing tests is something you probably do on a regular basis. The following allows you to run

- `jw`: start running all the tests in watch mode
- `jw PinSearch`: start running all tests which contain `PinSearch` in their filename

```bash
alias jw='yarn run jest --watch'
```

It's likely that you'll have to update the command if you're using `npm` instead of `yarn` or have a different command to run your tests.

### 5) Putting your computer into sleep mode

Whenever you leave your desk, make sure to put your computer into sleep mode by running `afk`.

```bash
alias afk='/System/Library/CoreServices/Menu\ Extras/User.menu/Contents/Resources/CGSession -suspend'
```

### Bonus: Top 10 commands you use the most

Some developers use `git`, others use `mercurial`, what are some of the commands you use the most? ([source](https://linux.byexamples.com/archives/332/what-is-your-10-common-linux-commands/))

```bash
history |
 awk '{CMD[$2]++;count++;}END { for (a in CMD)print CMD[a] " " CMD[a]/count*100 "% " a;}' | \
 grep -v "./" |
 column -c3 -s " " -t |
 sort -nr |
 nl |
 head -n10
```

Output:

```bash
  1	17118  52.2927%     git
  2	2628   8.0281%      cd
  3	1785   5.45288%     yarn
  4	1673   5.11074%     arc
  5	1274   3.89186%     code
  6	656    2.00397%     pupdate
  7	621    1.89705%     npm
  8	556    1.69849%     node
  9	529    1.61601%     sshpt
 10 439    1.34107%     atom
```

This can help you to define what a good next alias/function would be.

### Learn from the people that went before you

Feel free to take a peek at other developers's dotfiles to see which kind of aliases they've created:

- [GitHub does dotfiles](https://dotfiles.github.io/): An unofficial guide to dotfiles on GitHub organized by bootstraps / framework and `.gitignore` files.
- [awesome-dotfiles](https://github.com/webpro/awesome-dotfiles): A curated list of dotfiles resources organized by shell type & provides tools to make your dotfiles easier to maintain and more secure way.
- [Mathias Bynens - dotfiles](https://github.com/mathiasbynens/dotfiles): Dotfiles from [@mathias](https://twitter.com/mathias), my personal favorite repo which I based [my own dotfiles](https://github.com/christianvuerings/dotfiles) on.
