require([
], function() {
	'use strict';
	$(document).ready(function(){

		$.getScript( "http://use.typekit.net/jag4iyt.js" )
			.done(function() {
				try{Typekit.load({ async: true });}catch(e){}
			});

	});
});