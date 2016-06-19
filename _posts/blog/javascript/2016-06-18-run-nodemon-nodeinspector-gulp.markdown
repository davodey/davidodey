---
layout: post
title: "Running Nodemon and Node Inspector with Gulp"
date:  2016-06-18 10:28:30 -0700
category:
- blog
- JavaScript
tags:
- JavaScript

author: David O'Dey
main-image:
thumb-image: nodemon.jpg
active: blog
require: post
exclude: "yes"

twitterText: Running Nodemon and Node Inspector with Gulp.
hash: nodeJs

fbtype: Article
fbtitle: Running Nodemon and Node Inspector with Gulp
fbdescription: Learn how to use gulp to run nodemon and node inspector.
fbimage: http://www.davidodey.com/img/nodemon.jpg
---

Nodemon and node-inspector are two must-have tools if you’re using node.js.  You can manually start nodemon or node-inspector using two separate console windows, or you can do it a more efficiently using gulp.js.  It took me some time to get everything setup the way I wanted it so I’m hoping this post will save you some effort. <!--more-->

Assuming your using gulp.js as your build system, lets install both [gulp-nodemon]{:target="_blank"} and [gulp-node-inspector]{:target="_blank"} using npm.  I prefer to install the files locally to the project, but if you like you can install them globally using the ``` -g ``` flag.  Use your console to navigate to your project folder, and run the following commands:

```$ npm install gulp-nodemon --save-dev```
```$ npm install gulp-node-inspector --save-dev```

After your plugins are installed we need to setup your gulpfile.js.

{: data-snap-ignore="true"}{% highlight javascript %}
// require plugins
var gulp = require('gulp'),
    nodeInspector = require('gulp-node-inspector'),
    nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
  nodemon({
      
    // location of webserver module
    script: './src/app',  
    ext: 'js',
    
    // enter any tasks you want to run before refreshing the server
    tasks: ['jshint'],  
    
    //important must pass the debug flag to work
    nodeArgs: ['--debug']  
  });
});

gulp.task('node-inspector', ['nodemon'], function() {
  gulp.src([])
    .pipe(nodeInspector({
      debugPort: 5858,
      webHost: '0.0.0.0',
      webPort: 8080,
      saveLiveEdit: false,
      preload: true,
      inject: true,
      hidden: [],
      stackTraceLimit: 50,
      sslKey: '',
      sslCert: ''
    }));
});

gulp.task('default', function() {
     gulp.start('node-inspector');
});


{% endhighlight %}

You’re all set, just type ```$ gulp``` in your console.  If you use the same settings in this gulpfile.js, and your app is running on port 3000 you can open ```http://127.0.0.1:3000/``` to access your webserver and ```http://127.0.0.1:8080/?port=5858``` to access your node debugger.

To download the example used in this project you can checkout the [files on Github]{:target="_blank"}.

For more information:<br>

[Nodemon]{:target="_blank"}<br>
[Node-inspector]{:target="_blank"}<br>
[Node.js]{:target="_blank"}




[Nodemon]: http://nodemon.io/
[Node-inspector]: https://github.com/node-inspector/node-inspector
[gulp-nodemon]:https://www.npmjs.com/package/gulp-nodemon
[gulp-node-inspector]: https://www.npmjs.com/package/gulp-node-inspector
[Node.js]: https://nodejs.org/en/
[Gulp.js]: http://gulpjs.com/
[files on Github]: https://github.com/davodey/gulp-nodemon-inspector-example