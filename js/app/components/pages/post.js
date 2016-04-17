require([
	//libs
	'jquery'
], function($) {
	'use strict';

	$(document).ready(function(){
		// load twitter counts
		$.getScript("http://opensharecount.com/bubble.js")
			.done(function() {
				$('style').remove();
			});
	});
});

define(['//opensharecount.com/bubble.js'],
function () {
	$('style').remove();
});