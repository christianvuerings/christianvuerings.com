---
layout: post
title: Hub - Supercharge Git
date: "2014-06-15"
tags:
- development
- workflow
---

If you're using [GitHub](https://github.com/) and the command line, then [hub][hub] is something for you.

![Supercharge Git](./2014-06-15-supercharge-git.svg)

### Why hub?

Have you ever wondered why you always have to add the complete URL when you're adding a git remote?

```bash
git remote add christianv https://github.com/christianv/dotfiles.git
```

With [hub][hub] this changes to

```bash
git remote add christianv
```

when you are in a git repository.

### Installation

The recommended way to install [hub][hub] is through homebrew:

```bash
brew install hub
```

Then you should alias `git` to `hub`

```bash
eval "$(hub alias -s)"
```

### Hightlighted Features

* **clone** - Clone a remote repository

```bash
git clone christianv
```

* **browse** - Open the current branch in the browser

```bash
git browse
```

* **pull-request**  - Create a pull request
```bash
git pull-request -b christianv:master -o
# The `-o` option will open the pull request in the browser.
```

### I want more

In this post we highlighted some of the awesome features of [hub][hub]. If you want more, definitely check out [the hub readme][hubreadme].

[hub]: http://github.com/github/hub
[hubreadme]: https://github.com/github/hub#readme
