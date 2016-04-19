require([
	//libs
	'jquery',
	'disqus',
	'//davidodey.disqus.com/count.js',
	'typescript'
], function($) {
	'use strict';
	$(document).ready(function () {
		var thisUrl = $(location).attr('href');

		// remove tweet bubble styles
		$('style').remove();

		// get facebook count
		$.ajax({
			url: 'https://count.donreach.com/',
			cache: true,
			type: 'GET',
			dataType: 'jsonp',
			data: {
				url: thisUrl
			},
			success: function (response) {
				$('.facebook-count').text(response.shares.facebook);
				$('.linkedin-count').text(response.shares.linkedin);
				$('.google-count').text(response.shares.google);
			}
		});
	});
});

// http://graph.facebook.com/?id=http://avisualidentity.com