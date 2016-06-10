---
layout: post
title: "Performing a UI Inventory"
date:  2016-06-09 10:28:30 -0700
category:
- blog
- design
tags:
- Design

author: David O'Dey
main-image: /blog-img/ui-inventory-buttons.jpg
thumb-image: /blog-imgs/ui-inventory-buttons.jpg
active: blog
require: post
exclude: "yes"

twitterText: Performing a UI Inventory.
hash: #UIDesign

fbtype: Article
fbtitle: Performing a UI Inventory
fbdescription: How to perform a UI inventory.
fbimage: http://www.davidodey.com/img/blog-imgs/ui-inventory-buttons.jpg
---

<img src="../../img/blog-imgs/ui-inventory-buttons.jpg" alt="UI inventory buttons">
One of the most useful exercises you can do is perform a UI inventory.  A UI inventory, or inventory, will help you easily identify problems and uncover information you may not know existed. <!--more--> I recently did a UI inventory for a large fortune 500 company on one of their most used applications.  What we found was eye opening, especially for the stakeholders.  We found over eight variations of one button, each button just a little off from the other. Four of those buttons had slightly different variations of down arrows, to signify a dropdown menu. Two of the buttons used different fonts with separate weights.  The other two buttons had slightly different font sizes and styles.  There were also four different paragraph styles, again each one just slightly different from the other.  I could ramble on with the other findings, but it would be irrelevant.  The point is, nobody really knew how many problems there really were until we did the UI inventory.  These kinds of problems cause visual disharmony, unneeded markup, and bloated CSS sheets. 

When uncovering these issues we found out that these were happening not because of bad designers, but stakeholders were dictating the design and overriding designer’s decisions.  One stakeholder liked this type of arrow; another stakeholder felt that arrow wasn’t prominent enough so he wanted a heavier, more prominent arrow, on the piece of functionality that belonged to his team.  Before they knew it they had eight variations of the same button.  

With our findings in hand, we were able to set some rules that everyone, even the stakeholders needed to follow, and they happily obliged.  In the end, we wound up with three total buttons, a primary, secondary, and one that held an icon.  I’m not so sure we would have been able to accomplish this without the ammunition of a UI inventory. A UI inventory also has other benefits.  When performed in the beginning of a redesign or responsive retrofit, it will aid in identifying all the styles your site will consist of.  If you're taking a more modular approach, it will also help you identify components and modules.  

## How to perform a UI Inventory
How do you perform an inventory you ask?  Well its not that hard.  All it takes is some time, a graphics program, and some screenshots.  If your re-designing the site and using this exercise to identify what you will be designing, you can use the new mockup, if one was provided in place of a screenshots.

<img src="../../img/blog-imgs/ui-inventory-new-document.jpg" alt="UI inventory new document">
1. Start by opening up your favorite graphics editor and creating a new document.  You’ll want to make the canvas fairly large but if you find it’s too small, no worries you can always expand it, it doesn’t have to be perfect.

<img src="../../img/blog-imgs/ui-inventory-screenshot.jpg" alt="UI inventory screenshot">
2. We'll assume in this example that you have two working monitors, if you only have one monitor its no problem, just be prepared to do a lot of switching back forth.  On the second monitor open up one of the screenshots you took. 

<img src="../../img/blog-imgs/ui-inventory-paste-elements.jpg" alt="UI paste elements">
3. Start the inventory by identifying an element and copying that element from the screenshot to the blank canvas.  For example, you could start with buttons.  Go over the screenshot, and cut out all the buttons on the page, pasting them to the new canvas.  Keep them grouped together.

<img src="../../img/blog-imgs/ui-inventory-unique-items.jpg" alt="UI unique items">
4. Next, remove any duplicate styles keeping only unique elements on that page.  

<img src="../../img/blog-imgs/ui-inventory-complete.jpg" alt="UI inventory complete">
5. Now move onto other elements in the screenshot, repeating the process until there is nothing left to cut, then move onto the other pages.  Once this is done and there are no more elements left on any pages, your inventory is complete and its time to look at the data

What you end with is a visual map of every element of your site and the data at your disposal.  This data can help you build out a style-guide or help you create new elements for your site.  You’ll know exactly how many buttons you have, how many type treatments, menus, and so on.  It may even uncover some bad decisions that have been made and give you the data ammunition you need to prove your case and make your site or app better.  If you have performed a UI audit and would like to share your experience, take a moment and write a comment. 



[button-image]: <img src="../../img/blog-imgs/ui-inventory-buttons.jpg" alt="UI inventory buttons">
[method]: https://developer.mozilla.org/en-US/docs/Glossary/Method
[Open Weather Map]: http://openweathermap.org/api
[files on github]: https://github.com/davodey/Termperature-With-Avg
[working demo]: http://www.davidodey.com/projects/jquery-weather-plugin.html
[learn.jquery.com]: https://learn.jquery.com/plugins/basic-plugin-creation/