require([
	//libs
	'jquery'
], function($) {
	'use strict';

	$(document).ready(function(){
		//do stuff
		var $shareList = $('.share-links li');
		$(function() {
			$shareList.on('click', 'a', function(){
				window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;
			});
		});

	});
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
});
