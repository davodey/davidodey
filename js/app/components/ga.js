
require([
	//libs
	'jquery',
	'//www.google-analytics.com/analytics.js',
	'autotrack'
], function($) {
	'use strict';
	$(document).ready(function(){
		window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
		ga('create', 'UA-1888107-38', 'auto');
		ga('require', 'autotrack', {
			attributePrefix: 'data-ga-'
		});
		ga('send', 'pageview');
		console.log('loaded');

	});
});