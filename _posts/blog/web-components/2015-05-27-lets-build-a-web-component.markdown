---
layout: post
title: "Lets Build a Web Component"
date:  2016-05-27 10:28:30 -0700
category:
- blog
- HTML5
tags:
- HTML5

author: David O'Dey
main-image:
thumb-image: webcomponent.jpg
active: blog
require: post
exclude: "yes"

twitterText: Lets Build a Web Component.
hash: WebComponents

fbtype: Article
fbtitle: Lets Build a Web Component
fbdescription: What are Web Components?  Lets go over the new spec that may change the way we develop.
fbimage: http://www.davidodey.com/img/dave-profile.jpg
---

Web Components may soon change the way we build websites and web applications.  It’s an HTML specification that has been in the works since 2013 and is finally making its way to select browsers. <!--more--> It’s not completely ready to use in your production site, but it is ready for experimentation and learning on chrome browsers.  Chrome version 45 supports the four parts that make up web components at 100%. You can see browser support by checking [Can I Use]{:target="_blank"}.

## What are web components?
Web components are reusable HTML elements that are fully encapsulated and self-contained, so each component hides their complexity from one another.  They have their own HTML / CSS / JS and they can be loaded simply by adding an import statement into an HTML page.  Since web components are part of the browser, they do not depend on external libraries like jQuery or dojo. They are made up of four key specifications:
<ol>
    <li>Custom Elements</li>
    <li>Templates</li>
    <li>Shadow Dom</li>
    <li>HTML Imports</li>
</ol>
We will be taking a deeper look into each of these specs in a later post, but for now, I’ll give you a general idea of what each one does and the roles they play.

## Custom Elements
Custom Elements allow developers to create new types of HTML elements with logic and functionality baked into it.  Aside from being used in Web Components custom elements can also be used on their own.

## HTML Templates
Templating is nothing new in web development and you can use JS libraries such as Handlebars.js or Mustache.js to accomplish this.  Now we have a DOM-based approach.  If you’re unfamiliar with templating its pretty cool.  Using the template tag, you’ll be able to add snippets of HTML and load them in the DOM at a later time.  You can also have the snippets instantiated on page load, but the power comes being able to load them when you need them.

## Shadow DOM
Have you ever used the HTML5 video tag and noticed that the browser adds video and audio controls?  If you inspect the controls you will notice that they are hidden from the element inspector.  This is shadow DOM.  You can truly separate content from presentation.

## HTML Imports
Using HTML Imports you’ll be able to load other HTML pages into your document.  If your import location is CORS-enabled you’ll even be able to import HTML from other domains.  What’s great about HTML Imports is that it de-dupes multiple scripts.  For example, if you are loading the same script on two imported files, HTML Imports will skip over the previously loaded script and only executed once.

## Building A Web Component
Let's create a basic Web Component.  This component will be a facebook share button that will display share counts.  We'll start by outlining the structure of the component.
<ul>
    <li> - index.html</li>
    <li> - component.html</li>
</ul>

The index.html file will be the main document and component.html will hold the template code that will be imported into the index.html.  In the index.html file lets add our custom element.

{: data-snap-ignore="true"}{% highlight html %}
// index.html

<!DOCTYPE html>
<html lang="en">
<head></head>
    <body>
        <!-- The name must contain a dash -->
        <facebook-share >
        </facebook-share>

    </body>
</html>
{% endhighlight %}

You can use any name you want for the custom element as long as there is a dash in it.  The dash is how the browser differentiates between custom elements and regular elements.

Now let's open up component.html and register our custom element with the browser.  Every custom element you create will need some javaScript to power it.

{: data-snap-ignore="true"}{% highlight html %}
// component.html

<script>
    (function(doc) {
        var facebook = document.registerElement('facebook-share', {
            prototype: Object.create(HTMLElement.prototype, {
                createdCallback: {
                    value: function() {
                        // Shadow Dom Code will go here
                    }
                }
            })
        })
    })(document.currentScript.ownerDocument); // pass document of component.html
</script>
{% endhighlight %}

We register the custom element with <code class="highlighter-rouge">document.registerElement('facebook-share');</code>  One of the most powerful aspects of custom elements is that you define special methods called lifecycle callbacks.  We won't go into detail about them in this post, but if you would like to read more about them you can do so at [MDN]{:target="_blank"}.

Lifecycle callbacks allow you to attach behavior to the custom element when the element becomes registered, when it is inserted into to the DOM, when it is removed from the DOM, or when an attribute of the element is changed, added or removed.  Powerful stuff.

Now that the custom element is created and registered, let's create a template that will hold the markup.  We'll do this in the component.html file.

{: data-snap-ignore="true"}{% highlight html %}
// component.html

<!-- Create Template to Render Custom Element -->
<template id="template">

   <!-- CSS -->
    <style>
        .facebookBtn {
        padding:10px;
        font-family: sans-serif;
        background-color: #3b5998;
        color:white;
        border-radius:2px;
        text-decoration: none;
        }
        .facebookBtn:hover {
        background-color: #5171B3;
        }
    </style>

    <!-- HTML Markup -->
    <a class="facebookBtn" data-dir="left" href="https://www.facebook.com/sharer/sharer.php?u=http://google.com" >
        <span>Facebook</span>
        <content select="span"></content>
    </a>

    <!-- JS -->
    <script>
        $('.share').append(
        	'<span class="facebook-count">0</span>'
        ).customShareCount();
    </script>

</template>

    <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="customShareCounts.js"></script>

<!-- Register Custom Element Code Below -->
{% endhighlight %}

Well use the new template tag to create the template and assign it an id that we can later call with some JS.  Inside this template well include all of the CSS, HTML, and JS that will make up the custom element you previously created.  What's awesome about this is that this entire template is encapsulated, so none of the markup, styles, or js will ever interfere with any other elements or components on your page and only belongs to the new custom element you created.  

You'll notice the new content tag that was using inside the template.  This tag is used by the browser to pull in items into the shadow DOM from the shadow host. Since well pulling in generated content from an outside script into this template we need a way to inject the output into the shadow DOM on the index.html page, we do so with the content tag.

We're almost done, lets now go back to the JavaScript we wrote to register the custom element, this is where we will add the script to load the content into the shadow DOM.

{: data-snap-ignore="true"}{% highlight html %}
// component.html

<script>
    (function(doc) {
        var facebook = document.registerElement('facebook-share', {
            prototype: Object.create(HTMLElement.prototype, {
                createdCallback: {
                    value: function() {
                        
                        // Shadow Dom Code
                        var root = this.createShadowRoot();
                       
                        // use doc instead of document or 
                        // document.currentScript.ownerDocument
                        var template = doc.querySelector('#template');
                        var clone = document.importNode(template.content, true);
                        root.appendChild(clone);

                    }
                }
            })
        })
    })(document.currentScript.ownerDocument); // pass document of component.html
</script>
{% endhighlight %}


Inside our  <code class="highlighter-rouge">createdCallBack</code> function, we'll create three variables.  The first variable  <code class="highlighter-rouge">var root</code> assigns this (this being, facebook-share custom element) to a new method  <code class="highlighter-rouge">createShadowRoot()</code>.  This creates the shadow root.  The second variable  <code class="highlighter-rouge">var template</code> is assigned to the  <code class="highlighter-rouge">#template</code> id created above.  Notice we use  <code class="highlighter-rouge">doc.querySelector</code> instead of  <code class="highlighter-rouge">document.querySelector</code>?  We do this because doc is the document object in component.html.  If we used document instead, the document would be the document object in index.html.  The third variable  <code class="highlighter-rouge">var clone</code>, imports the template content, into the document of index.html.  We finish the script off by adding the template and its content into the shadow root of the custom element.   <code class="highlighter-rouge">root.appendChild(clone)</code>;

The last thing we will do is import the component.html file into the index.html file 

{: data-snap-ignore="true"}{% highlight html %}
// index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- import component.html to be used on page -->
	<link rel="import" href="component.html">
</head>
    <body>
        <!-- The name must contain a dash -->
        <!-- added some attributes for the share plugin to find -->
        <facebook-share class="share" data-url="http://google.com">
        </facebook-share>

    </body>
</html>
{% endhighlight %}

Importing HTML files into other HTML files is easy.  It's done by using the link tag.  So what happens if you import three separate template / component files and they all link to jQuery because the scripts depend on it?  Well, dont worry, if the browser detects multiple instances of a file it will only import it into the document once, not three times.  


Web Components can be difficult to understand at first and the syntax has changed quite a bit since its introduction.  However, I have found them to be fun to learn and I love the modular / component approach.  If you want to use web components in some of your projects, you'll want to use [Polymer]{:target="_blank"}, or [Web-Components.js]{:target="_blank"}.  These polyfills will help you get better browser support and come loaded with examples and documentation.  


Here is a link to the [working demo]{:target="_blank"} of the web component along with all the [files on GitHub]{:target="_blank"}.

If you would like to learn more about Web Components, you can do so by visiting any of the following sites:

[WebComponents.org]{:target="_blank"}<br>
[A Guide to Web Components]{:target="_blank"}<br>
[HTML5 Rocks]{:target="_blank"}








[Can I Use]: http://caniuse.com/#search=web%20components
[MDN]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
[Polymer]: https://www.polymer-project.org/1.0/
[Web-Components.js]: https://github.com/WebComponents/webcomponentsjs
[WebComponents.org]: http://webcomponents.org/
[A Guide to Web Components]: https://css-tricks.com/modular-future-web-components/
[HTML5 Rocks]: http://www.html5rocks.com/en/search?q=web+components

[files on github]: https://github.com/davodey/web-component
[working demo]: http://www.davidodey.com/projects/web-components/ 

