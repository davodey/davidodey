require(["jquery"],function(e){"use strict";e(document).ready(function(){var t=e(".share-links li");e(function(){t.on("click","a",function(){return window.open(this.href,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"),!1})})}),!function(e,t,n){var r,i=e.getElementsByTagName(t)[0],s=/^http:/.test(e.location)?"http":"https";e.getElementById(n)||(r=e.createElement(t),r.id=n,r.src=s+"://platform.twitter.com/widgets.js",i.parentNode.insertBefore(r,i))}(document,"script","twitter-wjs")}),define("app/pages/blog",function(){});