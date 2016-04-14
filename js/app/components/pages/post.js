require([
	//libs
	'jquery'
], function($) {
	'use strict';

	$(document).ready(function(){
		//do stuff
		var postLength = $('#post-list').length;
		$('.post-count').text(postLength);
	});
});