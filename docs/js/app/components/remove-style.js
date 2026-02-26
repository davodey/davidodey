require([
	//libs
	'jquery'
], function($) {
	'use strict';
	$(document).ready(function(){
		$.getScript( "http://opensharecount.com/bubble.js" )
			.done(function() {
				$('style').remove();
			});
	});
});