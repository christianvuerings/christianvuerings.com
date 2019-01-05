---
layout: post
title: Developing jQuery Plug-ins
date: "2011-05-26"
tags:
- development
---
Lately I've been developing jQuery plug-ins in my spare time. Definitely
go and check out
the [example](https://christianvuerings.github.io/jquery-lifestream/example.html)
[pages](https://christianvuerings.github.io/jquery-favicons/example.html).
One of the main reasons for doing this is to get a grip of the latest API
changes in jQuery.

###Plug-ins

* [jQuery Favicons](https://christianvuerings.github.io/jquery-favicons/) - Add
favicons to anchor elements on your page.
* [jQuery Lifestream](https://christianvuerings.github.io/jquery-lifestream/) - Show
a stream of your online activity with jQuery.

###Things I've learned
*  __Make it chainable__  
jQuery has many features, one of them is chainability. Which is the ability
to chain one function after the other.
The way to do this is by returning the original jQuery object.
```js
$('a')
  .favicons()
  .css('color', '#ff0000');
```

* __Make it configurable__  
Default options are OK, but make sure that people can modify the behavior
without changing the actual code of the plug-in.
```js
$("#lifestream").lifestream({
  "limit": 30,
  "list":[
    {
      "service": "twitter",
      "user": "christianvuerings"
    }
  ]
});
```

*  __Make it extendible__  
If someone do wants to add extra functionality to your plug-in,
make sure they can. One way of doing this is by _extending_ it.
```js
$.fn.lifestream.feeds.lastfm = function(obj, callback){
  // ...
};
```

A great resource is the
[jQuery authoring guide](https://docs.jquery.com/Plugins/Authoring).
