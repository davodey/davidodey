require([
	//libs
	'jquery',
	'customShareCounts'
], function($, customShareCount) {
	'use strict';

	$(document).ready(function(){
		$('.share-items').customShareCount({
			// in order to get twitter counts & totals you must sign up for a free account @ https://opensharecount.com/
			twitter: true,
			facebook: true,
			linkedin: true,
			google: true,
			// the twitter username you want to append to your share, leave blank for none;
			twitterUsername: 'davodey',
			// shows the counts on buttons
			showCounts: true,
			// shows the total of all the shares
			showTotal: true
		});

	});
});
