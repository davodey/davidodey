---
layout: post
title: "Writing a basic jQuery Plugin"
date:  2016-05-15 10:28:30 -0700
category:
- blog
- JavaScript
tags:
- JavaScript

author: David O'Dey
main-image: <img src="http://placehold.it/600x300" alt="alt">
thumb-image: patternlab.png
active: blog
require: post

twitterText: How to write a jQuery Plugin.
hash: jQuery

fbtype: Article
fbtitle: Writing a basic jQuery Plugin
fbdescription: Learn how to write a basic jQuery plugin using data from a weather API.
fbimage: http://www.davidodey.com/img/dave-profile.jpg
---

If you’re like me you may have wondered at some point, how to write a jQuery plugin.  Where do you start?  Is it difficult? When should I write one?  Can’t I just use one of the many plugins already written? These are all questions I had.  I will attempt to answer all these for you in this article, and walk you through a plugin I made for this tutorial.  I won’t be able to cover everything, but I will give you enough to get you started writing your own plugins,and

## What is a plugin?
Before I could write a jQuery plugin, I really needed to know what it was and its purpose.  Think of a plugin as a new [method] that performs a series of actions on a selection.  It’s available to call on and use or re-use throughout your code.  This method is created extending the jQuery prototype object.  Doing so inherits this new method on all core jQuery objects.  If your really new to jQuery its easy to be intimidated by the terminology, don’t be.  A method is a function.

## Where do you start?
Now that we understand what a plugin is and does, lets go ahead and write one.  For this article I’ve created a plugin that will display the current temperature to selected cities based off zip code.  Well add an icon to display the current weather and well also display the average temperature between all the selected cities.  Lets get started.

Extend the jQuery prototype object and add scope.
The first thing we need to do is start the script with the following code:


{: data-snap-ignore="true"}{% highlight javascript %}
(function ( $ ) {

}( jQuery ));

{% endhighlight %}


We start with this for two reasons.  It allows your plugin to play nice with other js libraries and avoid conflicts.  This will also allow us to store private variables that can be used throughout your plugin.  Our next step is to create the new method named I used the name avgWeather.

{: data-snap-ignore="true"}{% highlight javascript %}
(function ( $ ) {
    $.fn.avgWeather = function() {

  };
}( jQuery ));
{% endhighlight %}

JQuery provides an easy way of doing this by using <code class="highlighter-rouge">$.fn</code> or <code class="highlighter-rouge">jQuery.fn</code>.  This is what allows us to call <code class="highlighter-rouge">$(‘.someClass’).avgWeather();</code>  Which will run the avgWeather function on the selection ‘someClass’.

We’re going to want to add some customizable settings so lets add support for accepting options by adding an object literal, this will allow us to add as many options as we need to our plugin.

{: data-snap-ignore="true"}{% highlight javascript %}
(function ( $ ) {
$.fn.avgWeather = function( options ) {
    var settings = $.extend({}, $.fn.avgWeather.defaults, options);
};

$.fn.avgWeather.defaults = {
    tempUnits: "imperial",
    apiKey: "Enter Api Key"
};

}( jQuery ));
{% endhighlight %}

Now whenever we need to refer to the unit of measurement in our code we can use: <code class="highlighter-rouge">settings.tempUnits</code>, which will return the value passed into <code class="highlighter-rouge">$.fn.avgWeather.defaults</code>.  We will also be able to pass the options when calling the method in our markup, making it even more flexible.

{: data-snap-ignore="true"}{% highlight javascript %}
$(".getTemp").avgWeather({
    tempUnits: "imperial",
    apiKey: "Enter Api Key"
});

{% endhighlight %}

Passing the options like this in the markup, overwrite any of the default values in the script.

We’ve now created the basic foundation for our plugin.   The plugin can accept private variables and should play nice with other libraries.  We’ve created a new method that will be called when we want to run the script and we have the ability to pass multiple options, AWESOME.

## The markup
Before we begin scripting the plugin lets take a look at the markup.

{: data-snap-ignore="true"}{% highlight html %}
<div class="getTemp">
    <ul class="cities">
        <li data-zip="60559">Westmont
            <span class="temp">0</span>
            <img class="icon" src="">
        </li>
        <li data-zip="90210">Beverly Hills
            <span class="temp">0</span>
            <img class="icon" src="">
        </li>
        <li>Average Temperature
            <span class="total-temp">0</span>
            <img class="icon" src="">
        </li>
    </ul>
</div>

{% endhighlight %}

What were going to do is run <code class="highlighter-rouge">$(‘.getTemp’).avgWeather();</code> This will run the script on the div with getTemp.  The script will do the following:

1.  Iterate through the <code class="highlighter-rouge"><li></code> tags nested in <code class="highlighter-rouge"><div class="getTemp"></code>.
2.  If an <code class="highlighter-rouge"><li></code> tag has a data attribute of data-zip then we well send off a request to the weather API and return the information for that zipcode.
3.	With the returned information we will display the temperature to the span tag with the class of temp, nested inside the <code class="highlighter-rouge"><li></code> tag.
4.	We will also display the icon that is returned from the API and display that in img tag also nested inside the <code class="highlighter-rouge"><li></code>.
5.	If the <code class="highlighter-rouge"><li></code> tag does not have the data attribute associated with it, the script simply skips over it.
6.	Finally we will take all the temperatures, do some basic math and return the avg temperature, displaying that inside the class ‘total-temp’.

## The script
Now that we have the basic structure complete, lets start the script.  The first thing well want to do, is run a basic loop using <code class="highlighter-rouge">$(‘this’)</code> as the selector.  This, refers to the selector that you will run the method avgWeather on.  Based on the example markup above THIS would have the context of <code class="highlighter-rouge"><div class=”getTemp”> ... </div></code>.

{: data-snap-ignore="true"}{% highlight JavaScript %}
(function ( $ ) {
    $.fn.avgWeather = function( options ) {
        var settings = $.extend({}, $.fn.avgWeather.defaults, options);

        $(this).each(function () {

        };
        return this;
    };

$.fn.avgWeather.defaults = {
    tempUnits: "imperial",
    apiKey: "Enter Api Key"
};

}( jQuery ));
{% endhighlight %}

You see that we added the line <code class="highlighter-rouge">return this;</code>.  By returning this, we are returning the object back to jQuery so it can be chained to another jQuery object, if needed.  Im sure you are familiar with chaining.  Its when you string several jQuery methods together.  For example : <code class="highlighter-rouge">$(‘.getTemp).avgWeather().css(‘color’,’blue’);</code>  This would run the method .avgWeather() on the selection <code class="highlighter-rouge">$(‘.getTemp’)</code> and also change the color of all the output text to blue.

Next well want to iterate through the list items we presented in the markup.

{: data-snap-ignore="true"}{% highlight JavaScript %}
(function ( $ ) {
    $.fn.avgWeather = function( options ) {
        var settings = $.extend({}, $.fn.avgWeather.defaults, options);

        $(this).each(function () {
            $("li[data-zip]", this).each(function() {

            }
        };
        return this;
    };

$.fn.avgWeather.defaults = {
    tempUnits: "imperial",
    apiKey: "Enter Api Key"
};

}( jQuery ));
{% endhighlight %}

This will look for all the <code class="highlighter-rouge"><li></code> tags with the data attribute of ‘data-zip’ and perform actions on each one.  Before we handle that lets assign some variables.

{: data-snap-ignore="true"}{% highlight JavaScript %}
(function ( $ ) {
    $.fn.avgWeather = function( options ) {
        var settings = $.extend({}, $.fn.avgWeather.defaults, options);
        $(this).each(function () {

       // output the total avg temp in this div
       var $targetTotal = $('.total-temp',this),

        // counts the number of cities
        $count = $('.cities li[data-zip]', this).length,

        // location of the icon url in the returned data
        iconUrl = 'http://openweathermap.org/img/w/',

        // starts the total counter
        total = 0;

        $('li[data-zip]', this).each(function() {

            var // output the current temp
            $target= $('.temp', this),

            // selects this element with class of icon
            $targetIcon = $('.icon', this),

            // finds the zipcode
            $zipCode = $(this).attr('data-zip'),

            // json url that the data is sent to
            jsonUrl = 'http://api.openweathermap.org/data/2.5/weather',
            temp,  // future data assignment
            icon;  // future data assignment
        });
    }
    return this;
};

$.fn.avgWeather.defaults = {
    tempUnits: "imperial",
    apiKey: "Enter Api Key"
};

}( jQuery ));
{% endhighlight %}

## Getting and using the data
We are almost done, the last thing we will want to do is run the api call on the data and do something with the response.  In this case, well want to output the temperature, load the icon and compute the average temperature.  Lets make that API call to the server using ajax.  For this example we used a free service called [Open Weather Map].

{: data-snap-ignore="true"}{% highlight JavaScript %}
(function ( $ ) {
    $.fn.avgWeather = function( options ) {
        var settings = $.extend({}, $.fn.avgWeather.defaults, options);
        $(this).each(function () {

       var $targetTotal = $('.total-temp',this),
        $count = $('.cities li[data-zip]', this).length,
        iconUrl = 'http://openweathermap.org/img/w/',
        total = 0;

        $('li[data-zip]', this).each(function() {
            $target= $('.temp', this),
            $targetIcon = $('.icon', this),
            $zipCode = $(this).attr('data-zip'),
            jsonUrl = 'http://api.openweathermap.org/data/2.5/weather',
            temp,
            icon;

             $.ajax({
            	url: jsonUrl,
            	cache: true,
            	type: 'GET',
            	dataType: 'jsonp',
            	data: {
            		zip: $zipCode,
            		units: settings.tempUnits,
            		country: 'US',
            		appid: settings.apiKey
            	},
            	success: function (data) {
            		temp = Math.round(data.main.temp);
            		icon = iconUrl + data.weather[0].icon + '.png';
            		$target.text(temp);
            		total += temp;
            		$targetTotal.text(total / $count);
            		$targetIcon.attr('src', icon);
            	}
            });

        });
    }
    return this;
};

$.fn.avgWeather.defaults = {
    tempUnits: "imperial",
    apiKey: "Enter Api Key"
};

}( jQuery ));

{% endhighlight %}

Notice in the data we are sending to the API, we’re using the option we created below settings.tempUnits?

The script is now complete, the only thing left is to fire the script in the markup and pass any options you want.  What if you want to cycle through another set of select cities, do you need to alter the code?  You wont have to change the js, but you will want to add the markup and change the zipcodes.

{: data-snap-ignore="true"}{% highlight html %}
<div class="getTemp">
    <ul class="cities">
        <li data-zip="60559">Westmont
            <span class="temp">0</span>
            <img class="icon" src="">
        </li>
        <li data-zip="90210">Beverly Hills
            <span class="temp">0</span>
            <img class="icon" src="">
        </li>
        <li>Average Temperature
            <span class="total-temp">0</span>
            <img class="icon" src="">
        </li>
    </ul>
</div>

<div class="getTemp">
    <ul class="cities">
        <li data-zip="85260">Scottsdale
            <span class="temp">0</span>
            <img class="icon" src="">
        </li>
        <li data-zip="85331">Cave Creek
            <span class="temp">0</span>
            <img class="icon" src="">
        </li>
        <li>Average Temperature
            <span class="total-temp">0</span>
            <img class="icon" src="">
        </li>
    </ul>
</div>
{% endhighlight %}

By adding a second set of <code class="highlighter-rouge"><div class=”getTemp”> … </div></code> elements, the plugin will read it as a separate instance of this, running the script a second time returning those values.  All you need to do is change the zip codes of the cities you want the data for and your all set.

Here is a link to the [working demo] of the plugin along with all the [files on GitHub].  I hope this article has gotten you a little bit more familiar with how plugins work.  For more examples and to learn more go to [learn.jquery.com].





[method]: https://developer.mozilla.org/en-US/docs/Glossary/Method
[Open Weather Map]: http://openweathermap.org/api
[files on github]: https://github.com/davodey/Termperature-With-Avg
[working demo]: #
[learn.jquery.com]: https://learn.jquery.com/plugins/basic-plugin-creation/